import { format } from 'prettier'

/**
 * Formats TypeScript code using Prettier
 * @param { string } code - The TypeScript code to format
 * @returns { Promise<string> } The formatted code
 */
export async function formatCode(code: string): Promise<string> {
  return await format(code, {
    parser: 'typescript',
    printWidth: 100,
    singleQuote: true,
    semi: false,
  })
}
