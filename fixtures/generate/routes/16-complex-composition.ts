import { createRoute, z } from '@hono/zod-openapi'

const IdentifiableSchema = z
  .object({ id: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
  .openapi({
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string', format: 'uuid' } },
  })
  .openapi('Identifiable')

const TimestampedSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Timestamped')

const AuditableSchema = TimestampedSchema.and(
  z
    .object({
      createdBy: z.string().exactOptional().openapi({ type: 'string' }),
      updatedBy: z.string().exactOptional().openapi({ type: 'string' }),
    })
    .openapi({
      type: 'object',
      properties: { createdBy: { type: 'string' }, updatedBy: { type: 'string' } },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Timestamped' },
      {
        type: 'object',
        properties: { createdBy: { type: 'string' }, updatedBy: { type: 'string' } },
      },
    ],
  })
  .openapi('Auditable')

const VersionableSchema = z
  .object({
    version: z.int().exactOptional().openapi({ type: 'integer' }),
    etag: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: { version: { type: 'integer' }, etag: { type: 'string' } },
  })
  .openapi('Versionable')

const BaseEntitySchema = IdentifiableSchema.and(AuditableSchema)
  .and(VersionableSchema)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Identifiable' },
      { $ref: '#/components/schemas/Auditable' },
      { $ref: '#/components/schemas/Versionable' },
    ],
  })
  .openapi('BaseEntity')

const ExtendedEntitySchema = BaseEntitySchema.and(
  z
    .object({
      name: z.string().openapi({ type: 'string' }),
      description: z.string().exactOptional().openapi({ type: 'string' }),
      tags: z
        .array(z.string().openapi({ type: 'string' }))
        .exactOptional()
        .openapi({ type: 'array', items: { type: 'string' } }),
    })
    .openapi({
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEntity' },
      {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
        },
      },
    ],
  })
  .openapi('ExtendedEntity')

const TextMessageSchema: z.ZodType<TextMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(
      z
        .object({
          type: z.literal('text').exactOptional().openapi({ type: 'string' }),
          content: z.string().openapi({ type: 'string' }),
          formatting: TextFormattingSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['content'],
          properties: {
            type: { type: 'string', const: 'text' },
            content: { type: 'string' },
            formatting: { $ref: '#/components/schemas/TextFormatting' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseMessage' },
        {
          type: 'object',
          required: ['content'],
          properties: {
            type: { type: 'string', const: 'text' },
            content: { type: 'string' },
            formatting: { $ref: '#/components/schemas/TextFormatting' },
          },
        },
      ],
    }),
  )
  .openapi('TextMessage')

const ImageMessageSchema: z.ZodType<ImageMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(MediaContentSchema)
      .and(
        z
          .object({
            type: z.literal('image').exactOptional().openapi({ type: 'string' }),
            dimensions: DimensionsSchema.exactOptional(),
            alt: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: {
              type: { type: 'string', const: 'image' },
              dimensions: { $ref: '#/components/schemas/Dimensions' },
              alt: { type: 'string' },
            },
          }),
      )
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/BaseMessage' },
          { $ref: '#/components/schemas/MediaContent' },
          {
            type: 'object',
            properties: {
              type: { type: 'string', const: 'image' },
              dimensions: { $ref: '#/components/schemas/Dimensions' },
              alt: { type: 'string' },
            },
          },
        ],
      }),
  )
  .openapi('ImageMessage')

const VideoMessageSchema: z.ZodType<VideoMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(MediaContentSchema)
      .and(
        z
          .object({
            type: z.literal('video').exactOptional().openapi({ type: 'string' }),
            duration: z.int().exactOptional().openapi({ type: 'integer' }),
            thumbnail: ImageMessageSchema.exactOptional(),
          })
          .openapi({
            type: 'object',
            properties: {
              type: { type: 'string', const: 'video' },
              duration: { type: 'integer' },
              thumbnail: { $ref: '#/components/schemas/ImageMessage' },
            },
          }),
      )
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/BaseMessage' },
          { $ref: '#/components/schemas/MediaContent' },
          {
            type: 'object',
            properties: {
              type: { type: 'string', const: 'video' },
              duration: { type: 'integer' },
              thumbnail: { $ref: '#/components/schemas/ImageMessage' },
            },
          },
        ],
      }),
  )
  .openapi('VideoMessage')

const DocumentMessageSchema: z.ZodType<DocumentMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(MediaContentSchema)
      .and(
        z
          .object({
            type: z.literal('document').exactOptional().openapi({ type: 'string' }),
            pageCount: z.int().exactOptional().openapi({ type: 'integer' }),
            preview: ImageMessageSchema.exactOptional(),
          })
          .openapi({
            type: 'object',
            properties: {
              type: { type: 'string', const: 'document' },
              pageCount: { type: 'integer' },
              preview: { $ref: '#/components/schemas/ImageMessage' },
            },
          }),
      )
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/BaseMessage' },
          { $ref: '#/components/schemas/MediaContent' },
          {
            type: 'object',
            properties: {
              type: { type: 'string', const: 'document' },
              pageCount: { type: 'integer' },
              preview: { $ref: '#/components/schemas/ImageMessage' },
            },
          },
        ],
      }),
  )
  .openapi('DocumentMessage')

