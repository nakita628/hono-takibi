import type { Schema } from '../../../openapi/index.js'
import { baseError, error } from '../../../utils/index.js'

/**
 * Generates a Zod schema for number types (number / float32 / float64), with
 * min/max/multipleOf constraints and `x-*-message` vendor extensions translated
 * to Zod v4 `{error: "msg"}` parameters.
 */
export function number(schema: Schema, options?: { coerce?: boolean }): string {
  const coerce = options?.coerce
  const errorMessage = schema['x-error-message']
  const requiredMessage = schema['x-required-message']
  const baseErrorArg = baseError(errorMessage, requiredMessage)
  const xCoerce = schema['x-coerce'] === true
  const isFloat32 = schema.format === 'float' || schema.format === 'float32'
  const isFloat64 = schema.format === 'float64' || schema.format === 'double'
  // `x-coerce` and wire-coerce share the same pipe topology so float32/64
  // IEEE754 precision survives. Previously x-coerce dropped to a plain
  // `z.coerce.number()` and silently lost the format-specific range/precision.
  const wantsCoerce = coerce === true || xCoerce
  const wirePipe = wantsCoerce && (isFloat32 || isFloat64)
  const wirePlain = wantsCoerce && !isFloat32 && !isFloat64
  const base = wirePlain
    ? `z.coerce.number(${baseErrorArg})`
    : isFloat32
      ? `z.float32(${baseErrorArg})`
      : isFloat64
        ? `z.float64(${baseErrorArg})`
        : `z.number(${baseErrorArg})`
  // (`.min()` uses x-minimum-message, `.gt()` / `.positive()` uses
  // x-exclusiveMinimum-message; same for max).
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
    if (schema.minimum !== undefined) {
      if (schema.minimum === 0 && schema.exclusiveMinimum === true) {
        return `.positive(${exMinErrorArg})`
      }
      if (schema.minimum === 0 && schema.exclusiveMinimum === false) {
        return `.nonnegative(${minErrorArg})`
      }
      if (schema.exclusiveMinimum === true) {
        return `.gt(${schema.minimum}${exMinErrorPart})`
      }
      return `.min(${schema.minimum}${minErrorPart})`
    }
    if (typeof schema.exclusiveMinimum === 'number') {
      return `.gt(${schema.exclusiveMinimum}${exMinErrorPart})`
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
    if (schema.maximum !== undefined) {
      if (schema.maximum === 0 && schema.exclusiveMaximum === true) {
        return `.negative(${exMaxErrorArg})`
      }
      if (schema.maximum === 0 && schema.exclusiveMaximum === false) {
        return `.nonpositive(${maxErrorArg})`
      }
      if (schema.exclusiveMaximum === true) {
        return `.lt(${schema.maximum}${exMaxErrorPart})`
      }
      return `.max(${schema.maximum}${maxErrorPart})`
    }
    if (typeof schema.exclusiveMaximum === 'number') {
      return `.lt(${schema.exclusiveMaximum}${exMaxErrorPart})`
    }
    return undefined
  })()
  // multipleOf falls back to errorMessage directly (not baseErrorArg) so the
  // invalid-type message doesn't bleed into a multipleOf constraint failure.
  const multipleOfMessage = schema['x-multipleOf-message'] ?? errorMessage
  const multipleOfErrorArg = multipleOfMessage ? `,${error(multipleOfMessage)}` : ''
  const multipleOf =
    schema.multipleOf !== undefined
      ? `.multipleOf(${schema.multipleOf}${multipleOfErrorArg})`
      : undefined
  const innerChain = [base, minimum, maximum, multipleOf].filter((v) => v !== undefined).join('')
  return wirePipe ? `z.coerce.number().pipe(${innerChain})` : innerChain
}
