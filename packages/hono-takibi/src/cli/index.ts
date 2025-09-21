import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from '../config/index.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { schema } from '../core/schema.js'
import { takibi } from '../core/takibi.js'
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

  /** takibi */
  const takibiResult = c['zod-openapi']?.output
    ? await takibi(
        c.input,
        c['zod-openapi']?.output,
        c['zod-openapi']?.exportSchema ?? false,
        c['zod-openapi']?.exportType ?? false,
        false, // template
        false, // test
      )
    : undefined

  if (takibiResult && !takibiResult.ok) return { ok: false, error: takibiResult.error }

  /** schema */
  const schemaResult = c['zod-openapi']?.schema
    ? await schema(
        c.input,
        c['zod-openapi'].schema.output,
        c['zod-openapi'].schema.exportType ?? false,
        c['zod-openapi']?.schema.split ?? false,
      )
    : undefined
  if (schemaResult && !schemaResult.ok) return { ok: false, error: schemaResult.error }

  /** route */
  const routeResult = c['zod-openapi']?.route
    ? await route(
        c.input,
        c['zod-openapi'].route.output,
        c['zod-openapi'].route.import,
        c['zod-openapi'].route.split ?? false,
      )
    : undefined
  if (routeResult && !routeResult.ok) return { ok: false, error: routeResult.error }

  /** rpc */
  const rpcResult = c.rpc
    ? await rpc(c.input, c.rpc.output, c.rpc.import, c.rpc.split ?? false)
    : undefined

  if (rpcResult && !rpcResult.ok) return { ok: false, error: rpcResult.error }

  const results = [takibiResult?.value, rpcResult?.value].filter((v): v is string => Boolean(v))

  return {
    ok: true,
    value: results.join('\n'),
  }
}
