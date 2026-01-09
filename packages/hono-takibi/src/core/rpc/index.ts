/**
 * RPC client wrapper generation module.
 *
 * Generates type-safe RPC client functions from OpenAPI specifications
 * for use with Hono's RPC client.
 *
 * ```mermaid
 * flowchart TD
 *   A["rpc(openAPI, output, importPath, split)"] --> B["Parse OpenAPI paths"]
 *   B --> C["Build operation codes"]
 *   C --> D{"split mode?"}
 *   D -->|No| E["Write single file"]
 *   D -->|Yes| F["Write per-operation files"]
 *   F --> G["Write index.ts barrel"]
 * ```
 *
 * @module core/rpc
 */
import path from 'node:path'
import { core } from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths, Schema } from '../../openapi/index.js'
import { isRecord, methodPath } from '../../utils/index.js'

/* ─────────────────────────────── Guards ─────────────────────────────── */

const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
  if (!isRecord(v)) return false
  for (const k in v) {
    if (!isRecord(v[k])) return false
  }
  return true
}

/* ─────────────────────────────── Formatters ─────────────────────────────── */

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** Check if a string is a valid JavaScript identifier */
const isValidIdent = (s: string): boolean => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)

/**
 * Format path for Hono RPC access (both type and runtime).
 * Hono hc client uses PathToChain which splits paths by '/'.
 *
 * Rules:
 * - '/' -> '.index'
 * - Single segment with valid identifier -> dot notation: '/pet' -> '.pet'
 * - All other cases -> each segment becomes bracket access: '/files/upload' -> "['files']['upload']"
 * - Path params converted: '/files/{fileId}' -> "['files'][':fileId']"
 */
const formatPath = (p: string): string => {
  if (p === '/') return '.index'

  const segs = p.replace(/^\/+/, '').split('/').filter(Boolean)

  // Convert {param} to :param
  const honoSegs = segs.map((seg) =>
    seg.startsWith('{') && seg.endsWith('}') ? `:${seg.slice(1, -1)}` : seg,
  )

  // Single segment with valid identifier: use dot notation
  if (honoSegs.length === 1 && isValidIdent(honoSegs[0])) {
    return `.${honoSegs[0]}`
  }

  // All other cases: each segment becomes separate bracket access
  return honoSegs.map((seg) => `['${esc(seg)}']`).join('')
}

/* ─────────────────────────────── Parameters ($ref) ─────────────────────────────── */

type RefObject = { $ref: string }
const isRefObject = (v: unknown): v is RefObject => isRecord(v) && typeof v.$ref === 'string'

type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
  schema?: Schema
  content?: Record<string, { schema?: Schema }>
}
const isParameterObject = (v: unknown): v is ParameterLike => {
  if (!isRecord(v)) return false
  if (typeof v.name !== 'string') return false
  const pos = v.in
  return pos === 'path' || pos === 'query' || pos === 'header' || pos === 'cookie'
}

/**
 * Extract schema from parameter (handles both schema and content properties)
 */
const getParameterSchema = (p: ParameterLike): Schema | undefined => {
  if (p.schema) return p.schema
  // Handle content property (e.g., content: { application/json: { schema: ... } })
  if (p.content) {
    const jsonContent = p.content['application/json']
    if (jsonContent?.schema) return jsonContent.schema
    // Fallback to first content type
    const firstKey = Object.keys(p.content)[0]
    if (firstKey && p.content[firstKey]?.schema) {
      return p.content[firstKey].schema
    }
  }
  return undefined
}

const refParamName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
  return m ? m[1] : undefined
}

const createResolveParameter =
  (componentsParameters: Record<string, unknown>) =>
  (p: unknown): ParameterLike | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }

const createToParameterLikes =
  (resolveParam: (p: unknown) => ParameterLike | undefined) =>
  (arr?: unknown): ParameterLike[] =>
    Array.isArray(arr) ? arr.map((x) => resolveParam(x)).filter((param) => param !== undefined) : []

/* ─────────────────────────────── Schema to TypeScript type ─────────────────────────────── */

type SchemaToTsOptions = {
  /** Query parameters use string for boolean (HTTP query params are always strings) */
  isQueryParam?: boolean
}

