import { describe, expect, it } from 'vite-plus/test'

import { discriminatedBranches, inheritedBase } from './discriminator.js'

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

// #402: a parent that lists its subtypes, each of which extends it back
describe('inheritedBase', () => {
  const schemas = {
    Connection: {
      type: 'object',
      properties: { name: { type: 'string' }, type: { type: 'string', enum: ['Sample', 'Kafka'] } },
      required: ['type'],
      discriminator: { propertyName: 'type' },
      oneOf: [
        { $ref: '#/components/schemas/SampleConnection' },
        { $ref: '#/components/schemas/KafkaConnection' },
      ],
    },
    SampleConnection: { type: 'object', allOf: [{ $ref: '#/components/schemas/Connection' }] },
    KafkaConnection: {
      type: 'object',
      allOf: [
        { $ref: '#/components/schemas/Connection' },
        { type: 'object', properties: { bootstrapServers: { type: 'string' } } },
      ],
    },
    Shape: { type: 'object', properties: { kind: { type: 'string' } } },
    Union: { anyOf: [{ type: 'string' }, { $ref: '#/components/schemas/Shape' }] },
  } as const

  it.concurrent('should stand for the properties of a parent its subtypes extend back', () => {
    expect(inheritedBase({ $ref: '#/components/schemas/Connection' }, schemas)).toStrictEqual({
      type: 'object',
      properties: schemas.Connection.properties,
      required: ['type'],
    })
  })

  it.concurrent('should answer undefined for any other member', () => {
    // a parent none of whose branches extends it back
    expect(inheritedBase({ $ref: '#/components/schemas/Union' }, schemas)).toBeUndefined()
    // a component without branches
    expect(inheritedBase({ $ref: '#/components/schemas/Shape' }, schemas)).toBeUndefined()
    // a reference with keywords beside it, an inline member, an unknown component
    expect(
      inheritedBase({ $ref: '#/components/schemas/Connection', description: 'x' }, schemas),
    ).toBeUndefined()
    expect(inheritedBase({ type: 'object' }, schemas)).toBeUndefined()
    expect(inheritedBase({ $ref: '#/components/schemas/Nope' }, schemas)).toBeUndefined()
    expect(inheritedBase({ $ref: '#/components/schemas/Connection' })).toBeUndefined()
  })
})
