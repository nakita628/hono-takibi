import { createRoute, z } from '@hono/zod-openapi'

const EmptySchema = z
  .any()
  .openapi({ description: 'Completely empty schema' })
  .readonly()
  .openapi('EmptySchema')

const AnySchema = z
  .any()
  .openapi({ description: 'Schema that accepts anything' })
  .readonly()
  .openapi('AnySchema')

const NullSchema = z
  .null()
  .nullable()
  .openapi({ description: 'Only accepts null' })
  .readonly()
  .openapi('NullSchema')

const MultiTypeSchema = z
  .string()
  .nullable()
  .openapi({ description: 'Accepts multiple primitive types' })
  .readonly()
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
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({}) },
        'application/xml': { schema: z.object({}) },
        'application/yaml': { schema: z.object({}) },
        'text/plain': { schema: z.string() },
        'text/html': { schema: z.string() },
        'text/csv': { schema: z.string() },
        'text/tab-separated-values': { schema: z.string() },
        'application/octet-stream': { schema: z.file() },
        'application/pdf': { schema: z.file() },
        'image/png': { schema: z.file() },
        'image/jpeg': { schema: z.file() },
        'image/gif': { schema: z.file() },
        'image/webp': { schema: z.file() },
        'image/svg+xml': { schema: z.string() },
        'audio/mpeg': { schema: z.file() },
        'audio/ogg': { schema: z.file() },
        'video/mp4': { schema: z.file() },
        'video/webm': { schema: z.file() },
        'application/zip': { schema: z.file() },
        'application/gzip': { schema: z.file() },
        'application/x-tar': { schema: z.file() },
        'application/vnd.ms-excel': { schema: z.file() },
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { schema: z.file() },
        'application/vnd.ms-powerpoint': { schema: z.file() },
        'application/msword': { schema: z.file() },
        'application/vnd.api+json': { schema: z.object({}) },
        'application/hal+json': { schema: z.object({}) },
        'application/problem+json': { schema: z.object({}) },
        'application/ld+json': { schema: z.object({}) },
        'application/geo+json': { schema: z.object({}) },
        'application/graphql+json': { schema: z.object({}) },
        'application/x-ndjson': { schema: z.string() },
        'application/x-msgpack': { schema: z.file() },
        'application/cbor': { schema: z.file() },
        'application/x-protobuf': { schema: z.file() },
        'application/avro': { schema: z.file() },
        'application/x-parquet': { schema: z.file() },
        'image/*': { schema: z.file() },
        'text/*': { schema: z.string() },
        '*/*': { schema: z.file() },
      },
    },
    201: { description: 'Created' },
    202: { description: 'Accepted' },
    203: { description: 'Non-Authoritative Information' },
    204: { description: 'No Content' },
    205: { description: 'Reset Content' },
    206: {
      description: 'Partial Content',
      headers: z.object({ 'Content-Range': { schema: z.string().exactOptional() } }),
    },
    207: { description: 'Multi-Status (WebDAV)' },
    208: { description: 'Already Reported (WebDAV)' },
    226: { description: 'IM Used' },
    300: { description: 'Multiple Choices' },
    301: {
      description: 'Moved Permanently',
      headers: z.object({ Location: { required: true, schema: z.url() } }),
    },
    302: {
      description: 'Found',
      headers: z.object({ Location: { required: true, schema: z.url() } }),
    },
    303: {
      description: 'See Other',
      headers: z.object({ Location: { required: true, schema: z.url() } }),
    },
    304: {
      description: 'Not Modified',
      headers: z.object({ ETag: { schema: z.string().exactOptional() } }),
    },
    305: { description: 'Use Proxy (Deprecated)' },
    307: {
      description: 'Temporary Redirect',
      headers: z.object({ Location: { required: true, schema: z.url() } }),
    },
    308: {
      description: 'Permanent Redirect',
      headers: z.object({ Location: { required: true, schema: z.url() } }),
    },
    400: { description: 'Bad Request' },
    401: {
      description: 'Unauthorized',
      headers: z.object({ 'WWW-Authenticate': { required: true, schema: z.string() } }),
    },
    402: { description: 'Payment Required' },
    403: { description: 'Forbidden' },
    404: { description: 'Not Found' },
    405: {
      description: 'Method Not Allowed',
      headers: z.object({ Allow: { required: true, schema: z.string() } }),
    },
    406: { description: 'Not Acceptable' },
    407: { description: 'Proxy Authentication Required' },
    408: { description: 'Request Timeout' },
    409: { description: 'Conflict' },
    410: { description: 'Gone' },
    411: { description: 'Length Required' },
    412: { description: 'Precondition Failed' },
    413: {
      description: 'Payload Too Large',
      headers: z.object({ 'Retry-After': { schema: z.int().exactOptional() } }),
    },
    414: { description: 'URI Too Long' },
    415: { description: 'Unsupported Media Type' },
    416: {
      description: 'Range Not Satisfiable',
      headers: z.object({ 'Content-Range': { schema: z.string().exactOptional() } }),
    },
    417: { description: 'Expectation Failed' },
    418: { description: "I'm a teapot (RFC 2324)" },
    421: { description: 'Misdirected Request' },
    422: { description: 'Unprocessable Entity' },
    423: { description: 'Locked (WebDAV)' },
    424: { description: 'Failed Dependency (WebDAV)' },
    425: { description: 'Too Early' },
    426: {
      description: 'Upgrade Required',
      headers: z.object({ Upgrade: { required: true, schema: z.string() } }),
    },
    428: { description: 'Precondition Required' },
    429: {
      description: 'Too Many Requests',
      headers: z.object({
        'Retry-After': { schema: z.int().exactOptional() },
        'X-RateLimit-Limit': { schema: z.int().exactOptional() },
        'X-RateLimit-Remaining': { schema: z.int().exactOptional() },
        'X-RateLimit-Reset': { schema: z.int().exactOptional() },
      }),
    },
    431: { description: 'Request Header Fields Too Large' },
    451: { description: 'Unavailable For Legal Reasons' },
    500: { description: 'Internal Server Error' },
    501: { description: 'Not Implemented' },
    502: { description: 'Bad Gateway' },
    503: {
      description: 'Service Unavailable',
      headers: z.object({ 'Retry-After': { schema: z.int().exactOptional() } }),
    },
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
          schema: z.object({ code: z.int().exactOptional(), message: z.string().exactOptional() }),
        },
      },
    },
  },
} as const)

