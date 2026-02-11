import {
  isMedia,
  isRecord,
  isRefObject,
  isRequestBody,
  isSecurityArray,
  isSecurityScheme,
} from '../../guard/index.js'
import type { Components, OpenAPI, Operation, Parameter, Schema } from '../../openapi/index.js'

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const

type HttpMethod = (typeof HTTP_METHODS)[number]

type Endpoint = {
  readonly method: HttpMethod
  readonly path: string
  readonly operation: Operation
}

/**
 * Converts a heading text to a GitHub-flavored Markdown anchor.
 *
 * GFM anchors: lowercase, strip non-alphanumeric (except spaces and hyphens),
 * then replace spaces with hyphens.
 */
function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Collects all endpoints from an OpenAPI paths object.
 */
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

/**
 * Groups endpoints by path, preserving insertion order.
 */
function groupByPath(endpoints: readonly Endpoint[]): ReadonlyMap<string, readonly Endpoint[]> {
  const map = new Map<string, Endpoint[]>()
  for (const ep of endpoints) {
    const existing = map.get(ep.path)
    if (existing) {
      existing.push(ep)
    } else {
      map.set(ep.path, [ep])
    }
  }
  return map
}

/**
 * Derives an operationId-style label for an endpoint.
 */
function getOperationLabel(method: HttpMethod, path: string, operation: Operation): string {
  if (operation.operationId) return operation.operationId
  return `${method}${path}`
}

/**
 * Collects path-level parameters for a given path from the OpenAPI spec.
 */
function getPathParameters(openAPI: OpenAPI, pathStr: string): readonly Parameter[] {
  const pathItem = openAPI.paths?.[pathStr]
  if (!pathItem?.parameters) return []
  const params = pathItem.parameters as readonly (Parameter | { readonly $ref?: string })[]
  return params.flatMap((p) => {
    if ('$ref' in p && p.$ref) {
      const resolved = resolveRef(p.$ref, openAPI.components)
      if (resolved && typeof resolved === 'object' && 'name' in resolved) {
        return [resolved as Parameter]
      }
      return []
    }
    if ('name' in p) return [p as Parameter]
    return []
  })
}

/**
 * Resolves operation-level parameters, including $ref resolution.
 */
function resolveOperationParameters(
  operation: Operation,
  components: Components | undefined,
): readonly Parameter[] {
  if (!operation.parameters) return []
  return operation.parameters.flatMap((p) => {
    if ('$ref' in p && p.$ref) {
      const resolved = resolveRef(p.$ref, components)
      if (resolved && typeof resolved === 'object' && 'name' in resolved) {
        return [resolved as Parameter]
      }
      return []
    }
    return [p]
  })
}

/**
 * Gets the schema type as a string, handling array types.
 */
function getSchemaTypeStr(schema: Schema): string {
  if (schema.$ref) {
    const name = schema.$ref.split('/').at(-1) ?? 'object'
    return name
  }
  if (Array.isArray(schema.type)) {
    return schema.type.join(' | ')
  }
  return schema.type ?? 'object'
}

/**
 * Flattens schema fields into rows for a response schema table.
 * Uses a visited set to prevent infinite recursion on circular $refs.
 */
