import type { Result } from '../types/index.js'
import type { Naming } from '../types/index.js'
import { ok, err } from '../types/index.js'

/**
 * Parses the naming case from a raw string.
 * @param raw - The raw naming case string.
 * @returns A Result containing the parsed Naming or an error message.
 */
export function parseNaming(raw: string | undefined): Result<Naming> {
  if (raw === 'PascalCase' || raw === 'camelCase') return ok(raw)
  if (raw === undefined) return ok('PascalCase')
  return err(`--naming-case must be PascalCase or camelCase (got ${raw})`)
}
