import type { Schema } from '../../../../../openapi/index.js'
import { getRefSchemaName } from '../../../../../core/schema/references/get-ref-schema-name.js'
import { union } from '../../../../zod/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

/**
 * Generates the Zod code for a `oneOf` schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @param { 'camelCase' | 'PascalCase' } schemaNameCase - The case style for schema names (default: 'PascalCase').
 * @returns { string } The generated Zod code as a string.
 */
export function oneOf(
  schema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  if (!schema.oneOf || schema.oneOf.length === 0) {
    console.warn('not exists oneOf')
    return 'z.any()'
  }

  const zodSchemas = schema.oneOf.map((subSchema) => {
    subSchema.$ref ? getRefSchemaName(subSchema, schemaNameCase) : zodToOpenAPI(subSchema)
    return zodToOpenAPI(subSchema)
  })

  return union(zodSchemas)
}
