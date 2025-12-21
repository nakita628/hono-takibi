import type { Components, Parameters, Schemas } from '../openapi/index.js'

export function wrap(zod: string, components: Components): string {
  const pickFromComponents = (
    value: Components,
  ):
    | {
        schema: Schemas
        param?: {
          readonly name: string
          readonly in: Parameters['in']
          readonly required?: boolean
          readonly explode?: boolean
          readonly style?: Parameters['style']
        }
        header?: {
          readonly required?: boolean
        }
      }
    | undefined => {
    if (value.schemas) {
      for (const schema of Object.values(value.schemas)) {
        if (schema) return { schema }
      }
    }

    if (value.parameters) {
      for (const parameter of Object.values(value.parameters)) {
        if (!parameter?.schema) continue
        return {
          schema: parameter.schema,
          param: {
            name: parameter.name,
            in: parameter.in,
            required: parameter.required,
            explode: parameter.explode,
            style: parameter.style,
          },
        }
      }
    }

    if (value.headers) {
      for (const header of Object.values(value.headers)) {
        if (!header?.schema) continue
        return {
          schema: header.schema,
          header: {
            required: Array.isArray(header.required)
              ? header.required.length > 0
              : header.required === true,
          },
        }
      }
    }

    return undefined
  }

  const selected = pickFromComponents(components)
  if (!selected) return zod
  const { schema, param, header } = selected

  const formatLiteral = (v: unknown): string => {
    if (typeof v === 'boolean') return `${v}`
    if (typeof v === 'number') {
      if (schema.format === 'int64') return `${v}n`
      if (schema.format === 'bigint') return `BigInt(${v})`
      return `${v}`
    }
    if (schema.type === 'date' && typeof v === 'string') {
      return `new Date(${JSON.stringify(v)})`
    }
    if (typeof v === 'string') return JSON.stringify(v)
    return JSON.stringify(v)
  }

  const withDefault =
    schema.default !== undefined ? `${zod}.default(${formatLiteral(schema.default)})` : zod

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  const withNullable =
    isNullable && !withDefault.endsWith('.nullable()') ? `${withDefault}.nullable()` : withDefault

  const paramProps = param
    ? (() => {
        const required = param.required ?? false
        return [
          `in:"${param.in}"`,
          `name:${JSON.stringify(param.name)}`,
          `required:${required}`,
          param.style !== undefined ? `style:${JSON.stringify(param.style)}` : undefined,
          param.explode !== undefined ? `explode:${param.explode}` : undefined,
        ].filter((v) => v !== undefined)
      })()
    : []

  const openapiProps = [
    paramProps.length > 0 ? `param:{${paramProps.join(',')}}` : undefined,
    'example' in schema && schema.example !== undefined
      ? `example:${JSON.stringify(schema.example)}`
      : undefined,
    'examples' in schema && Array.isArray(schema.examples) && schema.examples.length > 0
      ? `examples:${JSON.stringify(schema.examples)}`
      : undefined,
    'description' in schema && schema.description !== undefined
      ? `description:${JSON.stringify(schema.description)}`
      : undefined,
  ].filter((v) => v !== undefined)

  const shouldOptional = param?.required === false || header?.required === false
  const base = shouldOptional ? `${withNullable}.optional()` : withNullable

  return openapiProps.length === 0 ? base : `${base}.openapi({${openapiProps.join(',')}})`
}
