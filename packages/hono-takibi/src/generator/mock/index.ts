import {
  isHttpMethod,
  isMediaWithSchema,
  isOperation,
  isRefObject,
  isSecurityArray,
  isSecurityScheme,
} from '../../guard/index.js'
import type { OpenAPI, Responses, Schema } from '../../openapi/index.js'
import { methodPath } from '../../utils/index.js'
import { schemaToFaker } from '../test/faker-mapping.js'
import { componentsCode } from '../zod-openapi-hono/openapi/components/index.js'
import { routeCode } from '../zod-openapi-hono/openapi/routes/index.js'

/* ── Schema ref collection ─────────────────────────────────────────── */

function collectRefs(schema: Schema, refs: Set<string> = new Set()): Set<string> {
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
    for (const s of schema.allOf) collectRefs(s, refs)
  }
  if (schema.oneOf) {
    for (const s of schema.oneOf) collectRefs(s, refs)
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) collectRefs(s, refs)
  }
  return refs
}

function collectAllDependencies(
  refName: string,
  schemas: { readonly [k: string]: Schema },
  visited: Set<string> = new Set(),
): Set<string> {
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

function detectCircularSchemas(schemas: { readonly [k: string]: Schema }): Set<string> {
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
        if (s) for (const r of collectRefs(s)) stack.push(r)
      }
      if (circular.has(name)) break
    }
  }
  return circular
}

/* ── Mock function generation ──────────────────────────────────────── */

/**
 * Generate mock function for a schema
 */
function generateMockFunction(
  name: string,
  schema: Schema,
  schemas: { readonly [k: string]: Schema },
  isCircular: boolean,
): string {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  const returnType = isCircular ? ': any' : ''
  return `function mock${name}()${returnType} {\n  return ${mockBody}\n}`
}

/* ── Security helpers ──────────────────────────────────────────────── */

type SecurityInfo = {
  readonly type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  readonly name: string
  readonly in?: 'header' | 'query' | 'cookie'
}

function extractSecurityInfo(
  opSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  globalSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  securitySchemes: { readonly [k: string]: unknown } | undefined,
): readonly SecurityInfo[] {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  return securityDefs.flatMap((secDef) =>
    Object.keys(secDef).flatMap((schemeName): readonly SecurityInfo[] => {
      const scheme = securitySchemes?.[schemeName]
      if (!(scheme && isSecurityScheme(scheme))) return []
      if (scheme.type === 'http' && scheme.scheme === 'bearer') {
        return [{ type: 'bearer', name: 'Authorization' }]
      }
      if (scheme.type === 'http' && scheme.scheme === 'basic') {
        return [{ type: 'basic', name: 'Authorization' }]
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
        ]
      }
      if (scheme.type === 'oauth2') {
        return [{ type: 'oauth2', name: 'Authorization' }]
      }
      return []
    }),
  )
}

/* ── Request body type guard ───────────────────────────────────────── */

function hasRequestBodyContent(
  op: unknown,
): op is { requestBody: { content: { readonly [k: string]: unknown } } } {
  if (typeof op !== 'object' || op === null) return false
  if (!('requestBody' in op)) return false
  const opWithBody: { requestBody?: unknown } = op
  const rb = opWithBody.requestBody
  if (typeof rb !== 'object' || rb === null) return false
  return 'content' in rb
}

/* ── JSON content type filter ──────────────────────────────────────── */

/**
 * Filter OpenAPI spec to only include JSON content types for request bodies.
 * This is needed because @hono/zod-openapi doesn't correctly handle multiple content types.
 */
function filterToJsonContentTypes(openapi: OpenAPI): OpenAPI {
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace']
  const filteredPaths = Object.fromEntries(
    Object.entries(openapi.paths).map(([path, pathItem]) => {
      const filteredPathItem = Object.fromEntries(
        Object.entries(pathItem).map(([key, value]) => {
          if (!httpMethods.includes(key)) return [key, value]
          if (!hasRequestBodyContent(value)) return [key, value]
          const jsonContent = value.requestBody.content['application/json']
          if (!jsonContent) return [key, value]
          return [
            key,
            {
              ...value,
              requestBody: { ...value.requestBody, content: { 'application/json': jsonContent } },
            },
          ]
        }),
      )
      return [path, filteredPathItem]
    }),
  )
  return { ...openapi, paths: filteredPaths }
}

/* ── Response resolution ───────────────────────────────────────────── */

/**
 * Resolves a Responses object, following $ref to components.responses if needed.
 */
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
 * Determines the HTTP status code for a successful response.
 * Prefers 200 OK, then 201 Created, fallback to 204 No Content.
 */
function determineSuccessStatus(responses: { readonly [k: string]: Responses }): number {
  if (responses[String(200)]) return 200
  if (responses[String(201)]) return 201
  return 204
}

/* ── Handler generation ────────────────────────────────────────────── */

type RouteEntry = {
  readonly routeId: string
  readonly method: string
  readonly path: string
  readonly requiresAuth: boolean
}

/**
 * Generates the auth check code for a handler.
 * Only emits a check when the route defines a 401 response.
 */
