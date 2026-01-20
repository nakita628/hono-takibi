import { createRoute, z } from '@hono/zod-openapi'

const UserProfileSchema = z
  .object({
    firstName: z.string().exactOptional(),
    lastName: z.string().exactOptional(),
    avatar: z.url().exactOptional(),
    bio: z.string().exactOptional(),
    social: z.record(z.string(), z.url()).exactOptional(),
  })
  .readonly()
  .openapi('UserProfile')

const NotificationSettingsSchema = z
  .object({
    email: z.boolean().exactOptional(),
    push: z.boolean().exactOptional(),
    sms: z.boolean().exactOptional(),
    channels: z.record(z.string(), z.boolean()).exactOptional(),
  })
  .readonly()
  .openapi('NotificationSettings')

const PrivacySettingsSchema = z
  .object({
    profileVisibility: z.enum(['public', 'private', 'connections']).exactOptional(),
    showEmail: z.boolean().exactOptional(),
    showActivity: z.boolean().exactOptional(),
  })
  .readonly()
  .openapi('PrivacySettings')

const UserPreferencesSchema = z
  .object({
    language: z.string().exactOptional(),
    timezone: z.string().exactOptional(),
    theme: z.enum(['light', 'dark', 'system']).exactOptional(),
    dateFormat: z.string().exactOptional(),
  })
  .readonly()
  .openapi('UserPreferences')

const UserSettingsSchema = z
  .object({
    notifications: NotificationSettingsSchema.exactOptional(),
    privacy: PrivacySettingsSchema.exactOptional(),
    preferences: UserPreferencesSchema.exactOptional(),
  })
  .readonly()
  .openapi('UserSettings')

const EntityMetadataSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
    version: z.int().exactOptional(),
  })
  .readonly()
  .openapi('EntityMetadata')

const UserSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    profile: UserProfileSchema.exactOptional(),
    settings: UserSettingsSchema.exactOptional(),
    metadata: EntityMetadataSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'email'] })
  .readonly()
  .openapi('User')

const CreateUserInputSchema = z
  .object({
    email: z.email(),
    profile: UserProfileSchema.exactOptional(),
    password: z.string().exactOptional(),
  })
  .openapi({ required: ['email'] })
  .readonly()
  .openapi('CreateUserInput')

const UserFilterSchema = z
  .object({
    status: z.array(z.string()).exactOptional(),
    createdAfter: z.iso.datetime().exactOptional(),
    createdBefore: z.iso.datetime().exactOptional(),
    search: z.string().exactOptional(),
  })
  .readonly()
  .openapi('UserFilter')

const AddressSchema = z
  .object({
    street: z.string().exactOptional(),
    city: z.string().exactOptional(),
    state: z.string().exactOptional(),
    postalCode: z.string().exactOptional(),
    country: z.string().exactOptional(),
  })
  .readonly()
  .openapi('Address')

const OrganizationMemberSchema = z
  .object({
    user: UserSchema,
    role: z.enum(['owner', 'admin', 'member', 'viewer']),
    joinedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['user', 'role'] })
  .readonly()
  .openapi('OrganizationMember')

const OrganizationSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    address: AddressSchema.exactOptional(),
    members: z.array(OrganizationMemberSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Organization')

const TeamSchema = z
  .object({ id: z.uuid(), name: z.string(), members: z.array(UserSchema).exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Team')

const PriceSchema = z
  .object({
    amount: z.number(),
    currency: z.string().regex(/^[A-Z]{3}$/),
    formatted: z.string().exactOptional(),
  })
  .openapi({ required: ['amount', 'currency'] })
  .readonly()
  .openapi('Price')

const ProductVariantSchema = z
  .object({
    id: z.uuid(),
    sku: z.string(),
    name: z.string(),
    attributes: z.record(z.string(), z.string()).exactOptional(),
    price: PriceSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'sku', 'name'] })
  .readonly()
  .openapi('ProductVariant')

const OrderItemSchema = z
  .object({ product: ProductVariantSchema, quantity: z.int().min(1), price: PriceSchema })
  .openapi({ required: ['product', 'quantity', 'price'] })
  .readonly()
  .openapi('OrderItem')

const OrderSchema = z
  .object({
    id: z.uuid(),
    customer: UserSchema.exactOptional(),
    items: z.array(OrderItemSchema),
    total: PriceSchema,
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).exactOptional(),
    shippingAddress: AddressSchema.exactOptional(),
    billingAddress: AddressSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'items', 'total'] })
  .readonly()
  .openapi('Order')

