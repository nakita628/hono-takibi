/**
 * Gets the value following a CLI flag.
 *
 * @param args - CLI arguments.
 * @param flag - The flag to look for.
 * @returns The flag's value, or `undefined` if not found.
 */
export function getFlagValue(args: readonly string[], flag: string): string | undefined {
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
  return undefined
}

/**
 * Checks if a CLI flag is present.
 *
 * @param args - CLI arguments.
 * @param f - The flag to check.
 * @returns `true` if present, `false` otherwise.
 */
export function hasFlag(args: readonly string[], f: string): boolean {
  return args.includes(f)
}

/**
 * Determines whether help was requested.
 *
 * @param args - CLI arguments.
 * @returns `true` if `--help` or `-h` is the only argument.
 */
export function isHelpRequested(args: readonly string[]): boolean {
  return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
}

/**
 * Slices off the first two CLI arguments (`node` and script path).
 *
 * @param argv - Full process arguments.
 * @returns User-supplied arguments.
 */
export function sliceArgv(argv: readonly string[]): string[] {
  return argv.slice(2)
}
