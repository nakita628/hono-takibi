import {
  isAnnotationOnly,
  isBinaryFile,
  isPresent,
  isSchemaArray,
  isUntypedObject,
} from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import {
  decodePercent,
  makeSafeKey,
  makeStringLiteral,
  toIdentifierPascalCase,
} from '../utils/index.js'

/**
 * What differs between the places a schema is written as a TypeScript type: the rest of
 * the writer is the same for all of them, so that they cannot disagree (#608).
 */
export type TypeWriter = {
  /** How a `$ref` is written: the name of an alias, or `z.infer<typeof XSchema>`. */
  readonly ref: (ref: string) => string
  /** `readonly` on every property, index signature, array and tuple. */
  readonly readonly: boolean
  /**
   * `| undefined` on an optional property. Hono's `JSONParsed` adds it to what a route
   * outputs; `z.infer` of an `.exactOptional()` property does not have it.
   */
  readonly optionalUndefined: boolean
}

/**
 * The type of a schema beside the Zod schema written for it: a `$ref` is what the schema
 * constant of its component infers, or the type being declared when it names itself.
 */
export function makeTypeString(
  schema: Schema,
  selfTypeName: string,
  _cyclicGroup?: ReadonlySet<string>,
  readonly?: boolean,
) {
  return makeSchemaTypeString(schema, {
    ref: (ref) => {
      const refName = toIdentifierPascalCase(decodePercent(ref.split('/').at(-1) ?? ''))
      return refName === selfTypeName ? `${refName}Type` : `z.infer<typeof ${refName}Schema>`
    },
    readonly: readonly === true,
    optionalUndefined: false,
  })
}

/**
 * The TypeScript type of what the Zod schema written for `schema` outputs.
 */
export function makeSchemaTypeString(schema: Schema, writer: TypeWriter): string {
  if (!isPresent(schema)) return 'unknown'
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
    (schema.enum?.includes(null) ?? false) ||
    (intersectedMembers(schema)?.some(isNullMember) ?? false)
  const nonNullTypes = types.filter((typeName) => typeName !== 'null')
  const baseType = makeNonNullTypeString(schema, nonNullTypes, writer)
  if (!isNullable || baseType === 'null') return baseType
  return `(${baseType}|null)`
}

function makeNonNullTypeString(schema: Schema, types: readonly string[], writer: TypeWriter) {
  if (schema.$ref) {
    return writer.ref(schema.$ref)
  }
  if (schema.oneOf && schema.oneOf.length > 0) {
    return makeUnionTypeString(schema.oneOf, '|', writer)
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    return makeUnionTypeString(schema.anyOf, '|', writer)
  }
  const members = intersectedMembers(schema)
  if (members !== undefined) {
    // A member that only allows `null`, or only annotates, says something of the whole
    // value and is no part of the intersection: `X & (unknown | null)` is `X`, and
    // `X & null` is `never`. `makeTypeString` has already read the `null` off it (#527).
    return makeUnionTypeString(
      members.filter((member) => !(isNullMember(member) || isAnnotationOnly(member))),
      '&',
      writer,
    )
  }
  // An int64 is a bigint in the generated schema, and so are the literals of its enum.
  const isBigintLiteral = (value: unknown): value is number =>
    typeof value === 'number' &&
    Number.isInteger(value) &&
    (Array.isArray(schema.type) ? schema.type.includes('integer') : schema.type === 'integer') &&
    isBigintFormat(schema)
  if (schema.enum && schema.enum.length > 0) {
    const values = schema.enum.filter((v) => v !== null)
    if (values.length === 0) return 'null'
    return values
      .map((v) =>
        typeof v === 'string'
          ? makeStringLiteral(v)
          : isBigintLiteral(v)
            ? `${v}n`
            : typeof v === 'object'
              ? JSON.stringify(v)
              : String(v),
      )
      .join('|')
  }
  if (schema.const !== undefined) {
    if (typeof schema.const === 'string') {
      return makeStringLiteral(schema.const)
    }
    if (isBigintLiteral(schema.const)) return `${schema.const}n`
    if (typeof schema.const === 'number' || typeof schema.const === 'boolean') {
      return String(schema.const)
    }
    return JSON.stringify(schema.const)
  }
  return makeBaseTypeString(schema, types, writer)
}

// The members of the `allOf` this schema is typed by: none when a `$ref`, a `oneOf` or an
// `anyOf` beside it is typed instead.
function intersectedMembers(schema: Schema): readonly Schema[] | undefined {
  if (schema.$ref) return undefined
  if (schema.oneOf && schema.oneOf.length > 0) return undefined
  if (schema.anyOf && schema.anyOf.length > 0) return undefined
  return schema.allOf && schema.allOf.length > 0 ? schema.allOf.filter(Boolean) : undefined
}

