import type { Schema } from '../../openapi/index.js'
import { zod } from '../zod/index.js'

/**
 * Converts a Zod schema into a Zod schema with `.openapi()` metadata if needed.
 * The order of fields in `.openapi({ ... })` will follow the original OpenAPI YAML order.
 * @param schema - Schema metadata
 * @param paramName - Parameter name, if applicable
 * @param paramIn - Parameter location: path/query/header/cookie
 * @returns Zod schema string with optional `.openapi({...})` metadata
 */
export function zodToOpenAPI(
  schema: Schema,
  paramName?: string,
  paramIn?: 'path' | 'query' | 'header' | 'cookie',
): string {
  const z = zod(schema)
  const openapiProps: string[] = []

  if (paramIn && paramName) {
    const required = paramIn === 'path' ? true : !!schema.required
    openapiProps.push(
      `param:{in:"${paramIn}",name:${JSON.stringify(paramName)},required:${required}}`,
    )
  }

  // Add 'example' if defined
  if ('example' in schema && schema.example !== undefined) {
    openapiProps.push(`example:${JSON.stringify(schema.example)}`)
  }

  // Add 'examples' if defined
  if ('examples' in schema && Array.isArray(schema.examples) && schema.examples.length > 0) {
    openapiProps.push(`examples:${JSON.stringify(schema.examples)}`)
  }

  // Add 'description' if defined
  if ('description' in schema && schema.description !== undefined) {
    openapiProps.push(`description:${JSON.stringify(schema.description)}`)
  }

  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}
