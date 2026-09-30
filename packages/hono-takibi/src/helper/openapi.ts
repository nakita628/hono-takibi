// oxlint-disable-next-line import/no-cycle -- zodToOpenAPI and the openapi code helpers compose in both directions
import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import {
  isMedia,
  isOperation,
  isParameter,
  isRecord,
  isRefObject,
  isResponses,
} from '../guard/index.js'
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
import {
  inlineWireRefs,
  isEmptyAbsent,
  isInheritedName,
  isObjectParameter,
  WIRE_FORM,
  wireGather,
  wireObject,
} from './wire.js'

export function makeRef($ref: string) {
  const COMPONENT_SUFFIX_MAP: readonly {
    readonly prefix: string
    readonly suffix: string
  }[] = [
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
  const propertiesMatch = $ref.match(/^#\/components\/schemas\/([^/]+)\/properties\/(.+)$/u)
  if (propertiesMatch) {
    const parentSchema = toIdentifierPascalCase(
      ensureSuffix(decodeURIComponent(propertiesMatch[1]), 'Schema'),
    )
    return `z.lazy(()=>${parentSchema})`
  }
  const rawRef = $ref.split('/').at(-1)
  if (!rawRef) return 'Schema'
  const decodedRef = decodeURIComponent(rawRef)
  const match = COMPONENT_SUFFIX_MAP.find(({ prefix }) => $ref.startsWith(prefix))
  return toIdentifierPascalCase(ensureSuffix(decodedRef, match?.suffix ?? 'Schema'))
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
  const result = Object.entries(responses)
    .map(([statusCode, res]) => {
      if (!isResponses(res)) return undefined
      return `${/^\d+$/u.test(statusCode) ? statusCode : `'${statusCode}'`}:${makeResponses(res, readonly)}`
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
    // OpenAPI 3.0 §Response Object: description is REQUIRED
    `description:${JSON.stringify(responses.description ?? '')}`,
    // Keys follow `openapi/index.ts` `Responses` declaration order: content before headers.
    responses.content
      ? `content:{${makeContent(responses.content, readonly).join(',')}}`
      : undefined,
    responses.headers ? `headers:${makeHeaderResponses(responses.headers, readonly)}` : undefined,
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
    headers.description !== undefined
      ? `description:${JSON.stringify(headers.description)}`
      : undefined,
    'required' in headers && headers.required
      ? `required:${JSON.stringify(headers.required)}`
      : undefined,
    'deprecated' in headers && headers.deprecated
      ? `deprecated:${JSON.stringify(headers.deprecated)}`
      : undefined,
    // OpenAPI 3.2 §4.8.10.1: `example` may be any JSON value (incl. 0/false/"")
    'example' in headers && headers.example !== undefined
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
      ? `schema:${zodToOpenAPI(headers.schema, { headers }, readonly === true ? { readonly: true } : undefined)}`
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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

export function makeCallback(callback: Callbacks) {
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
) {
  const methods = [
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace',
    'query',
  ] as const
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
      if (isRefObject(pathItem)) {
        return `${JSON.stringify(callbackKey)}:${makeRef(pathItem.$ref)}`
      }
      if (!isRecord(pathItem)) return undefined
      const pathItemCode = makeMethodsCode(pathItem)
      if (pathItemCode) {
        return `${JSON.stringify(callbackKey)}:{${pathItemCode}}`
      }
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
  // Set for the content of a request body, whose form media types arrive as text.
  request?: { readonly schemas?: { readonly [k: string]: Schema } },
) {
  return Object.freeze(
    Object.entries(content)
      .map(([contentType, mediaOrRef]) => {
        // RFC 6838 + RFC 7231 §3.1.1.1; fall back to JSON.stringify otherwise.
        const key = /^[A-Za-z0-9!#$&^_+\-./*;= ]+$/u.test(contentType)
          ? `'${contentType}'`
          : JSON.stringify(contentType)
        if (isRefObject(mediaOrRef)) {
          // A `components.mediaTypes` constant is the body schema, not a Media Type Object.
          return mediaOrRef.$ref.startsWith('#/components/mediaTypes/')
            ? `${key}:{schema:${makeRef(mediaOrRef.$ref)}}`
            : `${key}:${makeRef(mediaOrRef.$ref)}`
        }
        if (isMedia(mediaOrRef)) {
          const mediaType = contentType.toLowerCase()
          const isForm =
            request !== undefined &&
            (mediaType.startsWith('application/x-www-form-urlencoded') ||
              mediaType.startsWith('multipart/form-data'))
          return `${key}:${makeMedia(mediaOrRef, readonly, isForm ? request : undefined)}`
        }
        return undefined
      })
      .filter((v) => v !== undefined),
  )
}

export function makeRequestBody(
  body: RequestBody | Reference,
  readonly?: boolean,
  schemas?: { readonly [k: string]: Schema },
) {
  if ('$ref' in body && body.$ref) {
    return makeRef(body.$ref)
  }
  const result = [
    body.description !== undefined ? `description:${JSON.stringify(body.description)}` : undefined,
    'content' in body && body.content
      ? `content:{${makeContent(body.content, readonly, schemas === undefined ? {} : { schemas }).join(',')}}`
      : undefined,
    'required' in body && body.required ? `required:${JSON.stringify(body.required)}` : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return `{${result}}`
}

/**
 * `form` is set for a form media type of a request body (`application/x-www-form-urlencoded`,
 * `multipart/form-data`). Every field of a form arrives as text — or as a file — so its
 * schema reads text where a JSON body is already typed.
 */
export function makeMedia(
  media: Media,
  readonly?: boolean,
  form?: { readonly schemas?: { readonly [k: string]: Schema } },
) {
  const schemaOptions = {
    ...(readonly === true ? { readonly: true } : {}),
    ...(form === undefined ? {} : { coerce: true, form: true }),
    ...(form?.schemas === undefined ? {} : { schemas: form.schemas }),
  }
  const encodingCode = media.encoding
    ? Object.entries(media.encoding)
        .map(([name, encoding]) => `${JSON.stringify(name)}:{${makeEncoding(encoding, readonly)}}`)
        .join(',')
    : undefined
  const result = [
    media.schema
      ? `schema:${zodToOpenAPI(media.schema, undefined, Object.keys(schemaOptions).length > 0 ? schemaOptions : undefined)}`
      : undefined,
    media.itemSchema
      ? `itemSchema:${zodToOpenAPI(media.itemSchema, undefined, readonly === true ? { readonly: true } : undefined)}`
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
        // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
  parameters: readonly (Parameter | Reference)[] | undefined,
  requestBody: RequestBody | Reference | undefined,
  readonly?: boolean,
  schemas?: { readonly [k: string]: Schema },
) {
  const result = [
    parameters && parameters.length > 0
      ? makeRequestParams(parameters, readonly, schemas)
      : undefined,
    (requestBody && '$ref' in requestBody && requestBody.$ref) ||
    (requestBody && 'content' in requestBody && requestBody.content)
      ? `body:${makeRequestBody(requestBody, readonly, schemas)}`
      : undefined,
  ]
    .filter((v) => v !== undefined)
    .join(',')
  return result.length > 0 ? `{${result}}` : undefined
}

/**
 * Says so when a path cannot be routed. A path template may hold several parameters in one
 * segment (`/files/{name}.{ext}`) or a parameter beside text (`/v{version}`), and Hono reads
 * a parameter as a whole segment: the route is registered and never matches.
 */
export function warnUnroutablePath(path: string): void {
  const segments = path
    .split('/')
    .filter((segment) => segment.includes('{') && !/^\{[^{}]+\}$/u.test(segment))
  if (segments.length === 0) return
  // oxlint-disable-next-line no-console -- warns the user that the route never matches
  console.warn(
    `path "${path}" never matches a request: ${segments.map((segment) => `"${segment}"`).join(', ')} holds a parameter that is not a whole segment, which Hono does not route. Give each parameter a segment of its own.`,
  )
}

/**
 * The Zod schema for one parameter's value. A path, query, header or cookie value reaches
 * the handler as text, so whatever is not a string is read from text before it validates
 * (the emitter's `coerce` option); only a request body arrives already typed.
 *
 * `schemas` are the document's component schemas. A parameter that names one by `$ref`
 * needs them: the component was emitted for a typed value, and what it has to be read as
 * is only known from its definition.
 */
export function makeParameterSchema(
  param: Parameter,
  readonly?: boolean,
  schemas?: { readonly [k: string]: Schema },
): string {
  if (param.schema === undefined) {
    // A parameter without a schema carries it under its first `content` media type, and
    // its value is one encoded document. JSON is decoded and then validated as typed.
    const [mediaType, media] = Object.entries(param.content ?? {})[0] ?? []
    if (mediaType === undefined || media?.schema === undefined) return 'z.any()'
    const isJson = mediaType.toLowerCase().includes('json')
    // A form-encoded document comes apart into fields of text, read like those of a form
    // body.
    const isForm = mediaType.toLowerCase().includes('x-www-form-urlencoded')
    return zodToOpenAPI(
      media.schema,
      { parameters: param },
      {
        ...(isJson ? { json: true } : { coerce: true }),
        ...(isForm ? { form: true, readers: [WIRE_FORM] } : {}),
        ...(readonly === true ? { readonly: true } : {}),
        ...(schemas === undefined ? {} : { schemas }),
      },
    )
  }
  // An object is spread over the request in a way that depends on where it is sent, and
  // the generated schema gathers it. What it cannot gather, it says so, instead of emitting
  // a schema that silently never sees the parameter.
  const object = wireObject(param, schemas)
  if (object === undefined && isObjectParameter(param, schemas)) {
    // oxlint-disable-next-line no-console -- warns the user that the parameter is never read
    console.warn(
      `parameter "${param.name}" (in: ${param.in}) is an object the generated schema does not read: it declares no properties, so its keys cannot be told from those of other parameters. Declare each property as a parameter of its own, or send the object as \`content: application/json\`.`,
    )
  }
  const readers = object?.reader === undefined ? [] : [object.reader]
  return zodToOpenAPI(
    param.schema,
    { parameters: { ...param, schema: inlineWireRefs(param.schema, schemas) } },
    {
      coerce: true,
      // The properties of an object arrive like the fields of a form: one sent once is a
      // bare string, and nothing but the schema describes them.
      ...(object === undefined ? {} : { form: true }),
      ...(readers.length === 0 ? {} : { readers }),
      ...(isEmptyAbsent(param, schemas) ? { emptyAbsent: true } : {}),
      ...(isInheritedName(param) ? { inheritedAbsent: true } : {}),
      ...(readonly === true ? { readonly: true } : {}),
      ...(schemas === undefined ? {} : { schemas }),
    },
  )
}

/* oxlint-disable no-param-reassign -- the reduce accumulator is a fresh object owned by this call */
export function makeParameters(
  parameters: readonly (Parameter | Reference)[],
  readonly?: boolean,
  schemas?: { readonly [k: string]: Schema },
): {
  readonly [section: string]: { readonly [k: string]: string }
} {
  return parameters.reduce((acc: { [section: string]: { [k: string]: string } }, param) => {
    if (!('in' in param)) return acc
    if (!acc[param.in]) acc[param.in] = {}
    if (param.name === '__proto__') {
      // oxlint-disable-next-line no-console -- warns the user that the parameter is never read
      console.warn(
        `parameter "__proto__" (in: ${param.in}) is never read: Zod leaves a key of that name out of every object it parses, so that a request cannot reach the prototype. Give the parameter another name.`,
      )
    }
    acc[param.in][makeSafeKey(param.name)] = param.$ref
      ? makeRef(param.$ref)
      : makeParameterSchema(param, readonly, schemas)
    return acc
  }, {})
}
/* oxlint-enable no-param-reassign */

export function makeRequestParams(
  parameters: readonly (Parameter | Reference)[],
  readonly?: boolean,
  schemas?: { readonly [k: string]: Schema },
) {
  const paramsObject = makeParameters(parameters, readonly, schemas)
  // `filter[name]=bob` and an exploded `name=bob` are keys of the query, or of the cookies,
  // not of the parameter they belong to, so they are gathered before the section is
  // validated.
  const gatherIn = (section: 'query' | 'cookie') => {
    const declared = parameters.filter((param) => 'in' in param && param.in === section)
    const objects = declared
      .map((param) => ('in' in param ? wireObject(param, schemas) : undefined))
      .filter((object) => object !== undefined)
    return wireGather(
      objects,
      declared.flatMap((param) =>
        'name' in param && !objects.some((object) => object.name === param.name)
          ? [param.name]
          : [],
      ),
    )
  }
  const query = gatherIn('query')
  const cookie = gatherIn('cookie')
  const paramsArray = requestParamsArray(paramsObject, {
    ...(query === undefined ? {} : { query }),
    ...(cookie === undefined ? {} : { cookie }),
  })
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
      return zodToOpenAPI(
        param.schema,
        { parameters: param },
        readonly === true ? { readonly: true } : undefined,
      )
    }
    return JSON.stringify(param)
  })
  return `[${items.join(',')}]`
}

export function makeOperation(operation: Operation, readonly?: boolean) {
  const result = [
    operation.tags ? `tags:${JSON.stringify(operation.tags)}` : undefined,
    operation.summary !== undefined ? `summary:${JSON.stringify(operation.summary)}` : undefined,
    operation.description !== undefined
      ? `description:${JSON.stringify(operation.description)}`
      : undefined,
    operation.externalDocs ? `externalDocs:${JSON.stringify(operation.externalDocs)}` : undefined,
    operation.operationId !== undefined
      ? `operationId:${JSON.stringify(operation.operationId)}`
      : undefined,
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
        .map(
          ([operationName, operation]) =>
            `${JSON.stringify(operationName)}:${makeOperation(operation)}`,
        )
        .join(',')
    : undefined
  const results = [
    pathItem.$ref ? `$ref:${makeRef(pathItem.$ref)}` : undefined,
    pathItem.summary !== undefined ? `summary:${JSON.stringify(pathItem.summary)}` : undefined,
    pathItem.description !== undefined
      ? `description:${JSON.stringify(pathItem.description)}`
      : undefined,
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
