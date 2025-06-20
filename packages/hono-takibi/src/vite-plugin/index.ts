import { vite } from './vite.js'
import type { ViteDevServer } from 'vite'

export default function HonoTakibiVite(
  input: `${string}.yaml` | `${string}.json`,
  output: `${string}.ts`,
  exportType: boolean,
  exportSchema: boolean,
) {
  return {
    name: 'hono-takibi-vite',
    configureServer(server: ViteDevServer) {
      server.watcher.on('change', () => {
        vite(input, output, exportType, exportSchema)
      })
    },
  }
}
