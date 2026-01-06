import { createRoute, z } from '@hono/zod-openapi'

const TextMessageSchema = z
  .object({ type: z.literal('text'), text: z.string() })
  .openapi({ required: ['type', 'text'] })
  .openapi('TextMessage')

const ImageMessageSchema = z
  .object({ type: z.literal('image'), url: z.url() })
  .openapi({ required: ['type', 'url'] })
  .openapi('ImageMessage')

const VideoMessageSchema = z
  .object({ type: z.literal('video'), url: z.url(), duration: z.int() })
  .openapi({ required: ['type', 'url', 'duration'] })
  .openapi('VideoMessage')

type MessageType =
  | z.infer<typeof TextMessageSchema>
  | z.infer<typeof ImageMessageSchema>
  | z.infer<typeof VideoMessageSchema>

const MessageSchema: z.ZodType<MessageType> = z
  .lazy(() =>
    z
      .xor([TextMessageSchema, ImageMessageSchema, VideoMessageSchema])
      .openapi({
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
