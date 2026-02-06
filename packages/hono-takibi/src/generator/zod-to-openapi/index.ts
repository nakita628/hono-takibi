/**
 * OpenAPI Schema to Zod schema converter.
 *
 * Transforms OpenAPI/JSON Schema definitions into Zod validation schemas,
 * supporting all common schema types and combinators.
 *
 * ```mermaid
 * flowchart TD
 *   A["zodToOpenAPI(schema)"] --> B{"Has $ref?"}
 *   B -->|Yes| C["makeRef()"]
 *   B -->|No| D{"Has combinator?"}
 *   D -->|allOf| E["z.intersection()"]
 *   D -->|anyOf| F["z.union()"]
 *   D -->|oneOf| G["z.discriminatedUnion() or z.xor()"]
 *   D -->|not| H["z.any().refine()"]
 *   D -->|No| I{"Check type"}
 *   I -->|string| J["string()"]
 *   I -->|number| K["number()"]
 *   I -->|integer| L["integer()"]
 *   I -->|boolean| M["z.boolean()"]
 *   I -->|array| N["z.array()"]
 *   I -->|object| O["object()"]
 *   I -->|null| P["z.null()"]
 *   I -->|unknown| Q["z.any()"]
 * ```
 *
 * @module generator/zod-to-openapi
 */
import { makeRef } from '../../helper/index.js'
import { wrap } from '../../helper/wrap.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'
import { normalizeTypes } from '../../utils/index.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

/**
 * Converts an OpenAPI Schema to a Zod schema string.
 *
 * Supports all JSON Schema types and OpenAPI extensions:
 * - Primitives: string, number, integer, boolean, null
 * - Complex: object, array
 * - Combinators: allOf, anyOf, oneOf, not
 * - References: $ref
 * - Modifiers: nullable, default, enum, const
 *
 * ```mermaid
 * flowchart LR
 *   A["OpenAPI Schema"] --> B["zodToOpenAPI()"]
 *   B --> C["Zod Schema String"]
 *   C --> D["e.g. z.object({...})"]
 * ```
 *
 * @param schema - OpenAPI Schema object to convert
 * @param meta - Optional parameter/header metadata for validation
 * @returns Zod schema string representation
 *
 * @example
 * ```ts
 * // Simple string
 * zodToOpenAPI({ type: 'string' })
 * // → 'z.string()'
 *
 * // Object with properties
 * zodToOpenAPI({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({ name: z.string() })'
 *
 * // Reference
 * zodToOpenAPI({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 * ```
 */
