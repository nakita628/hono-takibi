/**
 * @param argv - The command line arguments array
 */
export function sliceArgs(argv: readonly string[]): string[] {
  return argv.slice(2)
}
