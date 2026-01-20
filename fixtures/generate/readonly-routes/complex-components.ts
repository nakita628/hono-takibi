import { createRoute, z } from '@hono/zod-openapi'

const UuidSchema = z
  .uuid()
  .openapi({ examples: ['f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01'] })
  .readonly()
  .openapi('Uuid')

const UlidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
  .openapi({ examples: ['01J1K9N3E6R6ZK7Z6B0Q9Q3H3J'] })
  .readonly()
  .openapi('Ulid')

type IdType = z.infer<typeof UuidSchema> | z.infer<typeof UlidSchema>

type LocaleType = string

const IdSchema: z.ZodType<IdType> = z
  .xor([UuidSchema, UlidSchema])
  .openapi({ description: 'Primary identifier (uuid or ulid) - used everywhere' })
  .readonly()
  .openapi('Id')

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
  .readonly()
  .openapi('Meta')

type EntityType = {
  readonly id: z.infer<typeof IdSchema>
  readonly meta: z.infer<typeof MetaSchema>
}

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
  .readonly()
  .openapi('TraceContext')

const ResourceLinksSchema: z.ZodType<ResourceLinksType> = z
  .lazy(() => z.record(z.string(), LinkSchema))
  .readonly()
  .openapi('ResourceLinks')

type MetaType = {
  readonly createdAt: string
  readonly updatedAt?: string
  readonly trace?: z.infer<typeof TraceContextSchema>
  readonly links?: z.infer<typeof ResourceLinksSchema>
}

const TraceIdSchema = z
  .string()
  .min(8)
  .max(128)
  .openapi({ description: 'Correlation id for tracing; also appears as header/parameter/example' })
  .readonly()
  .openapi('TraceId')

type TraceContextType = {
  readonly traceId: z.infer<typeof TraceIdSchema>
  readonly parent?: TraceContextType
  readonly baggage?: { readonly [key: string]: string }
}

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
  .readonly()
  .openapi('Link')

type ResourceLinksType = { [key: string]: z.infer<typeof LinkSchema> }

type LinkType = {
  readonly href: string
  readonly rel?: string
  readonly meta?: z.infer<typeof MetaSchema>
  readonly next?: LinkType
}

const GeoGraphSchema: z.ZodType<GeoGraphType> = z
  .lazy(() => z.object({ nodes: z.array(GraphNodeSchema) }).openapi({ required: ['nodes'] }))
  .readonly()
  .openapi('GeoGraph')

type GeoPointType = {
  readonly lat: number
  readonly lng: number
  readonly graph?: z.infer<typeof GeoGraphSchema>
}

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
  .readonly()
  .openapi('GraphNode')

type GeoGraphType = { readonly nodes: readonly z.infer<typeof GraphNodeSchema>[] }

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
  .readonly()
  .openapi('GraphEdge')

const EntityRefSchema: z.ZodType<EntityRefType> = z
  .lazy(() =>
    z
      .xor([UserSchema, CompanySchema, OrderSchema, ProductSchema, PersonSchema])
      .openapi({ description: 'A union that can point back to everything (more hell)' }),
  )
  .readonly()
  .openapi('EntityRef')

type GraphNodeType = {
  readonly id: z.infer<typeof IdSchema>
  readonly edges?: readonly z.infer<typeof GraphEdgeSchema>[]
  readonly entity?: z.infer<typeof EntityRefSchema>
}

type GraphEdgeType = {
  readonly to: z.infer<typeof GraphNodeSchema>
  readonly weight?: number
  readonly meta?: z.infer<typeof MetaSchema>
}

const CurrencySchema = z.enum(['JPY', 'USD', 'EUR']).readonly().openapi('Currency')

type MoneyType = {
  readonly currency: z.infer<typeof CurrencySchema>
  readonly amount: number
  readonly trace?: z.infer<typeof TraceContextSchema>
}

const EntitySchema: z.ZodType<EntityType> = z
  .object({ id: IdSchema, meta: MetaSchema })
  .openapi({ required: ['id', 'meta'] })
  .readonly()
  .openapi('Entity')

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
  .readonly()
  .openapi('Company')

const MoneySchema: z.ZodType<MoneyType> = z
  .object({
    currency: CurrencySchema,
    amount: z.number().multipleOf(0.01),
    trace: TraceContextSchema.exactOptional(),
  })
  .openapi({ required: ['currency', 'amount'] })
  .readonly()
  .openapi('Money')

