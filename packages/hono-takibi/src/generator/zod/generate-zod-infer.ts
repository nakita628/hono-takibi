/**
 * Generates a TypeScript type definition for an inferred Zod schema.
 * @param { string } typeVariableName - The name of the TypeScript type variable.
 * @param { string } schemaName - The name of the Zod schema to infer.
 * @returns { string } Generated TypeScript type definition string
 */
export function generateZodInfer(typeVariableName: string, schemaName: string): string {
  return `export type ${typeVariableName} = z.infer<typeof ${schemaName}>`
}
