import { regexPattern } from '../../../core/utils/index.js'

/**
 * Generate Zod regex validation
 * @param { string } pattern - Regex pattern
 * @returns { string } Generated Zod regex schema string
 */
export function regex(pattern: string): string {
  // // pattern "^\d{2}/\d{2}$"
  // const escapedPattern = pattern.replace(/(?<!\\)\//g, '\\/')
  // // escapedPattern "^\d{2}\/\d{2}$"
  // return `.regex(/${escapedPattern}/)`
  const regex = regexPattern(pattern)
  return `.regex(${regex})`
}
