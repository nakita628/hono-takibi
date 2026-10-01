const RESERVED = new Set([
  'api',
  'app',
  'client',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'let',
  'static',
  'yield',
  'await',
])

/**
 * Whether a name can be the export of a group: an identifier that is no word the language
 * or the generated app has taken.
 */
export function isGroupName(name: string | undefined): name is string {
  return (
    name !== undefined &&
    /^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(name) &&
    !RESERVED.has(name) &&
    !name.startsWith('__') &&
    !name.endsWith('Route') &&
    !name.endsWith('Handler')
  )
}

/**
 * The group an operation belongs to, or `undefined` when it belongs to none and is a route
 * of `api`. What divides an application depends on how the template writes it.
 */
export type Grouping = (path: string, tags: readonly string[] | undefined) => string | undefined

/** The string tags of an operation, as a {@link Grouping} reads them. */
export function operationTags(operation: object): readonly string[] | undefined {
  const tags: unknown = 'tags' in operation ? operation.tags : undefined
  return Array.isArray(tags) ? tags.filter((tag) => typeof tag === 'string') : undefined
}

/** The export a group's client is reached by: `books` through `booksClient`. */
export function groupClientName(group: string) {
  return `${group}Client`
}
