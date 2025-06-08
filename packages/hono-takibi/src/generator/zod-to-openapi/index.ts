import type { Config } from '../../config/index.js'
import type { Schema } from '../../types/index.js'
import { generateZod } from '../zod/generate-zod.js'
import { generateZodToOpenAPIExample } from './example/generate-zod-to-openapi-example.js'

/**
 * Generates OpenAPI schema from Zod schema
 * @param { Config } config - The configuration object
 * @param { Schema } schema - The Zod schema to convert
 * @param { string } [paramName] - Optional parameter name for path parameters
 * @param { boolean } [isPath] - Whether the schema is for a path parameter
 */
export function generateZodToOpenAPI(
  config: Config,
  schema: Schema,
  paramName?: string,
  isPath?: boolean,
) {
  const zod = generateZod(config, schema)
  if (schema.example) {
    const zod = generateZod(config, schema)
    return generateZodToOpenAPIExample(zod, schema.example, paramName, isPath)
  }
  return zod
}
