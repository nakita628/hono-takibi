import { faker } from '@faker-js/faker'
import type { RouteHandler } from '@hono/zod-openapi'
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

const HealthResponseSchema = z
  .object({
    status: z.enum(['healthy', 'degraded', 'unhealthy']),
    timestamp: z.iso.datetime(),
    version: z.string().exactOptional(),
  })
  .openapi({ required: ['status', 'timestamp'] })
  .openapi('HealthResponse')

const RegisterInputSchema = z
  .object({ email: z.email(), password: z.string().min(8), name: z.string().min(1) })
  .openapi({ required: ['email', 'password', 'name'] })
  .openapi('RegisterInput')

const LoginInputSchema = z
  .object({ email: z.email(), password: z.string().min(8) })
  .openapi({ required: ['email', 'password'] })
  .openapi('LoginInput')

const AuthResponseSchema = z
  .object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.int().openapi({ description: 'Token expiry in seconds' }),
  })
  .openapi({ required: ['accessToken', 'refreshToken', 'expiresIn'] })
  .openapi('AuthResponse')

const UserSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    name: z.string(),
    role: z.enum(['user', 'admin']),
    avatarUrl: z.url().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'email', 'name', 'role', 'createdAt'] })
  .openapi('User')

const UpdateUserInputSchema = z
  .object({ name: z.string().exactOptional(), avatarUrl: z.url().exactOptional() })
  .openapi('UpdateUserInput')

const PaginationMetaSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('PaginationMeta')

const UserListResponseSchema = z
  .object({ data: z.array(UserSchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('UserListResponse')

const ProductSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    category: z.string(),
    stock: z.int().min(0),
    imageUrl: z.url().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'price', 'category', 'stock', 'createdAt'] })
  .openapi('Product')

const CreateProductInputSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    category: z.string(),
    stock: z.int().min(0),
    imageUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'category', 'stock'] })
  .openapi('CreateProductInput')

const UpdateProductInputSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    price: z.number().min(0).exactOptional(),
    category: z.string().exactOptional(),
    stock: z.int().min(0).exactOptional(),
    imageUrl: z.url().exactOptional(),
  })
  .openapi('UpdateProductInput')

const ProductListResponseSchema = z
  .object({ data: z.array(ProductSchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('ProductListResponse')

const OrderItemSchema = z
  .object({
    productId: z.uuid(),
    productName: z.string(),
    quantity: z.int().min(1),
    unitPrice: z.number(),
  })
  .openapi({ required: ['productId', 'productName', 'quantity', 'unitPrice'] })
  .openapi('OrderItem')

const AddressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string().exactOptional(),
    postalCode: z.string(),
    country: z.string(),
  })
  .openapi({ required: ['street', 'city', 'postalCode', 'country'] })
  .openapi('Address')

const OrderSchema = z
  .object({
    id: z.uuid(),
    userId: z.uuid(),
    items: z.array(OrderItemSchema),
    totalAmount: z.number(),
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
    shippingAddress: AddressSchema.exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'userId', 'items', 'totalAmount', 'status', 'createdAt'] })
  .openapi('Order')

const CreateOrderInputSchema = z
  .object({
    items: z
      .array(
        z
          .object({ productId: z.uuid(), quantity: z.int().min(1) })
          .openapi({ required: ['productId', 'quantity'] }),
      )
      .min(1),
    shippingAddress: AddressSchema,
  })
  .openapi({ required: ['items', 'shippingAddress'] })
  .openapi('CreateOrderInput')

const UpdateOrderStatusInputSchema = z
  .object({ status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']) })
  .openapi({ required: ['status'] })
  .openapi('UpdateOrderStatusInput')

const OrderListResponseSchema = z
  .object({ data: z.array(OrderSchema), meta: PaginationMetaSchema })
  .openapi({ required: ['data', 'meta'] })
  .openapi('OrderListResponse')

const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT token for user authentication',
}

const ApiKeyAuthSecurityScheme = {
  type: 'apiKey',
  name: 'X-API-Key',
  in: 'header',
  description: 'API key for admin operations',
}

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['Health'],
  summary: 'Check API health status',
  operationId: 'healthCheck',
  responses: {
    200: {
      description: 'API is healthy',
      content: { 'application/json': { schema: HealthResponseSchema } },
    },
  },
})

