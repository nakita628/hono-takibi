import type { DefaultValue, ExampleValue } from '../../types/index.js'
import { generateZodDefault } from './generate-zod-default.js'
import { generateZodGt } from './generate-zod-gt.js'
import { generateZodLt } from './generate-zod-lt.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { generateZodRegex } from './generate-zod-regex.js'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi.js'

type GenerateZodNumberParams = {
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
 * Generates a Zod number schema string
 * @param { GenerateZodNumberParams } args - The parameters to generate the zod number schema.
 * @returns { string } Generated Zod number schema string
 */
export function generateZodNumber(args: GenerateZodNumberParams): string {
  const validations = ['z.number()']
  // pattern
  if (args.pattern) {
    validations.push(generateZodRegex(args.pattern))
  }
  // minLength
  if (args.minLength) {
    validations.push(generateZodMin(args.minLength))
  }
  // maxLength
  if (args.maxLength) {
    validations.push(generateZodMax(args.maxLength))
  }
  // minimum
  if (args.minimum) {
    validations.push(generateZodMin(args.minimum))
  }
  // maximum
  if (args.maximum) {
    validations.push(generateZodMax(args.maximum))
  }
  // default
  if (args.default) {
    validations.push(generateZodDefault(args.default))
  }
  // example
  if (args.example) {
    validations.push(generateZodToOpenAPI(args.example, args.paramName, args.isPath))
  }

  // 0 falsy value
  // minimum === 0
  // positive
  if (args.minimum === 0 && args.exclusiveMinimum) {
    validations.push('.positive()')
  }
  // nonpositive
  if (args.minimum === 0 && !args.exclusiveMinimum) {
    if (!args.default) {
      validations.push('.nonpositive()')
    }
  }
  // negative
  if (args.maximum === 0 && args.exclusiveMaximum) {
    if (!args.default) {
      validations.push('.negative()')
    }
  }
  // gt
  if (args.minimum) {
    if (args.minimum > 0 && args.exclusiveMinimum) {
      validations.push(generateZodGt(args.minimum))
    }
  }
  // lt
  if (args.maximum) {
    if (args.maximum > 0 && args.exclusiveMaximum) {
      validations.push(generateZodLt(args.maximum))
    }
  }
  return validations.join('')
}
