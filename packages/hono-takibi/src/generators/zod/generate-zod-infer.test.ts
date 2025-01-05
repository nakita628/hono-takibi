import { describe, expect, it } from 'vitest'
import { generateZodInfer } from './generate-zod-infer'

const generateZodInferTestCases = [
  {
    schemaName: 'Order',
    expected: 'export type Order = z.infer<typeof Order>',
  },
  {
    schemaName: 'Address',
    expected: 'export type Address = z.infer<typeof Address>',
  },
  {
    schemaName: 'Customer',
    expected: 'export type Customer = z.infer<typeof Customer>',
  },
  {
    schemaName: 'Category',
    expected: 'export type Category = z.infer<typeof Category>',
  },
  {
    schemaName: 'User',
    expected: 'export type User = z.infer<typeof User>',
  },
  {
    schemaName: 'Tag',
    expected: 'export type Tag = z.infer<typeof Tag>',
  },
  {
    schemaName: 'Pet',
    expected: 'export type Pet = z.infer<typeof Pet>',
  },
  {
    schemaName: 'ApiResponse',
    expected: 'export type ApiResponse = z.infer<typeof ApiResponse>',
  },
]

describe('generateZodInfer', () => {
  it.concurrent.each(generateZodInferTestCases)(
    'generateZodInfer($schemaName) -> $expected',
    async ({ schemaName, expected }) => {
      const result = generateZodInfer(schemaName)
      expect(result).toBe(expected)
    },
  )
})
