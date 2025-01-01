import type { Schema } from '../../types'
import { getRefName } from '../../core/schema/references/get-ref-name'
import { generateZodArray } from './generate-zod-array'
import { generateZodSchema } from './generate-zod-schema'
import { getCamelCaseSchemaName } from '../../core/schema/references/get-camel-case-schema-name'
// import { generateZodOpenAPIExample } from './generate-zod-openapi-example'

/**
 * Generates a Zod schema string for a given OpenAPI schema definition
 *
 * @function generatePropertySchema
 * @param schema - OpenAPI schema definition
 * @returns Generated Zod schema string
 *
 * @example
 * // Reference type
 * generatePropertySchema({ $ref: '#/components/schemas/User' })
 * // Returns: 'userSchema'
 *
 * // Array with reference type
 * generatePropertySchema({
 *   type: 'array',
 *   items: { $ref: '#/components/schemas/Post' }
 * })
 * // Returns: 'z.array(postSchema)'
 *
 * // Basic type
 * generatePropertySchema({ type: 'string' })
 * // Returns: 'z.string()'
 */
export function generatePropertySchema(schema: Schema): string {
  if (schema.$ref) {
    const refName = getRefName(schema.$ref)
    if (refName) {
      const camelCaseRefName = getCamelCaseSchemaName(refName)
      return getRefName(camelCaseRefName) || 'z.any()'
    }
  }
  if (schema.type === 'array' && schema.items?.$ref) {
    const refName = getRefName(schema.items.$ref)
    if (refName) {
      const camelCaseRefName = getCamelCaseSchemaName(refName)
      return generateZodArray(camelCaseRefName)
    }
  }
  return generateZodSchema(schema)
}
