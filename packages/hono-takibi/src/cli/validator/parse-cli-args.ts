import type { CliFlags, Naming, Result } from '../types/index.js'
import { flagValHelper } from '../helpers/flag-val-helper.js'
import { hasFlagHelper } from '../helpers/has-flag-helper.js'
import { sliceArgsHelper } from '../helpers/slice-args-helper.js'
import { ensureIO } from './ensure-io.js'
import { parseNaming } from './parse-naming.js'
import { ok, err } from '../types/index.js'

/**
 * Parses command line arguments into a structured format.
 * @param argv - The command line arguments.
 * @returns A Result containing the parsed flags or an error message.
 */
export function parseCliArgs(argv: readonly string[]): Result<CliFlags> {
  const a = sliceArgsHelper(argv)
  const io = ensureIO(a)
  if (!io.ok) return err(io.error)

  const tRes = parseNaming(flagValHelper(a, '--naming-case-type'))
  if (!tRes.ok) return err(tRes.error)

  const sRes = parseNaming(flagValHelper(a, '--naming-case-schema'))
  if (!sRes.ok) return err(sRes.error)

  return ok({
    input: io.value.input,
    output: io.value.output,
    exportType: hasFlagHelper(a, '--export-type'),
    exportSchema: hasFlagHelper(a, '--export-schema'),
    typeCase: tRes.value,
    schemaCase: sRes.value,
    template: hasFlagHelper(a, '--template'),
    test: hasFlagHelper(a, '--test'),
    basePath: flagValHelper(a, '--base-path'),
  })
}
