import {
  fileMimeTypes,
  hasNoUserChain,
  isBinaryFile,
  isExamplesInput,
  isRecord,
  isSchemaArray,
} from '../guard/index.js'
import type { Header, Parameter, Schema, Type } from '../openapi/index.js'
import { regexLiteral } from '../utils/index.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { makeExamples } from './openapi.js'
import { WIRE_EMPTY, WIRE_INHERITED, WIRE_NULL, resolveSchemaRef, wireStyle } from './wire.js'

/**
 * The keys of a Schema Object (OpenAPI 3.1 §4.8.24, the type `.openapi()` and `param.schema`
 * take), plus `x-` extensions. Whatever else a document carries — `$schema`, `$id`,
 * `$defs` (#377), ajv-errors' `errorMessage` (#393) — has no place in the metadata: written
 * there, the call does not type-check. `nullable` is the 3.0 spelling of a `null` type.
 */
const SCHEMA_OBJECT_KEYS = new Set([
  '$ref',
  'discriminator',
  'readOnly',
  'writeOnly',
  'xml',
  'externalDocs',
  'example',
  'examples',
  'deprecated',
  'type',
  'format',
  'allOf',
  'oneOf',
  'anyOf',
  'not',
  'items',
  'properties',
  'additionalProperties',
  'propertyNames',
  'description',
  'default',
  'title',
  'multipleOf',
  'maximum',
  'const',
  'exclusiveMaximum',
  'minimum',
  'exclusiveMinimum',
  'maxLength',
  'minLength',
  'pattern',
  'maxItems',
  'minItems',
  'uniqueItems',
  'maxProperties',
  'minProperties',
  'required',
  'enum',
  'prefixItems',
  'contentMediaType',
  'contentEncoding',
  'nullable',
])

/** Whether a key belongs to a Schema Object as written: one of its own, or an extension. */
function isSchemaObjectKey(key: string) {
  return SCHEMA_OBJECT_KEYS.has(key) || key.startsWith('x-')
}

const TYPE_NAMES = new Set(['integer', 'number', 'string', 'boolean', 'object', 'null', 'array'])

function isTypeName(value: unknown) {
  return typeof value === 'string' && TYPE_NAMES.has(value)
}

/**
 * What each Schema Object key's value is: the type `.openapi()` and `param.schema` take for
 * it. A value of another type does not type-check once written (#419) — a `minimum` written
 * as text (`"'created_at' - 21 days"`, Revolut), a `discriminator` without its
 * `propertyName` — so it is left out, as a key the Schema Object has not is. `exclusiveMinimum`
 * and `exclusiveMaximum` are numbers in 3.1 and booleans in 3.0; `type` is a type name or a
 * list of them. A key absent here (`default`, `example`, `const`) takes any value.
 */
const SCHEMA_OBJECT_VALUE_TYPES: { readonly [key: string]: (value: unknown) => boolean } = {
  $ref: (v) => typeof v === 'string',
  discriminator: (v) => isRecord(v) && typeof v.propertyName === 'string',
  readOnly: (v) => typeof v === 'boolean',
  writeOnly: (v) => typeof v === 'boolean',
  deprecated: (v) => typeof v === 'boolean',
  uniqueItems: (v) => typeof v === 'boolean',
  nullable: (v) => typeof v === 'boolean',
  xml: isRecord,
  externalDocs: (v) => isRecord(v) && typeof v.url === 'string',
  type: (v) => isTypeName(v) || (Array.isArray(v) && v.length > 0 && v.every(isTypeName)),
  format: (v) => typeof v === 'string',
  description: (v) => typeof v === 'string',
  title: (v) => typeof v === 'string',
  pattern: (v) => typeof v === 'string',
  contentMediaType: (v) => typeof v === 'string',
  contentEncoding: (v) => typeof v === 'string',
  multipleOf: (v) => typeof v === 'number',
  maximum: (v) => typeof v === 'number',
  minimum: (v) => typeof v === 'number',
  exclusiveMaximum: (v) => typeof v === 'number' || typeof v === 'boolean',
  exclusiveMinimum: (v) => typeof v === 'number' || typeof v === 'boolean',
  maxLength: (v) => typeof v === 'number',
  minLength: (v) => typeof v === 'number',
  maxItems: (v) => typeof v === 'number',
  minItems: (v) => typeof v === 'number',
  maxProperties: (v) => typeof v === 'number',
  minProperties: (v) => typeof v === 'number',
  required: Array.isArray,
  enum: Array.isArray,
  allOf: Array.isArray,
  oneOf: Array.isArray,
  anyOf: Array.isArray,
  prefixItems: Array.isArray,
  // `items` as a boolean or a tuple, and `not` as a boolean, are JSON Schema shapes the
  // Schema Object has not.
  items: isRecord,
  not: isRecord,
  propertyNames: isRecord,
  additionalProperties: (v) => typeof v === 'boolean' || isRecord(v),
  properties: isRecord,
}

