import type { Schema } from '../../type'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi'

/**
 * Generates a Zod enum string
 * @param { Schema } schema - The schema definition
 * @returns { string } Generated Zod enum string
 */
export function generateZodEnum(schema: Schema): string {
  if (!schema.enum) {
    throw new Error('enum is not found')
  }

  // example
  if (schema.example) {
    const openapi_example = generateZodToOpenAPI(schema.example)
    return `z.enum(${JSON.stringify(schema.enum)})${openapi_example}`
  }

  // number
  if (schema.type === 'number' && schema.enum) {
    return `z.literal(${schema.enum})`
  }

  // integer
  if (schema.type === 'integer' && schema.enum) {
    if (schema.enum.length > 1) {
      const literals = schema.enum.map((value) => `z.literal(${value})`)
      return `z.union([${literals}])`
    }
    return `z.literal(${schema.enum[0]})`
  }

  // bigint
  if (schema.type === 'bigint' && schema.enum) {
    return `z.literal(${schema.enum})`
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
    return `z.literal(${schema.enum})`
  }

  // enum.length > 1
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
