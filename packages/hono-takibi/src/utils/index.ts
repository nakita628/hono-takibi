import { ARROW_FUNCTION_PATTERN, IDENTIFIER_PATTERN } from '../constants/index.js'
import type { HTTP_METHODS } from '../constants/index.js'
/**
 * Normalize a JSON Schema `type` value into an array of type strings.
 */
export function normalizeTypes(
  t?:
    | 'string'
    | 'number'
    | 'integer'
    | 'date'
    | 'boolean'
    | 'array'
    | 'object'
    | 'null'
    | [
        'string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null',
        ...('string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null')[],
      ],
) {
  return t === undefined ? [] : Array.isArray(t) ? t : [t]
}

/**
 * Generates a PascalCase route name from HTTP method and path.
 *
 *
 * @example
 * methodPath('get', '/users/{id}/posts') // 'getUsersIdPosts'
 */
export function methodPath(method: string, path: string) {
  const hasTrailingSlash = path !== '/' && path.endsWith('/')
  const apiPath = path
    .split('/')
    .filter((segment) => segment !== '')
    .map((segment) =>
      // A segment with no letter or digit (GitLab's `/-/`) would otherwise contribute
      // nothing, and `/groups/{id}/epics` and `/groups/{id}/-/epics` would share a name.
      /[A-Za-z0-9]/u.test(segment)
        ? segment.replaceAll(/[^A-Za-z0-9]/gu, ' ')
        : Array.from(segment, symbolWord).join(' '),
    )
    .join(' ')
    .trim()
    .split(/\s+/u)
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join('')
  const suffix = hasTrailingSlash ? 'Index' : ''
  return apiPath ? (`${method}${apiPath}${suffix}` as const) : method
}

/**
 * `methodPath`, made unique within a document. Two paths that differ only in separators
 * or case (`/billable-usage` and `/billable/usage`, `/indicator-types` and
 * `/indicatorTypes`) share a name; the first in document order keeps it, and every later
 * one is numbered (`getEventsIndicatorTypes2`). The number comes from the path alone, so
 * every method of the same path, and every generator that names a route, a handler, a
 * client function or a hook after it, agrees.
 *
 * @example
 * routeName('get', '/events/indicatorTypes', { '/events/indicator-types': {}, '/events/indicatorTypes': {} })
 * // 'getEventsIndicatorTypes2'
 */
export function routeName(method: string, path: string, paths: { readonly [k: string]: unknown }) {
  const ordinal = pathOrdinals(paths).get(path) ?? 0
  const name = methodPath(method, path)
  return ordinal === 0 ? name : `${name}${ordinal + 1}`
}

// Answered once per document: the paths are read in order and each is given its place among
// those it shares a name with. Keyed on the object itself, so the same document reads the same.
const PATH_ORDINALS = new WeakMap<object, ReadonlyMap<string, number>>()

function pathOrdinals(paths: { readonly [k: string]: unknown }) {
  const known = PATH_ORDINALS.get(paths)
  if (known !== undefined) return known
  const seen = new Map<string, number>()
  const ordinals = new Map<string, number>()
  for (const path of Object.keys(paths)) {
    const name = methodPath('', path)
    const count = seen.get(name) ?? 0
    seen.set(name, count + 1)
    ordinals.set(path, count)
  }
  PATH_ORDINALS.set(paths, ordinals)
  return ordinals
}

const SYMBOL_WORDS: { readonly [k: string]: string } = {
  '-': 'Dash',
  _: 'Underscore',
  '.': 'Dot',
  '~': 'Tilde',
  '@': 'At',
  $: 'Dollar',
  '!': 'Bang',
  '*': 'Star',
  '+': 'Plus',
  ',': 'Comma',
  ';': 'Semicolon',
  '=': 'Equals',
  ':': 'Colon',
  '%': 'Percent',
}

/** The word a path segment of punctuation alone is named by, one per character. */
function symbolWord(char: string) {
  return SYMBOL_WORDS[char] ?? `U${(char.codePointAt(0) ?? 0).toString(16).toUpperCase()}`
}

/**
 * Generates an array of Zod validator strings from OpenAPI parameter objects.
 */
