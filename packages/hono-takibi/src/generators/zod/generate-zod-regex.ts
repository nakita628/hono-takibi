/**
 * Generate Zod regex validation
 *
 * @param pattern - Regex pattern
 * @returns Zod regex validation string
 */
export function generateZodRegex(pattern: string): string {
  return `.regex(/${pattern}/)`
}
