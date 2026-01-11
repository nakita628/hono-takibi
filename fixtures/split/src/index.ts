import { createRoute, z } from '@hono/zod-openapi'

export const UuidSchema = z
  .uuid()
  .openapi({ examples: ['f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01'] })
  .openapi('Uuid')

export const UlidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
  .openapi({ examples: ['01J1K9N3E6R6ZK7Z6B0Q9Q3H3J'] })
  .openapi('Ulid')

type IdType = z.infer<typeof UuidSchema> | z.infer<typeof UlidSchema>

type LocaleType = string

export const IdSchema: z.ZodType<IdType> = z
  .xor([UuidSchema, UlidSchema])
  .openapi({ description: 'Primary identifier (uuid or ulid) - used everywhere' })
  .openapi('Id')

export const MetaSchema: z.ZodType<MetaType> = z
  .lazy(() =>
    z
      .object({
        createdAt: z.iso.datetime(),
        updatedAt: z.iso.datetime().exactOptional(),
        trace: TraceContextSchema.exactOptional(),
        links: ResourceLinksSchema.exactOptional(),
      })
      .openapi({ required: ['createdAt'] }),
  )
  .openapi('Meta')

type EntityType = { id: z.infer<typeof IdSchema>; meta: z.infer<typeof MetaSchema> }

export const TraceContextSchema: z.ZodType<TraceContextType> = z
  .lazy(() =>
    z
      .object({
        traceId: TraceIdSchema,
        parent: TraceContextSchema.exactOptional(),
        baggage: z.record(z.string(), z.string()).exactOptional(),
      })
      .openapi({ required: ['traceId'] }),
  )
  .openapi('TraceContext')

export const ResourceLinksSchema: z.ZodType<ResourceLinksType> = z
  .lazy(() => z.record(z.string(), LinkSchema))
  .openapi('ResourceLinks')

type MetaType = {
  createdAt: string
  updatedAt?: string
  trace?: z.infer<typeof TraceContextSchema>
  links?: z.infer<typeof ResourceLinksSchema>
}

export const TraceIdSchema = z
  .string()
  .min(8)
  .max(128)
  .openapi({ description: 'Correlation id for tracing; also appears as header/parameter/example' })
  .openapi('TraceId')

type TraceContextType = {
  traceId: z.infer<typeof TraceIdSchema>
  parent?: TraceContextType
  baggage?: { [key: string]: string }
}

export const LinkSchema: z.ZodType<LinkType> = z
  .lazy(() =>
    z
      .object({
        href: z.string(),
        rel: z.string().exactOptional(),
        meta: MetaSchema.exactOptional(),
        next: LinkSchema.exactOptional(),
      })
      .openapi({ required: ['href'] }),
  )
  .openapi('Link')

type ResourceLinksType = { [key: string]: z.infer<typeof LinkSchema> }

type LinkType = { href: string; rel?: string; meta?: z.infer<typeof MetaSchema>; next?: LinkType }

export const GeoGraphSchema: z.ZodType<GeoGraphType> = z
  .lazy(() => z.object({ nodes: z.array(GraphNodeSchema) }).openapi({ required: ['nodes'] }))
  .openapi('GeoGraph')

type GeoPointType = { lat: number; lng: number; graph?: z.infer<typeof GeoGraphSchema> }

export const GraphNodeSchema: z.ZodType<GraphNodeType> = z
  .lazy(() =>
    z
      .object({
        id: IdSchema,
        edges: z.array(GraphEdgeSchema).exactOptional(),
        entity: EntityRefSchema.exactOptional(),
      })
      .openapi({ required: ['id'] }),
  )
  .openapi('GraphNode')

type GeoGraphType = { nodes: z.infer<typeof GraphNodeSchema>[] }

export const GraphEdgeSchema: z.ZodType<GraphEdgeType> = z
  .lazy(() =>
    z
      .object({
        to: GraphNodeSchema,
        weight: z.number().exactOptional(),
        meta: MetaSchema.exactOptional(),
      })
      .openapi({ required: ['to'] }),
  )
  .openapi('GraphEdge')

