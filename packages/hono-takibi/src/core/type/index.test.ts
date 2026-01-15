import fs from 'node:fs'
import os from 'node:os'
import nodePath from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI, Operation, Schema } from '../../openapi/index.js'
import { type } from './index.js'

// Re-implement internal functions for testing (same as in source)
function makeHonoPath(openApiPath: string): string {
  return openApiPath.replace(/\{([^}]+)\}/g, ':$1')
}

function isSchemaArray(items: Schema | readonly Schema[]): items is readonly Schema[] {
  return Array.isArray(items)
}

function makeSchemaTypeString(
  schema: Schema,
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  if (!schema) return 'unknown'
  if (schema.$ref) {
    return visited.has(schema.$ref)
      ? 'unknown'
      : makeRefTypeString(schema.$ref, components, new Set([...visited, schema.$ref]))
  }
  if (schema.oneOf && schema.oneOf.length > 0) {
    return schema.oneOf.map((s) => makeSchemaTypeString(s, components, visited)).join('|')
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    return schema.anyOf.map((s) => makeSchemaTypeString(s, components, visited)).join('|')
  }
  if (schema.allOf && schema.allOf.length > 0) {
    return makeAllOfTypeString(schema.allOf, components, visited)
  }
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.map((v) => (typeof v === 'string' ? `'${v}'` : String(v))).join('|')
  }
  if (schema.const !== undefined) {
    return typeof schema.const === 'string' ? `'${schema.const}'` : String(schema.const)
  }
  const types = makeNormalizedTypes(schema)
  const isNullable = schema.nullable === true || types.includes('null')
  const nonNullTypes = types.filter((t) => t !== 'null')
  const baseType = makeBaseTypeString(schema, nonNullTypes, components, visited)
  return isNullable ? `(${baseType}|null)` : baseType
}

function makeNormalizedTypes(schema: Schema): readonly string[] {
  return schema.type ? (Array.isArray(schema.type) ? schema.type : [schema.type]) : ['object']
}

function makeBaseTypeString(
  schema: Schema,
  types: readonly string[],
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  return types.length > 1
    ? types.map((t) => makeSingleTypeString(schema, t, components, visited)).join('|')
    : makeSingleTypeString(schema, types[0] ?? 'object', components, visited)
}

const PRIMITIVE_TYPE_MAP: Readonly<Record<string, string>> = {
  boolean: 'boolean',
  null: 'null',
}

function makeSingleTypeString(
  schema: Schema,
  type: string,
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  if (type === 'string') return schema.format === 'binary' ? 'File' : 'string'
  if (type === 'number' || type === 'integer') {
    return schema.format === 'int64' || schema.format === 'bigint' ? 'bigint' : 'number'
  }
  if (type === 'array') return makeArrayTypeString(schema, components, visited)
  if (type === 'object') return makeObjectTypeString(schema, components, visited)
  return PRIMITIVE_TYPE_MAP[type] ?? 'unknown'
}

function makeRefTypeString(
  ref: string,
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  if (!components) return 'unknown'
  const parts = ref.split('/')
  const componentType = parts[2]
  const refName = parts.at(-1)
  if (!refName) return 'unknown'
  if (componentType === 'schemas' && components.schemas) {
    const schema = components.schemas[refName]
    return schema ? makeSchemaTypeString(schema, components, visited) : 'unknown'
  }
  return 'unknown'
}

function makeResolvedSchema(schema: Schema, components: OpenAPI['components']): Schema {
  if (schema.$ref && components) {
    const refName = schema.$ref.split('/').at(-1)
    return refName && components.schemas?.[refName] ? components.schemas[refName] : schema
  }
  return schema
}

function makeSafeKey(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
}

function makeAllOfTypeString(
  allOf: readonly Schema[],
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  const mergedProps = allOf.reduce((acc, subSchema) => {
    const newProps = makePropertyMap(subSchema, components, visited)
    const result = new Map(acc)
    for (const [key, value] of newProps) {
      const existing = result.get(key)
      result.set(key, {
        type: value.type,
        required: value.required || (existing?.required ?? false),
      })
    }
    return result
  }, new Map<string, { type: string; required: boolean }>())
  if (mergedProps.size === 0) return '{}'
  const propertyStrings = Array.from(mergedProps.entries()).map(([key, { type, required }]) => {
    const safeKey = makeSafeKey(key)
    return required ? `${safeKey}:${type}` : `${safeKey}?:${type}|undefined`
  })
  return `{${propertyStrings.join(';')}}`
}

