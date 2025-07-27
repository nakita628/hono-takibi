import { zodSchemaFromSubSchema } from '../generator/zod/helper/zod-schema-from-sub-schema.js'
import type { Schema } from '../openapi/types.js'
import { intersection, isNullableSchema } from '../utils/index.js'

/**
 * Converts an OpenAPI `allOf` schema into a Zod intersection schema.
 *
 * @param schema - The OpenAPI schema object potentially containing an `allOf` composition.
 * @returns A string representing the generated Zod schema.
 *
 * @remarks
 * - If `schema.allOf` is missing or empty, returns `z.any()` or `z.any().nullable()` depending on nullability.
 * - If `allOf` contains a single schema, it is returned directly (with optional `.nullable()`).
 * - If multiple schemas exist, they are combined using `z.intersection(...)`.
 * - Nullability is determined by analyzing all constituent schemas.
 */
export function allOf(schema: Schema): string {
  if (!schema.allOf || schema.allOf.length === 0) {
    console.warn('not exists allOf')
    return 'z.any()'
  }
  const { nullable, schemas } = schema.allOf.reduce<{
    nullable: boolean
    schemas: string[]
  }>(
    (acc, subSchema) => {
      if (isNullableSchema(subSchema)) {
        acc.nullable = true
        return acc
      }
      const zodSchema = zodSchemaFromSubSchema(subSchema)
      acc.schemas.push(zodSchema)
      return acc
    },
    { nullable: false, schemas: [] },
  )
  if (schemas.length === 0) {
    return nullable ? 'z.any().nullable()' : 'z.any()'
  }
  if (schemas.length === 1) {
    return nullable ? `${schemas[0]}.nullable()` : schemas[0]
  }
  return `${intersection(schemas)}${nullable ? '.nullable()' : ''}`
}