/** Whether a Schema Object key's value has the type the key takes. */
function hasSchemaObjectValueType(key: string, value: unknown) {
  const check = SCHEMA_OBJECT_VALUE_TYPES[key]
  return check === undefined || check(value)
}

// The keys whose value is a schema, a list of schemas or a map of schemas: what is pruned
// is pruned under them too.
const SCHEMA_VALUED_KEYS = new Set(['items', 'not', 'additionalProperties', 'propertyNames'])
const SCHEMA_LIST_KEYS = new Set(['allOf', 'oneOf', 'anyOf', 'prefixItems'])
const SCHEMA_MAP_KEYS = new Set(['properties'])

/**
 * A schema as a Schema Object for the document: only the keys a Schema Object has, each
 * with a value of the type it takes, at every level. A `required` member YAML read as a
 * literal (`null`, `true`) is a string; a 3.0-style `examples` map is its values. The output
 * is what `.openapi()` is handed, so nothing in it may fail to type-check.
 */
export function pruneSchemaObject(schema: unknown): unknown {
  if (!isRecord(schema)) return schema
  const pruned: { [k: string]: unknown } = {}
  for (const [key, value] of Object.entries(schema)) {
    if (value === undefined || !isSchemaObjectKey(key)) continue
    if (!hasSchemaObjectValueType(key, value)) continue
    if (key === 'required' && Array.isArray(value)) {
      pruned[key] = value.map((v) => (typeof v === 'string' ? v : String(v)))
      continue
    }
    if (key === 'examples') {
      const list = examplesList(value)
      if (list !== undefined) pruned[key] = list
      continue
    }
    // A Discriminator Object has `propertyName` and a `mapping` of names to references,
    // and takes no extension (`x-default`, OpenSearch).
    if (key === 'discriminator' && isRecord(value)) {
      const mapping = isRecord(value.mapping)
        ? Object.entries(value.mapping).filter(([, v]) => typeof v === 'string')
        : undefined
      pruned[key] = {
        propertyName: value.propertyName,
        ...(mapping === undefined ? {} : { mapping: Object.fromEntries(mapping) }),
      }
      continue
    }
    if (SCHEMA_VALUED_KEYS.has(key)) {
      pruned[key] = pruneSchemaObject(value)
      continue
    }
    if (SCHEMA_LIST_KEYS.has(key) && Array.isArray(value)) {
      pruned[key] = value.map(pruneSchemaObject)
      continue
    }
    if (SCHEMA_MAP_KEYS.has(key) && isRecord(value)) {
      pruned[key] = Object.fromEntries(
        Object.entries(value).map(([name, sub]) => [name, pruneSchemaObject(sub)]),
      )
      continue
    }
    pruned[key] = value
  }
  return pruned
}

/**
 * `examples` as the Schema Object has it, a list of values: a list is taken as it is, and a
 * map of Example Objects (the 3.0 shape of a Header or Parameter Object, #398) is reduced to
 * the values its entries carry. A map whose entries carry none (`externalValue`, `$ref`) has
 * nothing the schema can state: `undefined`.
 */
export function examplesList(examples: unknown): readonly unknown[] | undefined {
  if (Array.isArray(examples)) return Array.from(examples, (example: unknown) => example)
  if (!isRecord(examples)) return undefined
  const values = Object.values(examples).flatMap((example) =>
    isRecord(example) && 'value' in example && example.value !== undefined ? [example.value] : [],
  )
  return values.length > 0 ? values : undefined
}

