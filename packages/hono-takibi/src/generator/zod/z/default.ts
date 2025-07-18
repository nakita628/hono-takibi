import type { DefaultValue } from '../../../openapi/index.js'

/**
 * @param { DefaultValue } defaultValue - The default value to set
 * @returns { string } Generated Zod default validation string
 * @description Generates a Zod default validation string
 */
export function _default(defaultValue: DefaultValue): string {
  return `.default(${JSON.stringify(defaultValue)})`
}
