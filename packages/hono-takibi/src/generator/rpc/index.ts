import type { OpenAPI, OpenAPIPaths, Schema } from '../../openapi/index.js'

export function honoRpc(openapi: OpenAPI, importCode: string): string {
  const client = 'client'
  const out: string[] = []

  /* guards */
  const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null

  const isOpenAPIPaths = (v: unknown): v is OpenAPIPaths => {
    if (!isRecord(v)) return false
    for (const k in v) if (!isRecord(v[k])) return false
    return true
  }

  const isSchema = (v: unknown): v is Schema => isRecord(v)

  /* formatters */
  const upperHead = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)
  const funcNameFrom = (method: string, path: string) => {
    const core = path.replace(/[/{}._-]/g, ' ').trim().split(/\s+/).filter(Boolean).map(upperHead).join('')
    return core ? `${method}${core}` : `${method}Index`
  }
  const isValidIdent = (s: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s)
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  // '/hono-x' → "['hono-x']" , '/posts/hono/{id}' → ".posts.hono[':id']" , '/' → ".index"
  const formatPath = (path: string) => {
    const segs = (path === '/' ? ['index'] : path.replace(/^\/+/, '').split('/')).filter(Boolean)
    return segs.map((seg) => {
      if (seg.startsWith('{') && seg.endsWith('}')) return `[':${seg.slice(1, -1)}']`
      return isValidIdent(seg) ? `.${seg}` : `['${esc(seg)}']`
    }).join('')
  }

  /* schema resolve ($ref, enum, anyOf/allOf/oneOf, additionalProperties, nullable) */
  const schemas = openapi.components?.schemas ?? {}

  const resolveRef = (ref: string | undefined): Schema | undefined => {
    if (!ref) return undefined
    const m = ref.match(/^#\/components\/schemas\/(.+)$/)
    if (!m) return undefined
    const target = schemas[m[1]]
    return isSchema(target) ? target : undefined
  }

  type JSONTypeName = 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null'
  const isJSONTypeName = (s: unknown): s is JSONTypeName =>
    typeof s === 'string' && (s === 'object' || s === 'array' || s === 'string' || s === 'number' || s === 'integer' || s === 'boolean' || s === 'null')
  const toTypeArray = (t: unknown): JSONTypeName[] => {
    if (isJSONTypeName(t)) return [t]
    if (Array.isArray(t)) return t.filter(isJSONTypeName)
    return []
  }

  const literalFromEnum = (vals: NonNullable<Schema['enum']>): string => {
    const toLit = (v: unknown) =>
      typeof v === 'string' ? `'${v.replace(/'/g, "\\'")}'`
      : typeof v === 'number' || typeof v === 'boolean' ? String(v)
      : v === null ? 'null' : 'unknown'
    return vals.map(toLit).join('|')
  }

  const tsTypeFromSchema = (schema: Schema | undefined, seen: Set<Schema> = new Set()): string => {
    if (!schema) return 'unknown'
    if (schema.$ref) {
      const tgt = resolveRef(schema.$ref)
      return tgt ? tsTypeFromSchema(tgt, seen) : 'unknown'
    }
    if (seen.has(schema)) return 'unknown'
    const nextSeen = new Set(seen); nextSeen.add(schema)

    if (Array.isArray(schema.oneOf) && schema.oneOf.length) return schema.oneOf.map(s => tsTypeFromSchema(s, nextSeen)).join('|') || 'unknown'
    if (Array.isArray(schema.anyOf) && schema.anyOf.length) return schema.anyOf.map(s => tsTypeFromSchema(s, nextSeen)).join('|') || 'unknown'
    if (Array.isArray(schema.allOf) && schema.allOf.length) return schema.allOf.map(s => tsTypeFromSchema(s, nextSeen)).join('&') || 'unknown'

    if (Array.isArray(schema.enum) && schema.enum.length) {
      const base = literalFromEnum(schema.enum)
      return schema.nullable ? `${base}|null` : base
    }

    const types = toTypeArray(schema.type)

    if (types.includes('array')) {
      const inner = tsTypeFromSchema(schema.items, nextSeen)
      const core = `${inner}[]`
      return schema.nullable ? `${core}|null` : core
    }

    if (types.includes('object')) {
      const req = new Set<string>(Array.isArray(schema.required) ? schema.required : [])
      const props = schema.properties ?? {}
      const fields = Object.entries(props).map(([k, v]) => {
        const opt = req.has(k) ? '' : '?'
        return `${k}${opt}:${tsTypeFromSchema(isSchema(v) ? v : undefined, nextSeen)}`
      })
      const ap = schema.additionalProperties
      const addl =
        ap === true ? `[key:string]:unknown`
        : isSchema(ap) ? `[key:string]:${tsTypeFromSchema(ap, nextSeen)}`
        : ''
      const members = [...fields, addl].filter(Boolean).join(',')
      const core = `{${members}}`
      return schema.nullable ? `${core}|null` : core
    }

    if (types.length === 0) return schema.nullable ? 'unknown|null' : 'unknown'
    const prim = types.map(t => t === 'integer' ? 'number' : t === 'null' ? 'null' : t).join('|')
    return schema.nullable ? `${prim}|null` : prim
  }

  /* parameters ($ref in components.parameters) */
  type ParameterLike = {
    name: string
    in: 'path' | 'query' | 'header' | 'cookie'
    required?: boolean
    schema?: Schema
  }
  const isParameterObject = (v: unknown): v is ParameterLike => {
    if (!isRecord(v)) return false
    if (typeof v.name !== 'string') return false
    const pin = v.in
    return pin === 'path' || pin === 'query' || pin === 'header' || pin === 'cookie'
  }

  const componentsParameters = openapi.components?.parameters ?? {}

  const refParamName = (refLike: unknown): string | undefined => {
    const ref =
      typeof refLike === 'string'
        ? refLike
        : isRecord(refLike) && typeof refLike.$ref === 'string'
          ? refLike.$ref
          : undefined
    const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
    return m ? m[1] : undefined
  }

  const resolveParameterLike = (p: unknown): ParameterLike | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }

  const toParameterLikes = (arr: unknown): ParameterLike[] =>
    Array.isArray(arr)
      ? arr.reduce<ParameterLike[]>((acc, x) => {
          const r = resolveParameterLike(x)
          if (r) acc.push(r)
          return acc
        }, [])
      : []

  /* params & client args */
  const buildParamsType = (pathParams: ParameterLike[], queryParams: ParameterLike[]) => {
    const parts: string[] = []
    if (pathParams.length) {
      const inner = pathParams.map(p => `${p.name}:${tsTypeFromSchema(p.schema)}`).join(',')
      parts.push(`path:{${inner}}`)
    }
    if (queryParams.length) {
      const inner = queryParams.map(p => `${p.name}:${tsTypeFromSchema(p.schema)}`).join(',')
      parts.push(`query:{${inner}}`)
    }
    return parts.length ? `{${parts.join(',')}}` : ''
  }

  const buildArgSignature = (paramsType: string, bodyType: string | null) =>
    paramsType && bodyType ? `params:${paramsType}, body:${bodyType}`
    : paramsType ? `params:${paramsType}`
    : bodyType ? `body:${bodyType}` : ''

  const buildQueryPiece = (p: ParameterLike) => {
    const types = toTypeArray(p.schema?.type)
    const isArr = types.includes('array')
    const itemsInt =
      isArr && isSchema(p.schema?.items) && toTypeArray(p.schema?.items?.type).includes('integer')
    const isInt = types.includes('integer')
    const rhs =
      itemsInt ? `(params.query.${p.name}??[]).map((v:unknown)=>String(v))`
      : isInt   ? `String(params.query.${p.name})`
      : `params.query.${p.name}`
    return `${p.name}:${rhs}`
  }

  const buildClientArgs = (pathParams: ParameterLike[], queryParams: ParameterLike[], hasBody: boolean) => {
    const pieces: string[] = []
    if (pathParams.length) {
      const inner = pathParams.map(p => `${p.name}:params.path.${p.name}`).join(',')
      pieces.push(`param:{${inner}}`)
    }
    if (queryParams.length) {
      const inner = queryParams.map(buildQueryPiece).join(',')
      pieces.push(`query:{${inner}}`)
    }
    if (hasBody) pieces.push('json:body')
    return pieces.length ? `{${pieces.join(',')}}` : ''
  }

  /* requestBody schema */
  const hasSchemaProp = (v: unknown): v is { schema?: Schema } => isRecord(v) && 'schema' in v
  const pickBodySchema = (op: unknown): Schema | undefined => {
    if (!isRecord(op)) return undefined
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
      if (hasSchemaProp(media)) return media.schema
    }
    return undefined
  }

  /* main */
  const header = (() => {
    const s = (importCode ?? '').trim()
    return s.length ? `${s}\n\n` : ''
  })()

  const pathsMaybe = openapi.paths
  if (!isOpenAPIPaths(pathsMaybe)) return header
  const paths: OpenAPIPaths = pathsMaybe

  type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
  const HTTP_METHODS: ReadonlyArray<HttpMethod> = ['get','put','post','delete','options','head','patch','trace']

  for (const path in paths) {
    const item = paths[path]
    const pathLevelParams = toParameterLikes(item.parameters)

    for (const method of HTTP_METHODS) {
      const op = item[method]
      if (!op) continue
      if (!('responses' in op)) continue

      const funcName = funcNameFrom(method, path)
      const clientAccess = formatPath(path)

      const opParams = toParameterLikes(op.parameters)
      const allParams = [...pathLevelParams, ...opParams]
      const pathParams = allParams.filter((p) => p.in === 'path')
      const queryParams = allParams.filter((p) => p.in === 'query')

      const bodySchema = pickBodySchema(op)
      const hasBody = bodySchema !== undefined
      const bodyType = hasBody ? tsTypeFromSchema(bodySchema) : null

      const paramsType = buildParamsType(pathParams, queryParams)
      const argSig = buildArgSignature(paramsType, bodyType)
      const clientArgs = buildClientArgs(pathParams, queryParams, hasBody)

      const call = clientArgs
        ? `${client}${clientAccess}.$${method}(${clientArgs})`
        : `${client}${clientAccess}.$${method}()`

      const summary = typeof op.summary === 'string' ? op.summary : ''
      const description = typeof op.description === 'string' ? op.description : ''

      const code =
        '/**\n' +
        (summary ? ` * ${summary}\n *\n` : '') +
        (description ? ` * ${description}\n *\n` : '') +
        ` * ${method.toUpperCase()} ${path}\n` +
        ' */\n' +
        `export async function ${funcName}(${argSig}) {\n` +
        `  return await ${call}\n` +
        '}'


      out.push(code)
    }
  }

  return header + out.join('\n\n') + (out.length ? '\n' : '')
}
