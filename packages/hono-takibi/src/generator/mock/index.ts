import {
  isHttpMethod,
  isMediaWithSchema,
  isOperation,
  isRefObject,
  isSecurityArray,
  isSecurityScheme,
} from '../../guard/index.js'
import type {
  Components,
  Media,
  OpenAPI,
  Operation,
  Parameter,
  Responses,
  Schema,
} from '../../openapi/index.js'
import {
  ensureSuffix,
  methodPath,
  statusCodeToNumber,
  toIdentifierPascalCase,
} from '../../utils/index.js'
import { schemaToFaker } from '../test/faker-mapping.js'
import { componentsCode } from '../zod-openapi-hono/openapi/components/index.js'
import { routeCode } from '../zod-openapi-hono/openapi/routes/index.js'

function collectRefs(schema: Schema, refs: Set<string> = new Set()) {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').at(-1)
    if (refName) refs.add(refName)
  }
  if (schema.items) {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items]
    for (const item of items) {
      collectRefs(item, refs)
    }
  }
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      collectRefs(prop, refs)
    }
  }
  if (schema.allOf) {
    for (const s of schema.allOf) {
      collectRefs(s, refs)
    }
  }
  if (schema.oneOf) {
    for (const s of schema.oneOf) {
      collectRefs(s, refs)
    }
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) {
      collectRefs(s, refs)
    }
  }
  return refs
}

function collectAllDependencies(
  refName: string,
  schemas: { readonly [k: string]: Schema },
  visited: Set<string> = new Set(),
) {
  if (visited.has(refName)) return visited
  visited.add(refName)
  const schema = schemas[refName]
  if (!schema) return visited
  const deps = collectRefs(schema)
  for (const dep of deps) {
    collectAllDependencies(dep, schemas, visited)
  }
  return visited
}

function topologicalSort(
  refs: Set<string>,
  schemas: { readonly [k: string]: Schema },
): readonly string[] {
  const visited = new Set<string>()
  const result: string[] = []
  function visit(name: string) {
    if (visited.has(name)) return
    visited.add(name)
    const schema = schemas[name]
    if (schema) {
      const deps = collectRefs(schema)
      for (const dep of deps) {
        if (refs.has(dep)) visit(dep)
      }
    }
    result.push(name)
  }
  for (const ref of refs) {
    visit(ref)
  }
  return result
}

function detectCircularSchemas(schemas: { readonly [k: string]: Schema }) {
  const circular = new Set<string>()
  for (const name of Object.keys(schemas)) {
    const schema = schemas[name]
    if (!schema) continue
    for (const dep of collectRefs(schema)) {
      if (dep === name) {
        circular.add(name)
        break
      }
      const visited = new Set<string>()
      const stack = [dep]
      while (stack.length > 0) {
        const current = stack[stack.length - 1]
        stack.length -= 1
        if (current === undefined) break
        if (current === name) {
          circular.add(name)
          break
        }
        if (visited.has(current)) continue
        visited.add(current)
        const s = schemas[current]
        if (s) {
          for (const r of collectRefs(s)) {
            stack.push(r)
          }
        }
      }
      if (circular.has(name)) break
    }
  }
  return circular
}

// Collects every `#/components/schemas/X` reference reachable by walking an
// arbitrary OpenAPI node (parameters, request bodies, responses, headers,
// nested schemas — including `additionalProperties` and `not`). A generic walk
// is used instead of the schema-shaped `collectRefs` so no reference position
// is missed: under-collection would drop a const a route references (TS2304),
// whereas over-collection only risks a harmless unused-var.
function collectSchemaRefs(node: unknown, refs: Set<string>): Set<string> {
  if (Array.isArray(node)) {
    for (const item of node) collectSchemaRefs(item, refs)
    return refs
  }
  if (node !== null && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (key === '$ref' && typeof value === 'string' && value.includes('/components/schemas/')) {
        const name = value.split('/').at(-1)
        if (name) refs.add(name)
      } else {
        collectSchemaRefs(value, refs)
      }
    }
  }
  return refs
}

