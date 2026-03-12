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

    it.concurrent('uses normal path for record-like outside cyclic group', () => {
      const result = zodType(
        {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
        'Config',
      )
      expect(result).toBe('type ConfigType={[key:string]:string}')
    })

    it.concurrent('uses normal path for record-like with empty cyclic group', () => {
      const result = zodType(
        {
          type: 'object',
          additionalProperties: { type: 'number' },
        },
        'Scores',
        new Set(),
      )
      expect(result).toBe('type ScoresType={[key:string]:number}')
    })

    it.concurrent('non-record-like object in cyclic group uses normal path', () => {
      const cyclicGroup = new Set(['User'])
      const result = zodType(
        {
          type: 'object',
          properties: {
            name: { type: 'string' },
            friend: { $ref: '#/components/schemas/User' },
          },
        },
        'User',
        cyclicGroup,
      )
      expect(result).toBe('type UserType={name?:string;friend?:UserType}')
    })
  })

  describe('readonly types', () => {
    it.concurrent('generates readonly array type', () => {
      expect(zodType({ type: 'array', items: { type: 'number' } }, 'Ids', undefined, true)).toBe(
        'type IdsType=readonly number[]',
      )
    })

    it.concurrent('generates readonly object type', () => {
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
        undefined,
        true,
      )
      expect(result).toBe('type UserType={readonly name:string;readonly age?:number}')
    })

    it.concurrent('generates readonly nested array type', () => {
      const result = zodType(
        {
          type: 'array',
          items: { type: 'array', items: { type: 'string' } },
        },
        'Matrix',
        undefined,
        true,
      )
      expect(result).toBe('type MatrixType=readonly (readonly string[])[]')
    })

    it.concurrent('generates readonly tuple type', () => {
      const result = zodType(
        {
          type: 'array',
          items: [{ type: 'string' }, { type: 'number' }],
        },
        'Pair',
        undefined,
        true,
      )
      expect(result).toBe('type PairType=readonly [string,number]')
    })
  })

  describe('complex use cases', () => {
    it.concurrent('generates type for self-referencing tree structure', () => {
      const result = zodType(
        {
          type: 'object',
          properties: {
            value: { type: 'string' },
            children: { type: 'array', items: { $ref: '#/components/schemas/Node' } },
          },
          required: ['value'],
        },
        'Node',
      )
      expect(result).toBe('type NodeType={value:string;children?:NodeType[]}')
    })

    it.concurrent('generates type for enum schema', () => {
      expect(zodType({ enum: ['active', 'inactive', 'banned'] }, 'Status')).toBe(
        "type StatusType='active'|'inactive'|'banned'",
      )
    })

    it.concurrent('generates type for const schema', () => {
      expect(zodType({ const: 'fixed_value' }, 'Tag')).toBe("type TagType='fixed_value'")
    })

    it.concurrent('generates type for nullable number', () => {
      expect(zodType({ type: 'number', nullable: true }, 'Score')).toBe(
        'type ScoreType=(number|null)',
      )
    })

    it.concurrent('generates type for oneOf union', () => {
      const result = zodType(
        {
          oneOf: [{ type: 'string' }, { type: 'number' }],
        },
        'Value',
      )
      expect(result).toBe('type ValueType=(string|number)')
    })

    it.concurrent('generates type for allOf intersection', () => {
      const result = zodType(
        {
          allOf: [
            { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
            { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] },
          ],
        },
        'Named',
      )
      expect(result).toBe('type NamedType=({id:number}&{name:string})')
    })

    it.concurrent('generates type for array of $ref', () => {
      expect(
        zodType({ type: 'array', items: { $ref: '#/components/schemas/User' } }, 'UserList'),
      ).toBe('type UserListType=z.infer<typeof UserSchema>[]')
    })

    it.concurrent('generates readonly type for array of $ref', () => {
      expect(
        zodType(
          { type: 'array', items: { $ref: '#/components/schemas/User' } },
          'UserList',
          undefined,
          true,
        ),
      ).toBe('type UserListType=readonly z.infer<typeof UserSchema>[]')
    })
  })
})
