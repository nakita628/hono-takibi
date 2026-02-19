import { STATUS_CODES } from 'node:http'
import {
  isMedia,
  isRecord,
  isRefObject,
  isRequestBody,
  isSecurityArray,
  isSecurityScheme,
} from '../../guard/index.js'
import type {
  Components,
  OpenAPI,
  Operation,
  Parameter,
  Responses,
  Schema,
} from '../../openapi/index.js'

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const

type HttpMethod = (typeof HTTP_METHODS)[number]

type Endpoint = {
  readonly method: HttpMethod
  readonly path: string
  readonly operation: Operation
}

const MAX_SCHEMA_DEPTH = 50

// ---------------------------------------------------------------------------
// Slug / anchor helpers
// ---------------------------------------------------------------------------

/**
 * Converts text to a widdershins-compatible slug for HTML id attributes.
 * Lowercases ASCII, keeps non-ASCII (e.g. Japanese), removes special chars.
 */
function toSlug(text: string): string {
  const str = typeof text === 'string' ? text : String(text ?? '')
  return str
    .replace(/[A-Z]/g, (c) => c.toLowerCase())
    .replace(/[^a-z0-9\u3000-\u9fff\uff00-\uffef -]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Converts an API title to a widdershins-style anchor slug.
 */
function toTitleSlug(title: string): string {
  const str = typeof title === 'string' ? title : String(title ?? '')
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
}

// ---------------------------------------------------------------------------
// $ref resolution
// ---------------------------------------------------------------------------

function lookupComponentSection(
  components: Components,
  section: string,
): { readonly [k: string]: unknown } | undefined {
  switch (section) {
    case 'schemas':
      return components.schemas
    case 'responses':
      return components.responses
    case 'parameters':
      return components.parameters
    case 'examples':
      return components.examples
    case 'requestBodies':
      return components.requestBodies
    case 'headers':
      return components.headers
    case 'securitySchemes':
      return components.securitySchemes
    case 'links':
      return components.links
    case 'callbacks':
      return components.callbacks
    case 'pathItems':
      return components.pathItems
    case 'mediaTypes':
      return components.mediaTypes
    default:
      return undefined
  }
}

function resolveRef(ref: string, components: Components | undefined): unknown {
  if (!components) return undefined
  const parts = ref.split('/')
  const section = parts[2]
  const name = parts[3]
  if (!(section && name)) return undefined
  const sectionObj = lookupComponentSection(components, section)
  if (!sectionObj) return undefined
  return sectionObj[name]
}

function refName(ref: string): string {
  return ref.split('/').at(-1) ?? ''
}

function resolveResponse(response: Responses, components: Components | undefined): Responses {
  if (!response.$ref) return response
  const resolved = resolveRef(response.$ref, components)
  return resolved && typeof resolved === 'object' ? (resolved as Responses) : response
}

// ---------------------------------------------------------------------------
// Schema type formatting (widdershins-compatible)
// ---------------------------------------------------------------------------

/**
 * Formats a schema type string as widdershins does.
 * Examples: "string(email)", "integer(int64)", "[User](#schemauser)", "[[User](#schemauser)]"
 */
function formatSchemaType(schema: Schema, components: Components | undefined): string {
  if (!schema) return 'object'
  if (schema.$ref) {
    const name = refName(schema.$ref)
    return `[${name}](#schema${name.toLowerCase()})`
  }
  if (schema.type === 'array' && schema.items) {
    const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (itemSchema) {
      const inner = formatSchemaType(itemSchema, components)
      return `[${inner}]`
    }
    return 'array'
  }
  const baseType = Array.isArray(schema.type) ? schema.type.join(' | ') : (schema.type ?? 'object')
  if (schema.format) return `${baseType}(${schema.format})`
  return baseType
}

// ---------------------------------------------------------------------------
// Example generation (widdershins-compatible defaults)
// ---------------------------------------------------------------------------

/**
 * Returns a default example string for the given OpenAPI string format.
 * Values use RFC-reserved addresses and domains for documentation.
 * @see https://www.rfc-editor.org/rfc/rfc2606 - Reserved domains (example.com)
 * @see https://www.rfc-editor.org/rfc/rfc5737 - Documentation IPv4 (192.0.2.0/24)
 * @see https://www.rfc-editor.org/rfc/rfc3849 - Documentation IPv6 (2001:DB8::/32)
 */
function makeDefaultString(format: string | undefined): string {
  switch (format) {
    case 'email':
      return 'user@example.com'
    case 'date-time':
      return '1970-01-01T00:00:00Z'
    case 'date':
      return '1970-01-01'
    case 'time':
      return '00:00:00Z'
    case 'uri':
    case 'url':
      return 'http://example.com'
    case 'uuid':
    case 'uuidv4':
      return '497f6eca-6276-4993-bfeb-53cbbbba6f08'
    case 'ipv4':
      return '192.0.2.1'
    case 'ipv6':
      return '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
    case 'password':
      return 'password'
    case 'byte':
      return 'string'
    case 'binary':
      return 'string'
    case 'hostname':
      return 'example.com'
    default:
      return 'string'
  }
}

function makeDefaultValue(schema: Schema): unknown {
  switch (schema.type) {
    case 'string':
      return makeDefaultString(schema.format)
    case 'number':
    case 'integer':
      return schema.minimum !== undefined ? schema.minimum : 0
    case 'boolean':
      return true
    default:
      return null
  }
}

function makeExampleFromSchema(
  schema: Schema,
  components: Components | undefined,
  visited: Set<string> = new Set(),
  depth = 0,
): unknown {
  if (depth > MAX_SCHEMA_DEPTH) return {}

  if (schema.$ref) {
    if (visited.has(schema.$ref)) return {}
    visited.add(schema.$ref)
    const name = refName(schema.$ref)
    const resolved = components?.schemas?.[name]
    if (resolved) return makeExampleFromSchema(resolved, components, visited, depth + 1)
    return {}
  }

  if (schema.example !== undefined) return schema.example

  if (schema.enum && schema.enum.length > 0) return schema.enum[0]

  if (schema.type === 'object' && schema.properties) {
    const result: { [k: string]: unknown } = {}
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      result[key] = makeExampleFromSchema(propSchema, components, visited, depth + 1)
    }
    return result
  }

  if (schema.type === 'array' && schema.items) {
    const item = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (item) return [makeExampleFromSchema(item, components, visited, depth + 1)]
    return []
  }

  // allOf / oneOf / anyOf
  if (schema.allOf?.length) {
    const merged: { [k: string]: unknown } = {}
    for (const sub of schema.allOf) {
      const example = makeExampleFromSchema(sub, components, visited, depth + 1)
      if (typeof example === 'object' && example !== null && !Array.isArray(example)) {
        Object.assign(merged, example)
      }
    }
    return merged
  }
  if (schema.oneOf?.length) {
    return makeExampleFromSchema(schema.oneOf[0], components, visited, depth + 1)
  }
  if (schema.anyOf?.length) {
    return makeExampleFromSchema(schema.anyOf[0], components, visited, depth + 1)
  }

  return makeDefaultValue(schema)
}

// ---------------------------------------------------------------------------
// Security helpers
// ---------------------------------------------------------------------------

function extractSecurityRequirements(
  security: Operation['security'] | undefined,
): readonly { readonly [k: string]: readonly string[] }[] {
  if (!security) return []
  if (!isSecurityArray(security)) return []
  return security
}

/**
 * Builds the `# Authentication` section from securitySchemes.
 */
function makeAuthenticationSection(
  securitySchemes: Components['securitySchemes'] | undefined,
): string[] {
  if (!securitySchemes) return []
  const lines: string[] = ['# Authentication', '']
  for (const [name, scheme] of Object.entries(securitySchemes)) {
    if (!isSecurityScheme(scheme)) continue
    const desc = scheme.description ?? ''
    if (scheme.type === 'http' && scheme.scheme === 'bearer') {
      lines.push(`- HTTP Authentication, scheme: bearer ${desc}`.trimEnd(), '')
    } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
      lines.push(`- HTTP Authentication, scheme: basic ${desc}`.trimEnd(), '')
    } else if (scheme.type === 'apiKey') {
      const schemeIn = scheme.in ?? 'header'
      lines.push(
        `* API Key (${name})`,
        `    - Parameter Name: **${scheme.name}**, in: ${schemeIn}. ${desc}`.trimEnd(),
        '',
      )
    } else if (scheme.type === 'oauth2') {
      lines.push(`- oAuth2 authentication. ${desc}`.trimEnd(), '')
      if (scheme.flows && typeof scheme.flows === 'object') {
        for (const [flowName, flowValue] of Object.entries(scheme.flows)) {
          if (!flowValue || typeof flowValue !== 'object') continue
          const flow = flowValue as {
            readonly authorizationUrl?: string
            readonly tokenUrl?: string
            readonly scopes?: { readonly [k: string]: string }
          }
          lines.push(`    - Flow: ${flowName}`)
          if (flow.authorizationUrl) {
            lines.push(
              `    - Authorization URL = [${flow.authorizationUrl}](${flow.authorizationUrl})`,
            )
          }
          if (flow.tokenUrl) {
            lines.push(`    - Token URL = [${flow.tokenUrl}](${flow.tokenUrl})`)
          }
          if (flow.scopes && Object.keys(flow.scopes).length > 0) {
            lines.push('', '|Scope|Scope Description|', '|---|---|')
            for (const [scope, scopeDesc] of Object.entries(flow.scopes)) {
              lines.push(`|${scope}|${scopeDesc}|`)
            }
          }
          lines.push('')
        }
      }
    } else if (scheme.type === 'openIdConnect') {
      lines.push(`- OpenID Connect authentication. ${desc}`.trimEnd(), '')
    }
  }
  return lines
}

