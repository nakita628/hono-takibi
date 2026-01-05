import { createRoute, z } from '@hono/zod-openapi'

const TextMessageSchema = z
  .object({
    type: z.literal('text').openapi({ type: 'string' }),
    text: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'text'],
    properties: { type: { type: 'string', const: 'text' }, text: { type: 'string' } },
  })
  .openapi('TextMessage')

const ImageMessageSchema = z
  .object({
    type: z.literal('image').openapi({ type: 'string' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'url'],
    properties: {
      type: { type: 'string', const: 'image' },
      url: { type: 'string', format: 'uri' },
    },
  })
  .openapi('ImageMessage')

const VideoMessageSchema = z
  .object({
    type: z.literal('video').openapi({ type: 'string' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    duration: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'url', 'duration'],
    properties: {
      type: { type: 'string', const: 'video' },
      url: { type: 'string', format: 'uri' },
      duration: { type: 'integer' },
    },
  })
  .openapi('VideoMessage')

type MessageType =
  | z.infer<typeof TextMessageSchema>
  | z.infer<typeof ImageMessageSchema>
  | z.infer<typeof VideoMessageSchema>

const MessageSchema: z.ZodType<MessageType> = z
  .lazy(() =>
    z
      .discriminatedUnion('type', [TextMessageSchema, ImageMessageSchema, VideoMessageSchema])
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/TextMessage' },
          { $ref: '#/components/schemas/ImageMessage' },
          { $ref: '#/components/schemas/VideoMessage' },
        ],
        discriminator: {
          propertyName: 'type',
          mapping: {
            text: '#/components/schemas/TextMessage',
            image: '#/components/schemas/ImageMessage',
            video: '#/components/schemas/VideoMessage',
          },
        },
      }),
  )
  .openapi('Message')

export const postMessagesRoute = createRoute({
  method: 'post',
  path: '/messages',
  operationId: 'createMessage',
  request: { body: { content: { 'application/json': { schema: MessageSchema } } } },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: MessageSchema } } },
  },
})
