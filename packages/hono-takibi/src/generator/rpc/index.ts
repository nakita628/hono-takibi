import type { OpenAPI, OpenAPIPaths, Schema } from '../../openapi/index.js'
import { methodPath } from '../../utils/index.js'

/* ─────────────────────────────── Guards ─────────────────────────────── */

/** Narrow to generic object records */
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

/** Narrow to OpenAPI paths object (shallow structural check) */
const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
  if (!isRecord(v)) return false
  for (const k in v) if (!isRecord(v[k])) return false
  return true
}

/** Treat any object as Schema (we rely on downstream field checks) */
const isSchema = (v: unknown): v is Schema => isRecord(v)

/* ─────────────────────────────── Formatters ─────────────────────────────── */

/** Uppercase the first character */
const upperHead = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

/** JS identifier check */
const isValidIdent = (s: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s)

/** Escape single quotes and backslashes for single-quoted strings */
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/**
 * Convert an OpenAPI path to a client access chain.
 * examples:
 *  '/'                 -> ".index"
 *  '/hono-x'           -> "['hono-x']"
 *  '/posts/hono/{id}'  -> ".posts.hono[':id']"
 */
const formatPath = (path: string) => {
  const segs = (path === '/' ? ['index'] : path.replace(/^\/+/, '').split('/')).filter(Boolean)
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

/** 'type' to normalized list for uniform checks */
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

/** Build literal union from enum values (kept compact) */
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

/** Create a $ref resolver for #/components/schemas/... */
const createResolveRef =
  (schemas: Record<string, Schema>) =>
  (ref?: string): Schema | undefined => {
    if (!ref) return undefined
    const m = ref.match(/^#\/components\/schemas\/(.+)$/)
    if (!m) return undefined
    const target = schemas[m[1]]
    return isSchema(target) ? target : undefined
  }

/** Create a Schema->TypeScript type printer (single instance, recursive-safe) */
const createTsTypeFromSchema = (resolveRef: (ref?: string) => Schema | undefined) => {
  const tt = (schema: Schema | undefined, seen: Set<Schema> = new Set()): string => {
    if (!schema) return 'unknown'

    // $ref resolution
    if (schema.$ref) {
      const tgt = resolveRef(schema.$ref)
      return tt(tgt, seen)
    }

    // recursion guard
    if (seen.has(schema)) return 'unknown'
    const nextSeen = new Set(seen)
    nextSeen.add(schema)

    // combinators
    if (Array.isArray(schema.oneOf) && schema.oneOf.length)
      return schema.oneOf.map((s) => tt(s, nextSeen)).join('|') || 'unknown'
    if (Array.isArray(schema.anyOf) && schema.anyOf.length)
      return schema.anyOf.map((s) => tt(s, nextSeen)).join('|') || 'unknown'
    if (Array.isArray(schema.allOf) && schema.allOf.length)
      return schema.allOf.map((s) => tt(s, nextSeen)).join('&') || 'unknown'

    // enum
    if (Array.isArray(schema.enum) && schema.enum.length) {
      const base = literalFromEnum(schema.enum)
      return schema.nullable ? `${base}|null` : base
    }

    const types = toTypeArray(schema.type)

    // array
    if (types.includes('array')) {
      const inner = tt(isSchema(schema.items) ? schema.items : undefined, nextSeen)
      const core = `${inner}[]`
      return schema.nullable ? `${core}|null` : core
    }

    // object
    if (types.includes('object')) {
      const req = new Set<string>(Array.isArray(schema.required) ? schema.required : [])
      const props = schema.properties ?? {}
      const fields = Object.entries(props).map(([k, v]) => {
        const opt = req.has(k) ? '' : '?'
        const child = isSchema(v) ? v : undefined
        return `${k}${opt}:${tt(child, nextSeen)}`
      })
      const ap = schema.additionalProperties
      const addl =
        ap === true
          ? '[key:string]:unknown'
          : isSchema(ap)
            ? `[key:string]:${tt(ap, nextSeen)}`
            : ''
      const members = [...fields, addl].filter(Boolean).join(',')
      const core = `{${members}}`
      return schema.nullable ? `${core}|null` : core
    }

    // primitives
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

/** Extract components/parameters name from a ref-like value */
const refParamName = (refLike: unknown): string | undefined => {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
  return m ? m[1] : undefined
}

/** Build a resolver that returns normalized ParameterLike (resolving $ref) */
const createResolveParameter =
  (componentsParameters: Record<string, unknown>) =>
  (p: unknown): ParameterLike | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }

/** Convert raw parameters array into ParameterLike[] */
const createToParameterLikes =
  (resolveParam: (p: unknown) => ParameterLike | undefined) =>
  (arr?: unknown): ParameterLike[] =>
    Array.isArray(arr)
      ? arr.reduce<ParameterLike[]>((acc, x) => {
          const r = resolveParam(x)
          if (r) acc.push(r)
          return acc
        }, [])
      : []

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
const HTTP_METHODS: ReadonlyArray<HttpMethod> = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]

/** Extract the first suitable schema from requestBody.content by priority order */
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
    if (isRecord(media) && 'schema' in media && isSchema(media.schema)) {
      return media.schema
    }
  }
  return undefined
}

