import { format } from 'oxfmt'

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
  const { code, errors } = await format('<stdin>.ts', input, {
    // parser: 'typescript',
    printWidth: 100,
    singleQuote: true,
    semi: false,
  })
  if (errors.length > 0) {
    return {
      ok: false,
      error: errors.map((e) => e.message).join('\n'),
    }
  }
  return { ok: true, value: code }
}
