/**
 * Generates a regex literal string from a pattern.
 *
 * Escapes unescaped slashes and wraps the result in forward slashes.
 *
 * @param pattern - The raw pattern string.
 * @returns A string representing the regex literal.
 *
 * @example
 * ```ts
 * regexPattern('^/api/users$')
 * // → '/^\\/api\\/users$/'
 *
 * regexPattern('hello.*world')
 * // → '/hello.*world/'
 *
 * regexPattern('a\\/b') // already escaped
 * // → '/a\\/b/'
 * ```
 */
export function regexPattern(pattern: string): string {
  const escapedPattern = pattern.replace(/(?<!\\)\//g, '\\/')
  return `/${escapedPattern}/`
}
