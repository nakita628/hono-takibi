import { removeZodPrefix } from '../../core/utils/index.js'

/**
 * Generates a zod pipe function to coerce a value to a zod schema.
 * @param { string } zodSchema - The zod schema to coerce.
 * @returns { string } Generated zod pipe function to coerce a value to a zod schema.
 */
export function coerce(zodSchema: string): string {
  const zod = removeZodPrefix(zodSchema)
  return `z.coerce.${zod}`
}
