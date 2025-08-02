import type { Schema } from '../openapi/index.js'

export function wrap(zod: string, schema: Schema): string {
  const formatLiteral = (v: unknown): string => {
    // boolean true or false
    if (typeof v === 'boolean') {
      return `${v}`
    }
    // number
    if (typeof v === 'number') {
      if (schema.format === 'int64') {
        return `${v}n`
      }
      if (schema.format === 'bigint') {
        return `BigInt(${v})`
      }
      return `${v}`
    }
    // date
    if (schema.type === 'date' && typeof v === 'string') {
      return `new Date(${JSON.stringify(v)})`
    }
    // string
    if (typeof v === 'string') {
      return JSON.stringify(v)
    }
    // other
    return JSON.stringify(v)
  }

  // why schema.default !== undefined becasue schema.default === 0  // → falsy
  const z = schema.default !== undefined ? `${zod}.default(${formatLiteral(schema.default)})` : zod

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  return isNullable ? `${z}.nullable()` : z
}
