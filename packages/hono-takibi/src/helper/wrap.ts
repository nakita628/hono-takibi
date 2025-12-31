import type { Header, Parameter, Schema } from '../openapi/index.js'
import { buildExamples } from '../utils/index.js'

type ParameterMeta = Pick<Parameter, 'name' | 'in' | 'required'>

export function wrap(
  zod: string,
  schema: Schema,
  meta?: {
    parameters?: ParameterMeta
    headers?: Header
  },
): string {
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

  const args = Object.fromEntries(
    Object.entries(schema).filter(
      ([k, v]) =>
        k !== 'nullable' && k !== 'const' && !(k === 'required' && typeof v === 'boolean'),
    ),
  )

  const headerMetaProps = meta?.headers
    ? [
        meta.headers.description
          ? `description:${JSON.stringify(meta.headers.description)}`
          : undefined,
        // meta.headers.required ? `required:${JSON.stringify(meta.headers.required)}` : undefined,
        meta.headers.deprecated
          ? `deprecated:${JSON.stringify(meta.headers.deprecated)}`
          : undefined,
        meta.headers.example ? `example:${JSON.stringify(meta.headers.example)}` : undefined,
        meta.headers.examples ? `examples:${buildExamples(meta.headers.examples)}` : undefined,
        meta.headers.style ? `style:${JSON.stringify(meta.headers.style)}` : undefined,
        meta.headers.explode ? `explode:${JSON.stringify(meta.headers.explode)}` : undefined,
        // meta.headers.schema
        //   ? `schema:${JSON.stringify(meta.headers.schema)}`
        //   : undefined,
        meta.headers.content ? `content:${JSON.stringify(meta.headers.content)}` : undefined,
      ].filter((v) => v !== undefined)
    : []

  const openapiSchema = args ? JSON.stringify(args) : undefined
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema
  const openapiProps = [
    meta?.parameters ? `param:${JSON.stringify(meta.parameters)}` : undefined,
    ...headerMetaProps,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)

  // required true
  if (
    schema.type === 'object' ||
    (schema.required !== undefined &&
      typeof schema.required === 'boolean' &&
      schema.required === true) ||
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
