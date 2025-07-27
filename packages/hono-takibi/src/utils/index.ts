/* ========================================================================== *
 *  CLI Argument Parsing
 * ========================================================================== */

/**
 * Gets the value following a CLI flag.
 *
 * @param args - CLI arguments.
 * @param flag - The flag to look for.
 * @returns The flag's value, or `undefined` if not found.
 */
export function getFlagValue(args: readonly string[], flag: string): string | undefined {
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
  return undefined
}

/**
 * Checks if a CLI flag is present.
 *
 * @param args - CLI arguments.
 * @param f - The flag to check.
 * @returns `true` if present, `false` otherwise.
 */
export function hasFlag(args: readonly string[], f: string): boolean {
  return args.includes(f)
}

/**
 * Determines whether help was requested.
 *
 * @param args - CLI arguments.
 * @returns `true` if `--help` or `-h` is the only argument.
 */
export function isHelpRequested(args: readonly string[]): boolean {
  return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
}

/**
 * Slices off the first two CLI arguments (`node` and script path).
 *
 * @param argv - Full process arguments.
 * @returns User-supplied arguments.
 */
export function sliceArgv(argv: readonly string[]): string[] {
  return argv.slice(2)
}

/* ========================================================================== *
 *  OpenAPI $ref
 * ========================================================================== */

/**
 * Extracts the type name from an OpenAPI `$ref` string.
 *
 * Returns the last segment of the path, typically the schema name.
 *
 * @param $ref - A reference path like `#/components/schemas/Address`.
 * @returns The extracted type name, or `undefined` if invalid.
 *
 * @example
 * ```ts
 * refName('#/components/schemas/Address')
 * // → 'Address'
 * ```
 */
export function refName($ref: `#/components/schemas/${string}`): string | undefined {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  return $ref.split('/').pop()
}

/* ========================================================================== *
 *  Route Naming
 * ========================================================================== */

/**
 * Generates a PascalCase route name from HTTP method and path.
 *
 * @param method - HTTP method (e.g., 'get', 'post').
 * @param path - URL path (e.g., '/users/{id}/posts').
 * @returns A route name string (e.g., 'getUsersIdPostsRoute').
 *
 * @example
 * routeName('get', '/users/{id}/posts') // 'getUsersIdPostsRoute'
 */
