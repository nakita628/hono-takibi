import { describe, expect, it } from 'vitest'
import { generateZodInfer } from './generate-zod-infer'

const generateZodInferTestCases: {
  schemaName: string
  namingCase: 'camelCase' | 'PascalCase'
  expected: string
}[] = [
  // camelCase
  {
    schemaName: 'Order',
    namingCase: 'camelCase',
    expected: 'export type order = z.infer<typeof Order>',
  },
  {
    schemaName: 'Address',
    namingCase: 'camelCase',
    expected: 'export type address = z.infer<typeof Address>',
  },
  {
    schemaName: 'Customer',
    namingCase: 'camelCase',
    expected: 'export type customer = z.infer<typeof Customer>',
  },
  {
    schemaName: 'Category',
    namingCase: 'camelCase',
    expected: 'export type category = z.infer<typeof Category>',
  },
  {
    schemaName: 'User',
    namingCase: 'camelCase',
    expected: 'export type user = z.infer<typeof User>',
  },
  {
    schemaName: 'Tag',
    namingCase: 'camelCase',
    expected: 'export type tag = z.infer<typeof Tag>',
  },
  {
    schemaName: 'Pet',
    namingCase: 'camelCase',
    expected: 'export type pet = z.infer<typeof Pet>',
  },
  {
    schemaName: 'ApiResponse',
    namingCase: 'camelCase',
    expected: 'export type apiResponse = z.infer<typeof ApiResponse>',
  },
  // PascalCase
  {
    schemaName: 'Order',
    namingCase: 'PascalCase',
    expected: 'export type Order = z.infer<typeof Order>',
  },
  {
    schemaName: 'Address',
    namingCase: 'PascalCase',
    expected: 'export type Address = z.infer<typeof Address>',
  },
  {
    schemaName: 'Customer',
    namingCase: 'PascalCase',
    expected: 'export type Customer = z.infer<typeof Customer>',
  },
  {
    schemaName: 'Category',
    namingCase: 'PascalCase',
    expected: 'export type Category = z.infer<typeof Category>',
  },
  {
    schemaName: 'User',
    namingCase: 'PascalCase',
    expected: 'export type User = z.infer<typeof User>',
  },
  {
    schemaName: 'Tag',
    namingCase: 'PascalCase',
    expected: 'export type Tag = z.infer<typeof Tag>',
  },
  {
    schemaName: 'Pet',
    namingCase: 'PascalCase',
    expected: 'export type Pet = z.infer<typeof Pet>',
  },
  {
    schemaName: 'ApiResponse',
    namingCase: 'PascalCase',
    expected: 'export type ApiResponse = z.infer<typeof ApiResponse>',
  },
]

describe('generateZodInfer', () => {
  it.concurrent.each(generateZodInferTestCases)(
    'generateZodInfer($schemaName, $namingCase) -> $expected',
    async ({ schemaName, namingCase, expected }) => {
      const result = generateZodInfer(schemaName, namingCase)
      expect(result).toBe(expected)
    },
  )
})
