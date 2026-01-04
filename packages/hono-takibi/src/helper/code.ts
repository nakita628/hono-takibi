import {
  ensureSuffix,
  findSchema,
  findTokensBySuffix,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

type ExtraImportConfig = {
  readonly suffix: string
  readonly path: string
}

export function makeConst(exportVariable: boolean, text: string, suffix: string): string {
  if (exportVariable) {
    return `export const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
  }
  return `const ${toIdentifierPascalCase(ensureSuffix(text, suffix))} = `
}

/**
 * Makes the Z import line if the code contains 'z.'
 */
export function makeZImport(code: string): string {
  return code.includes('z.') ? `import { z } from '@hono/zod-openapi'` : ''
}

/**
 * Makes schema import line from code.
 * @param code - The generated code to analyze.
 * @param schemaPath - The import path for schemas (e.g., './schemas' or '../schemas').
 * @param excludeSuffix - Optional suffix to exclude from schema tokens (e.g., 'HeaderSchema').
 */
export function makeSchemaImport(code: string, schemaPath: string, excludeSuffix?: string): string {
  const tokens = excludeSuffix
    ? findSchema(code).filter((t) => !t.endsWith(excludeSuffix))
    : findSchema(code)
  return tokens.length > 0 ? renderNamedImport(tokens, schemaPath) : ''
}

/**
 * Makes complete file code with imports.
 */
export function makeFileCode(
  code: string,
  schemaPath: string,
  excludeSuffix?: string,
  extraImports?: readonly ExtraImportConfig[],
): string {
  const importZ = makeZImport(code)
  const importSchemas = makeSchemaImport(code, schemaPath, excludeSuffix)
  const extras = (extraImports ?? [])
    .map(({ suffix, path }) => {
      const tokens = findTokensBySuffix(code, suffix)
      return tokens.length > 0 ? renderNamedImport(tokens, path) : ''
    })
    .filter(Boolean)
    .join('\n')
  return [importZ, importSchemas, extras, '\n', code, ''].filter(Boolean).join('\n')
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
