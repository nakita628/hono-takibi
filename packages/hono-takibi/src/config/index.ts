import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { Effect, FileSystem, Schema, SchemaIssue, SchemaTransformation } from 'effect'
import type { FormatConfig } from 'oxfmt'

/**
 * A path constrained to a set of extensions.
 *
 * `Schema.TemplateLiteral` carries the literal type but its rejection reads "Expected a
 * string matching template literal parts"; `Schema.declare` over the same guard keeps the
 * type on both sides — so `defineConfig` still rejects a wrong extension while you type —
 * and lets the message say which extensions are meant.
 */
type InputPath = `${string}.yaml` | `${string}.json` | `${string}.tsp`

const InputPathSchema = Schema.declare<InputPath>(
  Schema.is(Schema.TemplateLiteral([Schema.String, Schema.Literals(['.yaml', '.json', '.tsp'])])),
  { message: 'must be .yaml | .json | .tsp' },
)

const TsPathSchema = Schema.declare<`${string}.ts`>(
  Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])),
  { message: 'must be .ts file' },
)

const MdPathSchema = Schema.declare<`${string}.md`>(
  Schema.is(Schema.TemplateLiteral([Schema.String, '.md'])),
  { message: 'must be .md file' },
)

const DirectoryOutputSchema = Schema.String.check(
  Schema.isPattern(/^(?!.*\.ts$).+/u, { message: 'split mode requires directory, not .ts file' }),
).annotate({
  title: 'Output directory',
  description: 'Directory that receives one file per generated entry. Never a `.ts` file path.',
  examples: ['./src/routes', './src/schemas'],
})

const FileOutputSchema = Schema.String.pipe(
  Schema.decodeTo(
    Schema.String,
    SchemaTransformation.transform({
      decode: (v: string) => (v.endsWith('.ts') ? v : `${v}/index.ts`),
      encode: (v: string) => v,
    }),
  ),
).annotate({
  title: 'Output file',
  description:
    'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
  examples: ['./src/routes.ts', './src/routes'],
})

const ImportSchema = Schema.String.annotate({
  title: 'Import specifier',
  description: 'Module specifier the generated files use to import from `output`.',
  examples: ['@packages/routes', '../lib', '.'],
})

const ClientSchema = Schema.String.pipe(
  Schema.withDecodingDefault(Effect.succeed('client')),
).annotate({
  title: 'Client export name',
  description: 'Named export to import from `import` as the Hono client instance.',
  examples: ['client', 'apiClient'],
})

const TestFrameworkSchema = Schema.Literals(['vitest', 'vite-plus', 'bun'])
  .pipe(Schema.withDecodingDefault(Effect.succeed('vitest')))
  .annotate({
    title: 'Test framework',
    description: 'Framework whose import specifier the generated test files use.',
    examples: ['vitest', 'vite-plus', 'bun'],
  })

const SplitTrue = Schema.Literal(true).annotate({
  description: 'Write one file per entry into `output`.',
})

const SplitFalse = Schema.Literal(false)
  .pipe(Schema.withDecodingDefault(Effect.succeed(false)))
  .annotate({
    description: 'Write every entry into a single file (default).',
  })

const ExportTypesSchema = Schema.Boolean.pipe(
  Schema.withDecodingDefault(Effect.succeed(false)),
).annotate({
  description: 'Also export the TypeScript type inferred from each generated schema.',
})

// `Schema.Union` resolves members in order, and each member pins `split` to a literal, so
// a member is only reachable through its own discriminant — the failure reported is the
// one inside the matching branch, not a union-wide "no member matched".
const OutputSchema = Schema.Union([
  Schema.Struct({
    split: SplitTrue,
    output: DirectoryOutputSchema,
    import: Schema.optionalKey(ImportSchema),
  }),
  Schema.Struct({
    split: SplitFalse,
    output: FileOutputSchema,
    import: Schema.optionalKey(ImportSchema),
  }),
]).annotate({
  title: 'Generated output target',
  description:
    'Where one group of generated code is written. `split` picks directory mode or single-file mode.',
  examples: [
    { split: false, output: './src/routes.ts' },
    { split: true, output: './src/routes', import: '@packages/routes' },
  ],
})

