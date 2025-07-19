/**
 * @param { string } zodSchema - The Zod schema string to convert.
 * @returns { string } The converted Zod schema string with 'stringbool'.
 * @description This function replaces the 'boolean' type in a Zod schema with 'stringbool'.
 */

export function stringbool(zodSchema: string): string {
  return zodSchema.replace('boolean', 'stringbool')
}
