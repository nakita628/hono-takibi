import type { OpenAPI, Operation, Schema } from '../../openapi/index.js'
import { isHttpMethod } from '../../utils/index.js'
import { schemaToFaker } from './faker-mapping.js'

function isOperation(value: unknown): value is Operation {
  return typeof value === 'object' && value !== null && 'responses' in value
}

function hasContent(body: unknown): body is { content?: { [key: string]: { schema?: Schema } } } {
  return typeof body === 'object' && body !== null && !('$ref' in body)
}

function getSecurityArray(security: unknown): { [key: string]: string[] }[] | undefined {
  if (!Array.isArray(security)) return undefined
  return security
}

/**
 * Recursively collect all schema $ref names from a schema and its nested properties
 * Returns unique schema names that need mock functions generated
 */
function collectSchemaRefs(
  schema: Schema,
  schemas?: { [key: string]: Schema },
  visited = new Set<string>(),
): string[] {
  const refs: string[] = []
  // Handle direct $ref
  if (schema.$ref) {
    const refName = schema.$ref.replace('#/components/schemas/', '')
    if (!visited.has(refName)) {
      visited.add(refName)
      refs.push(refName)
      // Recursively collect refs from the referenced schema
      const referencedSchema = schemas?.[refName]
      if (referencedSchema) {
        refs.push(...collectSchemaRefs(referencedSchema, schemas, visited))
      }
    }
    return refs
  }
  // Handle object properties
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      refs.push(...collectSchemaRefs(prop, schemas, visited))
    }
  }
  // Handle array items
  if (schema.items) {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items]
    for (const item of items) {
      refs.push(...collectSchemaRefs(item, schemas, visited))
    }
  }
  // Handle allOf/oneOf/anyOf
  for (const compositeKey of ['allOf', 'oneOf', 'anyOf'] as const) {
    const composite = schema[compositeKey]
    if (composite) {
      for (const subSchema of composite) {
        refs.push(...collectSchemaRefs(subSchema, schemas, visited))
      }
    }
  }
  return refs
}

type SecurityRequirement = {
  type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  name: string
  in?: 'header' | 'query' | 'cookie'
}

type TestCase = {
  operationId: string
  method: string
  path: string
  summary: string
  description: string
  tag: string | undefined
  pathParams: { name: string; fakerCode: string; schema?: Schema }[]
  queryParams: { name: string; fakerCode: string; required: boolean }[]
  headerParams: { name: string; fakerCode: string; required: boolean }[]
  requestBody: { fakerCode: string; contentType: string } | undefined
  successStatus: number
  errorStatuses: number[]
  security: SecurityRequirement[]
  usedSchemaRefs: string[]
}

function isSecurityScheme(
  value: unknown,
): value is { type?: string; scheme?: string; name?: string; in?: string } {
  return typeof value === 'object' && value !== null && !('$ref' in value)
}

function extractSecurityRequirements(
  opSecurity: { [key: string]: string[] }[] | undefined,
  globalSecurity: { [key: string]: string[] }[] | undefined,
  securitySchemes: { [key: string]: unknown } | undefined,
): SecurityRequirement[] {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  const requirements: SecurityRequirement[] = []
  for (const secDef of securityDefs) {
    for (const schemeName of Object.keys(secDef)) {
      const scheme = securitySchemes?.[schemeName]
      if (!(scheme && isSecurityScheme(scheme))) continue
      if (scheme.type === 'http' && scheme.scheme === 'bearer') {
        requirements.push({ type: 'bearer', name: 'Authorization' })
      } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
        requirements.push({ type: 'basic', name: 'Authorization' })
      } else if (scheme.type === 'apiKey') {
        const inLocation =
          scheme.in === 'header' || scheme.in === 'query' || scheme.in === 'cookie'
            ? scheme.in
            : 'header'
        requirements.push({ type: 'apiKey', name: scheme.name || 'X-API-Key', in: inLocation })
      } else if (scheme.type === 'oauth2') {
        requirements.push({ type: 'oauth2', name: 'Authorization' })
      }
    }
  }
  return requirements
}

