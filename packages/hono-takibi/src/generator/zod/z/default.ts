import type { DefaultValue } from '../../../openapi/index.js'

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
export function _default(defaultValue: DefaultValue): string {
  return `.default(${JSON.stringify(defaultValue)})`
}
