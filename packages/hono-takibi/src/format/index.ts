import { format } from 'prettier'

export async function formatCode(code: string) {
  return await format(code, {
    parser: 'typescript',
    printWidth: 100,
    singleQuote: true,
    semi: false,
  })
}
