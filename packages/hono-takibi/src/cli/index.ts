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

  const takibiResult = zo?.output
    ? await takibi(openAPI, zo.output, false, false, '/', {
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
    : undefined
  if (takibiResult && !takibiResult.ok) return { ok: false, error: takibiResult.error }

  const schemaResult = components?.schemas
    ? await schemas(
        openAPI,
        components.schemas.output,
        components.schemas.exportTypes ?? false,
        components.schemas.split ?? false,
      )
    : undefined
  if (schemaResult && !schemaResult.ok) return { ok: false, error: schemaResult.error }

  const parameterResult = components?.parameters
    ? await componentsCore(
        { parameters: openAPI.components?.parameters ?? {} },
        'Parameter',
        components.parameters.output,
        components.parameters.split ?? false,
        components.parameters.exportTypes ?? false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (parameterResult && !parameterResult.ok) return { ok: false, error: parameterResult.error }

  const headersResult = components?.headers
    ? await componentsCore(
        { headers: openAPI.components?.headers ?? {} },
        'Header',
        components.headers.output,
        components.headers.split ?? false,
        components.headers.exportTypes ?? false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (headersResult && !headersResult.ok) return { ok: false, error: headersResult.error }

  const examplesResult = components?.examples
    ? await componentsCore(
        { examples: openAPI.components?.examples ?? {} },
        'Example',
        components.examples.output,
        components.examples.split ?? false,
      )
    : undefined
  if (examplesResult && !examplesResult.ok) return { ok: false, error: examplesResult.error }

  const linksResult = components?.links
    ? await componentsCore(
        { links: openAPI.components?.links ?? {} },
        'Link',
        components.links.output,
        components.links.split ?? false,
      )
    : undefined
  if (linksResult && !linksResult.ok) return { ok: false, error: linksResult.error }

  const callbacksResult = components?.callbacks
    ? await componentsCore(
        { callbacks: openAPI.components?.callbacks ?? {} },
        'Callback',
        components.callbacks.output,
        components.callbacks.split ?? false,
      )
    : undefined
  if (callbacksResult && !callbacksResult.ok) return { ok: false, error: callbacksResult.error }

  const securitySchemesResult = components?.securitySchemes
    ? await componentsCore(
        { securitySchemes: openAPI.components?.securitySchemes ?? {} },
        'SecurityScheme',
        components.securitySchemes.output,
        components.securitySchemes.split ?? false,
      )
    : undefined
  if (securitySchemesResult && !securitySchemesResult.ok)
    return { ok: false, error: securitySchemesResult.error }

  const requestBodiesResult = components?.requestBodies
    ? await componentsCore(
        { requestBodies: openAPI.components?.requestBodies ?? {} },
        'RequestBody',
        components.requestBodies.output,
        components.requestBodies.split ?? false,
        undefined,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (requestBodiesResult && !requestBodiesResult.ok)
    return { ok: false, error: requestBodiesResult.error }

  const responsesResult = components?.responses
    ? await componentsCore(
        { responses: openAPI.components?.responses ?? {} },
        'Response',
        components.responses.output,
        components.responses.split ?? false,
        undefined,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (responsesResult && !responsesResult.ok) return { ok: false, error: responsesResult.error }

  const routeResult = zo?.routes ? await route(openAPI, zo.routes, components) : undefined
  if (routeResult && !routeResult.ok) return { ok: false, error: routeResult.error }

  const typeResult = c.type ? await type(openAPI, c.type.output) : undefined
  if (typeResult && !typeResult.ok) return { ok: false, error: typeResult.error }

  const rpcResult = c.rpc
    ? await rpc(openAPI, c.rpc.output, c.rpc.import, c.rpc.split ?? false)
    : undefined
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
