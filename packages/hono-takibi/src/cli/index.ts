import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from '../config/index.js'
import { headers } from '../core/headers.js'
import { componentsCore } from '../core/index.js'
import { parameters } from '../core/parameters.js'
import { requestBodies } from '../core/request-bodies.js'
import { responses } from '../core/responses.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { schemas } from '../core/schemas.js'
import { takibi } from '../core/takibi.js'
import { type } from '../core/type.js'
import { parseOpenAPI } from '../openapi/index.js'
import { parseCli } from '../utils/index.js'

/**
 * CLI usage help text shown when `-h`/`--help` is provided.
 * Kept as a single template for easy updates and snapshot stability.
 */
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
 * CLI entry point for `hono-takibi`.
 *
 * Executes the CLI flow: parse args → optional help → validate options → run generator (`takibi`) → return result.
 *
 * ```mermaid
 * flowchart TD
 *   A["Start honoTakibi"] --> B["Parse args"]
 *   B --> C{"Help requested?"}
 *   C -- Yes --> D["Return help text"]
 *   C -- No --> E["parseCli(args)"]
 *   E --> F{"cliResult.ok?"}
 *   F -- No --> G["Return parse error"]
 *   F -- Yes --> H["Run takibi"]
 *   H --> I{"takibi.ok?"}
 *   I -- No --> J["Return takibi error"]
 *   I -- Yes --> K["Return success message"]
 * ```
 *
 * **Options**
 * - `--export-schemas-types`      export schemas types
 * - `--export-schemas`            export schemas
 * - `--export-parameters-types`   export parameters types
 * - `--export-parameters`         export parameters
 * - `--export-security-schemes`   export securitySchemes
 * - `--export-request-bodies`     export requestBodies
 * - `--export-responses`          export responses
 * - `--export-headers-types`      export headers types
 * - `--export-headers`            export headers
 * - `--export-examples`           export examples
 * - `--export-links`              export links
 * - `--export-callbacks`          export callbacks
 * - `--template`                  generate app file and handler stubs
 * - `--test`                      generate empty *.test.ts files
 * - `--base-path <path>`          api prefix (default: /)
 * - `-h, --help`                  display help for command
 */
export async function honoTakibi(): Promise<
  | {
      readonly ok: true
      readonly value: string
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  /** Slice the arguments to remove the first two (node and script path) */
  const args = process.argv.slice(2)
  /** help */
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    return {
      ok: true,
      value: HELP_TEXT,
    }
  }

  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')

  /** If config file does not exist, parse CLI arguments */
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
    return {
      ok: true,
      value: takibiResult.value,
    }
  }

  /** If config file exists, parse config file */
  const configResult = await config()

  if (!configResult.ok) return { ok: false, error: configResult.error }
  const c = configResult.value

  /** Parse OpenAPI */
  const openAPIResult = await parseOpenAPI(c.input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const zo = c['zod-openapi']
  const components = zo?.components

  const schemaTarget = components?.schemas
  const examplesTarget = components?.examples
  const headersTarget = components?.headers
  const linksTarget = components?.links

  /** takibi */
  const takibiResult = zo?.output
    ? await takibi(
        openAPI,
        zo.output,
        false, // template
        false, // test
        '/', // basePath
        {
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
        },
      )
    : undefined

  if (takibiResult && !takibiResult.ok) return { ok: false, error: takibiResult.error }

  /** schema */
  const schemaResult = components?.schemas
    ? await schemas(
        openAPI,
        components.schemas.output,
        components.schemas.exportTypes ?? false,
        components.schemas.split ?? false,
      )
    : undefined
  if (schemaResult && !schemaResult.ok) return { ok: false, error: schemaResult.error }

  /** parameter */
  const parameterResult = components?.parameters
    ? await parameters(
        openAPI,
        components.parameters.output,
        components.parameters.exportTypes ?? false,
        components.parameters.split ?? false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (parameterResult && !parameterResult.ok) return { ok: false, error: parameterResult.error }

  /** headers */
  const headersResult = components?.headers
    ? await headers(
        openAPI,
        components.headers.output,
        components.headers.exportTypes ?? false,
        components.headers.split ?? false,
      )
    : undefined
  if (headersResult && !headersResult.ok) return { ok: false, error: headersResult.error }

  /** examples */
  const examplesResult = components?.examples
    ? await componentsCore(
        openAPI.components?.examples ?? {},
        'Example',
        components.examples.output,
        components.examples.split ?? false,
      )
    : undefined
  if (examplesResult && !examplesResult.ok) return { ok: false, error: examplesResult.error }

  /** links */
  const linksResult = components?.links
    ? await componentsCore(
        openAPI.components?.links ?? {},
        'Link',
        components.links.output,
        components.links.split ?? false,
      )
    : undefined
  if (linksResult && !linksResult.ok) return { ok: false, error: linksResult.error }

  /** callbacks */
  const callbacksResult = components?.callbacks
    ? await componentsCore(
        openAPI.components?.callbacks ?? {},
        'Callback',
        components.callbacks.output,
        components.callbacks.split ?? false,
      )
    : undefined
  if (callbacksResult && !callbacksResult.ok) return { ok: false, error: callbacksResult.error }

  /** securitySchemes */
  const securitySchemesResult = components?.securitySchemes
    ? await componentsCore(
        openAPI.components?.securitySchemes ?? {},
        'SecurityScheme',
        components.securitySchemes.output,
        components.securitySchemes.split ?? false,
      )
    : undefined
  if (securitySchemesResult && !securitySchemesResult.ok)
    return { ok: false, error: securitySchemesResult.error }

  /** requestBodies */
  const requestBodiesResult = components?.requestBodies
    ? await requestBodies(
        openAPI,
        components.requestBodies.output,
        components.requestBodies.split ?? false,
        schemaTarget || examplesTarget
          ? { schemas: schemaTarget, examples: examplesTarget }
          : undefined,
      )
    : undefined
  if (requestBodiesResult && !requestBodiesResult.ok)
    return { ok: false, error: requestBodiesResult.error }

  /** responses */
  const responsesResult = components?.responses
    ? await responses(
        openAPI.components ?? {},
        components.responses.output,
        components.responses.split ?? false,
        schemaTarget || headersTarget || examplesTarget || linksTarget
          ? {
              schemas: schemaTarget,
              headers: headersTarget,
              examples: examplesTarget,
              links: linksTarget,
            }
          : undefined,
      )
    : undefined
  if (responsesResult && !responsesResult.ok) return { ok: false, error: responsesResult.error }

  /** route */
  const routeResult = zo?.routes ? await route(openAPI, zo.routes, components) : undefined
  if (routeResult && !routeResult.ok) return { ok: false, error: routeResult.error }

  /** type */
  const typeResult = c.type ? await type(openAPI, c.type.output) : undefined
  if (typeResult && !typeResult.ok) return { ok: false, error: typeResult.error }

  /** rpc */
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

  return {
    ok: true,
    value: results.join('\n'),
  }
}
