import type { Schema } from "../openapi/index.js";

/**
 * Normalizes a `type` field to a string array.
 *
 * Accepts a string or an array of strings and always returns an array.
 *
 * @param t - The `type` field from a schema.
 * @returns A normalized array of type strings.
 *
 * @example
 * ```ts
 * pickTypes('string')
 * // → ['string']
 *
 * pickTypes(['string', 'null'])
 * // → ['string', 'null']
 *
 * pickTypes(undefined)
 * // → []
 * ```
 */
export function pickTypes(t: Schema['type']): readonly string[] {
  return t === undefined ? [] : Array.isArray(t) ? t : [t]
}