/**
 * Generates <aside> tag content for an endpoint's security requirements.
 */
function makeAsideAuth(
  operation: Operation,
  globalSecurity: OpenAPI['security'] | undefined,
  securitySchemes: Components['securitySchemes'] | undefined,
): string[] {
  const security = operation.security ?? globalSecurity
  const reqs = extractSecurityRequirements(security)
  if (reqs.length === 0) {
    return ['<aside class="success">', 'This operation does not require authentication', '</aside>']
  }

  // Build auth method descriptions matching widdershins format
  const methods: string[] = []
  for (const req of reqs) {
    if (!isRecord(req)) continue
    const parts: string[] = []
    for (const [name, scopes] of Object.entries(req)) {
      if (!securitySchemes) {
        parts.push(name)
        continue
      }
      const scheme = securitySchemes[name]
      if (!(scheme && isSecurityScheme(scheme))) {
        parts.push(name)
        continue
      }
      const scopeArr = Array.isArray(scopes) ? scopes : []
      if (scheme.type === 'oauth2' && scopeArr.length > 0) {
        parts.push(`${name} ( Scopes: ${scopeArr.join(' ')} )`)
      } else {
        parts.push(name)
      }
    }
    methods.push(parts.join(' & '))
  }

  return [
    '<aside class="warning">',
    'To perform this operation, you must be authenticated by means of one of the following methods:',
    methods.join(', '),
    '</aside>',
  ]
}

