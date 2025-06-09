import { createRoute, z } from '@hono/zod-openapi'

const AddressSchema = z
  .object({
    street: z.string().openapi({ example: '123 Main St' }),
    city: z.string().openapi({ example: 'Anytown' }),
    state: z.string().openapi({ example: 'CA' }),
    postalCode: z.string().openapi({ example: '12345' }),
    country: z.string().openapi({ example: 'USA' }),
  })
  .openapi('Address')

const UserProfileSchema = z
  .object({
    bio: z.string().openapi({ example: 'Software engineer with 10 years of experience.' }),
    social: z
      .object({
        twitter: z.string().openapi({ example: '@johndoe' }),
        linkedin: z.string().openapi({ example: 'john-doe' }),
      })
      .partial(),
  })
  .partial()
  .openapi('UserProfile')

const UserSchema = z
  .object({
    id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.string().email().openapi({ example: 'john.doe@example.com' }),
    address: AddressSchema.optional(),
    profile: UserProfileSchema.optional(),
  })
  .openapi('User')

const NewUserSchema = z
  .object({
    name: z.string().openapi({ example: 'Jane Doe' }),
    email: z.string().email().openapi({ example: 'jane.doe@example.com' }),
    address: AddressSchema.optional(),
    profile: UserProfileSchema.optional(),
  })
  .openapi('NewUser')

const UpdateUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    address: AddressSchema,
    profile: UserProfileSchema,
  })
  .partial()
  .openapi('UpdateUser')

const OrderItemSchema = z
  .object({
    productId: z.string().openapi({ example: 'PROD-001' }),
    quantity: z.number().int().openapi({ example: 2 }),
    price: z.number().openapi({ example: 49.99 }),
  })
  .openapi('OrderItem')

const CreditCardPaymentSchema = z
  .object({
    method: z.literal('credit_card'),
    cardNumber: z.string().openapi({ example: '4111111111111111' }),
    cardHolder: z.string().openapi({ example: 'John Doe' }),
    expirationDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/)
      .openapi({ example: '12/25' }),
  })
  .openapi('CreditCardPayment')

const PaypalPaymentSchema = z
  .object({
    method: z.literal('paypal'),
    email: z.string().email().openapi({ example: 'user@paypal.com' }),
  })
  .openapi('PaypalPayment')

const PaymentMethodSchema = z
  .union([CreditCardPaymentSchema, PaypalPaymentSchema])
  .openapi({ description: 'A polymorphic payment method' })
  .openapi('PaymentMethod')

const OrderSchema = z
  .object({
    orderId: z.string().openapi({ example: 'ORD-001' }),
    user: UserSchema,
    items: z.array(OrderItemSchema),
    total: z.number().openapi({ example: 199.99 }),
    status: z
      .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .openapi({ example: 'pending' }),
    paymentMethod: PaymentMethodSchema.optional(),
  })
  .openapi('Order')

const NewOrderSchema = z
  .object({
    userId: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    items: z.array(OrderItemSchema),
    paymentMethod: PaymentMethodSchema.optional(),
  })
  .openapi('NewOrder')

const ComplexTypeSchema = z
  .object({
    id: z.string().openapi({ example: 'ct-001' }),
    attributes: z.object({
      type: z.string().openapi({ example: 'example' }),
      details: z.array(
        z.object({
          key: z.string().openapi({ example: 'color' }),
          value: z.string().openapi({ example: 'red' }),
        }),
      ),
    }),
  })
  .openapi('ComplexType')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List all users',
  responses: {
    200: {
      description: 'A list of users',
      content: { 'application/json': { schema: z.array(UserSchema) } },
    },
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create a new user',
  request: { body: { required: true, content: { 'application/json': { schema: NewUserSchema } } } },
  responses: {
    201: {
      description: 'User created successfully',
      content: { 'application/json': { schema: UserSchema } },
    },
  },
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  summary: 'Retrieve a user by ID',
  responses: {
    200: { description: 'User details', content: { 'application/json': { schema: UserSchema } } },
    404: { description: 'User not found' },
  },
})

export const putUsersUserIdRoute = createRoute({
  method: 'put',
  path: '/users/{userId}',
  summary: 'Update an existing user',
  request: {
    body: { required: true, content: { 'application/json': { schema: UpdateUserSchema } } },
  },
  responses: {
    200: {
      description: 'User updated successfully',
      content: { 'application/json': { schema: UserSchema } },
    },
    404: { description: 'User not found' },
  },
})

export const deleteUsersUserIdRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}',
  summary: 'Delete a user',
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
      content: { 'application/json': { schema: z.array(OrderSchema) } },
    },
  },
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  summary: 'Create a new order',
  request: {
    body: { required: true, content: { 'application/json': { schema: NewOrderSchema } } },
  },
  responses: {
    201: {
      description: 'Order created successfully',
      content: { 'application/json': { schema: OrderSchema } },
    },
  },
})