const CompositeMessageSchema: z.ZodType<CompositeMessageType> = z
  .lazy(() =>
    BaseMessageSchema.and(
      z
        .object({
          type: z.literal('composite').exactOptional().openapi({ type: 'string' }),
          parts: z
            .array(MessageSchema)
            .min(2)
            .openapi({
              type: 'array',
              items: { $ref: '#/components/schemas/Message' },
              minItems: 2,
            }),
        })
        .openapi({
          type: 'object',
          required: ['parts'],
          properties: {
            type: { type: 'string', const: 'composite' },
            parts: { type: 'array', items: { $ref: '#/components/schemas/Message' }, minItems: 2 },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseMessage' },
        {
          type: 'object',
          required: ['parts'],
          properties: {
            type: { type: 'string', const: 'composite' },
            parts: { type: 'array', items: { $ref: '#/components/schemas/Message' }, minItems: 2 },
          },
        },
      ],
    }),
  )
  .openapi('CompositeMessage')

type MessageType =
  | z.infer<typeof TextMessageSchema>
  | z.infer<typeof ImageMessageSchema>
  | z.infer<typeof VideoMessageSchema>
  | z.infer<typeof DocumentMessageSchema>
  | z.infer<typeof CompositeMessageSchema>

const MessageSchema: z.ZodType<MessageType> = z
  .lazy(() =>
    z
      .discriminatedUnion('type', [
        TextMessageSchema,
        ImageMessageSchema,
        VideoMessageSchema,
        DocumentMessageSchema,
        CompositeMessageSchema,
      ])
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/TextMessage' },
          { $ref: '#/components/schemas/ImageMessage' },
          { $ref: '#/components/schemas/VideoMessage' },
          { $ref: '#/components/schemas/DocumentMessage' },
          { $ref: '#/components/schemas/CompositeMessage' },
        ],
        discriminator: {
          propertyName: 'type',
          mapping: {
            text: '#/components/schemas/TextMessage',
            image: '#/components/schemas/ImageMessage',
            video: '#/components/schemas/VideoMessage',
            document: '#/components/schemas/DocumentMessage',
            composite: '#/components/schemas/CompositeMessage',
          },
        },
      }),
  )
  .openapi('Message')

const ParticipantSchema = IdentifiableSchema.and(
  z
    .object({
      name: z.string().openapi({ type: 'string' }),
      avatar: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    })
    .openapi({
      type: 'object',
      required: ['name'],
      properties: { name: { type: 'string' }, avatar: { type: 'string', format: 'uri' } },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Identifiable' },
      {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' }, avatar: { type: 'string', format: 'uri' } },
      },
    ],
  })
  .openapi('Participant')

const MessageMetadataSchema: z.ZodType<MessageMetadataType> = z
  .lazy(() =>
    z
      .object({
        priority: z
          .enum(['low', 'normal', 'high', 'urgent'])
          .exactOptional()
          .openapi({ type: 'string', enum: ['low', 'normal', 'high', 'urgent'] }),
        expiresAt: z.iso
          .datetime()
          .exactOptional()
          .openapi({ type: 'string', format: 'date-time' }),
        replyTo: MessageSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'] },
          expiresAt: { type: 'string', format: 'date-time' },
          replyTo: { $ref: '#/components/schemas/Message' },
        },
      }),
  )
  .openapi('MessageMetadata')

type BaseMessageType = z.infer<typeof BaseEntitySchema> & {
  type: string
  sender: z.infer<typeof ParticipantSchema>
  recipient: z.infer<typeof ParticipantSchema>
  metadata?: z.infer<typeof MessageMetadataSchema>
}

