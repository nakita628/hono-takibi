import type { Schema } from '../openapi/index.js'
import { wrap } from './wrap.js'

export function _const(schema: Schema) {
  const z = `z.literal(${JSON.stringify(schema.const)})`
  return wrap(z, schema)
}
