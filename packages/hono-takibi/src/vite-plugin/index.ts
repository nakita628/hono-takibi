import type { Config } from '../config/index.js'
import { getConfig } from '../config/index.js'
import { viteMode } from './vite-mode.js'
import type { ViteDevServer } from 'vite'

export default function HonoTakibiVite(settings?: Config) {
  const config: Config = settings ?? getConfig()
  return {
    name: 'hono-takibi-vite',
    configureServer(server: ViteDevServer) {
      server.watcher.on('change', () => {
        viteMode({
          ...config,
        })
      })
    },
  }
}
