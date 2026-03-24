import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type FormatOptions } from 'oxfmt'
import { register } from 'tsx/esm/api'
import * as z from 'zod'

const ConfigSchema = z
  .object({
    input: z.custom<`${string}.yaml` | `${string}.json` | `${string}.tsp`>(
      (v) =>
        typeof v === 'string' && (v.endsWith('.yaml') || v.endsWith('.json') || v.endsWith('.tsp')),
      { message: 'must be .yaml | .json | .tsp' },
    ),
    basePath: z.string().exactOptional(),
    format: z.custom<FormatOptions>(() => true).exactOptional(),
    'zod-openapi': z
      .object({
        output: z
          .custom<`${string}.ts`>((v) => typeof v === 'string' && v.endsWith('.ts'), {
            message: 'must be .ts file',
          })
          .exactOptional(),
        readonly: z.boolean().exactOptional(),
        template: z
          .object({
            test: z.boolean().default(false),
            routeHandler: z.boolean().default(false),
            pathAlias: z.string().exactOptional(),
            framework: z.enum(['vitest', 'bun']).default('vitest').exactOptional(),
          })
          .exactOptional(),
        // OpenAPI Components Object order
        exportSchemas: z.boolean().exactOptional(),
        exportSchemasTypes: z.boolean().exactOptional(),
        exportResponses: z.boolean().exactOptional(),
        exportParameters: z.boolean().exactOptional(),
        exportParametersTypes: z.boolean().exactOptional(),
        exportExamples: z.boolean().exactOptional(),
        exportRequestBodies: z.boolean().exactOptional(),
        exportHeaders: z.boolean().exactOptional(),
        exportHeadersTypes: z.boolean().exactOptional(),
        exportSecuritySchemes: z.boolean().exactOptional(),
        exportLinks: z.boolean().exactOptional(),
        exportCallbacks: z.boolean().exactOptional(),
        exportPathItems: z.boolean().exactOptional(),
        exportMediaTypes: z.boolean().exactOptional(),
        exportMediaTypesTypes: z.boolean().exactOptional(),
        routes: z
          .object({
            output: z.string(),
            split: z.boolean().exactOptional(),
            import: z.string().exactOptional(),
          })
          .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
            message: 'split mode requires directory, not .ts file',
          })
          .exactOptional(),
        components: z
          .object({
            schemas: z
              .object({
                output: z.string(),
                exportTypes: z.boolean().exactOptional(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            parameters: z
              .object({
                output: z.string(),
                exportTypes: z.boolean().exactOptional(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            headers: z
              .object({
                output: z.string(),
                exportTypes: z.boolean().exactOptional(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            securitySchemes: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            requestBodies: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            responses: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            examples: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            links: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            callbacks: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            pathItems: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            mediaTypes: z
              .object({
                output: z.string(),
                exportTypes: z.boolean().exactOptional(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            webhooks: z
              .object({
                output: z.string(),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .exactOptional(),
          })
          .exactOptional(),
      })
      .refine((v) => !(v.output && v.routes), {
        message:
          'output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
      })
      .exactOptional(),
    type: z
      .object({
        readonly: z.boolean().exactOptional(),
        output: z.custom<`${string}.ts`>((v) => typeof v === 'string' && v.endsWith('.ts'), {
          message: 'must be .ts file',
        }),
      })
      .exactOptional(),
    rpc: z
      .object({
        output: z.string(),
        import: z.string(),
        split: z.boolean().exactOptional(),
        client: z.string().exactOptional(),
        parseResponse: z.boolean().exactOptional(),
      })
      .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
        message: 'split mode requires directory, not .ts file',
      })
      .exactOptional(),
    swr: z
      .object({
        output: z.string(),
        import: z.string(),
        split: z.boolean().exactOptional(),
        client: z.string().exactOptional(),
      })
      .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
        message: 'split mode requires directory, not .ts file',
      })
      .exactOptional(),
    'tanstack-query': z
      .object({
        output: z.string(),
        import: z.string(),
        split: z.boolean().exactOptional(),
        client: z.string().exactOptional(),
      })
      .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
        message: 'split mode requires directory, not .ts file',
      })
      .exactOptional(),
    'svelte-query': z
      .object({
        output: z.string(),
        import: z.string(),
        split: z.boolean().exactOptional(),
        client: z.string().exactOptional(),
      })
      .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
        message: 'split mode requires directory, not .ts file',
      })
      .exactOptional(),
    'vue-query': z
      .object({
        output: z.string(),
        import: z.string(),
        split: z.boolean().exactOptional(),
        client: z.string().exactOptional(),
      })
      .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
        message: 'split mode requires directory, not .ts file',
      })
      .exactOptional(),
    test: z
      .object({
        output: z.string(),
        import: z.string(),
        framework: z.enum(['vitest', 'bun']).default('vitest').exactOptional(),
      })
      .exactOptional(),
    mock: z
      .object({
        output: z.string(),
      })
      .exactOptional(),
    docs: z
      .object({
        output: z.custom<`${string}.md`>((v) => typeof v === 'string' && v.endsWith('.md'), {
          message: 'must be .md file',
        }),
        entry: z.string().exactOptional(),
        curl: z.boolean().default(false).exactOptional(),
        baseUrl: z.string().exactOptional(),
      })
      .refine((v) => !(v.curl === true && v.entry !== undefined), {
        message: 'entry cannot be specified when curl is true',
      })
      .refine((v) => !(v.curl === true && v.baseUrl === undefined), {
        message: 'baseUrl is required when curl is true',
      })
      .exactOptional(),
  })
  .transform((config) => {
    const normalize = <T extends { output: string; split?: boolean }>(v: T) => ({
      ...v,
      output: v.split !== true && !v.output.endsWith('.ts') ? `${v.output}/index.ts` : v.output,
    })

    const normalized = Object.fromEntries(
      (
        ['rpc', 'swr', 'tanstack-query', 'svelte-query', 'vue-query', 'test', 'mock'] as const
      ).flatMap((k) => {
        const v = config[k]
        return v !== undefined ? [[k, normalize(v)]] : []
      }),
    )

    return {
      ...config,
      ...(config['zod-openapi'] && {
        'zod-openapi': {
          ...config['zod-openapi'],
          ...(config['zod-openapi'].routes && {
            routes: normalize(config['zod-openapi'].routes),
          }),
          ...(config['zod-openapi'].components && {
            components: Object.fromEntries(
              Object.entries(config['zod-openapi'].components).flatMap(([k, v]) =>
                v === undefined || typeof v !== 'object' || v === null
                  ? []
                  : [[k, normalize(v satisfies { output: string; split?: boolean })]],
              ),
            ),
          }),
        },
      }),
      ...normalized,
    }
  })
  .readonly()

export type Config = z.infer<typeof ConfigSchema>
type ConfigInput = z.input<typeof ConfigSchema>

/**
 * Validates and parses a hono-takibi configuration object.
 */
export function parseConfig(
  config: unknown,
): { readonly ok: true; readonly value: Config } | { readonly ok: false; readonly error: string } {
  const result = ConfigSchema.safeParse(config)
  if (!result.success) {
    const issue = result.error.issues[0]
    const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : ''
    return { ok: false, error: `Invalid config: ${path}${issue.message}` }
  }
  return { ok: true, value: result.data }
}

/**
 * Dynamic import wrapper that avoids Vite's static analysis.
 * Vite warns about dynamic imports it cannot analyze at build time.
 * Using an indirect call prevents the warning since Vite only analyzes
 * direct `import()` expressions.
 */
// eslint-disable-next-line typescript-eslint/no-implied-eval
const dynamicImport = (specifier: string): Promise<{ readonly default: unknown }> =>
  new Function('specifier', 'return import(specifier)')(specifier)

/**
 * Reads and validates the hono-takibi configuration from hono-takibi.config.ts.
 */
export async function readConfig(): Promise<
  { readonly ok: true; readonly value: Config } | { readonly ok: false; readonly error: string }
> {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) return { ok: false, error: `Config not found: ${abs}` }

  try {
    register()
    const url = pathToFileURL(abs).href
    const mod = await dynamicImport(url)
    if (!('default' in mod) || mod.default === undefined)
      return { ok: false, error: 'Config must export default object' }

    return parseConfig(mod.default)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/**
 * Helper to define a config with full type completion.
 */
export function defineConfig(config: ConfigInput) {
  return config
}
