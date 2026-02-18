import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { readConfig } from '../config/index.js'
import {
  callbacks,
  docs,
  examples,
  headers,
  links,
  mediaTypes,
  mock,
  parameters,
  pathItems,
  requestBodies,
  responses,
  route,
  rpc,
  schemas,
  securitySchemes,
  svelteQuery,
  swr,
  takibi,
  tanstackQuery,
  template,
  test,
  type,
  vueQuery,
  webhooks,
} from '../core/index.js'
import { setFormatOptions } from '../format/index.js'
import { parseOpenAPI } from '../openapi/index.js'

const HELP_TEXT = `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`

/** Parses raw CLI arguments into `{ input, output }`. */
function parseCli(args: readonly string[]):
  | {
      readonly ok: true
      readonly value: {
        readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
        readonly output: `${string}.ts`
      }
    }
  | {
      readonly ok: false
      readonly error: string
    } {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined
  /** yaml or json or tsp */
  const isYamlOrJsonOrTsp = (
    i: string,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
  const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')
  if (!(input && output && isYamlOrJsonOrTsp(input) && isTs(output))) {
    return {
      ok: false,
      error: HELP_TEXT,
    }
  }
  return {
    ok: true,
    value: {
      input,
      output,
    },
  }
}

export async function honoTakibi(): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const args = process.argv.slice(2)
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    return { ok: true, value: HELP_TEXT }
  }

  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')

  if (!existsSync(abs)) {
    const cliResult = parseCli(args)
    if (!cliResult.ok) return { ok: false, error: cliResult.error }
    const { input, output } = cliResult.value
    const openAPIResult = await parseOpenAPI(input)
    if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
    const openAPI = openAPIResult.value
    const takibiResult = await takibi(openAPI, output, {
      readonly: false,
      exportSchemas: false,
      exportSchemasTypes: false,
      exportResponses: false,
      exportParameters: false,
      exportParametersTypes: false,
      exportExamples: false,
      exportRequestBodies: false,
      exportHeaders: false,
      exportHeadersTypes: false,
      exportSecuritySchemes: false,
      exportLinks: false,
      exportCallbacks: false,
      exportPathItems: false,
      exportMediaTypes: false,
      exportMediaTypesTypes: false,
    })
    if (!takibiResult.ok) return { ok: false, error: takibiResult.error }
    return { ok: true, value: takibiResult.value }
  }

  const readConfigResult = await readConfig()
  if (!readConfigResult.ok) return { ok: false, error: readConfigResult.error }
  const config = readConfigResult.value

  if (config.format) setFormatOptions(config.format)

  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const results = await Promise.all([
    config['zod-openapi']?.output
      ? takibi(openAPI, config['zod-openapi'].output, {
          readonly: config['zod-openapi'].readonly,
          // OpenAPI Components Object order
          exportSchemas: config['zod-openapi'].exportSchemas ?? false,
          exportSchemasTypes: config['zod-openapi'].exportSchemasTypes ?? false,
          exportResponses: config['zod-openapi'].exportResponses ?? false,
          exportParameters: config['zod-openapi'].exportParameters ?? false,
          exportParametersTypes: config['zod-openapi'].exportParametersTypes ?? false,
          exportExamples: config['zod-openapi'].exportExamples ?? false,
          exportRequestBodies: config['zod-openapi'].exportRequestBodies ?? false,
          exportHeaders: config['zod-openapi'].exportHeaders ?? false,
          exportHeadersTypes: config['zod-openapi'].exportHeadersTypes ?? false,
          exportSecuritySchemes: config['zod-openapi'].exportSecuritySchemes ?? false,
          exportLinks: config['zod-openapi'].exportLinks ?? false,
          exportCallbacks: config['zod-openapi'].exportCallbacks ?? false,
          exportPathItems: config['zod-openapi'].exportPathItems ?? false,
          exportMediaTypes: config['zod-openapi'].exportMediaTypes ?? false,
          exportMediaTypesTypes: config['zod-openapi'].exportMediaTypesTypes ?? false,
        })
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.schemas
      ? schemas(
          openAPI.components?.schemas,
          config['zod-openapi']?.components?.schemas?.output,
          config['zod-openapi']?.components?.schemas?.split ?? false,
          config['zod-openapi']?.components?.schemas?.exportTypes ?? false,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.parameters
      ? parameters(
          openAPI.components?.parameters,
          config['zod-openapi']?.components?.parameters?.output,
          config['zod-openapi']?.components?.parameters?.split ?? false,
          config['zod-openapi']?.components?.parameters?.exportTypes ?? false,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.headers
      ? headers(
          openAPI.components?.headers,
          config['zod-openapi']?.components?.headers?.output,
          config['zod-openapi']?.components?.headers?.split ?? false,
          config['zod-openapi']?.components?.headers?.exportTypes ?? false,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.examples
      ? examples(
          openAPI.components?.examples,
          config['zod-openapi']?.components?.examples?.output,
          config['zod-openapi']?.components?.examples?.split ?? false,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.links
      ? links(
          openAPI.components?.links,
          config['zod-openapi']?.components?.links?.output,
          config['zod-openapi']?.components?.links?.split ?? false,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.callbacks
      ? callbacks(
          openAPI.components?.callbacks,
          config['zod-openapi']?.components?.callbacks?.output,
          config['zod-openapi']?.components?.callbacks?.split ?? false,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.pathItems
      ? pathItems(
          openAPI.components ?? {},
          config['zod-openapi']?.components?.pathItems,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.mediaTypes
      ? mediaTypes(
          openAPI.components?.mediaTypes,
          config['zod-openapi']?.components?.mediaTypes?.output,
          config['zod-openapi']?.components?.mediaTypes?.split ?? false,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.webhooks
      ? webhooks(
          openAPI,
          config['zod-openapi']?.components?.webhooks,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.securitySchemes
      ? securitySchemes(
          openAPI.components?.securitySchemes,
          config['zod-openapi']?.components?.securitySchemes?.output,
          config['zod-openapi']?.components?.securitySchemes?.split ?? false,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.requestBodies
      ? requestBodies(
          openAPI.components?.requestBodies,
          config['zod-openapi']?.components?.requestBodies?.output,
          config['zod-openapi']?.components?.requestBodies?.split ?? false,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.responses
      ? responses(
          openAPI.components?.responses,
          config['zod-openapi']?.components?.responses?.output,
          config['zod-openapi']?.components?.responses?.split ?? false,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.routes
      ? route(
          openAPI,
          config['zod-openapi'].routes,
          config['zod-openapi'].components,
          config['zod-openapi']?.readonly,
        )
      : Promise.resolve(undefined),
    config.type
      ? type(openAPI, config.type.output, config.type.readonly)
      : Promise.resolve(undefined),
    config.rpc
      ? rpc(
          openAPI,
          config.rpc.output,
          config.rpc.import,
          config.rpc.split ?? false,
          config.rpc.client ?? 'client',
          config.rpc.parseResponse ?? false,
          config.basePath,
        )
      : Promise.resolve(undefined),
    config.swr
      ? swr(
          openAPI,
          config.swr.output,
          config.swr.import,
          config.swr.split ?? false,
          config.swr.client ?? 'client',
        )
      : Promise.resolve(undefined),
    config['tanstack-query']
      ? tanstackQuery(
          openAPI,
          config['tanstack-query'].output,
          config['tanstack-query'].import,
          config['tanstack-query'].split ?? false,
          config['tanstack-query'].client ?? 'client',
        )
      : Promise.resolve(undefined),
    config['svelte-query']
      ? svelteQuery(
          openAPI,
          config['svelte-query'].output,
          config['svelte-query'].import,
          config['svelte-query'].split ?? false,
          config['svelte-query'].client ?? 'client',
        )
      : Promise.resolve(undefined),
    config['vue-query']
      ? vueQuery(
          openAPI,
          config['vue-query'].output,
          config['vue-query'].import,
          config['vue-query'].split ?? false,
          config['vue-query'].client ?? 'client',
        )
      : Promise.resolve(undefined),
    config.test
      ? test(
          openAPI,
          config.test.output,
          config.test.import,
          config.basePath ?? '/',
          config.test.framework,
        )
      : Promise.resolve(undefined),
    config.mock
      ? mock(openAPI, config.mock.output, config.basePath ?? '/', config['zod-openapi']?.readonly)
      : Promise.resolve(undefined),
    config.docs
      ? docs(
          openAPI,
          config.docs.output,
          config.docs.entry,
          config.basePath ?? '/',
          config.docs.curl,
          config.docs.baseUrl,
        )
      : Promise.resolve(undefined),
    (() => {
      if (!config['zod-openapi']?.template) return Promise.resolve(undefined)
      if (!(config['zod-openapi']?.output ?? config['zod-openapi']?.routes?.output))
        return Promise.resolve(undefined)
      return template(
        openAPI,
        config['zod-openapi']?.output ??
          config['zod-openapi']?.routes?.output ??
          'src/routes/index.ts',
        config['zod-openapi']?.template.test,
        config.basePath ?? '/',
        config['zod-openapi']?.template.pathAlias,
        config['zod-openapi']?.routes?.import,
        config['zod-openapi']?.template.routeHandler,
        config['zod-openapi']?.template.framework,
      )
    })(),
  ])

  for (const r of results) {
    if (r && !r.ok) return { ok: false, error: r.error }
  }

  return {
    ok: true,
    value: results
      .filter((r) => r?.ok === true)
      .map((r) => r.value)
      .join('\n'),
  }
}
