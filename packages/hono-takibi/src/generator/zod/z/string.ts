import type { Schema } from '../../../openapi/index.js'
import { regex, _default, min, max, nullable } from './index.js'

const FORMAT_STRING: Record<string, string> = {
  email: '.email()',
  uuid: '.uuid()',
  uuidv4: '.uuidv4()',
  uuidv6: '.uuidv6()',
  uuidv7: '.uuidv7()',
  uri: '.url()',
  emoji: '.emoji()',
  base64: '.base64()',
  base64url: '.base64url()',
  nanoid: '.nanoid()',
  cuid: '.cuid()',
  cuid2: '.cuid2()',
  ulid: '.ulid()',
  ipv4: '.ipv4()',
  ipv6: '.ipv6()',
  cidrv4: '.cidrv4()',
  cidrv6: '.cidrv6()',
  date: '.iso.date()',
  time: '.iso.time()',
  'date-time': '.iso.datetime()',
  duration: 'iso.duration()',
  binary: '.file()',
  toLowerCase: '.toLowerCase()',
  toUpperCase: '.toUpperCase()',
  trim: '.trim()',
  jwt: '.jwt()',
}

/**
 * Generates a Zod string schema
 * @param { Schema } schema - The parameters to generate the zod string schema.
 * @returns { string } Generated Zod string schema string
 * @example
 * // Basic string validation
 * generateZodString({})
 * // Returns: 'z.string()'
 * @example
 * // With regex pattern
 * generateZodString({ pattern: '^[A-Z]+$' })
 * // Returns: 'z.string().regex(/^[A-Z]+$/)'
 * @example
 * // With length constraints
 * generateZodString({ minLength: 3, maxLength: 10 })
 * // Returns: 'z.string().min(3).max(10)'
 * @example
 * // With format
 * generateZodString({ format: 'email' })
 * // Returns: 'z.string().email()'
 * @example
 * // Combined validations
 * generateZodString({
 *   pattern: '^[a-z]+$',
 *   minLength: 3,
 *   maxLength: 10,
 *   format: 'email'
 * })
 * // Returns: 'z.string().regex(/^[a-z]+$/).min(3).max(10).email()'
 */
export function string(schema: Schema): string {
  const validations: string[] = []

  const base = schema.format && FORMAT_STRING[schema.format]
  validations.push(base ? `z${base}` : 'z.string()')

  // pattern
  if (schema.pattern) {
    validations.push(regex(schema.pattern))
  }
  // minLength
  if (schema.minLength) {
    validations.push(min(schema.minLength))
  }
  // maxLength
  if (schema.maxLength) {
    validations.push(max(schema.maxLength))
  }
  // nullable
  if (schema.nullable) {
    validations.push(nullable())
  }
  // default
  if (schema.default) {
    validations.push(_default(schema.default))
  }
  return validations.join('')
}
