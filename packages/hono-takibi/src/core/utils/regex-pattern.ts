/**
 * Generates a regex pattern from a string
 * @param { string } pattern - The pattern to generate a regex from
 * @returns { string } Generated regex pattern
 */
export function regexPattern(pattern: string): string {
  const escapedPattern = pattern.replace(/(?<!\\)\//g, '\\/')
  return `/${escapedPattern}/`
}
