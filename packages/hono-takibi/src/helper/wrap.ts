import type { Header, Parameter, Schema } from '../openapi/index.js'

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

  // ignore schemas required and nullable and additionalProperties and discriminator and const
  // Also extract schema property to flatten it (for Header objects)
  const {
    required,
    nullable,
    additionalProperties,
    discriminator,
    const: unknown,
    $ref,
    schema: innerSchema,
    ...rest
  } = schema as typeof schema & { schema?: Record<string, unknown> }

  // Flatten innerSchema if present (for Header objects with nested schema)
  const flattenedRest =
    innerSchema && typeof innerSchema === 'object' && !Array.isArray(innerSchema)
      ? { ...rest, ...innerSchema }
      : rest

  const openapiSchema = schema ? JSON.stringify(flattenedRest) : undefined
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema
  const openapiProps = [
    meta?.parameters ? `param:${JSON.stringify(meta.parameters)}` : undefined,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)

  // required true
  if (
    (schema.required !== undefined &&
      typeof schema.required === 'boolean' &&
      schema.required === true) ||
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
