import {
  isContentBody,
  isHttpMethod,
  isOperation,
  isSecurityArray,
  isSecurityScheme,
} from '../../guard/index.js'
import type { OpenAPI, Schema } from '../../openapi/index.js'
import { schemaToFaker } from './faker-mapping.js'

function collectSchemaRefs(
  schema: Schema,
  schemas?: { readonly [k: string]: Schema },
  visited: Set<string> = new Set<string>(),
): string[] {
  if (schema.$ref) {
    const refName = schema.$ref.replace('#/components/schemas/', '')
    if (visited.has(refName)) return []
    visited.add(refName)
    const referenced = schemas?.[refName]
    return [refName, ...(referenced ? collectSchemaRefs(referenced, schemas, visited) : [])]
  }
  const propRefs = schema.properties
    ? Object.values(schema.properties).flatMap((p) => collectSchemaRefs(p, schemas, visited))
    : []
  const items = schema.items ? (Array.isArray(schema.items) ? schema.items : [schema.items]) : []
  const itemRefs = items.flatMap((item) => collectSchemaRefs(item, schemas, visited))
  const compositeRefs = (['allOf', 'oneOf', 'anyOf'] as const).flatMap((key) => {
    const composite = schema[key]
    return composite ? composite.flatMap((sub) => collectSchemaRefs(sub, schemas, visited)) : []
  })
  return [...propRefs, ...itemRefs, ...compositeRefs]
}

function extractSecurityRequirements(
  opSecurity: readonly { readonly [key: string]: readonly string[] }[] | undefined,
  globalSecurity: readonly { readonly [key: string]: readonly string[] }[] | undefined,
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
      ): {
        type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
        name: string
        in?: 'header' | 'query' | 'cookie'
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
          return [{ type: 'apiKey', name: scheme.name || 'X-API-Key', in: inLocation }]
        }
        if (scheme.type === 'oauth2') {
          return [{ type: 'oauth2', name: 'Authorization' }]
        }
        return []
      },
    ),
  )
}

export function extractTestCases(spec: OpenAPI) {
  const securitySchemes = spec.components?.securitySchemes
  return Object.entries(spec.paths).flatMap(([path, pathItem]) =>
    Object.entries(pathItem).flatMap(([method, operation]) => {
      if (!(isHttpMethod(method) && isOperation(operation))) return []
      const resolvedParams = (operation.parameters || []).flatMap((rawParam) => {
        const param = rawParam.$ref
          ? (spec.components?.parameters?.[rawParam.$ref.replace('#/components/parameters/', '')] ??
            rawParam)
          : rawParam
        if (!param) return []
        const schema = param.schema || { type: 'string' as const }
        return [{ param, schema, fakerCode: schemaToFaker(schema, param.name) }]
      })
      const pathParams = resolvedParams
        .filter((p) => p.param.in === 'path')
        .map((p) => ({ name: p.param.name, fakerCode: p.fakerCode, schema: p.schema }))
      const queryParams = resolvedParams
        .filter((p) => p.param.in === 'query')
        .map((p) => ({
          name: p.param.name,
          fakerCode: p.fakerCode,
          required: p.param.required ?? false,
        }))
      const headerParams = resolvedParams
        .filter((p) => p.param.in === 'header')
        .map((p) => ({
          name: p.param.name,
          fakerCode: p.fakerCode,
          required: p.param.required ?? false,
        }))
      const jsonBodySchema =
        operation.requestBody && isContentBody(operation.requestBody)
          ? operation.requestBody.content?.['application/json']?.schema
          : undefined
      const requestBody = jsonBodySchema
        ? { fakerCode: schemaToFaker(jsonBodySchema), contentType: 'application/json' }
        : undefined
      const bodyRefs = jsonBodySchema
        ? collectSchemaRefs(jsonBodySchema, spec.components?.schemas)
        : []
      const paramRefs = resolvedParams.flatMap((p) =>
        collectSchemaRefs(p.schema, spec.components?.schemas),
      )
      const usedSchemaRefs = [...new Set([...bodyRefs, ...paramRefs])]
      const responseKeys = Object.keys(operation.responses || {})
      const successStatus =
        responseKeys
          .filter((s) => s.startsWith('2'))
          .map((s) => Number.parseInt(s, 10))
          .toSorted((a, b) => a - b)[0] ?? 200
      const errorStatuses = responseKeys
        .filter((s) => (s.startsWith('4') || s.startsWith('5')) && s !== 'default')
        .map((s) => Number.parseInt(s, 10))
        .toSorted((a, b) => a - b)
      const security = extractSecurityRequirements(
        isSecurityArray(operation.security) ? operation.security : undefined,
        isSecurityArray(spec.security) ? spec.security : undefined,
        securitySchemes,
      )
      return [
        {
          operationId: operation.operationId || `${method}${path.replace(/\//g, '_')}`,
          method: method.toUpperCase(),
          path,
          summary: operation.summary || '',
          description: operation.description || '',
          tag: operation.tags?.[0],
          pathParams,
          queryParams,
          headerParams,
          requestBody,
          successStatus,
          errorStatuses,
          security,
          usedSchemaRefs,
        },
      ]
    }),
  )
}