// ---------------------------------------------------------------------------
// Code sample helpers (hono request)
// ---------------------------------------------------------------------------

function makeCodeSampleHeaders(
  operation: Operation,
  securitySchemes: Components['securitySchemes'] | undefined,
): string[] {
  const headers: string[] = []

  // Content-Type for request body
  if (
    operation.requestBody &&
    isRequestBody(operation.requestBody) &&
    operation.requestBody.content
  ) {
    const { content } = operation.requestBody
    if (content['application/json']) {
      headers.push("  -H 'Content-Type: application/json'")
    } else if (content['multipart/form-data']) {
      headers.push("  -H 'Content-Type: multipart/form-data'")
    } else if (content['application/x-www-form-urlencoded']) {
      headers.push("  -H 'Content-Type: application/x-www-form-urlencoded'")
    }
  }

  // Accept header based on response content types
  const hasJsonResponse = Object.values(operation.responses).some(
    (response) => response.content?.['application/json'],
  )
  if (hasJsonResponse) {
    headers.push("  -H 'Accept: application/json'")
  }

  // Auth headers – use shell-style ${VAR} so users can `export` and paste
  const security = operation.security
  const reqs = extractSecurityRequirements(security)
  if (reqs.length > 0 && securitySchemes) {
    const addedHeaders = new Set<string>()
    for (const req of reqs) {
      if (!isRecord(req)) continue
      for (const name of Object.keys(req)) {
        const scheme = securitySchemes[name]
        if (!(scheme && isSecurityScheme(scheme))) continue
        if (scheme.type === 'http' && scheme.scheme === 'bearer') {
          const h = `  -H "Authorization: Bearer \${ACCESS_TOKEN}"`
          if (!addedHeaders.has(h)) {
            headers.push(h)
            addedHeaders.add(h)
          }
        } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
          const h = `  -H "Authorization: Basic \${CREDENTIALS}"`
          if (!addedHeaders.has(h)) {
            headers.push(h)
            addedHeaders.add(h)
          }
        } else if (scheme.type === 'apiKey' && scheme.in === 'header' && scheme.name) {
          const h = `  -H "${scheme.name}: \${API_KEY}"`
          if (!addedHeaders.has(h)) {
            headers.push(h)
            addedHeaders.add(h)
          }
        } else if (scheme.type === 'oauth2') {
          const h = `  -H "Authorization: Bearer \${ACCESS_TOKEN}"`
          if (!addedHeaders.has(h)) {
            headers.push(h)
            addedHeaders.add(h)
          }
        }
      }
      // Only use first security requirement for code sample
      break
    }
  }

  return headers
}

function extractMediaExample(jsonMedia: {
  readonly example?: unknown
  readonly examples?: {
    readonly [k: string]: { readonly value?: unknown } | { readonly $ref?: string }
  }
}): unknown | undefined {
  if (jsonMedia.example !== undefined) return jsonMedia.example
  if (jsonMedia.examples) {
    const first = Object.values(jsonMedia.examples)[0]
    if (first && 'value' in first && first.value !== undefined) return first.value
  }
  return undefined
}

function makeCodeSampleBody(
  operation: Operation,
  components: Components | undefined,
): string | undefined {
  if (!operation.requestBody) return undefined
  if (!isRequestBody(operation.requestBody)) return undefined
  const jsonMedia = operation.requestBody.content?.['application/json']
  if (!(jsonMedia && isMedia(jsonMedia) && jsonMedia.schema)) return undefined
  const mediaExample = extractMediaExample(jsonMedia)
  if (mediaExample !== undefined) return JSON.stringify(mediaExample, null, 2)
  const example = makeExampleFromSchema(jsonMedia.schema, components)
  return JSON.stringify(example, null, 2)
}

/**
 * Re-indents a JSON body so it sits properly inside a curl/hono -d flag.
 * Adds 2-space base indent to all lines after the first (opening brace).
 */
function indentJsonBody(body: string): string {
  const lines = body.split('\n')
  if (lines.length <= 1) return body
  return [lines[0], ...lines.slice(1).map((l) => `  ${l}`)].join('\n')
}

function makeCodeSample(
  method: HttpMethod,
  pathStr: string,
  basePath: string,
  operation: Operation,
  securitySchemes: Components['securitySchemes'] | undefined,
  components: Components | undefined,
  entry: string,
): string[] {
  const headers = makeCodeSampleHeaders(operation, securitySchemes)
  const safePath = basePath ?? '/'
  const basePathPrefix = safePath !== '/' ? safePath : ''
  const fullPath = `${basePathPrefix}${pathStr}`
  const body = makeCodeSampleBody(operation, components)

  const cmdParts = ['hono request \\', `  -X ${method.toUpperCase()} \\`, `  -P ${fullPath} \\`]

  cmdParts.push(...headers.map((h) => `${h} \\`))

  if (body) {
    cmdParts.push(`  -d '${indentJsonBody(body)}' \\`)
  }

  cmdParts.push(`  ${entry}`)

  return ['> Code samples', '', '```bash', cmdParts.join('\n'), '```']
}

