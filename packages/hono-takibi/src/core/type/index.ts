import path from 'node:path'

import { Effect } from 'effect'

import { JSON_MEDIA_TYPE } from '../../constants/index.js'
import { emit } from '../../emit/index.js'
import {
  isHttpMethod,
  isMediaWithSchema,
  isOpenAPIPaths,
  isOperation,
  isParameter,
  isParameterArray,
  isRequestBody,
  isSchemaArray,
  isStringRef,
} from '../../guard/index.js'
import type {
  Components,
  OpenAPI,
  OpenAPIPaths,
  Operation,
  Parameter,
  Reference,
  Responses,
  Schema,
} from '../../openapi/index.js'
import { makeSafeKey, statusCodeToNumber, toIdentifierPascalCase } from '../../utils/index.js'

/**
 * DeepReadonly utility type that recursively makes all properties readonly.
 */
const DEEP_READONLY_TYPE =
  'type DeepReadonly<T>=T extends(infer R)[]?readonly DeepReadonly<R>[]:T extends object?{readonly[K in keyof T]:DeepReadonly<T[K]>}:T;'

/**
 * The type names the declaration file uses for itself and for what it refers to; a
 * component schema that would take one of them is given another name.
 */
const RESERVED_TYPE_NAMES: ReadonlySet<string> = new Set(['DeepReadonly', 'File'])

/**
 * The component schemas an operation refers to, each as one named type.
 *
 * A `$ref` into `components.schemas` is written as the name of the type alias that
 * stands for the schema, and the alias is written once, however many operations and
 * properties refer to it. Inlining the schema instead grew the file with every
 * reference: a schema referred to from many places, or one that refers to others,
 * was written out again at each of them. A schema that reaches itself is simply an
 * alias that names itself, which is what a type of a recursive value is.
 *
 * `bodies` is filled in the order the schemas are first reached, and a schema whose
 * alias is still being written is already named, so a cycle ends at its name.
 */
type Aliases = {
  readonly components: Components | undefined
  readonly names: Map<string, string>
  readonly bodies: Map<string, string>
  readonly taken: Set<string>
}

/**
 * Generates TypeScript type declarations from OpenAPI specification.
 */
export function type(openAPI: OpenAPI, output: `${string}.ts`, readonly?: boolean) {
  const aliases: Aliases = {
    components: openAPI.components,
    names: new Map(),
    bodies: new Map(),
    taken: new Set(RESERVED_TYPE_NAMES),
  }
  const schemaType = makeHonoSchemaType(openAPI, aliases)
  const wrappedType = readonly ? `DeepReadonly<${schemaType}>` : schemaType
  const typeDecl = readonly ? DEEP_READONLY_TYPE : ''
  const aliasDecls = [...aliases.bodies].map(([name, body]) => `type ${name}=${body};`).join('')
  const dts = `${typeDecl}${aliasDecls}declare const routes:import('@hono/zod-openapi').OpenAPIHono<import('hono/types').Env,${wrappedType},'/'>\nexport default routes\n`
  return Effect.gen(function* () {
    yield* emit(dts, path.dirname(output), output)
    return `Generated type code written to ${output}`
  })
}

/**
 * The alias that stands for the component schema `schemaName`, written when it is not
 * yet. The name is claimed before the body is written, so that a schema reaching
 * itself finds its own name.
 */
function aliasOf(schemaName: string, schema: Schema, aliases: Aliases) {
  const known = aliases.names.get(schemaName)
  if (known !== undefined) return known
  const base = toIdentifierPascalCase(schemaName)
  const name = aliases.taken.has(base)
    ? (() => {
        let index = 2
        while (aliases.taken.has(`${base}${String(index)}`)) index += 1
        return `${base}${String(index)}`
      })()
    : base
  aliases.taken.add(name)
  aliases.names.set(schemaName, name)
  // The body is written as if the schema were inlined at its first use, with its own
  // `$ref` on the path: an `allOf` that comes back to it merges no properties twice.
  const body = makeSchemaTypeString(
    schema,
    aliases,
    new Set([`#/components/schemas/${schemaName}`]),
  )
  aliases.bodies.set(name, body)
  return name
}

function makeHonoSchemaType(openAPI: OpenAPI, aliases: Aliases) {
  const paths: OpenAPIPaths = isOpenAPIPaths(openAPI.paths) ? openAPI.paths : {}
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
        type: makeMethodType(operation, openApiPath, aliases, pathLevelParams),
      }))
    return methods.length > 0
      ? [{ path: honoPath, methods: methods.map((m) => `${m.method}:${m.type}`).join(';') }]
      : []
  })
  return pathEntries.length === 0
    ? '{}'
    : pathEntries.map(({ path: p, methods }) => `{'${p}':{${methods}}}`).join('&')
}

