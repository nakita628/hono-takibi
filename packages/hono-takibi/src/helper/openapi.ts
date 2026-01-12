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

export function makeRequestParams(parameters: readonly Parameter[]) {
  const paramsObject = makeParameters(parameters)
  const paramsArray = requestParamsArray(paramsObject)
  return paramsArray.length > 0 ? paramsArray.join(',') : undefined
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/openapi.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('openapi helper', () => {
    describe('makeRef', () => {
      it.concurrent.each([
        ['#/components/schemas/Test', 'TestSchema'],
        ['#/components/parameters/Test', 'TestParamsSchema'],
        ['#/components/headers/Test', 'TestHeaderSchema'],
        ['#/components/securitySchemes/Test', 'TestSecurityScheme'],
        ['#/components/requestBodies/Test', 'TestRequestBody'],
        ['#/components/responses/Test', 'TestResponse'],
        ['#/components/examples/Test', 'TestExample'],
        ['#/components/links/Test', 'TestLink'],
        ['#/components/callbacks/Test', 'TestCallback'],
        ['#/components/schemas/Test%20Name', 'TestNameSchema'],
        ['', 'Schema'],
        ['#/components/schemas/TestSchema', 'TestSchema'],
        ['#/components/parameters/TestParamsSchema', 'TestParamsSchema'],
        ['#/components/schemas/User/properties/parent', 'z.lazy(() => UserSchema)'],
        ['#/components/schemas/UserSchema/properties/children', 'z.lazy(() => UserSchema)'],
        ['#/unknown/path/Test', 'TestSchema'],
        ['#/components/schemas/my-test-schema', 'MyTestSchemaSchema'],
        ['#/components/schemas/my_test_schema', 'MyTestSchemaSchema'],
        ['#/components/schemas/Test%2FName%2FPath', 'TestNamePathSchema'],
        ['#/components/headers/RateLimitHeaderSchema', 'RateLimitHeaderSchema'],
        ['#/components/responses/ErrorResponse', 'ErrorResponse'],
        ['#/components/callbacks/EventCallback', 'EventCallback'],
        [
          '#/components/schemas/Category/properties/subcategories/items',
          'z.lazy(() => CategorySchema)',
        ],
      ])('makeRef(%s) -> %s', ($ref, expected) => {
        expect(makeRef($ref)).toBe(expected)
      })
    })

    describe('makeExamples', () => {
      it.concurrent('generates example with value', () => {
        const result = makeExamples({
          example1: { value: 'test-value' },
        })
        expect(result).toBe(`{"example1":{value:"test-value"}}`)
      })
      it.concurrent('generates example with summary and description', () => {
        const result = makeExamples({
          example1: { summary: 'Sum', description: 'Desc' },
        })
        expect(result).toBe(`{"example1":{summary:"Sum",description:"Desc"}}`)
      })
      it.concurrent('generates example with $ref', () => {
        const result = makeExamples({
          example1: { $ref: '#/components/examples/MyExample' } as const,
        })
        expect(result).toBe(`{"example1":MyExample}`)
      })
      it.concurrent('generates example with defaultValue', () => {
        const result = makeExamples({
          example1: { defaultValue: 'default-test' },
        })
        expect(result).toBe(`{"example1":{defaultValue:"default-test"}}`)
      })
      it.concurrent('generates example with serializedValue', () => {
        const result = makeExamples({
          example1: { serializedValue: 'serialized-test' },
        })
        expect(result).toBe(`{"example1":{serializedValue:"serialized-test"}}`)
      })
      it.concurrent('generates example with externalValue', () => {
        const result = makeExamples({
          example1: { externalValue: 'https://example.com/data.json' },
        })
        expect(result).toBe(`{"example1":{externalValue:"https://example.com/data.json"}}`)
      })
      it.concurrent('generates multiple examples', () => {
        const result = makeExamples({
          example1: { value: 'value1' },
          example2: { value: 'value2' },
        })
        expect(result).toBe(`{"example1":{value:"value1"},"example2":{value:"value2"}}`)
      })
      it.concurrent('generates example with all fields', () => {
        const result = makeExamples({
          full: { summary: 'Full example', description: 'Full description', value: 'test-value' },
        })
        expect(result).toBe(
          `{"full":{summary:"Full example",description:"Full description",value:"test-value"}}`,
        )
      })
      it.concurrent('generates example with numeric value', () => {
        const result = makeExamples({
          example1: { value: 123 },
        })
        expect(result).toBe(`{"example1":{value:123}}`)
      })
      it.concurrent('generates example with boolean value', () => {
        const result = makeExamples({
          example1: { value: true },
        })
        expect(result).toBe(`{"example1":{value:true}}`)
      })
      it.concurrent('generates example with null value', () => {
        const result = makeExamples({
          example1: { value: null },
        })
        expect(result).toBe(`{"example1":{value:null}}`)
      })
      it.concurrent('generates example with object value', () => {
        const result = makeExamples({
          example1: { value: { id: 1, name: 'test' } },
        })
        expect(result).toBe(`{"example1":{value:{"id":1,"name":"test"}}}`)
      })
      it.concurrent('generates example with array value', () => {
        const result = makeExamples({
          example1: { value: [1, 2, 3] },
        })
        expect(result).toBe(`{"example1":{value:[1,2,3]}}`)
      })
      it.concurrent('generates example with $ref to schemas', () => {
        const result = makeExamples({
          example1: { $ref: '#/components/schemas/User' } as const,
        })
        expect(result).toBe(`{"example1":UserSchema}`)
      })
      it.concurrent('generates example with empty object', () => {
        const result = makeExamples({})
        expect(result).toBe('{}')
      })
    })

    describe('makeResponses', () => {
      it.concurrent('generates response with $ref', () => {
        const result = makeResponses({ $ref: '#/components/responses/NotFound' })
        expect(result).toBe('NotFoundResponse')
      })
      it.concurrent('generates response with description', () => {
        const result = makeResponses({ description: 'Success response' })
        expect(result).toBe('{description:"Success response"}')
      })
      it.concurrent('generates response with summary', () => {
        const result = makeResponses({ summary: 'Success summary', description: 'Desc' })
        expect(result).toBe('{summary:"Success summary",description:"Desc"}')
      })
      it.concurrent('generates response with headers', () => {
        const result = makeResponses({
          description: 'Success',
          headers: { 'X-Rate-Limit': { schema: { type: 'integer' } } },
        })
        expect(result).toBe(
          '{description:"Success",headers:z.object({"X-Rate-Limit":{schema:z.int().exactOptional()}})}',
        )
      })
      it.concurrent('generates response with content', () => {
        const result = makeResponses({
          description: 'Success',
          content: { 'application/json': { schema: { type: 'string' } } },
        })
        expect(result).toBe(
          `{description:"Success",content:{'application/json':{schema:z.string()}}}`,
        )
      })
      it.concurrent('generates response with links', () => {
        const result = makeResponses({
          description: 'Success',
          links: { GetUser: { operationId: 'getUser' } },
        })
        expect(result).toBe('{description:"Success",links:{"GetUser":{operationId:"getUser"}}}')
      })
      it.concurrent('generates response with link $ref', () => {
        const result = makeResponses({
          description: 'Success',
          links: { GetUser: { $ref: '#/components/links/UserLink' } },
        })
        expect(result).toBe('{description:"Success",links:{"GetUser":UserLink}}')
      })
      it.concurrent('generates response with all fields', () => {
        const result = makeResponses({
          summary: 'Sum',
          description: 'Desc',
          headers: { 'X-Custom': { schema: { type: 'string' } } },
          content: { 'application/json': { schema: { type: 'object' } } },
          links: { Next: { operationId: 'getNext' } },
        })
        expect(result).toBe(
          `{summary:"Sum",description:"Desc",headers:z.object({"X-Custom":{schema:z.string().exactOptional()}}),content:{'application/json':{schema:z.object({})}},links:{"Next":{operationId:"getNext"}}}`,
        )
      })
      it.concurrent('generates empty response object', () => {
        const result = makeResponses({})
        expect(result).toBe('{}')
      })
      it.concurrent('generates response with multiple links', () => {
        const result = makeResponses({
          description: 'Success',
          links: {
            GetUser: { operationId: 'getUser' },
            UpdateUser: { operationId: 'updateUser' },
          },
        })
        expect(result).toBe(
          '{description:"Success",links:{"GetUser":{operationId:"getUser"},"UpdateUser":{operationId:"updateUser"}}}',
        )
      })
      it.concurrent('generates response with header $ref', () => {
        const result = makeResponses({
          description: 'Success',
          headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
        })
        expect(result).toBe(
          '{description:"Success",headers:z.object({"X-Rate-Limit":RateLimitHeaderSchema})}',
        )
      })
    })

    describe('makeLinkOrReference', () => {
      it.concurrent('generates link with operationId', () => {
        const result = makeLinkOrReference({ operationId: 'getUser' })
        expect(result).toBe('{operationId:"getUser"}')
      })
      it.concurrent('generates link with operationRef', () => {
        const result = makeLinkOrReference({ operationRef: '#/paths/users/get' })
        expect(result).toBe('{operationRef:"#/paths/users/get"}')
      })
      it.concurrent('generates link with parameters', () => {
        const result = makeLinkOrReference({
          operationId: 'getUser',
          parameters: { userId: '$response.body#/id' },
        })
        expect(result).toBe('{operationId:"getUser",parameters:{"userId":"$response.body#/id"}}')
      })
      it.concurrent('generates link with requestBody', () => {
        const result = makeLinkOrReference({
          operationId: 'updateUser',
          requestBody: '$response.body',
        })
        expect(result).toBe('{operationId:"updateUser",requestBody:"$response.body"}')
      })
      it.concurrent('generates link with description', () => {
        const result = makeLinkOrReference({
          operationId: 'getUser',
          description: 'Link to get user',
        })
        expect(result).toBe('{operationId:"getUser",description:"Link to get user"}')
      })
      it.concurrent('generates link with server', () => {
        const result = makeLinkOrReference({
          operationId: 'getUser',
          server: { url: 'https://api.example.com' },
          // biome-ignore lint: test
        } as any)
        expect(result).toBe('{operationId:"getUser",server:{"url":"https://api.example.com"}}')
      })
      it.concurrent('generates link with summary', () => {
        const result = makeLinkOrReference({
          operationId: 'getUser',
          summary: 'Get user link',
        })
        expect(result).toBe('{operationId:"getUser",summary:"Get user link"}')
      })
      it.concurrent('generates link with $ref', () => {
        const result = makeLinkOrReference({
          $ref: '#/components/links/UserLink',
        })
        expect(result).toBe('{$ref:UserLink}')
      })
      it.concurrent('generates link with all fields', () => {
        const result = makeLinkOrReference({
          operationRef: '#/paths/users/get',
          operationId: 'getUser',
          parameters: { id: '123' },
          requestBody: { name: 'test' },
          description: 'Full link',
          server: { url: 'https://api.example.com' },
          summary: 'Summary',
          // biome-ignore lint: test
        } as any)
        expect(result).toBe(
          '{operationRef:"#/paths/users/get",operationId:"getUser",parameters:{"id":"123"},requestBody:{"name":"test"},description:"Full link",server:{"url":"https://api.example.com"},summary:"Summary"}',
        )
      })
    })

    describe('makeContent', () => {
      it.concurrent('generates content with schema', () => {
        const result = makeContent({
          'application/json': { schema: { type: 'string' } },
        })
        expect(result).toEqual([`'application/json':{schema:z.string()}`])
      })
      it.concurrent('generates content with $ref', () => {
        const result = makeContent({
          'application/json': { $ref: '#/components/schemas/User' },
        })
        expect(result).toEqual([`'application/json':UserSchema`])
      })
      it.concurrent('generates multiple content types', () => {
        const result = makeContent({
          'application/json': { schema: { type: 'string' } },
          'application/xml': { schema: { type: 'string' } },
        })
        expect(result).toEqual([
          `'application/json':{schema:z.string()}`,
          `'application/xml':{schema:z.string()}`,
        ])
      })
    })

    describe('makeRequestBody', () => {
      it.concurrent('generates request body with $ref', () => {
        const result = makeRequestBody({ $ref: '#/components/requestBodies/CreateUser' })
        expect(result).toBe('CreateUserRequestBody')
      })
      it.concurrent('generates request body with content', () => {
        const result = makeRequestBody({
          description: 'User data',
          content: { 'application/json': { schema: { type: 'string' } } },
          required: true,
        })
        expect(result).toBe(
          `{description:"User data",content:{'application/json':{schema:z.string()}},required:true}`,
        )
      })
      it.concurrent('generates request body with description only', () => {
        const result = makeRequestBody({ description: 'Request description' })
        expect(result).toBe('{description:"Request description"}')
      })
      it.concurrent('generates request body with content only', () => {
        const result = makeRequestBody({
          content: { 'application/json': { schema: { type: 'object' } } },
        })
        expect(result).toBe(`{content:{'application/json':{schema:z.object({})}}}`)
      })
      it.concurrent('generates request body with required false', () => {
        const result = makeRequestBody({
          content: { 'application/json': { schema: { type: 'string' } } },
          required: false,
        })
        expect(result).toBe(`{content:{'application/json':{schema:z.string()}}}`)
      })
      it.concurrent('generates empty request body', () => {
        const result = makeRequestBody({})
        expect(result).toBe('{}')
      })
      it.concurrent('generates request body with multiple content types', () => {
        const result = makeRequestBody({
          content: {
            'application/json': { schema: { type: 'object' } },
            'application/xml': { schema: { type: 'object' } },
          },
        })
        expect(result).toBe(
          `{content:{'application/json':{schema:z.object({})},'application/xml':{schema:z.object({})}}}`,
        )
      })
    })

    describe('makeMedia', () => {
      it.concurrent('generates media with schema', () => {
        const result = makeMedia({ schema: { type: 'string' } })
        expect(result).toBe('{schema:z.string()}')
      })
      it.concurrent('generates media with example', () => {
        const result = makeMedia({ schema: { type: 'string' }, example: 'test' })
        expect(result).toBe('{schema:z.string(),example:"test"}')
      })
      it.concurrent('generates media with itemSchema', () => {
        const result = makeMedia({
          schema: { type: 'array', items: { type: 'string' } },
          itemSchema: { type: 'string' },
          // biome-ignore lint: test
        } as any)
        expect(result).toBe('{schema:z.array(z.string()),itemSchema:z.string()}')
      })
      it.concurrent('generates media with examples', () => {
        const result = makeMedia({
          schema: { type: 'string' },
          examples: { sample: { value: 'example-value' } },
        })
        expect(result).toBe('{schema:z.string(),examples:{"sample":{value:"example-value"}}}')
      })
      it.concurrent('generates media with encoding', () => {
        const result = makeMedia({
          schema: { type: 'object' },
          encoding: { file: { contentType: 'application/octet-stream' } },
        })
        expect(result).toBe(
          '{schema:z.object({}),encoding:{"file":{contentType:"application/octet-stream"}}}',
        )
      })
      it.concurrent('generates media with prefixEncoding', () => {
        const result = makeMedia({
          schema: { type: 'object' },
          prefixEncoding: { contentType: 'text/plain' },
        })
        expect(result).toBe('{schema:z.object({}),prefixEncoding:{contentType:"text/plain"}}')
      })
      it.concurrent('generates media with itemEncoding', () => {
        const result = makeMedia({
          schema: { type: 'array' },
          itemEncoding: { contentType: 'application/json' },
        })
        expect(result).toBe(
          '{schema:z.array(z.any()),itemEncoding:{contentType:"application/json"}}',
        )
      })
    })

    describe('makeEncoding', () => {
      it.concurrent('generates encoding with contentType', () => {
        const result = makeEncoding({ contentType: 'application/json' })
        expect(result).toBe('contentType:"application/json"')
      })
      it.concurrent('generates encoding with headers', () => {
        const result = makeEncoding({
          contentType: 'multipart/form-data',
          headers: { 'Content-Disposition': { schema: { type: 'string' } } },
        })
        expect(result).toBe(
          'contentType:"multipart/form-data",headers:{"Content-Disposition":{schema:z.string().exactOptional()}}',
        )
      })
      it.concurrent('generates encoding with nested encoding', () => {
        const result = makeEncoding({
          encoding: { nested: { contentType: 'text/plain' } },
        })
        expect(result).toBe('encoding:{"nested":{contentType:"text/plain"}}')
      })
      it.concurrent('generates encoding with prefixEncoding', () => {
        const result = makeEncoding({
          prefixEncoding: { contentType: 'application/octet-stream' },
        })
        expect(result).toBe('prefixEncoding:{contentType:"application/octet-stream"}')
      })
      it.concurrent('generates encoding with itemEncoding', () => {
        const result = makeEncoding({
          itemEncoding: { contentType: 'application/json' },
        })
        expect(result).toBe('itemEncoding:{contentType:"application/json"}')
      })
      it.concurrent('generates encoding with all fields', () => {
        const result = makeEncoding({
          contentType: 'multipart/form-data',
          headers: { 'X-Custom': { schema: { type: 'string' } } },
          encoding: { part: { contentType: 'text/plain' } },
          prefixEncoding: { contentType: 'text/csv' },
          itemEncoding: { contentType: 'application/xml' },
        })
        expect(result).toBe(
          'contentType:"multipart/form-data",headers:{"X-Custom":{schema:z.string().exactOptional()}},encoding:{"part":{contentType:"text/plain"}},prefixEncoding:{contentType:"text/csv"},itemEncoding:{contentType:"application/xml"}',
        )
      })
    })

    describe('makeParameters', () => {
      it.concurrent('groups parameters by location', () => {
        const result = makeParameters([
          { name: 'id', in: 'path', schema: { type: 'string' } },
          { name: 'page', in: 'query', schema: { type: 'integer' } },
        ])
        expect(result).toHaveProperty('path')
        expect(result).toHaveProperty('query')
        expect(result.path).toHaveProperty('id')
        expect(result.query).toHaveProperty('page')
      })
      it.concurrent('handles $ref parameters', () => {
        const result = makeParameters([
          {
            name: 'id',
            in: 'path',
            schema: { type: 'string' },
            $ref: '#/components/parameters/UserId',
          },
        ])
        expect(result.path.id).toBe('UserIdParamsSchema')
      })
      it.concurrent('applies coercion for query number parameters', () => {
        const result = makeParameters([{ name: 'page', in: 'query', schema: { type: 'number' } }])
        expect(result.query.page).toContain('z.coerce.')
      })
      it.concurrent('applies stringbool for query boolean parameters', () => {
        const result = makeParameters([
          { name: 'active', in: 'query', schema: { type: 'boolean' } },
        ])
        expect(result.query.active).toContain('stringbool')
      })
      it.concurrent('handles parameters with content instead of schema', () => {
        const result = makeParameters([
          {
            name: 'filter',
            in: 'query',
            content: { 'application/json': { schema: { type: 'object' } } },
            // biome-ignore lint: test
          } as any,
        ])
        expect(result.query.filter).toBe(
          'z.object({}).exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"object"}}}}})',
        )
      })
      it.concurrent('handles parameters without schema returns z.any()', () => {
        // biome-ignore lint: test
        const result = makeParameters([{ name: 'unknown', in: 'query' }] as any)
        expect(result.query.unknown).toBe('z.any()')
      })
      it.concurrent('applies coercion for query date parameters', () => {
        const result = makeParameters([{ name: 'date', in: 'query', schema: { type: 'date' } }])
        expect(result.query.date).toContain('z.coerce.')
      })
      it.concurrent('generates multiple parameters in same location with exact string output', () => {
        const result = makeParameters([
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
        ])
        expect(result.query.page).toBe(
          'z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})',
        )
        expect(result.query.limit).toBe(
          'z.int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}})',
        )
      })
      it.concurrent('generates path parameter with exact string output', () => {
        const result = makeParameters([{ name: 'userId', in: 'path', schema: { type: 'string' } }])
        expect(result.path.userId).toBe(
          'z.string().exactOptional().openapi({param:{"name":"userId","in":"path","schema":{"type":"string"}}})',
        )
      })
      it.concurrent('generates header parameter with exact string output', () => {
        const result = makeParameters([
          { name: 'Authorization', in: 'header', schema: { type: 'string' } },
        ])
        expect(result.header.Authorization).toBe(
          'z.string().exactOptional().openapi({param:{"name":"Authorization","in":"header","schema":{"type":"string"}}})',
        )
      })
      it.concurrent('generates cookie parameter with exact string output', () => {
        const result = makeParameters([
          { name: 'session_id', in: 'cookie', schema: { type: 'string' } },
        ])
        expect(result.cookie.session_id).toBe(
          'z.string().exactOptional().openapi({param:{"name":"session_id","in":"cookie","schema":{"type":"string"}}})',
        )
      })
    })

    describe('makeOperationResponses', () => {
      it.concurrent('generates responses with numeric status codes', () => {
        const result = makeOperationResponses({
          200: { description: 'Success' },
          404: { description: 'Not found' },
        })
        expect(result).toBe('{200:{description:"Success"},404:{description:"Not found"}}')
      })
      it.concurrent('generates responses with string status codes', () => {
        const result = makeOperationResponses({
          default: { description: 'Default response' },
        })
        expect(result).toBe(`{'default':{description:"Default response"}}`)
      })
      it.concurrent('generates responses with $ref', () => {
        const result = makeOperationResponses({
          200: { $ref: '#/components/responses/Success' },
        })
        expect(result).toBe('{200:SuccessResponse}')
      })
      it.concurrent('generates responses with mixed numeric and string status codes', () => {
        const result = makeOperationResponses({
          200: { description: 'Success' },
          default: { description: 'Error' },
        })
        expect(result).toBe(`{200:{description:"Success"},'default':{description:"Error"}}`)
      })
      it.concurrent('generates responses with 2XX status code pattern', () => {
        const result = makeOperationResponses({
          '2XX': { description: 'Success' },
        })
        expect(result).toBe(`{'2XX':{description:"Success"}}`)
      })
      it.concurrent('generates single response', () => {
        const result = makeOperationResponses({
          200: { description: 'OK' },
        })
        expect(result).toBe('{200:{description:"OK"}}')
      })
    })

    describe('makeHeaderResponses', () => {
      it.concurrent('generates header responses with schema', () => {
        const result = makeHeaderResponses({
          'X-Rate-Limit': { schema: { type: 'integer' } },
        })
        expect(result).toBe(`z.object({"X-Rate-Limit":{schema:z.int().exactOptional()}})`)
      })
      it.concurrent('generates header responses with $ref', () => {
        const result = makeHeaderResponses({
          'X-Custom': { $ref: '#/components/headers/CustomHeader' },
        })
        expect(result).toBe('z.object({"X-Custom":CustomHeaderHeaderSchema})')
      })
      it.concurrent('generates multiple header responses', () => {
        const result = makeHeaderResponses({
          'X-Rate-Limit': { schema: { type: 'integer' } },
          'X-Rate-Remaining': { schema: { type: 'integer' } },
          'X-Rate-Reset': { schema: { type: 'integer' } },
        })
        expect(result).toBe(
          `z.object({"X-Rate-Limit":{schema:z.int().exactOptional()},"X-Rate-Remaining":{schema:z.int().exactOptional()},"X-Rate-Reset":{schema:z.int().exactOptional()}})`,
        )
      })
      it.concurrent('generates header responses with mixed schema and $ref', () => {
        const result = makeHeaderResponses({
          'X-Rate-Limit': { schema: { type: 'integer' } },
          'X-Custom': { $ref: '#/components/headers/CustomHeader' },
        })
        expect(result).toBe(
          `z.object({"X-Rate-Limit":{schema:z.int().exactOptional()},"X-Custom":CustomHeaderHeaderSchema})`,
        )
      })
    })

    describe('makeHeadersAndReferences', () => {
      it.concurrent('generates header with description', () => {
        const result = makeHeadersAndReferences({
          description: 'Rate limit header',
          schema: { type: 'integer' },
        })
        expect(result).toBe(
          '{description:"Rate limit header",schema:z.int().exactOptional().openapi({description:"Rate limit header"})}',
        )
      })
      it.concurrent('generates header with $ref', () => {
        const result = makeHeadersAndReferences({
          $ref: '#/components/headers/RateLimit',
        })
        expect(result).toBe('RateLimitHeaderSchema')
      })
      it.concurrent('generates header with required and deprecated', () => {
        const result = makeHeadersAndReferences({
          required: true,
          deprecated: true,
          schema: { type: 'string' },
        })
        expect(result).toBe(
          '{required:true,deprecated:true,schema:z.string().openapi({deprecated:true})}',
        )
      })
      it.concurrent('generates header with example', () => {
        const result = makeHeadersAndReferences({
          schema: { type: 'string' },
          example: 'example-value',
        })
        expect(result).toBe(
          '{example:"example-value",schema:z.string().exactOptional().openapi({example:"example-value"})}',
        )
      })
      it.concurrent('generates header with examples', () => {
        const result = makeHeadersAndReferences({
          schema: { type: 'string' },
          examples: { sample: { value: 'sample-value' } },
        })
        expect(result).toBe(
          '{examples:{"sample":{value:"sample-value"}},schema:z.string().exactOptional().openapi({examples:{"sample":{value:"sample-value"}}})}',
        )
      })
      it.concurrent('generates header with style', () => {
        const result = makeHeadersAndReferences({
          schema: { type: 'array', items: [{ type: 'string' }] },
          style: 'simple',
        })
        expect(result).toBe(
          '{style:"simple",schema:z.array(z.string().exactOptional().openapi({style:"simple"})).exactOptional().openapi({style:"simple"})}',
        )
      })
      it.concurrent('generates header with explode', () => {
        const result = makeHeadersAndReferences({
          schema: { type: 'array', items: [{ type: 'string' }] },
          explode: true,
        })
        expect(result).toBe(
          '{explode:true,schema:z.array(z.string().exactOptional().openapi({explode:true})).exactOptional().openapi({explode:true})}',
        )
      })
      it.concurrent('generates header with content', () => {
        const result = makeHeadersAndReferences({
          content: { 'application/json': { schema: { type: 'object' } } },
        })
        expect(result).toBe(`{content:'application/json':{schema:z.object({})}}`)
      })
    })

    describe('makeRequest', () => {
      it.concurrent('generates request with parameters only', () => {
        const result = makeRequest(
          [{ name: 'id', in: 'path', schema: { type: 'string' } }],
          undefined,
        )
        expect(result).toBe(
          '{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})})}',
        )
      })
      it.concurrent('generates request with body only', () => {
        const result = makeRequest(undefined, {
          content: { 'application/json': { schema: { type: 'object' } } },
        })
        expect(result).toBe(`{body:{content:{'application/json':{schema:z.object({})}}}}`)
      })
      it.concurrent('generates request with both parameters and body', () => {
        const result = makeRequest([{ name: 'id', in: 'path', schema: { type: 'string' } }], {
          content: { 'application/json': { schema: { type: 'object' } } },
        })
        expect(result).toBe(
          `{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),body:{content:{'application/json':{schema:z.object({})}}}}`,
        )
      })
      it.concurrent('returns undefined for empty request', () => {
        const result = makeRequest(undefined, undefined)
        expect(result).toBeUndefined()
      })
      it.concurrent('returns undefined for empty parameters array', () => {
        const result = makeRequest([], undefined)
        expect(result).toBeUndefined()
      })
      it.concurrent('generates request with $ref body', () => {
        const result = makeRequest(undefined, {
          $ref: '#/components/requestBodies/UserBody',
        })
        expect(result).toBe('{body:UserBodyRequestBody}')
      })
      it.concurrent('generates request with query parameters', () => {
        const result = makeRequest(
          [{ name: 'page', in: 'query', schema: { type: 'integer' } }],
          undefined,
        )
        expect(result).toBe(
          '{query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})})}',
        )
      })
      it.concurrent('generates request with header parameters', () => {
        const result = makeRequest(
          [{ name: 'X-Api-Key', in: 'header', schema: { type: 'string' } }],
          undefined,
        )
        expect(result).toBe(
          `{headers:z.object({"X-Api-Key":z.string().exactOptional().openapi({param:{"name":"X-Api-Key","in":"header","schema":{"type":"string"}}})})}`,
        )
      })
      it.concurrent('generates request with multiple parameter types', () => {
        const result = makeRequest(
          [
            { name: 'id', in: 'path', schema: { type: 'string' } },
            { name: 'page', in: 'query', schema: { type: 'integer' } },
          ],
          undefined,
        )
        expect(result).toBe(
          '{params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})})}',
        )
      })
    })

    describe('makeRequestParams', () => {
      it.concurrent('generates params for path parameter', () => {
        const result = makeRequestParams([{ name: 'id', in: 'path', schema: { type: 'string' } }])
        expect(result).toBe(
          'params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})})',
        )
      })
      it.concurrent('generates query for query parameter', () => {
        const result = makeRequestParams([
          { name: 'page', in: 'query', schema: { type: 'integer' } },
        ])
        expect(result).toBe(
          'query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})})',
        )
      })
      it.concurrent('generates header for header parameter', () => {
        const result = makeRequestParams([
          { name: 'X-Token', in: 'header', schema: { type: 'string' } },
        ])
        expect(result).toBe(
          `headers:z.object({"X-Token":z.string().exactOptional().openapi({param:{"name":"X-Token","in":"header","schema":{"type":"string"}}})})`,
        )
      })
      it.concurrent('generates cookie for cookie parameter', () => {
        const result = makeRequestParams([
          { name: 'session', in: 'cookie', schema: { type: 'string' } },
        ])
        expect(result).toBe(
          'cookies:z.object({session:z.string().exactOptional().openapi({param:{"name":"session","in":"cookie","schema":{"type":"string"}}})})',
        )
      })
      it.concurrent('returns undefined for empty parameters', () => {
        const result = makeRequestParams([])
        expect(result).toBeUndefined()
      })
      it.concurrent('generates multiple parameter types combined', () => {
        const result = makeRequestParams([
          { name: 'id', in: 'path', schema: { type: 'string' } },
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'Authorization', in: 'header', schema: { type: 'string' } },
        ])
        expect(result).toBe(
          'params:z.object({id:z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})}),query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}})}),headers:z.object({Authorization:z.string().exactOptional().openapi({param:{"name":"Authorization","in":"header","schema":{"type":"string"}}})})',
        )
      })
      it.concurrent('generates multiple query parameters', () => {
        const result = makeRequestParams([
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'sort', in: 'query', schema: { type: 'string' } },
        ])
        expect(result).toBe(
          'query:z.object({page:z.int().exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"}}}),limit:z.int().exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"}}}),sort:z.string().exactOptional().openapi({param:{"name":"sort","in":"query","schema":{"type":"string"}}})})',
        )
      })
    })

    describe('makeCallbacks', () => {
      it.concurrent('generates callback with $ref', () => {
        const result = makeCallbacks({
          onEvent: { $ref: '#/components/callbacks/EventCallback' },
        })
        expect(result).toBe('"onEvent":EventCallback')
      })
      it.concurrent('generates callback with operation', () => {
        const result = makeCallbacks({
          '{$request.body#/callbackUrl}': {
            post: {
              responses: {
                200: { description: 'Success' },
              },
            },
          },
        })
        expect(result).toBe(
          '"{$request.body#/callbackUrl}":{post:{responses:{200:{description:"Success"}}}}',
        )
      })
      it.concurrent('generates callback with full operation details', () => {
        const result = makeCallbacks({
          '{$request.body#/callbackUrl}': {
            post: {
              tags: ['callback'],
              summary: 'Callback summary',
              description: 'Callback description',
              operationId: 'callbackOp',
              requestBody: {
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              responses: {
                200: { description: 'Success' },
              },
              deprecated: true,
            },
          },
        })
        expect(result).toBe(
          `"{$request.body#/callbackUrl}":{post:{tags:["callback"],summary:"Callback summary",description:"Callback description",operationId:"callbackOp",requestBody:{content:{'application/json':{schema:z.object({})}}},responses:{200:{description:"Success"}},deprecated:true}}`,
        )
      })
      it.concurrent('generates callback with multiple methods', () => {
        const result = makeCallbacks({
          '{$callback}': {
            get: {
              responses: { 200: { description: 'Get success' } },
            },
            post: {
              responses: { 201: { description: 'Post success' } },
            },
          },
        })
        expect(result).toBe(
          '"{$callback}":{get:{responses:{200:{description:"Get success"}}},post:{responses:{201:{description:"Post success"}}}}',
        )
      })
      it.concurrent('generates callback with parameters', () => {
        const result = makeCallbacks({
          '{$request.body#/url}': {
            post: {
              parameters: [{ name: 'id', in: 'path', schema: { type: 'string' } }],
              responses: { 200: { description: 'Success' } },
            },
          },
        })
        expect(result).toBe(
          '"{$request.body#/url}":{post:{parameters:[z.string().exactOptional().openapi({param:{"name":"id","in":"path","schema":{"type":"string"}}})],responses:{200:{description:"Success"}}}}',
        )
      })
      it.concurrent('generates callback with external docs', () => {
        const result = makeCallbacks({
          '{$callback}': {
            get: {
              externalDocs: { url: 'https://example.com/docs' },
              responses: { 200: { description: 'Success' } },
            },
          },
        })
        expect(result).toBe(
          '"{$callback}":{get:{externalDocs:{"url":"https://example.com/docs"},responses:{200:{description:"Success"}}}}',
        )
      })
      it.concurrent('generates callback with servers', () => {
        const result = makeCallbacks({
          '{$callback}': {
            post: {
              servers: [{ url: 'https://api.example.com' }],
              responses: { 200: { description: 'Success' } },
            },
          },
        })
        expect(result).toBe(
          '"{$callback}":{post:{responses:{200:{description:"Success"}},servers:[{"url":"https://api.example.com"}]}}',
        )
      })
      it.concurrent('generates multiple callbacks', () => {
        const result = makeCallbacks({
          onSuccess: { $ref: '#/components/callbacks/SuccessCallback' },
          onError: { $ref: '#/components/callbacks/ErrorCallback' },
        })
        expect(result).toBe('"onSuccess":SuccessCallback,"onError":ErrorCallback')
      })
    })

    describe('makeOperationCallbacks', () => {
      it.concurrent('returns undefined for undefined callbacks', () => {
        const result = makeOperationCallbacks(undefined)
        expect(result).toBeUndefined()
      })
      it.concurrent('generates operation callback with $ref', () => {
        const result = makeOperationCallbacks({
          onEvent: { $ref: '#/components/callbacks/EventCallback' },
        })
        expect(result).toBe('{"onEvent":EventCallback}')
      })
      it.concurrent('generates operation callback with summary and description', () => {
        const result = makeOperationCallbacks({
          onEvent: { summary: 'Event callback', description: 'Handles events' },
        })
        expect(result).toBe('{"onEvent":{summary:"Event callback",description:"Handles events"}}')
      })
      it.concurrent('generates operation callback with summary only', () => {
        const result = makeOperationCallbacks({
          onEvent: { summary: 'Event summary' },
        })
        expect(result).toBe('{"onEvent":{summary:"Event summary"}}')
      })
      it.concurrent('generates operation callback with description only', () => {
        const result = makeOperationCallbacks({
          onEvent: { description: 'Event description' },
        })
        expect(result).toBe('{"onEvent":{description:"Event description"}}')
      })
      it.concurrent('generates multiple operation callbacks', () => {
        const result = makeOperationCallbacks({
          onSuccess: { summary: 'Success' },
          onError: { summary: 'Error' },
        })
        expect(result).toBe('{"onSuccess":{summary:"Success"},"onError":{summary:"Error"}}')
      })
    })
  })
}
