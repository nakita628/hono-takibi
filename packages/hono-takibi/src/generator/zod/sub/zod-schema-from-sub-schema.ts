import { refName } from '../../../core/utils/index.js'
import type { Schema } from '../../../openapi/index.js'
import { zod } from '../index.js'

/**
 * Generates a Zod schema string from a given OpenAPI sub-schema.
 *
 * If the schema contains a `$ref`, it resolves to the corresponding schema name;
 * otherwise, it generates an inline Zod schema using the `zod()` converter.
 *
 * @param subSchema - The OpenAPI sub-schema object.
 * @returns The Zod schema string (e.g., `'UserSchema'` or `'z.string()'`).
 *
 * @example
 * ```ts
 * // With $ref
 * zodSchemaFromSubSchema({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 *
 * // Without $ref
 * zodSchemaFromSubSchema({ type: 'string', minLength: 3 })
 * // → 'z.string().min(3)'
 * ```
 */
export function zodSchemaFromSubSchema(subSchema: Schema): string {
  return subSchema.$ref ? `${refName(subSchema.$ref)}Schema` : zod(subSchema)
}