// Drop-list: keys already expressed in the zod method chain.
const zodExpressedProps = new Set([
  'type',
  'format',
  'default',
  'minLength',
  'maxLength',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'pattern',
  'enum',
  'items',
  'minItems',
  'maxItems',
  'properties',
  'additionalProperties',
  'oneOf',
  'anyOf',
  'allOf',
  'not',
  'multipleOf',
  'uniqueItems',
  'minProperties',
  'maxProperties',
  'patternProperties',
  'propertyNames',
  'dependentRequired',
  'nullable',
  'const',
  '$ref',
  'prefixItems',
  'x-error-message',
  'x-length-message',
  'x-pattern-message',
  'x-minimum-message',
  'x-maximum-message',
  'x-multipleOf-message',
  'x-dependentRequired-message',
  'x-propertyNames-message',
  'x-allOf-message',
  'x-anyOf-message',
  'x-oneOf-message',
  'x-not-message',
  'x-required-message',
  'x-additionalProperties-message',
  'x-uniqueItems-message',
  'x-const-message',
  'x-enum-message',
  'x-dependentSchemas-message',
  'x-minLength-message',
  'x-maxLength-message',
  'x-contentMediaType-message',
  'x-minItems-message',
  'x-maxItems-message',
  'x-minProperties-message',
  'x-maxProperties-message',
  'x-patternProperties-message',
  'x-contains-message',
  'x-exclusiveMinimum-message',
  'x-exclusiveMaximum-message',
  'x-minContains-message',
  'x-maxContains-message',
  '$comment',
  'contains',
  'minContains',
  'maxContains',
  // full JSON Schema 2020-12 coverage
  'contentEncoding',
  'contentMediaType',
  'contentSchema',
  'dependentSchemas',
  'if',
  'then',
  'else',
  'unevaluatedProperties',
  'unevaluatedItems',
  'x-enum-error-messages',
  'x-brand',
  'x-trim',
  'x-toLowerCase',
  'x-toUpperCase',
  'x-normalize',
  'x-coerce',
  'x-stringbool',
  'x-lowercase',
  'x-uppercase',
  'x-emailPattern',
  'x-emailRegex',
  'x-uuidVersion',
  'x-urlHostname',
  'x-urlProtocol',
  'x-urlNormalize',
  'x-isoPrecision',
  'x-isoOffset',
  'x-isoLocal',
  'x-macDelimiter',
  'x-jwtAlg',
  'x-hashAlg',
  'x-hashEnc',
  'x-catch',
  'x-prefault',
  'x-readonly',
  'x-includes',
  'x-startsWith',
  'x-endsWith',
  'x-refine',
  'x-superRefine',
  'x-codec',
  'x-preprocess',
  'x-transform',
  'x-pipe',
  'x-properties-message',
  'x-prefixItems-message',
  'x-items-message',
  'x-unevaluatedProperties-message',
  'x-unevaluatedItems-message',
  'x-if-message',
  'x-then-message',
  'x-else-message',
])

// What `wrap` puts around a schema, as opposed to what the schema validates.
const decorationProps = new Set([
  'default',
  'nullable',
  'x-prefault',
  'x-catch',
  'x-readonly',
  'x-refine',
  'x-superRefine',
  'x-brand',
  'x-codec',
  'x-preprocess',
  'x-transform',
  'x-pipe',
])

/**
 * A schema reduced to what it validates: no default, no metadata, nothing `wrap` would add
 * around it. It is what a schema emitted inside another one is made from — a branch of a
 * type list, the base of a `not` — so that the decoration is written once, outside.
 */
export function undecorated(schema: Schema) {
  return Object.entries(schema).reduce<Schema>(
    (kept, [key, value]) =>
      zodExpressedProps.has(key) && !decorationProps.has(key)
        ? Object.assign(kept, { [key]: value })
        : kept,
    {},
  )
}

/** The keys of a Parameter Object (OpenAPI 3.1 §4.8.12); a document may carry others. */
const PARAMETER_KEYS = new Set([
  'name',
  'in',
  'description',
  'required',
  'deprecated',
  'allowEmptyValue',
  'style',
  'explode',
  'allowReserved',
  'schema',
  'content',
  'example',
  'examples',
])

function makeSerializedParam(param: Parameter) {
  // Skip keys whose value is `undefined` so the emitted object never contains a
  // bare `undefined`. Only what a Parameter Object has, and `x-` extensions, is written: a
  // Swagger 2.0 leftover beside `schema` (`enum`, `type`) would make `.openapi({param})`
  // miss `ParameterObject` and fail to type-check (#371).
  const entries = Object.entries(param)
    .filter(
      ([key, value]) => value !== undefined && (PARAMETER_KEYS.has(key) || key.startsWith('x-')),
    )
    .map(([key, value]) => {
      if (key === 'examples' && isExamplesInput(value)) {
        return `"examples":${makeExamples(value)}`
      }
      if (key === 'schema') {
        return `"schema":${JSON.stringify(pruneSchemaObject(value))}`
      }
      if (key === 'content' && isRecord(value)) {
        const media = Object.entries(value).map(([mediaType, mediaObj]) => {
          if (!isRecord(mediaObj)) {
            return `${JSON.stringify(mediaType)}:${JSON.stringify(mediaObj)}`
          }
          const { examples: mediaExamples, ...mediaRest } = mediaObj
          // `JSON.stringify(undefined)` yields the value `undefined`, which would be
          // interpolated into the emitted code as the literal text `undefined`.
          const restEntries = Object.entries(mediaRest)
            .filter(([, v]) => v !== undefined)
            .map(
              ([k, v]) =>
                `${JSON.stringify(k)}:${JSON.stringify(k === 'schema' ? pruneSchemaObject(v) : v)}`,
            )
          const examplesEntry = isExamplesInput(mediaExamples)
            ? `"examples":${makeExamples(mediaExamples)}`
            : undefined
          const mediaEntries = examplesEntry ? [...restEntries, examplesEntry] : restEntries
          return `${JSON.stringify(mediaType)}:{${mediaEntries.join(',')}}`
        })
        return `"content":{${media.join(',')}}`
      }
      return `${JSON.stringify(key)}:${JSON.stringify(value)}`
    })
  return `{${entries.join(',')}}`
}

