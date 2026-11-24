import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import {
  isFormMediaType,
  isHttpMethod,
  isJsonMediaType,
  isMediaWithSchema,
  isOpenAPIPaths,
  isOperation,
  isParameter,
  isParameterArray,
  isRequestBody,
  isStringRef,
} from '../../guard/index.js'
import { makeSchemaTypeString } from '../../helper/type.js'
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
import {
  makeSafeKey,
  makeStringLiteral,
  statusCodeToNumber,
  toHonoPath,
  toIdentifierPascalCase,
} from '../../utils/index.js'

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
 * The status codes of Hono's `StatusCode` (`hono/utils/http-status`).
 */
const HONO_STATUS_CODES: ReadonlySet<number> = new Set([
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304,
  305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504,
  505, 506, 507, 508, 510, 511,
])

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
  aliases.bodies.set(name, makeTypeOf(schema, aliases, schemaName))
  return name
}

/**
 * The component schemas `schema` refers to with nothing in between that defers the
 * reference: itself, or a member of the combinator it is typed by. Of `oneOf`, `anyOf`
 * and `allOf` the type writer writes the first that is there, so only that one counts.
 */
function directRefNames(schema: Schema): readonly string[] {
  if (schema.$ref) {
    const parts = schema.$ref.split('/')
    const name = parts.at(-1)
    return parts[2] === 'schemas' && name !== undefined ? [name] : []
  }
  const members = [schema.oneOf, schema.anyOf, schema.allOf].find(
    (candidates) => candidates !== undefined && candidates.length > 0,
  )
  return (members ?? []).flatMap(directRefNames)
}

/**
 * Whether the alias of `from` reaches the alias of `target` through direct references
 * alone. TypeScript resolves such a chain at once, so one that comes back to where it
 * started is an alias that circularly references itself (TS2456, #635).
 */
function reachesDirectly(
  from: string,
  target: string,
  schemas: { readonly [k: string]: Schema },
  // One set for the whole search: a schema that did not reach the target once never will,
  // so it is not walked again along another path.
  visited = new Set<string>(),
): boolean {
  if (from === target) return true
  if (visited.has(from)) return false
  visited.add(from)
  const schema = schemas[from]
  if (schema === undefined) return false
  return directRefNames(schema).some((name) => reachesDirectly(name, target, schemas, visited))
}

/**
 * The type of a schema in the route map, from the writer the Zod output is typed with
 * (#608): a `$ref` is the name of its alias, and an optional property may be `undefined`,
 * as it is in what Hono's `JSONParsed` makes of a response.
 */
function makeTypeOf(schema: Schema, aliases: Aliases, self?: string) {
  const schemas = aliases.components?.schemas
  return makeSchemaTypeString(schema, {
    // A direct reference that leads back to the alias being written cannot be written as
    // a name. It says nothing the alias does not already say of itself, so it is
    // `unknown`, which an intersection drops (`X & unknown` is `X`).
    ref: (ref, direct) =>
      direct &&
      self !== undefined &&
      schemas !== undefined &&
      reachesDirectly(ref.split('/').at(-1) ?? '', self, schemas)
        ? 'unknown'
        : makeRefTypeString(ref, aliases),
    schemas,
    readonly: false,
    optionalUndefined: true,
  })
}

function makeHonoSchemaType(openAPI: OpenAPI, aliases: Aliases) {
  const paths: OpenAPIPaths = isOpenAPIPaths(openAPI.paths) ? openAPI.paths : {}
  const pathEntries = Object.entries(paths).flatMap(([openApiPath, pathItem]) => {
    const honoPath = toHonoPath(openApiPath)
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
    : pathEntries.map(({ path: p, methods }) => `{${makeStringLiteral(p)}:{${methods}}}`).join('&')
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
  // A parameter is its name and its location (OpenAPI §4.8.10.1): an operation's header
  // `id` does not replace the path's path `id`.
  const resolvedParams = [
    ...operationLevelResolved,
    ...pathLevelResolved.filter(
      (p) => !operationLevelResolved.some((own) => own.name === p.name && own.in === p.in),
    ),
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
  return [...openApiPath.matchAll(/\{([^}]+)\}/gu)].flatMap((m) => m[1] ?? [])
}

function makeParamPart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const safeKey = makeSafeKey(p.name)
    return `${safeKey}:${makeTypeOf(makeParameterSchema(p), aliases)}`
  })
  return props.length > 0 ? `{param:{${props.join(';')}}}` : undefined
}

