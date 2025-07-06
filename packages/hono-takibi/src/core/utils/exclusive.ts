import type { Schema } from '../../openapi/types.js'

// Append .gt() / .lt() when exclusive* are numeric (3.1 style)
export function exclusive(expr: string, schema: Schema): string {
  const gt = typeof schema.exclusiveMinimum === 'number' ? `.gt(${schema.exclusiveMinimum})` : ''
  const lt = typeof schema.exclusiveMaximum === 'number' ? `.lt(${schema.exclusiveMaximum})` : ''
  return `${expr}${gt}${lt}`
}
