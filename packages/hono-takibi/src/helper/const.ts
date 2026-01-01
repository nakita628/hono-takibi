import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

export function constCode(exportVariable: boolean, text: string, suffix: string): string {
  if (exportVariable) {
    return `export const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
  }
  return `const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
}
