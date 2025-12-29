import { createRoute, z } from '@hono/zod-openapi'

const EntityMetadataSchema = z
  .object({
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    version: z.int().openapi({ type: 'integer' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      version: { type: 'integer' },
    },
  })
  .openapi('EntityMetadata')

const UserPreferencesSchema = z
  .object({
    language: z.string().openapi({ type: 'string' }),
    timezone: z.string().openapi({ type: 'string' }),
    theme: z
      .enum(['light', 'dark', 'system'])
      .openapi({ type: 'string', enum: ['light', 'dark', 'system'] }),
    dateFormat: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      language: { type: 'string' },
      timezone: { type: 'string' },
      theme: { type: 'string', enum: ['light', 'dark', 'system'] },
      dateFormat: { type: 'string' },
    },
  })
  .openapi('UserPreferences')

const PrivacySettingsSchema = z
  .object({
    profileVisibility: z
      .enum(['public', 'private', 'connections'])
      .openapi({ type: 'string', enum: ['public', 'private', 'connections'] }),
    showEmail: z.boolean().openapi({ type: 'boolean' }),
    showActivity: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      profileVisibility: { type: 'string', enum: ['public', 'private', 'connections'] },
      showEmail: { type: 'boolean' },
      showActivity: { type: 'boolean' },
    },
  })
  .openapi('PrivacySettings')

const NotificationSettingsSchema = z
  .object({
    email: z.boolean().openapi({ type: 'boolean' }),
    push: z.boolean().openapi({ type: 'boolean' }),
    sms: z.boolean().openapi({ type: 'boolean' }),
    channels: z
      .record(z.string(), z.boolean().openapi({ type: 'boolean' }))
      .openapi({ type: 'object', additionalProperties: { type: 'boolean' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      email: { type: 'boolean' },
      push: { type: 'boolean' },
      sms: { type: 'boolean' },
      channels: { type: 'object', additionalProperties: { type: 'boolean' } },
    },
  })
  .openapi('NotificationSettings')

const UserSettingsSchema = z
  .object({
    notifications: NotificationSettingsSchema,
    privacy: PrivacySettingsSchema,
    preferences: UserPreferencesSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      notifications: { $ref: '#/components/schemas/NotificationSettings' },
      privacy: { $ref: '#/components/schemas/PrivacySettings' },
      preferences: { $ref: '#/components/schemas/UserPreferences' },
    },
  })
  .openapi('UserSettings')

const UserProfileSchema = z
  .object({
    firstName: z.string().openapi({ type: 'string' }),
    lastName: z.string().openapi({ type: 'string' }),
    avatar: z.url().openapi({ type: 'string', format: 'uri' }),
    bio: z.string().openapi({ type: 'string' }),
    social: z
      .record(z.string(), z.url().openapi({ type: 'string', format: 'uri' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string', format: 'uri' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      avatar: { type: 'string', format: 'uri' },
      bio: { type: 'string' },
      social: { type: 'object', additionalProperties: { type: 'string', format: 'uri' } },
    },
  })
  .openapi('UserProfile')

const UserSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    profile: UserProfileSchema,
    settings: UserSettingsSchema,
    metadata: EntityMetadataSchema,
  })
  .openapi({
    type: 'object',
    required: ['id', 'email'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      email: { type: 'string', format: 'email' },
      profile: { $ref: '#/components/schemas/UserProfile' },
      settings: { $ref: '#/components/schemas/UserSettings' },
      metadata: { $ref: '#/components/schemas/EntityMetadata' },
    },
  })
  .openapi('User')

const CreateUserInputSchema = z
  .object({
    email: z.email().openapi({ type: 'string', format: 'email' }),
    profile: UserProfileSchema,
    password: z.string().optional().openapi({ type: 'string', format: 'password' }),
  })
  .openapi({
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', format: 'email' },
      profile: { $ref: '#/components/schemas/UserProfile' },
      password: { type: 'string', format: 'password' },
    },
  })
  .openapi('CreateUserInput')

const UserFilterSchema = z
  .object({
    status: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    createdAfter: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    createdBefore: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    search: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      status: { type: 'array', items: { type: 'string' } },
      createdAfter: { type: 'string', format: 'date-time' },
      createdBefore: { type: 'string', format: 'date-time' },
      search: { type: 'string' },
    },
  })
  .openapi('UserFilter')

const OrganizationMemberSchema = z
  .object({
    user: UserSchema,
    role: z
      .enum(['owner', 'admin', 'member', 'viewer'])
      .openapi({ type: 'string', enum: ['owner', 'admin', 'member', 'viewer'] }),
    joinedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['user', 'role'],
    properties: {
      user: { $ref: '#/components/schemas/User' },
      role: { type: 'string', enum: ['owner', 'admin', 'member', 'viewer'] },
      joinedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('OrganizationMember')

const AddressSchema = z
  .object({
    street: z.string().openapi({ type: 'string' }),
    city: z.string().openapi({ type: 'string' }),
    state: z.string().openapi({ type: 'string' }),
    postalCode: z.string().openapi({ type: 'string' }),
    country: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      street: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      postalCode: { type: 'string' },
      country: { type: 'string' },
    },
  })
  .openapi('Address')

const OrganizationSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    address: AddressSchema,
    members: z
      .array(OrganizationMemberSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrganizationMember' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      address: { $ref: '#/components/schemas/Address' },
      members: { type: 'array', items: { $ref: '#/components/schemas/OrganizationMember' } },
    },
  })
  .openapi('Organization')

const TeamSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    members: z
      .array(UserSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      members: { type: 'array', items: { $ref: '#/components/schemas/User' } },
    },
  })
  .openapi('Team')

const PriceSchema = z
  .object({
    amount: z.number().openapi({ type: 'number', format: 'double' }),
    currency: z
      .string()
      .regex(/^[A-Z]{3}$/)
      .openapi({ type: 'string', pattern: '^[A-Z]{3}$' }),
    formatted: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['amount', 'currency'],
    properties: {
      amount: { type: 'number', format: 'double' },
      currency: { type: 'string', pattern: '^[A-Z]{3}$' },
      formatted: { type: 'string' },
    },
  })
  .openapi('Price')

const ProductVariantSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    sku: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
    attributes: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    price: PriceSchema,
  })
  .openapi({
    type: 'object',
    required: ['id', 'sku', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      sku: { type: 'string' },
      name: { type: 'string' },
      attributes: { type: 'object', additionalProperties: { type: 'string' } },
      price: { $ref: '#/components/schemas/Price' },
    },
  })
  .openapi('ProductVariant')

const OrderItemSchema = z
  .object({
    product: ProductVariantSchema,
    quantity: z.int().min(1).openapi({ type: 'integer', minimum: 1 }),
    price: PriceSchema,
  })
  .openapi({
    type: 'object',
    required: ['product', 'quantity', 'price'],
    properties: {
      product: { $ref: '#/components/schemas/ProductVariant' },
      quantity: { type: 'integer', minimum: 1 },
      price: { $ref: '#/components/schemas/Price' },
    },
  })
  .openapi('OrderItem')

const OrderSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    customer: UserSchema,
    items: z
      .array(OrderItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
    total: PriceSchema,
    status: z
      .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .optional()
      .openapi({
        type: 'string',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      }),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
  })
  .openapi({
    type: 'object',
    required: ['id', 'items', 'total'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      customer: { $ref: '#/components/schemas/User' },
      items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
      total: { $ref: '#/components/schemas/Price' },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      },
      shippingAddress: { $ref: '#/components/schemas/Address' },
      billingAddress: { $ref: '#/components/schemas/Address' },
    },
  })
  .openapi('Order')

const BankTransferPaymentSchema = z
  .object({
    method: z.literal('bank_transfer').openapi({ type: 'string', const: 'bank_transfer' }),
    bankAccount: z.string().openapi({ type: 'string' }),
    routingNumber: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['method', 'bankAccount'],
    properties: {
      method: { type: 'string', const: 'bank_transfer' },
      bankAccount: { type: 'string' },
      routingNumber: { type: 'string' },
    },
  })
  .openapi('BankTransferPayment')

const CreditCardPaymentSchema = z
  .object({
    method: z.literal('credit_card').openapi({ type: 'string', const: 'credit_card' }),
    cardToken: z.string().openapi({ type: 'string' }),
    saveCard: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['method', 'cardToken'],
    properties: {
      method: { type: 'string', const: 'credit_card' },
      cardToken: { type: 'string' },
      saveCard: { type: 'boolean' },
    },
  })
  .openapi('CreditCardPayment')

const CreateOrderInputSchema = z
  .object({
    items: z
      .array(
        z
          .object({
            productId: z.string().openapi({ type: 'string' }),
            variantId: z.string().openapi({ type: 'string' }),
            quantity: z.int().openapi({ type: 'integer' }),
          })
          .openapi({
            type: 'object',
            required: ['productId', 'variantId', 'quantity'],
            properties: {
              productId: { type: 'string' },
              variantId: { type: 'string' },
              quantity: { type: 'integer' },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['productId', 'variantId', 'quantity'],
          properties: {
            productId: { type: 'string' },
            variantId: { type: 'string' },
            quantity: { type: 'integer' },
          },
        },
      }),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    paymentMethod: z
      .union([CreditCardPaymentSchema, BankTransferPaymentSchema])
      .optional()
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/CreditCardPayment' },
          { $ref: '#/components/schemas/BankTransferPayment' },
        ],
      }),
  })
  .openapi({
    type: 'object',
    required: ['items'],
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: ['productId', 'variantId', 'quantity'],
          properties: {
            productId: { type: 'string' },
            variantId: { type: 'string' },
            quantity: { type: 'integer' },
          },
        },
      },
      shippingAddress: { $ref: '#/components/schemas/Address' },
      billingAddress: { $ref: '#/components/schemas/Address' },
      paymentMethod: {
        oneOf: [
          { $ref: '#/components/schemas/CreditCardPayment' },
          { $ref: '#/components/schemas/BankTransferPayment' },
        ],
      },
    },
  })
  .openapi('CreateOrderInput')

