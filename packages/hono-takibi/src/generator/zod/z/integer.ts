import type { Schema } from '../../../openapi/types.js'
import { _default, max, min, regex } from '../../../utils/index.js'

/**
 * Generate a Zod integer schema string from an OpenAPI schema.
 *
 * @param schema - OpenAPI schema definition for an integer.
 * @returns The generated Zod integer schema string.
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
  ].filter(Boolean)

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
  // 0 falsy value
  // minimum
  if (typeof schema.minimum === 'number') {
    validations.push(min(schema.minimum))
  }
  // maximum
  if (typeof schema.maximum === 'number') {
    validations.push(max(schema.maximum))
  }
  // default
  if (schema.default) {
    validations.push(_default(schema.default))
  }
  return validations.join('')
}
