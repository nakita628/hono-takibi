// import { allOf } from '../../helper/allof.js'
// import { anyOf } from '../../helper/anyof.js'
// import { _const } from '../../helper/const.js'
import { normalizeTypes } from '../../helper/normalize-types.js'
// import { not } from '../../helper/not.js'
// import { oneOf } from '../../helper/oneof.js'
// import { ref } from '../../helper/ref.js'
import type { Schema } from '../../openapi/index.js'
import { zodToOpenAPI } from './helper/zod-to-openapi.js'
import { _enum, array, integer, number, object, string } from './z/index.js'

/**
 * Converts an OpenAPI `Schema` object into a Zod schema string.
 *
 * Handles primitives (`string`, `number`, `boolean`, `array`, `object`, `integer`),
 * references (`$ref`), constants (`const`), enums, combinators (`oneOf`, `anyOf`, `allOf`, `not`),
 * and other schema metadata (`nullable`, `minLength`, `maxLength`, `exclusiveMinimum`, etc).
 *
 * If the schema is unrecognized or empty, defaults to `'z.any()'`.
 *
 * @param schema - The OpenAPI schema object to convert
 * @returns A string representing the corresponding Zod schema
 *
 * @example
 * // String schema
 * zod({ type: 'string' })
 * // → 'z.string()'
 *
 * @example
 * // Enum schema
 * zod({ type: 'string', enum: ['A', 'B'] })
 * // → 'z.enum(["A","B"])'
 *
 * @example
 * // Nullable number with exclusiveMinimum
 * zod({ type: 'number', exclusiveMinimum: 3, nullable: true })
 * // → 'z.number().gt(3).nullable()'
 *
 * @example
 * // Object with properties
 * zod({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * })
 * // → 'z.object({name:z.string()})'
 *
 * @example
 * // Reference schema
 * zod({ $ref: '#/components/schemas/User' })
 * // → 'UserSchema'
 *
 * @example
 * // Unknown schema
 * zod({})
 * // → 'z.any()'
 *
 * @remarks
 * - Automatically applies `.nullable()` if applicable
 * - Combines `.min()` / `.max()` into `.length()` where appropriate
 * - Optimizes out redundant `.min()` when `.gt()` is used
 * - Logs unhandled cases to `console.warn`
 */

export default function zod(schema: Schema): string {
  if (schema === undefined) throw new Error('hono-takibi: only #/components/schemas/* is supported')
  /* $ref */
  if (schema.$ref) return zodToOpenAPI(schema)
  /* combinators */
  if (schema.oneOf) return zodToOpenAPI(schema)
  if (schema.anyOf) return zodToOpenAPI(schema)
  if (schema.allOf) return zodToOpenAPI(schema)
  if (schema.not) return zodToOpenAPI(schema)
  /* const */
  if (schema.const) return zodToOpenAPI(schema)
  /* enum */
  if (schema.enum) return _enum(schema)
  /* properties */
  if (schema.properties) return object(schema)
  const t = normalizeTypes(schema.type)
  /* string */
  if (t.includes('string')) return string(schema)
  /* number */
  if (t.includes('number')) return number(schema)
  /* integer & bigint */
  if (t.includes('integer')) return integer(schema)
  /* boolean */
  if (t.includes('boolean')) return 'z.boolean()'
  /* array */
  if (t.includes('array')) return array(schema)
  /* object */
  if (t.includes('object')) return object(schema)
  /* date */
  if (t.includes('date')) return 'z.date()'
  /* null only */
  if (t.length === 1 && t[0] === 'null') return 'z.null()'
  console.warn(`fallback to z.any(): schema=${JSON.stringify(schema)}`)
  return 'z.any()'
}
