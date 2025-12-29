import { createRoute, z } from '@hono/zod-openapi'

const IdentifiableSchema = z
  .object({ id: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
  .openapi({
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string', format: 'uuid' } },
  })

const TimestampedSchema = z
  .object({
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })

const AuditableSchema = z
  .intersection(
    TimestampedSchema,
    z
      .object({
        createdBy: z.string().openapi({ type: 'string' }),
        updatedBy: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { createdBy: { type: 'string' }, updatedBy: { type: 'string' } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Timestamped' },
      {
        type: 'object',
        properties: { createdBy: { type: 'string' }, updatedBy: { type: 'string' } },
      },
    ],
  })

const VersionableSchema = z
  .object({
    version: z.int().openapi({ type: 'integer' }),
    etag: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { version: { type: 'integer' }, etag: { type: 'string' } },
  })

const BaseEntitySchema = z
  .intersection(IdentifiableSchema, AuditableSchema, VersionableSchema)
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Identifiable' },
      { $ref: '#/components/schemas/Auditable' },
      { $ref: '#/components/schemas/Versionable' },
    ],
  })

const ExtendedEntitySchema = z
  .intersection(
    BaseEntitySchema,
    z
      .object({
        name: z.string().openapi({ type: 'string' }),
        description: z.string().optional().openapi({ type: 'string' }),
        tags: z
          .array(z.string().optional().openapi({ type: 'string' }))
          .optional()
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
  .optional()
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

const MessageMetadataSchema = z
  .object({
    priority: z
      .enum(['low', 'normal', 'high', 'urgent'])
      .optional()
      .openapi({ type: 'string', enum: ['low', 'normal', 'high', 'urgent'] }),
    expiresAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    replyTo: MessageSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'] },
      expiresAt: { type: 'string', format: 'date-time' },
      replyTo: { $ref: '#/components/schemas/Message' },
    },
  })

const ParticipantSchema = z
  .intersection(
    IdentifiableSchema,
    z
      .object({
        name: z.string().openapi({ type: 'string' }),
        avatar: z.url().optional().openapi({ type: 'string', format: 'uri' }),
      })
      .openapi({
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string' }, avatar: { type: 'string', format: 'uri' } },
      }),
  )
  .optional()
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

const BaseMessageSchema = z
  .intersection(
    BaseEntitySchema,
    z
      .object({
        type: z.string().openapi({ type: 'string' }),
        sender: ParticipantSchema,
        recipient: ParticipantSchema,
        metadata: MessageMetadataSchema,
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
  )
  .optional()
  .openapi({
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
  })

const CompositeMessageSchema = z
  .intersection(
    BaseMessageSchema,
    z
      .object({
        type: z.literal('composite').optional().openapi({ type: 'string' }),
        parts: z
          .array(MessageSchema)
          .min(2)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Message' }, minItems: 2 }),
      })
      .openapi({
        type: 'object',
        required: ['parts'],
        properties: {
          type: { type: 'string', const: 'composite' },
          parts: { type: 'array', items: { $ref: '#/components/schemas/Message' }, minItems: 2 },
        },
      }),
  )
  .optional()
  .openapi({
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
  })

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

const MediaContentSchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    mimeType: z.string().openapi({ type: 'string' }),
    size: z.int().openapi({ type: 'integer' }),
    checksum: z.string().optional().openapi({ type: 'string' }),
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

const ImageMessageSchema = z
  .intersection(
    BaseMessageSchema,
    MediaContentSchema,
    z
      .object({
        type: z.literal('image').optional().openapi({ type: 'string' }),
        dimensions: DimensionsSchema,
        alt: z.string().optional().openapi({ type: 'string' }),
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
  .optional()
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
  })

const DocumentMessageSchema = z
  .intersection(
    BaseMessageSchema,
    MediaContentSchema,
    z
      .object({
        type: z.literal('document').optional().openapi({ type: 'string' }),
        pageCount: z.int().optional().openapi({ type: 'integer' }),
        preview: ImageMessageSchema,
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
  .optional()
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
  })

const VideoMessageSchema = z
  .intersection(
    BaseMessageSchema,
    MediaContentSchema,
    z
      .object({
        type: z.literal('video').optional().openapi({ type: 'string' }),
        duration: z.int().optional().openapi({ type: 'integer' }),
        thumbnail: ImageMessageSchema,
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
  .optional()
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
  })

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

const LinkRangeSchema = z
  .intersection(
    TextRangeSchema,
    z
      .object({ url: z.url().openapi({ type: 'string', format: 'uri' }) })
      .openapi({
        type: 'object',
        required: ['url'],
        properties: { url: { type: 'string', format: 'uri' } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/TextRange' },
      { type: 'object', required: ['url'], properties: { url: { type: 'string', format: 'uri' } } },
    ],
  })

const TextFormattingSchema = z
  .object({
    bold: z
      .array(TextRangeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TextRange' } }),
    italic: z
      .array(TextRangeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TextRange' } }),
    links: z
      .array(LinkRangeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/LinkRange' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      bold: { type: 'array', items: { $ref: '#/components/schemas/TextRange' } },
      italic: { type: 'array', items: { $ref: '#/components/schemas/TextRange' } },
      links: { type: 'array', items: { $ref: '#/components/schemas/LinkRange' } },
    },
  })

const TextMessageSchema = z
  .intersection(
    BaseMessageSchema,
    z
      .object({
        type: z.literal('text').optional().openapi({ type: 'string' }),
        content: z.string().openapi({ type: 'string' }),
        formatting: TextFormattingSchema,
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
  )
  .optional()
  .openapi({
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
  })

type MessageType = unknown | unknown | unknown | unknown | unknown

const MessageSchema: z.ZodType<MessageType> = z.lazy(() =>
  z
    .union([
      TextMessageSchema,
      ImageMessageSchema,
      VideoMessageSchema,
      DocumentMessageSchema,
      CompositeMessageSchema,
    ])
    .optional()
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

const DeliveryStatusSchema = z
  .object({
    sent: z.boolean().optional().openapi({ type: 'boolean' }),
    delivered: z.boolean().optional().openapi({ type: 'boolean' }),
    read: z.boolean().optional().openapi({ type: 'boolean' }),
    timestamps: z
      .object({
        sentAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
        deliveredAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
        readAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
      })
      .partial()
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

const MessageResponseSchema = z
  .intersection(
    MessageSchema,
    z
      .object({ deliveryStatus: DeliveryStatusSchema })
      .openapi({
        type: 'object',
        properties: { deliveryStatus: { $ref: '#/components/schemas/DeliveryStatus' } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Message' },
      {
        type: 'object',
        properties: { deliveryStatus: { $ref: '#/components/schemas/DeliveryStatus' } },
      },
    ],
  })

const ApiContextSchema = z
  .object({
    apiKey: z.string().openapi({ type: 'string' }),
    clientId: z.string().openapi({ type: 'string' }),
    ipAddress: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      apiKey: { type: 'string' },
      clientId: { type: 'string' },
      ipAddress: { type: 'string' },
    },
  })

const MobileContextSchema = z
  .object({
    deviceId: z.string().openapi({ type: 'string' }),
    platform: z.enum(['ios', 'android']).openapi({ type: 'string', enum: ['ios', 'android'] }),
    appVersion: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      deviceId: { type: 'string' },
      platform: { type: 'string', enum: ['ios', 'android'] },
      appVersion: { type: 'string' },
    },
  })

const WebContextSchema = z
  .object({
    userAgent: z.string().openapi({ type: 'string' }),
    referrer: z.string().openapi({ type: 'string' }),
    sessionId: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      userAgent: { type: 'string' },
      referrer: { type: 'string' },
      sessionId: { type: 'string' },
    },
  })

const EventContextSchema = z
  .union([WebContextSchema, MobileContextSchema, ApiContextSchema])
  .optional()
  .openapi({
    anyOf: [
      { $ref: '#/components/schemas/WebContext' },
      { $ref: '#/components/schemas/MobileContext' },
      { $ref: '#/components/schemas/ApiContext' },
    ],
  })

const BaseEventPayloadSchema = z
  .object({
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    source: z.string().openapi({ type: 'string' }),
    correlationId: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      timestamp: { type: 'string', format: 'date-time' },
      source: { type: 'string' },
      correlationId: { type: 'string' },
    },
  })

const CustomEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        customType: z.string().optional().openapi({ type: 'string' }),
        data: z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
      })
      .openapi({
        type: 'object',
        properties: {
          customType: { type: 'string' },
          data: { type: 'object', additionalProperties: true },
        },
      }),
  )
  .optional()
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

const SystemEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        component: z.string().openapi({ type: 'string' }),
        severity: z
          .enum(['info', 'warning', 'error', 'critical'])
          .openapi({ type: 'string', enum: ['info', 'warning', 'error', 'critical'] }),
        metrics: z
          .record(z.string(), z.number().optional().openapi({ type: 'number' }))
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
  .optional()
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

const OrderItemSchema = z
  .object({
    productId: z.string().openapi({ type: 'string' }),
    quantity: z.int().openapi({ type: 'integer' }),
    price: z.number().optional().openapi({ type: 'number' }),
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

const OrderEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        orderId: z.string().openapi({ type: 'string' }),
        orderAction: z
          .enum(['created', 'updated', 'cancelled', 'completed'])
          .optional()
          .openapi({ type: 'string', enum: ['created', 'updated', 'cancelled', 'completed'] }),
        items: z
          .array(OrderItemSchema)
          .optional()
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
  .optional()
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

const UserStateSchema = z
  .object({
    status: z.string().optional().openapi({ type: 'string' }),
    roles: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    preferences: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      status: { type: 'string' },
      roles: { type: 'array', items: { type: 'string' } },
      preferences: { type: 'object' },
    },
  })

const UserEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        userAction: z
          .enum(['login', 'logout', 'register', 'update', 'delete'])
          .optional()
          .openapi({ type: 'string', enum: ['login', 'logout', 'register', 'update', 'delete'] }),
        previousState: UserStateSchema,
        newState: UserStateSchema,
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
  .optional()
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

type EventPayloadType = unknown | unknown | unknown | unknown

const EventPayloadSchema: z.ZodType<EventPayloadType> = z.lazy(() =>
  z
    .union([
      UserEventPayloadSchema,
      OrderEventPayloadSchema,
      SystemEventPayloadSchema,
      CustomEventPayloadSchema,
    ])
    .optional()
    .openapi({
      anyOf: [
        { $ref: '#/components/schemas/UserEventPayload' },
        { $ref: '#/components/schemas/OrderEventPayload' },
        { $ref: '#/components/schemas/SystemEventPayload' },
        { $ref: '#/components/schemas/CustomEventPayload' },
      ],
    }),
)

const EventSchema = z
  .object({
    eventType: z.string().openapi({ type: 'string' }),
    payload: EventPayloadSchema,
    context: EventContextSchema,
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

type ConfigValueType = string | number | boolean | unknown[] | Record<string, unknown>

const ConfigValueSchema: z.ZodType<ConfigValueType> = z.lazy(() =>
  z
    .union([
      z.string().optional().openapi({ type: 'string' }),
      z.number().optional().openapi({ type: 'number' }),
      z.boolean().optional().openapi({ type: 'boolean' }),
      z
        .array(ConfigValueSchema)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/ConfigValue' } }),
      z
        .record(z.string(), ConfigValueSchema)
        .openapi({
          type: 'object',
          additionalProperties: { $ref: '#/components/schemas/ConfigValue' },
        }),
    ])
    .optional()
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

const ConfigSectionSchema = z
  .object({
    enabled: z.boolean().openapi({ type: 'boolean' }),
    description: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { enabled: { type: 'boolean' }, description: { type: 'string' } },
  })

const RateLimitSchema = z
  .object({
    limit: z.int().openapi({ type: 'integer' }),
    window: z.int().openapi({ type: 'integer' }),
    burstLimit: z.int().optional().openapi({ type: 'integer' }),
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

const RateLimitsSchema = z
  .intersection(
    ConfigSectionSchema,
    z
      .record(z.string(), RateLimitSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/RateLimit' },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      { type: 'object', additionalProperties: { $ref: '#/components/schemas/RateLimit' } },
    ],
  })

const GeoConditionSchema = z
  .object({
    type: z.literal('geo').openapi({ type: 'string' }),
    regions: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
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

const TimeConditionSchema = z
  .object({
    type: z.literal('time').openapi({ type: 'string' }),
    startTime: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    endTime: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
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

const UserConditionSchema = z
  .object({
    type: z.literal('user').openapi({ type: 'string' }),
    userIds: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
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

const FeatureConditionSchema = z
  .union([UserConditionSchema, TimeConditionSchema, GeoConditionSchema])
  .optional()
  .openapi({
    anyOf: [
      { $ref: '#/components/schemas/UserCondition' },
      { $ref: '#/components/schemas/TimeCondition' },
      { $ref: '#/components/schemas/GeoCondition' },
    ],
  })

const ConditionalFeatureFlagSchema = z
  .object({
    enabled: z.boolean().openapi({ type: 'boolean' }),
    conditions: z
      .array(FeatureConditionSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/FeatureCondition' } }),
    rolloutPercentage: z
      .int()
      .min(0)
      .max(100)
      .optional()
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

type FeatureFlagType = boolean | unknown

const FeatureFlagSchema: z.ZodType<FeatureFlagType> = z.lazy(() =>
  z
    .union([z.boolean().optional().openapi({ type: 'boolean' }), ConditionalFeatureFlagSchema])
    .optional()
    .openapi({
      oneOf: [{ type: 'boolean' }, { $ref: '#/components/schemas/ConditionalFeatureFlag' }],
    }),
)

const FeatureFlagsSchema = z
  .intersection(
    ConfigSectionSchema,
    z
      .record(z.string(), FeatureFlagSchema)
      .openapi({
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/FeatureFlag' },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      { type: 'object', additionalProperties: { $ref: '#/components/schemas/FeatureFlag' } },
    ],
  })

const GeneralSettingsSchema = z
  .intersection(
    ConfigSectionSchema,
    z
      .object({
        environment: z.string().openapi({ type: 'string' }),
        debug: z.boolean().openapi({ type: 'boolean' }),
        logLevel: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          environment: { type: 'string' },
          debug: { type: 'boolean' },
          logLevel: { type: 'string' },
        },
      }),
  )
  .optional()
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

const ConfigurationSchema = z
  .intersection(
    BaseEntitySchema,
    z
      .object({
        settings: ConfigSettingsSchema,
        overrides: z
          .record(z.string(), ConfigValueSchema)
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
  .optional()
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

const ConfigurationUpdateSchema = z
  .intersection(
    z
      .object({
        settings: ConfigSettingsSchema,
        overrides: z
          .record(z.string(), ConfigValueSchema)
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
      }),
    VersionableSchema,
  )
  .optional()
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

const ResourceTemplateSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    version: z.string().optional().openapi({ type: 'string' }),
    parameters: z
      .record(z.string(), ConfigValueSchema)
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

const ResourceCostSchema = z
  .object({
    hourly: z.number().openapi({ type: 'number' }),
    monthly: z.number().openapi({ type: 'number' }),
    currency: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      hourly: { type: 'number' },
      monthly: { type: 'number' },
      currency: { type: 'string' },
    },
  })

const ResourceDependencySchema = z
  .object({
    resourceId: z.string().openapi({ type: 'string' }),
    type: z.enum(['hard', 'soft']).openapi({ type: 'string', enum: ['hard', 'soft'] }),
    resource: ResourceSchema,
  })
  .openapi({
    type: 'object',
    required: ['resourceId', 'type'],
    properties: {
      resourceId: { type: 'string' },
      type: { type: 'string', enum: ['hard', 'soft'] },
      resource: { $ref: '#/components/schemas/Resource' },
    },
  })

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
      .optional()
      .openapi({ type: 'string', enum: ['healthy', 'degraded', 'unhealthy', 'unknown'] }),
    lastChecked: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
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

const BaseResourceSchema = z
  .intersection(
    ExtendedEntitySchema,
    z
      .object({
        resourceType: z.string().openapi({ type: 'string' }),
        status: ResourceStatusSchema,
        dependencies: z
          .array(ResourceDependencySchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ResourceDependency' } }),
        cost: ResourceCostSchema,
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
  )
  .optional()
  .openapi({
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
  })

const CompositeResourceSchema = z
  .intersection(
    BaseResourceSchema,
    z
      .object({
        resourceType: z.literal('composite').optional().openapi({ type: 'string' }),
        components: z
          .array(ResourceSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Resource' } }),
        template: ResourceTemplateSchema,
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
  )
  .optional()
  .openapi({
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
  })

const MemorySpecSchema = z
  .object({
    size: z.int().openapi({ type: 'integer' }),
    unit: z
      .enum(['MB', 'GB', 'TB'])
      .optional()
      .openapi({ type: 'string', enum: ['MB', 'GB', 'TB'] }),
  })
  .openapi({
    type: 'object',
    required: ['size'],
    properties: { size: { type: 'integer' }, unit: { type: 'string', enum: ['MB', 'GB', 'TB'] } },
  })

const CpuSpecSchema = z
  .object({
    cores: z.int().openapi({ type: 'integer' }),
    architecture: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['cores'],
    properties: { cores: { type: 'integer' }, architecture: { type: 'string' } },
  })

const ComputeResourceSchema = z
  .intersection(
    BaseResourceSchema,
    z
      .object({
        resourceType: z.literal('compute').optional().openapi({ type: 'string' }),
        cpu: CpuSpecSchema,
        memory: MemorySpecSchema,
        storage: z
          .array(StorageResourceSchema)
          .optional()
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
  )
  .optional()
  .openapi({
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
  })

const StorageResourceSchema = z
  .intersection(
    BaseResourceSchema,
    z
      .object({
        resourceType: z.literal('storage').optional().openapi({ type: 'string' }),
        size: z.int().openapi({ type: 'integer' }),
        storageType: z
          .enum(['ssd', 'hdd', 'nvme'])
          .openapi({ type: 'string', enum: ['ssd', 'hdd', 'nvme'] }),
        iops: z.int().optional().openapi({ type: 'integer' }),
        attachedTo: ComputeResourceSchema,
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
  )
  .optional()
  .openapi({
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
  })

type NetworkResourceType = unknown & {
  resourceType?: 'network'
  cidr: string
  subnets?: unknown[]
  parentNetwork?: unknown
  connectedResources?: (unknown | unknown)[]
}

const NetworkResourceSchema: z.ZodType<NetworkResourceType> = z.lazy(() =>
  z
    .intersection(
      BaseResourceSchema,
      z
        .object({
          resourceType: z.literal('network').optional().openapi({ type: 'string' }),
          cidr: z.string().openapi({ type: 'string' }),
          subnets: z
            .array(NetworkResourceSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/NetworkResource' } }),
          parentNetwork: NetworkResourceSchema,
          connectedResources: z
            .array(
              z
                .union([ComputeResourceSchema, StorageResourceSchema])
                .optional()
                .openapi({
                  anyOf: [
                    { $ref: '#/components/schemas/ComputeResource' },
                    { $ref: '#/components/schemas/StorageResource' },
                  ],
                }),
            )
            .optional()
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
    )
    .optional()
    .openapi({
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

type ResourceType = unknown | unknown | unknown | unknown

const ResourceSchema: z.ZodType<ResourceType> = z.lazy(() =>
  z
    .union([
      ComputeResourceSchema,
      StorageResourceSchema,
      NetworkResourceSchema,
      CompositeResourceSchema,
    ])
    .optional()
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

const CustomValidationRuleSchema = z
  .object({
    ruleType: z.literal('custom').optional().openapi({ type: 'string' }),
    handler: z.string().openapi({ type: 'string' }),
    config: z.object({}).openapi({ type: 'object' }),
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

const BusinessValidationRuleSchema = z
  .object({
    ruleType: z.literal('business').optional().openapi({ type: 'string' }),
    expression: z.string().openapi({ type: 'string' }),
    parameters: z.object({}).openapi({ type: 'object' }),
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

const SchemaValidationRuleSchema = z
  .object({
    ruleType: z.literal('schema').optional().openapi({ type: 'string' }),
    schema: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['schema'],
    properties: { ruleType: { type: 'string', const: 'schema' }, schema: { type: 'object' } },
  })

type ValidationRuleType = { ruleType: string; severity?: 'error' | 'warning' | 'info' } & (
  | unknown
  | unknown
  | unknown
)

const ValidationRuleSchema: z.ZodType<ValidationRuleType> = z.lazy(() =>
  z
    .intersection(
      z
        .object({
          ruleType: z.string().openapi({ type: 'string' }),
          severity: z
            .enum(['error', 'warning', 'info'])
            .optional()
            .openapi({ type: 'string', enum: ['error', 'warning', 'info'] }),
        })
        .openapi({
          type: 'object',
          required: ['ruleType'],
          properties: {
            ruleType: { type: 'string' },
            severity: { type: 'string', enum: ['error', 'warning', 'info'] },
          },
        }),
      z
        .union([
          SchemaValidationRuleSchema,
          BusinessValidationRuleSchema,
          CustomValidationRuleSchema,
        ])
        .optional()
        .openapi({
          oneOf: [
            { $ref: '#/components/schemas/SchemaValidationRule' },
            { $ref: '#/components/schemas/BusinessValidationRule' },
            { $ref: '#/components/schemas/CustomValidationRule' },
          ],
        }),
    )
    .optional()
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

const ValidationTargetSchema = z
  .union([ResourceSchema, ConfigurationSchema, MessageSchema])
  .optional()
  .openapi({
    oneOf: [
      { $ref: '#/components/schemas/Resource' },
      { $ref: '#/components/schemas/Configuration' },
      { $ref: '#/components/schemas/Message' },
    ],
  })

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

const BusinessIssueSchema = z
  .object({
    rule: z.string().optional().openapi({ type: 'string' }),
    context: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: { rule: { type: 'string' }, context: { type: 'object' } },
  })

const SchemaIssueSchema = z
  .object({
    keyword: z.string().optional().openapi({ type: 'string' }),
    expected: z.object({}).openapi({ type: 'object' }),
    actual: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      keyword: { type: 'string' },
      expected: { type: 'object' },
      actual: { type: 'object' },
    },
  })

const ValidationIssueSchema = z
  .intersection(
    z
      .object({
        path: z.string().openapi({ type: 'string' }),
        message: z.string().openapi({ type: 'string' }),
        severity: z
          .enum(['error', 'warning', 'info'])
          .openapi({ type: 'string', enum: ['error', 'warning', 'info'] }),
        code: z.string().optional().openapi({ type: 'string' }),
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
      }),
    z
      .union([SchemaIssueSchema, BusinessIssueSchema])
      .optional()
      .openapi({
        anyOf: [
          { $ref: '#/components/schemas/SchemaIssue' },
          { $ref: '#/components/schemas/BusinessIssue' },
        ],
      }),
  )
  .optional()
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

const ValidationResultSchema = z
  .object({
    valid: z.boolean().openapi({ type: 'boolean' }),
    issues: z
      .array(ValidationIssueSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ValidationIssue' } }),
    metadata: z.object({}).openapi({ type: 'object' }),
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
