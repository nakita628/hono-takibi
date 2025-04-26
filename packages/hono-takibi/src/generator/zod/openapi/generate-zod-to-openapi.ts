import type { ExampleValue } from '../../../types'

/**
 * Generate OpenAPI example value from Zod example value
 * @param { ExampleValue } example - The example value to generate OpenAPI example value from
 * @param { string } paramName - The name of the parameter
 * @param { boolean } isPath - Whether the example value is a path parameter
 * @returns { string } The OpenAPI example value
 */
export function generateZodToOpenAPI(
  example: ExampleValue,
  paramName?: string,
  isPath?: boolean,
): string {
  if (isPath) {
    return `.openapi({param:{name:'${paramName}',in:'path'},example:${JSON.stringify(example)}})`
  }
  return `.openapi({example:${JSON.stringify(example)}})`
}
