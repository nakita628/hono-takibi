import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { normalizeTypes } from '../../utils/index.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

export function zodToOpenAPI(
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
  },
): string {
  if (schema === undefined) throw new Error('Schema is undefined')
  /** ref */
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta)
  }
  /* combinators */
  /** allOf */
  if (schema.allOf !== undefined) {
    if (!schema.allOf?.length) return wrap('z.any()', schema, meta)

    const isNullType = (s: Schema) =>
      s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)
    const isRefOnly = (s: Schema) => s.$ref !== undefined && Object.keys(s).length === 1
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      schema.allOf.some(isNullType)

    const nonNull = schema.allOf.filter((s) => !isNullType(s))
    if (nonNull.length === 0) return wrap('z.any()', { ...schema, nullable }, meta)

    const schemas = nonNull.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, meta),
    )
    const isBareRef =
      schemas.length === 1 &&
      nonNull.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    if (isBareRef) return nullable ? `${schemas[0]}.nullable()` : schemas[0]

    const z = schemas.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
    return wrap(z, { ...schema, nullable }, meta)
  }
  /* anyOf */
  if (schema.anyOf !== undefined) {
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }
    const anyOfSchemas = schema.anyOf.map((subSchema) => {
      if (subSchema.$ref && Object.keys(subSchema).length === 1) {
        if (subSchema.$ref) {
          return makeRef(subSchema.$ref)
        }
      }
      return zodToOpenAPI(subSchema, meta)
    })
    const z = `z.union([${anyOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }
  /* oneOf */
  if (schema.oneOf !== undefined) {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }
    // Check if any oneOf member uses allOf (would create ZodIntersection)
    const hasAllOf = schema.oneOf.some((s) => s.allOf !== undefined)
    const oneOfSchemas = schema.oneOf.map((s) => {
      if (s.$ref && Object.keys(s).length === 1) {
        if (s.$ref) {
          return makeRef(s.$ref)
        }
      }
      return zodToOpenAPI(s, meta)
    })
    const discriminator = schema.discriminator?.propertyName
    // Use z.xor instead of discriminatedUnion when allOf is present (ZodIntersection not compatible)
    const z =
      discriminator && !hasAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}])`
        : `z.xor([${oneOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }
  /* not */
  if (schema.not !== undefined) {
    const typePredicates: Record<string, string> = {
      string: `(v) => typeof v !== 'string'`,
      number: `(v) => typeof v !== 'number'`,
      integer: `(v) => typeof v !== 'number' || !Number.isInteger(v)`,
      boolean: `(v) => typeof v !== 'boolean'`,
      array: '(v) => !Array.isArray(v)',
      object: `(v) => typeof v !== 'object' || v === null || Array.isArray(v)`,
      null: '(v) => v !== null',
    }
    // 1. not.const
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(v) => v !== ${value}`
      return wrap(`z.any().refine(${predicate})`, schema, meta)
    }
    // 2. not.type (single type)
    if (typeof schema.not === 'object' && typeof schema.not.type === 'string') {
      const predicate = typePredicates[schema.not.type]
      if (predicate) {
        return wrap(`z.any().refine(${predicate})`, schema, meta)
      }
    }
    // 3. not.enum
    if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
      const list = JSON.stringify(schema.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      return wrap(`z.any().refine(${predicate})`, schema, meta)
    }
    // 4. fallback
    return wrap('z.any()', schema, meta)
  }
  /* const */
  if (schema.const !== undefined) {
    const value = schema.const
    // z.literal only supports primitives in Zod 4
    const isPrimitive =
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    const z = isPrimitive
      ? `z.literal(${JSON.stringify(value)})`
      : `z.custom<${JSON.stringify(value)}>()`
    return wrap(z, schema, meta)
  }
  /* enum */
  if (schema.enum !== undefined) return wrap(_enum(schema), schema, meta)
  /* properties */
  if (schema.properties !== undefined) return wrap(object(schema), schema, meta)
  const t = normalizeTypes(schema.type)
  /* string */
  if (t.includes('string')) return wrap(string(schema), schema, meta)
  /* number */
  if (t.includes('number')) return wrap(number(schema), schema, meta)
  /* integer & bigint */
  if (t.includes('integer')) return wrap(integer(schema), schema, meta)
  /* boolean */
  if (t.includes('boolean')) return wrap('z.boolean()', schema, meta)
  /* array */
  if (t.includes('array')) {
    // Handle both array and single object items (runtime check for OpenAPI compatibility)
    const rawItems = schema.items
    const itemSchema: Schema | undefined = Array.isArray(rawItems) ? rawItems[0] : rawItems
    const item = itemSchema?.$ref
      ? itemSchema.$ref
        ? makeRef(itemSchema.$ref)
        : itemSchema
          ? zodToOpenAPI(itemSchema, meta)
          : 'z.any()'
      : itemSchema
        ? zodToOpenAPI(itemSchema, meta)
        : 'z.any()'
    const z = `z.array(${item})`
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      return schema.minItems === schema.maxItems
        ? wrap(`${z}.length(${schema.minItems})`, schema, meta)
        : wrap(`${z}.min(${schema.minItems}).max(${schema.maxItems})`, schema, meta)
    }
    if (typeof schema.minItems === 'number')
      return wrap(`${z}.min(${schema.minItems})`, schema, meta)
    if (typeof schema.maxItems === 'number')
      return wrap(`${z}.max(${schema.maxItems})`, schema, meta)
    return wrap(z, schema, meta)
  }
  /* object */
  if (t.includes('object')) return wrap(object(schema), schema, meta)
  /* date */
  if (t.includes('date')) return wrap('z.date()', schema, meta)
  /* null only */
  if (t.length === 1 && t[0] === 'null') return wrap('z.null()', schema, meta)
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta)
}
