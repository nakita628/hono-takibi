import type { Headers, Parameters, Schemas } from '../openapi/index.js'

export function wrap(
  zod: string,
  schemas: Schemas,
  meta?: {
    parameters?: Parameters
    headers?: Headers
  },
): string {
  const formatLiteral = (v: unknown): string => {
    /* boolean true or false */
    if (typeof v === 'boolean') {
      return `${v}`
    }
    /* number */
    if (typeof v === 'number') {
      if (schemas.format === 'int64') {
        return `${v}n`
      }
      if (schemas.format === 'bigint') {
        return `BigInt(${v})`
      }
      return `${v}`
    }
    /* date */
    if (schemas.type === 'date' && typeof v === 'string') {
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
  const s =
    schemas.default !== undefined ? `${zod}.default(${formatLiteral(schemas.default)})` : zod

  const isNullable =
    schemas.nullable === true ||
    (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null')

  const z = isNullable ? `${s}.nullable()` : s

  const openapiProps = [
    // param
    meta?.parameters
      ? (() => {
          const required = meta.parameters.required ? true : false
          return `param:{in:"${meta.parameters.in}",name:${JSON.stringify(meta.parameters.name)},required:${required}}`
        })()
      : undefined,
    // example
    'example' in schemas && schemas.example !== undefined
      ? `example:${JSON.stringify(schemas.example)}`
      : undefined,
    // examples
    'examples' in schemas && Array.isArray(schemas.examples) && schemas.examples.length > 0
      ? `examples:${JSON.stringify(schemas.examples)}`
      : undefined,
    // description
    'description' in schemas && schemas.description !== undefined
      ? `description:${JSON.stringify(schemas.description)}`
      : undefined,
  ].filter((v) => v !== undefined)

  if (meta?.parameters?.required || meta?.headers?.required) {
    return openapiProps.length === 0 ? z : `${z}.optional().openapi({${openapiProps.join(',')}})`
  }
  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}
