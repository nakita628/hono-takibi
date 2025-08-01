import { wrap } from '../../../helper/wrap.js'
import type { Schema } from '../../../openapi/index.js'
import zod from '../index.js'

export function array(schema: Schema): string {
  const array = `z.array(${schema.items ? zod(schema.items) : 'z.any()'})`
  if (typeof schema.minItems === 'number' && typeof schema.maxItems === 'number') {
    if (schema.minItems === schema.maxItems) {
      const z = `${array}.length(${schema.minItems})`
      return wrap(z, schema)
    }
    const z = `${array}.min(${schema.minItems}).max(${schema.maxItems})`
    return wrap(z, schema)
  }
  if (typeof schema.minItems === 'number') {
    const z = `${array}.min(${schema.minItems})`
    return wrap(z, schema)
  }
  if (typeof schema.maxItems === 'number') {
    const z = `${array}.max(${schema.maxItems})`
    return wrap(z, schema)
  }
  const z = array
  return wrap(z, schema)
}
