import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeImports } from '../../helper/index.js'
import { makeCallbacks, makeOperationResponses, makeRequest } from '../../helper/openapi.js'
import type { OpenAPI, Operation, Parameter } from '../../openapi/index.js'
import { makeBarrel, toIdentifierPascalCase } from '../../utils/index.js'

export async function webhooks(
  openAPI: OpenAPI,
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
  if (!webhooks?.output) return { ok: false, error: 'webhooks.output is required' } as const
  if (!openAPI.webhooks) return { ok: false, error: 'No webhooks found' } as const
  const { output, split = false } = webhooks
  const webhookEntries = (
    openapi: OpenAPI,
    readonly?: boolean,
  ): readonly { readonly name: string; readonly code: string }[] => {
    const baseName = (name: string, method: string) => {
      const pascalName = toIdentifierPascalCase(name)
      const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
      return `${camelName}${method.charAt(0).toUpperCase()}${method.slice(1)}`
    }
    const makeEntry = (name: string, method: string, operation: Operation, readonly?: boolean) => {
      const properties = [
        `method:${JSON.stringify(method)}`,
        `path:${JSON.stringify(`/${name}`)}`,
        operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
        operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
        operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
        operation.externalDocs
          ? `externalDocs:${JSON.stringify(operation.externalDocs)}`
          : undefined,
        operation.operationId ? `operationId:${JSON.stringify(operation.operationId)}` : undefined,
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
      const entryName = baseName(name, method)
      return {
        name: entryName,
        code: `export const ${entryName}Webhook={${properties}}${asConst}`,
      }
    }
    if (!openapi.webhooks) return []
    const isParameterRef = (ref: string): ref is `#/components/parameters/${string}` =>
      ref.startsWith('#/components/parameters/')
    const resolve = (parameter: Parameter | { readonly $ref?: string }): Parameter | undefined => {
      if ('name' in parameter && 'in' in parameter) return parameter
      const ref = '$ref' in parameter ? parameter.$ref : undefined
      if (!(ref && isParameterRef(ref))) return undefined
      const resolved = openapi.components?.parameters?.[ref.slice(ref.lastIndexOf('/') + 1)]
      if (!resolved) return undefined
      return { ...resolved, $ref: ref }
    }
    return Object.entries(openapi.webhooks).flatMap(([name, pathItem]) =>
      pathItem
        ? (['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'] as const)
            .filter((m) => pathItem[m]?.responses)
            .flatMap((method) => {
              const operation = pathItem[method]
              if (!operation) return []
              const sourceParams = [...(pathItem.parameters ?? []), ...(operation.parameters ?? [])]
              const params = sourceParams.map(resolve).filter((p) => p !== undefined)
              const effectiveOperation =
                sourceParams.length > 0 ? { ...operation, parameters: params } : operation
              return [makeEntry(name, method, effectiveOperation, readonly)]
            })
        : [],
    )
  }
  const entries = webhookEntries(openAPI, readonly)
  if (entries.length === 0) return { ok: true, value: 'No webhooks found' } as const
  if (!split) {
    const code = makeImports(entries.map((e) => e.code).join('\n\n'), output, components)
    const result = await emit(code, path.dirname(output), output)
    if (!result.ok) return result
    return { ok: true, value: `Generated webhooks code written to ${output}` } as const
  }
  const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
  const results = await Promise.all([
    ...entries.map(async ({ name, code }) => {
      const filePath = `${outDir}/${name}.ts`
      const withImports = makeImports(code, filePath, components)
      const result = await emit(withImports, path.dirname(filePath), filePath)
      return result.ok ? { ok: true as const, value: filePath } : result
    }),
    emit(
      makeBarrel(Object.fromEntries(entries.map((e) => [e.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])
  const failed = results.find((result) => !result.ok)
  if (failed) return failed
  return {
    ok: true,
    value: `Generated webhooks code written to ${outDir}/*.ts (index.ts included)`,
  } as const
}
