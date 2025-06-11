import type { DefaultValue } from '../../types/index.js'

/**
 * Generates a Zod default validation string
 * @param { DefaultValue } defaultValue - The default value to set
 * @returns { string } Generated Zod default validation string
 */
export function _default(defaultValue: DefaultValue): string {
  return `.default(${JSON.stringify(defaultValue)})`
}
