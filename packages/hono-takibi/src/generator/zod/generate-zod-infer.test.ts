import { describe, expect, it } from 'vitest'
import { generateZodInfer } from './generate-zod-infer'
import type { Config } from '../../config'

const camelCaseConfig: Config = {
  schema: {
    name: 'camelCase',
    export: false,
  },
  type: {
    name: 'camelCase',
    export: true,
  },
}

const pascalCaseConfig: Config = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: true,
  },
}

const generateZodInferTestCases: {
  schema: string
  config: Config
  expected: string
}[] = [
  // camelCase
  {
    schema: 'Order',
    config: camelCaseConfig,
    expected: 'export type order = z.infer<typeof orderSchema>',
  },
  {
    schema: 'Address',
    config: camelCaseConfig,
    expected: 'export type address = z.infer<typeof addressSchema>',
  },
  {
    schema: 'Customer',
    config: camelCaseConfig,
    expected: 'export type customer = z.infer<typeof customerSchema>',
  },
  {
    schema: 'Category',
    config: camelCaseConfig,
    expected: 'export type category = z.infer<typeof categorySchema>',
  },
  {
    schema: 'User',
    config: camelCaseConfig,
    expected: 'export type user = z.infer<typeof userSchema>',
  },
  {
    schema: 'Tag',
    config: camelCaseConfig,
    expected: 'export type tag = z.infer<typeof tagSchema>',
  },
  {
    schema: 'Pet',
    config: camelCaseConfig,
    expected: 'export type pet = z.infer<typeof petSchema>',
  },
  {
    schema: 'ApiResponse',
    config: camelCaseConfig,
    expected: 'export type apiResponse = z.infer<typeof apiResponseSchema>',
  },
  // PascalCase
  {
    schema: 'Order',
    config: pascalCaseConfig,
    expected: 'export type Order = z.infer<typeof OrderSchema>',
  },
  {
    schema: 'Address',
    config: pascalCaseConfig,
    expected: 'export type Address = z.infer<typeof AddressSchema>',
  },
  {
    schema: 'Customer',
    config: pascalCaseConfig,
    expected: 'export type Customer = z.infer<typeof CustomerSchema>',
  },
  {
    schema: 'Category',
    config: pascalCaseConfig,
    expected: 'export type Category = z.infer<typeof CategorySchema>',
  },
  {
    schema: 'User',
    config: pascalCaseConfig,
    expected: 'export type User = z.infer<typeof UserSchema>',
  },
  {
    schema: 'Tag',
    config: pascalCaseConfig,
    expected: 'export type Tag = z.infer<typeof TagSchema>',
  },
  {
    schema: 'Pet',
    config: pascalCaseConfig,
    expected: 'export type Pet = z.infer<typeof PetSchema>',
  },
  {
    schema: 'ApiResponse',
    config: pascalCaseConfig,
    expected: 'export type ApiResponse = z.infer<typeof ApiResponseSchema>',
  },
]

describe('generateZodInfer', () => {
  it.concurrent.each(generateZodInferTestCases)(
    'generateZodInfer($schema, $config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = generateZodInfer(schema, config)
      expect(result).toBe(expected)
    },
  )
})