export function requestParamsArray(
  parameters: {
    readonly [k: string]: { readonly [k: string]: string }
  },
  // A function, as source, that a section runs over the request before it validates it.
  gather: { readonly [section: string]: string } = {},
) {
  return Object.freeze(
    Object.entries(parameters)
      .filter(([, obj]) => obj && Object.keys(obj).length > 0)
      .map(([section, obj]) => {
        const name =
          section === 'path'
            ? 'params'
            : section === 'header'
              ? 'headers'
              : section === 'cookie'
                ? 'cookies'
                : section
        const fields = Object.entries(obj)
          .map(([k, v]) => `${k}:${v}`)
          .join(',')
        const before = gather[section]
        return before === undefined
          ? (`${name}:z.object({${fields}})` as const)
          : (`${name}:z.looseObject({}).transform(${before}).pipe(z.object({${fields}}))` as const)
      }),
  )
}

/**
 * Converts a string to a safe TypeScript object key with single quotes.
 *
 * Returns the key as-is if it's a valid JavaScript identifier.
 * Otherwise, wraps it in single quotes with proper escaping for
 * backslashes, single quotes, newlines, carriage returns, and tabs.
 *
 *
 * @example
 * ```ts
 * makeSafeKey('user')        // → 'user'
 * makeSafeKey('_id')         // → '_id'
 * makeSafeKey('123key')      // → "'123key'"
 * makeSafeKey('hello world') // → "'hello world'"
 * makeSafeKey("it's")        // → "'it\\'s'"
 * makeSafeKey('line\nbreak') // → "'line\\nbreak'"
 * ```
 */
export function makeSafeKey(key: string) {
  // `{ __proto__: x }` and `{ '__proto__': x }` set the prototype of the object instead of
  // defining a key; only a computed key defines one.
  if (key === '__proto__') return "['__proto__']"
  if (IDENTIFIER_PATTERN.test(key)) return key
  return makeStringLiteral(key)
}

/**
 * Converts a string to a single-quoted TypeScript string literal.
 *
 * Use it for every document-supplied value spliced into generated code as a
 * string (header, query, cookie and path parameter names, …): a raw `'` or
 * line break would otherwise end the literal and let the rest run as code.
 *
 *
 * @example
 * ```ts
 * makeStringLiteral('X-API-Key')  // → "'X-API-Key'"
 * makeStringLiteral("it's")       // → "'it\\'s'"
 * makeStringLiteral('a\nb')       // → "'a\\nb'"
 * ```
 */
export function makeStringLiteral(value: string) {
  const escaped = value
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\n', '\\n')
    .replaceAll('\r', '\\r')
    .replaceAll('	', '\\t')
  return `'${escaped}'` as const
}

