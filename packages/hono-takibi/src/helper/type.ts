import { isSchemaArray } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { toIdentifierPascalCase } from '../utils/index.js'

/**
 * Generates a TypeScript type string from an OpenAPI schema.
 *
 * Handles various schema constructs including $ref, oneOf, anyOf, allOf,
 * enums, const values, and primitive/complex types.
 *
 * @param schema - The OpenAPI schema object.
 * @param selfTypeName - The name of the current type (for self-reference detection).
 * @param cyclicGroup - Optional set of type names in a cyclic dependency group.
 * @param readonly - Whether to generate readonly array and object types.
 * @returns A TypeScript type string representation.
 *
 * @example
 * ```ts
 * makeTypeString({ type: 'string' }, 'User')
 * // → 'string'
 *
 * makeTypeString({ type: 'object', properties: { name: { type: 'string' } } }, 'User')
 * // → '{name?:string}'
 *
 * makeTypeString({ type: 'array', items: { type: 'string' } }, 'User', undefined, true)
 * // → 'readonly string[]'
 *
 * makeTypeString({ type: 'object', properties: { name: { type: 'string' } } }, 'User', undefined, true)
 * // → '{readonly name?:string}'
 * ```
 */
export function makeTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  if (!schema) return 'unknown'

  if (schema.$ref) {
    return makeRefTypeString(schema.$ref, selfTypeName)
  }

  if (schema.oneOf && schema.oneOf.length > 0) {
    return makeUnionTypeString(schema.oneOf, selfTypeName, cyclicGroup, '|', readonly)
  }

  if (schema.anyOf && schema.anyOf.length > 0) {
    return makeUnionTypeString(schema.anyOf, selfTypeName, cyclicGroup, '|', readonly)
  }

  if (schema.allOf && schema.allOf.length > 0) {
    return makeUnionTypeString(schema.allOf, selfTypeName, cyclicGroup, '&', readonly)
  }

  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.map((v) => (typeof v === 'string' ? `'${v}'` : String(v))).join('|')
  }

  if (schema.const !== undefined) {
    return typeof schema.const === 'string' ? `'${schema.const}'` : String(schema.const)
  }

  const types = normalizeType(schema)
  const isNullable = schema.nullable === true || types.includes('null')
  const nonNullTypes = types.filter((t) => t !== 'null')
  const baseType = makeBaseTypeString(schema, nonNullTypes, selfTypeName, cyclicGroup, readonly)

  return isNullable ? `(${baseType}|null)` : baseType
}

