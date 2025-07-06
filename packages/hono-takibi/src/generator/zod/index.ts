import type { Schema } from '../../openapi/index.js'
import {
  string,
  number,
  array,
  _enum,
  integer,
  length,
  max,
  min,
  object,
  nullable,
} from './z/index.js'
import { stripMinIfgtExist, stripMaxIfLtExist, stripMinMaxExist } from '../../core/utils/index.js'
import { getRefSchemaName } from '../../core/schema/references/get-ref-schema-name.js'
import { oneOf } from '../zod-openapi-hono/openapi/components/oneof/index.js'
import { anyOf } from '../zod-openapi-hono/openapi/components/anyof/index.js'
import { allOf } from '../zod-openapi-hono/openapi/components/allof/index.js'
import { not } from '../zod-openapi-hono/openapi/components/not/index.js'

// Allow `type` to be single value or non‑empty array
const pickTypes = (t: Schema['type']): readonly string[] =>
  t === undefined ? [] : Array.isArray(t) ? t : [t]

// Apply .nullable() when nullable flag or "null" exists in type list
const wrapNullable = (expr: string, schema: Schema): string => {
  const types = pickTypes(schema.type)
  return schema.nullable || types.includes('null') ? `${expr}${nullable()}` : expr
}

// Append .gt() / .lt() when exclusive* are numeric (3.1 style)
const withExclusive = (expr: string, schema: Schema): string =>
  expr +
  (typeof schema.exclusiveMinimum === 'number' ? `.gt(${schema.exclusiveMinimum})` : '') +
  (typeof schema.exclusiveMaximum === 'number' ? `.lt(${schema.exclusiveMaximum})` : '')

export function zod(schema: Schema): string {
  /* $ref */
  if (schema.$ref) return getRefSchemaName(schema.$ref)

  /* const */
  if (schema.const !== undefined) {
    return wrapNullable(`z.literal(${JSON.stringify(schema.const)})`, schema)
  }

  /* enum */
  if (schema.enum) {
    const out = _enum(schema)
    return out !== undefined ? wrapNullable(out, schema) : 'z.any()'
  }

  const types = pickTypes(schema.type)

  /* object */
  if (types.includes('object')) return wrapNullable(object(schema), schema)

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
    return wrapNullable(optimised, schema)
  }

  /* number */
  if (types.includes('number')) {
    const numbered = withExclusive(number(schema), schema)
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
    return wrapNullable(afterLt, schema)
  }

  /* integer & bigint */
  if (types.includes('integer')) {
    const raw = integer(schema)

    // int64 → bigint literal suffix
    const int64Fixed = raw.includes('z.int64()') ? raw.replace(/(-?\d+)(?=\))/g, '$1n') : raw

    // bigint bounds to BigInt()
    const bigintPatched = int64Fixed.includes('z.bigint()')
      ? (() => {
          const NUM = /-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i
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

    return wrapNullable(bigintPatched, schema)
  }

  /* array */
  if (types.includes('array')) {
    if (schema.items === undefined) return wrapNullable('z.array(z.any())', schema)

    const core = array(zod(schema.items))

    // minItems/maxItems → .min()/ .max()
    const bounded =
      (schema.minItems !== undefined ? `${core}${min(schema.minItems)}` : core) +
      (schema.maxItems !== undefined ? max(schema.maxItems) : '')

    // minItems === maxItems → .length()
    if (schema.minItems !== undefined && schema.maxItems === schema.minItems) {
      return wrapNullable(`${array(zod(schema.items))}${length(schema.minItems)}`, schema)
    }

    // legacy: minLength/maxLength on array (for existing tests)
    if (schema.minLength !== undefined && schema.maxLength === schema.minLength) {
      return wrapNullable(`${core}${length(schema.minLength)}`, schema)
    }

    return wrapNullable(bounded, schema)
  }

  /* boolean */
  if (types.includes('boolean')) {
    wrapNullable('z.boolean()', schema)
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
