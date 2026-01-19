// vite.config.ts

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
 * @param content - The string content to hash
 * @returns The hexadecimal hash string
 *
 * @example
 * ```ts
 * const hash = computeHash('hello world')
 * // => 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
 * ```
 */
function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

/**
 * Creates a Vite plugin that generates TypeDoc documentation with HMR support.
 * Only triggers regeneration when file contents actually change.
 *
 * @returns A Vite plugin configuration object
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite'
 *
 * export default defineConfig({
 *   plugins: [typeDocVitePlugin()],
 * })
 * ```
 */
function typeDocVitePlugin(): PluginOption {
  const serverRef: { current: ViteDevServer | null } = { current: null }
  const fileHashCache = new Map<string, string>()

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
      out: 'public',
      skipErrorChecking: true,
      tsconfig: 'tsconfig.json',
      plugin: ['typedoc-plugin-mermaid'],
    })

    const project = await app.convert()
    if (!project) throw new Error('convert failed')

    await app.generateDocs(project, 'public')
    serverRef.current?.ws.send({ type: 'full-reload' })
  }

  /**
   * Creates a debounced version of a function.
   *
   * @param ms - The debounce delay in milliseconds
   * @param fn - The function to debounce
   * @returns A debounced function
   */
  const debounce = (ms: number, fn: () => void) => {
    const state: { id: NodeJS.Timeout | undefined } = { id: undefined }
    return () => {
      const id = state.id
      if (id !== undefined) clearTimeout(id)
      state.id = setTimeout(fn, ms)
    }
  }
  const runDebounced = debounce(200, () => void run())

  const absPackages = path.resolve('../../packages')

  /**
   * Checks if a file's content has changed by comparing its hash.
   *
   * @param filePath - The absolute path to the file
   * @returns Promise resolving to true if content changed, false otherwise
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
    async buildStart() {
      await run()
    },
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

          const publicRoot = path.join(server.config.root, 'public')
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
