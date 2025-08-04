import { wrap } from '../../../helper/wrap.js'
import type { Schema } from '../../../openapi/index.js'
import { refSchema } from '../../../utils/index.js'
import zod from '../index.js'

/**
 * Generates a Zod-compatible schema string for a given property.
 *
 * - Delegates `$ref` schemas to `referenceSchema`
 * - Handles arrays with referenced items via `arrayReferenceSchema`
 * - Falls back to `zodToOpenAPI` for primitives or complex inline schemas
 *
 * @param schema - The OpenAPI schema object for the property
 * @returns The corresponding Zod schema string
 *
 * @example
 * // Primitive string type
 * propertySchema({ type: 'string' })
 * // → 'z.string()'
 *
 * @example
 * // Reference to another schema
 * propertySchema({ $ref: '#/components/schemas/User' })
 * // → 'userSchema'
 *
 * @example
 * // Array of referenced items
 * propertySchema({ type: 'array', items: { $ref: '#/components/schemas/Tag' } })
 * // → 'z.array(tagSchema)'
 */
export function zodToOpenAPI(
  schema: Schema,
  paramName?: string,
  paramIn?: 'path' | 'query' | 'header' | 'cookie',
): string {
  // allOf
  if (schema.allOf) {
    if (!schema.allOf || schema.allOf.length === 0) {
      return wrap('z.any()', schema)
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
      return wrap('z.any()', { ...schema, nullable })
    }

    if (schemas.length === 1) {
      return wrap(schemas[0], { ...schema, nullable })
    }

    const z = `z.intersection(${schemas.join(',')})`
    return wrap(z, schema)
  }

  // anyOf
  if (schema.anyOf) {
    if (!schema.anyOf || schema.anyOf.length === 0) {
      return 'z.any()'
    }
    // self-reference not call wrap
    const schemas = schema.anyOf.map((subSchema) => {
      // return zod(subSchema)
      return zodToOpenAPI(subSchema, paramName, paramIn)
    })
    const z = `z.union([${schemas.join(',')}])`
    return wrap(z, schema)
  }

  if (Boolean(schema.$ref) === true) {
    if (schema.$ref) {
      return wrap(refSchema(schema.$ref), schema)
    }
    return 'z.any()'
  }
  if (schema.type === 'array' && Boolean(schema.items?.$ref)) {
    if (schema.items?.$ref) {
      const ref = wrap(refSchema(schema.items.$ref), schema.items)
      return `z.array(${ref})`
    }
    return 'z.array(z.any())'
  }

  // oneOf
  if (schema.oneOf) {
    if (!schema.oneOf || schema.oneOf.length === 0) {
      return 'z.any()'
    }
    // self-reference not call wrap
    const schemas = schema.oneOf.map((schema) => {
      // return zod(schema)
      return zodToOpenAPI(schema, paramName, paramIn)
    })
    // discriminatedUnion Support hesitant
    // This is because using intersection causes a type error.
    // const discriminator = schema.discriminator?.propertyName
    // const z = discriminator
    //   ? `z.discriminatedUnion('${discriminator}',[${schemas.join(',')}])`
    //   : `z.union([${schemas.join(',')}])`
    const z = `z.union([${schemas.join(',')}])`
    return wrap(z, schema)
  }

  return wrap(zod(schema), schema, paramName, paramIn)
  // return zodToOpenAPI(z, schema, paramName, paramIn)
}