const ExportTypesOutputSchema = Schema.Union([
  Schema.Struct({
    split: SplitTrue,
    output: DirectoryOutputSchema,
    import: Schema.optionalKey(ImportSchema),
    exportTypes: ExportTypesSchema,
  }),
  Schema.Struct({
    split: SplitFalse,
    output: FileOutputSchema,
    import: Schema.optionalKey(ImportSchema),
    exportTypes: ExportTypesSchema,
  }),
]).annotate({
  title: 'Generated output target with type exports',
  description:
    'Same as a generated output target, plus `exportTypes` for the component sections that carry inferable types (schemas, parameters, headers, mediaTypes).',
  examples: [
    { split: false, output: './src/schemas.ts', exportTypes: true },
    { split: true, output: './src/schemas', import: '../schemas', exportTypes: true },
  ],
})

const HooksSchema = Schema.Union([
  Schema.Struct({
    split: SplitTrue,
    output: DirectoryOutputSchema,
    import: ImportSchema,
    client: ClientSchema,
  }),
  Schema.Struct({
    split: SplitFalse,
    output: FileOutputSchema,
    import: ImportSchema,
    client: ClientSchema,
  }),
]).annotate({
  title: 'Client hooks target',
  description:
    'Data-fetching hooks generated on top of the Hono client. `import` is required because every hook imports the client.',
  examples: [
    { split: false, output: './src/swr.ts', import: '../lib', client: 'client' },
    { split: true, output: './src/swr', import: '../lib', client: 'client' },
  ],
})

const ParseResponseSchema = Schema.Boolean.pipe(
  Schema.withDecodingDefault(Effect.succeed(false)),
).annotate({
  description: 'Wrap each call in `parseResponse` so it resolves to the parsed body.',
})

const RpcDocsSchema = Schema.Boolean.pipe(
  Schema.withDecodingDefault(Effect.succeed(false)),
).annotate({
  description: 'Emit the operation summary and description as JSDoc.',
})

const RpcSchema = Schema.Union([
  Schema.Struct({
    split: SplitTrue,
    output: DirectoryOutputSchema,
    import: ImportSchema,
    client: ClientSchema,
    parseResponse: ParseResponseSchema,
    docs: RpcDocsSchema,
  }),
  Schema.Struct({
    split: SplitFalse,
    output: FileOutputSchema,
    import: ImportSchema,
    client: ClientSchema,
    parseResponse: ParseResponseSchema,
    docs: RpcDocsSchema,
  }),
]).annotate({
  title: 'RPC wrappers target',
  description: 'Typed function wrappers around the Hono RPC client, one per operation.',
  examples: [
    {
      split: false,
      output: './src/rpc.ts',
      import: '../lib',
      client: 'client',
      parseResponse: false,
      docs: false,
    },
    {
      split: true,
      output: './src/rpc',
      import: '../lib',
      client: 'client',
      parseResponse: true,
      docs: true,
    },
  ],
})

const PathAliasSchema = Schema.optionalKey(
  Schema.String.annotate({
    title: 'Path alias',
    description: 'Import prefix used by the scaffolded files instead of relative paths.',
    examples: ['@/', '~/'],
  }),
)

const ScaffoldTestSchema = Schema.Boolean.pipe(
  Schema.withDecodingDefault(Effect.succeed(false)),
).annotate({
  description: 'Also scaffold a test file per handler.',
})

const TemplateSchema = Schema.Union([
  Schema.Struct({
    define: Schema.Literal(true).annotate({
      description:
        'Emit `defineOpenAPIRoute({ route, handler })` entries. Derives `routes/` next to the app entry, so it cannot be combined with `routes` or per-type component outputs.',
    }),
    test: ScaffoldTestSchema,
    pathAlias: PathAliasSchema,
    testFramework: TestFrameworkSchema,
  }),
  Schema.Struct({
    define: Schema.Literal(false)
      .pipe(Schema.withDecodingDefault(Effect.succeed(false)))
      .annotate({
        description: 'Scaffold app and handler files (default).',
      }),
    routeHandler: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
      description:
        'Emit the `app.openapi()` pattern with `RouteHandler` type exports. When false, handlers import the app and register routes inline.',
    }),
    test: ScaffoldTestSchema,
    pathAlias: PathAliasSchema,
    testFramework: TestFrameworkSchema,
  }),
]).annotate({
  title: 'App scaffold',
  description: 'Scaffolds the Hono app, handler stubs, and optional tests around the routes.',
  examples: [
    { define: false, routeHandler: true, test: true, pathAlias: '@/', testFramework: 'vitest' },
    { define: true, test: true, testFramework: 'vitest' },
  ],
})

