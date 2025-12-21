import { wrap } from '../../helper/wrap.js'
import type { Components, Parameters, Ref, Schemas } from '../../openapi/index.js'
import { normalizeTypes, refSchema } from '../../utils/index.js'
import { array } from './z/array.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

export function zodToOpenAPI(components: Components) {
  const isSchemaOrParameterOrHeaderRef = (
    ref: Ref,
  ): ref is
    | `#/components/schemas/${string}`
    | `#/components/parameters/${string}`
    | `#/components/headers/${string}` =>
    ref.startsWith('#/components/schemas/') ||
    ref.startsWith('#/components/parameters/') ||
    ref.startsWith('#/components/headers/')

  const pickFromComponents = (
    value: Components,
  ):
    | {
        schema: Schemas
        param?: {
          name: string
          in: Parameters['in']
          required?: boolean
          explode?: boolean
          style?: Parameters['style']
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
        if (header?.schema) return { schema: header.schema }
      }
    }
    return undefined
  }

  const isNullableSchema = (schemas: Schemas): boolean =>
    schemas.nullable === true ||
    (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null')

  const toZod = (
    schemas: Schemas,
    meta?: {
      name: string
      in: Parameters['in']
      required?: boolean
      explode?: boolean
      style?: Parameters['style']
    },
  ): string => {
    const toComponents = (
      schema: Schemas,
      param?: {
        name: string
        in: Parameters['in']
        required?: boolean
        explode?: boolean
        style?: Parameters['style']
      },
    ): Components =>
      param
        ? {
            parameters: {
              parameter: {
                schema,
                name: param.name,
                in: param.in,
                required: param.required,
                explode: param.explode,
                style: param.style,
              },
            },
          }
        : { schemas: { schema } }

    const applyWrap = (z: string, nullableOverride?: boolean): string => {
      const target = nullableOverride ? { ...schemas, nullable: true } : schemas
      return wrap(z, toComponents(target, meta))
    }

    if (schemas.$ref !== undefined) {
      if (isSchemaOrParameterOrHeaderRef(schemas.$ref)) {
        return applyWrap(refSchema(schemas.$ref))
      }
      return applyWrap('z.any()')
    }

    if (schemas.allOf !== undefined) {
      if (!schemas.allOf || schemas.allOf.length === 0) {
        return applyWrap('z.any()')
      }
      const isOnlyNullable = (schema: Schemas): boolean =>
        schema.type === 'null' ||
        (Array.isArray(schema.type) && schema.type.length === 1 && schema.type[0] === 'null') ||
        (schema.nullable === true && Object.keys(schema).length === 1)

      const { schemasList, nullable } = schemas.allOf.reduce<{
        schemasList: string[]
        nullable: boolean
      }>(
        (acc, schema) => {
          if (isOnlyNullable(schema)) {
            return {
              schemasList: acc.schemasList,
              nullable: true,
            }
          }
          return {
            schemasList: [...acc.schemasList, toZod(schema)],
            nullable: acc.nullable,
          }
        },
        {
          schemasList: [],
          nullable: isNullableSchema(schemas),
        },
      )
      const z =
        schemasList.length === 0
          ? 'z.any()'
          : schemasList.length === 1
            ? schemasList[0]
            : `z.intersection(${schemasList.join(',')})`
      return applyWrap(z, nullable)
    }

    if (schemas.anyOf !== undefined) {
      if (!schemas.anyOf || schemas.anyOf.length === 0) {
        return applyWrap('z.any()')
      }
      const schemasList = schemas.anyOf.map((schema) => toZod(schema))
      const z = `z.union([${schemasList.join(',')}])`
      return applyWrap(z)
    }

    if (schemas.oneOf !== undefined) {
      if (!schemas.oneOf || schemas.oneOf.length === 0) {
        return applyWrap('z.any()')
      }
      const schemasList = schemas.oneOf.map((schema) => toZod(schema))
      const z = `z.union([${schemasList.join(',')}])`
      return applyWrap(z)
    }

    if (schemas.not !== undefined) {
      if (
        typeof schemas.not === 'object' &&
        schemas.not !== null &&
        typeof schemas.not.type === 'string'
      ) {
        const predicate = `(v) => typeof v !== '${schemas.not.type}'`
        const z = `z.any().refine(${predicate})`
        return applyWrap(z)
      }
      if (
        typeof schemas.not === 'object' &&
        schemas.not !== null &&
        Array.isArray(schemas.not.enum)
      ) {
        const list = JSON.stringify(schemas.not.enum)
        const predicate = `(v) => !${list}.includes(v)`
        const z = `z.any().refine(${predicate})`
        return applyWrap(z)
      }
      return applyWrap('z.any()')
    }

    if (schemas.const !== undefined) {
      const z = `z.literal(${JSON.stringify(schemas.const)})`
      return applyWrap(z)
    }

    if (schemas.enum !== undefined) return applyWrap(_enum(schemas))
    if (schemas.properties !== undefined) return applyWrap(object(schemas))

    const t = normalizeTypes(schemas.type)
    if (t.includes('string')) return applyWrap(string(schemas))
    if (t.includes('number')) return applyWrap(number(schemas))
    if (t.includes('integer')) return applyWrap(integer(schemas))
    if (t.includes('boolean')) return applyWrap('z.boolean()')
    if (t.includes('array')) return applyWrap(array(schemas))
    if (t.includes('object')) return applyWrap(object(schemas))
    if (t.includes('date')) return applyWrap('z.date()')
    if (t.length === 1 && t[0] === 'null') return applyWrap('z.null()')
    console.warn(`fallback to z.any(): schema=${JSON.stringify(schemas)}`)
    return applyWrap('z.any()')
  }

  const selected = pickFromComponents(components)
  if (!selected) return 'z.any()'
  return toZod(selected.schema, selected.param)
}
