import path from 'node:path'
import { ensureSuffix, renderNamedImport, toIdentifierPascalCase } from '../utils/index.js'

/**
 * Builds a relative module specifier from `fromFile` to a configured output.
 *
 * Computes the relative path from the directory of `fromFile` to the `target.output`,
 * stripping `.ts` extension and `/index` suffix for clean ES module import paths.
 *
 * @param fromFile - The absolute path of the source file that will import the target.
 * @param target - Configuration for the target module.
 * @param target.output - The absolute path to the output file or directory.
 * @param target.split - When true, treats output as a directory path rather than a file.
 * @returns A relative module specifier (e.g., `'../schemas'`, `'./user'`, `'.'`).
 *
 * @example
 * ```ts
 * // File to directory (strips /index)
 * makeModuleSpec('/src/routes/index.ts', { output: '/src/schemas/index.ts' })
 * // → '../schemas'
 *
 * // File to file (strips .ts extension)
 * makeModuleSpec('/src/routes/user.ts', { output: '/src/schemas/user.ts' })
 * // → '../schemas/user'
 *
 * // Split mode: same directory
 * makeModuleSpec('/src/routes/index.ts', { output: '/src/routes', split: true })
 * // → '.'
 *
 * // Ensures dot-relative prefix
 * makeModuleSpec('/src/index.ts', { output: '/src/schemas.ts' })
 * // → './schemas'
 * ```
 */
export function makeModuleSpec(
  fromFile: string,
  target: { readonly output: string | `${string}.ts`; readonly split?: boolean },
): string {
  const rel = path.relative(path.dirname(fromFile), target.output).replace(/\\/g, '/')
  const stripped = rel.replace(/\.ts$/, '').replace(/\/index$/, '')
  return stripped === '' ? '.' : stripped.startsWith('.') ? stripped : `./${stripped}`
}

/**
 * Generates a const declaration prefix with optional export.
 *
 * Combines the text and suffix, converts to PascalCase, and prepends
 * `export const ` or `const ` based on the `exportVariable` flag.
 *
 * @param exportVariable - Whether to add the `export` keyword.
 * @param text - The base name for the constant (will be converted to PascalCase).
 * @param suffix - The suffix to append to the name (added before PascalCase conversion).
 * @returns A string like `'export const UserSchema='` or `'const UserSchema='`.
 *
 * @example
 * ```ts
 * makeConst(true, 'User', 'Schema')
 * // → 'export const UserSchema='
 *
 * makeConst(false, 'post', 'Response')
 * // → 'const PostResponse='
 *
 * // Handles kebab-case input
 * makeConst(true, 'user-profile', 'Schema')
 * // → 'export const UserProfileSchema='
 * ```
 */
export function makeConst(exportVariable: boolean, text: string, suffix: string): string {
  return `${exportVariable ? 'export const ' : 'const '}${toIdentifierPascalCase(ensureSuffix(text, suffix))}=`
}

/**
 * Generates a string of export const statements for the given value.
 *
 * Iterates over the keys of `value`, converts each key to PascalCase with the suffix,
 * and serializes the value as JSON. Multiple entries are separated by double newlines.
 *
 * @param value - Object containing values to export (keys become constant names).
 * @param suffix - Suffix to append to each export name (before PascalCase conversion).
 * @param readonly - Whether to add `as const` assertion for TypeScript readonly inference.
 * @returns A string of TypeScript export const statements separated by `\n\n`.
 *
 * @example
 * ```ts
 * // Single export
 * makeExportConst({ user: { id: 1 } }, 'Example')
 * // → 'export const UserExample={"id":1}'
 *
 * // With as const assertion
 * makeExportConst({ user: { id: 1 } }, 'Example', true)
 * // → 'export const UserExample={"id":1} as const'
 *
 * // Multiple exports
 * makeExportConst({ user: { id: 1 }, post: { title: 'Hello' } }, 'Data')
 * // → 'export const UserData={"id":1}\n\nexport const PostData={"title":"Hello"}'
 * ```
 */
