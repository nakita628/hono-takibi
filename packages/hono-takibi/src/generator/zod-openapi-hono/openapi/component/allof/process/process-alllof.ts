import type { Config } from '../../../../../../config'
import type { Schema } from '../../../../../../type'
import { isNullableSchema } from '../../../../../../core/validator/is-nullable-schema'
import { generateZodSchemaFromSubSchema } from '../../../../../zod/sub/generate-zod-schema-from-sub-schema'

type Accumulator = {
  nullable: boolean
  schemas: string[]
}

/**
 * Processes the `allOf` array, separating the `nullable` flag and the array of schemas.
 *
 * @function processAllOf
 * @param allOf - The `allOf` array.
 * @param config - The configuration object.
 * @returns An object containing the `nullable` flag and the generated array of schemas.
 */
export function processAllOf(allOf: Schema[], config: Config): Accumulator {
  return allOf.reduce<Accumulator>(
    (acc, subSchema) => {
      if (isNullableSchema(subSchema)) {
        acc.nullable = true
        return acc
      }
      const zodSchema = generateZodSchemaFromSubSchema(subSchema, config)
      acc.schemas.push(zodSchema)
      return acc
    },
    { nullable: false, schemas: [] },
  )
}