function flattenSchemaFields(
  schema: Schema,
  components: Components | undefined,
  prefix: string,
  visited: Set<string> = new Set(),
): readonly { name: string; type: string; required: boolean; description: string }[] {
  // Resolve $ref with circular reference protection
  if (schema.$ref) {
    if (visited.has(schema.$ref)) return []
    visited.add(schema.$ref)
    const resolved = resolveRef(schema.$ref, components)
    if (resolved && typeof resolved === 'object') {
      return flattenSchemaFields(resolved as Schema, components, prefix, visited)
    }
    return []
  }

  if (schema.type === 'object' && schema.properties) {
    const requiredSet = new Set(schema.required ?? [])
    return Object.entries(schema.properties).flatMap(([key, propSchema]) => {
      const fullName = prefix ? `${prefix}.${key}` : key
      const row = {
        name: fullName,
        type: getSchemaTypeStr(propSchema),
        required: requiredSet.has(key),
        description: propSchema.description ?? 'none',
      }
      // For nested objects, flatten recursively
      if (propSchema.type === 'object' && propSchema.properties) {
        return [row, ...flattenSchemaFields(propSchema, components, fullName, visited)]
      }
      if (propSchema.$ref) {
        if (visited.has(propSchema.$ref)) return [row]
        visited.add(propSchema.$ref)
        const resolved = resolveRef(propSchema.$ref, components)
        if (
          resolved &&
          typeof resolved === 'object' &&
          'type' in resolved &&
          (resolved as Schema).type === 'object' &&
          'properties' in resolved
        ) {
          return [row, ...flattenSchemaFields(resolved as Schema, components, fullName, visited)]
        }
      }
      if (propSchema.type === 'array' && propSchema.items) {
        const itemSchema = Array.isArray(propSchema.items)
          ? propSchema.items[0]
          : propSchema.items
        if (itemSchema) {
          // Resolve $ref on items with circular protection
          let resolvedItem = itemSchema
          if (itemSchema.$ref) {
            if (visited.has(itemSchema.$ref)) return [row]
            visited.add(itemSchema.$ref)
            const r = resolveRef(itemSchema.$ref, components)
            if (r && typeof r === 'object') resolvedItem = r as Schema
          }
          if (resolvedItem.type === 'object' && resolvedItem.properties) {
            return [row, ...flattenSchemaFields(resolvedItem, components, fullName, visited)]
          }
        }
      }
      return [row]
    })
  }

  if (schema.type === 'array' && schema.items) {
    const itemSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (itemSchema) {
      return flattenSchemaFields(itemSchema, components, prefix, visited)
    }
  }

  return []
}

/**
 * Makes a parameters table in Markdown.
 */
function makeParametersTable(
  pathParams: readonly Parameter[],
  operationParams: readonly Parameter[],
  bodySchema: Schema | undefined,
  components: Components | undefined,
): string[] {
  type ParamRow = {
    name: string
    in: string
    type: string
    required: string
    description: string
  }
  const rows: ParamRow[] = []

  // Merge path-level and operation-level params (operation overrides by name+in)
  const seen = new Set<string>()
  for (const p of operationParams) {
    const key = `${p.name}:${p.in}`
    seen.add(key)
    rows.push({
      name: p.name,
      in: p.in,
      type: getSchemaTypeStr(p.schema),
      required: p.required ? 'true' : 'false',
      description: p.description ?? 'none',
    })
  }
  for (const p of pathParams) {
    const key = `${p.name}:${p.in}`
    if (seen.has(key)) continue
    rows.push({
      name: p.name,
      in: p.in,
      type: getSchemaTypeStr(p.schema),
      required: p.required ? 'true' : 'false',
      description: p.description ?? 'none',
    })
  }

  // Body fields
  if (bodySchema) {
    const resolved = bodySchema.$ref
      ? (resolveRef(bodySchema.$ref, components) as Schema | undefined)
      : bodySchema

    if (resolved?.type === 'object' && resolved.properties) {
      const requiredSet = new Set(resolved.required ?? [])
      for (const [key, propSchema] of Object.entries(resolved.properties)) {
        rows.push({
          name: key,
          in: 'body',
          type: getSchemaTypeStr(propSchema),
          required: requiredSet.has(key) ? 'true' : 'false',
          description: propSchema.description ?? 'none',
        })
      }
    }
  }

  if (rows.length === 0) return []

  const lines = [
    '### Parameters',
    '',
    '| Name | In | Type | Required | Description |',
    '|------|----|------|----------|-------------|',
    ...rows.map((r) => `| ${r.name} | ${r.in} | ${r.type} | ${r.required} | ${r.description} |`),
    '',
  ]
  return lines
}

/**
 * Makes response example sections.
 */