function makeHonoPath(openApiPath: string) {
  return openApiPath.replaceAll(/\{([^}]+)\}/gu, ':$1')
}

function makeMethodType(
  operation: Operation,
  openApiPath: string,
  aliases: Aliases,
  pathLevelParams: readonly (Parameter | Reference)[],
) {
  const inputType = makeInputType(operation, openApiPath, aliases, pathLevelParams)
  const outputTypes = makeOutputTypes(operation.responses, aliases, inputType)
  return outputTypes.length === 0
    ? `{input:${inputType};output:{};outputFormat:string;status:200}`
    : outputTypes.length === 1
      ? outputTypes[0]
      : outputTypes.join('|')
}

function makeInputType(
  operation: Operation,
  openApiPath: string,
  aliases: Aliases,
  pathLevelParams: readonly (Parameter | Reference)[],
) {
  const { components } = aliases
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
          aliases,
        )
      : undefined
  const queryPart = makeQueryPart(
    resolvedParams.filter((p) => p.in === 'query'),
    aliases,
  )
  const headerPart = makeHeaderPart(
    resolvedParams.filter((p) => p.in === 'header'),
    aliases,
  )
  const cookiePart = makeCookiePart(
    resolvedParams.filter((p) => p.in === 'cookie'),
    aliases,
  )
  const bodyParts = makeBodyParts(operation.requestBody, aliases)
  const parts = [paramPart, queryPart, headerPart, cookiePart, ...bodyParts].filter(
    (p): p is string => p !== undefined,
  )
  return parts.length === 0 ? '{}' : parts.join('&')
}

function makePathParams(openApiPath: string): readonly string[] {
  return [...openApiPath.matchAll(/\{([^}]+)\}/gu)].map((m) => m[1])
}

function makeParamPart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const safeKey = makeSafeKey(p.name)
    return `${safeKey}:${makeSchemaTypeString(makeParameterSchema(p), aliases, new Set())}`
  })
  return props.length > 0 ? `{param:{${props.join(';')}}}` : undefined
}

function makeQueryPart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), aliases, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{query:{${props.join(';')}}}` : undefined
}

function makeHeaderPart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), aliases, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{header:{${props.join(';')}}}` : undefined
}