const CreditCardPaymentSchema = z
  .object({
    method: z.literal('credit_card'),
    cardToken: z.string(),
    saveCard: z.boolean().exactOptional(),
  })
  .openapi({ required: ['method', 'cardToken'] })
  .readonly()
  .openapi('CreditCardPayment')

const BankTransferPaymentSchema = z
  .object({
    method: z.literal('bank_transfer'),
    bankAccount: z.string(),
    routingNumber: z.string().exactOptional(),
  })
  .openapi({ required: ['method', 'bankAccount'] })
  .readonly()
  .openapi('BankTransferPayment')

const CreateOrderInputSchema = z
  .object({
    items: z.array(
      z
        .object({ productId: z.string(), variantId: z.string(), quantity: z.int() })
        .openapi({ required: ['productId', 'variantId', 'quantity'] }),
    ),
    shippingAddress: AddressSchema.exactOptional(),
    billingAddress: AddressSchema.exactOptional(),
    paymentMethod: z.xor([CreditCardPaymentSchema, BankTransferPaymentSchema]).exactOptional(),
  })
  .openapi({ required: ['items'] })
  .readonly()
  .openapi('CreateOrderInput')

const DiscountSchema = z
  .object({
    type: z.enum(['percentage', 'fixed']),
    value: z.number(),
    code: z.string().exactOptional(),
    validUntil: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['type', 'value'] })
  .readonly()
  .openapi('Discount')

const DateRangeSchema = z
  .object({ from: z.iso.date().exactOptional(), to: z.iso.date().exactOptional() })
  .readonly()
  .openapi('DateRange')

const ShippingInfoSchema = z
  .object({
    carrier: z.string().exactOptional(),
    method: z.string().exactOptional(),
    trackingNumber: z.string().exactOptional(),
    estimatedDelivery: DateRangeSchema.exactOptional(),
    cost: PriceSchema.exactOptional(),
  })
  .readonly()
  .openapi('ShippingInfo')

const WarehouseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    address: AddressSchema.exactOptional(),
    capacity: z.int().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Warehouse')

const SalesReportParamsSchema = z
  .object({
    dateRange: DateRangeSchema,
    groupBy: z.enum(['day', 'week', 'month', 'quarter']).exactOptional(),
    metrics: z.array(z.enum(['revenue', 'orders', 'avgOrderValue', 'customers'])).exactOptional(),
  })
  .openapi({ required: ['dateRange'] })
  .readonly()
  .openapi('SalesReportParams')

const InventoryReportParamsSchema = z
  .object({
    warehouses: z.array(z.string()).exactOptional(),
    categories: z.array(z.string()).exactOptional(),
    lowStockThreshold: z.int().exactOptional(),
  })
  .readonly()
  .openapi('InventoryReportParams')

const UserReportParamsSchema = z
  .object({
    dateRange: DateRangeSchema.exactOptional(),
    segments: z.array(z.string()).exactOptional(),
    includeInactive: z.boolean().exactOptional(),
  })
  .readonly()
  .openapi('UserReportParams')

const FilterExpressionSchema = z
  .object({
    operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'contains']).exactOptional(),
    value: z.xor([z.string(), z.number(), z.array(z.string())]).exactOptional(),
  })
  .readonly()
  .openapi('FilterExpression')

const ReportFormatSchema = z
  .object({
    type: z.enum(['json', 'csv', 'xlsx', 'pdf']).exactOptional(),
    options: z.looseObject({}).exactOptional(),
  })
  .readonly()
  .openapi('ReportFormat')

const EmailDeliverySchema = z
  .object({
    recipients: z.array(z.email()),
    subject: z.string().exactOptional(),
    message: z.string().exactOptional(),
  })
  .openapi({ required: ['recipients'] })
  .readonly()
  .openapi('EmailDelivery')

const RetryPolicySchema = z
  .object({
    maxRetries: z.int().default(3).exactOptional(),
    backoffMultiplier: z.number().default(2).exactOptional(),
    initialDelay: z.int().default(1000).exactOptional(),
    maxDelay: z.int().default(60000).exactOptional(),
  })
  .readonly()
  .openapi('RetryPolicy')