function makeCodeSampleCurl(
  method: HttpMethod,
  pathStr: string,
  basePath: string,
  operation: Operation,
  securitySchemes: Components['securitySchemes'] | undefined,
  components: Components | undefined,
  baseUrl: string,
): string[] {
  const headers = makeCodeSampleHeaders(operation, securitySchemes)
  const safePath = basePath ?? '/'
  const basePathPrefix = safePath !== '/' ? safePath : ''
  const fullPath = `${basePathPrefix}${pathStr}`
  const body = makeCodeSampleBody(operation, components)
  const isGet = method === 'get'

  // Quote URL if it contains path parameters (curly braces)
  const url = fullPath.includes('{') ? `'${baseUrl}${fullPath}'` : `${baseUrl}${fullPath}`

  const remaining: string[] = []

  // Omit -X for GET (curl default)
  if (!isGet) {
    remaining.push(`  -X ${method.toUpperCase()}`)
  }

  remaining.push(...headers)

  if (body) {
    remaining.push(`  -d '${indentJsonBody(body)}'`)
  }

  if (remaining.length === 0) {
    return ['> Code samples', '', '```bash', `curl ${url}`, '```']
  }

  const cmdParts = [
    `curl ${url} \\`,
    ...remaining.slice(0, -1).map((r) => `${r} \\`),
    remaining[remaining.length - 1],
  ]

  return ['> Code samples', '', '```bash', cmdParts.join('\n'), '```']
}

// ---------------------------------------------------------------------------
// Parameters / Responses / Schema tables (widdershins format)
// ---------------------------------------------------------------------------

function isParameter(value: unknown): value is Parameter {
  return typeof value === 'object' && value !== null && 'name' in value && 'in' in value
}

function resolveOperationParameters(
  operation: Operation,
  components: Components | undefined,
): readonly Parameter[] {
  if (!operation.parameters) return []
  return operation.parameters.flatMap((p) => {
    if ('$ref' in p && p.$ref) {
      const resolved = resolveRef(p.$ref, components)
      if (isParameter(resolved)) return [resolved]
      return []
    }
    return [p]
  })
}

function getPathParameters(openAPI: OpenAPI, pathStr: string): readonly Parameter[] {
  const pathItem = openAPI.paths?.[pathStr]
  if (!pathItem?.parameters) return []
  const params: readonly (Parameter | { readonly $ref?: string })[] = pathItem.parameters
  return params.flatMap((p): Parameter[] => {
    if ('$ref' in p && p.$ref) {
      const resolved = resolveRef(p.$ref, openAPI.components)
      if (isParameter(resolved)) return [resolved]
      return []
    }
    if (isParameter(p)) return [p]
    return []
  })
}

/**
 * Generates body parameter rows with `»` nesting (widdershins format).
 */
function isSchemaLike(value: unknown): value is Schema {
  return typeof value === 'object' && value !== null
}

function resolveArrayItem(
  itemSchema: Schema,
  components: Components | undefined,
  visited: Set<string>,
): Schema {
  if (itemSchema.$ref && !visited.has(itemSchema.$ref)) {
    visited.add(itemSchema.$ref)
    const r = resolveRef(itemSchema.$ref, components)
    if (isSchemaLike(r)) return r
  }
  return itemSchema
}

function flattenBodyParams(
  schema: Schema,
  components: Components | undefined,
  prefix: string,
  visited: Set<string> = new Set(),
  depth = 0,
): readonly { name: string; in_: string; type: string; required: boolean; description: string }[] {
  if (depth > MAX_SCHEMA_DEPTH) return []

  if (schema.$ref) {
    if (visited.has(schema.$ref)) return []
    visited.add(schema.$ref)
    const resolved = resolveRef(schema.$ref, components)
    if (isSchemaLike(resolved)) {
      return flattenBodyParams(resolved, components, prefix, visited, depth + 1)
    }
    return []
  }

  if (schema.type === 'object' && schema.properties) {
    const requiredSet = new Set(schema.required ?? [])
    return Object.entries(schema.properties).flatMap(([key, propSchema]) => {
      const fullName = prefix ? `${prefix} ${key}` : `» ${key}`
      const row = {
        name: fullName,
        in_: 'body',
        type: formatSchemaType(propSchema, components),
        required: requiredSet.has(key),
        description: propSchema.description ?? 'none',
      }
      // Recurse into nested objects
      if (propSchema.type === 'object' && propSchema.properties) {
        const nextPrefix = prefix ? `${prefix}»` : '»»'
        return [
          row,
          ...flattenBodyParams(
            propSchema,
            components,
            nextPrefix.replace(/»/g, '» '),
            visited,
            depth + 1,
          ),
        ]
      }
      if (propSchema.$ref) {
        if (visited.has(propSchema.$ref)) return [row]
        visited.add(propSchema.$ref)
        const innerResolved = resolveRef(propSchema.$ref, components)
        if (isSchemaLike(innerResolved) && innerResolved.type === 'object') {
          const deepPrefix = prefix ? `${prefix}»` : '»»'
          return [
            row,
            ...flattenBodyParams(
              innerResolved,
              components,
              deepPrefix.replace(/»/g, '» '),
              visited,
              depth + 1,
            ),
          ]
        }
      }
      return [row]
    })
  }
  return []
}

