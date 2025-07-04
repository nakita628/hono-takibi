import { format } from 'prettier'
import type { Result } from '../result/index.js'

/**
 * Formats TypeScript code using Prettier
 * @param { string } code - The TypeScript code to format
 * @returns { Promise<Result<string, string>> } - A promise that resolves to a Result containing the formatted code or an error message
 */
export async function fmt(code: string): Promise<Result<string, string>> {
  try {
    const formatted = await format(code, {
      parser: 'typescript',
      printWidth: 100,
      singleQuote: true,
      semi: false,
    })
    return { ok: true, value: formatted }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