function makeResponseExamples(
  responses: Operation['responses'],
  components: Components | undefined,
): string[] {
  const lines: string[] = []
  for (const [statusCode, response] of Object.entries(responses)) {
    // Resolve $ref response
    let resolvedResponse = response
    if (response.$ref) {
      const r = resolveRef(response.$ref, components)
      if (r && typeof r === 'object') {
        resolvedResponse = r as typeof response
      }
    }

    const content = resolvedResponse.content
    if (!content) continue
    const jsonMedia = content['application/json']
    if (!jsonMedia) continue
    if (!isMedia(jsonMedia)) continue
    if (!jsonMedia.schema) continue

    const example = makeExampleFromSchema(jsonMedia.schema, components)
    const json = JSON.stringify(example, null, 2)
    lines.push(`> ${statusCode} Response`, '', '```json', json, '```', '')
  }
  return lines
}

/**
 * Makes a responses table.
 */
function makeResponsesTable(
  responses: Operation['responses'],
  components: Components | undefined,
): string[] {
  const rows: { status: string; description: string; schema: string }[] = []
  for (const [statusCode, response] of Object.entries(responses)) {
    let resolvedResponse = response
    if (response.$ref) {
      const r = resolveRef(response.$ref, components)
      if (r && typeof r === 'object') {
        resolvedResponse = r as typeof response
      }
    }

    const description = resolvedResponse.description ?? ''
    const content = resolvedResponse.content
    const hasSchema = content?.['application/json'] !== undefined
    rows.push({
      status: statusCode,
      description,
      schema: hasSchema ? 'Inline' : 'None',
    })
  }

  if (rows.length === 0) return []

  return [
    '### Responses',
    '',
    '| Status | Description | Schema |',
    '|--------|-------------|--------|',
    ...rows.map((r) => `| ${r.status} | ${r.description} | ${r.schema} |`),
    '',
  ]
}

/**
 * Makes response schema tables for each status code.
 */
function makeResponseSchemaTable(
  responses: Operation['responses'],
  components: Components | undefined,
): string[] {
  const lines: string[] = []
  for (const [statusCode, response] of Object.entries(responses)) {
    let resolvedResponse = response
    if (response.$ref) {
      const r = resolveRef(response.$ref, components)
      if (r && typeof r === 'object') {
        resolvedResponse = r as typeof response
      }
    }

    const content = resolvedResponse.content
    if (!content) continue
    const jsonMedia = content['application/json']
    if (!jsonMedia) continue
    if (!isMedia(jsonMedia)) continue
    if (!jsonMedia.schema) continue

    const fields = flattenSchemaFields(jsonMedia.schema, components, '')
    if (fields.length === 0) continue

    lines.push(
      `### Response Schema`,
      '',
      `Status Code **${statusCode}**`,
      '',
      '| Name | Type | Required | Description |',
      '|------|------|----------|-------------|',
      ...fields.map(
        (f) => `| ${f.name} | ${f.type} | ${f.required} | ${f.description} |`,
      ),
      '',
    )
  }
  return lines
}

/**
 * Gets the request body schema for application/json content type.
 */
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

/**
 * Makes API reference Markdown from an OpenAPI specification.
 */
