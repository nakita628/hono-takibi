import {
  isMedia,
  isRecord,
  isRefObject,
  isRequestBody,
  isSecurityArray,
  isSecurityScheme,
} from '../../guard/index.js'
import type { Components, OpenAPI, Operation, Schema } from '../../openapi/index.js'

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
 * Makes API reference Markdown from an OpenAPI specification.
 */
export function makeDocs(openAPI: OpenAPI, entry: string): string {
  const securitySchemes = openAPI.components?.securitySchemes

  const title = openAPI.info?.title ?? 'API'
  const version = openAPI.info?.version ?? ''
  const titleLine = `# ${title}${version ? ` v${version}` : ''}`

  const endpoints = collectEndpoints(openAPI)
  const pathGroups = groupByPath(endpoints)

  // Table of contents: path-grouped links for quick navigation in long docs
  const tocLines = [...pathGroups].map(([pathStr, eps]) => {
    const methods = eps.map((ep) => {
      const heading = `${ep.method.toUpperCase()} ${pathStr}`
      return `[${ep.method.toUpperCase()}](#${toAnchor(heading)})`
    })
    return `- \`${pathStr}\` ${methods.join(' ')}`
  })

  // Endpoint sections
  const endpointLines = endpoints.flatMap(({ method, path: pathStr, operation }) => {
    const heading = `### ${method.toUpperCase()} ${pathStr}`

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

    return [heading, '', '```bash', cmdParts.join(' \\\n'), '```', '']
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
