import { createRoute, z } from '@hono/zod-openapi'

const BaseEventSchema = z
  .object({
    id: z.uuid(),
    eventType: z.string(),
    timestamp: z.iso.datetime(),
    metadata: z.looseObject({}).exactOptional(),
  })
  .openapi({ required: ['id', 'eventType', 'timestamp'] })
  .openapi('BaseEvent')

const UserEventSchema = BaseEventSchema.and(
  z
    .object({
      eventType: z.enum(['user.created', 'user.updated', 'user.deleted']).exactOptional(),
      userId: z.uuid(),
      userData: z
        .object({ email: z.email().exactOptional(), name: z.string().exactOptional() })
        .exactOptional(),
    })
    .openapi({ required: ['userId'] }),
).openapi('UserEvent')

const OrderEventSchema = BaseEventSchema.and(
  z
    .object({
      eventType: z.enum(['order.placed', 'order.shipped', 'order.delivered']).exactOptional(),
      orderId: z.uuid(),
      orderData: z
        .object({ total: z.float64().exactOptional(), items: z.int().exactOptional() })
        .exactOptional(),
    })
    .openapi({ required: ['orderId'] }),
).openapi('OrderEvent')

const SystemEventSchema = BaseEventSchema.and(
  z
    .object({
      eventType: z.enum(['system.startup', 'system.shutdown']).exactOptional(),
      component: z.string(),
      details: z.string().exactOptional(),
    })
    .openapi({ required: ['component'] }),
).openapi('SystemEvent')

type EventType =
  | z.infer<typeof UserEventSchema>
  | z.infer<typeof OrderEventSchema>
  | z.infer<typeof SystemEventSchema>

const BaseDocumentSchema = z
  .object({
    id: z.uuid(),
    title: z.string().min(1).max(200),
    description: z.string().exactOptional(),
  })
  .openapi({ required: ['id', 'title'] })
  .openapi('BaseDocument')

const AuditableSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional(),
    createdBy: z.string().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
    updatedBy: z.string().exactOptional(),
    version: z.int32().exactOptional(),
  })
  .openapi('Auditable')

const TaggableSchema = z
  .object({
    tags: z.array(z.string()).exactOptional(),
    categories: z.array(z.string()).exactOptional(),
  })
  .openapi('Taggable')

type DocumentType = z.infer<typeof BaseDocumentSchema> &
  z.infer<typeof AuditableSchema> &
  z.infer<typeof TaggableSchema> & { content?: string; format?: 'markdown' | 'html' | 'plain' }

type MixedContentType = {
  value: string | number | boolean | MixedContentType[] | Record<string, MixedContentType>
  notNull?: Record<string, unknown>
  restrictedValue?: string & Record<string, unknown>
}

const EventSchema: z.ZodType<EventType> = z
  .lazy(() =>
    z
      .xor([UserEventSchema, OrderEventSchema, SystemEventSchema])
      .openapi({
        discriminator: {
          propertyName: 'eventType',
          mapping: {
            'user.created': '#/components/schemas/UserEvent',
            'user.updated': '#/components/schemas/UserEvent',
            'user.deleted': '#/components/schemas/UserEvent',
            'order.placed': '#/components/schemas/OrderEvent',
            'order.shipped': '#/components/schemas/OrderEvent',
            'order.delivered': '#/components/schemas/OrderEvent',
            'system.startup': '#/components/schemas/SystemEvent',
            'system.shutdown': '#/components/schemas/SystemEvent',
          },
        },
      }),
  )
  .openapi('Event')

const EmailRecipientSchema = z
  .object({ type: z.literal('email'), email: z.email(), name: z.string().exactOptional() })
  .openapi({ required: ['type', 'email'] })
  .openapi('EmailRecipient')

const SmsRecipientSchema = z
  .object({ type: z.literal('sms'), phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/) })
  .openapi({ required: ['type', 'phoneNumber'] })
  .openapi('SmsRecipient')

const PushRecipientSchema = z
  .object({
    type: z.literal('push'),
    deviceToken: z.string(),
    platform: z.enum(['ios', 'android', 'web']).exactOptional(),
  })
  .openapi({ required: ['type', 'deviceToken'] })
  .openapi('PushRecipient')

const MultiRecipientSchema = z
  .object({
    type: z.literal('multi'),
    recipients: z
      .array(z.union([EmailRecipientSchema, SmsRecipientSchema, PushRecipientSchema]))
      .min(1)
      .openapi({ minItems: 1 }),
  })
  .openapi({ required: ['type', 'recipients'] })
  .openapi('MultiRecipient')

