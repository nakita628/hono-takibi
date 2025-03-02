import type { ExampleValue } from '../../../type'

/**
 * Generate OpenAPI example value from Zod example value
 *
 * @function generateZodToOpenAPI
 * @param {ExampleValue} example - The example value to generate OpenAPI example value from
 * @returns {string} The OpenAPI example value
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
