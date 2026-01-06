import path from 'node:path'
import {
  ensureSuffix,
  findSchema,
  findTokensBySuffix,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

export type ImportTarget = {
  readonly output: string | `${string}.ts`
  readonly split?: boolean
  readonly import?: string
}

export type ComponentImports = {
  readonly [key: string]: ImportTarget | undefined
}

/**
 * Builds a relative module specifier from `fromFile` to a configured output.
 */
export function makeModuleSpec(
  fromFile: string,
  target: { readonly output: string | `${string}.ts`; readonly split?: boolean },
): string {
  const fromDir = path.dirname(fromFile)
  const entry = target.split ? path.join(target.output) : target.output
  const rel = path.relative(fromDir, entry).replace(/\\/g, '/')
  const stripped = rel.endsWith('.ts') ? rel.slice(0, -3) : rel
  const noIndex = stripped.endsWith('/index') ? stripped.slice(0, -6) : stripped
  return noIndex === '' ? '.' : noIndex.startsWith('.') ? noIndex : `./${noIndex}`
}

export function makeConst(exportVariable: boolean, text: string, suffix: string): string {
  const prefix = exportVariable ? 'export const ' : 'const '
  return `${prefix}${toIdentifierPascalCase(ensureSuffix(text, suffix))}=`
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

/**
 * Universal import generator.
 * @param isRoute - true for route files (createRoute), false for components (z only)
 * @param prefix - module prefix for fallback paths (default: '.')
 */
export function makeImports(
  code: string,
  fromFile: string,
  components: ComponentImports | undefined,
  isRoute: boolean,
  prefix = '.',
): string {
  const resolvePath = (key: string): string => {
    const target = components?.[key]
    return target?.import ?? (target ? makeModuleSpec(fromFile, target) : `${prefix}/${key}`)
  }

  const buildImport = (suffix: string, key: string): string => {
    const tokens = [...findTokensBySuffix(code, suffix)].sort()
    return tokens.length > 0 ? renderNamedImport(tokens, resolvePath(key)) : ''
  }

  // Schema tokens: all *Schema except *ParamsSchema and *HeaderSchema
  const schemas = findSchema(code)
    .filter((t) => !(t.endsWith('ParamsSchema') || t.endsWith('HeaderSchema')))
    .sort()
  const schemaImport = schemas.length > 0 ? renderNamedImport(schemas, resolvePath('schemas')) : ''

  // Build hono import
  const needsZ = code.includes('z.')
  const honoLine = isRoute
    ? `import{createRoute${needsZ ? ',z' : ''}}from'@hono/zod-openapi'`
    : needsZ
      ? `import{z}from'@hono/zod-openapi'`
      : ''

  // Build component imports in OpenAPI order
  const imports = [
    schemaImport,
    buildImport('ParamsSchema', 'parameters'),
    buildImport('RequestBody', 'requestBodies'),
    buildImport('Response', 'responses'),
    buildImport('HeaderSchema', 'headers'),
    buildImport('Example', 'examples'),
    buildImport('Link', 'links'),
    buildImport('Callback', 'callbacks'),
  ].filter(Boolean)

  return [honoLine, ...imports, '\n', code, ''].filter(Boolean).join('\n')
}
