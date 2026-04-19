import path from 'node:path'

import {
  isOperationLike,
  isParameterObject,
  isRecord,
  isRefObject,
  isSchemaProperty,
  isValidIdent,
} from '../guard/index.js'

function makeEscaped(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function refParamName(refLike: unknown) {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/parameters\/(.+)$/)
  return m ? m[1] : undefined
}

function makeResolveParameter(componentsParameters: { readonly [k: string]: unknown }) {
  return (
    p: unknown,
  ):
    | { name: string; in: 'path' | 'query' | 'header' | 'cookie'; required?: boolean }
    | undefined => {
    if (isParameterObject(p)) return p
    const name = refParamName(p)
    const cand = name ? componentsParameters[name] : undefined
    return isParameterObject(cand) ? cand : undefined
  }
}

function makeToParameterLikes(
  resolveParam: (p: unknown) =>
    | {
        readonly name: string
        readonly in: 'path' | 'query' | 'header' | 'cookie'
        readonly required?: boolean
      }
    | undefined,
) {
  return (
    arr?: unknown,
  ): readonly {
    readonly name: string
    readonly in: 'path' | 'query' | 'header' | 'cookie'
    readonly required?: boolean
  }[] =>
    Array.isArray(arr) ? arr.map((x) => resolveParam(x)).filter((param) => param !== undefined) : []
}

export function formatPath(p: string, hasBasePath?: boolean) {
  if (p === '/') {
    if (hasBasePath) {
      return {
        runtimePath: '',
        typeofPrefix: '',
        bracketSuffix: '',
        hasBracket: false,
      } as const
    }
    return {
      runtimePath: '.index',
      typeofPrefix: '.index',
      bracketSuffix: '',
      hasBracket: false,
    } as const
  }
  const segs = p.replace(/^\/+/, '').split('/').filter(Boolean)
  if (p !== '/' && p.endsWith('/')) segs.push('index')
  const honoSegs = segs.map((seg) => seg.replace(/\{([^}]+)\}/g, ':$1'))
  const firstBracketIdx = honoSegs.findIndex((seg) => !isValidIdent(seg))
  const hasBracket = firstBracketIdx !== -1
  const runtimeParts = honoSegs.map((seg) =>
    isValidIdent(seg) ? `.${seg}` : `['${makeEscaped(seg)}']`,
  )
  const runtimePath = runtimeParts.join('')
  const typeofPrefix = hasBracket
    ? honoSegs
        .slice(0, firstBracketIdx)
        .map((seg) => `.${seg}`)
        .join('')
    : runtimePath
  const bracketSuffix = hasBracket
    ? honoSegs
        .slice(firstBracketIdx)
        .map((seg) => `['${makeEscaped(seg)}']`)
        .join('')
    : ''
  return { runtimePath, typeofPrefix, bracketSuffix, hasBracket } as const
}

export function hasNoContentResponse(operation: {
  readonly summary?: string
  readonly description?: string
  readonly parameters?: unknown
  readonly requestBody?: unknown
  readonly responses?: unknown
}) {
  const responses = operation.responses
  if (!isRecord(responses)) return false
  return Object.keys(responses).some((status) => {
    const code = Number.parseInt(status, 10)
    return !Number.isNaN(code) && [204, 205].includes(code)
  })
}

