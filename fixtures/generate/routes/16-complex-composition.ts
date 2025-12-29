import { createRoute, z } from '@hono/zod-openapi'

const IdentifiableSchema = z
  .object({ id: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }) })
  .optional()
  .openapi({ type: 'object', properties: { id: { type: 'string', format: 'uuid' } } })
  .openapi('Identifiable')

const TimestampedSchema = z
  .object({
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Timestamped')

const AuditableSchema = z
  .intersection(
    TimestampedSchema,
    z
      .object({
        createdBy: z.string().openapi({ type: 'string' }),
        updatedBy: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .optional()
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
  .openapi('Auditable')

const VersionableSchema = z
  .object({
    version: z.int().openapi({ type: 'integer' }),
    etag: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: { version: { type: 'integer' }, etag: { type: 'string' } },
  })
  .openapi('Versionable')

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
  .openapi('BaseEntity')

const ExtendedEntitySchema = z
  .intersection(
    BaseEntitySchema,
    z
      .object({
        name: z.string().optional().openapi({ type: 'string' }),
        description: z.string().optional().openapi({ type: 'string' }),
        tags: z
          .array(z.string().optional().openapi({ type: 'string' }))
          .optional()
          .openapi({ type: 'array', items: { type: 'string' } }),
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('ExtendedEntity')

const MessageMetadataSchema = z
  .object({
    priority: z
      .enum(['low', 'normal', 'high', 'urgent'])
      .optional()
      .openapi({ type: 'string', enum: ['low', 'normal', 'high', 'urgent'] }),
    expiresAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    replyTo: MessageSchema,
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'] },
      expiresAt: { type: 'string', format: 'date-time' },
      replyTo: { $ref: '#/components/schemas/Message' },
    },
  })
  .openapi('MessageMetadata')

const ParticipantSchema = z
  .intersection(
    IdentifiableSchema,
    z
      .object({
        name: z.string().optional().openapi({ type: 'string' }),
        avatar: z.url().optional().openapi({ type: 'string', format: 'uri' }),
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('Participant')

const BaseMessageSchema = z
  .intersection(
    BaseEntitySchema,
    z
      .object({
        type: z.string().optional().openapi({ type: 'string' }),
        sender: ParticipantSchema,
        recipient: ParticipantSchema,
        metadata: MessageMetadataSchema,
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('BaseMessage')

const CompositeMessageSchema = z
  .intersection(
    BaseMessageSchema,
    z
      .object({
        type: z.literal('composite').optional().openapi({ type: 'string' }),
        parts: z
          .array(MessageSchema)
          .min(2)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Message' }, minItems: 2 }),
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('CompositeMessage')

const DimensionsSchema = z
  .object({
    width: z.int().optional().openapi({ type: 'integer' }),
    height: z.int().optional().openapi({ type: 'integer' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: { width: { type: 'integer' }, height: { type: 'integer' } },
  })
  .openapi('Dimensions')

const MediaContentSchema = z
  .object({
    url: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    mimeType: z.string().optional().openapi({ type: 'string' }),
    size: z.int().optional().openapi({ type: 'integer' }),
    checksum: z.string().optional().openapi({ type: 'string' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      url: { type: 'string', format: 'uri' },
      mimeType: { type: 'string' },
      size: { type: 'integer' },
      checksum: { type: 'string' },
    },
  })
  .openapi('MediaContent')

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
      .optional()
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
  .openapi('ImageMessage')

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
      .optional()
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
  .openapi('DocumentMessage')

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
      .optional()
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
  .openapi('VideoMessage')

const TextRangeSchema = z
  .object({
    start: z.int().optional().openapi({ type: 'integer' }),
    end: z.int().optional().openapi({ type: 'integer' }),
  })
  .optional()
  .openapi({ type: 'object', properties: { start: { type: 'integer' }, end: { type: 'integer' } } })
  .openapi('TextRange')

const LinkRangeSchema = z
  .intersection(
    TextRangeSchema,
    z
      .object({ url: z.url().optional().openapi({ type: 'string', format: 'uri' }) })
      .optional()
      .openapi({ type: 'object', properties: { url: { type: 'string', format: 'uri' } } }),
  )
  .optional()
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
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TextRange' } }),
    italic: z
      .array(TextRangeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TextRange' } }),
    links: z
      .array(LinkRangeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/LinkRange' } }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      bold: { type: 'array', items: { $ref: '#/components/schemas/TextRange' } },
      italic: { type: 'array', items: { $ref: '#/components/schemas/TextRange' } },
      links: { type: 'array', items: { $ref: '#/components/schemas/LinkRange' } },
    },
  })
  .openapi('TextFormatting')

const TextMessageSchema = z
  .intersection(
    BaseMessageSchema,
    z
      .object({
        type: z.literal('text').optional().openapi({ type: 'string' }),
        content: z.string().optional().openapi({ type: 'string' }),
        formatting: TextFormattingSchema,
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('TextMessage')

const MessageSchema = z
  .lazy(() =>
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
      }),
  )
  .openapi('Message')

const DeliveryStatusSchema = z
  .object({
    sent: z.boolean().openapi({ type: 'boolean' }),
    delivered: z.boolean().openapi({ type: 'boolean' }),
    read: z.boolean().openapi({ type: 'boolean' }),
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
  .partial()
  .optional()
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

const MessageResponseSchema = z
  .intersection(
    MessageSchema,
    z
      .object({ deliveryStatus: DeliveryStatusSchema })
      .optional()
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
  .openapi('MessageResponse')

const ApiContextSchema = z
  .object({
    apiKey: z.string().openapi({ type: 'string' }),
    clientId: z.string().openapi({ type: 'string' }),
    ipAddress: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      apiKey: { type: 'string' },
      clientId: { type: 'string' },
      ipAddress: { type: 'string' },
    },
  })
  .openapi('ApiContext')

const MobileContextSchema = z
  .object({
    deviceId: z.string().openapi({ type: 'string' }),
    platform: z.enum(['ios', 'android']).openapi({ type: 'string', enum: ['ios', 'android'] }),
    appVersion: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      deviceId: { type: 'string' },
      platform: { type: 'string', enum: ['ios', 'android'] },
      appVersion: { type: 'string' },
    },
  })
  .openapi('MobileContext')

const WebContextSchema = z
  .object({
    userAgent: z.string().openapi({ type: 'string' }),
    referrer: z.string().openapi({ type: 'string' }),
    sessionId: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      userAgent: { type: 'string' },
      referrer: { type: 'string' },
      sessionId: { type: 'string' },
    },
  })
  .openapi('WebContext')

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
  .openapi('EventContext')

const BaseEventPayloadSchema = z
  .object({
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    source: z.string().openapi({ type: 'string' }),
    correlationId: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      timestamp: { type: 'string', format: 'date-time' },
      source: { type: 'string' },
      correlationId: { type: 'string' },
    },
  })
  .openapi('BaseEventPayload')

const CustomEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        customType: z.string().openapi({ type: 'string' }),
        data: z.looseObject({}).openapi({ type: 'object' }),
      })
      .partial()
      .optional()
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
  .openapi('CustomEventPayload')

const SystemEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        component: z.string().optional().openapi({ type: 'string' }),
        severity: z
          .enum(['info', 'warning', 'error', 'critical'])
          .optional()
          .openapi({ type: 'string', enum: ['info', 'warning', 'error', 'critical'] }),
        metrics: z
          .record(z.string(), z.number().optional().openapi({ type: 'number' }))
          .optional()
          .openapi({ type: 'object' }),
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('SystemEventPayload')

const OrderItemSchema = z
  .object({
    productId: z.string().optional().openapi({ type: 'string' }),
    quantity: z.int().optional().openapi({ type: 'integer' }),
    price: z.number().optional().openapi({ type: 'number' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      productId: { type: 'string' },
      quantity: { type: 'integer' },
      price: { type: 'number' },
    },
  })
  .openapi('OrderItem')

const OrderEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        orderId: z.string().optional().openapi({ type: 'string' }),
        orderAction: z
          .enum(['created', 'updated', 'cancelled', 'completed'])
          .optional()
          .openapi({ type: 'string', enum: ['created', 'updated', 'cancelled', 'completed'] }),
        items: z
          .array(OrderItemSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('OrderEventPayload')

const UserStateSchema = z
  .object({
    status: z.string().openapi({ type: 'string' }),
    roles: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    preferences: z.object({}).openapi({ type: 'object' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      status: { type: 'string' },
      roles: { type: 'array', items: { type: 'string' } },
      preferences: { type: 'object' },
    },
  })
  .openapi('UserState')

const UserEventPayloadSchema = z
  .intersection(
    BaseEventPayloadSchema,
    z
      .object({
        userId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
        userAction: z
          .enum(['login', 'logout', 'register', 'update', 'delete'])
          .optional()
          .openapi({ type: 'string', enum: ['login', 'logout', 'register', 'update', 'delete'] }),
        previousState: UserStateSchema,
        newState: UserStateSchema,
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('UserEventPayload')

const EventPayloadSchema = z
  .lazy(() =>
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
  .openapi('EventPayload')

const EventSchema = z
  .object({
    eventType: z.string().optional().openapi({ type: 'string' }),
    payload: EventPayloadSchema,
    context: EventContextSchema,
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      eventType: { type: 'string' },
      payload: { $ref: '#/components/schemas/EventPayload' },
      context: { $ref: '#/components/schemas/EventContext' },
    },
  })
  .openapi('Event')

const ConfigValueSchema = z
  .lazy(() =>
    z
      .union([
        z.string().optional().openapi({ type: 'string' }),
        z.number().optional().openapi({ type: 'number' }),
        z.boolean().optional().openapi({ type: 'boolean' }),
        z
          .array(ConfigValueSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ConfigValue' } }),
        z.record(z.string(), ConfigValueSchema).optional().openapi({ type: 'object' }),
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
  .openapi('ConfigValue')

const ConfigSectionSchema = z
  .object({
    enabled: z.boolean().openapi({ type: 'boolean' }),
    description: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: { enabled: { type: 'boolean' }, description: { type: 'string' } },
  })
  .openapi('ConfigSection')

const RateLimitSchema = z
  .object({
    limit: z.int().optional().openapi({ type: 'integer' }),
    window: z.int().optional().openapi({ type: 'integer' }),
    burstLimit: z.int().optional().openapi({ type: 'integer' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      limit: { type: 'integer' },
      window: { type: 'integer' },
      burstLimit: { type: 'integer' },
    },
  })
  .openapi('RateLimit')

const RateLimitsSchema = z
  .intersection(
    ConfigSectionSchema,
    z.record(z.string(), RateLimitSchema).optional().openapi({ type: 'object' }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      { type: 'object', additionalProperties: { $ref: '#/components/schemas/RateLimit' } },
    ],
  })
  .openapi('RateLimits')

const GeoConditionSchema = z
  .object({
    type: z.literal('geo').optional().openapi({ type: 'string' }),
    regions: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', const: 'geo' },
      regions: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('GeoCondition')

const TimeConditionSchema = z
  .object({
    type: z.literal('time').optional().openapi({ type: 'string' }),
    startTime: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    endTime: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', const: 'time' },
      startTime: { type: 'string', format: 'date-time' },
      endTime: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('TimeCondition')

const UserConditionSchema = z
  .object({
    type: z.literal('user').optional().openapi({ type: 'string' }),
    userIds: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', const: 'user' },
      userIds: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('UserCondition')

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
  .openapi('FeatureCondition')

const ConditionalFeatureFlagSchema = z
  .object({
    enabled: z.boolean().optional().openapi({ type: 'boolean' }),
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
  .optional()
  .openapi({
    type: 'object',
    properties: {
      enabled: { type: 'boolean' },
      conditions: { type: 'array', items: { $ref: '#/components/schemas/FeatureCondition' } },
      rolloutPercentage: { type: 'integer', minimum: 0, maximum: 100 },
    },
  })
  .openapi('ConditionalFeatureFlag')

const FeatureFlagSchema = z
  .lazy(() =>
    z
      .union([z.boolean().optional().openapi({ type: 'boolean' }), ConditionalFeatureFlagSchema])
      .optional()
      .openapi({
        oneOf: [{ type: 'boolean' }, { $ref: '#/components/schemas/ConditionalFeatureFlag' }],
      }),
  )
  .openapi('FeatureFlag')

const FeatureFlagsSchema = z
  .intersection(
    ConfigSectionSchema,
    z.record(z.string(), FeatureFlagSchema).optional().openapi({ type: 'object' }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ConfigSection' },
      { type: 'object', additionalProperties: { $ref: '#/components/schemas/FeatureFlag' } },
    ],
  })
  .openapi('FeatureFlags')

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
      .optional()
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
  .openapi('GeneralSettings')

const ConfigSettingsSchema = z
  .record(z.string(), ConfigSectionSchema)
  .optional()
  .openapi({
    type: 'object',
    properties: {
      general: { $ref: '#/components/schemas/GeneralSettings' },
      features: { $ref: '#/components/schemas/FeatureFlags' },
      limits: { $ref: '#/components/schemas/RateLimits' },
    },
  })
  .openapi('ConfigSettings')

const ConfigurationSchema = z
  .intersection(
    BaseEntitySchema,
    z
      .object({
        settings: ConfigSettingsSchema,
        overrides: z.record(z.string(), ConfigValueSchema).optional().openapi({ type: 'object' }),
      })
      .optional()
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
  .openapi('Configuration')

const ConfigurationUpdateSchema = z
  .intersection(
    z
      .object({
        settings: ConfigSettingsSchema,
        overrides: z.record(z.string(), ConfigValueSchema).optional().openapi({ type: 'object' }),
      })
      .optional()
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
  .openapi('ConfigurationUpdate')

const ResourceTemplateSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    version: z.string().openapi({ type: 'string' }),
    parameters: z.record(z.string(), ConfigValueSchema).openapi({ type: 'object' }),
  })
  .partial()
  .optional()
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

const ResourceCostSchema = z
  .object({
    hourly: z.number().openapi({ type: 'number' }),
    monthly: z.number().openapi({ type: 'number' }),
    currency: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      hourly: { type: 'number' },
      monthly: { type: 'number' },
      currency: { type: 'string' },
    },
  })
  .openapi('ResourceCost')

const ResourceDependencySchema = z
  .object({
    resourceId: z.string().optional().openapi({ type: 'string' }),
    type: z
      .enum(['hard', 'soft'])
      .optional()
      .openapi({ type: 'string', enum: ['hard', 'soft'] }),
    resource: ResourceSchema,
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      resourceId: { type: 'string' },
      type: { type: 'string', enum: ['hard', 'soft'] },
      resource: { $ref: '#/components/schemas/Resource' },
    },
  })
  .openapi('ResourceDependency')

const ResourceStatusSchema = z
  .object({
    state: z
      .enum(['pending', 'provisioning', 'running', 'stopped', 'failed', 'terminated'])
      .optional()
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
  .optional()
  .openapi({
    type: 'object',
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

const BaseResourceSchema = z
  .intersection(
    ExtendedEntitySchema,
    z
      .object({
        resourceType: z.string().optional().openapi({ type: 'string' }),
        status: ResourceStatusSchema,
        dependencies: z
          .array(ResourceDependencySchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ResourceDependency' } }),
        cost: ResourceCostSchema,
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('BaseResource')

const CompositeResourceSchema = z
  .intersection(
    BaseResourceSchema,
    z
      .object({
        resourceType: z.literal('composite').optional().openapi({ type: 'string' }),
        components: z
          .array(ResourceSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Resource' } }),
        template: ResourceTemplateSchema,
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('CompositeResource')

const MemorySpecSchema = z
  .object({
    size: z.int().optional().openapi({ type: 'integer' }),
    unit: z
      .enum(['MB', 'GB', 'TB'])
      .optional()
      .openapi({ type: 'string', enum: ['MB', 'GB', 'TB'] }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: { size: { type: 'integer' }, unit: { type: 'string', enum: ['MB', 'GB', 'TB'] } },
  })
  .openapi('MemorySpec')

const CpuSpecSchema = z
  .object({
    cores: z.int().optional().openapi({ type: 'integer' }),
    architecture: z.string().optional().openapi({ type: 'string' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: { cores: { type: 'integer' }, architecture: { type: 'string' } },
  })
  .openapi('CpuSpec')

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
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('ComputeResource')

const StorageResourceSchema = z
  .intersection(
    BaseResourceSchema,
    z
      .object({
        resourceType: z.literal('storage').optional().openapi({ type: 'string' }),
        size: z.int().optional().openapi({ type: 'integer' }),
        storageType: z
          .enum(['ssd', 'hdd', 'nvme'])
          .optional()
          .openapi({ type: 'string', enum: ['ssd', 'hdd', 'nvme'] }),
        iops: z.int().optional().openapi({ type: 'integer' }),
        attachedTo: ComputeResourceSchema,
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('StorageResource')

const NetworkResourceSchema = z
  .lazy(() =>
    z
      .intersection(
        BaseResourceSchema,
        z
          .object({
            resourceType: z.literal('network').optional().openapi({ type: 'string' }),
            cidr: z.string().optional().openapi({ type: 'string' }),
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
          .optional()
          .openapi({
            type: 'object',
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
  .openapi('NetworkResource')

const ResourceSchema = z
  .lazy(() =>
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
      }),
  )
  .openapi('Resource')

const CustomValidationRuleSchema = z
  .object({
    ruleType: z.literal('custom').optional().openapi({ type: 'string' }),
    handler: z.string().optional().openapi({ type: 'string' }),
    config: z.object({}).optional().openapi({ type: 'object' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      ruleType: { type: 'string', const: 'custom' },
      handler: { type: 'string' },
      config: { type: 'object' },
    },
  })
  .openapi('CustomValidationRule')

const BusinessValidationRuleSchema = z
  .object({
    ruleType: z.literal('business').optional().openapi({ type: 'string' }),
    expression: z.string().optional().openapi({ type: 'string' }),
    parameters: z.object({}).optional().openapi({ type: 'object' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      ruleType: { type: 'string', const: 'business' },
      expression: { type: 'string' },
      parameters: { type: 'object' },
    },
  })
  .openapi('BusinessValidationRule')

const SchemaValidationRuleSchema = z
  .object({
    ruleType: z.literal('schema').optional().openapi({ type: 'string' }),
    schema: z.object({}).optional().openapi({ type: 'object' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: { ruleType: { type: 'string', const: 'schema' }, schema: { type: 'object' } },
  })
  .openapi('SchemaValidationRule')

const ValidationRuleSchema = z
  .lazy(() =>
    z
      .intersection(
        z
          .object({
            ruleType: z.string().optional().openapi({ type: 'string' }),
            severity: z
              .enum(['error', 'warning', 'info'])
              .optional()
              .openapi({ type: 'string', enum: ['error', 'warning', 'info'] }),
          })
          .optional()
          .openapi({
            type: 'object',
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
  .openapi('ValidationRule')

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
  .openapi('ValidationTarget')

const ValidationRequestSchema = z
  .object({
    target: ValidationTargetSchema,
    rules: z
      .array(ValidationRuleSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ValidationRule' } }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      target: { $ref: '#/components/schemas/ValidationTarget' },
      rules: { type: 'array', items: { $ref: '#/components/schemas/ValidationRule' } },
    },
  })
  .openapi('ValidationRequest')

const BusinessIssueSchema = z
  .object({
    rule: z.string().openapi({ type: 'string' }),
    context: z.object({}).openapi({ type: 'object' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: { rule: { type: 'string' }, context: { type: 'object' } },
  })
  .openapi('BusinessIssue')

const SchemaIssueSchema = z
  .object({
    keyword: z.string().openapi({ type: 'string' }),
    expected: z.object({}).openapi({ type: 'object' }),
    actual: z.object({}).openapi({ type: 'object' }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      keyword: { type: 'string' },
      expected: { type: 'object' },
      actual: { type: 'object' },
    },
  })
  .openapi('SchemaIssue')

const ValidationIssueSchema = z
  .intersection(
    z
      .object({
        path: z.string().optional().openapi({ type: 'string' }),
        message: z.string().optional().openapi({ type: 'string' }),
        severity: z
          .enum(['error', 'warning', 'info'])
          .optional()
          .openapi({ type: 'string', enum: ['error', 'warning', 'info'] }),
        code: z.string().optional().openapi({ type: 'string' }),
      })
      .optional()
      .openapi({
        type: 'object',
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
  .openapi('ValidationIssue')

const ValidationResultSchema = z
  .object({
    valid: z.boolean().optional().openapi({ type: 'boolean' }),
    issues: z
      .array(ValidationIssueSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ValidationIssue' } }),
    metadata: z.object({}).optional().openapi({ type: 'object' }),
  })
  .optional()
  .openapi({
    type: 'object',
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
