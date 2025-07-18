import { getFlagValue, hasFlag } from '../utils/index.js'
import type { Result } from '../../result/index.js'
import { ok, andThen } from '../../result/index.js'
import { parseIO } from './index.js'

/**
 * @param { readonly string[] } args
 * @returns { Result<
 *   {
 *     input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
 *     output: `${string}.ts`
 *   },
 *   string
 * > }
 * @description Parses command line arguments for the CLI.
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
