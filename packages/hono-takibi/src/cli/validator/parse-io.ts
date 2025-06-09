import type { Result } from '../../result/index.js'
import { ok, err } from '../../result/index.js'

/**
 * @param args - The CLI arguments
 * @param config - The configuration object containing input and output file paths
 * @returns A Result containing the input and output file paths or an error message
 */
export function parseIO(
  args: readonly string[],
  config: { input?: string; output?: string },
): Result<{ input: string; output: string }, string> {
  const cliInput = args[0]
  const oIdx = args.indexOf('-o')
  const cliOutput = oIdx !== -1 ? args[oIdx + 1] : undefined

  const input = cliInput ?? config.input
  const output = cliOutput ?? config.output

  return input && output
    ? ok({ input, output })
    : err('Usage: hono-takibi <input-file> -o <output-file>')
}