export const EntityRefSchema: z.ZodType<EntityRefType> = z
  .lazy(() =>
    z
      .xor([UserSchema, CompanySchema, OrderSchema, ProductSchema, PersonSchema])
      .openapi({ description: 'A union that can point back to everything (more hell)' }),
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

export const CurrencySchema = z.enum(['JPY', 'USD', 'EUR']).openapi('Currency')

type MoneyType = {
  currency: z.infer<typeof CurrencySchema>
  amount: number
  trace?: z.infer<typeof TraceContextSchema>
}

export const EntitySchema: z.ZodType<EntityType> = z
  .object({ id: IdSchema, meta: MetaSchema })
  .openapi({ required: ['id', 'meta'] })
  .openapi('Entity')

export const CompanySchema: z.ZodType<CompanyType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string(),
          headquarters: AddressSchema.exactOptional(),
          parent: CompanySchema.exactOptional(),
          subsidiaries: z.array(CompanySchema).exactOptional(),
          employees: z.array(UserSchema).exactOptional(),
          primaryContact: PersonSchema.exactOptional(),
        })
        .openapi({ required: ['name'] }),
    ),
  )
  .openapi('Company')

export const MoneySchema: z.ZodType<MoneyType> = z
  .object({
    currency: CurrencySchema,
    amount: z.number().multipleOf(0.01),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['currency', 'amount'] })
  .openapi('Money')

type ProductType = z.infer<typeof EntitySchema> & {
  name: string
  supplier?: z.infer<typeof CompanySchema>
  relatedProducts?: ProductType[]
  price?: z.infer<typeof MoneySchema>
}

export const ProductSchema: z.ZodType<ProductType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string(),
          supplier: CompanySchema.exactOptional(),
          relatedProducts: z.array(ProductSchema).exactOptional(),
          price: MoneySchema.exactOptional(),
        })
        .openapi({ required: ['name'] }),
    ),
  )
  .openapi('Product')

type OrderItemType = {
  product: z.infer<typeof ProductSchema>
  quantity: number
  unitPrice?: z.infer<typeof MoneySchema>
}

type OrderStatusType = 'pending' | 'paid' | 'shipped' | 'cancelled'

export const UserSchema: z.ZodType<UserType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          name: z.string(),
          email: z.email(),
          company: CompanySchema.exactOptional(),
          manager: UserSchema.exactOptional(),
          reports: z.array(UserSchema).exactOptional(),
          addresses: z.array(AddressSchema).exactOptional(),
          preferences: UserPreferencesSchema.exactOptional(),
          recentOrders: z.array(OrderSchema).exactOptional(),
          links: ResourceLinksSchema.exactOptional(),
        })
        .openapi({ required: ['name', 'email'] }),
    ),
  )
  .openapi('User')

export const OrderStatusSchema: z.ZodType<OrderStatusType> = z
  .enum(['pending', 'paid', 'shipped', 'cancelled'])
  .openapi('OrderStatus')

export const OrderItemSchema: z.ZodType<OrderItemType> = z
  .lazy(() =>
    z
      .object({
        product: ProductSchema,
        quantity: z.int().min(1),
        unitPrice: MoneySchema.exactOptional(),
      })
      .openapi({ required: ['product', 'quantity'] }),
  )
  .openapi('OrderItem')

export const AddressSchema: z.ZodType<AddressType> = z
  .lazy(() =>
    z
      .object({
        line1: z.string(),
        line2: z.string().exactOptional(),
        city: z.string(),
        country: z.string().exactOptional(),
        geo: GeoPointSchema.exactOptional(),
        resident: z.xor([UserSchema, PersonSchema]).exactOptional(),
      })
      .openapi({ required: ['line1', 'city'] }),
  )
  .openapi('Address')