export const postMultipartVariationsRoute = createRoute({
  method: 'post',
  path: '/multipart-variations',
  operationId: 'postMultipartVariations',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            file: z.file().exactOptional(),
            metadata: z.string().exactOptional(),
          }),
          encoding: {
            file: { contentType: 'application/octet-stream' },
            metadata: { contentType: 'application/json' },
          },
        },
        'multipart/mixed': { schema: z.object({ parts: z.array(z.file()).exactOptional() }) },
        'multipart/related': {
          schema: z.object({
            root: z.string().exactOptional(),
            attachments: z.array(z.file()).exactOptional(),
          }),
        },
        'multipart/alternative': {
          schema: z.object({ text: z.string().exactOptional(), html: z.string().exactOptional() }),
        },
        'multipart/digest': { schema: z.object({}) },
        'multipart/parallel': { schema: z.object({}) },
        'multipart/byteranges': { schema: z.object({}) },
        'application/x-www-form-urlencoded': {
          schema: z.object({
            field1: z.string().exactOptional(),
            field2: z.array(z.string()).exactOptional(),
          }),
          encoding: { field2: {} },
        },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const postCharsetVariationsRoute = createRoute({
  method: 'post',
  path: '/charset-variations',
  operationId: 'postCharsetVariations',
  request: {
    body: {
      content: {
        'application/json; charset=utf-8': { schema: z.object({}) },
        'application/json; charset=utf-16': { schema: z.object({}) },
        'application/json; charset=iso-8859-1': { schema: z.object({}) },
        'text/plain; charset=utf-8': { schema: z.string() },
        'text/plain; charset=ascii': { schema: z.string() },
        'text/html; charset=utf-8': { schema: z.string() },
        'multipart/form-data; boundary=----WebKitFormBoundary': { schema: z.object({}) },
      },
    },
  },
  responses: { 200: { description: 'OK' } },
} as const)
