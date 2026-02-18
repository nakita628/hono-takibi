import { describe, expect, it } from 'vitest'
import { zodType } from './index.js'

describe('zodType', () => {
  describe('primitive types', () => {
    it.concurrent('generates string type', () => {
      expect(zodType({ type: 'string' }, 'Name')).toBe('type NameType=string')
    })

    it.concurrent('generates number type', () => {
      expect(zodType({ type: 'number' }, 'Price')).toBe('type PriceType=number')
    })

    it.concurrent('generates integer type', () => {
      expect(zodType({ type: 'integer' }, 'Count')).toBe('type CountType=number')
    })

    it.concurrent('generates boolean type', () => {
      expect(zodType({ type: 'boolean' }, 'Active')).toBe('type ActiveType=boolean')
    })
  })

  describe('array types', () => {
    it.concurrent('generates string array type', () => {
      expect(zodType({ type: 'array', items: { type: 'string' } }, 'Tags')).toBe(
        'type TagsType=string[]',
      )
    })

    it.concurrent('generates readonly string array type', () => {
      expect(zodType({ type: 'array', items: { type: 'string' } }, 'Tags', undefined, true)).toBe(
        'type TagsType=readonly string[]',
      )
    })

    it.concurrent('generates number array type', () => {
      expect(zodType({ type: 'array', items: { type: 'integer' } }, 'Ids')).toBe(
        'type IdsType=number[]',
      )
    })
  })

  describe('$ref types', () => {
    it.concurrent('generates ref type', () => {
      expect(zodType({ $ref: '#/components/schemas/User' }, 'UserList')).toBe(
        'type UserListType=z.infer<typeof UserSchema>',
      )
    })
  })

  describe('nullable types', () => {
    it.concurrent('generates nullable string type', () => {
      expect(zodType({ type: 'string', nullable: true }, 'Bio')).toBe('type BioType=(string|null)')
    })

    it.concurrent('generates nullable array notation', () => {
      expect(zodType({ type: ['string', 'null'] }, 'OptName')).toBe(
        'type OptNameType=(string|null)',
      )
    })
  })

  describe('object types', () => {
    it.concurrent('generates object type with properties', () => {
      const result = zodType(
        {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'integer' },
          },
          required: ['name'],
        },
        'User',
      )
      expect(result).toBe('type UserType={name:string;age?:number}')
    })
  })

  describe('record-like types in cyclic groups', () => {
    it.concurrent('generates inline index signature for record-like in cyclic group', () => {
      const cyclicGroup = new Set(['Node'])
      const result = zodType(
        {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        'Node',
        cyclicGroup,
      )
      expect(result).toBe('type NodeType = {[key:string]:string}')
    })

    it.concurrent('generates inline index signature for record-like with $ref value in cyclic group', () => {
      const cyclicGroup = new Set(['TreeNode'])
      const result = zodType(
        {
          type: 'object',
          additionalProperties: { $ref: '#/components/schemas/TreeNode' },
        },
        'TreeNode',
        cyclicGroup,
      )
      expect(result).toBe('type TreeNodeType = {[key:string]:TreeNodeType}')
    })
  })
})
