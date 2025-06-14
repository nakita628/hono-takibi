import { getFlagValue, hasFlag } from '../utils/index.js'
import type { Result } from '../../result/index.js'
import type { CliFlags } from '../types/index.js'
import { ok, andThen } from '../../result/index.js'
import { parseNamingCase } from '../validator/parse-naming-case.js'
import { parseIO } from './index.js'

/**
 * Parses command line arguments into a structured format.
 * @param args - The command line arguments.
 * @returns A Result containing the parsed flags or an error message.
 */

export function parseCli(
  args: readonly string[],
  config: { input?: `${string}.yaml` | `${string}.json`; output?: `${string}.ts` },
): Result<CliFlags, string> {
  return andThen(parseIO(args, config), (io) =>
    andThen(parseNamingCase(getFlagValue(args, '--naming-case-type')), (typeCase) =>
      andThen(parseNamingCase(getFlagValue(args, '--naming-case-schema')), (schemaCase) =>
        ok({
          input: io.input,
          output: io.output,
          exportType: hasFlag(args, '--export-type') ? true : undefined,
          exportSchema: hasFlag(args, '--export-schema') ? true : undefined,
          typeCase,
          schemaCase,
          template: hasFlag(args, '--template'),
          test: hasFlag(args, '--test'),
          basePath: getFlagValue(args, '--base-path'),
        }),
      ),
    ),
  )
}
