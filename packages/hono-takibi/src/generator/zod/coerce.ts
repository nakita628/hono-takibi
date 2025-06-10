import { removeZodPrefix } from '../../core/text/index.js'

/**
 * Generates a zod pipe function to coerce a value to a zod schema.
 * @param { string } z - The zod schema to coerce to.
 * @param { string } zodSchema - The zod schema to coerce.
 * @returns { string } Generated zod pipe function to coerce a value to a zod schema.
 */
export function coerce(z: string, zodSchema: string): string {
  const zod = removeZodPrefix(zodSchema)
  return `${z}.pipe(z.coerce.${zod})`
}
