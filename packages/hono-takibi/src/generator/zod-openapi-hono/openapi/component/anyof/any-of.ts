import type { Schema } from '../../../../../openapi/index.js'
import type { Config } from '../../../../../config/index.js'
import { getRefSchemaName } from '../../../../../core/schema/references/get-ref-schema-name.js'
import { union } from '../../../../zod/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'

/**
 * Generates the Zod code for an `anyOf` schema.
 * @param { Schema } schema - The OpenAPI schema object.
 * @param { Config } config - The configuration object.
 * @returns { string } The generated Zod code as a string.
 */
export function anyOf(
  schema: Schema,
  schemaNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
  typeNameCase: 'camelCase' | 'PascalCase' = 'PascalCase',
): string {
  if (!schema.anyOf || schema.anyOf.length === 0) {
    console.warn('not exists anyOf')
    return 'z.any()'
  }

  const zodSchemas = schema.anyOf.map((subSchema) => {
    subSchema.$ref
      ? getRefSchemaName(subSchema, schemaNameCase)
      : zodToOpenAPI(subSchema, schemaNameCase, typeNameCase)
    return zodToOpenAPI(subSchema, schemaNameCase, typeNameCase)
  })

  return union(zodSchemas)
}
