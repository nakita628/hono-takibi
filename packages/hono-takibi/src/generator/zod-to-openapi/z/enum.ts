import type { Schema } from '../../../openapi/index.js'

export function _enum(schema: Schema): string {
  /* ht */
  const ht = (t: string): boolean =>
    schema.type === t || (Array.isArray(schema.type) && schema.type.some((v) => v === t))
  /* lit - converts a value to a valid JavaScript literal */
  const lit = (v: unknown): string => {
    if (v === null) return 'null'
    if (v === undefined) return 'undefined'
    if (typeof v === 'string') return `'${v.replace(/'/g, "\\'")}'`
    if (typeof v === 'number' || typeof v === 'boolean') return String(v)
    // For arrays and objects, use JSON.stringify
    return JSON.stringify(v)
  }
  /* tuple */
  const tuple = (arr: readonly unknown[]): string =>
    `z.tuple([${arr.map((v) => `z.literal(${lit(v)})`).join(',')}])`
  /* guard */
  if (!schema.enum || schema.enum.length === 0) return 'z.any()'
  /* number / integer enum  */
  if (ht('number') || ht('integer')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${lit(v)})`).join(',')}])`
      : `z.literal(${lit(schema.enum[0])})`
  }
  /* boolean enum */
  if (ht('boolean')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${lit(v)})`).join(',')}])`
      : `z.literal(${lit(schema.enum[0])})`
  }
  /* array enum */
  if (ht('array')) {
    if (schema.enum.length === 1 && Array.isArray(schema.enum[0])) {
      return tuple(schema.enum[0])
    }
    const parts = schema.enum.map((v) => (Array.isArray(v) ? tuple(v) : `z.literal(${lit(v)})`))
    return `z.union([${parts.join(',')}])`
  }
  /* string enum */
  if (schema.enum.every((v) => typeof v === 'string')) {
    return schema.enum.length > 1
      ? `z.enum(${JSON.stringify(schema.enum)})`
      : `z.literal(${lit(schema.enum[0])})`
  }
  /* mixed / null only */
  if (schema.enum.length > 1) {
    const parts = schema.enum.map((v) => `z.literal(${lit(v)})`)
    return `z.union([${parts.join(',')}])`
  }
  return `z.literal(${lit(schema.enum[0])})`
}