// An `allOf` member that makes the whole value nullable, as the schema writer reads it
// (`.nullable()` on the intersection): `{ type: 'null' }`, or `nullable: true` with
// nothing beside it that validates (Box).
function isNullMember(member: Schema) {
  return member.type === 'null' || (member.nullable === true && isAnnotationOnly(member))
}

function makeUnionTypeString(
  schemas: readonly Schema[],
  separator: '|' | '&',
  writer: TypeWriter,
): string {
  const types = schemas.filter(Boolean).map((s) => makeSchemaTypeString(s, writer))
  const [only] = types
  return only === undefined ? 'unknown' : types.length === 1 ? only : `(${types.join(separator)})`
}

// A schema with no `type` is an object when it declares properties (#385); otherwise the
// value may be anything (`{ required: ['oas'] }` is checked on `z.unknown()`, Tyk).
function normalizeType(schema: Schema): readonly string[] {
  if (schema.type === undefined) return isUntypedObject(schema) ? ['object'] : []
  return Array.isArray(schema.type) ? schema.type : [schema.type]
}

function makeBaseTypeString(schema: Schema, types: readonly string[], writer: TypeWriter) {
  if (types.length > 1) {
    return types.map((typeName) => makeSingleTypeString(schema, typeName, writer)).join('|')
  }
  const [type] = types
  // No type but `null`: what `z.null()` outputs. No type at all: anything.
  if (type === undefined) return schema.type === 'null' ? 'null' : 'unknown'
  return makeSingleTypeString(schema, type, writer)
}

function makeSingleTypeString(schema: Schema, type: string, writer: TypeWriter) {
  // `z.file()` outputs a File (#413).
  if (type === 'string') return isBinaryFile(schema) ? 'File' : 'string'
  if (type === 'number') return 'number'
  if (type === 'integer') return isBigintFormat(schema) ? 'bigint' : 'number'
  if (type === 'boolean') return 'boolean'
  if (type === 'null') return 'null'
  if (type === 'array') return makeArrayTypeString(schema, writer)
  if (type === 'object') return makeObjectTypeString(schema, writer)
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

function makeArrayTypeString(schema: Schema, writer: TypeWriter): string {
  const prefix = writer.readonly ? 'readonly ' : ''
  // Boolean `items` (JSON Schema 2020-12 §10.3.1.2) are `unknown[]` either way: `true`
  // constrains nothing, and `false` is emitted as `z.array(z.any()).length(0)`, which infers
  // an array and would not fit an empty tuple.
  if (!isPresent(schema.items) || schema.items === true) return `${prefix}unknown[]`
  const items = schema.items
  if (isSchemaArray(items)) {
    const firstItem = items[0]
    if (items.length > 1) {
      const tupleTypes = items
        .filter(Boolean)
        .map((item) => makeSchemaTypeString(item, writer))
        .join(',')
      return `${prefix}[${tupleTypes}]`
    }
    if (firstItem !== undefined) {
      const innerType = makeSchemaTypeString(firstItem, writer)
      return `${prefix}${wrapForArrayElement(innerType)}[]`
    }
    return `${prefix}unknown[]`
  }
  const innerType = makeSchemaTypeString(items, writer)
  return `${prefix}${wrapForArrayElement(innerType)}[]`
}

function makeObjectTypeString(schema: Schema, writer: TypeWriter): string {
  const { properties, additionalProperties, required } = schema
  const readonlyPrefix = writer.readonly ? 'readonly ' : ''
  if (!properties || Object.keys(properties).length === 0) {
    // `z.strictObject({})` has no key at all.
    if (additionalProperties === false) return '{}'
    if (typeof additionalProperties === 'object') {
      const valueType = makeSchemaTypeString(additionalProperties, writer)
      return `{${readonlyPrefix}[key:string]:${valueType}}`
    }
    return `{${readonlyPrefix}[key:string]:unknown}`
  }
  const requiredSet = new Set(Array.isArray(required) ? required : [])
  const optional = writer.optionalUndefined ? '|undefined' : ''
  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = makeSchemaTypeString(propSchema, writer)
    return requiredSet.has(key)
      ? `${readonlyPrefix}${makeSafeKey(key)}:${propType}`
      : `${readonlyPrefix}${makeSafeKey(key)}?:${propType}${optional}`
  })
  return `{${propertyStrings.join(';')}}`
}