function makeRefTypeString(ref: string, selfTypeName: string): string {
  const propertiesMatch = ref.match(/^#\/components\/schemas\/([^/]+)\/properties\//)
  if (propertiesMatch) {
    const parentName = toIdentifierPascalCase(decodeURIComponent(propertiesMatch[1]))
    // Only use local type name for self-references
    if (parentName === selfTypeName) {
      return `${parentName}Type`
    }
    return `z.infer<typeof ${parentName}Schema>`
  }
  const rawRef = ref.split('/').at(-1) ?? ''
  const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
  // Only use local type name for self-references
  // For other schemas (including those in cyclic group), use z.infer
  if (refName === selfTypeName) {
    return `${refName}Type`
  }
  return `z.infer<typeof ${refName}Schema>`
}

function makeUnionTypeString(
  schemas: readonly Schema[],
  selfTypeName: string,
  cyclicGroup: ReadonlySet<string> | undefined,
  separator: '|' | '&',
  readonly?: boolean,
): string {
  const types = schemas
    .filter(Boolean)
    .map((s) => makeTypeString(s, selfTypeName, cyclicGroup, readonly))
  return types.length === 0
    ? 'unknown'
    : types.length === 1
      ? types[0]
      : `(${types.join(separator)})`
}

function normalizeType(schema: Schema): readonly string[] {
  if (!schema.type) return ['object']
  return Array.isArray(schema.type) ? schema.type : [schema.type]
}

function makeBaseTypeString(
  schema: Schema,
  types: readonly string[],
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  if (types.length > 1) {
    return types
      .map((t) => makeSingleTypeString(schema, t, selfTypeName, cyclicGroup, readonly))
      .join('|')
  }
  return makeSingleTypeString(schema, types[0] ?? 'object', selfTypeName, cyclicGroup, readonly)
}

function makeSingleTypeString(
  schema: Schema,
  type: string,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  if (type === 'string') return 'string'
  if (type === 'number') return 'number'
  if (type === 'integer') return 'number'
  if (type === 'boolean') return 'boolean'
  if (type === 'null') return 'null'
  if (type === 'array') return makeArrayTypeString(schema, selfTypeName, cyclicGroup, readonly)
  if (type === 'object') return makeObjectTypeString(schema, selfTypeName, cyclicGroup, readonly)

  return 'unknown'
}

/**
 * Wraps a type in parentheses if it needs grouping for array syntax.
 *
 * When an inner type starts with 'readonly ' (for readonly arrays),
 * we need to wrap it in parentheses to avoid invalid syntax like
 * `readonly readonly T[][]`. Instead, we get `readonly (readonly T[])[]`.
 */
const wrapForArrayElement = (type: string): string =>
  type.startsWith('readonly ') ? `(${type})` : type

function makeArrayTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  const prefix = readonly ? 'readonly ' : ''
  if (!schema.items) return `${prefix}unknown[]`

  const items = schema.items

  // Handle array of Schemas (tuple style)
  if (isSchemaArray(items)) {
    const firstItem = items[0]

    if (items.length > 1) {
      const tupleTypes = items
        .filter(Boolean)
        .map((item) => makeTypeString(item, selfTypeName, cyclicGroup, readonly))
        .join(',')
      return readonly ? `readonly [${tupleTypes}]` : `[${tupleTypes}]`
    }

    if (firstItem !== undefined) {
      const innerType = makeTypeString(firstItem, selfTypeName, cyclicGroup, readonly)
      return `${prefix}${wrapForArrayElement(innerType)}[]`
    }

    return `${prefix}unknown[]`
  }

  // Handle single Schema (OpenAPI 3.0+ style)
  if (items.$ref) {
    const propertiesMatch = items.$ref.match(/^#\/components\/schemas\/([^/]+)\/properties\//)
    if (propertiesMatch) {
      const parentName = toIdentifierPascalCase(decodeURIComponent(propertiesMatch[1]))
      // Only use local type name for self-references
      if (parentName === selfTypeName) {
        return `${prefix}${parentName}Type[]`
      }
      return `${prefix}z.infer<typeof ${parentName}Schema>[]`
    }
    const rawRef = items.$ref.split('/').at(-1) ?? ''
    const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
    // Only use local type name for self-references
    if (refName === selfTypeName) {
      return `${prefix}${refName}Type[]`
    }
    return `${prefix}z.infer<typeof ${refName}Schema>[]`
  }
  const innerType = makeTypeString(items, selfTypeName, cyclicGroup, readonly)
  return `${prefix}${wrapForArrayElement(innerType)}[]`
}

function makeObjectTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  const { properties, additionalProperties, required } = schema
  const readonlyPrefix = readonly ? 'readonly ' : ''

  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === true) {
      return `{${readonlyPrefix}[key:string]:unknown}`
    }
    if (typeof additionalProperties === 'object') {
      const valueType = makeTypeString(additionalProperties, selfTypeName, cyclicGroup, readonly)
      return `{${readonlyPrefix}[key:string]:${valueType}}`
    }
    return `{${readonlyPrefix}[key:string]:unknown}`
  }

  const requiredSet = new Set(Array.isArray(required) ? required : [])

  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = makeTypeString(propSchema, selfTypeName, cyclicGroup, readonly)
    const isRequired = requiredSet.has(key)
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return `${readonlyPrefix}${safeKey}${isRequired ? '' : '?'}:${propType}`
  })

  return `{${propertyStrings.join(';')}}`
}
