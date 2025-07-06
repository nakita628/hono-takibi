import type { Schema } from '../../openapi/types.js'

// Allow `type` to be single value or non‑empty array
export function pickTypes(t: Schema['type']): readonly string[] {
  return t === undefined ? [] : Array.isArray(t) ? t : [t]
}
