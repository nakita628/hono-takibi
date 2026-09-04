import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { isParameterRef } from '../../guard/index.js'
import { makeImports } from '../../helper/index.js'
import { makeCallbacks, makeOperationResponses, makeRequest } from '../../helper/openapi.js'
import type { OpenAPI, Operation, Parameter } from '../../openapi/index.js'
import { makeBarrel, toIdentifierPascalCase } from '../../utils/index.js'

export function webhooks(
  openAPI: OpenAPI,
  // oxlint-disable-next-line no-shadow -- the parameter is the section this function emits
  webhooks?: {
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
    if (!webhooks?.output) {
      return yield* new GenerateError({ message: 'webhooks.output is required' })
    }
    if (!openAPI.webhooks) return yield* new GenerateError({ message: 'No webhooks found' })
    const { output, split = false } = webhooks
    const webhookEntries = (): readonly { readonly name: string; readonly code: string }[] => {
      const makeEntry = (name: string, method: string, operation: Operation) => {
        const properties = [
          `method:${JSON.stringify(method)}`,
          `path:${JSON.stringify(`/${name}`)}`,
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
        const pascalName = toIdentifierPascalCase(name)
        const entryName = `${pascalName.charAt(0).toLowerCase() + pascalName.slice(1)}${method.charAt(0).toUpperCase()}${method.slice(1)}`
        return {
          name: entryName,
          code: `export const ${entryName}Webhook={${properties}}${asConst}`,
        }
      }
      if (!openAPI.webhooks) return []
      const resolve = (
        parameter: Parameter | { readonly $ref?: string },
      ): Parameter | undefined => {
        if ('name' in parameter && 'in' in parameter) return parameter
        const ref = '$ref' in parameter ? parameter.$ref : undefined
        if (!(ref && isParameterRef(ref))) return undefined
        const resolved = openAPI.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
        if (!resolved) return undefined
        return { ...resolved, $ref: ref }
      }
      return Object.entries(openAPI.webhooks).flatMap(([name, pathItem]) =>
        pathItem
          ? (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const)
              .filter((m) => pathItem[m]?.responses)
              .flatMap((method) => {
                const operation = pathItem[method]
                if (!operation) return []
                const sourceParams = [
                  ...(pathItem.parameters ?? []),
                  ...(operation.parameters ?? []),
                ]
                const params = sourceParams.map(resolve).filter((p) => p !== undefined)
                const effectiveOperation =
                  sourceParams.length > 0 ? { ...operation, parameters: params } : operation
                return [makeEntry(name, method, effectiveOperation)]
              })
          : [],
      )
    }
    const entries = webhookEntries()
    if (entries.length === 0) return 'No webhooks found'
    if (!split) {
      const code = makeImports(entries.map((entry) => entry.code).join('\n\n'), output, components)
      yield* emit(code, path.dirname(output), output)
      return `Generated webhooks code written to ${output}`
    }
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    yield* Effect.all(
      [
        ...entries.map(({ name, code }) => {
          const filePath = `${outDir}/${name}.ts`
          return emit(makeImports(code, filePath, components), path.dirname(filePath), filePath)
        }),
        emit(
          makeBarrel(Object.fromEntries(entries.map((entry) => [entry.name, null]))),
          outDir,
          `${outDir}/index.ts`,
        ),
      ],
      { concurrency: 'unbounded' },
    )
    return `Generated webhooks code written to ${outDir}/*.ts (index.ts included)`
  })
}
