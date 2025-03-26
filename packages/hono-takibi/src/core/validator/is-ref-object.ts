type RefObject = {
  $ref?: string
  [key: string]: unknown
}

/**
 * Check if the value is a reference object
 * @param {unknown} value - The value to check
 * @returns {boolean} true if the value is a reference object, false otherwise
 */
export function isRefObject(value: unknown): value is RefObject {
  return typeof value === 'object' && value !== null
}
