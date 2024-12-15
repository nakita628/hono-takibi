import { beforeEach, describe, expect, it } from 'vitest'
import { traverseSchema } from './traverse_schema'
import { Schema } from '../../../types'

describe('traverseSchema', () => {
  let refs: Set<string>

  beforeEach(() => {
    refs = new Set()
  })

  it('should handle empty schema', () => {
    const schema: Schema = {}
    traverseSchema(schema, refs)
    expect(refs.size).toBe(0)
  })

  it('should add reference to refs when schema contains $ref', () => {
    const schema: Schema = {
      $ref: '#/components/schemas/User',
    }

    traverseSchema(schema, refs)

    expect(refs.has('User')).toBe(true)
    expect(refs.size).toBe(1)
  })

  it('should collect all $refs from nested properties', () => {
    const schema: Schema = {
      properties: {
        user: { $ref: '#/components/schemas/User' },
        address: {
          properties: {
            country: { $ref: '#/components/schemas/Country' },
          },
        },
      },
    }

    traverseSchema(schema, refs)

    expect(refs.has('User')).toBe(true)
    expect(refs.has('Country')).toBe(true)
    expect(refs.size).toBe(2)
  })

  it('should collect $ref from array items', () => {
    const schema: Schema = {
      items: {
        $ref: '#/components/schemas/ListItem',
      },
    }

    traverseSchema(schema, refs)

    expect(refs.has('ListItem')).toBe(true)
    expect(refs.size).toBe(1)
  })
})
