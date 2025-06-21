import type { Parameters } from '../../../../../openapi/types.js'
import { coerce } from '../../../../zod/coerce.js'
import { stringbool } from '../../../../zod/stringbool.js'

export function queryParameter(baseSchema: string, param: Parameters): string {
  if (param.in === 'query' && (param.schema.type === 'number' || param.schema.type === 'integer')) {
    return coerce(baseSchema)
  }

  if (param.in === 'query' && param.schema.type === 'boolean') {
    return stringbool(baseSchema)
  }
  return baseSchema
}
