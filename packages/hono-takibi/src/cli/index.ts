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
// import { honoRpcWithSWR } from '../generator/swr/index.js'
import { parseCli } from '../utils/index.js'

/**
 * CLI usage help text shown when `-h`/`--help` is provided.
 * Kept as a single template for easy updates and snapshot stability.
 */
const HELP_TEXT = `Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-type        export TypeScript type aliases
  --export-schema      export Zod schema objects
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
      cli.exportSchema ?? false,
      cli.exportType ?? false,
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
  const schemaTarget =
    zo?.schema !== undefined
      ? { output: zo.schema.output, split: zo.schema.split === true }
      : undefined
  const examplesTarget =
    zo?.examples !== undefined
      ? { output: zo.examples.output, split: zo.examples.split === true }
      : undefined
  const headersTarget =
    zo?.headers !== undefined
      ? { output: zo.headers.output, split: zo.headers.split === true }
      : undefined
  const linksTarget =
    zo?.links !== undefined
      ? { output: zo.links.output, split: zo.links.split === true }
      : undefined

  /** takibi */
  const takibiResult = zo?.output
    ? await takibi(
        c.input,
        zo.output,
        zo.exportSchema ?? false,
        zo.exportType ?? false,
        false, // template
        false, // test
      )
    : undefined

  if (takibiResult && !takibiResult.ok) return { ok: false, error: takibiResult.error }

  /** schema */
  const schemaResult = zo?.schema
    ? await schema(
        c.input,
        zo.schema.output,
        zo.schema.exportType ?? false,
        zo.schema.split ?? false,
      )
    : undefined
  if (schemaResult && !schemaResult.ok) return { ok: false, error: schemaResult.error }

  /** parameter */
  const parameterResult = zo?.parameter
    ? await parameter(
        c.input,
        zo.parameter.output,
        zo.parameter.exportType ?? false,
        zo.parameter.split ?? false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (parameterResult && !parameterResult.ok) return { ok: false, error: parameterResult.error }

  /** headers */
  const headersResult = zo?.headers
    ? await headers(
        c.input,
        zo.headers.output,
        zo.headers.exportType ?? false,
        zo.headers.split ?? false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
    : undefined
  if (headersResult && !headersResult.ok) return { ok: false, error: headersResult.error }

  /** examples */
  const examplesResult = zo?.examples
    ? await examples(c.input, zo.examples.output, zo.examples.split ?? false)
    : undefined
  if (examplesResult && !examplesResult.ok) return { ok: false, error: examplesResult.error }

  /** links */
  const linksResult = zo?.links
    ? await links(c.input, zo.links.output, zo.links.split ?? false)
    : undefined
  if (linksResult && !linksResult.ok) return { ok: false, error: linksResult.error }

  /** callbacks */
  const callbacksResult = zo?.callbacks
    ? await callbacks(c.input, zo.callbacks.output, zo.callbacks.split ?? false)
    : undefined
  if (callbacksResult && !callbacksResult.ok) return { ok: false, error: callbacksResult.error }

  /** securitySchemes */
  const securitySchemesResult = zo?.securitySchemes
    ? await securitySchemes(
        c.input,
        zo.securitySchemes.output,
        zo.securitySchemes.exportType ?? false,
        zo.securitySchemes.split ?? false,
      )
    : undefined
  if (securitySchemesResult && !securitySchemesResult.ok)
    return { ok: false, error: securitySchemesResult.error }

  /** requestBodies */
  const requestBodiesResult = zo?.requestBodies
    ? await requestBodies(
        c.input,
        zo.requestBodies.output,
        zo.requestBodies.split ?? false,
        schemaTarget || examplesTarget
          ? { schemas: schemaTarget, examples: examplesTarget }
          : undefined,
      )
    : undefined
  if (requestBodiesResult && !requestBodiesResult.ok)
    return { ok: false, error: requestBodiesResult.error }

  /** responses */
  const responsesResult = zo?.responses
    ? await responses(
        c.input,
        zo.responses.output,
        zo.responses.split ?? false,
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
  const routeResult = zo?.route
    ? await route(
        c.input,
        zo.route.output,
        zo.route.import,
        zo.route.split ?? false,
        zo.parameter || zo.headers || zo.requestBodies || zo.responses || zo.links || zo.callbacks
          ? {
              useComponentRefs:
                zo.requestBodies !== undefined ||
                zo.responses !== undefined ||
                zo.links !== undefined ||
                zo.callbacks !== undefined ||
                zo.headers !== undefined,
              imports: {
                parameter:
                  zo.parameter !== undefined
                    ? { output: zo.parameter.output, split: zo.parameter.split === true }
                    : undefined,
                headers:
                  zo.headers !== undefined
                    ? { output: zo.headers.output, split: zo.headers.split === true }
                    : undefined,
                requestBodies:
                  zo.requestBodies !== undefined
                    ? { output: zo.requestBodies.output, split: zo.requestBodies.split === true }
                    : undefined,
                responses:
                  zo.responses !== undefined
                    ? { output: zo.responses.output, split: zo.responses.split === true }
                    : undefined,
                links:
                  zo.links !== undefined
                    ? { output: zo.links.output, split: zo.links.split === true }
                    : undefined,
                callbacks:
                  zo.callbacks !== undefined
                    ? { output: zo.callbacks.output, split: zo.callbacks.split === true }
                    : undefined,
                examples:
                  zo.examples !== undefined
                    ? { output: zo.examples.output, split: zo.examples.split === true }
                    : undefined,
              },
            }
          : undefined,
      )
    : undefined
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
