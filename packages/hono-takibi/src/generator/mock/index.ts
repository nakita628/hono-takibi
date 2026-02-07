/**
 * Single-file mock server generator.
 *
 * Generates a complete mock server in one file with:
 * - Route definitions
 * - Faker-based mock functions
 * - Handler implementations
 * - App setup
 *
 * @module generator/mock
 */
import { isHttpMethod, isOperation, isSecurityArray, isSecurityScheme } from '../../guard/index.js'
import type { OpenAPI, Schema } from '../../openapi/index.js'
import { methodPath } from '../../utils/index.js'
import { schemaToFaker } from '../test/faker-mapping.js'
import { componentsCode } from '../zod-openapi-hono/openapi/components/index.js'
import { routeCode } from '../zod-openapi-hono/openapi/routes/index.js'

function collectRefs(schema: Schema, refs: Set<string> = new Set()): Set<string> {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
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
  schemas: { [key: string]: Schema },
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

function topologicalSort(refs: Set<string>, schemas: { [key: string]: Schema }): string[] {
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

function detectCircularSchemas(schemas: { [key: string]: Schema }): Set<string> {
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
        const current = stack.pop()
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

/**
 * Generate mock function for a schema
 */
function generateMockFunction(
  name: string,
  schema: Schema,
  schemas: { [key: string]: Schema },
  isCircular: boolean,
): string {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  const returnType = isCircular ? ': any' : ''
  return `function mock${name}()${returnType} {\n  return ${mockBody}\n}`
}

type SecurityInfo = {
  type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  name: string
  in?: 'header' | 'query' | 'cookie'
}

function extractSecurityInfo(
  opSecurity: readonly { readonly [key: string]: readonly string[] }[] | undefined,
  globalSecurity: readonly { readonly [key: string]: readonly string[] }[] | undefined,
  securitySchemes: { [key: string]: unknown } | undefined,
): SecurityInfo[] {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  const infos: SecurityInfo[] = []
  for (const secDef of securityDefs) {
    for (const schemeName of Object.keys(secDef)) {
      const scheme = securitySchemes?.[schemeName]
      if (!(scheme && isSecurityScheme(scheme))) continue
      if (scheme.type === 'http' && scheme.scheme === 'bearer') {
        infos.push({ type: 'bearer', name: 'Authorization' })
      } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
        infos.push({ type: 'basic', name: 'Authorization' })
      } else if (scheme.type === 'apiKey') {
        const inLocation =
          scheme.in === 'header' || scheme.in === 'query' || scheme.in === 'cookie'
            ? scheme.in
            : 'header'
        infos.push({
          type: 'apiKey',
          name: scheme.name || 'X-API-Key',
          in: inLocation,
        })
      } else if (scheme.type === 'oauth2') {
        infos.push({ type: 'oauth2', name: 'Authorization' })
      }
    }
  }
  return infos
}

function hasRequestBodyContent(
  op: unknown,
): op is { requestBody: { content: { [key: string]: unknown } } } {
  return (
    typeof op === 'object' &&
    op !== null &&
    'requestBody' in op &&
    typeof (op as { requestBody?: unknown }).requestBody === 'object' &&
    (op as { requestBody: { content?: unknown } }).requestBody !== null &&
    'content' in ((op as { requestBody: { content?: unknown } }).requestBody ?? {})
  )
}

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

export function generateMockServer(
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
  const securitySchemes = openapi.components?.securitySchemes as
    | { [key: string]: { type: string; scheme?: string; name?: string; in?: string } }
    | undefined

  // Collect all refs used in responses
  const allRefs = new Set<string>()

  // Generate route names and handlers
  const routeEntries: { routeId: string; method: string; path: string; requiresAuth: boolean }[] =
    []
  const handlers: string[] = []

  for (const [p, pathItem] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!(isHttpMethod(method) && isOperation(operation))) continue

      const routeId = methodPath(method, p)
      const op = operation

      const security = extractSecurityInfo(
        isSecurityArray(op.security) ? op.security : undefined,
        isSecurityArray(openapi.security) ? openapi.security : undefined,
        securitySchemes,
      )
      const requiresAuth = security.length > 0

      routeEntries.push({ routeId, method, path: p, requiresAuth })

      const responses = openapi.components?.responses as
        | {
            [key: string]: { description?: string; content?: { [ct: string]: { schema?: Schema } } }
          }
        | undefined
      const resolveResponse = (
        r: unknown,
      ): { content?: { [ct: string]: { schema?: Schema } } } | undefined => {
        if (typeof r !== 'object' || r === null) return undefined
        if ('$ref' in r && typeof (r as { $ref: string }).$ref === 'string') {
          const refName = (r as { $ref: string }).$ref.split('/').pop()
          return refName && responses?.[refName] ? responses[refName] : undefined
        }
        return r as { content?: { [ct: string]: { schema?: Schema } } }
      }
      const successResponse = resolveResponse(
        op.responses?.['200'] ?? op.responses?.['201'] ?? op.responses?.['204'],
      )
      const jsonSchema = successResponse?.content?.['application/json']?.schema
      const textSchema = successResponse?.content?.['text/plain']?.schema

      // Determine response status: prefer 200 OK, then 201 Created, fallback to 204 No Content
      const handlerBody = (() => {
        const statusCode = op.responses?.['200'] ? 200 : op.responses?.['201'] ? 201 : 204
        if (jsonSchema) {
          collectRefs(jsonSchema, allRefs)
          const mockData = schemaToFaker(jsonSchema, undefined, { schemas })
          return `return c.json(${mockData}, ${statusCode})`
        }
        if (textSchema) {
          const mockData = schemaToFaker(textSchema, undefined, { schemas })
          return `return c.text(${mockData}, ${statusCode})`
        }
        if (op.responses?.['204']) return 'return new Response(null, { status: 204 })'
        return 'return c.body(null, 200)'
      })()

      // Generate auth check code only when route defines 401 response
      const has401 = op.responses?.['401'] !== undefined
      const authCheck = (() => {
        if (!(requiresAuth && has401)) return ''
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
        return `if (!(${authChecks.join(' || ')})) {\n    return c.json({ message: 'Unauthorized' }, 401)\n  }\n  `
      })()

      handlers.push(
        `const ${routeId}RouteHandler: RouteHandler<typeof ${routeId}Route> = async (c) => {\n  ${authCheck}${handlerBody}\n}`,
      )
    }
  }

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

export type AppType = typeof api

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
