import type { Schema } from '../../../openapi/index.js'

/**
 * @param { Schema } schema - The schema definition
 * @return { string | undefined } - The Zod enum string or undefined if not applicable
 * @description This function generates a Zod enum string based on the provided schema.
 */
export function _enum(schema: Schema): string | undefined {
  // number
  if (schema.type === 'number' && schema.enum) {
    if (schema.enum.length > 1) {
      const literals = schema.enum.map((v) => `z.literal(${v})`).join(',')
      return `z.union([${literals}])`
    }
    return `z.literal(${schema.enum[0]})`
  }

  // integer
  if (schema.type === 'integer' && schema.enum) {
    if (schema.enum.length > 1) {
      const literals = schema.enum.map((value) => `z.literal(${value})`)
      return `z.union([${literals}])`
    }
    return `z.literal(${schema.enum[0]})`
  }

  // array
  if (schema.type === 'array' && Array.isArray(schema.enum)) {
    if (schema.enum.length === 1 && Array.isArray(schema.enum[0])) {
      const tupleItems = schema.enum[0].map((item) => `z.literal(${item})`).join(', ')
      return `z.tuple([${tupleItems}])`
    }

    // union
    const unionParts = schema.enum.map((value) => {
      if (Array.isArray(value)) {
        const tupleItems = value.map((item) => `z.literal(${item})`)
        return `z.tuple([${tupleItems}])`
      }
      return `z.literal(${value})`
    })
    return `z.union([${unionParts}])`
  }

  // boolean
  if (schema.type === 'boolean' && schema.enum) {
    if (schema.enum.length > 1) {
      const literals = schema.enum.map((value) => `z.literal(${value})`).join(',')
      return `z.union([${literals}])`
    }
    return `z.literal(${schema.enum[0]})`
  }

  if (schema.enum) {
    if (schema.enum.length > 1) {
      const allStrings = schema.enum.every((v) => typeof v === 'string')
      if (allStrings) {
        return `z.enum(${JSON.stringify(schema.enum)})`
      }
      const unionLiterals = schema.enum.map((value) =>
        value === null
          ? 'z.null()'
          : `z.literal(${typeof value === 'string' ? `'${value}'` : value})`,
      )
      return `z.union([${unionLiterals}])`
    }
    return `z.literal(${typeof schema.enum[0] === 'string' ? `'${schema.enum[0]}'` : schema.enum[0]})`
  }
}
