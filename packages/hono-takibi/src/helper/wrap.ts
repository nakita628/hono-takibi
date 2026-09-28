import { isRecord } from '../guard/index.js'
import type { Header, Parameter, Schema } from '../openapi/index.js'
// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { makeExamples } from './openapi.js'
import { WIRE_EMPTY, WIRE_INHERITED, WIRE_NULL, wireStyle } from './wire.js'

function hasNotProperty(v: unknown): v is { not: unknown } {
  return typeof v === 'object' && v !== null && 'not' in v
}
function isExamplesInput(v: unknown): v is {
  readonly [k: string]:
    | {
        readonly summary?: string
        readonly description?: string
        readonly defaultValue?: unknown
        readonly serializedValue?: string
        readonly externalValue?: string
        readonly value?: unknown
      }
    | {
        readonly $ref?:
          | `#/components/schemas/${string}`
          | `#/components/parameters/${string}`
          | `#/components/securitySchemes/${string}`
          | `#/components/requestBodies/${string}`
          | `#/components/responses/${string}`
          | `#/components/headers/${string}`
          | `#/components/examples/${string}`
          | `#/components/links/${string}`
          | `#/components/callbacks/${string}`
          | `#/components/pathItems/${string}`
          | `#/components/mediaTypes/${string}`
        readonly summary?: string
        readonly description?: string
      }
} {
  return (
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    Object.values(v).every(
      (entry) => typeof entry === 'object' && entry !== null && !Array.isArray(entry),
    )
  )
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
export function undecorated(schema: Schema): Schema {
  return Object.entries(schema).reduce<Schema>(
    (kept, [key, value]) =>
      zodExpressedProps.has(key) && !decorationProps.has(key)
        ? Object.assign(kept, { [key]: value })
        : kept,
    {},
  )
}

// A user-supplied chain replaces the generated schema, and with it what the document
// derives from it.
function hasNoUserChain(schema: Schema) {
  return (
    schema['x-preprocess'] === undefined &&
    schema['x-transform'] === undefined &&
    schema['x-pipe'] === undefined &&
    schema['x-codec'] === undefined
  )
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
  },
) {
  // JSON Schema 2020-12: pre-2019-09 legacy keys + non-standard underscore variants.
  const unsupportedProps = new Set([
    '$recursiveRef',
    '$recursiveAnchor',
    'optional',
    'min_items',
    'max_items',
  ])
  const filterUnsupportedProps = (obj: unknown): unknown => {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map(filterUnsupportedProps)
    }
    const filtered: { [k: string]: unknown } = {}
    for (const [key, value] of Object.entries(obj)) {
      if (unsupportedProps.has(key)) {
        continue
      }
      // OpenAPI expects SchemaObject | ReferenceObject for items
      if (key === 'items' && (typeof value === 'boolean' || Array.isArray(value))) {
        continue
      }
      if (key === 'not' && hasNotProperty(value) && typeof value.not === 'boolean') {
        continue
      }
      // YAML may parse null/true/false as literals in `required`; coerce to string
      if (key === 'required' && Array.isArray(value)) {
        filtered[key] = value.map((v) => (typeof v === 'string' ? v : String(v)))
        continue
      }
      filtered[key] = filterUnsupportedProps(value)
    }
    return filtered
  }

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
      if (schema.format === 'int64' || schema.format === 'uint64') {
        return `${v}n`
      }
      if (schema.format === 'bigint') {
        return `BigInt(${v})`
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
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
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
    const d = schema.default !== undefined ? `${n}.default(${formatLiteral(schema.default)})` : n
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
    if (schema.default !== undefined) {
      return `${read(chain)}.default(${formatLiteral(schema.default)})`
    }
    return read(`${chain}${parameter?.required === true ? '' : '.optional()'}`)
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
  const baseArgs = Object.fromEntries(
    Object.entries(schema).filter(
      ([k, v]) =>
        !(
          zodExpressedProps.has(k) ||
          (k === 'required' && typeof v === 'boolean') ||
          headerDupKeys.has(k)
        ),
    ),
  )
  const args = filterUnsupportedProps(baseArgs)
  const headerMetaProps = meta?.headers
    ? [
        meta.headers.description
          ? `description:${JSON.stringify(meta.headers.description)}`
          : undefined,
        meta.headers.deprecated
          ? `deprecated:${JSON.stringify(meta.headers.deprecated)}`
          : undefined,
        meta.headers.example ? `example:${JSON.stringify(meta.headers.example)}` : undefined,
        meta.headers.examples ? `examples:${makeExamples(meta.headers.examples)}` : undefined,
        meta.headers.style ? `style:${JSON.stringify(meta.headers.style)}` : undefined,
        meta.headers.explode ? `explode:${JSON.stringify(meta.headers.explode)}` : undefined,
        meta.headers.allowReserved
          ? `allowReserved:${JSON.stringify(meta.headers.allowReserved)}`
          : undefined,
        meta.headers.content ? `content:${JSON.stringify(meta.headers.content)}` : undefined,
      ].filter((v) => v !== undefined)
    : []
  const openapiSchema = args ? JSON.stringify(args) : undefined
  // Strip outer braces so the body embeds directly in `.openapi({...})`.
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema
  const serializeMedia = (mediaObj: unknown): string => {
    if (!isRecord(mediaObj)) return JSON.stringify(mediaObj)
    const { examples: mediaExamples, ...mediaRest } = mediaObj
    // `JSON.stringify(undefined)` yields the value `undefined`, which would be
    // interpolated into the emitted code as the literal text `undefined`.
    const restEntries = Object.entries(mediaRest)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`)
    const examplesEntry = isExamplesInput(mediaExamples)
      ? `"examples":${makeExamples(mediaExamples)}`
      : undefined
    const entries = examplesEntry ? [...restEntries, examplesEntry] : restEntries
    return `{${entries.join(',')}}`
  }
  const serializeContent = (content: { readonly [k: string]: unknown }): string => {
    const entries = Object.entries(content).map(
      ([mediaType, mediaObj]) => `${JSON.stringify(mediaType)}:${serializeMedia(mediaObj)}`,
    )
    return `{${entries.join(',')}}`
  }
  const serializeParam = (param: Parameter): string => {
    // Same guard as `serializeMedia`: skip keys whose value is `undefined` so the
    // emitted object never contains a bare `undefined`.
    const entries = Object.entries(param)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        if (key === 'examples' && isExamplesInput(value)) {
          return `"examples":${makeExamples(value)}`
        }
        if (key === 'content' && isRecord(value)) {
          return `"content":${serializeContent(value)}`
        }
        return `${JSON.stringify(key)}:${JSON.stringify(value)}`
      })
    return `{${entries.join(',')}}`
  }
  // `z.file()` (OpenAPI `format: binary`) is opaque to @hono/zod-openapi's
  // schema derivation: emitting it without an explicit `type`/`format` makes
  // `getOpenAPIDocument()` throw `UnknownZodTypeError`. `type`/`format` are
  // dropped as `zodExpressedProps` above, so re-surface them in `.openapi()`
  // for the binary-file case only (other formats are derived from the chain).
  const isBinaryFile =
    schema.format === 'binary' &&
    typeList.includes('string') &&
    schema.contentEncoding === undefined &&
    schema.contentMediaType === undefined &&
    schema.contentSchema === undefined &&
    schema['x-codec'] === undefined
  const fileMetaProps = isBinaryFile
    ? [isNullable ? 'type:["string","null"]' : 'type:"string"', 'format:"binary"']
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
  // A bigint has no place in a document: the schema derived from `z.int64()` is a string
  // of digits, which drops the bounds, and a bigint default cannot be serialised at all —
  // serving the document throws. What the source declares is a JSON integer, so its own
  // keywords are what the document states. A parameter states its schema already.
  const isBigintInteger =
    meta?.parameters === undefined &&
    typeList.includes('integer') &&
    (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint') &&
    hasNoUserChain(schema)
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
    const inside = absent(build(around(`${zod}.openapi({param:${serializeParam(parameter)}})`)))
    return parameter.required === true ? inside : `${inside}.exactOptional()`
  }
  const result = [
    parameter ? `param:${serializeParam(parameter)}` : undefined,
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
