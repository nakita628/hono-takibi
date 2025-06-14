/**
 * Generates a zod passthrough schema
 * @param { string } zodSchema - The zod schema to passthrough
 * @returns { string } Generated zod passthrough schema
 */
export function passthrough(zodSchema: string): string {
  return `${zodSchema}.passthrough()`
}