const REGEX_LINE_TERMINATOR_ESCAPES: { readonly [k: string]: string } = {
  '\n': '\\n',
  '\r': '\\r',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

/**
 * Escapes unescaped forward slashes in a string that will be embedded inside a
 * regular-expression literal (`/.../`).
 *
 * A value taken from an OpenAPI document (`pattern`, `x-emailRegex`,
 * `x-urlProtocol`, `x-urlHostname`, …) must not be able to terminate the
 * generated literal — an unescaped `/` would close it and let arbitrary code
 * follow. Slashes already escaped (`\/`) are left untouched.
 *
 * The source is scanned as escape pairs, so a slash after an escaped backslash
 * (`\\/`) is still recognised as unescaped. Line terminators, which a regex
 * literal cannot contain, become their escape sequences (same meaning), and a
 * trailing lone backslash — which would escape the closing `/` — is doubled.
 *
 *
 * @example
 * ```ts
 * escapeRegexLiteral('^https?$')   // → '^https?$'
 * escapeRegexLiteral('a/b')        // → 'a\\/b'
 * escapeRegexLiteral('a\\/b')      // → 'a\\/b'
 * escapeRegexLiteral('a\\\\/b')    // → 'a\\\\\\/b'
 * escapeRegexLiteral('a\nb')       // → 'a\\nb'
 * ```
 */
/**
 * A `pattern` as a JavaScript regex literal: its source and flags, or `undefined` when no
 * literal can stand for it. A leading inline flag group, `(?i)` / `(?s)` / `(?m)` (PCRE,
 * which JavaScript has not), becomes the flag; a PCRE hex escape in braces, `\x{FFFF}`,
 * becomes `\uFFFF`, or `\u{10FFFF}` with `u` above the BMP (#386); `\p{..}` asks for `u`.
 * What is left is compiled once here: a pattern JavaScript rejects (`(?x)`, a possessive
 * quantifier) would otherwise be written into a literal that keeps the whole file from
 * parsing (#370).
 *
 * @example
 * regexLiteral('(?i)^(pay|details)$') // { source: '^(pay|details)$', flags: 'i' }
 * regexLiteral('^[\\x00-\\x{FFFF}]*$') // { source: '^[\\x00-\\uFFFF]*$', flags: '' }
 * regexLiteral('a++') // undefined
 */
export function regexLiteral(pattern: string) {
  const inline = pattern.match(/^\(\?([a-z]+)\)/u)
  const letters = inline?.[1] ?? ''
  // `x` (ignore whitespace) and the rest have no JavaScript flag: no literal says the same.
  if (letters.split('').some((letter) => !'ims'.includes(letter))) return undefined
  const hex = hexBraceEscapes(inline === null ? pattern : pattern.slice(inline[0].length))
  if (hex === undefined) return undefined
  const { source } = hex
  const flags = [
    ...new Set([...letters.split(''), ...(hex.astral || /\\[pP]\{/u.test(source) ? ['u'] : [])]),
  ].join('')
  try {
    return { source, flags: new RegExp(source, flags).flags } as const
  } catch {
    return undefined
  }
}

/**
 * The source with every PCRE hex escape in braces, `\x{FFFF}`, written as the JavaScript
 * escape of the same character: `\uFFFF` up to U+FFFF, `\u{10FFFF}` above it, which only
 * the `u` flag reads (`astral`). Without the flag JavaScript reads `\x{` as the letter `x`
 * followed by `{`, and TypeScript rejects the literal (#386). A code above U+10FFFF is no
 * character: `undefined`. The source is read as escape pairs, so an escaped backslash
 * before `x{` is left alone.
 */
function hexBraceEscapes(source: string) {
  let astral = false
  let invalid = false
  const rewritten = source.replaceAll(
    /\\([\s\S])(\{([0-9A-Fa-f]{1,8})\})?/gu,
    (match: string, escaped: string, _brace: string | undefined, digits: string | undefined) => {
      if (escaped !== 'x' || digits === undefined) return match
      const code = Number.parseInt(digits, 16)
      if (code > 0x10_ff_ff) {
        invalid = true
        return match
      }
      if (code > 0xff_ff) {
        astral = true
        return `\\u{${code.toString(16).toUpperCase()}}`
      }
      return `\\u${code.toString(16).toUpperCase().padStart(4, '0')}`
    },
  )
  return invalid ? undefined : ({ source: rewritten, astral } as const)
}

export function escapeRegexLiteral(source: string) {
  return source.replaceAll(
    /\\([\s\S]?)|[/\n\r\u2028\u2029]/gu,
    (match: string, escaped: string | undefined) => {
      if (escaped === undefined) {
        return match === '/' ? '\\/' : (REGEX_LINE_TERMINATOR_ESCAPES[match] ?? match)
      }
      if (escaped === '') return '\\\\'
      return REGEX_LINE_TERMINATOR_ESCAPES[escaped] ?? match
    },
  )
}

/**
 * Escapes the HTML special characters in a string that will be embedded as
 * element text or inside a double-quoted attribute value (`<a href="...">`).
 *
 * Free-form OpenAPI fields (`info.title`, `servers[].url`, `info.contact`,
 * `info.license`, tag names, …) flow into the generated documentation's HTML.
 * Without escaping, a `&`, `<`, `>`, or `"` in those values breaks the markup
 * (or injects elements when the docs are rendered). `'` is intentionally left
 * untouched — it needs no escaping in text or double-quoted attributes, and
 * escaping it would needlessly churn output for values like `Bob's API`.
 *
 *
 * @example
 * ```ts
 * escapeHtml('My API')             // → 'My API'
 * escapeHtml('a?x=1&y=2')          // → 'a?x=1&amp;y=2'
 * escapeHtml('"><script>')         // → '&quot;&gt;&lt;script&gt;'
 * ```
 */
export function escapeHtml(source: string) {
  return source
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/**
 * Converts a string to a valid PascalCase TypeScript identifier.
 *
 * Handles special characters, numbers at the start, and non-ASCII characters
 * by sanitizing and transforming the input.
 *
 *
 * @example
 * ```ts
 * toIdentifierPascalCase('user-name')     // → 'UserName'
 * toIdentifierPascalCase('123_value')     // → '_123Value'
 * toIdentifierPascalCase('hello_world')   // → 'HelloWorld'
 * toIdentifierPascalCase('日本語')         // → 'Unnamed12345' (hash-based fallback)
 * ```
 */
export function toIdentifierPascalCase(text: string) {
  // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
  const hasNonAscii = [...text].some((c) => c.charCodeAt(0) > 127)
  const result = text
    .replaceAll(/[^A-Za-z0-9_$]/gu, '_')
    .replaceAll(/_+/gu, '_')
    .replaceAll(/^_+|_+$/gu, '')
    .replace(/^([0-9])/u, '_$1')
    .replaceAll(/_+([a-zA-Z])/gu, (_: string, c: string) => c.toUpperCase())
    .replace(/^([a-z])/u, (_: string, c: string) => c.toUpperCase())
  if (!result || /^_+$/u.test(result)) {
    // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
    const hash = [...text].reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `Unnamed${String(hash)}` as const
  }
  if (hasNonAscii) {
    // oxlint-disable-next-line typescript/no-misused-spread -- code-point iteration is intended
    const hash = [...text].reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `${result}${String(hash)}` as const
  }
  return result
}

/**
 * Builds a named import line for a module specifier.
 * Returns an empty string when there are no names to import.
 */
export function renderNamedImport(names: readonly string[], spec: string) {
  const unique = [...new Set(names)]
  return unique.length > 0 ? (`import{${unique.join(',')}}from'${spec}'` as const) : ('' as const)
}

/**
 * Converts the first character of a string to lowercase.
 *
 * @example
 * ```ts
 * uncapitalize('Hello')  // → 'hello'
 * uncapitalize('ABC')    // → 'aBC'
 * uncapitalize('')       // → ''
 * ```
 */
export function uncapitalize(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1)
}

/**
 * Lower-cases the leading word of a PascalCase identifier, keeping an acronym whole:
 * `Users` → `users`, `APIKeys` → `apiKeys`, `ZodOpenAPIHono` → `zodOpenAPIHono`.
 */
export function uncapitalizeWord(text: string) {
  return text.replace(/^[A-Z]+(?=[A-Z][a-z]|[^A-Za-z]|$)|^[A-Z]/u, (m) => m.toLowerCase())
}

/**
 * Converts the first character of a string to uppercase.
 *
 * @example
 * ```ts
 * capitalize('hello')  // → 'Hello'
 * capitalize('abc')    // → 'Abc'
 * capitalize('')       // → ''
 * ```
 */
export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Appends a suffix to a string unconditionally.
 *
 * Always concatenates the suffix to ensure unique variable names even when
 * the original name already ends with the suffix (e.g., an OpenAPI schema
 * named `UserSchema` must produce the variable `UserSchemaSchema`).
 *
 *
 * @example
 * ```ts
 * ensureSuffix('User', 'Schema')           // → 'UserSchema'
 * ensureSuffix('UserSchema', 'Schema')     // → 'UserSchemaSchema'
 * ensureSuffix('file', '.ts')              // → 'file.ts'
 * ```
 */
export function ensureSuffix(text: string, suffix: string) {
  return `${text}${suffix}` as const
}

/**
 * Undoes the percent-encoding of one `$ref` segment. A segment that is not valid
 * percent-encoding (`Foo%ZZ`) is kept as it is: no `$ref` makes the generator throw, it
 * just names a component that is not there.
 */
export function decodePercent(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/**
 * Generates a Zod schema constant and optional inferred type alias.
 *
 *
 * @example
 * zodToOpenAPISchema('User', 'z.object({name: z.string()})', true, true)
 * // → 'export const UserSchema = z.object({name: z.string()}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 *
 * `.readonly()` is no concern of this function: `zodToOpenAPI` puts it on the objects and
 * arrays of a schema when asked, and a scalar never takes it. `Readonly<number>` is `number`,
 * but on a branded scalar `.readonly()` wraps the brand and loses the primitive.
 */
export function zodToOpenAPISchema(
  schemaName: string,
  zodSchema: string,
  exportSchema: boolean,
  exportType: boolean,
  notComponentSchema?: boolean,
) {
  const schemaCode = exportSchema
    ? (`export const ${schemaName}=${zodSchema}` as const)
    : (`const ${schemaName}=${zodSchema}` as const)
  const typeName = schemaName.replace(/Schema$/u, '')
  const componentSchemaCode = exportSchema
    ? (`export const ${schemaName}=${zodSchema}.openapi('${typeName}')` as const)
    : (`const ${schemaName}=${zodSchema}.openapi('${typeName}')` as const)
  const zodInferCode = exportType
    ? (`\n\nexport type ${typeName}=z.infer<typeof ${schemaName}>` as const)
    : ('' as const)
  if (notComponentSchema) return `${schemaCode}${zodInferCode}` as const
  return `${componentSchemaCode}${zodInferCode}` as const
}

/**
 * Generates a barrel file content with sorted export statements.
 *
 *
 * @example
 * ```ts
 * makeBarrel({ User: {}, Post: {}, Comment: {} })
 * // Returns:
 * // "export * from './comment'\nexport * from './post'\nexport * from './user'\n"
 * ```
 */
export function makeBarrel(value: { readonly [k: string]: unknown }) {
  return `${Object.keys(value)
    .toSorted()
    .map((k) => `export * from './${k.charAt(0).toLowerCase() + k.slice(1)}'`)
    .join('\n')}\n`
}

/**
 * Formats an error message argument using the Zod v4 unified `error` parameter.
 *
 *
 * @example
 * ```ts
 * error('Name must be 3-20 characters')
 * // → '{error:"Name must be 3-20 characters"}'
 * ```
 */
export function error(message: string) {
  if (ARROW_FUNCTION_PATTERN.test(message)) {
    return `{error:${message}}` as const
  }
  return `{error:${JSON.stringify(message)}}` as const
}

/**
 * Builds the base `{error:...}` argument for a Zod v4 schema constructor when
 * either or both of `x-error-message` (type / generic) and `x-required-message`
 * (input is undefined) are present.
 *
 * Combined behavior uses Zod's issue-aware function form:
 * `{ error: (issue) => issue.input === undefined ? required : type }`.
 */
export function baseError(typeMessage: string | undefined, requiredMessage: string | undefined) {
  if (requiredMessage === undefined && typeMessage === undefined) return '' as const
  if (requiredMessage === undefined && typeMessage !== undefined) return error(typeMessage)
  if (requiredMessage !== undefined && typeMessage === undefined) {
    return `{error:(issue)=>issue.input===undefined?${JSON.stringify(requiredMessage)}:undefined}` as const
  }
  return `{error:(issue)=>issue.input===undefined?${JSON.stringify(requiredMessage)}:${JSON.stringify(typeMessage)}}` as const
}

export function statusCodeToNumber(statusCode: string) {
  if (statusCode === 'default') return 200
  if (statusCode.toUpperCase().endsWith('XX')) return Number.parseInt(statusCode[0], 10) * 100
  return Number.parseInt(statusCode, 10)
}

export function makeInferRequestType(
  clientName: string,
  pathResult: {
    runtimePath: string
    typeofPrefix: string
    bracketSuffix: string
    hasBracket: boolean
  },
  method: (typeof HTTP_METHODS)[number],
) {
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = pathResult
  return hasBracket
    ? (`InferRequestType<typeof ${clientName}${typeofPrefix}${bracketSuffix}['$${method}']>` as const)
    : (`InferRequestType<typeof ${clientName}${runtimePath}.$${method}>` as const)
}

export function cyclicNodes(deps: ReadonlyMap<string, readonly string[]>) {
  const indices = new Map<string, number>()
  const lowLinks = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const result = new Set<string>()
  const open = (node: string) => {
    const index = indices.size
    indices.set(node, index)
    lowLinks.set(node, index)
    stack.push(node)
    onStack.add(node)
  }
  const close = (node: string) => {
    if (lowLinks.get(node) !== indices.get(node)) return
    const sccStart = stack.lastIndexOf(node)
    const scc = stack.slice(sccStart)
    stack.length = sccStart
    for (const member of scc) {
      onStack.delete(member)
    }
    if (scc.length > 1 || (deps.get(node) ?? []).includes(node)) {
      for (const member of scc) {
        result.add(member)
      }
    }
  }
  const connect = (root: string) => {
    open(root)
    const frames = [{ node: root, depIndex: 0 }]
    while (frames.length > 0) {
      const frame = frames.at(-1)
      if (frame === undefined) return
      const dep = (deps.get(frame.node) ?? [])[frame.depIndex]
      if (dep === undefined) {
        close(frame.node)
        frames.length -= 1
        const parent = frames.at(-1)
        if (parent) {
          lowLinks.set(
            parent.node,
            Math.min(lowLinks.get(parent.node) ?? 0, lowLinks.get(frame.node) ?? 0),
          )
        }
        continue
      }
      frame.depIndex += 1
      if (!indices.has(dep)) {
        open(dep)
        frames.push({ node: dep, depIndex: 0 })
      } else if (onStack.has(dep)) {
        lowLinks.set(frame.node, Math.min(lowLinks.get(frame.node) ?? 0, indices.get(dep) ?? 0))
      }
    }
  }
  for (const node of deps.keys()) {
    if (!indices.has(node)) connect(node)
  }
  return result
}
