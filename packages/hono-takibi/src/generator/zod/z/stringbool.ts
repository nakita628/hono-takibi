/**
 * Replaces 'boolean' with 'stringbool' in a Zod schema string.
 * 
 * @param zodSchema - The Zod schema string to convert.
 * @returns The converted Zod schema string.
 */
export function stringbool(zodSchema: string): string {
  return zodSchema.replace('boolean', 'stringbool')
}