/** Component sections that each take their own output target. */
const COMPONENT_KINDS = [
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

const ComponentsSchema = Schema.Struct({
  output: Schema.optionalKey(
    TsPathSchema.annotate({
      title: 'Single-file components output',
      description:
        'Every component section in one file. Mutually exclusive with the per-type fields below.',
      examples: ['./src/components/index.ts'],
    }),
  ),
  schemas: Schema.optionalKey(ExportTypesOutputSchema),
  responses: Schema.optionalKey(OutputSchema),
  parameters: Schema.optionalKey(ExportTypesOutputSchema),
  examples: Schema.optionalKey(OutputSchema),
  requestBodies: Schema.optionalKey(OutputSchema),
  headers: Schema.optionalKey(ExportTypesOutputSchema),
  securitySchemes: Schema.optionalKey(OutputSchema),
  links: Schema.optionalKey(OutputSchema),
  callbacks: Schema.optionalKey(OutputSchema),
  pathItems: Schema.optionalKey(OutputSchema),
  mediaTypes: Schema.optionalKey(ExportTypesOutputSchema),
})
  .check(
    Schema.makeFilter(
      (v) => v.output === undefined || !COMPONENT_KINDS.some((k) => v[k] !== undefined),
      {
        message:
          'components.output is mutually exclusive with per-type component outputs (schemas, responses, ...). Use output for single-file mode, or per-type fields for split mode.',
      },
    ),
  )
  .annotate({
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
  })

/** Milliseconds, bounded so a mock cannot be configured to hang a request. */
const DelayMsSchema = Schema.Number.check(
  Schema.isInt(),
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(60_000),
)

const ArrayLengthSchema = Schema.Number.check(
  Schema.isInt(),
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(1000),
)

const MockSchema = Schema.Struct({
  output: FileOutputSchema,
  useExamples: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        'Prefer the `example` / `examples` declared in the document over faker-generated values.',
    }),
  ),
  locale: Schema.optionalKey(
    Schema.String.check(
      Schema.isPattern(/^[A-Za-z_]{1,40}$/u, {
        message: "Invalid faker locale. Use a code like 'ja', 'en', or 'zh_CN'.",
      }),
    ).annotate({
      title: 'Faker locale',
      description: 'faker.js locale used for the generated values.',
      examples: ['en', 'ja', 'zh_CN'],
    }),
  ),
  delay: Schema.optionalKey(
    Schema.Union([
      DelayMsSchema,
      Schema.Literal(false),
      Schema.Struct({ min: DelayMsSchema, max: DelayMsSchema }).check(
        Schema.makeFilter((v) => v.min <= v.max, {
          message: 'delay.min must be <= delay.max. Swap the values or remove one.',
        }),
      ),
    ]).annotate({
      title: 'Response delay',
      description:
        'Artificial latency in milliseconds: a fixed number, a `{ min, max }` range sampled per request, or `false` for none. Capped at 60000.',
      examples: [false, 300, { min: 100, max: 800 }],
    }),
  ),
  arrayMin: Schema.optionalKey(
    ArrayLengthSchema.annotate({
      description: 'Lower bound on the length of generated arrays. Must be <= `arrayMax`.',
      examples: [1],
    }),
  ),
  arrayMax: Schema.optionalKey(
    ArrayLengthSchema.annotate({
      description: 'Upper bound on the length of generated arrays.',
      examples: [10],
    }),
  ),
})
  .check(
    Schema.makeFilter(
      (v) => v.arrayMin === undefined || v.arrayMax === undefined || v.arrayMin <= v.arrayMax,
      { message: 'arrayMin must be <= arrayMax. Swap the values or remove one.' },
    ),
  )
  .annotate({
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
  })

