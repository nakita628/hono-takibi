import type { Result } from '../../result/index.js'
import { ok, err } from '../../result/index.js'
import { isTs, isYamlOrJson } from '../validator/index.js'

/**
 * @param args - The CLI arguments
 * @returns A Result containing the input and output file paths or an error message
 */
export function parseIO(
  args: readonly string[],
): Result<{ input: `${string}.yaml` | `${string}.json`; output: `${string}.ts` }, string> {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined

  if (output) {
    if (isYamlOrJson(input) && isTs(output)) {
      return ok({ input, output })
    }
  }
  return err('Usage: hono-takibi <input.{yaml,json}> -o <routes.ts> [options]')
}
