import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from '../config/index.js'
import { componentsCore } from '../core/index.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { schemas } from '../core/schemas.js'
import { takibi } from '../core/takibi.js'
import { type } from '../core/type.js'
import { parseOpenAPI } from '../openapi/index.js'
import { parseCli } from '../utils/index.js'

const HELP_TEXT = `Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-schemas-types      export schemas types
  --export-schemas            export schemas
  --export-parameters-types   export parameters types
  --export-parameters         export parameters
  --export-security-schemes   export securitySchemes
  --export-request-bodies     export requestBodies
  --export-responses          export responses
  --export-headers-types      export headers types
  --export-headers            export headers
  --export-examples           export examples
  --export-links              export links
  --export-callbacks          export callbacks
  --template                  generate app file and handler stubs
  --test                      generate empty *.test.ts files
  --base-path <path>          api prefix (default: /)
  -h, --help                  display help for command`

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
    const cli = cliResult.value
    const { input, output, template, test, basePath, componentsOptions } = cli
    const openAPIResult = await parseOpenAPI(input)
    if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
    const openAPI = openAPIResult.value
    const takibiResult = await takibi(openAPI, output, template, test, basePath, componentsOptions)
    if (!takibiResult.ok) return { ok: false, error: takibiResult.error }
    return { ok: true, value: takibiResult.value }
  }

  const configResult = await config()
  if (!configResult.ok) return { ok: false, error: configResult.error }
  const c = configResult.value

  const openAPIResult = await parseOpenAPI(c.input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const zo = c['zod-openapi']
  const components = zo?.components
  const schemaTarget = components?.schemas

  const [
    takibiResult,
    schemaResult,
    parameterResult,
    headersResult,
    examplesResult,
    linksResult,
    callbacksResult,
    securitySchemesResult,
    requestBodiesResult,
    responsesResult,
    routeResult,
    typeResult,
    rpcResult,
  ] = await Promise.all([
    zo?.output
      ? takibi(openAPI, zo.output, false, false, '/', {
          exportSchemasTypes: zo.exportSchemasTypes ?? false,
          exportSchemas: zo.exportSchemas ?? false,
          exportParametersTypes: zo.exportParametersTypes ?? false,
          exportParameters: zo.exportParameters ?? false,
          exportSecuritySchemes: zo.exportSecuritySchemes ?? false,
          exportRequestBodies: zo.exportRequestBodies ?? false,
          exportResponses: zo.exportResponses ?? false,
          exportHeadersTypes: zo.exportHeadersTypes ?? false,
          exportHeaders: zo.exportHeaders ?? false,
          exportExamples: zo.exportExamples ?? false,
          exportLinks: zo.exportLinks ?? false,
          exportCallbacks: zo.exportCallbacks ?? false,
        })
      : Promise.resolve(undefined),
    components?.schemas
      ? schemas(
          openAPI,
          components.schemas.output,
          components.schemas.exportTypes ?? false,
          components.schemas.split ?? false,
        )
      : Promise.resolve(undefined),
    components?.parameters
      ? componentsCore(
          { parameters: openAPI.components?.parameters ?? {} },
          'Parameter',
          components.parameters.output,
          components.parameters.split ?? false,
          components.parameters.exportTypes ?? false,
          schemaTarget ? { schemas: schemaTarget } : undefined,
        )
      : Promise.resolve(undefined),
    components?.headers
      ? componentsCore(
          { headers: openAPI.components?.headers ?? {} },
          'Header',
          components.headers.output,
          components.headers.split ?? false,
          components.headers.exportTypes ?? false,
          schemaTarget ? { schemas: schemaTarget } : undefined,
        )
      : Promise.resolve(undefined),
    components?.examples
      ? componentsCore(
          { examples: openAPI.components?.examples ?? {} },
          'Example',
          components.examples.output,
          components.examples.split ?? false,
        )
      : Promise.resolve(undefined),
    components?.links
      ? componentsCore(
          { links: openAPI.components?.links ?? {} },
          'Link',
          components.links.output,
          components.links.split ?? false,
        )
      : Promise.resolve(undefined),
    components?.callbacks
      ? componentsCore(
          { callbacks: openAPI.components?.callbacks ?? {} },
          'Callback',
          components.callbacks.output,
          components.callbacks.split ?? false,
        )
      : Promise.resolve(undefined),
    components?.securitySchemes
      ? componentsCore(
          { securitySchemes: openAPI.components?.securitySchemes ?? {} },
          'SecurityScheme',
          components.securitySchemes.output,
          components.securitySchemes.split ?? false,
        )
      : Promise.resolve(undefined),
    components?.requestBodies
      ? componentsCore(
          { requestBodies: openAPI.components?.requestBodies ?? {} },
          'RequestBody',
          components.requestBodies.output,
          components.requestBodies.split ?? false,
          undefined,
          schemaTarget ? { schemas: schemaTarget } : undefined,
        )
      : Promise.resolve(undefined),
    components?.responses
      ? componentsCore(
          { responses: openAPI.components?.responses ?? {} },
          'Response',
          components.responses.output,
          components.responses.split ?? false,
          undefined,
          schemaTarget ? { schemas: schemaTarget } : undefined,
        )
      : Promise.resolve(undefined),
    zo?.routes ? route(openAPI, zo.routes, components) : Promise.resolve(undefined),
    c.type ? type(openAPI, c.type.output) : Promise.resolve(undefined),
    c.rpc
      ? rpc(openAPI, c.rpc.output, c.rpc.import, c.rpc.split ?? false)
      : Promise.resolve(undefined),
  ])

  if (takibiResult && !takibiResult.ok) return { ok: false, error: takibiResult.error }
  if (schemaResult && !schemaResult.ok) return { ok: false, error: schemaResult.error }
  if (parameterResult && !parameterResult.ok) return { ok: false, error: parameterResult.error }
  if (headersResult && !headersResult.ok) return { ok: false, error: headersResult.error }
  if (examplesResult && !examplesResult.ok) return { ok: false, error: examplesResult.error }
  if (linksResult && !linksResult.ok) return { ok: false, error: linksResult.error }
  if (callbacksResult && !callbacksResult.ok) return { ok: false, error: callbacksResult.error }
  if (securitySchemesResult && !securitySchemesResult.ok)
    return { ok: false, error: securitySchemesResult.error }
  if (requestBodiesResult && !requestBodiesResult.ok)
    return { ok: false, error: requestBodiesResult.error }
  if (responsesResult && !responsesResult.ok) return { ok: false, error: responsesResult.error }
  if (routeResult && !routeResult.ok) return { ok: false, error: routeResult.error }
  if (typeResult && !typeResult.ok) return { ok: false, error: typeResult.error }
  if (rpcResult && !rpcResult.ok) return { ok: false, error: rpcResult.error }

  const results = [
    takibiResult?.value,
    schemaResult?.value,
    parameterResult?.value,
    headersResult?.value,
    examplesResult?.value,
    linksResult?.value,
    callbacksResult?.value,
    securitySchemesResult?.value,
    requestBodiesResult?.value,
    responsesResult?.value,
    routeResult?.value,
    typeResult?.value,
    rpcResult?.value,
  ].filter((v) => v !== undefined)

  return { ok: true, value: results.join('\n') }
}
