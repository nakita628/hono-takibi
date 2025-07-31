import { zod } from '../generator/zod/index.js'
import type { Schema } from '../openapi/index.js'
import { refName } from '../utils/index.js'
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
    return schema.nullable ? 'z.any().nullable()' : 'z.any()'
  }
  const schemas = schema.oneOf.map((sub) => {
    if (sub.$ref) return `${refName(sub.$ref)}Schema`
    const z = zod(sub)
    return zodToOpenAPI(z, sub)
  })
  const discriminator = schema.discriminator?.propertyName
  const z = discriminator
    ? `z.discriminatedUnion('${discriminator}',[${schemas.join(',')}])`
    : `z.union([${schemas.join(',')}])`
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  if (isNullable) {
    return `${z}.nullable()`
  }
  return z
}
