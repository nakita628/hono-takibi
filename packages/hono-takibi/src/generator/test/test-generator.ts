import type { OpenAPI, Parameter, Schema } from '../../openapi/index.js'
import { isHttpMethod } from '../../utils/index.js'
import { schemaToFaker } from './faker-mapping.js'

interface SecurityRequirement {
  type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  name: string
  in?: 'header' | 'query' | 'cookie'
}

interface TestCase {
  operationId: string
  method: string
  path: string
  summary: string
  description: string
  tag: string | undefined
  pathParams: Array<{ name: string; fakerCode: string }>
  queryParams: Array<{ name: string; fakerCode: string; required: boolean }>
  headerParams: Array<{ name: string; fakerCode: string; required: boolean }>
  requestBody: { fakerCode: string; contentType: string } | undefined
  successStatus: number
  errorStatuses: number[]
  security: SecurityRequirement[]
}

function extractSecurityRequirements(
  opSecurity: Array<Record<string, string[]>> | undefined,
  globalSecurity: Array<Record<string, string[]>> | undefined,
  securitySchemes:
    | Record<
        string,
        {
          type: string
          scheme?: string
          name?: string
          in?: string
        }
      >
    | undefined,
): SecurityRequirement[] {
  const securityDefs = opSecurity ?? globalSecurity ?? []
  const requirements: SecurityRequirement[] = []

  for (const secDef of securityDefs) {
    for (const schemeName of Object.keys(secDef)) {
      const scheme = securitySchemes?.[schemeName]
      if (!scheme) continue

      if (scheme.type === 'http' && scheme.scheme === 'bearer') {
        requirements.push({ type: 'bearer', name: 'Authorization' })
      } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
        requirements.push({ type: 'basic', name: 'Authorization' })
      } else if (scheme.type === 'apiKey') {
        requirements.push({
          type: 'apiKey',
          name: scheme.name || 'X-API-Key',
          in: (scheme.in as 'header' | 'query' | 'cookie') || 'header',
        })
      } else if (scheme.type === 'oauth2') {
        requirements.push({ type: 'oauth2', name: 'Authorization' })
      }
    }
  }

  return requirements
}

export function extractTestCases(spec: OpenAPI): TestCase[] {
  const testCases: TestCase[] = []
  const securitySchemes = spec.components?.securitySchemes as
    | Record<
        string,
        {
          type: string
          scheme?: string
          name?: string
          in?: string
        }
      >
    | undefined

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!isHttpMethod(method)) continue

      const op = operation as {
        operationId?: string
        summary?: string
        description?: string
        tags?: string[]
        parameters?: Parameter[]
        security?: Array<Record<string, string[]>>
        requestBody?: {
          required?: boolean
          content?: Record<string, { schema?: Schema }>
        }
        responses?: Record<
          string,
          { description?: string; content?: Record<string, { schema?: Schema }> }
        >
      }

      const pathParams: TestCase['pathParams'] = []
      const queryParams: TestCase['queryParams'] = []
      const headerParams: TestCase['headerParams'] = []

      // Extract parameters
      for (const param of op.parameters || []) {
        if (param.$ref) continue // Skip ref parameters for now
        const fakerCode = schemaToFaker(param.schema || { type: 'string' }, param.name)
        if (param.in === 'path') {
          pathParams.push({ name: param.name, fakerCode })
        } else if (param.in === 'query') {
          queryParams.push({ name: param.name, fakerCode, required: param.required ?? false })
        } else if (param.in === 'header') {
          headerParams.push({ name: param.name, fakerCode, required: param.required ?? false })
        }
      }

      // Extract request body
      let requestBody: TestCase['requestBody']
      if (op.requestBody?.content) {
        const jsonContent = op.requestBody.content['application/json']
        if (jsonContent?.schema) {
          requestBody = {
            fakerCode: schemaToFaker(jsonContent.schema),
            contentType: 'application/json',
          }
        }
      }

      // Extract response status codes
      const responseKeys = Object.keys(op.responses || {})
      const successStatus =
        responseKeys
          .filter((s) => s.startsWith('2'))
          .map((s) => Number.parseInt(s, 10))
          .sort()[0] ?? 200

      const errorStatuses = responseKeys
        .filter((s) => s.startsWith('4') || s.startsWith('5'))
        .filter((s) => s !== 'default')
        .map((s) => Number.parseInt(s, 10))
        .sort()

      const security = extractSecurityRequirements(op.security, spec.security, securitySchemes)

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
      })
    }
  }

  return testCases
}

function generateMockFunctions(spec: OpenAPI): string {
  if (!spec.components?.schemas) return ''

  let code = ''
  for (const [name, schema] of Object.entries(spec.components.schemas)) {
    const fakerCode = schemaToFaker(schema as Schema)
    code += `function mock${name}() {\n  return ${fakerCode}\n}\n\n`
  }
  return code
}