type ProductType = z.infer<typeof EntitySchema> & {
  readonly name: string
  readonly supplier?: z.infer<typeof CompanySchema>
  readonly relatedProducts?: readonly ProductType[]
  readonly price?: z.infer<typeof MoneySchema>
}

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
  .readonly()
  .openapi('Product')

type OrderItemType = {
  readonly product: z.infer<typeof ProductSchema>
  readonly quantity: number
  readonly unitPrice?: z.infer<typeof MoneySchema>
}

type OrderStatusType = 'pending' | 'paid' | 'shipped' | 'cancelled'

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
  .readonly()
  .openapi('User')

const OrderStatusSchema: z.ZodType<OrderStatusType> = z
  .enum(['pending', 'paid', 'shipped', 'cancelled'])
  .readonly()
  .openapi('OrderStatus')

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
  .readonly()
  .openapi('OrderItem')

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
  .readonly()
  .openapi('Address')

const AuditLogSchema: z.ZodType<AuditLogType> = z
  .lazy(() =>
    z
      .object({ entity: EntityRefSchema, event: EventSchema, meta: MetaSchema.exactOptional() })
      .openapi({ required: ['entity', 'event'] }),
  )
  .readonly()
  .openapi('AuditLog')

type OrderType = z.infer<typeof EntitySchema> & {
  readonly buyer: z.infer<typeof UserSchema>
  readonly status: z.infer<typeof OrderStatusSchema>
  readonly items: readonly z.infer<typeof OrderItemSchema>[]
  readonly shippingAddress?: z.infer<typeof AddressSchema>
  readonly billingAddress?: z.infer<typeof AddressSchema>
  readonly auditTrail?: readonly z.infer<typeof AuditLogSchema>[]
  readonly links?: z.infer<typeof ResourceLinksSchema>
}

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
  .readonly()
  .openapi('GeoPoint')

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
  .readonly()
  .openapi('Person')

type AddressType = {
  readonly line1: string
  readonly line2?: string
  readonly city: string
  readonly country?: string
  readonly geo?: z.infer<typeof GeoPointSchema>
  readonly resident?: z.infer<typeof UserSchema> | z.infer<typeof PersonSchema>
}

type PersonType = z.infer<typeof EntitySchema> & {
  readonly displayName: string
  readonly employer?: z.infer<typeof CompanySchema>
  readonly homeAddress?: z.infer<typeof AddressSchema>
  readonly friends?: readonly PersonType[]
}

type CompanyType = z.infer<typeof EntitySchema> & {
  readonly name: string
  readonly headquarters?: z.infer<typeof AddressSchema>
  readonly parent?: CompanyType
  readonly subsidiaries?: readonly CompanyType[]
  readonly employees?: readonly z.infer<typeof UserSchema>[]
  readonly primaryContact?: z.infer<typeof PersonSchema>
}

const LocaleSchema: z.ZodType<LocaleType> = z
  .string()
  .regex(/^[a-z]{2}(-[A-Z]{2})?$/)
  .openapi({ examples: ['ja-JP', 'en-US'] })
  .readonly()
  .openapi('Locale')

type UserPreferencesType = {
  readonly locale?: z.infer<typeof LocaleSchema>
  readonly marketingOptIn?: boolean
  readonly theme?: 'light' | 'dark' | 'system'
  readonly shadowProfile?: z.infer<typeof UserSchema>
}

