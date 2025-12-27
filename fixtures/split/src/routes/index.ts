import { createRoute, z } from '@hono/zod-openapi'

const RecordSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } })
  .openapi('Record')

const CallbackHeadersSchema = z
  .object({
    'X-Custom': z.string().openapi({ type: 'string' }),
    'X-Retry-Count': z.int().openapi({ type: 'integer' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: { 'X-Custom': { type: 'string' }, 'X-Retry-Count': { type: 'integer' } },
  })
  .openapi('CallbackHeaders')

const CallbackEnvelopeSchema = z
  .object({
    url: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    headers: CallbackHeadersSchema,
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      url: { type: 'string', format: 'uri' },
      headers: { $ref: '#/components/schemas/CallbackHeaders' },
    },
  })
  .openapi('CallbackEnvelope')

const OptionsEnvelopeSchema = z
  .object({
    notify: z.boolean().openapi({ type: 'boolean' }),
    callbacks: z
      .array(CallbackEnvelopeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/CallbackEnvelope' } }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      notify: { type: 'boolean' },
      callbacks: { type: 'array', items: { $ref: '#/components/schemas/CallbackEnvelope' } },
    },
  })
  .openapi('OptionsEnvelope')

const UserSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    address: z
      .object({
        zip: z.string().openapi({ type: 'string' }),
        lines: z
          .array(z.string().openapi({ type: 'string' }))
          .openapi({ type: 'array', items: { type: 'string' } }),
      })
      .partial()
      .optional()
      .openapi({
        type: 'object',
        properties: {
          zip: { type: 'string' },
          lines: { type: 'array', items: { type: 'string' } },
        },
      }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string', format: 'email' },
      address: {
        type: 'object',
        properties: {
          zip: { type: 'string' },
          lines: { type: 'array', items: { type: 'string' } },
        },
      },
    },
  })
  .openapi('User')

const MetadataEnvelopeSchema = z
  .object({ user: UserSchema, options: OptionsEnvelopeSchema })
  .optional()
  .openapi({
    type: 'object',
    description: 'Nested multipart container (metadata part)',
    properties: {
      user: { $ref: '#/components/schemas/User' },
      options: { $ref: '#/components/schemas/OptionsEnvelope' },
    },
  })
  .openapi('MetadataEnvelope')

const UploadEnvelopeSchema = z
  .object({
    profile: z
      .file()
      .optional()
      .openapi({ type: 'string', format: 'binary', description: 'Profile image file' }),
    attachments: z
      .array(z.file().optional().openapi({ type: 'string', format: 'binary' }))
      .optional()
      .openapi({
        type: 'array',
        description: 'Multiple files with the same part name',
        items: { type: 'string', format: 'binary' },
      }),
    metadata: MetadataEnvelopeSchema,
    tags: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    records: z
      .array(RecordSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Record' } }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      profile: { type: 'string', format: 'binary', description: 'Profile image file' },
      attachments: {
        type: 'array',
        description: 'Multiple files with the same part name',
        items: { type: 'string', format: 'binary' },
      },
      metadata: { $ref: '#/components/schemas/MetadataEnvelope' },
      tags: { type: 'array', items: { type: 'string' } },
      records: { type: 'array', items: { $ref: '#/components/schemas/Record' } },
    },
  })
  .openapi('UploadEnvelope')

const RequestIdHeaderSchema = z
  .any()
  .optional()
  .openapi({
    description: 'Trace id for debugging',
    schema: { type: 'string', example: 'req_01JABCDEFGHJKL' },
  })

const ChecksumSha256HeaderSchema = z
  .any()
  .optional()
  .openapi({
    description: 'SHA-256 checksum (hex)',
    schema: {
      type: 'string',
      pattern: '^[a-f0-9]{64}$',
      example: 'c0ffee00c0ffee00c0ffee00c0ffee00c0ffee00c0ffee00c0ffee00c0ffee00',
    },
  })

export const postUploadsRoute = createRoute({
  method: 'post',
  path: '/uploads',
  summary: 'Upload files + nested multipart metadata',
  operationId: 'uploadComplex',
  request: {
    body: { required: true, content: { 'multipart/form-data': { schema: UploadEnvelopeSchema } } },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              ok: z.boolean().openapi({ type: 'boolean' }),
              message: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .optional()
            .openapi({
              type: 'object',
              properties: { ok: { type: 'boolean' }, message: { type: 'string' } },
            }),
        },
      },
    },
  },
})
