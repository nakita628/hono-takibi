import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'

type Config = {
  'zod-openapi'?: {
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
  // swr?: {
  //   input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  //   output: `${string}.ts`
  //   import: string
  // }
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

  if (!existsSync(abs)) {
    return { ok: false, error: `Config not found: ${abs}` }
  }

  register()

  try {
    const mod: { default: Config } = await import(pathToFileURL(abs).href)
    const isYamlOrJsonOrTsp = (
      i: string,
    ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
      i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
    const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')

    if (mod.default !== undefined) {
      // zod-openapi
      if (mod.default['zod-openapi']) {
        if (!isYamlOrJsonOrTsp(mod.default['zod-openapi'].input)) {
          return {
            ok: false,
            error: `Invalid input format for zod-openapi: ${mod.default['zod-openapi'].input}`,
          }
        }
        if (!isTs(mod.default['zod-openapi'].output)) {
          return {
            ok: false,
            error: `Invalid output format for zod-openapi: ${mod.default['zod-openapi'].output}`,
          }
        }
        if (mod.default['zod-openapi'].exportSchema !== undefined) {
          if (typeof mod.default['zod-openapi'].exportSchema !== 'boolean') {
            return {
              ok: false,
              error: `Invalid exportSchema format for zod-openapi: ${mod.default['zod-openapi'].exportSchema}`,
            }
          }
        }
        if (mod.default['zod-openapi'].exportType !== undefined) {
          if (typeof mod.default['zod-openapi'].exportType !== 'boolean') {
            return {
              ok: false,
              error: `Invalid exportType format for zod-openapi: ${mod.default['zod-openapi'].exportType}`,
            }
          }
        }
      }
      // rpc
      if (mod.default.rpc) {
        if (!isYamlOrJsonOrTsp(mod.default.rpc.input)) {
          return {
            ok: false,
            error: `Invalid input format for rpc: ${mod.default.rpc.input}`,
          }
        }
        if (!isTs(mod.default.rpc.output)) {
          return {
            ok: false,
            error: `Invalid output format for rpc: ${mod.default.rpc.output}`,
          }
        }
        if (mod.default.rpc.import !== undefined) {
          if (typeof mod.default.rpc.import !== 'string') {
            return {
              ok: false,
              error: `Invalid import format for rpc: ${mod.default.rpc.import}`,
            }
          }
        }
      }
    }

    // if (!('default' in mod)) {
    //   return { ok: false, error: 'Config must export default object' }
    // }
    return { ok: true, value: mod.default }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export default function defineConfig(config: Config): Config {
  return config
}