const NotificationContentSchema = z
  .object({
    title: z.string().max(100),
    body: z.string().max(1000),
    imageUrl: z.url().exactOptional(),
    actionUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['title', 'body'] })
  .openapi('NotificationContent')

const NotificationSchema = z
  .object({
    recipient: z.union([
      EmailRecipientSchema,
      SmsRecipientSchema,
      PushRecipientSchema,
      MultiRecipientSchema,
    ]),
    content: NotificationContentSchema,
    priority: z.enum(['low', 'normal', 'high', 'urgent']).exactOptional(),
  })
  .openapi({ required: ['recipient', 'content'] })
  .openapi('Notification')

const PointSchema = z
  .object({ x: z.float64(), y: z.float64() })
  .openapi({ required: ['x', 'y'] })
  .openapi('Point')

const CircleSchema = z
  .object({
    type: z.literal('circle'),
    radius: z.float64().gt(0),
    center: PointSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'radius'] })
  .openapi('Circle')

const RectangleSchema = z
  .object({
    type: z.literal('rectangle'),
    width: z.float64().gt(0),
    height: z.float64().gt(0),
    topLeft: PointSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'width', 'height'] })
  .openapi('Rectangle')

const TriangleSchema = z
  .object({
    type: z.literal('triangle'),
    vertices: z.array(PointSchema).length(3).openapi({ minItems: 3, maxItems: 3 }),
  })
  .openapi({ required: ['type', 'vertices'] })
  .openapi('Triangle')

const PolygonSchema = z
  .object({
    type: z.literal('polygon'),
    vertices: z.array(PointSchema).min(3).openapi({ minItems: 3 }),
  })
  .openapi({ required: ['type', 'vertices'] })
  .openapi('Polygon')

const ShapeSchema = z
  .xor([CircleSchema, RectangleSchema, TriangleSchema, PolygonSchema])
  .openapi('Shape')

const DocumentSchema: z.ZodType<DocumentType> = z
  .lazy(() =>
    BaseDocumentSchema.and(AuditableSchema)
      .and(TaggableSchema)
      .and(
        z.object({
          content: z.string().exactOptional(),
          format: z.enum(['markdown', 'html', 'plain']).exactOptional(),
        }),
      ),
  )
  .openapi('Document')

const MixedContentSchema: z.ZodType<MixedContentType> = z
  .lazy(() =>
    z
      .object({
        value: z.xor([
          z.string(),
          z.number(),
          z.boolean(),
          z.array(MixedContentSchema),
          z.record(z.string(), MixedContentSchema),
        ]),
        notNull: z
          .any()
          .refine((v) => v !== null)
          .exactOptional()
          .openapi({ not: { type: 'null' } }),
        restrictedValue: z.string().and(
          z
            .any()
            .refine((v) => !['forbidden', 'restricted', 'banned'].includes(v))
            .exactOptional()
            .openapi({ not: { enum: ['forbidden', 'restricted', 'banned'] } }),
        ),
      })
      .openapi({ required: ['value'] }),
  )
  .openapi('MixedContent')

const NullableTypesSchema = z
  .object({
    nullableString: z.string().nullable().exactOptional(),
    nullableNumber: z.number().nullable().exactOptional(),
    nullableArray: z.array(z.string()).nullable().exactOptional(),
    multiType: z.string().exactOptional(),
    deprecated: z.string().exactOptional().openapi({ deprecated: true }),
  })
  .openapi('NullableTypes')

export const postEventsRoute = createRoute({
  method: 'post',
  path: '/events',
  operationId: 'createEvent',
  request: { body: { content: { 'application/json': { schema: EventSchema } } } },
  responses: { 201: { description: 'Event created' } },
})

export const postNotificationsRoute = createRoute({
  method: 'post',
  path: '/notifications',
  operationId: 'sendNotification',
  request: { body: { content: { 'application/json': { schema: NotificationSchema } } } },
  responses: { 200: { description: 'Notification sent' } },
})

export const postShapesRoute = createRoute({
  method: 'post',
  path: '/shapes',
  operationId: 'createShape',
  request: { body: { content: { 'application/json': { schema: ShapeSchema } } } },
  responses: { 201: { description: 'Shape created' } },
})

export const postDocumentsRoute = createRoute({
  method: 'post',
  path: '/documents',
  operationId: 'createDocument',
  request: { body: { content: { 'application/json': { schema: DocumentSchema } } } },
  responses: { 201: { description: 'Document created' } },
})

export const postMixedRoute = createRoute({
  method: 'post',
  path: '/mixed',
  operationId: 'processMixed',
  request: { body: { content: { 'application/json': { schema: MixedContentSchema } } } },
  responses: { 200: { description: 'Processed' } },
})
