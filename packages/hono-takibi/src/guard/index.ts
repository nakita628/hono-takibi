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

export function isParameterArray(v: unknown): v is readonly Parameter[] | readonly Reference[] {
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

export function isSchemaArray(v: Schema | readonly Schema[]): v is readonly Schema[] {
  return Array.isArray(v)
}

export function isMediaWithSchema(v: unknown): v is { readonly schema: Schema } {
  return typeof v === 'object' && v !== null && 'schema' in v
}

export function isMedia(v: Media | Reference): v is Media {
  return typeof v === 'object' && v !== null && 'schema' in v
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
