/**
 * Checks if a given string is a valid HTTP method.
 *
 * Narrows the type to one of the standard lowercase HTTP methods if matched.
 *
 * @param method - The string to check.
 * @returns `true` if the string is a valid HTTP method (e.g., `'get'`, `'post'`), otherwise `false`.
 *
 * @example
 * ```ts
 * isHttpMethod('get')     // true
 * isHttpMethod('POST')    // false (case-sensitive)
 * isHttpMethod('delete')  // true
 * isHttpMethod('foobar')  // false
 * ```
 *
 * @remarks
 * - This check is case-sensitive; `'GET'` will return `false`.
 * - Returns a type predicate for narrowing: `method is HttpMethod`.
 */
export function isHttpMethod(
  method: string,
): method is 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace' {
  return (
    method === 'get' ||
    method === 'post' ||
    method === 'put' ||
    method === 'delete' ||
    method === 'patch' ||
    method === 'options' ||
    method === 'head' ||
    method === 'trace'
  )
}