const DocsSchema = Schema.Union([
  Schema.Struct({
    output: MdPathSchema.annotate({ title: 'Docs output file', examples: ['./docs/api.md'] }),
    curl: Schema.Literal(true).annotate({
      description: 'Write `curl` commands against `baseUrl`, which then becomes required.',
    }),
    baseUrl: Schema.String.annotate({
      description: 'Server the generated `curl` commands target.',
      examples: ['http://localhost:3000'],
    }).pipe(Schema.annotateKey({ messageMissingKey: 'baseUrl is required when curl is true' })),
    entry: Schema.optionalKey(
      Schema.Never.annotate({ message: 'entry cannot be specified when curl is true' }),
    ),
  }),
  Schema.Struct({
    output: MdPathSchema.annotate({ title: 'Docs output file', examples: ['./docs/api.md'] }),
    curl: Schema.Literal(false)
      .pipe(Schema.withDecodingDefault(Effect.succeed(false)))
      .annotate({
        description: 'Write Hono request examples instead of `curl` (default).',
      }),
    entry: Schema.optionalKey(
      Schema.String.annotate({
        description: 'App entry the Hono request examples import.',
        examples: ['src/index.ts'],
      }),
    ),
    baseUrl: Schema.optionalKey(
      Schema.String.annotate({
        description: 'Server shown in the examples.',
        examples: ['http://localhost:3000'],
      }),
    ),
  }),
]).annotate({
  title: 'Markdown docs output',
  description: 'Generates a Markdown reference with one request example per operation.',
  examples: [
    { output: './docs/api.md', curl: false, entry: 'src/index.ts' },
    { output: './docs/api.md', curl: true, baseUrl: 'http://localhost:3000' },
  ],
})

