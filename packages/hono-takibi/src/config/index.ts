import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'

type Config = {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output?: `${string}.ts`
    readonly readonly?: boolean
    readonly exportSchemas?: boolean
    readonly exportSchemasTypes?: boolean
    readonly exportParameters?: boolean
    readonly exportParametersTypes?: boolean
    readonly exportSecuritySchemes?: boolean
    readonly exportRequestBodies?: boolean
    readonly exportResponses?: boolean
    readonly exportHeaders?: boolean
    readonly exportHeadersTypes?: boolean
    readonly exportExamples?: boolean
    readonly exportLinks?: boolean
    readonly exportCallbacks?: boolean
    readonly routes?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
    }
    readonly components?: {
      // # Reusable schemas (data models)
      readonly schemas?: {
        readonly output: string | `${string}.ts`
        readonly exportTypes?: boolean
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable path, query, header and cookie parameters
      readonly parameters?: {
        readonly output: string | `${string}.ts`
        readonly exportTypes?: boolean
        readonly split?: boolean
        readonly import?: string
      }
      // # Security scheme definitions (see Authentication)
      readonly securitySchemes?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable request bodies
      readonly requestBodies?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable responses, such as 401 Unauthorized or 400 Bad Request
      readonly responses?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable response headers
      readonly headers?: {
        readonly output: string | `${string}.ts`
        readonly exportTypes?: boolean
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable examples
      readonly examples?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable links
      readonly links?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
      // # Reusable callbacks
      readonly callbacks?: {
        readonly output: string | `${string}.ts`
        readonly split?: boolean
        readonly import?: string
      }
    }
  }
  readonly type?: {
    readonly output: `${string}.ts`
  }
  readonly rpc?: {
    readonly output: string | `${string}.ts`
    readonly import: string
    readonly split?: boolean
  }
}

/**
 * Validates and parses a hono-takibi configuration object.
 * When split is false and output doesn't end with .ts, normalizes to {output}/index.ts.
 *
 * @param config - The configuration object to validate
 * @returns Result object with validated and normalized config or error message
 */
