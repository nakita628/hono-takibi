/**
 * OpenAPI code generation helpers.
 *
 * Provides functions for converting OpenAPI specification elements
 * into TypeScript/Zod code strings.
 *
 * ```mermaid
 * flowchart TD
 *   subgraph "Reference Handling"
 *     A["makeRef($ref)"] --> B["Parse component type"]
 *     B --> C["Return schema variable name"]
 *   end
 *   subgraph "Content Generation"
 *     D["makeContent()"] --> E["Process each media type"]
 *     E --> F["Generate Zod schema code"]
 *   end
 *   subgraph "Parameter Handling"
 *     G["makeParameters()"] --> H["Group by location"]
 *     H --> I["Generate Zod validators"]
 *   end
 * ```
 *
 * @module helper/openapi
 */
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
 * Generates a schema reference variable name from an OpenAPI $ref string.
 *
 * Converts OpenAPI $ref paths to their corresponding schema variable names
 * with proper suffixes based on component type.
 *
 * ```mermaid
 * flowchart LR
 *   A["#/components/schemas/User"] --> B["makeRef()"]
 *   B --> C["UserSchema"]
 *   D["#/components/parameters/Id"] --> B
 *   B --> E["IdParamsSchema"]
 * ```
 *
 * @param $ref - OpenAPI $ref string (e.g., "#/components/schemas/User")
 * @returns Schema variable name (e.g., "UserSchema")
 *
 * @example
 * ```ts
 * makeRef('#/components/schemas/User')      // → 'UserSchema'
 * makeRef('#/components/parameters/UserId') // → 'UserIdParamsSchema'
 * makeRef('#/components/headers/Auth')      // → 'AuthHeaderSchema'
 * ```
 */
export function makeRef($ref: string): string {
  /**
   * Maps OpenAPI component path prefixes to their corresponding suffixes.
   * @see {@link https://swagger.io/docs/specification/v3_0/components/|OpenAPI Components}
   */
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
  ]

  /** Converts name to PascalCase variable name with suffix */
  const toVariableName = (name: string, suffix: string): string =>
    toIdentifierPascalCase(ensureSuffix(name, suffix))

  // Handle nested property references (e.g., #/components/schemas/X/properties/Y)
  // These are self-referential and reference the parent schema with z.lazy()
  const propertiesMatch = $ref.match(/^#\/components\/schemas\/([^/]+)\/properties\/(.+)$/)
  if (propertiesMatch) {
    const parentSchema = toVariableName(decodeURIComponent(propertiesMatch[1]), 'Schema')
    return `z.lazy(()=>${parentSchema})`
  }

  const rawRef = $ref.split('/').at(-1)
  if (!rawRef) return 'Schema'
  const decodedRef = decodeURIComponent(rawRef)

  // Find matching component type and apply corresponding suffix
  const match = COMPONENT_SUFFIX_MAP.find(({ prefix }) => $ref.startsWith(prefix))
  return toVariableName(decodedRef, match?.suffix ?? 'Schema')
}

