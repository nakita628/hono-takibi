/**
 * @param args - The CLI arguments
 * @returns
 */
export function parseHelp(args: string[]): boolean {
  return args.length === 0 || (args.length === 1 && (args[0] === '--help' || args[0] === '-h'))
}
