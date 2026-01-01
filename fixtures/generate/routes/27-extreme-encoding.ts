import { createRoute, z } from '@hono/zod-openapi'

const ResponseSchema = z
  .object({
    data: z.object({}).openapi({ type: 'object' }),
    meta: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({ type: 'object', properties: { data: { type: 'object' }, meta: { type: 'object' } } })
  .openapi('Response')

const JsonApiResponseSchema = z
  .object({
    data: z
      .union([
        z.object({}).openapi({ type: 'object' }),
        z
          .array(z.object({}).openapi({ type: 'object' }))
          .optional()
          .openapi({ type: 'array', items: { type: 'object' } }),
      ])
      .optional()
      .openapi({ oneOf: [{ type: 'object' }, { type: 'array', items: { type: 'object' } }] }),
    included: z
      .array(z.object({}).openapi({ type: 'object' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'object' } }),
    meta: z.object({}).openapi({ type: 'object' }),
    links: z.object({}).openapi({ type: 'object' }),
    jsonapi: z
      .object({ version: z.string().openapi({ type: 'string' }) })
      .partial()
      .openapi({ type: 'object', properties: { version: { type: 'string' } } }),
  })
  .openapi({
    type: 'object',
    properties: {
      data: { oneOf: [{ type: 'object' }, { type: 'array', items: { type: 'object' } }] },
      included: { type: 'array', items: { type: 'object' } },
      meta: { type: 'object' },
      links: { type: 'object' },
      jsonapi: { type: 'object', properties: { version: { type: 'string' } } },
    },
  })
  .openapi('JsonApiResponse')

const HalResponseSchema = z
  .object({
    _links: z
      .object({
        self: z
          .object({ href: z.string().openapi({ type: 'string' }) })
          .partial()
          .openapi({ type: 'object', properties: { href: { type: 'string' } } }),
      })
      .openapi({
        type: 'object',
        properties: { self: { type: 'object', properties: { href: { type: 'string' } } } },
      }),
    _embedded: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      _links: {
        type: 'object',
        properties: { self: { type: 'object', properties: { href: { type: 'string' } } } },
      },
      _embedded: { type: 'object' },
    },
  })
  .openapi('HalResponse')

const ProblemResponseSchema = z
  .object({
    type: z.url().openapi({ type: 'string', format: 'uri' }),
    title: z.string().openapi({ type: 'string' }),
    status: z.int().openapi({ type: 'integer' }),
    detail: z.string().openapi({ type: 'string' }),
    instance: z.url().openapi({ type: 'string', format: 'uri' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', format: 'uri' },
      title: { type: 'string' },
      status: { type: 'integer' },
      detail: { type: 'string' },
      instance: { type: 'string', format: 'uri' },
    },
  })
  .openapi('ProblemResponse')

const StreamItemSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    data: z.object({}).openapi({ type: 'object' }),
    timestamp: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      data: { type: 'object' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('StreamItem')

const EncodedContentSchema = z
  .object({
    plainText: z.string().openapi({ type: 'string' }),
    base64: z.string().openapi({ type: 'string', contentEncoding: 'base64' }),
    quotedPrintable: z
      .string()
      .openapi({ type: 'string', description: 'Quoted-printable encoded' }),
    hexEncoded: z
      .string()
      .regex(/^[0-9a-fA-F]+$/)
      .openapi({ type: 'string', pattern: '^[0-9a-fA-F]+$' }),
    urlEncoded: z.string().openapi({ type: 'string', description: 'URL encoded string' }),
    htmlEncoded: z.string().openapi({ type: 'string', description: 'HTML entity encoded' }),
    jsonEscaped: z.string().openapi({ type: 'string', description: 'JSON escaped string' }),
    unicodeEscaped: z
      .string()
      .openapi({ type: 'string', description: 'Unicode escaped (\\uXXXX)' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      plainText: { type: 'string' },
      base64: { type: 'string', contentEncoding: 'base64' },
      quotedPrintable: { type: 'string', description: 'Quoted-printable encoded' },
      hexEncoded: { type: 'string', pattern: '^[0-9a-fA-F]+$' },
      urlEncoded: { type: 'string', description: 'URL encoded string' },
      htmlEncoded: { type: 'string', description: 'HTML entity encoded' },
      jsonEscaped: { type: 'string', description: 'JSON escaped string' },
      unicodeEscaped: { type: 'string', description: 'Unicode escaped (\\uXXXX)' },
    },
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
          schema: z
            .object({
              simpleString: z.string().optional().openapi({ type: 'string' }),
              arrayExplode: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              arrayNoExplode: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              objectForm: z
                .object({
                  key1: z.string().openapi({ type: 'string' }),
                  key2: z.int().openapi({ type: 'integer' }),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: { key1: { type: 'string' }, key2: { type: 'integer' } },
                }),
              objectDeepObject: z
                .object({
                  nested: z
                    .object({ deep: z.string().openapi({ type: 'string' }) })
                    .partial()
                    .openapi({ type: 'object', properties: { deep: { type: 'string' } } }),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    nested: { type: 'object', properties: { deep: { type: 'string' } } },
                  },
                }),
              imageFile: z.file().optional().openapi({ type: 'string', format: 'binary' }),
              documentFile: z.file().optional().openapi({ type: 'string', format: 'binary' }),
              jsonString: z
                .object({ data: z.string().openapi({ type: 'string' }) })
                .partial()
                .openapi({ type: 'object', properties: { data: { type: 'string' } } }),
              base64Data: z.string().optional().openapi({ type: 'string', format: 'byte' }),
              multipleFiles: z
                .array(z.file().optional().openapi({ type: 'string', format: 'binary' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string', format: 'binary' } }),
              complexNested: z
                .object({
                  level1: z
                    .object({
                      level2: z
                        .object({
                          value: z.string().openapi({ type: 'string' }),
                          array: z
                            .array(z.int().openapi({ type: 'integer' }))
                            .openapi({ type: 'array', items: { type: 'integer' } }),
                        })
                        .partial()
                        .openapi({
                          type: 'object',
                          properties: {
                            value: { type: 'string' },
                            array: { type: 'array', items: { type: 'integer' } },
                          },
                        }),
                    })
                    .partial()
                    .openapi({
                      type: 'object',
                      properties: {
                        level2: {
                          type: 'object',
                          properties: {
                            value: { type: 'string' },
                            array: { type: 'array', items: { type: 'integer' } },
                          },
                        },
                      },
                    }),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    level1: {
                      type: 'object',
                      properties: {
                        level2: {
                          type: 'object',
                          properties: {
                            value: { type: 'string' },
                            array: { type: 'array', items: { type: 'integer' } },
                          },
                        },
                      },
                    },
                  },
                }),
              arrayOfObjects: z
                .array(
                  z
                    .object({
                      id: z.int().openapi({ type: 'integer' }),
                      name: z.string().openapi({ type: 'string' }),
                    })
                    .partial()
                    .openapi({
                      type: 'object',
                      properties: { id: { type: 'integer' }, name: { type: 'string' } },
                    }),
                )
                .optional()
                .openapi({
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: { id: { type: 'integer' }, name: { type: 'string' } },
                  },
                }),
              partWithHeaders: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                simpleString: { type: 'string' },
                arrayExplode: { type: 'array', items: { type: 'string' } },
                arrayNoExplode: { type: 'array', items: { type: 'string' } },
                objectForm: {
                  type: 'object',
                  properties: { key1: { type: 'string' }, key2: { type: 'integer' } },
                },
                objectDeepObject: {
                  type: 'object',
                  properties: {
                    nested: { type: 'object', properties: { deep: { type: 'string' } } },
                  },
                },
                imageFile: { type: 'string', format: 'binary' },
                documentFile: { type: 'string', format: 'binary' },
                jsonString: { type: 'object', properties: { data: { type: 'string' } } },
                base64Data: { type: 'string', format: 'byte' },
                multipleFiles: { type: 'array', items: { type: 'string', format: 'binary' } },
                complexNested: {
                  type: 'object',
                  properties: {
                    level1: {
                      type: 'object',
                      properties: {
                        level2: {
                          type: 'object',
                          properties: {
                            value: { type: 'string' },
                            array: { type: 'array', items: { type: 'integer' } },
                          },
                        },
                      },
                    },
                  },
                },
                arrayOfObjects: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: { id: { type: 'integer' }, name: { type: 'string' } },
                  },
                },
                partWithHeaders: { type: 'string' },
              },
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
              headers: { 'X-Custom-Header': {}, 'Content-Disposition': {}, 'X-Part-Index': {} },
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
        .optional()
        .openapi({
          param: {
            name: 'Accept',
            in: 'header',
            required: false,
            schema: { type: 'string', default: 'application/json' },
          },
          type: 'string',
          default: 'application/json',
        }),
      'Accept-Language': z
        .string()
        .optional()
        .openapi({
          param: { name: 'Accept-Language', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'Accept-Encoding': z
        .string()
        .optional()
        .openapi({
          param: { name: 'Accept-Encoding', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'Accept-Charset': z
        .string()
        .optional()
        .openapi({
          param: { name: 'Accept-Charset', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 200: { description: 'Content based on Accept header' } },
})

export const postBinaryVariationsRoute = createRoute({
  method: 'post',
  path: '/binary-variations',
  operationId: 'postBinaryVariations',
  request: {
    body: {
      content: {
        'application/octet-stream': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
        'application/json': {
          schema: z
            .object({
              data: z
                .string()
                .openapi({
                  type: 'string',
                  format: 'byte',
                  description: 'Base64 encoded binary data',
                }),
              filename: z.string().openapi({ type: 'string' }),
              mimeType: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                data: { type: 'string', format: 'byte', description: 'Base64 encoded binary data' },
                filename: { type: 'string' },
                mimeType: { type: 'string' },
              },
            }),
        },
        'multipart/mixed': {
          schema: z
            .object({
              part1: z.file().openapi({ type: 'string', format: 'binary' }),
              part2: z.file().openapi({ type: 'string', format: 'binary' }),
              part3: z.file().openapi({ type: 'string', format: 'binary' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                part1: { type: 'string', format: 'binary' },
                part2: { type: 'string', format: 'binary' },
                part3: { type: 'string', format: 'binary' },
              },
            }),
        },
        'image/png': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'image/jpeg': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'image/gif': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'image/webp': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'image/svg+xml': { schema: z.string().optional().openapi({ type: 'string' }) },
        'audio/mpeg': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'audio/ogg': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'audio/wav': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'video/mp4': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'video/webm': { schema: z.file().optional().openapi({ type: 'string', format: 'binary' }) },
        'application/zip': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
        'application/gzip': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
        'application/x-tar': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
        'application/x-7z-compressed': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const getStreamingRoute = createRoute({
  method: 'get',
  path: '/streaming',
  operationId: 'getStreaming',
  responses: { 200: { description: 'Streaming response' } },
})

export const postStreamingRoute = createRoute({
  method: 'post',
  path: '/streaming',
  operationId: 'postStreaming',
  request: {
    body: {
      content: {
        'application/x-ndjson': { schema: z.string().optional().openapi({ type: 'string' }) },
        'application/octet-stream': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
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
          schema: z
            .object({
              string: z.string().openapi({ type: 'string' }),
              number: z.number().openapi({ type: 'number' }),
              boolean: z.boolean().openapi({ type: 'boolean' }),
              arrayDefault: z
                .array(z.string().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              arrayExplode: z
                .array(z.int().openapi({ type: 'integer' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'integer' } }),
              nested: z
                .object({
                  key1: z.string().openapi({ type: 'string' }),
                  key2: z
                    .object({ subkey: z.string().openapi({ type: 'string' }) })
                    .partial()
                    .openapi({ type: 'object', properties: { subkey: { type: 'string' } } }),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    key1: { type: 'string' },
                    key2: { type: 'object', properties: { subkey: { type: 'string' } } },
                  },
                }),
              specialChars: z
                .string()
                .openapi({ type: 'string', description: 'Should handle & = ? % + space etc.' }),
              unicode: z.string().openapi({ type: 'string' }),
              emptyString: z.string().openapi({ type: 'string' }),
              multiValue: z
                .array(z.string().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                string: { type: 'string' },
                number: { type: 'number' },
                boolean: { type: 'boolean' },
                arrayDefault: { type: 'array', items: { type: 'string' } },
                arrayExplode: { type: 'array', items: { type: 'integer' } },
                nested: {
                  type: 'object',
                  properties: {
                    key1: { type: 'string' },
                    key2: { type: 'object', properties: { subkey: { type: 'string' } } },
                  },
                },
                specialChars: { type: 'string', description: 'Should handle & = ? % + space etc.' },
                unicode: { type: 'string' },
                emptyString: { type: 'string' },
                multiValue: { type: 'array', items: { type: 'string' } },
              },
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
      content: { 'application/json': { schema: ResponseSchema.optional() } },
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
          schema: z
            .object({
              base64Field: z.string().openapi({ type: 'string', contentEncoding: 'base64' }),
              base64urlField: z.string().openapi({ type: 'string', contentEncoding: 'base64url' }),
              jsonString: z
                .string()
                .openapi({ type: 'string', contentMediaType: 'application/json' }),
              xmlString: z
                .string()
                .openapi({ type: 'string', contentMediaType: 'application/xml' }),
              embeddedJson: z
                .string()
                .openapi({
                  type: 'string',
                  contentMediaType: 'application/json',
                  contentSchema: {
                    type: 'object',
                    properties: { nested: { type: 'string' }, value: { type: 'integer' } },
                  },
                }),
              binaryData: z
                .string()
                .openapi({
                  type: 'string',
                  contentEncoding: 'base64',
                  contentMediaType: 'application/octet-stream',
                }),
              imageData: z
                .string()
                .openapi({
                  type: 'string',
                  contentEncoding: 'base64',
                  contentMediaType: 'image/png',
                }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                base64Field: { type: 'string', contentEncoding: 'base64' },
                base64urlField: { type: 'string', contentEncoding: 'base64url' },
                jsonString: { type: 'string', contentMediaType: 'application/json' },
                xmlString: { type: 'string', contentMediaType: 'application/xml' },
                embeddedJson: {
                  type: 'string',
                  contentMediaType: 'application/json',
                  contentSchema: {
                    type: 'object',
                    properties: { nested: { type: 'string' }, value: { type: 'integer' } },
                  },
                },
                binaryData: {
                  type: 'string',
                  contentEncoding: 'base64',
                  contentMediaType: 'application/octet-stream',
                },
                imageData: {
                  type: 'string',
                  contentEncoding: 'base64',
                  contentMediaType: 'image/png',
                },
              },
            }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})
