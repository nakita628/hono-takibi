import path from 'node:path'
import { core } from '../helper/core.js'
import { type OpenAPIPaths, parseOpenAPI, type Schema } from '../openapi/index.js'
import { isRecord, methodPath } from '../utils/index.js'

/* ─────────────────────────────── Guards ─────────────────────────────── */

const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
  if (!isRecord(v)) return false
  for (const k in v) {
    if (!isRecord(v[k])) return false
  }
  return true
}

/* ─────────────────────────────── Formatters ─────────────────────────────── */

const isValidIdent = (s: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s)
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** '/'->'.index' | '/hono-x'->"['hono-x']" | '/posts/hono/{id}'->".posts.hono[':id']" */
const formatPath = (p: string) => {
  const segs = (p === '/' ? ['index'] : p.replace(/^\/+/, '').split('/')).filter(Boolean)
  return segs
    .map((seg) =>
      seg.startsWith('{') && seg.endsWith('}')
        ? `[':${seg.slice(1, -1)}']`
        : isValidIdent(seg)
          ? `.${seg}`
          : `['${esc(seg)}']`,
    )
    .join('')
}

/* ─────────────────────────────── Schema helpers ─────────────────────────────── */

type JSONTypeName = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null'

const isJSONTypeName = (s: unknown): s is JSONTypeName =>
  typeof s === 'string' &&
  (s === 'object' ||
    s === 'array' ||
    s === 'string' ||
    s === 'number' ||
    s === 'integer' ||
    s === 'boolean' ||
    s === 'null')

const toTypeArray = (t: unknown): JSONTypeName[] => {
  if (isJSONTypeName(t)) return [t]
  if (Array.isArray(t)) return t.filter(isJSONTypeName)
  return []
}

const literalFromEnum = (vals: NonNullable<Schema['enum']>): string => {
  const toLit = (v: unknown) =>
    typeof v === 'string'
      ? `'${v.replace(/'/g, "\\'")}'`
      : typeof v === 'number' || typeof v === 'boolean'
        ? String(v)
        : v === null
          ? 'null'
          : 'unknown'
  return vals.map(toLit).join('|')
}

