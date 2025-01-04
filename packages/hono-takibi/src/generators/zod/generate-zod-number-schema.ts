import type { DefaultValue, ExampleValue } from '../../types'
import { generateZodDefault } from './generate-zod-default'
import { generateZodMax } from './generate-zod-max'
import { generateZodMin } from './generate-zod-min'
import { generateZodRegex } from './generate-zod-regex'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

type GenerateZodNumberSchemaParams = {
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
