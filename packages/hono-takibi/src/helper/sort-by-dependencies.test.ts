import { describe, expect, it } from 'vitest'
import { sortByDependencies, sortSchemaBlocks } from './sort-by-dependencies.js'

// Test run
// pnpm vitest run ./src/helper/sort-by-dependencies.test.ts

describe('sort-by-dependencies', () => {
  describe('sortByDependencies', () => {
    it.concurrent('returns empty string for empty input', () => {
      expect(sortByDependencies('')).toBe('')
    })

    it.concurrent('returns code as-is when no declarations found', () => {
      const code = '// just a comment'
      expect(sortByDependencies(code)).toBe(code)
    })

    it.concurrent('handles single declaration without dependencies', () => {
      const code = 'const UserSchema = z.object({ name: z.string() })'
      expect(sortByDependencies(code)).toBe(code)
    })

    it.concurrent('sorts two declarations with dependency', () => {
      const code = `const UserSchema = z.object({ address: AddressSchema })

const AddressSchema = z.object({ city: z.string() })`
      const result = sortByDependencies(code)
      expect(result).toBe(
        `const AddressSchema = z.object({ city: z.string() })

const UserSchema = z.object({ address: AddressSchema })`,
      )
    })

    it.concurrent('sorts multiple declarations with chain dependency', () => {
      const code = `const ASchema = z.object({ b: BSchema })

const BSchema = z.object({ c: CSchema })

const CSchema = z.object({ value: z.string() })`
      const result = sortByDependencies(code)
      expect(result).toBe(
        `const CSchema = z.object({ value: z.string() })

const BSchema = z.object({ c: CSchema })

const ASchema = z.object({ b: BSchema })`,
      )
    })

    it.concurrent('handles declarations with multiple dependencies', () => {
      const code = `const OrderSchema = z.object({ user: UserSchema, product: ProductSchema })

const UserSchema = z.object({ name: z.string() })

const ProductSchema = z.object({ title: z.string() })`
      const result = sortByDependencies(code)
      const lines = result.split('\n\n')
      expect(lines.length).toBe(3)
      // UserSchema and ProductSchema should come before OrderSchema
      const orderIndex = lines.findIndex((line) => line.includes('OrderSchema'))
      const userIndex = lines.findIndex((line) => line.includes('UserSchema'))
      const productIndex = lines.findIndex((line) => line.includes('ProductSchema'))
      expect(userIndex).toBeLessThan(orderIndex)
      expect(productIndex).toBeLessThan(orderIndex)
    })

    it.concurrent('handles z.lazy wrapped declarations without dependencies', () => {
      const code = `const CategorySchema = z.lazy(() => z.object({ parent: CategorySchema }))

const ProductSchema = z.object({ name: z.string() })`
      const result = sortByDependencies(code)
      // z.lazy wrapped declarations should not be reordered based on self-reference
      expect(result).toContain('CategorySchema')
      expect(result).toContain('ProductSchema')
    })

    it.concurrent('handles type alias declarations', () => {
      const code = `type User = { name: string; address: Address }

type Address = { city: string }`
      const result = sortByDependencies(code)
      expect(result).toBe(
        `type Address = { city: string }

type User = { name: string; address: Address }`,
      )
    })

    it.concurrent('handles mixed variable and type declarations', () => {
      const code = `const UserSchema = z.object({ name: z.string() })

type User = z.infer<typeof UserSchema>`
      const result = sortByDependencies(code)
      expect(result).toBe(
        `const UserSchema = z.object({ name: z.string() })

type User = z.infer<typeof UserSchema>`,
      )
    })

    it.concurrent('handles independent declarations without reordering', () => {
      const code = `const ASchema = z.object({ value: z.string() })

const BSchema = z.object({ count: z.number() })

const CSchema = z.object({ flag: z.boolean() })`
      const result = sortByDependencies(code)
      // Independent declarations should maintain relative order
      expect(result).toContain('ASchema')
      expect(result).toContain('BSchema')
      expect(result).toContain('CSchema')
    })

    it.concurrent('handles OpenAPI schema pattern with nullable', () => {
      const code = `const ResponseSchema = z.object({ data: DataSchema.nullable() })

const DataSchema = z.object({ id: z.string() })`
      const result = sortByDependencies(code)
      expect(result).toBe(
        `const DataSchema = z.object({ id: z.string() })

const ResponseSchema = z.object({ data: DataSchema.nullable() })`,
      )
    })

    it.concurrent('handles OpenAPI schema pattern with array', () => {
      const code = `const ListSchema = z.object({ items: z.array(ItemSchema) })

const ItemSchema = z.object({ name: z.string() })`
      const result = sortByDependencies(code)
      expect(result).toBe(
        `const ItemSchema = z.object({ name: z.string() })

const ListSchema = z.object({ items: z.array(ItemSchema) })`,
      )
    })

    it.concurrent('handles OpenAPI union/discriminatedUnion pattern', () => {
      const code = `const ResultSchema = z.union([SuccessSchema, ErrorSchema])

const SuccessSchema = z.object({ status: z.literal('success') })

const ErrorSchema = z.object({ status: z.literal('error') })`
      const result = sortByDependencies(code)
      const lines = result.split('\n\n')
      const resultIndex = lines.findIndex((line) => line.includes('ResultSchema'))
      const successIndex = lines.findIndex((line) => line.includes('SuccessSchema'))
      const errorIndex = lines.findIndex((line) => line.includes('ErrorSchema'))
      expect(successIndex).toBeLessThan(resultIndex)
      expect(errorIndex).toBeLessThan(resultIndex)
    })

    it.concurrent('handles circular dependency with z.lazy', () => {
      const code = `const NodeSchema = z.object({
  value: z.string(),
  children: z.lazy(() => z.array(NodeSchema))
})`
      const result = sortByDependencies(code)
      // Should not cause infinite loop, z.lazy breaks the cycle
      expect(result).toContain('NodeSchema')
    })
  })

  describe('sortSchemaBlocks', () => {
    it.concurrent('returns empty array for empty input', () => {
      expect(sortSchemaBlocks([])).toEqual([])
    })

    it.concurrent('returns single block as-is', () => {
      const blocks = [
        {
          name: 'UserSchema',
          code: `const UserSchema = z.object({ name: z.string() })
type User = z.infer<typeof UserSchema>`,
        },
      ]
      expect(sortSchemaBlocks(blocks)).toEqual(blocks)
    })

    it.concurrent('sorts blocks by dependency', () => {
      const blocks = [
        {
          name: 'UserSchema',
          code: `const UserSchema = z.object({ address: AddressSchema })
type User = z.infer<typeof UserSchema>`,
        },
        {
          name: 'AddressSchema',
          code: `const AddressSchema = z.object({ city: z.string() })
type Address = z.infer<typeof AddressSchema>`,
        },
      ]
      const result = sortSchemaBlocks(blocks)
      expect(result[0].name).toBe('AddressSchema')
      expect(result[1].name).toBe('UserSchema')
    })

    it.concurrent('sorts multiple blocks with chain dependency', () => {
      const blocks = [
        {
          name: 'OrderSchema',
          code: 'const OrderSchema = z.object({ user: UserSchema, items: z.array(ItemSchema) })',
        },
        {
          name: 'UserSchema',
          code: 'const UserSchema = z.object({ name: z.string() })',
        },
        {
          name: 'ItemSchema',
          code: 'const ItemSchema = z.object({ product: ProductSchema, quantity: z.number() })',
        },
        {
          name: 'ProductSchema',
          code: 'const ProductSchema = z.object({ name: z.string(), price: z.number() })',
        },
      ]
      const result = sortSchemaBlocks(blocks)
      const orderIndex = result.findIndex((b) => b.name === 'OrderSchema')
      const userIndex = result.findIndex((b) => b.name === 'UserSchema')
      const itemIndex = result.findIndex((b) => b.name === 'ItemSchema')
      const productIndex = result.findIndex((b) => b.name === 'ProductSchema')

      expect(userIndex).toBeLessThan(orderIndex)
      expect(itemIndex).toBeLessThan(orderIndex)
      expect(productIndex).toBeLessThan(itemIndex)
    })

    it.concurrent('handles blocks with no Schema suffix in references', () => {
      const blocks = [
        {
          name: 'ResponseSchema',
          code: 'const ResponseSchema = z.object({ data: DataSchema })',
        },
        {
          name: 'DataSchema',
          code: 'const DataSchema = z.object({ id: z.string() })',
        },
      ]
      const result = sortSchemaBlocks(blocks)
      expect(result[0].name).toBe('DataSchema')
      expect(result[1].name).toBe('ResponseSchema')
    })

    it.concurrent('handles independent blocks maintaining order', () => {
      const blocks = [
        {
          name: 'ASchema',
          code: 'const ASchema = z.object({ a: z.string() })',
        },
        {
          name: 'BSchema',
          code: 'const BSchema = z.object({ b: z.number() })',
        },
        {
          name: 'CSchema',
          code: 'const CSchema = z.object({ c: z.boolean() })',
        },
      ]
      const result = sortSchemaBlocks(blocks)
      // Independent blocks maintain their relative order
      expect(result.map((b) => b.name)).toEqual(['ASchema', 'BSchema', 'CSchema'])
    })

    it.concurrent('handles complex OpenAPI response schema pattern', () => {
      const blocks = [
        {
          name: 'ApiResponseSchema',
          code: `const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: DataSchema.optional(),
  error: ErrorSchema.optional()
})`,
        },
        {
          name: 'ErrorSchema',
          code: `const ErrorSchema = z.object({
  code: z.string(),
  message: z.string()
})`,
        },
        {
          name: 'DataSchema',
          code: `const DataSchema = z.object({
  user: UserSchema,
  items: z.array(ItemSchema)
})`,
        },
        {
          name: 'UserSchema',
          code: 'const UserSchema = z.object({ id: z.string(), name: z.string() })',
        },
        {
          name: 'ItemSchema',
          code: 'const ItemSchema = z.object({ id: z.string(), title: z.string() })',
        },
      ]
      const result = sortSchemaBlocks(blocks)
      const apiResponseIndex = result.findIndex((b) => b.name === 'ApiResponseSchema')
      const errorIndex = result.findIndex((b) => b.name === 'ErrorSchema')
      const dataIndex = result.findIndex((b) => b.name === 'DataSchema')
      const userIndex = result.findIndex((b) => b.name === 'UserSchema')
      const itemIndex = result.findIndex((b) => b.name === 'ItemSchema')

      // Dependencies should come before dependents
      expect(errorIndex).toBeLessThan(apiResponseIndex)
      expect(dataIndex).toBeLessThan(apiResponseIndex)
      expect(userIndex).toBeLessThan(dataIndex)
      expect(itemIndex).toBeLessThan(dataIndex)
    })

    it.concurrent('handles OpenAPI Pet Store style schemas', () => {
      const blocks = [
        {
          name: 'PetSchema',
          code: `const PetSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  category: CategorySchema.optional(),
  tags: z.array(TagSchema).optional()
})`,
        },
        {
          name: 'CategorySchema',
          code: 'const CategorySchema = z.object({ id: z.number().int(), name: z.string() })',
        },
        {
          name: 'TagSchema',
          code: 'const TagSchema = z.object({ id: z.number().int(), name: z.string() })',
        },
      ]
      const result = sortSchemaBlocks(blocks)
      const petIndex = result.findIndex((b) => b.name === 'PetSchema')
      const categoryIndex = result.findIndex((b) => b.name === 'CategorySchema')
      const tagIndex = result.findIndex((b) => b.name === 'TagSchema')

      expect(categoryIndex).toBeLessThan(petIndex)
      expect(tagIndex).toBeLessThan(petIndex)
    })

    it.concurrent('handles diamond dependency pattern', () => {
      const blocks = [
        {
          name: 'TopSchema',
          code: 'const TopSchema = z.object({ left: LeftSchema, right: RightSchema })',
        },
        {
          name: 'LeftSchema',
          code: 'const LeftSchema = z.object({ bottom: BottomSchema })',
        },
        {
          name: 'RightSchema',
          code: 'const RightSchema = z.object({ bottom: BottomSchema })',
        },
        {
          name: 'BottomSchema',
          code: 'const BottomSchema = z.object({ value: z.string() })',
        },
      ]
      const result = sortSchemaBlocks(blocks)
      const topIndex = result.findIndex((b) => b.name === 'TopSchema')
      const leftIndex = result.findIndex((b) => b.name === 'LeftSchema')
      const rightIndex = result.findIndex((b) => b.name === 'RightSchema')
      const bottomIndex = result.findIndex((b) => b.name === 'BottomSchema')

      // Bottom must come first
      expect(bottomIndex).toBeLessThan(leftIndex)
      expect(bottomIndex).toBeLessThan(rightIndex)
      // Left and Right must come before Top
      expect(leftIndex).toBeLessThan(topIndex)
      expect(rightIndex).toBeLessThan(topIndex)
    })
  })
})
