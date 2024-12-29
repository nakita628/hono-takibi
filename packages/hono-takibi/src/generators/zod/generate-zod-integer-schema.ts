import { ExampleValue } from '../../types'

type GenerateZodIntegerSchemaParams = {
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
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
  const { minLength, maxLength, minimum, maximum, example } = args
  if (minLength) validations.push(`.min(${minLength})`)
  if (maxLength) validations.push(`.max(${maxLength})`)
  // 0 falsy value
  if (typeof minimum === 'number') validations.push(`.min(${minimum})`)
  if (typeof maximum === 'number') validations.push(`.max(${maximum})`)
  // example
  if (example) validations.push(`.openapi({example:${JSON.stringify(example)}})`)
  return validations.join('')
}