// Expands a set of root schema names to its transitive closure through the
// component schema map. A schema referenced only by an unreferenced schema is
// excluded, so base models reached via `is`/`allOf` from an unused model are
// dropped (no unused-var) while everything a route actually needs is kept.
function schemaClosure(roots: Set<string>, schemas: { readonly [k: string]: Schema }) {
  const used = new Set<string>()
  const stack = [...roots]
  while (stack.length > 0) {
    const name = stack.pop()
    if (name === undefined || used.has(name)) continue
    used.add(name)
    const schema = schemas[name]
    if (schema) {
      for (const ref of collectSchemaRefs(schema, new Set<string>())) {
        if (!used.has(ref)) stack.push(ref)
      }
    }
  }
  return used
}

function makeMockFunction(
  name: string,
  schema: Schema,
  schemas: { readonly [k: string]: Schema },
  isCircular: boolean,
) {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  const returnType = isCircular ? ': any' : ''
  // When the schema is annotated with `x-brand`, the corresponding zod schema
  // is `.brand<"X">()` and the inferred type is `T & $brand<"X">`. The faker
  // call alone produces the un-branded `T` (e.g. plain `string`), which the
  // route handler refuses to accept (`string` vs `string & $brand<"UserId">`).
  // Cast via `z.infer<typeof <Name>Schema>` to satisfy the type without any
  // runtime overhead — branding is a TS-only construct so the assertion is
  // safe; an `as` cast is the standard escape hatch for nominal brand types.
  // The cast target must match the emitted const name, which `helper/schema.ts`
  // derives as `toIdentifierPascalCase(ensureSuffix(name, 'Schema'))` — using
  // the raw name here would mis-case it (e.g. `userIdSchema` vs `UserIdSchema`).
  const sanitized = name.replace(/\./g, '')
  const schemaConst = toIdentifierPascalCase(ensureSuffix(name, 'Schema'))
  const body = schema['x-brand'] ? `${mockBody} as z.infer<typeof ${schemaConst}>` : mockBody
  return `function mock${sanitized}()${returnType}{return ${body}}` as const
}

function extractSecurityInfo(
  opSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  globalSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  securitySchemes: { readonly [k: string]: unknown } | undefined,
) {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  return securityDefs.flatMap((secDef) =>
    Object.keys(secDef).flatMap(
      (
        schemeName,
      ): readonly {
        readonly type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
        readonly name: string
        readonly in?: 'header' | 'query' | 'cookie'
      }[] => {
        const scheme = securitySchemes?.[schemeName]
        if (!(scheme && isSecurityScheme(scheme))) return [] as const
        if (scheme.type === 'http' && scheme.scheme === 'bearer') {
          return [{ type: 'bearer', name: 'Authorization' }] as const
        }
        if (scheme.type === 'http' && scheme.scheme === 'basic') {
          return [{ type: 'basic', name: 'Authorization' }] as const
        }
        if (scheme.type === 'apiKey') {
          const inLocation =
            scheme.in === 'header' || scheme.in === 'query' || scheme.in === 'cookie'
              ? scheme.in
              : 'header'
          return [
            {
              type: 'apiKey',
              name: scheme.name || 'X-API-Key',
              in: inLocation,
            },
          ] as const
        }
        if (scheme.type === 'oauth2') {
          return [{ type: 'oauth2', name: 'Authorization' }] as const
        }
        return [] as const
      },
    ),
  )
}

function hasRequestBodyContent(
  operation: unknown,
): operation is { requestBody: { content: { readonly [k: string]: unknown } } } {
  if (typeof operation !== 'object' || operation === null) return false
  if (!('requestBody' in operation)) return false
  if (typeof operation.requestBody !== 'object' || operation.requestBody === null) return false
  return 'content' in operation.requestBody
}

/**
 * Filter OpenAPI spec to only include JSON content types for request bodies.
 * This is needed because @hono/zod-openapi doesn't correctly handle multiple content types.
 */
