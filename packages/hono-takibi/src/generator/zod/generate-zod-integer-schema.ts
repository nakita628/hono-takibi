import type { Schema } from '../../types/index.js'
import { generateZodDefault } from './generate-zod-default.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { generateZodRegex } from './regex.js'

/**
 * Generates a zod schema for an integer.
 * @param { Schema } schema - OpenAPI schema definition for an integer
 * @returns { string } Generated Zod integer schema string
 */
export function generateZodIntegerSchema(schema: Schema): string {
  const validations = ['z.number().int()']
  // pattern
  if (schema.pattern) validations.push(generateZodRegex(schema.pattern))
  // minLength
  if (schema.minLength) validations.push(generateZodMin(schema.minLength))
  // maxLength
  if (schema.maxLength) validations.push(generateZodMax(schema.maxLength))
  // 0 falsy value
  // minimum
  if (typeof schema.minimum === 'number') validations.push(generateZodMin(schema.minimum))
  // maximum
  if (typeof schema.maximum === 'number') validations.push(generateZodMax(schema.maximum))
  // default
  if (schema.default) validations.push(generateZodDefault(schema.default))
  return validations.join('')
}
