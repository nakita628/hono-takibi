import type { Headers, Parameters, Schemas } from '../openapi/index.js'

export function wrap(
  zod: string,
  schemas: Schemas,
  meta?: {
    parameters?: Omit<Parameters, 'schema'>
    headers?: Omit<Headers, 'schema'>
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

  // ignore schemas required
  const { required, nullable, ...rest } = schemas

  const openapiProps = [
    meta?.parameters ? `param:${JSON.stringify(meta.parameters)}` : undefined,
    schemas ? `${JSON.stringify(rest)}`.replace('{', '').replace('}', '') : undefined,
  ].filter((v) => v !== undefined)

  // required true
  if (
    (schemas.required !== undefined &&
      typeof schemas.required === 'boolean' &&
      schemas.required === true) ||
    (meta?.parameters !== undefined &&
      typeof meta.parameters.required === 'boolean' &&
      meta.parameters.required === true) ||
    (meta?.parameters !== undefined &&
      typeof meta.parameters.required === 'boolean' &&
      meta.parameters.required === true) ||
    (meta?.headers !== undefined &&
      typeof meta.headers.required === 'boolean' &&
      meta.headers.required === true)
  ) {
    return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
  }
  return openapiProps.length === 0
    ? `${z}.optional()`
    : `${z}.optional().openapi({${openapiProps.join(',')}})`
}
