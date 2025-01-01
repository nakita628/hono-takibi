import type { DefaultValue, ExampleValue } from '../../types'
import { generateZodDefault } from './generate-zod-default'
import { generateZodToOpenAPI } from './generate-zod-to-openapi'

type GenerateZodIntegerSchemaParams = {
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  default?: DefaultValue
  example?: ExampleValue
}

/**
 * Generates a zod schema for an integer.
 *
 * @function generateZodIntegerSchema
 * @param args - The parameters to generate the zod schema.
 * @returns A zod schema for an integer.
 */
export function generateZodIntegerSchema(args: GenerateZodIntegerSchemaParams): string {
  const validations = ['z.number().int()']
  const { minLength, maxLength, minimum, maximum } = args
  if (minLength) validations.push(`.min(${minLength})`)
  if (maxLength) validations.push(`.max(${maxLength})`)
  // 0 falsy value
  if (typeof minimum === 'number') validations.push(`.min(${minimum})`)
  if (typeof maximum === 'number') validations.push(`.max(${maximum})`)
  // default
  if (args.default) validations.push(generateZodDefault(args.default))
  // example
  if (args.example) validations.push(generateZodToOpenAPI(args.example))
  return validations.join('')
}
