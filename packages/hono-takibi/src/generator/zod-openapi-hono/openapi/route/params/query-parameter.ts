import type { Parameters } from '../../../../../openapi/types.js'
import { coerce, stringbool } from '../../../../zod/z/index.js'

export function queryParameter(baseSchema: string, param: Parameters): string {
  if (param.in === 'query' && param.schema.type === 'number') {
    return coerce(baseSchema)
  }

  if (param.in === 'query' && param.schema.type === 'boolean') {
    return stringbool(baseSchema)
  }
  return baseSchema
}
