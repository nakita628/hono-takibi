import type { DefaultValue, ExampleValue } from '../../types'
import { generateZodDefault } from './generate-zod-default'
import { generateZodMax } from './generate-zod-max'
import { generateZodMin } from './generate-zod-min'
import { generateZodRegex } from './generate-zod-regex'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi'

type GenerateZodNumberSchemaParams = {
  pattern?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  default?: DefaultValue
  example?: ExampleValue
  paramName?: string
  isPath?: boolean
}

/**
 * Generates a zod schema for a number.
 *
 * @function generateZodNumberSchema
 * @param args - The parameters to generate the zod schema.
 * @returns A zod schema for a number.
 */
export function generateZodNumberSchema(args: GenerateZodNumberSchemaParams): string {
  const validations = ['z.number()']
  // pattern
  if (args.pattern) validations.push(generateZodRegex(args.pattern))
  // minLength
  if (args.minLength) validations.push(generateZodMin(args.minLength))
  // maxLength
  if (args.maxLength) validations.push(generateZodMax(args.maxLength))
  // minimum
  if (args.minimum) validations.push(generateZodMin(args.minimum))
  // maximum
  if (args.maximum) validations.push(generateZodMax(args.maximum))
  // default
  if (args.default) validations.push(generateZodDefault(args.default))
  // example
  if (args.example)
    validations.push(generateZodToOpenAPI(args.example, args.paramName, args.isPath))

  // 0 falsy value
  // minimum === 0
  // positive
  if (args.minimum === 0 && args.exclusiveMinimum) {
    validations.push('.positive()')
  }
  // nonpositive
  if (args.minimum === 0 && !args.exclusiveMinimum) {
    validations.push('.nonpositive()')
  }
  // negative
  if (args.maximum === 0 && args.exclusiveMaximum) {
    validations.push('.negative()')
  }
  // gt
  if (args.minimum) {
    if (args.minimum > 0 && args.exclusiveMinimum) {
      const res = `.gt(${args.minimum})`
      validations.push(res)
    }
  }

  // lt
  if (args.maximum) {
    if (args.maximum > 0 && args.exclusiveMaximum) {
      const res = `.lt(${args.maximum})`
      validations.push(res)
    }
  }
  return validations.join('')
}
