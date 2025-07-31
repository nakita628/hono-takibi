import type { Result } from '../result/index.js'
import { asyncAndThen, ok } from '../result/index.js'
import { parseCli } from '../utils/index.js'
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
 * @returns A `Result` containing help text or CLI execution result.
 */
export async function honoTakibi(): Promise<Result<{ message: string }, string>> {
  // Slice the arguments to remove the first two (node and script path)
  const args = process.argv.slice(2)
  const isHelpRequested = (args: readonly string[]): boolean => {
    return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
  }
  if (isHelpRequested(args)) {
    return ok({
      message: HELP_TEXT,
    })
  }
  return await asyncAndThen(parseCli(args), async (cli) =>
    asyncAndThen(
      await takibi(
        cli.input,
        cli.output,
        cli.exportSchema ?? false,
        cli.exportType ?? false,
        cli.template ?? false,
        cli.test ?? false,
        cli.basePath,
      ),
      async (result) => ok(result),
    ),
  )
}
