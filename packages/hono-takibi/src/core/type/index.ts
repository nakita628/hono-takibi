/**
 * TypeScript type generation module.
 *
 * Generates TypeScript type declarations from OpenAPI specifications
 * by directly analyzing the OpenAPI structure.
 *
 * ```mermaid
 * flowchart TD
 *   A["type(openAPI, output)"] --> B["buildHonoSchemaType()"]
 *   B --> C["For each path/method"]
 *   C --> D["buildInputType()"]
 *   C --> E["buildOutputTypes()"]
 *   D --> F["Combine into Schema"]
 *   E --> F
 *   F --> G["Write declaration file"]
 * ```
 *
 * @module core/type
 */
import path from 'node:path'
import { core } from '../../helper/index.js'
import type {
  Components,
  OpenAPI,
  Operation,
  Parameter,
  Reference,
  RequestBody,
  Responses,
  Schema,
} from '../../openapi/index.js'
import { isHttpMethod } from '../../utils/index.js'

type Result =
  | { readonly ok: true; readonly value: string }
  | { readonly ok: false; readonly error: string }

/**
 * Generates TypeScript type declarations from OpenAPI specification.
 */
export async function type(openAPI: OpenAPI, output: `${string}.ts`): Promise<Result> {
  try {
    const schemaType = buildHonoSchemaType(openAPI)
    const dts = `declare const routes:import('@hono/zod-openapi').OpenAPIHono<import('hono/types').Env,${schemaType},'/'>\nexport default routes\n`
    const coreResult = await core(dts, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated type code written to ${output}` }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

function buildHonoSchemaType(openAPI: OpenAPI): string {
  const { paths, components } = openAPI
  const pathMethodMap = new Map<string, Map<string, string>>()
  for (const [openApiPath, pathItem] of Object.entries(paths)) {
    const honoPath = convertPathToHono(openApiPath)
    const pathLevelParams = pathItem.parameters ?? []
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!isHttpMethod(method)) continue
      if (!isOperation(operation)) continue
      const methodType = buildMethodType(operation, openApiPath, components, pathLevelParams)
      const methodMap = pathMethodMap.get(honoPath) ?? new Map<string, string>()
      methodMap.set(`$${method}`, methodType)
      pathMethodMap.set(honoPath, methodMap)
    }
  }
  if (pathMethodMap.size === 0) return '{}'
  const pathEntries = Array.from(pathMethodMap.entries()).map(([pathKey, methodMap]) => {
    const methods = Array.from(methodMap.entries())
      .map(([k, v]) => `${k}:${v}`)
      .join(';')
    return `{'${pathKey}':{${methods}}}`
  })
  return pathEntries.join('&')
}

function isOperation(op: unknown): op is Operation {
  return typeof op === 'object' && op !== null && 'responses' in op
}

function convertPathToHono(openApiPath: string): string {
  return openApiPath.replace(/\{([^}]+)\}/g, ':$1')
}

function buildMethodType(
  operation: Operation,
  openApiPath: string,
  components: Components | undefined,
  pathLevelParams: readonly Parameter[] | readonly Reference[],
): string {
  const inputType = buildInputType(operation, openApiPath, components, pathLevelParams)
  const outputTypes = buildOutputTypes(operation.responses, components)
  if (outputTypes.length === 0)
    return `{input:${inputType};output:{};outputFormat:string;status:200}`
  if (outputTypes.length === 1) return outputTypes[0].replace('INPUT_PLACEHOLDER', inputType)
  return outputTypes.map((t) => t.replace('INPUT_PLACEHOLDER', inputType)).join('|')
}

function buildInputType(
  operation: Operation,
  openApiPath: string,
  components: Components | undefined,
  pathLevelParams: readonly Parameter[] | readonly Reference[],
): string {
  const parts: string[] = []
  const pathLevelResolved = pathLevelParams
    .map((p) => makeResolvedParameter(p, components))
    .filter((p): p is Parameter => p !== undefined)
  const operationLevelResolved = operation.parameters
    ? operation.parameters
        .map((p) => makeResolvedParameter(p, components))
        .filter((p): p is Parameter => p !== undefined)
    : []
  const operationParamNames = new Set(operationLevelResolved.map((p) => p.name))
  const resolvedParams = [
    ...operationLevelResolved,
    ...pathLevelResolved.filter((p) => !operationParamNames.has(p.name)),
  ]
  const pathParams = extractPathParams(openApiPath)
  if (pathParams.length > 0) {
    const paramProps = resolvedParams
      .filter((p) => p.in === 'path')
      .map((p) => `${p.name}:${schemaToTypeString(getParameterSchema(p), components, new Set())}`)
    if (paramProps.length > 0) parts.push(`{param:{${paramProps.join(';')}}}`)
  }
  const queryParams = resolvedParams.filter((p) => p.in === 'query')
  if (queryParams.length > 0) {
    const queryProps = queryParams.map((p) => {
      const typeStr = schemaToTypeString(getParameterSchema(p), components, new Set())
      return p.required ? `${p.name}:${typeStr}` : `${p.name}?:${typeStr}|undefined`
    })
    parts.push(`{query:{${queryProps.join(';')}}}`)
  }
  const headerParams = resolvedParams.filter((p) => p.in === 'header')
  if (headerParams.length > 0) {
    const headerProps = headerParams.map((p) => {
      const typeStr = schemaToTypeString(getParameterSchema(p), components, new Set())
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : `'${p.name}'`
      return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
    })
    parts.push(`{header:{${headerProps.join(';')}}}`)
  }
  const cookieParams = resolvedParams.filter((p) => p.in === 'cookie')
  if (cookieParams.length > 0) {
    const cookieProps = cookieParams.map((p) => {
      const typeStr = schemaToTypeString(getParameterSchema(p), components, new Set())
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : `'${p.name}'`
      return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
    })
    parts.push(`{cookie:{${cookieProps.join(';')}}}`)
  }
  const resolvedRequestBody = operation.requestBody
    ? makeResolvedRequestBody(operation.requestBody, components)
    : undefined
  if (resolvedRequestBody?.content) {
    const jsonTypes: string[] = []
    const formTypes: string[] = []
    for (const [mediaType, media] of Object.entries(resolvedRequestBody.content)) {
      if (!isMedia(media)) continue
      const typeStr = schemaToTypeString(media.schema, components, new Set())
      if (mediaType.includes('form')) {
        if (!formTypes.includes(typeStr)) formTypes.push(typeStr)
      } else if (
        mediaType.includes('json') ||
        mediaType.startsWith('application/') ||
        mediaType.startsWith('text/')
      ) {
        if (!jsonTypes.includes(typeStr)) jsonTypes.push(typeStr)
      }
    }
    if (jsonTypes.length > 0) {
      const jsonType = jsonTypes.length === 1 ? jsonTypes[0] : `(${jsonTypes.join('|')})`
      parts.push(`{json:${jsonType}}`)
    }
    if (formTypes.length > 0) {
      const formType = formTypes.length === 1 ? formTypes[0] : `(${formTypes.join('|')})`
      parts.push(`{form:${formType}}`)
    }
  }
  if (parts.length === 0) return '{}'
  return parts.join('&')
}

function isParameter(p: unknown): p is Parameter {
  return (
    typeof p === 'object' &&
    p !== null &&
    'name' in p &&
    'in' in p &&
    ('schema' in p || 'content' in p)
  )
}

/**
 * Extracts schema from parameter (handles both schema and content-based parameters)
 */
function getParameterSchema(p: Parameter): Schema {
  if (p.schema) return p.schema
  if (p.content) {
    const firstKey = Object.keys(p.content)[0]
    if (firstKey && p.content[firstKey]?.schema) {
      return p.content[firstKey].schema
    }
  }
  return {}
}

function hasStringRef(p: object): p is { $ref: string } {
  return '$ref' in p && typeof p.$ref === 'string'
}

function makeResolvedParameter(
  p: unknown,
  components: Components | undefined,
): Parameter | undefined {
  if (isParameter(p)) return p
  if (typeof p === 'object' && p !== null && hasStringRef(p) && components?.parameters) {
    const refName = p.$ref.split('/').at(-1)
    if (refName) {
      const resolved = components.parameters[refName]
      if (resolved && isParameter(resolved)) return resolved
    }
  }
  return undefined
}

function isRequestBody(rb: unknown): rb is RequestBody {
  if (typeof rb !== 'object' || rb === null) return false
  return 'content' in rb || 'required' in rb || 'description' in rb
}

function makeResolvedRequestBody(
  rb: unknown,
  components: Components | undefined,
): RequestBody | undefined {
  if (!rb || typeof rb !== 'object') return undefined
  if (isRequestBody(rb) && !hasStringRef(rb)) return rb
  if (hasStringRef(rb) && components?.requestBodies) {
    const refName = rb.$ref.split('/').at(-1)
    if (refName) {
      const resolved = components.requestBodies[refName]
      if (resolved && isRequestBody(resolved)) return resolved
    }
  }
  return undefined
}

function isMedia(m: unknown): m is { schema: Schema } {
  return typeof m === 'object' && m !== null && 'schema' in m
}

function extractPathParams(openApiPath: string): readonly string[] {
  return Array.from(openApiPath.matchAll(/\{([^}]+)\}/g)).map((m) => m[1])
}

function parseStatusCode(statusCode: string): number {
  if (statusCode === 'default') return 200
  if (statusCode.toUpperCase().endsWith('XX')) return Number.parseInt(statusCode[0], 10) * 100
  return Number.parseInt(statusCode, 10)
}

function buildOutputTypes(
  responses: Operation['responses'],
  components: Components | undefined,
): readonly string[] {
  const results: string[] = []
  for (const [statusCode, response] of Object.entries(responses)) {
    const resolvedResponse = resolveResponse(response, components)
    const status = parseStatusCode(statusCode)
    if (!resolvedResponse.content) {
      results.push(`{input:INPUT_PLACEHOLDER;output:{};outputFormat:string;status:${status}}`)
      continue
    }
    for (const [mediaType, media] of Object.entries(resolvedResponse.content)) {
      if (!isMedia(media)) continue
      const outputType = schemaToTypeString(media.schema, components, new Set())
      const outputFormat = isJsonMediaType(mediaType) ? "'json'" : "'text'"
      results.push(
        `{input:INPUT_PLACEHOLDER;output:${outputType};outputFormat:${outputFormat};status:${status}}`,
      )
    }
  }
  return results
}

/**
 * Determines if a media type should be treated as JSON for outputFormat.
 * Only application/json and types ending with +json are considered JSON.
 */
function isJsonMediaType(mediaType: string): boolean {
  return mediaType === 'application/json' || mediaType.endsWith('+json')
}

function resolveResponse(response: Responses, components: Components | undefined): Responses {
  if (response.$ref && components?.responses) {
    const refName = response.$ref.split('/').at(-1)
    if (refName) {
      const resolved = components.responses[refName]
      if (resolved) return resolved
    }
  }
  return response
}

function schemaToTypeString(
  schema: Schema,
  components: Components | undefined,
  visited: Set<string>,
): string {
  if (!schema) return 'unknown'
  if (schema.$ref) {
    if (visited.has(schema.$ref)) return 'unknown'
    const newVisited = new Set(visited)
    newVisited.add(schema.$ref)
    return resolveRefType(schema.$ref, components, newVisited)
  }
  if (schema.oneOf && schema.oneOf.length > 0) {
    const types = schema.oneOf.map((s) => schemaToTypeString(s, components, visited))
    return types.join('|')
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    const types = schema.anyOf.map((s) => schemaToTypeString(s, components, visited))
    return types.join('|')
  }
  if (schema.allOf && schema.allOf.length > 0) {
    return buildAllOfType(schema.allOf, components, visited)
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
  const baseType = buildBaseType(schema, nonNullTypes, components, visited)
  return isNullable ? `(${baseType}|null)` : baseType
}

function normalizeType(schema: Schema): readonly string[] {
  if (!schema.type) return ['object']
  return Array.isArray(schema.type) ? schema.type : [schema.type]
}

function buildBaseType(
  schema: Schema,
  types: readonly string[],
  components: Components | undefined,
  visited: Set<string>,
): string {
  if (types.length > 1)
    return types.map((t) => buildSingleType(schema, t, components, visited)).join('|')
  return buildSingleType(schema, types[0] ?? 'object', components, visited)
}

function buildSingleType(
  schema: Schema,
  type: string,
  components: Components | undefined,
  visited: Set<string>,
): string {
  if (type === 'string') {
    if (schema.format === 'binary') return 'File'
    return 'string'
  }
  if (type === 'number' || type === 'integer') {
    if (schema.format === 'int64' || schema.format === 'bigint') return 'bigint'
    return 'number'
  }
  if (type === 'boolean') return 'boolean'
  if (type === 'null') return 'null'
  if (type === 'array') return buildArrayType(schema, components, visited)
  if (type === 'object') return buildObjectType(schema, components, visited)
  return 'unknown'
}

function resolveSchema(schema: Schema, components: Components | undefined): Schema {
  if (schema.$ref && components) {
    const parts = schema.$ref.split('/')
    const refName = parts.at(-1)
    if (refName && components.schemas?.[refName]) {
      return components.schemas[refName]
    }
  }
  return schema
}

function collectAllProperties(
  schema: Schema,
  components: Components | undefined,
  visited: Set<string>,
  mergedProps: Map<string, { type: string; required: boolean }>,
): void {
  const resolved = resolveSchema(schema, components)
  if (resolved.allOf && resolved.allOf.length > 0) {
    for (const subSchema of resolved.allOf) {
      collectAllProperties(subSchema, components, visited, mergedProps)
    }
  }
  if (resolved.properties) {
    const requiredSet = new Set(Array.isArray(resolved.required) ? resolved.required : [])
    for (const [key, propSchema] of Object.entries(resolved.properties)) {
      const propType = schemaToTypeString(propSchema, components, visited)
      const existing = mergedProps.get(key)
      const isRequired = requiredSet.has(key) || (existing?.required ?? false)
      mergedProps.set(key, { type: propType, required: isRequired })
    }
  }
}

function buildAllOfType(
  allOf: readonly Schema[],
  components: Components | undefined,
  visited: Set<string>,
): string {
  const mergedProps: Map<string, { type: string; required: boolean }> = new Map()
  for (const subSchema of allOf) {
    collectAllProperties(subSchema, components, visited, mergedProps)
  }
  if (mergedProps.size === 0) return '{}'
  const propertyStrings = Array.from(mergedProps.entries()).map(([key, { type, required }]) => {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return required ? `${safeKey}:${type}` : `${safeKey}?:${type}|undefined`
  })
  return `{${propertyStrings.join(';')}}`
}

function isSchemaArray(items: Schema | readonly Schema[]): items is readonly Schema[] {
  return Array.isArray(items)
}

function wrapArrayItemType(typeStr: string): string {
  return typeStr.includes('|') ? `(${typeStr})[]` : `${typeStr}[]`
}

function buildArrayType(
  schema: Schema,
  components: Components | undefined,
  visited: Set<string>,
): string {
  if (!schema.items) return 'unknown[]'
  const items = schema.items
  if (isSchemaArray(items)) {
    if (items.length > 1)
      return `[${items.map((item) => schemaToTypeString(item, components, visited)).join(',')}]`
    const firstItem = items[0]
    return firstItem
      ? wrapArrayItemType(schemaToTypeString(firstItem, components, visited))
      : 'unknown[]'
  }
  return wrapArrayItemType(schemaToTypeString(items, components, visited))
}

function buildObjectType(
  schema: Schema,
  components: Components | undefined,
  visited: Set<string>,
): string {
  const { properties, additionalProperties, required } = schema
  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === false) return '{}'
    if (typeof additionalProperties === 'object') {
      const valueType = schemaToTypeString(additionalProperties, components, visited)
      return `{[x:string]:${valueType}}`
    }
    return '{[x:string]:unknown}'
  }
  const requiredSet = new Set(Array.isArray(required) ? required : [])
  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = schemaToTypeString(propSchema, components, visited)
    const isRequired = requiredSet.has(key)
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return isRequired ? `${safeKey}:${propType}` : `${safeKey}?:${propType}|undefined`
  })
  return `{${propertyStrings.join(';')}}`
}

function resolveRefType(
  ref: string,
  components: Components | undefined,
  visited: Set<string>,
): string {
  if (!components) return 'unknown'
  const parts = ref.split('/')
  const componentType = parts[2]
  const refName = parts.at(-1)
  if (!refName) return 'unknown'
  if (componentType === 'schemas' && components.schemas) {
    const schema = components.schemas[refName]
    if (schema) return schemaToTypeString(schema, components, visited)
  }
  return 'unknown'
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/core/type/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  const fs = await import('node:fs')
  const os = await import('node:os')
  const nodePath = await import('node:path')

  const openapi = {
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
  } as OpenAPI

  describe('type', () => {
    it('should return ok and generate declaration file', { timeout: 10000 }, async () => {
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

  describe('convertPathToHono', () => {
    it.concurrent.each([
      ['/users', '/users'],
      ['/users/{id}', '/users/:id'],
      ['/users/{userId}/posts/{postId}', '/users/:userId/posts/:postId'],
    ])('convertPathToHono(%s) -> %s', (input, expected) => {
      expect(convertPathToHono(input)).toBe(expected)
    })
  })

  describe('schemaToTypeString', () => {
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
    ])('schemaToTypeString(%o) -> %s', (schema, expected) => {
      expect(schemaToTypeString(schema, undefined, new Set())).toBe(expected)
    })
  })

  describe('buildInputType with cookie parameters', () => {
    it('should include cookie parameters in input type', () => {
      const operation: Operation = {
        responses: { '200': { description: 'OK' } },
        parameters: [
          { name: 'session_id', in: 'cookie', required: false, schema: { type: 'string' } },
          { name: 'user_id', in: 'cookie', required: true, schema: { type: 'string' } },
          { name: 'queryParam', in: 'query', required: false, schema: { type: 'string' } },
        ],
      }
      const result = buildInputType(operation, '/test', undefined, [])
      expect(result).toBe(
        '{query:{queryParam?:string|undefined}}&{cookie:{session_id?:string|undefined;user_id:string}}',
      )
    })
  })

  describe('buildInputType with content-based parameters', () => {
    it('should handle parameters with content instead of schema', () => {
      const operation: Operation = {
        responses: { '200': { description: 'OK' } },
        parameters: [
          {
            name: 'jsonFilter',
            in: 'query',
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
          } as unknown as Parameter,
          {
            name: 'X-Metadata',
            in: 'header',
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
          } as unknown as Parameter,
        ],
      }
      const result = buildInputType(operation, '/test', undefined, [])
      expect(result).toBe(
        "{query:{jsonFilter?:{field?:string|undefined;operator?:string|undefined}|undefined}}&{header:{'X-Metadata'?:{requestId?:string|undefined;source?:string|undefined}|undefined}}",
      )
    })
  })
}
