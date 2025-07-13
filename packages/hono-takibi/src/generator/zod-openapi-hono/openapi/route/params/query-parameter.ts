import type { Parameters } from '../../../../../openapi/types.js'
import { coerce, stringbool } from '../../../../zod/z/index.js'

/**
 * @param { string } baseSchema - The base Zod schema to be used for query parameters
 * @param { string } baseSchema - The base Zod schema to be used for query parameters
 * @param { Parameters } param - The OpenAPI parameter definition
 * @returns { string } - The Zod schema string for the query parameter
 * @description This function generates a Zod schema string for query parameters, applying coercion for
 */
export function queryParameter(baseSchema: string, param: Parameters): string {
  if (param.in === 'query' && param.schema.type === 'number') {
    return coerce(baseSchema)
  }

  if (param.in === 'query' && param.schema.type === 'boolean') {
    return stringbool(baseSchema)
  }

  if (param.in === 'query' && param.schema.type === 'date') {
    return coerce(baseSchema)
  }
  return baseSchema
}
