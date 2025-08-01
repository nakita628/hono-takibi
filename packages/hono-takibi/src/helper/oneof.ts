import zod from '../generator/zod/index.js'
import type { Schema } from '../openapi/index.js'
import { wrap } from './wrap.js'

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
    const z = 'z.any()'
    return wrap(z, schema)
  }
  // self-reference not call wrap
  const schemas = schema.oneOf.map((schema) => {
    return zod(schema)
  })
  // discriminatedUnion Support hesitant
  // This is because using intersection causes a type error.
  // const discriminator = schema.discriminator?.propertyName
  // const z = discriminator
  //   ? `z.discriminatedUnion('${discriminator}',[${schemas.join(',')}])`
  //   : `z.union([${schemas.join(',')}])`
  const z = `z.union([${schemas.join(',')}])`
  return wrap(z, schema)
}
