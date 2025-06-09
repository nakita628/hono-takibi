import type { Result } from '../../result/index.js'
import { ok, err } from '../../result/index.js'

/**
 * Parses the naming case from a raw string.
 * @param str - The raw naming case string.
 * @returns A Result containing the parsed Naming or an error message.
 */
export function parseNaming(
  str: string | undefined,
): Result<'PascalCase' | 'camelCase' | undefined, string> {
  if (str === 'PascalCase' || str === 'camelCase') return ok(str)
  if (str === undefined) return ok(undefined)
  return err(`--naming-case must be PascalCase or camelCase (got ${str})`)
}
