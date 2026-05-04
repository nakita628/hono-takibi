import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { error, normalizeTypes } from '../../utils/index.js'
import { string, number, integer, object, _enum } from './z/index.js'

export function zodToOpenAPI(
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
    isOptional?: boolean
    /**
     * When set, the immediate object below this call is a `discriminatedUnion`
     * variant. The named property is the discriminator and must NOT be wrapped
     * in `.exactOptional()` even if absent from the OpenAPI `required` array,
     * because Zod's `discriminatedUnion` rejects absent/optional discriminators
     * at runtime ("No matching discriminator"). Consumed by `object()`.
     */
    discriminatorKey?: string
  },
  readonly?: boolean,
): string {
  if (schema === undefined) throw new Error('Schema is undefined')
  // isOptional should only affect the outermost schema; strip for recursive calls.
  const innerMeta = meta?.isOptional
    ? (() => {
        const { isOptional: _, ...rest } = meta
        return rest
      })()
    : meta
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta)
  }
  const isNullType = (s: Schema) =>
    s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)
  const isRefOnly = (s: Schema) => s.$ref !== undefined && Object.keys(s).length === 1
  if (schema.allOf !== undefined) {
    const effectiveAllOf: readonly Schema[] =
      schema.properties !== undefined
        ? [
            ...schema.allOf,
            {
              type: 'object' as const,
              properties: schema.properties,
              ...(schema.required ? { required: schema.required } : {}),
            },
          ]
        : schema.allOf
    if (!effectiveAllOf.length) return wrap('z.any()', schema, meta)
    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      effectiveAllOf.some(isNullType)
    const nonNull = effectiveAllOf.filter((s) => !isNullType(s))
    if (nonNull.length === 0) return wrap('z.any()', { ...schema, nullable }, meta)
    const schemas = nonNull.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const isBareRef =
      schemas.length === 1 &&
      nonNull.every(isRefOnly) &&
      Object.keys(schema).every((k) => k === 'allOf' || k === 'nullable' || k === 'type')
    if (isBareRef) return nullable ? `${schemas[0]}.nullable()` : schemas[0]
    const z = schemas.reduce((acc, s, i) => (i === 0 ? s : `${acc}.and(${s})`))
    return wrap(z, { ...schema, nullable }, meta)
  }
  if (schema.anyOf !== undefined) {
    if (schema.anyOf.length === 0) return wrap('z.any()', schema, meta)
    const anyOfSchemas = schema.anyOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const anyOfMessage = schema['x-anyOf-message']
    const anyOfErrorArg = anyOfMessage ? `,${error(anyOfMessage)}` : ''
    return wrap(`z.union([${anyOfSchemas.join(',')}]${anyOfErrorArg})`, schema, meta)
  }
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return wrap('z.any()', schema, meta)
    // ZodIntersection (from allOf) is not compatible with discriminatedUnion, so
    // fall back to xor when oneOf contains a $ref or allOf member.
    const hasRefOrAllOf = schema.oneOf.some((s) => s.$ref !== undefined || s.allOf !== undefined)
    const oneOfSchemas = schema.oneOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta, readonly),
    )
    const discriminator = schema.discriminator?.propertyName
    const oneOfMessage = schema['x-oneOf-message']
    const oneOfErrorArg = oneOfMessage ? `,${error(oneOfMessage)}` : ''
    const z =
      discriminator && !hasRefOrAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}]${oneOfErrorArg})`
        : `z.xor([${oneOfSchemas.join(',')}]${oneOfErrorArg})`
    return wrap(z, schema, meta)
  }
  if (schema.not !== undefined) {
    const notMessage = schema['x-not-message']
    const notErrorArg = notMessage ? `,${error(notMessage)}` : ''
    const typePredicates: { readonly [k: string]: string } = {
      string: `(v) => typeof v !== 'string'`,
      number: `(v) => typeof v !== 'number'`,
      integer: `(v) => typeof v !== 'number' || !Number.isInteger(v)`,
      boolean: `(v) => typeof v !== 'boolean'`,
      array: '(v) => !Array.isArray(v)',
      object: `(v) => typeof v !== 'object' || v === null || Array.isArray(v)`,
      null: '(v) => v !== null',
    }
    if (typeof schema.not === 'object' && schema.not.$ref !== undefined) {
      const refName = makeRef(schema.not.$ref)
      return wrap(
        `z.any().refine((v) => !${refName}.safeParse(v).success${notErrorArg})`,
        schema,
        meta,
      )
    }
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(v) => v !== ${value}`
      return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
    }
    if (typeof schema.not === 'object' && typeof schema.not.type === 'string') {
      const predicate = typePredicates[schema.not.type]
      if (predicate) {
        return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
      }
    }
    if (typeof schema.not === 'object' && Array.isArray(schema.not.type)) {
      const predicates = schema.not.type
        .map((t) => typePredicates[t])
        .filter((v) => v !== undefined)
      if (predicates.length > 0) {
        const bodies = predicates.map((v) => `(${v.replace(/^\(v\) => /, '')})`)
        const combined = `(v) => ${bodies.join(' && ')}`
        return wrap(`z.any().refine(${combined}${notErrorArg})`, schema, meta)
      }
    }
    if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
      const list = JSON.stringify(schema.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      return wrap(`z.any().refine(${predicate}${notErrorArg})`, schema, meta)
    }
    if (
      typeof schema.not === 'object' &&
      (schema.not.oneOf !== undefined ||
        schema.not.anyOf !== undefined ||
        schema.not.allOf !== undefined)
    ) {
      const zod = zodToOpenAPI(schema.not, innerMeta, readonly)
      return wrap(`z.any().refine((v) => !${zod}.safeParse(v).success${notErrorArg})`, schema, meta)
    }
    return wrap('z.any()', schema, meta)
  }
  if (schema.const !== undefined) {
    const value = schema.const
    const errorMessage = schema['x-error-message']
    const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
    // z.literal supports only primitives in Zod 4; fall back to z.custom for objects/arrays.
    const isPrimitive =
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    const z = isPrimitive
      ? `z.literal(${JSON.stringify(value)}${errorArg})`
      : `z.custom<${JSON.stringify(value)}>()`
    return wrap(z, schema, meta)
  }
  if (schema.enum !== undefined) return wrap(_enum(schema), schema, meta)
  if (schema.properties !== undefined) return wrap(object(schema, readonly), schema, meta)
  const t = normalizeTypes(schema.type)
  if (t.includes('string')) return wrap(string(schema), schema, meta)
  if (t.includes('number')) return wrap(number(schema), schema, meta)
  if (t.includes('integer')) return wrap(integer(schema), schema, meta)
  if (t.includes('boolean')) {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.boolean(${error(errorMessage)})` : 'z.boolean()'
    return wrap(base, schema, meta)
  }
  if (t.includes('array')) {
    const readonlyMod = readonly ? '.readonly()' : ''
    const arrayErrorMessage = schema['x-error-message']
    const arrayErrorArg = arrayErrorMessage ? `,${error(arrayErrorMessage)}` : ''
    if (schema.prefixItems !== undefined && Array.isArray(schema.prefixItems)) {
      const tupleItems = schema.prefixItems.map((item) =>
        item.$ref ? makeRef(item.$ref) : zodToOpenAPI(item, innerMeta, readonly),
      )
      const z = `z.tuple([${tupleItems.join(',')}]${arrayErrorArg})`
      return wrap(`${z}${readonlyMod}`, schema, meta)
    }
    // items can be Schema or readonly Schema[] (Draft-04 tuple validation).
    const itemSchema: Schema | undefined = Array.isArray(schema.items)
      ? schema.items[0]
      : schema.items
    const item = itemSchema
      ? itemSchema.$ref
        ? makeRef(itemSchema.$ref)
        : zodToOpenAPI(itemSchema, innerMeta, readonly)
      : 'z.any()'
    const z = `z.array(${item}${arrayErrorArg})`
    const patternMessage = schema['x-pattern-message']
    const patternErrorArg = patternMessage ? `,${error(patternMessage)}` : ''
    const unique =
      schema.uniqueItems === true
        ? `.refine((items)=>new Set(items).size===items.length${patternErrorArg})`
        : ''
    const sizeMessage = schema['x-size-message']
    const sizeErrorArg = sizeMessage ? `,${error(sizeMessage)}` : ''
    const minMessage = schema['x-minimum-message']
    const minErrorArg = minMessage ? `,${error(minMessage)}` : ''
    const maxMessage = schema['x-maximum-message']
    const maxErrorArg = maxMessage ? `,${error(maxMessage)}` : ''
    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      return schema.minItems === schema.maxItems
        ? wrap(
            `${z}.length(${schema.minItems}${sizeErrorArg})${unique}${readonlyMod}`,
            schema,
            meta,
          )
        : wrap(
            `${z}.min(${schema.minItems}${minErrorArg}).max(${schema.maxItems}${maxErrorArg})${unique}${readonlyMod}`,
            schema,
            meta,
          )
    }
    if (typeof schema.minItems === 'number')
      return wrap(`${z}.min(${schema.minItems}${minErrorArg})${unique}${readonlyMod}`, schema, meta)
    if (typeof schema.maxItems === 'number')
      return wrap(`${z}.max(${schema.maxItems}${maxErrorArg})${unique}${readonlyMod}`, schema, meta)
    return wrap(`${z}${unique}${readonlyMod}`, schema, meta)
  }
  if (t.includes('object')) return wrap(object(schema, readonly), schema, meta)
  if (t.includes('date')) {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.date(${error(errorMessage)})` : 'z.date()'
    return wrap(base, schema, meta)
  }
  if (t.length === 1 && t[0] === 'null') {
    const errorMessage = schema['x-error-message']
    const base = errorMessage ? `z.null(${error(errorMessage)})` : 'z.null()'
    return wrap(base, schema, meta)
  }
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta)
}
