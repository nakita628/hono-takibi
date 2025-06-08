import type { CliFlags, Naming, Result } from '../types/index.js'
import { flagValHelper } from '../helpers/flag-val-helper.js'
import { hasFlagHelper } from '../helpers/has-flag-helper.js'
import { sliceArgsHelper } from '../helpers/slice-args-helper.js'
import { ensureIO } from './ensure-io.js'
import { parseNaming } from './parse-naming.js'
import { ok, err } from '../types/index.js'

const HELP_TEXT = `
hono-takibi – generate Hono + Zod routes from an OpenAPI file

Usage:
  hono-takibi <input-file> -o <output-file> [options]

Options:
  --template            Generate application & handler skeleton
  --test                Generate test files
  --base-path <path>    Base URL prefix (e.g. /api)
  --naming-case-type    <PascalCase|camelCase>
  --naming-case-schema  <PascalCase|camelCase>
  --export-type         Export generated type aliases
  --export-schema       Export generated schema objects
  -h, --help            Show this help and exit
`.trimStart()

/**
 * Parses command line arguments into a structured format.
 * @param argv - The command line arguments.
 * @returns A Result containing the parsed flags or an error message.
 */
export function parseCliArgs(argv: readonly string[]): Result<CliFlags> {
  const args = sliceArgsHelper(argv)
  if (args.includes('-h') || args.includes('--help')) {
    return err(HELP_TEXT)
  }
  const io = ensureIO(args)
  if (!io.ok) return err(io.error)

  const tRes = parseNaming(flagValHelper(args, '--naming-case-type'))
  if (!tRes.ok) return err(tRes.error)

  const sRes = parseNaming(flagValHelper(args, '--naming-case-schema'))
  if (!sRes.ok) return err(sRes.error)

  return ok({
    input: io.value.input,
    output: io.value.output,
    exportType: hasFlagHelper(args, '--export-type'),
    exportSchema: hasFlagHelper(args, '--export-schema'),
    typeCase: tRes.value,
    schemaCase: sRes.value,
    template: hasFlagHelper(args, '--template'),
    test: hasFlagHelper(args, '--test'),
    basePath: flagValHelper(args, '--base-path'),
  })
}
