import type { Result } from '../types/index.js'
import { ok, err } from '../types/index.js'

/**
 * @param args - The CLI arguments
 * @returns
 */
export function ensureIO(args: string[]): Result<{ input: string; output: string }> {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined
  return input && output
    ? ok({ input, output })
    : err('Usage: hono-takibi <input-file> -o <output-file>')
}
