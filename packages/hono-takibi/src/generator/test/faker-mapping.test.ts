import { describe, expect, it } from 'vitest'
import {
  FORMAT_TO_FAKER,
  PROPERTY_NAME_TO_FAKER,
  TYPE_TO_FAKER,
  schemaToFaker,
} from './faker-mapping.js'

/* ═══════════════════════════════════ FORMAT_TO_FAKER ═══════════════════════════════════ */

describe('FORMAT_TO_FAKER', () => {
  it.concurrent('maps date format', () => {
    expect(FORMAT_TO_FAKER.date).toBe('faker.date.past().toISOString().slice(0, 10)')
  })

  it.concurrent('maps date-time format', () => {
    expect(FORMAT_TO_FAKER['date-time']).toBe('faker.date.past().toISOString()')
  })

  it.concurrent('maps email format', () => {
    expect(FORMAT_TO_FAKER.email).toBe('faker.internet.email()')
  })

  it.concurrent('maps uuid format', () => {
    expect(FORMAT_TO_FAKER.uuid).toBe('faker.string.uuid()')
  })

  it.concurrent('maps uri format', () => {
    expect(FORMAT_TO_FAKER.uri).toBe('faker.internet.url()')
  })

  it.concurrent('maps ipv4 format', () => {
    expect(FORMAT_TO_FAKER.ipv4).toBe('faker.internet.ipv4()')
  })

  it.concurrent('maps ipv6 format', () => {
    expect(FORMAT_TO_FAKER.ipv6).toBe('faker.internet.ipv6()')
  })

  it.concurrent('maps int32 format', () => {
    expect(FORMAT_TO_FAKER.int32).toBe(
      'faker.number.int({ min: -2147483648, max: 2147483647 })',
    )
  })

  it.concurrent('maps int64 format', () => {
    expect(FORMAT_TO_FAKER.int64).toBe(
      'faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER })',
    )
  })

  it.concurrent('maps binary format', () => {
    expect(FORMAT_TO_FAKER.binary).toBe(
      'new Blob([faker.string.alphanumeric(100)])',
    )
  })

  it.concurrent('maps byte format', () => {
    expect(FORMAT_TO_FAKER.byte).toBe('btoa(faker.string.alphanumeric(10))')
  })
})

/* ═══════════════════════════════════ TYPE_TO_FAKER ═══════════════════════════════════ */

describe('TYPE_TO_FAKER', () => {
  it.concurrent('maps string type', () => {
    expect(TYPE_TO_FAKER.string).toBe(
      'faker.string.alpha({ length: { min: 5, max: 20 } })',
    )
  })

  it.concurrent('maps number type', () => {
    expect(TYPE_TO_FAKER.number).toBe(
      'faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })',
    )
  })

  it.concurrent('maps integer type', () => {
    expect(TYPE_TO_FAKER.integer).toBe('faker.number.int({ min: 1, max: 1000 })')
  })

  it.concurrent('maps boolean type', () => {
    expect(TYPE_TO_FAKER.boolean).toBe('faker.datatype.boolean()')
  })

  it.concurrent('maps null type', () => {
    expect(TYPE_TO_FAKER.null).toBe('null')
  })
})

/* ═══════════════════════════════════ PROPERTY_NAME_TO_FAKER ═══════════════════════════════════ */

describe('PROPERTY_NAME_TO_FAKER', () => {
  it.concurrent('maps id property', () => {
    expect(PROPERTY_NAME_TO_FAKER.id).toBe('faker.number.int({ min: 1, max: 99999 })')
  })

  it.concurrent('maps email property', () => {
    expect(PROPERTY_NAME_TO_FAKER.email).toBe('faker.internet.email()')
  })

  it.concurrent('maps name property', () => {
    expect(PROPERTY_NAME_TO_FAKER.name).toBe('faker.person.fullName()')
  })

  it.concurrent('maps createdAt property', () => {
    expect(PROPERTY_NAME_TO_FAKER.createdAt).toBe('faker.date.past().toISOString()')
  })

  it.concurrent('maps status property', () => {
    expect(PROPERTY_NAME_TO_FAKER.status).toBe(
      "faker.helpers.arrayElement(['active', 'inactive', 'pending'])",
    )
  })

  it.concurrent('maps description property', () => {
    expect(PROPERTY_NAME_TO_FAKER.description).toBe('faker.lorem.paragraph()')
  })
})

/* ═══════════════════════════════════ schemaToFaker ═══════════════════════════════════ */

describe('schemaToFaker', () => {
  describe('example values', () => {
    it.concurrent('uses example when useExamples is true', () => {
      expect(schemaToFaker({ type: 'string', example: 'hello' }, undefined, { useExamples: true })).toBe(
        '"hello"',
      )
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
  })

  describe('array', () => {
    it.concurrent('generates array of strings', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'string' } })).toBe(
        "Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (faker.string.alpha({ length: { min: 5, max: 20 } })))",
      )
    })

    it.concurrent('generates array of integers', () => {
      expect(schemaToFaker({ type: 'array', items: { type: 'integer' } })).toBe(
        'Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (faker.number.int({ min: 1, max: 1000 })))',
      )
    })

    it.concurrent('generates array of $ref', () => {
      expect(
        schemaToFaker({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
      ).toBe(
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
      expect(result).toBe(
        `{\n    name: faker.person.fullName()\n  }`,
      )
    })

    it.concurrent('generates object with optional property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { age: { type: 'integer' } },
      })
      expect(result).toBe(
        `{\n    age: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 120 }), undefined])\n  }`,
      )
    })

    it.concurrent('generates object with nullable property', () => {
      const result = schemaToFaker({
        type: 'object',
        properties: { bio: { type: 'string', nullable: true } },
      })
      expect(result).toBe(
        `{\n    bio: faker.helpers.arrayElement([faker.string.alpha({ length: { min: 5, max: 20 } }), null])\n  }`,
      )
    })
  })

  describe('allOf', () => {
    it.concurrent('merges schemas with spread', () => {
      expect(
        schemaToFaker({
          allOf: [
            { $ref: '#/components/schemas/Base' },
            { $ref: '#/components/schemas/Extra' },
          ],
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
      expect(schemaToFaker({ type: 'string', format: 'email' })).toBe(
        'faker.internet.email()',
      )
    })

    it.concurrent('uses format for uuid', () => {
      expect(schemaToFaker({ type: 'string', format: 'uuid' })).toBe(
        'faker.string.uuid()',
      )
    })
  })

  describe('property name heuristics', () => {
    it.concurrent('uses property name hint for email', () => {
      expect(schemaToFaker({ type: 'string' }, 'email')).toBe(
        'faker.internet.email()',
      )
    })

    it.concurrent('uses property name hint for createdAt', () => {
      expect(schemaToFaker({ type: 'string' }, 'createdAt')).toBe(
        'faker.date.past().toISOString()',
      )
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

  describe('fallback', () => {
    it.concurrent('returns undefined for empty schema', () => {
      expect(schemaToFaker({})).toBe('undefined')
    })

    it.concurrent('returns boolean for boolean type', () => {
      expect(schemaToFaker({ type: 'boolean' })).toBe('faker.datatype.boolean()')
    })
  })
})