export const AuditLogSchema: z.ZodType<AuditLogType> = z
  .lazy(() =>
    z
      .object({ entity: EntityRefSchema, event: EventSchema, meta: MetaSchema.exactOptional() })
      .openapi({ required: ['entity', 'event'] }),
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

export const GeoPointSchema: z.ZodType<GeoPointType> = z
  .lazy(() =>
    z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        graph: GeoGraphSchema.exactOptional(),
      })
      .openapi({ required: ['lat', 'lng'] }),
  )
  .openapi('GeoPoint')

export const PersonSchema: z.ZodType<PersonType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          displayName: z.string(),
          employer: CompanySchema.exactOptional(),
          homeAddress: AddressSchema.exactOptional(),
          friends: z.array(PersonSchema).exactOptional(),
        })
        .openapi({ required: ['displayName'] }),
    ),
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

export const LocaleSchema: z.ZodType<LocaleType> = z
  .string()
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
  .openapi({ examples: ['ja-JP', 'en-US'] })
  .openapi('Locale')

type UserPreferencesType = {
  locale?: z.infer<typeof LocaleSchema>
  marketingOptIn?: boolean
  theme?: 'light' | 'dark' | 'system'
  shadowProfile?: z.infer<typeof UserSchema>
}

export const UserPreferencesSchema: z.ZodType<UserPreferencesType> = z
  .lazy(() =>
    z.object({
      locale: LocaleSchema.exactOptional(),
      marketingOptIn: z.boolean().exactOptional(),
      theme: z.enum(['light', 'dark', 'system']).exactOptional(),
      shadowProfile: UserSchema.exactOptional(),
    }),
  )
  .openapi('UserPreferences')

export const OrderSchema: z.ZodType<OrderType> = z
  .lazy(() =>
    EntitySchema.and(
      z
        .object({
          buyer: UserSchema,
          status: OrderStatusSchema,
          items: z.array(OrderItemSchema),
          shippingAddress: AddressSchema.exactOptional(),
          billingAddress: AddressSchema.exactOptional(),
          auditTrail: z.array(AuditLogSchema).exactOptional(),
          links: ResourceLinksSchema.exactOptional(),
        })
        .openapi({ required: ['buyer', 'status', 'items'] }),
    ),
  )
  .openapi('Order')

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

type EventTypeType =
  | 'user.created'
  | 'user.updated'
  | 'order.created'
  | 'order.shipped'
  | 'system.alert'

export const EventTypeSchema: z.ZodType<EventTypeType> = z
  .enum(['user.created', 'user.updated', 'order.created', 'order.shipped', 'system.alert'])
  .openapi('EventType')

export const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({ required: ['user'] }),
  )
  .openapi('UserEventPayload')

export const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({ required: ['order'] }),
  )
  .openapi('OrderEventPayload')

