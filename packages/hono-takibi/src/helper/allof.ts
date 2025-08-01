import { zod } from '../generator/zod/index.js'
import type { Schema } from '../openapi/index.js'
import { refSchema } from '../utils/index.js'
import { wrap } from './wrap.js'

export function allOf(schema: Schema): string {
  if (!schema.allOf || schema.allOf.length === 0) {
    return wrap('z.any()', schema)
  }

  const schemas = schema.allOf
  .filter((s) => !(typeof s === 'object' && s?.nullable === true && Object.keys(s).length === 1))
  .map((subSchema) =>
    subSchema.$ref ? refSchema(subSchema.$ref) : wrap(zod(subSchema), subSchema)
  )

  if (schemas.length === 0) {
    return wrap('z.any()', schema)
  }

  if (schemas.length === 1) {
    return wrap(schemas[0], schema)
  }

  if (schema.discriminator) {
    console.log(schema.discriminator) // TODO: implement later
  }

  const z = `z.intersection(${schemas.join(',')})`
  return wrap(z, schema)
}
