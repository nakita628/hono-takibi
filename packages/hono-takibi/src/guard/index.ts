import type {
  Media,
  OpenAPIPaths,
  Operation,
  Parameter,
  Reference,
  RequestBody,
  Responses,
  Schema,
} from '../openapi/index.js'

export function isRecord(value: unknown): value is { readonly [k: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
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

export function isValidIdent(s: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)
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

export function isStringRef(p: object): p is { readonly $ref: string } {
  return '$ref' in p && typeof p.$ref === 'string'
}

/**
 * Type guard for parameter objects (lightweight, unknown input).
 */
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

/**
 * Type guard for OpenAPI Parameter objects.
 */
export function isParameter(p: unknown): p is Parameter {
  return (
    typeof p === 'object' &&
    p !== null &&
    'name' in p &&
    'in' in p &&
    ('schema' in p || 'content' in p)
  )
}

export function isParameterArray(
  params: unknown,
): params is readonly Parameter[] | readonly Reference[] {
  return Array.isArray(params)
}

export function isOperationLike(v: unknown): v is {
  readonly summary?: string
  readonly description?: string
  readonly parameters?: unknown
  readonly requestBody?: unknown
  readonly responses?: unknown
} {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && 'responses' in v
}

export function isOperation(op: unknown): op is Operation {
  return typeof op === 'object' && op !== null && 'responses' in op
}

export function isOperationWithResponses(value: unknown): value is Operation & {
  readonly responses: {
    readonly [statusCode: string]: {
      readonly content?: { readonly [mediaType: string]: { readonly schema?: Schema } }
    }
  }
} {
  return (
    typeof value === 'object' &&
    value !== null &&
    'responses' in value &&
    typeof value.responses === 'object' &&
    value.responses !== null
  )
}

export function isSchemaProperty(v: unknown): v is { readonly schema?: unknown } {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && 'schema' in v
}

export function isSchemaArray(items: Schema | readonly Schema[]): items is readonly Schema[] {
  return Array.isArray(items)
}

export function isMediaWithSchema(m: unknown): m is { readonly schema: Schema } {
  return typeof m === 'object' && m !== null && 'schema' in m
}

export function isMedia(value: Media | Reference): value is Media {
  return typeof value === 'object' && value !== null && 'schema' in value
}

export function isRequestBody(rb: unknown): rb is RequestBody {
  return (
    typeof rb === 'object' &&
    rb !== null &&
    ('content' in rb || 'required' in rb || 'description' in rb)
  )
}

export function isRequestBodyOrRef(
  v: unknown,
): v is { readonly content?: unknown; readonly required?: boolean } | { readonly $ref: string } {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return '$ref' in v || 'content' in v
}

export function isContentBody(
  body: unknown,
): body is { readonly content?: { readonly [k: string]: { readonly schema?: Schema } } } {
  return typeof body === 'object' && body !== null && !('$ref' in body)
}

export function isSecurityScheme(value: unknown): value is {
  readonly type?: string
  readonly scheme?: string
  readonly name?: string
  readonly in?: string
} {
  return typeof value === 'object' && value !== null && !('$ref' in value)
}

export function isSecurityArray(
  security: unknown,
): security is readonly { readonly [k: string]: readonly string[] }[] {
  return Array.isArray(security)
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
