import type { Schema } from '../../../openapi/index.js'

/**
 * Generate a Zod enum schema string from an OpenAPI Schema object (nullable対応含む).
 */
export function _enum(args: {
  type?:
    | 'string'
    | 'number'
    | 'integer'
    | 'date'
    | 'boolean'
    | 'array'
    | 'object'
    | 'null'
    | [
        'string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null',
        ...('string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null')[],
      ]
  enum?: (string | number | boolean | null | (string | number | boolean | null)[])[]
}): string {
  // number
  if (args.type === 'number' && args.enum) {
    const z =
      args.enum.length > 1
        ? `z.union([${args.enum.map((v) => `z.literal(${v})`).join(',')}])`
        : `z.literal(${args.enum[0]})`
    return z
  }
  // integer
  if (args.type === 'integer' && args.enum) {
    const z =
      args.enum.length > 1
        ? `z.union([${args.enum.map((v) => `z.literal(${v})`).join(',')}])`
        : `z.literal(${args.enum[0]})`
    return z
  }
  // array
  if (args.type === 'array' && Array.isArray(args.enum)) {
    const z = (() => {
      if (args.enum.length === 1 && Array.isArray(args.enum[0])) {
        const tupleItems = args.enum[0].map((item) => `z.literal(${item})`).join(', ')
        return `z.tuple([${tupleItems}])`
      }
      const unionParts = args.enum.map((v) => {
        if (Array.isArray(v)) {
          const tupleItems = v.map((i) => `z.literal(${i})`)
          return `z.tuple([${tupleItems}])`
        }
        return `z.literal(${v})`
      })
      return `z.union([${unionParts.join(',')}])`
    })()
    return z
  }
  // boolean
  if (args.type === 'boolean' && args.enum) {
    const z =
      args.enum.length > 1
        ? `z.union([${args.enum.map((v) => `z.literal(${v})`).join(',')}])`
        : `z.literal(${args.enum[0]})`
    return z
  }
  // enum
  if (args.enum) {
    const z = (() => {
      if (args.enum.length > 1) {
        const allStrings = args.enum.every((v) => typeof v === 'string')
        if (allStrings) {
          return `z.enum(${JSON.stringify(args.enum)})`
        }
        const unionLiterals = args.enum.map((v) =>
          v === null ? 'z.null()' : `z.literal(${typeof v === 'string' ? `'${v}'` : v})`,
        )
        return `z.union([${unionLiterals.join(',')}])`
      }
      const v = args.enum[0]
      return `z.literal(${typeof v === 'string' ? `'${v}'` : v})`
    })()
    return z
  }
  return 'z.any()'
}
