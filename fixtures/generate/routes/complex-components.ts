import { createRoute, z } from '@hono/zod-openapi'

const UuidSchema = z
  .uuid()
  .openapi({ type: 'string', format: 'uuid', examples: ['f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01'] })
  .openapi('Uuid')

const UlidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
  .openapi({
    type: 'string',
    pattern: '^[0-9A-HJKMNP-TV-Z]{26}$',
    examples: ['01J1K9N3E6R6ZK7Z6B0Q9Q3H3J'],
  })
  .openapi('Ulid')

const IdSchema = z
  .xor([UuidSchema, UlidSchema])
  .openapi({
    description: 'Primary identifier (uuid or ulid) - used everywhere',
    oneOf: [{ $ref: '#/components/schemas/Uuid' }, { $ref: '#/components/schemas/Ulid' }],
  })
  .openapi('Id')

const TraceIdSchema = z
  .string()
  .min(8)
  .max(128)
  .openapi({
    type: 'string',
    description: 'Correlation id for tracing; also appears as header/parameter/example',
    minLength: 8,
    maxLength: 128,
  })
  .openapi('TraceId')

const CursorSchema = z
  .string()
  .openapi({ type: 'string', description: 'Pagination cursor (opaque)' })
  .openapi('Cursor')

const LocaleSchema = z
  .string()
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
  .openapi({ type: 'string', pattern: '^[a-z]{2}(-[A-Z]{2})?$', examples: ['ja-JP', 'en-US'] })
  .openapi('Locale')

const MetaSchema: z.ZodType<MetaType> = z
  .lazy(() =>
    z
      .object({
        createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
        updatedAt: z.iso
          .datetime()
          .exactOptional()
          .openapi({ type: 'string', format: 'date-time' }),
        trace: TraceContextSchema.exactOptional(),
        links: ResourceLinksSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['createdAt'],
        properties: {
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          trace: { $ref: '#/components/schemas/TraceContext' },
          links: { $ref: '#/components/schemas/ResourceLinks' },
        },
      }),
  )
  .openapi('Meta')

const EntitySchema = z
  .object({ id: IdSchema, meta: MetaSchema })
  .openapi({
    type: 'object',
    required: ['id', 'meta'],
    properties: {
      id: { $ref: '#/components/schemas/Id' },
      meta: { $ref: '#/components/schemas/Meta' },
    },
  })
  .openapi('Entity')

const TraceContextSchema: z.ZodType<TraceContextType> = z
  .lazy(() =>
    z
      .object({
        traceId: TraceIdSchema,
        parent: TraceContextSchema.exactOptional(),
        baggage: z
          .record(z.string(), z.string().openapi({ type: 'string' }))
          .exactOptional()
          .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
      })
      .openapi({
        type: 'object',
        required: ['traceId'],
        properties: {
          traceId: { $ref: '#/components/schemas/TraceId' },
          parent: { $ref: '#/components/schemas/TraceContext' },
          baggage: { type: 'object', additionalProperties: { type: 'string' } },
        },
      }),
  )
  .openapi('TraceContext')

const ResourceLinksSchema: z.ZodType<ResourceLinksType> = z
  .lazy(() =>
    z
      .record(z.string(), LinkSchema)
      .openapi({ type: 'object', additionalProperties: { $ref: '#/components/schemas/Link' } }),
  )
  .openapi('ResourceLinks')

type MetaType = {
  createdAt: string
  updatedAt?: string
  trace?: z.infer<typeof TraceContextSchema>
  links?: z.infer<typeof ResourceLinksSchema>
}

type TraceContextType = {
  traceId: z.infer<typeof TraceIdSchema>
  parent?: TraceContextType
  baggage?: Record<string, string>
}

const LinkSchema: z.ZodType<LinkType> = z
  .lazy(() =>
    z
      .object({
        href: z.string().openapi({ type: 'string', format: 'uri-reference' }),
        rel: z.string().exactOptional().openapi({ type: 'string' }),
        meta: MetaSchema.exactOptional(),
        next: LinkSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['href'],
        properties: {
          href: { type: 'string', format: 'uri-reference' },
          rel: { type: 'string' },
          meta: { $ref: '#/components/schemas/Meta' },
          next: { $ref: '#/components/schemas/Link' },
        },
      }),
  )
  .openapi('Link')

type ResourceLinksType = Record<string, z.infer<typeof LinkSchema>>

type LinkType = { href: string; rel?: string; meta?: z.infer<typeof MetaSchema>; next?: LinkType }

const GeoGraphSchema: z.ZodType<GeoGraphType> = z
  .lazy(() =>
    z
      .object({
        nodes: z
          .array(GraphNodeSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphNode' } }),
      })
      .openapi({
        type: 'object',
        required: ['nodes'],
        properties: { nodes: { type: 'array', items: { $ref: '#/components/schemas/GraphNode' } } },
      }),
  )
  .openapi('GeoGraph')

type GeoPointType = { lat: number; lng: number; graph?: z.infer<typeof GeoGraphSchema> }

const GeoPointSchema: z.ZodType<GeoPointType> = z
  .lazy(() =>
    z
      .object({
        lat: z.number().min(-90).max(90).openapi({ type: 'number', minimum: -90, maximum: 90 }),
        lng: z.number().min(-180).max(180).openapi({ type: 'number', minimum: -180, maximum: 180 }),
        graph: GeoGraphSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['lat', 'lng'],
        properties: {
          lat: { type: 'number', minimum: -90, maximum: 90 },
          lng: { type: 'number', minimum: -180, maximum: 180 },
          graph: { $ref: '#/components/schemas/GeoGraph' },
        },
      }),
  )
  .openapi('GeoPoint')

const GraphNodeSchema: z.ZodType<GraphNodeType> = z
  .lazy(() =>
    z
      .object({
        id: IdSchema,
        edges: z
          .array(GraphEdgeSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } }),
        entity: EntityRefSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['id'],
        properties: {
          id: { $ref: '#/components/schemas/Id' },
          edges: { type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } },
          entity: { $ref: '#/components/schemas/EntityRef' },
        },
      }),
  )
  .openapi('GraphNode')

type GeoGraphType = { nodes: z.infer<typeof GraphNodeSchema>[] }

const GraphEdgeSchema: z.ZodType<GraphEdgeType> = z
  .lazy(() =>
    z
      .object({
        to: GraphNodeSchema,
        weight: z.number().exactOptional().openapi({ type: 'number' }),
        meta: MetaSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['to'],
        properties: {
          to: { $ref: '#/components/schemas/GraphNode' },
          weight: { type: 'number' },
          meta: { $ref: '#/components/schemas/Meta' },
        },
      }),
  )
  .openapi('GraphEdge')

