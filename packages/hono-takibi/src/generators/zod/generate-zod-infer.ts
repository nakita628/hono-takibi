import type { Config } from '../../config'
import { getVariableNameHelper } from '../../core/helper/get-variable-name-helper'
import { getVariableSchemaNameHelper } from '../../core/helper/get-variable-schema-name-helper'

/**
 * Generates a TypeScript type definition for an inferred Zod schema.
 *
 * @param schemaName - The name of the Zod schema to infer.
 * @returns A string containing the inferred type definition.
 */
export function generateZodInfer(schema: string, config: Config) {
  const schemaName = getVariableSchemaNameHelper(schema, config)
  const variableName = getVariableNameHelper(schema, config)
  return `export type ${variableName} = z.infer<typeof ${schemaName}>`
}