function makePropertyMap(
  schema: Schema,
  components: OpenAPI['components'],
  visited: Set<string>,
): ReadonlyMap<string, { readonly type: string; readonly required: boolean }> {
  const resolved = makeResolvedSchema(schema, components)
  const fromAllOf = new Map<string, { type: string; required: boolean }>(
    resolved.allOf && resolved.allOf.length > 0
      ? resolved.allOf.flatMap((subSchema) => [
          ...makePropertyMap(subSchema, components, visited).entries(),
        ])
      : [],
  )

  if (!resolved.properties) return fromAllOf

  const requiredSet = new Set(Array.isArray(resolved.required) ? resolved.required : [])
  const currentProps = new Map(
    Object.entries(resolved.properties).map(([key, propSchema]) => {
      const propType = makeSchemaTypeString(propSchema, components, visited)
      const existing = fromAllOf.get(key)
      const isRequired = requiredSet.has(key) || (existing?.required ?? false)
      return [key, { type: propType, required: isRequired }] as const
    }),
  )
  return new Map([...fromAllOf, ...currentProps])
}

function makeArrayTypeString(
  schema: Schema,
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  if (!schema.items) return 'unknown[]'
  const items = schema.items
  if (isSchemaArray(items)) {
    return items.length > 1
      ? `[${items.map((item) => makeSchemaTypeString(item, components, visited)).join(',')}]`
      : items[0]
        ? makeWrappedArrayType(makeSchemaTypeString(items[0], components, visited))
        : 'unknown[]'
  }
  return makeWrappedArrayType(makeSchemaTypeString(items, components, visited))
}

function makeWrappedArrayType(typeStr: string): string {
  return typeStr.includes('|') ? `(${typeStr})[]` : `${typeStr}[]`
}

function makeObjectTypeString(
  schema: Schema,
  components: OpenAPI['components'],
  visited: Set<string>,
): string {
  const { properties, additionalProperties, required } = schema
  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === false) return '{}'
    if (typeof additionalProperties === 'object') {
      return `{[x:string]:${makeSchemaTypeString(additionalProperties, components, visited)}}`
    }
    return '{[x:string]:unknown}'
  }
  const requiredSet = new Set(Array.isArray(required) ? required : [])
  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = makeSchemaTypeString(propSchema, components, visited)
    const safeKey = makeSafeKey(key)
    return requiredSet.has(key) ? `${safeKey}:${propType}` : `${safeKey}?:${propType}|undefined`
  })
  return `{${propertyStrings.join(';')}}`
}

function makeParameterSchema(p: {
  schema?: Schema
  content?: Record<string, { schema?: Schema }>
}): Schema {
  if (p.content) {
    const firstKey = Object.keys(p.content)[0]
    if (firstKey && p.content[firstKey]?.schema) {
      return p.content[firstKey].schema
    }
  }
  return p.schema ?? {}
}

function makeParamPart(
  params: readonly { name: string; in: string; required?: boolean; schema?: Schema }[],
  components: OpenAPI['components'],
): string | undefined {
  const props = params.map((p) => {
    const safeKey = makeSafeKey(p.name)
    return `${safeKey}:${makeSchemaTypeString(makeParameterSchema(p), components, new Set())}`
  })
  return props.length > 0 ? `{param:{${props.join(';')}}}` : undefined
}

function makeQueryPart(
  params: readonly { name: string; in: string; required?: boolean; schema?: Schema }[],
  components: OpenAPI['components'],
): string | undefined {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), components, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{query:{${props.join(';')}}}` : undefined
}

function makeHeaderPart(
  params: readonly {
    name: string
    in: string
    required?: boolean
    schema?: Schema
    content?: Record<string, { schema?: Schema }>
  }[],
  components: OpenAPI['components'],
): string | undefined {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), components, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{header:{${props.join(';')}}}` : undefined
}