const EntityRefSchema: z.ZodType<EntityRefType> = z
  .lazy(() =>
    z
      .xor([UserSchema, CompanySchema, OrderSchema, ProductSchema, PersonSchema])
      .openapi({
        description: 'A union that can point back to everything (more hell)',
        oneOf: [
          { $ref: '#/components/schemas/User' },
          { $ref: '#/components/schemas/Company' },
          { $ref: '#/components/schemas/Order' },
          { $ref: '#/components/schemas/Product' },
          { $ref: '#/components/schemas/Person' },
        ],
      }),
  )
  .openapi('EntityRef')

type GraphNodeType = {
  id: z.infer<typeof IdSchema>
  edges?: z.infer<typeof GraphEdgeSchema>[]
  entity?: z.infer<typeof EntityRefSchema>
}

type GraphEdgeType = {
  to: z.infer<typeof GraphNodeSchema>
  weight?: number
  meta?: z.infer<typeof MetaSchema>
}

const CurrencySchema = z
  .enum(['JPY', 'USD', 'EUR'])
  .openapi({ type: 'string', enum: ['JPY', 'USD', 'EUR'] })
  .openapi('Currency')

const MoneySchema = z
  .object({
    currency: CurrencySchema,
    amount: z.number().multipleOf(0.01).openapi({ type: 'number', multipleOf: 0.01 }),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['currency', 'amount'],
    properties: {
      currency: { $ref: '#/components/schemas/Currency' },
      amount: { type: 'number', multipleOf: 0.01 },
      trace: { $ref: '#/components/schemas/TraceContext' },
    },
  })
  .openapi('Money')

const CompanySchema: z.ZodType<CompanyType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string().openapi({ type: 'string' }),
          headquarters: AddressSchema.exactOptional(),
          parent: CompanySchema.exactOptional(),
          subsidiaries: z
            .array(CompanySchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Company' } }),
          employees: z
            .array(UserSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
          primaryContact: PersonSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            headquarters: { $ref: '#/components/schemas/Address' },
            parent: { $ref: '#/components/schemas/Company' },
            subsidiaries: { type: 'array', items: { $ref: '#/components/schemas/Company' } },
            employees: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            primaryContact: { $ref: '#/components/schemas/Person' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/Entity' },
        {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            headquarters: { $ref: '#/components/schemas/Address' },
            parent: { $ref: '#/components/schemas/Company' },
            subsidiaries: { type: 'array', items: { $ref: '#/components/schemas/Company' } },
            employees: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            primaryContact: { $ref: '#/components/schemas/Person' },
          },
        },
      ],
    }),
  )
  .openapi('Company')

type ProductType = z.infer<typeof EntitySchema> & {
  name: string
  supplier?: z.infer<typeof CompanySchema>
  relatedProducts?: ProductType[]
  price?: z.infer<typeof MoneySchema>
}

const ProductSchema: z.ZodType<ProductType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string().openapi({ type: 'string' }),
          supplier: CompanySchema.exactOptional(),
          relatedProducts: z
            .array(ProductSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Product' } }),
          price: MoneySchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            supplier: { $ref: '#/components/schemas/Company' },
            relatedProducts: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
            price: { $ref: '#/components/schemas/Money' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/Entity' },
        {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            supplier: { $ref: '#/components/schemas/Company' },
            relatedProducts: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
            price: { $ref: '#/components/schemas/Money' },
          },
        },
      ],
    }),
  )
  .openapi('Product')

type OrderItemType = {
  product: z.infer<typeof ProductSchema>
  quantity: number
  unitPrice?: z.infer<typeof MoneySchema>
}

const OrderItemSchema: z.ZodType<OrderItemType> = z
  .lazy(() =>
    z
      .object({
        product: ProductSchema,
        quantity: z.int().min(1).openapi({ type: 'integer', minimum: 1 }),
        unitPrice: MoneySchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['product', 'quantity'],
        properties: {
          product: { $ref: '#/components/schemas/Product' },
          quantity: { type: 'integer', minimum: 1 },
          unitPrice: { $ref: '#/components/schemas/Money' },
        },
      }),
  )
  .openapi('OrderItem')

const OrderStatusSchema = z
  .enum(['pending', 'paid', 'shipped', 'cancelled'])
  .openapi({ type: 'string', enum: ['pending', 'paid', 'shipped', 'cancelled'] })
  .openapi('OrderStatus')

const UserSchema: z.ZodType<UserType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string().openapi({ type: 'string' }),
          email: z.email().openapi({ type: 'string', format: 'email' }),
          company: CompanySchema.exactOptional(),
          manager: UserSchema.exactOptional(),
          reports: z
            .array(UserSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
          addresses: z
            .array(AddressSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Address' } }),
          preferences: UserPreferencesSchema.exactOptional(),
          recentOrders: z
            .array(OrderSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Order' } }),
          links: ResourceLinksSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            company: { $ref: '#/components/schemas/Company' },
            manager: { $ref: '#/components/schemas/User' },
            reports: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            addresses: { type: 'array', items: { $ref: '#/components/schemas/Address' } },
            preferences: { $ref: '#/components/schemas/UserPreferences' },
            recentOrders: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
            links: { $ref: '#/components/schemas/ResourceLinks' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/Entity' },
        {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            company: { $ref: '#/components/schemas/Company' },
            manager: { $ref: '#/components/schemas/User' },
            reports: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            addresses: { type: 'array', items: { $ref: '#/components/schemas/Address' } },
            preferences: { $ref: '#/components/schemas/UserPreferences' },
            recentOrders: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
            links: { $ref: '#/components/schemas/ResourceLinks' },
          },
        },
      ],
    }),
  )
  .openapi('User')

const AddressSchema: z.ZodType<AddressType> = z
  .lazy(() =>
    z
      .object({
        line1: z.string().openapi({ type: 'string' }),
        line2: z.string().exactOptional().openapi({ type: 'string' }),
        city: z.string().openapi({ type: 'string' }),
        country: z.string().exactOptional().openapi({ type: 'string' }),
        geo: GeoPointSchema.exactOptional(),
        resident: z
          .xor([UserSchema, PersonSchema])
          .exactOptional()
          .openapi({
            oneOf: [{ $ref: '#/components/schemas/User' }, { $ref: '#/components/schemas/Person' }],
          }),
      })
      .openapi({
        type: 'object',
        required: ['line1', 'city'],
        properties: {
          line1: { type: 'string' },
          line2: { type: 'string' },
          city: { type: 'string' },
          country: { type: 'string' },
          geo: { $ref: '#/components/schemas/GeoPoint' },
          resident: {
            oneOf: [{ $ref: '#/components/schemas/User' }, { $ref: '#/components/schemas/Person' }],
          },
        },
      }),
  )
  .openapi('Address')

