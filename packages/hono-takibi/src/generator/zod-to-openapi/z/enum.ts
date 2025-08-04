import type { Schema } from '../../../openapi/index.js'

/**
 * Generate a Zod enum schema string from an OpenAPI Schema object (nullable対応含む).
 */
export function _enum(schema: Schema): string {
  // number
  if (schema.type === 'number' && schema.enum) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schema.enum[0]})`
  }
  // integer
  if (schema.type === 'integer' && schema.enum) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schema.enum[0]})`
  }
  // array
  if (schema.type === 'array' && Array.isArray(schema.enum)) {
    return (() => {
      if (schema.enum.length === 1 && Array.isArray(schema.enum[0])) {
        const tupleItems = schema.enum[0].map((item) => `z.literal(${item})`).join(', ')
        return `z.tuple([${tupleItems}])`
      }
      const unionParts = schema.enum.map((v) => {
        if (Array.isArray(v)) {
          const tupleItems = v.map((i) => `z.literal(${i})`)
          return `z.tuple([${tupleItems}])`
        }
        return `z.literal(${v})`
      })
      return `z.union([${unionParts.join(',')}])`
    })()
  }
  // boolean
  if (schema.type === 'boolean' && schema.enum) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schema.enum[0]})`
  }
  // enum
  if (schema.enum) {
    return (() => {
      if (schema.enum.length > 1) {
        const allStrings = schema.enum.every((v) => typeof v === 'string')
        if (allStrings) {
          return `z.enum(${JSON.stringify(schema.enum)})`
        }
        const unionLiterals = schema.enum.map((v) =>
          v === null ? 'z.null()' : `z.literal(${typeof v === 'string' ? `'${v}'` : v})`,
        )
        return `z.union([${unionLiterals.join(',')}])`
      }
      const v = schema.enum[0]
      return `z.literal(${typeof v === 'string' ? `'${v}'` : v})`
    })()
  }
  return 'z.any()'
}