/**
 * The default as a value of its schema, or that it is not one. A string that spells a
 * boolean (`'true'`) or a number (`'10'`) for a schema of that type is read as the value
 * (YAML and query strings arrive as text); a number for a string is written as text. An
 * enum or const takes only what it lists; an array takes an array whose every item
 * conforms; an object keeps the keys its `properties` declare, each conforming, and has
 * every `required` one (#387). A reference is read as the component it names when
 * `schemas` has it; a schema with no type of its own otherwise (a `oneOf`) is not checked.
 */
export function conformDefault(
  schema: Schema,
  value: unknown,
  schemas?: { readonly [k: string]: Schema },
  // The references already being read: a cycle through a component ends at the reference,
  // as written.
  reading: ReadonlySet<string> = new Set(),
): { readonly ok: true; readonly value: unknown } | { readonly ok: false } {
  if (value === undefined) return { ok: false }
  if (value === null) return { ok: true, value }
  if (schema.$ref !== undefined) {
    const target = reading.has(schema.$ref) ? undefined : resolveSchemaRef(schema.$ref, schemas)
    if (target === undefined) return { ok: true, value }
    const { $ref: _ref, default: _default, ...beside } = schema
    return conformDefault(
      { ...target, ...beside },
      value,
      schemas,
      new Set([...reading, schema.$ref]),
    )
  }
  // The members of an `allOf` all have to take the value, each reading what the one before
  // handed on; what is written beside them is read last. A `default` beside
  // `allOf: [{ $ref }]` is thereby read against the component (#394).
  if (schema.allOf !== undefined && schema.allOf.length > 0) {
    const { allOf, default: _default, ...beside } = schema
    return [...allOf, beside].reduce<ReturnType<typeof conformDefault>>(
      (read, member) => (read.ok ? conformDefault(member, read.value, schemas, reading) : read),
      { ok: true, value },
    )
  }
  // A value one branch of a `oneOf` / `anyOf` takes is a value of the union, whatever is
  // written beside the branches (`type: string` beside a boolean branch, #396): the branch
  // that takes it as it is comes first, then the first that reads it. A value no branch takes
  // is read by what is written beside them, when that says what the value is; otherwise it
  // is not a value of the union (`'create_time,id'` for an enum or a list of it, Elasticsearch).
  const branches = schema.oneOf ?? schema.anyOf
  if (branches !== undefined && branches.length > 0) {
    const read = branches.map((branch) => conformDefault(branch, value, schemas, reading))
    const taken =
      read.find((result) => result.ok && result.value === value) ?? read.find((result) => result.ok)
    if (taken !== undefined) return taken
    const { oneOf: _oneOf, anyOf: _anyOf, default: _default, ...beside } = schema
    const isTyped =
      beside.type !== undefined ||
      beside.enum !== undefined ||
      beside.const !== undefined ||
      beside.allOf !== undefined
    return isTyped ? conformDefault(beside, value, schemas, reading) : { ok: false }
  }
  if (schema.enum !== undefined) {
    return schema.enum.some((member) => member === value) ? { ok: true, value } : { ok: false }
  }
  if (schema.const !== undefined) {
    return JSON.stringify(schema.const) === JSON.stringify(value)
      ? { ok: true, value }
      : { ok: false }
  }
  const types = (Array.isArray(schema.type) ? schema.type : [schema.type]).filter(
    (t) => t !== undefined && t !== 'null',
  )
  if (types.length === 0) return { ok: true, value }
  const read = (type: Type): { readonly ok: true; readonly value: unknown } | undefined => {
    if (type === 'boolean') {
      if (typeof value === 'boolean') return { ok: true, value }
      if (value === 'true' || value === 'false') return { ok: true, value: value === 'true' }
      return undefined
    }
    if (type === 'number' || type === 'integer') {
      const number =
        typeof value === 'number'
          ? value
          : typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))
            ? Number(value)
            : undefined
      if (number === undefined) return undefined
      if (type === 'integer' && !Number.isInteger(number)) return undefined
      return { ok: true, value: number }
    }
    if (type === 'string') {
      // `z.file()` hands out a File: no text is a value of it (#413).
      if (isBinaryFile(schema)) return undefined
      if (typeof value === 'string') return { ok: true, value }
      if (typeof value === 'number' || typeof value === 'boolean') {
        return { ok: true, value: String(value) }
      }
      return undefined
    }
    if (type === 'array') {
      if (!Array.isArray(value)) return undefined
      const items = schema.items
      if (items === undefined || typeof items === 'boolean' || isSchemaArray(items)) {
        return { ok: true, value }
      }
      const readItems = value.map((item) => conformDefault(items, item, schemas, reading))
      return readItems.every((item) => item.ok)
        ? { ok: true, value: readItems.map((item) => (item.ok ? item.value : undefined)) }
        : undefined
    }
    if (type === 'object') {
      if (!isRecord(value)) return undefined
      const properties = schema.properties
      // `z.looseObject()` and `.catchall()` take any key; `z.object()` strips the keys the
      // schema does not declare, and `z.strictObject()` rejects them, so neither output type
      // has such a key: a default that carries one does not type-check (#387). The keys the
      // schema declares are kept, as values of their properties, and a required key has to
      // be among them.
      if (
        properties === undefined ||
        schema.additionalProperties === true ||
        typeof schema.additionalProperties === 'object'
      ) {
        return { ok: true, value }
      }
      const required = Array.isArray(schema.required) ? schema.required : []
      if (required.some((key) => !Object.hasOwn(value, String(key)))) return undefined
      const members = Object.entries(value).flatMap(([key, item]) => {
        const property = properties[key]
        return property === undefined
          ? []
          : [[key, conformDefault(property, item, schemas, reading)] as const]
      })
      return members.every(([, item]) => item.ok)
        ? {
            ok: true,
            value: Object.fromEntries(
              members.map(([key, item]) => [key, item.ok ? item.value : undefined]),
            ),
          }
        : undefined
    }
    // `date`, or a type the generator does not know: taken as written.
    return { ok: true, value }
  }
  // The type the value already is comes first, so `['string', 'boolean']` keeps `'true'`.
  const asIs = types.find((type) => typeOf(value) === type)
  return (
    (asIs === undefined ? undefined : read(asIs)) ??
    types.map(read).find((result) => result !== undefined) ?? { ok: false }
  )
}

