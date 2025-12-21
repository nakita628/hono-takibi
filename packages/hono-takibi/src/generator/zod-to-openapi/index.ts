import { wrap } from '../../helper/wrap.js'
import type { Headers, Parameters, Ref, Schemas } from '../../openapi/index.js'
import { normalizeTypes, refSchema } from '../../utils/index.js'
import { array } from './z/array.js'
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
      return wrap(refSchema(schemas.$ref), schemas, meta)
    }
  }
  /* combinators */
  /** allOf */
  if (schemas.allOf !== undefined) {
    if (!schemas.allOf || schemas.allOf.length === 0) {
      return wrap('z.any()', schemas, meta)
    }
    const { allOfSchemas, nullable } = schemas.allOf.reduce<{
      allOfSchemas: string[]
      nullable: boolean
    }>(
      (acc, s) => {
        const isOnlyNullable =
          (typeof s === 'object' && s.type === 'null') ||
          (typeof s === 'object' && s?.nullable === true && Object.keys(s).length === 1)

        if (isOnlyNullable) {
          return {
            allOfSchemas: acc.allOfSchemas,
            nullable: true,
          }
        }

        const z = zodToOpenAPI(s, meta)
        return {
          allOfSchemas: [...acc.allOfSchemas, z],
          nullable: acc.nullable,
        }
      },
      {
        allOfSchemas: [],
        nullable:
          schemas.nullable === true ||
          (Array.isArray(schemas.type) ? schemas.type.includes('null') : schemas.type === 'null'),
      },
    )
    if (allOfSchemas.length === 0) {
      return wrap('z.any()', { ...schemas, nullable }, meta)
    }
    if (allOfSchemas.length === 1) {
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
  if (t.includes('array')) return wrap(array(schemas), schemas, meta)
  /* object */
  if (t.includes('object')) return wrap(object(schemas), schemas, meta)
  /* date */
  if (t.includes('date')) return wrap('z.date()', schemas, meta)
  /* null only */
  if (t.length === 1 && t[0] === 'null') return wrap('z.null()', schemas, meta)
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schemas)}`)
  return wrap('z.any()', schemas, meta)
}
