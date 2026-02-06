/**
 * Type guard utilities.
 *
 * This module consolidates type guards used throughout the codebase.
 * Each guard is self-contained and does not delegate to other guards.
 *
 * @module guard
 */
import type {
  Media,
  OpenAPIPaths,
  Operation,
  Parameter,
  Reference,
  RequestBody,
  Schema,
} from '../openapi/index.js'

/* ─────────────────────────────── Base Guards ─────────────────────────────── */

/**
 * Checks if a value is a non-null, non-array object (record-like).
 */
export function isRecord(value: unknown): value is { readonly [k: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Checks if a string is a valid HTTP method.
 */
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

/**
 * Check if a string is a valid JavaScript identifier.
 */
export function isValidIdent(s: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)
}

/* ─────────────────────────────── OpenAPI Guards ─────────────────────────────── */

/**
 * Type guard for OpenAPI paths object.
 */
export function isOpenAPIPaths(v: unknown): v is OpenAPIPaths {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return Object.values(v).every(
    (entry) => typeof entry === 'object' && entry !== null && !Array.isArray(entry),
  )
}

/**
 * Type guard for $ref objects.
 */
export function isRefObject(v: unknown): v is { readonly $ref: string } {
  return (
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    '$ref' in v &&
    typeof v.$ref === 'string'
  )
}

/**
 * Type guard for objects with a string $ref property.
 */
export function isStringRef(p: object): p is { readonly $ref: string } {
  return '$ref' in p && typeof p.$ref === 'string'
}

/* ─────────────────────────────── Parameter Guards ─────────────────────────────── */

/**
 * Type guard for parameter objects (lightweight, unknown input).
 */
export function isParameterObject(
  v: unknown,
): v is {
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

/**
 * Type guard for parameter arrays.
 */
export function isParameterArray(
  params: unknown,
): params is readonly Parameter[] | readonly Reference[] {
  return Array.isArray(params)
}

/* ─────────────────────────────── Operation Guards ─────────────────────────────── */

/**
 * Type guard for operation-like objects (lightweight, checks responses key).
 */
export function isOperationLike(v: unknown): v is {
  readonly summary?: string
  readonly description?: string
  readonly parameters?: unknown
  readonly requestBody?: unknown
  readonly responses?: unknown
} {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && 'responses' in v
}

/**
 * Type guard for OpenAPI Operation objects.
 */
export function isOperation(op: unknown): op is Operation {
  return typeof op === 'object' && op !== null && 'responses' in op
}

/**
 * Type guard for Operation with typed responses.
 */
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

/* ─────────────────────────────── Schema Guards ─────────────────────────────── */

/**
 * Type guard for objects with a schema property.
 */
export function isSchemaProperty(v: unknown): v is { readonly schema?: unknown } {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && 'schema' in v
}

/**
 * Type guard for schema arrays (tuple-style items).
 */
export function isSchemaArray(items: Schema | readonly Schema[]): items is readonly Schema[] {
  return Array.isArray(items)
}

/**
 * Type guard for objects with a typed schema property.
 */
export function isMediaWithSchema(m: unknown): m is { readonly schema: Schema } {
  return typeof m === 'object' && m !== null && 'schema' in m
}

/**
 * Type guard for Media objects (vs Reference).
 */
export function isMedia(value: Media | Reference): value is Media {
  return typeof value === 'object' && value !== null && 'schema' in value
}

/* ─────────────────────────────── RequestBody / Response Guards ─────────────────────────────── */

/**
 * Type guard for OpenAPI RequestBody objects.
 */
export function isRequestBody(rb: unknown): rb is RequestBody {
  return (
    typeof rb === 'object' &&
    rb !== null &&
    ('content' in rb || 'required' in rb || 'description' in rb)
  )
}

/**
 * Type guard for RequestBody or Reference objects.
 */
export function isRequestBodyOrRef(
  v: unknown,
): v is { readonly content?: unknown; readonly required?: boolean } | { readonly $ref: string } {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false
  return '$ref' in v || 'content' in v
}

/**
 * Type guard for request body with content (not a $ref).
 */
export function isContentBody(
  body: unknown,
): body is { readonly content?: { readonly [k: string]: { readonly schema?: Schema } } } {
  return typeof body === 'object' && body !== null && !('$ref' in body)
}

/* ─────────────────────────────── Security Guards ─────────────────────────────── */

/**
 * Type guard for security scheme objects (not a $ref).
 */
export function isSecurityScheme(
  value: unknown,
): value is {
  readonly type?: string
  readonly scheme?: string
  readonly name?: string
  readonly in?: string
} {
  return typeof value === 'object' && value !== null && !('$ref' in value)
}

/**
 * Type guard for security requirement arrays.
 */
export function isSecurityArray(
  security: unknown,
): security is readonly { readonly [k: string]: readonly string[] }[] {
  return Array.isArray(security)
}
