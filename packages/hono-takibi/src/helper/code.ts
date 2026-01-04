import {
  ensureSuffix,
  findSchema,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

export function makeConst(exportVariable: boolean, text: string, suffix: string): string {
  if (exportVariable) {
    return `export const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
  }
  return `const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
}

/**
 * Builds the Z import line if the code contains 'z.'
 */
export function buildZImport(code: string): string {
  return code.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
}

/**
 * Builds schema import line from code.
 * @param code - The generated code to analyze.
 * @param schemaPath - The import path for schemas (e.g., './schemas' or '../schemas').
 * @param excludeSuffix - Optional suffix to exclude from schema tokens (e.g., 'HeaderSchema').
 */
export function buildSchemaImport(
  code: string,
  schemaPath: string,
  excludeSuffix?: string,
): string {
  const tokens = excludeSuffix
    ? findSchema(code).filter((t) => !t.endsWith(excludeSuffix))
    : findSchema(code)
  return tokens.length > 0 ? renderNamedImport(tokens, schemaPath) : ''
}

/**
 * Builds complete file code with imports.
 */
export function buildFileCode(code: string, schemaPath: string, excludeSuffix?: string): string {
  const importZ = buildZImport(code)
  const importSchemas = buildSchemaImport(code, schemaPath, excludeSuffix)
  return [importZ, importSchemas, '\n', code, ''].filter(Boolean).join('\n')
}

/**
 * Generates a string of export const statements for the given value.
 * @param value - The value to export.
 * @param suffix - The suffix to add to the key.
 * @returns A string of export const statements.
 */
export function makeExportConst(value: { readonly [k: string]: unknown }, suffix: string): string {
  return Object.keys(value)
    .map(
      (key) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(key, suffix))} = ${JSON.stringify(value[key])}`,
    )
    .join('\n\n')
}
