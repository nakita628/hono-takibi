import {
  ensureSuffix,
  findSchema,
  findTokensBySuffix,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'
import { moduleSpecFrom } from './module-spec-from.js'

type ExtraImportConfig = {
  readonly suffix: string
  readonly path: string
}

type ImportTarget = {
  readonly output: string | `${string}.ts`
  readonly split?: boolean
  readonly import?: string
}

export type ComponentImports = {
  readonly [key: string]: ImportTarget | undefined
}

const SUFFIX_MAP: Readonly<Record<string, string>> = {
  schemas: 'Schema',
  examples: 'Example',
  links: 'Link',
  headers: 'Header',
  callbacks: 'Callback',
}

/**
 * Resolves import path from target or returns default.
 */
export function resolveImportPath(
  fromFile: string,
  target: ImportTarget | undefined,
  defaultPath: string,
): string {
  if (!target) return defaultPath
  return target.import ?? moduleSpecFrom(fromFile, target)
}

/**
 * Builds extra import configs for split mode.
 */
export function buildExtraImports(
  fromFile: string,
  imports: ComponentImports | undefined,
  defaults: Readonly<Record<string, string>>,
): readonly ExtraImportConfig[] {
  return Object.entries(defaults)
    .map(([key, defaultPath]) => {
      const suffix = SUFFIX_MAP[key]
      if (!suffix) return null
      const path = resolveImportPath(fromFile, imports?.[key], defaultPath)
      return { suffix, path }
    })
    .filter((c): c is ExtraImportConfig => c !== null)
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
 * Makes complete file code with imports from ComponentImports.
 * Single function to handle all import resolution.
 * @param prefix - Import path prefix (e.g., '..' for split, '.' for non-split)
 */
export function makeFileCodeWithImports(
  code: string,
  fromFile: string,
  imports: ComponentImports | undefined,
  prefix: string,
  excludeSuffix?: string,
): string {
  const schemasPath = resolveImportPath(fromFile, imports?.schemas, `${prefix}/schemas`)
  const extraDefaults = Object.fromEntries(
    Object.keys(SUFFIX_MAP)
      .filter((key) => key !== 'schemas')
      .map((key) => [key, `${prefix}/${key}`]),
  )
  const extraImports = buildExtraImports(fromFile, imports, extraDefaults)
  return makeFileCode(code, schemasPath, excludeSuffix, extraImports)
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
