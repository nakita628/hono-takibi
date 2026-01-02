import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

export function constCode(exportVariable: boolean, text: string, suffix: string): string {
  if (exportVariable) {
    return `export const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
  }
  return `const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
}

/**
 * Generates a string of export const statements for the given value.
 * @param value - The value to export.
 * @param suffix - The suffix to add to the key.
 * @returns A string of export const statements.
 */
export function exportConst(value: { readonly [k: string]: unknown }, suffix: string): string {
  return Object.keys(value)
    .map(
      (key) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(key, suffix))} = ${JSON.stringify(value[key])}`,
    )
    .join('\n\n')
}
