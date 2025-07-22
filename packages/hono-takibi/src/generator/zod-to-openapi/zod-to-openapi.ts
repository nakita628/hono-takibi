import type { Schema } from '../../openapi/index.js'
import { zod } from '../zod/index.js'

/**
 * Converts an OpenAPI schema to a Zod schema string with `.openapi()` metadata.
 *
 * @param schema - The OpenAPI schema to convert
 * @param paramName - Optional name of the parameter (used for OpenAPI param metadata)
 * @param paramIn - Optional location of the parameter: 'path' | 'query' | 'header' | 'cookie'
 * @returns A string representing the Zod schema, optionally with `.openapi({...})` metadata
 *
 * @example
 * zodToOpenAPI({ type: 'string', example: 'hello' })
 * // → 'z.string().openapi({example:"hello"})'
 *
 * @example
 * zodToOpenAPI({ type: 'integer' }, 'userId', 'path')
 * // → 'z.number().int().openapi({param:{in:"path",name:"userId",required:true}})'
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
