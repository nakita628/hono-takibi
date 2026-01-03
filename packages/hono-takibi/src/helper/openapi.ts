import { request } from '../generator/zod-openapi-hono/openapi/routes/request/index.js'
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
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
  Responses,
} from '../openapi/index.js'
import { toIdentifierPascalCase } from '../utils/index.js'

/**
 * generates a reference to the given $ref string.
 * @param $ref
 * @returns
 */
export function makeRef($ref: string): string {
  const rawRef = $ref.split('/').at(-1)
  if (!rawRef) return 'Schema'
  const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
  const suffixMap: { readonly [k: string]: string } = {
    '#/components/schemas/': 'Schema',
    '#/components/parameters/': 'ParamsSchema',
    '#/components/headers/': 'HeaderSchema',
    '#/components/securitySchemes/': 'SecurityScheme',
    '#/components/requestBodies/': 'RequestBody',
    '#/components/responses/': 'Response',
    '#/components/examples/': 'Example',
    '#/components/links/': 'Link',
    '#/components/callbacks/': 'Callback',
  }
  for (const [prefix, suffix] of Object.entries(suffixMap)) {
    if ($ref.startsWith(prefix)) {
      return refName.endsWith(suffix) ? refName : `${refName}${suffix}`
    }
  }
  return `${refName}Schema`
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
        readonly summary?: string
        readonly description?: string
      }
}) {
  const result = Object.entries(examples)
    .map(([key, example]) => {
      // Reference
      if ('$ref' in example && example.$ref) {
        return `${JSON.stringify(key)}:${makeRef(example.$ref)}`
      }
      // Example object
      const props = [
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
      return `${JSON.stringify(key)}:{${props}}`
    })
    .join(',')
  return `{${result}}`
}

export function makeOperation(operation: Operation) {
  const requestParams = request(operation.parameters, operation.requestBody)
  return {
    tags: operation.tags ? `tags:${JSON.stringify(operation.tags)},` : '',
    summary: operation.summary ? `summary:'${JSON.stringify(operation.summary)}',` : '',
    description: operation.description
      ? `description:'${JSON.stringify(operation.description)}',`
      : '',
    externalDocs: operation.externalDocs
      ? `externalDocs:${JSON.stringify(operation.externalDocs)},`
      : '',
    operationId: operation.operationId ? `operationId:'${operation.operationId}',` : '',
    request: requestParams ? `${requestParams}` : '',
    responses: operation.responses
      ? `responses:{${Object.entries(operation.responses)
          .map(([code, res]) => `${/^\d+$/.test(code) ? code : `'${code}'`}:${makeResponses(res)},`)
          .join('')}},`
      : '',
    callbacks: operation.callbacks ? `callbacks:{${makeCallbacks(operation.callbacks)}},` : '',
    deprecated: operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)},` : '',
    security: operation.security ? `security:${JSON.stringify(operation.security)},` : '',
    servers: operation.servers ? `servers:${JSON.stringify(operation.servers)},` : '',
  }
}

/**
 * generates a response code from the given responses object.
 * @param responses
 * @returns
 */
export function makeResponses(responses: Responses) {
  if (responses.$ref) {
    return makeRef(responses.$ref)
  }

  const props = [
    responses.summary ? `summary:${JSON.stringify(responses.summary)}` : undefined,
    responses.description ? `description:'${responses.description}'` : undefined,
    responses.headers ? `headers:{${makeHeaders(responses.headers)}}` : undefined,
    responses.content ? `content:{${makeContent(responses.content)}}` : undefined,
    responses.links ? `links:{${makeLinkOrReference(responses.links)}}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${props}}`
}

/**
 *
 * generates a header code from the given headers object.
 * @returns
 */
export function makeHeaders(headers: Header) {
  const props = [
    headers.description ? `description:${JSON.stringify(headers.description)},` : undefined,
    headers.required ? `required:${JSON.stringify(headers.required)},` : undefined,
    headers.deprecated ? `deprecated:${JSON.stringify(headers.deprecated)},` : undefined,
    headers.example ? `example:${JSON.stringify(headers.example)},` : undefined,
    headers.examples ? `examples:${makeExamples(headers.examples)},` : undefined,
    headers.style ? `style:${JSON.stringify(headers.style)},` : undefined,
    headers.explode ? `explode:${JSON.stringify(headers.explode)},` : undefined,
    headers.schema ? `schema:${zodToOpenAPI(headers.schema)},` : undefined,
    headers.content ? `content:${makeContent(headers.content)},` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${props}}`
}

/**
 *
 * @param linkOrReference
 * @returns
 */
