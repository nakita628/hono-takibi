/**
 * Generate a Zod array schema string using `z.array()`.
 *
 * @param zodSchema - The schema string for array elements (e.g., `'Address'`, `'z.string().min(3)'`).
 * @returns The Zod `z.array()` schema string.
 *
 * @example
 * array('z.string()') // => 'z.array(z.string())'
 * array('User') // => 'z.array(User)'
 */
export function array(zodSchema: string): string {
  return `z.array(${zodSchema})`
}
