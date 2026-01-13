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
 * @link https://github.com/honojs/hono/blob/main/src/client/types.ts#L46-L76
 */
import path from 'node:path'
import { core } from '../../helper/index.js'
import type { OpenAPI, OpenAPIPaths } from '../../openapi/index.js'
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
 * Format result containing paths for both runtime and type expressions.
 */
type FormatPathResult = {
  /** Path for runtime calls (mixed notation is fine) */
  runtimePath: string
  /** Dot-only prefix for typeof expression (e.g., '.users') */
  typeofPrefix: string
  /** Bracket-only suffix for type expression (e.g., "[':id']['avatar']") */
  bracketSuffix: string
  /** Whether any segment requires bracket notation */
  hasBracket: boolean
}

/**
 * Format path for Hono RPC access (both type and runtime).
 * Hono hc client uses PathToChain which splits paths by '/'.
 *
 * Rules:
 * - '/' -> '.index'
 * - Valid identifiers use dot notation: '/users' -> '.users'
 * - Invalid identifiers use bracket notation: '/:id' -> "[':id']"
 * - Path params converted: '/files/{fileId}' -> ".files[':fileId']"
 *
 * For InferRequestType, when bracket notation exists in the path,
 * we need to wrap `typeof client.<prefix>` in parentheses and use
 * all bracket notation after:
 * - `/users/{id}` -> type: `(typeof client.users)[':id']['$get']`
 * - `/users/{id}/avatar` -> type: `(typeof client.users)[':id']['avatar']['$post']`
 */
const formatPath = (p: string): FormatPathResult => {
  if (p === '/') {
    return {
      runtimePath: '.index',
      typeofPrefix: '.index',
      bracketSuffix: '',
      hasBracket: false,
    }
  }

  const segs = p.replace(/^\/+/, '').split('/').filter(Boolean)

  // Convert {param} to :param
  const honoSegs = segs.map((seg) =>
    seg.startsWith('{') && seg.endsWith('}') ? `:${seg.slice(1, -1)}` : seg,
  )

  // Find the first segment that needs bracket notation
  const firstBracketIdx = honoSegs.findIndex((seg) => !isValidIdent(seg))
  const hasBracket = firstBracketIdx !== -1

  // Runtime path: mixed notation (current behavior)
  const runtimeParts = honoSegs.map((seg) => (isValidIdent(seg) ? `.${seg}` : `['${esc(seg)}']`))
  const runtimePath = runtimeParts.join('')

  // For type expression: split at first bracket
  const typeofPrefix = hasBracket
    ? honoSegs
        .slice(0, firstBracketIdx)
        .map((seg) => `.${seg}`)
        .join('')
    : runtimePath

  const bracketSuffix = hasBracket
    ? honoSegs
        .slice(firstBracketIdx)
        .map((seg) => `['${esc(seg)}']`)
        .join('')
    : ''

  return { runtimePath, typeofPrefix, bracketSuffix, hasBracket }
}

/* ─────────────────────────────── Parameters ($ref) ─────────────────────────────── */

type RefObject = { $ref: string }
const isRefObject = (v: unknown): v is RefObject => isRecord(v) && typeof v.$ref === 'string'

type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
}
const isParameterObject = (v: unknown): v is ParameterLike => {
  if (!isRecord(v)) return false
  if (typeof v.name !== 'string') return false
  const pos = v.in
  return pos === 'path' || pos === 'query' || pos === 'header' || pos === 'cookie'
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
  readonly hasArgs: boolean
}

const hasSchemaProp = (v: unknown): v is { schema?: unknown } => isRecord(v) && 'schema' in v

/** Body info for tracking request body presence */
type BodyInfo = { contentType: string }

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

    const info: BodyInfo = { contentType: ct }

    // Extract base content type (before semicolon) for matching
    // e.g., "multipart/form-data; boundary=..." -> "multipart/form-data"
    const baseContentType = ct.split(';')[0].trim()

    if (formContentTypes.includes(baseContentType)) {
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
      if (resolved !== undefined) return { form: [], json: [{ contentType: 'application/json' }] }
      return undefined
    }

    // Direct inline requestBody
    return pickAllBodyInfoFromContent(rb.content)
  }

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

