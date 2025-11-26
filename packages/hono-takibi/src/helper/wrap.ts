import type { Schema } from '../openapi/index.js'

export function wrap(zod: string, schema: Schema, paramName?: string, paramIn?: string): string {
  const formatLiteral = (v: unknown): string => {
    /* boolean true or false */
    if (typeof v === 'boolean') {
      return `${v}`
    }
    /* number */
    if (typeof v === 'number') {
      if (schema.format === 'int64') {
        return `${v}n`
      }
      if (schema.format === 'bigint') {
        return `BigInt(${v})`
      }
      return `${v}`
    }
    /* date */
    if (schema.type === 'date' && typeof v === 'string') {
      return `new Date(${JSON.stringify(v)})`
    }
    /* string */
    if (typeof v === 'string') {
      return JSON.stringify(v)
    }
    /* other */
    return JSON.stringify(v)
  }

  /* why schema.default !== undefined becasue schema.default === 0  // → falsy */
  const s = schema.default !== undefined ? `${zod}.default(${formatLiteral(schema.default)})` : zod

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  const z = isNullable ? `${s}.nullable()` : s

  const openapiProps = [
    // param
    paramIn && paramName
      ? (() => {
          const required = paramIn === 'path' ? true : !!schema.required
          return `param:{in:"${paramIn}",name:${JSON.stringify(paramName)},required:${required}}`
        })()
      : undefined,
    // example
    'example' in schema && schema.example !== undefined
      ? `example:${JSON.stringify(schema.example)}`
      : undefined,
    // examples
    'examples' in schema && Array.isArray(schema.examples) && schema.examples.length > 0
      ? `examples:${JSON.stringify(schema.examples)}`
      : undefined,
    // description
    'description' in schema && schema.description !== undefined
      ? `description:${JSON.stringify(schema.description)}`
      : undefined,
  ].filter((prop) => prop !== undefined)

  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}