const AuditLogSchema: z.ZodType<AuditLogType> = z
  .lazy(() =>
    z
      .object({ entity: EntityRefSchema, event: EventSchema, meta: MetaSchema.exactOptional() })
      .openapi({
        type: 'object',
        required: ['entity', 'event'],
        properties: {
          entity: { $ref: '#/components/schemas/EntityRef' },
          event: { $ref: '#/components/schemas/Event' },
          meta: { $ref: '#/components/schemas/Meta' },
        },
      }),
  )
  .openapi('AuditLog')

type OrderType = z.infer<typeof EntitySchema> & {
  buyer: z.infer<typeof UserSchema>
  status: z.infer<typeof OrderStatusSchema>
  items: z.infer<typeof OrderItemSchema>[]
  shippingAddress?: z.infer<typeof AddressSchema>
  billingAddress?: z.infer<typeof AddressSchema>
  auditTrail?: z.infer<typeof AuditLogSchema>[]
  links?: z.infer<typeof ResourceLinksSchema>
}

const OrderSchema: z.ZodType<OrderType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          buyer: UserSchema,
          status: OrderStatusSchema,
          items: z
            .array(OrderItemSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
          shippingAddress: AddressSchema.exactOptional(),
          billingAddress: AddressSchema.exactOptional(),
          auditTrail: z
            .array(AuditLogSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/AuditLog' } }),
          links: ResourceLinksSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['buyer', 'status', 'items'],
          properties: {
            buyer: { $ref: '#/components/schemas/User' },
            status: { $ref: '#/components/schemas/OrderStatus' },
            items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
            shippingAddress: { $ref: '#/components/schemas/Address' },
            billingAddress: { $ref: '#/components/schemas/Address' },
            auditTrail: { type: 'array', items: { $ref: '#/components/schemas/AuditLog' } },
            links: { $ref: '#/components/schemas/ResourceLinks' },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/Entity' },
        {
          type: 'object',
          required: ['buyer', 'status', 'items'],
          properties: {
            buyer: { $ref: '#/components/schemas/User' },
            status: { $ref: '#/components/schemas/OrderStatus' },
            items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
            shippingAddress: { $ref: '#/components/schemas/Address' },
            billingAddress: { $ref: '#/components/schemas/Address' },
            auditTrail: { type: 'array', items: { $ref: '#/components/schemas/AuditLog' } },
            links: { $ref: '#/components/schemas/ResourceLinks' },
          },
        },
      ],
    }),
  )
  .openapi('Order')

const PersonSchema: z.ZodType<PersonType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          displayName: z.string().openapi({ type: 'string' }),
          employer: CompanySchema.exactOptional(),
          homeAddress: AddressSchema.exactOptional(),
          friends: z
            .array(PersonSchema)
            .exactOptional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Person' } }),
        })
        .openapi({
          type: 'object',
          required: ['displayName'],
          properties: {
            displayName: { type: 'string' },
            employer: { $ref: '#/components/schemas/Company' },
            homeAddress: { $ref: '#/components/schemas/Address' },
            friends: { type: 'array', items: { $ref: '#/components/schemas/Person' } },
          },
        }),
    ).openapi({
      allOf: [
        { $ref: '#/components/schemas/Entity' },
        {
          type: 'object',
          required: ['displayName'],
          properties: {
            displayName: { type: 'string' },
            employer: { $ref: '#/components/schemas/Company' },
            homeAddress: { $ref: '#/components/schemas/Address' },
            friends: { type: 'array', items: { $ref: '#/components/schemas/Person' } },
          },
        },
      ],
    }),
  )
  .openapi('Person')

type AddressType = {
  line1: string
  line2?: string
  city: string
  country?: string
  geo?: z.infer<typeof GeoPointSchema>
  resident?: z.infer<typeof UserSchema> | z.infer<typeof PersonSchema>
}

type PersonType = z.infer<typeof EntitySchema> & {
  displayName: string
  employer?: z.infer<typeof CompanySchema>
  homeAddress?: z.infer<typeof AddressSchema>
  friends?: PersonType[]
}

type CompanyType = z.infer<typeof EntitySchema> & {
  name: string
  headquarters?: z.infer<typeof AddressSchema>
  parent?: CompanyType
  subsidiaries?: CompanyType[]
  employees?: z.infer<typeof UserSchema>[]
  primaryContact?: z.infer<typeof PersonSchema>
}

type UserPreferencesType = {
  locale?: z.infer<typeof LocaleSchema>
  marketingOptIn?: boolean
  theme?: 'light' | 'dark' | 'system'
  shadowProfile?: z.infer<typeof UserSchema>
}

const UserPreferencesSchema: z.ZodType<UserPreferencesType> = z
  .lazy(() =>
    z
      .object({
        locale: LocaleSchema.exactOptional(),
        marketingOptIn: z.boolean().exactOptional().openapi({ type: 'boolean' }),
        theme: z
          .enum(['light', 'dark', 'system'])
          .exactOptional()
          .openapi({ type: 'string', enum: ['light', 'dark', 'system'] }),
        shadowProfile: UserSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          locale: { $ref: '#/components/schemas/Locale' },
          marketingOptIn: { type: 'boolean' },
          theme: { type: 'string', enum: ['light', 'dark', 'system'] },
          shadowProfile: { $ref: '#/components/schemas/User' },
        },
      }),
  )
  .openapi('UserPreferences')

type UserType = z.infer<typeof EntitySchema> & {
  name: string
  email: string
  company?: z.infer<typeof CompanySchema>
  manager?: UserType
  reports?: UserType[]
  addresses?: z.infer<typeof AddressSchema>[]
  preferences?: z.infer<typeof UserPreferencesSchema>
  recentOrders?: z.infer<typeof OrderSchema>[]
  links?: z.infer<typeof ResourceLinksSchema>
}

type EntityRefType =
  | z.infer<typeof UserSchema>
  | z.infer<typeof CompanySchema>
  | z.infer<typeof OrderSchema>
  | z.infer<typeof ProductSchema>
  | z.infer<typeof PersonSchema>

