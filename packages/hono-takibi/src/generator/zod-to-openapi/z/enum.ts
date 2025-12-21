import type { Schemas } from '../../../openapi/index.js'

export function _enum(schemas: Schemas): string {
  /* ht */
  const ht = (t: string): boolean =>
    schemas.type === t || (Array.isArray(schemas.type) && schemas.type.some((v) => v === t))
  /* lit */
  const lit = (v: unknown): string =>
    v === null ? 'null' : typeof v === 'string' ? `'${v}'` : String(v)
  /* tuple */
  const tuple = (arr: readonly unknown[]): string =>
    `z.tuple([${arr.map((v) => `z.literal(${lit(v)})`).join(',')}])`
  /* guard */
  if (!schemas.enum || schemas.enum.length === 0) return 'z.any()'
  /* number / integer enum  */
  if (ht('number') || ht('integer')) {
    return schemas.enum.length > 1
      ? `z.union([${schemas.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schemas.enum[0]})`
  }
  /* boolean enum */
  if (ht('boolean')) {
    return schemas.enum.length > 1
      ? `z.union([${schemas.enum.map((v) => `z.literal(${v})`).join(',')}])`
      : `z.literal(${schemas.enum[0]})`
  }
  /* array enum */
  if (ht('array')) {
    if (schemas.enum.length === 1 && Array.isArray(schemas.enum[0])) {
      return tuple(schemas.enum[0])
    }
    const parts = schemas.enum.map((v) => (Array.isArray(v) ? tuple(v) : `z.literal(${lit(v)})`))
    return `z.union([${parts.join(',')}])`
  }
  /* string enum */
  if (schemas.enum.every((v) => typeof v === 'string')) {
    return schemas.enum.length > 1
      ? `z.enum(${JSON.stringify(schemas.enum)})`
      : `z.literal('${schemas.enum[0]}')`
  }
  /* mixed / null only */
  if (schemas.enum.length > 1) {
    const parts = schemas.enum.map((v) => `z.literal(${lit(v)})`)
    return `z.union([${parts.join(',')}])`
  }
  return `z.literal(${lit(schemas.enum[0])})`
}
