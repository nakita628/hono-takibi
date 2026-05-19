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
  const wireBigintBase = coerce === true && isBigint
  const wireBigintPipe = coerce === true && isInt64
  const wireNumberPipe = coerce === true && !isBigint && !isInt64
  // For integer + x-coerce, emit z.coerce.number().int() since z.coerce.int()
  // does not exist. bigint format keeps its dedicated coerce variant.
  const base = xCoerce
    ? isBigint
      ? `z.coerce.bigint(${baseErrorArg})`
      : `z.coerce.number(${baseErrorArg}).int()`
    : wireBigintBase
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
  const minimumMessage = schema['x-minimum-message']
  const exclusiveMinMessage = schema['x-exclusiveMinimum-message']
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
  const maximumMessage = schema['x-maximum-message']
  const exclusiveMaxMessage = schema['x-exclusiveMaximum-message']
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
  const multipleOfMessage = schema['x-multipleOf-message']
  const multipleOfErrorArg = multipleOfMessage
    ? `,${error(multipleOfMessage)}`
    : baseErrorArg
      ? `,${baseErrorArg}`
      : ''
  const multipleOf =
    schema.multipleOf !== undefined && typeof schema.multipleOf === 'number'
      ? `.multipleOf(${lit(schema.multipleOf)}${multipleOfErrorArg})`
      : undefined
  const innerChain = [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
  if (wireNumberPipe) return `z.coerce.number().pipe(${innerChain})`
  if (wireBigintPipe) return `z.coerce.bigint().pipe(${innerChain})`
  return innerChain
}