export const SystemEventPayloadSchema: z.ZodType<SystemEventPayloadType> = z
  .lazy(() =>
    z
      .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
      .openapi({ required: ['message'] }),
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

type UserEventPayloadType = {
  user: z.infer<typeof UserSchema>
  previous?: z.infer<typeof UserSchema>
}

type OrderEventPayloadType = {
  order: z.infer<typeof OrderSchema>
  previousStatus?: z.infer<typeof OrderStatusSchema>
}

type SystemEventPayloadType = { message: string; related?: z.infer<typeof EntityRefSchema> }

export const EventSchema: z.ZodType<EventType> = z
  .lazy(() =>
    z
      .object({
        type: EventTypeSchema,
        payload: z.xor([UserEventPayloadSchema, OrderEventPayloadSchema, SystemEventPayloadSchema]),
        causedBy: z.array(EventSchema).exactOptional(),
        trace: TraceContextSchema.exactOptional(),
      })
      .openapi({ required: ['type', 'payload'] }),
  )
  .openapi('Event')

type AuditLogType = {
  entity: z.infer<typeof EntityRefSchema>
  event: z.infer<typeof EventSchema>
  meta?: z.infer<typeof MetaSchema>
}

export const SecretRefSchema: z.ZodType<SecretRefType> = z
  .lazy(() =>
    z
      .object({ secretId: z.string(), rotation: SecretRotationSchema.exactOptional() })
      .openapi({ required: ['secretId'] }),
  )
  .openapi('SecretRef')

type SecretRotationType = {
  next?: z.infer<typeof SecretRefSchema>
  previous?: z.infer<typeof SecretRefSchema>
  meta?: z.infer<typeof MetaSchema>
}

export const SecretRotationSchema: z.ZodType<SecretRotationType> = z
  .lazy(() =>
    z.object({
      next: SecretRefSchema.exactOptional(),
      previous: SecretRefSchema.exactOptional(),
      meta: MetaSchema.exactOptional(),
    }),
  )
  .openapi('SecretRotation')

type SecretRefType = { secretId: string; rotation?: z.infer<typeof SecretRotationSchema> }

type ProblemDetailsType = {
  type: string
  title: string
  status: number
  detail?: string
  instance?: string
  traceId?: z.infer<typeof TraceIdSchema>
  causes?: ProblemDetailsType[]
}

export const ProblemDetailsSchema: z.ZodType<ProblemDetailsType> = z
  .lazy(() =>
    z
      .object({
        type: z.url(),
        title: z.string(),
        status: z.int(),
        detail: z.string().exactOptional(),
        instance: z.string().exactOptional(),
        traceId: TraceIdSchema.exactOptional(),
        causes: z.array(ProblemDetailsSchema).exactOptional(),
      })
      .openapi({ required: ['type', 'title', 'status'] }),
  )
  .openapi('ProblemDetails')

type FieldErrorType = {
  path: string
  message: string
  nested?: FieldErrorType
  problem?: z.infer<typeof ProblemDetailsSchema>
}

export const CursorSchema = z
  .string()
  .openapi({ description: 'Pagination cursor (opaque)' })
  .openapi('Cursor')

export const FileSchema = EntitySchema.and(
  z
    .object({
      name: z.string(),
      size: z.int().min(0),
      contentType: z.string().exactOptional(),
      download: LinkSchema.exactOptional(),
      owner: UserSchema.exactOptional(),
    })
    .openapi({ required: ['name', 'size'] }),
).openapi('File')

export const WebhookSubscriptionSchema = EntitySchema.and(
  z
    .object({
      callbackUrl: z.url(),
      events: z.array(EventTypeSchema),
      secret: SecretRefSchema.exactOptional(),
      lastEvent: EventSchema.exactOptional(),
    })
    .openapi({ required: ['callbackUrl', 'events'] }),
).openapi('WebhookSubscription')

export const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({ required: ['subscription', 'event'] })
  .openapi('WebhookEvent')

export const TokenRequestSchema = z
  .object({
    grantType: z.enum(['client_credentials', 'refresh_token']),
    clientId: z.string().exactOptional(),
    clientSecret: z.string().exactOptional(),
    refreshToken: z.string().exactOptional(),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['grantType'] })
  .openapi('TokenRequest')

export const TokenResponseSchema = z
  .object({
    accessToken: z.string(),
    tokenType: z.literal('Bearer'),
    expiresIn: z.int().exactOptional(),
    refreshToken: z.string().exactOptional(),
    scope: z.string().exactOptional(),
    meta: MetaSchema.exactOptional(),
  })
  .openapi({ required: ['accessToken', 'tokenType'] })
  .openapi('TokenResponse')

export const FieldErrorSchema: z.ZodType<FieldErrorType> = z
  .lazy(() =>
    z
      .object({
        path: z.string(),
        message: z.string(),
        nested: FieldErrorSchema.exactOptional(),
        problem: ProblemDetailsSchema.exactOptional(),
      })
      .openapi({ required: ['path', 'message'] }),
  )
  .openapi('FieldError')

export const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z.object({ errors: z.array(FieldErrorSchema) }).openapi({ required: ['errors'] }),
).openapi('ValidationProblemDetails')

