import type { Schema } from '../../../openapi/index.js'
import { error } from '../../../utils/index.js'

/**
 * Generates a Zod schema for number types (number / float32 / float64), with
 * min/max/multipleOf constraints and `x-*-message` vendor extensions translated
 * to Zod v4 `{error: "msg"}` parameters.
 */
export function number(schema: Schema): string {
  const errorMessage = schema['x-error-message']
  const baseErrorArg = errorMessage ? error(errorMessage) : ''
  const base =
    schema.format === 'float' || schema.format === 'float32'
      ? `z.float32(${baseErrorArg})`
      : schema.format === 'float64'
        ? `z.float64(${baseErrorArg})`
        : `z.number(${baseErrorArg})`
  const minimumMessage = schema['x-minimum-message']
  const minErrorArg = minimumMessage ? error(minimumMessage) : ''
  const minErrorPart = minErrorArg ? `,${minErrorArg}` : ''
  const minimum = (() => {
    if (schema.minimum !== undefined) {
      if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
        return `.positive(${minErrorArg})`
      }
      if (schema.minimum === 0 && schema.exclusiveMinimum === false) {
        return `.nonnegative(${minErrorArg})`
      }
      if (schema.exclusiveMinimum === true) {
        return `.gt(${schema.minimum}${minErrorPart})`
      }
      return `.min(${schema.minimum}${minErrorPart})`
    }
    if (typeof schema.exclusiveMinimum === 'number') {
      return `.gt(${schema.exclusiveMinimum}${minErrorPart})`
    }
    return undefined
  })()
  const maximumMessage = schema['x-maximum-message']
  const maxErrorArg = maximumMessage ? error(maximumMessage) : ''
  const maxErrorPart = maxErrorArg ? `,${maxErrorArg}` : ''
  const maximum = (() => {
    if (schema.maximum !== undefined) {
      if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
        return `.negative(${maxErrorArg})`
      }
      if (schema.maximum === 0 && schema.exclusiveMaximum === false) {
        return `.nonpositive(${maxErrorArg})`
      }
      if (schema.exclusiveMaximum === true) {
        return `.lt(${schema.maximum}${maxErrorPart})`
      }
      return `.max(${schema.maximum}${maxErrorPart})`
    }
    if (typeof schema.exclusiveMaximum === 'number') {
      return `.lt(${schema.exclusiveMaximum}${maxErrorPart})`
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
    schema.multipleOf !== undefined
      ? `.multipleOf(${schema.multipleOf}${multipleOfErrorArg})`
      : undefined
  return [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
}
