import type { Schema } from '../openapi/index.js'
import { refSchema } from '../utils/index.js'
import { wrap } from './wrap.js'

export function ref(schema: Schema): string {
  if (schema.$ref) {
    return wrap(refSchema(schema.$ref), schema)
  }
  return 'z.any()'
}