export const postAuthRegisterRoute = createRoute({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  summary: 'Register a new user',
  operationId: 'register',
  request: {
    body: { content: { 'application/json': { schema: RegisterInputSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'User registered successfully',
      content: { 'application/json': { schema: AuthResponseSchema } },
    },
    400: { description: 'Invalid input or email already exists' },
  },
})

export const postAuthLoginRoute = createRoute({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: 'User login',
  operationId: 'login',
  request: {
    body: { content: { 'application/json': { schema: LoginInputSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Login successful',
      content: { 'application/json': { schema: AuthResponseSchema } },
    },
    401: { description: 'Invalid credentials' },
  },
})

export const postAuthRefreshRoute = createRoute({
  method: 'post',
  path: '/auth/refresh',
  tags: ['Auth'],
  summary: 'Refresh access token',
  operationId: 'refreshToken',
  responses: {
    200: {
      description: 'Token refreshed',
      content: { 'application/json': { schema: AuthResponseSchema } },
    },
    401: { description: 'Invalid or expired refresh token' },
  },
  security: [{ bearerAuth: [] }],
})

export const getUsersMeRoute = createRoute({
  method: 'get',
  path: '/users/me',
  tags: ['Users'],
  summary: 'Get current user profile',
  operationId: 'getCurrentUser',
  responses: {
    200: { description: 'User profile', content: { 'application/json': { schema: UserSchema } } },
    401: { description: 'Unauthorized' },
  },
  security: [{ bearerAuth: [] }],
})

export const patchUsersMeRoute = createRoute({
  method: 'patch',
  path: '/users/me',
  tags: ['Users'],
  summary: 'Update current user profile',
  operationId: 'updateCurrentUser',
  request: {
    body: { content: { 'application/json': { schema: UpdateUserInputSchema } }, required: true },
  },
  responses: {
    200: { description: 'User updated', content: { 'application/json': { schema: UserSchema } } },
    401: { description: 'Unauthorized' },
  },
  security: [{ bearerAuth: [] }],
})

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List all users (admin only)',
  operationId: 'listUsers',
  request: {
    query: z.object({
      page: z
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      limit: z
        .int()
        .default(20)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'List of users',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
  },
  security: [{ apiKeyAuth: [] }],
})

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  summary: 'List products',
  operationId: 'listProducts',
  request: {
    query: z.object({
      category: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'category', in: 'query', schema: { type: 'string' } } }),
      minPrice: z.coerce
        .number()
        .exactOptional()
        .openapi({ param: { name: 'minPrice', in: 'query', schema: { type: 'number' } } }),
      maxPrice: z.coerce
        .number()
        .exactOptional()
        .openapi({ param: { name: 'maxPrice', in: 'query', schema: { type: 'number' } } }),
      page: z
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      limit: z
        .int()
        .default(20)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'List of products',
      content: { 'application/json': { schema: ProductListResponseSchema } },
    },
  },
})