const EventTypeSchema = z
  .enum(['user.created', 'user.updated', 'order.created', 'order.shipped', 'system.alert'])
  .openapi({
    type: 'string',
    enum: ['user.created', 'user.updated', 'order.created', 'order.shipped', 'system.alert'],
  })
  .openapi('EventType')

const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({
        type: 'object',
        required: ['user'],
        properties: {
          user: { $ref: '#/components/schemas/User' },
          previous: { $ref: '#/components/schemas/User' },
        },
      }),
  )
  .openapi('UserEventPayload')

const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({
        type: 'object',
        required: ['order'],
        properties: {
          order: { $ref: '#/components/schemas/Order' },
          previousStatus: { $ref: '#/components/schemas/OrderStatus' },
        },
      }),
  )
  .openapi('OrderEventPayload')

const SystemEventPayloadSchema: z.ZodType<SystemEventPayloadType> = z
  .lazy(() =>
    z
      .object({
        message: z.string().openapi({ type: 'string' }),
        related: EntityRefSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' },
          related: { $ref: '#/components/schemas/EntityRef' },
        },
      }),
  )
  .openapi('SystemEventPayload')

type EventType = {
  type: z.infer<typeof EventTypeSchema>
  payload:
    | z.infer<typeof UserEventPayloadSchema>
    | z.infer<typeof OrderEventPayloadSchema>
    | z.infer<typeof SystemEventPayloadSchema>
  causedBy?: EventType[]
  trace?: z.infer<typeof TraceContextSchema>
}

