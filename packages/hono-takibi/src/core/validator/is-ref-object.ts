type RefObject = {
  $ref?: string
  [key: string]: unknown
}

export function isRefObject(value: unknown): value is RefObject {
  return typeof value === 'object' && value !== null
}
