import { wrap } from '../../../helper/wrap.js'
import type { Schema } from '../../../openapi/index.js'

export function boolean(schema: Schema): string {
  const z = 'z.boolean()'
  return wrap(z, schema)
}
