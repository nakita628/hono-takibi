import { zod } from '../generator/zod/index.js'
import type { Schema } from '../openapi/index.js'
import { zodToOpenAPI } from './zod-to-openapi.js'

/**
 * Converts an OpenAPI `anyOf` schema into a Zod union expression.
 *
 * @param schema - The OpenAPI schema object that may contain an `anyOf` property.
 * @returns A string representing the corresponding Zod schema.
 *
 * @remarks
 * - If `schema.anyOf` is not defined or empty, returns `z.any()` as a fallback.
 * - If `schema.anyOf` is present, each sub-schema is converted to Zod,
 *   and all are combined using a `z.union(...)`.
 * - `$ref` references are resolved and handled appropriately.
 */
export function anyOf(schema: Schema): string {
  if (!schema.anyOf || schema.anyOf.length === 0) {
    console.warn('not exists anyOf')
    return 'z.any()'
  }
  const schemas = schema.anyOf.map((subSchema) => {
    const z = zod(subSchema)
    return zodToOpenAPI(z, subSchema)
  })
  return `z.union([${schemas.join(',')}])`
}
