import type { Result } from '../result/index.js'
import { err, ok } from '../result/index.js'
import { getFlagValue, hasFlag, isTs, isYamlOrJsonOrTsp } from '../utils/index.js'

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
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined

  if (!(input && output && isYamlOrJsonOrTsp(input) && isTs(output))) {
    return err('Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]')
  }

  return ok({
    input,
    output,
    exportType: hasFlag(args, '--export-type'),
    exportSchema: hasFlag(args, '--export-schema'),
    template: hasFlag(args, '--template'),
    test: hasFlag(args, '--test'),
    basePath: getFlagValue(args, '--base-path'),
  })
}