const UserPreferencesSchema: z.ZodType<UserPreferencesType> = z
  .lazy(() =>
    z.object({
      locale: LocaleSchema.exactOptional(),
      marketingOptIn: z.boolean().exactOptional(),
      theme: z.enum(['light', 'dark', 'system']).exactOptional(),
      shadowProfile: UserSchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('UserPreferences')

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
  .readonly()
  .openapi('Order')

type UserType = z.infer<typeof EntitySchema> & {
  readonly name: string
  readonly email: string
  readonly company?: z.infer<typeof CompanySchema>
  readonly manager?: UserType
  readonly reports?: readonly UserType[]
  readonly addresses?: readonly z.infer<typeof AddressSchema>[]
  readonly preferences?: z.infer<typeof UserPreferencesSchema>
  readonly recentOrders?: readonly z.infer<typeof OrderSchema>[]
  readonly links?: z.infer<typeof ResourceLinksSchema>
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

const EventTypeSchema: z.ZodType<EventTypeType> = z
  .enum(['user.created', 'user.updated', 'order.created', 'order.shipped', 'system.alert'])
  .readonly()
  .openapi('EventType')

const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({ required: ['user'] }),
  )
  .readonly()
  .openapi('UserEventPayload')

const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({ required: ['order'] }),
  )
  .readonly()
  .openapi('OrderEventPayload')

const SystemEventPayloadSchema: z.ZodType<SystemEventPayloadType> = z
  .lazy(() =>
    z
      .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
      .openapi({ required: ['message'] }),
  )
  .readonly()
  .openapi('SystemEventPayload')

type EventType = {
  readonly type: z.infer<typeof EventTypeSchema>
  readonly payload:
    | z.infer<typeof UserEventPayloadSchema>
    | z.infer<typeof OrderEventPayloadSchema>
    | z.infer<typeof SystemEventPayloadSchema>
  readonly causedBy?: readonly EventType[]
  readonly trace?: z.infer<typeof TraceContextSchema>
}

type UserEventPayloadType = {
  readonly user: z.infer<typeof UserSchema>
  readonly previous?: z.infer<typeof UserSchema>
}

type OrderEventPayloadType = {
  readonly order: z.infer<typeof OrderSchema>
  readonly previousStatus?: z.infer<typeof OrderStatusSchema>
}

type SystemEventPayloadType = {
  readonly message: string
  readonly related?: z.infer<typeof EntityRefSchema>
}

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
  .readonly()
  .openapi('Event')

type AuditLogType = {
  readonly entity: z.infer<typeof EntityRefSchema>
  readonly event: z.infer<typeof EventSchema>
  readonly meta?: z.infer<typeof MetaSchema>
}

const SecretRefSchema: z.ZodType<SecretRefType> = z
  .lazy(() =>
    z
      .object({ secretId: z.string(), rotation: SecretRotationSchema.exactOptional() })
      .openapi({ required: ['secretId'] }),
  )
  .readonly()
  .openapi('SecretRef')

type SecretRotationType = {
  readonly next?: z.infer<typeof SecretRefSchema>
  readonly previous?: z.infer<typeof SecretRefSchema>
  readonly meta?: z.infer<typeof MetaSchema>
}

const SecretRotationSchema: z.ZodType<SecretRotationType> = z
  .lazy(() =>
    z.object({
      next: SecretRefSchema.exactOptional(),
      previous: SecretRefSchema.exactOptional(),
      meta: MetaSchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('SecretRotation')

type SecretRefType = {
  readonly secretId: string
  readonly rotation?: z.infer<typeof SecretRotationSchema>
}

type ProblemDetailsType = {
  readonly type: string
  readonly title: string
  readonly status: number
  readonly detail?: string
  readonly instance?: string
  readonly traceId?: z.infer<typeof TraceIdSchema>
  readonly causes?: readonly ProblemDetailsType[]
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
  .readonly()
  .openapi('ProblemDetails')

type FieldErrorType = {
  readonly path: string
  readonly message: string
  readonly nested?: FieldErrorType
  readonly problem?: z.infer<typeof ProblemDetailsSchema>
}

const CursorSchema = z
  .string()
  .openapi({ description: 'Pagination cursor (opaque)' })
  .readonly()
  .openapi('Cursor')

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
)
  .readonly()
  .openapi('File')

const WebhookSubscriptionSchema = EntitySchema.and(
  z
    .object({
      callbackUrl: z.url(),
      events: z.array(EventTypeSchema),
      secret: SecretRefSchema.exactOptional(),
      lastEvent: EventSchema.exactOptional(),
    })
    .openapi({ required: ['callbackUrl', 'events'] }),
)
  .readonly()
  .openapi('WebhookSubscription')

const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({ required: ['subscription', 'event'] })
  .readonly()
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
  .readonly()
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
  .readonly()
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
  .readonly()
  .openapi('FieldError')

const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z.object({ errors: z.array(FieldErrorSchema) }).openapi({ required: ['errors'] }),
)
  .readonly()
  .openapi('ValidationProblemDetails')

const UserFilterSchema = z
  .object({
    kind: z.literal('user'),
    email: z.email().exactOptional(),
    company: CompanySchema.exactOptional(),
    manager: UserSchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .readonly()
  .openapi('UserFilter')

const OrderFilterSchema = z
  .object({
    kind: z.literal('order'),
    status: OrderStatusSchema.exactOptional(),
    buyer: UserSchema.exactOptional(),
    minTotal: MoneySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .readonly()
  .openapi('OrderFilter')

const CompanyFilterSchema = z
  .object({
    kind: z.literal('company'),
    name: z.string().exactOptional(),
    parent: CompanySchema.exactOptional(),
  })
  .openapi({ required: ['kind'] })
  .readonly()
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
  .readonly()
  .openapi('SearchFilter')

const TraceIdHeaderParamParamsSchema = TraceIdSchema.exactOptional()
  .openapi({
    param: {
      name: 'x-trace-id',
      in: 'header',
      required: false,
      description: 'Correlation id (parameter) - schema refs TraceId',
      schema: { $ref: '#/components/schemas/TraceId' },
      example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    },
  })
  .readonly()

const UserIdUuidExample = {
  summary: 'userId uuid',
  value: 'f3b1b6d8-4c8c-4f1a-9b6f-1c7e6d8b9a01',
} as const

const UserIdUlidExample = { summary: 'userId ulid', value: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' } as const

const UserIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'userId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
    examples: { uuid: UserIdUuidExample, ulid: UserIdUlidExample },
  },
}).readonly()

const CompanyIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'companyId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
}).readonly()

const OrderIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'orderId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
}).readonly()

const FileIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'fileId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
  },
}).readonly()

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
  .readonly()

