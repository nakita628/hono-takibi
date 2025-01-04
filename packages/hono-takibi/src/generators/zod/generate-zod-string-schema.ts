import { main } from '../..'
import { getZodFormatString } from '../../core/zod/get-zod-string-format'
import type { FormatString, ExampleValue, DefaultValue } from '../../types'
import { generateZodDefault } from './generate-zod-default'
import { generateZodMax } from './generate-zod-max'
import { generateZodMin } from './generate-zod-min'
import { generateZodRegex } from './generate-zod-regex'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

type GenerateZodStringSchemaParams = {
  pattern?: string
  minLength?: number
  maxLength?: number
  format?: FormatString
  default?: DefaultValue
  example?: ExampleValue
  paramName?: string
  isPath?: boolean
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
  // pattern
  if (args.pattern) validations.push(generateZodRegex(args.pattern))
  // minLength
  if (args.minLength) validations.push(generateZodMin(args.minLength))
  // maxLength
  if (args.maxLength) validations.push(generateZodMax(args.maxLength))
  // format
  if (args.format) validations.push(getZodFormatString(args.format))
  // default
  if (args.default) validations.push(generateZodDefault(args.default))
  // example
  if (args.example)
    validations.push(generateZodToOpenAPI(args.example, args.paramName, args.isPath))
  return validations.join('')
}
