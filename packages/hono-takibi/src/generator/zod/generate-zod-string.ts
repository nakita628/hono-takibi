import type { FormatString, ExampleValue, DefaultValue } from '../../type'
import { getZodFormatString } from '../../core/zod/get-zod-string-format'
import { generateZodDefault } from './generate-zod-default'
import { generateZodMax } from './generate-zod-max'
import { generateZodMin } from './generate-zod-min'
import { generateZodNullable } from './generate-zod-nullable'
import { generateZodRegex } from './generate-zod-regex'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi'

type GenerateZodStringParams = {
  pattern?: string
  minLength?: number
  maxLength?: number
  format?: FormatString
  nullable?: boolean
  default?: DefaultValue
  example?: ExampleValue
  paramName?: string
  isPath?: boolean
}

/**
 * Generates a Zod string schema
 * @param { GenerateZodStringParams } args - The parameters to generate the zod string schema.
 * @returns { string } Generated Zod string schema string
 * @example
 * // Basic string validation
 * generateZodString({})
 * // Returns: 'z.string()'
 * @example
 * // With regex pattern
 * generateZodString({ pattern: '^[A-Z]+$' })
 * // Returns: 'z.string().regex(/^[A-Z]+$/)'
 * @example
 * // With length constraints
 * generateZodString({ minLength: 3, maxLength: 10 })
 * // Returns: 'z.string().min(3).max(10)'
 * @example
 * // With format
 * generateZodString({ format: 'email' })
 * // Returns: 'z.string().email()'
 * @example
 * // Combined validations
 * generateZodString({
 *   pattern: '^[a-z]+$',
 *   minLength: 3,
 *   maxLength: 10,
 *   format: 'email'
 * })
 * // Returns: 'z.string().regex(/^[a-z]+$/).min(3).max(10).email()'
 */
export function generateZodString(args: GenerateZodStringParams): string {
  const validations = ['z.string()']
  // pattern
  if (args.pattern) {
    validations.push(generateZodRegex(args.pattern))
  }
  // minLength
  if (args.minLength) {
    validations.push(generateZodMin(args.minLength))
  }
  // maxLength
  if (args.maxLength) {
    validations.push(generateZodMax(args.maxLength))
  }
  // format
  if (args.format) {
    validations.push(getZodFormatString(args.format))
  }
  // default
  if (args.default) {
    validations.push(generateZodDefault(args.default))
  }
  // nullable
  if (args.nullable) {
    validations.push(generateZodNullable())
  }
  // example
  if (args.example) {
    validations.push(generateZodToOpenAPI(args.example, args.paramName, args.isPath))
  }
  return validations.join('')
}