function shallowRefs(schema: Schema): string[] {
  const selfRef = schema.$ref ? [schema.$ref.replace('#/components/schemas/', '')] : []
  const propRefs = schema.properties ? Object.values(schema.properties).flatMap(shallowRefs) : []
  const items = schema.items ? (Array.isArray(schema.items) ? schema.items : [schema.items]) : []
  const itemRefs = items.flatMap(shallowRefs)
  const compositeRefs = (['allOf', 'oneOf', 'anyOf'] as const).flatMap((key) => {
    const composite = schema[key]
    return composite ? composite.flatMap(shallowRefs) : []
  })
  return [...selfRef, ...propRefs, ...itemRefs, ...compositeRefs]
}

function reachesSelf(
  start: string,
  target: string,
  schemas: { [key: string]: Schema },
  visited: Set<string> = new Set<string>(),
): boolean {
  if (start === target) return true
  if (visited.has(start)) return false
  visited.add(start)
  const schema = schemas[start]
  if (!schema) return false
  return shallowRefs(schema).some((dep) => reachesSelf(dep, target, schemas, visited))
}

function detectCircularSchemas(schemas: { [key: string]: Schema }): Set<string> {
  return new Set(
    Object.keys(schemas).filter((name) => {
      const schema = schemas[name]
      if (!schema) return false
      return shallowRefs(schema).some((dep) => reachesSelf(dep, name, schemas))
    }),
  )
}

function topologicalOrder(
  usedSchemaNames: Set<string>,
  schemas: { [key: string]: Schema },
): string[] {
  const visit = (name: string, visited: Set<string>, visiting: Set<string>): string[] => {
    if (visited.has(name) || !usedSchemaNames.has(name) || visiting.has(name)) return []
    const nextVisiting = new Set(visiting).add(name)
    const schema = schemas[name]
    const depOrder = schema
      ? collectSchemaRefs(schema, schemas, new Set([name])).flatMap((dep) => {
          const subOrder = visit(dep, visited, nextVisiting)
          for (const n of subOrder) visited.add(n)
          return subOrder
        })
      : []
    visited.add(name)
    return [...depOrder, name]
  }
  const visited = new Set<string>()
  return [...usedSchemaNames].flatMap((name) => visit(name, visited, new Set()))
}

function makeMockFunctions(spec: OpenAPI, usedSchemaNames: Set<string>): string {
  if (!spec.components?.schemas || usedSchemaNames.size === 0) return ''
  const schemas = spec.components.schemas
  const circular = detectCircularSchemas(schemas)
  return topologicalOrder(usedSchemaNames, schemas)
    .map((name) => {
      const returnType = circular.has(name) ? ': any' : ''
      return `function mock${name.replace(/\./g, '')}()${returnType} {\n  return ${schemaToFaker(schemas[name])}\n}`
    })
    .join('\n\n')
}

function getNonExistentValue(schema?: Schema, schemas?: { [key: string]: Schema }): string {
  if (!schema) return '__non_existent__'
  const resolved =
    schema.$ref && schemas
      ? (schemas[schema.$ref.replace('#/components/schemas/', '')] ?? schema)
      : schema
  if (resolved.type === 'integer' || resolved.type === 'number') return '-1'
  if (resolved.format === 'uuid') return '00000000-0000-0000-0000-000000000000'
  return '__non_existent__'
}

function makeAuthHeader(sec: {
  type: 'bearer' | 'apiKey' | 'basic' | 'oauth2'
  name: string
  in?: 'header' | 'query' | 'cookie'
}): string {
  switch (sec.type) {
    case 'bearer':
    case 'oauth2':
      return "'Authorization':`Bearer ${faker.string.alphanumeric(32)}`"
    case 'basic':
      return "'Authorization':`Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`"
    case 'apiKey':
      if (sec.in === 'header') return `'${sec.name}':faker.string.alphanumeric(32)`
      return ''
  }
}

