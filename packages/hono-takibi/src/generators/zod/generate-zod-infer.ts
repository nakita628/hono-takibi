import { capitalize } from '../../core/text/capitalize'
import { decapitalize } from '../../core/text/decapitalize'

/**
 * Generates a TypeScript type definition for an inferred Zod schema.
 *
 * @param schemaName - The name of the Zod schema to infer.
 * @returns A string containing the inferred type definition.
 */
export function generateZodInfer(
  schemaName: string,
  namingCase: 'camelCase' | 'PascalCase' = 'camelCase',
) {
  const variableName =
    namingCase === 'camelCase' ? decapitalize(schemaName) : capitalize(schemaName)
  return `export type ${variableName} = z.infer<typeof ${schemaName}>`
}