export function extractTestCases(spec: OpenAPI): TestCase[] {
  const testCases: TestCase[] = []
  const securitySchemes = spec.components?.securitySchemes
  for (const [path, pathItem] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!(isHttpMethod(method) && isOperation(operation))) continue
      const op = operation
      const pathParams: { name: string; fakerCode: string; schema?: Schema }[] = []
      const queryParams: { name: string; fakerCode: string; required: boolean }[] = []
      const headerParams: { name: string; fakerCode: string; required: boolean }[] = []
      for (const param of op.parameters || []) {
        if (param.$ref) continue
        const schema = param.schema || { type: 'string' }
        const fakerCode = schemaToFaker(schema, param.name)
        if (param.in === 'path') {
          pathParams.push({ name: param.name, fakerCode, schema })
        } else if (param.in === 'query') {
          queryParams.push({ name: param.name, fakerCode, required: param.required ?? false })
        } else if (param.in === 'header') {
          headerParams.push({ name: param.name, fakerCode, required: param.required ?? false })
        }
      }
      const requestBody: TestCase['requestBody'] = (() => {
        if (!(op.requestBody && hasContent(op.requestBody))) return undefined
        const jsonContent = op.requestBody.content?.['application/json']
        if (jsonContent?.schema)
          return { fakerCode: schemaToFaker(jsonContent.schema), contentType: 'application/json' }
        return undefined
      })()
      const usedSchemaRefs: string[] = (() => {
        if (!(op.requestBody && hasContent(op.requestBody))) return []
        const jsonContent = op.requestBody.content?.['application/json']
        if (!jsonContent?.schema) return []
        // Recursively collect all schema refs from the request body
        return collectSchemaRefs(jsonContent.schema, spec.components?.schemas)
      })()
      const responseKeys = Object.keys(op.responses || {})
      // Extract success status (2xx), sort to get lowest, default to 200 if none defined
      const successStatus =
        responseKeys
          .filter((s) => s.startsWith('2'))
          .map((s) => Number.parseInt(s, 10))
          .sort()[0] ?? 200
      // Extract error statuses (4xx client errors, 5xx server errors), exclude 'default' which is a wildcard in OpenAPI
      const errorStatuses = responseKeys
        .filter((s) => s.startsWith('4') || s.startsWith('5'))
        .filter((s) => s !== 'default')
        .map((s) => Number.parseInt(s, 10))
        .sort()
      const security = extractSecurityRequirements(
        getSecurityArray(op.security),
        getSecurityArray(spec.security),
        securitySchemes,
      )
      testCases.push({
        operationId: op.operationId || `${method}${path.replace(/\//g, '_')}`,
        method: method.toUpperCase(),
        path,
        summary: op.summary || '',
        description: op.description || '',
        tag: op.tags?.[0],
        pathParams,
        queryParams,
        headerParams,
        requestBody,
        successStatus,
        errorStatuses,
        security,
        usedSchemaRefs,
      })
    }
  }
  return testCases
}

function generateMockFunctions(spec: OpenAPI, usedSchemaNames: Set<string>): string {
  if (!spec.components?.schemas || usedSchemaNames.size === 0) return ''
  const schemas = spec.components.schemas
  // Topological sort: generate dependencies first
  const sorted: string[] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const visit = (name: string) => {
    if (visited.has(name) || !usedSchemaNames.has(name)) return
    if (visiting.has(name)) return // circular dependency, skip
    visiting.add(name)
    const schema = schemas[name]
    if (schema) {
      // Find direct dependencies of this schema
      const deps = collectSchemaRefs(schema, schemas, new Set([name]))
      for (const dep of deps) {
        visit(dep)
      }
    }
    visiting.delete(name)
    visited.add(name)
    sorted.push(name)
  }
  for (const name of usedSchemaNames) {
    visit(name)
  }
  return sorted
    .map((name) => `function mock${name}() {\n  return ${schemaToFaker(schemas[name])}\n}`)
    .join('\n\n')
}

