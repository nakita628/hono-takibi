import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

/**
 * Generates a Zod enum schema. String enums map to `z.enum`, number/integer/
 * boolean enums to `z.union([z.literal(...), ...])`, array enums to `z.tuple`
 * or `z.union`, single values to `z.literal`.
 */
export function _enum(schema: Schema): string {
  const ht = (t: string): boolean =>
    schema.type === t || (Array.isArray(schema.type) && schema.type.some((v) => v === t))
  const isPrimitive = (v: unknown): boolean =>
    v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
  const lit = (v: unknown): string => {
    if (v === null) return 'null'
    if (v === undefined) return 'undefined'
    if (typeof v === 'string') return `'${v.replace(/'/g, "\\'")}'`
    if (typeof v === 'number' || typeof v === 'boolean') return String(v)
    return JSON.stringify(v)
  }
  const errorMessage = schema['x-error-message']
  const errorArg = errorMessage ? `,${error(errorMessage)}` : ''
  const enumMessages = schema['x-enum-error-messages']
  const litErrorArg = (v: unknown): string => {
    if (enumMessages) {
      const key = String(v)
      if (key in enumMessages) return `,${error(enumMessages[key])}`
    }
    return errorArg
  }
  const zLit = (v: unknown): string =>
    isPrimitive(v) ? `z.literal(${lit(v)}${litErrorArg(v)})` : `z.custom<${JSON.stringify(v)}>()`
  const tuple = (arr: readonly unknown[]): string =>
    `z.tuple([${arr.map((v) => `z.literal(${lit(v)}${litErrorArg(v)})`).join(',')}]${errorArg})`
  if (!schema.enum || schema.enum.length === 0) return 'z.any()'
  if (ht('number') || ht('integer')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${lit(v)}${litErrorArg(v)})`).join(',')}]${errorArg})`
      : `z.literal(${lit(schema.enum[0])}${litErrorArg(schema.enum[0])})`
  }
  if (ht('boolean')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${lit(v)}${litErrorArg(v)})`).join(',')}]${errorArg})`
      : `z.literal(${lit(schema.enum[0])}${litErrorArg(schema.enum[0])})`
  }
  if (ht('array')) {
    if (schema.enum.length === 1 && Array.isArray(schema.enum[0])) {
      return tuple(schema.enum[0])
    }
    const parts = schema.enum.map((v) =>
      Array.isArray(v) ? tuple(v) : `z.literal(${lit(v)}${litErrorArg(v)})`,
    )
    return `z.union([${parts.join(',')}]${errorArg})`
  }
  if (schema.enum.every((v) => typeof v === 'string')) {
    if (schema.enum.length > 1) {
      if (enumMessages) {
        return `z.union([${schema.enum.map((v) => `z.literal(${lit(v)}${litErrorArg(v)})`).join(',')}]${errorArg})`
      }
      return `z.enum(${JSON.stringify(schema.enum)}${errorArg})`
    }
    return `z.literal(${lit(schema.enum[0])}${litErrorArg(schema.enum[0])})`
  }
  if (schema.enum.length > 1) {
    const parts = schema.enum.map((v) =>
      isPrimitive(v) ? `z.literal(${lit(v)}${litErrorArg(v)})` : `z.custom<${JSON.stringify(v)}>()`,
    )
    return `z.union([${parts.join(',')}]${errorArg})`
  }
  return zLit(schema.enum[0])
}
