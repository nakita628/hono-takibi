import { allOf } from '../../helper/allof.js'
import { anyOf } from '../../helper/anyof.js'
import { pickTypes } from '../../helper/index.js'
import { oneOf } from '../../helper/oneof.js'
import type { Schema } from '../../openapi/index.js'
import { refName } from '../../utils/index.js'
import { _enum, array, integer, number, object, string } from './z/index.js'

/**
 * Converts an OpenAPI `Schema` object into a Zod schema string.
 *
 * Handles primitives (`string`, `number`, `boolean`, `array`, `object`, `integer`),
 * references (`$ref`), constants (`const`), enums, combinators (`oneOf`, `anyOf`, `allOf`, `not`),
 * and other schema metadata (`nullable`, `minLength`, `maxLength`, `exclusiveMinimum`, etc).
 *
 * If the schema is unrecognized or empty, defaults to `'z.any()'`.
 *
 * @param schema - The OpenAPI schema object to convert
 * @returns A string representing the corresponding Zod schema
 *
 * @example
 * // String schema
 * zod({ type: 'string' })
 * // → 'z.string()'
 *
 * @example
 * // Enum schema
 * zod({ type: 'string', enum: ['A', 'B'] })
 * // → 'z.enum(["A","B"])'
 *
 * @example
 * // Nullable number with exclusiveMinimum
 * zod({ type: 'number', exclusiveMinimum: 3, nullable: true })
 * // → 'z.number().gt(3).nullable()'
 *
 * @example
 * // Object with properties
 * zod({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({name:z.string()})'
 *
 * @example
 * // Reference schema
 * zod({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 *
 * @example
 * // Unknown schema
 * zod({})
 * // → 'z.any()'
 *
 * @remarks
 * - Automatically applies `.nullable()` if applicable
 * - Combines `.min()` / `.max()` into `.length()` where appropriate
 * - Optimizes out redundant `.min()` when `.gt()` is used
 * - Logs unhandled cases to `console.warn`
 */
export function zod(schema: Schema): string {
  /* $ref */
  if (schema.$ref) {
    return `${refName(schema.$ref)}Schema`
  }
  /* const */
  if (schema.const !== undefined) {
    const base = `z.literal(${JSON.stringify(schema.const)})`

    const isNullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

    return isNullable ? `${base}.nullable()` : base
  }
  /* enum */
  if (schema.enum) {
    const out = _enum(schema)
    if (out !== undefined) {
      return out
    }
    return 'z.any()'
  }
  const types = pickTypes(schema.type)
  /* object */
  if (pickTypes(schema.type).includes('object')) {
    return object(schema)
  }
  /* date */
  if (types.includes('date')) {
    const addNullable = (expr: string): string =>
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
        ? `${expr}.nullable()`
        : expr

    return addNullable('z.date()')
  }
  /* string */
  if (types.includes('string')) {
    return string(schema)
  }
  /* number */
  if (types.includes('number')) {
    return number(schema)
  }
  /* integer & bigint */
  if (types.includes('integer')) {
    return integer(schema)
  }
  /* array */
  if (types.includes('array')) {
    return array(schema)
  }
  /* boolean */
  if (types.includes('boolean')) {
    const addNullable = (expr: string): string =>
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
        ? `${expr}.nullable()`
        : expr
    return addNullable('z.boolean()')
  }
  /* combinators */
  if (schema.oneOf) {
    return oneOf(schema)
  }
  if (schema.anyOf) {
    return anyOf(schema)
  }
  if (schema.allOf) {
    return allOf(schema)
  }
  if (schema.not) {
    return 'z.unknown()'
  }
  /* null only */
  if (types.length === 1 && types[0] === 'null') {
    return 'z.null()'
  }

  console.warn(`Unknown schema: ${JSON.stringify(schema)} - fallback to z.any()`)

  return 'z.any()'
}
