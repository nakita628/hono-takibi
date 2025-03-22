/**
 * @function removeZodPrefix
 * @description Removes the zod prefix from a zod schema.
 * @param zodSchema - The zod schema to remove the prefix from.
 * @returns The zod schema without the prefix.
 */
export function removeZodPrefix(zodSchema: string): string {
  return zodSchema.replace('z.', '')
}
