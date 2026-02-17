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
    basePath: z.string().exactOptional(),
    // oxfmt format options for generated code output
    format: z
      .object({
        /** The line length that the printer will wrap on. (Default: 100) */
        printWidth: z.number().exactOptional(),
        /** Number of spaces per indentation-level. (Default: 2) */
        tabWidth: z.number().exactOptional(),
        /** Indent lines with tabs instead of spaces. (Default: false) */
        useTabs: z.boolean().exactOptional(),
        /** Which end of line characters to apply. (Default: "lf") */
        endOfLine: z.enum(['lf', 'crlf', 'cr']).exactOptional(),
        /** Whether to insert a final newline at the end of the file. (Default: true) */
        insertFinalNewline: z.boolean().exactOptional(),
        /** Print semicolons at the ends of statements. (Default: true) */
        semi: z.boolean().exactOptional(),
        /** Use single quotes instead of double quotes. (Default: false) */
        singleQuote: z.boolean().exactOptional(),
        /** Use single quotes in JSX. (Default: false) */
        jsxSingleQuote: z.boolean().exactOptional(),
        /** Change when properties in objects are quoted. (Default: "as-needed") */
        quoteProps: z.enum(['as-needed', 'consistent', 'preserve']).exactOptional(),
        /** Print trailing commas wherever possible. (Default: "all") */
        trailingComma: z.enum(['all', 'es5', 'none']).exactOptional(),
        /** Print spaces between brackets in object literals. (Default: true) */
        bracketSpacing: z.boolean().exactOptional(),
        /** Put the > of a multi-line HTML element at the end of the last line. (Default: false) */
        bracketSameLine: z.boolean().exactOptional(),
        /** How to wrap object literals. (Default: "preserve") */
        objectWrap: z.enum(['preserve', 'collapse']).exactOptional(),
        /** Include parentheses around a sole arrow function parameter. (Default: "always") */
        arrowParens: z.enum(['always', 'avoid']).exactOptional(),
        /** Enforce single attribute per line in HTML, Vue and JSX. (Default: false) */
        singleAttributePerLine: z.boolean().exactOptional(),
        /** How to wrap markdown text. (Default: "preserve") */
        proseWrap: z.enum(['always', 'never', 'preserve']).exactOptional(),
        /** How to handle whitespaces in HTML. (Default: "css") */
        htmlWhitespaceSensitivity: z.enum(['css', 'strict', 'ignore']).exactOptional(),
        /** Whether to indent the code inside <script> and <style> tags in Vue files. (Default: false) */
        vueIndentScriptAndStyle: z.boolean().exactOptional(),
        /** Control whether to format quoted code embedded in the file. (Default: "auto") */
        embeddedLanguageFormatting: z.enum(['auto', 'off']).exactOptional(),
        /** Experimental: Sort import statements. Disabled by default. */
        experimentalSortImports: z
          .object({
            /** Partition imports by newlines. (Default: false) */
            partitionByNewline: z.boolean().exactOptional(),
            /** Partition imports by comments. (Default: false) */
            partitionByComment: z.boolean().exactOptional(),
            /** Sort side-effect imports. (Default: false) */
            sortSideEffects: z.boolean().exactOptional(),
            /** Sort order. (Default: "asc") */
            order: z.enum(['asc', 'desc']).exactOptional(),
            /** Ignore case when sorting. (Default: true) */
            ignoreCase: z.boolean().exactOptional(),
            /** Add newlines between import groups. (Default: true) */
            newlinesBetween: z.boolean().exactOptional(),
            /** Prefixes to identify internal imports. (Default: ["~/", "@/"]) */
            internalPattern: z.array(z.string()).exactOptional(),
            /** Groups configuration for organizing imports. */
            groups: z.array(z.union([z.string(), z.array(z.string())])).exactOptional(),
            /** Define custom groups for matching specific imports. */
            customGroups: z
              .array(z.object({ groupName: z.string(), elementNamePattern: z.array(z.string()) }))
              .exactOptional(),
          })
          .strict()
          .exactOptional(),
        /** Experimental: Sort package.json keys. (Default: true) */
        experimentalSortPackageJson: z.boolean().exactOptional(),
        /** Experimental: Enable Tailwind CSS class sorting. Disabled by default. */
        experimentalTailwindcss: z
          .object({
            /** Path to Tailwind config file (v3). */
            config: z.string().exactOptional(),
            /** Path to Tailwind stylesheet (v4). */
            stylesheet: z.string().exactOptional(),
            /** List of custom function names whose arguments should be sorted. */
            functions: z.array(z.string()).exactOptional(),
            /** List of additional HTML/JSX attributes to sort. */
            attributes: z.array(z.string()).exactOptional(),
            /** Preserve whitespace around classes. (Default: false) */
            preserveWhitespace: z.boolean().exactOptional(),
            /** Preserve duplicate classes. (Default: false) */
            preserveDuplicates: z.boolean().exactOptional(),
          })
          .strict()
          .exactOptional(),
      })
      .strict()
      .exactOptional(),
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
            test: z.boolean().default(false).exactOptional(),
            routeHandler: z.boolean().default(false).exactOptional(),
            pathAlias: z.string().exactOptional(),
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
        basePath: z.string().exactOptional(),
      })
      .exactOptional(),
    docs: z
      .object({
        output: z.custom<`${string}.md`>((v) => typeof v === 'string' && v.endsWith('.md'), {
          message: 'must be .md file',
        }),
        entry: z.string().default('src/index.ts').exactOptional(),
        basePath: z.string().exactOptional(),
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