const DiscountSchema = z
  .object({
    type: z
      .enum(['percentage', 'fixed'])
      .openapi({ type: 'string', enum: ['percentage', 'fixed'] }),
    value: z.number().openapi({ type: 'number' }),
    code: z.string().optional().openapi({ type: 'string' }),
    validUntil: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'value'],
    properties: {
      type: { type: 'string', enum: ['percentage', 'fixed'] },
      value: { type: 'number' },
      code: { type: 'string' },
      validUntil: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Discount')

const DateRangeSchema = z
  .object({
    from: z.iso.date().openapi({ type: 'string', format: 'date' }),
    to: z.iso.date().openapi({ type: 'string', format: 'date' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      from: { type: 'string', format: 'date' },
      to: { type: 'string', format: 'date' },
    },
  })
  .openapi('DateRange')

const ShippingInfoSchema = z
  .object({
    carrier: z.string().optional().openapi({ type: 'string' }),
    method: z.string().optional().openapi({ type: 'string' }),
    trackingNumber: z.string().optional().openapi({ type: 'string' }),
    estimatedDelivery: DateRangeSchema,
    cost: PriceSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      carrier: { type: 'string' },
      method: { type: 'string' },
      trackingNumber: { type: 'string' },
      estimatedDelivery: { $ref: '#/components/schemas/DateRange' },
      cost: { $ref: '#/components/schemas/Price' },
    },
  })
  .openapi('ShippingInfo')

const WarehouseSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
    address: AddressSchema,
    capacity: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      address: { $ref: '#/components/schemas/Address' },
      capacity: { type: 'integer' },
    },
  })
  .openapi('Warehouse')

const SalesReportParamsSchema = z
  .object({
    dateRange: DateRangeSchema,
    groupBy: z
      .enum(['day', 'week', 'month', 'quarter'])
      .optional()
      .openapi({ type: 'string', enum: ['day', 'week', 'month', 'quarter'] }),
    metrics: z
      .array(
        z
          .enum(['revenue', 'orders', 'avgOrderValue', 'customers'])
          .optional()
          .openapi({ type: 'string', enum: ['revenue', 'orders', 'avgOrderValue', 'customers'] }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: { type: 'string', enum: ['revenue', 'orders', 'avgOrderValue', 'customers'] },
      }),
  })
  .openapi({
    type: 'object',
    required: ['dateRange'],
    properties: {
      dateRange: { $ref: '#/components/schemas/DateRange' },
      groupBy: { type: 'string', enum: ['day', 'week', 'month', 'quarter'] },
      metrics: {
        type: 'array',
        items: { type: 'string', enum: ['revenue', 'orders', 'avgOrderValue', 'customers'] },
      },
    },
  })
  .openapi('SalesReportParams')

const InventoryReportParamsSchema = z
  .object({
    warehouses: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    categories: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    lowStockThreshold: z.int().openapi({ type: 'integer' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      warehouses: { type: 'array', items: { type: 'string' } },
      categories: { type: 'array', items: { type: 'string' } },
      lowStockThreshold: { type: 'integer' },
    },
  })
  .openapi('InventoryReportParams')

const UserReportParamsSchema = z
  .object({
    dateRange: DateRangeSchema,
    segments: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    includeInactive: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      dateRange: { $ref: '#/components/schemas/DateRange' },
      segments: { type: 'array', items: { type: 'string' } },
      includeInactive: { type: 'boolean' },
    },
  })
  .openapi('UserReportParams')

const FilterExpressionSchema = z
  .object({
    operator: z
      .enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'contains'])
      .openapi({ type: 'string', enum: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'contains'] }),
    value: z
      .union([
        z.string().openapi({ type: 'string' }),
        z.number().optional().openapi({ type: 'number' }),
        z
          .array(z.string().optional().openapi({ type: 'string' }))
          .optional()
          .openapi({ type: 'array', items: { type: 'string' } }),
      ])
      .optional()
      .openapi({
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'array', items: { type: 'string' } },
        ],
      }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      operator: { type: 'string', enum: ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'contains'] },
      value: {
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'array', items: { type: 'string' } },
        ],
      },
    },
  })
  .openapi('FilterExpression')

const ReportFormatSchema = z
  .object({
    type: z
      .enum(['json', 'csv', 'xlsx', 'pdf'])
      .optional()
      .openapi({ type: 'string', enum: ['json', 'csv', 'xlsx', 'pdf'] }),
    options: z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
  })
  .openapi({
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['json', 'csv', 'xlsx', 'pdf'] },
      options: { type: 'object', additionalProperties: true },
    },
  })
  .openapi('ReportFormat')