const WebhookDeliverySchema = z
  .object({
    url: z.url(),
    headers: z.record(z.string(), z.string()).exactOptional(),
    retryPolicy: RetryPolicySchema.exactOptional(),
  })
  .openapi({ required: ['url'] })
  .readonly()
  .openapi('WebhookDelivery')

const ReportJobSchema = z
  .object({
    id: z.uuid(),
    status: z.enum(['queued', 'processing', 'completed', 'failed']),
    progress: z.int().min(0).max(100).exactOptional(),
    result: z
      .object({ url: z.url().exactOptional(), expiresAt: z.iso.datetime().exactOptional() })
      .exactOptional(),
    error: z
      .object({ code: z.string().exactOptional(), message: z.string().exactOptional() })
      .exactOptional(),
  })
  .openapi({ required: ['id', 'status'] })
  .readonly()
  .openapi('ReportJob')

const WebhookEventSchema = z
  .object({ type: z.string(), timestamp: z.iso.datetime(), version: z.string().exactOptional() })
  .openapi({ required: ['type', 'timestamp'] })
  .readonly()
  .openapi('WebhookEvent')

const GenericEntitySchema = z
  .object({
    id: z.string().exactOptional(),
    type: z.string().exactOptional(),
    attributes: z.looseObject({}).exactOptional(),
  })
  .readonly()
  .openapi('GenericEntity')

const RequestContextSchema = z
  .object({
    requestId: z.uuid().exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
    source: z.string().exactOptional(),
    userAgent: z.string().exactOptional(),
  })
  .readonly()
  .openapi('RequestContext')

const WebhookTestResultSchema = z
  .object({
    success: z.boolean(),
    statusCode: z.int().exactOptional(),
    responseTime: z.int().exactOptional(),
    response: z.object({}).exactOptional(),
    error: z.string().exactOptional(),
  })
  .openapi({ required: ['success'] })
  .readonly()
  .openapi('WebhookTestResult')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int().exactOptional() })
  .openapi({ required: ['page', 'limit', 'total'] })
  .readonly()
  .openapi('Pagination')

const UserIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'userId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })
  .readonly()

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
  })
  .readonly()

const OffsetParamParamsSchema = z
  .int()
  .min(0)
  .default(0)
  .exactOptional()
  .openapi({
    param: { name: 'offset', in: 'query', schema: { type: 'integer', minimum: 0, default: 0 } },
  })
  .readonly()

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  request: {
    query: z.object({
      status: z
        .enum(['active', 'inactive', 'pending'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'inactive', 'pending'] },
          },
        }),
      limit: LimitParamParamsSchema,
      offset: OffsetParamParamsSchema,
      filter: UserFilterSchema.exactOptional().openapi({
        param: { name: 'filter', in: 'query', schema: { $ref: '#/components/schemas/UserFilter' } },
      }),
    }),
  },
  responses: {
    200: {
      description: 'User list',
      content: {
        'application/json': {
          schema: z
            .object({
              data: z.array(UserSchema),
              pagination: PaginationSchema,
              _links: z
                .object({ self: z.url().exactOptional(), next: z.url().exactOptional() })
                .exactOptional(),
            })
            .openapi({ required: ['data', 'pagination'] }),
        },
      },
    },
  },
} as const)

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserInputSchema.and(
            z.object({
              invitationCode: z.string().exactOptional(),
              preferences: UserPreferencesSchema.exactOptional(),
            }),
          ),
        },
      },
    },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
} as const)

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  operationId: 'getUser',
  request: { params: z.object({ userId: UserIdPathParamsSchema }) },
  responses: {
    200: {
      description: 'User details',
      content: {
        'application/json': {
          schema: z.object({
            data: UserSchema.exactOptional(),
            computed: z
              .object({
                fullName: z.string().exactOptional(),
                membershipDuration: z.string().exactOptional(),
              })
              .exactOptional(),
            embedded: z
              .object({
                organization: OrganizationSchema.exactOptional(),
                teams: z.array(TeamSchema).exactOptional(),
              })
              .exactOptional(),
          }),
        },
      },
    },
  },
} as const)

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  operationId: 'createOrder',
  request: { body: { content: { 'application/json': { schema: CreateOrderInputSchema } } } },
  responses: {
    201: {
      description: 'Order created',
      content: {
        'application/json': {
          schema: z
            .object({
              order: OrderSchema,
              payment: z.xor([
                CreditCardPaymentSchema,
                BankTransferPaymentSchema,
                z
                  .object({
                    method: z.literal('invoice'),
                    invoiceAddress: AddressSchema.exactOptional(),
                    paymentTerms: z.int().default(30).exactOptional(),
                  })
                  .openapi({ required: ['method'] }),
              ]),
              shipping: ShippingInfoSchema.exactOptional(),
            })
            .openapi({ required: ['order', 'payment'] }),
        },
      },
    },
  },
} as const)

