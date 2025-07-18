import type { Schema } from '../../openapi/index.js'
import { string, number, array, _enum, integer, length, max, min, object } from './z/index.js'
import {
  stripMinIfgtExist,
  stripMaxIfLtExist,
  stripMinMaxExist,
  pickTypes,
  maybeApplyNullability,
  exclusive,
} from '../../core/utils/index.js'
import { getRefSchemaName } from '../../core/schema/references/get-ref-schema-name.js'
import { oneOf } from '../zod-openapi-hono/openapi/components/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/components/anyof/index.js'
import { allOf } from '../zod-openapi-hono/openapi/components/allof/index.js'
import { not } from '../zod-openapi-hono/openapi/components/not/index.js'

/**
 * @param { Schema } schema - The OpenAPI schema to convert.
 * @returns { string } - The Zod schema string.
 * @description This function handles various schema types, including objects, arrays, strings, numbers, enums, and more.
 */
export function zod(schema: Schema): string {
  /* $ref */
  if (schema.$ref) return getRefSchemaName(schema.$ref)

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
        ? `${stripMinMaxExist(base, schema.minLength, schema.maxLength)}${length(schema.minLength)}`
        : base
    return maybeApplyNullability(optimised, schema)
  }

  /* number */
  if (types.includes('number')) {
    const numbered = exclusive(number(schema), schema)
    const afterGt =
      schema.minimum !== undefined &&
      numbered.includes(`min(${schema.minimum})`) &&
      numbered.includes(`gt(${schema.minimum})`)
        ? stripMinIfgtExist(numbered, schema.minimum)
        : numbered
    const afterLt =
      schema.maximum !== undefined &&
      afterGt.includes(`max(${schema.maximum})`) &&
      afterGt.includes(`lt(${schema.maximum})`)
        ? stripMaxIfLtExist(afterGt, schema.maximum)
        : afterGt
    return maybeApplyNullability(afterLt, schema)
  }

  /* integer & bigint */
  if (types.includes('integer')) {
    const raw = integer(schema)

    // int64 → bigint literal suffix
    const int64Fixed = raw.includes('z.int64()') ? raw.replace(/(-?\d+)(?=\))/g, '$1n') : raw

    // bigint bounds to BigInt()
    const bigintPatched = int64Fixed.includes('z.bigint()')
      ? (() => {
          const NUM = /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i
          return int64Fixed
            .replace(
              new RegExp(`\\.min\\(\\s*(${NUM.source})\\s*\\)`, 'gi'),
              (_, n) => `.min(BigInt(${n}))`,
            )
            .replace(
              new RegExp(`\\.max\\(\\s*(${NUM.source})\\s*\\)`, 'gi'),
              (_, n) => `.max(BigInt(${n}))`,
            )
        })()
      : int64Fixed

    return maybeApplyNullability(bigintPatched, schema)
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