function filterToJsonContentTypes(openapi: OpenAPI) {
  const filteredPaths = Object.fromEntries(
    Object.entries(openapi.paths).map(([path, pathItem]) => {
      const filteredPathItem = Object.fromEntries(
        Object.entries(pathItem).map(([k, v]) => {
          if (!['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'].includes(k))
            return [k, v]
          if (!hasRequestBodyContent(v)) return [k, v]
          const jsonContent = v.requestBody.content['application/json']
          if (!jsonContent) return [k, v]
          return [
            k,
            {
              ...v,
              requestBody: { ...v.requestBody, content: { 'application/json': jsonContent } },
            },
          ]
        }),
      )
      return [path, filteredPathItem]
    }),
  )
  return { ...openapi, paths: filteredPaths }
}

function resolveResponse(
  response: Responses | undefined,
  componentResponses: { readonly [k: string]: Responses } | undefined,
): Responses | undefined {
  if (!response) return undefined
  if (isRefObject(response) && response.$ref) {
    const refName = response.$ref.split('/').at(-1)
    return refName ? componentResponses?.[refName] : undefined
  }
  return response
}

/**
 * Resolves the representative success response for a mock handler.
 *
 * Mirrors the route generator's status mapping (`statusCodeToNumber`): explicit
 * `200`/`201`/`204` win, then `default`, then the lowest remaining 2xx (including
 * the `2XX` wildcard). Status and response are returned together so the emitted
 * body and its status code are always derived from the same response key.
 */
function resolveSuccessResponse(
  responses: { readonly [k: string]: Responses } | undefined,
  componentResponses: { readonly [k: string]: Responses } | undefined,
) {
  if (!responses) return undefined
  const keys = Object.keys(responses)
  const priority = ['200', '201', '204', 'default'].filter((key) => keys.includes(key))
  const others = keys
    .filter(
      (key) =>
        !priority.includes(key) && statusCodeToNumber(key) >= 200 && statusCodeToNumber(key) < 300,
    )
    .sort((a, b) => statusCodeToNumber(a) - statusCodeToNumber(b))
  const key = [...priority, ...others][0]
  if (!key) return undefined
  return {
    statusCode: statusCodeToNumber(key),
    response: resolveResponse(responses[key], componentResponses),
  }
}

/**
 * Generates the auth check code for a handler.
 * Only emits a check when the route defines a 401 response.
 */
function makeAuthCheck(
  security: readonly {
    readonly type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
    readonly name: string
    readonly in?: 'header' | 'query' | 'cookie'
  }[],
  has401: boolean,
) {
  if (!has401 || security.length === 0) return ''
  const authChecks = security.flatMap((sec) => {
    if (sec.type === 'bearer' || sec.type === 'oauth2' || sec.type === 'basic') {
      return [`c.req.header('Authorization')`]
    }
    if (sec.type === 'apiKey') {
      if (sec.in === 'header') return [`c.req.header('${sec.name}')`]
      if (sec.in === 'query') return [`c.req.query('${sec.name}')`]
      // Hono's request object does not expose a `.cookie()` accessor; cookies
      // must come from the `hono/cookie` helper. Caller is responsible for
      // emitting the matching `import { getCookie } from 'hono/cookie'`.
      if (sec.in === 'cookie') return [`getCookie(c, '${sec.name}')`]
    }
    return []
  })
  if (authChecks.length === 0) return ''
  return `if(!(${authChecks.join(' || ')})){return c.json({ message: 'Unauthorized' }, 401)}`
}

// Reads a media object's representative example. Mirrors the docs generator's
// `extractMediaExample`: `example` (singular) wins, otherwise the first entry of
// `examples`. `$ref` entries resolve against `components.examples`;
// `externalValue`-only entries yield `undefined` (the value lives outside the
// document) so the handler falls back to faker.
function extractMediaExample(media: Media, components: Components | undefined): unknown {
  if (media.example !== undefined) return media.example
  if (!media.examples) return undefined
  const first = Object.values(media.examples)[0]
  if (!first) return undefined
  if ('$ref' in first && typeof first.$ref === 'string') {
    const name = first.$ref.split('/').at(-1)
    const resolved = name ? components?.examples?.[name] : undefined
    return resolved && 'value' in resolved ? resolved.value : undefined
  }
  return 'value' in first ? first.value : undefined
}

