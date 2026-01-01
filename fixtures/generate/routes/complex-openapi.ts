import { createRoute, z } from '@hono/zod-openapi'

const AddressSchema = z
  .object({
    street: z.string().openapi({ type: 'string', example: '123 Main St' }),
    city: z.string().openapi({ type: 'string', example: 'Anytown' }),
    state: z.string().openapi({ type: 'string', example: 'CA' }),
    postalCode: z.string().openapi({ type: 'string', example: '12345' }),
    country: z.string().openapi({ type: 'string', example: 'USA' }),
  })
  .openapi({
    type: 'object',
    properties: {
      street: { type: 'string', example: '123 Main St' },
      city: { type: 'string', example: 'Anytown' },
      state: { type: 'string', example: 'CA' },
      postalCode: { type: 'string', example: '12345' },
      country: { type: 'string', example: 'USA' },
    },
    required: ['street', 'city', 'state', 'postalCode', 'country'],
  })
  .openapi('Address')

const UserProfileSchema = z
  .strictObject({
    bio: z
      .string()
      .optional()
      .openapi({ type: 'string', example: 'Software engineer with 10 years of experience.' }),
    social: z
      .strictObject({
        twitter: z.string().openapi({ type: 'string', example: '@johndoe' }),
        linkedin: z.string().openapi({ type: 'string', example: 'john-doe' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          twitter: { type: 'string', example: '@johndoe' },
          linkedin: { type: 'string', example: 'john-doe' },
        },
        additionalProperties: false,
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      bio: { type: 'string', example: 'Software engineer with 10 years of experience.' },
      social: {
        type: 'object',
        properties: {
          twitter: { type: 'string', example: '@johndoe' },
          linkedin: { type: 'string', example: 'john-doe' },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  })
  .openapi('UserProfile')

const UserSchema = z
  .object({
    id: z.string().openapi({ type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' }),
    name: z.string().openapi({ type: 'string', example: 'John Doe' }),
    email: z.email().openapi({ type: 'string', format: 'email', example: 'john.doe@example.com' }),
    address: AddressSchema.optional(),
    profile: UserProfileSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
      address: { $ref: '#/components/schemas/Address' },
      profile: { $ref: '#/components/schemas/UserProfile' },
    },
    required: ['id', 'name', 'email'],
  })
  .openapi('User')

const NewUserSchema = z
  .object({
    name: z.string().openapi({ type: 'string', example: 'Jane Doe' }),
    email: z.email().openapi({ type: 'string', format: 'email', example: 'jane.doe@example.com' }),
    address: AddressSchema.optional(),
    profile: UserProfileSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Jane Doe' },
      email: { type: 'string', format: 'email', example: 'jane.doe@example.com' },
      address: { $ref: '#/components/schemas/Address' },
      profile: { $ref: '#/components/schemas/UserProfile' },
    },
    required: ['name', 'email'],
  })
  .openapi('NewUser')

const UpdateUserSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    address: AddressSchema,
    profile: UserProfileSchema,
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      address: { $ref: '#/components/schemas/Address' },
      profile: { $ref: '#/components/schemas/UserProfile' },
    },
  })
  .openapi('UpdateUser')

const OrderItemSchema = z
  .object({
    productId: z.string().openapi({ type: 'string', example: 'PROD-001' }),
    quantity: z.int().openapi({ type: 'integer', example: 2 }),
    price: z.float32().openapi({ type: 'number', format: 'float', example: 49.99 }),
  })
  .openapi({
    type: 'object',
    properties: {
      productId: { type: 'string', example: 'PROD-001' },
      quantity: { type: 'integer', example: 2 },
      price: { type: 'number', format: 'float', example: 49.99 },
    },
    required: ['productId', 'quantity', 'price'],
  })
  .openapi('OrderItem')

const CreditCardPaymentSchema = z
  .object({
    method: z
      .literal('credit_card')
      .default('credit_card')
      .openapi({ type: 'string', enum: ['credit_card'], default: 'credit_card' }),
    cardNumber: z.string().openapi({ type: 'string', example: '4111111111111111' }),
    cardHolder: z.string().openapi({ type: 'string', example: 'John Doe' }),
    expirationDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/)
      .openapi({ type: 'string', pattern: '^\\d{2}/\\d{2}$', example: '12/25' }),
  })
  .openapi({
    type: 'object',
    properties: {
      method: { type: 'string', enum: ['credit_card'], default: 'credit_card' },
      cardNumber: { type: 'string', example: '4111111111111111' },
      cardHolder: { type: 'string', example: 'John Doe' },
      expirationDate: { type: 'string', pattern: '^\\d{2}/\\d{2}$', example: '12/25' },
    },
    required: ['method', 'cardNumber', 'cardHolder', 'expirationDate'],
  })
  .openapi('CreditCardPayment')

const PaypalPaymentSchema = z
  .object({
    method: z
      .literal('paypal')
      .default('paypal')
      .openapi({ type: 'string', enum: ['paypal'], default: 'paypal' }),
    email: z.email().openapi({ type: 'string', format: 'email', example: 'user@paypal.com' }),
  })
  .openapi({
    type: 'object',
    properties: {
      method: { type: 'string', enum: ['paypal'], default: 'paypal' },
      email: { type: 'string', format: 'email', example: 'user@paypal.com' },
    },
    required: ['method', 'email'],
  })
  .openapi('PaypalPayment')

const PaymentMethodSchema = z
  .union([CreditCardPaymentSchema, PaypalPaymentSchema])
  .optional()
  .openapi({
    description: 'A polymorphic payment method',
    oneOf: [
      { $ref: '#/components/schemas/CreditCardPayment' },
      { $ref: '#/components/schemas/PaypalPayment' },
    ],
    discriminator: { propertyName: 'method' },
  })
  .openapi('PaymentMethod')

const OrderSchema = z
  .object({
    orderId: z.string().openapi({ type: 'string', example: 'ORD-001' }),
    user: UserSchema,
    items: z
      .array(OrderItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
    total: z.float32().openapi({ type: 'number', format: 'float', example: 199.99 }),
    status: z
      .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .openapi({
        type: 'string',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        example: 'pending',
      }),
    paymentMethod: PaymentMethodSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      orderId: { type: 'string', example: 'ORD-001' },
      user: { $ref: '#/components/schemas/User' },
      items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
      total: { type: 'number', format: 'float', example: 199.99 },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        example: 'pending',
      },
      paymentMethod: { $ref: '#/components/schemas/PaymentMethod' },
    },
    required: ['orderId', 'user', 'items', 'total', 'status'],
  })
  .openapi('Order')

