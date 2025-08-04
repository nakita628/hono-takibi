import { zodToOpenAPI } from '../generator/zod/helper/zod-to-openapi.js'
import type { Schema } from '../openapi/index.js'

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
    return 'z.any()'
  }
  // self-reference not call wrap
  const schemas = schema.anyOf.map((subSchema) => {
    // return zod(subSchema)
    return zodToOpenAPI(subSchema)
  })
  return `z.union([${schemas.join(',')}])`
}
