import { describe, expect, it } from 'vite-plus/test'

import { makeTypeString } from './type.js'

describe('makeTypeString', () => {
  describe('primitive types', () => {
    it('should handle string type', () => {
      expect(makeTypeString({ type: 'string' }, 'Test')).toBe('string')
    })

    it('should handle number type', () => {
      expect(makeTypeString({ type: 'number' }, 'Test')).toBe('number')
    })

    it('should handle integer type', () => {
      expect(makeTypeString({ type: 'integer' }, 'Test')).toBe('number')
    })

    it('should handle boolean type', () => {
      expect(makeTypeString({ type: 'boolean' }, 'Test')).toBe('boolean')
    })

    it('should handle null type', () => {
      // null type alone is treated as nullable object
      expect(makeTypeString({ type: 'null' }, 'Test')).toBe('({[key:string]:unknown}|null)')
    })
  })

  describe('nullable types', () => {
    it('should handle nullable string', () => {
      expect(makeTypeString({ type: 'string', nullable: true }, 'Test')).toBe('(string|null)')
    })

    it('should handle type array with null', () => {
      expect(makeTypeString({ type: ['string', 'null'] }, 'Test')).toBe('(string|null)')
    })
  })

  describe('$ref types', () => {
    it('should handle simple $ref', () => {
      expect(makeTypeString({ $ref: '#/components/schemas/User' }, 'Test')).toBe(
        'z.infer<typeof UserSchema>',
      )
    })

    it('should handle self-reference', () => {
      expect(makeTypeString({ $ref: '#/components/schemas/User' }, 'User')).toBe('UserType')
    })

    it('should handle cyclic group reference', () => {
      const cyclicGroup = new Set(['Parent', 'Child'])
      // For non-self references (even in cyclic group), use z.infer for split mode compatibility
      expect(makeTypeString({ $ref: '#/components/schemas/Parent' }, 'Child', cyclicGroup)).toBe(
        'z.infer<typeof ParentSchema>',
      )
    })

    it('should handle properties $ref', () => {
      expect(makeTypeString({ $ref: '#/components/schemas/User/properties/name' }, 'Test')).toBe(
        'z.infer<typeof UserSchema>',
      )
    })

    it('should handle properties $ref with self-reference', () => {
      expect(makeTypeString({ $ref: '#/components/schemas/User/properties/name' }, 'User')).toBe(
        'UserType',
      )
    })

    it('should handle URL-encoded $ref', () => {
      expect(makeTypeString({ $ref: '#/components/schemas/User%20Profile' }, 'Test')).toBe(
        'z.infer<typeof UserProfileSchema>',
      )
    })
  })

  describe('split mode cyclic group compatibility', () => {
    const cyclicGroup = new Set(['Event', 'UserEventPayload', 'OrderEventPayload', 'TraceContext'])

    it('should use z.infer for oneOf refs in cyclic group', () => {
      const result = makeTypeString(
        {
          oneOf: [
            { $ref: '#/components/schemas/UserEventPayload' },
            { $ref: '#/components/schemas/OrderEventPayload' },
          ],
        },
        'Event',
        cyclicGroup,
      )
      expect(result).toBe(
        '(z.infer<typeof UserEventPayloadSchema>|z.infer<typeof OrderEventPayloadSchema>)',
      )
    })

    it('should use z.infer for anyOf refs in cyclic group', () => {
      const result = makeTypeString(
        {
          anyOf: [{ $ref: '#/components/schemas/TraceContext' }, { type: 'null' }],
        },
        'Event',
        cyclicGroup,
      )
      expect(result).toBe('(z.infer<typeof TraceContextSchema>|({[key:string]:unknown}|null))')
    })

    it('should use local type for self-reference in cyclic group', () => {
      const result = makeTypeString({ $ref: '#/components/schemas/Event' }, 'Event', cyclicGroup)
      expect(result).toBe('EventType')
    })

    it('should handle nested object with cyclic refs', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            payload: { $ref: '#/components/schemas/UserEventPayload' },
            trace: { $ref: '#/components/schemas/TraceContext' },
          },
        },
        'Event',
        cyclicGroup,
      )
      expect(result).toBe(
        '{payload?:z.infer<typeof UserEventPayloadSchema>;trace?:z.infer<typeof TraceContextSchema>}',
      )
    })

    it('should handle additionalProperties with cyclic ref', () => {
      const result = makeTypeString(
        {
          type: 'object',
          additionalProperties: { $ref: '#/components/schemas/TraceContext' },
        },
        'Event',
        cyclicGroup,
      )
      expect(result).toBe('{[key:string]:z.infer<typeof TraceContextSchema>}')
    })

    it('should not use local type for non-cyclic schema even when cyclicGroup exists', () => {
      const result = makeTypeString(
        { $ref: '#/components/schemas/NonCyclicSchema' },
        'Event',
        cyclicGroup,
      )
      expect(result).toBe('z.infer<typeof NonCyclicSchemaSchema>')
    })
  })

  describe('union types', () => {
    it('should handle oneOf', () => {
      const result = makeTypeString(
        {
          oneOf: [{ type: 'string' }, { type: 'number' }],
        },
        'Test',
      )
      expect(result).toBe('(string|number)')
    })

    it('should handle anyOf', () => {
      const result = makeTypeString(
        {
          anyOf: [{ type: 'string' }, { type: 'boolean' }],
        },
        'Test',
      )
      expect(result).toBe('(string|boolean)')
    })

    it('should handle allOf as intersection', () => {
      const result = makeTypeString(
        {
          allOf: [
            { type: 'object', properties: { id: { type: 'integer' } } },
            { type: 'object', properties: { name: { type: 'string' } } },
          ],
        },
        'Test',
      )
      expect(result).toBe('({id?:number}&{name?:string})')
    })

    it('should handle single item union', () => {
      const result = makeTypeString(
        {
          oneOf: [{ type: 'string' }],
        },
        'Test',
      )
      expect(result).toBe('string')
    })
  })

  describe('enum types', () => {
    it('should handle string enum', () => {
      expect(makeTypeString({ enum: ['active', 'inactive'] }, 'Test')).toBe("'active'|'inactive'")
    })

    it('should handle numeric enum', () => {
      expect(makeTypeString({ enum: [1, 2, 3] }, 'Test')).toBe('1|2|3')
    })

    it('should handle mixed enum', () => {
      expect(makeTypeString({ enum: ['a', 1, 'b'] }, 'Test')).toBe("'a'|1|'b'")
    })
  })

  describe('const types', () => {
    it('should handle string const', () => {
      expect(makeTypeString({ const: 'fixed' }, 'Test')).toBe("'fixed'")
    })

    it('should handle numeric const', () => {
      expect(makeTypeString({ const: 42 }, 'Test')).toBe('42')
    })

    it('should handle boolean const', () => {
      expect(makeTypeString({ const: true }, 'Test')).toBe('true')
    })
  })

  describe('array types', () => {
    it('should handle array of strings', () => {
      expect(makeTypeString({ type: 'array', items: { type: 'string' } }, 'Test')).toBe('string[]')
    })

    it('should handle array of refs', () => {
      expect(
        makeTypeString({ type: 'array', items: { $ref: '#/components/schemas/User' } }, 'Test'),
      ).toBe('z.infer<typeof UserSchema>[]')
    })

    it('should handle self-referencing array', () => {
      expect(
        makeTypeString({ type: 'array', items: { $ref: '#/components/schemas/Node' } }, 'Node'),
      ).toBe('NodeType[]')
    })

    it('should handle cyclic group array reference (split mode compatibility)', () => {
      const cyclicGroup = new Set(['Event', 'UserEventPayload', 'TraceContext'])
      // For non-self references in cyclic group, use z.infer for split mode compatibility
      expect(
        makeTypeString(
          { type: 'array', items: { $ref: '#/components/schemas/TraceContext' } },
          'Event',
          cyclicGroup,
        ),
      ).toBe('z.infer<typeof TraceContextSchema>[]')
    })

    it('should handle array without items', () => {
      expect(makeTypeString({ type: 'array' }, 'Test')).toBe('unknown[]')
    })

    it('should handle tuple array', () => {
      const result = makeTypeString(
        { type: 'array', items: [{ type: 'string' }, { type: 'number' }] },
        'Test',
      )
      expect(result).toBe('[string,number]')
    })
  })

  describe('object types', () => {
    it('should handle object with properties', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
          required: ['id'],
        },
        'Test',
      )
      expect(result).toBe('{id:number;name?:string}')
    })

    it('should handle object with additionalProperties true', () => {
      expect(makeTypeString({ type: 'object', additionalProperties: true }, 'Test')).toBe(
        '{[key:string]:unknown}',
      )
    })

    it('should handle object with typed additionalProperties', () => {
      expect(
        makeTypeString({ type: 'object', additionalProperties: { type: 'string' } }, 'Test'),
      ).toBe('{[key:string]:string}')
    })

    it('should handle empty object', () => {
      expect(makeTypeString({ type: 'object' }, 'Test')).toBe('{[key:string]:unknown}')
    })

    it('should handle property keys with special characters', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            'special-key': { type: 'string' },
          },
        },
        'Test',
      )
      expect(result).toBe("{'special-key'?:string}")
    })
  })

  describe('readonly types', () => {
    it('should generate readonly array type', () => {
      expect(
        makeTypeString({ type: 'array', items: { type: 'string' } }, 'Test', undefined, true),
      ).toBe('readonly string[]')
    })

    it('should generate readonly object type', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
          required: ['id'],
        },
        'Test',
        undefined,
        true,
      )
      expect(result).toBe('{readonly id:number;readonly name?:string}')
    })

    it('should generate readonly nested array', () => {
      const result = makeTypeString(
        {
          type: 'array',
          items: { type: 'array', items: { type: 'string' } },
        },
        'Test',
        undefined,
        true,
      )
      expect(result).toBe('readonly (readonly string[])[]')
    })

    it('should generate readonly tuple', () => {
      const result = makeTypeString(
        { type: 'array', items: [{ type: 'string' }, { type: 'number' }] },
        'Test',
        undefined,
        true,
      )
      expect(result).toBe('readonly [string,number]')
    })

    it('should generate readonly object with additionalProperties', () => {
      expect(
        makeTypeString(
          { type: 'object', additionalProperties: { type: 'string' } },
          'Test',
          undefined,
          true,
        ),
      ).toBe('{readonly [key:string]:string}')
    })

    it('should generate readonly self-referencing array', () => {
      expect(
        makeTypeString(
          { type: 'array', items: { $ref: '#/components/schemas/Node' } },
          'Node',
          undefined,
          true,
        ),
      ).toBe('readonly NodeType[]')
    })

    it('should generate readonly array with $ref', () => {
      expect(
        makeTypeString(
          { type: 'array', items: { $ref: '#/components/schemas/User' } },
          'Test',
          undefined,
          true,
        ),
      ).toBe('readonly z.infer<typeof UserSchema>[]')
    })

    it('should generate readonly nullable string', () => {
      expect(makeTypeString({ type: 'string', nullable: true }, 'Test', undefined, true)).toBe(
        '(string|null)',
      )
    })
  })

  describe('allOf intersection types', () => {
    it('should generate intersection with two objects', () => {
      const result = makeTypeString(
        {
          allOf: [
            {
              type: 'object',
              properties: { id: { type: 'integer' } },
              required: ['id'],
            },
            {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
            },
          ],
        },
        'Test',
      )
      expect(result).toBe('({id:number}&{name:string})')
    })

    it('should generate intersection with $ref', () => {
      const result = makeTypeString(
        {
          allOf: [
            { $ref: '#/components/schemas/Base' },
            { type: 'object', properties: { extra: { type: 'string' } } },
          ],
        },
        'Test',
      )
      expect(result).toBe('(z.infer<typeof BaseSchema>&{extra?:string})')
    })

    it('should handle single allOf item', () => {
      const result = makeTypeString({ allOf: [{ type: 'string' }] }, 'Test')
      expect(result).toBe('string')
    })
  })

  describe('complex nested types', () => {
    it('should handle object with array property containing $ref', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            tags: { type: 'array', items: { type: 'string' } },
            author: { $ref: '#/components/schemas/User' },
          },
          required: ['tags', 'author'],
        },
        'Post',
      )
      expect(result).toBe('{tags:string[];author:z.infer<typeof UserSchema>}')
    })

    it('should handle oneOf with $ref and primitive', () => {
      const result = makeTypeString(
        {
          oneOf: [{ $ref: '#/components/schemas/User' }, { type: 'null' }],
        },
        'Test',
      )
      expect(result).toBe('(z.infer<typeof UserSchema>|({[key:string]:unknown}|null))')
    })

    it('should handle nullable array of objects', () => {
      const result = makeTypeString(
        {
          type: 'array',
          items: {
            type: 'object',
            properties: { name: { type: 'string' } },
          },
          nullable: true,
        },
        'Test',
      )
      expect(result).toBe('({name?:string}[]|null)')
    })

    it('should handle object with all optional properties', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            a: { type: 'string' },
            b: { type: 'number' },
            c: { type: 'boolean' },
          },
        },
        'Test',
      )
      expect(result).toBe('{a?:string;b?:number;c?:boolean}')
    })

    it('should handle object with all required properties', () => {
      const result = makeTypeString(
        {
          type: 'object',
          properties: {
            a: { type: 'string' },
            b: { type: 'number' },
          },
          required: ['a', 'b'],
        },
        'Test',
      )
      expect(result).toBe('{a:string;b:number}')
    })
  })

  describe('edge cases', () => {
    it('should handle undefined schema', () => {
      expect(makeTypeString(undefined as never, 'Test')).toBe('unknown')
    })

    it('should handle schema without type', () => {
      expect(makeTypeString({}, 'Test')).toBe('{[key:string]:unknown}')
    })

    it('should handle multiple types', () => {
      const result = makeTypeString({ type: ['string', 'number'] }, 'Test')
      expect(result).toBe('string|number')
    })

    it('should handle empty enum array', () => {
      const result = makeTypeString({ type: ['string', 'number', 'null'] }, 'Test')
      expect(result).toBe('(string|number|null)')
    })

    it('should handle unknown type fallback', () => {
      const result = makeTypeString({ type: 'any' as 'string' }, 'Test')
      expect(result).toBe('unknown')
    })

    it('should handle array without items returns unknown[]', () => {
      expect(makeTypeString({ type: 'array' }, 'Test')).toBe('unknown[]')
    })

    it('should handle readonly array without items', () => {
      expect(makeTypeString({ type: 'array' }, 'Test', undefined, true)).toBe('readonly unknown[]')
    })

    it('should handle empty oneOf array', () => {
      expect(makeTypeString({ oneOf: [] }, 'Test')).toBe('{[key:string]:unknown}')
    })

    it('should handle empty anyOf array', () => {
      expect(makeTypeString({ anyOf: [] }, 'Test')).toBe('{[key:string]:unknown}')
    })

    it('should handle empty allOf array', () => {
      expect(makeTypeString({ allOf: [] }, 'Test')).toBe('{[key:string]:unknown}')
    })

    it('should handle URL-encoded $ref with special characters', () => {
      expect(makeTypeString({ $ref: '#/components/schemas/My%20Schema' }, 'Test')).toBe(
        'z.infer<typeof MySchemaSchema>',
      )
    })

    it('should handle properties $ref for array items', () => {
      expect(
        makeTypeString(
          { type: 'array', items: { $ref: '#/components/schemas/User/properties/tags' } },
          'Test',
        ),
      ).toBe('z.infer<typeof UserSchema>[]')
    })

    it('should handle properties $ref for self-referencing array items', () => {
      expect(
        makeTypeString(
          { type: 'array', items: { $ref: '#/components/schemas/Node/properties/children' } },
          'Node',
        ),
      ).toBe('NodeType[]')
    })
  })
})
