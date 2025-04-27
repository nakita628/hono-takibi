import type { DefaultValue, ExampleValue } from '../../types/index.js'
import { generateZodDefault } from './generate-zod-default.js'
import { generateZodMax } from './generate-zod-max.js'
import { generateZodMin } from './generate-zod-min.js'
import { generateZodRegex } from './generate-zod-regex.js'
import { generateZodToOpenAPI } from './openapi/generate-zod-to-openapi.js'

type GenerateZodIntegerSchemaParams = {
  pattern?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  default?: DefaultValue
  example?: ExampleValue
  paramName?: string
  isPath?: boolean
}

/**
 * Generates a zod schema for an integer.
 * @param { GenerateZodIntegerSchemaParams } args - The parameters to generate the zod schema.
 * @returns { string } Generated Zod integer schema string
 */
export function generateZodIntegerSchema(args: GenerateZodIntegerSchemaParams): string {
  const validations = ['z.number().int()']
  // pattern
  if (args.pattern) validations.push(generateZodRegex(args.pattern))
  // minLength
  if (args.minLength) validations.push(generateZodMin(args.minLength))
  // maxLength
  if (args.maxLength) validations.push(generateZodMax(args.maxLength))
  // 0 falsy value
  // minimum
  if (typeof args.minimum === 'number') validations.push(generateZodMin(args.minimum))
  // maximum
  if (typeof args.maximum === 'number') validations.push(generateZodMax(args.maximum))
  // default
  if (args.default) validations.push(generateZodDefault(args.default))
  // example
  if (args.example)
    validations.push(generateZodToOpenAPI(args.example, args.paramName, args.isPath))
  return validations.join('')
}