const EmailDeliverySchema = z
  .object({
    recipients: z
      .array(z.email().openapi({ type: 'string', format: 'email' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'email' } }),
    subject: z.string().optional().openapi({ type: 'string' }),
    message: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['recipients'],
    properties: {
      recipients: { type: 'array', items: { type: 'string', format: 'email' } },
      subject: { type: 'string' },
      message: { type: 'string' },
    },
  })
  .openapi('EmailDelivery')

const RetryPolicySchema = z
  .object({
    maxRetries: z.int().default(3).openapi({ type: 'integer', default: 3 }),
    backoffMultiplier: z.number().default(2).openapi({ type: 'number', default: 2 }),
    initialDelay: z.int().default(1000).openapi({ type: 'integer', default: 1000 }),
    maxDelay: z.int().default(60000).openapi({ type: 'integer', default: 60000 }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      maxRetries: { type: 'integer', default: 3 },
      backoffMultiplier: { type: 'number', default: 2 },
      initialDelay: { type: 'integer', default: 1000 },
      maxDelay: { type: 'integer', default: 60000 },
    },
  })
  .openapi('RetryPolicy')

const WebhookDeliverySchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    headers: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    retryPolicy: RetryPolicySchema,
  })
  .openapi({
    type: 'object',
    required: ['url'],
    properties: {
      url: { type: 'string', format: 'uri' },
      headers: { type: 'object', additionalProperties: { type: 'string' } },
      retryPolicy: { $ref: '#/components/schemas/RetryPolicy' },
    },
  })
  .openapi('WebhookDelivery')

const ReportJobSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['queued', 'processing', 'completed', 'failed'])
      .openapi({ type: 'string', enum: ['queued', 'processing', 'completed', 'failed'] }),
    progress: z
      .int()
      .min(0)
      .max(100)
      .optional()
      .openapi({ type: 'integer', minimum: 0, maximum: 100 }),
    result: z
      .object({
        url: z.url().openapi({ type: 'string', format: 'uri' }),
        expiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          url: { type: 'string', format: 'uri' },
          expiresAt: { type: 'string', format: 'date-time' },
        },
      }),
    error: z
      .object({
        code: z.string().openapi({ type: 'string' }),
        message: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { code: { type: 'string' }, message: { type: 'string' } },
      }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      status: { type: 'string', enum: ['queued', 'processing', 'completed', 'failed'] },
      progress: { type: 'integer', minimum: 0, maximum: 100 },
      result: {
        type: 'object',
        properties: {
          url: { type: 'string', format: 'uri' },
          expiresAt: { type: 'string', format: 'date-time' },
        },
      },
      error: {
        type: 'object',
        properties: { code: { type: 'string' }, message: { type: 'string' } },
      },
    },
  })
  .openapi('ReportJob')

const WebhookEventSchema = z
  .object({
    type: z.string().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    version: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'timestamp'],
    properties: {
      type: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
      version: { type: 'string' },
    },
  })
  .openapi('WebhookEvent')

const GenericEntitySchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    type: z.string().optional().openapi({ type: 'string' }),
    attributes: z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      type: { type: 'string' },
      attributes: { type: 'object', additionalProperties: true },
    },
  })
  .openapi('GenericEntity')

const RequestContextSchema = z
  .object({
    requestId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    source: z.string().openapi({ type: 'string' }),
    userAgent: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      requestId: { type: 'string', format: 'uuid' },
      timestamp: { type: 'string', format: 'date-time' },
      source: { type: 'string' },
      userAgent: { type: 'string' },
    },
  })
  .openapi('RequestContext')

