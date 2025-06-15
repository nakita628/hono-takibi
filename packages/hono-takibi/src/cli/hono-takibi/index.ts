import type { Result } from '../../result/index.js'
import { ok, asyncAndThen } from '../../result/index.js'
import { getConfig } from '../../config/index.js'
import { resolveConfig } from '../config/index.js'
import { takibi } from './takibi.js'
import { parseCli } from '../args/parse-cli.js'
import { isHelpRequested, sliceArgv } from '../utils/index.js'

const HELP_TEXT = `
Usage:
  hono-takibi <input.yaml|json> -o <routes.ts> [options]

Options:
  --export-type               Export generated type aliases

  --export-schema             Export generated schema objects

  --naming-case-type <PascalCase|camelCase>
                              Casing for generated *type aliases*
                              (default: PascalCase)

  --naming-case-schema <PascalCase|camelCase>
                              Casing for generated *schema objects*
                              (default: PascalCase)

  --template                  Generate an app file and handler stubs

  --test                      Generate empty *.test.ts files for handlers

  --base-path <path>          API prefix (e.g. /api)
  
  --help                      Show this help and exit
`.trimStart()

export async function honoTakibi(): Promise<Result<{ message: string }, string>> {
  const args = sliceArgv(process.argv)

  return isHelpRequested(args)
    ? ok({ message: HELP_TEXT })
    : await asyncAndThen(getConfig(), async (config) =>
        asyncAndThen(parseCli(args, config), async (cli) =>
          asyncAndThen(resolveConfig(config, cli), async (finalConfig) =>
            takibi(finalConfig, cli.template, cli.test, cli.basePath),
          ),
        ),
      )
}
