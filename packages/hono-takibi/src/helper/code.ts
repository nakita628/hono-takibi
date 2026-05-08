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
  target: { readonly output: string; readonly split?: boolean },
) {
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
export function makeConst(exportVariable: boolean, text: string, suffix: string) {
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
  readonly?: boolean,
) {
  const asConst = readonly ? ' as const' : ''
  return Object.keys(value)
    .map(
      (k) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(k, suffix))}=${JSON.stringify(value[k])}${asConst}`,
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
 * **OpenAPI Component Patterns** (ordered per OpenAPI 3.0/3.1 spec):
 * | Suffix | Component Type | Example |
 * |--------|---------------|---------|
 * | `*Schema` | schemas | `UserSchema` |
 * | `*Response` | responses | `UserResponse` |
 * | `*ParamsSchema` | parameters | `IdParamsSchema` |
 * | `*Example` | examples | `UserExample` |
 * | `*RequestBody` | requestBodies | `CreateUserRequestBody` |
 * | `*HeaderSchema` | headers | `AuthHeaderSchema` |
 * | `*SecurityScheme` | securitySchemes | `BearerSecurityScheme` |
 * | `*Link` | links | `GetUserLink` |
 * | `*Callback` | callbacks | `WebhookCallback` |
 * | `*PathItem` | pathItems | `UserPathItem` |
 * | `*MediaTypeSchema` | mediaTypes | `JsonMediaTypeSchema` |
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
/** Valid JavaScript identifier pattern (e.g., `UserSchema`, `_private`, `$special`) */
const JS_IDENT = '[A-Za-z_$][A-Za-z0-9_$]*'

/**
 * OpenAPI component-type → identifier suffix table.
 * Ordered per OpenAPI 3.0/3.1 spec — also defines emitted import order.
 */
const COMPONENT_SUFFIXES = [
  ['schemas', 'Schema'],
  ['responses', 'Response'],
  ['parameters', 'ParamsSchema'],
  ['examples', 'Example'],
  ['requestBodies', 'RequestBody'],
  ['headers', 'HeaderSchema'],
  ['securitySchemes', 'SecurityScheme'],
  ['links', 'Link'],
  ['callbacks', 'Callback'],
  ['pathItems', 'PathItem'],
  ['mediaTypes', 'MediaTypeSchema'],
] as const

/**
 * Single regex that simultaneously SKIPS strings/comments and CAPTURES
 * component-type identifiers. The string / comment alternatives come first
 * so the engine consumes them whole — identifier-shape tokens hiding inside
 * (e.g. `operationId: 'userCreatedCallback'`) are unreachable because the
 * preceding alternative has already consumed the surrounding quotes and
 * everything between them.
 */
const SCAN = new RegExp(
  [
    String.raw`"(?:\\.|[^"\\])*"`,
    String.raw`'(?:\\.|[^'\\])*'`,
    String.raw`\`(?:\\.|[^\`\\])*\``,
    String.raw`//[^\n]*`,
    String.raw`/\*[\s\S]*?\*/`,
    `\\b(${JS_IDENT}(?:${COMPONENT_SUFFIXES.map(([, suf]) => suf).join('|')}))\\b`,
  ].join('|'),
  'g',
)

/** Pattern to find locally exported constants */
const EXPORT_CONST_PATTERN = new RegExp(`export\\s+const\\s+(${JS_IDENT})\\s*=`, 'g')

/**
 * Classifies a captured token to its component key by longest-matching suffix.
 * Why longest-match: `UserParamsSchema` ends with both `Schema` and `ParamsSchema`,
 * but only the latter correctly identifies it as a `parameters` component.
 */
function classifyToken(token: string): string | undefined {
  return COMPONENT_SUFFIXES.reduce<readonly [string, string] | undefined>(
    (best, entry) =>
      token.endsWith(entry[1]) && (!best || entry[1].length > best[1].length) ? entry : best,
    undefined,
  )?.[0]
}

export function makeImports(
  code: string,
  fromFile: string,
  components:
    | {
        readonly [k: string]: {
          readonly output: string
          readonly split?: boolean
          readonly import?: string
        }
      }
    | undefined,
  split = false,
) {
  const fallbackPrefix = split ? '..' : '.'
  const resolvePath = (k: string): string => {
    const target = components?.[k]
    return target?.import ?? (target ? makeModuleSpec(fromFile, target) : `${fallbackPrefix}/${k}`)
  }
  const defined = new Set(
    Array.from(code.matchAll(EXPORT_CONST_PATTERN), (m) => m[1]).filter(Boolean),
  )
  const needsCreateRoute = code.includes('createRoute(')
  const needsZ = code.includes('z.')
  const honoImports = [needsCreateRoute && 'createRoute', needsZ && 'z'].filter(Boolean)
  const honoLine =
    honoImports.length > 0 ? `import{${honoImports.join(',')}}from'@hono/zod-openapi'` : ''
  const tokens = [
    ...new Set(
      Array.from(code.matchAll(SCAN), (m) => m[1]).filter((t): t is string => Boolean(t)),
    ),
  ].filter((t) => !defined.has(t))
  const componentImports = COMPONENT_SUFFIXES.flatMap(([key]) => {
    const matched = tokens.filter((t) => classifyToken(t) === key).sort()
    return matched.length > 0 ? [renderNamedImport(matched, resolvePath(key))] : []
  })
  return [honoLine, ...componentImports, '\n', code, ''].filter(Boolean).join('\n')
}