/**
 * Generates examples code from the given examples object.
 *
 * **Important:** `$ref` is only resolved at the top level of an example object.
 * If `$ref` appears inside the `value` property (e.g., `employees: [{ $ref: '...' }]`),
 * it will NOT be resolved - it will be serialized as a literal JSON object.
 *
 * This is correct behavior per OpenAPI specification. The spec only supports
 * `$ref` to reference entire example objects, not nested values within `value`.
 *
 * **Custom extensions (x-*)** like `x-extends` are NOT resolved by
 * @apidevtools/swagger-parser bundle() and are treated as opaque data.
 * For example:
 * ```yaml
 * UserMinimalWithMeta:
 *   x-extends:
 *     $ref: "#/components/examples/UserMinimal"
 *   value:
 *     meta: { createdAt: "2026-01-04T00:00:00Z" }
 * ```
 * Generates:
 * ```ts
 * {"x-extends":{"$ref":"#/components/examples/UserMinimal"},"value":{...}}
 * ```
 *
 * @see https://swagger.io/docs/specification/v3_0/adding-examples/
 *
 * @example
 * ```ts
 * // $ref at top level - RESOLVED to variable reference
 * { $ref: '#/components/examples/UserExample' } → UserExample
 *
 * // $ref inside value - NOT resolved, serialized as-is
 * { value: { employees: [{ $ref: '#/...' }] } } → {"value":{"employees":[{"$ref":"#/..."}]}}
 *
 * // x-extends with $ref - NOT resolved, serialized as-is
 * { x-extends: { $ref: '#/...' }, value: {...} } → {"x-extends":{"$ref":"#/..."},"value":{...}}
 * ```
 *
 * @param examples - Examples object from OpenAPI components
 * @returns Generated TypeScript code string
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
      // Reference with $ref
      // Note: When $ref is present, sibling properties (summary, description) are IGNORED.
      // This follows OpenAPI 3.0 spec where $ref must be the only property in an object.
      // OpenAPI 3.1 allows sibling properties, but for backward compatibility and
      // per JSON Reference spec, we only use the $ref and discard siblings.
      // SwaggerParser.bundle() preserves both $ref and siblings in the parsed object,
      // but hono-takibi intentionally ignores siblings to generate clean variable references.
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
 * Generates response code for an operation's responses object.
 *
 * Converts OpenAPI operation responses into a TypeScript object literal string
 * with status codes as keys and response definitions as values.
 *
 * @param responses - The responses object from an OpenAPI operation
 * @returns Object literal string with status code keys and response values
 *
 * @example
 * ```ts
 * makeOperationResponses({
 *   '200': { description: 'Success', content: {...} },
 *   'default': { description: 'Error' }
 * })
 * // → '{200:{description:"Success",content:{...}},"default":{description:"Error"}}'
 * ```
 */
export function makeOperationResponses(responses: Operation['responses']) {
  const result = Object.entries(responses)
    .map(
      ([statusCode, res]) =>
        `${/^\d+$/.test(statusCode) ? statusCode : `'${statusCode}'`}:${makeResponses(res)}`,
    )
    // .map(([statusCode, res]) => `${JSON.stringify(statusCode)}:${makeResponses(res)}`)
    .join(',')
  return `{${result}}`
}

/**
 * Generates a Zod object schema for response headers.
 *
 * @param headers - Object containing header definitions or references.
 * @returns A Zod object schema string for the headers.
 */
export function makeHeaderResponses(headers: { readonly [k: string]: Header | Reference }) {
  const result = Object.entries(headers)
    .map(([k, header]) => `${JSON.stringify(k)}:${makeHeadersAndReferences(header)}`)
    .join(',')
  return `z.object({${result}})`
}

