import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { type FormatConfig } from 'oxfmt'
import * as z from 'zod'

const ConfigSchema = z
  .object({
    input: z.templateLiteral([z.string().min(1), z.enum(['.yaml', '.json', '.tsp'])], {
      error: 'must be .yaml | .json | .tsp',
    }),
    basePath: z.string().exactOptional(),
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
          .discriminatedUnion('split', [
            z
              .object({
                split: z.literal(true),
                output: z.string().regex(/^(?!.*\.ts$).+/, {
                  error: 'split mode requires directory, not .ts file',
                }),
                import: z.string().exactOptional(),
              })
              .readonly(),
            z
              .object({
                split: z.literal(false).optional().default(false),
                output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                import: z.string().exactOptional(),
              })
              .readonly(),
          ])
          .exactOptional(),
        components: z
          .object({
            schemas: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            parameters: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            headers: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            securitySchemes: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            requestBodies: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            responses: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            examples: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            links: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            callbacks: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            pathItems: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            mediaTypes: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                    exportTypes: z.boolean().exactOptional(),
                  })
                  .readonly(),
              ])
              .exactOptional(),
            webhooks: z
              .discriminatedUnion('split', [
                z
                  .object({
                    split: z.literal(true),
                    output: z.string().regex(/^(?!.*\.ts$).+/, {
                      error: 'split mode requires directory, not .ts file',
                    }),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
                z
                  .object({
                    split: z.literal(false).optional().default(false),
                    output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
                    import: z.string().exactOptional(),
                  })
                  .readonly(),
              ])
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
        output: z.templateLiteral([z.string().min(1), z.enum(['.ts'])], {
          error: 'must be .ts file',
        }),
      })
      .readonly()
      .exactOptional(),
    rpc: z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
            parseResponse: z.boolean().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
            parseResponse: z.boolean().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    swr: z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    'tanstack-query': z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    'preact-query': z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    'solid-query': z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    'vue-query': z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    'svelte-query': z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    'angular-query': z
      .discriminatedUnion('split', [
        z
          .object({
            split: z.literal(true),
            output: z.string().regex(/^(?!.*\.ts$).+/, {
              error: 'split mode requires directory, not .ts file',
            }),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
        z
          .object({
            split: z.literal(false).optional().default(false),
            output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
            import: z.string(),
            client: z.string().exactOptional(),
          })
          .readonly(),
      ])
      .exactOptional(),
    test: z
      .object({
        output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
        import: z.string(),
        testFramework: z.enum(['vitest', 'vite-plus', 'bun']).default('vitest').exactOptional(),
      })
      .readonly()
      .exactOptional(),
    mock: z
      .object({
        output: z.string().transform((v) => (v.endsWith('.ts') ? v : `${v}/index.ts`)),
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

export function defineConfig(config: z.infer<typeof ConfigSchema>) {
  return config
}
