import type { Schema } from '../../../../../openapi/index.js'
import { getRefSchemaName } from '../../../../../core/schema/references/index.js'
import { union } from '../../../../zod/z/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

/**
 * Generates the Zod code for an `anyOf` schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @returns { string } The generated Zod code as a string.
 */
export function anyOf(schema: Schema): string {
  if (!schema.anyOf || schema.anyOf.length === 0) {
    console.warn('not exists anyOf')
    return 'z.any()'
  }

  const zodSchemas = schema.anyOf.map((subSchema) => {
    subSchema.$ref ? getRefSchemaName(subSchema) : zodToOpenAPI(subSchema)
    return zodToOpenAPI(subSchema)
  })

  return union(zodSchemas)
}
