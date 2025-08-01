import type { Schema } from '../openapi/index.js'
import { wrap } from './wrap.js'

export function not(schema: Schema) {
  if (typeof schema.not === 'object' && schema.not.type && typeof schema.not.type === 'string') {
    const predicate = `(v) => typeof v !== '${schema.not.type}'`
    const z = `z.any().refine(${predicate})`
    return wrap(z, schema)
  }
  if (typeof schema.not === 'object' && Array.isArray(schema.not.enum)) {
    const list = JSON.stringify(schema.not.enum)
    const predicate = `(v) => !${list}.includes(v)`
    const z = `z.any().refine(${predicate})`
    return wrap(z, schema)
  }
  const z = 'z.any()'
  return wrap(z, schema)
}