function makeCookiePart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const typeStr = makeSchemaTypeString(makeParameterSchema(p), aliases, new Set())
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{cookie:{${props.join(';')}}}` : undefined
}

function makeBodyParts(requestBody: Operation['requestBody'], aliases: Aliases): readonly string[] {
  const resolved = requestBody
    ? makeResolvedRequestBody(requestBody, aliases.components)
    : undefined
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
        .map(([, media]) => makeSchemaTypeString(media.schema, aliases, new Set())),
    ),
  ]
  const formTypes = [
    ...new Set(
      mediaEntries
        .filter(([mediaType]) => mediaType.includes('form'))
        .map(([, media]) => makeSchemaTypeString(media.schema, aliases, new Set())),
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
  return [jsonPart, formPart].filter((p) => p !== undefined)
}

function makeOutputTypes(
  responses: Operation['responses'],
  aliases: Aliases,
  inputType: string,
): readonly string[] {
  return Object.entries(responses).flatMap(([statusCode, response]) => {
    const resolvedResponse = makeResolvedResponse(response, aliases.components)
    const status = statusCodeToNumber(statusCode)
    if (!resolvedResponse.content) {
      return [`{input:${inputType};output:{};outputFormat:string;status:${status}}`]
    }
    return Object.entries(resolvedResponse.content)
      .filter((entry): entry is [string, { schema: Schema }] => isMediaWithSchema(entry[1]))
      .map(([mediaType, media]) => {
        const outputType = makeSchemaTypeString(media.schema, aliases, new Set())
        const outputFormat = isJsonMediaType(mediaType) ? "'json'" : "'text'"
        return `{input:${inputType};output:${outputType};outputFormat:${outputFormat};status:${status}}`
      })
  })
}

function isJsonMediaType(mediaType: string) {
  return mediaType === JSON_MEDIA_TYPE || mediaType.endsWith('+json')
}

function makeResolvedParameter(parameter: unknown, components: Components | undefined) {
  if (isParameter(parameter)) return parameter
  if (
    typeof parameter === 'object' &&
    parameter !== null &&
    isStringRef(parameter) &&
    components?.parameters
  ) {
    const refName = parameter.$ref.split('/').at(-1)
    const resolved = refName ? components.parameters[refName] : undefined
    return resolved && isParameter(resolved) ? resolved : undefined
  }
  return undefined
}

function makeResolvedRequestBody(requestBody: unknown, components: Components | undefined) {
  if (!requestBody || typeof requestBody !== 'object') return undefined
  if (isRequestBody(requestBody) && !isStringRef(requestBody)) return requestBody
  if (isStringRef(requestBody) && components?.requestBodies) {
    const refName = requestBody.$ref.split('/').at(-1)
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

function makeResolvedSchema(schema: Schema, components: Components | undefined) {
  if (schema.$ref && components) {
    const refName = schema.$ref.split('/').at(-1)
    return refName && components.schemas?.[refName] ? components.schemas[refName] : schema
  }
  return schema
}

function makeParameterSchema(parameter: Parameter) {
  if (parameter.content) {
    const firstKey = Object.keys(parameter.content)[0]
    if (firstKey && parameter.content[firstKey]?.schema) {
      return parameter.content[firstKey].schema
    }
  }
  return parameter.schema ?? {}
}

function makeSchemaTypeString(schema: Schema, aliases: Aliases, visited: Set<string>): string {
  if (!schema) return 'unknown'
  if (schema.$ref) return makeRefTypeString(schema.$ref, aliases)
  if (schema.oneOf && schema.oneOf.length > 0) {
    return schema.oneOf.map((s) => makeSchemaTypeString(s, aliases, visited)).join('|')
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    return schema.anyOf.map((s) => makeSchemaTypeString(s, aliases, visited)).join('|')
  }
  if (schema.allOf && schema.allOf.length > 0) {
    return makeAllOfTypeString(schema.allOf, aliases, visited)
  }
  // An int64 is a bigint in the generated schema, and so are the literals of its enum.
  const isBigintLiteral = (value: unknown): value is number =>
    typeof value === 'number' &&
    Number.isInteger(value) &&
    (Array.isArray(schema.type) ? schema.type.includes('integer') : schema.type === 'integer') &&
    (schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint')
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum
      .map((v) =>
        typeof v === 'string'
          ? `'${v.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`
          : isBigintLiteral(v)
            ? `${v}n`
            : String(v),
      )
      .join('|')
  }
  if (schema.const !== undefined) {
    if (typeof schema.const === 'string') {
      return `'${schema.const.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`
    }
    if (isBigintLiteral(schema.const)) return `${schema.const}n`
    if (typeof schema.const === 'number' || typeof schema.const === 'boolean') {
      return String(schema.const)
    }
    return JSON.stringify(schema.const)
  }
  const types = makeNormalizedTypes(schema)
  const isNullable = schema.nullable === true || types.includes('null')
  const nonNullTypes = types.filter((t) => t !== 'null')
  const baseType = makeBaseTypeString(schema, nonNullTypes, aliases, visited)
  return isNullable ? `(${baseType}|null)` : baseType
}

function makeNormalizedTypes(schema: Schema): readonly string[] {
  return schema.type ? (Array.isArray(schema.type) ? schema.type : [schema.type]) : ['object']
}

function makeBaseTypeString(
  schema: Schema,
  types: readonly string[],
  aliases: Aliases,
  visited: Set<string>,
) {
  return types.length > 1
    ? types.map((t) => makeSingleTypeString(schema, t, aliases, visited)).join('|')
    : makeSingleTypeString(schema, types[0] ?? 'object', aliases, visited)
}

const PRIMITIVE_TYPE_MAP: { readonly [k: string]: string } = {
  boolean: 'boolean',
  null: 'null',
}

function makeSingleTypeString(
  schema: Schema,
  // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
  type: string,
  aliases: Aliases,
  visited: Set<string>,
) {
  if (type === 'string') return schema.format === 'binary' ? 'File' : 'string'
  if (type === 'number' || type === 'integer') {
    const isBigintFormat =
      schema.format === 'int64' || schema.format === 'uint64' || schema.format === 'bigint'
    return isBigintFormat ? 'bigint' : 'number'
  }
  if (type === 'array') return makeArrayTypeString(schema, aliases, visited)
  if (type === 'object') return makeObjectTypeString(schema, aliases, visited)
  return PRIMITIVE_TYPE_MAP[type] ?? 'unknown'
}

