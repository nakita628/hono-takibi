import type {
  Callbacks,
  Components,
  Operation,
  Parameter,
  PathItem,
  RequestBody,
} from '../../../../openapi/index.js'
import { refSchema } from '../../../../utils/index.js'
import { zodToOpenAPI } from '../../../zod-to-openapi/index.js'

export function callbacks(components: Components, exportCallbacks: boolean): string {
  const { callbacks } = components
  if (!callbacks) return ''

  const isComponentsRef = (ref: unknown): ref is `#/components/${string}/${string}` =>
    typeof ref === 'string' && ref.startsWith('#/components/')

  const isCallbacks = (v: unknown): v is Callbacks =>
    typeof v === 'object' && v !== null && !('$ref' in v)

  const isPathItem = (v: unknown): v is PathItem =>
    typeof v === 'object' && v !== null

  const isOperation = (v: unknown): v is Operation =>
    typeof v === 'object' && v !== null && 'responses' in v

  const isParameter = (v: unknown): v is Parameter =>
    typeof v === 'object' && v !== null && 'name' in v && 'in' in v && 'schema' in v

  const httpMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const

  const buildParametersCode = (
    parameters: readonly Parameter[] | undefined,
  ): string | undefined => {
    if (!parameters || parameters.length === 0) return undefined

    const params = parameters
      .filter(isParameter)
      .map((param) =>
        param.$ref
          ? refSchema(param.$ref)
          : zodToOpenAPI(param.schema, { parameters: { ...param } }),
      )
      .filter(Boolean)

    return params.length > 0 ? `[${params.join(',')}]` : undefined
  }

  const buildRequestBodyCode = (requestBody: RequestBody): string | undefined => {
    if (!requestBody.content) return undefined

    const contentEntries = Object.entries(requestBody.content)
      .map(([mediaType, mediaOrReference]) => {
        if ('$ref' in mediaOrReference && isComponentsRef(mediaOrReference.$ref)) {
          return `${JSON.stringify(mediaType)}:{schema:${refSchema(mediaOrReference.$ref)}}`
        }
        if ('schema' in mediaOrReference) {
          return `${JSON.stringify(mediaType)}:{schema:${zodToOpenAPI(mediaOrReference.schema)}}`
        }
        return undefined
      })
      .filter(Boolean)
      .join(',')

    if (!contentEntries) return undefined

    const props = [
      `content:{${contentEntries}}`,
      requestBody.required !== undefined ? `required:${JSON.stringify(requestBody.required)}` : undefined,
      requestBody.description ? `description:${JSON.stringify(requestBody.description)}` : undefined,
    ]
      .filter(Boolean)
      .join(',')

    return `{${props}}`
  }

  const buildResponsesCode = (responses: Operation['responses']): string => {
    const entries = Object.entries(responses)
      .map(([statusCode, response]) => {
        if (response.$ref && isComponentsRef(response.$ref)) {
          return `${JSON.stringify(statusCode)}:${refSchema(response.$ref)}`
        }
        return `${JSON.stringify(statusCode)}:${JSON.stringify(response)}`
      })
      .join(',')

    return `{${entries}}`
  }

  const buildOperationCallbacksCode = (
    operationCallbacks: Operation['callbacks'],
  ): string | undefined => {
    if (!operationCallbacks) return undefined

    const entries = Object.entries(operationCallbacks)
      .map(([callbackName, callbackRef]) => {
        if (callbackRef.$ref && isComponentsRef(callbackRef.$ref)) {
          return `${JSON.stringify(callbackName)}:${refSchema(callbackRef.$ref)}`
        }
        const props = [
          callbackRef.summary ? `summary:${JSON.stringify(callbackRef.summary)}` : undefined,
          callbackRef.description ? `description:${JSON.stringify(callbackRef.description)}` : undefined,
        ]
          .filter(Boolean)
          .join(',')
        return props ? `${JSON.stringify(callbackName)}:{${props}}` : undefined
      })
      .filter(Boolean)
      .join(',')

    return entries ? `{${entries}}` : undefined
  }

  const buildOperationCode = (method: string, operation: Operation): string => {
    const parametersCode = buildParametersCode(operation.parameters)
    const requestBodyCode = operation.requestBody ? buildRequestBodyCode(operation.requestBody) : undefined
    const callbacksCode = buildOperationCallbacksCode(operation.callbacks)

    const props = [
      operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
      operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
      operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
      operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
      operation.operationId ? `operationId:${JSON.stringify(operation.operationId)}` : undefined,
      parametersCode ? `parameters:${parametersCode}` : undefined,
      requestBodyCode ? `requestBody:${requestBodyCode}` : undefined,
      operation.responses ? `responses:${buildResponsesCode(operation.responses)}` : undefined,
      callbacksCode ? `callbacks:${callbacksCode}` : undefined,
      operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
      operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
      operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
    ]
      .filter(Boolean)
      .join(',')

    return `${method}:{${props}}`
  }

  const buildPathItemCode = (pathItem: PathItem): string =>
    httpMethods
      .map((method) => {
        const operation = pathItem[method]
        if (!(operation && isOperation(operation))) return undefined
        return buildOperationCode(method, operation)
      })
      .filter(Boolean)
      .join(',')

  const buildCallbackCode = (callback: Callbacks): string =>
    Object.entries(callback)
      .map(([callbackKey, pathItem]) => {
        if (!isPathItem(pathItem)) return undefined
        const pathItemCode = buildPathItemCode(pathItem)
        return pathItemCode ? `${JSON.stringify(callbackKey)}:{${pathItemCode}}` : undefined
      })
      .filter(Boolean)
      .join(',')

  const exportKeyword = exportCallbacks ? 'export ' : ''

  return Object.entries(callbacks)
    .map(([callbackName, callbackOrRef]) => {
      if (!isCallbacks(callbackOrRef)) return undefined
      const callbackCode = buildCallbackCode(callbackOrRef)
      return callbackCode
        ? `${exportKeyword}const ${callbackName}Callbacks={${callbackCode}}`
        : undefined
    })
    .filter(Boolean)
    .join('\n\n')
}