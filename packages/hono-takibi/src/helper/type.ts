import {
  hasTypelessConstraint,
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
import { isShapeMember, narrowToDeclaredType } from './zod.js'

/**
 * What differs between the places a schema is written as a TypeScript type: the rest of
 * the writer is the same for all of them, so that they cannot disagree (#608).
 */
export type TypeWriter = {
  /**
   * How a `$ref` is written: the name of an alias, or `z.infer<typeof XSchema>`.
   * `direct` says that nothing defers the reference: it is the schema itself or a member
   * of its `allOf` / `anyOf` / `oneOf`, not a property, an element or an index signature.
   * TypeScript lets an alias reach itself only through one of those (#635).
   */
  readonly ref: (ref: string, direct: boolean) => string
  /** The component schemas, to follow a `$ref` the way the schema writer does. */
  readonly schemas: { readonly [k: string]: Schema } | undefined
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
  schemas?: { readonly [k: string]: Schema },
) {
  return makeSchemaTypeString(schema, {
    schemas,
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
export function makeSchemaTypeString(schema: Schema, writer: TypeWriter, direct = true): string {
  if (!isPresent(schema)) return 'unknown'
  // `{}` and `true` constrain nothing: the value is anything, not an object (#379). They
  // are written `z.any()`, which outputs `any` (#632).
  if (Object.keys(schema).length === 0) return 'any'
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
  const baseType = makeNonNullTypeString(schema, nonNullTypes, writer, direct)
  if (!isNullable || baseType === 'null') return baseType
  return `(${baseType}|null)`
}

function makeNonNullTypeString(
  schema: Schema,
  types: readonly string[],
  writer: TypeWriter,
  direct: boolean,
) {
  if (schema.$ref) {
    return writer.ref(schema.$ref, direct)
  }
  if (schema.oneOf && schema.oneOf.length > 0) {
    return makeUnionTypeString(schema.oneOf, '|', writer, direct)
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    return makeUnionTypeString(schema.anyOf, '|', writer, direct)
  }
  if (intersectedMembers(schema) !== undefined) {
    // A declared `type` beside the `allOf` is written into its members first, as the
    // schema writer does (#468): `type: string` beside a member that only annotates is a
    // string, not anything.
    const narrowed = narrowToDeclaredType(schema, writer.schemas)
    const members = (narrowed.allOf ?? []).filter(Boolean)
    // A member that only allows `null`, or only annotates, says something of the whole
    // value and is no part of the intersection: `X & (unknown | null)` is `X`, and
    // `X & null` is `never`. `makeTypeString` has already read the `null` off it (#527).
    return makeUnionTypeString(
      [
        ...members.filter((member) => !(isNullMember(member) || isAnnotationOnly(member))),
        ...shapeMembers(narrowed, writer),
      ],
      '&',
      writer,
      direct,
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

// The `properties` beside an `allOf`, as one more member of the intersection, where the
// schema writer makes them one: `X.and(z.object({ ... }))` outputs them (#634). Where it
// checks them on the raw value instead, the output does not have them.
function shapeMembers(schema: Schema, writer: TypeWriter): readonly Schema[] {
  if (!isShapeMember(schema, writer.schemas)) return []
  return [
    {
      type: 'object',
      ...(schema.properties ? { properties: schema.properties } : {}),
      ...(schema.required ? { required: schema.required } : {}),
    },
  ]
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
  direct: boolean,
): string {
  const written = schemas.filter(Boolean).map((s) => makeSchemaTypeString(s, writer, direct))
  // `X & unknown` is `X`: a member that says nothing is not written beside one that does.
  const said = separator === '&' ? written.filter((type) => type !== 'unknown') : written
  const types = said.length === 0 ? written.slice(0, 1) : said
  const [only] = types
  // No member left: `z.any()`.
  return only === undefined ? 'any' : types.length === 1 ? only : `(${types.join(separator)})`
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
  // No type but `null`: what `z.null()` outputs. No type at all: `z.unknown()` with the
  // checks of its keywords, or `z.any()` when there is nothing to check (#632).
  if (type === undefined) {
    if (schema.type === 'null') return 'null'
    // `not` is a refinement of `z.any()`, whatever stands beside it.
    return schema.not === undefined && hasTypelessConstraint(schema) ? 'unknown' : 'any'
  }
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
  return 'any'
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
  // A tuple of `prefixItems` is checked element by element on `z.array(z.unknown())`.
  if (Array.isArray(schema.prefixItems)) return `${prefix}unknown[]`
  // No `items`, and boolean `items` (JSON Schema 2020-12 §10.3.1.2), are `any[]` either
  // way: `true` constrains nothing, and `false` is emitted as `z.array(z.any()).length(0)`,
  // which infers an array and would not fit an empty tuple (#632).
  if (!isPresent(schema.items) || schema.items === true) return `${prefix}any[]`
  const items = schema.items
  if (isSchemaArray(items)) {
    const firstItem = items[0]
    if (items.length > 1) {
      const tupleTypes = items
        .filter(Boolean)
        .map((item) => makeSchemaTypeString(item, writer, false))
        .join(',')
      return `${prefix}[${tupleTypes}]`
    }
    if (firstItem !== undefined) {
      const innerType = makeSchemaTypeString(firstItem, writer, false)
      return `${prefix}${wrapForArrayElement(innerType)}[]`
    }
    return `${prefix}any[]`
  }
  const innerType = makeSchemaTypeString(items, writer, false)
  return `${prefix}${wrapForArrayElement(innerType)}[]`
}

function makeObjectTypeString(schema: Schema, writer: TypeWriter): string {
  const { properties, additionalProperties, required } = schema
  const readonlyPrefix = writer.readonly ? 'readonly ' : ''
  if (!properties || Object.keys(properties).length === 0) {
    // Beside `patternProperties` the base is `z.looseObject({})`, whatever
    // `additionalProperties` says: a key a pattern matches is held to the pattern's schema,
    // not to that of `additionalProperties`, so a value is not known to be either (#629).
    if (Object.keys(schema.patternProperties ?? {}).length > 0) {
      return `{${readonlyPrefix}[key:string]:unknown}`
    }
    // `z.strictObject({})` has no key at all.
    if (additionalProperties === false) return '{}'
    if (typeof additionalProperties === 'object') {
      const valueType = makeSchemaTypeString(additionalProperties, writer, false)
      return `{${readonlyPrefix}[key:string]:${valueType}}`
    }
    return `{${readonlyPrefix}[key:string]:unknown}`
  }
  const requiredSet = new Set(Array.isArray(required) ? required : [])
  const optional = writer.optionalUndefined ? '|undefined' : ''
  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = makeSchemaTypeString(propSchema, writer, false)
    return requiredSet.has(key)
      ? `${readonlyPrefix}${makeSafeKey(key)}:${propType}`
      : `${readonlyPrefix}${makeSafeKey(key)}?:${propType}${optional}`
  })
  return `{${propertyStrings.join(';')}}`
}
