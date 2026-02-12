import { type FormatOptions, format } from 'oxfmt'

export type { FormatOptions } from 'oxfmt'

const defaultOptions: FormatOptions = {
  printWidth: 100,
  singleQuote: true,
  semi: false,
}

let currentOptions: FormatOptions = defaultOptions

/**
 * Sets the format options for all subsequent `fmt()` calls.
 * Unspecified keys fall back to the default values.
 *
 * @param opts - Partial format options to override defaults.
 *
 * @example
 * ```ts
 * setFormatOptions({ printWidth: 80, semi: true })
 * ```
 */
export function setFormatOptions(opts: FormatOptions): void {
  currentOptions = { ...defaultOptions, ...opts }
}

/**
 * Formats TypeScript code using oxfmt.
 *
 * @param input - The TypeScript code string to format.
 * @returns A promise that resolves to a result object:
 *   - `{ ok: true, value: string }` on success with formatted code
 *   - `{ ok: false, error: string }` on failure with error message
 *
 * @example
 * ```ts
 * const result = await fmt('const x=1')
 * if (result.ok) {
 *   console.log(result.value) // 'const x = 1\n'
 * }
 * ```
 *
 * @example
 * ```ts
 * const result = await fmt('const x = {')
 * if (!result.ok) {
 *   console.error(result.error) // Parse error message
 * }
 * ```
 */
export async function fmt(
  input: string,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const { code, errors } = await format('<stdin>.ts', input, currentOptions)
  if (errors.length > 0) {
    return {
      ok: false,
      error: errors.map((e) => e.message).join('\n'),
    }
  }
  return { ok: true, value: code }
}
