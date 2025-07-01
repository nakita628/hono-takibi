import { vite } from './vite.js'
import { viteTsp } from './vite-tsp.js'
import type { ViteDevServer } from 'vite'

export default function HonoTakibiVite(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: `${string}.ts`,
  exportType: boolean,
  exportSchema: boolean,
) {
  return {
    name: 'hono-takibi-vite',
    configureServer(server: ViteDevServer) {
      server.watcher.on('change', () => {
        if (
          typeof input === 'string' &&
          ((p: `${string}.yaml` | `${string}.json` | `${string}.tsp`): p is `${string}.tsp` =>
            p.endsWith('.tsp'))(input)
        ) {
          viteTsp(input, output, exportType, exportSchema)
        } else {
          vite(input, output, exportType, exportSchema)
        }
      })
    },
  }
}
