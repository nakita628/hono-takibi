/**
 * TypeScript type generation module.
 *
 * Generates TypeScript type declarations from OpenAPI specifications
 * by directly analyzing the OpenAPI structure.
 *
 * ```mermaid
 * flowchart TD
 *   A["type(openAPI, output)"] --> B["makeHonoSchemaType()"]
 *   B --> C["For each path/method"]
 *   C --> D["makeInputType()"]
 *   C --> E["makeOutputTypes()"]
 *   D --> F["Combine into Schema"]
 *   E --> F
 *   F --> G["Write declaration file"]
 * ```
 *
 * @module core/type
 */
import path from 'node:path'
import { isHttpMethod, isSchemaArray } from '../../guard/index.js'
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
import { makeSafeKey } from '../../utils/index.js'

// ============================================================================
// Type Guards
// ============================================================================

function isOperation(op: unknown): op is Operation {
  return typeof op === 'object' && op !== null && 'responses' in op
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

function isRequestBody(rb: unknown): rb is RequestBody {
  return (
    typeof rb === 'object' &&
    rb !== null &&
    ('content' in rb || 'required' in rb || 'description' in rb)
  )
}

function isMediaWithSchema(m: unknown): m is { schema: Schema } {
  return typeof m === 'object' && m !== null && 'schema' in m
}

function hasStringRef(p: object): p is { $ref: string } {
  return '$ref' in p && typeof p.$ref === 'string'
}

function isParameterArray(params: unknown): params is readonly Parameter[] | readonly Reference[] {
  return Array.isArray(params)
}

// ============================================================================
// Main Export
// ============================================================================

/**
 * DeepReadonly utility type that recursively makes all properties readonly.
 */
const DEEP_READONLY_TYPE =
  'type DeepReadonly<T>=T extends(infer R)[]?readonly DeepReadonly<R>[]:T extends object?{readonly[K in keyof T]:DeepReadonly<T[K]>}:T;'

/**
 * Generates TypeScript type declarations from OpenAPI specification.
 *
 * @param openAPI - OpenAPI specification object
 * @param output - Output file path (must end with .ts)
 * @param readonly - If true, wraps the schema type with DeepReadonly for immutable types
 * @returns Result with success message or error
 */
export async function type(
  openAPI: OpenAPI,
  output: `${string}.ts`,
  readonly?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  try {
    const schemaType = makeHonoSchemaType(openAPI)
    const wrappedType = readonly ? `DeepReadonly<${schemaType}>` : schemaType
    const typeDecl = readonly ? DEEP_READONLY_TYPE : ''
    const dts = `${typeDecl}declare const routes:import('@hono/zod-openapi').OpenAPIHono<import('hono/types').Env,${wrappedType},'/'>\nexport default routes\n`
    const coreResult = await core(dts, path.dirname(output), output)
    return coreResult.ok
      ? { ok: true, value: `Generated type code written to ${output}` }
      : { ok: false, error: coreResult.error }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

// ============================================================================
// Schema Building
// ============================================================================

function makeHonoSchemaType(openAPI: OpenAPI): string {
  const { paths, components } = openAPI
  const pathEntries = Object.entries(paths).flatMap(([openApiPath, pathItem]) => {
    const honoPath = makeHonoPath(openApiPath)
    const pathLevelParams = isParameterArray(pathItem.parameters) ? pathItem.parameters : []
    const methods = Object.entries(pathItem)
      .filter((entry): entry is [string, Operation] => {
        const [method, op] = entry
        return isHttpMethod(method) && isOperation(op)
      })
      .map(([method, operation]) => ({
        method: `$${method}`,
        type: makeMethodType(operation, openApiPath, components, pathLevelParams),
      }))
    return methods.length > 0
      ? [{ path: honoPath, methods: methods.map((m) => `${m.method}:${m.type}`).join(';') }]
      : []
  })
  return pathEntries.length === 0
    ? '{}'
    : pathEntries.map(({ path: p, methods }) => `{'${p}':{${methods}}}`).join('&')
}

function makeHonoPath(openApiPath: string): string {
  return openApiPath.replace(/\{([^}]+)\}/g, ':$1')
}

function makeMethodType(
  operation: Operation,
  openApiPath: string,
  components: Components | undefined,
  pathLevelParams: readonly Parameter[] | readonly Reference[],
): string {
  const inputType = makeInputType(operation, openApiPath, components, pathLevelParams)
  const outputTypes = makeOutputTypes(operation.responses, components, inputType)
  return outputTypes.length === 0
    ? `{input:${inputType};output:{};outputFormat:string;status:200}`
    : outputTypes.length === 1
      ? outputTypes[0]
      : outputTypes.join('|')
}

// ============================================================================
// Input Type Building
// ============================================================================

function makeInputType(
  operation: Operation,
  openApiPath: string,
  components: Components | undefined,
  pathLevelParams: readonly Parameter[] | readonly Reference[],
): string {
  const pathLevelResolved = pathLevelParams
    .map((p) => makeResolvedParameter(p, components))
    .filter((p): p is Parameter => p !== undefined)
  const operationLevelResolved = (operation.parameters ?? [])
    .map((p) => makeResolvedParameter(p, components))
    .filter((p): p is Parameter => p !== undefined)
  const operationParamNames = new Set(operationLevelResolved.map((p) => p.name))
  const resolvedParams = [
    ...operationLevelResolved,
    ...pathLevelResolved.filter((p) => !operationParamNames.has(p.name)),
  ]

  const pathParams = makePathParams(openApiPath)
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
  const bodyParts = makeBodyParts(operation.requestBody, components)

  const parts = [paramPart, queryPart, headerPart, cookiePart, ...bodyParts].filter(
    (p): p is string => p !== undefined,
  )
  return parts.length === 0 ? '{}' : parts.join('&')
}

function makePathParams(openApiPath: string): readonly string[] {
  return Array.from(openApiPath.matchAll(/\{([^}]+)\}/g)).map((m) => m[1])
}

function makeParamPart(
  params: readonly Parameter[],
  components: Components | undefined,
): string | undefined {
  const props = params.map((p) => {
    const safeKey = makeSafeKey(p.name)
    return `${safeKey}:${makeSchemaTypeString(makeParameterSchema(p), components, new Set())}`
  })
  return props.length > 0 ? `{param:{${props.join(';')}}}` : undefined
}

function makeQueryPart(
  params: readonly Parameter[],
  components: Components | undefined,
): string | undefined {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), components, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{query:{${props.join(';')}}}` : undefined
}

function makeHeaderPart(
  params: readonly Parameter[],
  components: Components | undefined,
): string | undefined {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), components, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{header:{${props.join(';')}}}` : undefined
}

