/**
 * @packageDocumentation
 *
 * Vite configuration for TypeDoc documentation site with HMR support.
 *
 * This module provides a custom Vite plugin that:
 * - Generates TypeDoc documentation from TypeScript source files
 * - Watches for file changes and regenerates docs only when content changes
 * - Serves the generated HTML documentation with proper HMR support
 *
 * @remarks
 * The plugin uses SHA-256 hashing to detect actual content changes,
 * preventing unnecessary rebuilds when files are saved without modifications.
 *
 * @mermaid
 * flowchart TB
 *   subgraph Vite["Vite Dev Server"]
 *     A[buildStart] --> B[run: Generate TypeDoc]
 *     C[File Watcher] --> D{Content Changed?}
 *     D -->|Yes| E[runDebounced]
 *     D -->|No| F[Skip]
 *     E --> B
 *     G[Middleware] --> H[Serve HTML]
 *   end
 *   subgraph Cache["Hash Cache"]
 *     I[fileHashCache Map]
 *   end
 *   D --> I
 *
 * @example
 * ```bash
 * # Start the documentation dev server
 * pnpm dev
 * ```
 *
 * @module
 */

import crypto from 'node:crypto'
import fsp from 'node:fs/promises'
import path from 'node:path'
import devServer from '@hono/vite-dev-server'
import { Application } from 'typedoc'
import { defineConfig, type PluginOption, type ViteDevServer } from 'vite'

export default defineConfig({
  plugins: [typeDocVitePlugin(), devServer({ entry: 'src/index.ts' })],
})

/**
 * Computes the SHA-256 hash of the given content.
 *
 * @remarks
 * Uses Node.js crypto module to generate a deterministic hash
 * for content comparison. SHA-256 provides sufficient collision
 * resistance for file change detection.
 *
 * @param content - The string content to hash
 * @returns The hexadecimal hash string (64 characters)
 *
 * @example
 * Basic usage:
 * ```ts
 * const hash = computeHash('hello world')
 * console.log(hash)
 * // => 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
 * ```
 *
 * @example
 * Comparing file contents:
 * ```ts
 * const content1 = await fs.readFile('file.ts', 'utf8')
 * const content2 = await fs.readFile('file.ts', 'utf8')
 * console.log(computeHash(content1) === computeHash(content2))
 * // => true (same content)
 * ```
 *
 * @see {@link https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options | Node.js crypto.createHash}
 */
function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

/**
 * Creates a Vite plugin that generates TypeDoc documentation with HMR support.
 *
 * @remarks
 * This plugin integrates TypeDoc into the Vite dev server workflow:
 *
 * 1. **Initial Build**: Generates documentation on server start
 * 2. **File Watching**: Monitors `packages/**\/*.ts` for changes
 * 3. **Smart Rebuild**: Only regenerates when file content actually changes
 * 4. **HMR Integration**: Triggers full page reload after doc regeneration
 * 5. **HTML Serving**: Serves generated HTML from `public/` directory
 *
 * @mermaid
 * sequenceDiagram
 *   participant V as Vite
 *   participant P as Plugin
 *   participant T as TypeDoc
 *   participant C as Cache
 *
 *   V->>P: buildStart()
 *   P->>T: generate docs
 *   T-->>P: done
 *
 *   loop File Change
 *     V->>P: change event
 *     P->>C: check hash
 *     alt Content Changed
 *       C-->>P: new hash
 *       P->>T: regenerate
 *       T-->>P: done
 *       P->>V: full-reload
 *     else No Change
 *       C-->>P: same hash
 *       P-->>V: skip
 *     end
 *   end
 *
 * @returns A Vite plugin configuration object with `name`, `buildStart`, and `configureServer`
 *
 * @example
 * Basic usage in vite.config.ts:
 * ```ts
 * import { defineConfig } from 'vite'
 *
 * export default defineConfig({
 *   plugins: [typeDocVitePlugin()],
 * })
 * ```
 *
 * @example
 * Combined with other plugins:
 * ```ts
 * import devServer from '@hono/vite-dev-server'
 * import { defineConfig } from 'vite'
 *
 * export default defineConfig({
 *   plugins: [
 *     typeDocVitePlugin(),
 *     devServer({ entry: 'src/index.ts' }),
 *   ],
 * })
 * ```
 *
 * @see {@link https://typedoc.org/api/ | TypeDoc API}
 * @see {@link https://vitejs.dev/guide/api-plugin.html | Vite Plugin API}
 */
