/**
 * Generate a Zod `.default()` validation string.
 *
 * @param defaultValue - The default value to apply.
 * @returns The Zod `.default()` string.
 *
 * @example
 * _default('guest') // => '.default("guest")'
 * _default(0) // => '.default(0)'
 * _default(true) // => '.default(true)'
 */
export function _default(defaultValue: unknown): string {
  return `.default(${JSON.stringify(defaultValue)})`
}
