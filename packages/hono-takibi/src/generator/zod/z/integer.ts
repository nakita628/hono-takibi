import type { Schema } from '../../../openapi/types.js'
import { _default, gt, lt, max, min, regex } from '../../../utils/index.js'

/**
 * Generate a Zod integer schema string from an OpenAPI schema.
 *
 * @param schema - OpenAPI schema definition for an integer.
 * @returns The generated Zod integer schema string.
 *
 * @remarks
 * - .positive() is used only if minimum: 0 and exclusiveMinimum: true (i.e., > 0)
 * - .negative() is used only if maximum: 0 and exclusiveMaximum: true (i.e., < 0)
 * - gt(x) is used only if exclusiveMinimum is a number
 * - lt(x) is used only if exclusiveMaximum is a number
 * - Avoids combining .min(0) + .positive() or .max(0) + .negative()
 */
export function integer(schema: Schema): string {
  const validations = [
    schema.format === 'int32'
      ? 'z.int32()'
      : schema.format === 'int64'
        ? 'z.int64()'
        : schema.format === 'bigint'
          ? 'z.bigint()'
          : 'z.int()',
  ]

  if (schema.pattern) validations.push(regex(schema.pattern))
  if (schema.minLength) validations.push(min(schema.minLength))
  if (schema.maxLength) validations.push(max(schema.maxLength))

  // default (must be before positive/negative)
  if (schema.default !== undefined) validations.push(_default(schema.default))

  // exclusiveMinimum as number → .gt()
  if (typeof schema.exclusiveMinimum === 'number') {
    validations.push(gt(schema.exclusiveMinimum))
  } else if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
    // if > 0 → .positive() (instead of .min(0))
    validations.push('.positive()')
  } else if (typeof schema.minimum === 'number') {
    validations.push(min(schema.minimum))
  }

  // exclusiveMaximum as number → .lt()
  if (typeof schema.exclusiveMaximum === 'number') {
    validations.push(lt(schema.exclusiveMaximum))
  } else if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
    // if < 0 → .negative() (instead of .max(0))
    validations.push('.negative()')
  } else if (typeof schema.maximum === 'number') {
    validations.push(max(schema.maximum))
  }

  return validations.join('')
}
