import type { OpenAPI} from '../../openapi/index.js'

export function honoRpc(openapi: OpenAPI): string {
  const client = 'client'
  const rpc: string[] = []

  const pathsUnknown: unknown = openapi.paths ?? {}

  /* ----------------------------- helpers ----------------------------- */

  const upperHead = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

  const funcNameFrom = (method: string, path: string) => {
    const core = path
      .replace(/[/{}._-]/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(upperHead)
      .join('')
    return core ? `${method}${core}` : `${method}Index`
  }

  const isValidIdent = (s: string): boolean => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s)

  // '/posts/hono/{id}' → 'posts.hono[':id']'
  const formatPath = (path: string) => {
    const name = path === '/' ? 'index' : path
    const segs = name.replace(/^\/+/, '').split('/').filter(Boolean)
    const head = segs[0] ?? 'index'
    const tail = segs
      .slice(1)
      .map((seg) => {
        if (seg.startsWith('{') && seg.endsWith('}')) return `[':${seg.slice(1, -1)}']`
        return isValidIdent(seg) ? `.${seg}` : `['${seg}']`
      })
      .join('')
    return head + tail
  }

  const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null

  type JSONTypeName =
    | 'object'
    | 'array'
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'null'

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

  type ParameterLike = {
    name: string
    in: 'path' | 'query' | 'header' | 'cookie'
    required?: boolean
    schema?: { type?: JSONTypeName | JSONTypeName[] }
  }

  const isParameterLike = (v: unknown): v is ParameterLike => {
    if (!isRecord(v)) return false
    if (typeof v.name !== 'string') return false
    const pin = v['in']
    if (pin !== 'path' && pin !== 'query' && pin !== 'header' && pin !== 'cookie') return false
    const schema = v.schema
    if (schema !== undefined && !isRecord(schema)) return false
    if (isRecord(schema) && schema.type !== undefined) {
      const t = schema.type
      if (!(isJSONTypeName(t) || (Array.isArray(t) && t.every(isJSONTypeName)))) return false
    }
    return true
  }

  type SchemaLike = {
    type?: JSONTypeName | JSONTypeName[]
    properties?: Record<string, unknown>
    required?: string[]
    items?: unknown
  }

  const isSchemaLike = (v: unknown): v is SchemaLike => {
    if (!isRecord(v)) return false
    if (v.type !== undefined) {
      const t = v.type
      if (!(isJSONTypeName(t) || (Array.isArray(t) && t.every(isJSONTypeName)))) return false
    }
    if (v.properties !== undefined && !isRecord(v.properties)) return false
    if (v.required !== undefined && !Array.isArray(v.required)) return false
    return true
  }

  const tsTypeFromJsonType = (t: unknown): string => {
    const arr = toTypeArray(t)
    if (arr.length === 0) return 'any'
    return arr
      .map((x) => (x === 'integer' ? 'number' : x === 'null' ? 'null' : x))
      .join(' | ')
  }

  const tsTypeFromSchema = (schema: unknown): string => {
    if (!isSchemaLike(schema)) return 'any'
    const types = toTypeArray(schema.type)

    if (types.includes('object') && isRecord(schema.properties)) {
      const req = new Set<string>(Array.isArray(schema.required) ? schema.required : [])
      const fields = Object.entries(schema.properties).map(([k, v]) => {
        const opt = req.has(k) ? '' : '?'
        return `${k}${opt}: ${tsTypeFromSchema(v)}`
      })
      return `{ ${fields.join('; ')} }`
    }

    if (types.includes('array')) {
      const inner = tsTypeFromSchema(schema.items)
      return `${inner}[]`
    }

    return tsTypeFromJsonType(schema.type)
  }

  const buildParamsType = (pathParams: ParameterLike[], queryParams: ParameterLike[]) => {
    const parts: string[] = []
    if (pathParams.length) {
      const inner = pathParams
        .map((p) => `${p.name}: ${tsTypeFromJsonType(p.schema?.type)}`)
        .join('; ')
      parts.push(`path: { ${inner} }`)
    }
    if (queryParams.length) {
      const inner = queryParams
        .map((p) => `${p.name}: ${tsTypeFromJsonType(p.schema?.type)}`)
        .join('; ')
      parts.push(`query: { ${inner} }`)
    }
    return parts.length ? `{ ${parts.join('; ')} }` : ''
  }

  const buildArgSignature = (paramsType: string, bodyType: string | null) => {
    if (paramsType && bodyType) return `params: ${paramsType}, body: ${bodyType}`
    if (paramsType) return `params: ${paramsType}`
    if (bodyType) return `body: ${bodyType}`
    return ''
  }

  const buildClientArgs = (
    pathParams: ParameterLike[],
    queryParams: ParameterLike[],
    hasBody: boolean,
  ) => {
    const pieces: string[] = []

    if (pathParams.length) {
      const inner = pathParams.map((p) => `${p.name}: params.path.${p.name}`).join(', ')
      pieces.push(`param: { ${inner} }`)
    }

    if (queryParams.length) {
      const inner = queryParams
        .map((p) => {
          const t = p.schema?.type
          const isInt =
            (typeof t === 'string' && t === 'integer') ||
            (Array.isArray(t) && t.some((x) => x === 'integer'))
          const rhs = isInt ? `String(params.query.${p.name})` : `params.query.${p.name}`
          return `${p.name}: ${rhs}`
        })
        .join(', ')
      pieces.push(`query: { ${inner} }`)
    }

    if (hasBody) {
      pieces.push(`json: body`)
    }

    return pieces.length ? `{ ${pieces.join(', ')} }` : ''
  }

  const hasSchema = (v: unknown): v is { schema: unknown } =>
    isRecord(v) && 'schema' in v

  const pickJsonBodySchema = (op: Record<string, unknown>): unknown => {
    const rb = op['requestBody']
    if (!isRecord(rb)) return undefined
    const content = rb['content']
    if (!isRecord(content)) return undefined
    const aj = content['application/json']
    if (hasSchema(aj)) return aj.schema
    const asj = content['application/*+json']
    if (hasSchema(asj)) return asj.schema
    return undefined
  }

  /* --------------------------- main generation --------------------------- */

  if (!isRecord(pathsUnknown)) return ''

  for (const path in pathsUnknown) {
    const pathItemUnknown = pathsUnknown[path]
    if (!isRecord(pathItemUnknown)) continue

    const pathLevelParamsRaw = pathItemUnknown['parameters']
    const pathLevelParams: ParameterLike[] =
      Array.isArray(pathLevelParamsRaw) ? pathLevelParamsRaw.filter(isParameterLike) : []

    for (const method in pathItemUnknown) {
      if (method === 'parameters') continue

      const op = pathItemUnknown[method]
      if (!isRecord(op)) continue
      if (!('responses' in op)) continue

      const funcName = funcNameFrom(method, path)
      const clientPath = formatPath(path)

      const opParamsRaw = op['parameters']
      const opParams: ParameterLike[] =
        Array.isArray(opParamsRaw) ? opParamsRaw.filter(isParameterLike) : []

      const allParams = [...pathLevelParams, ...opParams]
      const pathParams = allParams.filter((p) => p.in === 'path')
      const queryParams = allParams.filter((p) => p.in === 'query')

      const jsonBodySchema = pickJsonBodySchema(op)
      const hasBody = jsonBodySchema !== undefined
      const bodyType = hasBody ? tsTypeFromSchema(jsonBodySchema) : null

      const paramsType = buildParamsType(pathParams, queryParams)
      const argSig = buildArgSignature(paramsType, bodyType)
      const clientArgs = buildClientArgs(pathParams, queryParams, hasBody)

      const call =
        clientArgs.length > 0
          ? `${client}.${clientPath}.$${method}(${clientArgs})`
          : `${client}.${clientPath}.$${method}()`

      const summary = typeof op['summary'] === 'string' ? op['summary'] : ''
      const description = typeof op['description'] === 'string' ? op['description'] : ''

      const rpcCode =
        `/**\n` +
        (summary ? ` * ${summary}\n *\n` : '') +
        (description ? ` * ${description}\n *\n` : '') +
        ` * ${method.toUpperCase()} ${path}\n` +
        ` */\n` +
        `export async function ${funcName}(${argSig}) {\n` +
        `  return await ${call}\n` +
        `}`

      rpc.push(rpcCode)
    }
  }

  return rpc.join('\n\n')
}