const CursorQueryParamParamsSchema = CursorSchema.exactOptional()
  .openapi({
    param: {
      name: 'cursor',
      in: 'query',
      required: false,
      schema: { $ref: '#/components/schemas/Cursor' },
    },
  })
  .readonly()

const BuyerIdQueryParamParamsSchema = IdSchema.exactOptional()
  .openapi({
    param: {
      name: 'buyerId',
      in: 'query',
      required: false,
      schema: { $ref: '#/components/schemas/Id' },
    },
  })
  .readonly()

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
  .readonly()

const UserFilterExample = {
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
} as const

const OrderFilterExample = {
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
} as const

const SearchFilterQueryParamParamsSchema = SearchFilterSchema.exactOptional()
  .openapi({
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
  .readonly()

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
} as const

const ApiKeyAuthSecurityScheme = { type: 'apiKey', name: 'x-api-key', in: 'header' } as const

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } as const

const TokenRequestClientCredentialsExample = {
  value: {
    grantType: 'client_credentials',
    clientId: 'client_123',
    clientSecret: 'secret_abc',
    trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
  },
} as const

const TokenRequestRefreshExample = {
  value: {
    grantType: 'refresh_token',
    refreshToken: 'refresh_xxx',
    trace: { traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J' },
  },
} as const

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
} as const

const UserFullExample = {
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
} as const

const UserMinimalExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    name: 'Minimal User',
    email: 'min@example.com',
  },
} as const

const CreateUserRequestRequestBody = {
  content: {
    'application/json': {
      schema: UserSchema,
      examples: { full: UserFullExample, minimal: UserMinimalExample },
    },
  },
  required: true,
} as const

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
} as const

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
} as const

const OrderExample = {
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
} as const

const CreateOrderRequestRequestBody = {
  content: { 'application/json': { schema: OrderSchema, examples: { sample: OrderExample } } },
  required: true,
} as const

const SubscriptionExample = {
  value: {
    id: '01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    meta: { createdAt: '2026-01-04T00:00:00Z' },
    callbackUrl: 'https://client.example/webhook',
    events: ['order.created', 'user.updated'],
    secret: { secretId: 'sec_123', rotation: { next: { secretId: 'sec_456' } } },
  },
} as const

const SubscriptionRequestRequestBody = {
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { create: SubscriptionExample },
    },
  },
  required: true,
} as const

const WebhookEventExample = {
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
} as const

const WebhookEventRequestRequestBody = {
  content: {
    'application/json': { schema: WebhookEventSchema, examples: { event: WebhookEventExample } },
  },
  required: true,
} as const

const TraceIdHeaderHeaderSchema = TraceIdSchema.exactOptional()
  .openapi({
    description: 'Trace id header component (same concept as parameter)',
    example: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  })
  .readonly()

const ProblemGenericExample = {
  value: {
    type: 'https://errors.inferno.example/problem/generic',
    title: 'Something went wrong',
    status: 500,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
    causes: [
      { type: 'https://errors.inferno.example/problem/inner', title: 'Inner failure', status: 500 },
    ],
  },
} as const

const DefaultErrorResponse = {
  description: 'Default error wrapper -> points to ProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { generic: ProblemGenericExample },
    },
  },
} as const

const ProblemValidationExample = {
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
} as const

