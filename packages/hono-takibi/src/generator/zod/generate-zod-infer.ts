import type { Config } from '../../config'
import { getVariableNameHelper } from '../../core/helper/get-variable-name-helper'
import { getVariableSchemaNameHelper } from '../../core/helper/get-variable-schema-name-helper'

/**
 * Generates a TypeScript type definition for an inferred Zod schema.
 *
 * @function generateZodInfer
 * @param schema - The name of the Zod schema to infer.
 * @param config - Configuration
 * @returns string - Generated TypeScript type definition string
 */
export function generateZodInfer(schema: string, config: Config) {
  const schemaName = getVariableSchemaNameHelper(schema, config)
  const variableName = getVariableNameHelper(schema, config)
  return `export type ${variableName} = z.infer<typeof ${schemaName}>`
}