export const UserFilterSchema = z
  .object({
    kind: z.literal('user'),
    email: z.email().exactOptional(),
    company: CompanySchema.exactOptional(),
    manager: UserSchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('UserFilter')

export const OrderFilterSchema = z
  .object({
    kind: z.literal('order'),
    status: OrderStatusSchema.exactOptional(),
    buyer: UserSchema.exactOptional(),
    minTotal: MoneySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('OrderFilter')

export const CompanyFilterSchema = z
  .object({
    kind: z.literal('company'),
    name: z.string().exactOptional(),
    parent: CompanySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('CompanyFilter')

export const SearchFilterSchema = z
  .xor([UserFilterSchema, OrderFilterSchema, CompanyFilterSchema])
  .openapi({
    description: 'Query filter represented as JSON in a query param (evil)',
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

export const TraceIdHeaderParamParamsSchema = TraceIdSchema.exactOptional().openapi({
  param: {
    name: 'x-trace-id',
    in: 'header',
    required: false,
    description: 'Correlation id (parameter) - schema refs TraceId',
    schema: { $ref: '#/components/schemas/TraceId' },
    example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
})

export const UserIdUuidExample = {
  summary: 'userId uuid',
  value: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
}

export const UserIdUlidExample = { summary: 'userId ulid', value: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' }

export const UserIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'userId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
    examples: { uuid: UserIdUuidExample, ulid: UserIdUlidExample },
  },
})

export const CompanyIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'companyId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export const OrderIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'orderId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export const FileIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'fileId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export const LimitQueryParamParamsSchema = z
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
  })

export const CursorQueryParamParamsSchema = CursorSchema.exactOptional().openapi({
  param: {
    name: 'cursor',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Cursor' },
  },
})

export const BuyerIdQueryParamParamsSchema = IdSchema.exactOptional().openapi({
  param: {
    name: 'buyerId',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Id' },
  },
})

export const IncludeQueryParamParamsSchema = z
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
  })

export const UserFilterExample = {
  value: {
    kind: 'user',
    email: 'taro@inferno.example',
    manager: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
  },
}

export const OrderFilterExample = {
  value: {
    kind: 'order',
    status: 'paid',
    buyer: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
    minTotal: { currency: 'JPY', amount: 1000 },
  },
}

export const SearchFilterQueryParamParamsSchema = SearchFilterSchema.exactOptional().openapi({
  param: {
    name: 'filter',
    in: 'query',
    required: false,
    description:
      'JSON-encoded filter object in query param (content-based parameter).\n参照地獄: content -> schema -> unions -> full objects -> recursion\n',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SearchFilter' },
        examples: { userFilter: UserFilterExample, orderFilter: OrderFilterExample },
      },
    },
  },
})

export const OAuth2SecurityScheme = {
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

export const ApiKeyAuthSecurityScheme = { type: 'apiKey', name: 'x-api-key', in: 'header' }

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

export const TokenRequestClientCredentialsExample = {
  value: {
    grantType: 'client_credentials',
    clientId: 'client_123',
    clientSecret: 'secret_abc',
    trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
  },
}

export const TokenRequestRefreshExample = {
  value: {
    grantType: 'refresh_token',
    refreshToken: 'refresh_xxx',
    trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
  },
}

export const TokenRequestRequestBody = {
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

export const UserFullExample = {
  value: {
    id: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
    },
    name: 'Inferno Taro',
    email: 'taro@inferno.example',
    company: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Inferno Inc.',
    },
    manager: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
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

export const UserMinimalExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Minimal User',
    email: 'min@example.com',
  },
}

export const CreateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: UserSchema,
      examples: { full: UserFullExample, minimal: UserMinimalExample },
    },
  },
  required: true,
}

export const UserPrefsExample = {
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

export const UpdateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: z.union([
        UserSchema,
        UserPreferencesSchema,
        z.object({ patch: ProblemDetailsSchema.exactOptional() }),
      ]),
      examples: { prefs: UserPrefsExample },
    },
  },
  required: true,
}

