/**
 * Check if a string is a valid HTTP method
 * @param { string } method - The string to check against valid HTTP methods
 * @returns { boolean } True if the string is a valid HTTP method, with type narrowing to HttpMethod
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
