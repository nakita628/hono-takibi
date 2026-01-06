import { createRoute, z } from '@hono/zod-openapi'

const ResponseSchema = z
  .object({ data: z.object({}).exactOptional(), meta: z.object({}).exactOptional() })
  .openapi('Response')

const JsonApiResponseSchema = z
  .object({
    data: z.xor([z.object({}), z.array(z.object({}))]).exactOptional(),
    included: z.array(z.object({})).exactOptional(),
    meta: z.object({}).exactOptional(),
    links: z.object({}).exactOptional(),
    jsonapi: z.object({ version: z.string().exactOptional() }).exactOptional(),
  })
  .openapi('JsonApiResponse')

const HalResponseSchema = z
  .object({
    _links: z
      .object({ self: z.object({ href: z.string().exactOptional() }).exactOptional() })
      .exactOptional(),
    _embedded: z.object({}).exactOptional(),
  })
  .openapi('HalResponse')

const ProblemResponseSchema = z
  .object({
    type: z.url().exactOptional(),
    title: z.string().exactOptional(),
    status: z.int().exactOptional(),
    detail: z.string().exactOptional(),
    instance: z.url().exactOptional(),
  })
  .openapi('ProblemResponse')

const StreamItemSchema = z
  .object({
    id: z.string().exactOptional(),
    data: z.object({}).exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
  })
  .openapi('StreamItem')

const EncodedContentSchema = z
  .object({
    plainText: z.string().exactOptional(),
    base64: z.string().exactOptional(),
    quotedPrintable: z
      .string()
      .exactOptional()
      .openapi({ description: 'Quoted-printable encoded' }),
    hexEncoded: z
      .string()
      .regex(/^[0-9a-fA-F]+$/)
      .exactOptional(),
    urlEncoded: z.string().exactOptional().openapi({ description: 'URL encoded string' }),
    htmlEncoded: z.string().exactOptional().openapi({ description: 'HTML entity encoded' }),
    jsonEscaped: z.string().exactOptional().openapi({ description: 'JSON escaped string' }),
    unicodeEscaped: z
      .string()
      .exactOptional()
      .openapi({ description: 'Unicode escaped (\\uXXXX)' }),
  })
  .openapi('EncodedContent')

