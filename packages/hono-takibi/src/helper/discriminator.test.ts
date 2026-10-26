import { describe, expect, it } from 'vite-plus/test'

import { discriminatedBranches } from './discriminator.js'

describe('discriminatedBranches', () => {
  const schemas = {
    Circle: {
      type: 'object',
      required: ['kind'],
      properties: { kind: { type: 'string', const: 'circle' } },
    },
    Square: {
      type: 'object',
      required: ['kind'],
      properties: { kind: { type: 'string', enum: ['square'] } },
    },
    Loose: { type: 'object', properties: { kind: { type: 'string' } } },
  } as const

  it.concurrent('should resolve the branches of a oneOf that z.discriminatedUnion stands for', () => {
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }, { $ref: '#/components/schemas/Square' }],
          discriminator: { propertyName: 'kind' },
        },
        schemas,
      ),
    ).toStrictEqual([
      { branch: schemas.Circle, name: 'Circle' },
      { branch: schemas.Square, name: 'Square' },
    ])
  })

  it.concurrent('should name no inline branch', () => {
    const inline = {
      type: 'object',
      required: ['kind'],
      properties: { kind: { type: 'string', const: 'inline' } },
    } as const
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }, inline],
          discriminator: { propertyName: 'kind' },
        },
        schemas,
      ),
    ).toStrictEqual([
      { branch: schemas.Circle, name: 'Circle' },
      { branch: inline, name: undefined },
    ])
  })

  it.concurrent('should answer undefined without a discriminator', () => {
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }, { $ref: '#/components/schemas/Square' }],
        },
        schemas,
      ),
    ).toBeUndefined()
  })

  it.concurrent('should answer undefined when a branch does not pin the discriminator', () => {
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }, { $ref: '#/components/schemas/Loose' }],
          discriminator: { propertyName: 'kind' },
        },
        schemas,
      ),
    ).toBeUndefined()
  })

  it.concurrent('should answer undefined when two branches share a literal', () => {
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }, { $ref: '#/components/schemas/Circle' }],
          discriminator: { propertyName: 'kind' },
        },
        schemas,
      ),
    ).toBeUndefined()
  })

  it.concurrent('should answer undefined for a single branch or an unknown reference', () => {
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }],
          discriminator: { propertyName: 'kind' },
        },
        schemas,
      ),
    ).toBeUndefined()
    expect(
      discriminatedBranches(
        {
          oneOf: [{ $ref: '#/components/schemas/Circle' }, { $ref: '#/components/schemas/Nope' }],
          discriminator: { propertyName: 'kind' },
        },
        schemas,
      ),
    ).toBeUndefined()
  })
})
