import { allOf } from '../../helper/allof.js'
import { anyOf } from '../../helper/anyof.js'
import { maybeApplyNullability, pickTypes } from '../../helper/index.js'
import { not } from '../../helper/not.js'
import { oneOf } from '../../helper/oneof.js'
import type { Schema } from '../../openapi/index.js'
import {
  array,
  length,
  max,
  min,
  refName,
  removeMaxIfLtExists,
  removeMinIfGtExists,
  removeMinMaxIfEqual,
} from '../../utils/index.js'

import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

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
  if (schema.$ref) return `${refName(schema.$ref)}Schema`

  /* const */
  if (schema.const !== undefined) {
    return maybeApplyNullability(`z.literal(${JSON.stringify(schema.const)})`, schema)
  }

  /* enum */
  if (schema.enum) {
    const out = _enum(schema)
    return out !== undefined ? maybeApplyNullability(out, schema) : 'z.any()'
  }

  const types = pickTypes(schema.type)

  /* object */
  if (types.includes('object')) {
    return maybeApplyNullability(object(schema), schema)
  }

  /* date */
  if (types.includes('date')) {
    return maybeApplyNullability('z.date()', schema)
  }

  /* string */
  if (types.includes('string')) {
    const base = string(schema)
    const optimised =
      schema.minLength !== undefined &&
      schema.maxLength !== undefined &&
      schema.minLength === schema.maxLength &&
      base.includes(`min(${schema.minLength})`) &&
      base.includes(`max(${schema.maxLength})`)
        ? `${removeMinMaxIfEqual(base, schema.minLength, schema.maxLength)}${length(schema.minLength)}`
        : base
    return maybeApplyNullability(optimised, schema)
  }

  /* number */
  if (types.includes('number')) {
  // Apply .nullable() if schema is nullable
  return maybeApplyNullability(number(schema), schema)
}

  /* integer & bigint */
  if (types.includes('integer')) {
    return maybeApplyNullability(integer(schema), schema)
  }

  /* array */
  if (types.includes('array')) {
    if (schema.items === undefined) return maybeApplyNullability('z.array(z.any())', schema)

    const zodArray = array(zod(schema.items))

    // minItems/maxItems → .min()/ .max()
    const bounded =
      (schema.minItems !== undefined ? `${zodArray}${min(schema.minItems)}` : zodArray) +
      (schema.maxItems !== undefined ? max(schema.maxItems) : '')

    // minItems === maxItems → .length()
    if (schema.minItems !== undefined && schema.maxItems === schema.minItems) {
      return maybeApplyNullability(`${array(zod(schema.items))}${length(schema.minItems)}`, schema)
    }

    // legacy: minLength/maxLength on array (for existing tests)
    if (schema.minLength !== undefined && schema.maxLength === schema.minLength) {
      return maybeApplyNullability(`${zodArray}${length(schema.minLength)}`, schema)
    }

    return maybeApplyNullability(bounded, schema)
  }

  /* boolean */
  if (types.includes('boolean')) {
    return maybeApplyNullability('z.boolean()', schema)
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
    return not(schema)
  }

  /* null only */
  if (types.length === 1 && types[0] === 'null') return 'z.null()'
  console.warn(`Unknown schema: ${JSON.stringify(schema)} - fallback to z.any()`)
  return 'z.any()'
}
