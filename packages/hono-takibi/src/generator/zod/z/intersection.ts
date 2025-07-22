/**
 * Generate Zod `z.intersection()` schema string.
 *
 * @param schemas - An array of schema strings to intersect.
 * @returns The Zod `z.intersection()` string.
 *
 * @example
 * intersection(['z.string()', 'z.min(3)'])
 * // => z.intersection(z.string(),z.min(3))
 */
export function intersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}
