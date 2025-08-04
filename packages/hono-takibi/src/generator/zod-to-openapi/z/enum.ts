import type { Schema } from '../../../openapi/index.js'

export function _enum(schema: Schema): string {
  /* -------------------------- helpers -------------------------- */
  const hasType = (t: string): boolean =>
    schema.type === t || (Array.isArray(schema.type) && schema.type.some((x) => x === t))

  const lit = (v: unknown): string =>
    v === null ? 'null' : typeof v === 'string' ? `'${v}'` : String(v)

  const tuple = (arr: readonly unknown[]): string =>
    `z.tuple([${arr.map((i) => `z.literal(${lit(i)})`).join(',')}])`

  /* --------------------------- guard --------------------------- */
  if (!schema.enum || schema.enum.length === 0) return 'z.any()'

  /* ------------------- number / integer enum ------------------- */
  if (hasType('number') || hasType('integer')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schema.enum[0]})`
  }

  /* ----------------------- boolean enum ------------------------ */
  if (hasType('boolean')) {
    return schema.enum.length > 1
      ? `z.union([${schema.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schema.enum[0]})`
  }

  /* ----------------------- array enum -------------------------- */
  if (hasType('array')) {
    if (schema.enum.length === 1 && Array.isArray(schema.enum[0])) {
      return tuple(schema.enum[0])
    }

    const parts = schema.enum.map((v) => (Array.isArray(v) ? tuple(v) : `z.literal(${lit(v)})`))
    return `z.union([${parts.join(',')}])`
  }

  /* ----------------------- string enum ------------------------- */
  if (schema.enum.every((v) => typeof v === 'string')) {
    return schema.enum.length > 1
      ? `z.enum(${JSON.stringify(schema.enum)})`
      : `z.literal('${schema.enum[0]}')`
  }

  /* -------------------- mixed / null only ---------------------- */
  if (schema.enum.length > 1) {
    const parts = schema.enum.map((v) => `z.literal(${lit(v)})`)
    return `z.union([${parts.join(',')}])`
  }

  return `z.literal(${lit(schema.enum[0])})`
}
