import { zodToOpenAPI } from '../generator/zod/helper/property-schema.js'
import type { Schema } from '../openapi/index.js'
import { wrap } from './wrap.js'

export function allOf(schema: Schema): string {
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

      const z = zodToOpenAPI(s)
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

  return `z.intersection(${schemas.join(',')})`
}
