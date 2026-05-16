import { isRecord } from '../guard/index.js'
import type { Header, Parameter, Schema } from '../openapi/index.js'
import { makeExamples } from './openapi.js'

/**
 * Wraps a Zod schema string with `.default()`, `.nullable()`, and `.openapi({...})` as needed.
 *
 * @example
 * ```ts
 * wrap('z.string()', { default: 'hello', nullable: true })
 * // → 'z.string().default("hello").nullable()'
 * ```
 */
export function wrap(
  zod: string,
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
    isOptional?: boolean
  },
) {
  /* Properties truly not supported. JSON Schema 2020-12 Core meta
   * keywords ($schema/$id/$anchor/$dynamicAnchor/$dynamicRef/$vocabulary) now
   * pass through to .openapi({...}) for full spec coverage. Only legacy
   * pre-2019-09 keywords ($recursiveRef/$recursiveAnchor — replaced by
   * $dynamicRef/$dynamicAnchor in 2020-12) and non-standard underscore
   * variants remain dropped. */
  const unsupportedProps = new Set([
    '$recursiveRef',
    '$recursiveAnchor',
    'optional',
    'min_items',
    'max_items',
  ])
  /* Type guard for objects with 'not' property */
  const hasNotProperty = (v: unknown): v is { not: unknown } =>
    typeof v === 'object' && v !== null && 'not' in v
  /* Type guard for makeExamples parameter (record of non-array objects) */
  const isExamplesInput = (
    v: unknown,
  ): v is {
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
  } =>
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    Object.values(v).every(
      (entry) => typeof entry === 'object' && entry !== null && !Array.isArray(entry),
    )
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
      /* Filter out items if boolean or array (OpenAPI expects SchemaObject | ReferenceObject) */
      if (key === 'items' && (typeof value === 'boolean' || Array.isArray(value))) {
        continue
      }
      /* Filter out not.not (nested not with boolean) */
      if (key === 'not' && hasNotProperty(value) && typeof value.not === 'boolean') {
        continue
      }
      /* Convert non-string values in required array to strings (YAML may parse null/true/false as literals) */
      if (key === 'required' && Array.isArray(value)) {
        filtered[key] = value.map((v) => (typeof v === 'string' ? v : String(v)))
        continue
      }
      filtered[key] = filterUnsupportedProps(value)
    }
    return filtered
  }

  const formatLiteral = (v: unknown): string => {
    if (typeof v === 'boolean') {
      return `${v}`
    }
    if (typeof v === 'number') {
      if (schema.format === 'int64') {
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
    if (typeof v === 'string') {
      return JSON.stringify(v)
    }
    return JSON.stringify(v)
  }
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  /* Apply .nullable() before .default() so that .default(null) is valid on nullable types */
  const n = isNullable ? `${zod}.nullable()` : zod
  /* why schema.default !== undefined: because schema.default === 0 is falsy */
  const d = schema.default !== undefined ? `${n}.default(${formatLiteral(schema.default)})` : n
  /* P2: .prefault(value) applies a default value to the parse INPUT before
   * validation runs (different from .default which fills missing output). */
  const pf =
    schema['x-prefault'] !== undefined ? `${d}.prefault(${formatLiteral(schema['x-prefault'])})` : d
  /* P2: .catch(fallback) returns the fallback when validation fails. */
  const c =
    schema['x-catch'] !== undefined ? `${pf}.catch(${formatLiteral(schema['x-catch'])})` : pf
  /* P2: .readonly() applies Object.freeze() to the parsed output (distinct
   * from JSON Schema's readOnly which is a serialization hint). */
  const fr = schema['x-freeze'] === true ? `${c}.readonly()` : c
  /* Custom validation: append `.refine(...)` / `.superRefine(...)` chain
   * fragment strings verbatim. */
  const refineChain = `${fr}${schema['x-refine'] ?? ''}`
  const superRefineChain = `${refineChain}${schema['x-superRefine'] ?? ''}`
  /* x-preprocess / x-transform / x-pipe: each is a complete Zod expression
   * string and replaces the base schema verbatim (same convention as x-codec).
   * Mutual exclusion: only one replacing extension can take effect per schema.
   * Precedence: x-preprocess > x-transform > x-pipe (preprocess wraps outer). */
  const preprocess = schema['x-preprocess']
  const transform = schema['x-transform']
  const pipe = schema['x-pipe']
  const replaced = preprocess ?? transform ?? pipe ?? superRefineChain
  /* Apply .brand() for branded types */
  const z = schema['x-brand'] ? `${replaced}.brand<"${schema['x-brand']}">()` : replaced
  /* zod method chain already expressed properties (to prevent double management) */
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
    // x-enum-error-messages: kept in this drop-list (NOT in the Schema
    // type) so legacy YAML carrying the now-removed extension doesn't
    // leak into z.object().meta(...) emission as a stray option.
    'x-enum-error-messages',
    'x-brand',
    'x-trim',
    'x-toLowerCase',
    'x-toUpperCase',
    'x-normalize',
    'x-coerce',
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
    // x-finite / x-safe omitted (deprecated Zod APIs)
    'x-catch',
    'x-prefault',
    'x-freeze',
    'x-includes',
    'x-startsWith',
    'x-endsWith',
    'x-refine',
    'x-superRefine',
    'x-codec',
    'x-preprocess',
    'x-transform',
    'x-pipe',
    // previously-missing slots that leaked into the public OpenAPI doc
    // via @hono/zod-openapi's `.openapi({...})` emission. These are all
    // consumed by the generator (validator messages) and have no business
    // surfacing in the externally-visible schema.
    'x-properties-message',
    'x-prefixItems-message',
    'x-items-message',
    'x-unevaluatedProperties-message',
    'x-unevaluatedItems-message',
    'x-if-message',
    'x-then-message',
    'x-else-message',
  ])
  const baseArgs = Object.fromEntries(
    Object.entries(schema).filter(
      ([k, v]) => !(zodExpressedProps.has(k) || (k === 'required' && typeof v === 'boolean')),
    ),
  )
  const args = filterUnsupportedProps(baseArgs)
  const headerMetaProps = meta?.headers
    ? [
        meta.headers.description
          ? `description:${JSON.stringify(meta.headers.description)}`
          : undefined,
        // meta.headers.required ? `required:${JSON.stringify(meta.headers.required)}` : undefined,
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
        // meta.headers.schema
        //   ? `schema:${JSON.stringify(meta.headers.schema)}`
        //   : undefined,
        meta.headers.content ? `content:${JSON.stringify(meta.headers.content)}` : undefined,
      ].filter((v) => v !== undefined)
    : []
  const openapiSchema = args ? JSON.stringify(args) : undefined
  // Strip outer braces from JSON object to embed directly in openapi({...}) call
  // e.g. '{"description":"foo"}' → '"description":"foo"'
  // This allows seamless integration with other openapi props like param:...
  // If empty object '{}' becomes '', which is filtered out below
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema
  /**
   * Serializes a media object with examples handled as code references.
   */
  const serializeMedia = (mediaObj: unknown): string => {
    if (!isRecord(mediaObj)) return JSON.stringify(mediaObj)
    const { examples: mediaExamples, ...mediaRest } = mediaObj
    const restEntries = Object.entries(mediaRest).map(
      ([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`,
    )
    const examplesEntry = isExamplesInput(mediaExamples)
      ? `"examples":${makeExamples(mediaExamples)}`
      : undefined
    const entries = examplesEntry ? [...restEntries, examplesEntry] : restEntries
    return `{${entries.join(',')}}`
  }
  /* Serializes content object with examples handled as code references. */
  const serializeContent = (content: { readonly [k: string]: unknown }): string => {
    const entries = Object.entries(content).map(
      ([mediaType, mediaObj]) => `${JSON.stringify(mediaType)}:${serializeMedia(mediaObj)}`,
    )
    return `{${entries.join(',')}}`
  }
  /* Serializes parameter object with examples as code references (not JSON strings). */
  const serializeParam = (param: Parameter): string => {
    const entries = Object.entries(param).map(([key, value]) => {
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
  const result = [
    meta?.parameters ? `param:${serializeParam(meta.parameters)}` : undefined,
    ...headerMetaProps,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)
  /* https://github.com/OAI/OpenAPI-Specification/issues/2385 */
  if (meta?.parameters || meta?.headers) {
    if (meta?.parameters?.required === true || meta?.headers?.required === true) {
      return result.length === 0 ? z : `${z}.openapi({${result.join(',')}})`
    }
    return result.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${result.join(',')}})`
  }
  /* Handle optional object properties */
  if (meta?.isOptional === true) {
    return result.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${result.join(',')}})`
  }
  return result.length === 0 ? z : `${z}.openapi({${result.join(',')}})`
}