const BaseMessageSchema: z.ZodType<BaseMessageType> = z
  .lazy(() =>
    BaseEntitySchema.and(
      z
        .object({
          type: z.string().openapi({ type: 'string' }),
          sender: ParticipantSchema,
          recipient: ParticipantSchema,
          metadata: MessageMetadataSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['type', 'sender', 'recipient'],
          properties: {
            type: { type: 'string' },
            sender: { $ref: '#/components/schemas/Participant' },
            recipient: { $ref: '#/components/schemas/Participant' },
            metadata: { $ref: '#/components/schemas/MessageMetadata' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseEntity' },
        {
          type: 'object',
          required: ['type', 'sender', 'recipient'],
          properties: {
            type: { type: 'string' },
            sender: { $ref: '#/components/schemas/Participant' },
            recipient: { $ref: '#/components/schemas/Participant' },
            metadata: { $ref: '#/components/schemas/MessageMetadata' },
          },
        },
      ],
    }),
  )
  .openapi('BaseMessage')

type MessageMetadataType = {
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  expiresAt?: string
  replyTo?: z.infer<typeof MessageSchema>
}

const TextRangeSchema = z
  .object({
    start: z.int().openapi({ type: 'integer' }),
    end: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['start', 'end'],
    properties: { start: { type: 'integer' }, end: { type: 'integer' } },
  })
  .openapi('TextRange')

const LinkRangeSchema = TextRangeSchema.and(
  z
    .object({ url: z.url().openapi({ type: 'string', format: 'uri' }) })
    .openapi({
      type: 'object',
      required: ['url'],
      properties: { url: { type: 'string', format: 'uri' } },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/TextRange' },
      { type: 'object', required: ['url'], properties: { url: { type: 'string', format: 'uri' } } },
    ],
  })
  .openapi('LinkRange')

const TextFormattingSchema = z
  .object({
    bold: z
      .array(TextRangeSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TextRange' } }),
    italic: z
      .array(TextRangeSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TextRange' } }),
    links: z
      .array(LinkRangeSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/LinkRange' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      bold: { type: 'array', items: { $ref: '#/components/schemas/TextRange' } },
      italic: { type: 'array', items: { $ref: '#/components/schemas/TextRange' } },
      links: { type: 'array', items: { $ref: '#/components/schemas/LinkRange' } },
    },
  })
  .openapi('TextFormatting')

type TextMessageType = z.infer<typeof BaseMessageSchema> & {
  type?: 'text'
  content: string
  formatting?: z.infer<typeof TextFormattingSchema>
}

const MediaContentSchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    mimeType: z.string().openapi({ type: 'string' }),
    size: z.int().openapi({ type: 'integer' }),
    checksum: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['url', 'mimeType', 'size'],
    properties: {
      url: { type: 'string', format: 'uri' },
      mimeType: { type: 'string' },
      size: { type: 'integer' },
      checksum: { type: 'string' },
    },
  })
  .openapi('MediaContent')

const DimensionsSchema = z
  .object({
    width: z.int().openapi({ type: 'integer' }),
    height: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['width', 'height'],
    properties: { width: { type: 'integer' }, height: { type: 'integer' } },
  })
  .openapi('Dimensions')

type ImageMessageType = z.infer<typeof BaseMessageSchema> &
  z.infer<typeof MediaContentSchema> & {
    type?: 'image'
    dimensions?: z.infer<typeof DimensionsSchema>
    alt?: string
  }

type VideoMessageType = z.infer<typeof BaseMessageSchema> &
  z.infer<typeof MediaContentSchema> & {
    type?: 'video'
    duration?: number
    thumbnail?: z.infer<typeof ImageMessageSchema>
  }

type DocumentMessageType = z.infer<typeof BaseMessageSchema> &
  z.infer<typeof MediaContentSchema> & {
    type?: 'document'
    pageCount?: number
    preview?: z.infer<typeof ImageMessageSchema>
  }

type CompositeMessageType = z.infer<typeof BaseMessageSchema> & {
  type?: 'composite'
  parts: z.infer<typeof MessageSchema>[]
}

const DeliveryStatusSchema = z
  .object({
    sent: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    delivered: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    read: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    timestamps: z
      .object({
        sentAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
        deliveredAt: z.iso
          .datetime()
          .exactOptional()
          .openapi({ type: 'string', format: 'date-time' }),
        readAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          sentAt: { type: 'string', format: 'date-time' },
          deliveredAt: { type: 'string', format: 'date-time' },
          readAt: { type: 'string', format: 'date-time' },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      sent: { type: 'boolean' },
      delivered: { type: 'boolean' },
      read: { type: 'boolean' },
      timestamps: {
        type: 'object',
        properties: {
          sentAt: { type: 'string', format: 'date-time' },
          deliveredAt: { type: 'string', format: 'date-time' },
          readAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  .openapi('DeliveryStatus')

const MessageResponseSchema = MessageSchema.and(
  z
    .object({ deliveryStatus: DeliveryStatusSchema.exactOptional() })
    .openapi({
      type: 'object',
      properties: { deliveryStatus: { $ref: '#/components/schemas/DeliveryStatus' } },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Message' },
      {
        type: 'object',
        properties: { deliveryStatus: { $ref: '#/components/schemas/DeliveryStatus' } },
      },
    ],
  })
  .openapi('MessageResponse')

const EventPayloadSchema: z.ZodType<EventPayloadType> = z
  .lazy(() =>
    z
      .union([
        UserEventPayloadSchema,
        OrderEventPayloadSchema,
        SystemEventPayloadSchema,
        CustomEventPayloadSchema,
      ])
      .openapi({
        anyOf: [
          { $ref: '#/components/schemas/UserEventPayload' },
          { $ref: '#/components/schemas/OrderEventPayload' },
          { $ref: '#/components/schemas/SystemEventPayload' },
          { $ref: '#/components/schemas/CustomEventPayload' },
        ],
      }),
  )
  .openapi('EventPayload')

const WebContextSchema = z
  .object({
    userAgent: z.string().exactOptional().openapi({ type: 'string' }),
    referrer: z.string().exactOptional().openapi({ type: 'string' }),
    sessionId: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      userAgent: { type: 'string' },
      referrer: { type: 'string' },
      sessionId: { type: 'string' },
    },
  })
  .openapi('WebContext')

const MobileContextSchema = z
  .object({
    deviceId: z.string().exactOptional().openapi({ type: 'string' }),
    platform: z
      .enum(['ios', 'android'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['ios', 'android'] }),
    appVersion: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      deviceId: { type: 'string' },
      platform: { type: 'string', enum: ['ios', 'android'] },
      appVersion: { type: 'string' },
    },
  })
  .openapi('MobileContext')

const ApiContextSchema = z
  .object({
    apiKey: z.string().exactOptional().openapi({ type: 'string' }),
    clientId: z.string().exactOptional().openapi({ type: 'string' }),
    ipAddress: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      apiKey: { type: 'string' },
      clientId: { type: 'string' },
      ipAddress: { type: 'string' },
    },
  })
  .openapi('ApiContext')

const EventContextSchema = z
  .union([WebContextSchema, MobileContextSchema, ApiContextSchema])
  .openapi({
    anyOf: [
      { $ref: '#/components/schemas/WebContext' },
      { $ref: '#/components/schemas/MobileContext' },
      { $ref: '#/components/schemas/ApiContext' },
    ],
  })
  .openapi('EventContext')

const EventSchema = z
  .object({
    eventType: z.string().openapi({ type: 'string' }),
    payload: EventPayloadSchema,
    context: EventContextSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['eventType', 'payload'],
    properties: {
      eventType: { type: 'string' },
      payload: { $ref: '#/components/schemas/EventPayload' },
      context: { $ref: '#/components/schemas/EventContext' },
    },
  })
  .openapi('Event')

const BaseEventPayloadSchema = z
  .object({
    timestamp: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    source: z.string().exactOptional().openapi({ type: 'string' }),
    correlationId: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      timestamp: { type: 'string', format: 'date-time' },
      source: { type: 'string' },
      correlationId: { type: 'string' },
    },
  })
  .openapi('BaseEventPayload')

const UserStateSchema = z
  .object({
    status: z.string().exactOptional().openapi({ type: 'string' }),
    roles: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    preferences: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      status: { type: 'string' },
      roles: { type: 'array', items: { type: 'string' } },
      preferences: { type: 'object' },
    },
  })
  .openapi('UserState')

const UserEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
      userAction: z
        .enum(['login', 'logout', 'register', 'update', 'delete'])
        .exactOptional()
        .openapi({ type: 'string', enum: ['login', 'logout', 'register', 'update', 'delete'] }),
      previousState: UserStateSchema.exactOptional(),
      newState: UserStateSchema.exactOptional(),
    })
    .openapi({
      type: 'object',
      required: ['userId'],
      properties: {
        userId: { type: 'string', format: 'uuid' },
        userAction: { type: 'string', enum: ['login', 'logout', 'register', 'update', 'delete'] },
        previousState: { $ref: '#/components/schemas/UserState' },
        newState: { $ref: '#/components/schemas/UserState' },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEventPayload' },
      {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string', format: 'uuid' },
          userAction: { type: 'string', enum: ['login', 'logout', 'register', 'update', 'delete'] },
          previousState: { $ref: '#/components/schemas/UserState' },
          newState: { $ref: '#/components/schemas/UserState' },
        },
      },
    ],
  })
  .openapi('UserEventPayload')

