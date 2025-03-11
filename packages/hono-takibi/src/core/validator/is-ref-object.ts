type RefObject = {
  $ref?: string
  [key: string]: unknown
}

/**
 * Checks if the value is a reference object
 *
 * @function isRefObject
 * @param value - The value to check
 * @returns true if the value is a reference object, false otherwise
 */
export function isRefObject(value: unknown): value is RefObject {
  return typeof value === 'object' && value !== null
}
