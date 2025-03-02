import type { DefaultValue } from '../../types'

/**
 * Generates a Zod default validation string
 *
 * @function generateZodDefault
 * @param defaultValue - The default value to set
 * @returns string - Generated Zod default validation string
 */
export function generateZodDefault(defaultValue: DefaultValue): string {
  return `.default(${JSON.stringify(defaultValue)})`
}
