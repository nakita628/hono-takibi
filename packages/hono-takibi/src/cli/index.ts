import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { readConfig } from '../config/index.js'
import {
  callbacks,
  docs,
  examples,
  headers,
  hooks,
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
  takibi,
  template,
  test,
  type,
  webhooks,
} from '../core/index.js'
import { setFormatOptions } from '../format/index.js'
import { parseOpenAPI } from '../openapi/index.js'

const HELP_TEXT = `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`

function parseCli(args: readonly string[]) {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined
  const isYamlOrJsonOrTsp = (
    i: string,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
  const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')
  if (!(input && output && isYamlOrJsonOrTsp(input) && isTs(output))) {
    return {
      ok: false,
      error: HELP_TEXT,
    } as const
  }
  return {
    ok: true,
    value: {
      input,
      output,
    },
  } as const
}

export async function honoTakibi() {
  const args = process.argv.slice(2)
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    return { ok: true, value: HELP_TEXT } as const
  }
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) {
    const cliResult = parseCli(args)
    if (!cliResult.ok) return { ok: false, error: cliResult.error } as const
    const { input, output } = cliResult.value
    const openAPIResult = await parseOpenAPI(input)
    if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error } as const
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
    if (!takibiResult.ok) return { ok: false, error: takibiResult.error } as const
    return { ok: true, value: takibiResult.value } as const
  }
  const readConfigResult = await readConfig()
  if (!readConfigResult.ok) return { ok: false, error: readConfigResult.error } as const
  const config = readConfigResult.value
  if (config.format) setFormatOptions(config.format)
  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error } as const
  const openAPI = openAPIResult.value
  const results = await Promise.all([
    config['zod-openapi']?.output
      ? takibi(openAPI, config['zod-openapi'].output, {
          ...(config['zod-openapi'].readonly !== undefined
            ? { readonly: config['zod-openapi'].readonly }
            : {}),
          exportSchemas: config['zod-openapi'].exportSchemas,
          exportSchemasTypes: config['zod-openapi'].exportSchemasTypes,
          exportResponses: config['zod-openapi'].exportResponses,
          exportParameters: config['zod-openapi'].exportParameters,
          exportParametersTypes: config['zod-openapi'].exportParametersTypes,
          exportExamples: config['zod-openapi'].exportExamples,
          exportRequestBodies: config['zod-openapi'].exportRequestBodies,
          exportHeaders: config['zod-openapi'].exportHeaders,
          exportHeadersTypes: config['zod-openapi'].exportHeadersTypes,
          exportSecuritySchemes: config['zod-openapi'].exportSecuritySchemes,
          exportLinks: config['zod-openapi'].exportLinks,
          exportCallbacks: config['zod-openapi'].exportCallbacks,
          exportPathItems: config['zod-openapi'].exportPathItems,
          exportMediaTypes: config['zod-openapi'].exportMediaTypes,
          exportMediaTypesTypes: config['zod-openapi'].exportMediaTypesTypes,
        })
      : Promise.resolve(undefined),
    config['zod-openapi']?.webhooks
      ? webhooks(
          openAPI,
          config['zod-openapi'].webhooks,
          config['zod-openapi'].components,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.schemas
      ? schemas(
          openAPI.components?.schemas,
          config['zod-openapi'].components.schemas.output,
          config['zod-openapi'].components.schemas.split,
          config['zod-openapi'].components.schemas.exportTypes,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.parameters
      ? parameters(
          openAPI.components?.parameters,
          config['zod-openapi'].components.parameters.output,
          config['zod-openapi'].components.parameters.split,
          config['zod-openapi'].components.parameters.exportTypes,
          config['zod-openapi'].components,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.headers
      ? headers(
          openAPI.components?.headers,
          config['zod-openapi'].components.headers.output,
          config['zod-openapi'].components.headers.split,
          config['zod-openapi'].components.headers.exportTypes,
          config['zod-openapi'].components,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.examples
      ? examples(
          openAPI.components?.examples,
          config['zod-openapi'].components.examples.output,
          config['zod-openapi'].components.examples.split,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.links
      ? links(
          openAPI.components?.links,
          config['zod-openapi'].components.links.output,
          config['zod-openapi'].components.links.split,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.callbacks
      ? callbacks(
          openAPI.components?.callbacks,
          config['zod-openapi'].components.callbacks.output,
          config['zod-openapi'].components.callbacks.split,
          config['zod-openapi'].components,
          config['zod-openapi'].readonly,
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
          config['zod-openapi'].components.mediaTypes.output,
          config['zod-openapi'].components.mediaTypes.split,
          config['zod-openapi'].readonly,
          config['zod-openapi'].components,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.securitySchemes
      ? securitySchemes(
          openAPI.components?.securitySchemes,
          config['zod-openapi'].components.securitySchemes.output,
          config['zod-openapi'].components.securitySchemes.split,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.requestBodies
      ? requestBodies(
          openAPI.components?.requestBodies,
          config['zod-openapi'].components.requestBodies.output,
          config['zod-openapi'].components.requestBodies.split,
          config['zod-openapi'].components,
          config['zod-openapi'].readonly,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.responses
      ? responses(
          openAPI.components?.responses,
          config['zod-openapi'].components.responses.output,
          config['zod-openapi'].components.responses.split,
          config['zod-openapi'].components,
          config['zod-openapi'].readonly,
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
          config.rpc.split,
          config.rpc.client,
          config.rpc.parseResponse,
          config.basePath,
          config.rpc.docs,
        )
      : Promise.resolve(undefined),
    config.swr
      ? hooks(openAPI, config.swr.output, config.swr.import, 'swr', {
          split: config.swr.split,
          clientName: config.swr.client,
        })
      : Promise.resolve(undefined),
    config['tanstack-query']
      ? hooks(
          openAPI,
          config['tanstack-query'].output,
          config['tanstack-query'].import,
          'tanstack-query',
          { split: config['tanstack-query'].split, clientName: config['tanstack-query'].client },
        )
      : Promise.resolve(undefined),
    config['preact-query']
      ? hooks(
          openAPI,
          config['preact-query'].output,
          config['preact-query'].import,
          'preact-query',
          { split: config['preact-query'].split, clientName: config['preact-query'].client },
        )
      : Promise.resolve(undefined),
    config['solid-query']
      ? hooks(
          openAPI,
          config['solid-query'].output,
          config['solid-query'].import,
          'solid-query',
          { split: config['solid-query'].split, clientName: config['solid-query'].client },
        )
      : Promise.resolve(undefined),
    config['vue-query']
      ? hooks(openAPI, config['vue-query'].output, config['vue-query'].import, 'vue-query', {
          split: config['vue-query'].split,
          clientName: config['vue-query'].client,
        })
      : Promise.resolve(undefined),
    config['svelte-query']
      ? hooks(
          openAPI,
          config['svelte-query'].output,
          config['svelte-query'].import,
          'svelte-query',
          { split: config['svelte-query'].split, clientName: config['svelte-query'].client },
        )
      : Promise.resolve(undefined),
    config['angular-query']
      ? hooks(
          openAPI,
          config['angular-query'].output,
          config['angular-query'].import,
          'angular-query',
          { split: config['angular-query'].split, clientName: config['angular-query'].client },
        )
      : Promise.resolve(undefined),
    config.test
      ? test(
          openAPI,
          config.test.output,
          config.test.import,
          config.basePath ?? '/',
          config.test.testFramework,
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
        config['zod-openapi']?.template.testFramework,
      )
    })(),
  ])
  const e = results.find((result) => result && !result.ok)
  if (e) return e
  const value = results
    .map((result) => (result?.ok ? result.value : undefined))
    .filter((v) => v !== undefined)
    .join('\n')
  return { ok: true, value } as const
}