const EventSchema: z.ZodType<EventType> = z
  .lazy(() =>
    z
      .object({
        type: EventTypeSchema,
        payload: z
          .xor([UserEventPayloadSchema, OrderEventPayloadSchema, SystemEventPayloadSchema])
          .openapi({
            oneOf: [
              { $ref: '#/components/schemas/UserEventPayload' },
              { $ref: '#/components/schemas/OrderEventPayload' },
              { $ref: '#/components/schemas/SystemEventPayload' },
            ],
          }),
        causedBy: z
          .array(EventSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Event' } }),
        trace: TraceContextSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['type', 'payload'],
        properties: {
          type: { $ref: '#/components/schemas/EventType' },
          payload: {
            oneOf: [
              { $ref: '#/components/schemas/UserEventPayload' },
              { $ref: '#/components/schemas/OrderEventPayload' },
              { $ref: '#/components/schemas/SystemEventPayload' },
            ],
          },
          causedBy: { type: 'array', items: { $ref: '#/components/schemas/Event' } },
          trace: { $ref: '#/components/schemas/TraceContext' },
        },
      }),
  )
  .openapi('Event')

type UserEventPayloadType = {
  user: z.infer<typeof UserSchema>
  previous?: z.infer<typeof UserSchema>
}

type OrderEventPayloadType = {
  order: z.infer<typeof OrderSchema>
  previousStatus?: z.infer<typeof OrderStatusSchema>
}

type SystemEventPayloadType = { message: string; related?: z.infer<typeof EntityRefSchema> }

type AuditLogType = {
  entity: z.infer<typeof EntityRefSchema>
  event: z.infer<typeof EventSchema>
  meta?: z.infer<typeof MetaSchema>
}

const FileSchema = EntitySchema.and(
  z
    .object({
      name: z.string().openapi({ type: 'string' }),
      size: z.int().min(0).openapi({ type: 'integer', minimum: 0 }),
      contentType: z.string().exactOptional().openapi({ type: 'string' }),
      download: LinkSchema.exactOptional(),
      owner: UserSchema.exactOptional(),
    })
    .openapi({
      type: 'object',
      required: ['name', 'size'],
      properties: {
        name: { type: 'string' },
        size: { type: 'integer', minimum: 0 },
        contentType: { type: 'string' },
        download: { $ref: '#/components/schemas/Link' },
        owner: { $ref: '#/components/schemas/User' },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Entity' },
      {
        type: 'object',
        required: ['name', 'size'],
        properties: {
          name: { type: 'string' },
          size: { type: 'integer', minimum: 0 },
          contentType: { type: 'string' },
          download: { $ref: '#/components/schemas/Link' },
          owner: { $ref: '#/components/schemas/User' },
        },
      },
    ],
  })
  .openapi('File')

const SecretRefSchema: z.ZodType<SecretRefType> = z
  .lazy(() =>
    z
      .object({
        secretId: z.string().openapi({ type: 'string' }),
        rotation: SecretRotationSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['secretId'],
        properties: {
          secretId: { type: 'string' },
          rotation: { $ref: '#/components/schemas/SecretRotation' },
        },
      }),
  )
  .openapi('SecretRef')

type SecretRotationType = {
  next?: z.infer<typeof SecretRefSchema>
  previous?: z.infer<typeof SecretRefSchema>
  meta?: z.infer<typeof MetaSchema>
}

const SecretRotationSchema: z.ZodType<SecretRotationType> = z
  .lazy(() =>
    z
      .object({
        next: SecretRefSchema.exactOptional(),
        previous: SecretRefSchema.exactOptional(),
        meta: MetaSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          next: { $ref: '#/components/schemas/SecretRef' },
          previous: { $ref: '#/components/schemas/SecretRef' },
          meta: { $ref: '#/components/schemas/Meta' },
        },
      }),
  )
  .openapi('SecretRotation')

type SecretRefType = { secretId: string; rotation?: z.infer<typeof SecretRotationSchema> }

const WebhookSubscriptionSchema = EntitySchema.and(
  z
    .object({
      callbackUrl: z.url().openapi({ type: 'string', format: 'uri' }),
      events: z
        .array(EventTypeSchema)
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/EventType' } }),
      secret: SecretRefSchema.exactOptional(),
      lastEvent: EventSchema.exactOptional(),
    })
    .openapi({
      type: 'object',
      required: ['callbackUrl', 'events'],
      properties: {
        callbackUrl: { type: 'string', format: 'uri' },
        events: { type: 'array', items: { $ref: '#/components/schemas/EventType' } },
        secret: { $ref: '#/components/schemas/SecretRef' },
        lastEvent: { $ref: '#/components/schemas/Event' },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Entity' },
      {
        type: 'object',
        required: ['callbackUrl', 'events'],
        properties: {
          callbackUrl: { type: 'string', format: 'uri' },
          events: { type: 'array', items: { $ref: '#/components/schemas/EventType' } },
          secret: { $ref: '#/components/schemas/SecretRef' },
          lastEvent: { $ref: '#/components/schemas/Event' },
        },
      },
    ],
  })
  .openapi('WebhookSubscription')

const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({
    type: 'object',
    required: ['subscription', 'event'],
    properties: {
      subscription: { $ref: '#/components/schemas/WebhookSubscription' },
      event: { $ref: '#/components/schemas/Event' },
    },
  })
  .openapi('WebhookEvent')

const TokenRequestSchema = z
  .object({
    grantType: z
      .enum(['client_credentials', 'refresh_token'])
      .openapi({ type: 'string', enum: ['client_credentials', 'refresh_token'] }),
    clientId: z.string().exactOptional().openapi({ type: 'string' }),
    clientSecret: z.string().exactOptional().openapi({ type: 'string' }),
    refreshToken: z.string().exactOptional().openapi({ type: 'string' }),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['grantType'],
    properties: {
      grantType: { type: 'string', enum: ['client_credentials', 'refresh_token'] },
      clientId: { type: 'string' },
      clientSecret: { type: 'string' },
      refreshToken: { type: 'string' },
      trace: { $ref: '#/components/schemas/TraceContext' },
    },
  })
  .openapi('TokenRequest')

const TokenResponseSchema = z
  .object({
    accessToken: z.string().openapi({ type: 'string' }),
    tokenType: z.literal('Bearer').openapi({ type: 'string', enum: ['Bearer'] }),
    expiresIn: z.int().exactOptional().openapi({ type: 'integer' }),
    refreshToken: z.string().exactOptional().openapi({ type: 'string' }),
    scope: z.string().exactOptional().openapi({ type: 'string' }),
    meta: MetaSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['accessToken', 'tokenType'],
    properties: {
      accessToken: { type: 'string' },
      tokenType: { type: 'string', enum: ['Bearer'] },
      expiresIn: { type: 'integer' },
      refreshToken: { type: 'string' },
      scope: { type: 'string' },
      meta: { $ref: '#/components/schemas/Meta' },
    },
  })
  .openapi('TokenResponse')

type ProblemDetailsType = {
  type: string
  title: string
  status: number
  detail?: string
  instance?: string
  traceId?: z.infer<typeof TraceIdSchema>
  causes?: ProblemDetailsType[]
}

const ProblemDetailsSchema: z.ZodType<ProblemDetailsType> = z
  .lazy(() =>
    z
      .object({
        type: z.url().openapi({ type: 'string', format: 'uri' }),
        title: z.string().openapi({ type: 'string' }),
        status: z.int().openapi({ type: 'integer' }),
        detail: z.string().exactOptional().openapi({ type: 'string' }),
        instance: z.string().exactOptional().openapi({ type: 'string', format: 'uri-reference' }),
        traceId: TraceIdSchema.exactOptional(),
        causes: z
          .array(ProblemDetailsSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/ProblemDetails' } }),
      })
      .openapi({
        type: 'object',
        required: ['type', 'title', 'status'],
        properties: {
          type: { type: 'string', format: 'uri' },
          title: { type: 'string' },
          status: { type: 'integer' },
          detail: { type: 'string' },
          instance: { type: 'string', format: 'uri-reference' },
          traceId: { $ref: '#/components/schemas/TraceId' },
          causes: { type: 'array', items: { $ref: '#/components/schemas/ProblemDetails' } },
        },
      }),
  )
  .openapi('ProblemDetails')

type FieldErrorType = {
  path: string
  message: string
  nested?: FieldErrorType
  problem?: z.infer<typeof ProblemDetailsSchema>
}

const FieldErrorSchema: z.ZodType<FieldErrorType> = z
  .lazy(() =>
    z
      .object({
        path: z.string().openapi({ type: 'string' }),
        message: z.string().openapi({ type: 'string' }),
        nested: FieldErrorSchema.exactOptional(),
        problem: ProblemDetailsSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['path', 'message'],
        properties: {
          path: { type: 'string' },
          message: { type: 'string' },
          nested: { $ref: '#/components/schemas/FieldError' },
          problem: { $ref: '#/components/schemas/ProblemDetails' },
        },
      }),
  )
  .openapi('FieldError')

const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z
    .object({
      errors: z
        .array(FieldErrorSchema)
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/FieldError' } }),
    })
    .openapi({
      type: 'object',
      required: ['errors'],
      properties: { errors: { type: 'array', items: { $ref: '#/components/schemas/FieldError' } } },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ProblemDetails' },
      {
        type: 'object',
        required: ['errors'],
        properties: {
          errors: { type: 'array', items: { $ref: '#/components/schemas/FieldError' } },
        },
      },
    ],
  })
  .openapi('ValidationProblemDetails')

const UserFilterSchema = z
  .object({
    kind: z.literal('user').openapi({ type: 'string' }),
    email: z.email().exactOptional().openapi({ type: 'string', format: 'email' }),
    company: CompanySchema.exactOptional(),
    manager: UserSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['kind'],
    properties: {
      kind: { type: 'string', const: 'user' },
      email: { type: 'string', format: 'email' },
      company: { $ref: '#/components/schemas/Company' },
      manager: { $ref: '#/components/schemas/User' },
    },
  })
  .openapi('UserFilter')

const OrderFilterSchema = z
  .object({
    kind: z.literal('order').openapi({ type: 'string' }),
    status: OrderStatusSchema.exactOptional(),
    buyer: UserSchema.exactOptional(),
    minTotal: MoneySchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['kind'],
    properties: {
      kind: { type: 'string', const: 'order' },
      status: { $ref: '#/components/schemas/OrderStatus' },
      buyer: { $ref: '#/components/schemas/User' },
      minTotal: { $ref: '#/components/schemas/Money' },
    },
  })
  .openapi('OrderFilter')

const CompanyFilterSchema = z
  .object({
    kind: z.literal('company').openapi({ type: 'string' }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
    parent: CompanySchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['kind'],
    properties: {
      kind: { type: 'string', const: 'company' },
      name: { type: 'string' },
      parent: { $ref: '#/components/schemas/Company' },
    },
  })
  .openapi('CompanyFilter')

const SearchFilterSchema = z
  .discriminatedUnion('kind', [UserFilterSchema, OrderFilterSchema, CompanyFilterSchema])
  .openapi({
    description: 'Query filter represented as JSON in a query param (evil)',
    oneOf: [
      { $ref: '#/components/schemas/UserFilter' },
      { $ref: '#/components/schemas/OrderFilter' },
      { $ref: '#/components/schemas/CompanyFilter' },
    ],
    discriminator: {
      propertyName: 'kind',
      mapping: {
        user: '#/components/schemas/UserFilter',
        order: '#/components/schemas/OrderFilter',
        company: '#/components/schemas/CompanyFilter',
      },
    },
  })
  .openapi('SearchFilter')

const TraceIdHeaderParamParamsSchema = TraceIdSchema.exactOptional().openapi({
  param: {
    name: 'x-trace-id',
    in: 'header',
    required: false,
    description: 'Correlation id (parameter) - schema refs TraceId',
    schema: { $ref: '#/components/schemas/TraceId' },
    example: { $ref: '#/components/examples/TraceIdExample/value' },
  },
})

const UserIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'userId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
    examples: {
      uuid: { $ref: '#/components/examples/UserIdUuid' },
      ulid: { $ref: '#/components/examples/UserIdUlid' },
    },
  },
})

const CompanyIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'companyId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

const OrderIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'orderId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

const FileIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'fileId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

const LimitQueryParamParamsSchema = z
  .int()
  .min(1)
  .max(200)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, maximum: 200 },
      example: 50,
    },
    type: 'integer',
    minimum: 1,
    maximum: 200,
  })

const CursorQueryParamParamsSchema = CursorSchema.exactOptional().openapi({
  param: {
    name: 'cursor',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Cursor' },
  },
})

const BuyerIdQueryParamParamsSchema = IdSchema.exactOptional().openapi({
  param: {
    name: 'buyerId',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

const IncludeQueryParamParamsSchema = z
  .array(
    z
      .enum(['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'])
      .exactOptional()
      .openapi({
        param: {
          name: 'include',
          in: 'query',
          required: false,
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'],
            },
          },
          style: 'form',
          explode: true,
        },
        type: 'string',
        enum: ['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'],
      }),
  )
  .exactOptional()
  .openapi({
    param: {
      name: 'include',
      in: 'query',
      required: false,
      schema: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'],
        },
      },
      style: 'form',
      explode: true,
    },
    type: 'array',
    items: {
      type: 'string',
      enum: ['company', 'manager', 'reports', 'orders', 'auditTrail', 'graph'],
    },
  })

const SearchFilterQueryParamParamsSchema = SearchFilterSchema.exactOptional().openapi({
  param: {
    name: 'filter',
    in: 'query',
    required: false,
    description:
      'JSON-encoded filter object in query param (content-based parameter).\n参照地獄: content -> schema -> unions -> full objects -> recursion\n',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SearchFilter' },
        examples: {
          userFilter: { $ref: '#/components/examples/UserFilterExample' },
          orderFilter: { $ref: '#/components/examples/OrderFilterExample' },
        },
      },
    },
  },
})

const OAuth2SecurityScheme = {
  type: 'oauth2',
  description: 'OAuth2 (authorizationCode) - scopes used by top-level security',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.inferno.example/oauth/authorize',
      tokenUrl: 'https://auth.inferno.example/oauth/token',
      scopes: { 'inferno.read': 'read everything', 'inferno.write': 'write everything' },
    },
  },
}

const ApiKeyAuthSecurityScheme = { type: 'apiKey', name: 'x-api-key', in: 'header' }

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const TokenRequestClientCredentialsExample = {
  value: {
    grantType: 'client_credentials',
    clientId: 'client_123',
    clientSecret: 'secret_abc',
    trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
  },
}

const TokenRequestRefreshExample = {
  value: {
    grantType: 'refresh_token',
    refreshToken: 'refresh_xxx',
    trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
  },
}

const TokenRequestRequestBody = {
  content: {
    'application/json': {
      schema: TokenRequestSchema,
      examples: {
        clientCredentials: TokenRequestClientCredentialsExample,
        refreshToken: TokenRequestRefreshExample,
      },
    },
  },
  required: true,
}

const UserFullExample = {
  value: {
    id: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
    },
    name: 'Inferno Taro',
    email: 'taro@inferno.example',
    company: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Inferno Inc.',
    },
    manager: { $ref: '#/components/examples/UserMinimal' },
    addresses: [
      {
        line1: '1-2-3 Hell St',
        city: 'Tokyo',
        country: 'JP',
        geo: {
          lat: 35.6895,
          lng: 139.6917,
          graph: {
            nodes: [
              {
                id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
                edges: [{ to: { id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }, weight: 0.666 }],
              },
            ],
          },
        },
      },
    ],
  },
}

const UserMinimalExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Minimal User',
    email: 'min@example.com',
  },
}

const CreateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: UserSchema,
      examples: { full: UserFullExample, minimal: UserMinimalExample },
    },
  },
  required: true,
}

const UserPrefsExample = {
  value: {
    locale: 'ja-JP',
    marketingOptIn: false,
    shadowProfile: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Shadow',
      email: 'shadow@inferno.example',
    },
  },
}

const UpdateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: z
        .union([
          UserSchema,
          UserPreferencesSchema,
          z
            .object({ patch: ProblemDetailsSchema.exactOptional() })
            .openapi({
              type: 'object',
              properties: { patch: { $ref: '#/components/schemas/ProblemDetails' } },
            }),
        ])
        .openapi({
          anyOf: [
            { $ref: '#/components/schemas/User' },
            { $ref: '#/components/schemas/UserPreferences' },
            {
              type: 'object',
              properties: { patch: { $ref: '#/components/schemas/ProblemDetails' } },
            },
          ],
        }),
      examples: { prefs: UserPrefsExample },
    },
  },
  required: true,
}

const OrderExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    buyer: { $ref: '#/components/examples/UserMinimal/value' },
    status: 'paid',
    items: [
      {
        product: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Flame Keyboard',
          price: { currency: 'JPY', amount: 19999 },
        },
        quantity: 1,
      },
    ],
    auditTrail: [
      {
        entity: { $ref: '#/components/examples/UserMinimal/value' },
        event: {
          type: 'order.created',
          payload: { order: { $ref: '#/components/examples/OrderExample/value' } },
        },
        meta: { createdAt: '2026-01-04T00:00:00Z' },
      },
    ],
  },
}

const CreateOrderRequestRequestBody = {
  content: { 'application/json': { schema: OrderSchema, examples: { sample: OrderExample } } },
  required: true,
}

const SubscriptionExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    callbackUrl: 'https://client.example/webhook',
    events: ['order.created', 'user.updated'],
    secret: { secretId: 'sec_123', rotation: { next: { secretId: 'sec_456' } } },
  },
}

