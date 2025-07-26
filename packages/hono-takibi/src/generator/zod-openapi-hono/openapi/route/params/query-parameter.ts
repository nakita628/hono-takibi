import type { Parameters } from '../../../../../openapi/types.js'
import { coerce, stringbool } from '../../../../zod/utils/index.js'

/**
 * Generates a Zod schema string for a query parameter, with coercion applied based on its type.
 *
 * @param baseSchema - The base Zod schema string.
 * @param param - The OpenAPI parameter object.
 * @returns The transformed Zod schema string.
 *
 * @remarks
 * - Applies `z.coerce` to numbers and dates.
 * - Applies `stringbool` to booleans to support string-based boolean input.
 * - Returns the base schema unchanged for other types or locations.
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