/**
 * Generate a non-existent value for 404 testing based on the schema type
 * Returns raw value without quotes (for URL path insertion)
 */
function getNonExistentValue(schema?: Schema): string {
  if (!schema) return '__non_existent__'
  if (schema.type === 'integer' || schema.type === 'number') return '-1'
  if (schema.format === 'uuid') return '00000000-0000-0000-0000-000000000000'
  return '__non_existent__'
}

function generateAuthHeader(sec: SecurityRequirement): string {
  switch (sec.type) {
    case 'bearer':
    case 'oauth2':
      // biome-ignore lint/suspicious/noTemplateCurlyInString: generating template literal code
      return "'Authorization':`Bearer ${faker.string.alphanumeric(32)}`"
    case 'basic':
      // biome-ignore lint/suspicious/noTemplateCurlyInString: generating template literal code
      return "'Authorization':`Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`"
    case 'apiKey':
      if (sec.in === 'header') return `'${sec.name}':faker.string.alphanumeric(32)`
      return ''
    default:
      return ''
  }
}

function generateTestCase(tc: TestCase): string {
  const testPath = tc.pathParams.reduce(
    (path, param) => path.replace(`{${param.name}}`, `\${${param.name}}`),
    tc.path,
  )
  const pathSetup = tc.pathParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  // Include all query parameters (both required and optional) for comprehensive testing
  const querySetup = tc.queryParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const queryParts = tc.queryParams.map(
    (param) => `${param.name}=\${encodeURIComponent(String(${param.name}))}`,
  )
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
  const requiredHeaderParams = tc.headerParams.filter((p) => p.required)
  const headerSetup = requiredHeaderParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const headerEntries = requiredHeaderParams.map((param) => `'${param.name}':String(${param.name})`)
  const authHeaders = tc.security.map(generateAuthHeader).filter(Boolean)
  const { bodySetup, bodyOption, contentTypeHeader } = tc.requestBody
    ? {
        bodySetup: `const body=${tc.requestBody.fakerCode}`,
        bodyOption: ',body:JSON.stringify(body)',
        contentTypeHeader: "'Content-Type':'application/json'",
      }
    : { bodySetup: '', bodyOption: '', contentTypeHeader: '' }
  const headers = [...headerEntries, ...(contentTypeHeader ? [contentTypeHeader] : [])]
  const allHeaders = [...headers, ...authHeaders]
  const headersOption = allHeaders.length > 0 ? `,headers:{${allHeaders.join(',')}}` : ''
  const headersWithoutAuth = headers.length > 0 ? `,headers:{${headers.join(',')}}` : ''
  const summary = tc.summary || `${tc.method} ${tc.path}`
  const setupCode = [...pathSetup, ...querySetup, ...headerSetup, bodySetup]
    .filter(Boolean)
    .join('\n')
  const mainTest = `describe('${tc.method} ${tc.path}',()=>{it('${escapeString(summary)}',async()=>{${setupCode}\nconst res=await app.request(\`${testPath}${queryString}\`,{method:'${tc.method}'${headersOption}${bodyOption}})\nexpect(res.status).toBe(${tc.successStatus})})`
  const unauthorizedTest =
    tc.security.length > 0
      ? `\nit('should return 401 without auth',async()=>{${setupCode}\nconst res=await app.request(\`${testPath}${queryString}\`,{method:'${tc.method}'${headersWithoutAuth}${bodyOption}})\nexpect(res.status).toBe(401)})`
      : ''
  // Generate 404 test if: has path params AND 404 is defined in OpenAPI responses
  const notFoundTest =
    tc.pathParams.length > 0 && tc.errorStatuses.includes(404)
      ? (() => {
          const notFoundPath = tc.pathParams.reduce(
            (path, param) => path.replace(`{${param.name}}`, getNonExistentValue(param.schema)),
            tc.path,
          )
          const notFoundQuerySetup = tc.queryParams.map(
            (param) => `const ${param.name}=${param.fakerCode}`,
          )
          const notFoundSetupCode = [...notFoundQuerySetup, ...headerSetup, bodySetup]
            .filter(Boolean)
            .join('\n')
          return `\nit('should return 404 for non-existent resource',async()=>{${notFoundSetupCode}\nconst res=await app.request(\`${notFoundPath}${queryString}\`,{method:'${tc.method}'${headersOption}${bodyOption}})\nexpect(res.status).toBe(404)})`
        })()
      : ''
  return `${mainTest}${unauthorizedTest}${notFoundTest}})\n`
}

