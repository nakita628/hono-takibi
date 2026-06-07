import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type FormatConfig } from 'oxfmt'
import * as z from 'zod'

const DirectoryOutputSchema = z.string().regex(/^(?!.*\.ts$).+/, {
  error: 'split mode requires directory, not .ts file',
})

const FileOutputSchema = z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`))

const OutputSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true),
        output: DirectoryOutputSchema,
        import: z.string().exactOptional(),
      })
      .readonly(),
    z
      .object({
        split: z.literal(false).optional().default(false),
        output: FileOutputSchema,
        import: z.string().exactOptional(),
      })
      .readonly(),
  ])
  .exactOptional()

const ExportTypesOutputSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true),
        output: DirectoryOutputSchema,
        import: z.string().exactOptional(),
        exportTypes: z.boolean().default(false),
      })
      .readonly(),
    z
      .object({
        split: z.literal(false).optional().default(false),
        output: FileOutputSchema,
        import: z.string().exactOptional(),
        exportTypes: z.boolean().default(false),
      })
      .readonly(),
  ])
  .exactOptional()

const HooksSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true),
        output: DirectoryOutputSchema,
        import: z.string(),
        client: z.string().default('client'),
      })
      .readonly(),
    z
      .object({
        split: z.literal(false).optional().default(false),
        output: FileOutputSchema,
        import: z.string(),
        client: z.string().default('client'),
      })
      .readonly(),
  ])
  .exactOptional()

const RpcSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true),
        output: DirectoryOutputSchema,
        import: z.string(),
        client: z.string().default('client'),
        parseResponse: z.boolean().default(false),
        docs: z.boolean().default(false),
      })
      .readonly(),
    z
      .object({
        split: z.literal(false).optional().default(false),
        output: FileOutputSchema,
        import: z.string(),
        client: z.string().default('client'),
        parseResponse: z.boolean().default(false),
        docs: z.boolean().default(false),
      })
      .readonly(),
  ])
  .exactOptional()

// OpenAPI 3.x Components Object kinds, in `openapi/index.ts` `Components` declaration order.
const COMPONENT_PER_TYPE_KEYS = [
  'schemas',
  'responses',
  'parameters',
  'examples',
  'requestBodies',
  'headers',
  'securitySchemes',
  'links',
  'callbacks',
  'pathItems',
  'mediaTypes',
] as const

const ConfigSchema = z
  .object({
    input: z.templateLiteral([z.string().min(1), z.enum(['.yaml', '.json', '.tsp'])], {
      error: 'must be .yaml | .json | .tsp',
    }),
    basePath: z.string().default('/'),
    format: z.custom<FormatConfig>(() => true).exactOptional(),
    'zod-openapi': z
      .object({
        output: z
          .templateLiteral([z.string().min(1), z.enum(['.ts'])], { error: 'must be .ts file' })
          .exactOptional(),
        readonly: z.boolean().exactOptional(),
        template: z
          .object({
            test: z.boolean().default(false),
            routeHandler: z.boolean().default(false),
            define: z.boolean().default(false),
            output: z
              .string()
              .regex(/^(?!.*\.ts$).+/, {
                error: 'template.output must be a directory, not a .ts file',
              })
              .exactOptional(),
            pathAlias: z.string().exactOptional(),
            testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
          })
          .readonly()
          .refine((v) => !(v.define && v.routeHandler), {
            message:
              'define and routeHandler are mutually exclusive. Use define for defineOpenAPIRoute output, or routeHandler for RouteHandler exports.',
          })
          .refine((v) => !(v.output && !v.define), {
            message: 'template.output is only supported with template.define: true.',
          })
          .exactOptional(),
        exportSchemas: z.boolean().default(false),
        exportSchemasTypes: z.boolean().default(false),
        exportResponses: z.boolean().default(false),
        exportParameters: z.boolean().default(false),
        exportParametersTypes: z.boolean().default(false),
        exportExamples: z.boolean().default(false),
        exportRequestBodies: z.boolean().default(false),
        exportHeaders: z.boolean().default(false),
        exportHeadersTypes: z.boolean().default(false),
        exportSecuritySchemes: z.boolean().default(false),
        exportLinks: z.boolean().default(false),
        exportCallbacks: z.boolean().default(false),
        exportPathItems: z.boolean().default(false),
        exportMediaTypes: z.boolean().default(false),
        exportMediaTypesTypes: z.boolean().default(false),
        routes: OutputSchema,
        webhooks: OutputSchema,
        components: z
          .object({
            output: z
              .templateLiteral([z.string().min(1), z.enum(['.ts'])], { error: 'must be .ts file' })
              .exactOptional(),
            schemas: ExportTypesOutputSchema,
            responses: OutputSchema,
            parameters: ExportTypesOutputSchema,
            examples: OutputSchema,
            requestBodies: OutputSchema,
            headers: ExportTypesOutputSchema,
            securitySchemes: OutputSchema,
            links: OutputSchema,
            callbacks: OutputSchema,
            pathItems: OutputSchema,
            mediaTypes: ExportTypesOutputSchema,
          })
          .readonly()
          .refine((v) => !(v.output && COMPONENT_PER_TYPE_KEYS.some((k) => v[k] !== undefined)), {
            message:
              'components.output is mutually exclusive with per-type component outputs (schemas, responses, ...). Use output for single-file mode, or per-type fields for split mode.',
          })
          .exactOptional(),
      })
      .readonly()
      .refine((v) => !(v.output && v.routes), {
        message:
          'output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
      })
      .refine((v) => !(v.template?.define && !v.output), {
        message:
          'template.define requires zod-openapi.output (the app entry file, e.g. ./src/index.ts).',
      })
      .exactOptional(),
    type: z
      .object({
        readonly: z.boolean().exactOptional(),
        output: z.templateLiteral([z.string().min(1), z.enum(['.ts'])], {
          error: 'must be .ts file',
        }),
      })
      .readonly()
      .exactOptional(),
    rpc: RpcSchema,
    swr: HooksSchema,
    'tanstack-query': HooksSchema,
    'preact-query': HooksSchema,
    'solid-query': HooksSchema,
    'vue-query': HooksSchema,
    'svelte-query': HooksSchema,
    'angular-query': HooksSchema,
    test: z
      .object({
        output: FileOutputSchema,
        import: z.string(),
        testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
      })
      .readonly()
      .exactOptional(),
    mock: z
      .object({
        output: FileOutputSchema,
      })
      .readonly()
      .exactOptional(),
    docs: z
      .discriminatedUnion('curl', [
        z
          .object({
            output: z.templateLiteral([z.string().min(1), z.enum(['.md'])], {
              error: 'must be .md file',
            }),
            curl: z.literal(true),
            baseUrl: z.string({ error: 'baseUrl is required when curl is true' }),
            entry: z.never({ error: 'entry cannot be specified when curl is true' }).optional(),
          })
          .readonly(),
        z
          .object({
            output: z.templateLiteral([z.string().min(1), z.enum(['.md'])], {
              error: 'must be .md file',
            }),
            curl: z.literal(false).default(false).optional(),
            entry: z.string().exactOptional(),
            baseUrl: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
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

export async function readConfig() {
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) return { ok: false, error: `Config not found: ${abs}` } as const
  try {
    const mod = await import(pathToFileURL(abs).href)
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

export function defineConfig(config: z.input<typeof ConfigSchema>) {
  return config
}
