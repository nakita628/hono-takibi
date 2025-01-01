import type { DefaultValue, ExampleValue } from '../../types'
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
  if (pattern) validations.push(`.regex(/${pattern}/)`)
  if (minLength) validations.push(`.min(${minLength})`)
  if (maxLength) validations.push(`.max(${maxLength})`)
  // 0 falsy value
  if (typeof minimum === 'number') validations.push(`.min(${minimum})`)
  if (typeof maximum === 'number') validations.push(`.max(${maximum})`)
  // default
  if (args.default) validations.push(`.default(${args.default})`)
  // example
  if (args.example) validations.push(generateZodToOpenAPI(args.example))
  return validations.join('')
}
