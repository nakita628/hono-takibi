import type { Schema } from '../../../../../types/index.js'
import type { Config } from '../../../../../config/index.js'
import { getRefSchemaName } from '../../../../../core/schema/references/get-ref-schema-name.js'
import { union } from '../../../../zod/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

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
    subSchema.$ref ? getRefSchemaName(subSchema, config) : zodToOpenAPI(config, subSchema)
    return zodToOpenAPI(config, subSchema)
  })

  return union(zodSchemas)
}
