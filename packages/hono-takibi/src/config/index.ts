import { posix, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { Effect, FileSystem, Schema, SchemaIssue, SchemaTransformation } from 'effect'
import type { FormatConfig } from 'oxfmt'

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

const HOOK_KINDS = [
  'swr',
  'tanstack-query',
  'preact-query',
  'solid-query',
  'vue-query',
  'svelte-query',
  'angular-query',
] as const

const ConfigSchema = Schema.Struct({
  input: Schema.declare<`${string}.yaml` | `${string}.json` | `${string}.tsp`>(
    Schema.is(Schema.TemplateLiteral([Schema.String, Schema.Literals(['.yaml', '.json', '.tsp'])])),
    { message: 'must be .yaml | .json | .tsp' },
  ).annotate({
    title: 'Input document',
    description: 'OpenAPI or TypeSpec entry document that every generator reads.',
    examples: ['openapi.yaml', './spec/openapi.json', './spec/main.tsp'],
  }),
  output: Schema.optionalKey(
    Schema.declare<`${string}.ts`>(Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])), {
      message: 'must be .ts file',
    }).annotate({
      title: 'Single-file output',
      description:
        'Routes and schemas in one file. Mutually exclusive with `routes`. With `template.define` this is the app entry instead and must be an `index.ts` path.',
      examples: ['./src/routes.ts', './src/index.ts'],
    }),
  ),
  basePath: Schema.String.check(
    Schema.isPattern(/^\/[^\s'"`\\]*$/u, {
      message: "must start with '/' and contain no whitespace or quotes",
    }),
  )
    .pipe(Schema.withDecodingDefault(Effect.succeed('/')))
    .annotate({
      title: 'Base path',
      description:
        'Base path the generated Hono app is mounted on, emitted as `new OpenAPIHono().basePath(...)`. Hono wants the leading slash — without one nothing is mounted.',
      examples: ['/', '/api', '/api/v1'],
    }),
  readonly: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: 'Emit `readonly` modifiers on the generated TypeScript types.',
    }),
  ),
  format: Schema.optionalKey(
    Schema.declare<FormatConfig>(
      (u): u is FormatConfig => typeof u === 'object' && u !== null,
    ).annotate({
      title: 'Formatter options',
      description:
        'oxfmt `FormatConfig` applied to every generated file. Defaults to printWidth 100, single quotes, no semicolons.',
      examples: [{ printWidth: 80, semi: true }],
    }),
  ),
  template: Schema.optionalKey(
    Schema.Union([
      Schema.Struct({
        define: Schema.Literal(true).annotate({
          description:
            'Emit `defineOpenAPIRoute({ route, handler })` entries. Derives `routes/` next to the app entry, so it cannot be combined with `routes` or per-type component outputs.',
        }),
        test: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
          description: 'Also scaffold a test file per handler.',
        }),
        pathAlias: Schema.optionalKey(
          Schema.String.check(
            Schema.isPattern(/^[^\s'"`\\]+$/u, {
              message: 'must be an import prefix, with no whitespace or quotes',
            }),
          ).annotate({
            title: 'Path alias',
            description: 'Import prefix used by the scaffolded files instead of relative paths.',
            examples: ['@/', '~/'],
          }),
        ),
        testFramework: Schema.Literals(['vitest', 'vite-plus', 'bun'])
          .pipe(Schema.withDecodingDefault(Effect.succeed('vitest')))
          .annotate({
            title: 'Test framework',
            description: 'Framework whose import specifier the generated test files use.',
            examples: ['vitest', 'vite-plus', 'bun'],
          }),
      }),
      Schema.Struct({
        define: Schema.Literal(false)
          .pipe(Schema.withDecodingDefault(Effect.succeed(false)))
          .annotate({ description: 'Scaffold app and handler files (default).' }),
        routeHandler: Schema.Boolean.pipe(
          Schema.withDecodingDefault(Effect.succeed(false)),
        ).annotate({
          description:
            'Emit the `app.openapi()` pattern with `RouteHandler` type exports. When false, handlers import the app and register routes inline.',
        }),
        test: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
          description: 'Also scaffold a test file per handler.',
        }),
        pathAlias: Schema.optionalKey(
          Schema.String.check(
            Schema.isPattern(/^[^\s'"`\\]+$/u, {
              message: 'must be an import prefix, with no whitespace or quotes',
            }),
          ).annotate({
            title: 'Path alias',
            description: 'Import prefix used by the scaffolded files instead of relative paths.',
            examples: ['@/', '~/'],
          }),
        ),
        testFramework: Schema.Literals(['vitest', 'vite-plus', 'bun'])
          .pipe(Schema.withDecodingDefault(Effect.succeed('vitest')))
          .annotate({
            title: 'Test framework',
            description: 'Framework whose import specifier the generated test files use.',
            examples: ['vitest', 'vite-plus', 'bun'],
          }),
      }),
    ]).annotate({
      title: 'App scaffold',
      description:
        'Scaffolds the Hono app, handler stubs, and optional tests around the routes. Discriminated on `define`: the scaffold options are common, only `define` and `routeHandler` differ.',
      examples: [
        { define: false, routeHandler: true, test: true, pathAlias: '@/', testFramework: 'vitest' },
        { define: true, test: true, testFramework: 'vitest' },
      ],
    }),
  ),
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
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output target',
        description:
          'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
        examples: ['./src/routes.ts', './src/routes'],
      }),
      split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
        description: 'Write one file per entry into `output` rather than a single file.',
      }),
      import: Schema.optionalKey(
        Schema.String.check(
          Schema.isPattern(/^[^\s'"`\\]+$/u, {
            message: 'must be a module specifier, with no whitespace or quotes',
          }),
        ).annotate({
          title: 'Import specifier',
          description: 'Module specifier the generated files use to import from `output`.',
          examples: ['@packages/routes', '../lib', '.'],
        }),
      ),
    })
      .check(
        Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
          message: 'split mode requires directory, not .ts file',
        }),
      )
      .annotate({
        title: 'Routes output',
        description:
          'Destination for the `createRoute(...)` definitions built from `paths`. Mutually exclusive with `output` and with `template.define`.',
      }),
  ),
  webhooks: Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output target',
        description:
          'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
        examples: ['./src/webhooks.ts', './src/webhooks'],
      }),
      split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
        description: 'Write one file per entry into `output` rather than a single file.',
      }),
      import: Schema.optionalKey(
        Schema.String.check(
          Schema.isPattern(/^[^\s'"`\\]+$/u, {
            message: 'must be a module specifier, with no whitespace or quotes',
          }),
        ).annotate({
          title: 'Import specifier',
          description: 'Module specifier the generated files use to import from `output`.',
          examples: ['@packages/routes', '../lib', '.'],
        }),
      ),
    })
      .check(
        Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
          message: 'split mode requires directory, not .ts file',
        }),
      )
      .annotate({
        title: 'Webhooks output',
        description: 'Destination for the route definitions built from `webhooks`.',
      }),
  ),
  components: Schema.optionalKey(
    Schema.Struct({
      output: Schema.optionalKey(
        Schema.declare<`${string}.ts`>(Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])), {
          message: 'must be .ts file',
        }).annotate({
          title: 'Single-file components output',
          description:
            'Every component section in one file. Mutually exclusive with the per-type fields below.',
          examples: ['./src/components/index.ts'],
        }),
      ),
      schemas: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/schemas.ts', './src/schemas'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          exportTypes: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(false)),
          ).annotate({
            description: 'Also export the TypeScript type inferred from each generated schema.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Schemas output',
            description: 'Destination for `components.schemas`.',
          }),
      ),
      responses: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/responses.ts', './src/responses'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Responses output',
            description: 'Destination for `components.responses`.',
          }),
      ),
      parameters: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/parameters.ts', './src/parameters'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          exportTypes: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(false)),
          ).annotate({
            description: 'Also export the TypeScript type inferred from each generated schema.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Parameters output',
            description: 'Destination for `components.parameters`.',
          }),
      ),
      examples: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/examples.ts', './src/examples'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Examples output',
            description: 'Destination for `components.examples`.',
          }),
      ),
      requestBodies: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/requestBodies.ts', './src/requestBodies'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Request bodies output',
            description: 'Destination for `components.requestBodies`.',
          }),
      ),
      headers: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/headers.ts', './src/headers'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          exportTypes: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(false)),
          ).annotate({
            description: 'Also export the TypeScript type inferred from each generated schema.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Headers output',
            description: 'Destination for `components.headers`.',
          }),
      ),
      securitySchemes: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/securitySchemes.ts', './src/securitySchemes'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Security schemes output',
            description: 'Destination for `components.securitySchemes`.',
          }),
      ),
      links: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/links.ts', './src/links'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Links output',
            description: 'Destination for `components.links`.',
          }),
      ),
      callbacks: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/callbacks.ts', './src/callbacks'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Callbacks output',
            description: 'Destination for `components.callbacks`.',
          }),
      ),
      pathItems: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/pathItems.ts', './src/pathItems'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Path items output',
            description: 'Destination for `components.pathItems`.',
          }),
      ),
      mediaTypes: Schema.optionalKey(
        Schema.Struct({
          output: Schema.String.annotate({
            title: 'Output target',
            description:
              'A `.ts` file, or a directory — which takes one file per entry when `split` is true, and its `index.ts` when not.',
            examples: ['./src/mediaTypes.ts', './src/mediaTypes'],
          }),
          split: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
            description: 'Write one file per entry into `output` rather than a single file.',
          }),
          exportTypes: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(false)),
          ).annotate({
            description: 'Also export the TypeScript type inferred from each generated schema.',
          }),
          import: Schema.optionalKey(
            Schema.String.check(
              Schema.isPattern(/^[^\s'"`\\]+$/u, {
                message: 'must be a module specifier, with no whitespace or quotes',
              }),
            ).annotate({
              title: 'Import specifier',
              description: 'Module specifier the generated files use to import from `output`.',
              examples: ['@packages/routes', '../lib', '.'],
            }),
          ),
        })
          .check(
            Schema.makeFilter((v) => !(v.split && v.output.endsWith('.ts')), {
              message: 'split mode requires directory, not .ts file',
            }),
          )
          .annotate({
            title: 'Media types output',
            description: 'Destination for `components.mediaTypes`.',
          }),
      ),
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
      }),
  ),
  type: Schema.optionalKey(
    Schema.Struct({
      readonly: Schema.optionalKey(
        Schema.Boolean.annotate({
          description: 'Emit `readonly` modifiers on the declared types.',
        }),
      ),
      output: Schema.declare<`${string}.ts`>(
        Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])),
        { message: 'must be .ts file' },
      ).annotate({ title: 'Types output file', examples: ['./src/types.ts'] }),
    }).annotate({
      title: 'Standalone types output',
      description:
        'Plain TypeScript declarations for every operation and component, independent of the Zod schemas.',
      examples: [{ output: './src/types.ts', readonly: true }],
    }),
  ),
  rpc: Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/rpc.ts', './src/rpc'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      parseResponse: Schema.Boolean.pipe(
        Schema.withDecodingDefault(Effect.succeed(false)),
      ).annotate({
        description: 'Wrap each call in `parseResponse` so it resolves to the parsed body.',
      }),
      docs: Schema.Boolean.pipe(Schema.withDecodingDefault(Effect.succeed(false))).annotate({
        description: 'Emit the operation summary and description as JSDoc.',
      }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'RPC wrappers target',
      description: 'Typed function wrappers around the Hono RPC client, one per operation.',
      examples: [
        {
          output: './src/rpc.ts',
          import: '../lib',
          client: 'client',
          parseResponse: false,
          docs: false,
        },
      ],
    }),
  ),
  swr: Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/swr.ts', './src/swr'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'SWR hooks output',
      description: 'Generates `useSWR` / `useSWRMutation` hooks per operation.',
      examples: [{ output: './src/swr.ts', import: '../lib', client: 'client' }],
    }),
  ),
  'tanstack-query': Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/tanstack-query.ts', './src/tanstack-query'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'TanStack Query hooks output',
      description: 'Generates `@tanstack/react-query` hooks per operation.',
      examples: [{ output: './src/tanstack-query.ts', import: '../lib', client: 'client' }],
    }),
  ),
  'preact-query': Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/preact-query.ts', './src/preact-query'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'Preact Query hooks output',
      description: 'Generates `@tanstack/preact-query` hooks per operation.',
      examples: [{ output: './src/preact-query.ts', import: '../lib', client: 'client' }],
    }),
  ),
  'solid-query': Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/solid-query.ts', './src/solid-query'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'Solid Query hooks output',
      description: 'Generates `@tanstack/solid-query` hooks per operation.',
      examples: [{ output: './src/solid-query.ts', import: '../lib', client: 'client' }],
    }),
  ),
  'vue-query': Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/vue-query.ts', './src/vue-query'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'Vue Query hooks output',
      description: 'Generates `@tanstack/vue-query` hooks per operation.',
      examples: [{ output: './src/vue-query.ts', import: '../lib', client: 'client' }],
    }),
  ),
  'svelte-query': Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/svelte-query.ts', './src/svelte-query'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'Svelte Query hooks output',
      description: 'Generates `@tanstack/svelte-query` hooks per operation.',
      examples: [{ output: './src/svelte-query.ts', import: '../lib', client: 'client' }],
    }),
  ),
  'angular-query': Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/angular-query.ts', './src/angular-query'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      client: Schema.String.check(
        Schema.isPattern(/^[A-Za-z_$][A-Za-z0-9_$]*$/u, {
          message: 'must be a JavaScript identifier',
        }),
      )
        .pipe(Schema.withDecodingDefault(Effect.succeed('client')))
        .annotate({
          title: 'Client export name',
          description: 'Named export to import from `import` as the Hono client instance.',
          examples: ['client', 'apiClient'],
        }),
      split: Schema.optionalKey(
        Schema.Never.annotate({
          message:
            'split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
        }),
      ),
    }).annotate({
      title: 'Angular Query hooks output',
      description: 'Generates `@tanstack/angular-query-experimental` hooks per operation.',
      examples: [{ output: './src/angular-query.ts', import: '../lib', client: 'client' }],
    }),
  ),
  test: Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/test.ts', './src/test'],
      }),
      import: Schema.String.check(
        Schema.isPattern(/^[^\s'"`\\]+$/u, {
          message: 'must be a module specifier, with no whitespace or quotes',
        }),
      ).annotate({
        title: 'Import specifier',
        description: 'Module specifier the generated files use to import from `output`.',
        examples: ['@packages/routes', '../lib', '.'],
      }),
      testFramework: Schema.Literals(['vitest', 'vite-plus', 'bun'])
        .pipe(Schema.withDecodingDefault(Effect.succeed('vitest')))
        .annotate({
          title: 'Test framework',
          description: 'Framework whose import specifier the generated test files use.',
          examples: ['vitest', 'vite-plus', 'bun'],
        }),
    }).annotate({
      title: 'Route tests output',
      description: 'Generates a request-level test per operation against the generated app.',
      examples: [{ output: './src/test.ts', import: '.', testFramework: 'vitest' }],
    }),
  ),
  mock: Schema.optionalKey(
    Schema.Struct({
      output: Schema.String.annotate({
        title: 'Output file',
        description:
          'Single file that receives every generated entry. A directory path is normalized to `<dir>/index.ts`.',
        examples: ['./src/mock.ts', './src/mock'],
      }),
      useExamples: Schema.optionalKey(
        Schema.Union([Schema.Boolean, Schema.Literal('all')]).annotate({
          description:
            "Prefer the `example` / `examples` declared in the document over faker-generated values. `true` (default) uses a response's media-level example; `'all'` also uses the scalar example of every schema and property; `false` always generates.",
          examples: [true, 'all', false],
        }),
      ),
      seed: Schema.optionalKey(
        Schema.Union([
          Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(4_294_967_295),
          ),
          Schema.NonEmptyArray(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(4_294_967_295),
            ),
          ),
        ]).annotate({
          title: 'Faker seed',
          description:
            'Seeds faker at the start of every handler, so each route answers the same body on every request — stable enough for snapshot tests. Dates are generated relative to a fixed 2025-01-01T00:00:00Z, and the locale-specific faker instance is the one seeded. Bounded to a 32-bit unsigned integer, which is what faker hashes with Mersenne Twister.',
          examples: [42, [1, 2, 3]],
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
          Schema.Number.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(0),
            Schema.isLessThanOrEqualTo(60_000),
          ),
          Schema.Literal(false),
          Schema.Struct({
            min: Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(60_000),
            ),
            max: Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(60_000),
            ),
          }).check(
            Schema.makeFilter((v) => v.min <= v.max, {
              message: 'delay.min must be <= delay.max. Swap the values or remove one.',
            }),
          ),
        ]).annotate({
          title: 'Response delay',
          description:
            'Artificial latency in milliseconds: a fixed number, a `{ min, max }` range sampled per request, or `false` for none. Capped at 60000, so a mock cannot be configured to hang a request.',
          examples: [false, 300, { min: 100, max: 800 }],
        }),
      ),
      arrayMin: Schema.optionalKey(
        Schema.Number.check(
          Schema.isInt(),
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1000),
        ).annotate({
          description: 'Lower bound on the length of generated arrays. Must be <= `arrayMax`.',
          examples: [1],
        }),
      ),
      arrayMax: Schema.optionalKey(
        Schema.Number.check(
          Schema.isInt(),
          Schema.isGreaterThanOrEqualTo(0),
          Schema.isLessThanOrEqualTo(1000),
        ).annotate({
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
            seed: 42,
            delay: { min: 100, max: 800 },
            arrayMin: 1,
            arrayMax: 10,
          },
        ],
      }),
  ),
  docs: Schema.optionalKey(
    Schema.Union([
      Schema.Struct({
        output: Schema.declare<`${string}.md`>(
          Schema.is(Schema.TemplateLiteral([Schema.String, '.md'])),
          { message: 'must be .md file' },
        ).annotate({ title: 'Docs output file', examples: ['./docs/api.md'] }),
        curl: Schema.Literal(true).annotate({
          description: 'Write `curl` commands against `baseUrl`, which then becomes required.',
        }),
        baseUrl: Schema.String.check(
          Schema.isPattern(/^[^\s'"`\\]+$/u, {
            message: 'must be a URL, with no whitespace or quotes',
          }),
        )
          .annotate({
            description: 'Server the generated `curl` commands target.',
            examples: ['http://localhost:3000'],
          })
          .pipe(Schema.annotateKey({ messageMissingKey: 'baseUrl is required when curl is true' })),
        entry: Schema.optionalKey(
          Schema.Never.annotate({ message: 'entry cannot be specified when curl is true' }),
        ),
      }),
      Schema.Struct({
        output: Schema.declare<`${string}.md`>(
          Schema.is(Schema.TemplateLiteral([Schema.String, '.md'])),
          { message: 'must be .md file' },
        ).annotate({ title: 'Docs output file', examples: ['./docs/api.md'] }),
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
          Schema.String.check(
            Schema.isPattern(/^[^\s'"`\\]+$/u, {
              message: 'must be a URL, with no whitespace or quotes',
            }),
          ).annotate({
            description: 'Server shown in the examples.',
            examples: ['http://localhost:3000'],
          }),
        ),
      }),
    ]).annotate({
      title: 'Markdown docs output',
      description:
        'Generates a Markdown reference with one request example per operation. Discriminated on `curl`: with it `baseUrl` is required and `entry` is refused.',
      examples: [
        { output: './docs/api.md', curl: false, entry: 'src/index.ts' },
        { output: './docs/api.md', curl: true, baseUrl: 'http://localhost:3000' },
      ],
    }),
  ),
})
  // Every output path, pointed at a file: a generator that writes one file accepts a
  // directory as shorthand for the `index.ts` inside it, while a `split` target keeps the
  // directory it was given. Doing it here rather than on each `output` keeps the field
  // declarations above literal, and puts the rewrite ahead of the checks below — which
  // compare output paths against each other and would otherwise read two spellings of one
  // file as two files.
  .pipe(
    Schema.decode(
      SchemaTransformation.transform({
        decode: (config) => {
          // oxlint-disable-next-line unicorn/consistent-function-scoping -- reads with the transform it serves
          const target = <T extends { readonly output: string; readonly split?: boolean }>(v: T) =>
            v.split === true || v.output.endsWith('.ts')
              ? v
              : { ...v, output: `${v.output}/index.ts` }
          const components = config.components
          return {
            ...config,
            ...(config.routes ? { routes: target(config.routes) } : {}),
            ...(config.webhooks ? { webhooks: target(config.webhooks) } : {}),
            ...(components
              ? {
                  components: {
                    ...components,
                    ...(components.schemas ? { schemas: target(components.schemas) } : {}),
                    ...(components.responses ? { responses: target(components.responses) } : {}),
                    ...(components.parameters ? { parameters: target(components.parameters) } : {}),
                    ...(components.examples ? { examples: target(components.examples) } : {}),
                    ...(components.requestBodies
                      ? { requestBodies: target(components.requestBodies) }
                      : {}),
                    ...(components.headers ? { headers: target(components.headers) } : {}),
                    ...(components.securitySchemes
                      ? { securitySchemes: target(components.securitySchemes) }
                      : {}),
                    ...(components.links ? { links: target(components.links) } : {}),
                    ...(components.callbacks ? { callbacks: target(components.callbacks) } : {}),
                    ...(components.pathItems ? { pathItems: target(components.pathItems) } : {}),
                    ...(components.mediaTypes ? { mediaTypes: target(components.mediaTypes) } : {}),
                  },
                }
              : {}),
            ...(config.rpc ? { rpc: target(config.rpc) } : {}),
            ...(config.swr ? { swr: target(config.swr) } : {}),
            ...(config['tanstack-query']
              ? {
                  'tanstack-query': target(config['tanstack-query']),
                }
              : {}),
            ...(config['preact-query']
              ? {
                  'preact-query': target(config['preact-query']),
                }
              : {}),
            ...(config['solid-query']
              ? {
                  'solid-query': target(config['solid-query']),
                }
              : {}),
            ...(config['vue-query'] ? { 'vue-query': target(config['vue-query']) } : {}),
            ...(config['svelte-query']
              ? {
                  'svelte-query': target(config['svelte-query']),
                }
              : {}),
            ...(config['angular-query']
              ? {
                  'angular-query': target(config['angular-query']),
                }
              : {}),
            ...(config.test ? { test: target(config.test) } : {}),
            ...(config.mock ? { mock: target(config.mock) } : {}),
          }
        },
        encode: (config) => config,
      }),
    ),
  )
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
    // Two generators aimed at one path is silent data loss, not a merge: the CLI runs
    // every job concurrently, so whichever finishes last is the file that survives and
    // both still report success. Compared after decoding, where a directory `output`
    // has already become `<dir>/index.ts` and `./a.ts` and `a.ts` are the same path.
    Schema.makeFilter(
      (v) => {
        const declared: readonly (readonly [string, string | undefined])[] = [
          ['output', v.output],
          ['routes.output', v.routes?.output],
          ['webhooks.output', v.webhooks?.output],
          ['components.output', v.components?.output],
          ...COMPONENT_KINDS.map(
            (kind) => [`components.${kind}.output`, v.components?.[kind]?.output] as const,
          ),
          ['type.output', v.type?.output],
          ['rpc.output', v.rpc?.output],
          ...HOOK_KINDS.map((kind) => [`${kind}.output`, v[kind]?.output] as const),
          ['test.output', v.test?.output],
          ['mock.output', v.mock?.output],
          ['docs.output', v.docs?.output],
        ]
        const seen = new Map<string, string>()
        for (const [field, output] of declared) {
          if (output === undefined) continue
          const key = posix.normalize(output).replace(/\/+$/u, '')
          const first = seen.get(key)
          if (first !== undefined) {
            return `${field} and ${first} both write to ${output}. Give each generator its own output path.`
          }
          seen.set(key, field)
        }
        return true
      },
      { message: 'every generator needs its own output path' },
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
 * `notFound` is what lets the caller who ran `hono-takibi` with nothing be shown what the
 * command accepts, while every other failure already names the field that is wrong.
 *
 * `Schema.TaggedError` rather than `Data.TaggedError`: this is the error a schema decode
 * turns into, which is the shape the Schema guide models, and it makes the failure a
 * schema in its own right. The errors that never meet a schema (`FormatError`,
 * `GenerateError`, `OpenAPIError`) stay plain `Data.TaggedError`.
 */
// oxlint-disable-next-line unicorn/throw-new-error -- `Schema.TaggedError()` is the class factory, not a throw
export class ConfigError extends Schema.TaggedError<ConfigError>()('ConfigError', {
  message: Schema.String.annotate({
    description: 'The sentence printed to the caller, naming the field that is wrong.',
    examples: ['Invalid config: rpc.import: must be a module specifier'],
  }),
  notFound: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: 'There is no config file at all, as opposed to one that does not validate.',
    }),
  ),
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