const createResolveRef =
  (schemas: Record<string, Schema>) =>
  (ref?: string): Schema | undefined => {
    if (!ref) return undefined
    const m = ref.match(/^#\/components\/schemas\/(.+)$/)
    if (!m) return undefined
    const target = schemas[m[1]]
    return isRecord(target) ? target : undefined
  }

/** TS type printer (handles $ref / enums / combinators / additionalProperties / nullable) */
const createTsTypeFromSchema = (resolveRef: (ref?: string) => Schema | undefined) => {
  const tt = (schema: Schema | undefined, seen: Set<Schema> = new Set()): string => {
    if (!schema) return 'unknown'

    if (schema.$ref) {
      const tgt = resolveRef(schema.$ref)
      return tt(tgt, seen)
    }

    if (seen.has(schema)) return 'unknown'
    const next = new Set(seen)
    next.add(schema)

    if (Array.isArray(schema.oneOf) && schema.oneOf.length)
      return schema.oneOf.map((s) => tt(s, next)).join('|') || 'unknown'
    if (Array.isArray(schema.anyOf) && schema.anyOf.length)
      return schema.anyOf.map((s) => tt(s, next)).join('|') || 'unknown'
    if (Array.isArray(schema.allOf) && schema.allOf.length)
      return schema.allOf.map((s) => tt(s, next)).join('&') || 'unknown'

    if (Array.isArray(schema.enum) && schema.enum.length) {
      const base = literalFromEnum(schema.enum)
      return schema.nullable ? `${base}|null` : base
    }

    const types = toTypeArray(schema.type)

    // array (parentheses when inner contains union/intersection)
    if (types.includes('array')) {
      const item = isRecord(schema.items) ? (schema.items as Schema) : undefined
      const inner = tt(item, next)
      const needParens = /[|&]/.test(inner) && !/^\(.*\)$/.test(inner)
      const core = `${needParens ? `(${inner})` : inner}[]`
      return schema.nullable ? `${core}|null` : core
    }

    if (types.includes('object')) {
      const req = new Set<string>(Array.isArray(schema.required) ? schema.required : [])
      const props = schema.properties ?? {}
      const fields = Object.entries(props).map(([k, v]) => {
        const opt = req.has(k) ? '' : '?'
        const child = isRecord(v) ? (v as Schema) : undefined
        return `${k}${opt}:${tt(child, next)}`
      })
      const ap = schema.additionalProperties
      const addl =
        ap === true
          ? '[key:string]:unknown'
          : isRecord(ap)
            ? `[key:string]:${tt(ap as Schema, next)}`
            : ''
      const members = [...fields, addl].filter(Boolean).join(',')
      const core = `{${members}}`
      return schema.nullable ? `${core}|null` : core
    }

    if (types.length === 0) return schema.nullable ? 'unknown|null' : 'unknown'
    const prim = types
      .map((t) => (t === 'integer' ? 'number' : t === 'null' ? 'null' : t))
      .join('|')
    return schema.nullable ? `${prim}|null` : prim
  }
  return tt
}

/* ─────────────────────────────── Parameters ($ref) ─────────────────────────────── */

type RefObject = { $ref: string }
const isRefObject = (v: unknown): v is RefObject => isRecord(v) && typeof v.$ref === 'string'

type ParameterLike = {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
  schema?: Schema
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
} & { [M in HttpMethod]?: OperationLike }

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

const pickBodySchema = (op: OperationLike): Schema | undefined => {
  const rb = op.requestBody
  if (!isRecord(rb)) return undefined
  const content = rb.content
  if (!isRecord(content)) return undefined
  const order = [
    'application/json',
    'application/*+json',
    'application/xml',
    'application/x-www-form-urlencoded',
    'multipart/form-data',
    'application/octet-stream',
  ]
  for (const k of order) {
    const media = isRecord(content[k]) ? content[k] : undefined
    if (hasSchemaProp(media) && isRecord(media.schema)) return media.schema as Schema
  }
  return undefined
}

/* ─────────────────────────────── Args builders ─────────────────────────────── */

const createBuildParamsType =
  (tsTypeFromSchema: (s: Schema | undefined) => string) =>
  (pathParams: ParameterLike[], queryParams: ParameterLike[]) => {
    const pathPart =
      pathParams.length === 0
        ? []
        : [`path:{${pathParams.map((p) => `${p.name}:${tsTypeFromSchema(p.schema)}`).join(',')}}`]

    const queryPart =
      queryParams.length === 0
        ? []
        : [`query:{${queryParams.map((p) => `${p.name}:${tsTypeFromSchema(p.schema)}`).join(',')}}`]

    const parts = [...pathPart, ...queryPart]
    return parts.length === 0 ? '' : `{${parts.join(',')}}`
  }

const buildArgSignature = (paramsType: string, bodyType: string | null) =>
  paramsType && bodyType
    ? `params:${paramsType},body:${bodyType}`
    : paramsType
      ? `params:${paramsType}`
      : bodyType
        ? `body:${bodyType}`
        : ''

/** pass path/query as-is (keep numbers/arrays) */
const buildClientArgs = (
  pathParams: ParameterLike[],
  queryParams: ParameterLike[],
  hasBody: boolean,
) => {
  const paramPiece = pathParams.length ? ['param:params.path'] : []
  const queryPiece = queryParams.length ? ['query:params.query'] : []
  const bodyPiece = hasBody ? ['json:body'] : []
  const pieces = [...paramPiece, ...queryPiece, ...bodyPiece]
  return pieces.length === 0 ? '' : `{${pieces.join(',')}}`
}

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

const generateOperationCode = (
  pathStr: string,
  method: HttpMethod,
  item: PathItemLike,
  deps: {
    client: string
    tsTypeFromSchema: (s: Schema | undefined) => string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
  },
): string => {
  const op = item[method]
  if (!isOperationLike(op)) return ''

  const funcName = methodPath(method, pathStr)
  const clientAccess = formatPath(pathStr)

  const pathLevelParams = deps.toParameterLikes(item.parameters)
  const opParams = deps.toParameterLikes(op.parameters)

  const allParams = [...pathLevelParams, ...opParams]
  const pathParams = allParams.filter((p) => p.in === 'path')
  const queryParams = allParams.filter((p) => p.in === 'query')

  const bodySchema = pickBodySchema(op)
  const hasBody = bodySchema !== undefined
  const bodyType = hasBody ? deps.tsTypeFromSchema(bodySchema) : null

  const buildParamsType = createBuildParamsType(deps.tsTypeFromSchema)
  const paramsType = buildParamsType(pathParams, queryParams)
  const argSig = buildArgSignature(paramsType, bodyType)
  const clientArgs = buildClientArgs(pathParams, queryParams, hasBody)

  const call = clientArgs
    ? `${deps.client}${clientAccess}.$${method}(${clientArgs})`
    : `${deps.client}${clientAccess}.$${method}()`

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
    tsTypeFromSchema: (s: Schema | undefined) => string
    toParameterLikes: (arr?: unknown) => ParameterLike[]
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
 * Generate RPC client wrappers from an OpenAPI/TypeSpec source.
 *
 * - When `split=true`, writes one file per RPC function under `output` (directory) and an `index.ts` barrel.
 * - Otherwise, emits a single `.ts` file at `output`.
 */
export async function rpc(
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
  output: string | `${string}.ts`,
  importPath: string,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error }
  const openAPI = openAPIResult.value

  const client = 'client'
  const s = `import { client } from '${importPath}'`
  const header = s.length ? `${s}\n\n` : ''

  const pathsMaybe = openAPI.paths
  if (!isOpenAPIPaths(pathsMaybe)) {
    return { ok: false, error: 'Invalid OpenAPI paths' }
  }

  const schemas = openAPI.components?.schemas ?? {}
  const resolveRef = createResolveRef(schemas)
  const tsTypeFromSchema = createTsTypeFromSchema(resolveRef)

  const componentsParameters = openAPI.components?.parameters ?? {}
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)

  const deps = {
    client,
    tsTypeFromSchema,
    toParameterLikes,
  }

  const operationCodes = buildOperationCodes(pathsMaybe, deps)

  // Non-split: write single file
  if (!split) {
    const body = operationCodes.map(({ code }) => code).join('\n\n')
    const code = `${header}${body}${operationCodes.length ? '\n' : ''}`
    const coreResult = await core(code, path.dirname(output), output)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
    return { ok: true, value: `Generated rpc code written to ${output}` }
  }

  // Split: write each file + index.ts (barrel)
  const { outDir, indexPath } = resolveSplitOutDir(output)

  for (const { funcName, code } of operationCodes) {
    const fileSrc = `${header}${code}\n`
    const filePath = path.join(outDir, `${funcName}.ts`)
    const coreResult = await core(fileSrc, path.dirname(filePath), filePath)
    if (!coreResult.ok) return { ok: false, error: coreResult.error }
  }

  const exportLines = Array.from(
    new Set(operationCodes.map(({ funcName }) => `export * from './${funcName}'`)),
  )
  const index = `${exportLines.join('\n')}\n`
  const coreResult = await core(index, path.dirname(indexPath), indexPath)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return {
    ok: true,
    value: `Generated rpc code written to ${outDir}/*.ts (index.ts included)`,
  }
}