const OrderItemSchema = z
  .object({
    productId: z.string().openapi({ type: 'string' }),
    quantity: z.int().openapi({ type: 'integer' }),
    price: z.number().exactOptional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    required: ['productId', 'quantity'],
    properties: {
      productId: { type: 'string' },
      quantity: { type: 'integer' },
      price: { type: 'number' },
    },
  })
  .openapi('OrderItem')

const OrderEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      orderId: z.string().openapi({ type: 'string' }),
      orderAction: z
        .enum(['created', 'updated', 'cancelled', 'completed'])
        .exactOptional()
        .openapi({ type: 'string', enum: ['created', 'updated', 'cancelled', 'completed'] }),
      items: z
        .array(OrderItemSchema)
        .exactOptional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
    })
    .openapi({
      type: 'object',
      required: ['orderId'],
      properties: {
        orderId: { type: 'string' },
        orderAction: { type: 'string', enum: ['created', 'updated', 'cancelled', 'completed'] },
        items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEventPayload' },
      {
        type: 'object',
        required: ['orderId'],
        properties: {
          orderId: { type: 'string' },
          orderAction: { type: 'string', enum: ['created', 'updated', 'cancelled', 'completed'] },
          items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
        },
      },
    ],
  })
  .openapi('OrderEventPayload')

const SystemEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      component: z.string().openapi({ type: 'string' }),
      severity: z
        .enum(['info', 'warning', 'error', 'critical'])
        .openapi({ type: 'string', enum: ['info', 'warning', 'error', 'critical'] }),
      metrics: z
        .record(z.string(), z.number().openapi({ type: 'number' }))
        .exactOptional()
        .openapi({ type: 'object', additionalProperties: { type: 'number' } }),
    })
    .openapi({
      type: 'object',
      required: ['component', 'severity'],
      properties: {
        component: { type: 'string' },
        severity: { type: 'string', enum: ['info', 'warning', 'error', 'critical'] },
        metrics: { type: 'object', additionalProperties: { type: 'number' } },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEventPayload' },
      {
        type: 'object',
        required: ['component', 'severity'],
        properties: {
          component: { type: 'string' },
          severity: { type: 'string', enum: ['info', 'warning', 'error', 'critical'] },
          metrics: { type: 'object', additionalProperties: { type: 'number' } },
        },
      },
    ],
  })
  .openapi('SystemEventPayload')

const CustomEventPayloadSchema = BaseEventPayloadSchema.and(
  z
    .object({
      customType: z.string().exactOptional().openapi({ type: 'string' }),
      data: z
        .looseObject({})
        .exactOptional()
        .openapi({ type: 'object', additionalProperties: true }),
    })
    .openapi({
      type: 'object',
      properties: {
        customType: { type: 'string' },
        data: { type: 'object', additionalProperties: true },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEventPayload' },
      {
        type: 'object',
        properties: {
          customType: { type: 'string' },
          data: { type: 'object', additionalProperties: true },
        },
      },
    ],
  })
  .openapi('CustomEventPayload')

type EventPayloadType =
  | z.infer<typeof UserEventPayloadSchema>
  | z.infer<typeof OrderEventPayloadSchema>
  | z.infer<typeof SystemEventPayloadSchema>
  | z.infer<typeof CustomEventPayloadSchema>

const ConfigSectionSchema = z
  .object({
    enabled: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: { enabled: { type: 'boolean' }, description: { type: 'string' } },
  })
  .openapi('ConfigSection')

const ConfigSettingsSchema = z
  .record(z.string(), ConfigSectionSchema)
  .openapi({
    type: 'object',
    properties: {
      general: { $ref: '#/components/schemas/GeneralSettings' },
      features: { $ref: '#/components/schemas/FeatureFlags' },
      limits: { $ref: '#/components/schemas/RateLimits' },
    },
    additionalProperties: { $ref: '#/components/schemas/ConfigSection' },
  })
  .openapi('ConfigSettings')

const ConfigValueSchema: z.ZodType<ConfigValueType> = z
  .lazy(() =>
    z
      .xor([
        z.string().openapi({ type: 'string' }),
        z.number().openapi({ type: 'number' }),
        z.boolean().openapi({ type: 'boolean' }),
        z
          .array(ConfigValueSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ConfigValue' } }),
        z
          .record(z.string(), ConfigValueSchema)
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
          }),
      ])
      .openapi({
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'array', items: { $ref: '#/components/schemas/ConfigValue' } },
          { type: 'object', additionalProperties: { $ref: '#/components/schemas/ConfigValue' } },
        ],
      }),
  )
  .openapi('ConfigValue')