export function routeName(method: string, path: string): string {
  // 1. api_path: `/user/createWithList`
  // 2. replace(/[\/{}-]/g, ' ') -> ` user createWithList`
  // 3. trim() -> `user createWithList`
  // 4. split(/\s+/) -> `['user', 'createWithList']`
  // 5. map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`) -> `['User', 'CreateWithList']`
  // 6. join('') -> `UserCreateWithList`
  const apiPath = path
    .replace(/[/{}._-]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join('')
  return `${method}${apiPath}Route`
}

/* ========================================================================== *
 *  String Escaping
 * ========================================================================== */

/**
 * Escapes a string for safe use in TypeScript string literals.
 *
 * @param text - The input text to escape.
 * @returns The escaped string.
 */
export function escapeStringLiteral(text: string): string {
  return text
    .replace(/[\n\t]/g, ' ')
    .replace(/\u200B|\u200C|\u200D|\uFEFF/g, ' ')
    .replace(/　/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .trim()
}

/* ========================================================================== *
 *  Identifier
 * ========================================================================== */

/**
 * Converts a string to a safe TypeScript object key.
 *
 * Returns the string as-is if it is a valid identifier.
 * Otherwise, it wraps the string in quotes using `JSON.stringify`.
 *
 * @param str - The string to convert.
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
export function getToSafeIdentifier(str: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(str) ? str : JSON.stringify(str)
}

/**
 * Converts a string to a safe TypeScript identifier.
 *
 * Replaces invalid characters with `_`, allowing only letters, digits, `_`, and `$`.
 *
 * @param str - The raw string to sanitize.
 * @returns A valid identifier string.
 *
 * @example
 * ```ts
 * sanitizeIdentifier('foo-bar')        // → 'foo_bar'
 * sanitizeIdentifier('123user@name')   // → '123user_name'
 * sanitizeIdentifier('日本語')           // → '___'
 * sanitizeIdentifier('post.title')     // → 'post_title'
 * sanitizeIdentifier('valid_Name')     // → 'valid_Name'
 * ```
 */
export function sanitizeIdentifier(str: string): string {
  return str.replace(/[^A-Za-z0-9_$]/g, '_')
}

/* ========================================================================== *
 *  Zod Chain Optimisation
 * ========================================================================== */

/**
 * Removes the redundant `.max(<n>)` segment **when the same numeric value
 * is already enforced via a stricter `.lt(<n>)`** within the same
 * string-encoded Zod (or similar) validation chain.
 *
 * @param chain    - The validation chain as a string
 * @param maximum  - The numeric argument supplied to `.max()`
 * @returns A new string with the matching `.max(maximum)` removed.
 *
 * @example
 * ```ts
 * removeMaxIfLtExists("z.number().max(1).lt(1)", 1)
 * // → "z.number().lt(1)"
 * ```
 */
export function removeMaxIfLtExists(chain: string, maximum: number): string {
  return chain.replace(`.max(${maximum})`, '')
}

/**
 * Removes the redundant `.min(<n>)` segment **when the same numeric value
 * is already enforced via a stricter `.gt(<n>)`** within the same
 * string-encoded validation chain.
 *
 * @param chain    - The validation chain as a string
 * @param minimum  - The numeric argument supplied to `.min()`
 * @returns A new string with the matching `.min(minimum)` removed.
 *
 * @example
 * ```ts
 * removeMinIfGtExists("z.number().min(1).gt(1)", 1)
 * // → "z.number().gt(1)"
 * ```
 */
export function removeMinIfGtExists(chain: string, minimum: number): string {
  return chain.replace(`.min(${minimum})`, '')
}

/**
 * Removes both `.min(<n>).max(<n>)` segments **when the lower and upper
 * bounds are identical**, because a single `.length(<n>)` conveys the same
 * constraint more concisely for strings, or the bounds are otherwise
 * redundant.
 *
 * @param chain - The validation chain as a string
 * @param min   - The numeric argument supplied to `.min()`
 * @param max   - The numeric argument supplied to `.max()` (should equal `min`)
 * @returns A new string without the matched `.min(min)` and `.max(max)`.
 *
 * @example
 * ```ts
 * removeMinMaxIfEqual("z.string().min(1).max(1)", 1, 1)
 * // → "z.string()"
 * ```
 */
export function removeMinMaxIfEqual(chain: string, min: number, max: number): string {
  return chain.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}

/* ========================================================================== *
 *  Zod Schema
 * ========================================================================== */

/**
 * Returns a string literal representing a Zod array schema.
 *
 * @param itemSchema - A stringified Zod schema for the array elements
 *                     (e.g. `'Address'`, `'z.string().min(3)'`).
 * @returns A string such as `'z.array(Address)'` or
 *          `'z.array(z.string().min(3))'`.
 *
 * @example
 * ```ts
 * array('z.string()');       // → 'z.array(z.string())'
 * array('User');             // → 'z.array(User)'
 * ```
 */
export function array(itemSchema: string): string {
  return `z.array(${itemSchema})`
}

/**
 * Prepends `z.coerce.` to a stringified Zod schema, transforming
 * `z.type()` into `z.coerce.type()`.
 *
 * @param rawSchema - Any string that starts with `'z.'`.
 * @returns The coerced schema string.
 *
 * @example
 * ```ts
 * coerce('z.string()');            // → 'z.coerce.string()'
 * coerce('z.number().min(1)');     // → 'z.coerce.number().min(1)'
 * ```
 */
export function coerce(rawSchema: string): string {
  return `z.coerce.${rawSchema.replace('z.', '')}`
}

/**
 * Appends a `.default()` clause to a Zod validation chain.
 *
 * @param value - The default value. It is JSON-stringified verbatim.
 * @returns A string like `'.default("guest")'` or `'.default(0)'`.
 *
 * @example
 * ```ts
 * _default('guest');   // → '.default("guest")'
 * _default(0);         // → '.default(0)'
 * ```
 */
export function _default(value: unknown): string {
  return `.default(${JSON.stringify(value)})`
}

/**
 * Appends `.gt(<n>)` ( exclusive “greater than” ) to a validation chain.
 *
 * @param exclusiveMin - The lower bound (exclusive).
 * @returns A string such as `'.gt(42)'`.
 */
export function gt(exclusiveMin: number): string {
  return `.gt(${exclusiveMin})`
}

/**
 * Builds `z.intersection(schemaA, schemaB, …)` for two or more schemas.
 *
 * @param schemas - Stringified schemas to be intersected.
 * @returns A single `z.intersection()` expression.
 *
 * @example
 * ```ts
 * intersection(['SchemaA', 'SchemaB']);
 * // → 'z.intersection(SchemaA,SchemaB)'
 * ```
 */
export function intersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}

/**
 * Appends `.length(<n>)` ( exact length ) to a validation chain.
 *
 * @param len - The required length.
 * @returns A string like `'.length(5)'`.
 */
export function length(len: number): string {
  return `.length(${len})`
}

/**
 * Appends `.lt(<n>)` ( exclusive “less than” ) to a validation chain.
 *
 * @param exclusiveMax - The upper bound (exclusive).
 * @returns A string such as `'.lt(99)'`.
 */
export function lt(exclusiveMax: number): string {
  return `.lt(${exclusiveMax})`
}

/**
 * Appends `.max(<n>)` ( inclusive maximum ) to a validation chain.
 *
 * @param maxValue - The upper bound (inclusive).
 * @returns A string like `'.max(100)'`.
 */
export function max(maxValue: number): string {
  return `.max(${maxValue})`
}

/**
 * Appends `.min(<n>)` ( inclusive minimum ) to a validation chain.
 *
 * @param minValue - The lower bound (inclusive).
 * @returns A string like `'.min(1)'`.
 */
export function min(minValue: number): string {
  return `.min(${minValue})`
}

/**
 * Produces `z.object({ … }).partial()` while stripping pre-existing
 * `.optional()` from individual property strings.
 *
 * @param properties - Array entries in the form `'key: z.string().optional()'`.
 * @returns A string such as `'z.object({key:z.string()}).partial()'`.
 */
export function partial(properties: string[]): string {
  const cleanProperties = properties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}

/**
 * Appends a properly escaped `.regex(/pattern/)` clause.
 *
 * Any unescaped forward-slash within the pattern is escaped so the final
 * string remains a valid JavaScript RegExp literal.
 *
 * @param pattern - A raw regex pattern **without** the surrounding slashes.
 * @returns A string like `'.regex(/^[a-z]+$/)'`.
 */
export function regex(pattern: string): string {
  return `.regex(/${pattern.replace(/(?<!\\)\//g, '\\/')}/)`
}

/**
 * Builds a `z.object({ … })` expression from a plain record.
 *
 * @param properties - Key/value pairs where each value is a Zod type string.
 * @returns A string such as `'z.object({name:z.string(),age:z.number()})'`.
 */
export function schema(properties: Record<string, string>): string {
  return `z.object({${Object.entries(properties)
    .map(([key, val]) => `${key}:${val}`)
    .join(',')}})`
}

/**
 * Replaces occurrences of `'boolean'` with `'stringbool'` inside a schema
 * string. Useful when generating “boolean‐as‐string” validations.
 *
 * @param source - The original Zod schema string.
 * @returns The transformed schema string.
 */
export function stringbool(schema: string): string {
  return schema.replace('boolean', 'stringbool')
}

/**
 * Builds `z.union([schemaA, schemaB, …])` from multiple schemas.
 *
 * @param schemas - Stringified Zod schemas.
 * @returns A union schema string.
 *
 * @example
 * ```ts
 * union(['A', 'B']);  // → 'z.union([A,B])'
 * ```
 */
export function union(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
