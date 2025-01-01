import { getZodFormatString } from '../../core/zod/get-zod-string-format'
import type { FormatString, ExampleValue, DefaultValue } from '../../types'
import { generateZodDefault } from './generate-zod-default'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

type GenerateZodStringSchemaParams = {
  pattern?: string
  minLength?: number
  maxLength?: number
  format?: FormatString
  default?: DefaultValue
  example?: ExampleValue
}

/**
 * Generates a Zod schema string for string validation
 *
 * @function generateZodStringSchema
 * @param args - Parameters for string schema generation
 * @returns Generated Zod schema string with chained validations
 *
 * @example
 * // Basic string validation
 * generateZodStringSchema({})
 * // Returns: 'z.string()'
 *
 * @example
 * // With regex pattern
 * generateZodStringSchema({ pattern: '^[A-Z]+$' })
 * // Returns: 'z.string().regex(/^[A-Z]+$/)'
 *
 * @example
 * // With length constraints
 * generateZodStringSchema({ minLength: 3, maxLength: 10 })
 * // Returns: 'z.string().min(3).max(10)'
 *
 * @example
 * // With format
 * generateZodStringSchema({ format: 'email' })
 * // Returns: 'z.string().email()'
 *
 * @example
 * // Combined validations
 * generateZodStringSchema({
 *   pattern: '^[a-z]+$',
 *   minLength: 3,
 *   maxLength: 10,
 *   format: 'email'
 * })
 * // Returns: 'z.string().regex(/^[a-z]+$/).min(3).max(10).email()'
 */
export function generateZodStringSchema(args: GenerateZodStringSchemaParams): string {
  const validations = ['z.string()']
  const { pattern, minLength, maxLength, format, default: defaultValue, example } = args
  if (pattern) validations.push(`.regex(/${pattern}/)`)
  if (minLength) validations.push(`.min(${minLength})`)
  if (maxLength) validations.push(`.max(${maxLength})`)
  if (format) validations.push(getZodFormatString(format))
  // default
  if (defaultValue) validations.push(generateZodDefault(defaultValue))
  // example
  if (example) validations.push(generateZodToOpenAPI(example))
  return validations.join('')
}
