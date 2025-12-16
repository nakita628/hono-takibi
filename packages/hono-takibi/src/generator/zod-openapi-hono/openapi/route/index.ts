import type { OpenAPI, Operation, Parameters } from '../../../../openapi/index.js'
import { route } from './route.js'

type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head' | 'trace'

const METHODS: readonly HttpMethod[] = [
  'get',
  'put',
  'post',
  'delete',
  'patch',
  'options',
  'head',
  'trace',
] as const

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null

const isComponentsParameterRef = (ref: string): ref is `#/components/parameters/${string}` =>
  ref.startsWith('#/components/parameters/')

const resolveParamRef = (
  p: { $ref: string },
  componentsParameters: Record<string, Parameters> | undefined,
): Parameters | undefined => {
  if (!componentsParameters) return undefined
  if (!isComponentsParameterRef(p.$ref)) return undefined
  const key = p.$ref.split('/').pop()
  if (!key) return undefined
  const param = componentsParameters[key]
  if (!param) return undefined
  return { ...param, $ref: p.$ref }
}

export function routeCode(
  openapi: OpenAPI,
  options?: { readonly useComponentRefs?: boolean },
): string {
  const routes: string[] = []

  const parametersMap = openapi.components?.parameters
  const openAPIPaths = openapi.paths
  const components = openapi.components

  const isOp = (v: unknown): v is Operation => isRecord(v) && 'responses' in v
  const isParam = (p: unknown): p is Parameters => isRecord(p) && 'name' in p && 'in' in p
  const isParamRef = (p: unknown): p is { $ref: string } =>
    isRecord(p) && typeof p.$ref === 'string'

  for (const path in openAPIPaths) {
    const pathItem = openAPIPaths[path]
    if (!pathItem) continue

    for (const method of METHODS) {
      const maybeOp = pathItem[method]
      if (!isOp(maybeOp)) continue
      const mergedParams: Parameters[] | undefined = (() => {
        const out: Parameters[] = []
        const push = (p: unknown) => {
          if (isParam(p)) return void out.push(p)
          if (isParamRef(p)) {
            const resolved = resolveParamRef(p, parametersMap)
            if (resolved) out.push(resolved)
          }
        }
        if (Array.isArray(pathItem.parameters)) {
          for (const p of pathItem.parameters) push(p)
        }
        if (Array.isArray(maybeOp.parameters)) {
          for (const p of maybeOp.parameters) push(p)
        }
        return out.length ? out : undefined
      })()
      const op: Operation = (() => {
        if (mergedParams) return { ...maybeOp, parameters: mergedParams }
        return maybeOp
      })()
      routes.push(route(path, method, op, components, options))
    }
  }
  return routes.filter(Boolean).join('\n\n')
}
