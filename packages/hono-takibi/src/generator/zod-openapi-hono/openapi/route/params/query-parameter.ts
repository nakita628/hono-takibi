import type { Parameters } from '../../../../../openapi/index.js'

/**
 * Generates a Zod schema string for a query parameter, with coercion applied based on its type.
 *
 * @param schema - The base Zod schema string.
 * @param param - The OpenAPI parameter object.
 * @returns The transformed Zod schema string.
 *
 * @remarks
 * - Applies `z.coerce` to numbers and dates.
 * - Applies `stringbool` to booleans to support string-based boolean input.
 * - Returns the base schema unchanged for other types or locations.
 */
export function queryParameter(
  schema: Readonly<string>,
  param: Readonly<Parameters>,
): Readonly<string> {
  if (param.in === 'query' && param.schema.type === 'number') {
    return `z.coerce.${schema.replace('z.', '')}`
  }
  if (param.in === 'query' && param.schema.type === 'boolean') {
    return schema.replace('boolean', 'stringbool')
  }
  if (param.in === 'query' && param.schema.type === 'date') {
    return `z.coerce.${schema.replace('z.', '')}`
  }
  return schema
}
