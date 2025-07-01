import { vite } from './vite.js'
import { viteTsp } from './vite-tsp.js'
import type { PluginOption, ViteDevServer } from 'vite'
import path from 'node:path'

export default function HonoTakibiVite(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  exportType = true,
  exportSchema = true,
): PluginOption {
  const run = async (): Promise<void> => {
    if (
      typeof input === 'string' &&
      ((p: `${string}.yaml` | `${string}.json` | `${string}.tsp`): p is `${string}.tsp` =>
        p.endsWith('.tsp'))(input)
    ) {
      await viteTsp(input, output, exportType, exportSchema)
    } else {
      await vite(input, output, exportType, exportSchema)
    }
  }

  const debounce = (ms: number, fn: () => void): (() => void) => {
    const pool = new WeakMap<() => void, NodeJS.Timeout>()

    const wrapped = (): void => {
      const prev = pool.get(wrapped)
      if (prev !== undefined) clearTimeout(prev)
      pool.set(wrapped, setTimeout(fn, ms))
    }

    return wrapped
  }

  const runDebounced = debounce(200, () => {
    void run()
  })

  const absInput = path.resolve(input)

  return {
    name: 'hono-takibi-vite',

    async buildStart() {
      await run()
    },

    configureServer(server: ViteDevServer) {
      server.watcher.add(absInput)

      server.watcher.on('change', (file) => {
        if (path.resolve(file) === absInput) runDebounced()
      })
    },
  }
}
