/**
 * Generate a TypeScript type definition using `z.infer`.
 *
 * @param typeVariableName - The name of the type to export.
 * @param schemaName - The name of the Zod schema to infer from.
 * @returns The TypeScript type definition string.
 *
 * @example
 * infer('User', 'UserSchema')
 * // => 'export type User = z.infer<typeof UserSchema>'
 */
export function infer(typeVariableName: string, schemaName: string): string {
  return `export type ${typeVariableName} = z.infer<typeof ${schemaName}>`
}
