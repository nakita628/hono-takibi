import { z } from '@hono/zod-openapi'

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

export type EventType = z.infer<typeof EventTypeSchema>

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

export type Id = z.infer<typeof IdSchema>

export type Uuid = z.infer<typeof UuidSchema>

export type Ulid = z.infer<typeof UlidSchema>

export type TraceId = z.infer<typeof TraceIdSchema>

export const CursorSchema = z
  .string()
  .openapi({ description: 'Pagination cursor (opaque)' })
  .openapi('Cursor')

export type Cursor = z.infer<typeof CursorSchema>

export type Locale = z.infer<typeof LocaleSchema>

export type Entity = z.infer<typeof EntitySchema>

export type Meta = z.infer<typeof MetaSchema>

export type TraceContext = z.infer<typeof TraceContextSchema>

export type ResourceLinks = z.infer<typeof ResourceLinksSchema>

export type Link = z.infer<typeof LinkSchema>

export type GeoPoint = z.infer<typeof GeoPointSchema>

export type GeoGraph = z.infer<typeof GeoGraphSchema>

export type GraphNode = z.infer<typeof GraphNodeSchema>

export type GraphEdge = z.infer<typeof GraphEdgeSchema>

export type Currency = z.infer<typeof CurrencySchema>

export type Money = z.infer<typeof MoneySchema>

export type Product = z.infer<typeof ProductSchema>

export type OrderItem = z.infer<typeof OrderItemSchema>

export type OrderStatus = z.infer<typeof OrderStatusSchema>

export type Order = z.infer<typeof OrderSchema>

export type Address = z.infer<typeof AddressSchema>

export type Person = z.infer<typeof PersonSchema>

export type Company = z.infer<typeof CompanySchema>

export type UserPreferences = z.infer<typeof UserPreferencesSchema>

export type User = z.infer<typeof UserSchema>

export type EntityRef = z.infer<typeof EntityRefSchema>

export type Event = z.infer<typeof EventSchema>

export const UserEventPayloadSchema: z.ZodType<UserEventPayloadType> = z
  .lazy(() =>
    z
      .object({ user: UserSchema, previous: UserSchema.exactOptional() })
      .openapi({ required: ['user'] }),
  )
  .openapi('UserEventPayload')

export type UserEventPayload = z.infer<typeof UserEventPayloadSchema>

export const OrderEventPayloadSchema: z.ZodType<OrderEventPayloadType> = z
  .lazy(() =>
    z
      .object({ order: OrderSchema, previousStatus: OrderStatusSchema.exactOptional() })
      .openapi({ required: ['order'] }),
  )
  .openapi('OrderEventPayload')

export type OrderEventPayload = z.infer<typeof OrderEventPayloadSchema>

export const SystemEventPayloadSchema: z.ZodType<SystemEventPayloadType> = z
  .lazy(() =>
    z
      .object({ message: z.string(), related: EntityRefSchema.exactOptional() })
      .openapi({ required: ['message'] }),
  )
  .openapi('SystemEventPayload')

export type SystemEventPayload = z.infer<typeof SystemEventPayloadSchema>

export type AuditLog = z.infer<typeof AuditLogSchema>

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

export type File = z.infer<typeof FileSchema>

export type SecretRotation = z.infer<typeof SecretRotationSchema>

export type SecretRef = z.infer<typeof SecretRefSchema>

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

export type WebhookSubscription = z.infer<typeof WebhookSubscriptionSchema>

export const WebhookEventSchema = z
  .object({ subscription: WebhookSubscriptionSchema, event: EventSchema })
  .openapi({ required: ['subscription', 'event'] })
  .openapi('WebhookEvent')

export type WebhookEvent = z.infer<typeof WebhookEventSchema>

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

export type TokenRequest = z.infer<typeof TokenRequestSchema>

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

export type TokenResponse = z.infer<typeof TokenResponseSchema>

export type ProblemDetails = z.infer<typeof ProblemDetailsSchema>

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

export type FieldError = z.infer<typeof FieldErrorSchema>

export const ValidationProblemDetailsSchema = ProblemDetailsSchema.and(
  z.object({ errors: z.array(FieldErrorSchema) }).openapi({ required: ['errors'] }),
).openapi('ValidationProblemDetails')

export type ValidationProblemDetails = z.infer<typeof ValidationProblemDetailsSchema>

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

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type UserFilter = z.infer<typeof UserFilterSchema>

export type OrderFilter = z.infer<typeof OrderFilterSchema>

export type CompanyFilter = z.infer<typeof CompanyFilterSchema>
