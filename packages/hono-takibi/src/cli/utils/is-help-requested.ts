/**
 * Returns true when CLI args are exactly ['--help'] or ['-h'].
 */
export function isHelpRequested(args: readonly string[]): boolean {
  return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
}
