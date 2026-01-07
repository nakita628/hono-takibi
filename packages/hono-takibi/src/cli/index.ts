/**
 * CLI module for hono-takibi.
 *
 * Provides the main entry point for the CLI tool that converts OpenAPI
 * specifications to Hono routes with Zod validation.
 *
 * ```mermaid
 * flowchart TD
 *   A["honoTakibi()"] --> B{"--help or -h?"}
 *   B -->|Yes| C["Return HELP_TEXT"]
 *   B -->|No| D{"hono-takibi.config.ts exists?"}
 *   D -->|No| E["Parse CLI args"]
 *   D -->|Yes| F["Load config file"]
 *   E --> G["parseOpenAPI(input)"]
 *   F --> G
 *   G --> H["takibi() + components"]
 *   H --> I["Return success/error"]
 * ```
 *
 * @module cli
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from '../config/index.js'
import { componentsCore } from '../core/index.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
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

/**
 * Main CLI entry point for hono-takibi.
 *
 * Processes command-line arguments or config file to generate TypeScript
 * code from OpenAPI specifications. Supports both CLI mode and config file mode.
 *
 * ```mermaid
 * flowchart TD
 *   A["Start"] --> B{"Args: --help/-h?"}
 *   B -->|Yes| C["Return help text"]
 *   B -->|No| D{"Config file exists?"}
 *   D -->|No| E["CLI Mode"]
 *   D -->|Yes| F["Config Mode"]
 *   E --> G["parseCli(args)"]
 *   G --> H["parseOpenAPI(input)"]
 *   H --> I["takibi(openAPI, ...)"]
 *   F --> J["config()"]
 *   J --> K["parseOpenAPI(config.input)"]
 *   K --> L["Generate all components"]
 *   L --> M["Return results"]
 *   I --> M
 * ```
 *
 * @returns Promise resolving to success with output message or error
 *
 * @example
 * ```ts
 * // CLI usage
 * const result = await honoTakibi()
 * if (result.ok) {
 *   console.log(result.value) // "Generated code written to routes.ts"
 * } else {
 *   console.error(result.error)
 * }
 * ```
 */
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

  const zodOpenAPI = c['zod-openapi']
  const components = zodOpenAPI?.components

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
    zodOpenAPI?.output
      ? takibi(openAPI, zodOpenAPI.output, false, false, '/', {
          exportSchemasTypes: zodOpenAPI.exportSchemasTypes ?? false,
          exportSchemas: zodOpenAPI.exportSchemas ?? false,
          exportParametersTypes: zodOpenAPI.exportParametersTypes ?? false,
          exportParameters: zodOpenAPI.exportParameters ?? false,
          exportSecuritySchemes: zodOpenAPI.exportSecuritySchemes ?? false,
          exportRequestBodies: zodOpenAPI.exportRequestBodies ?? false,
          exportResponses: zodOpenAPI.exportResponses ?? false,
          exportHeadersTypes: zodOpenAPI.exportHeadersTypes ?? false,
          exportHeaders: zodOpenAPI.exportHeaders ?? false,
          exportExamples: zodOpenAPI.exportExamples ?? false,
          exportLinks: zodOpenAPI.exportLinks ?? false,
          exportCallbacks: zodOpenAPI.exportCallbacks ?? false,
        })
      : Promise.resolve(undefined),
    components?.schemas
      ? componentsCore(
          { schemas: openAPI.components?.schemas ?? {} },
          'Schema',
          components.schemas.output,
          components.schemas.split ?? false,
          components.schemas.exportTypes ?? false,
        )
      : Promise.resolve(undefined),
    components?.parameters
      ? componentsCore(
          { parameters: openAPI.components?.parameters ?? {} },
          'Parameter',
          components.parameters.output,
          components.parameters.split ?? false,
          components.parameters.exportTypes ?? false,
          components?.schemas ? { schemas: components.schemas } : undefined,
        )
      : Promise.resolve(undefined),
    components?.headers
      ? componentsCore(
          { headers: openAPI.components?.headers ?? {} },
          'Header',
          components.headers.output,
          components.headers.split ?? false,
          components.headers.exportTypes ?? false,
          components?.schemas ? { schemas: components.schemas } : undefined,
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
          components?.schemas ? { schemas: components.schemas } : undefined,
        )
      : Promise.resolve(undefined),
    components?.responses
      ? componentsCore(
          { responses: openAPI.components?.responses ?? {} },
          'Response',
          components.responses.output,
          components.responses.split ?? false,
          undefined,
          components?.schemas ? { schemas: components.schemas } : undefined,
        )
      : Promise.resolve(undefined),
    zodOpenAPI?.routes ? route(openAPI, zodOpenAPI.routes, components) : Promise.resolve(undefined),
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
