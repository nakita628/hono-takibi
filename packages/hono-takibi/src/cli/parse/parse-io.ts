import type { Result } from '../../result/index.js'
import { ok, err } from '../../result/index.js'
import { isTs, isYamlOrJsonOrTsp } from '../validator/index.js'

/**
 * @param { readonly string[] } args - Command line arguments
 * @returns { Result<{ input: `${string}.yaml` | `${string}.json` | `${string}.tsp`; output: `${string}.ts` }, string> } - Parses the input and output file paths from the command line arguments
 * @description This function extracts the input and output file paths from the command line arguments and validates their formats.
 */
export function parseIO(
  args: readonly string[],
): Result<
  { input: `${string}.yaml` | `${string}.json` | `${string}.tsp`; output: `${string}.ts` },
  string
> {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined

  if (output) {
    if (isYamlOrJsonOrTsp(input) && isTs(output)) {
      return ok({ input, output })
    }
  }
  return err('Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]')
}
