import type { Schema } from '../../../openapi/index.js'
import { baseError, error } from '../../../utils/index.js'

/**
 * Generates a Zod schema for integer types (int32 / int64 / bigint), with
 * min/max constraints and `x-minimum-message` / `x-maximum-message` vendor
 * extensions translated to Zod v4 `{error: "msg"}` parameters.
 */
export function integer(schema: Schema, options?: { coerce?: boolean }): string {
  const coerce = options?.coerce
  const errorMessage = schema['x-error-message']
  const requiredMessage = schema['x-required-message']
  const baseErrorArg = baseError(errorMessage, requiredMessage)
  const xCoerce = schema['x-coerce'] === true
  const isBigint = schema.format === 'bigint'
  const isInt32 = schema.format === 'int32'
  const isInt64 = schema.format === 'int64'
  // `x-coerce` (author-explicit) and `coerce` (path/query wire) share the
  // same pipe topology so format-specific bounds (int32 / int64) survive.
  // Previously x-coerce collapsed to `z.coerce.number().int()` and silently
  // dropped int32 range [-2^31, 2^31-1] and int64 BigInt semantics.
  const wantsCoerce = coerce === true || xCoerce
  const bigintBase = wantsCoerce && isBigint
  const bigintPipe = wantsCoerce && isInt64
  const numberPipe = wantsCoerce && !isBigint && !isInt64
  const base = bigintBase
    ? `z.coerce.bigint(${baseErrorArg})`
    : isInt32
      ? `z.int32(${baseErrorArg})`
      : isInt64
        ? `z.int64(${baseErrorArg})`
        : isBigint
          ? `z.bigint(${baseErrorArg})`
          : `z.int(${baseErrorArg})`
  const lit = (n: number): string => {
    if (schema.format === 'bigint') return `BigInt(${n})`
    if (schema.format === 'int64') return `${n}n`
    return `${n}`
  }
  // Per-keyword precedence (openapi/index.ts): `x-<keyword>-message` >
  // `x-error-message` > Zod default. `baseErrorArg` covers invalid-type only,
  // so each numeric bound needs an explicit fallback to honor the contract.
  const minimumMessage = schema['x-minimum-message'] ?? errorMessage
  const exclusiveMinMessage = schema['x-exclusiveMinimum-message'] ?? errorMessage
  const minErrorArg = minimumMessage ? error(minimumMessage) : ''
  const minErrorPart = minErrorArg ? `,${minErrorArg}` : ''
  const exMinErrorArg = exclusiveMinMessage ? error(exclusiveMinMessage) : ''
  const exMinErrorPart = exMinErrorArg ? `,${exMinErrorArg}` : ''
  const minimum = (() => {
    if (schema.minimum === undefined && schema.exclusiveMinimum === undefined) {
      return undefined
    }
    const value = schema.minimum ?? schema.exclusiveMinimum
    if (value === 0 && schema.exclusiveMinimum === true) {
      return `.positive(${exMinErrorArg})`
    }
    if (value === 0 && schema.exclusiveMinimum === false) {
      return `.nonnegative(${minErrorArg})`
    }
    if (
      (schema.exclusiveMinimum === true || schema.minimum === undefined) &&
      typeof value === 'number'
    ) {
      return `.gt(${lit(value)}${exMinErrorPart})`
    }
    if (typeof schema.minimum === 'number') {
      return `.min(${lit(schema.minimum)}${minErrorPart})`
    }
    return undefined
  })()
  const maximumMessage = schema['x-maximum-message'] ?? errorMessage
  const exclusiveMaxMessage = schema['x-exclusiveMaximum-message'] ?? errorMessage
  const maxErrorArg = maximumMessage ? error(maximumMessage) : ''
  const maxErrorPart = maxErrorArg ? `,${maxErrorArg}` : ''
  const exMaxErrorArg = exclusiveMaxMessage ? error(exclusiveMaxMessage) : ''
  const exMaxErrorPart = exMaxErrorArg ? `,${exMaxErrorArg}` : ''
  const maximum = (() => {
    if (schema.maximum === undefined && schema.exclusiveMaximum === undefined) {
      return undefined
    }
    const value = schema.maximum ?? schema.exclusiveMaximum
    if (value === 0 && schema.exclusiveMaximum === true) {
      return `.negative(${exMaxErrorArg})`
    }
    if (value === 0 && schema.exclusiveMaximum === false) {
      return `.nonpositive(${maxErrorArg})`
    }
    if (
      (schema.exclusiveMaximum === true || schema.maximum === undefined) &&
      typeof value === 'number'
    ) {
      return `.lt(${lit(value)}${exMaxErrorPart})`
    }
    if (typeof schema.maximum === 'number') {
      return `.max(${lit(schema.maximum)}${maxErrorPart})`
    }
    return undefined
  })()
  const multipleOfMessage = schema['x-multipleOf-message'] ?? errorMessage
  const multipleOfErrorArg = multipleOfMessage ? `,${error(multipleOfMessage)}` : ''
  const multipleOf =
    schema.multipleOf !== undefined && typeof schema.multipleOf === 'number'
      ? `.multipleOf(${lit(schema.multipleOf)}${multipleOfErrorArg})`
      : undefined
  const innerChain = [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
  if (numberPipe) return `z.coerce.number().pipe(${innerChain})`
  if (bigintPipe) return `z.coerce.bigint().pipe(${innerChain})`
  return innerChain
}
