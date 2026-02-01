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
  pathParams: { name: string; fakerCode: string }[]
  queryParams: { name: string; fakerCode: string; required: boolean }[]
  headerParams: { name: string; fakerCode: string; required: boolean }[]
  requestBody: { fakerCode: string; contentType: string } | undefined
  successStatus: number
  errorStatuses: number[]
  security: SecurityRequirement[]
  usedSchemaRefs: string[]
}

function isSecurityScheme(value: unknown): value is { type?: string; scheme?: string; name?: string; in?: string } {
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
      if (!scheme || !isSecurityScheme(scheme)) continue
      if (scheme.type === 'http' && scheme.scheme === 'bearer') {
        requirements.push({ type: 'bearer', name: 'Authorization' })
      } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
        requirements.push({ type: 'basic', name: 'Authorization' })
      } else if (scheme.type === 'apiKey') {
        const inLocation = scheme.in === 'header' || scheme.in === 'query' || scheme.in === 'cookie' ? scheme.in : 'header'
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
      if (!isHttpMethod(method) || !isOperation(operation)) continue
      const op = operation
      const pathParams: { name: string; fakerCode: string }[] = []
      const queryParams: { name: string; fakerCode: string; required: boolean }[] = []
      const headerParams: { name: string; fakerCode: string; required: boolean }[] = []
      for (const param of op.parameters || []) {
        if (param.$ref) continue
        const fakerCode = schemaToFaker(param.schema || { type: 'string' }, param.name)
        if (param.in === 'path') {
          pathParams.push({ name: param.name, fakerCode })
        } else if (param.in === 'query') {
          queryParams.push({ name: param.name, fakerCode, required: param.required ?? false })
        } else if (param.in === 'header') {
          headerParams.push({ name: param.name, fakerCode, required: param.required ?? false })
        }
      }
      const requestBody: TestCase['requestBody'] = (() => {
        if (!op.requestBody || !hasContent(op.requestBody)) return undefined
        const jsonContent = op.requestBody.content?.['application/json']
        if (jsonContent?.schema) return { fakerCode: schemaToFaker(jsonContent.schema), contentType: 'application/json' }
        return undefined
      })()
      const usedSchemaRefs: string[] = (() => {
        const refs: string[] = []
        if (!op.requestBody || !hasContent(op.requestBody)) return refs
        const jsonContent = op.requestBody.content?.['application/json']
        if (jsonContent?.schema?.$ref) {
          refs.push(jsonContent.schema.$ref.replace('#/components/schemas/', ''))
        }
        return refs
      })()
      const responseKeys = Object.keys(op.responses || {})
      const successStatus = responseKeys.filter((s) => s.startsWith('2')).map((s) => Number.parseInt(s, 10)).sort()[0] ?? 200
      const errorStatuses = responseKeys.filter((s) => s.startsWith('4') || s.startsWith('5')).filter((s) => s !== 'default').map((s) => Number.parseInt(s, 10)).sort()
      const security = extractSecurityRequirements(getSecurityArray(op.security), getSecurityArray(spec.security), securitySchemes)
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
  return Object.entries(spec.components.schemas).filter(([name]) => usedSchemaNames.has(name)).map(([name, schema]) => `function mock${name}(){return ${schemaToFaker(schema)}}\n`).join('')
}

function generateAuthHeader(sec: SecurityRequirement): string {
  switch (sec.type) {
    case 'bearer':
    case 'oauth2':
      return "'Authorization':`Bearer ${faker.string.alphanumeric(32)}`"
    case 'basic':
      return "'Authorization':`Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`"
    case 'apiKey':
      if (sec.in === 'header') return `'${sec.name}':faker.string.alphanumeric(32)`
      return ''
    default:
      return ''
  }
}

function generateTestCase(tc: TestCase): string {
  const testPath = tc.pathParams.reduce((path, param) => path.replace(`{${param.name}}`, `\${${param.name}}`), tc.path)
  const pathSetup = tc.pathParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const requiredQueryParams = tc.queryParams.filter((p) => p.required)
  const querySetup = requiredQueryParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const queryParts = requiredQueryParams.map((param) => `${param.name}=\${encodeURIComponent(String(${param.name}))}`)
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
  const requiredHeaderParams = tc.headerParams.filter((p) => p.required)
  const headerSetup = requiredHeaderParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const headerEntries = requiredHeaderParams.map((param) => `'${param.name}':String(${param.name})`)
  const authHeaders = tc.security.map(generateAuthHeader).filter(Boolean)
  const { bodySetup, bodyOption, contentTypeHeader } = tc.requestBody ? { bodySetup: `const body=${tc.requestBody.fakerCode}`, bodyOption: ',body:JSON.stringify(body)', contentTypeHeader: "'Content-Type':'application/json'" } : { bodySetup: '', bodyOption: '', contentTypeHeader: '' }
  const headers = [...headerEntries, ...(contentTypeHeader ? [contentTypeHeader] : [])]
  const allHeaders = [...headers, ...authHeaders]
  const headersOption = allHeaders.length > 0 ? `,headers:{${allHeaders.join(',')}}` : ''
  const headersWithoutAuth = headers.length > 0 ? `,headers:{${headers.join(',')}}` : ''
  const summary = tc.summary || `${tc.method} ${tc.path}`
  const setupCode = [...pathSetup, ...querySetup, ...headerSetup, bodySetup].filter(Boolean).join('\n')
  const mainTest = `describe('${tc.method} ${tc.path}',()=>{it('${escapeString(summary)}',async()=>{${setupCode}\nconst res=await app.request(\`${testPath}${queryString}\`,{method:'${tc.method}'${headersOption}${bodyOption}})\nexpect(res.status).toBe(${tc.successStatus})})`
  const unauthorizedTest = tc.security.length > 0 ? `\nit('should return 401 without auth',async()=>{${setupCode}\nconst res=await app.request(\`${testPath}${queryString}\`,{method:'${tc.method}'${headersWithoutAuth}${bodyOption}})\nexpect(res.status).toBe(401)})` : ''
  return `${mainTest}${unauthorizedTest}})\n`
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
  const tagDescribes = Array.from(byTag.entries()).map(([tag, cases]) => {
    const tagInfo = spec.tags?.find((t) => t.name === tag)
    const tagDescription = tagInfo?.description || tag
    const testCasesCode = cases.map((tc) => generateTestCase(tc)).join('')
    return `describe('${escapeString(tagDescription)}',()=>{${testCasesCode}})\n`
  }).join('')
  return `${imports}${mockFunctions}describe('${escapeString(apiTitle)}',()=>{${tagDescribes}})\n`
}

export function generateHandlerTestCode(spec: OpenAPI, _handlerPath: string, routeNames: string[], importFrom: string): string {
  const testCases = extractTestCases(spec)
  const relevantCases = testCases.filter((tc) => routeNames.some((r) => r.toLowerCase().includes(tc.operationId.toLowerCase())))
  if (relevantCases.length === 0) return ''
  const usedSchemaNames = new Set(relevantCases.flatMap((tc) => tc.usedSchemaRefs))
  const imports = `import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'${importFrom}'\n`
  const mockFunctions = generateMockFunctions(spec, usedSchemaNames)
  const testCasesCode = relevantCases.map((tc) => generateTestCase(tc)).join('')
  return `${imports}${mockFunctions}${testCasesCode}`
}
