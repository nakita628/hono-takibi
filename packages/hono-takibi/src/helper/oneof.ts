import { zod } from '../generator/zod/index.js'
import type { Schema } from '../openapi/types.js'
import { refName, union } from '../utils/index.js'
import { zodToOpenAPI } from './zod-to-openapi.js'

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
    const z = zod(subSchema)
    return subSchema.$ref ? `${refName(subSchema.$ref)}Schema` : zodToOpenAPI(z, subSchema)
  })

  return union(zodSchemas)
}
