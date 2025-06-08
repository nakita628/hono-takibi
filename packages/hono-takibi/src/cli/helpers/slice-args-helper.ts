/**
 * @param argv - The command line arguments array
 */
export function sliceArgsHelper(argv: readonly string[]): string[] {
  return argv.slice(2)
}
