import { config } from '../config/index.js'
import { parseCli } from '../utils/index.js'
import { rpc } from './rpc.js'
import { takibi } from './takibi.js'

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
 *   A["Start honoTakibi()"] --> B["args = process.argv.slice(2)"]
 *   B --> C{"isHelpRequested(args) ?"}
 *   C -->|Yes| D["return { ok:true, value: HELP_TEXT }"]
 *   C -->|No| E["cliResult = parseCli(args)"]
 *   E --> F{"cliResult.ok ?"}
 *   F -->|No| G["return { ok:false, error: cliResult.error }"]
 *   F -->|Yes| H["cli = cliResult.value"]
 *   H --> I["takibiResult = await takibi(cli.input, cli.output, ...options)"]
 *   I --> J{"takibiResult.ok ?"}
 *   J -->|No| K["return { ok:false, error: takibiResult.error }"]
 *   J -->|Yes| L["return { ok:true, value: takibiResult.value }"]
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
      ok: true
      value: string
    }
  | {
      ok: false
      error: string
    }
> {
  // Slice the arguments to remove the first two (node and script path)
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

  const configResult = config()

  if (configResult.ok) {
    const results: string[] = []
    const tv = configResult.value['hono-takibi'] ?? {}
    if (!(tv.input && tv.output)) {
      return { ok: false, error: 'Invalid input or output' }
    }
    const takibiResult = await takibi(
      tv.input,
      tv.output,
      tv.exportSchema ?? false,
      tv.exportType ?? false,
      false, // template
      false, // test
    )
    if (!takibiResult.ok) {
      return { ok: false, error: takibiResult.error }
    }
    results.push(takibiResult.value)

    /** rpc */
    const rv = configResult.value['rpc']
    if (rv) {
      if (!(rv.input && rv.output && rv.import)) {
        return { ok: false, error: 'Invalid RPC input or output or import' }
      }
      const rpcResult = await rpc(rv.input, rv.output, rv.import)
      if (!rpcResult.ok) {
        return { ok: false, error: rpcResult.error }
      }
      results.push(rpcResult.value)
    }
    return {
      ok: true,
      value: results.join('\n'),
    }
  }

  const cliResult = parseCli(args)
  if (!cliResult.ok) {
    return { ok: false, error: cliResult.error }
  }
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
  if (!takibiResult.ok) {
    return { ok: false, error: takibiResult.error }
  }
  return {
    ok: true,
    value: takibiResult.value,
  }
}