/**
 * Generates code for a single response object.
 *
 * Handles both $ref references and inline response definitions,
 * including headers, content, and links.
 *
 * @param responses - OpenAPI response object or reference
 * @returns TypeScript code string for the response
 *
 * @example
 * ```ts
 * // Reference
 * makeResponses({ $ref: '#/components/responses/NotFound' })
 * // → 'NotFoundResponse'
 *
 * // Inline
 * makeResponses({ description: 'Success', content: {...} })
 * // → '{description:"Success",content:{...}}'
 * ```
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
 * Generates code for a header or header reference.
 *
 * Handles both $ref references and inline header definitions with
 * all OpenAPI header properties (description, required, schema, etc.).
 *
 * @param headers - OpenAPI header object or reference
 * @returns TypeScript code string for the header
 *
 * @example
 * ```ts
 * // Reference
 * makeHeadersAndReferences({ $ref: '#/components/headers/XRequestId' })
 * // → 'XRequestIdHeaderSchema'
 *
 * // Inline
 * makeHeadersAndReferences({ schema: { type: 'string' }, required: true })
 * // → '{required:true,schema:z.string()}'
 * ```
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
 * Generates code for a link or link reference.
 *
 * Handles OpenAPI link objects with operationRef, operationId,
 * parameters, requestBody, and other link properties.
 *
 * @param linkOrReference - OpenAPI link object or reference
 * @returns TypeScript code string for the link
 *
 * @example
 * ```ts
 * makeLinkOrReference({
 *   operationId: 'getUser',
 *   parameters: { userId: '$response.body#/id' }
 * })
 * // → '{operationId:"getUser",parameters:{"userId":"$response.body#/id"}}'
 * ```
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

/**
 * Generates callbacks code for an operation.
 *
 * @param callbacks - The callbacks object from an operation.
 * @returns Callbacks code string or undefined if no callbacks.
 */
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
 * Generates code for OpenAPI callbacks object.
 *
 * Converts callbacks with their path items and operations into
 * TypeScript code. Handles $ref references to callback components.
 *
 * @param callbacks - OpenAPI callbacks object with path expressions
 * @returns TypeScript code string for the callbacks
 *
 * @example
 * ```ts
 * makeCallbacks({
 *   onPaymentComplete: {
 *     '{$request.body#/callbackUrl}': {
 *       post: { requestBody: {...}, responses: {...} }
 *     }
 *   }
 * })
 * // → '"onPaymentComplete":{post:{requestBody:{...},responses:{...}}}'
 * ```
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
  const isRef = (v: unknown): v is { $ref: string } => {
    if (typeof v !== 'object' || v === null || !('$ref' in v)) return false
    const obj = v as Record<string, unknown>
    return typeof obj.$ref === 'string'
  }
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
 * Generates code for OpenAPI content object.
 *
 * Processes each media type in the content object and generates
 * corresponding TypeScript code. Handles both $ref references
 * and inline media definitions.
 *
 * @param content - OpenAPI content object with media types
 * @returns Array of media type code strings
 *
 * @example
 * ```ts
 * makeContent({
 *   'application/json': { schema: { type: 'object', properties: {...} } }
 * })
 * // → ["'application/json':{schema:z.object({...})}"]
 * ```
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
 * Generates code for an OpenAPI request body.
 *
 * Handles both $ref references and inline request body definitions
 * with description, content, and required properties.
 *
 * @param body - OpenAPI request body object or reference
 * @returns TypeScript code string for the request body
 *
 * @example
 * ```ts
 * // Reference
 * makeRequestBody({ $ref: '#/components/requestBodies/CreateUser' })
 * // → 'CreateUserRequestBody'
 *
 * // Inline
 * makeRequestBody({
 *   content: { 'application/json': { schema: {...} } },
 *   required: true
 * })
 * // → '{content:{"application/json":{schema:...}},required:true}'
 * ```
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
 * Generates code for an OpenAPI media object.
 *
 * Converts media type definitions including schema, examples,
 * and encoding into TypeScript code.
 *
 * @param media - OpenAPI media object
 * @returns TypeScript code string for the media
 *
 * @example
 * ```ts
 * makeMedia({
 *   schema: { type: 'object', properties: { name: { type: 'string' } } },
 *   example: { name: 'John' }
 * })
 * // → '{schema:z.object({name:z.string()}),example:{"name":"John"}}'
 * ```
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
 * Generates code for an OpenAPI encoding object.
 *
 * Handles encoding properties for multipart request bodies including
 * contentType, headers, and nested encoding configurations.
 *
 * @param encoding - OpenAPI encoding object
 * @returns TypeScript code string for the encoding
 *
 * @example
 * ```ts
 * makeEncoding({
 *   contentType: 'image/png',
 *   headers: { 'X-Custom': { schema: { type: 'string' } } }
 * })
 * // → 'contentType:"image/png",headers:{"X-Custom":{schema:z.string()}}'
 * ```
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
  [section: string]: { readonly [k: string]: string }
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

/**
 * Generates request parameter code from OpenAPI parameters.
 *
 * @param parameters - Array of OpenAPI parameter objects.
 * @returns Comma-separated parameter code string or undefined if empty.
 */
export function makeRequestParams(parameters: readonly Parameter[]) {
  const paramsObject = makeParameters(parameters)
  const paramsArray = requestParamsArray(paramsObject)
  return paramsArray.length > 0 ? paramsArray.join(',') : undefined
}