const ValidationErrorResponse = {
  description: 'Validation error -> points to ValidationProblemDetails',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ValidationProblemDetailsSchema,
      examples: { invalid: ProblemValidationExample },
    },
  },
} as const

const WwwAuthenticateHeaderHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({
    description: 'WWW-Authenticate for Bearer',
    example: 'Bearer realm="inferno", error="invalid_token"',
  })
  .readonly()

const ProblemUnauthorizedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/unauthorized',
    title: 'Unauthorized',
    status: 401,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
} as const

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
} as const

const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/problem+json': { schema: ProblemDetailsSchema } },
} as const

const ProblemNotFoundExample = {
  value: {
    type: 'https://errors.inferno.example/problem/notfound',
    title: 'Not found',
    status: 404,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
} as const

const NotFoundResponse = {
  description: 'Not Found',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/problem+json': {
      schema: ProblemDetailsSchema,
      examples: { notFound: ProblemNotFoundExample },
    },
  },
} as const

const RateLimitLimitHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit total', example: 1000 })
  .readonly()

const RateLimitRemainingHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit remaining', example: 998 })
  .readonly()

const RateLimitResetHeaderHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit reset epoch seconds', example: 1735689600 })
  .readonly()

const ProblemRateLimitedExample = {
  value: {
    type: 'https://errors.inferno.example/problem/ratelimited',
    title: 'Too many requests',
    status: 429,
    traceId: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
  },
} as const

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
} as const

const TokenResponseExample = {
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
} as const

const ListUsersLink = {
  operationId: 'listUsers',
  description: 'Jump to users list after token',
} as const

const TokenResponse = {
  description: 'Token issued',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': { schema: TokenResponseSchema, examples: { token: TokenResponseExample } },
  },
  links: { me: ListUsersLink },
} as const

const GetUserLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/id' },
  description: 'Follow to get the same user',
} as const

const GetCompanyFromUserLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/company/id' },
  description: "Resolve user's company",
} as const

const ListOrdersForUserLink = {
  operationId: 'listOrders',
  parameters: { buyerId: '$response.body#/id' },
  description: 'List orders by user id',
} as const

const UserResponse = {
  description: 'A user',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: UserSchema, examples: { full: UserFullExample } } },
  links: { self: GetUserLink, company: GetCompanyFromUserLink, orders: ListOrdersForUserLink },
} as const

const UserListExample = {
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
} as const

const ListUsersNextPageLink = {
  operationId: 'listUsers',
  parameters: { cursor: '$response.body#/nextCursor' },
} as const

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
} as const

const CompanyExample = {
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
} as const

const GetCompanyLink = {
  operationId: 'getCompanyById',
  parameters: { companyId: '$response.body#/id' },
} as const

const CompanyResponse = {
  description: 'A company',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: CompanySchema, examples: { company: CompanyExample } } },
  links: { self: GetCompanyLink },
} as const

const GetOrderLink = {
  operationId: 'getOrderById',
  parameters: { orderId: '$response.body#/id' },
} as const

const GetUserFromOrderLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/buyer/id' },
  description: 'Resolve order buyer',
} as const

const OrderResponse = {
  description: 'An order',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: OrderSchema, examples: { order: OrderExample } } },
  links: { self: GetOrderLink, buyer: GetUserFromOrderLink },
} as const

const OrderListExample = {
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
} as const

const ListOrdersNextPageLink = {
  operationId: 'listOrders',
  parameters: { cursor: '$response.body#/nextCursor' },
} as const

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
} as const

const FileExample = {
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
} as const

const GetUserFromFileLink = {
  operationId: 'getUserById',
  parameters: { userId: '$response.body#/owner/id' },
  description: 'Resolve file owner',
} as const

const FileResponse = {
  description: 'A file',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/json': { schema: FileSchema, examples: { file: FileExample } } },
  links: { owner: GetUserFromFileLink },
} as const

const SubscriptionResponse = {
  description: 'A webhook subscription',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: {
    'application/json': {
      schema: WebhookSubscriptionSchema,
      examples: { subscription: SubscriptionExample },
    },
  },
} as const

const TraceIdExample = {
  summary: 'TraceId example',
  value: 'trace-01J1K9N3E6R6ZK7Z6B0Q9Q3H3J',
} as const

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
} as const

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
} as const

export const postAuthTokenRoute = createRoute({
  method: 'post',
  path: '/auth/token',
  tags: ['Auth'],
  summary: 'Issue access token',
  operationId: 'issueToken',
  request: { body: TokenRequestRequestBody },
  responses: { 200: TokenResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  security: [],
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)
