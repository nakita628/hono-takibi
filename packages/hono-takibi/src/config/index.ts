import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type FormatConfig } from 'oxfmt'
import * as z from 'zod'

const DirectoryOutputSchema = z
  .string()
  .regex(/^(?!.*\.ts$).+/, {
    error: 'split mode requires directory, not .ts file',
  })
  .meta({
    title: 'Output directory',
    description: 'Directory that receives one file per generated entry. Never a `.ts` file path.',
    examples: ['./src/routes', './src/schemas'],
  })

const FileOutputSchema = z
  .string()
  .transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`))
  .meta({
    title: 'Output file',
    description:
      'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
    examples: ['./src/routes.ts', './src/routes'],
  })

const ImportSchema = z.string().meta({
  title: 'Import specifier',
  description: 'Module specifier the generated files use to import from `output`.',
  examples: ['@packages/routes', '../lib', '.'],
})

const ClientSchema = z
  .string()
  .default('client')
  .meta({
    title: 'Client export name',
    description: 'Named export to import from `import` as the Hono client instance.',
    examples: ['client', 'apiClient'],
  })

const TestFrameworkSchema = z
  .enum(['vitest', 'vite-plus', 'bun'])
  .default('vitest')
  .exactOptional()
  .meta({
    title: 'Test framework',
    description: 'Framework whose import specifier the generated test files use.',
    examples: ['vitest', 'vite-plus', 'bun'],
  })

const OutputSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true).meta({ description: 'Write one file per entry into `output`.' }),
        output: DirectoryOutputSchema,
        import: ImportSchema.exactOptional(),
      })
      .readonly(),
    z
      .object({
        split: z
          .literal(false)
          .optional()
          .default(false)
          .meta({ description: 'Write every entry into a single file (default).' }),
        output: FileOutputSchema,
        import: ImportSchema.exactOptional(),
      })
      .readonly(),
  ])
  .exactOptional()
  .meta({
    title: 'Generated output target',
    description:
      'Where one group of generated code is written. `split` picks directory mode or single-file mode.',
    examples: [
      { output: './src/routes.ts' },
      { output: './src/routes', split: true, import: '@packages/routes' },
    ],
  })

const ExportTypesOutputSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true).meta({ description: 'Write one file per entry into `output`.' }),
        output: DirectoryOutputSchema,
        import: ImportSchema.exactOptional(),
        exportTypes: z.boolean().default(false).meta({
          description: 'Also export the TypeScript type inferred from each generated schema.',
        }),
      })
      .readonly(),
    z
      .object({
        split: z
          .literal(false)
          .optional()
          .default(false)
          .meta({ description: 'Write every entry into a single file (default).' }),
        output: FileOutputSchema,
        import: ImportSchema.exactOptional(),
        exportTypes: z.boolean().default(false).meta({
          description: 'Also export the TypeScript type inferred from each generated schema.',
        }),
      })
      .readonly(),
  ])
  .exactOptional()
  .meta({
    title: 'Generated output target with type exports',
    description:
      'Same as a generated output target, plus `exportTypes` for the component sections that carry inferable types (schemas, parameters, headers, mediaTypes).',
    examples: [
      { output: './src/schemas.ts', exportTypes: true },
      { output: './src/schemas', split: true, import: '../schemas', exportTypes: true },
    ],
  })

const HooksSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true).meta({ description: 'Write one file per operation into `output`.' }),
        output: DirectoryOutputSchema,
        import: ImportSchema,
        client: ClientSchema,
      })
      .readonly(),
    z
      .object({
        split: z
          .literal(false)
          .optional()
          .default(false)
          .meta({ description: 'Write every hook into a single file (default).' }),
        output: FileOutputSchema,
        import: ImportSchema,
        client: ClientSchema,
      })
      .readonly(),
  ])
  .exactOptional()
  .meta({
    title: 'Client hooks target',
    description:
      'Data-fetching hooks generated on top of the Hono client. `import` is required because every hook imports the client.',
    examples: [
      { output: './src/swr.ts', import: '../lib' },
      { output: './src/swr', split: true, import: '../lib', client: 'client' },
    ],
  })

const RpcSchema = z
  .discriminatedUnion('split', [
    z
      .object({
        split: z.literal(true).meta({ description: 'Write one file per operation into `output`.' }),
        output: DirectoryOutputSchema,
        import: ImportSchema,
        client: ClientSchema,
        parseResponse: z.boolean().default(false).meta({
          description: 'Wrap each call in `parseResponse` so it resolves to the parsed body.',
        }),
        docs: z.boolean().default(false).meta({
          description: 'Emit the operation summary and description as JSDoc.',
        }),
      })
      .readonly(),
    z
      .object({
        split: z
          .literal(false)
          .optional()
          .default(false)
          .meta({ description: 'Write every wrapper into a single file (default).' }),
        output: FileOutputSchema,
        import: ImportSchema,
        client: ClientSchema,
        parseResponse: z.boolean().default(false).meta({
          description: 'Wrap each call in `parseResponse` so it resolves to the parsed body.',
        }),
        docs: z.boolean().default(false).meta({
          description: 'Emit the operation summary and description as JSDoc.',
        }),
      })
      .readonly(),
  ])
  .exactOptional()
  .meta({
    title: 'RPC wrappers target',
    description: 'Typed function wrappers around the Hono RPC client, one per operation.',
    examples: [
      { output: './src/rpc.ts', import: '../lib' },
      { output: './src/rpc', split: true, import: '../lib', parseResponse: true, docs: true },
    ],
  })

const ConfigSchema = z
  .object({
    input: z
      .templateLiteral([z.string().min(1), z.enum(['.yaml', '.json', '.tsp'])], {
        error: 'must be .yaml | .json | .tsp',
      })
      .meta({
        title: 'Input document',
        description: 'OpenAPI or TypeSpec entry document that every generator reads.',
        examples: ['openapi.yaml', './spec/openapi.json', './spec/main.tsp'],
      }),
    output: z
      .templateLiteral([z.string().min(1), z.enum(['.ts'])], { error: 'must be .ts file' })
      .exactOptional()
      .meta({
        title: 'Single-file output',
        description:
          'Routes and schemas in one file. Mutually exclusive with `routes`. With `template.define` this is the app entry instead and must be an `index.ts` path.',
        examples: ['./src/routes.ts', './src/index.ts'],
      }),
    basePath: z
      .string()
      .default('/')
      .meta({
        title: 'Base path',
        description: 'Base path the generated Hono app is mounted on.',
        examples: ['/', '/api', '/api/v1'],
      }),
    readonly: z.boolean().exactOptional().meta({
      description: 'Emit `readonly` modifiers on the generated TypeScript types.',
    }),
    format: z
      .custom<FormatConfig>(() => true)
      .exactOptional()
      .meta({
        title: 'Formatter options',
        description:
          'oxfmt `FormatConfig` applied to every generated file. Defaults to printWidth 100, single quotes, no semicolons.',
        examples: [{ printWidth: 80, semi: true }],
      }),
    template: z
      .discriminatedUnion('define', [
        z
          .object({
            define: z.literal(true).meta({
              description:
                'Emit `defineOpenAPIRoute({ route, handler })` entries. Derives `routes/` next to the app entry, so it cannot be combined with `routes` or per-type component outputs.',
            }),
            test: z
              .boolean()
              .default(false)
              .meta({ description: 'Also scaffold a test file per handler.' }),
            pathAlias: z
              .string()
              .exactOptional()
              .meta({
                title: 'Path alias',
                description:
                  'Import prefix used by the scaffolded files instead of relative paths.',
                examples: ['@/', '~/'],
              }),
            testFramework: TestFrameworkSchema,
          })
          .readonly(),
        z
          .object({
            define: z
              .literal(false)
              .optional()
              .default(false)
              .meta({ description: 'Scaffold app and handler files (default).' }),
            routeHandler: z.boolean().default(false).meta({
              description:
                'Emit the `app.openapi()` pattern with `RouteHandler` type exports. When false, handlers import the app and register routes inline.',
            }),
            test: z
              .boolean()
              .default(false)
              .meta({ description: 'Also scaffold a test file per handler.' }),
            pathAlias: z
              .string()
              .exactOptional()
              .meta({
                title: 'Path alias',
                description:
                  'Import prefix used by the scaffolded files instead of relative paths.',
                examples: ['@/', '~/'],
              }),
            testFramework: TestFrameworkSchema,
          })
          .readonly(),
      ])
      .exactOptional()
      .meta({
        title: 'App scaffold',
        description: 'Scaffolds the Hono app, handler stubs, and optional tests around the routes.',
        examples: [
          { test: true, routeHandler: true, pathAlias: '@/' },
          { define: true, test: true },
        ],
      }),
    exportSchemas: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.schemas` from the generated code.' }),
    exportSchemasTypes: z.boolean().default(false).meta({
      description: 'Also export the TypeScript type inferred from each `components.schemas` entry.',
    }),
    exportResponses: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.responses` from the generated code.' }),
    exportParameters: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.parameters` from the generated code.' }),
    exportParametersTypes: z.boolean().default(false).meta({
      description:
        'Also export the TypeScript type inferred from each `components.parameters` entry.',
    }),
    exportExamples: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.examples` from the generated code.' }),
    exportRequestBodies: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.requestBodies` from the generated code.' }),
    exportHeaders: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.headers` from the generated code.' }),
    exportHeadersTypes: z.boolean().default(false).meta({
      description: 'Also export the TypeScript type inferred from each `components.headers` entry.',
    }),
    exportSecuritySchemes: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.securitySchemes` from the generated code.' }),
    exportLinks: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.links` from the generated code.' }),
    exportCallbacks: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.callbacks` from the generated code.' }),
    exportPathItems: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.pathItems` from the generated code.' }),
    exportMediaTypes: z
      .boolean()
      .default(false)
      .meta({ description: 'Re-export `components.mediaTypes` from the generated code.' }),
    exportMediaTypesTypes: z.boolean().default(false).meta({
      description:
        'Also export the TypeScript type inferred from each `components.mediaTypes` entry.',
    }),
    routes: OutputSchema.meta({
      title: 'Routes output',
      description:
        'Destination for the `createRoute(...)` definitions built from `paths`. Mutually exclusive with `output` and with `template.define`.',
      examples: [
        { output: './src/routes.ts' },
        { output: './src/routes', split: true, import: '@packages/routes' },
      ],
    }),
    webhooks: OutputSchema.meta({
      title: 'Webhooks output',
      description: 'Destination for the route definitions built from `webhooks`.',
      examples: [
        { output: './src/webhooks.ts' },
        { output: './src/webhooks', split: true, import: '@packages/webhooks' },
      ],
    }),
    components: z
      .object({
        output: z
          .templateLiteral([z.string().min(1), z.enum(['.ts'])], { error: 'must be .ts file' })
          .exactOptional()
          .meta({
            title: 'Single-file components output',
            description:
              'Every component section in one file. Mutually exclusive with the per-type fields below.',
            examples: ['./src/components/index.ts'],
          }),
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
      .exactOptional()
      .meta({
        title: 'Components output',
        description:
          'Destination for `components`. Either `output` for one file, or per-type fields that each get their own target.',
        examples: [
          { output: './src/components/index.ts' },
          {
            schemas: {
              output: './src/schemas',
              split: true,
              import: '../schemas',
              exportTypes: true,
            },
            responses: { output: './src/responses', split: true, import: '../responses' },
          },
        ],
      }),
    type: z
      .object({
        readonly: z.boolean().exactOptional().meta({
          description: 'Emit `readonly` modifiers on the declared types.',
        }),
        output: z
          .templateLiteral([z.string().min(1), z.enum(['.ts'])], {
            error: 'must be .ts file',
          })
          .meta({
            title: 'Types output file',
            examples: ['./src/types.ts'],
          }),
      })
      .readonly()
      .exactOptional()
      .meta({
        title: 'Standalone types output',
        description:
          'Plain TypeScript declarations for every operation and component, independent of the Zod schemas.',
        examples: [{ output: './src/types.ts', readonly: true }],
      }),
    rpc: RpcSchema,
    swr: HooksSchema.meta({
      title: 'SWR hooks output',
      description: 'Generates `useSWR` / `useSWRMutation` hooks per operation.',
      examples: [{ output: './src/swr', split: true, import: '../lib' }],
    }),
    'tanstack-query': HooksSchema.meta({
      title: 'TanStack Query hooks output',
      description: 'Generates `@tanstack/react-query` hooks per operation.',
      examples: [{ output: './src/tanstack-query', split: true, import: '../lib' }],
    }),
    'preact-query': HooksSchema.meta({
      title: 'Preact Query hooks output',
      description: 'Generates `@tanstack/preact-query` hooks per operation.',
      examples: [{ output: './src/preact-query', split: true, import: '../lib' }],
    }),
    'solid-query': HooksSchema.meta({
      title: 'Solid Query hooks output',
      description: 'Generates `@tanstack/solid-query` hooks per operation.',
      examples: [{ output: './src/solid-query', split: true, import: '../lib' }],
    }),
    'vue-query': HooksSchema.meta({
      title: 'Vue Query hooks output',
      description: 'Generates `@tanstack/vue-query` hooks per operation.',
      examples: [{ output: './src/vue-query', split: true, import: '../lib' }],
    }),
    'svelte-query': HooksSchema.meta({
      title: 'Svelte Query hooks output',
      description: 'Generates `@tanstack/svelte-query` hooks per operation.',
      examples: [{ output: './src/svelte-query', split: true, import: '../lib' }],
    }),
    'angular-query': HooksSchema.meta({
      title: 'Angular Query hooks output',
      description: 'Generates `@tanstack/angular-query-experimental` hooks per operation.',
      examples: [{ output: './src/angular-query', split: true, import: '../lib' }],
    }),
    test: z
      .object({
        output: FileOutputSchema,
        import: ImportSchema,
        testFramework: TestFrameworkSchema,
      })
      .readonly()
      .exactOptional()
      .meta({
        title: 'Route tests output',
        description: 'Generates a request-level test per operation against the generated app.',
        examples: [{ output: './src/test.ts', import: '.', testFramework: 'vitest' }],
      }),
    mock: z
      .object({
        output: FileOutputSchema,
        useExamples: z.boolean().exactOptional().meta({
          description:
            'Prefer the `example` / `examples` declared in the document over faker-generated values.',
        }),
        locale: z
          .string()
          .regex(/^[A-Za-z_]{1,40}$/, {
            error: "Invalid faker locale. Use a code like 'ja', 'en', or 'zh_CN'.",
          })
          .exactOptional()
          .meta({
            title: 'Faker locale',
            description: 'faker.js locale used for the generated values.',
            examples: ['en', 'ja', 'zh_CN'],
          }),
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
          .exactOptional()
          .meta({
            title: 'Response delay',
            description:
              'Artificial latency in milliseconds: a fixed number, a `{ min, max }` range sampled per request, or `false` for none. Capped at 60000.',
            examples: [false, 300, { min: 100, max: 800 }],
          }),
        arrayMin: z
          .number()
          .int()
          .nonnegative()
          .max(1000)
          .exactOptional()
          .meta({
            description: 'Lower bound on the length of generated arrays. Must be <= `arrayMax`.',
            examples: [1],
          }),
        arrayMax: z
          .number()
          .int()
          .nonnegative()
          .max(1000)
          .exactOptional()
          .meta({
            description: 'Upper bound on the length of generated arrays.',
            examples: [10],
          }),
      })
      .readonly()
      .refine(
        (v) => v.arrayMin === undefined || v.arrayMax === undefined || v.arrayMin <= v.arrayMax,
        {
          message: 'arrayMin must be <= arrayMax. Swap the values or remove one.',
        },
      )
      .exactOptional()
      .meta({
        title: 'Mock server output',
        description:
          'Generates handlers that answer with faker.js data shaped by each response schema.',
        examples: [
          { output: './src/mock.ts' },
          {
            output: './src/mock.ts',
            useExamples: true,
            locale: 'ja',
            delay: { min: 100, max: 800 },
            arrayMin: 1,
            arrayMax: 10,
          },
        ],
      }),
    docs: z
      .discriminatedUnion('curl', [
        z
          .object({
            output: z
              .templateLiteral([z.string().min(1), z.enum(['.md'])], {
                error: 'must be .md file',
              })
              .meta({ title: 'Docs output file', examples: ['./docs/api.md'] }),
            curl: z.literal(true).meta({
              description: 'Write `curl` commands against `baseUrl`, which then becomes required.',
            }),
            baseUrl: z.string({ error: 'baseUrl is required when curl is true' }).meta({
              description: 'Server the generated `curl` commands target.',
              examples: ['http://localhost:3000'],
            }),
            entry: z.never({ error: 'entry cannot be specified when curl is true' }).optional(),
          })
          .readonly(),
        z
          .object({
            output: z
              .templateLiteral([z.string().min(1), z.enum(['.md'])], {
                error: 'must be .md file',
              })
              .meta({ title: 'Docs output file', examples: ['./docs/api.md'] }),
            curl: z
              .literal(false)
              .default(false)
              .optional()
              .meta({ description: 'Write Hono request examples instead of `curl` (default).' }),
            entry: z
              .string()
              .exactOptional()
              .meta({
                description: 'App entry the Hono request examples import.',
                examples: ['src/index.ts'],
              }),
            baseUrl: z
              .string()
              .exactOptional()
              .meta({
                description: 'Server shown in the examples.',
                examples: ['http://localhost:3000'],
              }),
          })
          .readonly(),
      ])
      .exactOptional()
      .meta({
        title: 'Markdown docs output',
        description: 'Generates a Markdown reference with one request example per operation.',
        examples: [
          { output: './docs/api.md', entry: 'src/index.ts' },
          { output: './docs/api.md', curl: true, baseUrl: 'http://localhost:3000' },
        ],
      }),
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
      const componentsOutput = v.components.output.replace(/^\.\//, '')
      // `<anchor>/<module>` where module is a flat `.ts` file or a `<dir>/index.ts`
      // pair; the derived app entry is `<anchor>/index.ts`.
      const container = componentsOutput.endsWith('/index.ts')
        ? componentsOutput.slice(0, -'/index.ts'.length)
        : componentsOutput
      const anchor = container.includes('/') ? container.slice(0, container.lastIndexOf('/')) : ''
      const appEntry = (
        v.output ?? (anchor === '' || anchor === '.' ? 'index.ts' : `${anchor}/index.ts`)
      ).replace(/^\.\//, '')
      if (!appEntry.endsWith('index.ts')) return true
      const baseDir = appEntry === 'index.ts' ? '' : appEntry.slice(0, -'/index.ts'.length)
      const routesDir = baseDir === '' ? 'routes' : `${baseDir}/routes`
      return componentsOutput !== appEntry && !componentsOutput.startsWith(`${routesDir}/`)
    },
    {
      message:
        'with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
    },
  )
  .meta({
    title: 'hono-takibi config',
    description:
      'Everything `hono-takibi` generates from one OpenAPI or TypeSpec document. Only `input` is required; each remaining field opts one generator in.',
    examples: [
      { input: 'openapi.yaml', output: './src/routes.ts' },
      {
        input: 'openapi.yaml',
        basePath: '/api',
        routes: { output: './src/routes', split: true, import: '@packages/routes' },
        components: { output: './src/components/index.ts' },
        template: { test: true },
      },
    ],
  })

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
    const mod: unknown = await import(pathToFileURL(abs).href)
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
