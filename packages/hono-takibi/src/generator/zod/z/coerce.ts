import { removeZodPrefix } from '../../../core/utils/index.js'

/**
 * Generate a Zod `z.coerce.*` schema string.
 *
 * @param zodSchema - The Zod schema string to coerce to.
 * @returns The Zod coercion string.
 *
 * @example
 * coerce('z.string()') // => 'z.coerce.string()'
 * coerce('z.number().min(1)') // => 'z.coerce.number().min(1)'
 */
export function coerce(zodSchema: string): string {
  const zod = removeZodPrefix(zodSchema)
  return `z.coerce.${zod}`
}