function makeCookiePart(
  params: readonly Parameter[],
  components: Components | undefined,
): string | undefined {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), components, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{cookie:{${props.join(';')}}}` : undefined
}

function makeBodyParts(
  requestBody: Operation['requestBody'],
  components: Components | undefined,
): readonly string[] {
  const resolved = requestBody ? makeResolvedRequestBody(requestBody, components) : undefined
  if (!resolved?.content) return []

  const mediaEntries = Object.entries(resolved.content).filter(
    (entry): entry is [string, { schema: Schema }] => isMediaWithSchema(entry[1]),
  )

  const jsonTypes = [
    ...new Set(
      mediaEntries
        .filter(
          ([mediaType]) =>
            mediaType.includes('json') ||
            mediaType.startsWith('application/') ||
            mediaType.startsWith('text/'),
        )
        .map(([, media]) => makeSchemaTypeString(media.schema, components, new Set())),
    ),
  ]
  const formTypes = [
    ...new Set(
      mediaEntries
        .filter(([mediaType]) => mediaType.includes('form'))
        .map(([, media]) => makeSchemaTypeString(media.schema, components, new Set())),
    ),
  ]
  const classified = { jsonTypes, formTypes }

  const jsonPart =
    classified.jsonTypes.length > 0
      ? `{json:${classified.jsonTypes.length === 1 ? classified.jsonTypes[0] : `(${classified.jsonTypes.join('|')})`}}`
      : undefined
  const formPart =
    classified.formTypes.length > 0
      ? `{form:${classified.formTypes.length === 1 ? classified.formTypes[0] : `(${classified.formTypes.join('|')})`}}`
      : undefined

  return [jsonPart, formPart].filter((p): p is string => p !== undefined)
}

// ============================================================================
// Output Type Building
// ============================================================================

function makeOutputTypes(
  responses: Operation['responses'],
  components: Components | undefined,
  inputType: string,
): readonly string[] {
  return Object.entries(responses).flatMap(([statusCode, response]) => {
    const resolvedResponse = makeResolvedResponse(response, components)
    const status = makeStatusCode(statusCode)
    if (!resolvedResponse.content) {
      return [`{input:${inputType};output:{};outputFormat:string;status:${status}}`]
    }
    return Object.entries(resolvedResponse.content)
      .filter((entry): entry is [string, { schema: Schema }] => isMediaWithSchema(entry[1]))
      .map(([mediaType, media]) => {
        const outputType = makeSchemaTypeString(media.schema, components, new Set())
        const outputFormat = isJsonMediaType(mediaType) ? "'json'" : "'text'"
        return `{input:${inputType};output:${outputType};outputFormat:${outputFormat};status:${status}}`
      })
  })
}

function makeStatusCode(statusCode: string): number {
  return statusCode === 'default'
    ? 200
    : statusCode.toUpperCase().endsWith('XX')
      ? Number.parseInt(statusCode[0], 10) * 100
      : Number.parseInt(statusCode, 10)
}

/**
 * Determines if a media type should be treated as JSON for outputFormat.
 * Only application/json and types ending with +json are considered JSON.
 */
function isJsonMediaType(mediaType: string): boolean {
  return mediaType === 'application/json' || mediaType.endsWith('+json')
}

// ============================================================================
// Resolution Helpers
// ============================================================================

function makeResolvedParameter(
  p: unknown,
  components: Components | undefined,
): Parameter | undefined {
  if (isParameter(p)) return p
  if (typeof p === 'object' && p !== null && hasStringRef(p) && components?.parameters) {
    const refName = p.$ref.split('/').at(-1)
    const resolved = refName ? components.parameters[refName] : undefined
    return resolved && isParameter(resolved) ? resolved : undefined
  }
  return undefined
}

function makeResolvedRequestBody(
  rb: unknown,
  components: Components | undefined,
): RequestBody | undefined {
  if (!rb || typeof rb !== 'object') return undefined
  if (isRequestBody(rb) && !hasStringRef(rb)) return rb
  if (hasStringRef(rb) && components?.requestBodies) {
    const refName = rb.$ref.split('/').at(-1)
    const resolved = refName ? components.requestBodies[refName] : undefined
    return resolved && isRequestBody(resolved) ? resolved : undefined
  }
  return undefined
}

function makeResolvedResponse(response: Responses, components: Components | undefined): Responses {
  if (response.$ref && components?.responses) {
    const refName = response.$ref.split('/').at(-1)
    const resolved = refName ? components.responses[refName] : undefined
    return resolved ?? response
  }
  return response
}

function makeResolvedSchema(schema: Schema, components: Components | undefined): Schema {
  if (schema.$ref && components) {
    const refName = schema.$ref.split('/').at(-1)
    return refName && components.schemas?.[refName] ? components.schemas[refName] : schema
  }
  return schema
}

function makeParameterSchema(p: Parameter): Schema {
  // content takes precedence over schema (OpenAPI 3.0 spec)
  if (p.content) {
    const firstKey = Object.keys(p.content)[0]
    if (firstKey && p.content[firstKey]?.schema) {
      return p.content[firstKey].schema
    }
  }
  return p.schema ?? {}
}

// ============================================================================
// Schema Type String Generation
// ============================================================================

function makeSchemaTypeString(
  schema: Schema,
  components: Components | undefined,
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
    return schema.enum
      .map((v) => (typeof v === 'string' ? `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : String(v)))
      .join('|')
  }
  if (schema.const !== undefined) {
    return typeof schema.const === 'string'
      ? `'${String(schema.const).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
      : String(schema.const)
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
  components: Components | undefined,
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
  components: Components | undefined,
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
    return schema ? makeSchemaTypeString(schema, components, visited) : 'unknown'
  }
  return 'unknown'
}

// ============================================================================
// Complex Type String Generation
// ============================================================================

function makeAllOfTypeString(
  allOf: readonly Schema[],
  components: Components | undefined,
  visited: Set<string>,
): string {
  const mergedProps = allOf.reduce((acc, subSchema) => {
    const newProps = makePropertyMap(subSchema, components, visited)
    const result = new Map(acc)
    for (const [key, value] of newProps) {
      const existing = result.get(key)
      // Preserve required: true from either source (allOf merges required arrays)
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
  components: Components | undefined,
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
  components: Components | undefined,
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
  components: Components | undefined,
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
