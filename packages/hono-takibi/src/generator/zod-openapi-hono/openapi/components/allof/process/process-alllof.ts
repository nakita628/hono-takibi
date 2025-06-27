import type { Schema } from '../../../../../../openapi/index.js'
import { isNullableSchema } from '../../../../../../core/validator/index.js'
import { generateZodSchemaFromSubSchema } from '../../../../../zod/sub/generate-zod-schema-from-sub-schema.js'

type Accumulator = {
  nullable: boolean
  schemas: string[]
}

/**
 * Processes the `allOf` array, separating the `nullable` flag and the array of schemas.
 * @param { Schema[] } allOf - The `allOf` array.
 * @returns { Accumulator } An object containing the `nullable` flag and the generated array of schemas.
 */
export function processAllOf(allOf: Schema[]): Accumulator {
  return allOf.reduce<Accumulator>(
    (acc, subSchema) => {
      if (isNullableSchema(subSchema)) {
        acc.nullable = true
        return acc
      }
      const zodSchema = generateZodSchemaFromSubSchema(subSchema)
      acc.schemas.push(zodSchema)
      return acc
    },
    { nullable: false, schemas: [] },
  )
}
