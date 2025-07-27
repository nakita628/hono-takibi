import type { Schema } from '../../../openapi/types.js'
import { _default, gt, lt, max, min, regex } from '../../../utils/index.js'

export function number(schema: Schema): string {
  const parts: string[] = [
    schema.format === 'float' || schema.format === 'float32'
      ? 'z.float32()'
      : schema.format === 'float64'
        ? 'z.float64()'
        : 'z.number()',
  ]

  if (schema.pattern) parts.push(regex(schema.pattern))
  if (schema.minLength !== undefined) parts.push(min(schema.minLength))
  if (schema.maxLength !== undefined) parts.push(max(schema.maxLength))

  /* -------- lower bound -------- */
  if (schema.minimum !== undefined) {
    if (schema.minimum === 0) {
      parts.push(schema.exclusiveMinimum ? '.positive()' : '.nonpositive()')
    } else if (schema.exclusiveMinimum === true) {
      parts.push(gt(schema.minimum))
    } else {
      parts.push(min(schema.minimum))
    }
  } else if (typeof schema.exclusiveMinimum === 'number') {
    // numeric exclusiveMinimum without minimum
    parts.push(gt(schema.exclusiveMinimum))
  }

  /* -------- upper bound -------- */
  if (schema.maximum !== undefined) {
    if (schema.maximum === 0) {
      parts.push(schema.exclusiveMaximum ? '.negative()' : '.nonnegative()')
    } else if (schema.exclusiveMaximum === true) {
      parts.push(lt(schema.maximum))
    } else {
      parts.push(max(schema.maximum))
    }
  } else if (typeof schema.exclusiveMaximum === 'number') {
    // numeric exclusiveMaximum without maximum
    parts.push(lt(schema.exclusiveMaximum))
  }

  /* -------- default (always last) -------- */
  if (schema.default !== undefined) {
    parts.push(_default(schema.default))
  }

  return parts.join('')
}
