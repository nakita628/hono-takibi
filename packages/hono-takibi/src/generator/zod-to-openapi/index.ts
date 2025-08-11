import { wrap } from '../../helper/wrap.js'
import type { Schema } from '../../openapi/index.js'
import { normalizeTypes, refSchema } from '../../utils/index.js'
import { array } from './z/array.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

export function zodToOpenAPI(
  schema: Schema,
  paramName?: string,
  paramIn?: 'path' | 'query' | 'header' | 'cookie',
): string {
  if (schema === undefined) throw new Error('hono-takibi: only #/components/schemas/* is supported')
  // ref
  if (schema.$ref) {
    return wrap(refSchema(schema.$ref), schema, paramName, paramIn)
  }
  /* combinators */
  // allOf
  if (schema.allOf) {
    if (!schema.allOf || schema.allOf.length === 0) {
      return wrap('z.any()', schema, paramName, paramIn)
    }
    const { schemas, nullable } = schema.allOf.reduce<{
      schemas: string[]
      nullable: boolean
    }>(
      (acc, s) => {
        const isOnlyNullable =
          (typeof s === 'object' && s.type === 'null') ||
          (typeof s === 'object' && s?.nullable === true && Object.keys(s).length === 1)

        if (isOnlyNullable) {
          return {
            schemas: acc.schemas,
            nullable: true,
          }
        }

        const z = zodToOpenAPI(s, paramName, paramIn)
        return {
          schemas: [...acc.schemas, wrap(z, s)],
          nullable: acc.nullable,
        }
      },
      {
        schemas: [],
        nullable:
          schema.nullable === true ||
          (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null'),
      },
    )
    if (schemas.length === 0) {
      return wrap('z.any()', { ...schema, nullable }, paramName, paramIn)
    }
    if (schemas.length === 1) {
      return wrap(schemas[0], { ...schema, nullable }, paramName, paramIn)
    }
    const z = `z.intersection(${schemas.join(',')})`
    return wrap(z, schema, paramName, paramIn)
  }

  // anyOf
  if (schema.anyOf) {
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return wrap('z.any()', schema, paramName, paramIn)
    }
    const schemas = schema.anyOf.map((subSchema) => {
      return zodToOpenAPI(subSchema, paramName, paramIn)
    })
    const z = `z.union([${schemas.join(',')}])`
    return wrap(z, schema, paramName, paramIn)
  }

  // oneOf
  if (schema.oneOf) {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return wrap('z.any()', schema, paramName, paramIn)
    }
    const schemas = schema.oneOf.map((schema) => {
      return zodToOpenAPI(schema, paramName, paramIn)
    })
    // discriminatedUnion Support hesitant
    // This is because using intersection causes a type error.
    // const discriminator = schema.discriminator?.propertyName
    // const z = discriminator
    //   ? `z.discriminatedUnion('${discriminator}',[${schemas.join(',')}])`
    //   : `z.union([${schemas.join(',')}])`
    // return wrap(z, schema, paramName, paramIn)
    const z = `z.union([${schemas.join(',')}])`
    return wrap(z, schema, paramName, paramIn)
  }

  // not
  if (schema.not) {
    if (typeof schema.not === 'object' && schema.not.type && typeof schema.not.type === 'string') {
      const predicate = `(v) => typeof v !== '${schema.not.type}'`
      const z = `z.any().refine(${predicate})`
      return wrap(z, schema, paramName, paramIn)
    }
    if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
      const list = JSON.stringify(schema.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      const z = `z.any().refine(${predicate})`
      return wrap(z, schema, paramName, paramIn)
    }
    return wrap('z.any()', schema, paramName, paramIn)
  }

  // const
  if (schema.const) {
    const z = `z.literal(${JSON.stringify(schema.const)})`
    return wrap(z, schema, paramName, paramIn)
  }

  /* enum */
  if (schema.enum) return wrap(_enum(schema), schema, paramName, paramIn)
  /* properties */
  if (schema.properties) return wrap(object(schema), schema, paramName, paramIn)
  const t = normalizeTypes(schema.type)
  /* string */
  if (t.includes('string')) return wrap(string(schema), schema, paramName, paramIn)
  /* number */
  if (t.includes('number')) return wrap(number(schema), schema, paramName, paramIn)
  /* integer & bigint */
  if (t.includes('integer')) return wrap(integer(schema), schema, paramName, paramIn)
  /* boolean */
  if (t.includes('boolean')) return wrap('z.boolean()', schema, paramName, paramIn)
  /* array */
  if (t.includes('array')) return wrap(array(schema), schema, paramName, paramIn)
  /* object */
  if (t.includes('object')) return wrap(object(schema), schema, paramName, paramIn)
  /* date */
  if (t.includes('date')) return wrap('z.date()', schema, paramName, paramIn)
  /* null only */
  if (t.length === 1 && t[0] === 'null') return wrap('z.null()', schema, paramName, paramIn)
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, paramName, paramIn)
}