export function makeExportConst(
  value: { readonly [k: string]: unknown },
  suffix: string,
  readonly?: boolean | undefined,
): string {
  const asConst = readonly ? ' as const' : ''
  return Object.keys(value)
    .map(
      (key) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(key, suffix))}=${JSON.stringify(value[key])}${asConst}`,
    )
    .join('\n\n')
}

/**
 * Universal import generator for OpenAPI-based Hono route files.
 *
 * Analyzes the provided code to auto-detect required imports and generates
 * import statements for `@hono/zod-openapi` and OpenAPI component references.
 *
 * **Import Detection Logic:**
 * - Detects `z.` usage to import `z` from `@hono/zod-openapi`
 * - Detects `createRoute(` usage to import `createRoute`
 * - Scans for OpenAPI component references by suffix pattern (e.g., `*Schema`, `*Response`)
 * - Excludes locally defined exports from import generation
 *
 * **OpenAPI Component Patterns** (ordered per OpenAPI 3.0 spec):
 * | Suffix | Component Type | Example |
 * |--------|---------------|---------|
 * | `*Schema` | schemas | `UserSchema` |
 * | `*ParamsSchema` | parameters | `IdParamsSchema` |
 * | `*SecurityScheme` | securitySchemes | `BearerSecurityScheme` |
 * | `*RequestBody` | requestBodies | `CreateUserRequestBody` |
 * | `*Response` | responses | `UserResponse` |
 * | `*HeaderSchema` | headers | `AuthHeaderSchema` |
 * | `*Example` | examples | `UserExample` |
 * | `*Link` | links | `GetUserLink` |
 * | `*Callback` | callbacks | `WebhookCallback` |
 *
 * @param code - The TypeScript code to analyze and prepend imports to.
 * @param fromFile - The absolute path of the file where code will be written.
 * @param components - Configuration mapping OpenAPI component types to output locations.
 * @param split - When true, uses `'..'` as fallback prefix; otherwise `'.'`.
 * @returns The code with generated import statements prepended.
 *
 * @see {@link https://swagger.io/docs/specification/v3_0/components/|OpenAPI Components}
 *
 * @example
 * ```ts
 * // Basic usage with schema reference
 * const code = 'const route = createRoute({ request: { body: UserSchema } })'
 * makeImports(code, '/src/routes/user.ts', { schemas: { output: '/src/schemas.ts' } })
 * // → "import{createRoute}from'@hono/zod-openapi'\nimport{UserSchema}from'../schemas'\n\n..."
 *
 * // With z usage
 * const code2 = 'z.string()'
 * makeImports(code2, '/src/routes/user.ts', undefined)
 * // → "import{z}from'@hono/zod-openapi'\n\n..."
 * ```
 */
export function makeImports(
  code: string,
  fromFile: string,
  components:
    | {
        readonly [k: string]: {
          readonly output: string | `${string}.ts`
          readonly split?: boolean
          readonly import?: string
        }
      }
    | undefined,
  split = false,
): string {
  /** Valid JavaScript identifier pattern (e.g., `UserSchema`, `_private`, `$special`) */
  const JS_IDENT = '[A-Za-z_$][A-Za-z0-9_$]*'

  /**
   * Regex patterns for OpenAPI component types.
   * Ordered per OpenAPI 3.0 specification.
   * Note: (?<!Params)(?<!Header) excludes ParamsSchema/HeaderSchema from generic Schema matches
   */
  const IMPORT_PATTERNS: ReadonlyArray<{ readonly pattern: RegExp; readonly key: string }> = [
    { pattern: new RegExp(`\\b(${JS_IDENT}(?<!Params)(?<!Header)Schema)\\b`, 'g'), key: 'schemas' },
    { pattern: new RegExp(`\\b(${JS_IDENT}ParamsSchema)\\b`, 'g'), key: 'parameters' },
    { pattern: new RegExp(`\\b(${JS_IDENT}SecurityScheme)\\b`, 'g'), key: 'securitySchemes' },
    { pattern: new RegExp(`\\b(${JS_IDENT}RequestBody)\\b`, 'g'), key: 'requestBodies' },
    { pattern: new RegExp(`\\b(${JS_IDENT}Response)\\b`, 'g'), key: 'responses' },
    { pattern: new RegExp(`\\b(${JS_IDENT}HeaderSchema)\\b`, 'g'), key: 'headers' },
    { pattern: new RegExp(`\\b(${JS_IDENT}Example)\\b`, 'g'), key: 'examples' },
    { pattern: new RegExp(`\\b(${JS_IDENT}Link)\\b`, 'g'), key: 'links' },
    { pattern: new RegExp(`\\b(${JS_IDENT}Callback)\\b`, 'g'), key: 'callbacks' },
  ]

  /** Pattern to find locally exported constants */
  const EXPORT_CONST_PATTERN = new RegExp(`export\\s+const\\s+(${JS_IDENT})\\s*=`, 'g')

  const fallbackPrefix = split ? '..' : '.'

  // Resolve import path for a component type
  const resolvePath = (key: string): string => {
    const target = components?.[key]
    return (
      target?.import ?? (target ? makeModuleSpec(fromFile, target) : `${fallbackPrefix}/${key}`)
    )
  }

  // Find locally defined exports to exclude from imports
  const defined = new Set(
    Array.from(code.matchAll(EXPORT_CONST_PATTERN), (m) => m[1]).filter(Boolean),
  )

  // Build @hono/zod-openapi import
  const needsCreateRoute = code.includes('createRoute(')
  const needsZ = code.includes('z.')
  const honoImports = [needsCreateRoute && 'createRoute', needsZ && 'z'].filter(Boolean)
  const honoLine =
    honoImports.length > 0 ? `import{${honoImports.join(',')}}from'@hono/zod-openapi'` : ''

  // Build component imports in OpenAPI order
  const componentImports = IMPORT_PATTERNS.flatMap(({ pattern, key }) => {
    const tokens = [...new Set(Array.from(code.matchAll(pattern), (m) => m[1]))]
      .filter((t): t is string => Boolean(t) && !defined.has(t))
      .sort()
    return tokens.length > 0 ? [renderNamedImport(tokens, resolvePath(key))] : []
  })

  return [honoLine, ...componentImports, '\n', code, ''].filter(Boolean).join('\n')
}
