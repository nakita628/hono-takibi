import type { Schema } from '../../../../../openapi/index.js'
import { union } from '../../../../zod/z/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

/**
 * Converts an OpenAPI `oneOf` schema to a Zod union expression.
 *
 * @param schema - The OpenAPI schema containing a `oneOf` definition.
 * @returns A Zod `z.union()` expression as a string. If `oneOf` is empty or missing, returns `'z.any()'`.
 *
 * @remarks
 * - Resolves `$ref` schemas and inline schemas uniformly.
 * - Falls back to `z.any()` if `oneOf` is not defined or empty.
 */
export function oneOf(schema: Schema): string {
  if (!schema.oneOf || schema.oneOf.length === 0) {
    console.warn('not exists oneOf')
    return 'z.any()'
  }

  const zodSchemas = schema.oneOf.map((subSchema) => {
    subSchema.$ref ? `${subSchema.$ref}Schema` : zodToOpenAPI(subSchema)
    return zodToOpenAPI(subSchema)
  })

  return union(zodSchemas)
}