function makeParametersTable(
  operation: Operation,
  pathParams: readonly Parameter[],
  operationParams: readonly Parameter[],
  components: Components | undefined,
): string[] {
  type Row = {
    name: string
    in_: string
    type: string
    required: string
    description: string
  }
  const rows: Row[] = []

  // Path, query, header, cookie parameters
  const seen = new Set<string>()
  for (const p of operationParams) {
    const key = `${p.name}:${p.in}`
    seen.add(key)
    rows.push({
      name: p.name,
      in_: p.in,
      type: formatSchemaType(p.schema, components),
      required: p.required ? 'true' : 'false',
      description: p.description ?? 'none',
    })
  }
  for (const p of pathParams) {
    const key = `${p.name}:${p.in}`
    if (seen.has(key)) continue
    rows.push({
      name: p.name,
      in_: p.in,
      type: formatSchemaType(p.schema, components),
      required: p.required ? 'true' : 'false',
      description: p.description ?? 'none',
    })
  }

  // Request body parameters (widdershins format with body/$ref row + `»` fields)
  const bodySchema = getBodySchema(operation.requestBody, components)
  if (bodySchema) {
    // Top-level body row
    const bodyTypeStr = bodySchema.$ref ? formatSchemaType(bodySchema, components) : 'object'
    const isRequired =
      operation.requestBody &&
      isRequestBody(operation.requestBody) &&
      operation.requestBody.required
    rows.push({
      name: 'body',
      in_: 'body',
      type: bodyTypeStr,
      required: isRequired ? 'true' : 'false',
      description: 'none',
    })

    // Flatten sub-fields
    const resolvedRef = bodySchema.$ref ? resolveRef(bodySchema.$ref, components) : undefined
    const resolved = isSchemaLike(resolvedRef) ? resolvedRef : bodySchema
    const subFields = flattenBodyParams(resolved, components, '', new Set())
    for (const f of subFields) {
      rows.push({
        name: f.name,
        in_: f.in_,
        type: f.type,
        required: f.required ? 'true' : 'false',
        description: f.description,
      })
    }
  }

  if (rows.length === 0) return []

  const heading = operation.summary ?? operation.operationId ?? ''
  const slugBase = toSlug(heading)

  return [
    `<h3 id="${slugBase}-parameters">Parameters</h3>`,
    '',
    '|Name|In|Type|Required|Description|',
    '|---|---|---|---|---|',
    ...rows.map((r) => `|${r.name}|${r.in_}|${r.type}|${r.required}|${r.description}|`),
    '',
  ]
}

function makeResponsesTable(operation: Operation, components: Components | undefined): string[] {
  const heading = operation.summary ?? operation.operationId ?? ''
  const slugBase = toSlug(heading)
  const rows: string[] = []

  for (const [statusCode, response] of Object.entries(operation.responses)) {
    const resolvedResponse = resolveResponse(response, components)

    const meaningStr = STATUS_CODES[statusCode] ?? statusCode
    const description = resolvedResponse.description ?? ''

    // Determine schema column
    const jsonMedia = resolvedResponse.content?.['application/json']
    const schemaStr =
      jsonMedia && isMedia(jsonMedia) && jsonMedia.schema
        ? jsonMedia.schema.$ref
          ? `[${refName(jsonMedia.schema.$ref)}](#schema${refName(jsonMedia.schema.$ref).toLowerCase()})`
          : 'Inline'
        : 'None'

    rows.push(`|${statusCode}|${meaningStr}|${description}|${schemaStr}|`)
  }

  return [
    `<h3 id="${slugBase}-responses">Responses</h3>`,
    '',
    '|Status|Meaning|Description|Schema|',
    '|---|---|---|---|',
    ...rows,
    '',
  ]
}

/**
 * Flattens response schema fields with `»` nesting for the Response Schema section.
 */
function flattenResponseSchemaFields(
  schema: Schema,
  components: Components | undefined,
  prefix: string,
  visited: Set<string> = new Set(),
  depth = 0,
): readonly {
  name: string
  type: string
  required: boolean
  restrictions: string
  description: string
}[] {
  if (depth > MAX_SCHEMA_DEPTH) return []

  if (schema.$ref) {
    if (visited.has(schema.$ref)) return []
    visited.add(schema.$ref)
    const resolved = resolveRef(schema.$ref, components)
    if (isSchemaLike(resolved)) {
      return flattenResponseSchemaFields(resolved, components, prefix, visited, depth + 1)
    }
    return []
  }

  if (schema.type === 'object' && schema.properties) {
    const requiredSet = new Set(schema.required ?? [])
    return Object.entries(schema.properties).flatMap(([key, propSchema]) => {
      const fullName = prefix ? `${prefix} ${key}` : key
      const row = {
        name: fullName,
        type: formatSchemaType(propSchema, components),
        required: requiredSet.has(key),
        restrictions: 'none',
        description: propSchema.description ?? 'none',
      }
      // Recurse
      const nextPrefix = prefix ? `${prefix}»` : '»'
      const nestedPrefix = nextPrefix.replace(/»/g, '» ').trimEnd()
      if (propSchema.type === 'object' && propSchema.properties) {
        return [
          row,
          ...flattenResponseSchemaFields(
            propSchema,
            components,
            `${nestedPrefix}`,
            visited,
            depth + 1,
          ),
        ]
      }
      if (propSchema.$ref) {
        if (visited.has(propSchema.$ref)) return [row]
        visited.add(propSchema.$ref)
        const innerResolved = resolveRef(propSchema.$ref, components)
        if (isSchemaLike(innerResolved) && innerResolved.type === 'object') {
          return [
            row,
            ...flattenResponseSchemaFields(
              innerResolved,
              components,
              `${nestedPrefix}`,
              visited,
              depth + 1,
            ),
          ]
        }
      }
      if (propSchema.type === 'array' && propSchema.items) {
        const itemSchema = Array.isArray(propSchema.items) ? propSchema.items[0] : propSchema.items
        if (itemSchema) {
          const resolvedItem = resolveArrayItem(itemSchema, components, visited)
          if (resolvedItem.type === 'object' && resolvedItem.properties) {
            return [
              row,
              ...flattenResponseSchemaFields(
                resolvedItem,
                components,
                `${nestedPrefix}`,
                visited,
                depth + 1,
              ),
            ]
          }
        }
      }
      return [row]
    })
  }

  if (schema.type === 'array' && schema.items) {
    const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (itemSchema) {
      const itemType = formatSchemaType(itemSchema, components)
      const anonRow = {
        name: '*anonymous*',
        type: `[${itemType}]`,
        required: false,
        restrictions: 'none',
        description: 'none',
      }
      const resolvedItem = resolveArrayItem(itemSchema, components, visited)
      if (resolvedItem.type === 'object' && resolvedItem.properties) {
        return [
          anonRow,
          ...flattenResponseSchemaFields(resolvedItem, components, '»', visited, depth + 1),
        ]
      }
      return [anonRow]
    }
  }

  return []
}

