import type { ExampleValue } from '../../types'
import { generateZodOpenAPIExample } from './generate-zod-openapi-example'

/**
 * @description
 * Generates a zod pipe function to coerce a value to a zod schema.
 *
 * @function generateZodCoerce
 * @param z - The zod schema to coerce to.
 * @param zodSchema - The zod schema to coerce.
 * @returns A zod pipe function to coerce a value to a zod schema.
 */
// export function generateZodCoerce(z: string, zodSchema: string) {
//   const zod = removeZodPrefix(zodSchema)
//   return `${z}.pipe(z.coerce.${zod})`
// }

/**
 * Generates a Zod coercion schema using pipe with example support
 */
export function generateZodCoerce(
  inputSchema: string,
  outputSchema: string,
  example?: ExampleValue,
): string {
  const coerceSchema = outputSchema.replace('z.', 'z.coerce.')
  const finalSchema = example ? generateZodOpenAPIExample(coerceSchema, example) : coerceSchema
  return `${inputSchema}.pipe(${finalSchema})`
}
