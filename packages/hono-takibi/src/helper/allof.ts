import { zod } from '../generator/zod/index.js'
import type { Schema } from '../openapi/index.js'
import { refSchema } from '../utils/index.js'
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
        typeof s === 'object' && s?.nullable === true && Object.keys(s).length === 1
      if (isOnlyNullable) {
        return { ...acc, nullable: true }
      }

      const z = '$ref' in s
        ? refSchema(s.$ref!)
        : zod(s)

      return {
        nullable: acc.nullable,
        schemas: [...acc.schemas, wrap(z, s)],
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
  return wrap(z, { ...schema, nullable })
}
