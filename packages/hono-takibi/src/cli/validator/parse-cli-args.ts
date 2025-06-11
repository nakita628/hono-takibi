import { flagVal, hasFlag, sliceArgs } from '../helper/index.js'
import { parseIO, parseHelp, parseNaming } from './index.js'
import type { Result } from '../../result/index.js'
import type { CliFlags } from '../types/index.js'
import { ok, andThen } from '../../result/index.js'

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

  return andThen(parseHelp(sliceArgs(argv)), () =>
    andThen(parseIO(args, config), (io) =>
      andThen(parseNaming(flagVal(args, '--naming-case-type')), (typeCase) =>
        andThen(parseNaming(flagVal(args, '--naming-case-schema')), (schemaCase) =>
          ok({
            input: io.input,
            output: io.output,
            exportType: hasFlag(args, '--export-type') ? true : undefined,
            exportSchema: hasFlag(args, '--export-schema') ? true : undefined,
            typeCase,
            schemaCase,
            template: hasFlag(args, '--template'),
            test: hasFlag(args, '--test'),
            basePath: flagVal(args, '--base-path'),
          }),
        ),
      ),
    ),
  )
}
