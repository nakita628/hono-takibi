import { describe, expect, it } from 'vitest'
import { analyzeCircularSchemas } from './ast.js'
import {
  findSchemaRefs,
  makeSchemaCode,
  makeSchemaInfo,
  makeSplitSchemaFile,
  makeTypeDefinition,
} from './schema.js'

describe('findSchemaRefs', () => {
  it.concurrent('should find schema references in code', () => {
    const code = 'z.object({ user: UserSchema, post: PostSchema })'
    const refs = findSchemaRefs(code, 'Test')
    expect(refs).toStrictEqual(['User', 'Post'])
  })

  it.concurrent('should exclude self-reference', () => {
    const code = 'z.object({ parent: ParentSchema, child: ChildSchema })'
    const refs = findSchemaRefs(code, 'Parent')
    expect(refs).toStrictEqual(['Child'])
  })

  it.concurrent('should handle empty code', () => {
    const refs = findSchemaRefs('', 'Test')
    expect(refs).toStrictEqual([])
  })

  it.concurrent('should handle code with no schema refs', () => {
    const code = 'z.object({ name: z.string() })'
    const refs = findSchemaRefs(code, 'Test')
    expect(refs).toStrictEqual([])
  })
})

describe('makeSchemaInfo', () => {
  const schemas = {
    User: { type: 'object', properties: { name: { type: 'string' } } },
    Node: {
      type: 'object',
      properties: { children: { type: 'array', items: { $ref: '#/components/schemas/Node' } } },
    },
  } as const

  it.concurrent('should create basic schema info', () => {
    const analysis = analyzeCircularSchemas(schemas, ['User', 'Node'])
    const info = makeSchemaInfo('User', schemas.User, analysis)

    expect(info.schemaName).toBe('User')
    expect(info.safeSchemaName).toBe('User')
    expect(info.variableName).toBe('UserSchema')
    expect(info.needsLazy).toBe(false)
    expect(info.needsTypeDef).toBe(false)
  })

  it.concurrent('should detect self-referencing schema', () => {
    const analysis = analyzeCircularSchemas(schemas, ['User', 'Node'])
    const info = makeSchemaInfo('Node', schemas.Node, analysis)

    expect(info.schemaName).toBe('Node')
    expect(info.safeSchemaName).toBe('Node')
    expect(info.variableName).toBe('NodeSchema')
    expect(info.needsLazy).toBe(true)
    expect(info.needsTypeDef).toBe(true)
  })
})

describe('makeSchemaCode', () => {
  const schemas = {
    User: { type: 'object', properties: { name: { type: 'string' } } },
  } as const

  it.concurrent('should generate schema code with export', () => {
    const analysis = analyzeCircularSchemas(schemas, ['User'])
    const info = makeSchemaInfo('User', schemas.User, analysis)
    const code = makeSchemaCode(info, { exportKeyword: 'export ', exportType: false })

    expect(code).toBe(
      "export const UserSchema=z.object({name:z.string().exactOptional()}).openapi('User')",
    )
  })

  it.concurrent('should generate schema code with type export', () => {
    const analysis = analyzeCircularSchemas(schemas, ['User'])
    const info = makeSchemaInfo('User', schemas.User, analysis)
    const code = makeSchemaCode(info, { exportKeyword: 'export ', exportType: true })

    expect(code).toBe(
      "export const UserSchema=z.object({name:z.string().exactOptional()}).openapi('User')\n\nexport type User=z.infer<typeof UserSchema>",
    )
  })

  it.concurrent('should generate schema code without export keyword', () => {
    const analysis = analyzeCircularSchemas(schemas, ['User'])
    const info = makeSchemaInfo('User', schemas.User, analysis)
    const code = makeSchemaCode(info, { exportKeyword: '', exportType: false })

    expect(code).toBe(
      "const UserSchema=z.object({name:z.string().exactOptional()}).openapi('User')",
    )
  })
})

