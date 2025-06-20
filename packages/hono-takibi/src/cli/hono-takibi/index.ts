import type { Result } from '../../result/index.js'
import { ok, asyncAndThen } from '../../result/index.js'
import { takibi } from './takibi.js'
import { parseCli } from '../args/parse-cli.js'
import { isHelpRequested, sliceArgv } from '../utils/index.js'

const HELP_TEXT = `
Usage:
  hono-takibi <input.yaml|json> -o <routes.ts> [options]

Options:
  --export-type               Export generated type aliases

  --export-schema             Export generated schema objects

  --template                  Generate an app file and handler stubs

  --test                      Generate empty *.test.ts files for handlers

  --base-path <path>          API prefix (e.g. /api)
  
  --help                      Show this help and exit
`.trimStart()

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
