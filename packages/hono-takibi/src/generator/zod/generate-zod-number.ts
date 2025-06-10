import type { DefaultValue, Schema } from '../../types/index.js'
import { generateZodDefault } from './generate-zod-default.js'
import { generateZodGt } from './generate-zod-gt.js'
import { generateZodLt } from './generate-zod-lt.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { generateZodRegex } from './regex.js'

/**
 * Generates a Zod number schema string
 * @param { Schema } schema - OpenAPI schema definition for a number
 * @returns { string } Generated Zod number schema string
 */
export function generateZodNumber(schema: Schema): string {
  const validations = ['z.number()']
  // pattern
  if (schema.pattern) {
    validations.push(generateZodRegex(schema.pattern))
  }
  // minLength
  if (schema.minLength) {
    validations.push(generateZodMin(schema.minLength))
  }
  // maxLength
  if (schema.maxLength) {
    validations.push(generateZodMax(schema.maxLength))
  }
  // minimum
  if (schema.minimum) {
    validations.push(generateZodMin(schema.minimum))
  }
  // maximum
  if (schema.maximum) {
    validations.push(generateZodMax(schema.maximum))
  }
  // default
  if (schema.default) {
    validations.push(generateZodDefault(schema.default))
  }
  // 0 falsy value
  // minimum === 0
  // positive
  if (schema.minimum === 0 && schema.exclusiveMinimum) {
    validations.push('.positive()')
  }
  // nonpositive
  if (schema.minimum === 0 && !schema.exclusiveMinimum) {
    if (!schema.default) {
      validations.push('.nonpositive()')
    }
  }
  // negative
  if (schema.maximum === 0 && schema.exclusiveMaximum) {
    if (!schema.default) {
      validations.push('.negative()')
    }
  }
  // gt
  if (schema.minimum) {
    if (schema.minimum > 0 && schema.exclusiveMinimum) {
      validations.push(generateZodGt(schema.minimum))
    }
  }
  // lt
  if (schema.maximum) {
    if (schema.maximum > 0 && schema.exclusiveMaximum) {
      validations.push(generateZodLt(schema.maximum))
    }
  }
  return validations.join('')
}
