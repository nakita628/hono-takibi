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
  const { pattern, minLength, maxLength, minimum, maximum } = args
  // pattern
  if (pattern) validations.push(generateZodRegex(pattern))
  // minLength
  if (minLength) validations.push(generateZodMin(minLength))
  // maxLength
  if (maxLength) validations.push(generateZodMax(maxLength))
  // 0 falsy value
  // minimum
  if (typeof minimum === 'number') validations.push(generateZodMin(minimum))
  // maximum
  if (typeof maximum === 'number') validations.push(generateZodMax(maximum))
  // default
  if (args.default) validations.push(generateZodDefault(args.default))
  // example
  if (args.example) validations.push(generateZodToOpenAPI(args.example))
  return validations.join('')
}
