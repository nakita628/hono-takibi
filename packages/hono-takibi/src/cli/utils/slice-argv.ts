/**
 * @param argv - The command line arguments array
 */
export function sliceArgv(argv: readonly string[]): string[] {
  return argv.slice(2)
}