/**
 * Converts OpenAPI Schema to TypeScript type string.
 * Used for generating argument types directly from OpenAPI instead of InferRequestType.
 */
const schemaToTsType = (
  schema: Schema | undefined,
  componentsSchemas: Record<string, Schema>,
  visited: Set<string> = new Set(),
  options: SchemaToTsOptions = {},
): string => {
  if (!schema) return 'unknown'

  // Handle $ref
  if (schema.$ref) {
    const refName = schema.$ref.replace(/^#\/components\/schemas\//, '')
    // Prevent infinite recursion from circular references
    if (visited.has(refName)) {
      return 'unknown'
    }
    const refSchema = componentsSchemas[refName]
    if (refSchema) {
      const newVisited = new Set(visited)
      newVisited.add(refName)
      return schemaToTsType(refSchema, componentsSchemas, newVisited, options)
    }
    return 'unknown'
  }

  // Handle enum
  if (schema.enum) {
    if (schema.enum.length === 0) return 'never'
    return schema.enum.map((v) => JSON.stringify(v)).join(' | ')
  }

  // Handle const
  if (schema.const !== undefined) {
    return JSON.stringify(schema.const)
  }

  // Handle nullable
  const nullable = schema.nullable === true

  // Handle allOf
  if (schema.allOf) {
    if (schema.allOf.length === 0) return nullable ? '(unknown | null)' : 'unknown'
    const types = schema.allOf.map((s) => schemaToTsType(s, componentsSchemas, visited, options))
    const result = types.length === 1 ? types[0] : `(${types.join(' & ')})`
    return nullable ? `(${result} | null)` : result
  }

  // Handle oneOf/anyOf
  if (schema.oneOf || schema.anyOf) {
    const schemas = schema.oneOf || schema.anyOf || []
    if (schemas.length === 0) return nullable ? '(never | null)' : 'never'
    const types = schemas.map((s) => schemaToTsType(s, componentsSchemas, visited, options))
    const result = types.join(' | ')
    return nullable ? `(${result} | null)` : result
  }

  // Handle type
  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type

  switch (type) {
    case 'string':
      // format: binary should be File type for Hono RPC compatibility
      if (schema.format === 'binary') {
        return nullable ? '(File | null)' : 'File'
      }
      return nullable ? '(string | null)' : 'string'
    case 'number':
    case 'integer':
      // int64 format becomes bigint in Hono
      if (schema.format === 'int64') {
        return nullable ? '(bigint | null)' : 'bigint'
      }
      return nullable ? '(number | null)' : 'number'
    case 'boolean':
      // Query parameters in HTTP are always strings, so boolean becomes string
      if (options.isQueryParam) {
        return nullable ? '(string | null)' : 'string'
      }
      return nullable ? '(boolean | null)' : 'boolean'
    case 'null':
      return 'null'
    case 'array': {
      const itemType = schema.items
        ? schemaToTsType(
            Array.isArray(schema.items) ? schema.items[0] : schema.items,
            componentsSchemas,
            visited,
            options,
          )
        : 'unknown'
      // Wrap union types in parentheses for correct array syntax
      const needsParens = itemType.includes(' | ') || itemType.includes(' & ')
      const arrayType = needsParens ? `(${itemType})[]` : `${itemType}[]`
      return nullable ? `(${arrayType} | null)` : arrayType
    }
    case 'object': {
      if (!schema.properties) {
        // Record type for additionalProperties
        if (schema.additionalProperties) {
          const valueType =
            typeof schema.additionalProperties === 'boolean'
              ? 'unknown'
              : schemaToTsType(schema.additionalProperties, componentsSchemas, visited, options)
          return nullable
            ? `({ [key: string]: ${valueType} } | null)`
            : `{ [key: string]: ${valueType} }`
        }
        return nullable ? '({} | null)' : '{}'
      }
      const required = new Set(schema.required || [])
      const props = Object.entries(schema.properties)
        .map(([key, propSchema]) => {
          const propType = schemaToTsType(propSchema, componentsSchemas, visited, options)
          const isRequired = required.has(key)
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key)
          return `${safeKey}${isRequired ? '' : '?'}: ${propType}`
        })
        .join('; ')
      return nullable ? `({ ${props} } | null)` : `{ ${props} }`
    }
    default:
      return 'unknown'
  }
}

