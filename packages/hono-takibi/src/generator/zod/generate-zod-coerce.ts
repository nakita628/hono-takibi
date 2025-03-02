import { removeZodPrefix } from '../../core/text/remove-zod-prefix'

/**
 * @description
 * Generates a zod pipe function to coerce a value to a zod schema.
 *
 * @function generateZodCoerce
 * @param z - The zod schema to coerce to.
 * @param zodSchema - The zod schema to coerce.
 * @returns A zod pipe function to coerce a value to a zod schema.
 */
export function generateZodCoerce(z: string, zodSchema: string) {
  const zod = removeZodPrefix(zodSchema)
  return `${z}.pipe(z.coerce.${zod})`
}
