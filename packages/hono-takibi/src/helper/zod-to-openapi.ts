import type { Schema } from '../openapi/index.js'

/**
 * Adds OpenAPI metadata to a Zod schema string based on the provided Schema object.
 *
 * If `paramIn` and `paramName` are provided, this will attach parameter-level metadata such as
 * `in`, `name`, and `required` as part of the `.openapi()` object. It also includes
 * `example`, `examples`, and `description` if available in the schema.
 *
 * @param zod - The Zod schema string representation (e.g., `"z.string()"`)
 * @param schema - The OpenAPI schema metadata to extract information like description, examples, etc.
 * @param paramName - The parameter name, required when `paramIn` is provided
 * @param paramIn - The location of the parameter (`path`, `query`, `header`, or `cookie`)
 * @returns The Zod string augmented with `.openapi(...)` metadata if applicable
 *
 * @example
 * ```ts
 * zodToOpenAPI("z.string().min(1)", { description: "User name", example: "Alice" })
 * // => 'z.string().min(1).openapi({example:"Alice",description:"User name"})'
 * ```
 */
export function zodToOpenAPI(
  zod: string,
  schema: Schema,
  paramName?: string,
  paramIn?: 'path' | 'query' | 'header' | 'cookie',
): string {
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

  return openapiProps.length === 0 ? zod : `${zod}.openapi({${openapiProps.join(',')}})`
}
