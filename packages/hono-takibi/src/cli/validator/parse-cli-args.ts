import type { CliFlags } from '../types/index.js'
import type { Result } from '../../result/types/index.js'
import { flagValHelper } from '../helper/flag-val-helper.js'
import { hasFlagHelper } from '../helper/has-flag-helper.js'
import { sliceArgsHelper } from '../helper/slice-args-helper.js'
import { parseIO } from './parse-io.js'
import { parseNaming } from './parse-naming.js'
import { ok, err } from '../../result/index.js'

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

/**
 * Parses command line arguments into a structured format.
 * @param argv - The command line arguments.
 * @returns A Result containing the parsed flags or an error message.
 */
export function parseCliArgs(argv: string[], config: { input?: string; output?: string }) {
  const args = sliceArgsHelper(argv)

  if (args.includes('--help')) {
    return err(HELP_TEXT)
  }
  const io = parseIO(args, config)
  if (!io.ok) return err(io.error)

  const tRes = parseNaming(flagValHelper(args, '--naming-case-type'))
  if (!tRes.ok) return err(tRes.error)

  const sRes = parseNaming(flagValHelper(args, '--naming-case-schema'))
  if (!sRes.ok) return err(sRes.error)

  return ok({
    input: io.value.input,
    output: io.value.output,
    exportType: hasFlagHelper(args, '--export-type') ? true : undefined,
    exportSchema: hasFlagHelper(args, '--export-schema') ? true : undefined,
    typeCase: tRes.value,
    schemaCase: sRes.value,
    template: hasFlagHelper(args, '--template'),
    test: hasFlagHelper(args, '--test'),
    basePath: flagValHelper(args, '--base-path'),
  })
}
