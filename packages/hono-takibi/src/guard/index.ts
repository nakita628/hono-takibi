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

export function isHttpMethod(
  method: string,
): method is 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace' {
  return (
    method === 'get' ||
    method === 'put' ||
    method === 'post' ||
    method === 'delete' ||
    method === 'patch' ||
    method === 'options' ||
    method === 'head' ||
    method === 'trace'
  )
}

export function isValidIdent(str: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str)
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

export function isParameterRef(ref: string): ref is `#/components/parameters/${string}` {
  return ref.startsWith('#/components/parameters/')
}

export function isPathItemRef(ref: string): ref is `#/components/pathItems/${string}` {
  return ref.startsWith('#/components/pathItems/')
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

export function isRequestBodyOrRef(
  v: unknown,
): v is { readonly content?: unknown; readonly required?: boolean } | { readonly $ref: string } {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return '$ref' in v || 'content' in v
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

export function isOAuthFlowValue(v: unknown): v is {
  readonly authorizationUrl?: string
  readonly tokenUrl?: string
  readonly scopes?: { readonly [k: string]: string }
} {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return 'authorizationUrl' in v || 'tokenUrl' in v || 'scopes' in v
}
