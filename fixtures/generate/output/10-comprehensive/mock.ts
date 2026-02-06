import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const AddressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string().exactOptional(),
    zip: z.string().exactOptional(),
    country: z.string(),
  })
  .openapi({ required: ['street', 'city', 'country'] })
  .openapi('Address')

const UserSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['admin', 'customer']),
    address: AddressSchema.exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'email', 'role', 'createdAt'] })
  .openapi('User')

const CreateUserSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'customer']).exactOptional(),
    address: AddressSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'email', 'password'] })
  .openapi('CreateUser')

const UpdateUserSchema = z
  .object({
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
    address: AddressSchema.exactOptional(),
  })
  .openapi('UpdateUser')

const CategorySchema = z
  .object({ id: z.int(), name: z.string(), parentId: z.int().nullable().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Category')

const ProductSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    category: CategorySchema,
    tags: z.array(z.string()).exactOptional(),
    inStock: z.boolean(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'price', 'category', 'inStock', 'createdAt'] })
  .openapi('Product')

const CreateProductSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    categoryId: z.int(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'categoryId'] })
  .openapi('CreateProduct')

const UpdateProductSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    price: z.number().min(0).exactOptional(),
    categoryId: z.int().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi('UpdateProduct')

const ReviewSchema = z
  .object({
    id: z.int(),
    rating: z.int().min(1).max(5),
    comment: z.string().exactOptional(),
    author: UserSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'rating', 'author', 'createdAt'] })
  .openapi('Review')

const CreateReviewSchema = z
  .object({ rating: z.int().min(1).max(5), comment: z.string().exactOptional() })
  .openapi({ required: ['rating'] })
  .openapi('CreateReview')

const OrderItemSchema = z
  .object({ product: ProductSchema, quantity: z.int().min(1), price: z.number() })
  .openapi({ required: ['product', 'quantity', 'price'] })
  .openapi('OrderItem')

const OrderSchema = z
  .object({
    id: z.int(),
    user: UserSchema,
    items: z.array(OrderItemSchema),
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
    totalPrice: z.number(),
    shippingAddress: AddressSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({
    required: ['id', 'user', 'items', 'status', 'totalPrice', 'shippingAddress', 'createdAt'],
  })
  .openapi('Order')

const CreateOrderSchema = z
  .object({
    items: z.array(
      z
        .object({ productId: z.int(), quantity: z.int().min(1) })
        .openapi({ required: ['productId', 'quantity'] }),
    ),
    shippingAddress: AddressSchema,
    callbackUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['items', 'shippingAddress'] })
  .openapi('CreateOrder')

const ErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const NotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ErrorSchema } },
}

const PageParamParamsSchema = z
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

const LimitParamParamsSchema = z
  .int()
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } } })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  request: { query: z.object({ page: PageParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ users: z.array(UserSchema), total: z.int() })
            .openapi({ required: ['users', 'total'] }),
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
    body: { content: { 'application/json': { schema: CreateUserSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: UserSchema } } },
  },
  security: [{ BearerAuth: [] }],
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  operationId: 'getUser',
  request: {
    params: z.object({
      userId: z
        .int()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
    404: NotFoundResponse,
  },
})

export const putUsersUserIdRoute = createRoute({
  method: 'put',
  path: '/users/{userId}',
  operationId: 'updateUser',
  request: {
    params: z.object({
      userId: z
        .int()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: { content: { 'application/json': { schema: UpdateUserSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserSchema } } },
  },
  security: [{ BearerAuth: [] }],
})

export const deleteUsersUserIdRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}',
  operationId: 'deleteUser',
  request: {
    params: z.object({
      userId: z
        .int()
        .openapi({
          param: { name: 'userId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
  security: [{ BearerAuth: [] }],
})

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  operationId: 'listProducts',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
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
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ products: z.array(ProductSchema), total: z.int() })
            .openapi({ required: ['products', 'total'] }),
        },
      },
    },
  },
})

export const postProductsRoute = createRoute({
  method: 'post',
  path: '/products',
  operationId: 'createProduct',
  request: {
    body: { content: { 'application/json': { schema: CreateProductSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: ProductSchema } } },
  },
  security: [{ BearerAuth: [] }],
})

export const getProductsProductIdRoute = createRoute({
  method: 'get',
  path: '/products/{productId}',
  operationId: 'getProduct',
  request: {
    params: z.object({
      productId: z
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ProductSchema } } },
    404: NotFoundResponse,
  },
})