const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExample },
    },
  },
  required: true,
}

const WebhookEventExample = {
  value: {
    subscription: { $ref: '#/components/examples/SubscriptionExample/value' },
    event: {
      type: 'order.created',
      payload: { order: { $ref: '#/components/examples/OrderExample/value' } },
    },
  },
}

const WebhookEventRequestRequestBody = {
  content: {
    'application/json': { schema: WebhookEventSchema, examples: { event: WebhookEventExample } },
  },
  required: true,
}

const TraceIdHeaderHeaderSchema = TraceIdSchema.exactOptional().openapi({
  description: 'Trace id header component (same concept as parameter)',
  example: { $ref: '#/components/examples/TraceIdExample/value' },
})

const ProblemGenericExample = {
  value: {
    type: 'https://errors.inferno.example/problem/generic',
    title: 'Something went wrong',
    status: 500,
    traceId: { $ref: '#/components/examples/TraceIdExample/value' },
    causes: [
      { type: 'https://errors.inferno.example/problem/inner', title: 'Inner failure', status: 500 },
    ],
  },
}

const DefaultErrorResponse = {
  description: 'Default error wrapper -> points to ProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { generic: ProblemGenericExample },
    },
  },
}

const ProblemValidationExample = {
  value: {
    type: 'https://errors.inferno.example/problem/validation',
    title: 'Validation error',
    status: 400,
    traceId: { $ref: '#/components/examples/TraceIdExample/value' },
    errors: [
      {
        path: 'email',
        message: 'Invalid email',
        nested: { path: 'email.domain', message: 'Domain is not allowed' },
      },
    ],
  },
}

const ValidationErrorResponse = {
  description: 'Validation error -> points to ValidationProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ValidationProblemDetailsSchema,
      examples: { invalid: ProblemValidationExample },
    },
  },
}

const WwwAuthenticateHeaderHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({
    description: 'WWW-Authenticate for Bearer',
    example: 'Bearer realm="inferno", error="invalid_token"',
    type: 'string',
  })

const ProblemUnauthorizedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/unauthorized',
    title: 'Unauthorized',
    status: 401,
    traceId: { $ref: '#/components/examples/TraceIdExample/value' },
  },
}

const UnauthorizedResponse = {
  description: 'Unauthorized',
  headers: z.object({
    'x-trace-id': TraceIdHeaderHeaderSchema,
    'www-authenticate': WwwAuthenticateHeaderHeaderSchema,
  }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { unauthorized: ProblemUnauthorizedExample },
    },
  },
}

const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/problem+json': { schema: ProblemDetailsSchema } },
}

const ProblemNotFoundExample = {
  value: {
    type: 'https://errors.inferno.example/problem/notfound',
    title: 'Not found',
    status: 404,
    traceId: { $ref: '#/components/examples/TraceIdExample/value' },
  },
}

const NotFoundResponse = {
  description: 'Not Found',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { notFound: ProblemNotFoundExample },
    },
  },
}

const RateLimitLimitHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit total', example: 1000, type: 'integer' })

const RateLimitRemainingHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit remaining', example: 998, type: 'integer' })

const RateLimitResetHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit reset epoch seconds', example: 1735689600, type: 'integer' })

const ProblemRateLimitedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/ratelimited',
    title: 'Too many requests',
    status: 429,
    traceId: { $ref: '#/components/examples/TraceIdExample/value' },
  },
}

const RateLimitedResponse = {
  description: 'Too Many Requests',
  headers: z.object({
    'x-trace-id': TraceIdHeaderHeaderSchema,
    'x-ratelimit-limit': RateLimitLimitHeaderHeaderSchema,
    'x-ratelimit-remaining': RateLimitRemainingHeaderHeaderSchema,
    'x-ratelimit-reset': RateLimitResetHeaderHeaderSchema,
  }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { rateLimited: ProblemRateLimitedExample },
    },
  },
}

const TokenResponseExample = {
  value: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    tokenType: 'Bearer',
    expiresIn: 3600,
    scope: 'inferno.read',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: { $ref: '#/components/examples/TraceIdExample/value' } },
    },
  },
}

const ListUsersLink = { operationId: 'listUsers', description: 'Jump to users list after token' }

const TokenResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: TokenResponseSchema, examples: { token: TokenResponseExample } },
  },
  links: { me: ListUsersLink },
}

const GetUserLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/id' },
  description: 'Follow to get the same user',
}

const GetCompanyFromUserLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/company/id' },
  description: "Resolve user's company",
}

const ListOrdersForUserLink = {
  operationId: 'listOrders',
  parameters: { buyerId: '$response.body#/id' },
  description: 'List orders by user id',
}

const UserResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: { self: GetUserLink, company: GetCompanyFromUserLink, orders: ListOrdersForUserLink },
}

const UserListExample = {
  value: {
    items: [{ $ref: '#/components/examples/UserMinimal/value' }],
    nextCursor: 'cursor_opaque_123',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
  },
}

const ListUsersNextPageLink = {
  operationId: 'listUsers',
  parameters: { cursor: '$response.body#/nextCursor' },
}

const UserListResponse = {
  description: 'Users list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z
            .array(UserSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['items'],
          properties: {
            items: { type: 'array', items: { $ref: '#/components/schemas/User' } },
            nextCursor: { $ref: '#/components/schemas/Cursor' },
            meta: { $ref: '#/components/schemas/Meta' },
          },
        }),
      examples: { list: UserListExample },
    },
  },
  links: { next: ListUsersNextPageLink },
}

const CompanyExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Inferno Inc.',
    employees: [{ $ref: '#/components/examples/UserMinimal/value' }],
  },
}

const GetCompanyLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/id' },
}

const CompanyResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: CompanySchema, examples: { company: CompanyExample } } },
  links: { self: GetCompanyLink },
}

const GetOrderLink = { operationId: 'getOrderById', parameters: { orderId: '$response.body#/id' } }

const GetUserFromOrderLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/buyer/id' },
  description: 'Resolve order buyer',
}

const OrderResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: OrderSchema, examples: { order: OrderExample } } },
  links: { self: GetOrderLink, buyer: GetUserFromOrderLink },
}

const OrderListExample = {
  value: {
    items: [{ $ref: '#/components/examples/OrderExample/value' }],
    nextCursor: 'cursor_opaque_orders_123',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
  },
}