function makeQueryPart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const typeStr = makeTypeOf(makeParameterSchema(p), aliases)
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{query:{${props.join(';')}}}` : undefined
}

function makeHeaderPart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const typeStr = makeTypeOf(makeParameterSchema(p), aliases)
    const safeKey = makeSafeKey(p.name)
    return p.required ? `${safeKey}:${typeStr}` : `${safeKey}?:${typeStr}|undefined`
  })
  return props.length > 0 ? `{header:{${props.join(';')}}}` : undefined
}

function makeCookiePart(params: readonly Parameter[], aliases: Aliases) {
  const props = params.map((p) => {
    const typeStr = makeTypeOf(makeParameterSchema(p), aliases)
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
  // A body that is neither JSON nor a form (`text/plain`, `application/xml`) is not
  // validated by @hono/zod-openapi, and is no part of the route's input.
  const jsonTypes = [
    ...new Set(
      mediaEntries
        .filter(([mediaType]) => isJsonMediaType(mediaType))
        .map(([, media]) => makeTypeOf(media.schema, aliases)),
    ),
  ]
  const formTypes = [
    ...new Set(
      mediaEntries
        .filter(([mediaType]) => isFormMediaType(mediaType))
        .map(([, media]) => makeTypeOf(media.schema, aliases)),
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
  return Object.entries(responses ?? {}).flatMap(([statusCode, response]) => {
    const resolvedResponse = makeResolvedResponse(response, aliases.components)
    const status = statusCodeToNumber(statusCode)
    // Hono's `Schema` takes only a `StatusCode`, and @hono/zod-openapi leaves any other
    // code out of the route's type, so the map leaves it out too.
    if (!HONO_STATUS_CODES.has(status)) return []
    const mediaEntries = Object.entries(resolvedResponse.content ?? {}).filter(
      (entry): entry is [string, { schema: Schema }] => isMediaWithSchema(entry[1]),
    )
    // A response whose media types all lack a schema is written without `content` in
    // the route, so it is typed like a response without content.
    if (mediaEntries.length === 0) {
      return [`{input:${inputType};output:{};outputFormat:string;status:${status}}`]
    }
    const outputs = mediaEntries.map(([mediaType, media]) => {
      // @hono/zod-openapi types the body of a JSON media type and of `text/plain…` alone.
      // Any other one (`application/xml`) is a bare `Response` there, and here a response
      // whose body is not typed, like one without content: the status is known, and the
      // body is read as text (#633).
      const outputFormat = isJsonMediaType(mediaType)
        ? "'json'"
        : mediaType.startsWith('text/plain')
          ? "'text'"
          : undefined
      return outputFormat === undefined
        ? `{input:${inputType};output:{};outputFormat:string;status:${status}}`
        : `{input:${inputType};output:${makeTypeOf(media.schema, aliases)};outputFormat:${outputFormat};status:${status}}`
    })
    // Two media types that are not typed say the same of one status: once is enough.
    return outputs.filter((output, index) => outputs.indexOf(output) === index)
  })
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
  if (typeof requestBody !== 'object' || requestBody === null) return undefined
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

function makeParameterSchema(parameter: Parameter) {
  if (parameter.content) {
    const firstKey = Object.keys(parameter.content)[0]
    if (firstKey && parameter.content[firstKey]?.schema) {
      return parameter.content[firstKey].schema
    }
  }
  return parameter.schema ?? {}
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