export function makeDocs(openAPI: OpenAPI, entry: string): string {
  const securitySchemes = openAPI.components?.securitySchemes

  const title = openAPI.info?.title ?? 'API'
  const version = openAPI.info?.version ?? ''
  const titleLine = `# ${title}${version ? ` v${version}` : ''}`

  const endpoints = collectEndpoints(openAPI)
  const pathGroups = groupByPath(endpoints)

  // Table of contents: operationId-based anchors
  const tocLines = [...pathGroups].map(([pathStr, eps]) => {
    const methods = eps.map((ep) => {
      const label = getOperationLabel(ep.method, ep.path, ep.operation)
      return `[${ep.method.toUpperCase()}](#${toAnchor(label)})`
    })
    return `- \`${pathStr}\` ${methods.join(' ')}`
  })

  // Endpoint sections
  const endpointLines = endpoints.flatMap(({ method, path: pathStr, operation }) => {
    const label = getOperationLabel(method, pathStr, operation)
    const lines: string[] = []

    // Heading
    lines.push(`## ${label}`, '')
    lines.push(`\`${method.toUpperCase()} ${pathStr}\``, '')

    // Code samples
    const securityNames = extractSecurityNames(operation.security)
    const cmdParts = [
      'hono request',
      `  -P ${pathStr}`,
      `  -X ${method.toUpperCase()}`,
      ...(securityNames.length > 0
        ? (() => {
            const headerValue = makeAuthHeader(securityNames[0], securitySchemes)
            return headerValue ? [`  -H "${headerValue}"`] : []
          })()
        : []),
      ...(() => {
        const exampleBody = makeExampleBody(operation.requestBody, openAPI.components)
        return exampleBody ? [`  -d '${exampleBody}'`] : []
      })(),
      `  ${entry}`,
    ]
    lines.push('> Code samples', '', '```bash', cmdParts.join(' \\\n'), '```', '')

    // Body parameter (POST/PUT/PATCH)
    const bodySchema = getBodySchema(operation.requestBody, openAPI.components)
    if (bodySchema) {
      const bodyExample = makeExampleFromSchema(bodySchema, openAPI.components)
      const bodyJson = JSON.stringify(bodyExample, null, 2)
      lines.push('> Body parameter', '', '```json', bodyJson, '```', '')
    }

    // Parameters table
    const pathParams = getPathParameters(openAPI, pathStr)
    const operationParams = resolveOperationParameters(operation, openAPI.components)
    const paramLines = makeParametersTable(pathParams, operationParams, bodySchema, openAPI.components)
    if (paramLines.length > 0) {
      lines.push(...paramLines)
    }

    // Response examples
    const responseExampleLines = makeResponseExamples(operation.responses, openAPI.components)
    if (responseExampleLines.length > 0) {
      lines.push('> Example responses', '', ...responseExampleLines)
    }

    // Responses table
    const responsesTableLines = makeResponsesTable(operation.responses, openAPI.components)
    lines.push(...responsesTableLines)

    // Response schema table
    const schemaTableLines = makeResponseSchemaTable(operation.responses, openAPI.components)
    lines.push(...schemaTableLines)

    // Authentication info
    if (securityNames.length > 0) {
      lines.push(`> Authentication: ${securityNames.join(', ')}`, '')
    } else {
      lines.push('> This operation does not require authentication', '')
    }

    return lines
  })

  return [titleLine, '', ...tocLines, '', ...endpointLines].join('\n')
}

/**
 * Extracts security scheme names from an operation's security field.
 *
 * The OpenAPI type declares `security` as `{ readonly name?: readonly string[] }`,
 * but at runtime it is `Array<Record<string, string[]>>` after swagger-parser bundling.
 * We use `isSecurityArray` to safely narrow the type.
 */
function extractSecurityNames(security: Operation['security'] | undefined): readonly string[] {
  if (!security) return []
  if (!isSecurityArray(security)) return []
  return security
    .flatMap((item) => (isRecord(item) ? Object.keys(item) : []))
    .filter((name, index, arr) => arr.indexOf(name) === index)
}

/**
 * Looks up a Components section by its string key.
 *
 * Uses an explicit switch to avoid indexing the typed Components object
 * with an arbitrary string.
 */
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

/**
 * Resolves a $ref string (e.g. "#/components/schemas/User") to the referenced component.
 *
 * $ref format: "#/components/{section}/{name}" — split by "/" gives
 * ["#", "components", section, name], so index 2 = section, index 3 = name.
 */
function resolveRef(ref: string, components: Components | undefined): unknown {
  if (!components) return undefined
  const parts = ref.split('/')
  // $ref "#/components/{section}/{name}" → parts[2] = section, parts[3] = name
  const REF_SECTION_INDEX = 2
  const REF_NAME_INDEX = 3
  const section = parts[REF_SECTION_INDEX]
  const name = parts[REF_NAME_INDEX]
  if (!(section && name)) return undefined
  const sectionObj = lookupComponentSection(components, section)
  if (!sectionObj) return undefined
  return sectionObj[name]
}