const ConfigurationSchema = BaseEntitySchema.and(
  z
    .object({
      settings: ConfigSettingsSchema,
      overrides: z
        .record(z.string(), ConfigValueSchema)
        .exactOptional()
        .openapi({
          type: 'object',
          additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
        }),
    })
    .openapi({
      type: 'object',
      required: ['settings'],
      properties: {
        settings: { $ref: '#/components/schemas/ConfigSettings' },
        overrides: {
          type: 'object',
          additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
        },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEntity' },
      {
        type: 'object',
        required: ['settings'],
        properties: {
          settings: { $ref: '#/components/schemas/ConfigSettings' },
          overrides: {
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
          },
        },
      },
    ],
  })
  .openapi('Configuration')

const GeneralSettingsSchema = ConfigSectionSchema.and(
  z
    .object({
      environment: z.string().exactOptional().openapi({ type: 'string' }),
      debug: z.boolean().exactOptional().openapi({ type: 'boolean' }),
      logLevel: z.string().exactOptional().openapi({ type: 'string' }),
    })
    .openapi({
      type: 'object',
      properties: {
        environment: { type: 'string' },
        debug: { type: 'boolean' },
        logLevel: { type: 'string' },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      {
        type: 'object',
        properties: {
          environment: { type: 'string' },
          debug: { type: 'boolean' },
          logLevel: { type: 'string' },
        },
      },
    ],
  })
  .openapi('GeneralSettings')

const FeatureFlagSchema: z.ZodType<FeatureFlagType> = z
  .lazy(() =>
    z
      .xor([z.boolean().openapi({ type: 'boolean' }), ConditionalFeatureFlagSchema])
      .openapi({
        oneOf: [{ type: 'boolean' }, { $ref: '#/components/schemas/ConditionalFeatureFlag' }],
      }),
  )
  .openapi('FeatureFlag')

const FeatureFlagsSchema = ConfigSectionSchema.and(
  z
    .record(z.string(), FeatureFlagSchema)
    .openapi({
      type: 'object',
      additionalProperties: { $ref: '#/components/schemas/FeatureFlag' },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      { type: 'object', additionalProperties: { $ref: '#/components/schemas/FeatureFlag' } },
    ],
  })
  .openapi('FeatureFlags')

const UserConditionSchema = z
  .object({
    type: z.literal('user').openapi({ type: 'string' }),
    userIds: z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'userIds'],
    properties: {
      type: { type: 'string', const: 'user' },
      userIds: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('UserCondition')

const TimeConditionSchema = z
  .object({
    type: z.literal('time').openapi({ type: 'string' }),
    startTime: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    endTime: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['type'],
    properties: {
      type: { type: 'string', const: 'time' },
      startTime: { type: 'string', format: 'date-time' },
      endTime: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('TimeCondition')

const GeoConditionSchema = z
  .object({
    type: z.literal('geo').openapi({ type: 'string' }),
    regions: z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'regions'],
    properties: {
      type: { type: 'string', const: 'geo' },
      regions: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('GeoCondition')

const FeatureConditionSchema = z
  .union([UserConditionSchema, TimeConditionSchema, GeoConditionSchema])
  .openapi({
    anyOf: [
      { $ref: '#/components/schemas/UserCondition' },
      { $ref: '#/components/schemas/TimeCondition' },
      { $ref: '#/components/schemas/GeoCondition' },
    ],
  })
  .openapi('FeatureCondition')

const ConditionalFeatureFlagSchema = z
  .object({
    enabled: z.boolean().openapi({ type: 'boolean' }),
    conditions: z
      .array(FeatureConditionSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/FeatureCondition' } }),
    rolloutPercentage: z
      .int()
      .min(0)
      .max(100)
      .exactOptional()
      .openapi({ type: 'integer', minimum: 0, maximum: 100 }),
  })
  .openapi({
    type: 'object',
    required: ['enabled'],
    properties: {
      enabled: { type: 'boolean' },
      conditions: { type: 'array', items: { $ref: '#/components/schemas/FeatureCondition' } },
      rolloutPercentage: { type: 'integer', minimum: 0, maximum: 100 },
    },
  })
  .openapi('ConditionalFeatureFlag')

type FeatureFlagType = boolean | z.infer<typeof ConditionalFeatureFlagSchema>

const RateLimitSchema = z
  .object({
    limit: z.int().openapi({ type: 'integer' }),
    window: z.int().openapi({ type: 'integer' }),
    burstLimit: z.int().exactOptional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['limit', 'window'],
    properties: {
      limit: { type: 'integer' },
      window: { type: 'integer' },
      burstLimit: { type: 'integer' },
    },
  })
  .openapi('RateLimit')

const RateLimitsSchema = ConfigSectionSchema.and(
  z
    .record(z.string(), RateLimitSchema)
    .openapi({ type: 'object', additionalProperties: { $ref: '#/components/schemas/RateLimit' } }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      { type: 'object', additionalProperties: { $ref: '#/components/schemas/RateLimit' } },
    ],
  })
  .openapi('RateLimits')

type ConfigValueType =
  | string
  | number
  | boolean
  | ConfigValueType[]
  | Record<string, ConfigValueType>

const ConfigurationUpdateSchema = z
  .object({
    settings: ConfigSettingsSchema.exactOptional(),
    overrides: z
      .record(z.string(), ConfigValueSchema)
      .exactOptional()
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      settings: { $ref: '#/components/schemas/ConfigSettings' },
      overrides: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
      },
    },
  })
  .and(VersionableSchema)
  .openapi({
    allOf: [
      {
        type: 'object',
        properties: {
          settings: { $ref: '#/components/schemas/ConfigSettings' },
          overrides: {
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
          },
        },
      },
      { $ref: '#/components/schemas/Versionable' },
    ],
  })
  .openapi('ConfigurationUpdate')

const ComputeResourceSchema: z.ZodType<ComputeResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('compute').exactOptional().openapi({ type: 'string' }),
          cpu: CpuSpecSchema,
          memory: MemorySpecSchema,
          storage: z
            .array(StorageResourceSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/StorageResource' } }),
        })
        .openapi({
          type: 'object',
          required: ['cpu', 'memory'],
          properties: {
            resourceType: { type: 'string', const: 'compute' },
            cpu: { $ref: '#/components/schemas/CpuSpec' },
            memory: { $ref: '#/components/schemas/MemorySpec' },
            storage: { type: 'array', items: { $ref: '#/components/schemas/StorageResource' } },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseResource' },
        {
          type: 'object',
          required: ['cpu', 'memory'],
          properties: {
            resourceType: { type: 'string', const: 'compute' },
            cpu: { $ref: '#/components/schemas/CpuSpec' },
            memory: { $ref: '#/components/schemas/MemorySpec' },
            storage: { type: 'array', items: { $ref: '#/components/schemas/StorageResource' } },
          },
        },
      ],
    }),
  )
  .openapi('ComputeResource')

const StorageResourceSchema: z.ZodType<StorageResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('storage').exactOptional().openapi({ type: 'string' }),
          size: z.int().openapi({ type: 'integer' }),
          storageType: z
            .enum(['ssd', 'hdd', 'nvme'])
            .openapi({ type: 'string', enum: ['ssd', 'hdd', 'nvme'] }),
          iops: z.int().exactOptional().openapi({ type: 'integer' }),
          attachedTo: ComputeResourceSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['size', 'storageType'],
          properties: {
            resourceType: { type: 'string', const: 'storage' },
            size: { type: 'integer' },
            storageType: { type: 'string', enum: ['ssd', 'hdd', 'nvme'] },
            iops: { type: 'integer' },
            attachedTo: { $ref: '#/components/schemas/ComputeResource' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseResource' },
        {
          type: 'object',
          required: ['size', 'storageType'],
          properties: {
            resourceType: { type: 'string', const: 'storage' },
            size: { type: 'integer' },
            storageType: { type: 'string', enum: ['ssd', 'hdd', 'nvme'] },
            iops: { type: 'integer' },
            attachedTo: { $ref: '#/components/schemas/ComputeResource' },
          },
        },
      ],
    }),
  )
  .openapi('StorageResource')

const NetworkResourceSchema: z.ZodType<NetworkResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('network').exactOptional().openapi({ type: 'string' }),
          cidr: z.string().openapi({ type: 'string' }),
          subnets: z
            .array(NetworkResourceSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/NetworkResource' } }),
          parentNetwork: NetworkResourceSchema.exactOptional(),
          connectedResources: z
            .array(
              z
                .union([ComputeResourceSchema, StorageResourceSchema])
                .openapi({
                  anyOf: [
                    { $ref: '#/components/schemas/ComputeResource' },
                    { $ref: '#/components/schemas/StorageResource' },
                  ],
                }),
            )
            .exactOptional()
            .openapi({
              type: 'array',
              items: {
                anyOf: [
                  { $ref: '#/components/schemas/ComputeResource' },
                  { $ref: '#/components/schemas/StorageResource' },
                ],
              },
            }),
        })
        .openapi({
          type: 'object',
          required: ['cidr'],
          properties: {
            resourceType: { type: 'string', const: 'network' },
            cidr: { type: 'string' },
            subnets: { type: 'array', items: { $ref: '#/components/schemas/NetworkResource' } },
            parentNetwork: { $ref: '#/components/schemas/NetworkResource' },
            connectedResources: {
              type: 'array',
              items: {
                anyOf: [
                  { $ref: '#/components/schemas/ComputeResource' },
                  { $ref: '#/components/schemas/StorageResource' },
                ],
              },
            },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseResource' },
        {
          type: 'object',
          required: ['cidr'],
          properties: {
            resourceType: { type: 'string', const: 'network' },
            cidr: { type: 'string' },
            subnets: { type: 'array', items: { $ref: '#/components/schemas/NetworkResource' } },
            parentNetwork: { $ref: '#/components/schemas/NetworkResource' },
            connectedResources: {
              type: 'array',
              items: {
                anyOf: [
                  { $ref: '#/components/schemas/ComputeResource' },
                  { $ref: '#/components/schemas/StorageResource' },
                ],
              },
            },
          },
        },
      ],
    }),
  )
  .openapi('NetworkResource')

const CompositeResourceSchema: z.ZodType<CompositeResourceType> = z
  .lazy(() =>
    BaseResourceSchema.and(
      z
        .object({
          resourceType: z.literal('composite').exactOptional().openapi({ type: 'string' }),
          components: z
            .array(ResourceSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Resource' } }),
          template: ResourceTemplateSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['components'],
          properties: {
            resourceType: { type: 'string', const: 'composite' },
            components: { type: 'array', items: { $ref: '#/components/schemas/Resource' } },
            template: { $ref: '#/components/schemas/ResourceTemplate' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/BaseResource' },
        {
          type: 'object',
          required: ['components'],
          properties: {
            resourceType: { type: 'string', const: 'composite' },
            components: { type: 'array', items: { $ref: '#/components/schemas/Resource' } },
            template: { $ref: '#/components/schemas/ResourceTemplate' },
          },
        },
      ],
    }),
  )
  .openapi('CompositeResource')

type ResourceType =
  | z.infer<typeof ComputeResourceSchema>
  | z.infer<typeof StorageResourceSchema>
  | z.infer<typeof NetworkResourceSchema>
  | z.infer<typeof CompositeResourceSchema>

const ResourceSchema: z.ZodType<ResourceType> = z
  .lazy(() =>
    z
      .discriminatedUnion('resourceType', [
        ComputeResourceSchema,
        StorageResourceSchema,
        NetworkResourceSchema,
        CompositeResourceSchema,
      ])
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/ComputeResource' },
          { $ref: '#/components/schemas/StorageResource' },
          { $ref: '#/components/schemas/NetworkResource' },
          { $ref: '#/components/schemas/CompositeResource' },
        ],
        discriminator: {
          propertyName: 'resourceType',
          mapping: {
            compute: '#/components/schemas/ComputeResource',
            storage: '#/components/schemas/StorageResource',
            network: '#/components/schemas/NetworkResource',
            composite: '#/components/schemas/CompositeResource',
          },
        },
      }),
  )
  .openapi('Resource')

const ResourceStatusSchema = z
  .object({
    state: z
      .enum(['pending', 'provisioning', 'running', 'stopped', 'failed', 'terminated'])
      .openapi({
        type: 'string',
        enum: ['pending', 'provisioning', 'running', 'stopped', 'failed', 'terminated'],
      }),
    health: z
      .enum(['healthy', 'degraded', 'unhealthy', 'unknown'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['healthy', 'degraded', 'unhealthy', 'unknown'] }),
    lastChecked: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['state'],
    properties: {
      state: {
        type: 'string',
        enum: ['pending', 'provisioning', 'running', 'stopped', 'failed', 'terminated'],
      },
      health: { type: 'string', enum: ['healthy', 'degraded', 'unhealthy', 'unknown'] },
      lastChecked: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ResourceStatus')

const ResourceDependencySchema: z.ZodType<ResourceDependencyType> = z
  .lazy(() =>
    z
      .object({
        resourceId: z.string().openapi({ type: 'string' }),
        type: z.enum(['hard', 'soft']).openapi({ type: 'string', enum: ['hard', 'soft'] }),
        resource: ResourceSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['resourceId', 'type'],
        properties: {
          resourceId: { type: 'string' },
          type: { type: 'string', enum: ['hard', 'soft'] },
          resource: { $ref: '#/components/schemas/Resource' },
        },
      }),
  )
  .openapi('ResourceDependency')

const ResourceCostSchema = z
  .object({
    hourly: z.number().exactOptional().openapi({ type: 'number' }),
    monthly: z.number().exactOptional().openapi({ type: 'number' }),
    currency: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      hourly: { type: 'number' },
      monthly: { type: 'number' },
      currency: { type: 'string' },
    },
  })
  .openapi('ResourceCost')

type BaseResourceType = z.infer<typeof ExtendedEntitySchema> & {
  resourceType: string
  status: z.infer<typeof ResourceStatusSchema>
  dependencies?: z.infer<typeof ResourceDependencySchema>[]
  cost?: z.infer<typeof ResourceCostSchema>
}

const BaseResourceSchema: z.ZodType<BaseResourceType> = z
  .lazy(() =>
    ExtendedEntitySchema.and(
      z
        .object({
          resourceType: z.string().openapi({ type: 'string' }),
          status: ResourceStatusSchema,
          dependencies: z
            .array(ResourceDependencySchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ResourceDependency' } }),
          cost: ResourceCostSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['resourceType', 'status'],
          properties: {
            resourceType: { type: 'string' },
            status: { $ref: '#/components/schemas/ResourceStatus' },
            dependencies: {
              type: 'array',
              items: { $ref: '#/components/schemas/ResourceDependency' },
            },
            cost: { $ref: '#/components/schemas/ResourceCost' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/ExtendedEntity' },
        {
          type: 'object',
          required: ['resourceType', 'status'],
          properties: {
            resourceType: { type: 'string' },
            status: { $ref: '#/components/schemas/ResourceStatus' },
            dependencies: {
              type: 'array',
              items: { $ref: '#/components/schemas/ResourceDependency' },
            },
            cost: { $ref: '#/components/schemas/ResourceCost' },
          },
        },
      ],
    }),
  )
  .openapi('BaseResource')

type ResourceDependencyType = {
  resourceId: string
  type: 'hard' | 'soft'
  resource?: z.infer<typeof ResourceSchema>
}

const CpuSpecSchema = z
  .object({
    cores: z.int().openapi({ type: 'integer' }),
    architecture: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['cores'],
    properties: { cores: { type: 'integer' }, architecture: { type: 'string' } },
  })
  .openapi('CpuSpec')

const MemorySpecSchema = z
  .object({
    size: z.int().openapi({ type: 'integer' }),
    unit: z
      .enum(['MB', 'GB', 'TB'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['MB', 'GB', 'TB'] }),
  })
  .openapi({
    type: 'object',
    required: ['size'],
    properties: { size: { type: 'integer' }, unit: { type: 'string', enum: ['MB', 'GB', 'TB'] } },
  })
  .openapi('MemorySpec')

type ComputeResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'compute'
  cpu: z.infer<typeof CpuSpecSchema>
  memory: z.infer<typeof MemorySpecSchema>
  storage?: z.infer<typeof StorageResourceSchema>[]
}

type StorageResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'storage'
  size: number
  storageType: 'ssd' | 'hdd' | 'nvme'
  iops?: number
  attachedTo?: z.infer<typeof ComputeResourceSchema>
}

type NetworkResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'network'
  cidr: string
  subnets?: NetworkResourceType[]
  parentNetwork?: NetworkResourceType
  connectedResources?: unknown[]
}

const ResourceTemplateSchema = z
  .object({
    name: z.string().exactOptional().openapi({ type: 'string' }),
    version: z.string().exactOptional().openapi({ type: 'string' }),
    parameters: z
      .record(z.string(), ConfigValueSchema)
      .exactOptional()
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      version: { type: 'string' },
      parameters: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
      },
    },
  })
  .openapi('ResourceTemplate')

type CompositeResourceType = z.infer<typeof BaseResourceSchema> & {
  resourceType?: 'composite'
  components: z.infer<typeof ResourceSchema>[]
  template?: z.infer<typeof ResourceTemplateSchema>
}

const ValidationTargetSchema = z
  .xor([ResourceSchema, ConfigurationSchema, MessageSchema])
  .openapi({
    oneOf: [
      { $ref: '#/components/schemas/Resource' },
      { $ref: '#/components/schemas/Configuration' },
      { $ref: '#/components/schemas/Message' },
    ],
  })
  .openapi('ValidationTarget')

const ValidationRuleSchema: z.ZodType<ValidationRuleType> = z
  .lazy(() =>
    z
      .object({
        ruleType: z.string().openapi({ type: 'string' }),
        severity: z
          .enum(['error', 'warning', 'info'])
          .exactOptional()
          .openapi({ type: 'string', enum: ['error', 'warning', 'info'] }),
      })
      .openapi({
        type: 'object',
        required: ['ruleType'],
        properties: {
          ruleType: { type: 'string' },
          severity: { type: 'string', enum: ['error', 'warning', 'info'] },
        },
      })
      .and(
        z
          .xor([
            SchemaValidationRuleSchema,
            BusinessValidationRuleSchema,
            CustomValidationRuleSchema,
          ])
          .openapi({
            oneOf: [
              { $ref: '#/components/schemas/SchemaValidationRule' },
              { $ref: '#/components/schemas/BusinessValidationRule' },
              { $ref: '#/components/schemas/CustomValidationRule' },
            ],
          }),
      )
      .openapi({
        allOf: [
          {
            type: 'object',
            required: ['ruleType'],
            properties: {
              ruleType: { type: 'string' },
              severity: { type: 'string', enum: ['error', 'warning', 'info'] },
            },
          },
          {
            oneOf: [
              { $ref: '#/components/schemas/SchemaValidationRule' },
              { $ref: '#/components/schemas/BusinessValidationRule' },
              { $ref: '#/components/schemas/CustomValidationRule' },
            ],
          },
        ],
      }),
  )
  .openapi('ValidationRule')

const ValidationRequestSchema = z
  .object({
    target: ValidationTargetSchema,
    rules: z
      .array(ValidationRuleSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ValidationRule' } }),
  })
  .openapi({
    type: 'object',
    required: ['target', 'rules'],
    properties: {
      target: { $ref: '#/components/schemas/ValidationTarget' },
      rules: { type: 'array', items: { $ref: '#/components/schemas/ValidationRule' } },
    },
  })
  .openapi('ValidationRequest')

const SchemaValidationRuleSchema = z
  .object({
    ruleType: z.literal('schema').exactOptional().openapi({ type: 'string' }),
    schema: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['schema'],
    properties: { ruleType: { type: 'string', const: 'schema' }, schema: { type: 'object' } },
  })
  .openapi('SchemaValidationRule')

const BusinessValidationRuleSchema = z
  .object({
    ruleType: z.literal('business').exactOptional().openapi({ type: 'string' }),
    expression: z.string().openapi({ type: 'string' }),
    parameters: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['expression'],
    properties: {
      ruleType: { type: 'string', const: 'business' },
      expression: { type: 'string' },
      parameters: { type: 'object' },
    },
  })
  .openapi('BusinessValidationRule')

const CustomValidationRuleSchema = z
  .object({
    ruleType: z.literal('custom').exactOptional().openapi({ type: 'string' }),
    handler: z.string().openapi({ type: 'string' }),
    config: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['handler'],
    properties: {
      ruleType: { type: 'string', const: 'custom' },
      handler: { type: 'string' },
      config: { type: 'object' },
    },
  })
  .openapi('CustomValidationRule')

type ValidationRuleType = { ruleType: string; severity?: 'error' | 'warning' | 'info' } & (
  | z.infer<typeof SchemaValidationRuleSchema>
  | z.infer<typeof BusinessValidationRuleSchema>
  | z.infer<typeof CustomValidationRuleSchema>
)

const SchemaIssueSchema = z
  .object({
    keyword: z.string().exactOptional().openapi({ type: 'string' }),
    expected: z.object({}).exactOptional().openapi({ type: 'object' }),
    actual: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      keyword: { type: 'string' },
      expected: { type: 'object' },
      actual: { type: 'object' },
    },
  })
  .openapi('SchemaIssue')

const BusinessIssueSchema = z
  .object({
    rule: z.string().exactOptional().openapi({ type: 'string' }),
    context: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: { rule: { type: 'string' }, context: { type: 'object' } },
  })
  .openapi('BusinessIssue')

const ValidationIssueSchema = z
  .object({
    path: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
    severity: z
      .enum(['error', 'warning', 'info'])
      .openapi({ type: 'string', enum: ['error', 'warning', 'info'] }),
    code: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['path', 'message', 'severity'],
    properties: {
      path: { type: 'string' },
      message: { type: 'string' },
      severity: { type: 'string', enum: ['error', 'warning', 'info'] },
      code: { type: 'string' },
    },
  })
  .and(
    z
      .union([SchemaIssueSchema, BusinessIssueSchema])
      .openapi({
        anyOf: [
          { $ref: '#/components/schemas/SchemaIssue' },
          { $ref: '#/components/schemas/BusinessIssue' },
        ],
      }),
  )
  .openapi({
    allOf: [
      {
        type: 'object',
        required: ['path', 'message', 'severity'],
        properties: {
          path: { type: 'string' },
          message: { type: 'string' },
          severity: { type: 'string', enum: ['error', 'warning', 'info'] },
          code: { type: 'string' },
        },
      },
      {
        anyOf: [
          { $ref: '#/components/schemas/SchemaIssue' },
          { $ref: '#/components/schemas/BusinessIssue' },
        ],
      },
    ],
  })
  .openapi('ValidationIssue')

const ValidationResultSchema = z
  .object({
    valid: z.boolean().openapi({ type: 'boolean' }),
    issues: z
      .array(ValidationIssueSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ValidationIssue' } }),
    metadata: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['valid', 'issues'],
    properties: {
      valid: { type: 'boolean' },
      issues: { type: 'array', items: { $ref: '#/components/schemas/ValidationIssue' } },
      metadata: { type: 'object' },
    },
  })
  .openapi('ValidationResult')

export const postMessagesRoute = createRoute({
  method: 'post',
  path: '/messages',
  operationId: 'sendMessage',
  request: { body: { content: { 'application/json': { schema: MessageSchema } } } },
  responses: {
    201: {
      description: 'Message sent',
      content: { 'application/json': { schema: MessageResponseSchema } },
    },
  },
})

export const postEventsRoute = createRoute({
  method: 'post',
  path: '/events',
  operationId: 'processEvent',
  request: { body: { content: { 'application/json': { schema: EventSchema } } } },
  responses: { 200: { description: 'Event processed' } },
})

export const getConfigsRoute = createRoute({
  method: 'get',
  path: '/configs',
  operationId: 'getConfig',
  responses: {
    200: {
      description: 'Configuration',
      content: { 'application/json': { schema: ConfigurationSchema } },
    },
  },
})

export const putConfigsRoute = createRoute({
  method: 'put',
  path: '/configs',
  operationId: 'updateConfig',
  request: { body: { content: { 'application/json': { schema: ConfigurationUpdateSchema } } } },
  responses: { 200: { description: 'Updated' } },
})

export const postResourcesRoute = createRoute({
  method: 'post',
  path: '/resources',
  operationId: 'createResource',
  request: { body: { content: { 'application/json': { schema: ResourceSchema } } } },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: ResourceSchema } } },
  },
})

export const postValidationsRoute = createRoute({
  method: 'post',
  path: '/validations',
  operationId: 'validate',
  request: { body: { content: { 'application/json': { schema: ValidationRequestSchema } } } },
  responses: {
    200: {
      description: 'Validation result',
      content: { 'application/json': { schema: ValidationResultSchema } },
    },
  },
})
