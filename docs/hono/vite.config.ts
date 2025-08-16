// vite.config.ts

import fsp from 'node:fs/promises'
import path from 'node:path'
import devServer from '@hono/vite-dev-server'
import { Application } from 'typedoc'
import { defineConfig, type PluginOption, type ViteDevServer } from 'vite'

export default defineConfig({
  plugins: [typeDocVitePlugin(), devServer({ entry: 'src/index.ts' })],
})

function typeDocVitePlugin(): PluginOption {
  const serverRef: { current: ViteDevServer | null } = { current: null }

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

  return {
    name: 'typedoc-hmr',
    async buildStart() {
      await run()
    },
    configureServer(server) {
      serverRef.current = server

      server.watcher.add(absPackages)
      server.watcher.on('change', (file) => {
        if (file.endsWith('.ts') && file.includes(`${path.sep}packages${path.sep}`)) {
          runDebounced()
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
