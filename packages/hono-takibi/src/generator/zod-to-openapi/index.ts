import { propertiesSchema } from '../../helper/properties-schema.js'
import { wrap } from '../../helper/wrap.js'
import type { Headers, Parameters, Ref, Schemas } from '../../openapi/index.js'
import { normalizeTypes, refSchema } from '../../utils/index.js'
import { _enum } from './z/enum.js'
import { integer } from './z/integer.js'
import { number } from './z/number.js'
import { object } from './z/object.js'
import { string } from './z/string.js'

export function zodToOpenAPI(
  schemas: Schemas,
  meta?: {
    parameters?: Omit<Parameters, 'schema'>
    headers?: Omit<Headers, 'schema'>
  },
): string {
  if (schemas === undefined) throw new Error('Schema is undefined')
  /** ref */
  if (schemas.$ref !== undefined) {
    const isSchemaOrParameterOrHeaderRef = (
      ref: Ref,
    ): ref is
      | `#/components/schemas/${string}`
      | `#/components/parameters/${string}`
      | `#/components/headers/${string}` =>
      ref.startsWith('#/components/schemas/') ||
      ref.startsWith('#/components/parameters/') ||
      ref.startsWith('#/components/headers/')
    if (isSchemaOrParameterOrHeaderRef(schemas.$ref)) {
      if (Object.keys(schemas).length === 1) {
        return refSchema(schemas.$ref)
      }
      return wrap(refSchema(schemas.$ref), schemas, meta)
    }
  }
  /* combinators */
  /** allOf */
  if (schemas.allOf !== undefined) {
    if (!schemas.allOf || schemas.allOf.length === 0) {
      return wrap('z.any()', schemas, meta)
    }
    const isSchemaOrParameterOrHeaderRef = (
      ref: Ref,
    ): ref is
      | `#/components/schemas/${string}`
      | `#/components/parameters/${string}`
      | `#/components/headers/${string}` =>
      ref.startsWith('#/components/schemas/') ||
      ref.startsWith('#/components/parameters/') ||
      ref.startsWith('#/components/headers/')

    const { allOfSchemas, nullable, onlyRefSchemas } = schemas.allOf.reduce<{
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

        if (s.$ref && Object.keys(s).length === 1 && isSchemaOrParameterOrHeaderRef(s.$ref)) {
          return {
            allOfSchemas: [...acc.allOfSchemas, refSchema(s.$ref)],
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
          schemas.nullable === true ||
          (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null'),
        onlyRefSchemas: true,
      },
    )
    const isBareAllOf = Object.keys(schemas).every(
      (key) => key === 'allOf' || key === 'nullable' || key === 'type',
    )
    if (allOfSchemas.length === 0) {
      return wrap('z.any()', { ...schemas, nullable }, meta)
    }
    if (allOfSchemas.length === 1) {
      if (onlyRefSchemas && isBareAllOf) {
        return nullable ? `${allOfSchemas[0]}.nullable()` : allOfSchemas[0]
      }
      return wrap(allOfSchemas[0], { ...schemas, nullable }, meta)
    }
    const z = `z.intersection(${allOfSchemas.join(',')})`
    return wrap(z, schemas, meta)
  }

  /* anyOf */
  if (schemas.anyOf !== undefined) {
    if (!schemas.anyOf || schemas.anyOf.length === 0) {
      return wrap('z.any()', schemas, meta)
    }
    const anyOfSchemas = schemas.anyOf.map((subSchema) => {
      if (subSchema.$ref && Object.keys(subSchema).length === 1) {
        const isSchemaOrParameterOrHeaderRef = (
          ref: Ref,
        ): ref is
          | `#/components/schemas/${string}`
          | `#/components/parameters/${string}`
          | `#/components/headers/${string}` =>
          ref.startsWith('#/components/schemas/') ||
          ref.startsWith('#/components/parameters/') ||
          ref.startsWith('#/components/headers/')

        if (isSchemaOrParameterOrHeaderRef(subSchema.$ref)) {
          return refSchema(subSchema.$ref)
        }
      }
      return zodToOpenAPI(subSchema, meta)
    })
    const z = `z.union([${anyOfSchemas.join(',')}])`
    return wrap(z, schemas, meta)
  }

  /* oneOf */
  if (schemas.oneOf !== undefined) {
    if (!schemas.oneOf || schemas.oneOf.length === 0) {
      return wrap('z.any()', schemas, meta)
    }
    const oneOfSchemas = schemas.oneOf.map((schema) => {
      if (schema.$ref && Object.keys(schema).length === 1) {
        const isSchemaOrParameterOrHeaderRef = (
          ref: Ref,
        ): ref is
          | `#/components/schemas/${string}`
          | `#/components/parameters/${string}`
          | `#/components/headers/${string}` =>
          ref.startsWith('#/components/schemas/') ||
          ref.startsWith('#/components/parameters/') ||
          ref.startsWith('#/components/headers/')

        if (isSchemaOrParameterOrHeaderRef(schema.$ref)) {
          return refSchema(schema.$ref)
        }
      }
      return zodToOpenAPI(schema, meta)
    })
    // discriminatedUnion Support hesitant
    // This is because using intersection causes a type error.
    // const discriminator = schema.discriminator?.propertyName
    // const z = discriminator
    //   ? `z.discriminatedUnion('${discriminator}',[${schemas.join(',')}])`
    //   : `z.union([${schemas.join(',')}])`
    // return wrap(z, schema, paramName, paramIn)
    const z = `z.union([${oneOfSchemas.join(',')}])`
    return wrap(z, schemas, meta)
  }

  /* not */
  if (schemas.not !== undefined) {
    if (
      typeof schemas.not === 'object' &&
      schemas.not.type &&
      typeof schemas.not.type === 'string'
    ) {
      const predicate = `(v) => typeof v !== '${schemas.not.type}'`
      const z = `z.any().refine(${predicate})`
      return wrap(z, schemas, meta)
    }
    if (typeof schemas.not === 'object' && Array.isArray(schemas.not.enum)) {
      const list = JSON.stringify(schemas.not.enum)
      const predicate = `(v) => !${list}.includes(v)`
      const z = `z.any().refine(${predicate})`
      return wrap(z, schemas, meta)
    }
    return wrap('z.any()', schemas, meta)
  }

  /* const */
  if (schemas.const !== undefined) {
    const z = `z.literal(${JSON.stringify(schemas.const)})`
    return wrap(z, schemas, meta)
  }

  /* enum */
  if (schemas.enum !== undefined) return wrap(_enum(schemas), schemas, meta)
  /* properties */
  if (schemas.properties !== undefined) return wrap(object(schemas), schemas, meta)
  const t = normalizeTypes(schemas.type)
  /* string */
  if (t.includes('string')) return wrap(string(schemas), schemas, meta)
  /* number */
  if (t.includes('number')) return wrap(number(schemas), schemas, meta)
  /* integer & bigint */
  if (t.includes('integer')) return wrap(integer(schemas), schemas, meta)
  /* boolean */
  if (t.includes('boolean')) return wrap('z.boolean()', schemas, meta)
  /* array */
  if (t.includes('array')) {
    const isSchemaOrParameterOrHeaderRef = (
      ref: Ref,
    ): ref is
      | `#/components/schemas/${string}`
      | `#/components/parameters/${string}`
      | `#/components/headers/${string}` =>
      ref.startsWith('#/components/schemas/') ||
      ref.startsWith('#/components/parameters/') ||
      ref.startsWith('#/components/headers/')

    const item = schemas.items?.$ref
      ? isSchemaOrParameterOrHeaderRef(schemas.items.$ref)
        ? refSchema(schemas.items.$ref)
        : schemas.items
          ? zodToOpenAPI(schemas.items, meta)
          : 'z.any()'
      : schemas.items
        ? zodToOpenAPI(schemas.items, meta)
        : 'z.any()'
    const z = `z.array(${item})`

    if (typeof schemas.minItems === 'number' && typeof schemas.maxItems === 'number') {
      // return schemas.minItems === schemas.maxItems
      //   ? `${z}.length(${schemas.minItems})`
      //   : `${z}.min(${schemas.minItems}).max(${schemas.maxItems})`
      return schemas.minItems === schemas.maxItems
        ? wrap(`${z}.length(${schemas.minItems})`, schemas, meta)
        : wrap(`${z}.min(${schemas.minItems}).max(${schemas.maxItems})`, schemas, meta)
    }
    // if (typeof schemas.minItems === 'number') return `${z}.min(${schemas.minItems})`
    // if (typeof schemas.maxItems === 'number') return `${z}.max(${schemas.maxItems})`
    if (typeof schemas.minItems === 'number')
      return wrap(`${z}.min(${schemas.minItems})`, schemas, meta)
    if (typeof schemas.maxItems === 'number')
      return wrap(`${z}.max(${schemas.maxItems})`, schemas, meta)

    return wrap(z, schemas, meta)
  }
  // if (t.includes('array')) return wrap(array(schemas), schemas, meta)
  /* object */
  // if (t.includes('object')) return wrap(object(schemas), schemas, meta)
  if (t.includes('object')) {
    // allOf, oneOf, anyOf, not
    if (schemas.oneOf) return wrap(zodToOpenAPI(schemas, meta), schemas, meta)
    if (schemas.anyOf) return wrap(zodToOpenAPI(schemas, meta), schemas, meta)
    if (schemas.allOf) return wrap(zodToOpenAPI(schemas, meta), schemas, meta)
    if (schemas.not) return wrap(zodToOpenAPI(schemas, meta), schemas, meta)
    if (schemas.additionalProperties) {
      if (typeof schemas.additionalProperties === 'boolean') {
        if (schemas.properties) {
          const s = propertiesSchema(
            schemas.properties,
            Array.isArray(schemas.required) ? schemas.required : [],
          )
          if (schemas.additionalProperties === true) {
            // return s.replace('object', 'looseObject')
            return wrap(s.replace('object', 'looseObject'), schemas, meta)
          }
          if (schemas.additionalProperties === false) {
            // return s.replace('object', 'strictObject')
            return wrap(s.replace('object', 'strictObject'), schemas, meta)
          }
          return wrap(s, schemas, meta)
        }
        const s = 'z.object({})'
        if (schemas.additionalProperties === true) {
          // return s.replace('object', 'looseObject')
          return wrap(s.replace('object', 'looseObject'), schemas, meta)
        }
        if (schemas.additionalProperties === false) {
          // return s.replace('object', 'strictObject')
          return wrap(s.replace('object', 'strictObject'), schemas, meta)
        }
        // return s
        return wrap(s, schemas, meta)
      }
      const s = zodToOpenAPI(schemas.additionalProperties, meta)
      // return `z.record(z.string(),${s})`
      return wrap(`z.record(z.string(),${s})`, schemas, meta)
    }
    if (schemas.properties) {
      const s = propertiesSchema(
        schemas.properties,
        Array.isArray(schemas.required) ? schemas.required : [],
      )
      if (schemas.additionalProperties === false) {
        // return s.replace('object', 'strictObject')
        return wrap(s.replace('object', 'strictObject'), schemas, meta)
      }
      if (schemas.additionalProperties === true) {
        // return s.replace('object', 'looseObject')
        return wrap(s.replace('object', 'looseObject'), schemas, meta)
      }
      // return s
      return wrap(s, schemas, meta)
    }
    if (schemas.additionalProperties === false) {
      // return 'z.strictObject({})'
      return wrap('z.strictObject({})', schemas, meta)
    }
    if (schemas.additionalProperties === true) {
      // return 'z.looseObject({})'
      return wrap('z.looseObject({})', schemas, meta)
    }
    // return 'z.object({})'
    return wrap('z.object({})', schemas, meta)
  }
  /* date */
  if (t.includes('date')) return wrap('z.date()', schemas, meta)
  /* null only */
  if (t.length === 1 && t[0] === 'null') return wrap('z.null()', schemas, meta)
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schemas)}`)
  return wrap('z.any()', schemas, meta)
}
