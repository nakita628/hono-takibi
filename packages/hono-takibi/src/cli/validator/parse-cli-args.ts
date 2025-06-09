import { flagVal, hasFlag, sliceArgs } from '../helper/index.js'
import { parseIO, parseHelp, parseNaming } from './index.js'
import type { Result } from '../../result/index.js'
import type { CliFlags } from '../types/index.js'
import { ok, err } from '../../result/index.js'

/**
 * Parses command line arguments into a structured format.
 * @param argv - The command line arguments.
 * @returns A Result containing the parsed flags or an error message.
 */
export function parseCliArgs(
  argv: readonly string[],
  config: { input?: string; output?: string },
): Result<CliFlags, string> {
  const args = sliceArgs(argv)

  if (parseHelp(args)) {
    return err('help')
  }

  const io = parseIO(args, config)
  if (!io.ok) return err(io.error)

  const t = parseNaming(flagVal(args, '--naming-case-type'))
  if (!t.ok) return err(t.error)

  const s = parseNaming(flagVal(args, '--naming-case-schema'))
  if (!s.ok) return err(s.error)

  return ok({
    input: io.value.input,
    output: io.value.output,
    exportType: hasFlag(args, '--export-type') ? true : undefined,
    exportSchema: hasFlag(args, '--export-schema') ? true : undefined,
    typeCase: t.value,
    schemaCase: s.value,
    template: hasFlag(args, '--template'),
    test: hasFlag(args, '--test'),
    basePath: flagVal(args, '--base-path'),
  })
}
