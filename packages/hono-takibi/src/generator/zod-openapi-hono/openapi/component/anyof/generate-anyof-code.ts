import type { Schema } from '../../../../../types/index.js'
import type { Config } from '../../../../../config/index.js'
import { getRefSchemaName } from '../../../../../core/schema/references/get-ref-schema-name.js'
import { generateZodUnion } from '../../../../zod/generate-zod-union.js'
import { generateZod } from '../../../../zod/generate-zod.js'

/**
 * Generates the Zod code for an `anyOf` schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @param { Config } config - The configuration object.
 * @returns { string } The generated Zod code as a string.
 */
export function generateAnyOfCode(schema: Schema, config: Config): string {
  if (!schema.anyOf || schema.anyOf.length === 0) {
    console.warn('not exists anyOf')
    return 'z.any()'
  }

  const zodSchemas = schema.anyOf.map((subSchema) => {
    subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZod(config, subSchema)
    return generateZod(config, subSchema)
  })

  return generateZodUnion(zodSchemas)
}
