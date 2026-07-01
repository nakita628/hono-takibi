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

const ConfigSchema = z
  .object({
    input: z.templateLiteral([z.string().min(1), z.enum(['.yaml', '.json', '.tsp'])], {
      error: 'must be .yaml | .json | .tsp',
    }),
    output: z
      .templateLiteral([z.string().min(1), z.enum(['.ts'])], { error: 'must be .ts file' })
      .exactOptional(),
    basePath: z.string().default('/'),
    readonly: z.boolean().exactOptional(),
    format: z.custom<FormatConfig>(() => true).exactOptional(),
    template: z
      .discriminatedUnion('define', [
        z
          .object({
            define: z.literal(true),
            test: z.boolean().default(false),
            pathAlias: z.string().exactOptional(),
            testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
          })
          .readonly(),
        z
          .object({
            define: z.literal(false).optional().default(false),
            routeHandler: z.boolean().default(false),
            test: z.boolean().default(false),
            pathAlias: z.string().exactOptional(),
            testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
          })
          .readonly(),
      ])
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
      .refine(
        (v) =>
          !(
            v.output &&
            (
              [
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
            ).some((k) => v[k] !== undefined)
          ),
        {
          message:
            'components.output is mutually exclusive with per-type component outputs (schemas, responses, ...). Use output for single-file mode, or per-type fields for split mode.',
        },
      )
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
        useExamples: z.boolean().exactOptional(),
        locale: z
          .string()
          .regex(/^[A-Za-z_]{1,40}$/, {
            error: "Invalid faker locale. Use a code like 'ja', 'en', or 'zh_CN'.",
          })
          .exactOptional(),
        delay: z
          .union([
            z.number().int().nonnegative().max(60000),
            z.literal(false),
            z
              .object({
                min: z.number().int().nonnegative().max(60000),
                max: z.number().int().nonnegative().max(60000),
              })
              .readonly()
              .refine((v) => v.min <= v.max, {
                message: 'delay.min must be <= delay.max. Swap the values or remove one.',
              }),
          ])
          .exactOptional(),
        arrayMin: z.number().int().nonnegative().max(1000).exactOptional(),
        arrayMax: z.number().int().nonnegative().max(1000).exactOptional(),
      })
      .readonly()
      .refine(
        (v) => v.arrayMin === undefined || v.arrayMax === undefined || v.arrayMin <= v.arrayMax,
        {
          message: 'arrayMin must be <= arrayMax. Swap the values or remove one.',
        },
      )
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
  .refine((v) => !(v.output && v.routes), {
    message:
      'output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
  })
  .refine((v) => !(v.template?.define === true && v.routes), {
    message:
      'template.define and routes are mutually exclusive. define derives routes/ next to the app entry (output, default src/index.ts).',
  })
  .refine(
    (v) =>
      !(
        v.template?.define === true &&
        v.output !== undefined &&
        !(v.output === 'index.ts' || v.output.endsWith('/index.ts'))
      ),
    {
      message:
        'with template.define, output is the app entry and must be an index.ts file (e.g. ./src/index.ts), or omitted to default to src/index.ts. Other names collide with the derived routes/ directory.',
    },
  )
  .refine(
    (v) =>
      !(
        v.template?.define === true &&
        v.components !== undefined &&
        (
          [
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
        ).some((k) => v.components?.[k] !== undefined)
      ),
    {
      message:
        'with template.define, per-type component outputs (components.schemas, components.responses, ...) are not supported. Use components.output for a single components file.',
    },
  )
  .refine(
    (v) => {
      if (v.template?.define !== true || v.components?.output === undefined) return true
      const normalize = (p: string) => p.replace(/^\.\//, '')
      const appEntry = normalize(v.output ?? 'src/index.ts')
      if (!appEntry.endsWith('index.ts')) return true
      const baseDir = appEntry === 'index.ts' ? '' : appEntry.slice(0, -'/index.ts'.length)
      const routesDir = baseDir === '' ? 'routes' : `${baseDir}/routes`
      const componentsOutput = normalize(v.components.output)
      return componentsOutput !== appEntry && !componentsOutput.startsWith(`${routesDir}/`)
    },
    {
      message:
        'with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
    },
  )

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