export const putProductsProductIdRoute = createRoute({
  method: 'put',
  path: '/products/{productId}',
  operationId: 'updateProduct',
  request: {
    params: z.object({
      productId: z
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: { content: { 'application/json': { schema: UpdateProductSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ProductSchema } } },
  },
  security: [{ BearerAuth: [] }],
})

export const getProductsProductIdReviewsRoute = createRoute({
  method: 'get',
  path: '/products/{productId}/reviews',
  operationId: 'listReviews',
  request: {
    params: z.object({
      productId: z
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(ReviewSchema) } } },
  },
})

export const postProductsProductIdReviewsRoute = createRoute({
  method: 'post',
  path: '/products/{productId}/reviews',
  operationId: 'createReview',
  request: {
    params: z.object({
      productId: z
        .int()
        .openapi({
          param: { name: 'productId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    body: { content: { 'application/json': { schema: CreateReviewSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: ReviewSchema } } },
  },
  security: [{ BearerAuth: [] }],
})

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  operationId: 'listOrders',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
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
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ orders: z.array(OrderSchema), total: z.int() })
            .openapi({ required: ['orders', 'total'] }),
        },
      },
    },
  },
  security: [{ BearerAuth: [] }],
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  operationId: 'createOrder',
  request: {
    body: { content: { 'application/json': { schema: CreateOrderSchema } }, required: true },
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: OrderSchema } } },
  },
  security: [{ BearerAuth: [] }],
})

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  operationId: 'getOrder',
  request: {
    params: z.object({
      orderId: z
        .int()
        .openapi({
          param: { name: 'orderId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: OrderSchema } } },
    404: NotFoundResponse,
  },
  security: [{ BearerAuth: [] }],
})

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  operationId: 'listCategories',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(CategorySchema) } },
    },
  },
})

export const postUploadImageRoute = createRoute({
  method: 'post',
  path: '/upload/image',
  operationId: 'uploadImage',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ image: z.file(), alt: z.string().exactOptional() })
            .openapi({ required: ['image'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ url: z.url(), width: z.int(), height: z.int() })
            .openapi({ required: ['url', 'width', 'height'] }),
        },
      },
    },
  },
  security: [{ BearerAuth: [] }],
})

function mockAddress() {
  return {
    street: faker.string.alpha({ length: { min: 5, max: 20 } }),
    city: faker.location.city(),
    state: faker.helpers.arrayElement([faker.location.state(), undefined]),
    zip: faker.helpers.arrayElement([faker.location.zipCode(), undefined]),
    country: faker.location.country(),
  }
}

function mockUser() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['admin', 'customer'] as const),
    address: faker.helpers.arrayElement([mockAddress(), undefined]),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockCategory() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    parentId: faker.helpers.arrayElement([undefined, undefined]),
  }
}

function mockProduct() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    name: faker.person.fullName(),
    description: faker.helpers.arrayElement([faker.lorem.paragraph(), undefined]),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    category: mockCategory(),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.string.alpha({ length: { min: 5, max: 20 } }),
      ),
      undefined,
    ]),
    inStock: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockReview() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
    author: mockUser(),
    createdAt: faker.date.past().toISOString(),
  }
}

function mockOrderItem() {
  return {
    product: mockProduct(),
    quantity: faker.number.int({ min: 1, max: 100 }),
    price: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
  }
}

function mockOrder() {
  return {
    id: faker.number.int({ min: 1, max: 99999 }),
    user: mockUser(),
    items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockOrderItem()),
    status: faker.helpers.arrayElement([
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ] as const),
    totalPrice: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    shippingAddress: mockAddress(),
    createdAt: faker.date.past().toISOString(),
  }
}

const getUsersRouteHandler = async (c: any) => {
  return c.json(
    {
      users: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postUsersRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUser(), 201)
}

const getUsersUserIdRouteHandler = async (c: any) => {
  return c.json(mockUser(), 200)
}

const putUsersUserIdRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockUser(), 200)
}

const deleteUsersUserIdRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.body(null, 204)
}

const getProductsRouteHandler = async (c: any) => {
  return c.json(
    {
      products: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockProduct()),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postProductsRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockProduct(), 201)
}

const getProductsProductIdRouteHandler = async (c: any) => {
  return c.json(mockProduct(), 200)
}

const putProductsProductIdRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockProduct(), 200)
}

const getProductsProductIdReviewsRouteHandler = async (c: any) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockReview()),
    200,
  )
}

const postProductsProductIdReviewsRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockReview(), 201)
}

const getOrdersRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(
    {
      orders: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockOrder()),
      total: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const postOrdersRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockOrder(), 201)
}

const getOrdersOrderIdRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(mockOrder(), 200)
}

const getCategoriesRouteHandler = async (c: any) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockCategory()),
    200,
  )
}

const postUploadImageRouteHandler = async (c: any) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(
    {
      url: faker.internet.url(),
      width: faker.number.int({ min: 1, max: 1000 }),
      height: faker.number.int({ min: 1, max: 1000 }),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)
  .openapi(getUsersUserIdRoute, getUsersUserIdRouteHandler)
  .openapi(putUsersUserIdRoute, putUsersUserIdRouteHandler)
  .openapi(deleteUsersUserIdRoute, deleteUsersUserIdRouteHandler)
  .openapi(getProductsRoute, getProductsRouteHandler)
  .openapi(postProductsRoute, postProductsRouteHandler)
  .openapi(getProductsProductIdRoute, getProductsProductIdRouteHandler)
  .openapi(putProductsProductIdRoute, putProductsProductIdRouteHandler)
  .openapi(getProductsProductIdReviewsRoute, getProductsProductIdReviewsRouteHandler)
  .openapi(postProductsProductIdReviewsRoute, postProductsProductIdReviewsRouteHandler)
  .openapi(getOrdersRoute, getOrdersRouteHandler)
  .openapi(postOrdersRoute, postOrdersRouteHandler)
  .openapi(getOrdersOrderIdRoute, getOrdersOrderIdRouteHandler)
  .openapi(getCategoriesRoute, getCategoriesRouteHandler)
  .openapi(postUploadImageRoute, postUploadImageRouteHandler)

export type AppType = typeof api

export default app