describe('makeSplitSchemaFile', () => {
  describe('cyclic group type references', () => {
    const schemas = {
      Event: {
        type: 'object',
        properties: {
          type: { $ref: '#/components/schemas/EventType' },
          payload: {
            oneOf: [
              { $ref: '#/components/schemas/UserEventPayload' },
              { $ref: '#/components/schemas/OrderEventPayload' },
            ],
          },
          causedBy: { type: 'array', items: { $ref: '#/components/schemas/Event' } },
          trace: { $ref: '#/components/schemas/TraceContext' },
        },
        required: ['type', 'payload'],
      },
      EventType: { type: 'string', enum: ['user.created', 'order.created'] },
      UserEventPayload: {
        type: 'object',
        properties: { user: { $ref: '#/components/schemas/User' } },
      },
      OrderEventPayload: { type: 'object', properties: { order: { type: 'string' } } },
      TraceContext: {
        type: 'object',
        properties: {
          traceId: { type: 'string' },
          parent: { $ref: '#/components/schemas/TraceContext' },
        },
      },
      User: { type: 'object', properties: { name: { type: 'string' } } },
    } as const

    it.concurrent('should use z.infer for cyclic group refs in type definition', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Event', schemas.Event, schemas, analysis, true)

      const typeDefMatch = result.match(/type EventType=\{[^}]+\}/)
      expect(typeDefMatch).not.toBeNull()

      const typeDef = typeDefMatch?.[0] ?? ''
      expect(typeDef.includes('z.infer<typeof EventTypeSchema>')).toBe(true)
      expect(typeDef.includes('z.infer<typeof TraceContextSchema>')).toBe(true)
      expect(typeDef.includes('EventTypeType')).toBe(false)
      expect(typeDef.includes('TraceContextType')).toBe(false)
    })

    it.concurrent('should use local type for self-reference', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Event', schemas.Event, schemas, analysis, true)

      expect(result.includes('causedBy?:EventType[]')).toBe(true)
    })

    it.concurrent('should generate correct imports without type imports', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Event', schemas.Event, schemas, analysis, true)

      const importLines = result.split('\n').filter((line) => line.startsWith('import'))

      expect(importLines.some((line) => line === "import{z}from'@hono/zod-openapi'")).toBe(true)
      expect(importLines.some((line) => line === "import{EventTypeSchema}from'./eventType'")).toBe(
        true,
      )
      expect(
        importLines.some((line) => line === "import{TraceContextSchema}from'./traceContext'"),
      ).toBe(true)
      expect(importLines.some((line) => line.includes('type EventType}'))).toBe(false)
      expect(importLines.some((line) => line.includes('type TraceContext}'))).toBe(false)
    })

    it.concurrent('should export z.infer type at the end', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Event', schemas.Event, schemas, analysis, true)

      const lastLine = result.trim().split('\n').pop()
      expect(lastLine).toBe('export type Event=z.infer<typeof EventSchema>')
    })
  })

  describe('non-cyclic schemas', () => {
    const schemas = {
      User: { type: 'object', properties: { name: { type: 'string' } } },
      Profile: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } },
    } as const

    it.concurrent('should import schema for refs in non-cyclic schemas', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Profile', schemas.Profile, schemas, analysis, true)

      const lines = result.split('\n')
      expect(lines.some((line) => line === "import{UserSchema}from'./user'")).toBe(true)
      expect(lines.some((line) => line.startsWith('export const ProfileSchema'))).toBe(true)
    })

    it.concurrent('should not generate type definition for non-cyclic schemas', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Profile', schemas.Profile, schemas, analysis, true)

      expect(result.includes('type ProfileType')).toBe(false)
    })

    it.concurrent('should generate exact output for simple non-cyclic schema', () => {
      const schemaNames = Object.keys(schemas)
      const analysis = analyzeCircularSchemas(schemas, schemaNames)
      const result = makeSplitSchemaFile('Profile', schemas.Profile, schemas, analysis, true)

      expect(result).toBe(
        "import{z}from'@hono/zod-openapi'\nimport{UserSchema}from'./user'\n\n\nexport const ProfileSchema=z.object({user:UserSchema.exactOptional()}).openapi('Profile')\n\nexport type Profile=z.infer<typeof ProfileSchema>",
      )
    })
  })
})

describe('makeTypeDefinition', () => {
  const schemas = {
    Event: {
      type: 'object',
      properties: {
        type: { $ref: '#/components/schemas/EventType' },
        causedBy: { type: 'array', items: { $ref: '#/components/schemas/Event' } },
      },
    },
    EventType: { type: 'string', enum: ['created', 'updated'] },
  } as const

  it.concurrent('should generate type definition with z.infer for non-self refs', () => {
    const schemaNames = Object.keys(schemas)
    const analysis = analyzeCircularSchemas(schemas, schemaNames)
    const info = makeSchemaInfo('Event', schemas.Event, analysis)
    const typeDef = makeTypeDefinition(info, analysis.cyclicGroupPascal)

    expect(typeDef).toBe(
      'type EventType={type?:z.infer<typeof EventTypeSchema>;causedBy?:EventType[]}',
    )
  })

  it.concurrent('should generate type definition for self-referencing schema', () => {
    const selfRefSchemas = {
      Node: {
        type: 'object',
        properties: {
          value: { type: 'string' },
          children: { type: 'array', items: { $ref: '#/components/schemas/Node' } },
        },
      },
    } as const

    const schemaNames = Object.keys(selfRefSchemas)
    const analysis = analyzeCircularSchemas(selfRefSchemas, schemaNames)
    const info = makeSchemaInfo('Node', selfRefSchemas.Node, analysis)
    const typeDef = makeTypeDefinition(info, analysis.cyclicGroupPascal)

    expect(typeDef).toBe('type NodeType={value?:string;children?:NodeType[]}')
  })
})