function makeTestCase(
  tc: ReturnType<typeof extractTestCases>[number],
  basePath = '/',
  schemas?: { [k: string]: Schema },
): string {
  const basePathPrefix = basePath !== '/' ? basePath : ''
  const fullPath =
    tc.path === '/' && basePathPrefix ? basePathPrefix : `${basePathPrefix}${tc.path}`
  const testPath = tc.pathParams.reduce(
    (path, param) => path.replace(`{${param.name}}`, `\${${param.name}}`),
    fullPath,
  )
  const pathSetup = tc.pathParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const querySetup = tc.queryParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const queryParts = tc.queryParams.map(
    (param) => `${param.name}=\${encodeURIComponent(String(${param.name}))}`,
  )
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
  const requiredHeaderParams = tc.headerParams.filter((p) => p.required)
  const headerSetup = requiredHeaderParams.map((param) => `const ${param.name}=${param.fakerCode}`)
  const headerEntries = requiredHeaderParams.map((param) => `'${param.name}':String(${param.name})`)
  const authHeaders = tc.security.map(makeAuthHeader).filter(Boolean)
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
  const summaryPart = tc.summary ? ` - ${escapeString(tc.summary)}` : ''
  const itDescription = `should return ${tc.successStatus}${summaryPart}`
  const setupCode = [...pathSetup, ...querySetup, ...headerSetup, bodySetup]
    .filter(Boolean)
    .join('\n')
  const mainTest = `describe('${tc.method} ${fullPath}',()=>{it('${itDescription}',async()=>{${setupCode}\nconst res=await app.request(\`${testPath}${queryString}\`,{method:'${tc.method}'${headersOption}${bodyOption}})\nexpect(res.status).toBe(${tc.successStatus})})`
  const unauthorizedTest =
    tc.security.length > 0
      ? `\nit('should return 401 without auth',async()=>{${setupCode}\nconst res=await app.request(\`${testPath}${queryString}\`,{method:'${tc.method}'${headersWithoutAuth}${bodyOption}})\nexpect(res.status).toBe(401)})`
      : ''
  const notFoundTest =
    tc.pathParams.length > 0 && tc.errorStatuses.includes(404)
      ? (() => {
          const notFoundPath = tc.pathParams.reduce(
            (path, param) =>
              path.replace(`{${param.name}}`, getNonExistentValue(param.schema, schemas)),
            fullPath,
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

const TEST_IMPORT_SOURCE: Record<'vitest' | 'vite-plus' | 'bun', string> = {
  vitest: 'vitest',
  'vite-plus': 'vite-plus/test',
  bun: 'bun:test',
}

export function makeTestFile(
  spec: OpenAPI,
  appImportPath: string = './app',
  basePath = '/',
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
): string {
  const testCases = extractTestCases(spec)
  const apiTitle = spec.info?.title || 'API'
  const usedSchemaNames = new Set(testCases.flatMap((tc) => tc.usedSchemaRefs))
  const byTag = testCases.reduce((acc, tc) => {
    const tag = tc.tag || 'default'
    return acc.set(tag, [...(acc.get(tag) || []), tc])
  }, new Map<string, ReturnType<typeof extractTestCases>>())
  const mockFunctions = makeMockFunctions(spec, usedSchemaNames)
  const tagDescribes = Array.from(byTag.entries())
    .map(([tag, cases]) => {
      const tagInfo = spec.tags?.find((t) => t.name === tag)
      const tagDescription = tagInfo?.description || tag
      const testCasesCode = cases
        .map((tc) => makeTestCase(tc, basePath, spec.components?.schemas))
        .join('')
      return `describe('${escapeString(tagDescription)}',()=>{${testCasesCode}})\n`
    })
    .join('')
  const mockSection = mockFunctions ? `${mockFunctions}\n\n` : ''
  const body = `${mockSection}describe('${escapeString(apiTitle)}',()=>{${tagDescribes}})\n`
  const needsFaker = body.includes('faker.')
  const fakerImport = needsFaker ? `\nimport{faker}from'@faker-js/faker'` : ''
  const testImportSource = TEST_IMPORT_SOURCE[testFramework]
  const imports = `import{describe,it,expect}from'${testImportSource}'${fakerImport}\nimport app from'${appImportPath}'\n`
  return `${imports}\n${body}`
}

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

export function makeHandlerTestCode(
  spec: OpenAPI,
  handlerPath: string,
  _routeNames: string[],
  importFrom: string,
  basePath = '/',
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
): string {
  const handlerFileName = handlerPath.split('/').pop()?.replace(/\.ts$/, '') ?? ''
  const testCases = extractTestCases(spec)
  const relevantCases = testCases.filter((tc) => getPathFirstSegment(tc.path) === handlerFileName)
  if (relevantCases.length === 0) return ''
  const usedSchemaNames = new Set(relevantCases.flatMap((tc) => tc.usedSchemaRefs))
  const mockFunctions = makeMockFunctions(spec, usedSchemaNames)
  const testCasesCode = relevantCases
    .map((tc) => makeTestCase(tc, basePath, spec.components?.schemas))
    .join('')
  const mockSection = mockFunctions ? `${mockFunctions}\n\n` : ''
  const resourceName = handlerFileName.charAt(0).toUpperCase() + handlerFileName.slice(1)
  const body = `${mockSection}describe('${resourceName}',()=>{${testCasesCode}})\n`
  const needsFaker = body.includes('faker.')
  const fakerImport = needsFaker ? `\nimport{faker}from'@faker-js/faker'` : ''
  const testImportSource = TEST_IMPORT_SOURCE[testFramework]
  const imports = `import{describe,it,expect}from'${testImportSource}'${fakerImport}\nimport app from'${importFrom}'\n`
  return `${imports}\n${body}`
}