export const getProductsProductIdVariantsRoute = createRoute({
  method: 'get',
  path: '/products/{productId}/variants',
  operationId: 'getProductVariants',
  request: {
    params: z.object({
      productId: z.string().openapi({
        param: { name: 'productId', in: 'path', required: true, schema: { type: 'string' } },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Product variants',
      content: {
        'application/json': {
          schema: z.array(
            ProductVariantSchema.and(
              z.object({
                pricing: PriceSchema.and(
                  z.object({ discounts: z.array(DiscountSchema).exactOptional() }),
                ).exactOptional(),
                availability: z
                  .object({
                    inStock: z.boolean().exactOptional(),
                    quantity: z.int().exactOptional(),
                    warehouses: z
                      .array(
                        WarehouseSchema.and(
                          z.object({
                            localQuantity: z.int().exactOptional(),
                            estimatedDelivery: DateRangeSchema.exactOptional(),
                          }),
                        ),
                      )
                      .exactOptional(),
                  })
                  .exactOptional(),
              }),
            ),
          ),
        },
      },
    },
  },
} as const)

export const postReportsGenerateRoute = createRoute({
  method: 'post',
  path: '/reports/generate',
  operationId: 'generateReport',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              reportType: z.enum(['sales', 'inventory', 'users', 'custom']),
              parameters: z.union([
                SalesReportParamsSchema,
                InventoryReportParamsSchema,
                UserReportParamsSchema,
                z
                  .object({
                    query: z.string().exactOptional(),
                    fields: z.array(z.string()).exactOptional(),
                    filters: z
                      .record(z.string(), z.xor([z.string(), z.number(), FilterExpressionSchema]))
                      .exactOptional(),
                  })
                  .openapi({ description: 'Custom report parameters' }),
              ]),
              format: ReportFormatSchema.exactOptional(),
              delivery: z
                .object({
                  method: z.enum(['download', 'email', 'webhook']).exactOptional(),
                  email: EmailDeliverySchema.exactOptional(),
                  webhook: WebhookDeliverySchema.exactOptional(),
                })
                .exactOptional(),
            })
            .openapi({ required: ['reportType', 'parameters'] }),
        },
      },
    },
  },
  responses: {
    202: {
      description: 'Report generation started',
      content: { 'application/json': { schema: ReportJobSchema } },
    },
  },
} as const)

export const postWebhooksTestRoute = createRoute({
  method: 'post',
  path: '/webhooks/test',
  operationId: 'testWebhook',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              endpoint: z.url(),
              headers: z.record(z.string(), z.string()).exactOptional(),
              payload: z.object({
                event: WebhookEventSchema.exactOptional(),
                data: z
                  .xor([
                    UserSchema,
                    OrderSchema,
                    OrganizationSchema,
                    z.record(
                      z.string(),
                      z.union([z.string(), z.number(), z.boolean(), z.array(GenericEntitySchema)]),
                    ),
                  ])
                  .exactOptional(),
                context: RequestContextSchema.and(
                  z.object({
                    testMode: z.boolean().default(true).exactOptional(),
                    mockResponses: z
                      .array(
                        z.object({
                          status: z.int().exactOptional(),
                          body: z.object({}).exactOptional(),
                        }),
                      )
                      .exactOptional(),
                  }),
                ).exactOptional(),
              }),
              retryPolicy: RetryPolicySchema.exactOptional(),
            })
            .openapi({ required: ['endpoint', 'payload'] }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Test result',
      content: { 'application/json': { schema: WebhookTestResultSchema } },
    },
  },
} as const)
