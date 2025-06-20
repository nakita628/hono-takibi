import type { Schema } from '../../../../../../openapi/index.js'
import { isNullableSchema } from '../../../../../../core/validator/is-nullable-schema.js'
import { generateZodSchemaFromSubSchema } from '../../../../../zod/sub/generate-zod-schema-from-sub-schema.js'

type Accumulator = {
  nullable: boolean
  schemas: string[]
}

/**
 * Processes the `allOf` array, separating the `nullable` flag and the array of schemas.
 * @param { Schema[] } allOf - The `allOf` array.
 * @param { Config } config - The configuration object.
 * @returns { Accumulator } An object containing the `nullable` flag and the generated array of schemas.
 */
export function processAllOf(
  allOf: Schema[],
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): Accumulator {
  return allOf.reduce<Accumulator>(
    (acc, subSchema) => {
      if (isNullableSchema(subSchema)) {
        acc.nullable = true
        return acc
      }
      const zodSchema = generateZodSchemaFromSubSchema(subSchema, schemaNameCase, typeNameCase)
      acc.schemas.push(zodSchema)
      return acc
    },
    { nullable: false, schemas: [] },
  )
}
