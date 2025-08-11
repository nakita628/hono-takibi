import type { Schema } from '../../../openapi/index.js'
import { regex } from '../../../utils/index.js'

const FORMAT_STRING: Record<string, string> = {
  email: 'email()',
  uuid: 'uuid()',
  uuidv4: 'uuidv4()',
  uuidv6: 'uuidv6()',
  uuidv7: 'uuidv7()',
  uri: 'url()',
  emoji: 'emoji()',
  base64: 'base64()',
  base64url: 'base64url()',
  nanoid: 'nanoid()',
  cuid: 'cuid()',
  cuid2: 'cuid2()',
  ulid: 'ulid()',
  ipv4: 'ipv4()',
  ipv6: 'ipv6()',
  cidrv4: 'cidrv4()',
  cidrv6: 'cidrv6()',
  date: 'iso.date()',
  time: 'iso.time()',
  'date-time': 'iso.datetime()',
  duration: 'iso.duration()',
  binary: 'file()',
  toLowerCase: 'toLowerCase()',
  toUpperCase: 'toUpperCase()',
  trim: 'trim()',
  jwt: 'jwt()',
}

/**
 * Builds a Zod string schema from an OpenAPI string schema definition.
 *
 * - If `schema.format` exists and matches `FORMAT_STRING`, uses `z.<format>()`; otherwise falls back to `z.string()`
 * - If `schema.pattern` is set, appends `.regex(...)` using the `regex()` helper
 * - If `minLength` and `maxLength` are defined and equal, appends `.length(n)`
 * - Otherwise, appends `.min(n)` and/or `.max(n)` individually
 * - Returns the concatenated Zod schema string
 *
 * ```mermaid
 * flowchart TD
 *   A["string(schema)"] --> B["format = schema.format && FORMAT_STRING[format]"]
 *   B --> C{"Format exists?"}
 *   C -- "Yes" --> D["o.push(z.${format})"]
 *   C -- "No"  --> E["o.push(z.string())"]
 *   D --> F{"Pattern exists?"}
 *   E --> F
 *   F -- "Yes" --> G["o.push(regex(schema.pattern))"]
 *   F -- "No"  --> I
 *   G --> I{"minLength and maxLength are equal?"}
 *   I -- "Yes" --> J["o.push(length(minLength))"]
 *   I -- "No"  --> K{"minLength or maxLength?"}
 *   K -- "min" --> L["o.push(min(minLength))"]
 *   K -- "max" --> M["o.push(max(maxLength))"]
 *   L --> N["return o.join('')"]
 *   M --> N
 *   J --> N
 * ```
 *
 * @example
 * ```ts
 * // With format, pattern, and minLength
 * string({ type: 'string', format: 'email', pattern: '^.+@example\\.com$', minLength: 5 })
 * // => 'z.email().regex(/^.+@example\\.com$/).min(5)'
 * ```
 *
 * @param schema - OpenAPI string schema
 * @returns Concatenated Zod string schema
 */
export function string(schema: Schema): string {
  const o: string[] = []
  const format = schema.format && FORMAT_STRING[schema.format]
  o.push(format ? `z.${format}` : 'z.string()')
  // pattern
  if (schema.pattern) {
    o.push(regex(schema.pattern))
  }
  // length
  if (
    schema.minLength !== undefined &&
    schema.maxLength !== undefined &&
    schema.minLength === schema.maxLength
  ) {
    o.push(`.length(${schema.minLength})`)
  } else {
    if (schema.minLength !== undefined) {
      o.push(`.min(${schema.minLength})`)
    }
    if (schema.maxLength !== undefined) {
      o.push(`.max(${schema.maxLength})`)
    }
  }
  return o.join('')
}
