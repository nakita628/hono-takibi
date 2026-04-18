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

function makeMockFunction(
  name: string,
  schema: Schema,
  schemas: { readonly [k: string]: Schema },
  isCircular: boolean,
) {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  const returnType = isCircular ? ': any' : ''
  return `function mock${name.replace(/\./g, '')}()${returnType} {\n  return ${mockBody}\n}`
}

function extractSecurityInfo(
  opSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  globalSecurity: readonly { readonly [k: string]: readonly string[] }[] | undefined,
  securitySchemes: { readonly [k: string]: unknown } | undefined,
): readonly {
  readonly type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  readonly name: string
  readonly in?: 'header' | 'query' | 'cookie'
}[] {
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
function filterToJsonContentTypes(openapi: OpenAPI): OpenAPI {
  const httpMethods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace']
  const filteredPaths = Object.fromEntries(
    Object.entries(openapi.paths).map(([path, pathItem]) => {
      const filteredPathItem = Object.fromEntries(
        Object.entries(pathItem).map(([k, v]) => {
          if (!httpMethods.includes(k)) return [k, v]
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
 * Determines the HTTP status code for a successful response.
 * Prefers 200 OK, then 201 Created, fallback to 204 No Content.
 */
function determineSuccessStatus(responses: { readonly [k: string]: Responses }): number {
  if (responses[String(200)]) return 200
  if (responses[String(201)]) return 201
  return 204
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
): string {
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

export function makeMock(
  openapi: OpenAPI,
  basePath: string,
  options: {
    readonly readonly?: boolean
  } = {},
): string {
  const filteredOpenapi = filterToJsonContentTypes(openapi)
  const paths = filteredOpenapi.paths
  const schemas = openapi.components?.schemas ?? {}
  const securitySchemes = openapi.components?.securitySchemes
  const componentResponses = openapi.components?.responses
  const allRefs = new Set<string>()
  const processed = Object.entries(paths).flatMap(([p, pathItem]) =>
    Object.entries(pathItem).flatMap(
      ([method, operation]): readonly {
        readonly entry: {
          readonly routeId: string
          readonly method: string
          readonly path: string
          readonly requiresAuth: boolean
        }
        readonly handler: string
      }[] => {
        if (!(isHttpMethod(method) && isOperation(operation))) return []
        const routeId = methodPath(method, p)
        const security = extractSecurityInfo(
          isSecurityArray(operation.security) ? operation.security : undefined,
          isSecurityArray(openapi.security) ? openapi.security : undefined,
          securitySchemes,
        )
        const requiresAuth = security.length > 0
        const successResponse = resolveResponse(
          operation.responses?.[String(200)] ??
            operation.responses?.[String(201)] ??
            operation.responses?.[String(204)],
          componentResponses,
        )
        const jsonMedia = successResponse?.content?.['application/json']
        const textMedia = successResponse?.content?.['text/plain']
        const jsonSchema = jsonMedia && isMediaWithSchema(jsonMedia) ? jsonMedia.schema : undefined
        const textSchema = textMedia && isMediaWithSchema(textMedia) ? textMedia.schema : undefined
        const statusCode = determineSuccessStatus(operation.responses)
        const handlerBody = makeHandlerBody(
          statusCode,
          jsonSchema,
          textSchema,
          operation.responses?.[String(204)] !== undefined,
          schemas,
          allRefs,
        )
        // Generate auth check code only when route defines a 401 Unauthorized response
        const has401 = operation.responses?.[String(401)] !== undefined
        const authCheck = makeAuthCheck(security, has401)
        const usesContext = handlerBody.includes('c.') || authCheck !== ''
        const param = usesContext ? 'c' : '_c'
        const handler = `const ${routeId}RouteHandler: RouteHandler<typeof ${routeId}Route> = async (${param}) => {\n  ${authCheck}${handlerBody}\n}`
        return [{ entry: { routeId, method, path: p, requiresAuth }, handler }]
      },
    ),
  )
  const routeEntries = processed.map(({ entry }) => entry)
  const handlers = processed.map(({ handler }) => handler)
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
        ...(options.readonly !== undefined ? { readonly: options.readonly } : {}),
      })
    : ''
  const routes = routeCode(filteredOpenapi, options.readonly)
  const appSetup = routeEntries
    .map(({ routeId }) => `.openapi(${routeId}Route, ${routeId}RouteHandler)`)
    .join('\n  ')
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