function typeOf(value: unknown) {
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number'
  if (typeof value === 'string') return 'string'
  if (Array.isArray(value)) return 'array'
  if (isRecord(value)) return 'object'
  return undefined
}

export function wrap(
  zod: string,
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
  },
  options?: {
    /** Triggers `.exactOptional()`; do not pass from external callers. @internal */
    isOptional?: boolean
    /** What reads the value from the wire, put directly around `zod`. @internal */
    around?: (zod: string) => string
    /** `zod` is the identifier of a component schema and nothing else. @internal */
    component?: boolean
    /** What reads the value before its serialisation is undone, outermost first. @internal */
    readers?: readonly string[]
    /** An empty value is read as an absent one (`allowEmptyValue: true`). @internal */
    emptyAbsent?: boolean
    /** What the request object inherits is read as an absent value. @internal */
    inheritedAbsent?: boolean
    /** The text `null` is read as the value, before or after it is read as text. @internal */
    nullRead?: 'first' | 'last'
    /** The component schemas, which a default on a reference is read against. @internal */
    schemas?: { readonly [k: string]: Schema }
  },
) {
  const typeList = Array.isArray(schema.type)
    ? schema.type
    : schema.type !== undefined
      ? [schema.type]
      : []
  const formatLiteral = (v: unknown): string => {
    // JSON.stringify(undefined) returns the string "undefined" — emit the
    // JS token explicitly so `.prefault(undefined)` reads unambiguously.
    if (v === undefined) {
      return 'undefined'
    }
    if (typeof v === 'boolean') {
      return `${v}`
    }
    if (typeof v === 'number') {
      // Only an integer of a 64-bit format is emitted as a bigint (`z.int64()`); a
      // `type: number` with `format: int64` is `z.number()`, and takes a number (#412).
      if (typeList.includes('integer')) {
        if (schema.format === 'int64' || schema.format === 'uint64') {
          return `${v}n`
        }
        if (schema.format === 'bigint') {
          return `BigInt(${v})`
        }
      }
      return `${v}`
    }
    if (schema.type === 'date' && typeof v === 'string') {
      return `new Date(${JSON.stringify(v)})`
    }
    // YAML `default: 'true'` on a boolean schema: `.default()` takes the output type, so
    // the text has to become the boolean it names.
    if (typeList.includes('boolean') && (v === 'true' || v === 'false')) {
      return v
    }
    return JSON.stringify(v)
  }
  // `.exactOptional()` fails the `safeParse(undefined)` probe @hono/zod-openapi derives
  // `required` from, so an optional parameter or header states `required: false` itself
  // (the spec default for everything but a path parameter).
  const parameter =
    meta?.parameters && meta.parameters.required === undefined && meta.parameters.in !== 'path'
      ? { ...meta.parameters, required: false }
      : meta?.parameters
  // Only `style: form` + `explode: true` (`?ids=1&ids=2`) reaches the handler as an array,
  // and even then a one-element array arrives as a bare string. Every other serialisation
  // is one piece of text to split, and a `label` or `matrix` path segment carries a prefix.
  // The wrapper sits directly on the schema, inside `.default()` and the rest of the chain:
  // an absent parameter has to reach `.default()` as `undefined`.
  const style =
    parameter === undefined ? undefined : wireStyle(parameter, typeList.includes('array'))
  const readers = [...(options?.readers ?? []), ...(style === undefined ? [] : [style])]
  const acceptBothArities = (inner: string) =>
    readers.reduceRight((read, reader) => `z.preprocess(${reader},${read})`, inner)
  // A default that is not a value of its schema (`default: type` beside `enum: [name]`,
  // `['true']` for an array of booleans) is written only where it reads as one: a string
  // that spells a boolean or a number is read as that value, and what cannot be read is
  // left to the document (`.openapi({default})`) rather than written as `.default()`, which
  // would not type-check.
  const conformed = conformDefault(schema, schema.default, options?.schemas)
  const defaultValue = conformed.ok ? conformed.value : undefined
  const droppedDefault = schema.default !== undefined && !conformed.ok
  // A schema that declares `null` nowhere but in `default: null` (a `oneOf`, a reference, a
  // string) still has to accept it: `.default(null)` on a non-nullable schema does not
  // type-check, and the default makes `null` a value the schema answers with.
  const isNullable = schema.nullable === true || typeList.includes('null') || defaultValue === null
  // `.nullable()` must precede `.default()` so `.default(null)` validates.
  const build = (core: string) => {
    const typed = isNullable ? `${acceptBothArities(core)}.nullable()` : acceptBothArities(core)
    // `null` is read outside whatever takes it: `.nullable()`, or a branch of the schema.
    // A schema that takes strings is asked about the text first.
    const n =
      options?.nullRead === 'first'
        ? `z.preprocess(${WIRE_NULL},${typed})`
        : options?.nullRead === 'last'
          ? `((schema)=>z.union([schema,z.preprocess(${WIRE_NULL},schema)]))(${typed})`
          : typed
    // `!== undefined` (not truthy): `default: 0` is valid.
    const d = defaultValue !== undefined ? `${n}.default(${formatLiteral(defaultValue)})` : n
    const pf =
      schema['x-prefault'] !== undefined
        ? `${d}.prefault(${formatLiteral(schema['x-prefault'])})`
        : d
    const c =
      schema['x-catch'] !== undefined ? `${pf}.catch(${formatLiteral(schema['x-catch'])})` : pf
    const fr = schema['x-readonly'] === true ? `${c}.readonly()` : c
    const refineChain = `${fr}${schema['x-refine'] ?? ''}`
    const superRefineChain = `${refineChain}${schema['x-superRefine'] ?? ''}`
    // Precedence (outermost wins): x-preprocess > x-transform > x-pipe > x-codec.
    const preprocess = schema['x-preprocess']
    const transform = schema['x-transform']
    const pipe = schema['x-pipe']
    const codec = schema['x-codec']
    // A user-supplied chain replaces the generated one wholesale, so the arity wrapper goes
    // around it instead.
    const userChain = preprocess ?? transform ?? pipe ?? codec
    const replaced = userChain === undefined ? superRefineChain : acceptBothArities(userChain)
    return schema['x-brand'] ? `${replaced}.brand<"${schema['x-brand']}">()` : replaced
  }
  const around = options?.around ?? ((core: string) => core)
  // An empty value that stands for an absent one is read as `undefined` before anything
  // else sees it — outside `.default()`, which only applies to a value that is missing, and
  // around `.optional()`, without which a missing value is rejected. The default is stated
  // again outside: a parameter that is not sent at all never reaches the one inside.
  // A parameter named like something every object inherits is read the same way: what the
  // request object answers with when the parameter was not sent stands for an absent value.
  const absent = (chain: string) => {
    const absentReaders = [
      ...(options?.inheritedAbsent === true ? [WIRE_INHERITED] : []),
      ...(options?.emptyAbsent === true ? [WIRE_EMPTY] : []),
    ]
    if (absentReaders.length === 0) return chain
    const read = (inner: string) =>
      absentReaders.reduceRight((inside, reader) => `z.preprocess(${reader},${inside})`, inner)
    if (defaultValue !== undefined) {
      return `${read(chain)}.default(${formatLiteral(defaultValue)})`
    }
    const isRequired =
      parameter === undefined ? options?.isOptional !== true : parameter.required === true
    return read(`${chain}${isRequired ? '' : '.optional()'}`)
  }
  const z = absent(build(around(zod)))
  // Drop schema-level keys that header meta already emits (avoids duplicates
  // at the top of `.openapi({...})`). Parameters serialize under `param:{...}`
  // and don't need this.
  const headerDupKeys = new Set<string>(
    meta?.headers
      ? Object.entries(meta.headers)
          .filter(([, v]) => v !== undefined)
          .map(([k]) => k)
      : [],
  )
  // A bigint has no place in a document: the schema derived from `z.int64()` is a string
  // of digits, which drops the bounds, and a bigint default cannot be serialised at all —
  // serving the document throws. What the source declares is a JSON integer, so its own
  // keywords are what the document states. A parameter states its schema already.
  const isBigintInteger =
    meta?.parameters === undefined &&
    typeList.includes('integer') &&
    (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint') &&
    hasNoUserChain(schema)
  // `z.file()` (OpenAPI `format: binary`) is opaque to @hono/zod-openapi's
  // schema derivation: emitting it without an explicit `type`/`format` makes
  // `getOpenAPIDocument()` throw `UnknownZodTypeError`. `type`/`format` are
  // dropped as `zodExpressedProps` above, so re-surface them in `.openapi()`
  // for the binary-file case only (other formats are derived from the chain).
  const isFile = isBinaryFile(schema)
  // What the chain does not express and the Schema Object has: an unknown keyword stays
  // out of `.openapi()`, as does `$defs` (#377, #393).
  const baseArgs = Object.fromEntries([
    ...Object.entries(schema).filter(
      ([k, v]) =>
        isSchemaObjectKey(k) &&
        !(
          zodExpressedProps.has(k) ||
          (k === 'required' && typeof v === 'boolean') ||
          headerDupKeys.has(k)
        ),
    ),
    // A default that `.default()` could not take still belongs to the document, as does a
    // pattern that no JavaScript regex literal can stand for (#370) or that describes the
    // text of a file (#413). An int64 states its default below, once (#403).
    ...(droppedDefault && !isBigintInteger ? [['default', schema.default] as const] : []),
    ...(typeof schema.pattern === 'string' && (isFile || regexLiteral(schema.pattern) === undefined)
      ? [['pattern', schema.pattern] as const]
      : []),
  ])
  const args = pruneSchemaObject(baseArgs)
  // What a response header says about itself that is also schema metadata. `style`,
  // `explode` and `allowReserved` describe its serialisation and `content` its media type:
  // they belong to the Header Object in the document, not to `.openapi()`, which has no
  // such keys (#376). `param: {required: false}` stays: `.exactOptional()` fails the
  // `safeParse(undefined)` probe the document derives `required` from, so an optional
  // header has to say so itself.
  const headerMetaProps = meta?.headers
    ? [
        meta.headers.description
          ? `description:${JSON.stringify(meta.headers.description)}`
          : undefined,
        meta.headers.deprecated
          ? `deprecated:${JSON.stringify(meta.headers.deprecated)}`
          : undefined,
        meta.headers.example ? `example:${JSON.stringify(meta.headers.example)}` : undefined,
        // A Header Object's `examples` is a map of Example Objects; the schema's is a list
        // of values (#398).
        ...(() => {
          const list = examplesList(meta.headers.examples)
          return list === undefined ? [] : [`examples:${JSON.stringify(list)}`]
        })(),
      ].filter((v) => v !== undefined)
    : []
  const openapiSchema = args ? JSON.stringify(args) : undefined
  // Strip outer braces so the body embeds directly in `.openapi({...})`.
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema
  // What `.min()`, `.max()` and `.mime()` check is stated too, since the document derives
  // none of it from a `z.file()`: the size as `minLength` and `maxLength`, the MIME types as
  // an `anyOf` of `contentMediaType` members, the way `z.toJSONSchema()` writes a list of
  // them. `contentMediaType` and `contentEncoding` at the top would not type-check: the
  // argument of `.openapi()` has the keys the 3.0 and 3.1 Schema Objects share, and those two
  // are 3.1's alone (`contentEncoding: binary` says what `format: binary` says anyway).
  const fileMimes = isFile ? fileMimeTypes(schema) : undefined
  const fileMetaProps = isFile
    ? [
        isNullable ? 'type:["string","null"]' : 'type:"string"',
        'format:"binary"',
        ...(typeof schema.minLength === 'number' ? [`minLength:${schema.minLength}`] : []),
        ...(typeof schema.maxLength === 'number' ? [`maxLength:${schema.maxLength}`] : []),
        ...(fileMimes === undefined
          ? []
          : [
              `anyOf:${JSON.stringify(fileMimes.map((contentMediaType) => ({ contentMediaType })))}`,
            ]),
      ]
    : []
  // A `time` that may carry an offset is emitted as a string matched against a pattern,
  // which the document would describe as a pattern alone. What the source declares is a
  // `time`, so the format is stated beside it.
  const isOffsetTime =
    schema.format === 'time' &&
    schema['x-isoOffset'] !== false &&
    typeList.includes('string') &&
    schema.contentEncoding === undefined &&
    schema.contentMediaType === undefined &&
    schema.contentSchema === undefined &&
    hasNoUserChain(schema)
  const timeMetaProps = isOffsetTime ? ['format:"time"'] : []
  const bigintMetaProps = isBigintInteger
    ? [
        isNullable ? 'type:["integer","null"]' : 'type:"integer"',
        `format:${JSON.stringify(schema.format)}`,
        ...(
          [
            'minimum',
            'maximum',
            'exclusiveMinimum',
            'exclusiveMaximum',
            'multipleOf',
            'default',
            'enum',
          ] as const
        ).flatMap((key) =>
          schema[key] === undefined ? [] : [`${key}:${JSON.stringify(schema[key])}`],
        ),
        // `const` is typed by what the schema hands out, a bigint, which no document can
        // hold. An enum of one member says the same.
        ...(schema.const === undefined || schema.enum !== undefined
          ? []
          : [`enum:${JSON.stringify([schema.const])}`]),
      ]
    : []
  // `.openapi()` on a wrapper — `.exactOptional()`, the `z.preprocess` that reads the wire —
  // hides the component inside it: the document then names the component in the
  // parameter's `$ref` and never defines it. On the component itself the metadata keeps
  // the definition in the document. Whatever else decorates the schema (`.nullable()`,
  // `.default()`, a refinement) would be written into that definition, so a decorated
  // reference keeps its metadata outside.
  const isDecorated =
    isNullable ||
    schema.default !== undefined ||
    schema['x-prefault'] !== undefined ||
    schema['x-catch'] !== undefined ||
    schema['x-readonly'] === true ||
    schema['x-refine'] !== undefined ||
    schema['x-superRefine'] !== undefined ||
    schema['x-brand'] !== undefined ||
    schema['x-preprocess'] !== undefined ||
    schema['x-transform'] !== undefined ||
    schema['x-pipe'] !== undefined ||
    schema['x-codec'] !== undefined
  if (options?.component === true && parameter !== undefined && !isDecorated) {
    const inside = absent(
      build(around(`${zod}.openapi({param:${makeSerializedParam(parameter)}})`)),
    )
    return parameter.required === true ? inside : `${inside}.exactOptional()`
  }
  const result = [
    parameter ? `param:${makeSerializedParam(parameter)}` : undefined,
    ...headerMetaProps,
    meta?.headers && meta.headers.required !== true ? 'param:{required:false}' : undefined,
    ...fileMetaProps,
    ...timeMetaProps,
    ...bigintMetaProps,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)
  // https://github.com/OAI/OpenAPI-Specification/issues/2385
  if (meta?.parameters || meta?.headers) {
    if (meta?.parameters?.required === true || meta?.headers?.required === true) {
      return result.length === 0 ? z : `${z}.openapi({${result.join(',')}})`
    }
    return result.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${result.join(',')}})`
  }
  if (options?.isOptional === true) {
    return result.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${result.join(',')}})`
  }
  return result.length === 0 ? z : `${z}.openapi({${result.join(',')}})`
}