export function zodToOpenAPI(
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
    isOptional?: boolean
  },
): string {
  if (schema === undefined) throw new Error('Schema is undefined')
  // isOptional should only affect the outermost schema, not nested schemas
  // Strip isOptional for recursive calls using destructuring to avoid 'as' cast
  const innerMeta: typeof meta = meta?.isOptional
    ? (() => {
        const { isOptional: _, ...rest } = meta
        return rest
      })()
    : meta
  /** ref */
  if (schema.$ref !== undefined) {
    return wrap(makeRef(schema.$ref), schema, meta)
  }

  // Helper: Check if schema is null type
  const isNullType = (s: Schema) =>
    s.type === 'null' || (s.nullable === true && Object.keys(s).length === 1)

  // Helper: Check if schema is a bare $ref (no other properties)
  // Used to optimize $ref handling - when $ref is the only property,
  // we can use makeRef() directly instead of recursing
  const isRefOnly = (s: Schema) => s.$ref !== undefined && Object.keys(s).length === 1

  /* combinators */
  /** allOf */
  if (schema.allOf !== undefined) {
    // Merge sibling properties as implicit allOf member (JSON Schema spec)
    let effectiveAllOf: readonly Schema[] = schema.allOf
    if (schema.properties !== undefined) {
      const siblingSchema: Schema = {
        type: 'object' as const,
        properties: schema.properties,
        ...(schema.required ? { required: schema.required } : {}),
      }
      effectiveAllOf = [...schema.allOf, siblingSchema]
    }
    if (!effectiveAllOf.length) return wrap('z.any()', schema, meta)

    const nullable =
      schema.nullable === true ||
      (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null') ||
      effectiveAllOf.some(isNullType)

    const nonNull = effectiveAllOf.filter((s) => !isNullType(s))
    if (nonNull.length === 0) return wrap('z.any()', { ...schema, nullable }, meta)

    const schemas = nonNull.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta),
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
    if (schema.anyOf.length === 0) return wrap('z.any()', schema, meta)
    const anyOfSchemas = schema.anyOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta),
    )
    return wrap(`z.union([${anyOfSchemas.join(',')}])`, schema, meta)
  }
  /* oneOf */
  if (schema.oneOf !== undefined) {
    if (schema.oneOf.length === 0) return wrap('z.any()', schema, meta)
    // Check if any oneOf member is a $ref (could reference allOf schema) or uses allOf directly
    // ZodIntersection (from allOf) is not compatible with discriminatedUnion
    const hasRefOrAllOf = schema.oneOf.some((s) => s.$ref !== undefined || s.allOf !== undefined)
    const oneOfSchemas = schema.oneOf.map((s) =>
      isRefOnly(s) ? makeRef(s.$ref ?? '') : zodToOpenAPI(s, innerMeta),
    )
    const discriminator = schema.discriminator?.propertyName
    // Use z.xor when $ref is present (referenced schema might use allOf)
    const z =
      discriminator && !hasRefOrAllOf
        ? `z.discriminatedUnion('${discriminator}',[${oneOfSchemas.join(',')}])`
        : `z.xor([${oneOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }
  /* not */
  if (schema.not !== undefined) {
    const typePredicates: { readonly [k: string]: string } = {
      string: `(v) => typeof v !== 'string'`,
      number: `(v) => typeof v !== 'number'`,
      integer: `(v) => typeof v !== 'number' || !Number.isInteger(v)`,
      boolean: `(v) => typeof v !== 'boolean'`,
      array: '(v) => !Array.isArray(v)',
      object: `(v) => typeof v !== 'object' || v === null || Array.isArray(v)`,
      null: '(v) => v !== null',
    }
    // 0. not.$ref
    if (typeof schema.not === 'object' && schema.not.$ref !== undefined) {
      const refName = makeRef(schema.not.$ref)
      return wrap(`z.any().refine((v) => !${refName}.safeParse(v).success)`, schema, meta)
    }
    // 1. not.const
    if (typeof schema.not === 'object' && 'const' in schema.not) {
      const value = JSON.stringify(schema.not.const)
      const predicate = `(v) => v !== ${value}`
      return wrap(`z.any().refine(${predicate})`, schema, meta)
    }
    // 2a. not.type (single type)
    if (typeof schema.not === 'object' && typeof schema.not.type === 'string') {
      const predicate = typePredicates[schema.not.type]
      if (predicate) {
        return wrap(`z.any().refine(${predicate})`, schema, meta)
      }
    }
    // 2b. not.type (array of types)
    if (typeof schema.not === 'object' && Array.isArray(schema.not.type)) {
      const predicates = (schema.not.type)
        .map((t) => typePredicates[t])
        .filter((p): p is string => p !== undefined)
      if (predicates.length > 0) {
        const bodies = predicates.map((p) => `(${p.replace(/^\(v\) => /, '')})`)
        const combined = `(v) => ${bodies.join(' && ')}`
        return wrap(`z.any().refine(${combined})`, schema, meta)
      }
    }
    // 3. not.enum
    if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
      const list = JSON.stringify(schema.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      return wrap(`z.any().refine(${predicate})`, schema, meta)
    }
    // 3b. not with composition (oneOf/anyOf/allOf)
    if (
      typeof schema.not === 'object' &&
      (schema.not.oneOf !== undefined ||
        schema.not.anyOf !== undefined ||
        schema.not.allOf !== undefined)
    ) {
      const innerZod = zodToOpenAPI(schema.not, innerMeta)
      return wrap(`z.any().refine((v) => !${innerZod}.safeParse(v).success)`, schema, meta)
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
    // JSON Schema 2020-12: prefixItems for tuple validation
    if (schema.prefixItems !== undefined && Array.isArray(schema.prefixItems)) {
      const tupleItems = schema.prefixItems.map((item) =>
        item.$ref ? makeRef(item.$ref) : zodToOpenAPI(item, innerMeta),
      )
      const z = `z.tuple([${tupleItems.join(',')}])`
      return wrap(z, schema, meta)
    }
    // items can be Schema or readonly Schema[] (JSON Schema draft-04 tuple validation)
    const itemSchema: Schema | undefined = Array.isArray(schema.items) ? schema.items[0] : schema.items
    const item = itemSchema
      ? itemSchema.$ref
        ? makeRef(itemSchema.$ref)
        : zodToOpenAPI(itemSchema, innerMeta)
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
