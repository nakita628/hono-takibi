import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from '../config/index.js'
import { callbacks } from '../core/callbacks.js'
import { examples } from '../core/examples.js'
import { headers } from '../core/headers.js'
import { links } from '../core/links.js'
import { parameter } from '../core/parameter.js'
import { requestBodies } from '../core/request-bodies.js'
import { responses } from '../core/responses.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { schema } from '../core/schema.js'
import { securitySchemes } from '../core/security-schemes.js'
import { takibi } from '../core/takibi.js'
import { type } from '../core/type.js'
import { configToTarget, parseCli } from '../utils/index.js'

/**
 * CLI usage help text shown when `-h`/`--help` is provided.
 * Kept as a single template for easy updates and snapshot stability.
 */
const HELP_TEXT = `Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-types        export TypeScript type aliases
  --export-schemas      export Zod schema objects
  --template           generate app file and handler stubs
  --test               generate empty *.test.ts files
  --base-path <path>   api prefix (default: /)
  -h, --help           display help for command`

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
 * - `--export-type`        Export TypeScript type aliases
 * - `--export-schema`      Export Zod schema objects
 * - `--template`           Generate app file and handler stubs
 * - `--test`               Generate empty `*.test.ts` files
 * - `--base-path <path>`   API prefix (default: `/`)
 * - `-h, --help`           Show help and exit
 *
 * @returns A Result-like object:
 * - `{ ok: true, value: string }` with either help text or generation message
 * - `{ ok: false, error: string }` on validation or generation errors
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
  const isHelpRequested = (args: readonly string[]): boolean => {
    return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
  }
  /** help */
  if (isHelpRequested(args)) {
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
    const takibiResult = await takibi(
      cli.input,
      cli.output,
      cli.exportSchemas ?? false,
      cli.exportTypes ?? false,
      cli.template ?? false,
      cli.test ?? false,
      cli.basePath,
    )
    if (!takibiResult.ok) return { ok: false, error: takibiResult.error }
    return {
      ok: true,
      value: takibiResult.value,
    }
  }

  /** If config file exists, parse config file */
  const configResult = await config()

  if (!configResult.ok) {
    return { ok: false, error: configResult.error }
  }
  const c = configResult.value

  const zo = c['zod-openapi']
  const components = zo?.components

  const schemaTarget = configToTarget(components?.schemas)
  const examplesTarget = configToTarget(components?.examples)
  const headersTarget = configToTarget(components?.headers)
  const linksTarget = configToTarget(components?.links)

  /** takibi */
  const takibiResult = zo?.output
    ? await takibi(
        c.input,
        zo.output,
        zo.exportSchemas ?? false,
        zo.exportTypes ?? false,
        false, // template
        false, // test
      )
    : undefined

  if (takibiResult && !takibiResult.ok) return { ok: false, error: takibiResult.error }

  /** schema */
  const schemaResult = components?.schemas
    ? await schema(
        c.input,
        components.schemas.output,
        components.schemas.exportType ?? false,
        components.schemas.split ?? false,
      )
    : undefined
  if (schemaResult && !schemaResult.ok) return { ok: false, error: schemaResult.error }

  /** parameter */
  const parameterResult = components?.parameters
    ? await parameter(
        c.input,
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
        c.input,
        components.headers.output,
        components.headers.exportTypes ?? false,
        components.headers.split ?? false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (headersResult && !headersResult.ok) return { ok: false, error: headersResult.error }

  /** examples */
  const examplesResult = components?.examples
    ? await examples(c.input, components.examples.output, components.examples.split ?? false)
    : undefined
  if (examplesResult && !examplesResult.ok) return { ok: false, error: examplesResult.error }

  /** links */
  const linksResult = components?.links
    ? await links(c.input, components.links.output, components.links.split ?? false)
    : undefined
  if (linksResult && !linksResult.ok) return { ok: false, error: linksResult.error }

  /** callbacks */
  const callbacksResult = components?.callbacks
    ? await callbacks(c.input, components.callbacks.output, components.callbacks.split ?? false)
    : undefined
  if (callbacksResult && !callbacksResult.ok) return { ok: false, error: callbacksResult.error }

  /** securitySchemes */
  const securitySchemesResult = components?.securitySchemes
    ? await securitySchemes(
        c.input,
        components.securitySchemes.output,
        false, // securitySchemes does not support exportType in config
        components.securitySchemes.split ?? false,
      )
    : undefined
  if (securitySchemesResult && !securitySchemesResult.ok)
    return { ok: false, error: securitySchemesResult.error }

  /** requestBodies */
  const requestBodiesResult = components?.requestBodies
    ? await requestBodies(
        c.input,
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
        c.input,
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
  const routeResult = zo?.routes ? await route(c.input, zo.routes, components) : undefined
  if (routeResult && !routeResult.ok) return { ok: false, error: routeResult.error }

  /** type */
  const typeResult = c.type ? await type(c.input, c.type.output) : undefined
  if (typeResult && !typeResult.ok) return { ok: false, error: typeResult.error }

  /** rpc */
  const rpcResult = c.rpc
    ? await rpc(c.input, c.rpc.output, c.rpc.import, c.rpc.split ?? false)
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
