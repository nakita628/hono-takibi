/**
 * Formats request validation parameters into a `request:{...}` object string.
 *
 * @param requestParamsArray - An array of Zod schema strings (e.g., `query`, `params`, etc.).
 * @returns A TypeScript code string representing the `request` object.
 *
 * @example
 * formatRequestObject(['query:z.object({ page: z.string() })'])
 * // → 'request:{query:z.object({ page: z.string() })},'
 */
export function formatRequestObject(requestParamsArray: string[]): string {
  return `request:{${requestParamsArray.join(',')}},`
}
