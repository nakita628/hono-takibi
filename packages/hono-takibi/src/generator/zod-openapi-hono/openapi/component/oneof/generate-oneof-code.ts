import type { Schema } from '../../../../../type'
import type { Config } from '../../../../../config'
import { getRefSchemaName } from '../../../../../core/schema/references/get-ref-schema-name'
import { generateZodUnion } from '../../../../zod/generate-zod-union'
import { generateZod } from '../../../../zod/generate-zod'

/**
 * Generates the Zod code for a `oneOf` schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @param { Config } config - The configuration object.
 * @returns { string } The generated Zod code as a string.
 */
export function generateOneOfCode(schema: Schema, config: Config): string {
  if (!schema.oneOf || schema.oneOf.length === 0) {
    console.warn('not exists oneOf')
    return 'z.any()'
  }

  const zodSchemas = schema.oneOf.map((subSchema) => {
    subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZod(config, subSchema)
    return generateZod(config, subSchema)
  })

  return generateZodUnion(zodSchemas)
}
