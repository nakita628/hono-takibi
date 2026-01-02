import { createRoute, z } from '@hono/zod-openapi'

const BaseEventSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    eventType: z.string().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    metadata: z.looseObject({}).optional().openapi({ type: 'object', additionalProperties: true }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'eventType', 'timestamp'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      eventType: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
      metadata: { type: 'object', additionalProperties: true },
    },
  })
  .openapi('BaseEvent')

const UserEventSchema = z
  .intersection(
    BaseEventSchema,
    z
      .object({
        eventType: z
          .enum(['user.created', 'user.updated', 'user.deleted'])
          .optional()
          .openapi({ type: 'string', enum: ['user.created', 'user.updated', 'user.deleted'] }),
        userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        userData: z
          .object({
            email: z.email().optional().openapi({ type: 'string', format: 'email' }),
            name: z.string().optional().openapi({ type: 'string' }),
          })
          .optional()
          .openapi({
            type: 'object',
            properties: { email: { type: 'string', format: 'email' }, name: { type: 'string' } },
          }),
      })
      .openapi({
        type: 'object',
        required: ['userId'],
        properties: {
          eventType: { type: 'string', enum: ['user.created', 'user.updated', 'user.deleted'] },
          userId: { type: 'string', format: 'uuid' },
          userData: {
            type: 'object',
            properties: { email: { type: 'string', format: 'email' }, name: { type: 'string' } },
          },
        },
      }),
  )
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEvent' },
      {
        type: 'object',
        required: ['userId'],
        properties: {
          eventType: { type: 'string', enum: ['user.created', 'user.updated', 'user.deleted'] },
          userId: { type: 'string', format: 'uuid' },
          userData: {
            type: 'object',
            properties: { email: { type: 'string', format: 'email' }, name: { type: 'string' } },
          },
        },
      },
    ],
  })
  .openapi('UserEvent')

const OrderEventSchema = z
  .intersection(
    BaseEventSchema,
    z
      .object({
        eventType: z
          .enum(['order.placed', 'order.shipped', 'order.delivered'])
          .optional()
          .openapi({ type: 'string', enum: ['order.placed', 'order.shipped', 'order.delivered'] }),
        orderId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        orderData: z
          .object({
            total: z.float64().optional().openapi({ type: 'number', format: 'float64' }),
            items: z.int().optional().openapi({ type: 'integer' }),
          })
          .optional()
          .openapi({
            type: 'object',
            properties: {
              total: { type: 'number', format: 'float64' },
              items: { type: 'integer' },
            },
          }),
      })
      .openapi({
        type: 'object',
        required: ['orderId'],
        properties: {
          eventType: { type: 'string', enum: ['order.placed', 'order.shipped', 'order.delivered'] },
          orderId: { type: 'string', format: 'uuid' },
          orderData: {
            type: 'object',
            properties: {
              total: { type: 'number', format: 'float64' },
              items: { type: 'integer' },
            },
          },
        },
      }),
  )
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEvent' },
      {
        type: 'object',
        required: ['orderId'],
        properties: {
          eventType: { type: 'string', enum: ['order.placed', 'order.shipped', 'order.delivered'] },
          orderId: { type: 'string', format: 'uuid' },
          orderData: {
            type: 'object',
            properties: {
              total: { type: 'number', format: 'float64' },
              items: { type: 'integer' },
            },
          },
        },
      },
    ],
  })
  .openapi('OrderEvent')

const SystemEventSchema = z
  .intersection(
    BaseEventSchema,
    z
      .object({
        eventType: z
          .enum(['system.startup', 'system.shutdown'])
          .optional()
          .openapi({ type: 'string', enum: ['system.startup', 'system.shutdown'] }),
        component: z.string().openapi({ type: 'string' }),
        details: z.string().optional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        required: ['component'],
        properties: {
          eventType: { type: 'string', enum: ['system.startup', 'system.shutdown'] },
          component: { type: 'string' },
          details: { type: 'string' },
        },
      }),
  )
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/BaseEvent' },
      {
        type: 'object',
        required: ['component'],
        properties: {
          eventType: { type: 'string', enum: ['system.startup', 'system.shutdown'] },
          component: { type: 'string' },
          details: { type: 'string' },
        },
      },
    ],
  })
  .openapi('SystemEvent')

type EventType =
  | z.infer<typeof UserEventSchema>
  | z.infer<typeof OrderEventSchema>
  | z.infer<typeof SystemEventSchema>

