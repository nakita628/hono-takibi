import type { Schema } from '../openapi/index.js'

export function normalizeTypes(t: Schema['type']) {
  return t === undefined ? [] : Array.isArray(t) ? t : [t]
}
