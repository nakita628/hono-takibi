import type { ExampleValue } from '../../types'

/**
 * Generate OpenAPI example value from Zod example value
 *
 * @function generateZodToOpenAPI
 * @param {ExampleValue} example - The example value to generate OpenAPI example value from
 * @returns {string} The OpenAPI example value
 */
export function generateZodToOpenAPI(example: ExampleValue): string {
  return `.openapi({example:${JSON.stringify(example)}})`
}