/* ─────────────────────────────── Args builders ─────────────────────────────── */

/** Build TS type for params arg (compact formatting) */
const createBuildParamsType =
  (tsTypeFromSchema: (s: Schema | undefined) => string) =>
  (pathParams: ParameterLike[], queryParams: ParameterLike[]) => {
    const parts: string[] = []
    if (pathParams.length) {
      const inner = pathParams.map((p) => `${p.name}:${tsTypeFromSchema(p.schema)}`).join(',')
      parts.push(`path:{${inner}}`)
    }
    if (queryParams.length) {
      const inner = queryParams.map((p) => `${p.name}:${tsTypeFromSchema(p.schema)}`).join(',')
      parts.push(`query:{${inner}}`)
    }
    return parts.length ? `{${parts.join(',')}}` : ''
  }

/** Build function argument signature */
const buildArgSignature = (paramsType: string, bodyType: string | null) =>
  paramsType && bodyType
    ? `params:${paramsType}, body:${bodyType}`
    : paramsType
      ? `params:${paramsType}`
      : bodyType
        ? `body:${bodyType}`
        : ''

/** Build one query key:value piece with integer-to-string rules */
const buildQueryPiece = (p: ParameterLike) => {
  const types = toTypeArray(p.schema?.type)
  const isArr = types.includes('array')
  const itemsInt =
    isArr && isSchema(p.schema?.items) && toTypeArray(p.schema?.items?.type).includes('integer')
  const isInt = types.includes('integer')
  const rhs = itemsInt
    ? `(params.query.${p.name}??[]).map((v:unknown)=>String(v))`
    : isInt
      ? `String(params.query.${p.name})`
      : `params.query.${p.name}`
  return `${p.name}:${rhs}`
}

/** Build client call argument object (compact formatting) */
const buildClientArgs = (
  pathParams: ParameterLike[],
  queryParams: ParameterLike[],
  hasBody: boolean,
) => {
  const pieces: string[] = []
  if (pathParams.length) {
    const inner = pathParams.map((p) => `${p.name}:params.path.${p.name}`).join(',')
    pieces.push(`param:{${inner}}`)
  }
  if (queryParams.length) {
    const inner = queryParams.map(buildQueryPiece).join(',')
    pieces.push(`query:{${inner}}`)
  }
  if (hasBody) pieces.push('json:body')
  return pieces.length ? `{${pieces.join(',')}}` : ''
}

/* ─────────────────────────────── Single-operation generator ─────────────────────────────── */

const generateOperationCode = (
  path: string,
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

  const funcName = methodPath(method, path)
  const clientAccess = formatPath(path)

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

  return (
    '/**\n' +
    (summary ? ` * ${summary}\n *\n` : '') +
    (description ? ` * ${description}\n *\n` : '') +
    ` * ${method.toUpperCase()} ${path}\n` +
    ' */\n' +
    `export async function ${funcName}(${argSig}) {\n` +
    `  return await ${call}\n` +
    '}'
  )
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

export function honoRpc(openapi: OpenAPI, importCode: string): string {
  const client = 'client'
  const out: string[] = []

  // import header (kept as-is, then a blank line if present)
  const header = (() => {
    const s = (importCode ?? '').trim()
    return s.length ? `${s}\n\n` : ''
  })()

  // paths guard
  const pathsMaybe = openapi.paths
  if (!isOpenAPIPaths(pathsMaybe)) return header

  // schema & parameter resolvers
  const schemas = openapi.components?.schemas ?? {}
  const resolveRef = createResolveRef(schemas)
  const tsTypeFromSchema = createTsTypeFromSchema(resolveRef)

  const componentsParameters = openapi.components?.parameters ?? {}
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)

  // iterate path items & operations
  for (const path in pathsMaybe) {
    const rawItem = pathsMaybe[path]
    if (!isRecord(rawItem)) continue

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

    for (const method of HTTP_METHODS) {
      const code = generateOperationCode(path, method, pathItem, {
        client,
        tsTypeFromSchema,
        toParameterLikes,
      })
      if (code) out.push(code)
    }
  }

  // final string (compact; Prettier will handle formatting as configured)
  return header + out.join('\n\n') + (out.length ? '\n' : '')
}