export function makeLinkOrReference(linkOrReference: Link | Reference) {
  const props = [
    'operationRef' in linkOrReference
      ? `operationRef:${JSON.stringify(linkOrReference.operationRef)}`
      : undefined,
    'operationId' in linkOrReference
      ? `operationId:${JSON.stringify(linkOrReference.operationId)}`
      : undefined,
    // parameters is an object with string keys and unknown values
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
  return `{${props}}`
}

/**
 * generates callbacks
 * @param callbacks
 * @returns
 */
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
): string {
  const isPathItem = (v: unknown): v is PathItem => typeof v === 'object' && v !== null
  const isParameter = (v: unknown): v is Parameter =>
    typeof v === 'object' && v !== null && 'name' in v && 'in' in v && 'schema' in v
  const isComponentsRef = (ref: unknown): ref is `#/components/${string}/${string}` =>
    typeof ref === 'string' && ref.startsWith('#/components/')

  const buildResponsesCode = (responses: Operation['responses']): string => {
    const entries = Object.entries(responses)
      .map(([statusCode, response]) => {
        return `${JSON.stringify(statusCode)}:${makeResponses(response)}`
      })
      .join(',')
    return `{${entries}}`
  }

  // const buildResponsesCode = (responses: Operation['responses']): string => {
  //   const entries = Object.entries(responses)
  //     .map(([statusCode, response]) => {
  //       if (response.$ref) {
  //         return `${JSON.stringify(statusCode)}:${makeRef(response.$ref)}`
  //       }
  //       return `${JSON.stringify(statusCode)}:${JSON.stringify(response)}`
  //     })
  //     .join(',')

  //   return `{${entries}}`
  // }

  const buildOperationCallbacksCode = (
    operationCallbacks: Operation['callbacks'],
  ): string | undefined => {
    if (!operationCallbacks) return undefined

    const entries = Object.entries(operationCallbacks)
      .map(([callbackName, callbackRef]) => {
        if (callbackRef.$ref && isComponentsRef(callbackRef.$ref)) {
          return `${JSON.stringify(callbackName)}:${makeRef(callbackRef.$ref)}`
        }
        const props = [
          callbackRef.summary ? `summary:${JSON.stringify(callbackRef.summary)}` : undefined,
          callbackRef.description
            ? `description:${JSON.stringify(callbackRef.description)}`
            : undefined,
        ]
          .filter(Boolean)
          .join(',')
        return props ? `${JSON.stringify(callbackName)}:{${props}}` : undefined
      })
      .filter(Boolean)
      .join(',')

    return entries ? `{${entries}}` : undefined
  }

  return Object.entries(callbacks)
    .map(([callbackKey, pathItem]) => {
      if (!isPathItem(pathItem)) return undefined
      const methods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const
      const pathItemCode = methods
        .map((method) => {
          const operation = pathItem[method]
          if (!operation) return undefined
          const params =
            operation.parameters && operation.parameters.length > 0
              ? operation.parameters
                  .filter(isParameter)
                  .map((param) =>
                    param.$ref
                      ? makeRef(param.$ref)
                      : zodToOpenAPI(param.schema, { parameters: { ...param } }),
                  )
                  .filter(Boolean)
              : undefined
          const parametersCode = params && params.length > 0 ? `[${params.join(',')}]` : undefined

          const requestBodyCode = (() => {
            if (!operation.requestBody) return undefined
            // Handle $ref to requestBodies component
            if ('$ref' in operation.requestBody && isComponentsRef(operation.requestBody.$ref)) {
              return makeRef(operation.requestBody.$ref)
            }
            // Handle inline requestBody with content
            if (!('content' in operation.requestBody && operation.requestBody.content))
              return undefined
            const contentEntries = Object.entries(operation.requestBody.content)
              .map(([mediaType, mediaOrReference]) => {
                if ('$ref' in mediaOrReference && mediaOrReference.$ref) {
                  return `${JSON.stringify(mediaType)}:{schema:${makeRef(mediaOrReference.$ref)}}`
                }
                if ('schema' in mediaOrReference) {
                  return `${JSON.stringify(mediaType)}:{schema:${zodToOpenAPI(mediaOrReference.schema)}}`
                }
                return undefined
              })
              .filter(Boolean)
              .join(',')
            if (!contentEntries) return undefined
            const bodyInner = [
              `content:{${contentEntries}}`,
              operation.requestBody.required !== undefined
                ? `required:${JSON.stringify(operation.requestBody.required)}`
                : undefined,
              operation.requestBody.description
                ? `description:${JSON.stringify(operation.requestBody.description)}`
                : undefined,
            ]
              .filter(Boolean)
              .join(',')
            return `{${bodyInner}}`
          })()

          const props = [
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
            parametersCode ? `parameters:${parametersCode}` : undefined,
            requestBodyCode ? `requestBody:${requestBodyCode}` : undefined,
            operation.responses
              ? `responses:${buildResponsesCode(operation.responses)}`
              : undefined,
            operation.callbacks
              ? `callbacks:${buildOperationCallbacksCode(operation.callbacks)}`
              : undefined,
            operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
            operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
            operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
          ]
            .filter(Boolean)
            .join(',')
          return `${method}:{${props}}`
        })
        .filter(Boolean)
        .join(',')
      return pathItemCode ? `${JSON.stringify(callbackKey)}:{${pathItemCode}}` : undefined
    })
    .filter(Boolean)
    .join(',')
}

