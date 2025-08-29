import type { Schema } from '../openapi/index.js'

export function wrap(
  zod: Readonly<string>,
  schema: Schema,
  paramName?: Readonly<string>,
  paramIn?: Readonly<string>,
): string {
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
  const s = schema.default !== undefined ? `${zod}.default(${formatLiteral(schema.default)})` : zod

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  const z = isNullable ? `${s}.nullable()` : s

  const openapiProps: string[] = []

  if (paramIn && paramName) {
    const required = paramIn === 'path' ? true : !!schema.required
    openapiProps.push(
      `param:{in:"${paramIn}",name:${JSON.stringify(paramName)},required:${required}}`,
    )
  }

  // Add 'example' if defined
  if ('example' in schema && schema.example !== undefined) {
    openapiProps.push(`example:${JSON.stringify(schema.example)}`)
  }

  // Add 'examples' if defined
  if ('examples' in schema && Array.isArray(schema.examples) && schema.examples.length > 0) {
    openapiProps.push(`examples:${JSON.stringify(schema.examples)}`)
  }

  // Add 'description' if defined
  if ('description' in schema && schema.description !== undefined) {
    openapiProps.push(`description:${JSON.stringify(schema.description)}`)
  }
  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}
