/**
 * @param args - The array of strings to check for the flag
 * @param f
 */

export function hasFlag(args: readonly string[], f: string) {
  return args.includes(f)
}
