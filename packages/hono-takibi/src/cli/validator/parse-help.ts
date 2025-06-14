/**
 * Checks if help was requested from the CLI arguments.
 * @param args - The CLI arguments
 * @returns boolean
 */
export function parseHelp(args: readonly string[]): boolean {
  return args.length === 0 || (args.length === 1 && (args[0] === '--help' || args[0] === '-h'))
}
