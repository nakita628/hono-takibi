import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type FormatConfig } from 'oxfmt'
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
    format: z.custom<FormatConfig>(() => true).exactOptional(),
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
            testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
          })
          .readonly()
          .exactOptional(),
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
          .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
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
              .readonly()
              .exactOptional(),
          })
          .exactOptional(),
      })
      .readonly()
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
      .readonly()
      .exactOptional(),
    rpc: z
      .object({
        output: z.string(),
        import: z.string(),
        split: z.boolean().exactOptional(),
        client: z.string().exactOptional(),
        parseResponse: z.boolean().exactOptional(),
      })
      .readonly()
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
      .readonly()
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
      .readonly()
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
      .readonly()
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
      .readonly()
      .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
        message: 'split mode requires directory, not .ts file',
      })
      .exactOptional(),
    test: z
      .object({
        output: z.string(),
        import: z.string(),
        testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
      })
      .readonly()
      .exactOptional(),
    mock: z
      .object({
        output: z.string(),
      })
      .readonly()
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
      .readonly()
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
            components: {
              ...config['zod-openapi'].components,
              ...(config['zod-openapi'].components.schemas && {
                schemas: normalize(config['zod-openapi'].components.schemas),
              }),
              ...(config['zod-openapi'].components.parameters && {
                parameters: normalize(config['zod-openapi'].components.parameters),
              }),
              ...(config['zod-openapi'].components.headers && {
                headers: normalize(config['zod-openapi'].components.headers),
              }),
              ...(config['zod-openapi'].components.securitySchemes && {
                securitySchemes: normalize(config['zod-openapi'].components.securitySchemes),
              }),
              ...(config['zod-openapi'].components.requestBodies && {
                requestBodies: normalize(config['zod-openapi'].components.requestBodies),
              }),
              ...(config['zod-openapi'].components.responses && {
                responses: normalize(config['zod-openapi'].components.responses),
              }),
              ...(config['zod-openapi'].components.examples && {
                examples: normalize(config['zod-openapi'].components.examples),
              }),
              ...(config['zod-openapi'].components.links && {
                links: normalize(config['zod-openapi'].components.links),
              }),
              ...(config['zod-openapi'].components.callbacks && {
                callbacks: normalize(config['zod-openapi'].components.callbacks),
              }),
              ...(config['zod-openapi'].components.pathItems && {
                pathItems: normalize(config['zod-openapi'].components.pathItems),
              }),
              ...(config['zod-openapi'].components.mediaTypes && {
                mediaTypes: normalize(config['zod-openapi'].components.mediaTypes),
              }),
              ...(config['zod-openapi'].components.webhooks && {
                webhooks: normalize(config['zod-openapi'].components.webhooks),
              }),
            },
          }),
        },
      }),
      ...normalized,
    }
  })
  .readonly()

export function parseConfig(config: unknown) {
  const result = ConfigSchema.safeParse(config)
  if (!result.success) {
    const issue = result.error.issues[0]
    const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : ''
    return { ok: false, error: `Invalid config: ${path}${issue.message}` } as const
  }
  return { ok: true, value: result.data } as const
}

export async function readConfig(): Promise<
  { ok: true; value: z.infer<typeof ConfigSchema> } | { ok: false; error: string }
> {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) return { ok: false, error: `Config not found: ${abs}` }
  try {
    register()
    const url = pathToFileURL(abs).href
    // eslint-disable-next-line typescript-eslint/no-implied-eval
    const mod = await new Function('specifier', 'return import(specifier)')(url)
    if (
      typeof mod !== 'object' ||
      mod === null ||
      !('default' in mod) ||
      mod.default === undefined
    ) {
      return { ok: false, error: 'Config must export default object' } as const
    }
    return parseConfig(mod.default)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

export function defineConfig(config: z.infer<typeof ConfigSchema>) {
  return config
}
