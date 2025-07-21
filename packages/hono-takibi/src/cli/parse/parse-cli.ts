import type { Result } from '../../result/index.js'
import { getFlagValue, hasFlag } from '../utils/index.js'
import { ok, andThen } from '../../result/index.js'
import { parseIO } from './index.js'

/**
 * Parses CLI arguments into structured options.
 *
 * @param args - Raw CLI arguments.
 * @returns A `Result` containing parsed CLI options or an error message.
 */
export function parseCli(args: readonly string[]): Result<
  {
    input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    output: `${string}.ts`
    exportType?: boolean
    exportSchema?: boolean
    template: boolean
    test: boolean
    basePath?: string
  },
  string
> {
  return andThen(parseIO(args), (io) =>
    ok({
      input: io.input,
      output: io.output,
      exportType: hasFlag(args, '--export-type'),
      exportSchema: hasFlag(args, '--export-schema'),
      template: hasFlag(args, '--template'),
      test: hasFlag(args, '--test'),
      basePath: getFlagValue(args, '--base-path'),
    }),
  )
}
