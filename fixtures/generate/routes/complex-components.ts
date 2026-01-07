import { createRoute, z } from '@hono/zod-openapi'

const UuidSchema = z
  .uuid()
  .openapi({ examples: ['f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01'] })
  .openapi('Uuid')

const UlidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
  .openapi({ examples: ['01J1K9N3E6R6ZK7Z6B0Q9Q3H3J'] })
  .openapi('Ulid')

type IdType = z.infer<typeof UuidSchema> | z.infer<typeof UlidSchema>

type LocaleType = string

const TraceIdSchema = z
  .string()
  .min(8)
  .max(128)
  .openapi({ description: 'Correlation id for tracing; also appears as header/parameter/example' })
  .openapi('TraceId')

type TraceContextType = {
  traceId: z.infer<typeof TraceIdSchema>
  parent?: TraceContextType
  baggage?: Record<string, string>
}

type LinkType = { href: string; rel?: string; meta?: MetaType; next?: LinkType }

interface ResourceLinksType {
  [key: string]: LinkType
}

type MetaType = {
  createdAt: string
  updatedAt?: string
  trace?: TraceContextType
  links?: ResourceLinksType
}

type EntityType = { id: IdType; meta: MetaType }

type GraphEdgeType = { to: GraphNodeType; weight?: number; meta?: MetaType }

type PersonType = EntityType & {
  displayName: string
  employer?: CompanyType
  homeAddress?: AddressType
  friends?: PersonType[]
}

type AddressType = {
  line1: string
  line2?: string
  city: string
  country?: string
  geo?: GeoPointType
  resident?: UserType | PersonType
}

type CompanyType = EntityType & {
  name: string
  headquarters?: AddressType
  parent?: CompanyType
  subsidiaries?: CompanyType[]
  employees?: UserType[]
  primaryContact?: PersonType
}

type UserPreferencesType = {
  locale?: LocaleType
  marketingOptIn?: boolean
  theme?: 'light' | 'dark' | 'system'
  shadowProfile?: UserType
}

type OrderStatusType = 'pending' | 'paid' | 'shipped' | 'cancelled'

const CurrencySchema = z.enum(['JPY', 'USD', 'EUR']).openapi('Currency')

type MoneyType = {
  currency: z.infer<typeof CurrencySchema>
  amount: number
  trace?: TraceContextType
}

type ProductType = EntityType & {
  name: string
  supplier?: CompanyType
  relatedProducts?: ProductType[]
  price?: MoneyType
}

type OrderItemType = { product: ProductType; quantity: number; unitPrice?: MoneyType }

type EventTypeType =
  | 'user.created'
  | 'user.updated'
  | 'order.created'
  | 'order.shipped'
  | 'system.alert'

type UserEventPayloadType = { user: UserType; previous?: UserType }

type OrderEventPayloadType = { order: OrderType; previousStatus?: OrderStatusType }

type SystemEventPayloadType = { message: string; related?: EntityRefType }

type EventType = {
  type: EventTypeType
  payload: UserEventPayloadType | OrderEventPayloadType | SystemEventPayloadType
  causedBy?: EventType[]
  trace?: TraceContextType
}

type AuditLogType = { entity: EntityRefType; event: EventType; meta?: MetaType }

type OrderType = EntityType & {
  buyer: UserType
  status: OrderStatusType
  items: OrderItemType[]
  shippingAddress?: AddressType
  billingAddress?: AddressType
  auditTrail?: AuditLogType[]
  links?: ResourceLinksType
}

type UserType = EntityType & {
  name: string
  email: string
  company?: CompanyType
  manager?: UserType
  reports?: UserType[]
  addresses?: AddressType[]
  preferences?: UserPreferencesType
  recentOrders?: OrderType[]
  links?: ResourceLinksType
}

type EntityRefType = UserType | CompanyType | OrderType | ProductType | PersonType

type GraphNodeType = { id: IdType; edges?: GraphEdgeType[]; entity?: EntityRefType }

type GeoGraphType = { nodes: GraphNodeType[] }

type GeoPointType = { lat: number; lng: number; graph?: GeoGraphType }

type SecretRefType = { secretId: string; rotation?: SecretRotationType }

type SecretRotationType = { next?: SecretRefType; previous?: SecretRefType; meta?: MetaType }

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

const IdSchema: z.ZodType<IdType> = z
  .xor([UuidSchema, UlidSchema])
  .openapi({ description: 'Primary identifier (uuid or ulid) - used everywhere' })
  .openapi('Id')

const CursorSchema = z
  .string()
  .openapi({ description: 'Pagination cursor (opaque)' })
  .openapi('Cursor')

const LocaleSchema: z.ZodType<LocaleType> = z
  .string()
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
  .openapi({ examples: ['ja-JP', 'en-US'] })
  .openapi('Locale')

const MetaSchema: z.ZodType<MetaType> = z
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

const EntitySchema: z.ZodType<EntityType> = z
  .object({ id: IdSchema, meta: MetaSchema })
  .openapi({ required: ['id', 'meta'] })
  .openapi('Entity')

const TraceContextSchema: z.ZodType<TraceContextType> = z
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

const ResourceLinksSchema: z.ZodType<ResourceLinksType> = z
  .lazy(() => z.record(z.string(), LinkSchema))
  .openapi('ResourceLinks')

const LinkSchema: z.ZodType<LinkType> = z
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

const GeoPointSchema: z.ZodType<GeoPointType> = z
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

