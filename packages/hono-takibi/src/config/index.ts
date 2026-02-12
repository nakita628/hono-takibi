/**
 * Configuration module for hono-takibi.
 *
 * Provides configuration type definitions and utilities for loading
 * and validating hono-takibi configuration files.
 *
 * ```mermaid
 * flowchart TD
 *   A["hono-takibi.config.ts"] --> B["readConfig()"]
 *   B --> C["ConfigSchema.safeParse()"]
 *   C --> D{"Valid?"}
 *   D -->|Yes| E["Normalized Config"]
 *   D -->|No| F["Error message"]
 * ```
 *
 * @module config
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { register } from 'tsx/esm/api'
import * as z from 'zod'

const ConfigSchema = z
  .object({
    input: z.custom<`${string}.yaml` | `${string}.json` | `${string}.tsp`>(
      (v) =>
        typeof v === 'string' && (v.endsWith('.yaml') || v.endsWith('.json') || v.endsWith('.tsp')),
      { message: 'must be .yaml | .json | .tsp' },
    ),
    'zod-openapi': z
      .object({
        output: z
          .custom<`${string}.ts`>((v) => typeof v === 'string' && v.endsWith('.ts'), {
            message: 'must be .ts file',
          })
          .exactOptional(),
        readonly: z.boolean().exactOptional(),
        template: z.boolean().exactOptional(),
        test: z.boolean().exactOptional(),
        basePath: z.string().exactOptional(),
        pathAlias: z.string().exactOptional(),
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
            output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            requestBodies: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            responses: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            examples: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            links: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            callbacks: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            pathItems: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .refine((v) => !(v.split === true && v.output.endsWith('.ts')), {
                message: 'split mode requires directory, not .ts file',
              })
              .exactOptional(),
            mediaTypes: z
              .object({
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
                output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
                split: z.boolean().exactOptional(),
                import: z.string().exactOptional(),
              })
              .exactOptional(),
          })
          .exactOptional(),
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
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
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
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
        import: z.string(),
      })
      .exactOptional(),
    mock: z
      .object({
        output: z.custom<string | `${string}.ts`>((v) => typeof v === 'string'),
      })
      .exactOptional(),
    docs: z
      .object({
        output: z.custom<`${string}.md`>((v) => typeof v === 'string' && v.endsWith('.md'), {
          message: 'must be .md file',
        }),
        entry: z.string().default('src/index.ts'),
      })
      .exactOptional(),
  })
  .transform((config) => {
    const normalize = (output: string, split?: boolean) =>
      split !== true && !output.endsWith('.ts') ? `${output}/index.ts` : output

    return {
      ...config,
      ...(config['zod-openapi'] && {
        'zod-openapi': {
          ...config['zod-openapi'],
          ...(config['zod-openapi'].routes && {
            routes: {
              ...config['zod-openapi'].routes,
              output: normalize(
                config['zod-openapi'].routes.output,
                config['zod-openapi'].routes.split,
              ),
            },
          }),
          ...(config['zod-openapi'].components && {
            components: {
              ...(config['zod-openapi'].components.schemas && {
                schemas: {
                  ...config['zod-openapi'].components.schemas,
                  output: normalize(
                    config['zod-openapi'].components.schemas.output,
                    config['zod-openapi'].components.schemas.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.parameters && {
                parameters: {
                  ...config['zod-openapi'].components.parameters,
                  output: normalize(
                    config['zod-openapi'].components.parameters.output,
                    config['zod-openapi'].components.parameters.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.headers && {
                headers: {
                  ...config['zod-openapi'].components.headers,
                  output: normalize(
                    config['zod-openapi'].components.headers.output,
                    config['zod-openapi'].components.headers.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.securitySchemes && {
                securitySchemes: {
                  ...config['zod-openapi'].components.securitySchemes,
                  output: normalize(
                    config['zod-openapi'].components.securitySchemes.output,
                    config['zod-openapi'].components.securitySchemes.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.requestBodies && {
                requestBodies: {
                  ...config['zod-openapi'].components.requestBodies,
                  output: normalize(
                    config['zod-openapi'].components.requestBodies.output,
                    config['zod-openapi'].components.requestBodies.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.responses && {
                responses: {
                  ...config['zod-openapi'].components.responses,
                  output: normalize(
                    config['zod-openapi'].components.responses.output,
                    config['zod-openapi'].components.responses.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.examples && {
                examples: {
                  ...config['zod-openapi'].components.examples,
                  output: normalize(
                    config['zod-openapi'].components.examples.output,
                    config['zod-openapi'].components.examples.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.links && {
                links: {
                  ...config['zod-openapi'].components.links,
                  output: normalize(
                    config['zod-openapi'].components.links.output,
                    config['zod-openapi'].components.links.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.callbacks && {
                callbacks: {
                  ...config['zod-openapi'].components.callbacks,
                  output: normalize(
                    config['zod-openapi'].components.callbacks.output,
                    config['zod-openapi'].components.callbacks.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.pathItems && {
                pathItems: {
                  ...config['zod-openapi'].components.pathItems,
                  output: normalize(
                    config['zod-openapi'].components.pathItems.output,
                    config['zod-openapi'].components.pathItems.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.mediaTypes && {
                mediaTypes: {
                  ...config['zod-openapi'].components.mediaTypes,
                  output: normalize(
                    config['zod-openapi'].components.mediaTypes.output,
                    config['zod-openapi'].components.mediaTypes.split,
                  ),
                },
              }),
              ...(config['zod-openapi'].components.webhooks && {
                webhooks: {
                  ...config['zod-openapi'].components.webhooks,
                  output: normalize(
                    config['zod-openapi'].components.webhooks.output,
                    config['zod-openapi'].components.webhooks.split,
                  ),
                },
              }),
            },
          }),
        },
      }),
      ...(config.rpc && {
        rpc: { ...config.rpc, output: normalize(config.rpc.output, config.rpc.split) },
      }),
      ...(config.swr && {
        swr: { ...config.swr, output: normalize(config.swr.output, config.swr.split) },
      }),
      ...(config['tanstack-query'] && {
        'tanstack-query': {
          ...config['tanstack-query'],
          output: normalize(config['tanstack-query'].output, config['tanstack-query'].split),
        },
      }),
      ...(config['svelte-query'] && {
        'svelte-query': {
          ...config['svelte-query'],
          output: normalize(config['svelte-query'].output, config['svelte-query'].split),
        },
      }),
      ...(config['vue-query'] && {
        'vue-query': {
          ...config['vue-query'],
          output: normalize(config['vue-query'].output, config['vue-query'].split),
        },
      }),
      ...(config.test && {
        test: {
          ...config.test,
          output: config.test.output.endsWith('.ts')
            ? config.test.output
            : `${config.test.output}/index.ts`,
        },
      }),
      ...(config.mock && {
        mock: {
          ...config.mock,
          output: config.mock.output.endsWith('.ts')
            ? config.mock.output
            : `${config.mock.output}/index.ts`,
        },
      }),
    }
  })
  .readonly()

type Config = z.infer<typeof ConfigSchema>

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
    const mod: { readonly default: unknown } = await import(/* @vite-ignore */ url)
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
export function defineConfig(config: Config): Config {
  return config
}
