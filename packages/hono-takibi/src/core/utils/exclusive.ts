import type { Schema } from '../../openapi/types.js'

/**
 * Appends `.gt()`/`.lt()` to an expression if `exclusiveMinimum`/`exclusiveMaximum` are numeric.
 *
 * @param expr - The base expression string.
 * @param schema - The OpenAPI schema to inspect.
 * @returns The expression with `.gt()` and/or `.lt()` suffixes if applicable.
 */
export function exclusive(expr: string, schema: Schema): string {
  const gt = typeof schema.exclusiveMinimum === 'number' ? `.gt(${schema.exclusiveMinimum})` : ''
  const lt = typeof schema.exclusiveMaximum === 'number' ? `.lt(${schema.exclusiveMaximum})` : ''
  return `${expr}${gt}${lt}`
}