// Pagination query-parameter conventions. `cursor`/opaque tokens are excluded:
// they cannot be turned into an array offset, so a `cursor`-only endpoint stays
// on the plain (non-sliced) path.
const PAGE_PARAM_NAMES: readonly string[] = ['page', 'pageNumber', 'page_number']
const OFFSET_PARAM_NAMES: readonly string[] = ['offset', 'skip']
const ROWS_PARAM_NAMES: readonly string[] = [
  'rows',
  'limit',
  'perPage',
  'per_page',
  'pageSize',
  'page_size',
  'size',
  'take',
]

// Detects page-size and page/offset query params on an `x-pagination` operation.
// Returns `undefined` unless both a page-size param and a page/offset param are
// present, so `c.req.valid('query')` is only emitted when the route actually
// declares a query schema with those keys.
function detectPagination(operation: Operation) {
  if (operation['x-pagination'] !== true) return undefined
  const queryParams = (operation.parameters ?? []).filter(
    (p): p is Parameter => 'in' in p && p.in === 'query',
  )
  const rows = queryParams.find((p) => ROWS_PARAM_NAMES.includes(p.name))
  if (!rows) return undefined
  const pageParam = queryParams.find((p) => PAGE_PARAM_NAMES.includes(p.name))
  const offsetParam = pageParam
    ? undefined
    : queryParams.find((p) => OFFSET_PARAM_NAMES.includes(p.name))
  const cursor = pageParam ?? offsetParam
  if (!cursor) return undefined
  const defaultRows = typeof rows.schema?.default === 'number' ? rows.schema.default : 20
  return {
    rowsParam: rows.name,
    cursorParam: cursor.name,
    offsetStyle: offsetParam !== undefined,
    defaultRows,
  } as const
}

function makeHandlerBody(args: {
  readonly statusCode: number
  readonly jsonSchema: Schema | undefined
  readonly textSchema: Schema | undefined
  readonly schemas: { readonly [k: string]: Schema }
  readonly allRefs: Set<string>
  readonly exampleValue: unknown
  readonly exampleCast: string | undefined
  readonly pagination:
    | {
        readonly totalConst: string
        readonly rowsParam: string
        readonly cursorParam: string
        readonly offsetStyle: boolean
        readonly defaultRows: number
      }
    | undefined
}) {
  const {
    statusCode,
    jsonSchema,
    textSchema,
    schemas,
    allRefs,
    exampleValue,
    exampleCast,
    pagination,
  } = args
  // A spec-authored example is the strongest signal of intent: return it
  // verbatim instead of faker. The cast mirrors the `x-brand` handling — an
  // authored literal can be widened (e.g. `string` vs an enum/branded member),
  // so it is pinned to the success schema's inferred type when that schema is a
  // named `$ref`.
  if (exampleValue !== undefined) {
    const cast = exampleCast ? ` as z.infer<typeof ${exampleCast}>` : ''
    return `return c.json(${JSON.stringify(exampleValue)}${cast}, ${statusCode})`
  }
  if (pagination && jsonSchema?.type === 'array' && jsonSchema.items) {
    collectRefs(jsonSchema, allRefs)
    const itemSchema = Array.isArray(jsonSchema.items) ? jsonSchema.items[0] : jsonSchema.items
    const itemFaker = schemaToFaker(itemSchema, undefined, { schemas })
    // `valid('query')` returns the coerced query (the route declares these as
    // `z.coerce.number().default(...)`), so `rows`/`page` are already numbers.
    // The pool size is a module-scope constant (not re-rolled per request) so
    // page count is stable: the last page is reliably shorter than `rows`,
    // which is what an infinite-query `getNextPageParam` checks to stop.
    const startExpr = pagination.offsetStyle
      ? `const start = query.${pagination.cursorParam} ?? 0`
      : `const page = query.${pagination.cursorParam} ?? 1\nconst start = (page - 1) * rows`
    return `const query = c.req.valid('query')
const rows = query.${pagination.rowsParam} ?? ${pagination.defaultRows}
${startExpr}
const items = Array.from({ length: ${pagination.totalConst} }, () => (${itemFaker}))
return c.json(items.slice(start, start + rows), ${statusCode})`
  }
  if (jsonSchema) {
    collectRefs(jsonSchema, allRefs)
    const mockData = schemaToFaker(jsonSchema, undefined, { schemas })
    return `return c.json(${mockData}, ${statusCode})`
  }
  if (textSchema) {
    const mockData = schemaToFaker(textSchema, undefined, { schemas })
    return `return c.text(${mockData}, ${statusCode})`
  }
  if (statusCode === 204) return `return new Response(null, { status: 204 })`
  return `return c.body(null, ${statusCode})`
}

