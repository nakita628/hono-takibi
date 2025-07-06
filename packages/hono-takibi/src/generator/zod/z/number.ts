import type { Schema } from '../../../openapi/index.js'
import { regex, _default, gt, lt, min, max } from './index.js'

/**
 * Generates a Zod number schema string
 * @param { Schema } schema - OpenAPI schema definition for a number
 * @returns { string } Generated Zod number schema string
 */
export function number(schema: Schema): string {
  const validations = [
    schema.format === 'float'
      ? 'z.float()'
      : schema.format === 'float32'
        ? 'z.float32()'
        : schema.format === 'float64'
          ? 'z.float64()'
          : 'z.number()',
  ]
  // pattern
  if (schema.pattern) {
    validations.push(regex(schema.pattern))
  }
  // minLength
  if (schema.minLength) {
    validations.push(min(schema.minLength))
  }
  // maxLength
  if (schema.maxLength) {
    validations.push(max(schema.maxLength))
  }
  // minimum
  if (schema.minimum) {
    validations.push(min(schema.minimum))
  }
  // maximum
  if (schema.maximum) {
    validations.push(max(schema.maximum))
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
