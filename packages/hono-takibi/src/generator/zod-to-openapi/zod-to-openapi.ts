import type { Config } from '../../config/index.js'
import type { Schema } from '../../types/index.js'
import { zod } from '../zod/index.js'

/**
 * Converts a Zod schema into a Zod schema with `.openapi()` metadata if needed.
 *
 * @param config - Global config
 * @param schema - Schema metadata
 * @param paramName - If provided and isPath is true, will set param name
 * @param isPath - Whether schema is for a path parameter
 * @returns A string like `z.string().openapi({...})` or just `z.string()`
 */
export function zodToOpenAPI(
  config: Config,
  schema: Schema,
  paramName?: string,
  isPath?: boolean,
): string {
  const z = zod(config, schema)

  const description = schema.description
    ? `description:${JSON.stringify(schema.description)}`
    : undefined

  const example =
    schema.example !== undefined ? `example:${JSON.stringify(schema.example)}` : undefined

  const param =
    isPath && paramName ? `param:{in:"path",name:${JSON.stringify(paramName)}}` : undefined

  const parts = [param, description, example].filter(Boolean)

  if (parts.length === 0) {
    return z
  }

  return `${z}.openapi({${parts.join(',')}})`
}