export function makeMock(
  openapi: OpenAPI,
  basePath: string,
  options: {
    readonly readonly?: boolean
  } = {},
) {
  const filteredOpenapi = filterToJsonContentTypes(openapi)
  const paths = filteredOpenapi.paths
  const schemas = openapi.components?.schemas ?? {}
  const securitySchemes = openapi.components?.securitySchemes
  const componentResponses = openapi.components?.responses
  const allRefs = new Set<string>()
  const processed = Object.entries(paths).flatMap(([p, pathItem]) =>
    Object.entries(pathItem).flatMap(([method, operation]) => {
      if (!(isHttpMethod(method) && isOperation(operation))) return []
      const routeId = methodPath(method, p)
      const security = extractSecurityInfo(
        isSecurityArray(operation.security) ? operation.security : undefined,
        isSecurityArray(openapi.security) ? openapi.security : undefined,
        securitySchemes,
      )
      const requiresAuth = security.length > 0
      const success = resolveSuccessResponse(operation.responses, componentResponses)
      const statusCode = success?.statusCode ?? 200
      const successResponse = success?.response
      const jsonMedia = successResponse?.content?.['application/json']
      const textMedia = successResponse?.content?.['text/plain']
      const jsonSchema = jsonMedia && isMediaWithSchema(jsonMedia) ? jsonMedia.schema : undefined
      const textSchema = textMedia && isMediaWithSchema(textMedia) ? textMedia.schema : undefined
      const exampleValue = jsonMedia
        ? extractMediaExample(jsonMedia, openapi.components)
        : undefined
      const exampleCast =
        exampleValue !== undefined && jsonSchema?.$ref
          ? toIdentifierPascalCase(ensureSuffix(jsonSchema.$ref.split('/').at(-1) ?? '', 'Schema'))
          : undefined
      const pag = detectPagination(operation)
      // Pagination slicing applies only to a bare-array success response with no
      // authored example (example wins). The pool-size constant is hoisted to
      // module scope so repeated requests to the same page are stable.
      const pagination =
        pag && exampleValue === undefined && jsonSchema?.type === 'array' && jsonSchema.items
          ? { totalConst: `${routeId}Total`, ...pag }
          : undefined
      const handlerBody = makeHandlerBody({
        statusCode,
        jsonSchema,
        textSchema,
        schemas,
        allRefs,
        exampleValue,
        exampleCast,
        pagination,
      })
      // Pool size is hoisted to module scope (stable across requests) and capped
      // so a hostile spec `default` (e.g. `default: 1e9`) cannot blow up the
      // `Array.from({ length })` allocation at mock startup.
      const paginationDecl = pagination
        ? `const ${pagination.totalConst} = faker.number.int({ min: 0, max: ${Math.min(pagination.defaultRows * 3, 3000)} })`
        : ''
      // Generate auth check code only when route defines a 401 Unauthorized response
      const has401 = operation.responses?.[String(401)] !== undefined
      const authCheck = makeAuthCheck(security, has401)
      const usesContext = handlerBody.includes('c.') || authCheck !== ''
      const param = usesContext ? 'c' : '_c'
      const handler = `const ${routeId}RouteHandler: RouteHandler<typeof ${routeId}Route> = async (${param}) => {${authCheck}${handlerBody}}`
      return [{ entry: { routeId, method, path: p, requiresAuth }, handler, paginationDecl }]
    }),
  )
  const routeMetas = processed.map(({ entry }) => entry)
  const handlers = processed.map(({ handler }) => handler)
  const paginationDecls = processed.flatMap(({ paginationDecl }) =>
    paginationDecl.length > 0 ? [paginationDecl] : [],
  )
  const allDeps = new Set<string>()
  for (const ref of allRefs) {
    collectAllDependencies(ref, schemas, allDeps)
  }
  const sortedRefs = topologicalSort(allDeps, schemas)
  const circularSchemas = detectCircularSchemas(schemas)
  const mockFunctions = sortedRefs
    .filter((refName) => schemas[refName])
    .map((refName) =>
      makeMockFunction(refName, schemas[refName], schemas, circularSchemas.has(refName)),
    )
  // Emit only the schema consts a route can reach. Roots are every
  // `#/components/schemas/X` referenced from the paths and from the non-schema
  // component objects a route may `$ref` (responses, parameters, request
  // bodies, headers); the closure then pulls in their transitive deps. Base
  // models reached only via `is`/`allOf` from an unused model fall away (no
  // unused-var), while everything `routeCode` references stays.
  const rootRefs = collectSchemaRefs(filteredOpenapi.paths, new Set<string>())
  if (openapi.components) {
    collectSchemaRefs(openapi.components.responses, rootRefs)
    collectSchemaRefs(openapi.components.parameters, rootRefs)
    collectSchemaRefs(openapi.components.requestBodies, rootRefs)
    collectSchemaRefs(openapi.components.headers, rootRefs)
    collectSchemaRefs(openapi.components.callbacks, rootRefs)
    collectSchemaRefs(openapi.components.pathItems, rootRefs)
    collectSchemaRefs(openapi.components.links, rootRefs)
  }
  const usedSchemaNames = schemaClosure(rootRefs, schemas)
  const filteredComponents = openapi.components
    ? {
        ...openapi.components,
        schemas: Object.fromEntries(
          Object.entries(schemas).filter(([name]) => usedSchemaNames.has(name)),
        ),
      }
    : undefined
  const components = filteredComponents
    ? componentsCode(filteredComponents, {
        exportSchemasTypes: false,
        exportSchemas: false,
        exportParametersTypes: false,
        exportParameters: false,
        exportSecuritySchemes: false,
        exportRequestBodies: false,
        exportResponses: false,
        exportHeadersTypes: false,
        exportHeaders: false,
        exportExamples: false,
        exportLinks: false,
        exportCallbacks: false,
        exportPathItems: false,
        exportMediaTypes: false,
        exportMediaTypesTypes: false,
        ...(options.readonly !== undefined ? { readonly: options.readonly } : {}),
      })
    : ''
  const routes = routeCode(filteredOpenapi, options.readonly)
  const appSetup = routeMetas
    .map(({ routeId }) => `.openapi(${routeId}Route, ${routeId}RouteHandler)`)
    .join('')
  const handlersJoined = handlers.join('\n\n')
  const needsCookieImport = handlersJoined.includes('getCookie(c,')
  const imports = `import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'${needsCookieImport ? `\nimport { getCookie } from 'hono/cookie'` : ''}`
  const appCode = `const app = new OpenAPIHono()${basePath !== '/' ? `.basePath('${basePath}')` : ''}

export const api = app${appSetup}

export default app`
  return [
    imports,
    components,
    routes,
    mockFunctions.join('\n\n'),
    paginationDecls.join('\n'),
    handlersJoined,
    appCode,
  ]
    .filter((s) => s.length > 0)
    .join('\n\n')
}
