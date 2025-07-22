import { isNullableSchema } from '../../../../../../core/validator/index.js'
import type { Schema } from '../../../../../../openapi/index.js'
import { zodSchemaFromSubSchema } from '../../../../../zod/sub/index.js'

/**
 * Processes an OpenAPI `allOf` array by extracting nullable status and converting subschemas to Zod schemas.
 *
 * @param allOf - The array of OpenAPI schemas from the `allOf` field.
 * @returns An object with:
 * - `nullable`: Whether any of the subschemas is marked as nullable.
 * - `schemas`: An array of Zod schema strings generated from each subschema.
 *
 * @remarks
 * - Uses `isNullableSchema` to detect if any subschema is nullable.
 * - Converts each subschema using `zodSchemaFromSubSchema`.
 * - Ignores subschemas that are nullable-only (i.e., do not contain a structural schema).
 */
export function processAllOf(allOf: Schema[]): {
  nullable: boolean
  schemas: string[]
} {
  return allOf.reduce<{
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
}
