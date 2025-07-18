/**
 * @param { readonly string[] } args - The command line arguments
 * @param { string } flag - The flag to retrieve the value for
 * @returns { string | undefined } - Returns the value of the flag if present, otherwise undefined
 * @description Retrieves the value of a specific flag from the command line arguments.
 */
export function getFlagValue(args: readonly string[], flag: string): string | undefined {
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
  return undefined
}

/**
 * @param { readonly string[] } args - The command line arguments
 * @param { string } f - The flag to check for
 * @returns { boolean } - Returns true if the flag is present in the arguments, false otherwise
 * @description Checks if a specific flag is present in the command line arguments.
 */
export function hasFlag(args: readonly string[], f: string): boolean {
  return args.includes(f)
}

/**
 * @param { readonly string[] } args - The command line arguments
 * @returns { boolean } - Returns true if help is requested, false otherwise
 * @description Checks if the help flag is requested in the command line arguments.
 */
export function isHelpRequested(args: readonly string[]): boolean {
  return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
}

/**
 * @param { readonly string[] } argv - The command line arguments
 * @return { string[] } - Returns a new array containing the command line arguments excluding the first two elements.
 * @description Slices the command line arguments to exclude the first two elements (usually the node
 */
export function sliceArgv(argv: readonly string[]): string[] {
  return argv.slice(2)
}