const WebhookTestResultSchema = z
  .object({
    success: z.boolean().openapi({ type: 'boolean' }),
    statusCode: z.int().optional().openapi({ type: 'integer' }),
    responseTime: z.int().optional().openapi({ type: 'integer' }),
    response: z.object({}).openapi({ type: 'object' }),
    error: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['success'],
    properties: {
      success: { type: 'boolean' },
      statusCode: { type: 'integer' },
      responseTime: { type: 'integer' },
      response: { type: 'object' },
      error: { type: 'string' },
    },
  })
  .openapi('WebhookTestResult')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer' }),
    limit: z.int().openapi({ type: 'integer' }),
    total: z.int().openapi({ type: 'integer' }),
    totalPages: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total'],
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
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
    type: 'string',
    format: 'uuid',
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const OffsetParamParamsSchema = z
  .int()
  .min(0)
  .default(0)
  .optional()
  .openapi({
    param: { name: 'offset', in: 'query', schema: { type: 'integer', minimum: 0, default: 0 } },
    type: 'integer',
    minimum: 0,
    default: 0,
  })

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  request: {
    query: z.object({
      status: z
        .enum(['active', 'inactive', 'pending'])
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'inactive', 'pending'] },
          },
          type: 'string',
          enum: ['active', 'inactive', 'pending'],
        }),
      limit: LimitParamParamsSchema,
      offset: OffsetParamParamsSchema,
      filter: UserFilterSchema,
    }),
  },
  responses: {
    200: {
      description: 'User list',
      content: {
        'application/json': {
          schema: z
            .object({
              data: z
                .array(UserSchema)
                .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
              pagination: PaginationSchema,
              _links: z
                .object({
                  self: z.url().openapi({ type: 'string', format: 'uri' }),
                  next: z.url().openapi({ type: 'string', format: 'uri' }),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: {
                    self: { type: 'string', format: 'uri' },
                    next: { type: 'string', format: 'uri' },
                  },
                }),
            })
            .openapi({
              type: 'object',
              required: ['data', 'pagination'],
              properties: {
                data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
                pagination: { $ref: '#/components/schemas/Pagination' },
                _links: {
                  type: 'object',
                  properties: {
                    self: { type: 'string', format: 'uri' },
                    next: { type: 'string', format: 'uri' },
                  },
                },
              },
            }),
        },
      },
    },
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .intersection(
              CreateUserInputSchema,
              z
                .object({
                  invitationCode: z.string().optional().openapi({ type: 'string' }),
                  preferences: UserPreferencesSchema,
                })
                .openapi({
                  type: 'object',
                  properties: {
                    invitationCode: { type: 'string' },
                    preferences: { $ref: '#/components/schemas/UserPreferences' },
                  },
                }),
            )
            .optional()
            .openapi({
              allOf: [
                { $ref: '#/components/schemas/CreateUserInput' },
                {
                  type: 'object',
                  properties: {
                    invitationCode: { type: 'string' },
                    preferences: { $ref: '#/components/schemas/UserPreferences' },
                  },
                },
              ],
            }),
        },
      },
    },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
})

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
          schema: z
            .object({
              data: UserSchema,
              computed: z
                .object({
                  fullName: z.string().openapi({ type: 'string' }),
                  membershipDuration: z.string().openapi({ type: 'string' }),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: {
                    fullName: { type: 'string' },
                    membershipDuration: { type: 'string' },
                  },
                }),
              embedded: z
                .object({
                  organization: OrganizationSchema,
                  teams: z
                    .array(TeamSchema)
                    .optional()
                    .openapi({ type: 'array', items: { $ref: '#/components/schemas/Team' } }),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    organization: { $ref: '#/components/schemas/Organization' },
                    teams: { type: 'array', items: { $ref: '#/components/schemas/Team' } },
                  },
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                data: { $ref: '#/components/schemas/User' },
                computed: {
                  type: 'object',
                  properties: {
                    fullName: { type: 'string' },
                    membershipDuration: { type: 'string' },
                  },
                },
                embedded: {
                  type: 'object',
                  properties: {
                    organization: { $ref: '#/components/schemas/Organization' },
                    teams: { type: 'array', items: { $ref: '#/components/schemas/Team' } },
                  },
                },
              },
            }),
        },
      },
    },
  },
})

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
              payment: z
                .union([
                  CreditCardPaymentSchema,
                  BankTransferPaymentSchema,
                  z
                    .object({
                      method: z.literal('invoice').openapi({ type: 'string', const: 'invoice' }),
                      invoiceAddress: AddressSchema,
                      paymentTerms: z.int().default(30).openapi({ type: 'integer', default: 30 }),
                    })
                    .openapi({
                      type: 'object',
                      required: ['method'],
                      properties: {
                        method: { type: 'string', const: 'invoice' },
                        invoiceAddress: { $ref: '#/components/schemas/Address' },
                        paymentTerms: { type: 'integer', default: 30 },
                      },
                    }),
                ])
                .optional()
                .openapi({
                  oneOf: [
                    { $ref: '#/components/schemas/CreditCardPayment' },
                    { $ref: '#/components/schemas/BankTransferPayment' },
                    {
                      type: 'object',
                      required: ['method'],
                      properties: {
                        method: { type: 'string', const: 'invoice' },
                        invoiceAddress: { $ref: '#/components/schemas/Address' },
                        paymentTerms: { type: 'integer', default: 30 },
                      },
                    },
                  ],
                }),
              shipping: ShippingInfoSchema,
            })
            .openapi({
              type: 'object',
              required: ['order', 'payment'],
              properties: {
                order: { $ref: '#/components/schemas/Order' },
                payment: {
                  oneOf: [
                    { $ref: '#/components/schemas/CreditCardPayment' },
                    { $ref: '#/components/schemas/BankTransferPayment' },
                    {
                      type: 'object',
                      required: ['method'],
                      properties: {
                        method: { type: 'string', const: 'invoice' },
                        invoiceAddress: { $ref: '#/components/schemas/Address' },
                        paymentTerms: { type: 'integer', default: 30 },
                      },
                    },
                  ],
                },
                shipping: { $ref: '#/components/schemas/ShippingInfo' },
              },
            }),
        },
      },
    },
  },
})