const ListOrdersNextPageLink = {
  operationId: 'listOrders',
  parameters: { cursor: '$response.body#/nextCursor' },
}

const OrderListResponse = {
  description: 'Orders list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z
            .array(OrderSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Order' } }),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          required: ['items'],
          properties: {
            items: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
            nextCursor: { $ref: '#/components/schemas/Cursor' },
            meta: { $ref: '#/components/schemas/Meta' },
          },
        }),
      examples: { list: OrderListExample },
    },
  },
  links: { next: ListOrdersNextPageLink },
}

const FileExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'inferno.png',
    size: 123456,
    contentType: 'image/png',
    download: { href: '/files/01J1K9N3E6R6ZK7Z6B0Q9Q3H3J/download' },
    owner: { $ref: '#/components/examples/UserMinimal/value' },
  },
}

const GetUserFromFileLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/owner/id' },
  description: 'Resolve file owner',
}

const FileResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExample } } },
  links: { owner: GetUserFromFileLink },
}

const SubscriptionResponse = {
  description: 'A webhook subscription',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { subscription: SubscriptionExample },
    },
  },
}

const TraceIdExample = { summary: 'TraceId example', value: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }

const UserIdUuidExample = { summary: 'userId uuid', value: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01' }

const UserIdUlidExample = { summary: 'userId ulid', value: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }

const UserFilterExample = {
  value: {
    kind: 'user',
    email: 'taro@inferno.example',
    manager: { $ref: '#/components/examples/UserMinimal/value' },
  },
}

const OrderFilterExample = {
  value: {
    kind: 'order',
    status: 'paid',
    buyer: { $ref: '#/components/examples/UserMinimal/value' },
    minTotal: { currency: 'JPY', amount: 1000 },
  },
}

const SubscriptionLifecycleCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      summary: 'Subscription lifecycle callback',
      operationId: 'onSubscriptionEvent',
      requestBody: WebhookEventRequestRequestBody,
      responses: {
        200: {
          description: 'Ack',
          headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
          content: {
            'application/json': {
              schema: z
                .object({
                  ok: z.boolean().exactOptional().openapi({ type: 'boolean' }),
                  next: LinkSchema.exactOptional(),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                    next: { $ref: '#/components/schemas/Link' },
                  },
                }),
              examples: { ack: { value: { ok: true, next: { href: '/subscriptions' } } } },
            },
          },
        },
        default: DefaultErrorResponse,
      },
    },
  },
}

const OrderCreatedCallback = {
  '{$request.body#/buyer/company/primaryContact/employer/meta/links/self/href}': {
    post: {
      summary: 'Order created callback (path expression is intentionally absurd)',
      operationId: 'onOrderCreatedEvent',
      requestBody: WebhookEventRequestRequestBody,
      responses: {
        200: {
          description: 'Ack',
          content: {
            'application/json': {
              schema: z
                .object({
                  ok: z.boolean().exactOptional().openapi({ type: 'boolean' }),
                  echo: WebhookEventSchema.exactOptional(),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                    echo: { $ref: '#/components/schemas/WebhookEvent' },
                  },
                }),
            },
          },
        },
        default: DefaultErrorResponse,
      },
    },
  },
}

export const postAuthTokenRoute = createRoute({
  method: 'post',
  path: '/auth/token',
  tags: ['Auth'],
  summary: 'Issue access token',
  operationId: 'issueToken',
  request: { body: TokenRequestRequestBody },
  responses: { 200: TokenResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  security: [],
})

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List users',
  operationId: 'listUsers',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({
      limit: LimitQueryParamParamsSchema,
      cursor: CursorQueryParamParamsSchema,
      include: IncludeQueryParamParamsSchema,
      filter: SearchFilterQueryParamParamsSchema,
    }),
  },
  responses: {
    200: UserListResponse,
    401: UnauthorizedResponse,
    429: RateLimitedResponse,
    default: DefaultErrorResponse,
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create user',
  operationId: 'createUser',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: CreateUserRequestRequestBody,
  },
  responses: {
    201: UserResponse,
    400: ValidationErrorResponse,
    409: ConflictResponse,
    default: DefaultErrorResponse,
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'Get user by id',
  operationId: 'getUserById',
  request: {
    params: z.object({ userId: UserIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: UserResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const patchUsersUserIdRoute = createRoute({
  method: 'patch',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'Update user (partial)',
  operationId: 'updateUser',
  request: {
    params: z.object({ userId: UserIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: UpdateUserRequestRequestBody,
  },
  responses: {
    200: UserResponse,
    400: ValidationErrorResponse,
    404: NotFoundResponse,
    default: DefaultErrorResponse,
  },
})

export const getCompaniesCompanyIdRoute = createRoute({
  method: 'get',
  path: '/companies/{companyId}',
  tags: ['Companies'],
  summary: 'Get company by id',
  operationId: 'getCompanyById',
  request: {
    params: z.object({ companyId: CompanyIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: CompanyResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  tags: ['Orders'],
  summary: 'List orders',
  operationId: 'listOrders',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({
      limit: LimitQueryParamParamsSchema,
      cursor: CursorQueryParamParamsSchema,
      buyerId: BuyerIdQueryParamParamsSchema,
      include: IncludeQueryParamParamsSchema,
      filter: SearchFilterQueryParamParamsSchema,
    }),
  },
  responses: { 200: OrderListResponse, 401: UnauthorizedResponse, default: DefaultErrorResponse },
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create order (and optionally trigger callback)',
  operationId: 'createOrder',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: CreateOrderRequestRequestBody,
  },
  responses: { 201: OrderResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  orderEvents: OrderCreatedCallback,
})

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  tags: ['Orders'],
  summary: 'Get order by id',
  operationId: 'getOrderById',
  request: {
    params: z.object({ orderId: OrderIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: OrderResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const getFilesFileIdRoute = createRoute({
  method: 'get',
  path: '/files/{fileId}',
  tags: ['Files'],
  summary: 'Get file metadata',
  operationId: 'getFileById',
  request: {
    params: z.object({ fileId: FileIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
  },
  responses: { 200: FileResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})

export const postSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/subscriptions',
  tags: ['Subscriptions'],
  summary: 'Create webhook subscription',
  operationId: 'createSubscription',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: SubscriptionRequestRequestBody,
  },
  responses: {
    201: SubscriptionResponse,
    400: ValidationErrorResponse,
    default: DefaultErrorResponse,
  },
  subscriptionEvents: SubscriptionLifecycleCallback,
})