function generateAuthHeader(sec: SecurityRequirement): string {
  switch (sec.type) {
    case 'bearer':
    case 'oauth2':
      return `'Authorization': 'Bearer ' + faker.string.alphanumeric(32)`
    case 'basic':
      return `'Authorization': 'Basic ' + btoa(faker.internet.username() + ':' + faker.internet.password())`
    case 'apiKey':
      if (sec.in === 'header') {
        return `'${sec.name}': faker.string.alphanumeric(32)`
      }
      return ''
    default:
      return ''
  }
}

function generateTestCase(tc: TestCase): string {
  let code = ''

  let testPath = tc.path
  const pathSetup: string[] = []

  for (const param of tc.pathParams) {
    pathSetup.push(`const ${param.name} = ${param.fakerCode}`)
    testPath = testPath.replace(`{${param.name}}`, `\${${param.name}}`)
  }

  const querySetup: string[] = []
  const queryParts: string[] = []
  for (const param of tc.queryParams.filter((p) => p.required)) {
    querySetup.push(`const ${param.name} = ${param.fakerCode}`)
    queryParts.push(`${param.name}=\${encodeURIComponent(String(${param.name}))}`)
  }

  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''

  const headerSetup: string[] = []
  const headers: string[] = []
  for (const param of tc.headerParams.filter((p) => p.required)) {
    headerSetup.push(`const ${param.name} = ${param.fakerCode}`)
    headers.push(`'${param.name}': String(${param.name})`)
  }

  // Add auth headers
  const authHeaders: string[] = []
  for (const sec of tc.security) {
    const authHeader = generateAuthHeader(sec)
    if (authHeader) authHeaders.push(authHeader)
  }

  let bodySetup = ''
  let bodyOption = ''
  if (tc.requestBody) {
    bodySetup = `const body = ${tc.requestBody.fakerCode}`
    bodyOption = ',\n          body: JSON.stringify(body)'
    headers.push("'Content-Type': 'application/json'")
  }

  const allHeaders = [...headers, ...authHeaders]
  const headersOption =
    allHeaders.length > 0
      ? `,\n          headers: {\n            ${allHeaders.join(',\n            ')}\n          }`
      : ''

  const headersWithoutAuth =
    headers.length > 0
      ? `,\n          headers: {\n            ${headers.join(',\n            ')}\n          }`
      : ''

  const summary = tc.summary || `${tc.method} ${tc.path}`
  const setupCode = [...pathSetup, ...querySetup, ...headerSetup, bodySetup]
    .filter(Boolean)
    .join('\n        ')

  code += `
    describe('${tc.method} ${tc.path}', () => {
      it('${escapeString(summary)}', async () => {
        ${setupCode}

        const res = await app.request(\`${testPath}${queryString}\`, {
          method: '${tc.method}'${headersOption}${bodyOption}
        })

        expect(res.status).toBe(${tc.successStatus})
      })`

  // Add unauthorized test if security is required
  if (tc.security.length > 0) {
    code += `

      it('should return 401 without auth', async () => {
        ${setupCode}

        const res = await app.request(\`${testPath}${queryString}\`, {
          method: '${tc.method}'${headersWithoutAuth}${bodyOption}
        })

        expect(res.status).toBe(401)
      })`
  }

  code += `
    })
`
  return code
}

function getErrorDescription(status: number): string {
  const descriptions: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  }
  return descriptions[status] || 'Error'
}

function escapeString(s: string): string {
  return s.replace(/'/g, "\\'").replace(/\n/g, ' ')
}

export function generateTestFile(spec: OpenAPI, appImportPath: string = './app'): string {
  const testCases = extractTestCases(spec)
  const apiTitle = spec.info?.title || 'API'

  // Group by tag
  const byTag = new Map<string, TestCase[]>()
  for (const tc of testCases) {
    const tag = tc.tag || 'default'
    if (!byTag.has(tag)) {
      byTag.set(tag, [])
    }
    byTag.get(tag)!.push(tc)
  }

  let code = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '${appImportPath}'

`

  code += generateMockFunctions(spec)

  code += `describe('${escapeString(apiTitle)}', () => {\n`

  for (const [tag, cases] of byTag) {
    const tagInfo = spec.tags?.find((t) => t.name === tag)
    const tagDescription = tagInfo?.description || tag

    code += `\n  describe('${escapeString(tagDescription)}', () => {\n`

    for (const tc of cases) {
      code += generateTestCase(tc)
    }

    code += '  })\n'
  }

  code += '})\n'

  return code
}

export function generateHandlerTestCode(
  spec: OpenAPI,
  handlerPath: string,
  routeNames: string[],
  importFrom: string,
): string {
  const testCases = extractTestCases(spec)
  const relevantCases = testCases.filter((tc) =>
    routeNames.some((r) => r.toLowerCase().includes(tc.operationId.toLowerCase())),
  )

  if (relevantCases.length === 0) {
    return ''
  }

  let code = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '${importFrom}'

`

  code += generateMockFunctions(spec)

  for (const tc of relevantCases) {
    code += generateTestCase(tc)
  }

  return code
}
