import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { isOperation, isParameter, isRecord, isRefObject } from '../guard/index.js'
import type {
  Callbacks,
  Content,
  Encoding,
  Header,
  Link,
  Media,
  Operation,
  Parameter,
  PathItem,
  Reference,
  RequestBody,
  Responses,
  Schema,
} from '../openapi/index.js'
import {
  ensureSuffix,
  makeSafeKey,
  requestParamsArray,
  toIdentifierPascalCase,
} from '../utils/index.js'
import { coerce } from './../helper/index.js'

export function makeRef($ref: string) {
  const COMPONENT_SUFFIX_MAP: ReadonlyArray<{
    readonly prefix: string
    readonly suffix: string
  }> = [
    { prefix: '#/components/schemas/', suffix: 'Schema' },
    { prefix: '#/components/parameters/', suffix: 'ParamsSchema' },
    { prefix: '#/components/headers/', suffix: 'HeaderSchema' },
    { prefix: '#/components/securitySchemes/', suffix: 'SecurityScheme' },
    { prefix: '#/components/requestBodies/', suffix: 'RequestBody' },
    { prefix: '#/components/responses/', suffix: 'Response' },
    { prefix: '#/components/examples/', suffix: 'Example' },
    { prefix: '#/components/links/', suffix: 'Link' },
    { prefix: '#/components/callbacks/', suffix: 'Callback' },
    { prefix: '#/components/pathItems/', suffix: 'PathItem' },
    { prefix: '#/components/mediaTypes/', suffix: 'MediaTypeSchema' },
  ]
  const toVariableName = (name: string, suffix: string) =>
    toIdentifierPascalCase(ensureSuffix(name, suffix))
  const propertiesMatch = $ref.match(/^#\/components\/schemas\/([^/]+)\/properties\/(.+)$/)
  if (propertiesMatch) {
    const parentSchema = toVariableName(decodeURIComponent(propertiesMatch[1]), 'Schema')
    return `z.lazy(()=>${parentSchema})`
  }
  const rawRef = $ref.split('/').at(-1)
  if (!rawRef) return 'Schema'
  const decodedRef = decodeURIComponent(rawRef)
  const match = COMPONENT_SUFFIX_MAP.find(({ prefix }) => $ref.startsWith(prefix))
  return toVariableName(decodedRef, match?.suffix ?? 'Schema')
}

export function makeExamples(examples: {
  readonly [k: string]:
    | {
        readonly summary?: string
        readonly description?: string
        readonly defaultValue?: unknown
        readonly serializedValue?: string
        readonly externalValue?: string
        readonly value?: unknown
      }
    | {
        readonly $ref?:
          | `#/components/schemas/${string}`
          | `#/components/parameters/${string}`
          | `#/components/securitySchemes/${string}`
          | `#/components/requestBodies/${string}`
          | `#/components/responses/${string}`
          | `#/components/headers/${string}`
          | `#/components/examples/${string}`
          | `#/components/links/${string}`
          | `#/components/callbacks/${string}`
          | `#/components/pathItems/${string}`
          | `#/components/mediaTypes/${string}`
        readonly summary?: string
        readonly description?: string
      }
}) {
  const result = Object.entries(examples)
    .map(([k, example]) => {
      if ('$ref' in example && example.$ref) {
        return `${JSON.stringify(k)}:${makeRef(example.$ref)}`
      }
      const result = [
        example.summary !== undefined ? `summary:${JSON.stringify(example.summary)}` : undefined,
        example.description !== undefined
          ? `description:${JSON.stringify(example.description)}`
          : undefined,
        'defaultValue' in example && example.defaultValue !== undefined
          ? `defaultValue:${JSON.stringify(example.defaultValue)}`
          : undefined,
        'serializedValue' in example && example.serializedValue !== undefined
          ? `serializedValue:${JSON.stringify(example.serializedValue)}`
          : undefined,
        'externalValue' in example && example.externalValue !== undefined
          ? `externalValue:${JSON.stringify(example.externalValue)}`
          : undefined,
        'value' in example && example.value !== undefined
          ? `value:${JSON.stringify(example.value)}`
          : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')
      return `${JSON.stringify(k)}:{${result}}`
    })
    .join(',')
  return `{${result}}`
}

export function makeOperationResponses(
  responses: Operation['responses'] | { readonly [k: string]: unknown },
  readonly?: boolean,
) {
  const isResponse = (v: unknown): v is Responses =>
    typeof v === 'object' && v !== null && !Array.isArray(v)
  const result = Object.entries(responses)
    .map(([statusCode, res]) => {
      if (!isResponse(res)) return undefined
      return `${/^\d+$/.test(statusCode) ? statusCode : `'${statusCode}'`}:${makeResponses(res, readonly)}`
    })
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeHeaderResponses(
  headers: { readonly [k: string]: Header | Reference },
  readonly?: boolean,
) {
  const result = Object.entries(headers)
    .map(([k, header]) => `${JSON.stringify(k)}:${makeHeadersAndReferences(header, readonly)}`)
    .join(',')
  return `z.object({${result}})`
}

export function makeResponses(responses: Responses, readonly?: boolean) {
  if (responses.$ref) {
    return makeRef(responses.$ref)
  }
  const result = [
    responses.summary ? `summary:${JSON.stringify(responses.summary)}` : undefined,
    // Always include description: ResponseConfig requires it (OpenAPI 3.0 §Response Object REQUIRED field)
    `description:${JSON.stringify(responses.description || '')}`,
    responses.headers ? `headers:${makeHeaderResponses(responses.headers, readonly)}` : undefined,
    responses.content
      ? `content:{${makeContent(responses.content, readonly).join(',')}}`
      : undefined,
    responses.links
      ? `links:{${Object.entries(responses.links)
          .map(([key, link]) =>
            '$ref' in link && link.$ref
              ? `${JSON.stringify(key)}:${makeRef(link.$ref)}`
              : `${JSON.stringify(key)}:${makeLinkOrReference(link)}`,
          )
          .join(',')}}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeHeadersAndReferences(headers: Header | Reference, readonly?: boolean) {
  if ('$ref' in headers && headers.$ref) {
    return makeRef(headers.$ref)
  }
  const result = [
    headers.description ? `description:${JSON.stringify(headers.description)}` : undefined,
    'required' in headers && headers.required
      ? `required:${JSON.stringify(headers.required)}`
      : undefined,
    'deprecated' in headers && headers.deprecated
      ? `deprecated:${JSON.stringify(headers.deprecated)}`
      : undefined,
    'example' in headers && headers.example
      ? `example:${JSON.stringify(headers.example)}`
      : undefined,
    'examples' in headers && headers.examples
      ? `examples:${makeExamples(headers.examples)}`
      : undefined,
    'style' in headers && headers.style ? `style:${JSON.stringify(headers.style)}` : undefined,
    'explode' in headers && headers.explode
      ? `explode:${JSON.stringify(headers.explode)}`
      : undefined,
    'schema' in headers && headers.schema
      ? `schema:${zodToOpenAPI(headers.schema, { headers: headers }, readonly)}`
      : undefined,
    'content' in headers && headers.content
      ? `content:${makeContent(headers.content, readonly).join(',')}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeLinkOrReference(linkOrReference: Link | Reference) {
  const result = [
    'operationRef' in linkOrReference
      ? `operationRef:${JSON.stringify(linkOrReference.operationRef)}`
      : undefined,
    'operationId' in linkOrReference
      ? `operationId:${JSON.stringify(linkOrReference.operationId)}`
      : undefined,
    'parameters' in linkOrReference
      ? `parameters:${JSON.stringify(linkOrReference.parameters)}`
      : undefined,
    'requestBody' in linkOrReference
      ? `requestBody:${JSON.stringify(linkOrReference.requestBody)}`
      : undefined,
    'description' in linkOrReference
      ? `description:${JSON.stringify(linkOrReference.description)}`
      : undefined,
    'server' in linkOrReference ? `server:${JSON.stringify(linkOrReference.server)}` : undefined,
    '$ref' in linkOrReference && linkOrReference.$ref
      ? `$ref:${makeRef(linkOrReference.$ref)}`
      : undefined,
    'summary' in linkOrReference ? `summary:${JSON.stringify(linkOrReference.summary)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeOperationCallbacks(
  callbacks: Operation['callbacks'] | { readonly [k: string]: unknown } | undefined,
) {
  if (!callbacks) return undefined
  const result = Object.entries(callbacks)
    .map(([callbackName, callbackRef]) => {
      if (!isRecord(callbackRef)) return undefined
      if (isRefObject(callbackRef)) {
        return `${JSON.stringify(callbackName)}:${makeRef(callbackRef.$ref)}`
      }
      const summary = callbackRef.summary
      const description = callbackRef.description
      const result = [
        typeof summary === 'string' ? `summary:${JSON.stringify(summary)}` : undefined,
        typeof description === 'string' ? `description:${JSON.stringify(description)}` : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')
      return `${JSON.stringify(callbackName)}:{${result}}`
    })
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeCallback(callback: Callbacks): string {
  return Object.entries(callback)
    .map(([callbackKey, pathItem]) => {
      if (isRefObject(pathItem)) {
        return `${JSON.stringify(callbackKey)}:${makeRef(pathItem.$ref)}`
      }
      const pathItemCode = makePathItem(pathItem)
      return `${JSON.stringify(callbackKey)}:${pathItemCode}`
    })
    .filter((v) => v !== undefined)
    .join(',')
}

export function makeCallbacks(
  callbacks:
    | Callbacks
    | {
        readonly [k: string]: {
          readonly $ref?: string
          readonly summary?: string
          readonly description?: string
        }
      },
  readonly?: boolean,
): string {
  const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const
  const makeMethodsCode = (record: { readonly [k: string]: unknown }): string =>
    methods
      .map((method) => {
        const operation = record[method]
        if (!isOperation(operation)) return undefined
        const result = makeOperation(operation, readonly)
        return `${method}:${result}`
      })
      .filter((v) => v !== undefined)
      .join(',')
  return Object.entries(callbacks)
    .map(([callbackKey, pathItem]) => {
      // Handle $ref to components/callbacks
      if (isRefObject(pathItem)) {
        return `${JSON.stringify(callbackKey)}:${makeRef(pathItem.$ref)}`
      }
      if (!isRecord(pathItem)) return undefined
      // Try direct pathItem (pathExpression → {method: operation})
      const pathItemCode = makeMethodsCode(pathItem)
      if (pathItemCode) {
        return `${JSON.stringify(callbackKey)}:{${pathItemCode}}`
      }
      // Fallback: callbackName → pathExpression → {method: operation}
      const nestedCode = Object.entries(pathItem)
        .map(([pathExpr, inner]) => {
          if (!isRecord(inner)) return undefined
          const code = makeMethodsCode(inner)
          return code ? `${JSON.stringify(pathExpr)}:{${code}}` : undefined
        })
        .filter((v) => v !== undefined)
        .join(',')
      return nestedCode ? `${JSON.stringify(callbackKey)}:{${nestedCode}}` : undefined
    })
    .filter((v) => v !== undefined)
    .join(',')
}

export function makeContent(
  content: Content | { readonly [k: string]: Media | Reference },
  readonly?: boolean,
) {
  const isMedia = (v: unknown): v is Media => isRecord(v) && 'schema' in v
  return Object.freeze(
    Object.entries(content)
      .map(([contentType, mediaOrRef]) => {
        if (isRefObject(mediaOrRef)) {
          return `'${contentType}':${makeRef(mediaOrRef.$ref)}`
        }
        if (isMedia(mediaOrRef)) {
          return `'${contentType}':${makeMedia(mediaOrRef, readonly)}`
        }
        return undefined
      })
      .filter((v) => v !== undefined),
  )
}

export function makeRequestBody(body: RequestBody | Reference, readonly?: boolean) {
  if ('$ref' in body && body.$ref) {
    return makeRef(body.$ref)
  }
  const result = [
    body.description ? `description:${JSON.stringify(body.description)}` : undefined,
    'content' in body && body.content
      ? `content:{${makeContent(body.content, readonly).join(',')}}`
      : undefined,
    'required' in body && body.required ? `required:${JSON.stringify(body.required)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeMedia(media: Media, readonly?: boolean) {
  const encodingCode = media.encoding
    ? Object.entries(media.encoding)
        .map(([name, encoding]) => `${JSON.stringify(name)}:{${makeEncoding(encoding, readonly)}}`)
        .join(',')
    : undefined
  const result = [
    media.schema ? `schema:${zodToOpenAPI(media.schema, undefined, readonly)}` : undefined,
    media.itemSchema
      ? `itemSchema:${zodToOpenAPI(media.itemSchema, undefined, readonly)}`
      : undefined,
    media.example !== undefined ? `example:${JSON.stringify(media.example)}` : undefined,
    media.examples ? `examples:${makeExamples(media.examples)}` : undefined,
    encodingCode ? `encoding:{${encodingCode}}` : undefined,
    media.prefixEncoding
      ? `prefixEncoding:{${makeEncoding(media.prefixEncoding, readonly)}}`
      : undefined,
    media.itemEncoding ? `itemEncoding:{${makeEncoding(media.itemEncoding, readonly)}}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makeEncoding(encoding: Encoding, readonly?: boolean): string {
  const nestedEncoding = encoding.encoding
    ? Object.entries(encoding.encoding)
        .map(([name, encoding]) => `${JSON.stringify(name)}:{${makeEncoding(encoding, readonly)}}`)
        .join(',')
    : undefined
  const headersCode = encoding.headers
    ? Object.entries(encoding.headers)
        .map(
          ([name, header]) =>
            `${JSON.stringify(name)}:${makeHeadersAndReferences(header, readonly)}`,
        )
        .join(',')
    : undefined
  return [
    encoding.contentType ? `contentType:${JSON.stringify(encoding.contentType)}` : undefined,
    headersCode ? `headers:{${headersCode}}` : undefined,
    nestedEncoding ? `encoding:{${nestedEncoding}}` : undefined,
    encoding.prefixEncoding
      ? `prefixEncoding:{${makeEncoding(encoding.prefixEncoding, readonly)}}`
      : undefined,
    encoding.itemEncoding
      ? `itemEncoding:{${makeEncoding(encoding.itemEncoding, readonly)}}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
}

export function makeRequest(
  parameters: readonly Parameter[] | undefined,
  requestBody: RequestBody | Reference | undefined,
  readonly?: boolean,
) {
  const result = [
    parameters && parameters.length > 0 ? makeRequestParams(parameters, readonly) : undefined,
    (requestBody && '$ref' in requestBody && requestBody.$ref) ||
    (requestBody && 'content' in requestBody && requestBody.content)
      ? `body:${makeRequestBody(requestBody, readonly)}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return result.length > 0 ? `{${result}}` : undefined
}

function getSchemaFromContent(content: Content | undefined): Schema | undefined {
  if (!content) return undefined
  const firstKey = Object.keys(content)[0]
  if (!firstKey) return undefined
  return content[firstKey]?.schema
}

export function makeParameters(
  parameters: readonly Parameter[],
  readonly?: boolean,
): {
  readonly [section: string]: { readonly [k: string]: string }
} {
  return parameters.reduce((acc: { [section: string]: { [k: string]: string } }, param) => {
    if (!acc[param.in]) acc[param.in] = {}
    if (param.$ref) {
      acc[param.in][makeSafeKey(param.name)] = makeRef(param.$ref)
      return acc
    }
    const schema = param.schema ?? getSchemaFromContent(param.content)
    if (!schema) {
      acc[param.in][makeSafeKey(param.name)] = 'z.any()'
      return acc
    }
    const baseSchema = zodToOpenAPI(schema, { parameters: param }, readonly)
    const z =
      param.in === 'query' && (schema.type === 'number' || schema.type === 'integer')
        ? coerce(baseSchema, schema.type, schema.format)
        : param.in === 'query' && schema.type === 'boolean'
          ? baseSchema
              .replace('boolean', 'stringbool')
              .replace(/\.default\("true"\)/g, '.default(true)')
              .replace(/\.default\("false"\)/g, '.default(false)')
          : param.in === 'query' && schema.type === 'date'
            ? `z.coerce.${baseSchema.replace('z.', '')}`
            : param.in === 'query' && (schema.type === 'object' || schema.type === 'array')
              ? baseSchema
                  .replace(
                    /z\.(int\d*)\(\)((?:\.(?:min|max|gt|lt|positive|negative|nonnegative|nonpositive|multipleOf)\([^)]*\))*)/g,
                    (_: string, type: string, constraints: string) =>
                      `z.coerce.number().pipe(z.${type}()${constraints})`,
                  )
                  .replace(/z\.bigint\(\)/g, 'z.coerce.bigint()')
                  .replace(/z\.number\(\)/g, 'z.coerce.number()')
                  .replace(/z\.boolean\(\)/g, 'z.stringbool()')
                  .replace(/z\.date\(\)/g, 'z.coerce.date()')
              : baseSchema
    acc[param.in][makeSafeKey(param.name)] = z
    return acc
  }, {})
}

export function makeRequestParams(parameters: readonly Parameter[], readonly?: boolean) {
  const paramsObject = makeParameters(parameters, readonly)
  const paramsArray = requestParamsArray(paramsObject)
  return paramsArray.length > 0 ? paramsArray.join(',') : undefined
}

export function makePathParameters(parameters: readonly (Parameter | Reference)[]) {
  const serializeValue = (value: unknown): string => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    if (typeof value === 'string') return JSON.stringify(value)
    if (typeof value === 'number' || typeof value === 'boolean') return String(value)
    if (Array.isArray(value)) return `[${value.map(serializeValue).join(',')}]`
    if (isRefObject(value)) return makeRef(value.$ref)
    if (isRecord(value)) {
      const entries = Object.entries(value)
        .map(([k, v]) => `${JSON.stringify(k)}:${serializeValue(v)}`)
        .join(',')
      return `{${entries}}`
    }
    return JSON.stringify(value)
  }
  const items = parameters.map((param) => {
    if (isRefObject(param)) {
      return makeRef(param.$ref)
    }
    return serializeValue(param)
  })
  return `[${items.join(',')}]`
}

function makeOperationParameters(
  parameters: readonly (Parameter | Reference)[],
  readonly?: boolean,
): string {
  const items = parameters.map((param) => {
    if (isRefObject(param)) {
      return makeRef(param.$ref)
    }
    if (isParameter(param) && param.schema) {
      return zodToOpenAPI(param.schema, { parameters: param }, readonly)
    }
    return JSON.stringify(param)
  })
  return `[${items.join(',')}]`
}

export function makeOperation(operation: Operation, readonly?: boolean) {
  const result = [
    operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
    operation.summary ? `summary:${JSON.stringify(operation.summary)}` : undefined,
    operation.description ? `description:${JSON.stringify(operation.description)}` : undefined,
    operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
    operation.operationId ? `operationId:${JSON.stringify(operation.operationId)}` : undefined,
    operation.parameters
      ? `parameters:${makeOperationParameters(operation.parameters, readonly)}`
      : undefined,
    operation.requestBody
      ? `requestBody:${makeRequestBody(operation.requestBody, readonly)}`
      : undefined,
    operation.responses
      ? `responses:${makeOperationResponses(operation.responses, readonly)}`
      : undefined,
    operation.callbacks ? `callbacks:{${makeCallbacks(operation.callbacks, readonly)}}` : undefined,
    operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
    operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
    operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

export function makePathItem(pathItem: PathItem) {
  const additionalOperationsCode = pathItem.additionalOperations
    ? Object.entries(pathItem.additionalOperations)
        .map(([opName, op]) => `${JSON.stringify(opName)}:${makeOperation(op)}`)
        .join(',')
    : undefined
  const results = [
    pathItem.$ref ? `$ref:${makeRef(pathItem.$ref)}` : undefined,
    pathItem.summary ? `summary:${JSON.stringify(pathItem.summary)}` : undefined,
    pathItem.description ? `description:${JSON.stringify(pathItem.description)}` : undefined,
    pathItem.get ? `get:${makeOperation(pathItem.get)}` : undefined,
    pathItem.put ? `put:${makeOperation(pathItem.put)}` : undefined,
    pathItem.post ? `post:${makeOperation(pathItem.post)}` : undefined,
    pathItem.delete ? `delete:${makeOperation(pathItem.delete)}` : undefined,
    pathItem.options ? `options:${makeOperation(pathItem.options)}` : undefined,
    pathItem.head ? `head:${makeOperation(pathItem.head)}` : undefined,
    pathItem.patch ? `patch:${makeOperation(pathItem.patch)}` : undefined,
    pathItem.trace ? `trace:${makeOperation(pathItem.trace)}` : undefined,
    pathItem.query ? `query:${makeOperation(pathItem.query)}` : undefined,
    additionalOperationsCode ? `additionalOperations:{${additionalOperationsCode}}` : undefined,
    pathItem.servers ? `servers:${JSON.stringify(pathItem.servers)}` : undefined,
    pathItem.parameters ? `parameters:${makePathParameters(pathItem.parameters)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${results}}`
}
