/**
 * Type guard utilities.
 *
 * This module consolidates type guards used throughout the codebase.
 *
 * @module guard
 */
import type { OpenAPIPaths, Schema } from '../openapi/index.js'

/* ─────────────────────────────── Base Guards ─────────────────────────────── */

/**
 * Checks if a value is a non-null object (record-like).
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
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

/* ─────────────────────────────── OpenAPI Guards ─────────────────────────────── */

/**
 * Type guard for OpenAPI paths object.
 */
export function isOpenAPIPaths(v: unknown): v is OpenAPIPaths {
  if (!isRecord(v)) return false
  for (const k in v) {
    if (!isRecord(v[k])) return false
  }
  return true
}

/**
 * Type guard for $ref objects.
 */
export function isRefObject(v: unknown): v is { $ref: string } {
  return isRecord(v) && typeof v.$ref === 'string'
}

/**
 * Type guard for parameter objects.
 */
export function isParameterObject(
  v: unknown,
): v is { name: string; in: 'path' | 'query' | 'header' | 'cookie'; required?: boolean } {
  if (!isRecord(v)) return false
  if (typeof v.name !== 'string') return false
  const pos = v.in
  return pos === 'path' || pos === 'query' || pos === 'header' || pos === 'cookie'
}

/**
 * Type guard for operation objects.
 */
export function isOperationLike(v: unknown): v is {
  summary?: string
  description?: string
  parameters?: unknown
  requestBody?: unknown
  responses?: unknown
} {
  return isRecord(v) && 'responses' in v
}

/**
 * Type guard for objects with schema property.
 */
export function hasSchemaProp(v: unknown): v is { schema?: unknown } {
  return isRecord(v) && 'schema' in v
}

/**
 * Type guard for schema arrays (tuple-style items).
 */
export function isSchemaArray(items: Schema | readonly Schema[]): items is readonly Schema[] {
  return Array.isArray(items)
}

/**
 * Check if a string is a valid JavaScript identifier.
 */
export function isValidIdent(s: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)
}

/**
 * Type guard for RequestBody or Reference objects.
 */
export function isRequestBodyOrRef(
  v: unknown,
): v is { content?: unknown; required?: boolean } | { $ref: string } {
  if (!isRecord(v)) return false
  return '$ref' in v || 'content' in v
}

/**
 * Type guard for responses object (status code -> response mapping).
 */
export function isResponsesObject(v: unknown): v is Record<string, unknown> {
  return isRecord(v)
}

/**
 * Type guard for callbacks object.
 */
export function isCallbacksObject(v: unknown): v is Record<string, unknown> {
  return isRecord(v)
}