function refRequestBodyName(refLike: unknown) {
  const ref =
    typeof refLike === 'string' ? refLike : isRefObject(refLike) ? refLike.$ref : undefined
  const m = ref?.match(/^#\/components\/requestBodies\/(.+)$/)
  return m ? m[1] : undefined
}

function pickAllBodyInfoFromContent(content: unknown) {
  if (!isRecord(content)) return undefined
  const formContentTypes = ['multipart/form-data', 'application/x-www-form-urlencoded']
  const isFormContentType = (ct: string): boolean =>
    formContentTypes.includes(ct.split(';')[0].trim())
  const validEntries = Object.entries(content).filter(
    ([_, mediaObj]) =>
      isRecord(mediaObj) && isSchemaProperty(mediaObj) && isRecord(mediaObj.schema),
  )
  const formInfos = validEntries
    .filter(([ct]) => isFormContentType(ct))
    .map(([ct]) => ({ contentType: ct }))
  const jsonInfos = validEntries
    .filter(([ct]) => !isFormContentType(ct))
    .map(([ct]) => ({ contentType: ct }))
  if (formInfos.length === 0 && jsonInfos.length === 0) return undefined
  return { form: formInfos, json: jsonInfos } as const
}

function makePickAllBodyInfo(componentsRequestBodies: { readonly [k: string]: unknown }) {
  return (operation: {
    summary?: string
    description?: string
    parameters?: unknown
    requestBody?: unknown
    responses?: unknown
  }) => {
    const requestBody = operation.requestBody
    if (!isRecord(requestBody)) return undefined
    const refName = refRequestBodyName(requestBody)
    if (refName) {
      const resolved = componentsRequestBodies[refName]
      if (isRecord(resolved) && isRecord(resolved.content)) {
        return pickAllBodyInfoFromContent(resolved.content)
      }
      if (resolved !== undefined)
        return { form: [], json: [{ contentType: 'application/json' }] } as const
      return undefined
    }
    return pickAllBodyInfoFromContent(requestBody.content)
  }
}

export function resolveSplitOutDir(output: string) {
  const outDir = output.endsWith('.ts') ? path.dirname(output) : output
  const indexPath = path.join(outDir, 'index.ts')
  return { outDir, indexPath } as const
}

export function parsePathItem(rawItem: { readonly [k: string]: unknown }): {
  parameters?: unknown
} & {
  readonly [M in 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace']?:
    | {
        readonly summary?: string
        readonly description?: string
        readonly parameters?: unknown
        readonly requestBody?: unknown
        readonly responses?: unknown
      }
    | undefined
} {
  return {
    parameters: rawItem.parameters,
    get: isOperationLike(rawItem.get) ? rawItem.get : undefined,
    put: isOperationLike(rawItem.put) ? rawItem.put : undefined,
    post: isOperationLike(rawItem.post) ? rawItem.post : undefined,
    delete: isOperationLike(rawItem.delete) ? rawItem.delete : undefined,
    options: isOperationLike(rawItem.options) ? rawItem.options : undefined,
    head: isOperationLike(rawItem.head) ? rawItem.head : undefined,
    patch: isOperationLike(rawItem.patch) ? rawItem.patch : undefined,
    trace: isOperationLike(rawItem.trace) ? rawItem.trace : undefined,
  } as const
}

export function makeParseResponseType(
  clientName: string,
  pathResult: {
    readonly runtimePath: string
    readonly typeofPrefix: string
    readonly bracketSuffix: string
    readonly hasBracket: boolean
  },
  method: 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace',
) {
  const { runtimePath, typeofPrefix, bracketSuffix, hasBracket } = pathResult
  const clientMethodType = hasBracket
    ? `typeof ${clientName}${typeofPrefix}${bracketSuffix}['$${method}']`
    : `typeof ${clientName}${runtimePath}.$${method}`
  return `Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<${clientMethodType}>>>>>`
}

export function makeOperationDeps(
  clientName: string,
  componentsParameters: { readonly [k: string]: unknown },
  componentsRequestBodies: { readonly [k: string]: unknown },
) {
  const toParameterLikes = makeToParameterLikes(makeResolveParameter(componentsParameters))
  const pickAllBodyInfo = makePickAllBodyInfo(componentsRequestBodies)
  return { client: clientName, toParameterLikes, pickAllBodyInfo } as const
}

export function operationHasArgs(
  item: {
    parameters?: unknown
  } & {
    [M in 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace']?:
      | {
          readonly summary?: string
          readonly description?: string
          readonly parameters?: unknown
          readonly requestBody?: unknown
          readonly responses?: unknown
        }
      | undefined
  },
  operation: {
    readonly summary?: string
    readonly description?: string
    readonly parameters?: unknown
    readonly requestBody?: unknown
    readonly responses?: unknown
  },
  deps: {
    readonly client: string
    readonly toParameterLikes: (
      arr?: unknown,
    ) => readonly { name: string; in: 'path' | 'query' | 'header' | 'cookie'; required?: boolean }[]
    pickAllBodyInfo: (operation: {
      readonly summary?: string
      readonly description?: string
      readonly parameters?: unknown
      readonly requestBody?: unknown
      readonly responses?: unknown
    }) =>
      | {
          readonly form: readonly { readonly contentType: string }[]
          readonly json: readonly { readonly contentType: string }[]
        }
      | undefined
  },
) {
  const allParams = [
    ...deps.toParameterLikes(item.parameters),
    ...deps.toParameterLikes(operation.parameters),
  ]
  const hasParams =
    allParams.filter((p) => p.in === 'path').length > 0 ||
    allParams.filter((p) => p.in === 'query').length > 0 ||
    allParams.filter((p) => p.in === 'header').length > 0 ||
    allParams.filter((p) => p.in === 'cookie').length > 0
  const allBodyInfo = deps.pickAllBodyInfo(operation)
  const hasBody =
    allBodyInfo !== undefined && (allBodyInfo.form.length > 0 || allBodyInfo.json.length > 0)
  return hasParams || hasBody
}
