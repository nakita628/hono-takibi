/**
 * Generates a TypeScript type definition for an inferred Zod schema.
 *
 * @param schemaName - The name of the Zod schema to infer.
 * @returns A string containing the inferred type definition.
 */
export function generateZodInfer(schemaName: string) {
  return `export type ${schemaName} = z.infer<typeof ${schemaName}>`
}