/** Body info with schema and content type */
type BodyInfo = {
  schema: Schema
  contentType: string
}

/**
 * Generate Hono RPC argument type from OpenAPI parameters and request body.
 * Returns type string like "{ param: { id: string }; query: { limit?: number }; json: { name: string } }"
 */
const generateArgType = (
  pathParams: ParameterLike[],
  queryParams: ParameterLike[],
  headerParams: ParameterLike[],
  cookieParams: ParameterLike[],
  allBodyInfo: AllBodyInfo | undefined,
  componentsSchemas: Record<string, Schema>,
): string => {
  const parts: string[] = []

  // Path parameters
  if (pathParams.length > 0) {
    const props = pathParams
      .map((p) => {
        const schema = getParameterSchema(p)
        const type = schemaToTsType(schema, componentsSchemas)
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : JSON.stringify(p.name)
        return `${safeKey}: ${type}`
      })
      .join('; ')
    parts.push(`param: { ${props} }`)
  }

  // Query parameters - use isQueryParam: true for HTTP query string semantics
  if (queryParams.length > 0) {
    const props = queryParams
      .map((p) => {
        const schema = getParameterSchema(p)
        const type = schemaToTsType(schema, componentsSchemas, new Set(), { isQueryParam: true })
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : JSON.stringify(p.name)
        const isRequired = p.required === true
        return `${safeKey}${isRequired ? '' : '?'}: ${type}`
      })
      .join('; ')
    parts.push(`query: { ${props} }`)
  }

  // Header parameters
  if (headerParams.length > 0) {
    const props = headerParams
      .map((p) => {
        const schema = getParameterSchema(p)
        const type = schemaToTsType(schema, componentsSchemas)
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : JSON.stringify(p.name)
        const isRequired = p.required === true
        return `${safeKey}${isRequired ? '' : '?'}: ${type}`
      })
      .join('; ')
    parts.push(`header: { ${props} }`)
  }

  // Cookie parameters
  if (cookieParams.length > 0) {
    const props = cookieParams
      .map((p) => {
        const schema = getParameterSchema(p)
        const type = schemaToTsType(schema, componentsSchemas)
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(p.name) ? p.name : JSON.stringify(p.name)
        const isRequired = p.required === true
        return `${safeKey}${isRequired ? '' : '?'}: ${type}`
      })
      .join('; ')
    parts.push(`cookie: { ${props} }`)
  }

  // Request body - handle multiple content types
  if (allBodyInfo) {
    const { form, json } = allBodyInfo
    // Generate form types if present
    if (form.length > 0) {
      const types = form.map((info) => schemaToTsType(info.schema, componentsSchemas))
      const unionType = types.length === 1 ? types[0] : types.join(' | ')
      parts.push(`form: ${unionType}`)
    }
    // Generate json types if present
    if (json.length > 0) {
      const types = json.map((info) => schemaToTsType(info.schema, componentsSchemas))
      const unionType = types.length === 1 ? types[0] : types.join(' | ')
      parts.push(`json: ${unionType}`)
    }
  }

  // Always add options parameter for ClientRequestOptions
  parts.push('options?: ClientRequestOptions')

  return parts.length > 0 ? `{ ${parts.join('; ')} }` : ''
}

/* ─────────────────────────────── RequestBody schema pick ─────────────────────────────── */

type OperationLike = {
  summary?: string
  description?: string
  parameters?: unknown
  requestBody?: unknown
  responses?: unknown
}
const isOperationLike = (v: unknown): v is OperationLike => isRecord(v) && 'responses' in v

type PathItemLike = {
  parameters?: unknown
} & { [M in HttpMethod]?: OperationLike | undefined }

type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
const HTTP_METHODS: readonly HttpMethod[] = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]

type OperationCode = {
  readonly funcName: string
  readonly code: string
}

const hasSchemaProp = (v: unknown): v is { schema?: unknown } => isRecord(v) && 'schema' in v

/** Extract requestBody name from $ref like "#/components/requestBodies/CreateProduct" */
const refRequestBodyName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

type AllBodyInfo = { form: BodyInfo[]; json: BodyInfo[] }

