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

    it.concurrent('$ref with trailing slash falls back to mockunknown()', () => {
      expect(schemaToFaker({ $ref: '#/components/schemas/' })).toBe('mockunknown()')
    })
  })

  describe('oneOf vs anyOf precedence', () => {
    it.concurrent('prefers oneOf over anyOf when both are present', () => {
      expect(
        schemaToFaker({
          oneOf: [{ type: 'boolean' }],
          anyOf: [{ type: 'integer' }],
        }),
      ).toBe('faker.helpers.arrayElement([faker.datatype.boolean()])')
    })

    it.concurrent('falls back to anyOf when oneOf is empty', () => {
      expect(
        schemaToFaker({
          oneOf: [],
          anyOf: [{ type: 'integer' }],
        }),
      ).toBe('faker.helpers.arrayElement([faker.number.int({ min: 1, max: 1000 })])')
    })

    it.concurrent('returns undefined when both oneOf and anyOf are empty', () => {
      expect(schemaToFaker({ oneOf: [], anyOf: [] })).toBe('undefined')
    })
  })

  describe('array', () => {
    it.concurrent('generates array of strings', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'string' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => (faker.string.alpha({ length: { min: 5, max: 20 } })))',
      )
    })

    it.concurrent('generates array of integers', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'integer' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => (faker.number.int({ min: 1, max: 1000 })))',
      )
    })

    it.concurrent('generates array of $ref', () => {
      expect(schemaToFaker({ type: 'array', items: { $ref: '#/components/schemas/Tag' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => (mockTag()))',
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
      expect(result).toBe('{ name: faker.person.fullName() }')
    })

    it.concurrent('generates object with optional property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { age: { type: 'integer' } },
      })
      expect(result).toBe(
        '{ age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined]) }',
      )
    })

    it.concurrent('generates object with nullable property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { bio: { type: 'string', nullable: true } },
      })
      expect(result).toBe(
        '{ bio: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null]) }',
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

    it.concurrent('delegates a single scalar member without spreading', () => {
      expect(
        schemaToFaker({ allOf: [{ $ref: '#/components/schemas/Kind' }] }, undefined, {
          schemas: { Kind: { type: 'string', enum: ['a', 'b'] } },
        }),
      ).toBe('mockKind()')
    })

    it.concurrent('inlines a single inline enum member without spreading', () => {
      expect(schemaToFaker({ allOf: [{ type: 'string', enum: ['a', 'b'] }] })).toBe(
        'faker.helpers.arrayElement(["a", "b"] as const)',
      )
    })

    it.concurrent('spreads only the object members of a mixed allOf, dropping scalars', () => {
      expect(
        schemaToFaker(
          {
            allOf: [{ $ref: '#/components/schemas/Base' }, { $ref: '#/components/schemas/Tag' }],
          },
          undefined,
          {
            schemas: {
              Base: { type: 'object', properties: { x: { type: 'string' } } },
              Tag: { type: 'string', enum: ['a'] },
            },
          },
        ),
      ).toBe('{ ...mockBase() }')
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

    it.concurrent('generates a File for binary (matches the z.file() / File response type)', () => {
      expect(schemaToFaker({ type: 'string', format: 'binary' })).toBe(
        'new File([faker.string.alphanumeric(100)], faker.system.fileName())',
      )
    })

    it.concurrent('generates a number for int32 (z.int32() is a number)', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int32' })).toBe(
        'faker.number.int({ min: -2147483648, max: 2147483647 })',
      )
    })

    it.concurrent('generates a bigint for int64 (z.int64() is a bigint)', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int64' })).toBe(
        'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
      )
    })

    it.concurrent('generates a bigint for the bigint format', () => {
      expect(schemaToFaker({ type: 'integer', format: 'bigint' })).toBe(
        'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
      )
    })

    it.concurrent('keeps float as a number', () => {
      expect(schemaToFaker({ type: 'number', format: 'float' })).toBe(
        'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
      )
    })

    it.concurrent('keeps double as a number', () => {
      expect(schemaToFaker({ type: 'number', format: 'double' })).toBe(
        'faker.number.float({ min: 0, max: 1000000, fractionDigits: 4 })',
      )
    })

    it.concurrent('generates a bigint for an optional int64 object property', () => {
      expect(
        schemaToFaker({
          type: 'object',
          properties: { id: { type: 'integer', format: 'int64' } },
        }),
      ).toBe(
        '{ id: faker.helpers.arrayElement([faker.number.bigInt({ min: 0n, max: 9007199254740991n }), undefined]) }',
      )
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

    it.concurrent('escapes an unescaped forward slash in the pattern', () => {
      expect(schemaToFaker({ type: 'string', pattern: 'a/b' })).toBe(
        'faker.helpers.fromRegExp(/a\\/b/)',
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
        'Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => (faker.string.alpha({ length: { min: 5, max: 20 } })))',
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
        '{ label: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null]) }',
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
        '{ id: faker.number.int({ min: 1, max: 99999 }), name: faker.person.fullName(), bio: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null]) }',
      )
    })
  })

  describe('null type', () => {
    it.concurrent('returns null for null type', () => {
      expect(schemaToFaker({ type: 'null' })).toBe('null')
    })
  })

  describe('numeric format with constraints', () => {
    it.concurrent('respects minimum/maximum over int32 default range', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int32', minimum: 0, maximum: 100 })).toBe(
        'faker.number.int({ min: 0, max: 100 })',
      )
    })

    it.concurrent('keeps int32 upper bound when only minimum is set', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int32', minimum: 5 })).toBe(
        'faker.number.int({ min: 5, max: 2147483647 })',
      )
    })

    it.concurrent('keeps int32 lower bound when only maximum is set', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int32', maximum: 5 })).toBe(
        'faker.number.int({ min: -2147483648, max: 5 })',
      )
    })

    it.concurrent('respects minimum/maximum for int64 as bigint literals', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int64', minimum: 0, maximum: 1000 })).toBe(
        'faker.number.bigInt({ min: 0n, max: 1000n })',
      )
    })

    it.concurrent('respects minimum/maximum for the bigint format', () => {
      expect(schemaToFaker({ type: 'integer', format: 'bigint', minimum: 0, maximum: 5 })).toBe(
        'faker.number.bigInt({ min: 0n, max: 5n })',
      )
    })

    it.concurrent('shifts int64 exclusive bounds inward as bigint literals', () => {
      expect(
        schemaToFaker({
          type: 'integer',
          format: 'int64',
          exclusiveMinimum: 0,
          exclusiveMaximum: 1000,
        }),
      ).toBe('faker.number.bigInt({ min: 1n, max: 999n })')
    })

    it.concurrent('keeps int64 default upper bound as a bigint literal when only minimum is set', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int64', minimum: 5 })).toBe(
        'faker.number.bigInt({ min: 5n, max: 9007199254740991n })',
      )
    })

    it.concurrent('drops multipleOf for int64 (faker.number.bigInt has no multipleOf option)', () => {
      expect(schemaToFaker({ type: 'integer', format: 'int64', multipleOf: 5 })).toBe(
        'faker.number.bigInt({ min: 0n, max: 9007199254740991n })',
      )
    })

    it.concurrent('respects minimum/maximum for float', () => {
      expect(schemaToFaker({ type: 'number', format: 'float', minimum: 0, maximum: 10 })).toBe(
        'faker.number.float({ min: 0, max: 10, fractionDigits: 2 })',
      )
    })

    it.concurrent('keeps double fractionDigits while respecting bounds', () => {
      expect(schemaToFaker({ type: 'number', format: 'double', minimum: 0, maximum: 1 })).toBe(
        'faker.number.float({ min: 0, max: 1, fractionDigits: 4 })',
      )
    })
  })

  describe('property name hint with constraints', () => {
    it.concurrent('respects minimum/maximum over the age hint', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 18, maximum: 65 }, 'age')).toBe(
        'faker.number.int({ min: 18, max: 65 })',
      )
    })

    it.concurrent('respects maximum over the count hint', () => {
      expect(schemaToFaker({ type: 'integer', maximum: 50 }, 'count')).toBe(
        'faker.number.int({ min: 1, max: 50 })',
      )
    })

    it.concurrent('respects minimum/maximum over the price hint', () => {
      expect(schemaToFaker({ type: 'number', minimum: 9.99, maximum: 99.99 }, 'price')).toBe(
        'faker.number.float({ min: 9.99, max: 99.99, fractionDigits: 2 })',
      )
    })
  })

  describe('exclusive bounds', () => {
    it.concurrent('shifts integer number-form exclusive bounds inward', () => {
      expect(schemaToFaker({ type: 'integer', exclusiveMinimum: 0, exclusiveMaximum: 10 })).toBe(
        'faker.number.int({ min: 1, max: 9 })',
      )
    })

    it.concurrent('shifts integer boolean-form exclusiveMinimum inward', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 0, exclusiveMinimum: true })).toBe(
        'faker.number.int({ min: 1, max: 1000 })',
      )
    })

    it.concurrent('shifts integer boolean-form exclusiveMaximum inward', () => {
      expect(schemaToFaker({ type: 'integer', maximum: 10, exclusiveMaximum: true })).toBe(
        'faker.number.int({ min: 1, max: 9 })',
      )
    })

    it.concurrent('treats boolean-form exclusiveMinimum false as inclusive', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 0, exclusiveMinimum: false })).toBe(
        'faker.number.int({ min: 0, max: 1000 })',
      )
    })

    it.concurrent('approximates float exclusiveMinimum with the inclusive bound', () => {
      expect(schemaToFaker({ type: 'number', format: 'float', exclusiveMinimum: 0 })).toBe(
        'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
      )
    })
  })

  describe('multipleOf', () => {
    it.concurrent('appends multipleOf for integer', () => {
      expect(schemaToFaker({ type: 'integer', multipleOf: 5 })).toBe(
        'faker.number.int({ min: 1, max: 1000, multipleOf: 5 })',
      )
    })

    it.concurrent('appends multipleOf alongside minimum/maximum', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 10, maximum: 100, multipleOf: 5 })).toBe(
        'faker.number.int({ min: 10, max: 100, multipleOf: 5 })',
      )
    })

    it.concurrent('drops fractionDigits when float has multipleOf', () => {
      expect(schemaToFaker({ type: 'number', format: 'float', multipleOf: 0.5 })).toBe(
        'faker.number.float({ min: 1, max: 1000, multipleOf: 0.5 })',
      )
    })
  })

  describe('unsatisfiable range (input is source of truth)', () => {
    it.concurrent('passes through inverted minimum/maximum unchanged', () => {
      expect(schemaToFaker({ type: 'integer', minimum: 10, maximum: 5 })).toBe(
        'faker.number.int({ min: 10, max: 5 })',
      )
    })
  })

  describe('FakerOptions', () => {
    it.concurrent('defaults array length to min 1 max 10 when bounds are omitted', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'boolean' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('applies arrayMin and arrayMax to generated array length', () => {
      expect(
        schemaToFaker({ type: 'array', items: { type: 'boolean' } }, undefined, {
          arrayMin: 2,
          arrayMax: 10,
        }),
      ).toBe(
        'Array.from({ length: faker.number.int({ min: 2, max: 10 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('keeps arrayMin 0 instead of coercing the falsy value to 1', () => {
      expect(
        schemaToFaker({ type: 'array', items: { type: 'boolean' } }, undefined, { arrayMin: 0 }),
      ).toBe(
        'Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('uses schema minItems and maxItems for array length', () => {
      expect(
        schemaToFaker({ type: 'array', items: { type: 'boolean' }, minItems: 2, maxItems: 5 }),
      ).toBe(
        'Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('lets schema minItems and maxItems win over arrayMin and arrayMax', () => {
      expect(
        schemaToFaker(
          { type: 'array', items: { type: 'boolean' }, minItems: 2, maxItems: 4 },
          undefined,
          {
            arrayMin: 1,
            arrayMax: 99,
          },
        ),
      ).toBe(
        'Array.from({ length: faker.number.int({ min: 2, max: 4 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('floors the default upper bound to minItems so a lone minItems never inverts', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'boolean' }, minItems: 20 })).toBe(
        'Array.from({ length: faker.number.int({ min: 20, max: 20 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('fills the lower bound from default when only maxItems is set', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'boolean' }, maxItems: 5 })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('passes an inverted minItems/maxItems through unchanged (input is source of truth)', () => {
      expect(
        schemaToFaker({ type: 'array', items: { type: 'boolean' }, minItems: 5, maxItems: 3 }),
      ).toBe(
        'Array.from({ length: faker.number.int({ min: 5, max: 3 }) }, () => (faker.datatype.boolean()))',
      )
    })

    it.concurrent('floors the default string max to minLength so a lone minLength never inverts', () => {
      expect(schemaToFaker({ type: 'string', minLength: 25 })).toBe(
        'faker.string.alpha({ length: { min: 25, max: 25 } })',
      )
    })

    it.concurrent('defaults string length to min 5 max 20 when bounds are omitted', () => {
      expect(schemaToFaker({ type: 'string' })).toBe(
        'faker.string.alpha({ length: { min: 5, max: 20 } })',
      )
    })

    it.concurrent('wraps optional and nullable properties by default', () => {
      expect(
        schemaToFaker({
          type: 'object',
          properties: { a: { type: 'string' }, b: { type: 'string', nullable: true } },
          required: ['b'],
        }),
      ).toBe(
        '{ a: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), undefined]), b: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null]) }',
      )
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