/**
 * A `$ref` into `components.schemas` is the name of the alias that stands for the
 * schema; any other reference, or one to a schema that is not there, is `unknown`.
 */
function makeRefTypeString(ref: string, aliases: Aliases) {
  const { components } = aliases
  if (!components) return 'unknown'
  const parts = ref.split('/')
  const componentType = parts[2]
  const refName = parts.at(-1)
  if (!refName) return 'unknown'
  if (componentType === 'schemas' && components.schemas) {
    const schema = components.schemas[refName]
    return schema ? aliasOf(refName, schema, aliases) : 'unknown'
  }
  return 'unknown'
}

function makeAllOfTypeString(allOf: readonly Schema[], aliases: Aliases, visited: Set<string>) {
  const mergedProps = allOf.reduce((acc, subSchema) => {
    const newProps = makePropertyMap(subSchema, aliases, visited)
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
  // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
  const propertyStrings = [...mergedProps.entries()].map(([key, { type, required }]) => {
    const safeKey = makeSafeKey(key)
    return required ? `${safeKey}:${type}` : `${safeKey}?:${type}|undefined`
  })
  return `{${propertyStrings.join(';')}}`
}

function makePropertyMap(
  schema: Schema,
  aliases: Aliases,
  visited: Set<string>,
): ReadonlyMap<string, { readonly type: string; readonly required: boolean }> {
  // Break cycles: when allOf members reference back to an ancestor schema (e.g.
  // A.allOf -> B, B.allOf -> A), we'd otherwise recurse forever and overflow.
  if (schema.$ref && visited.has(schema.$ref)) {
    return new Map()
  }
  const nextVisited = schema.$ref ? new Set([...visited, schema.$ref]) : visited
  const resolved = makeResolvedSchema(schema, aliases.components)
  const fromAllOf = new Map<string, { type: string; required: boolean }>(
    resolved.allOf && resolved.allOf.length > 0
      ? resolved.allOf.flatMap((subSchema) => [
          ...makePropertyMap(subSchema, aliases, nextVisited).entries(),
        ])
      : [],
  )

  if (!resolved.properties) return fromAllOf

  const requiredSet = new Set(Array.isArray(resolved.required) ? resolved.required : [])
  const currentProps = new Map(
    Object.entries(resolved.properties).map(([key, propSchema]) => {
      const propType = makeSchemaTypeString(propSchema, aliases, nextVisited)
      const existing = fromAllOf.get(key)
      const isRequired = requiredSet.has(key) || (existing?.required ?? false)
      return [key, { type: propType, required: isRequired }] as const
    }),
  )
  return new Map([...fromAllOf, ...currentProps])
}

function makeArrayTypeString(schema: Schema, aliases: Aliases, visited: Set<string>) {
  if (!schema.items) return 'unknown[]'
  const items = schema.items
  // JSON Schema 2020-12 §10.3.1.2 boolean items:
  //   items: true  → trailing items unconstrained (unknown[])
  //   items: false → trailing items disallowed; with no prefixItems the type
  //                  collapses to []. We surface a tuple of length 0.
  if (typeof items === 'boolean') {
    return items ? 'unknown[]' : '[]'
  }
  if (isSchemaArray(items)) {
    return items.length > 1
      ? `[${items.map((item) => makeSchemaTypeString(item, aliases, visited)).join(',')}]`
      : items[0]
        ? makeWrappedArrayType(makeSchemaTypeString(items[0], aliases, visited))
        : 'unknown[]'
  }
  return makeWrappedArrayType(makeSchemaTypeString(items, aliases, visited))
}

function makeWrappedArrayType(typeStr: string) {
  return typeStr.includes('|') ? `(${typeStr})[]` : `${typeStr}[]`
}

function makeObjectTypeString(schema: Schema, aliases: Aliases, visited: Set<string>) {
  const { properties, additionalProperties, required } = schema
  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === false) return '{}'
    if (typeof additionalProperties === 'object') {
      return `{[x:string]:${makeSchemaTypeString(additionalProperties, aliases, visited)}}`
    }
    return '{[x:string]:unknown}'
  }
  const requiredSet = new Set(Array.isArray(required) ? required : [])
  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = makeSchemaTypeString(propSchema, aliases, visited)
    const safeKey = makeSafeKey(key)
    return requiredSet.has(key) ? `${safeKey}:${propType}` : `${safeKey}?:${propType}|undefined`
  })
  return `{${propertyStrings.join(';')}}`
}
