/**
 * Capitalizes the first letter of a string.
 *
 * @param str - Input string.
 * @returns A new string with the first letter in uppercase.
 */
export function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

/**
 * Escapes a string for safe use in TypeScript string literals.
 *
 * @param text - The input text to escape.
 * @returns The escaped string.
 */
export function escapeStringLiteral(text: string): string {
  return text
    .replace(/[\n\t]/g, ' ')
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, ' ')
    .replace(/　/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .trim()
}

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
 * Removes the `z.` prefix from a Zod schema expression string.
 *
 * @param zodSchema - A string representing a Zod schema (e.g., `"z.string()"`).
 * @returns The schema string without the `z.` prefix.
 *
 * @example
 * ```ts
 * removeZodPrefix('z.string()')
 * // → 'string()'
 *
 * removeZodPrefix('z.object({ name: z.string() })')
 * // → 'object({ name: z.string() })'
 *
 * removeZodPrefix('string()')
 * // → 'string()'
 * ```
 */
export function removeZodPrefix(zodSchema: string): string {
  return zodSchema.replace('z.', '')
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

/**
 * Removes `.max(n)` from a string if it matches the given maximum value.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param maximum - The numeric value to match in `.max(...)`.
 * @returns The string with `.max(n)` removed if present.
 *
 * @example
 * ```ts
 * stripMaxIfLtExist('z.string().max(30)', 30)
 * // → 'z.string()'
 *
 * stripMaxIfLtExist('z.string().min(1).max(100)', 100)
 * // → 'z.string().min(1)'
 *
 * stripMaxIfLtExist('z.string().min(1)', 10)
 * // → 'z.string().min(1)' (unchanged)
 * ```
 */
export function stripMaxIfLtExist(str: string, maximum: number): string {
  return str.replace(`.max(${maximum})`, '')
}

/**
 * Removes `.min(n)` from a string if it matches the given minimum value.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param minimum - The numeric value to match in `.min(...)`.
 * @returns The string with `.min(n)` removed if present.
 *
 * @example
 * ```ts
 * stripMinIfgtExist('z.string().min(1)', 1)
 * // → 'z.string()'
 *
 * stripMinIfgtExist('z.string().min(5).max(100)', 5)
 * // → 'z.string().max(100)'
 *
 * stripMinIfgtExist('z.string().max(50)', 5)
 * // → 'z.string().max(50)' (unchanged)
 * ```
 */
export function stripMinIfgtExist(str: string, minimum: number): string {
  return str.replace(`.min(${minimum})`, '')
}

/**
 * Removes `.min(...)` and `.max(...)` from a string if they match the given values.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param min - The value to match in `.min(...)`.
 * @param max - The value to match in `.max(...)`.
 * @returns The string with matching `.min(...)` and `.max(...)` removed.
 *
 * @example
 * ```ts
 * stripMinMaxExist('z.string().min(1).max(100)', 1, 100)
 * // → 'z.string()'
 *
 * stripMinMaxExist('z.string().min(1).max(50)', 1, 100)
 * // → 'z.string().max(50)' (only `.min(1)` removed)
 *
 * stripMinMaxExist('z.string().max(100)', 1, 100)
 * // → 'z.string()' (only `.max(100)` removed)
 *
 * stripMinMaxExist('z.string()', 1, 100)
 * // → 'z.string()' (unchanged)
 * ```
 */
export function stripMinMaxExist(str: string, min: number, max: number): string {
  return str.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}

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
 * getRefName('#/components/schemas/Address')
 * // → 'Address'
 *
 * getRefName('#/components/schemas/Location/Address')
 * // → 'Address'
 *
 * getRefName('#/components/schemas/Shipping/Address/Details')
 * // → 'Details'
 *
 * getRefName('')
 * // → undefined
 * ```
 */
export function getRefName($ref: `#/components/schemas/${string}`): string | undefined {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  return $ref.split('/').pop()
}
