import type { Schema } from '../openapi/index.js'
import { toIdentifierPascalCase } from '../utils/index.js'

export function makeTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (!schema) return 'unknown'

  if (schema.$ref) {
    return makeRefTypeString(schema.$ref, selfTypeName, cyclicGroup)
  }

  if (schema.oneOf && schema.oneOf.length > 0) {
    return makeUnionTypeString(schema.oneOf, selfTypeName, cyclicGroup, '|')
  }

  if (schema.anyOf && schema.anyOf.length > 0) {
    return makeUnionTypeString(schema.anyOf, selfTypeName, cyclicGroup, '|')
  }

  if (schema.allOf && schema.allOf.length > 0) {
    return makeUnionTypeString(schema.allOf, selfTypeName, cyclicGroup, '&')
  }

  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.map((v) => (typeof v === 'string' ? `'${v}'` : String(v))).join('|')
  }

  if (schema.const !== undefined) {
    return typeof schema.const === 'string' ? `'${schema.const}'` : String(schema.const)
  }

  const types = normalizeType(schema)
  const isNullable = schema.nullable === true || types.includes('null')
  const nonNullTypes = types.filter((t) => t !== 'null')
  const baseType = makeBaseTypeString(schema, nonNullTypes, selfTypeName, cyclicGroup)

  return isNullable ? `(${baseType}|null)` : baseType
}

function makeRefTypeString(
  ref: string,
  selfTypeName: string,
  _cyclicGroup?: ReadonlySet<string>,
): string {
  const propertiesMatch = ref.match(/^#\/components\/schemas\/([^/]+)\/properties\//)
  if (propertiesMatch) {
    const parentName = toIdentifierPascalCase(decodeURIComponent(propertiesMatch[1]))
    // Only use local type name for self-references
    if (parentName === selfTypeName) {
      return `${parentName}Type`
    }
    return `z.infer<typeof ${parentName}Schema>`
  }
  const rawRef = ref.split('/').at(-1) ?? ''
  const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
  // Only use local type name for self-references
  // For other schemas (including those in cyclic group), use z.infer
  if (refName === selfTypeName) {
    return `${refName}Type`
  }
  return `z.infer<typeof ${refName}Schema>`
}

function makeUnionTypeString(
  schemas: readonly Schema[],
  selfTypeName: string,
  cyclicGroup: ReadonlySet<string> | undefined,
  separator: '|' | '&',
): string {
  const types = schemas.filter(Boolean).map((s) => makeTypeString(s, selfTypeName, cyclicGroup))
  return types.length === 0
    ? 'unknown'
    : types.length === 1
      ? types[0]
      : `(${types.join(separator)})`
}

function normalizeType(schema: Schema): readonly string[] {
  if (!schema.type) return ['object']
  return Array.isArray(schema.type) ? schema.type : [schema.type]
}

function makeBaseTypeString(
  schema: Schema,
  types: readonly string[],
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (types.length > 1) {
    return types.map((t) => makeSingleTypeString(schema, t, selfTypeName, cyclicGroup)).join('|')
  }
  return makeSingleTypeString(schema, types[0] ?? 'object', selfTypeName, cyclicGroup)
}

function makeSingleTypeString(
  schema: Schema,
  type: string,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (type === 'string') return 'string'
  if (type === 'number') return 'number'
  if (type === 'integer') return 'number'
  if (type === 'boolean') return 'boolean'
  if (type === 'null') return 'null'
  if (type === 'array') return makeArrayTypeString(schema, selfTypeName, cyclicGroup)
  if (type === 'object') return makeObjectTypeString(schema, selfTypeName, cyclicGroup)

  return 'unknown'
}

const isSchemaArray = (items: Schema | readonly Schema[]): items is readonly Schema[] =>
  Array.isArray(items)

function makeArrayTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (!schema.items) return 'unknown[]'

  const items = schema.items

  // Handle array of Schemas (tuple style)
  if (isSchemaArray(items)) {
    const firstItem = items[0]

    if (items.length > 1) {
      return `[${items
        .filter(Boolean)
        .map((item) => makeTypeString(item, selfTypeName, cyclicGroup))
        .join(',')}]`
    }

    if (firstItem !== undefined) {
      return `${makeTypeString(firstItem, selfTypeName, cyclicGroup)}[]`
    }

    return 'unknown[]'
  }

  // Handle single Schema (OpenAPI 3.0+ style)
  if (items.$ref) {
    const propertiesMatch = items.$ref.match(/^#\/components\/schemas\/([^/]+)\/properties\//)
    if (propertiesMatch) {
      const parentName = toIdentifierPascalCase(decodeURIComponent(propertiesMatch[1]))
      // Only use local type name for self-references
      if (parentName === selfTypeName) {
        return `${parentName}Type[]`
      }
      return `z.infer<typeof ${parentName}Schema>[]`
    }
    const rawRef = items.$ref.split('/').at(-1) ?? ''
    const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
    // Only use local type name for self-references
    if (refName === selfTypeName) {
      return `${refName}Type[]`
    }
    return `z.infer<typeof ${refName}Schema>[]`
  }
  return `${makeTypeString(items, selfTypeName, cyclicGroup)}[]`
}

function makeObjectTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  const { properties, additionalProperties, required } = schema

  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === true) return '{[key:string]:unknown}'
    if (typeof additionalProperties === 'object') {
      const valueType = makeTypeString(additionalProperties, selfTypeName, cyclicGroup)
      return `{[key:string]:${valueType}}`
    }
    return '{[key:string]:unknown}'
  }

  const requiredSet = new Set(Array.isArray(required) ? required : [])

  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = makeTypeString(propSchema, selfTypeName, cyclicGroup)
    const isRequired = requiredSet.has(key)
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return `${safeKey}${isRequired ? '' : '?'}:${propType}`
  })

  return `{${propertyStrings.join(';')}}`
}

export function makeRecordTypeString(
  valueSchema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  const valueType = makeTypeString(valueSchema, selfTypeName, cyclicGroup)
  return `{[key:string]:${valueType}}`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/type.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

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
      const cyclicGroup = new Set([
        'Event',
        'UserEventPayload',
        'OrderEventPayload',
        'TraceContext',
      ])

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
        expect(result).toContain('z.infer<typeof TraceContextSchema>')
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
        expect(result).toContain('z.infer<typeof UserEventPayloadSchema>')
        expect(result).toContain('z.infer<typeof TraceContextSchema>')
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
        expect(result).toContain('&')
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
        expect(makeTypeString({ type: 'array', items: { type: 'string' } }, 'Test')).toBe(
          'string[]',
        )
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
        expect(result).toContain("'special-key'")
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
    })
  })

  describe('makeRecordTypeString', () => {
    it('should generate record type for string values', () => {
      expect(makeRecordTypeString({ type: 'string' }, 'Test')).toBe('{[key:string]:string}')
    })

    it('should generate record type for complex values', () => {
      expect(
        makeRecordTypeString({ type: 'object', properties: { id: { type: 'integer' } } }, 'Test'),
      ).toBe('{[key:string]:{id?:number}}')
    })

    it('should handle ref values', () => {
      expect(makeRecordTypeString({ $ref: '#/components/schemas/User' }, 'Test')).toBe(
        '{[key:string]:z.infer<typeof UserSchema>}',
      )
    })
  })
}