const ConfigSchema = Schema.Struct({
  input: InputPathSchema.annotate({
    title: 'Input document',
    description: 'OpenAPI or TypeSpec entry document that every generator reads.',
    examples: ['openapi.yaml', './spec/openapi.json', './spec/main.tsp'],
  }),
  output: Schema.optionalKey(
    TsPathSchema.annotate({
      title: 'Single-file output',
      description:
        'Routes and schemas in one file. Mutually exclusive with `routes`. With `template.define` this is the app entry instead and must be an `index.ts` path.',
      examples: ['./src/routes.ts', './src/index.ts'],
    }),
  ),
  basePath: Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('/'))).annotate({
    title: 'Base path',
    description: 'Base path the generated Hono app is mounted on.',
    examples: ['/', '/api', '/api/v1'],
  }),
  readonly: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: 'Emit `readonly` modifiers on the generated TypeScript types.',
    }),
  ),
  format: Schema.optionalKey(
    Schema.declare<FormatConfig>((u): u is FormatConfig => typeof u === 'object' && u !== null, {
      title: 'Formatter options',
      description:
        'oxfmt `FormatConfig` applied to every generated file. Defaults to printWidth 100, single quotes, no semicolons.',
      examples: [{ printWidth: 80, semi: true }],
    }),
  ),
  template: Schema.optionalKey(TemplateSchema),
  exportSchemas: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.schemas` from the generated code.',
  }),
  exportSchemasTypes: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description: 'Also export the TypeScript type inferred from each `components.schemas` entry.',
  }),
  exportResponses: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.responses` from the generated code.',
  }),
  exportParameters: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate(
    {
      description: 'Re-export `components.parameters` from the generated code.',
    },
  ),
  exportParametersTypes: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description:
      'Also export the TypeScript type inferred from each `components.parameters` entry.',
  }),
  exportExamples: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.examples` from the generated code.',
  }),
  exportRequestBodies: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description: 'Re-export `components.requestBodies` from the generated code.',
  }),
  exportHeaders: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.headers` from the generated code.',
  }),
  exportHeadersTypes: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description: 'Also export the TypeScript type inferred from each `components.headers` entry.',
  }),
  exportSecuritySchemes: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description: 'Re-export `components.securitySchemes` from the generated code.',
  }),
  exportLinks: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.links` from the generated code.',
  }),
  exportCallbacks: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.callbacks` from the generated code.',
  }),
  exportPathItems: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
    description: 'Re-export `components.pathItems` from the generated code.',
  }),
  exportMediaTypes: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate(
    {
      description: 'Re-export `components.mediaTypes` from the generated code.',
    },
  ),
  exportMediaTypesTypes: Schema.Boolean.pipe(
    Schema.withDecodingDefault(Effect.succeed(false)),
  ).annotate({
    description:
      'Also export the TypeScript type inferred from each `components.mediaTypes` entry.',
  }),
  routes: Schema.optionalKey(
    OutputSchema.annotate({
      title: 'Routes output',
      description:
        'Destination for the `createRoute(...)` definitions built from `paths`. Mutually exclusive with `output` and with `template.define`.',
      examples: [
        { split: false, output: './src/routes.ts' },
        { split: true, output: './src/routes', import: '@packages/routes' },
      ],
    }),
  ),
  webhooks: Schema.optionalKey(
    OutputSchema.annotate({
      title: 'Webhooks output',
      description: 'Destination for the route definitions built from `webhooks`.',
      examples: [
        { split: false, output: './src/webhooks.ts' },
        { split: true, output: './src/webhooks', import: '@packages/webhooks' },
      ],
    }),
  ),
  components: Schema.optionalKey(ComponentsSchema),
  type: Schema.optionalKey(
    Schema.Struct({
      readonly: Schema.optionalKey(
        Schema.Boolean.annotate({
          description: 'Emit `readonly` modifiers on the declared types.',
        }),
      ),
      output: TsPathSchema.annotate({
        title: 'Types output file',
        examples: ['./src/types.ts'],
      }),
    }).annotate({
      title: 'Standalone types output',
      description:
        'Plain TypeScript declarations for every operation and component, independent of the Zod schemas.',
      examples: [{ output: './src/types.ts', readonly: true }],
    }),
  ),
  rpc: Schema.optionalKey(RpcSchema),
  swr: Schema.optionalKey(
    HooksSchema.annotate({
      title: 'SWR hooks output',
      description: 'Generates `useSWR` / `useSWRMutation` hooks per operation.',
      examples: [{ split: true, output: './src/swr', import: '../lib', client: 'client' }],
    }),
  ),
  'tanstack-query': Schema.optionalKey(
    HooksSchema.annotate({
      title: 'TanStack Query hooks output',
      description: 'Generates `@tanstack/react-query` hooks per operation.',
      examples: [
        { split: true, output: './src/tanstack-query', import: '../lib', client: 'client' },
      ],
    }),
  ),
  'preact-query': Schema.optionalKey(
    HooksSchema.annotate({
      title: 'Preact Query hooks output',
      description: 'Generates `@tanstack/preact-query` hooks per operation.',
      examples: [{ split: true, output: './src/preact-query', import: '../lib', client: 'client' }],
    }),
  ),
  'solid-query': Schema.optionalKey(
    HooksSchema.annotate({
      title: 'Solid Query hooks output',
      description: 'Generates `@tanstack/solid-query` hooks per operation.',
      examples: [{ split: true, output: './src/solid-query', import: '../lib', client: 'client' }],
    }),
  ),
  'vue-query': Schema.optionalKey(
    HooksSchema.annotate({
      title: 'Vue Query hooks output',
      description: 'Generates `@tanstack/vue-query` hooks per operation.',
      examples: [{ split: true, output: './src/vue-query', import: '../lib', client: 'client' }],
    }),
  ),
  'svelte-query': Schema.optionalKey(
    HooksSchema.annotate({
      title: 'Svelte Query hooks output',
      description: 'Generates `@tanstack/svelte-query` hooks per operation.',
      examples: [{ split: true, output: './src/svelte-query', import: '../lib', client: 'client' }],
    }),
  ),
  'angular-query': Schema.optionalKey(
    HooksSchema.annotate({
      title: 'Angular Query hooks output',
      description: 'Generates `@tanstack/angular-query-experimental` hooks per operation.',
      examples: [
        { split: true, output: './src/angular-query', import: '../lib', client: 'client' },
      ],
    }),
  ),
  test: Schema.optionalKey(
    Schema.Struct({
      output: FileOutputSchema,
      import: ImportSchema,
      testFramework: TestFrameworkSchema,
    }).annotate({
      title: 'Route tests output',
      description: 'Generates a request-level test per operation against the generated app.',
      examples: [{ output: './src/test.ts', import: '.', testFramework: 'vitest' }],
    }),
  ),
  mock: Schema.optionalKey(MockSchema),
  docs: Schema.optionalKey(DocsSchema),
})
  .check(
    Schema.makeFilter((v) => !(v.output && v.routes), {
      message:
        'output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
    }),
    Schema.makeFilter((v) => !(v.template?.define === true && v.routes), {
      message:
        'template.define and routes are mutually exclusive. define derives routes/ next to the app entry (output, default src/index.ts).',
    }),
    Schema.makeFilter(
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
    ),
    Schema.makeFilter(
      (v) =>
        !(
          v.template?.define === true &&
          v.components !== undefined &&
          COMPONENT_KINDS.some((k) => v.components?.[k] !== undefined)
        ),
      {
        message:
          'with template.define, per-type component outputs (components.schemas, components.responses, ...) are not supported. Use components.output for a single components file.',
      },
    ),
    Schema.makeFilter(
      (v) => {
        if (v.template?.define !== true || v.components?.output === undefined) return true
        const componentsOutput = v.components.output.replace(/^\.\//u, '')
        // `<anchor>/<module>` where module is a flat `.ts` file or a `<dir>/index.ts`
        // pair; the derived app entry is `<anchor>/index.ts`.
        const container = componentsOutput.endsWith('/index.ts')
          ? componentsOutput.slice(0, -'/index.ts'.length)
          : componentsOutput
        const anchor = container.includes('/') ? container.slice(0, container.lastIndexOf('/')) : ''
        const appEntry = (
          v.output ?? (anchor === '' || anchor === '.' ? 'index.ts' : `${anchor}/index.ts`)
        ).replace(/^\.\//u, '')
        if (!appEntry.endsWith('index.ts')) return true
        const baseDir = appEntry === 'index.ts' ? '' : appEntry.slice(0, -'/index.ts'.length)
        const routesDir = baseDir === '' ? 'routes' : `${baseDir}/routes`
        return componentsOutput !== appEntry && !componentsOutput.startsWith(`${routesDir}/`)
      },
      {
        message:
          'with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      },
    ),
  )
  // No `examples` here: the annotation is typed against the parsed shape, and a root
  // example would have to spell out all sixteen defaulted `export*` flags — noise, not
  // documentation. The minimal configs a user actually writes live in the README.
  .annotate({
    title: 'hono-takibi config',
    description:
      'Everything `hono-takibi` generates from one OpenAPI or TypeSpec document. Only `input` is required; each remaining field opts one generator in.',
  })

/** A validated config: every default filled in and every output path normalized. */
export type Config = typeof ConfigSchema.Type

/**
 * The config file is missing, is not a module with a default export, or does not validate.
 *
 * `Schema.TaggedError` rather than `Data.TaggedError`: this is the error a schema decode
 * turns into, which is the shape the Schema guide models, and it makes the failure a
 * schema in its own right. The errors that never meet a schema (`FormatError`,
 * `GenerateError`, `OpenAPIError`) stay plain `Data.TaggedError`.
 */
// oxlint-disable-next-line unicorn/throw-new-error -- `Schema.TaggedError()` is the class factory, not a throw
export class ConfigError extends Schema.TaggedError<ConfigError>()('ConfigError', {
  message: Schema.String,
}) {}

// Built once and reused at the edge, as the Schema guide prescribes, rather than
// rebuilt per call.
const decodeConfig = Schema.decodeUnknownEffect(ConfigSchema)
const formatIssue = SchemaIssue.makeFormatterStandardSchemaV1()

/**
 * Validates an already-loaded config object.
 *
 * The first issue is reported as `<a.b.c>: <message>`: a config file is written by hand,
 * so naming the field that is wrong matters more than listing every consequence of it.
 */
export function parseConfig(config: unknown) {
  return decodeConfig(config).pipe(
    Effect.mapError((error) => {
      const issue = formatIssue(error.issue).issues[0]
      const path = (issue?.path ?? [])
        .map((segment) => String(typeof segment === 'object' ? segment.key : segment))
        .join('.')
      const prefix = path === '' ? '' : `${path}: `
      return new ConfigError({ message: `Invalid config: ${prefix}${issue?.message ?? ''}` })
    }),
  )
}

/** Loads and validates a config file, resolved against the current directory. */
export function readConfig(configPath?: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const abs = resolve(process.cwd(), configPath ?? 'hono-takibi.config.ts')
    // Checked before importing so a missing file reads as "no config here" rather than
    // as whatever the module loader throws.
    const found = yield* fs
      .exists(abs)
      .pipe(Effect.catchTag('PlatformError', () => Effect.succeed(false)))
    if (!found) return yield* new ConfigError({ message: `Config not found: ${abs}` })
    const mod: unknown = yield* Effect.tryPromise({
      try: () => import(pathToFileURL(abs).href),
      catch: (error) =>
        new ConfigError({ message: error instanceof Error ? error.message : String(error) }),
    })
    if (
      typeof mod !== 'object' ||
      mod === null ||
      !('default' in mod) ||
      mod.default === undefined
    ) {
      return yield* new ConfigError({ message: 'Config must export default object' })
    }
    return yield* parseConfig(mod.default)
  })
}

export function defineConfig(config: typeof ConfigSchema.Encoded) {
  return config
}
