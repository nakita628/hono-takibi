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
  RequestBody,
  Responses,
  Schema,
} from '../openapi/index.js'
import {
  ensureSuffix,
  getToSafeIdentifier,
  requestParamsArray,
  toIdentifierPascalCase,
} from '../utils/index.js'

/**
 * generates a reference to the given $ref string.
 * @param $ref
 * @returns
 */
export function makeRef($ref: string): string {
  // Handle nested property references (e.g., #/components/schemas/X/properties/Y)
  // These are self-referential and reference the parent schema with z.lazy()
  // The OpenAPI $ref is preserved in the .openapi() metadata for runtime accuracy
  const propertiesMatch = $ref.match(/^#\/components\/schemas\/([^/]+)\/properties\/(.+)$/)
  if (propertiesMatch) {
    // Use the same transformation as definition side: ensureSuffix first, then toIdentifierPascalCase
    const parentSchema = toIdentifierPascalCase(
      ensureSuffix(decodeURIComponent(propertiesMatch[1]), 'Schema'),
    )
    return `z.lazy(() => ${parentSchema})`
  }
  const rawRef = $ref.split('/').at(-1)
  if (!rawRef) return 'Schema'
  const decodedRef = decodeURIComponent(rawRef)
  // Use the same transformation as definition side for each component type
  if ($ref.startsWith('#/components/schemas/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'Schema'))
  }
  if ($ref.startsWith('#/components/parameters/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'ParamsSchema'))
  }
  if ($ref.startsWith('#/components/headers/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'HeaderSchema'))
  }
  if ($ref.startsWith('#/components/securitySchemes/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'SecurityScheme'))
  }
  if ($ref.startsWith('#/components/requestBodies/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'RequestBody'))
  }
  if ($ref.startsWith('#/components/responses/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'Response'))
  }
  if ($ref.startsWith('#/components/examples/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'Example'))
  }
  if ($ref.startsWith('#/components/links/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'Link'))
  }
  if ($ref.startsWith('#/components/callbacks/')) {
    return toIdentifierPascalCase(ensureSuffix(decodedRef, 'Callback'))
  }
  return toIdentifierPascalCase(ensureSuffix(decodedRef, 'Schema'))
}

/**
 * generates a examples code from the given examples object.
 * @param examples Examples object
 * @returns
 */
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
    .map(([k, example]) => {
      // Reference
      if ('$ref' in example && example.$ref) {
        return `${JSON.stringify(k)}:${makeRef(example.$ref)}`
      }
      // Example object
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

/**
 * generates a responses code from the given responses object.
 * @param responses
 * @returns
 */
export function makeOperationResponses(responses: Operation['responses']) {
  const result = Object.entries(responses)
    .map(
      ([StatusCode, res]) =>
        `${/^\d+$/.test(StatusCode) ? StatusCode : `'${StatusCode}'`}:${makeResponses(res)}`,
    )
    // .map(([statusCode, res]) => `${JSON.stringify(statusCode)}:${makeResponses(res)}`)
    .join(',')
  return `{${result}}`
}

export function makeHeaderResponses(headers: { readonly [k: string]: Header | Reference }) {
  const result = Object.entries(headers)
    .map(([k, header]) => `${JSON.stringify(k)}:${makeHeadersAndReferences(header)}`)
    .join(',')
  return `z.object({${result}})`
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

  const result = [
    responses.summary ? `summary:${JSON.stringify(responses.summary)}` : undefined,
    responses.description ? `description:${JSON.stringify(responses.description)}` : undefined,
    responses.headers ? `headers:${makeHeaderResponses(responses.headers)}` : undefined,
    responses.content ? `content:{${makeContent(responses.content)}}` : undefined,
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

/**
 * generates a header code from the given headers object.
 * @param headers Headers object
 * @returns
 */
export function makeHeadersAndReferences(headers: Header | Reference) {
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
      ? `schema:${zodToOpenAPI(headers.schema, { headers: headers })}`
      : undefined,
    'content' in headers && headers.content ? `content:${makeContent(headers.content)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

/**
 * generates a link or reference code from the given link or reference object.
 * @param linkOrReference
 * @returns
 */
export function makeLinkOrReference(linkOrReference: Link | Reference) {
  const result = [
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
  return `{${result}}`
}

export function makeOperationCallbacks(callbacks: Operation['callbacks']) {
  if (!callbacks) return undefined
  const result = Object.entries(callbacks)
    .map(([callbackName, callbackRef]) => {
      if (callbackRef.$ref) {
        return `${JSON.stringify(callbackName)}:${makeRef(callbackRef.$ref)}`
      }
      const result = [
        callbackRef.summary ? `summary:${JSON.stringify(callbackRef.summary)}` : undefined,
        callbackRef.description
          ? `description:${JSON.stringify(callbackRef.description)}`
          : undefined,
      ]
        .filter((v) => v !== undefined)
        .join(',')
      return `${JSON.stringify(callbackName)}:{${result}}`
    })
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
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
  const isRef = (v: unknown): v is { $ref: string } =>
    typeof v === 'object' &&
    v !== null &&
    '$ref' in v &&
    typeof (v as { $ref: unknown }).$ref === 'string'
  const isPathItem = (v: unknown): v is PathItem => typeof v === 'object' && v !== null
  const isParameter = (v: unknown): v is Parameter =>
    typeof v === 'object' && v !== null && 'name' in v && 'in' in v && 'schema' in v

  return Object.entries(callbacks)
    .map(([callbackKey, pathItem]) => {
      // Handle $ref to components/callbacks
      if (isRef(pathItem)) {
        return `${JSON.stringify(callbackKey)}:${makeRef(pathItem.$ref)}`
      }
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

          const result = [
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
            operation.requestBody
              ? `requestBody:${makeRequestBody(operation.requestBody)}`
              : undefined,
            operation.responses
              ? `responses:${makeOperationResponses(operation.responses)}`
              : undefined,
            operation.callbacks
              ? `callbacks:${makeOperationCallbacks(operation.callbacks)}`
              : undefined,
            operation.deprecated ? `deprecated:${JSON.stringify(operation.deprecated)}` : undefined,
            operation.security ? `security:${JSON.stringify(operation.security)}` : undefined,
            operation.servers ? `servers:${JSON.stringify(operation.servers)}` : undefined,
          ]
            .filter((v) => v !== undefined)
            .join(',')
          return `${method}:{${result}}`
        })
        .filter((v) => v !== undefined)
        .join(',')
      return pathItemCode ? `${JSON.stringify(callbackKey)}:{${pathItemCode}}` : undefined
    })
    .filter((v) => v !== undefined)
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

  return Object.entries(content)
    .map(([contentType, mediaOrRef]) => {
      // Referenc
      if (isReference(mediaOrRef) && mediaOrRef.$ref) {
        return `'${contentType}':${makeRef(mediaOrRef.$ref)}`
      }
      // Media
      if (isMedia(mediaOrRef)) {
        return `'${contentType}':${makeMedia(mediaOrRef)}`
      }
      return undefined
    })
    .filter((v) => v !== undefined)
}

/**
 * generates a request body code from the given request body object.
 * @param body RequestBody object
 * @returns
 */
export function makeRequestBody(body: RequestBody | Reference) {
  if ('$ref' in body && body.$ref) {
    return makeRef(body.$ref)
  }
  const result = [
    body.description ? `description:${JSON.stringify(body.description)}` : undefined,
    'content' in body && body.content ? `content:{${makeContent(body.content)}}` : undefined,
    'required' in body && body.required ? `required:${JSON.stringify(body.required)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

/**
 * generates a media code from the given media object.
 * @param media Media object
 * @returns
 */
export function makeMedia(media: Media) {
  const encodingCode = media.encoding
    ? Object.entries(media.encoding)
        .map(([name, encoding]) => `${JSON.stringify(name)}:{${makeEncoding(encoding)}}`)
        .join(',')
    : undefined
  const result = [
    media.schema ? `schema:${zodToOpenAPI(media.schema)}` : undefined,
    media.itemSchema ? `itemSchema:${zodToOpenAPI(media.itemSchema)}` : undefined,
    media.example !== undefined ? `example:${JSON.stringify(media.example)}` : undefined,
    media.examples ? `examples:${makeExamples(media.examples)}` : undefined,
    encodingCode ? `encoding:{${encodingCode}}` : undefined,
    media.prefixEncoding ? `prefixEncoding:{${makeEncoding(media.prefixEncoding)}}` : undefined,
    media.itemEncoding ? `itemEncoding:{${makeEncoding(media.itemEncoding)}}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

/**
 * generates an encoding code from the given encoding object.
 * @param encoding
 * @returns
 */
export function makeEncoding(encoding: Encoding): string {
  const nestedEncoding = encoding.encoding
    ? Object.entries(encoding.encoding)
        .map(([name, encoding]) => `${JSON.stringify(name)}:{${makeEncoding(encoding)}}`)
        .join(',')
    : undefined

  const headersCode = encoding.headers
    ? Object.entries(encoding.headers)
        .map(([name, header]) => `${JSON.stringify(name)}:${makeHeadersAndReferences(header)}`)
        .join(',')
    : undefined

  return [
    encoding.contentType ? `contentType:${JSON.stringify(encoding.contentType)}` : undefined,
    headersCode ? `headers:{${headersCode}}` : undefined,
    nestedEncoding ? `encoding:{${nestedEncoding}}` : undefined,
    encoding.prefixEncoding
      ? `prefixEncoding:{${makeEncoding(encoding.prefixEncoding)}}`
      : undefined,
    encoding.itemEncoding ? `itemEncoding:{${makeEncoding(encoding.itemEncoding)}}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
}

/**
 * Generates request parts from parameters and request body.
 * @param parameters OpenAPI parameters array
 * @param requestBody OpenAPI request body (can be Reference or inline RequestBody)
 * @returns Request string like `request:{query:...,body:...},` or empty string
 */
export function makeRequest(
  parameters: readonly Parameter[] | undefined,
  requestBody: RequestBody | Reference | undefined,
) {
  const result = [
    parameters && parameters.length > 0 ? makeRequestParams(parameters) : undefined,
    (requestBody && '$ref' in requestBody && requestBody.$ref) ||
    (requestBody && 'content' in requestBody && requestBody.content)
      ? `body:${makeRequestBody(requestBody)}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return result.length > 0 ? `{${result}}` : undefined
}

/**
 * Extracts schema from parameter content (for parameters using content instead of schema)
 */
function getSchemaFromContent(content: Content | undefined): Schema | undefined {
  if (!content) return undefined
  const firstKey = Object.keys(content)[0]
  if (!firstKey) return undefined
  return content[firstKey]?.schema
}

/**
 * Converts OpenAPI parameters into a structured object grouped by location (query, path, header, cookie).
 *
 * @param parameters - Array of OpenAPI Parameter objects.
 * @returns An object where keys are parameter locations and values are records of parameter names to Zod schemas.
 *
 * @remarks
 * - Handles $ref references using makeRef.
 * - Supports parameters with content instead of schema (OpenAPI 3.x).
 * - Applies coercion for query parameters with number/boolean/date types.
 */
export function makeParameters(parameters: readonly Parameter[]): {
  [section: string]: { readonly[k: string]: string }
} {
  return parameters.reduce((acc: { [section: string]: { [k: string]: string } }, param) => {
    // Initialize section if needed
    if (!acc[param.in]) acc[param.in] = {}

    // Handle $ref
    if (param.$ref) {
      acc[param.in][getToSafeIdentifier(param.name)] = makeRef(param.$ref)
      return acc
    }

    // Handle parameters with content instead of schema (OpenAPI 3.x)
    const schema = param.schema ?? getSchemaFromContent(param.content)
    if (!schema) {
      acc[param.in][getToSafeIdentifier(param.name)] = 'z.any()'
      return acc
    }

    const baseSchema = zodToOpenAPI(schema, { parameters: param })

    // Apply coercion for query parameters
    const z =
      param.in === 'query' && schema.type === 'number'
        ? `z.coerce.${baseSchema.replace('z.', '')}`
        : param.in === 'query' && schema.type === 'boolean'
          ? baseSchema.replace('boolean', 'stringbool')
          : param.in === 'query' && schema.type === 'date'
            ? `z.coerce.${baseSchema.replace('z.', '')}`
            : baseSchema

    acc[param.in][getToSafeIdentifier(param.name)] = z
    return acc
  }, {})
}

export function makeRequestParams(parameters: readonly Parameter[]) {
  const paramsObject = makeParameters(parameters)
  const paramsArray = requestParamsArray(paramsObject)
  return paramsArray.length > 0 ? paramsArray.join(',') : undefined
}
