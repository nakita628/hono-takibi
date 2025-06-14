import type { Result } from '../../result/index.js'
import { ok, err } from '../../result/index.js'
import { isTs, isYamlOrJson } from './index.js'

/**
 * @param args - The CLI arguments
 * @param config - The configuration object containing input and output file paths
 * @returns A Result containing the input and output file paths or an error message
 */
export function parseIO(
  args: readonly string[],
  config: { input?: `${string}.yaml` | `${string}.json`; output?: `${string}.ts` },
): Result<{ input: `${string}.yaml` | `${string}.json`; output: `${string}.ts` }, string> {
  const cliInput = args[0]
  const oIdx = args.indexOf('-o')
  const cliOutput = oIdx !== -1 ? args[oIdx + 1] : undefined

  const input = cliInput ?? config.input
  const output = cliOutput ?? config.output

  if (output) {
    if (isYamlOrJson(input) && isTs(output)) {
      return ok({ input, output })
    }
  }
  return err('Usage: hono-takibi <input.yaml|.json> -o <output.ts>')
}
