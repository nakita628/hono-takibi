import { wrap } from '../../helper/wrap.js'
import type { Header, Parameter, Schema } from '../../openapi/index.js'

import { normalizeTypes, ref } from '../../utils/index.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

export function zodToOpenAPI(
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
  },
): string {
  // console.log('--------------------------------')
  // console.log(JSON.stringify(schema, null, 2))
  // console.log('--------------------------------')

  if (schema === undefined) throw new Error('Schema is undefined')
  /** ref */
  if (schema.$ref !== undefined) {
    if (schema.$ref) {
      if (Object.keys(schema).length === 1) {
        return ref(schema.$ref)
      }
      return wrap(ref(schema.$ref), schema, meta)
    }
  }
  /* combinators */
  /** allOf */
  if (schema.allOf !== undefined) {
    if (!schema.allOf || schema.allOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }

    const { allOfSchemas, nullable, onlyRefSchemas } = schema.allOf.reduce<{
      allOfSchemas: string[]
      nullable: boolean
      onlyRefSchemas: boolean
    }>(
      (acc, s) => {
        const isOnlyNullable =
          (typeof s === 'object' && s.type === 'null') ||
          (typeof s === 'object' && s?.nullable === true && Object.keys(s).length === 1)

        if (isOnlyNullable) {
          return {
            allOfSchemas: acc.allOfSchemas,
            nullable: true,
            onlyRefSchemas: acc.onlyRefSchemas,
          }
        }

        if (s.$ref && Object.keys(s).length === 1 && s.$ref) {
          return {
            allOfSchemas: [...acc.allOfSchemas, ref(s.$ref)],
            nullable: acc.nullable,
            onlyRefSchemas: acc.onlyRefSchemas,
          }
        }

        const z = zodToOpenAPI(s, meta)
        return {
          allOfSchemas: [...acc.allOfSchemas, z],
          nullable: acc.nullable,
          onlyRefSchemas: false,
        }
      },
      {
        allOfSchemas: [],
        nullable:
          schema.nullable === true ||
          (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null'),
        onlyRefSchemas: true,
      },
    )
    const isBareAllOf = Object.keys(schema).every(
      (key) => key === 'allOf' || key === 'nullable' || key === 'type',
    )
    if (allOfSchemas.length === 0) {
      return wrap('z.any()', { ...schema, nullable }, meta)
    }
    if (allOfSchemas.length === 1) {
      if (onlyRefSchemas && isBareAllOf) {
        return nullable ? `${allOfSchemas[0]}.nullable()` : allOfSchemas[0]
      }
      return wrap(allOfSchemas[0], { ...schema, nullable }, meta)
    }
    const z = `z.intersection(${allOfSchemas.join(',')})`
    return wrap(z, schema, meta)
  }

  /* anyOf */
  if (schema.anyOf !== undefined) {
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }
    const anyOfSchemas = schema.anyOf.map((subSchema) => {
      if (subSchema.$ref && Object.keys(subSchema).length === 1) {
        if (subSchema.$ref) {
          return ref(subSchema.$ref)
        }
      }
      return zodToOpenAPI(subSchema, meta)
    })
    const z = `z.union([${anyOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }

  /* oneOf */
  if (schema.oneOf !== undefined) {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return wrap('z.any()', schema, meta)
    }
    const oneOfSchemas = schema.oneOf.map((s) => {
      if (s.$ref && Object.keys(s).length === 1) {
        if (s.$ref) {
          return ref(s.$ref)
        }
      }
      return zodToOpenAPI(s, meta)
    })
    // discriminatedUnion Support hesitant
    // This is because using intersection causes a type error.
    // const discriminator = schema.discriminator?.propertyName
    // const z = discriminator
    //   ? `z.discriminatedUnion('${discriminator}',[${schemas.join(',')}])`
    //   : `z.union([${schemas.join(',')}])`
    // return wrap(z, schema, paramName, paramIn)
    const z = `z.union([${oneOfSchemas.join(',')}])`
    return wrap(z, schema, meta)
  }

  /* not */
  if (schema.not !== undefined) {
    if (typeof schema.not === 'object' && schema.not.type && typeof schema.not.type === 'string') {
      const predicate = `(v) => typeof v !== '${schema.not.type}'`
      const z = `z.any().refine(${predicate})`
      return wrap(z, schema, meta)
    }
    if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
      const list = JSON.stringify(schema.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      const z = `z.any().refine(${predicate})`
      return wrap(z, schema, meta)
    }
    return wrap('z.any()', schema, meta)
  }

  /* const */
  if (schema.const !== undefined) {
    const z = `z.literal(${JSON.stringify(schema.const)})`
    return wrap(z, schema, meta)
  }

  /* enum */
  if (schema.enum !== undefined) return wrap(_enum(schema), schema, meta)
  /* properties */
  if (schema.properties !== undefined) return wrap(object(schema), schema, meta)
  const t = normalizeTypes(schema.type)
  /* string */
  if (t.includes('string')) return wrap(string(schema), schema, meta)
  /* number */
  if (t.includes('number')) return wrap(number(schema), schema, meta)
  /* integer & bigint */
  if (t.includes('integer')) return wrap(integer(schema), schema, meta)
  /* boolean */
  if (t.includes('boolean')) return wrap('z.boolean()', schema, meta)
  /* array */
  if (t.includes('array')) {
    // Handle both array and single object items (runtime check for OpenAPI compatibility)
    const rawItems = schema.items
    const itemSchema: Schema | undefined = Array.isArray(rawItems) ? rawItems[0] : rawItems
    const item = itemSchema?.$ref
      ? itemSchema.$ref
        ? ref(itemSchema.$ref)
        : itemSchema
          ? zodToOpenAPI(itemSchema, meta)
          : 'z.any()'
      : itemSchema
        ? zodToOpenAPI(itemSchema, meta)
        : 'z.any()'
    const z = `z.array(${item})`

    if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
      // return schemas.minItems === schemas.maxItems
      //   ? `${z}.length(${schemas.minItems})`
      //   : `${z}.min(${schemas.minItems}).max(${schemas.maxItems})`
      return schema.minItems === schema.maxItems
        ? wrap(`${z}.length(${schema.minItems})`, schema, meta)
        : wrap(`${z}.min(${schema.minItems}).max(${schema.maxItems})`, schema, meta)
    }
    // if (typeof schemas.minItems === 'number') return `${z}.min(${schemas.minItems})`
    // if (typeof schemas.maxItems === 'number') return `${z}.max(${schemas.maxItems})`
    if (typeof schema.minItems === 'number')
      return wrap(`${z}.min(${schema.minItems})`, schema, meta)
    if (typeof schema.maxItems === 'number')
      return wrap(`${z}.max(${schema.maxItems})`, schema, meta)

    return wrap(z, schema, meta)
  }
  /* object */
  if (t.includes('object')) return wrap(object(schema), schema, meta)
  /* date */
  if (t.includes('date')) return wrap('z.date()', schema, meta)
  /* null only */
  if (t.length === 1 && t[0] === 'null') return wrap('z.null()', schema, meta)
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return wrap('z.any()', schema, meta)
}