export function parseConfig(
  config: Config,
): { readonly ok: true; readonly value: Config } | { readonly ok: false; readonly error: string } {
  const isYamlOrJsonOrTsp = (
    i: unknown,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    typeof i === 'string' && (i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp'))

  const isTs = (o: unknown): o is `${string}.ts` => typeof o === 'string' && o.endsWith('.ts')

  const validateComponentsValue = <
    K extends
      | 'schemas'
      | 'parameters'
      | 'securitySchemes'
      | 'requestBodies'
      | 'responses'
      | 'headers'
      | 'examples'
      | 'links'
      | 'callbacks',
  >(
    k: K,
    v?: K extends 'schemas' | 'parameters' | 'headers'
      ? {
          readonly output: string | `${string}.ts`
          readonly exportTypes?: boolean
          readonly split?: boolean
          readonly import?: string
        }
      : {
          readonly output: string | `${string}.ts`
          readonly split?: boolean
          readonly import?: string
        },
  ): { readonly ok: true } | { readonly ok: false; readonly error: string } => {
    if (v === undefined)
      return { ok: false, error: `Invalid config: zod-openapi.components.${k} is undefined` }

    if (k === 'schemas' || k === 'parameters' || k === 'headers') {
      const exportTypesValue = 'exportTypes' in v ? v.exportTypes : undefined
      if (exportTypesValue !== undefined && typeof exportTypesValue !== 'boolean') {
        return {
          ok: false,
          error: `Invalid exportTypes format for components.${k}: ${String(exportTypesValue)}`,
        }
      }
    }

    const splitValue = v.split
    if (splitValue !== undefined && typeof splitValue !== 'boolean') {
      return {
        ok: false,
        error: `Invalid split format for components.${k}: ${String(splitValue)}`,
      }
    }

    // split: true requires directory (no .ts)
    if (splitValue === true && isTs(v.output)) {
      return {
        ok: false,
        error: `Invalid ${k} output path for split mode (must be a directory, not .ts): ${v.output}`,
      }
    }

    if (v.import !== undefined && typeof v.import !== 'string') {
      return {
        ok: false,
        error: `Invalid import format for components.${k}: ${String(v.import)}`,
      }
    }

    return { ok: true }
  }

  if (!isYamlOrJsonOrTsp(config.input)) {
    return {
      ok: false,
      error: `Invalid input: ${String(config.input)} (must be .yaml | .json | .tsp)`,
    }
  }

  // zod-openapi
  if (config['zod-openapi'] !== undefined) {
    if (
      config['zod-openapi'].readonly !== undefined &&
      typeof config['zod-openapi'].readonly !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid readonly format for zod-openapi: ${String(config['zod-openapi'].readonly)}`,
      }
    }

    if (
      config['zod-openapi'].exportSchemasTypes !== undefined &&
      typeof config['zod-openapi'].exportSchemasTypes !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportSchemasTypes format for zod-openapi: ${String(config['zod-openapi'].exportSchemasTypes)}`,
      }
    }

    if (
      config['zod-openapi'].exportSchemas !== undefined &&
      typeof config['zod-openapi'].exportSchemas !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportSchemas format for zod-openapi: ${String(config['zod-openapi'].exportSchemas)}`,
      }
    }

    if (
      config['zod-openapi'].exportParametersTypes !== undefined &&
      typeof config['zod-openapi'].exportParametersTypes !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportParametersTypes format for zod-openapi: ${String(config['zod-openapi'].exportParametersTypes)}`,
      }
    }

    if (
      config['zod-openapi'].exportParameters !== undefined &&
      typeof config['zod-openapi'].exportParameters !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportParameters format for zod-openapi: ${String(config['zod-openapi'].exportParameters)}`,
      }
    }

    if (
      config['zod-openapi'].exportSecuritySchemes !== undefined &&
      typeof config['zod-openapi'].exportSecuritySchemes !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportSecuritySchemes format for zod-openapi: ${String(config['zod-openapi'].exportSecuritySchemes)}`,
      }
    }

    if (
      config['zod-openapi'].exportRequestBodies !== undefined &&
      typeof config['zod-openapi'].exportRequestBodies !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportRequestBodies format for zod-openapi: ${String(config['zod-openapi'].exportRequestBodies)}`,
      }
    }
    if (
      config['zod-openapi'].exportResponses !== undefined &&
      typeof config['zod-openapi'].exportResponses !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportResponses format for zod-openapi: ${String(config['zod-openapi'].exportResponses)}`,
      }
    }

    if (
      config['zod-openapi'].exportHeadersTypes !== undefined &&
      typeof config['zod-openapi'].exportHeadersTypes !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportHeadersTypes format for zod-openapi: ${String(config['zod-openapi'].exportHeadersTypes)}`,
      }
    }

    if (
      config['zod-openapi'].exportHeaders !== undefined &&
      typeof config['zod-openapi'].exportHeaders !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportHeaders format for zod-openapi: ${String(config['zod-openapi'].exportHeaders)}`,
      }
    }

    if (
      config['zod-openapi'].exportExamples !== undefined &&
      typeof config['zod-openapi'].exportExamples !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportExamples format for zod-openapi: ${String(config['zod-openapi'].exportExamples)}`,
      }
    }

    if (
      config['zod-openapi'].exportLinks !== undefined &&
      typeof config['zod-openapi'].exportLinks !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportLinks format for zod-openapi: ${String(config['zod-openapi'].exportLinks)}`,
      }
    }
    if (
      config['zod-openapi'].exportCallbacks !== undefined &&
      typeof config['zod-openapi'].exportCallbacks !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid exportCallbacks format for zod-openapi: ${String(config['zod-openapi'].exportCallbacks)}`,
      }
    }
  }

  if (config['zod-openapi']?.routes !== undefined) {
    if (
      config['zod-openapi'].routes.split !== undefined &&
      typeof config['zod-openapi'].routes.split !== 'boolean'
    ) {
      return {
        ok: false,
        error: `Invalid split format for routes: ${String(config['zod-openapi'].routes.split)}`,
      }
    }
    // split: true requires directory (no .ts)
    if (config['zod-openapi'].routes.split === true && isTs(config['zod-openapi'].routes.output)) {
      return {
        ok: false,
        error: `Invalid routes output path for split mode (must be a directory, not .ts): ${config['zod-openapi'].routes.output}`,
      }
    }
  }

  if (config['zod-openapi']?.components !== undefined) {
    for (const k in config['zod-openapi'].components) {
      if (
        k === 'schemas' ||
        k === 'parameters' ||
        k === 'securitySchemes' ||
        k === 'requestBodies' ||
        k === 'responses' ||
        k === 'headers' ||
        k === 'examples' ||
        k === 'links' ||
        k === 'callbacks'
      ) {
        const result = validateComponentsValue(k, config['zod-openapi'].components[k])
        if (!result.ok) return { ok: false, error: result.error }
      }
    }
  }

  // type
  if (config.type !== undefined) {
    if (!isTs(config.type.output)) {
      return {
        ok: false,
        error: `Invalid type output format: ${String(config.type.output)} (must be .ts file)`,
      }
    }
  }

  // rpc
  if (config.rpc !== undefined) {
    if (typeof config.rpc.output !== 'string') {
      return { ok: false, error: `Invalid output format for rpc: ${String(config.rpc.output)}` }
    }
    if (typeof config.rpc.import !== 'string') {
      return { ok: false, error: `Invalid import format for rpc: ${String(config.rpc.import)}` }
    }
    if (config.rpc.split !== undefined && typeof config.rpc.split !== 'boolean') {
      return { ok: false, error: `Invalid split format for rpc: ${String(config.rpc.split)}` }
    }
    // split: true requires directory (no .ts)
    if (config.rpc.split === true && isTs(config.rpc.output)) {
      return {
        ok: false,
        error: `Invalid rpc output path for split mode (must be a directory, not .ts): ${config.rpc.output}`,
      }
    }
  }

  const result = {
    ...config,
    ...(config['zod-openapi'] && {
      'zod-openapi': {
        ...config['zod-openapi'],
        ...(config['zod-openapi'].routes && {
          routes: {
            ...config['zod-openapi'].routes,
            output:
              config['zod-openapi'].routes.split !== true &&
              !isTs(config['zod-openapi'].routes.output)
                ? `${config['zod-openapi'].routes.output}/index.ts`
                : config['zod-openapi'].routes.output,
          },
        }),
        ...(config['zod-openapi'].components && {
          components: {
            ...config['zod-openapi'].components,
            ...(config['zod-openapi'].components.schemas && {
              schemas: {
                ...config['zod-openapi'].components.schemas,
                output:
                  config['zod-openapi'].components.schemas.split !== true &&
                  !isTs(config['zod-openapi'].components.schemas.output)
                    ? `${config['zod-openapi'].components.schemas.output}/index.ts`
                    : config['zod-openapi'].components.schemas.output,
              },
            }),
            ...(config['zod-openapi'].components.parameters && {
              parameters: {
                ...config['zod-openapi'].components.parameters,
                output:
                  config['zod-openapi'].components.parameters.split !== true &&
                  !isTs(config['zod-openapi'].components.parameters.output)
                    ? `${config['zod-openapi'].components.parameters.output}/index.ts`
                    : config['zod-openapi'].components.parameters.output,
              },
            }),
            ...(config['zod-openapi'].components.securitySchemes && {
              securitySchemes: {
                ...config['zod-openapi'].components.securitySchemes,
                output:
                  config['zod-openapi'].components.securitySchemes.split !== true &&
                  !isTs(config['zod-openapi'].components.securitySchemes.output)
                    ? `${config['zod-openapi'].components.securitySchemes.output}/index.ts`
                    : config['zod-openapi'].components.securitySchemes.output,
              },
            }),
            ...(config['zod-openapi'].components.requestBodies && {
              requestBodies: {
                ...config['zod-openapi'].components.requestBodies,
                output:
                  config['zod-openapi'].components.requestBodies.split !== true &&
                  !isTs(config['zod-openapi'].components.requestBodies.output)
                    ? `${config['zod-openapi'].components.requestBodies.output}/index.ts`
                    : config['zod-openapi'].components.requestBodies.output,
              },
            }),
            ...(config['zod-openapi'].components.responses && {
              responses: {
                ...config['zod-openapi'].components.responses,
                output:
                  config['zod-openapi'].components.responses.split !== true &&
                  !isTs(config['zod-openapi'].components.responses.output)
                    ? `${config['zod-openapi'].components.responses.output}/index.ts`
                    : config['zod-openapi'].components.responses.output,
              },
            }),
            ...(config['zod-openapi'].components.headers && {
              headers: {
                ...config['zod-openapi'].components.headers,
                output:
                  config['zod-openapi'].components.headers.split !== true &&
                  !isTs(config['zod-openapi'].components.headers.output)
                    ? `${config['zod-openapi'].components.headers.output}/index.ts`
                    : config['zod-openapi'].components.headers.output,
              },
            }),
            ...(config['zod-openapi'].components.examples && {
              examples: {
                ...config['zod-openapi'].components.examples,
                output:
                  config['zod-openapi'].components.examples.split !== true &&
                  !isTs(config['zod-openapi'].components.examples.output)
                    ? `${config['zod-openapi'].components.examples.output}/index.ts`
                    : config['zod-openapi'].components.examples.output,
              },
            }),
            ...(config['zod-openapi'].components.links && {
              links: {
                ...config['zod-openapi'].components.links,
                output:
                  config['zod-openapi'].components.links.split !== true &&
                  !isTs(config['zod-openapi'].components.links.output)
                    ? `${config['zod-openapi'].components.links.output}/index.ts`
                    : config['zod-openapi'].components.links.output,
              },
            }),
            ...(config['zod-openapi'].components.callbacks && {
              callbacks: {
                ...config['zod-openapi'].components.callbacks,
                output:
                  config['zod-openapi'].components.callbacks.split !== true &&
                  !isTs(config['zod-openapi'].components.callbacks.output)
                    ? `${config['zod-openapi'].components.callbacks.output}/index.ts`
                    : config['zod-openapi'].components.callbacks.output,
              },
            }),
          },
        }),
      },
    }),
    ...(config.rpc && {
      rpc: {
        ...config.rpc,
        output:
          config.rpc.split !== true && !isTs(config.rpc.output)
            ? `${config.rpc.output}/index.ts`
            : config.rpc.output,
      },
    }),
  }

  return {
    ok: true,
    value: result,
  }
}

/**
 * Reads and validates the hono-takibi configuration from hono-takibi.config.ts.
 *
 * @returns Result object with validated config or error message
 */
export async function readConfig(): Promise<
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
  if (!existsSync(abs)) return { ok: false, error: `Config not found: ${abs}` }

  try {
    register()
    const url = pathToFileURL(abs).href
    const mod: { readonly default: Config } = await import(/* @vite-ignore */ url)
    if (!('default' in mod) || mod.default === undefined)
      return { ok: false, error: 'Config must export default object' }
    const result = parseConfig(mod.default)
    if (!result.ok) return { ok: false, error: result.error }
    return { ok: true, value: result.value }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/**
 * Helper to define a config with full type completion.
 *
 * @param config - The configuration object
 * @returns The same configuration object (identity function for type inference)
 */
export function defineConfig(config: Config): Config {
  return config
}
