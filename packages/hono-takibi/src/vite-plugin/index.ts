import type { Config } from '../config/index.js'
import { getConfig } from '../config/index.js'
import { viteMode } from './vite-mode.js'

export default function honoTakibiPlugin() {
  return {
    name: 'hono-takibi-plugin',
    // biome-ignore lint:
    configureServer(server: any) {
      const config: Config = getConfig()
      server.watcher.on('change', () => {
        viteMode({
          ...config,
        })
      })
    },
  }
}
