import { COMPONENT_REF_PREFIX, HTTP_METHODS, IDENTIFIER_PATTERN } from '../constants/index.js'
import type {
  Callbacks,
  Header,
  Media,
  OpenAPIPaths,
  Operation,
  Parameter,
  PathItem,
  Reference,
  RequestBody,
  Responses,
  Schema,
} from '../openapi/index.js'

export function isRecord(v: unknown): v is { readonly [k: string]: unknown } {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function isHttpMethod(method: string): method is (typeof HTTP_METHODS)[number] {
  return HTTP_METHODS.some((candidate) => candidate === method)
}

export function isValidIdent(str: string) {
  return IDENTIFIER_PATTERN.test(str)
}

export function isOpenAPIPaths(v: unknown): v is OpenAPIPaths {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return Object.values(v).every(
    (entry) => typeof entry === 'object' && entry !== null && !Array.isArray(entry),
  )
}

export function isRefObject(v: unknown): v is { readonly $ref: string } {
  return (
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    '$ref' in v &&
    typeof v.$ref === 'string'
  )
}

export function isStringRef(v: object): v is { readonly $ref: string } {
  return '$ref' in v && typeof v.$ref === 'string'
}

// A branch that is nothing but a `$ref` can be emitted as the bare identifier;
// any sibling keyword means the reference has to be wrapped instead.
export function isRefOnly(s: Schema) {
  return s.$ref !== undefined && Object.keys(s).length === 1
}

/**
 * OpenAPI 3.2 §4.25: `discriminator` "MUST NOT change the validation outcome of the
 * schema". A branch can therefore be routed by key only when the key alone already
 * decides it: a bare object head that requires the discriminating property and pins it
 * to string literals. Zod reads that key off `_zod.propValues`, which only a plain
 * `z.object(...)` carries — an intersection, a union, a record, `.nullable()` and
 * `.default()` all report nothing — so every other shape fails closed.
 */
export function isDiscriminableBranch(branch: Schema, discriminator: string) {
  if (branch.allOf || branch.anyOf || branch.oneOf || branch.not) return false
  if (branch.type !== 'object' || typeof branch.additionalProperties === 'object') return false
  if (branch.nullable === true || branch.default !== undefined) return false
  if (!(Array.isArray(branch.required) && branch.required.includes(discriminator))) return false
  const property = branch.properties?.[discriminator]
  if (property === undefined || typeof property === 'boolean') return false
  if (typeof property.const === 'string') return true
  return (
    Array.isArray(property.enum) &&
    property.enum.length > 0 &&
    property.enum.every((v) => typeof v === 'string')
  )
}

/**
 * The branches of a discriminated `oneOf`, resolved, when `z.discriminatedUnion` stands for
 * it; `undefined` when the `oneOf` is emitted as `z.xor`. The two are equivalent only when
 * every branch is a plain object that `required`s the discriminator and pins it to string
 * literals (see `isDiscriminableBranch`), and no two branches share a literal.
 */
// A malformed percent-encoding in a `$ref` is kept as written rather than thrown on.
function decodePercentRef(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function discriminatedBranches(
  schema: Schema,
  schemas?: { readonly [k: string]: Schema },
): readonly { readonly branch: Schema; readonly name: string | undefined }[] | undefined {
  const discriminator = schema.discriminator?.propertyName
  if (discriminator === undefined || schema.oneOf === undefined || schema.oneOf.length < 2) {
    return undefined
  }
  const resolved = schema.oneOf.map((s) => {
    if (s.$ref === undefined) return { branch: s, name: undefined }
    if (!(isRefOnly(s) && s.$ref.startsWith(COMPONENT_REF_PREFIX.schemas))) return undefined
    const name = decodePercentRef(s.$ref.slice(COMPONENT_REF_PREFIX.schemas.length))
    const branch = schemas?.[name]
    return branch === undefined ? undefined : { branch, name }
  })
  const literalsPerBranch = resolved.map((entry) => {
    if (entry === undefined || !isDiscriminableBranch(entry.branch, discriminator)) return undefined
    const property = entry.branch.properties?.[discriminator]
    if (property === undefined || typeof property === 'boolean') return undefined
    return typeof property.const === 'string' ? [property.const] : (property.enum ?? [])
  })
  const literals = literalsPerBranch.flatMap((values) => values ?? [])
  const isDiscriminated =
    literalsPerBranch.every((values) => values !== undefined) &&
    new Set(literals).size === literals.length
  return isDiscriminated ? resolved.filter((entry) => entry !== undefined) : undefined
}

export function isParameterRef(ref: string): ref is `#/components/parameters/${string}` {
  return ref.startsWith(COMPONENT_REF_PREFIX.parameters)
}

export function isPathItemRef(ref: string): ref is `#/components/pathItems/${string}` {
  return ref.startsWith(COMPONENT_REF_PREFIX.pathItems)
}

export function isParameterObject(v: unknown): v is {
  readonly name: string
  readonly in: 'path' | 'query' | 'header' | 'cookie'
  readonly required?: boolean
} {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  if (!('name' in v) || typeof v.name !== 'string') return false
  if (!('in' in v)) return false
  const pos = v.in
  return pos === 'path' || pos === 'query' || pos === 'header' || pos === 'cookie'
}

export function isParameter(v: unknown): v is Parameter {
  return (
    typeof v === 'object' &&
    v !== null &&
    'name' in v &&
    'in' in v &&
    ('schema' in v || 'content' in v)
  )
}

export function isParameterArray(v: unknown): v is readonly (Parameter | Reference)[] {
  return Array.isArray(v)
}

export function isOperationLike(v: unknown): v is {
  readonly summary?: string
  readonly description?: string
  readonly parameters?: unknown
  readonly requestBody?: unknown
  readonly responses?: unknown
  readonly 'x-pagination'?: boolean
} {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && 'responses' in v
}

export function isOperation(v: unknown): v is Operation {
  return typeof v === 'object' && v !== null && 'responses' in v
}

export function isOperationWithResponses(v: unknown): v is Operation & {
  readonly responses: {
    readonly [statusCode: string]: {
      readonly content?: { readonly [mediaType: string]: { readonly schema?: Schema } }
    }
  }
} {
  return (
    typeof v === 'object' &&
    v !== null &&
    'responses' in v &&
    typeof v.responses === 'object' &&
    v.responses !== null
  )
}

export function isSchemaProperty(v: unknown): v is { readonly schema?: unknown } {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && 'schema' in v
}

/**
 * JSON Schema 2020-12 §10.3.1.2: `items` may be a single schema, a tuple of
 * schemas, or a boolean schema. Narrows the union to the single-schema form.
 */
export function isSingleSchema(items: Schema | readonly Schema[] | boolean): items is Schema {
  return typeof items === 'object' && !Array.isArray(items)
}

export function isSchemaArray(
  v: Schema | readonly Schema[] | boolean | undefined,
): v is readonly Schema[] {
  return Array.isArray(v)
}

/**
 * JSON Schema 2020-12 §4.3.2 / §10.3.1.2 type guard for schema-vs-boolean
 * discrimination. `items`, `additionalProperties`, `unevaluatedItems`, and
 * `unevaluatedProperties` may be either an object schema or a boolean schema
 * (`true` = pass-through, `false` = reject). This narrows the union to the
 * object form so callers can recurse without `as` casts.
 */
export function isSchemaObject(v: Schema | readonly Schema[] | boolean | undefined): v is Schema {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function isMediaWithSchema(v: unknown): v is { readonly schema: Schema } {
  return typeof v === 'object' && v !== null && 'schema' in v
}

export function isMedia(v: unknown): v is Media {
  return isRecord(v) && 'schema' in v
}

export function isCallbacks(v: unknown): v is Callbacks {
  return typeof v === 'object' && v !== null && !('$ref' in v)
}

/**
 * Narrows a `paths` entry to a Path Item Object. Unlike `isPathItem` this keeps
 * `$ref` path items (OpenAPI 3.2 §4.8.9 allows `$ref` on a Path Item Object);
 * callers resolve them against `components.pathItems`.
 */
export function isPathItemEntry(v: unknown): v is PathItem {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function isPathItem(v: unknown): v is PathItem {
  return typeof v === 'object' && v !== null && !('$ref' in v)
}

export function isHeader(v: unknown): v is Header {
  return typeof v === 'object' && v !== null && !('$ref' in v)
}

export function isRequestBody(v: unknown): v is RequestBody {
  return (
    typeof v === 'object' && v !== null && ('content' in v || 'required' in v || 'description' in v)
  )
}

export function isContentBody(
  v: unknown,
): v is { readonly content?: { readonly [k: string]: { readonly schema?: Schema } } } {
  return typeof v === 'object' && v !== null && !('$ref' in v)
}

export function isSecurityScheme(v: unknown): v is {
  readonly type?: string
  readonly scheme?: string
  readonly name?: string
  readonly in?: string
} {
  return typeof v === 'object' && v !== null && !('$ref' in v)
}

export function isSecurityArray(
  v: unknown,
): v is readonly { readonly [k: string]: readonly string[] }[] {
  return Array.isArray(v)
}

export function isResponses(v: unknown): v is Responses {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return '$ref' in v || 'description' in v || 'content' in v || 'headers' in v || 'links' in v
}

// JSON Schema 2020-12 typeless keywords. Emit `z.unknown().superRefine(...)`
// with value-type-aware checks. Messages are slot-driven (x-<keyword>-message).
const TYPELESS_KEYWORDS: readonly (keyof Schema)[] = [
  'required',
  'properties',
  'additionalProperties',
  'patternProperties',
  'propertyNames',
  'minProperties',
  'maxProperties',
  'dependentRequired',
  'dependentSchemas',
  'unevaluatedProperties',
  'minItems',
  'maxItems',
  'uniqueItems',
  'items',
  'prefixItems',
  'contains',
  'minContains',
  'maxContains',
  'unevaluatedItems',
  'minLength',
  'maxLength',
  'pattern',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'multipleOf',
  'enum',
  'const',
  'allOf',
  'anyOf',
  'oneOf',
  'not',
  'if',
  'then',
  'else',
]

export function hasTypelessConstraint(schema: Schema) {
  return TYPELESS_KEYWORDS.some((k) => schema[k] !== undefined)
}

// The keywords that describe an object: what a schema with no `type` is read as an
// object by.
const OBJECT_KEYWORDS: ReadonlySet<keyof Schema> = new Set([
  'required',
  'properties',
  'additionalProperties',
  'patternProperties',
  'propertyNames',
  'minProperties',
  'maxProperties',
  'dependentRequired',
  'dependentSchemas',
  'unevaluatedProperties',
])

/**
 * Whether a schema with no `type` is an object in all but name: it declares `properties`
 * or `additionalProperties`, and no keyword of another kind (`minLength`, `items`). Such
 * a schema is emitted as `z.object()` rather than checked by hand on `z.unknown()`, which
 * is what the type writer already takes it for (#385).
 */
export function isUntypedObject(schema: Schema) {
  return (
    schema.type === undefined &&
    (schema.properties !== undefined || schema.additionalProperties !== undefined) &&
    TYPELESS_KEYWORDS.every((k) => schema[k] === undefined || OBJECT_KEYWORDS.has(k))
  )
}

/**
 * Whether a `time` takes an offset. `time` is an RFC 3339 full-time, `12:34:56Z` or
 * `12:34:56+09:00`, and `z.iso.time()` takes neither. `x-isoOffset: false` asks for that.
 */
export function isOffsetTime(schema: Schema) {
  return schema.format === 'time' && schema['x-isoOffset'] !== false
}

export function hasNumericConstraint(schema: Schema) {
  return (
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined
  )
}

export function hasNotProperty(v: unknown) {
  return typeof v === 'object' && v !== null && 'not' in v
}

export function isExamplesInput(v: unknown): v is {
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

// A user-supplied chain replaces the generated schema, and with it what the document
// derives from it.
export function hasNoUserChain(schema: Schema) {
  return (
    schema['x-preprocess'] === undefined &&
    schema['x-transform'] === undefined &&
    schema['x-pipe'] === undefined &&
    schema['x-codec'] === undefined
  )
}

export function hasRequestBodyContent(
  operation: unknown,
): operation is Operation & { requestBody: { content: { readonly [k: string]: unknown } } } {
  if (typeof operation !== 'object' || operation === null) return false
  if (!('requestBody' in operation)) return false
  if (typeof operation.requestBody !== 'object' || operation.requestBody === null) return false
  return 'content' in operation.requestBody
}

export function isInlineMedia(media: Media | Reference): media is Media {
  return !('$ref' in media)
}

export function hasNoContentResponse(operation: {
  readonly summary?: string
  readonly description?: string
  readonly parameters?: unknown
  readonly requestBody?: unknown
  readonly responses?: unknown
}) {
  const responses = operation.responses
  if (!isRecord(responses)) return false
  return Object.keys(responses).some((status) => {
    const code = Number.parseInt(status, 10)
    return !Number.isNaN(code) && [204, 205].includes(code)
  })
}

/** Whether a parameter is named like something every object inherits. */
export function isInheritedName(parameter: Parameter) {
  return parameter.in !== 'path' && parameter.name in Object.prototype
}