export const OrderExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    buyer: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
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
        entity: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Minimal User',
          email: 'min@example.com',
        },
        event: { type: 'order.created', payload: { orderId: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' } },
        meta: { createdAt: '2026-01-04T00:00:00Z' },
      },
    ],
  },
}

export const CreateOrderRequestRequestBody = {
  content: { 'application/json': { schema: OrderSchema, examples: { sample: OrderExample } } },
  required: true,
}

export const SubscriptionExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    callbackUrl: 'https://client.example/webhook',
    events: ['order.created', 'user.updated'],
    secret: { secretId: 'sec_123', rotation: { next: { secretId: 'sec_456' } } },
  },
}

export const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExample },
    },
  },
  required: true,
}

export const WebhookEventExample = {
  value: {
    subscription: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      callbackUrl: 'https://client.example/webhook',
      events: ['order.created', 'user.updated'],
      secret: { secretId: 'sec_123', rotation: { next: { secretId: 'sec_456' } } },
    },
    event: { type: 'order.created', payload: { orderId: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' } },
  },
}

export const WebhookEventRequestRequestBody = {
  content: {
    'application/json': { schema: WebhookEventSchema, examples: { event: WebhookEventExample } },
  },
  required: true,
}

export const TraceIdHeaderHeaderSchema = TraceIdSchema.exactOptional().openapi({
  description: 'Trace id header component (same concept as parameter)',
  example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
})

export const ProblemGenericExample = {
  value: {
    type: 'https://errors.inferno.example/problem/generic',
    title: 'Something went wrong',
    status: 500,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    causes: [
      { type: 'https://errors.inferno.example/problem/inner', title: 'Inner failure', status: 500 },
    ],
  },
}

export const DefaultErrorResponse = {
  description: 'Default error wrapper -> points to ProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { generic: ProblemGenericExample },
    },
  },
}

export const ProblemValidationExample = {
  value: {
    type: 'https://errors.inferno.example/problem/validation',
    title: 'Validation error',
    status: 400,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    errors: [
      {
        path: 'email',
        message: 'Invalid email',
        nested: { path: 'email.domain', message: 'Domain is not allowed' },
      },
    ],
  },
}

export const ValidationErrorResponse = {
  description: 'Validation error -> points to ValidationProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ValidationProblemDetailsSchema,
      examples: { invalid: ProblemValidationExample },
    },
  },
}

export const WwwAuthenticateHeaderHeaderSchema = z.string().exactOptional().openapi({
  description: 'WWW-Authenticate for Bearer',
  example: 'Bearer realm="inferno", error="invalid_token"',
})

export const ProblemUnauthorizedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/unauthorized',
    title: 'Unauthorized',
    status: 401,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
}

export const UnauthorizedResponse = {
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

export const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/problem+json': { schema: ProblemDetailsSchema } },
}

export const ProblemNotFoundExample = {
  value: {
    type: 'https://errors.inferno.example/problem/notfound',
    title: 'Not found',
    status: 404,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
}

export const NotFoundResponse = {
  description: 'Not Found',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { notFound: ProblemNotFoundExample },
    },
  },
}

export const RateLimitLimitHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit total', example: 1000 })

export const RateLimitRemainingHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit remaining', example: 998 })

export const RateLimitResetHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit reset epoch seconds', example: 1735689600 })

export const ProblemRateLimitedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/ratelimited',
    title: 'Too many requests',
    status: 429,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
}

export const RateLimitedResponse = {
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

export const TokenResponseExample = {
  value: {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    tokenType: 'Bearer',
    expiresIn: 3600,
    scope: 'inferno.read',
    meta: {
      createdAt: '2026-01-04T00:00:00Z',
      trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
    },
  },
}

export const ListUsersLink = {
  operationId: 'listUsers',
  description: 'Jump to users list after token',
}

export const TokenResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: TokenResponseSchema, examples: { token: TokenResponseExample } },
  },
  links: { me: ListUsersLink },
}

export const GetUserLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/id' },
  description: 'Follow to get the same user',
}

