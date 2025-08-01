import { wrap } from '../../../helper/wrap.js'
import type { Schema } from '../../../openapi/index.js'

export function date(schema: Schema): string {
  const z = 'z.date()'
  return wrap(z, schema)
}
