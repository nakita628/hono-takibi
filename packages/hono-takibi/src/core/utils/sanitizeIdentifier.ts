/**
 * Converts an arbitrary string into a safe TypeScript identifier
 * by replacing invalid characters with underscores (`_`).
 *
 * This is useful when generating variable names from external strings
 * such as schema names, object keys, or user input.
 *
 * Only letters, digits, underscores, and dollar signs are allowed.
 * All other characters are replaced with `_`.
 *
 * @param str - The raw string to sanitize.
 * @returns A sanitized string that can be used as a TypeScript identifier.
 *
 * @example
 * ```ts
 * sanitizeIdentifier('foo-bar')        // 'foo_bar'
 * sanitizeIdentifier('123user@name')   // '123user_name'
 * sanitizeIdentifier('日本語')           // '___'
 * sanitizeIdentifier('post.title')     // 'post_title'
 * sanitizeIdentifier('valid_Name')     // 'valid_Name'
 * ```
 */
export function sanitizeIdentifier(str: string): string {
  return str.replace(/[^A-Za-z0-9_$]/g, '_')
}
