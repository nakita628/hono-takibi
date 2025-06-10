import type { DefaultValue, Schema } from '../../types/index.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { regex, _default, gt, lt } from './index.js'

/**
 * Generates a Zod number schema string
 * @param { Schema } schema - OpenAPI schema definition for a number
 * @returns { string } Generated Zod number schema string
 */
export function number(schema: Schema): string {
  const validations = ['z.number()']
  // pattern
  if (schema.pattern) {
    validations.push(regex(schema.pattern))
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
    validations.push(_default(schema.default))
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
      validations.push(gt(schema.minimum))
    }
  }
  // lt
  if (schema.maximum) {
    if (schema.maximum > 0 && schema.exclusiveMaximum) {
      validations.push(lt(schema.maximum))
    }
  }
  return validations.join('')
}