type GeneratedOperation = { code: string; hasArgs: boolean } | null

const generateOperationCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
  },
): GeneratedOperation => {
  const op = item[method]
  if (!isOperationLike(op)) return null

  const funcName = methodPath(method, pathStr)
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = formatPath(pathStr)

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

  // For runtime calls, always use dot notation for method access
  const methodAccess = `.$${method}`

  // For InferRequestType, handle bracket notation properly:
  // - No bracket: `typeof client.users.$get`
  // - With bracket: `(typeof client.users)[':id']['avatar']['$post']`
  const inferType = hasBracket
    ? `InferRequestType<(typeof ${deps.client}${typeofPrefix})${bracketSuffix}['$${method}']>`
    : `InferRequestType<typeof ${deps.client}${runtimePath}.$${method}>`

  const argSig = hasArgs
    ? `args:${inferType},options?:ClientRequestOptions`
    : 'options?:ClientRequestOptions'
  const call = hasArgs
    ? `${deps.client}${runtimePath}${methodAccess}(args,options)`
    : `${deps.client}${runtimePath}${methodAccess}(undefined,options)`

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

  return { code: `${docs}\n${func}`, hasArgs }
}

const buildOperationCodes = (
  paths: OpenAPIPaths,
  deps: {
    client: string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
    pickAllBodyInfo: (op: OperationLike) => AllBodyInfo | undefined
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
        const result = generateOperationCode(p, method, pathItem, deps)
        return result
          ? { funcName: methodPath(method, p), code: result.code, hasArgs: result.hasArgs }
          : null
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
const buildHeader = (importPath: string, needsInferRequestType: boolean): string => {
  const typeImports = needsInferRequestType
    ? 'InferRequestType,ClientRequestOptions'
    : 'ClientRequestOptions'
  return `import type{${typeImports}}from'hono/client'\nimport{client}from'${importPath}'\n\n`
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
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)
  const pickAllBodyInfo = createPickAllBodyInfo(componentsRequestBodies)

  const deps = {
    client,
    toParameterLikes,
    pickAllBodyInfo,
  }

  const operationCodes = buildOperationCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const needsInferRequestType = operationCodes.some(({ hasArgs }) => hasArgs)
    const header = buildHeader(importPath, needsInferRequestType)
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
    ...operationCodes.map(({ funcName, code, hasArgs }) => {
      const header = buildHeader(importPath, hasArgs)
      const fileSrc = `${header}${code}\n`
      const filePath = path.join(outDir, `${funcName}.ts`)
      return core(fileSrc, path.dirname(filePath), filePath)
    }),
    core(index, path.dirname(indexPath), indexPath),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  }
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/core/rpc/index.ts
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest
  const fs = await import('node:fs')
  const os = await import('node:os')
  const path = await import('node:path')

  type OpenAPI = import('../../openapi/index.js').OpenAPI

  const openapi: OpenAPI = {
    openapi: '3.1.0',
    info: {
      title: 'HonoTakibi - test-only sample',
      version: 'v1',
      description:
        'A slightly more complex CRUD OpenAPI sample intended for Hono test code. Includes array enum roles.',
    },
    tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }, { name: 'Users' }],
    paths: {
      '/hono': {
        get: {
          tags: ['Hono'],
          summary: 'Hono',
          description: 'Simple ping for Hono',
          operationId: 'getHono',
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { message: { type: 'string', example: 'Hono' } },
                    required: ['message'],
                    additionalProperties: false,
                  },
                },
              },
            },
          },
        },
      },
      '/hono-x': {
        get: {
          tags: ['HonoX'],
          summary: 'HonoX',
          description: 'Simple ping for HonoX',
          operationId: 'getHonoX',
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { message: { type: 'string', example: 'HonoX' } },
                    required: ['message'],
                    additionalProperties: false,
                  },
                },
              },
            },
          },
        },
      },
      '/zod-openapi-hono': {
        get: {
          tags: ['ZodOpenAPIHono'],
          summary: 'ZodOpenAPIHono',
          description: 'Simple ping for ZodOpenAPIHono',
          operationId: 'getZodOpenAPIHono',
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { message: { type: 'string', example: 'ZodOpenAPIHono' } },
                    required: ['message'],
                    additionalProperties: false,
                  },
                },
              },
            },
          },
        },
      },

      /** -------------------- CRUD: Users -------------------- */
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'List users',
          description: 'List users with pagination and optional role filter.',
          operationId: 'listUsers',
          parameters: [
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 200, default: 20 },
              description: 'Items per page.',
            },
            {
              name: 'offset',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 0, default: 0 },
              description: 'Number of items to skip.',
            },
            {
              name: 'role',
              in: 'query',
              required: false,
              description: 'Filter by role (repeatable).',
              schema: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
            },
            {
              name: 'q',
              in: 'query',
              required: false,
              schema: { type: 'string', minLength: 1 },
              description: 'Search term for displayName or affiliations.',
            },
          ],
          responses: {
            '200': {
              description: 'List retrieved.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer', minimum: 0 },
                      items: { type: 'array', items: { $ref: '#/components/schemas/User' } },
                    },
                    required: ['total', 'items'],
                    additionalProperties: false,
                  },
                  examples: {
                    ok: {
                      value: {
                        total: 2,
                        items: [
                          {
                            id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f567',
                            displayName: 'Alice',
                            email: 'alice@example.com',
                            roles: ['speaker', 'attendee'],
                            createdAt: '2025-08-01T12:34:56Z',
                            updatedAt: '2025-08-01T12:34:56Z',
                          },
                          {
                            id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f568',
                            displayName: 'Bob',
                            email: 'bob@example.com',
                            roles: ['staff'],
                            createdAt: '2025-08-01T12:34:56Z',
                            updatedAt: '2025-08-01T12:34:56Z',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Users'],
          summary: 'Create user',
          description: 'Create a new user.',
          operationId: 'createUser',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateUserInput' },
                examples: {
                  create: {
                    value: {
                      displayName: 'Carol',
                      email: 'carol@example.com',
                      roles: ['attendee', 'ghost-wifi-fixer'],
                      isStudent: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
            },
            '400': {
              description: 'Validation error.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            '409': {
              description: 'Conflict (e.g., duplicate email).',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },

      '/users/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Get user',
          description: 'Retrieve a single user by ID.',
          operationId: 'getUser',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'User ID (UUID).',
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': {
              description: 'Retrieved.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
            },
            '404': {
              description: 'Not found.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
        put: {
          tags: ['Users'],
          summary: 'Replace user',
          description:
            'Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.',
          operationId: 'replaceUser',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ReplaceUserInput' },
                examples: {
                  replace: {
                    value: {
                      displayName: 'Alice Updated',
                      email: 'alice.updated@example.com',
                      roles: ['speaker', 'mc'],
                      affiliations: ['Honoconf 2025'],
                      isStudent: false,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Replaced.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
            },
            '400': {
              description: 'Validation error.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            '404': {
              description: 'Not found.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
        patch: {
          tags: ['Users'],
          summary: 'Update user (partial)',
          description: 'Partial update (PATCH). Only provided fields will be updated.',
          operationId: 'updateUser',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateUserInput' },
                examples: {
                  update: {
                    value: {
                      roles: ['speaker', 'attendee'],
                      pronouns: 'they/them',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Updated.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
            },
            '400': {
              description: 'Validation error.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            '404': {
              description: 'Not found.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
        delete: {
          tags: ['Users'],
          summary: 'Delete user',
          description: 'Delete a user by ID.',
          operationId: 'deleteUser',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          ],
          responses: {
            '204': { description: 'Deleted (No Content).' },
            '404': {
              description: 'Not found.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
    },

    components: {
      schemas: {
        Role: {
          type: 'string',
          enum: ['attendee', 'speaker', 'lt-speaker', 'staff', 'sponsor', 'mc', 'ghost-wifi-fixer'],
          description:
            "Event role. In code this corresponds to: roles?: ('attendee' | 'speaker' | 'lt-speaker' | 'staff' | 'sponsor' | 'mc' | 'ghost-wifi-fixer')[]",
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', description: 'User ID' },
            displayName: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
            isStudent: { type: 'boolean', description: 'Whether the user is a student' },
            pronouns: { type: 'string', description: 'e.g., he/him, she/her, they/them' },
            affiliations: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'displayName', 'email', 'createdAt', 'updatedAt'],
          additionalProperties: false,
          example: {
            id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f567',
            displayName: 'Alice',
            email: 'alice@example.com',
            roles: ['speaker', 'attendee'],
            createdAt: '2025-08-01T12:34:56Z',
            updatedAt: '2025-08-01T12:34:56Z',
          },
        },
        CreateUserInput: {
          type: 'object',
          properties: {
            displayName: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
            isStudent: { type: 'boolean' },
            pronouns: { type: 'string' },
            affiliations: { type: 'array', items: { type: 'string' } },
          },
          required: ['displayName', 'email'],
          additionalProperties: false,
        },
        ReplaceUserInput: {
          type: 'object',
          description: 'Full resource replacement (PUT). Required core fields must be present.',
          properties: {
            displayName: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
            isStudent: { type: 'boolean' },
            pronouns: { type: 'string' },
            affiliations: { type: 'array', items: { type: 'string' } },
          },
          required: ['displayName', 'email'],
          additionalProperties: false,
        },
        UpdateUserInput: {
          type: 'object',
          description: 'Partial update (PATCH). All properties are optional.',
          properties: {
            displayName: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
            isStudent: { type: 'boolean' },
            pronouns: { type: 'string' },
            affiliations: { type: 'array', items: { type: 'string' } },
          },
          additionalProperties: false,
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            code: { type: 'string', example: 'BAD_REQUEST' },
          },
          required: ['message'],
          additionalProperties: false,
        },
      },
    },
  }

  describe('rpc', () => {
    it('should generate the correct import code', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-'))
      try {
        const input = path.join(dir, 'openapi.json') as
          | `${string}.yaml`
          | `${string}.json`
          | `${string}.tsp`
        const out = path.join(dir, 'index.ts')
        fs.writeFileSync(input, JSON.stringify(openapi), 'utf-8')

        const result = await rpc(openapi, out, '../index.ts', false)

        if (!result.ok) {
          throw new Error(result.error)
        }

        const index = fs.readFileSync(out, 'utf-8')
        const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await client.hono.$get(undefined, options)
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX(options?: ClientRequestOptions) {
  return await client['hono-x'].$get(undefined, options)
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono(options?: ClientRequestOptions) {
  return await client['zod-openapi-hono'].$get(undefined, options)
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$put(args, options)
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$patch(args, options)
}
`

        expect(index).toStrictEqual(expected)
        expect(result.ok).toBe(true)
        expect(result.value).toMatch(/Generated rpc code written to/)
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  describe('rpc (split mode)', () => {
    it('should generate the correct import code (split: true)', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-'))
      try {
        const input = path.join(dir, 'openapi.json') as
          | `${string}.yaml`
          | `${string}.json`
          | `${string}.tsp`
        fs.writeFileSync(input, JSON.stringify(openapi, null, 2), 'utf-8')

        const out = path.join(dir, 'rpc', 'index.ts')
        const result = await rpc(openapi, out, '../index.ts', true)

        const index = fs.readFileSync(path.join(dir, 'rpc', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './getHono'
export * from './getHonoX'
export * from './getZodOpenapiHono'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
export * from './patchUsersId'
`
        expect(index).toBe(indexExpected)

        const deleteUsersId = fs.readFileSync(path.join(dir, 'rpc', 'deleteUsersId.ts'), 'utf-8')
        const deleteUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}
`

        expect(deleteUsersId).toBe(deleteUsersIdExpected)

        const getHono = fs.readFileSync(path.join(dir, 'rpc', 'getHono.ts'), 'utf-8')
        const getHonoExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await client.hono.$get(undefined, options)
}
`

        expect(getHono).toBe(getHonoExpected)

        const getHonoX = fs.readFileSync(path.join(dir, 'rpc', 'getHonoX.ts'), 'utf-8')
        const getHonoXExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX(options?: ClientRequestOptions) {
  return await client['hono-x'].$get(undefined, options)
}
`

        expect(getHonoX).toBe(getHonoXExpected)

        const getUsers = fs.readFileSync(path.join(dir, 'rpc', 'getUsers.ts'), 'utf-8')

        const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}
`

        expect(getUsers).toBe(expected)

        const getUsersId = fs.readFileSync(path.join(dir, 'rpc', 'getUsersId.ts'), 'utf-8')

        const getUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}
`
        expect(getUsersId).toBe(getUsersIdExpected)

        const getZodOpenapiHono = fs.readFileSync(
          path.join(dir, 'rpc', 'getZodOpenapiHono.ts'),
          'utf-8',
        )

        const getZodOpenapiHonoExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono(options?: ClientRequestOptions) {
  return await client['zod-openapi-hono'].$get(undefined, options)
}
`
        expect(getZodOpenapiHono).toBe(getZodOpenapiHonoExpected)

        const patchUsersId = fs.readFileSync(path.join(dir, 'rpc', 'patchUsersId.ts'), 'utf-8')

        const patchUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$patch(args, options)
}
`
        expect(patchUsersId).toBe(patchUsersIdExpected)

        const postUsers = fs.readFileSync(path.join(dir, 'rpc', 'postUsers.ts'), 'utf-8')
        const postUsersExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}
`
        expect(postUsers).toBe(postUsersExpected)

        const putUsersId = fs.readFileSync(path.join(dir, 'rpc', 'putUsersId.ts'), 'utf-8')

        const putUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$put(args, options)
}
`
        expect(putUsersId).toBe(putUsersIdExpected)

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated rpc code written to ${path.join(dir, 'rpc')}/*.ts (index.ts included)`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })

  /** Test OpenAPI spec focused on isOptional (required: true/false) */
  const openapiIsOptional: OpenAPI = {
    openapi: '3.1.0',
    info: {
      title: 'isOptional Test API',
      version: '1.0.0',
    },
    paths: {
      '/items': {
        get: {
          summary: 'List items with mixed required/optional params',
          operationId: 'listItems',
          parameters: [
            {
              name: 'page',
              in: 'query',
              required: true,
              schema: { type: 'integer' },
              description: 'Page number (required)',
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer' },
              description: 'Items per page (optional)',
            },
            {
              name: 'filter',
              in: 'query',
              // required not specified - should be treated as optional
              schema: { type: 'string' },
              description: 'Filter string (optional - required not specified)',
            },
            {
              name: 'X-Request-ID',
              in: 'header',
              required: true,
              schema: { type: 'string' },
              description: 'Request ID (required header)',
            },
            {
              name: 'X-Correlation-ID',
              in: 'header',
              required: false,
              schema: { type: 'string' },
              description: 'Correlation ID (optional header)',
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      items: { type: 'array', items: { type: 'string' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/items/{id}': {
        get: {
          summary: 'Get item by ID',
          operationId: 'getItem',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Item ID (path params are always required)',
            },
            {
              name: 'expand',
              in: 'query',
              required: false,
              schema: { type: 'boolean' },
              description: 'Expand nested resources (optional)',
            },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/all-required': {
        post: {
          summary: 'All required params',
          operationId: 'allRequiredParams',
          parameters: [
            {
              name: 'tenant',
              in: 'query',
              required: true,
              schema: { type: 'string' },
            },
            {
              name: 'Authorization',
              in: 'header',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    value: { type: 'number' },
                  },
                  required: ['name', 'value'],
                },
              },
            },
          },
          responses: {
            '201': { description: 'Created' },
          },
        },
      },
      '/all-optional': {
        get: {
          summary: 'All optional params',
          operationId: 'allOptionalParams',
          parameters: [
            {
              name: 'search',
              in: 'query',
              required: false,
              schema: { type: 'string' },
            },
            {
              name: 'sort',
              in: 'query',
              // required not specified
              schema: { type: 'string' },
            },
            {
              name: 'X-Debug',
              in: 'header',
              required: false,
              schema: { type: 'boolean' },
            },
          ],
          responses: {
            '200': { description: 'OK' },
          },
        },
      },
    },
  }

  describe('rpc (isOptional tests)', () => {
    it('should correctly handle required: true vs required: false for parameters', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-optional-'))
      try {
        const out = path.join(dir, 'index.ts')
        const result = await rpc(openapiIsOptional, out, '../client', false)

        if (!result.ok) {
          throw new Error(result.error)
        }

        const generated = fs.readFileSync(out, 'utf-8')

        const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /items
 *
 * List items with mixed required/optional params
 */
export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}

/**
 * GET /items/{id}
 *
 * Get item by ID
 */
export async function getItemsId(
  args: InferRequestType<(typeof client.items)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':id'].$get(args, options)
}

/**
 * POST /all-required
 *
 * All required params
 */
export async function postAllRequired(
  args: InferRequestType<(typeof client)['all-required']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['all-required'].$post(args, options)
}

/**
 * GET /all-optional
 *
 * All optional params
 */
export async function getAllOptional(
  args: InferRequestType<(typeof client)['all-optional']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['all-optional'].$get(args, options)
}
`

        expect(generated).toBe(expected)
        expect(result).toStrictEqual({
          ok: true,
          value: `Generated rpc code written to ${out}`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })

    it('should generate optional params in split mode correctly', async () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-optional-split-'))
      try {
        const out = path.join(dir, 'rpc', 'index.ts')
        const result = await rpc(openapiIsOptional, out, '../client', true)

        if (!result.ok) {
          throw new Error(result.error)
        }

        // Check getItems.ts for mixed required/optional
        const getItems = fs.readFileSync(path.join(dir, 'rpc', 'getItems.ts'), 'utf-8')
        const getItemsExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /items
 *
 * List items with mixed required/optional params
 */
export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}
`
        expect(getItems).toBe(getItemsExpected)

        // Check getItemsId.ts for path param + optional query
        const getItemsId = fs.readFileSync(path.join(dir, 'rpc', 'getItemsId.ts'), 'utf-8')
        const getItemsIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /items/{id}
 *
 * Get item by ID
 */
export async function getItemsId(
  args: InferRequestType<(typeof client.items)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':id'].$get(args, options)
}
`
        expect(getItemsId).toBe(getItemsIdExpected)

        // Check postAllRequired.ts - all required params
        const postAllRequired = fs.readFileSync(
          path.join(dir, 'rpc', 'postAllRequired.ts'),
          'utf-8',
        )
        const postAllRequiredExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * POST /all-required
 *
 * All required params
 */
export async function postAllRequired(
  args: InferRequestType<(typeof client)['all-required']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['all-required'].$post(args, options)
}
`
        expect(postAllRequired).toBe(postAllRequiredExpected)

        // Check getAllOptional.ts - all optional params
        const getAllOptional = fs.readFileSync(path.join(dir, 'rpc', 'getAllOptional.ts'), 'utf-8')
        const getAllOptionalExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /all-optional
 *
 * All optional params
 */
export async function getAllOptional(
  args: InferRequestType<(typeof client)['all-optional']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['all-optional'].$get(args, options)
}
`
        expect(getAllOptional).toBe(getAllOptionalExpected)

        // Check index.ts barrel file
        const index = fs.readFileSync(path.join(dir, 'rpc', 'index.ts'), 'utf-8')
        const indexExpected = `export * from './getItems'
export * from './getItemsId'
export * from './postAllRequired'
export * from './getAllOptional'
`
        expect(index).toBe(indexExpected)

        expect(result).toStrictEqual({
          ok: true,
          value: `Generated rpc code written to ${path.join(dir, 'rpc')}/*.ts (index.ts included)`,
        })
      } finally {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    })
  })
}
