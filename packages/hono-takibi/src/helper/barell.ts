import { lowerFirst } from '../utils/index.js'

/**
 * Generates a barrel file content with sorted export statements.
 *
 * @param value - An object whose keys represent module names to export.
 * @returns A string containing sorted `export * from './moduleName'` statements.
 *
 * @example
 * ```ts
 * makeBarell({ User: {}, Post: {}, Comment: {} })
 * // Returns:
 * // "export * from './comment'\nexport * from './post'\nexport * from './user'\n"
 * ```
 *
 * @example
 * ```ts
 * makeBarell({ Schema: {} })
 * // Returns:
 * // "export * from './schema'\n"
 * ```
 */
export function makeBarell(value: { [k: string]: unknown }): string {
  return `${Object.keys(value)
    .sort()
    .map((k) => `export * from './${lowerFirst(k)}'`)
    .join('\n')}\n`
}