function makeCookiePart(
  params: readonly { name: string; in: string; required?: boolean; schema?: Schema }[],
  components: OpenAPI['components'],
): string | undefined {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), components, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{cookie:{${props.join(';')}}}` : undefined
}

function makeInputType(
  operation: Operation,
  openApiPath: string,
  components: OpenAPI['components'],
  pathLevelParams: readonly { name: string; in: string; required?: boolean; schema?: Schema }[],
): string {
  const pathParams = Array.from(openApiPath.matchAll(/\{([^}]+)\}/g)).map((m) => m[1])
  const resolvedParams = [...(operation.parameters ?? []), ...pathLevelParams] as {
    name: string
    in: string
    required?: boolean
    schema?: Schema
    content?: Record<string, { schema?: Schema }>
  }[]

  const paramPart =
    pathParams.length > 0
      ? makeParamPart(
          resolvedParams.filter((p) => p.in === 'path'),
          components,
        )
      : undefined
  const queryPart = makeQueryPart(
    resolvedParams.filter((p) => p.in === 'query'),
    components,
  )
  const headerPart = makeHeaderPart(
    resolvedParams.filter((p) => p.in === 'header'),
    components,
  )
  const cookiePart = makeCookiePart(
    resolvedParams.filter((p) => p.in === 'cookie'),
    components,
  )

  const parts = [paramPart, queryPart, headerPart, cookiePart].filter(
    (p): p is string => p !== undefined,
  )
  return parts.length === 0 ? '{}' : parts.join('&')
}

describe('type', () => {
  it('should return ok and generate declaration file', { timeout: 10000 }, async () => {
    const openapi: OpenAPI = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      components: {
        schemas: {
          Test: {
            type: 'object',
            required: ['test'],
            properties: { test: { type: 'string' } },
          },
        },
      },
      paths: {
        '/test': {
          post: {
            summary: 'Test endpoint',
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Test' } } },
            },
            responses: { '200': { description: 'Successful test' } },
          },
        },
      },
    }
    const dir = fs.mkdtempSync(nodePath.join(os.tmpdir(), 'takibi-type-'))
    try {
      const out = nodePath.join(dir, 'index.d.ts') as `${string}.ts`
      const result = await type(openapi, out)
      expect(result.ok).toBe(true)
      expect(fs.existsSync(out)).toBe(true)
      const code = fs.readFileSync(out, 'utf-8')
      expect(code).toContain('declare const routes:')
      expect(code).toContain('export default routes')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('makeHonoPath', () => {
  it.concurrent.each([
    ['/users', '/users'],
    ['/users/{id}', '/users/:id'],
    ['/users/{userId}/posts/{postId}', '/users/:userId/posts/:postId'],
  ])('makeHonoPath(%s) -> %s', (input, expected) => {
    expect(makeHonoPath(input)).toBe(expected)
  })
})

describe('makeSchemaTypeString', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'string' }, 'string'],
    [{ type: 'number' }, 'number'],
    [{ type: 'integer' }, 'number'],
    [{ type: 'boolean' }, 'boolean'],
    [{ type: 'integer', format: 'int64' }, 'bigint'],
    [{ enum: ['a', 'b', 'c'] }, "'a'|'b'|'c'"],
    [{ type: 'string', nullable: true }, '(string|null)'],
    [{ type: 'array', items: { type: 'string' } }, 'string[]'],
    [{ type: 'string', format: 'binary' }, 'File'],
    [{ type: 'array', items: { enum: ['a', 'b', 'c'] } }, "('a'|'b'|'c')[]"],
    [{ type: 'array', items: { type: ['string', 'number'] } }, '(string|number)[]'],
    [
      {
        allOf: [
          { type: 'object', properties: { a: { type: 'string' } }, required: ['a'] },
          { type: 'object', properties: { b: { type: 'number' } } },
        ],
      },
      '{a:string;b?:number|undefined}',
    ],
  ])('makeSchemaTypeString(%o) -> %s', (schema, expected) => {
    expect(makeSchemaTypeString(schema, undefined, new Set())).toBe(expected)
  })
})

describe('makeInputType with cookie parameters', () => {
  it('should include cookie parameters in input type', () => {
    const operation: Operation = {
      responses: { '200': { description: 'OK' } },
      parameters: [
        { name: 'session_id', in: 'cookie', required: false, schema: { type: 'string' } },
        { name: 'user_id', in: 'cookie', required: true, schema: { type: 'string' } },
        { name: 'queryParam', in: 'query', required: false, schema: { type: 'string' } },
      ],
    }
    const result = makeInputType(operation, '/test', undefined, [])
    expect(result).toBe(
      '{query:{queryParam?:string|undefined}}&{cookie:{session_id?:string|undefined;user_id:string}}',
    )
  })
})

describe('makeInputType with content-based parameters', () => {
  it('should handle parameters with content instead of schema', () => {
    const operation: Operation = {
      responses: { '200': { description: 'OK' } },
      parameters: [
        {
          name: 'jsonFilter',
          in: 'query',
          schema: {},
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  operator: { type: 'string' },
                },
              },
            },
          },
        },
        {
          name: 'X-Metadata',
          in: 'header',
          schema: {},
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  requestId: { type: 'string' },
                  source: { type: 'string' },
                },
              },
            },
          },
        },
      ],
    }
    const result = makeInputType(operation, '/test', undefined, [])
    expect(result).toBe(
      "{query:{jsonFilter?:{field?:string|undefined;operator?:string|undefined}|undefined}}&{header:{'X-Metadata'?:{requestId?:string|undefined;source?:string|undefined}|undefined}}",
    )
  })
})
