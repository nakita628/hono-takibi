import path from 'node:path'
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

const stripTsExt = (p: string): string => (p.endsWith('.ts') ? p.slice(0, -3) : p)

const stripIndex = (p: string): string => (p.endsWith('/index') ? p.slice(0, -6) : p)

const ensureDotRelative = (spec: string): string => {
  if (spec === '') return '.'
  if (spec.startsWith('.')) return spec
  return `./${spec}`
}

/**
 * Builds a relative module specifier from `fromFile` to a configured output.
 */
export function makeModuleSpec(
  fromFile: string,
  target: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
): string {
  const fromDir = path.dirname(fromFile)
  const entry = target.split ? path.join(target.output) : target.output
  const rel = path.relative(fromDir, entry).replace(/\\/g, '/')
  return ensureDotRelative(stripIndex(stripTsExt(rel)))
}

/**
 * Resolves import path from target or returns default.
 */
const resolveImportPath = (
  fromFile: string,
  target: ImportTarget | undefined,
  defaultPath: string,
): string => (target ? (target.import ?? makeModuleSpec(fromFile, target)) : defaultPath)

/**
 * Builds extra import configs.
 */
const buildExtraImports = (
  fromFile: string,
  imports: ComponentImports | undefined,
  defaults: Readonly<Record<string, string>>,
): readonly ExtraImportConfig[] =>
  Object.entries(defaults)
    .map(([key, defaultPath]) => {
      const suffix = SUFFIX_MAP[key]
      if (!suffix) return null
      return { suffix, path: resolveImportPath(fromFile, imports?.[key], defaultPath) }
    })
    .filter((c): c is ExtraImportConfig => c !== null)

export function makeConst(exportVariable: boolean, text: string, suffix: string): string {
  const name = toIdentifierPascalCase(ensureSuffix(text, suffix))
  return exportVariable ? `export const ${name}=` : `const ${name}=`
}

/**
 * Finds schemas defined in the code (export const XxxSchema = ...).
 */
const findDefinedSchemas = (code: string): ReadonlySet<string> => {
  const pattern = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*Schema)\s*=/g
  return new Set(Array.from(code.matchAll(pattern), (m) => m[1] ?? '').filter(Boolean))
}

/**
 * Makes complete file code with imports.
 */
const makeFileCode = (
  code: string,
  schemaPath: string,
  extraImports: readonly ExtraImportConfig[],
): string => {
  const importZ = code.includes('z.') ? `import{z}from'@hono/zod-openapi'` : ''
  const defined = findDefinedSchemas(code)
  const schemaTokens = findSchema(code).filter((t) => !defined.has(t))
  const importSchemas = schemaTokens.length > 0 ? renderNamedImport(schemaTokens, schemaPath) : ''
  const extras = extraImports
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
 * @param prefix - Import path prefix (e.g., '..' for split, '.' for non-split)
 */
export function makeFileCodeWithImports(
  code: string,
  fromFile: string,
  imports: ComponentImports | undefined,
  prefix: string,
): string {
  const schemasPath = resolveImportPath(fromFile, imports?.schemas, `${prefix}/schemas`)
  const extraDefaults = Object.fromEntries(
    Object.keys(SUFFIX_MAP)
      .filter((key) => key !== 'schemas')
      .map((key) => [key, `${prefix}/${key}`]),
  )
  return makeFileCode(code, schemasPath, buildExtraImports(fromFile, imports, extraDefaults))
}

/**
 * Generates a string of export const statements for the given value.
 */
export function makeExportConst(value: { readonly [k: string]: unknown }, suffix: string): string {
  return Object.keys(value)
    .map(
      (key) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(key, suffix))}=${JSON.stringify(value[key])}`,
    )
    .join('\n\n')
}
