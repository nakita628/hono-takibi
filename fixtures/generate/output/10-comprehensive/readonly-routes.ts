import { createRoute, z } from '@hono/zod-openapi'

export const AddressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string().exactOptional(),
    zip: z.string().exactOptional(),
    country: z.string(),
  })
  .openapi({ required: ['street', 'city', 'country'] })
  .readonly()
  .openapi('Address')

export const UserSchema = z
  .object({
    id: z.int(),
    name: z.string(),
    email: z.email(),
    role: z.enum(['admin', 'customer']),
    address: AddressSchema.exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'email', 'role', 'createdAt'] })
  .readonly()
  .openapi('User')

export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = z
  .object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8),
    role: z.enum(['admin', 'customer']).exactOptional(),
    address: AddressSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'email', 'password'] })
  .readonly()
  .openapi('CreateUser')

export type CreateUser = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z
  .object({
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
    address: AddressSchema.exactOptional(),
  })
  .readonly()
  .openapi('UpdateUser')

export type UpdateUser = z.infer<typeof UpdateUserSchema>

export type Address = z.infer<typeof AddressSchema>

export const CategorySchema = z
  .object({ id: z.int(), name: z.string(), parentId: z.int().nullable().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Category')

export const ProductSchema = z
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
  .readonly()
  .openapi('Product')

export type Product = z.infer<typeof ProductSchema>

export const CreateProductSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    categoryId: z.int(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'categoryId'] })
  .readonly()
  .openapi('CreateProduct')

export type CreateProduct = z.infer<typeof CreateProductSchema>

export const UpdateProductSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    price: z.number().min(0).exactOptional(),
    categoryId: z.int().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .readonly()
  .openapi('UpdateProduct')

export type UpdateProduct = z.infer<typeof UpdateProductSchema>

export type Category = z.infer<typeof CategorySchema>

export const ReviewSchema = z
  .object({
    id: z.int(),
    rating: z.int().min(1).max(5),
    comment: z.string().exactOptional(),
    author: UserSchema,
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'rating', 'author', 'createdAt'] })
  .readonly()
  .openapi('Review')

export type Review = z.infer<typeof ReviewSchema>

export const CreateReviewSchema = z
  .object({ rating: z.int().min(1).max(5), comment: z.string().exactOptional() })
  .openapi({ required: ['rating'] })
  .readonly()
  .openapi('CreateReview')

export type CreateReview = z.infer<typeof CreateReviewSchema>

export const OrderItemSchema = z
  .object({ product: ProductSchema, quantity: z.int().min(1), price: z.number() })
  .openapi({ required: ['product', 'quantity', 'price'] })
  .readonly()
  .openapi('OrderItem')

export const OrderSchema = z
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
  .readonly()
  .openapi('Order')

export type Order = z.infer<typeof OrderSchema>

export type OrderItem = z.infer<typeof OrderItemSchema>

export const CreateOrderSchema = z
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
  .readonly()
  .openapi('CreateOrder')

export type CreateOrder = z.infer<typeof CreateOrderSchema>

export const ErrorSchema = z
  .object({ code: z.int(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
  .openapi('Error')

export type Error = z.infer<typeof ErrorSchema>

export const NotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

export const PageParamParamsSchema = z
  .int()
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })
  .readonly()

export type PageParamParams = z.infer<typeof PageParamParamsSchema>

export const LimitParamParamsSchema = z
  .int()
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } } })
  .readonly()

export type LimitParamParams = z.infer<typeof LimitParamParamsSchema>

export const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
} as const

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)
