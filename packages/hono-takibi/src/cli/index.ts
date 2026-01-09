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
import { loadConfig } from '../config/index.js'
import {
  callbacks,
  examples,
  headers,
  links,
  parameters,
  requestBodies,
  responses,
  route,
  rpc,
  schemas,
  securitySchemes,
  takibi,
  type,
} from '../core/index.js'
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

  const loadConfigResult = await loadConfig()
  if (!loadConfigResult.ok) return { ok: false, error: loadConfigResult.error }
  const config = loadConfigResult.value

  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

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
    config['zod-openapi']?.output
      ? takibi(openAPI, config['zod-openapi'].output, false, false, '/', {
          exportSchemasTypes: config['zod-openapi'].exportSchemasTypes ?? false,
          exportSchemas: config['zod-openapi'].exportSchemas ?? false,
          exportParametersTypes: config['zod-openapi'].exportParametersTypes ?? false,
          exportParameters: config['zod-openapi'].exportParameters ?? false,
          exportSecuritySchemes: config['zod-openapi'].exportSecuritySchemes ?? false,
          exportRequestBodies: config['zod-openapi'].exportRequestBodies ?? false,
          exportResponses: config['zod-openapi'].exportResponses ?? false,
          exportHeadersTypes: config['zod-openapi'].exportHeadersTypes ?? false,
          exportHeaders: config['zod-openapi'].exportHeaders ?? false,
          exportExamples: config['zod-openapi'].exportExamples ?? false,
          exportLinks: config['zod-openapi'].exportLinks ?? false,
          exportCallbacks: config['zod-openapi'].exportCallbacks ?? false,
        })
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.schemas
      ? schemas(
          openAPI.components?.schemas,
          config['zod-openapi']?.components?.schemas?.output,
          config['zod-openapi']?.components?.schemas?.split ?? false,
          config['zod-openapi']?.components?.schemas?.exportTypes ?? false,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.parameters
      ? parameters(
          openAPI.components?.parameters,
          config['zod-openapi']?.components?.parameters?.output,
          config['zod-openapi']?.components?.parameters?.split ?? false,
          config['zod-openapi']?.components?.parameters?.exportTypes ?? false,
          config['zod-openapi']?.components?.schemas,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.headers
      ? headers(
          openAPI.components?.headers,
          config['zod-openapi']?.components?.headers?.output,
          config['zod-openapi']?.components?.headers?.split ?? false,
          config['zod-openapi']?.components?.headers?.exportTypes ?? false,
          config['zod-openapi']?.components?.schemas,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.examples
      ? examples(
          openAPI.components?.examples,
          config['zod-openapi']?.components?.examples?.output,
          config['zod-openapi']?.components?.examples?.split ?? false,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.links
      ? links(
          openAPI.components?.links,
          config['zod-openapi']?.components?.links?.output,
          config['zod-openapi']?.components?.links?.split ?? false,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.callbacks
      ? callbacks(
          openAPI.components?.callbacks,
          config['zod-openapi']?.components?.callbacks?.output,
          config['zod-openapi']?.components?.callbacks?.split ?? false,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.securitySchemes
      ? securitySchemes(
          openAPI.components?.securitySchemes,
          config['zod-openapi']?.components?.securitySchemes?.output,
          config['zod-openapi']?.components?.securitySchemes?.split ?? false,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.requestBodies
      ? requestBodies(
          openAPI.components?.requestBodies,
          config['zod-openapi']?.components?.requestBodies?.output,
          config['zod-openapi']?.components?.requestBodies?.split ?? false,
          config['zod-openapi']?.components?.schemas,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.components?.responses
      ? responses(
          openAPI.components?.responses,
          config['zod-openapi']?.components?.responses?.output,
          config['zod-openapi']?.components?.responses?.split ?? false,
          config['zod-openapi']?.components?.schemas,
        )
      : Promise.resolve(undefined),
    config['zod-openapi']?.routes
      ? route(openAPI, config['zod-openapi'].routes, config['zod-openapi'].components)
      : Promise.resolve(undefined),
    config.type ? type(openAPI, config.type.output) : Promise.resolve(undefined),
    config.rpc
      ? rpc(openAPI, config.rpc.output, config.rpc.import, config.rpc.split ?? false)
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
