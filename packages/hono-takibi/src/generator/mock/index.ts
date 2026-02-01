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
import type { OpenAPI, Schema } from '../../openapi/index.js'
import { isHttpMethod, methodPath } from '../../utils/index.js'
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
  schemas: Record<string, Schema>,
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

function topologicalSort(refs: Set<string>, schemas: Record<string, Schema>): string[] {
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

/**
 * Generate mock function for a schema
 */
function generateMockFunction(
  name: string,
  schema: Schema,
  schemas: Record<string, Schema>,
): string {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  return `function mock${name}() {\n  return ${mockBody}\n}`
}

interface SecurityInfo {
  type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  name: string
  in?: 'header' | 'query' | 'cookie'
}

function extractSecurityInfo(
  opSecurity: Array<Record<string, string[]>> | undefined,
  globalSecurity: Array<Record<string, string[]>> | undefined,
  securitySchemes:
    | Record<string, { type: string; scheme?: string; name?: string; in?: string }>
    | undefined,
): SecurityInfo[] {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  const infos: SecurityInfo[] = []

  for (const secDef of securityDefs) {
    for (const schemeName of Object.keys(secDef)) {
      const scheme = securitySchemes?.[schemeName]
      if (!scheme) continue

      if (scheme.type === 'http' && scheme.scheme === 'bearer') {
        infos.push({ type: 'bearer', name: 'Authorization' })
      } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
        infos.push({ type: 'basic', name: 'Authorization' })
      } else if (scheme.type === 'apiKey') {
        infos.push({
          type: 'apiKey',
          name: scheme.name || 'X-API-Key',
          in: (scheme.in as 'header' | 'query' | 'cookie') || 'header',
        })
      } else if (scheme.type === 'oauth2') {
        infos.push({ type: 'oauth2', name: 'Authorization' })
      }
    }
  }

  return infos
}

function generateAuthMiddleware(): string {
  return `const authMiddleware = async (c: any, next: any) => {
  const auth = c.req.header('Authorization')
  const apiKey = c.req.header('X-API-Key') || c.req.query('api_key')

  if (!auth && !apiKey) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  await next()
}`
}

/**
 * Filter OpenAPI spec to only include JSON content types for request bodies.
 * This is needed because @hono/zod-openapi doesn't correctly handle multiple content types.
 */
function filterToJsonContentTypes(openapi: OpenAPI): OpenAPI {
  const filteredPaths: typeof openapi.paths = {}

  for (const [path, pathItem] of Object.entries(openapi.paths)) {
    const filteredPathItem: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(pathItem)) {
      if (['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'].includes(key)) {
        const operation = value as { requestBody?: { content?: Record<string, unknown> } }
        if (operation.requestBody?.content) {
          const jsonContent = operation.requestBody.content['application/json']
          if (jsonContent) {
            filteredPathItem[key] = {
              ...operation,
              requestBody: {
                ...operation.requestBody,
                content: { 'application/json': jsonContent },
              },
            }
          } else {
            filteredPathItem[key] = operation
          }
        } else {
          filteredPathItem[key] = operation
        }
      } else {
        filteredPathItem[key] = value
      }
    }

    filteredPaths[path] = filteredPathItem as typeof pathItem
  }

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
    | Record<string, { type: string; scheme?: string; name?: string; in?: string }>
    | undefined

  // Collect all refs used in responses
  const allRefs = new Set<string>()

  // Generate route names and handlers
  const routeEntries: { routeId: string; method: string; path: string; requiresAuth: boolean }[] =
    []
  const handlers: string[] = []
  let hasAuthRoutes = false

  for (const [p, pathItem] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!isHttpMethod(method)) continue

      const routeId = methodPath(method, p)

      const op = operation as {
        security?: Array<Record<string, string[]>>
        responses?: Record<string, { content?: Record<string, { schema?: Schema }> }>
      }

      const security = extractSecurityInfo(op.security, openapi.security, securitySchemes)
      const requiresAuth = security.length > 0
      if (requiresAuth) hasAuthRoutes = true

      routeEntries.push({ routeId, method, path: p, requiresAuth })

      const successResponse =
        op.responses?.['200'] ?? op.responses?.['201'] ?? op.responses?.['204']
      const responseSchema = successResponse?.content?.['application/json']?.schema

      let handlerBody: string
      if (responseSchema) {
        collectRefs(responseSchema, allRefs)
        const mockData = schemaToFaker(responseSchema, undefined, { schemas })
        const statusCode = op.responses?.['200'] ? 200 : op.responses?.['201'] ? 201 : 204
        handlerBody = `return c.json(${mockData}, ${statusCode})`
      } else {
        const statusCode = op.responses?.['204'] ? 204 : 200
        handlerBody = `return c.body(null, ${statusCode})`
      }

      let authCheck = ''
      if (requiresAuth) {
        const authChecks: string[] = []
        for (const sec of security) {
          if (sec.type === 'bearer' || sec.type === 'oauth2' || sec.type === 'basic') {
            authChecks.push(`c.req.header('Authorization')`)
          } else if (sec.type === 'apiKey') {
            if (sec.in === 'header') {
              authChecks.push(`c.req.header('${sec.name}')`)
            } else if (sec.in === 'query') {
              authChecks.push(`c.req.query('${sec.name}')`)
            } else if (sec.in === 'cookie') {
              authChecks.push(`c.req.cookie('${sec.name}')`)
            }
          }
        }
        if (authChecks.length > 0) {
          authCheck = `if (!(${authChecks.join(' || ')})) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  `
        }
      }

      handlers.push(`const ${routeId}RouteHandler: RouteHandler<typeof ${routeId}Route> = async (c) => {
  ${authCheck}${handlerBody}
}`)
    }
  }

  // Collect all dependencies recursively
  const allDeps = new Set<string>()
  for (const ref of allRefs) {
    collectAllDependencies(ref, schemas, allDeps)
  }

  // Sort by dependency order
  const sortedRefs = topologicalSort(allDeps, schemas)

  // Generate mock functions in dependency order
  const mockFunctions = sortedRefs
    .filter((refName) => schemas[refName])
    .map((refName) => generateMockFunction(refName, schemas[refName], schemas))

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
  const imports = `import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import type { RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'`

  const appCode = `const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ success: false, error: result.error }, 400)
    }
  }
})${basePath !== '/' ? `.basePath('${basePath}')` : ''}

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
    ...mockFunctions,
    '',
    ...handlers,
    '',
    appCode,
  ].join('\n')
}