// A module specifier is imported once per process, so a watch pass that asked for the
// same config file would get the copy from before the edit. The counter is what makes
// each reload a specifier the loader has not seen.
let reloadCount = 0

/**
 * Loads and validates a config file, resolved against the current directory.
 *
 * `reload` re-reads a config that has already been imported — what `--watch` needs after
 * the file changes, and nothing else should ask for, since every reload leaves another
 * copy of the module behind.
 */
export function readConfig(configPath?: string, reload = false) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const abs = resolve(process.cwd(), configPath ?? 'hono-takibi.config.ts')
    // Checked before importing so a missing file reads as "no config here" rather than
    // as whatever the module loader throws.
    const found = yield* fs
      .exists(abs)
      .pipe(Effect.catchTag('PlatformError', () => Effect.succeed(false)))
    if (!found) {
      return yield* new ConfigError({ message: `Config not found: ${abs}`, notFound: true })
    }
    const href = pathToFileURL(abs).href
    const specifier = reload ? `${href}?reload=${String((reloadCount += 1))}` : href
    const mod: unknown = yield* Effect.tryPromise({
      try: () => import(specifier),
      catch: (error) =>
        new ConfigError({ message: error instanceof Error ? error.message : String(error) }),
    })
    // `'default' in mod` is what narrows `mod` for TypeScript, not a second runtime check
    // — an absent key already reads as `undefined` below. `export default undefined`
    // leaves the key present, which is why both halves are here.
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
