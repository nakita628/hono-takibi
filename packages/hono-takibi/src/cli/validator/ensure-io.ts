import type { Result } from '../types/index.js'
import { ok, err } from '../types/index.js'

/**
 * @param args - The CLI arguments
 */
export function ensureIO(
  args: string[],
  config: { input?: string; output?: string },
): Result<{ input: string; output: string }> {
  const cliInput = args[0]
  const oIdx = args.indexOf('-o')
  const cliOutput = oIdx !== -1 ? args[oIdx + 1] : undefined

  const input = cliInput ?? config.input
  const output = cliOutput ?? config.output

  return input && output
    ? ok({ input, output })
    : err('Usage: hono-takibi <input-file> -o <output-file>')
}
