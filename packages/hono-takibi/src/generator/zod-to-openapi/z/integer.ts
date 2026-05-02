import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

/**
 * Generates a Zod schema for integer types (int32 / int64 / bigint), with
 * min/max constraints and `x-minimum-message` / `x-maximum-message` vendor
 * extensions translated to Zod v4 `{error: "msg"}` parameters.
 */
export function integer(schema: Schema): string {
  const errorMessage = schema['x-error-message']
  const baseErrorArg = errorMessage ? error(errorMessage) : ''
  const base =
    schema.format === 'int32'
      ? `z.int32(${baseErrorArg})`
      : schema.format === 'int64'
        ? `z.int64(${baseErrorArg})`
        : schema.format === 'bigint'
          ? `z.bigint(${baseErrorArg})`
          : `z.int(${baseErrorArg})`
  const lit = (n: number): string => {
    if (schema.format === 'bigint') return `BigInt(${n})`
    if (schema.format === 'int64') return `${n}n`
    return `${n}`
  }
  const minimumMessage = schema['x-minimum-message']
  const minErrorArg = minimumMessage ? error(minimumMessage) : ''
  const minErrorPart = minErrorArg ? `,${minErrorArg}` : ''
  const minimum = (() => {
    if (schema.minimum === undefined && schema.exclusiveMinimum === undefined) {
      return undefined
    }
    const value = schema.minimum ?? schema.exclusiveMinimum
    if (value === 0 && schema.exclusiveMinimum === true) {
      return `.positive(${minErrorArg})`
    }
    if (value === 0 && schema.exclusiveMinimum === false) {
      return `.nonnegative(${minErrorArg})`
    }
    if (
      (schema.exclusiveMinimum === true || schema.minimum === undefined) &&
      typeof value === 'number'
    ) {
      return `.gt(${lit(value)}${minErrorPart})`
    }
    if (typeof schema.minimum === 'number') {
      return `.min(${lit(schema.minimum)}${minErrorPart})`
    }
    return undefined
  })()
  const maximumMessage = schema['x-maximum-message']
  const maxErrorArg = maximumMessage ? error(maximumMessage) : ''
  const maxErrorPart = maxErrorArg ? `,${maxErrorArg}` : ''
  const maximum = (() => {
    if (schema.maximum === undefined && schema.exclusiveMaximum === undefined) {
      return undefined
    }
    const value = schema.maximum ?? schema.exclusiveMaximum
    if (value === 0 && schema.exclusiveMaximum === true) {
      return `.negative(${maxErrorArg})`
    }
    if (value === 0 && schema.exclusiveMaximum === false) {
      return `.nonpositive(${maxErrorArg})`
    }
    if (
      (schema.exclusiveMaximum === true || schema.maximum === undefined) &&
      typeof value === 'number'
    ) {
      return `.lt(${lit(value)}${maxErrorPart})`
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
  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}
