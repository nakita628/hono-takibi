import type { Schema } from '../../openapi/index.js'
import { zod } from '../zod/index.js'

/**
 * Converts a Zod schema to an OpenAPI schema string with optional parameters.
 * @param { Schema } schema - The Zod schema to convert.
 * @param { string } paramName - The name of the parameter (optional).
 * @param { 'path' | 'query' | 'header' | 'cookie' } paramIn - The location of the parameter (optional).
 * @returns { string } The OpenAPI schema string.
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
