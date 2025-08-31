import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'

type Config = {
  readonly 'zod-openapi'?: {
    readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    readonly output: `${string}.ts`
    readonly exportType?: boolean
    readonly exportSchema?: boolean
    readonly schema?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
    }
    readonly route?: {
      readonly output: string | `${string}.ts`
      readonly import: string
      readonly split?: boolean
    }
  }
  readonly rpc?: {
    readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    readonly output: `${string}.ts`
    readonly import: string
  }
  // swr?: {
  //   input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  //   output: `${string}.ts`
  //   import: string
  // }
}

export async function config(): Promise<
  | {
      readonly ok: true
      readonly value: Config
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')

  if (!existsSync(abs)) {
    return { ok: false, error: `Config not found: ${abs}` }
  }

  try {
    register()
    const mod: { readonly default: Config } = await import(pathToFileURL(abs).href)
    const isYamlOrJsonOrTsp = (
      i: string,
    ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
      i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
    const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')

    if (!('default' in mod)) {
      return { ok: false, error: 'Config must export default object' }
    }

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
        // schema
        if (mod.default['zod-openapi'].schema !== undefined) {
          // split
          if (mod.default['zod-openapi'].schema.split !== undefined) {
            if (typeof mod.default['zod-openapi'].schema.split !== 'boolean') {
              return {
                ok: false,
                error: `Invalid schema split format for zod-openapi: ${mod.default['zod-openapi'].schema.split}`,
              }
            } else {
              if (typeof mod.default['zod-openapi'].schema.output !== 'string') {
                return {
                  ok: false,
                  error: `Invalid schema output path for split mode (must be directory, not .ts file): ${mod.default['zod-openapi'].schema.output}`,
                }
              }
            }
          }
          if (isTs(mod.default['zod-openapi'].schema.output)) {
            return {
              ok: false,
              error: `Invalid schema output path for non-split mode (must be .ts file): ${mod.default['zod-openapi'].schema.output}`,
            }
          }
        }
        // route
        // if (mod.default['zod-openapi'].route !== undefined) {
        //   // import
        //   if (typeof mod.default['zod-openapi'].route.import !== 'string') {
        //     return {
        //       ok: false,
        //       error: `Invalid route import format for zod-openapi: ${mod.default['zod-openapi'].route.import}`,
        //     }
        //   }
        //   // split
        //   if (mod.default['zod-openapi'].route.split !== undefined) {
        //     if (typeof mod.default['zod-openapi'].route.split !== 'boolean') {
        //       return {
        //         ok: false,
        //         error: `Invalid route split format for zod-openapi: ${mod.default['zod-openapi'].route.split}`,
        //       }
        //     }
        //   } else {
        //     if (typeof mod.default['zod-openapi'].route.output !== 'string') {
        //       return {
        //         ok: false,
        //         error: `Invalid route output path for split mode (must be directory, not .ts file): ${mod.default['zod-openapi'].route.output}`,
        //       }
        //     }
        //   }
        //   if (isTs(mod.default['zod-openapi'].route.output)) {
        //     return {
        //       ok: false,
        //       error: `Invalid route output path for non-split mode (must be .ts file): ${mod.default['zod-openapi'].route.output}`,
        //     }
        //   }
        // }
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
        if (typeof mod.default.rpc.import !== 'string') {
          return {
            ok: false,
            error: `Invalid import format for rpc: ${mod.default.rpc.import}`,
          }
        }
      }
    }
    return { ok: true, value: mod.default }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

export default function defineConfig(config: Config): Config {
  return config
}
