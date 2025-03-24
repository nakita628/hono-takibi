/**
 * Remove the zod prefix from a zod schema
 * @param {string} zodSchema - The zod schema to remove the prefix from
 * @returns {string} The zod schema without the prefix
 */
export function removeZodPrefix(zodSchema: string): string {
  return zodSchema.replace('z.', '')
}
