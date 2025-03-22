type RefObject = {
  $ref?: string
  [key: string]: unknown
}

/**
 * @function isRefObject
 * @description Checks if the value is a reference object
 * @param value - The value to check
 * @returns true if the value is a reference object, false otherwise
 */
export function isRefObject(value: unknown): value is RefObject {
  return typeof value === 'object' && value !== null
}