export const postEncodingTestRoute = createRoute({
  method: 'post',
  path: '/encoding-test',
  operationId: 'testEncoding',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            simpleString: z.string().exactOptional(),
            arrayExplode: z.array(z.string()).exactOptional(),
            arrayNoExplode: z.array(z.string()).exactOptional(),
            objectForm: z
              .object({ key1: z.string().exactOptional(), key2: z.int().exactOptional() })
              .exactOptional(),
            objectDeepObject: z
              .object({ nested: z.object({ deep: z.string().exactOptional() }).exactOptional() })
              .exactOptional(),
            imageFile: z.file().exactOptional(),
            documentFile: z.file().exactOptional(),
            jsonString: z.object({ data: z.string().exactOptional() }).exactOptional(),
            base64Data: z.string().exactOptional(),
            multipleFiles: z.array(z.file()).exactOptional(),
            complexNested: z
              .object({
                level1: z
                  .object({
                    level2: z
                      .object({
                        value: z.string().exactOptional(),
                        array: z.array(z.int()).exactOptional(),
                      })
                      .exactOptional(),
                  })
                  .exactOptional(),
              })
              .exactOptional(),
            arrayOfObjects: z
              .array(z.object({ id: z.int().exactOptional(), name: z.string().exactOptional() }))
              .exactOptional(),
            partWithHeaders: z.string().exactOptional(),
          }),
          encoding: {
            simpleString: { contentType: 'text/plain' },
            arrayExplode: {},
            arrayNoExplode: {},
            objectForm: {},
            objectDeepObject: {},
            imageFile: { contentType: 'image/png, image/jpeg, image/gif, image/webp' },
            documentFile: {
              contentType:
                'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain',
            },
            jsonString: { contentType: 'application/json' },
            base64Data: { contentType: 'application/octet-stream' },
            multipleFiles: { contentType: 'application/octet-stream' },
            complexNested: { contentType: 'application/json' },
            arrayOfObjects: { contentType: 'application/json' },
            partWithHeaders: {
              contentType: 'text/plain',
              headers: {
                'X-Custom-Header': { schema: z.string().exactOptional() },
                'Content-Disposition': { schema: z.string().exactOptional() },
                'X-Part-Index': { schema: z.int().exactOptional() },
              },
            },
          },
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getContentNegotiationRoute = createRoute({
  method: 'get',
  path: '/content-negotiation',
  operationId: 'getWithContentNegotiation',
  request: {
    headers: z.object({
      Accept: z
        .string()
        .default('application/json')
        .exactOptional()
        .openapi({
          param: {
            name: 'Accept',
            in: 'header',
            required: false,
            schema: { type: 'string', default: 'application/json' },
          },
        }),
      'Accept-Language': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Accept-Language', in: 'header', schema: { type: 'string' } } }),
      'Accept-Encoding': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Accept-Encoding', in: 'header', schema: { type: 'string' } } }),
      'Accept-Charset': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Accept-Charset', in: 'header', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'Content based on Accept header',
      content: {
        'application/json': { schema: ResponseSchema },
        'application/xml': { schema: ResponseSchema },
        'application/yaml': { schema: ResponseSchema },
        'text/plain': { schema: z.string() },
        'text/html': { schema: z.string() },
        'text/csv': { schema: z.string() },
        'application/pdf': { schema: z.file() },
        'application/vnd.api+json': { schema: JsonApiResponseSchema },
        'application/hal+json': { schema: HalResponseSchema },
        'application/problem+json': { schema: ProblemResponseSchema },
      },
    },
  },
})

export const postBinaryVariationsRoute = createRoute({
  method: 'post',
  path: '/binary-variations',
  operationId: 'postBinaryVariations',
  request: {
    body: {
      content: {
        'application/octet-stream': { schema: z.file() },
        'application/json': {
          schema: z.object({
            data: z.string().exactOptional().openapi({ description: 'Base64 encoded binary data' }),
            filename: z.string().exactOptional(),
            mimeType: z.string().exactOptional(),
          }),
        },
        'multipart/mixed': {
          schema: z.object({
            part1: z.file().exactOptional(),
            part2: z.file().exactOptional(),
            part3: z.file().exactOptional(),
          }),
        },
        'image/png': { schema: z.file() },
        'image/jpeg': { schema: z.file() },
        'image/gif': { schema: z.file() },
        'image/webp': { schema: z.file() },
        'image/svg+xml': { schema: z.string() },
        'audio/mpeg': { schema: z.file() },
        'audio/ogg': { schema: z.file() },
        'audio/wav': { schema: z.file() },
        'video/mp4': { schema: z.file() },
        'video/webm': { schema: z.file() },
        'application/zip': { schema: z.file() },
        'application/gzip': { schema: z.file() },
        'application/x-tar': { schema: z.file() },
        'application/x-7z-compressed': { schema: z.file() },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getStreamingRoute = createRoute({
  method: 'get',
  path: '/streaming',
  operationId: 'getStreaming',
  responses: {
    200: {
      description: 'Streaming response',
      content: {
        'text/event-stream': {
          schema: z
            .string()
            .openapi({ description: 'SSE format:\nevent: message\ndata: {"key": "value"}\n' }),
        },
        'application/x-ndjson': {
          schema: z.string().openapi({ description: 'Newline-delimited JSON objects' }),
        },
        'application/json': { schema: z.array(StreamItemSchema) },
      },
    },
  },
})

export const postStreamingRoute = createRoute({
  method: 'post',
  path: '/streaming',
  operationId: 'postStreaming',
  request: {
    body: {
      content: {
        'application/x-ndjson': { schema: z.string() },
        'application/octet-stream': { schema: z.file() },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postUrlEncodedComplexRoute = createRoute({
  method: 'post',
  path: '/url-encoded-complex',
  operationId: 'postUrlEncodedComplex',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z.object({
            string: z.string().exactOptional(),
            number: z.number().exactOptional(),
            boolean: z.boolean().exactOptional(),
            arrayDefault: z.array(z.string()).exactOptional(),
            arrayExplode: z.array(z.int()).exactOptional(),
            nested: z
              .object({
                key1: z.string().exactOptional(),
                key2: z.object({ subkey: z.string().exactOptional() }).exactOptional(),
              })
              .exactOptional(),
            specialChars: z
              .string()
              .exactOptional()
              .openapi({ description: 'Should handle & = ? % + space etc.' }),
            unicode: z.string().exactOptional(),
            emptyString: z.string().exactOptional(),
            multiValue: z.array(z.string()).exactOptional(),
          }),
          encoding: { arrayDefault: {}, arrayExplode: {}, nested: {} },
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getResponseEncodingRoute = createRoute({
  method: 'get',
  path: '/response-encoding',
  operationId: 'getResponseEncoding',
  responses: {
    200: {
      description: 'Response with various encodings',
      headers: z.object({
        'Content-Encoding': {
          schema: z.enum(['gzip', 'deflate', 'br', 'identity']).exactOptional(),
        },
        'Content-Type': { schema: z.string().exactOptional() },
        'Content-Language': { schema: z.string().exactOptional() },
        'Content-Disposition': { schema: z.string().exactOptional() },
        'Transfer-Encoding': { schema: z.string().exactOptional() },
        Vary: { schema: z.string().exactOptional() },
      }),
      content: { 'application/json': { schema: ResponseSchema } },
    },
  },
})

export const postSchemaEncodingRoute = createRoute({
  method: 'post',
  path: '/schema-encoding',
  operationId: 'postSchemaEncoding',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            base64Field: z.string().exactOptional(),
            base64urlField: z.string().exactOptional(),
            jsonString: z.string().exactOptional(),
            xmlString: z.string().exactOptional(),
            embeddedJson: z.string().exactOptional(),
            binaryData: z.string().exactOptional(),
            imageData: z.string().exactOptional(),
          }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})
