import type { FormatString, DefaultValue, Schema } from '../../types/index.js'
import { generateZodDefault } from './generate-zod-default.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { generateZodNullable } from './generate-zod-nullable.js'
import { generateZodRegex } from './generate-zod-regex.js'

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
export function generateZodString(schema: Schema): string {
  const validations: string[] = []

  if (schema.format) {
    if (schema.format === 'email') {
      validations.push('z.string().email()')
    }
    if (schema.format === 'uri') {
      validations.push('z.string().url()')
    }
    if (schema.format === 'emoji') {
      validations.push('z.string().emoji()')
    }
    if (schema.format === 'uuid') {
      validations.push('z.string().uuid()')
    }
    if (schema.format === 'nanoid') {
      validations.push('z.string().nanoid()')
    }
    if (schema.format === 'cuid') {
      validations.push('z.string().cuid()')
    }
    if (schema.format === 'cuid2') {
      validations.push('z.string().cuid2()')
    }
    if (schema.format === 'ulid') {
      validations.push('z.string().ulid()')
    }
    if (schema.format === 'date-time') {
      validations.push('z.string().datetime()')
    }
    if (schema.format === 'ip') {
      validations.push('z.string().ip()')
    }
    if (schema.format === 'cidr') {
      validations.push('z.string().cidr()')
    }
    if (schema.format === 'trim') {
      validations.push('z.string().trim()')
    }
    if (schema.format === 'toLowerCase') {
      validations.push('z.string().toLowerCase()')
    }
    if (schema.format === 'toUpperCase') {
      validations.push('z.string().toUpperCase()')
    }
    if (schema.format === 'date') {
      validations.push('z.string().date()')
    }
    if (schema.format === 'time') {
      validations.push('z.string().time()')
    }
    if (schema.format === 'duration') {
      validations.push('z.string().duration()')
    }
    if (schema.format === 'base64') {
      validations.push('z.string().base64()')
    }
    if (schema.format === 'binary') {
      validations.push('z.instanceof(Uint8Array)')
    }
  } else {
    validations.push('z.string()')
  }

  // pattern
  if (schema.pattern) {
    validations.push(generateZodRegex(schema.pattern))
  }
  // minLength
  if (schema.minLength) {
    validations.push(generateZodMin(schema.minLength))
  }
  // maxLength
  if (schema.maxLength) {
    validations.push(generateZodMax(schema.maxLength))
  }
  // default
  if (schema.default) {
    validations.push(generateZodDefault(schema.default))
  }
  // nullable
  if (schema.nullable) {
    validations.push(generateZodNullable())
  }
  return validations.join('')
}