/**
 * Collect all body infos from content to handle multiple content-types.
 * Groups by body key ('form' or 'json') with union types.
 */
const pickAllBodyInfoFromContent = (content: unknown): AllBodyInfo | undefined => {
  if (!isRecord(content)) return undefined

  const formInfos: BodyInfo[] = []
  const jsonInfos: BodyInfo[] = []

  const formContentTypes = ['multipart/form-data', 'application/x-www-form-urlencoded']

  for (const [ct, mediaObj] of Object.entries(content)) {
    if (!(isRecord(mediaObj) && hasSchemaProp(mediaObj) && isRecord(mediaObj.schema))) continue

    const info: BodyInfo = { schema: mediaObj.schema, contentType: ct }

    if (formContentTypes.includes(ct)) {
      formInfos.push(info)
    } else {
      // All other content types go to json
      jsonInfos.push(info)
    }
  }

  if (formInfos.length === 0 && jsonInfos.length === 0) return undefined

  return { form: formInfos, json: jsonInfos }
}

const createPickAllBodyInfo =
  (componentsRequestBodies: Record<string, unknown>) =>
  (op: OperationLike): AllBodyInfo | undefined => {
    const rb = op.requestBody
    if (!isRecord(rb)) return undefined

    // Handle $ref to components/requestBodies
    const refName = refRequestBodyName(rb)
    if (refName) {
      const resolved = componentsRequestBodies[refName]
      if (isRecord(resolved) && isRecord(resolved.content)) {
        return pickAllBodyInfoFromContent(resolved.content)
      }
      // If $ref exists but can't resolve content, still consider it has a body
      if (resolved !== undefined)
        return { form: [], json: [{ schema: {}, contentType: 'application/json' }] }
      return undefined
    }

    // Direct inline requestBody
    return pickAllBodyInfoFromContent(rb.content)
  }

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

const generateOperationCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
    componentsSchemas: Record<string, Schema>
  },
): string => {
  const op = item[method]
  if (!isOperationLike(op)) return ''

  const funcName = methodPath(method, pathStr)
  const pathAccess = formatPath(pathStr)

  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)

  const allParams = [...pathLevelParams, ...opParams]
  const pathParams = allParams.filter((p) => p.in === 'path')
  const queryParams = allParams.filter((p) => p.in === 'query')
  const headerParams = allParams.filter((p) => p.in === 'header')
  const cookieParams = allParams.filter((p) => p.in === 'cookie')

  const allBodyInfo = deps.pickAllBodyInfo(op)
  const hasBody =
    allBodyInfo !== undefined && (allBodyInfo.form.length > 0 || allBodyInfo.json.length > 0)
  const hasArgs =
    pathParams.length > 0 ||
    queryParams.length > 0 ||
    headerParams.length > 0 ||
    cookieParams.length > 0 ||
    hasBody

  // Use unified path format for both type and runtime
  const hasBracket = pathAccess.includes('[')
  const methodAccess = hasBracket ? `['$${method}']` : `.$${method}`

  // Generate argument type directly from OpenAPI instead of using InferRequestType
  const argType = generateArgType(
    pathParams,
    queryParams,
    headerParams,
    cookieParams,
    allBodyInfo,
    deps.componentsSchemas,
  )
  // If there are required args (params, query, body, etc.), args is required
  // If only options, args is optional
  const argSig = hasArgs ? `args:${argType}` : `args?:${argType}`
  const call = `${deps.client}${pathAccess}${methodAccess}(args)`

  const summary = typeof op.summary === 'string' ? op.summary : ''
  const description = typeof op.description === 'string' ? op.description : ''
  const docs = [
    '/**',
    ` * ${method.toUpperCase()} ${pathStr}`,
    ...(summary ? [' *', ` * ${summary.trimEnd()}`] : []),
    ...(description ? [' *', ` * ${description.trimEnd()}`] : []),
    ' */',
  ].join('\n')

  const func = `export async function ${funcName}(${argSig}){return await ${call}}`

  return `${docs}\n${func}`
}

