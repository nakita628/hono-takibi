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
    return 'z.any()'
  }
  const schemas = schema.anyOf.map((subSchema) => {
    const z = zod(subSchema)
    return zodToOpenAPI(z, subSchema)
  })
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')
  const z = `z.union([${schemas.join(',')}])`
  if (isNullable) {
    return `${z}.nullable()`
  }
  return z
}
