import type { Schema } from '../../types'
import type { Config } from '../../config'
import { getRefName } from '../../core/schema/references/get-ref-name'
import { generateZodArray } from './generate-zod-array'
import { generateZodSchema } from './schema/generate-zod-schema'
import { getVariableSchemaNameHelper } from '../../core/helper/get-variable-schema-name-helper'
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
export function generatePropertySchema(
  schema: Schema,
  // namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
  config: Config,
): string {
  if (schema.$ref) {
    const refName = getRefName(schema.$ref)
    if (refName) {
      const variableName = getVariableSchemaNameHelper(refName, config)
      // return getRefName(variableName) || 'z.any()'
      return variableName || 'z.any()'
    }
  }
  if (schema.type === 'array' && schema.items?.$ref) {
    const refName = getRefName(schema.items.$ref)
    if (refName) {
      const variableName = getVariableSchemaNameHelper(refName, config)
      return generateZodArray(variableName)
    }
  }
  return generateZodSchema(config, schema, undefined, undefined)
}