export const getProductsProductIdVariantsRoute = createRoute({
  method: 'get',
  path: '/products/{productId}/variants',
  operationId: 'getProductVariants',
  request: {
    params: z.object({
      productId: z
        .string()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Product variants',
      content: {
        'application/json': {
          schema: z
            .array(
              z
                .intersection(
                  ProductVariantSchema,
                  z
                    .object({
                      pricing: z
                        .intersection(
                          PriceSchema,
                          z
                            .object({
                              discounts: z
                                .array(DiscountSchema)
                                .openapi({
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Discount' },
                                }),
                            })
                            .partial()
                            .openapi({
                              type: 'object',
                              properties: {
                                discounts: {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Discount' },
                                },
                              },
                            }),
                        )
                        .openapi({
                          allOf: [
                            { $ref: '#/components/schemas/Price' },
                            {
                              type: 'object',
                              properties: {
                                discounts: {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Discount' },
                                },
                              },
                            },
                          ],
                        }),
                      availability: z
                        .object({
                          inStock: z.boolean().openapi({ type: 'boolean' }),
                          quantity: z.int().openapi({ type: 'integer' }),
                          warehouses: z
                            .array(
                              z
                                .intersection(
                                  WarehouseSchema,
                                  z
                                    .object({
                                      localQuantity: z.int().openapi({ type: 'integer' }),
                                      estimatedDelivery: DateRangeSchema,
                                    })
                                    .openapi({
                                      type: 'object',
                                      properties: {
                                        localQuantity: { type: 'integer' },
                                        estimatedDelivery: {
                                          $ref: '#/components/schemas/DateRange',
                                        },
                                      },
                                    }),
                                )
                                .openapi({
                                  allOf: [
                                    { $ref: '#/components/schemas/Warehouse' },
                                    {
                                      type: 'object',
                                      properties: {
                                        localQuantity: { type: 'integer' },
                                        estimatedDelivery: {
                                          $ref: '#/components/schemas/DateRange',
                                        },
                                      },
                                    },
                                  ],
                                }),
                            )
                            .optional()
                            .openapi({
                              type: 'array',
                              items: {
                                allOf: [
                                  { $ref: '#/components/schemas/Warehouse' },
                                  {
                                    type: 'object',
                                    properties: {
                                      localQuantity: { type: 'integer' },
                                      estimatedDelivery: { $ref: '#/components/schemas/DateRange' },
                                    },
                                  },
                                ],
                              },
                            }),
                        })
                        .partial()
                        .openapi({
                          type: 'object',
                          properties: {
                            inStock: { type: 'boolean' },
                            quantity: { type: 'integer' },
                            warehouses: {
                              type: 'array',
                              items: {
                                allOf: [
                                  { $ref: '#/components/schemas/Warehouse' },
                                  {
                                    type: 'object',
                                    properties: {
                                      localQuantity: { type: 'integer' },
                                      estimatedDelivery: { $ref: '#/components/schemas/DateRange' },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        }),
                    })
                    .partial()
                    .openapi({
                      type: 'object',
                      properties: {
                        pricing: {
                          allOf: [
                            { $ref: '#/components/schemas/Price' },
                            {
                              type: 'object',
                              properties: {
                                discounts: {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Discount' },
                                },
                              },
                            },
                          ],
                        },
                        availability: {
                          type: 'object',
                          properties: {
                            inStock: { type: 'boolean' },
                            quantity: { type: 'integer' },
                            warehouses: {
                              type: 'array',
                              items: {
                                allOf: [
                                  { $ref: '#/components/schemas/Warehouse' },
                                  {
                                    type: 'object',
                                    properties: {
                                      localQuantity: { type: 'integer' },
                                      estimatedDelivery: { $ref: '#/components/schemas/DateRange' },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    }),
                )
                .optional()
                .openapi({
                  allOf: [
                    { $ref: '#/components/schemas/ProductVariant' },
                    {
                      type: 'object',
                      properties: {
                        pricing: {
                          allOf: [
                            { $ref: '#/components/schemas/Price' },
                            {
                              type: 'object',
                              properties: {
                                discounts: {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Discount' },
                                },
                              },
                            },
                          ],
                        },
                        availability: {
                          type: 'object',
                          properties: {
                            inStock: { type: 'boolean' },
                            quantity: { type: 'integer' },
                            warehouses: {
                              type: 'array',
                              items: {
                                allOf: [
                                  { $ref: '#/components/schemas/Warehouse' },
                                  {
                                    type: 'object',
                                    properties: {
                                      localQuantity: { type: 'integer' },
                                      estimatedDelivery: { $ref: '#/components/schemas/DateRange' },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    },
                  ],
                }),
            )
            .optional()
            .openapi({
              type: 'array',
              items: {
                allOf: [
                  { $ref: '#/components/schemas/ProductVariant' },
                  {
                    type: 'object',
                    properties: {
                      pricing: {
                        allOf: [
                          { $ref: '#/components/schemas/Price' },
                          {
                            type: 'object',
                            properties: {
                              discounts: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Discount' },
                              },
                            },
                          },
                        ],
                      },
                      availability: {
                        type: 'object',
                        properties: {
                          inStock: { type: 'boolean' },
                          quantity: { type: 'integer' },
                          warehouses: {
                            type: 'array',
                            items: {
                              allOf: [
                                { $ref: '#/components/schemas/Warehouse' },
                                {
                                  type: 'object',
                                  properties: {
                                    localQuantity: { type: 'integer' },
                                    estimatedDelivery: { $ref: '#/components/schemas/DateRange' },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            }),
        },
      },
    },
  },
})

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
              reportType: z
                .enum(['sales', 'inventory', 'users', 'custom'])
                .openapi({ type: 'string', enum: ['sales', 'inventory', 'users', 'custom'] }),
              parameters: z
                .union([
                  SalesReportParamsSchema,
                  InventoryReportParamsSchema,
                  UserReportParamsSchema,
                  z
                    .object({
                      query: z.string().openapi({ type: 'string' }),
                      fields: z
                        .array(z.string().openapi({ type: 'string' }))
                        .openapi({ type: 'array', items: { type: 'string' } }),
                      filters: z
                        .record(
                          z.string(),
                          z
                            .union([
                              z.string().openapi({ type: 'string' }),
                              z.number().optional().openapi({ type: 'number' }),
                              FilterExpressionSchema,
                            ])
                            .optional()
                            .openapi({
                              oneOf: [
                                { type: 'string' },
                                { type: 'number' },
                                { $ref: '#/components/schemas/FilterExpression' },
                              ],
                            }),
                        )
                        .openapi({
                          type: 'object',
                          additionalProperties: {
                            oneOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { $ref: '#/components/schemas/FilterExpression' },
                            ],
                          },
                        }),
                    })
                    .partial()
                    .openapi({
                      type: 'object',
                      description: 'Custom report parameters',
                      properties: {
                        query: { type: 'string' },
                        fields: { type: 'array', items: { type: 'string' } },
                        filters: {
                          type: 'object',
                          additionalProperties: {
                            oneOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { $ref: '#/components/schemas/FilterExpression' },
                            ],
                          },
                        },
                      },
                    }),
                ])
                .optional()
                .openapi({
                  anyOf: [
                    { $ref: '#/components/schemas/SalesReportParams' },
                    { $ref: '#/components/schemas/InventoryReportParams' },
                    { $ref: '#/components/schemas/UserReportParams' },
                    {
                      type: 'object',
                      description: 'Custom report parameters',
                      properties: {
                        query: { type: 'string' },
                        fields: { type: 'array', items: { type: 'string' } },
                        filters: {
                          type: 'object',
                          additionalProperties: {
                            oneOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { $ref: '#/components/schemas/FilterExpression' },
                            ],
                          },
                        },
                      },
                    },
                  ],
                }),
              format: ReportFormatSchema,
              delivery: z
                .object({
                  method: z
                    .enum(['download', 'email', 'webhook'])
                    .optional()
                    .openapi({ type: 'string', enum: ['download', 'email', 'webhook'] }),
                  email: EmailDeliverySchema,
                  webhook: WebhookDeliverySchema,
                })
                .openapi({
                  type: 'object',
                  properties: {
                    method: { type: 'string', enum: ['download', 'email', 'webhook'] },
                    email: { $ref: '#/components/schemas/EmailDelivery' },
                    webhook: { $ref: '#/components/schemas/WebhookDelivery' },
                  },
                }),
            })
            .openapi({
              type: 'object',
              required: ['reportType', 'parameters'],
              properties: {
                reportType: { type: 'string', enum: ['sales', 'inventory', 'users', 'custom'] },
                parameters: {
                  anyOf: [
                    { $ref: '#/components/schemas/SalesReportParams' },
                    { $ref: '#/components/schemas/InventoryReportParams' },
                    { $ref: '#/components/schemas/UserReportParams' },
                    {
                      type: 'object',
                      description: 'Custom report parameters',
                      properties: {
                        query: { type: 'string' },
                        fields: { type: 'array', items: { type: 'string' } },
                        filters: {
                          type: 'object',
                          additionalProperties: {
                            oneOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { $ref: '#/components/schemas/FilterExpression' },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
                format: { $ref: '#/components/schemas/ReportFormat' },
                delivery: {
                  type: 'object',
                  properties: {
                    method: { type: 'string', enum: ['download', 'email', 'webhook'] },
                    email: { $ref: '#/components/schemas/EmailDelivery' },
                    webhook: { $ref: '#/components/schemas/WebhookDelivery' },
                  },
                },
              },
            }),
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
})

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
              endpoint: z.url().openapi({ type: 'string', format: 'uri' }),
              headers: z
                .record(z.string(), z.string().optional().openapi({ type: 'string' }))
                .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
              payload: z
                .object({
                  event: WebhookEventSchema,
                  data: z
                    .union([
                      UserSchema,
                      OrderSchema,
                      OrganizationSchema,
                      z
                        .record(
                          z.string(),
                          z
                            .union([
                              z.string().openapi({ type: 'string' }),
                              z.number().optional().openapi({ type: 'number' }),
                              z.boolean().optional().openapi({ type: 'boolean' }),
                              z
                                .array(GenericEntitySchema)
                                .optional()
                                .openapi({
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/GenericEntity' },
                                }),
                            ])
                            .optional()
                            .openapi({
                              anyOf: [
                                { type: 'string' },
                                { type: 'number' },
                                { type: 'boolean' },
                                {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/GenericEntity' },
                                },
                              ],
                            }),
                        )
                        .openapi({
                          type: 'object',
                          additionalProperties: {
                            anyOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { type: 'boolean' },
                              {
                                type: 'array',
                                items: { $ref: '#/components/schemas/GenericEntity' },
                              },
                            ],
                          },
                        }),
                    ])
                    .optional()
                    .openapi({
                      oneOf: [
                        { $ref: '#/components/schemas/User' },
                        { $ref: '#/components/schemas/Order' },
                        { $ref: '#/components/schemas/Organization' },
                        {
                          type: 'object',
                          additionalProperties: {
                            anyOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { type: 'boolean' },
                              {
                                type: 'array',
                                items: { $ref: '#/components/schemas/GenericEntity' },
                              },
                            ],
                          },
                        },
                      ],
                    }),
                  context: z
                    .intersection(
                      RequestContextSchema,
                      z
                        .object({
                          testMode: z
                            .boolean()
                            .default(true)
                            .openapi({ type: 'boolean', default: true }),
                          mockResponses: z
                            .array(
                              z
                                .object({
                                  status: z.int().openapi({ type: 'integer' }),
                                  body: z.object({}).openapi({ type: 'object' }),
                                })
                                .openapi({
                                  type: 'object',
                                  properties: {
                                    status: { type: 'integer' },
                                    body: { type: 'object' },
                                  },
                                }),
                            )
                            .optional()
                            .openapi({
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  status: { type: 'integer' },
                                  body: { type: 'object' },
                                },
                              },
                            }),
                        })
                        .partial()
                        .openapi({
                          type: 'object',
                          properties: {
                            testMode: { type: 'boolean', default: true },
                            mockResponses: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  status: { type: 'integer' },
                                  body: { type: 'object' },
                                },
                              },
                            },
                          },
                        }),
                    )
                    .optional()
                    .openapi({
                      allOf: [
                        { $ref: '#/components/schemas/RequestContext' },
                        {
                          type: 'object',
                          properties: {
                            testMode: { type: 'boolean', default: true },
                            mockResponses: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  status: { type: 'integer' },
                                  body: { type: 'object' },
                                },
                              },
                            },
                          },
                        },
                      ],
                    }),
                })
                .openapi({
                  type: 'object',
                  properties: {
                    event: { $ref: '#/components/schemas/WebhookEvent' },
                    data: {
                      oneOf: [
                        { $ref: '#/components/schemas/User' },
                        { $ref: '#/components/schemas/Order' },
                        { $ref: '#/components/schemas/Organization' },
                        {
                          type: 'object',
                          additionalProperties: {
                            anyOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { type: 'boolean' },
                              {
                                type: 'array',
                                items: { $ref: '#/components/schemas/GenericEntity' },
                              },
                            ],
                          },
                        },
                      ],
                    },
                    context: {
                      allOf: [
                        { $ref: '#/components/schemas/RequestContext' },
                        {
                          type: 'object',
                          properties: {
                            testMode: { type: 'boolean', default: true },
                            mockResponses: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  status: { type: 'integer' },
                                  body: { type: 'object' },
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                }),
              retryPolicy: RetryPolicySchema,
            })
            .openapi({
              type: 'object',
              required: ['endpoint', 'payload'],
              properties: {
                endpoint: { type: 'string', format: 'uri' },
                headers: { type: 'object', additionalProperties: { type: 'string' } },
                payload: {
                  type: 'object',
                  properties: {
                    event: { $ref: '#/components/schemas/WebhookEvent' },
                    data: {
                      oneOf: [
                        { $ref: '#/components/schemas/User' },
                        { $ref: '#/components/schemas/Order' },
                        { $ref: '#/components/schemas/Organization' },
                        {
                          type: 'object',
                          additionalProperties: {
                            anyOf: [
                              { type: 'string' },
                              { type: 'number' },
                              { type: 'boolean' },
                              {
                                type: 'array',
                                items: { $ref: '#/components/schemas/GenericEntity' },
                              },
                            ],
                          },
                        },
                      ],
                    },
                    context: {
                      allOf: [
                        { $ref: '#/components/schemas/RequestContext' },
                        {
                          type: 'object',
                          properties: {
                            testMode: { type: 'boolean', default: true },
                            mockResponses: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  status: { type: 'integer' },
                                  body: { type: 'object' },
                                },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                retryPolicy: { $ref: '#/components/schemas/RetryPolicy' },
              },
            }),
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
})
