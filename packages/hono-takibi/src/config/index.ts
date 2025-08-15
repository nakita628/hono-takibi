import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'

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
  swr?: {
    input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    output: `${string}.ts`
    import: string
  }
}

export async function config(): Promise<
  | {
      ok: true
      value: Config
    }
  | {
      ok: false
      error: string
    }
> {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')

  // if (!existsSync(abs)) {
  //   return { ok: false, error: `Config not found: ${abs}` }
  // }

  register()

  try {
    const mod: { default: Config } = await import(pathToFileURL(abs).href)

    if (!('default' in mod)) {
      return { ok: false, error: 'Config must export default object' }
    }
    return { ok: true, value: mod.default }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export default function defineConfig(config: Config): Config {
  return config
}