function makeResponseSchemaSection(
  operation: Operation,
  components: Components | undefined,
): string[] {
  const heading = operation.summary ?? operation.operationId ?? ''
  const slugBase = toSlug(heading)
  const lines: string[] = []

  for (const [statusCode, response] of Object.entries(operation.responses)) {
    const resolvedResponse = resolveResponse(response, components)

    const content = resolvedResponse.content
    if (!content) continue
    const jsonMedia = content['application/json']
    if (!jsonMedia) continue
    if (!isMedia(jsonMedia)) continue
    if (!jsonMedia.schema) continue

    // Only show Response Schema for inline schemas (not direct $ref)
    if (jsonMedia.schema.$ref) continue

    const fields = flattenResponseSchemaFields(jsonMedia.schema, components, '')
    if (fields.length === 0) continue

    lines.push(
      `<h3 id="${slugBase}-responseschema">Response Schema</h3>`,
      '',
      `Status Code **${statusCode}**`,
      '',
      '|Name|Type|Required|Restrictions|Description|',
      '|---|---|---|---|---|',
      ...fields.map(
        (f) => `|${f.name}|${f.type}|${f.required}|${f.restrictions}|${f.description}|`,
      ),
      '',
    )
  }
  return lines
}

// ---------------------------------------------------------------------------
// Response examples
// ---------------------------------------------------------------------------

function makeResponseExamples(
  responses: Operation['responses'],
  components: Components | undefined,
): string[] {
  const lines: string[] = []
  for (const [statusCode, response] of Object.entries(responses)) {
    const resolvedResponse = resolveResponse(response, components)

    const content = resolvedResponse.content
    if (!content) continue
    const jsonMedia = content['application/json']
    if (!jsonMedia) continue
    if (!isMedia(jsonMedia)) continue
    if (!jsonMedia.schema) continue

    const mediaExample = extractMediaExample(jsonMedia)
    const example =
      mediaExample !== undefined
        ? mediaExample
        : makeExampleFromSchema(jsonMedia.schema, components)
    const json = JSON.stringify(example, null, 2)
    lines.push(`> ${statusCode} Response`, '', '```json', json, '```', '')
  }
  return lines
}

// ---------------------------------------------------------------------------
// Body parameter helpers
// ---------------------------------------------------------------------------

function getBodySchema(
  requestBody: Operation['requestBody'] | undefined,
  components: Components | undefined,
): Schema | undefined {
  if (!requestBody) return undefined
  const body = isRefObject(requestBody) ? resolveRef(requestBody.$ref, components) : requestBody
  if (!(body && isRequestBody(body) && body.content)) return undefined
  const mediaEntry = body.content['application/json']
  if (!(mediaEntry && isMedia(mediaEntry) && mediaEntry.schema)) return undefined
  return mediaEntry.schema
}

// ---------------------------------------------------------------------------
// Enumerated values
// ---------------------------------------------------------------------------

function collectEnumeratedValues(
  operation: Operation,
  components: Components | undefined,
): string[] {
  type EnumValue = Schema['enum'] extends readonly (infer T)[] | undefined ? T : never
  type EnumRow = { param: string; value: EnumValue }
  const rows: EnumRow[] = []

  // From parameters
  if (operation.parameters) {
    for (const p of operation.parameters) {
      if ('$ref' in p && p.$ref) continue
      if (p.schema?.enum) {
        for (const v of p.schema.enum) {
          rows.push({ param: p.name, value: v })
        }
      }
    }
  }

  // From body schema
  const bodySchema = getBodySchema(operation.requestBody, components)
  if (bodySchema) {
    const resolvedRef = bodySchema.$ref ? resolveRef(bodySchema.$ref, components) : undefined
    const resolved = isSchemaLike(resolvedRef) ? resolvedRef : bodySchema
    if (resolved.properties) {
      for (const [key, propSchema] of Object.entries(resolved.properties)) {
        if (propSchema.enum) {
          for (const v of propSchema.enum) {
            rows.push({ param: `» ${key}`, value: v })
          }
        }
      }
    }
  }

  if (rows.length === 0) return []

  return [
    '#### Enumerated Values',
    '',
    '|Parameter|Value|',
    '|---|---|',
    ...rows.map((r) => `|${r.param}|${r.value}|`),
    '',
  ]
}

