/**
 * Generates a Zod regex validation string.
 * 
 * @param pattern - Regex pattern.
 * @returns The generated Zod regex schema string.
 */
export function regex(pattern: string): string {
  return `.regex(/${pattern.replace(/(?<!\\)\//g, '\\/')}/)`
}