function typeDocVitePlugin(): PluginOption {
  /**
   * Reference to the Vite dev server instance.
   * Used to send WebSocket messages for HMR.
   */
  const serverRef: { current: ViteDevServer | null } = { current: null }

  /**
   * Cache storing file paths and their corresponding SHA-256 hashes.
   * Used to detect actual content changes vs. timestamp-only changes.
   */
  const fileHashCache = new Map<string, string>()

  /**
   * Generates TypeDoc documentation from source files.
   *
   * @remarks
   * This function:
   * 1. Bootstraps TypeDoc with configured options
   * 2. Converts TypeScript source to documentation model
   * 3. Generates HTML output to `public/` directory
   * 4. Triggers HMR full-reload if server is running
   *
   * @throws Error if TypeDoc conversion fails
   *
   * @internal
   */
  const run = async () => {
    const app = await Application.bootstrapWithPlugins({
      entryPoints: ['../../packages/**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.test.ts',
        '**/*.d.ts',
        'packages/hono-takibi/routes/*.ts',
        'packages/hono-takibi/vite.config.ts',
        'packages/hono-takibi/vitest.config.ts',
        '**/test/**',
        '**/tests/**',
        '**/coverage/**',
      ],
      skipErrorChecking: true,
      tsconfig: 'tsconfig.json',
      plugin: ['typedoc-plugin-mermaid'],
    })

    const project = await app.convert()
    if (!project) throw new Error('convert failed')

    await app.generateDocs(project, 'docs')
    serverRef.current?.ws.send({ type: 'full-reload' })
  }

  /**
   * Creates a debounced version of a function.
   *
   * @remarks
   * Implements trailing-edge debounce: the function executes after
   * the specified delay has passed since the last invocation.
   * Useful for batching rapid file changes into a single rebuild.
   *
   * @param ms - The debounce delay in milliseconds
   * @param fn - The function to debounce
   * @returns A debounced function that delays execution
   *
   * @example
   * ```ts
   * const debouncedLog = debounce(100, () => console.log('fired'))
   * debouncedLog() // scheduled
   * debouncedLog() // previous cancelled, rescheduled
   * debouncedLog() // previous cancelled, rescheduled
   * // After 100ms: "fired" (only once)
   * ```
   *
   * @internal
   */
  const debounce = (ms: number, fn: () => void) => {
    const state: { id: NodeJS.Timeout | undefined } = { id: undefined }
    return () => {
      const id = state.id
      if (id !== undefined) clearTimeout(id)
      state.id = setTimeout(fn, ms)
    }
  }

  /**
   * Debounced version of run() with 200ms delay.
   * Batches multiple rapid file changes into single rebuild.
   */
  const runDebounced = debounce(200, () => void run())

  /**
   * Absolute path to the packages directory being watched.
   */
  const absPackages = path.resolve('../../packages')

  /**
   * Checks if a file's content has changed by comparing SHA-256 hashes.
   *
   * @remarks
   * This function prevents unnecessary rebuilds by:
   * 1. Reading the current file content
   * 2. Computing its SHA-256 hash
   * 3. Comparing against the cached hash
   * 4. Updating the cache if content changed
   *
   * If the file cannot be read (deleted, permission error), the cache
   * entry is removed and `false` is returned.
   *
   * @param filePath - The absolute path to the file to check
   * @returns Promise resolving to `true` if content changed, `false` otherwise
   *
   * @example
   * ```ts
   * const changed = await hasContentChanged('/path/to/file.ts')
   * if (changed) {
   *   console.log('File content was modified')
   *   runDebounced()
   * }
   * ```
   *
   * @internal
   */
  const hasContentChanged = async (filePath: string): Promise<boolean> => {
    try {
      const content = await fsp.readFile(filePath, 'utf8')
      const newHash = computeHash(content)
      const oldHash = fileHashCache.get(filePath)

      if (oldHash === newHash) {
        return false
      }

      fileHashCache.set(filePath, newHash)
      return true
    } catch {
      fileHashCache.delete(filePath)
      return false
    }
  }

  return {
    name: 'typedoc-hmr',

    /**
     * Called when Vite build starts.
     * Generates initial TypeDoc documentation.
     */
    async buildStart() {
      await run()
    },

    /**
     * Configures the Vite dev server with file watching and HTML serving.
     *
     * @param server - The Vite dev server instance
     */
    configureServer(server) {
      serverRef.current = server

      server.watcher.add(absPackages)
      server.watcher.on('change', async (file) => {
        if (file.endsWith('.ts') && file.includes(`${path.sep}packages${path.sep}`)) {
          const changed = await hasContentChanged(file)
          if (changed) {
            runDebounced()
          }
        }
      })

      /**
       * Middleware to serve generated HTML documentation.
       *
       * @remarks
       * Handles requests for:
       * - `/` → `docs/index.html`
       * - `/*.html` → `docs/*.html`
       * - `/path/` → `docs/path/index.html`
       *
       * Includes path traversal protection to prevent
       * access outside the public directory.
       */
      server.middlewares.use(async (req, res, next) => {
        try {
          const urlPath = (req.url ?? '/').split('?')[0]
          if (!(urlPath === '/' || urlPath.endsWith('.html') || urlPath.endsWith('/'))) {
            return next()
          }

          const rel =
            urlPath === '/'
              ? 'index.html'
              : urlPath.endsWith('/')
                ? `${urlPath}index.html`.replace(/^\//, '')
                : urlPath.replace(/^\//, '')

          const publicRoot = path.join(server.config.root, 'docs')
          const file = path.join(publicRoot, rel)

          const normalized = path.normalize(file)
          if (!normalized.startsWith(publicRoot)) return next()

          const raw = await fsp.readFile(normalized, 'utf8')
          const html = await server.transformIndexHtml(urlPath, raw)
          res.setHeader('Content-Type', 'text/html')
          res.end(html)
        } catch {
          next()
        }
      })
    },
  }
}