export const GetCompanyFromUserLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/company/id' },
  description: "Resolve user's company",
}

export const ListOrdersForUserLink = {
  operationId: 'listOrders',
  parameters: { buyerId: '$response.body#/id' },
  description: 'List orders by user id',
}

export const UserResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: { self: GetUserLink, company: GetCompanyFromUserLink, orders: ListOrdersForUserLink },
}

export const UserListExample = {
  value: {
    items: [
      {
        id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
        meta: { createdAt: '2026-01-04T00:00:00Z' },
        name: 'Minimal User',
        email: 'min@example.com',
      },
    ],
    nextCursor: 'cursor_opaque_123',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
  },
}

export const ListUsersNextPageLink = {
  operationId: 'listUsers',
  parameters: { cursor: '$response.body#/nextCursor' },
}

export const UserListResponse = {
  description: 'Users list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z.array(UserSchema),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({ required: ['items'] }),
      examples: { list: UserListExample },
    },
  },
  links: { next: ListUsersNextPageLink },
}

export const CompanyExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Inferno Inc.',
    employees: [
      {
        id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
        meta: { createdAt: '2026-01-04T00:00:00Z' },
        name: 'Minimal User',
        email: 'min@example.com',
      },
    ],
  },
}

export const GetCompanyLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/id' },
}

export const CompanyResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: CompanySchema, examples: { company: CompanyExample } } },
  links: { self: GetCompanyLink },
}

export const GetOrderLink = {
  operationId: 'getOrderById',
  parameters: { orderId: '$response.body#/id' },
}

export const GetUserFromOrderLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/buyer/id' },
  description: 'Resolve order buyer',
}

export const OrderResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: OrderSchema, examples: { order: OrderExample } } },
  links: { self: GetOrderLink, buyer: GetUserFromOrderLink },
}

export const OrderListExample = {
  value: {
    items: [
      {
        id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
        meta: { createdAt: '2026-01-04T00:00:00Z' },
        buyer: {
          id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
          meta: { createdAt: '2026-01-04T00:00:00Z' },
          name: 'Minimal User',
          email: 'min@example.com',
        },
        status: 'paid',
      },
    ],
    nextCursor: 'cursor_opaque_orders_123',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
  },
}

export const ListOrdersNextPageLink = {
  operationId: 'listOrders',
  parameters: { cursor: '$response.body#/nextCursor' },
}

export const OrderListResponse = {
  description: 'Orders list (paged)',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: z
        .object({
          items: z.array(OrderSchema),
          nextCursor: CursorSchema.exactOptional(),
          meta: MetaSchema.exactOptional(),
        })
        .openapi({ required: ['items'] }),
      examples: { list: OrderListExample },
    },
  },
  links: { next: ListOrdersNextPageLink },
}

export const FileExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'inferno.png',
    size: 123456,
    contentType: 'image/png',
    download: { href: '/files/01J1K9N3E6R6ZK7Z6B0Q9Q3H3J/download' },
    owner: {
      id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
      meta: { createdAt: '2026-01-04T00:00:00Z' },
      name: 'Minimal User',
      email: 'min@example.com',
    },
  },
}

export const GetUserFromFileLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/owner/id' },
  description: 'Resolve file owner',
}

export const FileResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExample } } },
  links: { owner: GetUserFromFileLink },
}

export const SubscriptionResponse = {
  description: 'A webhook subscription',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { subscription: SubscriptionExample },
    },
  },
}

export const TraceIdExample = {
  summary: 'TraceId example',
  value: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
}

export const UserFullAliasExample = UserFullExample

export const DefaultUserExample = UserMinimalExample

export const ChainedUserExample = UserMinimalExample

export const SubscriptionLifecycleCallback = {
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
              schema: z.object({
                ok: z.boolean().exactOptional(),
                next: LinkSchema.exactOptional(),
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

export const OrderCreatedCallback = {
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
              schema: z.object({
                ok: z.boolean().exactOptional(),
                echo: WebhookEventSchema.exactOptional(),
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