/**
 * Makes an Authorization header string for the hono request command.
 */
function makeAuthHeader(
  schemeName: string,
  securitySchemes: Components['securitySchemes'] | undefined,
): string | undefined {
  if (!securitySchemes) return undefined
  const scheme = securitySchemes[schemeName]
  if (!scheme) return undefined
  if (!isSecurityScheme(scheme)) return undefined

  if (scheme.type === 'http' && scheme.scheme === 'bearer') {
    // Intentional literal ${TOKEN} — placeholder for user's environment variable
    // biome-ignore lint/suspicious/noTemplateCurlyInString: literal placeholder
    return 'Authorization: Bearer ${TOKEN}'
  }
  if (scheme.type === 'http' && scheme.scheme === 'basic') {
    // Intentional literal ${CREDENTIALS} — placeholder for user's environment variable
    // biome-ignore lint/suspicious/noTemplateCurlyInString: literal placeholder
    return 'Authorization: Basic ${CREDENTIALS}'
  }
  if (scheme.type === 'apiKey' && scheme.name) {
    return `${scheme.name}: \${API_KEY}`
  }
  return undefined
}

/**
 * Makes an example JSON body for the hono request command.
 */
function makeExampleBody(
  requestBody: Operation['requestBody'] | undefined,
  components: Components | undefined,
): string | undefined {
  if (!requestBody) return undefined

  // Resolve $ref if present
  const body = isRefObject(requestBody) ? resolveRef(requestBody.$ref, components) : requestBody

  if (!(body && isRequestBody(body) && body.content)) return undefined

  const mediaEntry = body.content['application/json']
  if (!(mediaEntry && isMedia(mediaEntry) && mediaEntry.schema)) return undefined

  const example = makeExampleFromSchema(mediaEntry.schema, components)
  return JSON.stringify(example)
}

/**
 * Makes a minimal example object from a schema.
 *
 * Generates placeholder values for required fields only, using schema metadata
 * (type, format, enum, minimum, example) to produce realistic defaults.
 */
function makeExampleFromSchema(schema: Schema, components: Components | undefined): unknown {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').at(-1) ?? ''
    const resolved = components?.schemas?.[refName]
    if (resolved) return makeExampleFromSchema(resolved, components)
    return {}
  }

  if (schema.example !== undefined) return schema.example

  if (schema.type === 'object' && schema.properties) {
    const requiredSet = new Set(schema.required ?? [])
    return Object.fromEntries(
      Object.entries(schema.properties)
        .filter(([key]) => requiredSet.has(key))
        .map(([key, prop]) => [key, makeExampleFromSchema(prop, components)]),
    )
  }

  if (schema.type === 'array' && schema.items) {
    const item = Array.isArray(schema.items) ? schema.items[0] : schema.items
    if (item) return [makeExampleFromSchema(item, components)]
  }

  if (schema.enum && schema.enum.length > 0) return schema.enum[0]

  return makeDefaultValue(schema)
}

/**
 * Returns a sensible default value for a schema's type and format.
 */
function makeDefaultValue(schema: Schema): unknown {
  switch (schema.type) {
    case 'string':
      return makeDefaultString(schema.format)
    case 'number':
    case 'integer':
      // Use the minimum constraint if specified, otherwise 0
      return schema.minimum !== undefined ? schema.minimum : 0
    case 'boolean':
      return true
    default:
      return null
  }
}

/**
 * Returns a placeholder string value based on the schema's format.
 */
function makeDefaultString(format: string | undefined): string {
  switch (format) {
    case 'email':
      return 'user@example.com'
    case 'date-time':
      return '2024-01-01T00:00:00Z'
    case 'uri':
      return 'https://example.com'
    case 'date':
      return '2024-01-01'
    default:
      return 'string'
  }
}