function escapeString(s: string): string {
  return s.replace(/'/g, "\\'").replace(/\n/g, ' ')
}

export function generateTestFile(spec: OpenAPI, appImportPath: string = './app'): string {
  const testCases = extractTestCases(spec)
  const apiTitle = spec.info?.title || 'API'
  const usedSchemaNames = new Set(testCases.flatMap((tc) => tc.usedSchemaRefs))
  const byTag = testCases.reduce((acc, tc) => {
    const tag = tc.tag || 'default'
    return acc.set(tag, [...(acc.get(tag) || []), tc])
  }, new Map<string, TestCase[]>())
  const imports = `import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'${appImportPath}'\n`
  const mockFunctions = generateMockFunctions(spec, usedSchemaNames)
  const tagDescribes = Array.from(byTag.entries())
    .map(([tag, cases]) => {
      const tagInfo = spec.tags?.find((t) => t.name === tag)
      const tagDescription = tagInfo?.description || tag
      const testCasesCode = cases.map((tc) => generateTestCase(tc)).join('')
      return `describe('${escapeString(tagDescription)}',()=>{${testCasesCode}})\n`
    })
    .join('')
  const mockSection = mockFunctions ? `${mockFunctions}\n\n` : ''
  return `${imports}\n${mockSection}describe('${escapeString(apiTitle)}',()=>{${tagDescribes}})\n`
}

/**
 * Extract the first path segment from an API path.
 * e.g., "/users/{id}" → "users", "/products" → "products", "/" → "__root"
 */
function getPathFirstSegment(path: string): string {
  const rawSegment = path.replace(/^\/+/, '').split('/')[0] ?? ''
  const sanitized = rawSegment
    .replace(/\{([^}]+)\}/g, '$1')
    .replace(/[^0-9A-Za-z._-]/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
    .replace(/__+/g, '_')
    .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())
  return sanitized === '' ? '__root' : sanitized
}

export function generateHandlerTestCode(
  spec: OpenAPI,
  handlerPath: string,
  _routeNames: string[],
  importFrom: string,
): string {
  // Extract handler name from path (e.g., "handlers/users.ts" → "users")
  const handlerFileName = handlerPath.split('/').pop()?.replace(/\.ts$/, '') ?? ''

  const testCases = extractTestCases(spec)
  // Filter test cases by matching the first path segment with handler file name
  const relevantCases = testCases.filter((tc) => {
    const pathSegment = getPathFirstSegment(tc.path)
    return pathSegment === handlerFileName
  })
  if (relevantCases.length === 0) return ''
  const usedSchemaNames = new Set(relevantCases.flatMap((tc) => tc.usedSchemaRefs))
  const imports = `import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'${importFrom}'\n`
  const mockFunctions = generateMockFunctions(spec, usedSchemaNames)
  const testCasesCode = relevantCases.map((tc) => generateTestCase(tc)).join('')
  const mockSection = mockFunctions ? `${mockFunctions}\n\n` : ''
  // Capitalize resource name for describe block (e.g., "users" → "Users")
  const resourceName = handlerFileName.charAt(0).toUpperCase() + handlerFileName.slice(1)
  return `${imports}\n${mockSection}describe('${resourceName}',()=>{${testCasesCode}})\n`
}