// ---------------------------------------------------------------------------
// Schemas section (end of document)
// ---------------------------------------------------------------------------

function flattenSchemaProperties(
  schema: Schema,
  components: Components | undefined,
  prefix: string,
  visited: Set<string> = new Set(),
  depth = 0,
): readonly {
  name: string
  type: string
  required: boolean
  restrictions: string
  description: string
}[] {
  if (depth > MAX_SCHEMA_DEPTH) return []

  if (schema.$ref) {
    if (visited.has(schema.$ref)) return []
    visited.add(schema.$ref)
    const resolved = resolveRef(schema.$ref, components)
    if (isSchemaLike(resolved)) {
      return flattenSchemaProperties(resolved, components, prefix, visited, depth + 1)
    }
    return []
  }

  if (schema.type === 'object' && schema.properties) {
    const requiredSet = new Set(schema.required ?? [])
    return Object.entries(schema.properties).flatMap(([key, propSchema]) => {
      const fullName = prefix ? `${prefix} ${key}` : key
      return [
        {
          name: fullName,
          type: formatSchemaType(propSchema, components),
          required: requiredSet.has(key),
          restrictions: 'none',
          description: propSchema.description ?? 'none',
        },
      ]
    })
  }

  return []
}

function collectSchemaEnumeratedValues(schema: Schema): readonly {
  property: string
  value: Schema['enum'] extends readonly (infer T)[] | undefined ? T : never
}[] {
  type EnumValue = Schema['enum'] extends readonly (infer T)[] | undefined ? T : never
  const rows: { property: string; value: EnumValue }[] = []
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (propSchema.enum) {
        for (const v of propSchema.enum) {
          rows.push({ property: key, value: v })
        }
      }
    }
  }
  return rows
}

function makeSchemasSection(
  schemas: { readonly [k: string]: Schema } | undefined,
  components: Components | undefined,
): string[] {
  if (!schemas || Object.keys(schemas).length === 0) return []

  const lines: string[] = ['# Schemas', '']

  for (const [name, schema] of Object.entries(schemas)) {
    const nameLower = name.toLowerCase()

    // Schema heading with backwards-compatibility anchors
    lines.push(
      `<h2 id="tocS_${name}">${name}</h2>`,
      '<!-- backwards compatibility -->',
      `<a id="schema${nameLower}"></a>`,
      `<a id="schema_${name}"></a>`,
      `<a id="tocS${nameLower}"></a>`,
      `<a id="tocs${nameLower}"></a>`,
      '',
    )

    // JSON example
    const example = makeExampleFromSchema(schema, components)
    const json = JSON.stringify(example, null, 2)
    lines.push('```json', json, '```', '')

    // Properties table
    const fields = flattenSchemaProperties(schema, components, '')
    if (fields.length > 0) {
      lines.push(
        '### Properties',
        '',
        '|Name|Type|Required|Restrictions|Description|',
        '|---|---|---|---|---|',
        ...fields.map(
          (f) => `|${f.name}|${f.type}|${f.required}|${f.restrictions}|${f.description}|`,
        ),
        '',
      )
    }

    // Enumerated values
    const enumRows = collectSchemaEnumeratedValues(schema)
    if (enumRows.length > 0) {
      lines.push(
        '#### Enumerated Values',
        '',
        '|Property|Value|',
        '|---|---|',
        ...enumRows.map((r) => `|${r.property}|${r.value}|`),
        '',
      )
    }
  }

  return lines
}

// ---------------------------------------------------------------------------
// Endpoint collection & grouping
// ---------------------------------------------------------------------------

function collectEndpoints(openAPI: OpenAPI): readonly Endpoint[] {
  if (!openAPI.paths) return []
  return Object.entries(openAPI.paths).flatMap(([pathStr, pathItem]) => {
    if (!pathItem) return []
    return HTTP_METHODS.flatMap((method) => {
      const operation = pathItem[method]
      if (!operation) return []
      return [{ method, path: pathStr, operation }]
    })
  })
}

type TagGroup = {
  name: string
  description?: string
  endpoints: Endpoint[]
}

function groupByTag(endpoints: readonly Endpoint[], openAPI: OpenAPI): readonly TagGroup[] {
  const tagMap = new Map<string, Endpoint[]>()
  const tagOrder: string[] = []

  // Pre-populate tag order from openAPI.tags
  if (openAPI.tags) {
    for (const tag of openAPI.tags) {
      tagOrder.push(tag.name)
      tagMap.set(tag.name, [])
    }
  }

  for (const ep of endpoints) {
    const tags = ep.operation.tags
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        if (!tagMap.has(tag)) {
          tagOrder.push(tag)
          tagMap.set(tag, [])
        }
        tagMap.get(tag)?.push(ep)
      }
    } else {
      if (!tagMap.has('Default')) {
        tagOrder.push('Default')
        tagMap.set('Default', [])
      }
      tagMap.get('Default')?.push(ep)
    }
  }

  const tagDescriptions = new Map<string, string>()
  if (openAPI.tags) {
    for (const tag of openAPI.tags) {
      if (tag.description) tagDescriptions.set(tag.name, tag.description)
    }
  }

  return tagOrder
    .filter((name) => tagMap.has(name) && (tagMap.get(name)?.length ?? 0) > 0)
    .map((name) => {
      const desc = tagDescriptions.get(name)
      const group: TagGroup = { name, endpoints: tagMap.get(name) ?? [] }
      if (desc !== undefined) group.description = desc
      return group
    })
}