export const postProductsRoute = createRoute({
  method: 'post',
  path: '/products',
  tags: ['Products'],
  summary: 'Create a product (admin only)',
  operationId: 'createProduct',
  request: {
    body: { content: { 'application/json': { schema: CreateProductInputSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'Product created',
      content: { 'application/json': { schema: ProductSchema } },
    },
    401: { description: 'Unauthorized' },
  },
  security: [{ apiKeyAuth: [] }],
})

export const getProductsProductIdRoute = createRoute({
  method: 'get',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: 'Get product by ID',
  operationId: 'getProduct',
  request: {
    params: z.object({
      productId: z.uuid().openapi({
        param: {
          name: 'productId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Product details',
      content: { 'application/json': { schema: ProductSchema } },
    },
    404: { description: 'Product not found' },
  },
})

export const putProductsProductIdRoute = createRoute({
  method: 'put',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: 'Update product (admin only)',
  operationId: 'updateProduct',
  request: {
    params: z.object({
      productId: z.uuid().openapi({
        param: {
          name: 'productId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    body: { content: { 'application/json': { schema: UpdateProductInputSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'Product updated',
      content: { 'application/json': { schema: ProductSchema } },
    },
    401: { description: 'Unauthorized' },
    404: { description: 'Product not found' },
  },
  security: [{ apiKeyAuth: [] }],
})

export const deleteProductsProductIdRoute = createRoute({
  method: 'delete',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: 'Delete product (admin only)',
  operationId: 'deleteProduct',
  request: {
    params: z.object({
      productId: z.uuid().openapi({
        param: {
          name: 'productId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    204: { description: 'Product deleted' },
    401: { description: 'Unauthorized' },
    404: { description: 'Product not found' },
  },
  security: [{ apiKeyAuth: [] }],
})

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  tags: ['Orders'],
  summary: 'List user orders',
  operationId: 'listOrders',
  request: {
    query: z.object({
      status: z
        .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
            },
          },
        }),
      page: z
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      limit: z
        .int()
        .default(20)
        .exactOptional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'List of orders',
      content: { 'application/json': { schema: OrderListResponseSchema } },
    },
    401: { description: 'Unauthorized' },
  },
  security: [{ bearerAuth: [] }],
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create a new order',
  operationId: 'createOrder',
  request: {
    body: { content: { 'application/json': { schema: CreateOrderInputSchema } }, required: true },
  },
  responses: {
    201: { description: 'Order created', content: { 'application/json': { schema: OrderSchema } } },
    400: { description: 'Invalid order' },
    401: { description: 'Unauthorized' },
  },
  security: [{ bearerAuth: [] }],
})

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  tags: ['Orders'],
  summary: 'Get order by ID',
  operationId: 'getOrder',
  request: {
    params: z.object({
      orderId: z.uuid().openapi({
        param: {
          name: 'orderId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: { description: 'Order details', content: { 'application/json': { schema: OrderSchema } } },
    401: { description: 'Unauthorized' },
    404: { description: 'Order not found' },
  },
  security: [{ bearerAuth: [] }],
})

export const patchOrdersOrderIdRoute = createRoute({
  method: 'patch',
  path: '/orders/{orderId}',
  tags: ['Orders'],
  summary: 'Update order status (admin only)',
  operationId: 'updateOrderStatus',
  request: {
    params: z.object({
      orderId: z.uuid().openapi({
        param: {
          name: 'orderId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateOrderStatusInputSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Order status updated',
      content: { 'application/json': { schema: OrderSchema } },
    },
    401: { description: 'Unauthorized' },
    404: { description: 'Order not found' },
  },
  security: [{ apiKeyAuth: [] }],
})

function mockHealthResponse() {
  return {
    status: faker.helpers.arrayElement(['healthy', 'degraded', 'unhealthy'] as const),
    timestamp: faker.date.past().toISOString(),
    version: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockAuthResponse() {
  return {
    accessToken: faker.string.alpha({ length: { min: 5, max: 20 } }),
    refreshToken: faker.string.alpha({ length: { min: 5, max: 20 } }),
    expiresIn: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockUser() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(['user', 'admin'] as const),
    avatarUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.helpers.arrayElement([faker.date.past().toISOString(), undefined]),
  }
}

function mockPaginationMeta() {
  return {
    page: faker.number.int({ min: 1, max: 1000 }),
    limit: faker.number.int({ min: 1, max: 1000 }),
    total: faker.number.int({ min: 1, max: 1000 }),
    totalPages: faker.number.int({ min: 1, max: 1000 }),
  }
}

function mockUserListResponse() {
  return {
    data: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),
    meta: mockPaginationMeta(),
  }
}

function mockProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    category: faker.string.alpha({ length: { min: 5, max: 20 } }),
    stock: faker.number.int({ min: 0, max: 1000 }),
    imageUrl: faker.helpers.arrayElement([faker.internet.url(), undefined]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.helpers.arrayElement([faker.date.past().toISOString(), undefined]),
  }
}

function mockProductListResponse() {
  return {
    data: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockProduct()),
    meta: mockPaginationMeta(),
  }
}

function mockOrderItem() {
  return {
    productId: faker.string.uuid(),
    productName: faker.string.alpha({ length: { min: 5, max: 20 } }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    unitPrice: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  }
}

function mockAddress() {
  return {
    street: faker.string.alpha({ length: { min: 5, max: 20 } }),
    city: faker.location.city(),
    state: faker.helpers.arrayElement([faker.location.state(), undefined]),
    postalCode: faker.string.alpha({ length: { min: 5, max: 20 } }),
    country: faker.location.country(),
  }
}

function mockOrder() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockOrderItem()),
    totalAmount: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    status: faker.helpers.arrayElement([
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ] as const),
    shippingAddress: faker.helpers.arrayElement([mockAddress(), undefined]),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.helpers.arrayElement([faker.date.past().toISOString(), undefined]),
  }
}

function mockOrderListResponse() {
  return {
    data: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockOrder()),
    meta: mockPaginationMeta(),
  }
}

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json(mockHealthResponse(), 200)
}

const postAuthRegisterRouteHandler: RouteHandler<typeof postAuthRegisterRoute> = async (c) => {
  return c.json(mockAuthResponse(), 201)
}

const postAuthLoginRouteHandler: RouteHandler<typeof postAuthLoginRoute> = async (c) => {
  return c.json(mockAuthResponse(), 200)
}

const postAuthRefreshRouteHandler: RouteHandler<typeof postAuthRefreshRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockAuthResponse(), 200)
}

const getUsersMeRouteHandler: RouteHandler<typeof getUsersMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUser(), 200)
}

const patchUsersMeRouteHandler: RouteHandler<typeof patchUsersMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUser(), 200)
}

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUserListResponse(), 200)
}

const getProductsRouteHandler: RouteHandler<typeof getProductsRoute> = async (c) => {
  return c.json(mockProductListResponse(), 200)
}

const postProductsRouteHandler: RouteHandler<typeof postProductsRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockProduct(), 201)
}

const getProductsProductIdRouteHandler: RouteHandler<typeof getProductsProductIdRoute> = async (
  c,
) => {
  return c.json(mockProduct(), 200)
}

const putProductsProductIdRouteHandler: RouteHandler<typeof putProductsProductIdRoute> = async (
  c,
) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockProduct(), 200)
}