const EventSchema: z.ZodType<EventType> = z
  .lazy(() =>
    z
      .union([UserEventSchema, OrderEventSchema, SystemEventSchema])
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/UserEvent' },
          { $ref: '#/components/schemas/OrderEvent' },
          { $ref: '#/components/schemas/SystemEvent' },
        ],
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
  .object({
    type: z.literal('email').openapi({ type: 'string' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    name: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'email'],
    properties: {
      type: { type: 'string', const: 'email' },
      email: { type: 'string', format: 'email' },
      name: { type: 'string' },
    },
  })
  .openapi('EmailRecipient')

const SmsRecipientSchema = z
  .object({
    type: z.literal('sms').openapi({ type: 'string' }),
    phoneNumber: z
      .string()
      .regex(/^\+[1-9]\d{1,14}$/)
      .openapi({ type: 'string', pattern: '^\\+[1-9]\\d{1,14}$' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'phoneNumber'],
    properties: {
      type: { type: 'string', const: 'sms' },
      phoneNumber: { type: 'string', pattern: '^\\+[1-9]\\d{1,14}$' },
    },
  })
  .openapi('SmsRecipient')

const PushRecipientSchema = z
  .object({
    type: z.literal('push').openapi({ type: 'string' }),
    deviceToken: z.string().openapi({ type: 'string' }),
    platform: z
      .enum(['ios', 'android', 'web'])
      .optional()
      .openapi({ type: 'string', enum: ['ios', 'android', 'web'] }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'deviceToken'],
    properties: {
      type: { type: 'string', const: 'push' },
      deviceToken: { type: 'string' },
      platform: { type: 'string', enum: ['ios', 'android', 'web'] },
    },
  })
  .openapi('PushRecipient')

const MultiRecipientSchema = z
  .object({
    type: z.literal('multi').openapi({ type: 'string' }),
    recipients: z
      .array(
        z
          .union([EmailRecipientSchema, SmsRecipientSchema, PushRecipientSchema])
          .openapi({
            anyOf: [
              { $ref: '#/components/schemas/EmailRecipient' },
              { $ref: '#/components/schemas/SmsRecipient' },
              { $ref: '#/components/schemas/PushRecipient' },
            ],
          }),
      )
      .min(1)
      .openapi({
        type: 'array',
        minItems: 1,
        items: {
          anyOf: [
            { $ref: '#/components/schemas/EmailRecipient' },
            { $ref: '#/components/schemas/SmsRecipient' },
            { $ref: '#/components/schemas/PushRecipient' },
          ],
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'recipients'],
    properties: {
      type: { type: 'string', const: 'multi' },
      recipients: {
        type: 'array',
        minItems: 1,
        items: {
          anyOf: [
            { $ref: '#/components/schemas/EmailRecipient' },
            { $ref: '#/components/schemas/SmsRecipient' },
            { $ref: '#/components/schemas/PushRecipient' },
          ],
        },
      },
    },
  })
  .openapi('MultiRecipient')

const NotificationContentSchema = z
  .object({
    title: z.string().max(100).openapi({ type: 'string', maxLength: 100 }),
    body: z.string().max(1000).openapi({ type: 'string', maxLength: 1000 }),
    imageUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    actionUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: { type: 'string', maxLength: 100 },
      body: { type: 'string', maxLength: 1000 },
      imageUrl: { type: 'string', format: 'uri' },
      actionUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('NotificationContent')

const NotificationSchema = z
  .object({
    recipient: z
      .union([EmailRecipientSchema, SmsRecipientSchema, PushRecipientSchema, MultiRecipientSchema])
      .openapi({
        anyOf: [
          { $ref: '#/components/schemas/EmailRecipient' },
          { $ref: '#/components/schemas/SmsRecipient' },
          { $ref: '#/components/schemas/PushRecipient' },
          { $ref: '#/components/schemas/MultiRecipient' },
        ],
      }),
    content: NotificationContentSchema,
    priority: z
      .enum(['low', 'normal', 'high', 'urgent'])
      .optional()
      .openapi({ type: 'string', enum: ['low', 'normal', 'high', 'urgent'] }),
  })
  .openapi({
    type: 'object',
    required: ['recipient', 'content'],
    properties: {
      recipient: {
        anyOf: [
          { $ref: '#/components/schemas/EmailRecipient' },
          { $ref: '#/components/schemas/SmsRecipient' },
          { $ref: '#/components/schemas/PushRecipient' },
          { $ref: '#/components/schemas/MultiRecipient' },
        ],
      },
      content: { $ref: '#/components/schemas/NotificationContent' },
      priority: { type: 'string', enum: ['low', 'normal', 'high', 'urgent'] },
    },
  })
  .openapi('Notification')

const PointSchema = z
  .object({
    x: z.float64().openapi({ type: 'number', format: 'float64' }),
    y: z.float64().openapi({ type: 'number', format: 'float64' }),
  })
  .openapi({
    type: 'object',
    required: ['x', 'y'],
    properties: {
      x: { type: 'number', format: 'float64' },
      y: { type: 'number', format: 'float64' },
    },
  })
  .openapi('Point')

const CircleSchema = z
  .object({
    type: z.literal('circle').openapi({ type: 'string' }),
    radius: z.float64().gt(0).openapi({ type: 'number', format: 'float64', exclusiveMinimum: 0 }),
    center: PointSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['type', 'radius'],
    properties: {
      type: { type: 'string', const: 'circle' },
      radius: { type: 'number', format: 'float64', exclusiveMinimum: 0 },
      center: { $ref: '#/components/schemas/Point' },
    },
  })
  .openapi('Circle')

const RectangleSchema = z
  .object({
    type: z.literal('rectangle').openapi({ type: 'string' }),
    width: z.float64().gt(0).openapi({ type: 'number', format: 'float64', exclusiveMinimum: 0 }),
    height: z.float64().gt(0).openapi({ type: 'number', format: 'float64', exclusiveMinimum: 0 }),
    topLeft: PointSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['type', 'width', 'height'],
    properties: {
      type: { type: 'string', const: 'rectangle' },
      width: { type: 'number', format: 'float64', exclusiveMinimum: 0 },
      height: { type: 'number', format: 'float64', exclusiveMinimum: 0 },
      topLeft: { $ref: '#/components/schemas/Point' },
    },
  })
  .openapi('Rectangle')

const TriangleSchema = z
  .object({
    type: z.literal('triangle').openapi({ type: 'string' }),
    vertices: z
      .array(PointSchema)
      .length(3)
      .openapi({
        type: 'array',
        items: { $ref: '#/components/schemas/Point' },
        minItems: 3,
        maxItems: 3,
      }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'vertices'],
    properties: {
      type: { type: 'string', const: 'triangle' },
      vertices: {
        type: 'array',
        items: { $ref: '#/components/schemas/Point' },
        minItems: 3,
        maxItems: 3,
      },
    },
  })
  .openapi('Triangle')

const PolygonSchema = z
  .object({
    type: z.literal('polygon').openapi({ type: 'string' }),
    vertices: z
      .array(PointSchema)
      .min(3)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Point' }, minItems: 3 }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'vertices'],
    properties: {
      type: { type: 'string', const: 'polygon' },
      vertices: { type: 'array', items: { $ref: '#/components/schemas/Point' }, minItems: 3 },
    },
  })
  .openapi('Polygon')

const ShapeSchema = z
  .union([CircleSchema, RectangleSchema, TriangleSchema, PolygonSchema])
  .openapi({
    oneOf: [
      { $ref: '#/components/schemas/Circle' },
      { $ref: '#/components/schemas/Rectangle' },
      { $ref: '#/components/schemas/Triangle' },
      { $ref: '#/components/schemas/Polygon' },
    ],
  })
  .openapi('Shape')

const BaseDocumentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    title: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      title: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
    },
  })
  .openapi('BaseDocument')

const AuditableSchema = z
  .object({
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdBy: z.string().optional().openapi({ type: 'string' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    updatedBy: z.string().optional().openapi({ type: 'string' }),
    version: z.int32().optional().openapi({ type: 'integer', format: 'int32' }),
  })
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      createdBy: { type: 'string' },
      updatedAt: { type: 'string', format: 'date-time' },
      updatedBy: { type: 'string' },
      version: { type: 'integer', format: 'int32' },
    },
  })
  .openapi('Auditable')

const TaggableSchema = z
  .object({
    tags: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' }, uniqueItems: true }),
    categories: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      tags: { type: 'array', items: { type: 'string' }, uniqueItems: true },
      categories: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('Taggable')

type DocumentType = z.infer<typeof BaseDocumentSchema> &
  z.infer<typeof AuditableSchema> &
  z.infer<typeof TaggableSchema> & { content?: string; format?: 'markdown' | 'html' | 'plain' }

const DocumentSchema: z.ZodType<DocumentType> = z
  .lazy(() =>
    BaseDocumentSchema.and(AuditableSchema)
      .and(TaggableSchema)
      .and(
        z
          .object({
            content: z.string().optional().openapi({ type: 'string' }),
            format: z
              .enum(['markdown', 'html', 'plain'])
              .optional()
              .openapi({ type: 'string', enum: ['markdown', 'html', 'plain'] }),
          })
          .openapi({
            type: 'object',
            properties: {
              content: { type: 'string' },
              format: { type: 'string', enum: ['markdown', 'html', 'plain'] },
            },
          }),
      )
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/BaseDocument' },
          { $ref: '#/components/schemas/Auditable' },
          { $ref: '#/components/schemas/Taggable' },
          {
            type: 'object',
            properties: {
              content: { type: 'string' },
              format: { type: 'string', enum: ['markdown', 'html', 'plain'] },
            },
          },
        ],
      }),
  )
  .openapi('Document')

type MixedContentType = {
  value: string | number | boolean | MixedContentType[] | Record<string, MixedContentType>
  notNull?: Record<string, unknown>
  restrictedValue?: string & Record<string, unknown>
}

const MixedContentSchema: z.ZodType<MixedContentType> = z
  .lazy(() =>
    z
      .object({
        value: z
          .union([
            z.string().openapi({ type: 'string' }),
            z.number().openapi({ type: 'number' }),
            z.boolean().openapi({ type: 'boolean' }),
            z
              .array(MixedContentSchema)
              .openapi({ type: 'array', items: { $ref: '#/components/schemas/MixedContent' } }),
            z
              .record(z.string(), MixedContentSchema)
              .openapi({
                type: 'object',
                additionalProperties: { $ref: '#/components/schemas/MixedContent' },
              }),
          ])
          .openapi({
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              { type: 'boolean' },
              { type: 'array', items: { $ref: '#/components/schemas/MixedContent' } },
              {
                type: 'object',
                additionalProperties: { $ref: '#/components/schemas/MixedContent' },
              },
            ],
          }),
        notNull: z
          .any()
          .refine((v) => typeof v !== 'null')
          .optional()
          .openapi({ not: { type: 'null' } }),
        restrictedValue: z
          .intersection(
            z.string().openapi({ type: 'string' }),
            z
              .any()
              .refine((v) => !['forbidden', 'restricted', 'banned'].includes(v))
              .openapi({ not: { enum: ['forbidden', 'restricted', 'banned'] } }),
          )
          .optional()
          .openapi({
            allOf: [{ type: 'string' }, { not: { enum: ['forbidden', 'restricted', 'banned'] } }],
          }),
      })
      .openapi({
        type: 'object',
        required: ['value'],
        properties: {
          value: {
            oneOf: [
              { type: 'string' },
              { type: 'number' },
              { type: 'boolean' },
              { type: 'array', items: { $ref: '#/components/schemas/MixedContent' } },
              {
                type: 'object',
                additionalProperties: { $ref: '#/components/schemas/MixedContent' },
              },
            ],
          },
          notNull: { not: { type: 'null' } },
          restrictedValue: {
            allOf: [{ type: 'string' }, { not: { enum: ['forbidden', 'restricted', 'banned'] } }],
          },
        },
      }),
  )
  .openapi('MixedContent')

const NullableTypesSchema = z
  .object({
    nullableString: z
      .string()
      .nullable()
      .optional()
      .openapi({ type: ['string', 'null'] }),
    nullableNumber: z
      .number()
      .nullable()
      .optional()
      .openapi({ type: ['number', 'null'] }),
    nullableArray: z
      .array(z.string().openapi({ type: 'string' }))
      .nullable()
      .optional()
      .openapi({ type: ['array', 'null'], items: { type: 'string' } }),
    multiType: z
      .string()
      .optional()
      .openapi({ type: ['string', 'number', 'boolean'] }),
    deprecated: z.string().optional().openapi({ type: 'string', deprecated: true }),
  })
  .openapi({
    type: 'object',
    properties: {
      nullableString: { type: ['string', 'null'] },
      nullableNumber: { type: ['number', 'null'] },
      nullableArray: { type: ['array', 'null'], items: { type: 'string' } },
      multiType: { type: ['string', 'number', 'boolean'] },
      deprecated: { type: 'string', deprecated: true },
    },
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
