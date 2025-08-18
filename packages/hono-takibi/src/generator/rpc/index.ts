import type { OpenAPI, OpenAPIPaths, Schema } from '../../openapi/index.js'
import { methodPath } from '../../utils/index.js'

/* ─────────────────────────────── Guards ─────────────────────────────── */

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
  if (!isRecord(v)) return false
  for (const k in v) if (!isRecord(v[k])) return false
  return true
}

const isSchema = (v: unknown): v is Schema => isRecord(v)

/* ─────────────────────────────── Formatters ─────────────────────────────── */

const isValidIdent = (s: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s)
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

/** '/'->'.index' | '/hono-x'->"['hono-x']" | '/posts/hono/{id}'->".posts.hono[':id']" */
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
    return isSchema(target) ? target : undefined
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
      const item = isSchema(schema.items) ? schema.items : undefined
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
        const child = isSchema(v) ? v : undefined
        return `${k}${opt}:${tt(child, next)}`
      })
      const ap = schema.additionalProperties
      const addl =
        ap === true ? '[key:string]:unknown' : isSchema(ap) ? `[key:string]:${tt(ap, next)}` : ''
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
    if (hasSchemaProp(media) && isSchema(media.schema)) return media.schema
  }
  return undefined
}

/* ─────────────────────────────── Args builders ─────────────────────────────── */

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

const buildArgSignature = (paramsType: string, bodyType: string | null) =>
  paramsType && bodyType
    ? `params:${paramsType}, body:${bodyType}`
    : paramsType
      ? `params:${paramsType}`
      : bodyType
        ? `body:${bodyType}`
        : ''

/** pass query as-is (keep numbers/arrays) */
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
    const inner = queryParams.map((p) => `${p.name}:params.query.${p.name}`).join(',')
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
  const summaryBlock = summary ? ` * ${summary}\n *\n` : ''
  const descriptionBlock = description ? ` * ${description}\n *\n` : ''

  return `/**\n${summaryBlock}${descriptionBlock} * ${method.toUpperCase()} ${path}\n */\nexport async function ${funcName}(${argSig}){return await ${call}}`
}

/* ─────────────────────────────── Entry ─────────────────────────────── */

export default function rpc(openapi: OpenAPI, importCode: string): string {
  const client = 'client'
  const out: string[] = []

  const s = (importCode ?? '').trim()
  const header = s.length ? `${s}\n\n` : ''

  const pathsMaybe = openapi.paths
  if (!isOpenAPIPaths(pathsMaybe)) return header

  const schemas = openapi.components?.schemas ?? {}
  const resolveRef = createResolveRef(schemas)
  const tsTypeFromSchema = createTsTypeFromSchema(resolveRef)

  const componentsParameters = openapi.components?.parameters ?? {}
  const resolveParameter = createResolveParameter(componentsParameters)
  const toParameterLikes = createToParameterLikes(resolveParameter)

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

  return `${header}${out.join('\n\n')}${out.length ? '\n' : ''}`
}
