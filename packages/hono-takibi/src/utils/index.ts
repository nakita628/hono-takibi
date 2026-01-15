/**
 * Normalize a JSON Schema `type` value into an array of type strings.
 *
 * @param t - JSON Schema `type` as a single value or an array of values.
 * @returns A flat array of type strings.
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
 * Generates registration code for OpenAPI `securitySchemes`.
 *
 * @param securitySchemes - Record of scheme name to scheme properties.
 * @returns Multiline string of registration statements.
 */
export function registerComponent(securitySchemes: Record<string, unknown>): string {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes','${name}',${JSON.stringify(scheme)})`
    })
    .join('\n')
}

/**
 * Checks if a value is a non-null object (record-like).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object.
 *
 * @example
 * ```ts
 * isRecord({ key: 'value' }) // true
 * isRecord(null)             // false
 * isRecord('text')           // false
 * isRecord([])               // true (arrays are objects)
 * ```
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if a value is a non-null object (e.g., a potential `$ref` object).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object.
 *
 * @example
 * ```ts
 * isRefObject({ $ref: '#/components/schemas/User' }) // true
 * isRefObject(null)                                  // false
 * isRefObject('text')                                // false
 * ```
 */
export function isRefObject(value: unknown): value is {
  readonly $ref?: string
  readonly [key: string]: unknown
} {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if a string is a valid HTTP method.
 *
 * @param method - The HTTP method to check.
 * @returns `true` if the method is a valid HTTP method; otherwise `false`.
 */
export function isHttpMethod(
  method: string,
): method is 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head' | 'trace' {
  return (
    method === 'get' ||
    method === 'put' ||
    method === 'post' ||
    method === 'delete' ||
    method === 'patch' ||
    method === 'options' ||
    method === 'head' ||
    method === 'trace'
  )
}

/**
 * Generates a PascalCase route name from HTTP method and path.
 *
 * @param method - HTTP method (e.g., 'get', 'post').
 * @param path - URL path (e.g., '/users/{id}/posts').
 * @returns A route name string (e.g., 'getUsersIdPostsRoute').
 *
 * @example
 * methodPath('get', '/users/{id}/posts') // 'getUsersIdPosts'
 */
export function methodPath(method: string, path: string): string {
  // 1. api_path: `/user/createWithList` or `/applications/@me`
  // 2. replace(/[^A-Za-z0-9]/g, ' ') -> ` user createWithList` or ` applications  me`
  // 3. trim() -> `user createWithList` or `applications  me`
  // 4. split(/\s+/) -> `['user', 'createWithList']` or `['applications', 'me']`
  // 5. map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`) -> `['User', 'CreateWithList']`
  // 6. join('') -> `UserCreateWithList` or `ApplicationsMe`
  const apiPath = path
    .replace(/[^A-Za-z0-9]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join('')
  return apiPath ? `${method}${apiPath}` : `${method}`
}

/**
 * Generates an array of Zod validator strings from OpenAPI parameter objects.
 *
 * @param parameters - An object containing `query`, `path`, and `header` parameters.
 * @returns An array of strings like `'query:z.object({...})'` or `'params:z.object({...})'`.
 */
export const requestParamsArray = (parameters: {
  readonly [k: string]: { readonly [k: string]: string }
}): readonly string[] =>
  Object.entries(parameters)
    .filter(([, obj]) => obj && Object.keys(obj).length)
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
      return `${name}:z.object({${fields}})`
    })

/**
 * Converts a string to a safe TypeScript object key.
 *
 * @param text - The string to convert to a safe identifier.
 * @returns A safe identifier string.
 *
 * @example
 * ```ts
 * getToSafeIdentifier('user')        // → 'user'
 * getToSafeIdentifier('_id')         // → '_id'
 * getToSafeIdentifier('123key')      // → '"123key"'
 * getToSafeIdentifier('hello world') // → '"hello world"'
 * getToSafeIdentifier('if')          // → 'if'
 * ```
 */
