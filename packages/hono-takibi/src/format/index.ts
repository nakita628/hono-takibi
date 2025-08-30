import { format } from 'prettier'

/**
 * Formats TypeScript source with Prettier.
 *
 * @param code - Source code to format.
 * @returns A `Result` containing the formatted code or an error message.
 */
export async function fmt(code: string): Promise<
  Readonly<
    | {
        ok: true
        value: string
      }
    | {
        ok: false
        error: string
      }
  >
> {
  try {
    const result = await format(code, {
      parser: 'typescript',
      printWidth: 100,
      singleQuote: true,
      semi: false,
    })
    return { ok: true, value: result }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
