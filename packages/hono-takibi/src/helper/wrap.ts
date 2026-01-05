import type { Header, Parameter, Schema } from '../openapi/index.js'
import { makeExamples } from './openapi.js'

// Properties not supported or causing type issues with zod-to-openapi
const unsupportedProps = new Set([
  'contains',
  'minContains',
  'maxContains',
  'patternProperties',
  'dependentRequired',
  'dependentSchemas',
  'unevaluatedProperties',
  'unevaluatedItems',
  'if',
  'then',
  'else',
  'prefixItems',
  'propertyNames',
  'contentSchema',
  'contentEncoding',
  'contentMediaType',
  '$schema',
  '$id',
])

function filterUnsupportedProps(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(filterUnsupportedProps)
  }
  const filtered: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (unsupportedProps.has(key)) {
      continue
    }
    // Filter out items if boolean or array (OpenAPI expects SchemaObject | ReferenceObject)
    if (key === 'items' && (typeof value === 'boolean' || Array.isArray(value))) {
      continue
    }
    // Filter out not.not (nested not with boolean)
    if (
      key === 'not' &&
      typeof value === 'object' &&
      value !== null &&
      'not' in value &&
      typeof (value as Record<string, unknown>).not === 'boolean'
    ) {
      continue
    }
    filtered[key] = filterUnsupportedProps(value)
  }
  return filtered
}

export function wrap(
  zod: string,
  schema: Schema,
  meta?: {
    parameters?: Parameter
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

  const baseArgs = Object.fromEntries(
    Object.entries(schema).filter(
      ([k, v]) =>
        k !== 'nullable' &&
        k !== 'const' &&
        k !== '$ref' &&
        !(k === 'required' && typeof v === 'boolean'),
    ),
  )
  const args = filterUnsupportedProps(baseArgs) as Record<string, unknown>

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
        meta.headers.examples ? `examples:${makeExamples(meta.headers.examples)}` : undefined,
        meta.headers.style ? `style:${JSON.stringify(meta.headers.style)}` : undefined,
        meta.headers.explode ? `explode:${JSON.stringify(meta.headers.explode)}` : undefined,
        // meta.headers.schema
        //   ? `schema:${JSON.stringify(meta.headers.schema)}`
        //   : undefined,
        meta.headers.content ? `content:${JSON.stringify(meta.headers.content)}` : undefined,
      ].filter((v) => v !== undefined)
    : []

  const openapiSchema = args ? JSON.stringify(args) : undefined
  // {"type":"string"} → type:string
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema

  const openapiProps = [
    meta?.parameters ? `param:${JSON.stringify(meta.parameters)}` : undefined,
    ...headerMetaProps,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)

  // https://github.com/OAI/OpenAPI-Specification/issues/2385
  if (meta?.parameters || meta?.headers) {
    if (meta?.parameters?.required === true || meta?.headers?.required === true) {
      return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
    }
    return openapiProps.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${openapiProps.join(',')}})`
  }
  // propertiesSchema() check
  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}
