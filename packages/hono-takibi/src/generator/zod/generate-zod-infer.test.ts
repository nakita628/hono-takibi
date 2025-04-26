import { describe, expect, it } from 'vitest'
import { generateZodInfer } from './generate-zod-infer'

const generateZodInferTestCases: {
  typeVariableName: string
  schemaName: string
  expected: string
}[] = [
  // camelCase
  {
    typeVariableName: 'order',
    schemaName: 'OrderSchema',
    expected: 'export type order = z.infer<typeof OrderSchema>',
  },
  {
    typeVariableName: 'address',
    schemaName: 'AddressSchema',
    expected: 'export type address = z.infer<typeof AddressSchema>',
  },
  {
    typeVariableName: 'customer',
    schemaName: 'CustomerSchema',
    expected: 'export type customer = z.infer<typeof CustomerSchema>',
  },
  {
    typeVariableName: 'category',
    schemaName: 'CategorySchema',
    expected: 'export type category = z.infer<typeof CategorySchema>',
  },
  {
    typeVariableName: 'user',
    schemaName: 'UserSchema',
    expected: 'export type user = z.infer<typeof UserSchema>',
  },
  {
    typeVariableName: 'tag',
    schemaName: 'TagSchema',
    expected: 'export type tag = z.infer<typeof TagSchema>',
  },
  {
    typeVariableName: 'pet',
    schemaName: 'PetSchema',
    expected: 'export type pet = z.infer<typeof PetSchema>',
  },
  {
    typeVariableName: 'apiResponse',
    schemaName: 'ApiResponseSchema',
    expected: 'export type apiResponse = z.infer<typeof ApiResponseSchema>',
  },
  // PascalCase
  {
    typeVariableName: 'Order',
    schemaName: 'OrderSchema',
    expected: 'export type Order = z.infer<typeof OrderSchema>',
  },
  {
    typeVariableName: 'Address',
    schemaName: 'AddressSchema',
    expected: 'export type Address = z.infer<typeof AddressSchema>',
  },
  {
    typeVariableName: 'Customer',
    schemaName: 'CustomerSchema',
    expected: 'export type Customer = z.infer<typeof CustomerSchema>',
  },
  {
    typeVariableName: 'Category',
    schemaName: 'CategorySchema',
    expected: 'export type Category = z.infer<typeof CategorySchema>',
  },
  {
    typeVariableName: 'User',
    schemaName: 'UserSchema',
    expected: 'export type User = z.infer<typeof UserSchema>',
  },
  {
    typeVariableName: 'Tag',
    schemaName: 'TagSchema',
    expected: 'export type Tag = z.infer<typeof TagSchema>',
  },
  {
    typeVariableName: 'Pet',
    schemaName: 'PetSchema',
    expected: 'export type Pet = z.infer<typeof PetSchema>',
  },
  {
    typeVariableName: 'ApiResponse',
    schemaName: 'ApiResponseSchema',
    expected: 'export type ApiResponse = z.infer<typeof ApiResponseSchema>',
  },
]

describe('generateZodInfer', () => {
  it.concurrent.each(generateZodInferTestCases)(
    'generateZodInfer($typeVariableName, $schemaName) -> $expected',
    async ({ typeVariableName, schemaName, expected }) => {
      const result = generateZodInfer(typeVariableName, schemaName)
      expect(result).toBe(expected)
    },
  )
})
