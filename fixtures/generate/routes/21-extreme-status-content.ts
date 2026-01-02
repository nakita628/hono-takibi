import { createRoute, z } from '@hono/zod-openapi'

const EmptySchema = z
  .any()
  .openapi({ description: 'Completely empty schema' })
  .openapi('EmptySchema')

const AnySchema = z
  .any()
  .openapi({ description: 'Schema that accepts anything' })
  .openapi('AnySchema')

const NullSchema = z
  .null()
  .nullable()
  .openapi({ type: 'null', description: 'Only accepts null' })
  .openapi('NullSchema')

const MultiTypeSchema = z
  .string()
  .nullable()
  .openapi({
    type: ['string', 'number', 'integer', 'boolean', 'null'],
    description: 'Accepts multiple primitive types',
  })
  .openapi('MultiTypeSchema')

export const getExtremeResponsesRoute = createRoute({
  method: 'get',
  path: '/extreme-responses',
  operationId: 'getExtremeResponses',
  responses: {
    100: { description: 'Continue' },
    101: { description: 'Switching Protocols' },
    102: { description: 'Processing (WebDAV)' },
    103: { description: 'Early Hints' },
    200: { description: 'OK' },
    201: { description: 'Created' },
    202: { description: 'Accepted' },
    203: { description: 'Non-Authoritative Information' },
    204: { description: 'No Content' },
    205: { description: 'Reset Content' },
    206: { description: 'Partial Content' },
    207: { description: 'Multi-Status (WebDAV)' },
    208: { description: 'Already Reported (WebDAV)' },
    226: { description: 'IM Used' },
    300: { description: 'Multiple Choices' },
    301: { description: 'Moved Permanently' },
    302: { description: 'Found' },
    303: { description: 'See Other' },
    304: { description: 'Not Modified' },
    305: { description: 'Use Proxy (Deprecated)' },
    307: { description: 'Temporary Redirect' },
    308: { description: 'Permanent Redirect' },
    400: { description: 'Bad Request' },
    401: { description: 'Unauthorized' },
    402: { description: 'Payment Required' },
    403: { description: 'Forbidden' },
    404: { description: 'Not Found' },
    405: { description: 'Method Not Allowed' },
    406: { description: 'Not Acceptable' },
    407: { description: 'Proxy Authentication Required' },
    408: { description: 'Request Timeout' },
    409: { description: 'Conflict' },
    410: { description: 'Gone' },
    411: { description: 'Length Required' },
    412: { description: 'Precondition Failed' },
    413: { description: 'Payload Too Large' },
    414: { description: 'URI Too Long' },
    415: { description: 'Unsupported Media Type' },
    416: { description: 'Range Not Satisfiable' },
    417: { description: 'Expectation Failed' },
    418: { description: "I'm a teapot (RFC 2324)" },
    421: { description: 'Misdirected Request' },
    422: { description: 'Unprocessable Entity' },
    423: { description: 'Locked (WebDAV)' },
    424: { description: 'Failed Dependency (WebDAV)' },
    425: { description: 'Too Early' },
    426: { description: 'Upgrade Required' },
    428: { description: 'Precondition Required' },
    429: { description: 'Too Many Requests' },
    431: { description: 'Request Header Fields Too Large' },
    451: { description: 'Unavailable For Legal Reasons' },
    500: { description: 'Internal Server Error' },
    501: { description: 'Not Implemented' },
    502: { description: 'Bad Gateway' },
    503: { description: 'Service Unavailable' },
    504: { description: 'Gateway Timeout' },
    505: { description: 'HTTP Version Not Supported' },
    506: { description: 'Variant Also Negotiates' },
    507: { description: 'Insufficient Storage (WebDAV)' },
    508: { description: 'Loop Detected (WebDAV)' },
    510: { description: 'Not Extended' },
    511: { description: 'Network Authentication Required' },
    '1XX': { description: 'Any 1xx response' },
    '2XX': { description: 'Any 2xx response' },
    '3XX': { description: 'Any 3xx response' },
    '4XX': { description: 'Any 4xx response' },
    '5XX': { description: 'Any 5xx response' },
    default: {
      description: 'Unexpected response',
      content: {
        'application/json': {
          schema: z
            .object({
              code: z.int().optional().openapi({ type: 'integer' }),
              message: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: { code: { type: 'integer' }, message: { type: 'string' } },
            }),
        },
      },
    },
  },
})

export const postMultipartVariationsRoute = createRoute({
  method: 'post',
  path: '/multipart-variations',
  operationId: 'postMultipartVariations',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              file: z.file().optional().openapi({ type: 'string', format: 'binary' }),
              metadata: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                file: { type: 'string', format: 'binary' },
                metadata: { type: 'string' },
              },
            }),
          encoding: {
            file: { contentType: 'application/octet-stream' },
            metadata: { contentType: 'application/json' },
          },
        },
        'multipart/mixed': {
          schema: z
            .object({
              parts: z
                .array(z.file().openapi({ type: 'string', format: 'binary' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string', format: 'binary' } }),
            })
            .openapi({
              type: 'object',
              properties: { parts: { type: 'array', items: { type: 'string', format: 'binary' } } },
            }),
        },
        'multipart/related': {
          schema: z
            .object({
              root: z.string().optional().openapi({ type: 'string' }),
              attachments: z
                .array(z.file().openapi({ type: 'string', format: 'binary' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string', format: 'binary' } }),
            })
            .openapi({
              type: 'object',
              properties: {
                root: { type: 'string' },
                attachments: { type: 'array', items: { type: 'string', format: 'binary' } },
              },
            }),
        },
        'multipart/alternative': {
          schema: z
            .object({
              text: z.string().optional().openapi({ type: 'string' }),
              html: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: { text: { type: 'string' }, html: { type: 'string' } },
            }),
        },
        'multipart/digest': { schema: z.object({}).openapi({ type: 'object' }) },
        'multipart/parallel': { schema: z.object({}).openapi({ type: 'object' }) },
        'multipart/byteranges': { schema: z.object({}).openapi({ type: 'object' }) },
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              field1: z.string().optional().openapi({ type: 'string' }),
              field2: z
                .array(z.string().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
            })
            .openapi({
              type: 'object',
              properties: {
                field1: { type: 'string' },
                field2: { type: 'array', items: { type: 'string' } },
              },
            }),
          encoding: { field2: {} },
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})

export const postCharsetVariationsRoute = createRoute({
  method: 'post',
  path: '/charset-variations',
  operationId: 'postCharsetVariations',
  request: {
    body: {
      content: {
        'application/json; charset=utf-8': { schema: z.object({}).openapi({ type: 'object' }) },
        'application/json; charset=utf-16': { schema: z.object({}).openapi({ type: 'object' }) },
        'application/json; charset=iso-8859-1': {
          schema: z.object({}).openapi({ type: 'object' }),
        },
        'text/plain; charset=utf-8': { schema: z.string().openapi({ type: 'string' }) },
        'text/plain; charset=ascii': { schema: z.string().openapi({ type: 'string' }) },
        'text/html; charset=utf-8': { schema: z.string().openapi({ type: 'string' }) },
        'multipart/form-data; boundary=----WebKitFormBoundary': {
          schema: z.object({}).openapi({ type: 'object' }),
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
})
