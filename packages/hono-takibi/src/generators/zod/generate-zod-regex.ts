/**
 * Generate Zod regex validation
 *
 * @param pattern - Regex pattern
 * @returns Zod regex validation string
 */
export function generateZodRegex(pattern: string): string {
  // pattern "^\d{2}/\d{2}$"
  const escapedPattern = pattern.replace(/(?<!\\)\//g, '\\/')
  // escapedPattern "^\d{2}\/\d{2}$"
  return `.regex(/${escapedPattern}/)`
}
