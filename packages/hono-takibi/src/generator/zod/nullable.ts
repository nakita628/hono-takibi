/**
 * Generates a zod nullable validation
 * @returns { string } Generated Zod nullable schema string
 * @example
 * generateZodNullable() -> ".nullable()"
 */
export function nullable(): string {
  return '.nullable()'
}
