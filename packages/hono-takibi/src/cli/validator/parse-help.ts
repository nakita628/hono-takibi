import type { Result } from '../../result/index.js'

/**
 * Checks if help was requested from the CLI arguments.
 * @param args - The CLI arguments
 * @returns Result<undefined, 'help'>
 */
export function parseHelp(args: readonly string[]): Result<undefined, 'help'> {
  if (args.length === 0 || (args.length === 1 && (args[0] === '--help' || args[0] === '-h'))) {
    return { ok: false, error: 'help' }
  }
  return { ok: true, value: undefined }
}
