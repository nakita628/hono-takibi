import type { OpenAPIPaths, Operation, Parameters } from '../../../../openapi/index.js'
import { route } from './route.js'

type HttpMethod = Readonly<
  'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head' | 'trace'
>
const METHODS: ReadonlyArray<HttpMethod> = [
  'get',
  'put',
  'post',
  'delete',
  'patch',
  'options',
  'head',
  'trace',
]

export function routeCode(openAPIPaths: OpenAPIPaths): string {
  const routes: string[] = []

  const isOp = (v: unknown): v is Operation =>
    typeof v === 'object' && v !== null && 'responses' in v
  const isParam = (p: unknown): p is Parameters =>
    typeof p === 'object' && p !== null && 'name' in p && 'in' in p

  for (const path in openAPIPaths) {
    const pathItem = openAPIPaths[path]
    if (!pathItem) continue

    for (const method of METHODS) {
      const maybeOp = pathItem[method]
      if (!isOp(maybeOp)) continue
      const mergedParams: Parameters[] | undefined = (() => {
        const out: Parameters[] = []
        if (Array.isArray(pathItem.parameters)) {
          for (const p of pathItem.parameters) if (isParam(p)) out.push(p)
        }
        if (Array.isArray(maybeOp.parameters)) {
          for (const p of maybeOp.parameters) if (isParam(p)) out.push(p)
        }
        return out.length ? out : undefined
      })()
      const op: Operation = (() => {
        if (mergedParams) return { ...maybeOp, parameters: mergedParams }
        return maybeOp
      })()
      routes.push(route(path, method, op))
    }
  }
  return routes.filter(Boolean).join('\n\n')
}
