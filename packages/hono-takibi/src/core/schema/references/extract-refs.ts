import type { Schema } from '../../../types'

type TraversableObject = {
  [key: string]: TraversableObject | string | number | boolean | null | undefined
  $ref?: string
}

export function extractRefs(schema: Schema): string[] {
  const refs: string[] = []

  const traverse = (obj: TraversableObject): void => {
    if (typeof obj !== 'object' || obj === null) return

    for (const [key, value] of Object.entries(obj)) {
      if (key === '$ref' && typeof value === 'string') {
        const refParts = value.split('/')
        const refName = refParts[refParts.length - 1]
        refs.push(refName)
      } else if (typeof value === 'object' && value !== null) {
        traverse(value as TraversableObject)
      }
    }
  }

  traverse(schema as TraversableObject)
  return refs
}
