import { removeZodOptional } from '../../core/text/remove-zod-optional'
import { isOptional } from '../../core/validator/is-optional'

/**
 * Generates a Zod schema string with OpenAPI example while preserving optional status
 *
 * @function generateZodOpenAPIExample
 * @param schema - Original Zod schema string
 * @param example - Example value to be added
 * @returns Generated Zod schema string with OpenAPI example
 *
 * @example
 * generateZodOpenAPIExample('z.string().optional()', 'test@example.com')
 * // Returns: 'z.string().optional().openapi({example:"test@example.com"})'
 */
export function generateZodOpenAPIExample(schema: string, example: unknown): string {
  const hasOptional = isOptional(schema)
  const schemaWithoutOptional = removeZodOptional(schema)
  return `${schemaWithoutOptional}${hasOptional ? '.optional()' : ''}.openapi({example:${JSON.stringify(example)}})`
}
