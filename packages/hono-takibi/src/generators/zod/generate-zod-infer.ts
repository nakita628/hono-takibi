import type { Config } from '../../config'
import { getCamelCaseSchemaName } from '../../core/schema/references/get-camel-case-schema-name'
import { getPascalCaseSchemaName } from '../../core/schema/references/get-pascal-case-schema-name'
import { capitalize } from '../../core/text/capitalize'
import { decapitalize } from '../../core/text/decapitalize'

/**
 * Generates a TypeScript type definition for an inferred Zod schema.
 *
 * @param schemaName - The name of the Zod schema to infer.
 * @returns A string containing the inferred type definition.
 */
export function generateZodInfer(schema: string, config: Config) {
  const schemaName =
    config?.schemaOptions?.namingCase === 'camelCase'
      ? getCamelCaseSchemaName(schema)
      : getPascalCaseSchemaName(schema)
  const variableName =
    config?.typeOptions?.namingCase === 'camelCase' ? decapitalize(schema) : capitalize(schema)
  return `export type ${variableName} = z.infer<typeof ${schemaName}>`
}
