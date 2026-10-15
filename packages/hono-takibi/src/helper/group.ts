import { isValidIdent } from '../guard/index.js'

// What cannot be declared: the words of the language, strict mode's included (a module is
// strict), and the two names strict mode refuses to bind. Nothing of the generated files is
// here: a group named after one of their bindings (`app`, `hc`, `client`) has that binding
// renamed or aliased instead, so that any identifier a document uses can be a group.
const RESERVED = new Set([
  'arguments',
  'await',
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
  'eval',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'static',
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
  'yield',
])

/**
 * Whether a name can be the export of a group: an identifier that is no word of the language,
 * and none a route or a handler is imported under.
 */
export function isGroupName(name: string): boolean
export function isGroupName(name: string | undefined): name is string
export function isGroupName(name: string | undefined) {
  return (
    name !== undefined &&
    isValidIdent(name) &&
    !RESERVED.has(name) &&
    !name.endsWith('Route') &&
    !name.endsWith('Handler')
  )
}

/**
 * The group an operation belongs to. Every operation belongs to one: the resource its path
 * or tag names, or `root`. What divides an application depends on how the template writes
 * it.
 */
export type Grouping = (path: string, tags: readonly string[] | undefined) => string

/**
 * The group of a handler file: its name. A name that cannot be an export, a word of the
 * language like `delete`, is prefixed with `__`, as the file of the root `/` is named
 * `__root` already: a resource is named with letters and digits alone, so a name that
 * starts with `__` is never one, and never in its way.
 */
export function groupNameOf(file: string) {
  return isGroupName(file) ? file : `__${file}`
}

/** The string tags of an operation, as a {@link Grouping} reads them. */
export function operationTags(operation: object): readonly string[] | undefined {
  const tags: unknown = 'tags' in operation ? operation.tags : undefined
  return Array.isArray(tags) ? tags.filter((tag) => typeof tag === 'string') : undefined
}

/**
 * A name free of the ones taken: `base` itself, or `base` followed by the first number from
 * 2 on that no one has. What the generated files bind for themselves (`app`, `hc`) is named
 * this way, so that a group of the same name keeps it.
 *
 * @example
 * ```ts
 * freeName('app', ['books'])        // 'app'
 * freeName('app', ['app'])          // 'app2'
 * freeName('app', ['app', 'app2'])  // 'app3'
 * ```
 */
export function freeName(base: string, taken: Iterable<string>) {
  const names = new Set(taken)
  if (!names.has(base)) return base
  const free = (n: number): string =>
    names.has(`${base}${n}`) ? free(n + 1) : (`${base}${n}` as const)
  return free(2)
}

/**
 * The names the app entry binds for itself: `app`, the app the routes are registered on,
 * and `OpenAPIHono`, the import. Neither is an export. Each yields to a group of its name,
 * so that `/app` and `/OpenAPIHono` can be groups: `app2`, `OpenAPIHono2`.
 *
 * @example
 * ```ts
 * entryNames(['books'])              // { app: 'app', hono: 'OpenAPIHono' }
 * entryNames(['app', 'OpenAPIHono']) // { app: 'app2', hono: 'OpenAPIHono2' }
 * ```
 */
export function entryNames(groups: Iterable<string>) {
  const taken = [...groups]
  return { app: freeName('app', taken), hono: freeName('OpenAPIHono', taken) } as const
}

/** The export a group's client is reached by: `books` through `booksClient`. */
export function makeGroupClientName(group: string) {
  return `${group}Client` as const
}
