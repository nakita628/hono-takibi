import type { Schema } from '../../../openapi/index.js'

const FORMAT_STRING: { readonly [k: string]: string } = {
  email: 'email()',
  uuid: 'uuid()',
  uuidv4: 'uuidv4()',
  uuidv6: 'uuidv6()',
  uuidv7: 'uuidv7()',
  uri: 'url()',
  emoji: 'emoji()',
  base64: 'base64()',
  base64url: 'base64url()',
  hex: 'hex()',
  jwt: 'jwt()',
  nanoid: 'nanoid()',
  cuid: 'cuid()',
  cuid2: 'cuid2()',
  ulid: 'ulid()',
  ipv4: 'ipv4()',
  ipv6: 'ipv6()',
  mac: 'mac()',
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
 * @example
 * ```ts
 * // With format, pattern, and minLength
 * string({ type: 'string', format: 'email', pattern: '^.+@example\\.com$', minLength: 5 })
 * // => 'z.email().regex(/^.+@example\\.com$/).min(5)'
 * ```
 *
 * @param schemas - OpenAPI string schema
 * @returns Concatenated Zod string schema
 */
export function string(schema: Schema): string {
  const format = schema.format && FORMAT_STRING[schema.format]
  const base = format ? `z.${format}` : 'z.string()'

  // Add 'u' flag for Unicode property escapes (\p{...} or \P{...})
  const hasUnicodeProperty = schema.pattern && /\\[pP]\{/.test(schema.pattern)
  const pattern = schema.pattern
    ? `.regex(/${schema.pattern.replace(/(?<!\\)\//g, '\\/')}/${hasUnicodeProperty ? 'u' : ''})`
    : undefined

  const isFixedLength =
    schema.minLength !== undefined &&
    schema.maxLength !== undefined &&
    schema.minLength === schema.maxLength

  return [
    base,
    pattern,
    // minLength === maxLength → .length(n)
    isFixedLength ? `.length(${schema.minLength})` : undefined,
    !isFixedLength && schema.minLength !== undefined ? `.min(${schema.minLength})` : undefined,
    !isFixedLength && schema.maxLength !== undefined ? `.max(${schema.maxLength})` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join('')
}