function makeAuthCheck(security: readonly SecurityInfo[], has401: boolean): string {
  if (!has401 || security.length === 0) return ''
  const authChecks = security.flatMap((sec) => {
    if (sec.type === 'bearer' || sec.type === 'oauth2' || sec.type === 'basic') {
      return [`c.req.header('Authorization')`]
    }
    if (sec.type === 'apiKey') {
      if (sec.in === 'header') return [`c.req.header('${sec.name}')`]
      if (sec.in === 'query') return [`c.req.query('${sec.name}')`]
      if (sec.in === 'cookie') return [`c.req.cookie('${sec.name}')`]
    }
    return []
  })
  if (authChecks.length === 0) return ''
  return `if (!(${authChecks.join(' || ')})) {\n    return c.json({ message: 'Unauthorized' }, ${401})\n  }\n  `
}

/**
 * Generates the response body code for a handler.
 */
function makeHandlerBody(
  statusCode: number,
  jsonSchema: Schema | undefined,
  textSchema: Schema | undefined,
  hasNoContent: boolean,
  schemas: { readonly [k: string]: Schema },
  allRefs: Set<string>,
): string {
  if (jsonSchema) {
    collectRefs(jsonSchema, allRefs)
    const mockData = schemaToFaker(jsonSchema, undefined, { schemas })
    return `return c.json(${mockData}, ${statusCode})`
  }
  if (textSchema) {
    const mockData = schemaToFaker(textSchema, undefined, { schemas })
    return `return c.text(${mockData}, ${statusCode})`
  }
  if (hasNoContent) return `return new Response(null, { status: ${204} })`
  return `return c.body(null, ${200})`
}

/* ── Main export ───────────────────────────────────────────────────── */

export function makeMock(
  openapi: OpenAPI,
  basePath: string,
  options: {
    readonly readonly?: boolean | undefined
  } = {},
): string {
  // Filter to JSON-only content types to work around @hono/zod-openapi issue
  const filteredOpenapi = filterToJsonContentTypes(openapi)
  const paths = filteredOpenapi.paths
  const schemas = openapi.components?.schemas ?? {}
  const securitySchemes = openapi.components?.securitySchemes
  const componentResponses = openapi.components?.responses

  // Collect all refs used in responses
  const allRefs = new Set<string>()

  // Process each path/method into route entries and handler code
  const processed = Object.entries(paths).flatMap(([p, pathItem]) =>
    Object.entries(pathItem).flatMap(
      ([method, operation]): readonly {
        readonly entry: RouteEntry
        readonly handler: string
      }[] => {
        if (!(isHttpMethod(method) && isOperation(operation))) return []

        const routeId = methodPath(method, p)
        const op = operation

        const security = extractSecurityInfo(
          isSecurityArray(op.security) ? op.security : undefined,
          isSecurityArray(openapi.security) ? openapi.security : undefined,
          securitySchemes,
        )
        const requiresAuth = security.length > 0

        const successResponse = resolveResponse(
          op.responses?.[String(200)] ?? op.responses?.[String(201)] ?? op.responses?.[String(204)],
          componentResponses,
        )
        const jsonMedia = successResponse?.content?.['application/json']
        const textMedia = successResponse?.content?.['text/plain']
        const jsonSchema = jsonMedia && isMediaWithSchema(jsonMedia) ? jsonMedia.schema : undefined
        const textSchema = textMedia && isMediaWithSchema(textMedia) ? textMedia.schema : undefined

        const statusCode = determineSuccessStatus(op.responses)
        const handlerBody = makeHandlerBody(
          statusCode,
          jsonSchema,
          textSchema,
          op.responses?.[String(204)] !== undefined,
          schemas,
          allRefs,
        )

        // Generate auth check code only when route defines a 401 Unauthorized response
        const has401 = op.responses?.[String(401)] !== undefined
        const authCheck = makeAuthCheck(security, has401)

        const handler = `const ${routeId}RouteHandler: RouteHandler<typeof ${routeId}Route> = async (c) => {\n  ${authCheck}${handlerBody}\n}`

        return [{ entry: { routeId, method, path: p, requiresAuth }, handler }]
      },
    ),
  )

  const routeEntries = processed.map(({ entry }) => entry)
  const handlers = processed.map(({ handler }) => handler)

  // Collect all dependencies recursively
  const allDeps = new Set<string>()
  for (const ref of allRefs) {
    collectAllDependencies(ref, schemas, allDeps)
  }

  // Sort by dependency order
  const sortedRefs = topologicalSort(allDeps, schemas)

  // Detect circular schemas for return type annotation
  const circularSchemas = detectCircularSchemas(schemas)

  // Generate mock functions in dependency order
  const mockFunctions = sortedRefs
    .filter((refName) => schemas[refName])
    .map((refName) =>
      generateMockFunction(refName, schemas[refName], schemas, circularSchemas.has(refName)),
    )

  // Generate components code (schemas)
  const components = openapi.components
    ? componentsCode(openapi.components, {
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
        readonly: options.readonly,
      })
    : ''

  // Generate routes code (using filtered openapi with JSON-only content types)
  const routes = routeCode(filteredOpenapi, options.readonly)

  // Generate app setup
  const appSetup = routeEntries
    .map(({ routeId }) => `.openapi(${routeId}Route, ${routeId}RouteHandler)`)
    .join('\n  ')

  // Build the final file
  const imports = `import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'`

  const appCode = `const app = new OpenAPIHono()${basePath !== '/' ? `.basePath('${basePath}')` : ''}

export const api = app
  ${appSetup}

export default app`

  return [
    imports,
    '',
    components,
    '',
    routes,
    '',
    mockFunctions.join('\n\n'),
    '',
    handlers.join('\n\n'),
    '',
    appCode,
  ].join('\n')
}
