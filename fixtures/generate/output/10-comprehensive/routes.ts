import { createRoute, z } from '@hono/zod-openapi'

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
