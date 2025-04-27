import type { Config } from '../config/index.js'
import { getConfig } from '../config/index.js'
import { viteMode } from './vite-mode.js'

export default function honoTakibiPlugin(settings?: Config) {
  return {
    name: 'hono-takibi-plugin',
    // biome-ignore lint:
    configureServer(server: any) {
      const config: Config = settings ?? getConfig()

      server.watcher.on('change', () => {
        viteMode({
          ...config,
        })
      })
    },
  }
}
