import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Header, Parameter, Schema } from '../openapi/index.js'
import { buildExamples } from '../utils/index.js'
import { makeContent } from './components.js'

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

  const headerObject = [
    meta?.headers?.description
      ? `description:${JSON.stringify(meta.headers.description)}`
      : undefined,
    meta?.headers?.required ? `required:${JSON.stringify(meta.headers.required)}` : undefined,
    meta?.headers?.deprecated ? `deprecated:${JSON.stringify(meta.headers.deprecated)}` : undefined,
    meta?.headers?.example ? `example:${JSON.stringify(meta.headers.example)}` : undefined,
    meta?.headers?.examples ? `examples:${buildExamples(meta.headers.examples)}` : undefined,
    meta?.headers?.strict ? `strict:${JSON.stringify(meta.headers.strict)}` : undefined,
    meta?.headers?.explode ? `explode:${JSON.stringify(meta.headers.explode)}` : undefined,
    meta?.headers?.schema ? `schema:${zodToOpenAPI(meta.headers.schema)}` : undefined,
    meta?.headers?.content ? `content:${makeContent(meta.headers.content)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')

  console.log('--------------------------------')
  console.log(JSON.stringify(meta?.headers, null, 2))
  console.log('--------------------------------')

  Object.entries(meta?.headers ?? {}).map(([headerKey, header]) => {
    const isHeaders = (v: unknown): v is Header[] =>
      Array.isArray(v) && v.every((v) => typeof v === 'object' && v !== null)
    const isHeader = (v: unknown): v is Header => typeof v === 'object' && v !== null

    // if (isHeaders(header)) {
    //   Object.entries(header).map(([k, v]) => {
    //     if (isHeader(v)) {
    //       const props = [
    //         'description' in v && typeof v.description === 'string'
    //           ? `${JSON.stringify(k)}:${JSON.stringify(v.description)}`
    //           : undefined,
    //         'required' in v && typeof v.required === 'boolean'
    //           ? `${JSON.stringify(k)}:${JSON.stringify(v.required)}`
    //           : undefined,
    //         'deprecated' in v && typeof v.deprecated === 'boolean'
    //           ? `${JSON.stringify(k)}:${JSON.stringify(v.deprecated)}`
    //           : undefined,
    //         'example' in v && typeof v.example !== undefined
    //           ? `${JSON.stringify(k)}:${JSON.stringify(v.example)}`
    //           : undefined,
    //         'examples' in v && typeof v.examples !== undefined
    //           ? `${JSON.stringify(k)}:${buildExamples(v.examples)}`
    //           : undefined,
    //         'strict' in v && typeof v.strict === 'string'
    //           ? `${JSON.stringify(k)}:${JSON.stringify(v.strict)}`
    //           : undefined,
    //         'explode' in v && typeof v.explode === 'boolean'
    //           ? `${JSON.stringify(k)}:${JSON.stringify(v.explode)}`
    //           : undefined,
    //         'schema' in v && typeof v.schema !== undefined
    //           ? `${JSON.stringify(k)}:${zodToOpenAPI(v.schema)}`
    //           : undefined,
    //         'content' in v && typeof v.content !== undefined
    //           ? `${JSON.stringify(k)}:${makeContent(v.content)}`
    //           : undefined,
    //       ]
    //         .filter((v) => v !== undefined)
    //         .join(',')

    //       console.log('--------------------------------')
    //       console.log(props)
    //       console.log('--------------------------------')
    //     }
    //   })
    // }

    // if (isHeader(v)) {
    //   const props = [
    //     'description' in v && v.description
    //       ? `description:${JSON.stringify(v.description)}`
    //       : undefined,
    //     'required' in v && v.required ? `required:${JSON.stringify(v.required)}` : undefined,
    //     'deprecated' in v && v.deprecated
    //       ? `deprecated:${JSON.stringify(v.deprecated)}`
    //       : undefined,
    //     'example' in v && v.example ? `example:${JSON.stringify(v.example)}` : undefined,
    //     'examples' in v && v.examples ? `examples:${buildExamples(v.examples)}` : undefined,
    //     'strict' in v && v.strict ? `strict:${JSON.stringify(v.strict)}` : undefined,
    //     'explode' in v && v.explode ? `explode:${JSON.stringify(v.explode)}` : undefined,
    //     'schema' in v && v.schema ? `schema:${zodToOpenAPI(v.schema)}` : undefined,
    //     'content' in v && v.content ? `content:${makeContent(v.content)}` : undefined,
    //   ]
    //     .filter((v) => v !== undefined)
    //     .join(',')

    //   console.log('--------------------------------')
    //   console.log(props)
    //   console.log('--------------------------------')
    // }
  })

  const openapiSchema = args ? JSON.stringify(args) : undefined
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