export function getToSafeIdentifier(text: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(text) ? text : JSON.stringify(text)
}

export function toIdentifierPascalCase(text: string): string {
  // Check if text contains non-ASCII characters (char code > 127)
  const hasNonAscii = Array.from(text).some((c) => c.charCodeAt(0) > 127)
  const result = text
    .replace(/[^A-Za-z0-9_$]/g, '_') // invalid character to _
    .replace(/_+/g, '_') // collapse consecutive underscores to one
    .replace(/^_+|_+$/g, '') // trim leading/trailing underscores
    .replace(/^([0-9])/, '_$1') // if starts with number, add _
    .replace(/_+([a-zA-Z])/g, (_, c) => c.toUpperCase()) // _letter to uppercase (e.g. _letter -> Letter)
    .replace(/^([a-z])/, (_, c) => c.toUpperCase()) // first letter to uppercase (e.g. letter -> Letter)
  // Fallback if result is empty or only underscores (e.g. all non-ASCII input like Japanese)
  if (!result || /^_+$/.test(result)) {
    const hash = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `Unnamed${hash}`
  }
  // If text contained non-ASCII, append hash for uniqueness
  if (hasNonAscii) {
    const hash = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `${result}${hash}`
  }
  return result
}

/**
 * Builds a named import line for a module specifier.
 *
 * @param names - Import names to include.
 * @param spec - Module specifier.
 * @param options - Optional sorting behavior.
 * @returns Import line or empty string when no names exist.
 */
export function renderNamedImport(names: readonly string[], spec: string): string {
  const unique = Array.from(new Set(names))
  return unique.length > 0 ? `import{${unique.join(',')}}from'${spec}'` : ''
}

/**
 * Finds all schema tokens in the given code.
 * @param code - The code to search for schema tokens.
 * @returns
 */
export function findSchema(code: string): readonly string[] {
  return Array.from(
    new Set(
      Array.from(code.matchAll(/\b([A-Za-z_$][A-Za-z0-9_$]*Schema)\b/g))
        .map((m) => m[1] ?? '')
        .filter(Boolean),
    ),
  )
}

/**
 * Converts the first character of a string to lowercase.
 * @param text - The string to convert to lowercase.
 * @returns
 */
export function lowerFirst(text: string): string {
  return text ? (text[0]?.toLowerCase() ?? '') + text.slice(1) : text
}

export function ensureSuffix(text: string, suffix: string): string {
  return text.endsWith(suffix) ? text : `${text}${suffix}`
}

/**
 * Generates a Zod schema constant and optional inferred type alias.
 *
 * @param schemaName - The base name of the schema (used for variable and type names)
 * @param zodSchema - The Zod schema string to assign
 * @param exportSchema - Whether to `export` the Zod schema constant
 * @param exportType - Whether to `export` the inferred type alias
 * @returns The generated code string containing the schema and optional type alias
 *
 * @example
 * zodToOpenAPISchema('User', 'z.object({name: z.string()})', true, true)
 * // → 'export const UserSchema = z.object({name: z.string()}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 */
export function zodToOpenAPISchema(
  schemaName: string,
  zodSchema: string,
  exportSchema: boolean,
  exportType: boolean,
  notComponentSchema?: boolean,
): string {
  const schemaCode = exportSchema
    ? `export const ${schemaName}=${zodSchema}`
    : `const ${schemaName}=${zodSchema}`

  // schema code
  const componentSchemaCode = exportSchema
    ? `export const ${schemaName}=${zodSchema}.openapi('${schemaName.replace('Schema', '')}')`
    : `const ${schemaName}=${zodSchema}.openapi('${schemaName.replace('Schema', '')}')`
  // zod infer code
  const zodInferCode = exportType
    ? `\n\nexport type ${schemaName.replace('Schema', '')}=z.infer<typeof ${schemaName}>`
    : ''

  if (notComponentSchema) return `${schemaCode}${zodInferCode}`
  return `${componentSchemaCode}${zodInferCode}`
}