/**
 * generates content
 * @param content
 * @returns
 */
export function makeContent(
  content: Content | { readonly [k: string]: Media | Reference },
): string[] {
  const isMedia = (v: unknown): v is Media => typeof v === 'object' && v !== null && 'schema' in v

  const isReference = (v: unknown): v is Reference =>
    typeof v === 'object' && v !== null && '$ref' in v

  const makeEncoding = (contentType: string, encodingName: string, encoding: Encoding): string => {
    const headers = encoding.headers
      ? Object.entries(encoding.headers)
          .map(([headerKey, header]) => {
            if ('$ref' in header && header.$ref) {
              return `${JSON.stringify(headerKey)}:${makeRef(header.$ref)}`
            }
            const props = [
              header.description ? `description:${JSON.stringify(header.description)}` : undefined,
              'required' in header && header.required
                ? `required:${JSON.stringify(header.required)}`
                : undefined,
              'deprecated' in header && header.deprecated
                ? `deprecated:${JSON.stringify(header.deprecated)}`
                : undefined,
              'example' in header && header.example !== undefined
                ? `example:${JSON.stringify(header.example)}`
                : undefined,
              'examples' in header && header.examples
                ? `examples:${makeExamples(header.examples)}`
                : undefined,
            ]
              .filter((v): v is string => v !== undefined)
              .join(',')
            return `${JSON.stringify(headerKey)}:{${props}}`
          })
          .join(',')
      : undefined

    const nestedEncoding = encoding.encoding
      ? Object.entries(encoding.encoding)
          .map(([name, enc]) => makeEncoding(contentType, name, enc))
          .join(',')
      : undefined

    const props = [
      encoding.contentType ? `contentType:${JSON.stringify(encoding.contentType)}` : undefined,
      headers ? `headers:{${headers}}` : undefined,
      nestedEncoding ? `encoding:{${nestedEncoding}}` : undefined,
      encoding.prefixEncoding
        ? `prefixEncoding:{${makeEncoding(contentType, 'prefixEncoding', encoding.prefixEncoding)}}`
        : undefined,
      encoding.itemEncoding
        ? `itemEncoding:{${makeEncoding(contentType, 'itemEncoding', encoding.itemEncoding)}}`
        : undefined,
    ]
      .filter((v): v is string => v !== undefined)
      .join(',')

    return `${JSON.stringify(encodingName)}:{${props}}`
  }

  const makeMediaString = (contentType: string, media: Media): string => {
    const zSchema = zodToOpenAPI(media.schema)
    const zItemSchema = media.itemSchema ? zodToOpenAPI(media.itemSchema) : undefined

    const encoding = media.encoding
      ? Object.entries(media.encoding)
          .map(([encodingName, enc]) => makeEncoding(contentType, encodingName, enc))
          .join(',')
      : undefined

    const props = [
      `schema:${zSchema}`,
      zItemSchema ? `itemSchema:${zItemSchema}` : undefined,
      media.example !== undefined ? `example:${JSON.stringify(media.example)}` : undefined,
      media.examples ? `examples:${makeExamples(media.examples)}` : undefined,
      encoding ? `encoding:{${encoding}}` : undefined,
      media.prefixEncoding
        ? `prefixEncoding:{${makeEncoding(contentType, 'prefixEncoding', media.prefixEncoding)}}`
        : undefined,
      media.itemEncoding
        ? `itemEncoding:{${makeEncoding(contentType, 'itemEncoding', media.itemEncoding)}}`
        : undefined,
    ]
      .filter((v) => v !== undefined)
      .join(',')

    return `{${props}}`
  }

  return Object.entries(content)
    .map(([contentType, mediaOrRef]) => {
      // Reference
      if (isReference(mediaOrRef) && mediaOrRef.$ref) {
        return `'${contentType}':${makeRef(mediaOrRef.$ref)}`
      }
      // Media
      if (isMedia(mediaOrRef)) {
        return `'${contentType}':${makeMediaString(contentType, mediaOrRef)}`
      }
      return undefined
    })
    .filter((v) => v !== undefined)
}
