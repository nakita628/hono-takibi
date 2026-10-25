import { isSchemaArray, isValidIdent } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { decodePercent, makeStringLiteral, toIdentifierPascalCase } from '../utils/index.js'

export function makeTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
) {
  if (!schema) return 'unknown'
  // `{}` and `true` constrain nothing: the value is `unknown`, not an object (#379).
  if (Object.keys(schema).length === 0) return 'unknown'
  const types = normalizeType(schema)
  // `| null` is decided here, once, for every shape: a reference, a union or an enum that
  // is `nullable` (3.0), lists `null` among its types (3.1), or defaults to `null` (which
  // the schema writer answers with `.nullable()` so that `.default(null)` type-checks).
  const isNullable =
    schema.nullable === true ||
    types.includes('null') ||
    schema.default === null ||
    (schema.enum?.includes(null) ?? false)
  const nonNullTypes = types.filter((t) => t !== 'null')
  const baseType = makeNonNullTypeString(schema, nonNullTypes, selfTypeName, cyclicGroup, readonly)
  if (!isNullable || baseType === 'null') return baseType
  return `(${baseType}|null)`
}

function makeNonNullTypeString(
  schema: Schema,
  types: readonly string[],
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
) {
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
    const values = schema.enum.filter((v) => v !== null)
    if (values.length === 0) return 'null'
    return values.map((v) => (typeof v === 'string' ? makeStringLiteral(v) : String(v))).join('|')
  }
  if (schema.const !== undefined) {
    if (typeof schema.const === 'string') {
      return makeStringLiteral(schema.const)
    }
    if (typeof schema.const === 'number' || typeof schema.const === 'boolean') {
      return String(schema.const)
    }
    return JSON.stringify(schema.const)
  }
  return makeBaseTypeString(schema, types, selfTypeName, cyclicGroup, readonly)
}

function makeRefTypeString(ref: string, selfTypeName: string) {
  const propertiesMatch = ref.match(/^#\/components\/schemas\/([^/]+)\/properties\//u)
  if (propertiesMatch) {
    const parentName = toIdentifierPascalCase(decodePercent(propertiesMatch[1]))
    if (parentName === selfTypeName) {
      return `${parentName}Type`
    }
    return `z.infer<typeof ${parentName}Schema>`
  }
  const rawRef = ref.split('/').at(-1) ?? ''
  const refName = toIdentifierPascalCase(decodePercent(rawRef))
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
) {
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
) {
  if (type === 'string') return 'string'
  if (type === 'number') return 'number'
  if (type === 'integer') return isBigintFormat(schema) ? 'bigint' : 'number'
  if (type === 'boolean') return 'boolean'
  if (type === 'null') return 'null'
  if (type === 'array') return makeArrayTypeString(schema, selfTypeName, cyclicGroup, readonly)
  if (type === 'object') return makeObjectTypeString(schema, selfTypeName, cyclicGroup, readonly)
  return 'unknown'
}

// `z.int64()` / `z.uint64()` / `z.bigint()` output a bigint (see `z/integer.ts`), unless the
// value is read from text with `x-coerce`, where `z.coerce.bigint()` does the same.
function isBigintFormat(schema: Schema) {
  return schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint'
}

function wrapForArrayElement(type: string) {
  return type.startsWith('readonly ') || (type.includes('|') && !type.startsWith('('))
    ? `(${type})`
    : type
}

function makeArrayTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
): string {
  const prefix = readonly ? 'readonly ' : ''
  if (!schema.items) return `${prefix}unknown[]`
  const items = schema.items
  // JSON Schema 2020-12 §10.3.1.2 boolean items:
  //   items: true  → trailing items unconstrained (unknown[])
  //   items: false → trailing items disallowed; collapses to an empty tuple.
  if (typeof items === 'boolean') {
    return items ? `${prefix}unknown[]` : readonly ? 'readonly []' : '[]'
  }
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
    const safeKey = isValidIdent(key) ? key : makeStringLiteral(key)
    return `${readonlyPrefix}${safeKey}${isRequired ? '' : '?'}:${propType}`
  })
  return `{${propertyStrings.join(';')}}`
}
