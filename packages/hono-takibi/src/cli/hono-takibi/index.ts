import type { Result } from '../../result/index.js'
import { ok, asyncAndThen } from '../../result/index.js'
import { takibi } from './takibi.js'
import { parseCli } from '../parse/parse-cli.js'
import { isHelpRequested, sliceArgv } from '../utils/index.js'

const HELP_TEXT = `
Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-type        export TypeScript type aliases
  --export-schema      export Zod schema objects
  --template           generate app file and handler stubs
  --test               generate empty *.test.ts files
  --base-path <path>   api prefix (default: /)
  -h, --help           display help for command`.trimStart()

export async function honoTakibi(): Promise<Result<{ message: string }, string>> {
  const args = sliceArgv(process.argv)

  return isHelpRequested(sliceArgv(process.argv))
    ? ok({ message: HELP_TEXT })
    : await asyncAndThen(parseCli(args), async (cli) =>
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
