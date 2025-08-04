import type { Schema } from '../openapi/index.js'

export function _const(schema: Schema) {
  return `z.literal(${JSON.stringify(schema.const)})`
}