const buildOperationCodes = (
  paths: OpenAPIPaths,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
    componentsSchemas: Record<string, Schema>
  },
): OperationCode[] =>
  Object.entries(paths)
    .filter((entry): entry is [string, Record<string, unknown>] => isRecord(entry[1]))
    .flatMap(([p, rawItem]) => {
      const pathItem: PathItemLike = {
        parameters: rawItem.parameters,
        get: isOperationLike(rawItem.get) ? rawItem.get : undefined,
        put: isOperationLike(rawItem.put) ? rawItem.put : undefined,
        post: isOperationLike(rawItem.post) ? rawItem.post : undefined,
        delete: isOperationLike(rawItem.delete) ? rawItem.delete : undefined,
        options: isOperationLike(rawItem.options) ? rawItem.options : undefined,
        head: isOperationLike(rawItem.head) ? rawItem.head : undefined,
        patch: isOperationLike(rawItem.patch) ? rawItem.patch : undefined,
        trace: isOperationLike(rawItem.trace) ? rawItem.trace : undefined,
      }

      return HTTP_METHODS.map((method) => {
        const code = generateOperationCode(p, method, pathItem, deps)
        return code ? { funcName: methodPath(method, p), code } : null
      }).filter((item): item is OperationCode => item !== null)
    })

/* ─────────────────────────────── Split ─────────────────────────────── */

const resolveSplitOutDir = (output: string) => {
  const looksLikeFile = output.endsWith('.ts')
  const outDir = looksLikeFile ? path.dirname(output) : output
  const indexPath = path.join(outDir, 'index.ts')
  return { outDir, indexPath }
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

/**
 * Generates RPC client wrapper functions from OpenAPI specification.
 *
 * Creates type-safe client functions that wrap Hono RPC client calls,
 * with proper TypeScript types derived from OpenAPI schemas.
 *
 * ```mermaid
 * flowchart LR
 *   subgraph "Generated Code"
 *     A["export async function getUsers(params) { return await client.users.$get(params) }"]
 *   end
 *   subgraph "Usage"
 *     B["const users = await getUsers({ query: { limit: 10 } })"]
 *   end
 *   A --> B
 * ```
 *
 * @param openAPI - Parsed OpenAPI specification
 * @param output - Output file path or directory
 * @param importPath - Import path for the Hono client
 * @param split - Whether to split into multiple files (one per operation)
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Single file output
 * await rpc(openAPI, 'src/rpc.ts', './client')
 * // Generates: src/rpc.ts with all RPC functions
 *
 * // Split mode output
 * await rpc(openAPI, 'src/rpc', './client', true)
 * // Generates: src/rpc/getUsers.ts, src/rpc/postUsers.ts, src/rpc/index.ts
 * ```
 */
const buildHeader = (importPath: string): string => {
  return `import type{ClientRequestOptions}from'hono/client'\nimport{client}from'${importPath}'\n\n`
}

export async function rpc(
  openAPI: OpenAPI,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const client = 'client'

  const pathsMaybe = openAPI.paths
  if (!isOpenAPIPaths(pathsMaybe)) {
    return { ok: false, error: 'Invalid OpenAPI paths' }
  }

  const componentsParameters = openAPI.components?.parameters ?? {}
  const componentsRequestBodies = openAPI.components?.requestBodies ?? {}
  const componentsSchemas = (openAPI.components?.schemas ?? {}) as Record<string, Schema>
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)
  const pickAllBodyInfo = createPickAllBodyInfo(componentsRequestBodies)

  const deps = {
    client,
    toParameterLikes,
    pickAllBodyInfo,
    componentsSchemas,
  }

  const operationCodes = buildOperationCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const header = buildHeader(importPath)
    const code = `${header}${body}${operationCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated rpc code written to ${output}` }
  }

  // Split: write each file + index.ts (barrel) in parallel
  const { outDir, indexPath } = resolveSplitOutDir(output)

  const exportLines = Array.from(
    new Set(operationCodes.map(({ funcName }) => `export * from './${funcName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`

  const allResults = await Promise.all([
    ...operationCodes.map(({ funcName, code }) => {
      const header = buildHeader(importPath)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${funcName}.ts`)
      return core(fileSrc, path.dirname(filePath), filePath)
    }),
    core(index, path.dirname(indexPath), indexPath),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error }
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  }
}
