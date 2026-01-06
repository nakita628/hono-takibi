import path from 'node:path'
import { ensureSuffix, renderNamedImport, toIdentifierPascalCase } from '../utils/index.js'

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

// Regex patterns for each OpenAPI component type
// Using negative lookbehind to exclude ParamsSchema and HeaderSchema from Schema matches
const IMPORT_PATTERNS: ReadonlyArray<{ readonly pattern: RegExp; readonly key: string }> = [
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*(?<!Params)(?<!Header)Schema)\b/g, key: 'schemas' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*ParamsSchema)\b/g, key: 'parameters' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*RequestBody)\b/g, key: 'requestBodies' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Response)\b/g, key: 'responses' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*HeaderSchema)\b/g, key: 'headers' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Example)\b/g, key: 'examples' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Link)\b/g, key: 'links' },
  { pattern: /\b([A-Za-z_$][A-Za-z0-9_$]*Callback)\b/g, key: 'callbacks' },
]

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

  // Find locally defined exports to exclude from imports
  const defined = new Set(
    Array.from(
      code.matchAll(/export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/g),
      (m) => m[1] ?? '',
    ).filter(Boolean),
  )

  // Build hono import
  const needsZ = code.includes('z.')
  const honoLine = isRoute
    ? `import{createRoute${needsZ ? ',z' : ''}}from'@hono/zod-openapi'`
    : needsZ
      ? `import{z}from'@hono/zod-openapi'`
      : ''

  // Build component imports in OpenAPI order using regex patterns
  const imports = IMPORT_PATTERNS.map(({ pattern, key }) => {
    const tokens = Array.from(new Set(Array.from(code.matchAll(pattern), (m) => m[1] ?? '')))
      .filter((t) => t && !defined.has(t))
      .sort()
    return tokens.length > 0 ? renderNamedImport(tokens, resolvePath(key)) : ''
  }).filter(Boolean)

  return [honoLine, ...imports, '\n', code, ''].filter(Boolean).join('\n')
}
