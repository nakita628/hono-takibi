import { removeZodPrefix } from '../../../core/utils/index.js'

/**
 * @param { string } zodSchema - The zod schema to coerce.
 * @returns { string } Generated zod pipe function to coerce a value to a zod schema.
 * @description This function generates a Zod schema string that coerces a value to the specified Zod schema type.
 */
export function coerce(zodSchema: string): string {
  const zod = removeZodPrefix(zodSchema)
  return `z.coerce.${zod}`
}
