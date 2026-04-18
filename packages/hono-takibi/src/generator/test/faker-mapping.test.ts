import { describe, expect, it } from 'vite-plus/test'

import { schemaToFaker } from './faker-mapping.js'

describe('schemaToFaker', () => {
  describe('example values', () => {
    it.concurrent('uses example when useExamples is true', () => {
      expect(
        schemaToFaker({ type: 'string', example: 'hello' }, undefined, { useExamples: true }),
      ).toBe('"hello"')
    })

    it.concurrent('ignores example when useExamples is false', () => {
      expect(schemaToFaker({ type: 'string', example: 'hello' })).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })

    it.concurrent('uses numeric example', () => {
      expect(schemaToFaker({ type: 'number', example: 42 }, undefined, { useExamples: true })).toBe(
        '42',
      )
    })
  })

  describe('const values', () => {
    it.concurrent('handles string const', () => {
      expect(schemaToFaker({ const: 'fixed' })).toBe('"fixed" as const')
    })

    it.concurrent('handles numeric const', () => {
      expect(schemaToFaker({ const: 100 })).toBe('100 as const')
    })

    it.concurrent('handles boolean const', () => {
      expect(schemaToFaker({ const: true })).toBe('true as const')
    })
  })

  describe('enum', () => {
    it.concurrent('handles string enum', () => {
      expect(schemaToFaker({ type: 'string', enum: ['active', 'inactive'] })).toBe(
        'faker.helpers.arrayElement(["active", "inactive"] as const)',
      )
    })

    it.concurrent('handles numeric enum', () => {
      expect(schemaToFaker({ type: 'integer', enum: [1, 2, 3] })).toBe(
        'faker.helpers.arrayElement([1, 2, 3] as const)',
      )
    })
  })

  describe('$ref', () => {
    it.concurrent('generates mock function call for $ref', () => {
      expect(schemaToFaker({ $ref: '#/components/schemas/User' })).toBe('mockUser()')
    })

    it.concurrent('handles nested $ref path', () => {
      expect(schemaToFaker({ $ref: '#/components/schemas/OrderItem' })).toBe('mockOrderItem()')
    })

    it.concurrent('sanitizes dotted $ref name (TypeSpec namespace)', () => {
      expect(schemaToFaker({ $ref: '#/components/schemas/Auth.SignupRequest' })).toBe(
        'mockAuthSignupRequest()',
      )
    })

    it.concurrent('sanitizes multiple dots in $ref name', () => {
      expect(schemaToFaker({ $ref: '#/components/schemas/Api.V1.CreateUser' })).toBe(
        'mockApiV1CreateUser()',
      )
    })

    it.concurrent('$ref without dots is unchanged', () => {
      expect(schemaToFaker({ $ref: '#/components/schemas/UserId' })).toBe('mockUserId()')
    })
  })

  describe('array', () => {
    it.concurrent('generates array of strings', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'string' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (faker.string.alpha({ length: { min: 5, max: 20 } })))',
      )
    })

    it.concurrent('generates array of integers', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'integer' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (faker.number.int({ min: 1, max: 1000 })))',
      )
    })

    it.concurrent('generates array of $ref', () => {
      expect(schemaToFaker({ type: 'array', items: { $ref: '#/components/schemas/Tag' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (mockTag()))',
      )
    })
  })

  describe('object', () => {
    it.concurrent('generates object with required property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
      })
      expect(result).toBe('{\n    name: faker.person.fullName()\n  }')
    })

    it.concurrent('generates object with optional property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { age: { type: 'integer' } },
      })
      expect(result).toBe(
        '{\n    age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined])\n  }',
      )
    })

    it.concurrent('generates object with nullable property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { bio: { type: 'string', nullable: true } },
      })
      expect(result).toBe(
        '{\n    bio: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null])\n  }',
      )
    })
  })

  describe('allOf', () => {
    it.concurrent('merges schemas with spread', () => {
      expect(
        schemaToFaker({
          allOf: [{ $ref: '#/components/schemas/Base' }, { $ref: '#/components/schemas/Extra' }],
        }),
      ).toBe('{ ...mockBase(), ...mockExtra() }')
    })
  })

  describe('oneOf / anyOf', () => {
    it.concurrent('picks random from oneOf', () => {
      expect(
        schemaToFaker({
          oneOf: [{ type: 'string' }, { type: 'integer' }],
        }),
      ).toBe(
        'faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), faker.number.int({ min: 1, max: 1000 })])',
      )
    })

    it.concurrent('picks random from anyOf', () => {
      expect(
        schemaToFaker({
          anyOf: [{ type: 'boolean' }, { type: 'string' }],
        }),
      ).toBe(
        'faker.helpers.arrayElement([faker.datatype.boolean(), faker.string.alpha({ length: { min: 5, max: 20 } })])',
      )
    })
  })

  describe('format mapping', () => {
    it.concurrent('uses format over type for date-time', () => {
      expect(schemaToFaker({ type: 'string', format: 'date-time' })).toBe(
        'faker.date.past().toISOString()',
      )
    })

    it.concurrent('uses format for email', () => {
      expect(schemaToFaker({ type: 'string', format: 'email' })).toBe('faker.internet.email()')
    })

    it.concurrent('uses format for uuid', () => {
      expect(schemaToFaker({ type: 'string', format: 'uuid' })).toBe('faker.string.uuid()')
    })
  })

  describe('property name heuristics', () => {
    it.concurrent('uses property name hint for email', () => {
      expect(schemaToFaker({ type: 'string' }, 'email')).toBe('faker.internet.email()')
    })

    it.concurrent('uses property name hint for createdAt', () => {
      expect(schemaToFaker({ type: 'string' }, 'createdAt')).toBe('faker.date.past().toISOString()')
    })

    it.concurrent('skips number hint when type is string', () => {
      expect(schemaToFaker({ type: 'string' }, 'id')).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })

    it.concurrent('uses number hint when type is integer', () => {
      expect(schemaToFaker({ type: 'integer' }, 'id')).toBe(
        'faker.number.int({ min: 1, max: 99999 })',
      )
    })
  })

  describe('type mapping with constraints', () => {
    it.concurrent('uses minLength/maxLength for string', () => {
      expect(schemaToFaker({ type: 'string', minLength: 1, maxLength: 100 })).toBe(
        'faker.string.alpha({ length: { min: 1, max: 100 } })',
      )
    })

    it.concurrent('uses minimum/maximum for integer', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 0, maximum: 10 })).toBe(
        'faker.number.int({ min: 0, max: 10 })',
      )
    })

    it.concurrent('uses minimum/maximum for number', () => {
      expect(schemaToFaker({ type: 'number', minimum: 0, maximum: 100 })).toBe(
        'faker.number.float({ min: 0, max: 100, fractionDigits: 2 })',
      )
    })

    it.concurrent('uses pattern for string', () => {
      expect(schemaToFaker({ type: 'string', pattern: '^[A-Z]{3}$' })).toBe(
        'faker.helpers.fromRegExp(/^[A-Z]{3}$/)',
      )
    })
  })

  describe('example values (additional)', () => {
    it.concurrent('uses boolean example', () => {
      expect(
        schemaToFaker({ type: 'boolean', example: false }, undefined, { useExamples: true }),
      ).toBe('false')
    })

    it.concurrent('uses null example', () => {
      expect(
        schemaToFaker({ type: 'string', example: null, nullable: true }, undefined, {
          useExamples: true,
        }),
      ).toBe('null')
    })

    it.concurrent('uses object example', () => {
      expect(
        schemaToFaker({ type: 'object', example: { key: 'value' } }, undefined, {
          useExamples: true,
        }),
      ).toBe('{"key":"value"}')
    })

    it.concurrent('uses array example', () => {
      expect(
        schemaToFaker({ type: 'array', example: [1, 2, 3] }, undefined, { useExamples: true }),
      ).toBe('[1,2,3]')
    })
  })

  describe('const values (additional)', () => {
    it.concurrent('handles null const', () => {
      expect(schemaToFaker({ const: null })).toBe('null as const')
    })
  })

  describe('allOf with sibling properties', () => {
    it.concurrent('merges allOf refs with sibling required property', () => {
      expect(
        schemaToFaker({
          allOf: [{ $ref: '#/components/schemas/Base' }],
          properties: { extra: { type: 'string' } },
          required: ['extra'],
        }),
      ).toBe('{ ...mockBase(), extra: faker.string.alpha({ length: { min: 5, max: 20 } }) }')
    })

    it.concurrent('merges allOf refs with sibling optional property', () => {
      expect(
        schemaToFaker({
          allOf: [{ $ref: '#/components/schemas/Base' }],
          properties: { note: { type: 'string' } },
        }),
      ).toBe(
        '{ ...mockBase(), note: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), undefined]) }',
      )
    })

    it.concurrent('merges allOf refs with sibling nullable property', () => {
      expect(
        schemaToFaker({
          allOf: [{ $ref: '#/components/schemas/Base' }],
          properties: { tag: { type: 'string', nullable: true } },
        }),
      ).toBe(
        '{ ...mockBase(), tag: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null]) }',
      )
    })
  })

  describe('oneOf / anyOf (additional)', () => {
    it.concurrent('picks random from oneOf with $ref variants', () => {
      expect(
        schemaToFaker({
          oneOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
        }),
      ).toBe('faker.helpers.arrayElement([mockCat(), mockDog()])')
    })

    it.concurrent('picks random from anyOf with mixed types', () => {
      expect(
        schemaToFaker({
          anyOf: [{ type: 'integer' }, { $ref: '#/components/schemas/Custom' }],
        }),
      ).toBe('faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 }), mockCustom()])')
    })
  })

  describe('object with additionalProperties only', () => {
    it.concurrent('returns empty object when no explicit properties', () => {
      expect(
        schemaToFaker({
          type: 'object',
          additionalProperties: { type: 'string' },
        }),
      ).toBe('{}')
    })

    it.concurrent('returns empty object for additionalProperties true', () => {
      expect(
        schemaToFaker({
          type: 'object',
          additionalProperties: true,
        }),
      ).toBe('{}')
    })
  })

  describe('string constraints (partial)', () => {
    it.concurrent('uses only minLength with default max', () => {
      expect(schemaToFaker({ type: 'string', minLength: 10 })).toBe(
        'faker.string.alpha({ length: { min: 10, max: 20 } })',
      )
    })

    it.concurrent('uses only maxLength with default min', () => {
      expect(schemaToFaker({ type: 'string', maxLength: 50 })).toBe(
        'faker.string.alpha({ length: { min: 5, max: 50 } })',
      )
    })
  })

  describe('number/integer constraints (partial)', () => {
    it.concurrent('uses only minimum with default max for integer', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 100 })).toBe(
        'faker.number.int({ min: 100, max: 1000 })',
      )
    })

    it.concurrent('uses only maximum with default min for integer', () => {
      expect(schemaToFaker({ type: 'integer', maximum: 50 })).toBe(
        'faker.number.int({ min: 1, max: 50 })',
      )
    })

    it.concurrent('uses only minimum with default max for number', () => {
      expect(schemaToFaker({ type: 'number', minimum: 10 })).toBe(
        'faker.number.float({ min: 10, max: 1000, fractionDigits: 2 })',
      )
    })

    it.concurrent('uses only maximum with default min for number', () => {
      expect(schemaToFaker({ type: 'number', maximum: 500 })).toBe(
        'faker.number.float({ min: 1, max: 500, fractionDigits: 2 })',
      )
    })
  })

  describe('property name heuristics (additional conflicts)', () => {
    it.concurrent('skips number hint for price when type is string', () => {
      expect(schemaToFaker({ type: 'string' }, 'price')).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })

    it.concurrent('skips number hint for quantity when type is string', () => {
      expect(schemaToFaker({ type: 'string' }, 'quantity')).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })

    it.concurrent('skips number hint for age when type is string', () => {
      expect(schemaToFaker({ type: 'string' }, 'age')).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })

    it.concurrent('uses string hint for title when type is string', () => {
      expect(schemaToFaker({ type: 'string' }, 'title')).toBe('faker.lorem.sentence()')
    })

    it.concurrent('uses string hint for description when type is string', () => {
      expect(schemaToFaker({ type: 'string' }, 'description')).toBe('faker.lorem.paragraph()')
    })

    it.concurrent('ignores property name when name is not in map', () => {
      expect(schemaToFaker({ type: 'string' }, 'unknownProp')).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })
  })

  describe('array with tuple-style items', () => {
    it.concurrent('uses first item from tuple-style items array', () => {
      const schema = {
        type: 'array' as const,
        items: [{ type: 'string' as const }, { type: 'integer' as const }],
      }
      expect(schemaToFaker(schema)).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (faker.string.alpha({ length: { min: 5, max: 20 } })))',
      )
    })

    it.concurrent('returns empty array for empty tuple items', () => {
      const schema = {
        type: 'array' as const,
        items: [] as readonly [],
      }
      expect(schemaToFaker(schema)).toBe('[]')
    })
  })

  describe('object with nullable required property', () => {
    it.concurrent('generates nullable for required nullable property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { label: { type: 'string', nullable: true } },
        required: ['label'],
      })
      expect(result).toBe(
        '{\n    label: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null])\n  }',
      )
    })
  })

  describe('object with multiple properties', () => {
    it.concurrent('generates object with required, optional, and nullable properties', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          bio: { type: 'string', nullable: true },
        },
        required: ['id', 'name'],
      })
      expect(result).toBe(
        '{\n    id: faker.number.int({ min: 1, max: 99999 }),\n    name: faker.person.fullName(),\n    bio: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null])\n  }',
      )
    })
  })

  describe('null type', () => {
    it.concurrent('returns null for null type', () => {
      expect(schemaToFaker({ type: 'null' })).toBe('null')
    })
  })

  describe('fallback', () => {
    it.concurrent('returns undefined for empty schema', () => {
      expect(schemaToFaker({})).toBe('undefined')
    })

    it.concurrent('returns boolean for boolean type', () => {
      expect(schemaToFaker({ type: 'boolean' })).toBe('faker.datatype.boolean()')
    })

    it.concurrent('returns undefined for unknown type', () => {
      expect(schemaToFaker({ type: 'date' })).toBe('undefined')
    })
  })
})