const GeoGraphSchema: z.ZodType<GeoGraphType> = z
  .lazy(() => z.object({ nodes: z.array(GraphNodeSchema) }).openapi({ required: ['nodes'] }))
  .openapi('GeoGraph')

const GraphNodeSchema: z.ZodType<GraphNodeType> = z
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

const GraphEdgeSchema: z.ZodType<GraphEdgeType> = z
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

const MoneySchema: z.ZodType<MoneyType> = z
  .object({
    currency: CurrencySchema,
    amount: z.number().multipleOf(0.01),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['currency', 'amount'] })
  .openapi('Money')

const ProductSchema: z.ZodType<ProductType> = z
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

const OrderItemSchema: z.ZodType<OrderItemType> = z
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

const OrderStatusSchema: z.ZodType<OrderStatusType> = z
  .enum(['pending', 'paid', 'shipped', 'cancelled'])
  .openapi('OrderStatus')

const OrderSchema: z.ZodType<OrderType> = z
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

const AddressSchema: z.ZodType<AddressType> = z
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

const PersonSchema: z.ZodType<PersonType> = z
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

const CompanySchema: z.ZodType<CompanyType> = z
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

const UserPreferencesSchema: z.ZodType<UserPreferencesType> = z
  .lazy(() =>
    z.object({
      locale: LocaleSchema.exactOptional(),
      marketingOptIn: z.boolean().exactOptional(),
      theme: z.enum(['light', 'dark', 'system']).exactOptional(),
      shadowProfile: UserSchema.exactOptional(),
    }),
  )
  .openapi('UserPreferences')

const UserSchema: z.ZodType<UserType> = z
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

const EntityRefSchema: z.ZodType<EntityRefType> = z
  .lazy(() =>
    z
      .xor([UserSchema, CompanySchema, OrderSchema, ProductSchema, PersonSchema])
      .openapi({ description: 'A union that can point back to everything (more hell)' }),
  )
  .openapi('EntityRef')

const EventTypeSchema: z.ZodType<EventTypeType> = z
  .enum(['user.created', 'user.updated', 'order.created', 'order.shipped', 'system.alert'])
  .openapi('EventType')

const EventSchema: z.ZodType<EventType> = z
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

const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({ required: ['user'] }),
  )
  .openapi('UserEventPayload')

const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({ required: ['order'] }),
  )
  .openapi('OrderEventPayload')

const SystemEventPayloadSchema: z.ZodType<SystemEventPayloadType> = z
  .lazy(() =>
    z
      .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
      .openapi({ required: ['message'] }),
  )
  .openapi('SystemEventPayload')

const AuditLogSchema: z.ZodType<AuditLogType> = z
  .lazy(() =>
    z
      .object({ entity: EntityRefSchema, event: EventSchema, meta: MetaSchema.exactOptional() })
      .openapi({ required: ['entity', 'event'] }),
  )
  .openapi('AuditLog')

const FileSchema = EntitySchema.and(
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

const SecretRotationSchema: z.ZodType<SecretRotationType> = z
  .lazy(() =>
    z.object({
      next: SecretRefSchema.exactOptional(),
      previous: SecretRefSchema.exactOptional(),
      meta: MetaSchema.exactOptional(),
    }),
  )
  .openapi('SecretRotation')

const SecretRefSchema: z.ZodType<SecretRefType> = z
  .lazy(() =>
    z
      .object({ secretId: z.string(), rotation: SecretRotationSchema.exactOptional() })
      .openapi({ required: ['secretId'] }),
  )
  .openapi('SecretRef')

const WebhookSubscriptionSchema = EntitySchema.and(
  z
    .object({
      callbackUrl: z.url(),
      events: z.array(EventTypeSchema),
      secret: SecretRefSchema.exactOptional(),
      lastEvent: EventSchema.exactOptional(),
    })
    .openapi({ required: ['callbackUrl', 'events'] }),
).openapi('WebhookSubscription')

const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({ required: ['subscription', 'event'] })
  .openapi('WebhookEvent')

const TokenRequestSchema = z
  .object({
    grantType: z.enum(['client_credentials', 'refresh_token']),
    clientId: z.string().exactOptional(),
    clientSecret: z.string().exactOptional(),
    refreshToken: z.string().exactOptional(),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['grantType'] })
  .openapi('TokenRequest')

const TokenResponseSchema = z
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

const FieldErrorSchema: z.ZodType<FieldErrorType> = z
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

const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z.object({ errors: z.array(FieldErrorSchema) }).openapi({ required: ['errors'] }),
).openapi('ValidationProblemDetails')

const UserFilterSchema = z
  .object({
    kind: z.literal('user'),
    email: z.email().exactOptional(),
    company: CompanySchema.exactOptional(),
    manager: UserSchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('UserFilter')

const OrderFilterSchema = z
  .object({
    kind: z.literal('order'),
    status: OrderStatusSchema.exactOptional(),
    buyer: UserSchema.exactOptional(),
    minTotal: MoneySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('OrderFilter')

const CompanyFilterSchema = z
  .object({
    kind: z.literal('company'),
    name: z.string().exactOptional(),
    parent: CompanySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .openapi('CompanyFilter')

const SearchFilterSchema = z
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
  .openapi({ description: 'Rate limit total', example: 1000 })

const RateLimitRemainingHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit remaining', example: 998 })

const RateLimitResetHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit reset epoch seconds', example: 1735689600 })

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
