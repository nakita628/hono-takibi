/**
 * Generates a Zod object schema from a record of property types.
 * 
 * @param object - Record of property names and their Zod type strings.
 * @returns The generated Zod object schema string.
 */
export function schema(object: Record<string, string>): string {
  return `z.object({${Object.entries(object)
    .map(([key, val]) => `${key}:${val}`)
    .join(',')}})`
}
