import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { register } from 'tsx/esm/api'
import { pathToFileURL } from 'node:url'

type Config = {
  'hono-takibi'?: {
    input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    output: `${string}.ts`
    exportType?: boolean
    exportSchema?: boolean
  }
  rpc?: {
    input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    output: `${string}.ts`
    import: string
  }
}

export async function config() {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')

  if (!existsSync(abs)) {
    return { ok: false, error: `Config not found: ${abs}` }
  }

  register()

  try {
    const mod = await import(pathToFileURL(abs).href)
    console.log(mod)
    if (!('default' in mod)) {
      return { ok: false, error: 'Config must export default object' }
    }
    return { ok: true, value: mod.default }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}


export function defineConfig(config: Config): Config {
  return config
}