// ---------------------------------------------------------------------------
// Main export: makeDocs
// ---------------------------------------------------------------------------

/**
 * Makes API reference Markdown from an OpenAPI specification.
 * Output format matches Widdershins v4.0.1, with hono request instead of curl.
 */
export function makeDocs(
  openAPI: OpenAPI,
  entry = 'src/index.ts',
  basePath = '/',
  curl = false,
  baseUrl?: string,
): string {
  const title = openAPI.info?.title ?? 'API'
  const version = openAPI.info?.version ?? ''
  const fullTitle = version ? `${title} v${version}` : title
  const titleSlug = toTitleSlug(title)

  const securitySchemes = openAPI.components?.securitySchemes

  const lines: string[] = []

  // ── Title ──
  lines.push(`<h1 id="${titleSlug}">${fullTitle}</h1>`, '')

  // ── Scroll Down Message ──
  lines.push(
    '> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.',
    '',
  )

  // ── API Description ──
  if (openAPI.info?.description) {
    lines.push(openAPI.info.description.trimEnd(), '')
  }

  // ── Base URLs ──
  if (openAPI.servers && openAPI.servers.length > 0) {
    lines.push('Base URLs:', '')
    for (const server of openAPI.servers) {
      lines.push(`* <a href="${server.url}">${server.url}</a>`, '')
    }
  }

  // ── Contact / License ──
  if (openAPI.info?.contact?.email && openAPI.info?.contact?.name) {
    lines.push(
      `Email: <a href="mailto:${openAPI.info.contact.email}">${openAPI.info.contact.name}</a> `,
    )
  }
  if (openAPI.info?.license?.name) {
    const licenseUrl = openAPI.info.license.url
    if (licenseUrl) {
      lines.push(`License: <a href="${licenseUrl}">${openAPI.info.license.name}</a>`)
    } else {
      lines.push(`License: ${openAPI.info.license.name}`)
    }
  }
  if (openAPI.info?.contact?.email || openAPI.info?.license) {
    lines.push('')
  }

  // ── Authentication Section ──
  const authLines = makeAuthenticationSection(securitySchemes)
  if (authLines.length > 0) {
    lines.push(...authLines)
  }

  // ── Endpoints by Tag ──
  const endpoints = collectEndpoints(openAPI)
  const tagGroups = groupByTag(endpoints, openAPI)

  for (const group of tagGroups) {
    // Tag heading
    const tagSlug = toSlug(group.name)
    lines.push(`<h1 id="${titleSlug}-${tagSlug}">${group.name}</h1>`, '')

    if (group.description) {
      lines.push(group.description, '')
    }

    for (const { method, path: pathStr, operation } of group.endpoints) {
      // Endpoint heading
      const heading = operation.summary ?? operation.operationId ?? `${method}${pathStr}`

      lines.push(`## ${heading}`, '')

      // operationId anchor
      if (operation.operationId) {
        lines.push(`<a id="opId${operation.operationId}"></a>`, '')
      }

      // Code sample
      const codeSampleLines =
        curl && baseUrl
          ? makeCodeSampleCurl(
              method,
              pathStr,
              basePath,
              operation,
              securitySchemes,
              openAPI.components,
              baseUrl,
            )
          : makeCodeSample(
              method,
              pathStr,
              basePath,
              operation,
              securitySchemes,
              openAPI.components,
              entry,
            )
      lines.push(...codeSampleLines, '')

      // Method + path
      lines.push(`\`${method.toUpperCase()} ${pathStr}\``, '')

      // Description
      if (operation.description) {
        lines.push(operation.description, '')
      }

      // Body parameter
      const bodySchema = getBodySchema(operation.requestBody, openAPI.components)
      if (bodySchema) {
        const bodyExample = makeExampleFromSchema(bodySchema, openAPI.components)
        const bodyJson = JSON.stringify(bodyExample, null, 2)
        lines.push('> Body parameter', '', '```json', bodyJson, '```', '')
      }

      // Parameters table
      const pathParams = getPathParameters(openAPI, pathStr)
      const operationParams = resolveOperationParameters(operation, openAPI.components)
      const paramLines = makeParametersTable(
        operation,
        pathParams,
        operationParams,
        openAPI.components,
      )
      if (paramLines.length > 0) {
        lines.push(...paramLines)
      }

      // Enumerated values (for parameters)
      const enumLines = collectEnumeratedValues(operation, openAPI.components)
      if (enumLines.length > 0) {
        lines.push(...enumLines)
      }

      // Response examples
      const responseExampleLines = makeResponseExamples(operation.responses, openAPI.components)
      if (responseExampleLines.length > 0) {
        lines.push('> Example responses', '', ...responseExampleLines)
      }

      // Responses table
      const responsesTableLines = makeResponsesTable(operation, openAPI.components)
      lines.push(...responsesTableLines)

      // Response Schema section (only for inline schemas)
      const responseSchemaLines = makeResponseSchemaSection(operation, openAPI.components)
      if (responseSchemaLines.length > 0) {
        lines.push(...responseSchemaLines)
      }

      // Authentication aside
      const asideLines = makeAsideAuth(operation, openAPI.security, securitySchemes)
      lines.push(...asideLines, '')
    }
  }

  // ── Schemas Section ──
  const schemasLines = makeSchemasSection(openAPI.components?.schemas, openAPI.components)
  if (schemasLines.length > 0) {
    lines.push(...schemasLines)
  }

  return lines.join('\n')
}
