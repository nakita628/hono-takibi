/**
 * @param as - The array of strings to check for the flag
 * @param f - The flag to look for
 */
export function flagVal(args: readonly string[], flag: string): string | undefined {
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
  return undefined
}