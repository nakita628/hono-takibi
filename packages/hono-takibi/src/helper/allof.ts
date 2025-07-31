import { zod } from '../generator/zod/index.js'
import type { Schema } from '../openapi/index.js'
import { refName } from '../utils/index.js'

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
      const isNullable =
        typeof subSchema === 'object' &&
        subSchema !== null &&
        'nullable' in subSchema &&
        subSchema.nullable === true &&
        Object.keys(subSchema).length === 1
      if (isNullable) {
        acc.nullable = true
        return acc
      }
      const z = subSchema.$ref ? `${refName(subSchema.$ref)}Schema` : zod(subSchema)
      acc.schemas.push(z)
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
  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) && schema.type.includes('null')) ||
    schema.type === 'null'
  const z = `z.intersection(${schemas.join(',')})${nullable ? '.nullable()' : ''}`
  if (isNullable) {
    return `${z}.nullable()`
  }
  return z
}
