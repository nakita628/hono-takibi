/**
 * Generates a regex pattern from a string
 *
 * @function regexPattern
 * @param pattern - The pattern to generate a regex from
 * @returns string - Generated regex pattern
 */
export function regexPattern(pattern: string) {
  const escapedPattern = pattern.replace(/(?<!\\)\//g, '\\/')
  const res = `/${escapedPattern}/`
  return res
}