const NewOrderSchema = z
  .object({
    userId: z.string().openapi({ type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' }),
    items: z
      .array(OrderItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
    paymentMethod: PaymentMethodSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      userId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
      paymentMethod: { $ref: '#/components/schemas/PaymentMethod' },
    },
    required: ['userId', 'items'],
  })
  .openapi('NewOrder')

const ComplexTypeSchema = z
  .object({
    id: z.string().openapi({ type: 'string', example: 'ct-001' }),
    attributes: z
      .object({
        type: z.string().openapi({ type: 'string', example: 'example' }),
        details: z
          .array(
            z
              .object({
                key: z.string().openapi({ type: 'string', example: 'color' }),
                value: z.string().openapi({ type: 'string', example: 'red' }),
              })
              .openapi({
                type: 'object',
                properties: {
                  key: { type: 'string', example: 'color' },
                  value: { type: 'string', example: 'red' },
                },
                required: ['key', 'value'],
              }),
          )
          .openapi({
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string', example: 'color' },
                value: { type: 'string', example: 'red' },
              },
              required: ['key', 'value'],
            },
          }),
      })
      .openapi({
        type: 'object',
        properties: {
          type: { type: 'string', example: 'example' },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string', example: 'color' },
                value: { type: 'string', example: 'red' },
              },
              required: ['key', 'value'],
            },
          },
        },
        required: ['type', 'details'],
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', example: 'ct-001' },
      attributes: {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'example' },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                key: { type: 'string', example: 'color' },
                value: { type: 'string', example: 'red' },
              },
              required: ['key', 'value'],
            },
          },
        },
        required: ['type', 'details'],
      },
    },
    required: ['id', 'attributes'],
  })
  .openapi('ComplexType')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List all users',
  responses: {
    200: {
      description: 'A list of users',
      content: {
        'application/json': {
          schema: z
            .array(UserSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
        },
      },
    },
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create a new user',
  request: {
    body: {
      description: 'User to add',
      content: { 'application/json': { schema: NewUserSchema.optional() } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'User created successfully',
      content: { 'application/json': { schema: UserSchema.optional() } },
    },
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  summary: 'Retrieve a user by ID',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { in: 'path', name: 'userId', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'User details',
      content: { 'application/json': { schema: UserSchema.optional() } },
    },
    404: { description: 'User not found' },
  },
})

export const putUsersUserIdRoute = createRoute({
  method: 'put',
  path: '/users/{userId}',
  summary: 'Update an existing user',
  request: {
    body: {
      description: 'Updated user information',
      content: { 'application/json': { schema: UpdateUserSchema.optional() } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'User updated successfully',
      content: { 'application/json': { schema: UserSchema.optional() } },
    },
    404: { description: 'User not found' },
  },
})

export const deleteUsersUserIdRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}',
  summary: 'Delete a user',
  request: {
    params: z.object({
      userId: z
        .string()
        .openapi({
          param: { in: 'path', name: 'userId', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    204: { description: 'User deleted successfully' },
    404: { description: 'User not found' },
  },
})

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  summary: 'List all orders',
  responses: {
    200: {
      description: 'A list of orders',
      content: {
        'application/json': {
          schema: z
            .array(OrderSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Order' } }),
        },
      },
    },
  },
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  summary: 'Create a new order',
  request: {
    body: {
      description: 'Order to create',
      content: { 'application/json': { schema: NewOrderSchema.optional() } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Order created successfully',
      content: { 'application/json': { schema: OrderSchema.optional() } },
    },
  },
})
