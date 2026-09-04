import { basename, dirname, join } from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isParameterRef, isPathItemEntry, isPathItemRef } from '../../guard/index.js'
import { makeImports } from '../../helper/index.js'
import { makeCallbacks, makeOperationResponses, makeRequest } from '../../helper/openapi.js'
import type { OpenAPI, Operation, Parameter, PathItem } from '../../openapi/index.js'
import { makeBarrel, methodPath } from '../../utils/index.js'

export function route(
  openAPI: OpenAPI,
  routes?: {
    readonly output: string
    readonly split?: boolean
  },
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  return Effect.gen(function* () {
    if (!routes?.output) return yield* new GenerateError({ message: 'routes.output is required' })
    const { output, split = false } = routes
    const routeEntries = (): readonly { readonly name: string; readonly code: string }[] => {
      const makeEntry = (path: string, method: string, operation: Operation) => {
        const properties = [
          `method:${JSON.stringify(method)}`,
          `path:${JSON.stringify(path)}`,
          operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
          operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
          operation.description
            ? `description:${JSON.stringify(operation.description)}`
            : undefined,
          operation.externalDocs
            ? `externalDocs:${JSON.stringify(operation.externalDocs)}`
            : undefined,
          operation.operationId
            ? `operationId:${JSON.stringify(operation.operationId)}`
            : undefined,
          makeRequest(operation.parameters, operation.requestBody, readonly)
            ? `request:${makeRequest(operation.parameters, operation.requestBody, readonly)}`
            : undefined,
          operation.responses
            ? `responses:${makeOperationResponses(operation.responses, readonly)}`
            : undefined,
          operation.callbacks
            ? `callbacks:{${makeCallbacks(operation.callbacks, readonly)}}`
            : undefined,
          operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
          operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
          operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
        ]
          .filter((v) => v !== undefined)
          .join(',')
        const asConst = readonly ? ' as const' : ''
        const entryName = methodPath(method, path)
        return {
          name: entryName,
          code: `export const ${entryName}Route=createRoute({${properties}}${asConst})`,
        }
      }
      const resolveParameter = (parameter: Parameter | { readonly $ref?: string }) => {
        if ('name' in parameter && 'in' in parameter) return parameter
        const ref = '$ref' in parameter ? parameter.$ref : undefined
        if (!ref || !isParameterRef(ref)) return undefined
        const resolved = openAPI.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
        if (!resolved) return undefined
        return { ...resolved, $ref: ref } as const
      }
      const resolvePathItem = (pathItem: PathItem): PathItem => {
        if (pathItem.$ref && isPathItemRef(pathItem.$ref)) {
          const name = pathItem.$ref.slice(pathItem.$ref.lastIndexOf('/') + 1)
          const resolved = openAPI.components?.pathItems?.[name]
          if (resolved) {
            const { $ref: _, ...siblings } = pathItem
            return { ...resolved, ...siblings } as const
          }
        }
        return pathItem
      }
      return Object.entries(openAPI.paths).flatMap(([path, pathItem]) => {
        if (!isPathItemEntry(pathItem)) return [] as const
        const resolved = resolvePathItem(pathItem)
        return (
          ['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const
        ).flatMap((method) => {
          const operation = resolved[method]
          if (!operation?.responses) return []
          const parameters = [
            ...(resolved.parameters ?? ([] as const)),
            ...(operation.parameters ?? ([] as const)),
          ]
            .map(resolveParameter)
            .filter((p) => p !== undefined)
          return [
            makeEntry(
              path,
              method,
              parameters.length > 0 ? { ...operation, parameters } : operation,
            ),
          ]
        })
      })
    }
    const entries = routeEntries()
    if (!split || entries.length === 0) {
      const code = makeImports(entries.map((e) => e.code).join('\n\n'), output, components)
      yield* emit(code, dirname(output), output)
      return `Generated route code written to ${output}`
    }
    const outDir = join(dirname(output), basename(output, '.ts'))
    yield* Effect.all(
      [
        ...entries.map(({ name, code }) => {
          const filePath = `${outDir}/${name}.ts`
          return emit(makeImports(code, filePath, components), dirname(filePath), filePath)
        }),
        emit(
          makeBarrel(Object.fromEntries(entries.map((e) => [e.name, null]))),
          outDir,
          `${outDir}/index.ts`,
        ),
      ],
      { concurrency: 'unbounded' },
    )
    return `Generated route code written to ${outDir}/*.ts (index.ts included)`
  })
}