const deleteProductsProductIdRouteHandler: RouteHandler<
  typeof deleteProductsProductIdRoute
> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.body(null, 204)
}

const getOrdersRouteHandler: RouteHandler<typeof getOrdersRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockOrderListResponse(), 200)
}

const postOrdersRouteHandler: RouteHandler<typeof postOrdersRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockOrder(), 201)
}

const getOrdersOrderIdRouteHandler: RouteHandler<typeof getOrdersOrderIdRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockOrder(), 200)
}

const patchOrdersOrderIdRouteHandler: RouteHandler<typeof patchOrdersOrderIdRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockOrder(), 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(postAuthRegisterRoute, postAuthRegisterRouteHandler)
  .openapi(postAuthLoginRoute, postAuthLoginRouteHandler)
  .openapi(postAuthRefreshRoute, postAuthRefreshRouteHandler)
  .openapi(getUsersMeRoute, getUsersMeRouteHandler)
  .openapi(patchUsersMeRoute, patchUsersMeRouteHandler)
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(getProductsRoute, getProductsRouteHandler)
  .openapi(postProductsRoute, postProductsRouteHandler)
  .openapi(getProductsProductIdRoute, getProductsProductIdRouteHandler)
  .openapi(putProductsProductIdRoute, putProductsProductIdRouteHandler)
  .openapi(deleteProductsProductIdRoute, deleteProductsProductIdRouteHandler)
  .openapi(getOrdersRoute, getOrdersRouteHandler)
  .openapi(postOrdersRoute, postOrdersRouteHandler)
  .openapi(getOrdersOrderIdRoute, getOrdersOrderIdRouteHandler)
  .openapi(patchOrdersOrderIdRoute, patchOrdersOrderIdRouteHandler)

export type AppType = typeof api

export default app
