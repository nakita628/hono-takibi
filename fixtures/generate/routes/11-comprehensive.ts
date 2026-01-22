import { createRoute, z } from '@hono/zod-openapi'

const ProductCategorySchema = z
  .enum(['electronics', 'clothing', 'books', 'home', 'sports', 'toys'])
  .openapi({ description: 'Product category' })
  .openapi('ProductCategory')

const MoneySchema = z
  .object({
    amount: z.float64().min(0).multipleOf(0.01),
    currency: z
      .string()
      .regex(/^[A-Z]{3}$/)
      .openapi({ example: 'USD' }),
  })
  .openapi({ required: ['amount', 'currency'] })
  .openapi('Money')

const AddressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string().exactOptional(),
    postalCode: z.string().exactOptional(),
    country: z.string().length(2),
  })
  .openapi({ required: ['street', 'city', 'country'] })
  .openapi('Address')

const ProductSchema = z
  .object({
    id: z.uuid().openapi({ readOnly: true }),
    sku: z
      .string()
      .regex(/^[A-Z]{2}-[0-9]{6}$/)
      .exactOptional(),
    name: z.string().min(1).max(200),
    description: z.string().max(5000).exactOptional(),
    price: MoneySchema,
    category: ProductCategorySchema,
    tags: z.array(z.string()).max(10).exactOptional(),
    inventory: z.int32().min(0).exactOptional(),
    images: z.array(z.url()).max(10).exactOptional(),
    metadata: z.record(z.string(), z.string()).exactOptional(),
    status: z.enum(['draft', 'active', 'archived']).default('draft').exactOptional(),
    createdAt: z.iso.datetime().exactOptional().openapi({ readOnly: true }),
    updatedAt: z.iso.datetime().exactOptional().openapi({ readOnly: true }),
  })
  .openapi({
    required: ['id', 'name', 'price', 'category'],
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      sku: 'EL-123456',
      name: 'Wireless Headphones',
      price: { amount: 99.99, currency: 'USD' },
      category: 'electronics',
    },
  })
  .openapi('Product')

const PaginationSchema = z
  .object({
    page: z.int32().min(1),
    limit: z.int32().min(1).max(100),
    total: z.int64(),
    totalPages: z.int32(),
    hasNext: z.boolean().exactOptional(),
    hasPrevious: z.boolean().exactOptional(),
  })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const ProductListSchema = z
  .object({ items: z.array(ProductSchema), pagination: PaginationSchema })
  .openapi({ required: ['items', 'pagination'] })
  .openapi('ProductList')

const CreateProductInputSchema = z
  .object({
    sku: z
      .string()
      .regex(/^[A-Z]{2}-[0-9]{6}$/)
      .exactOptional(),
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    price: MoneySchema,
    category: ProductCategorySchema,
    tags: z.array(z.string()).exactOptional(),
    inventory: z.int().min(0).default(0).exactOptional(),
    images: z.array(z.url()).exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'category'] })
  .openapi('CreateProductInput')

const UpdateProductInputSchema = CreateProductInputSchema.and(
  z.object({ status: z.enum(['draft', 'active', 'archived']).exactOptional() }),
).openapi('UpdateProductInput')

const OrderItemSchema = z
  .object({
    productId: z.uuid(),
    productName: z.string().exactOptional(),
    quantity: z.int32().min(1),
    price: MoneySchema,
  })
  .openapi({ required: ['productId', 'quantity', 'price'] })
  .openapi('OrderItem')

const OrderSchema = z
  .object({
    id: z.uuid(),
    customerId: z.uuid(),
    items: z.array(OrderItemSchema).min(1),
    status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
    total: MoneySchema,
    shippingAddress: AddressSchema.exactOptional(),
    billingAddress: AddressSchema.exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'customerId', 'items', 'status', 'total'] })
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
    billingAddress: AddressSchema.exactOptional(),
    callbackUrl: z.url().exactOptional().openapi({ description: 'URL for order status webhooks' }),
  })
  .openapi({ required: ['items', 'shippingAddress'] })
  .openapi('CreateOrderInput')

const WebhookSchema = z
  .object({
    id: z.uuid(),
    url: z.url(),
    events: z.array(
      z.enum([
        'product.created',
        'product.updated',
        'product.deleted',
        'order.created',
        'order.updated',
        'order.shipped',
        'order.delivered',
      ]),
    ),
    secret: z.string().exactOptional().openapi({ writeOnly: true }),
    status: z.enum(['active', 'inactive']).exactOptional(),
  })
  .openapi({ required: ['id', 'url', 'events'] })
  .openapi('Webhook')

const WebhookPayloadSchema = z
  .object({
    id: z.uuid(),
    event: z.string(),
    timestamp: z.iso.datetime(),
    data: z.object({}),
    signature: z.string().exactOptional(),
  })
  .openapi({ required: ['id', 'event', 'timestamp', 'data'] })
  .openapi('WebhookPayload')

const ErrorDetailSchema = z
  .object({
    code: z.string().exactOptional(),
    message: z.string().exactOptional(),
    target: z.string().exactOptional(),
  })
  .openapi('ErrorDetail')

const ErrorSchema = z
  .object({
    code: z.string(),
    message: z.string(),
    target: z.string().exactOptional(),
    details: z.array(ErrorDetailSchema).exactOptional(),
    traceId: z.uuid().exactOptional(),
  })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const ProductIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'productId',
      in: 'path',
      required: true,
      description: 'Product unique identifier',
      examples: { valid: { value: '550e8400-e29b-41d4-a716-446655440000' } },
    },
  })

const PageParamParamsSchema = z
  .int32()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', description: 'Page number (1-indexed)' } })

const LimitParamParamsSchema = z
  .int32()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query', description: 'Items per page' } })

const SearchParamParamsSchema = z
  .string()
  .min(1)
  .max(200)
  .exactOptional()
  .openapi({ param: { name: 'q', in: 'query', description: 'Search query' } })

const AcceptLanguageHeaderParamsSchema = z
  .string()
  .default('en-US')
  .exactOptional()
  .openapi({ param: { name: 'Accept-Language', in: 'header', description: 'Preferred language' } })

const IfMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-Match',
      in: 'header',
      description: 'ETag for optimistic concurrency',
      required: false,
    },
  })

const IfNoneMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-None-Match',
      in: 'header',
      description: 'ETag for cache validation',
      required: false,
    },
  })

const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT authentication token',
}

const ApiKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'X-API-Key',
  description: 'API key for server-to-server communication',
}

const Oauth2SecurityScheme = {
  type: 'oauth2',
  description: 'OAuth 2.0 authentication',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://auth.example.com/authorize',
      tokenUrl: 'https://auth.example.com/token',
      refreshUrl: 'https://auth.example.com/refresh',
      scopes: {
        'products:read': 'Read product information',
        'products:write': 'Create and update products',
        'orders:read': 'Read order information',
        'orders:write': 'Create and manage orders',
        admin: 'Full administrative access',
      },
    },
    clientCredentials: {
      tokenUrl: 'https://auth.example.com/token',
      scopes: {
        'products:read': 'Read product information',
        'orders:read': 'Read order information',
      },
    },
  },
}

const CreateProductRequestBody = {
  description: 'Product creation request',
  content: {
    'application/json': {
      schema: CreateProductInputSchema,
      examples: {
        electronics: {
          summary: 'Electronics product',
          value: {
            sku: 'EL-789012',
            name: 'Smart Watch',
            description: 'Fitness tracking smartwatch',
            price: { amount: 299.99, currency: 'USD' },
            category: 'electronics',
            tags: ['wearable', 'fitness'],
            inventory: 50,
          },
        },
      },
    },
  },
  required: true,
}

const UpdateProductRequestBody = {
  description: 'Product update request',
  content: { 'application/json': { schema: UpdateProductInputSchema } },
  required: true,
}

const CreateOrderRequestBody = {
  description: 'Order creation request',
  content: {
    'application/json': {
      schema: CreateOrderInputSchema,
      examples: {
        simpleOrder: {
          summary: 'Simple order',
          value: {
            items: [{ productId: '550e8400-e29b-41d4-a716-446655440000', quantity: 2 }],
            shippingAddress: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              postalCode: '10001',
              country: 'US',
            },
          },
        },
      },
    },
  },
  required: true,
}

const CreateWebhookRequestBody = {
  description: 'Webhook registration request',
  content: {
    'application/json': {
      schema: z
        .object({ url: z.url(), events: z.array(z.string()), secret: z.string().exactOptional() })
        .openapi({ required: ['url', 'events'] }),
    },
  },
  required: true,
}

const XRequestIDHeaderSchema = z
  .uuid()
  .openapi({ description: 'Unique request identifier for tracing' })

const ValidationErrorExample = {
  summary: 'Validation error',
  value: {
    code: 'VALIDATION_ERROR',
    message: 'Request validation failed',
    details: [
      { code: 'REQUIRED', message: 'Name is required', target: 'name' },
      { code: 'INVALID_FORMAT', message: 'Price must be positive', target: 'price.amount' },
    ],
  },
}

const BadRequestResponse = {
  description: 'Bad request - invalid parameters',
  headers: z.object({ 'X-Request-ID': XRequestIDHeaderSchema }),
  content: {
    'application/json': {
      schema: ErrorSchema,
      examples: { validationError: ValidationErrorExample },
    },
  },
}

const UnauthorizedResponse = {
  description: 'Authentication required',
  headers: z.object({
    'WWW-Authenticate': {
      schema: z.string().exactOptional().openapi({ example: 'Bearer realm="api"' }),
    },
  }),
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'UNAUTHORIZED', message: 'Authentication required' },
    },
  },
}

const ForbiddenResponse = {
  description: 'Insufficient permissions',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
    },
  },
}

const NotFoundResponse = {
  description: 'Resource not found',
  headers: z.object({ 'X-Request-ID': XRequestIDHeaderSchema }),
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'NOT_FOUND', message: 'Resource not found' },
    },
  },
}

const ConflictResponse = {
  description: 'Resource conflict',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'CONFLICT', message: 'Resource already exists' },
    },
  },
}

const PreconditionFailedResponse = {
  description: 'Precondition failed (ETag mismatch)',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'PRECONDITION_FAILED', message: 'ETag mismatch' },
    },
  },
}

const XRateLimitLimitHeaderSchema = z
  .int32()
  .exactOptional()
  .openapi({ description: 'Maximum requests per window' })

const XRateLimitRemainingHeaderSchema = z
  .int32()
  .exactOptional()
  .openapi({ description: 'Remaining requests in window' })

const XRateLimitResetHeaderSchema = z
  .int64()
  .exactOptional()
  .openapi({ description: 'Unix timestamp when limit resets' })

const TooManyRequestsResponse = {
  description: 'Rate limit exceeded',
  headers: z.object({
    'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
    'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
    'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
    'Retry-After': {
      schema: z.int().exactOptional().openapi({ description: 'Seconds until retry' }),
    },
  }),
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'RATE_LIMITED', message: 'Too many requests' },
    },
  },
}

const InternalErrorResponse = {
  description: 'Internal server error',
  headers: z.object({ 'X-Request-ID': XRequestIDHeaderSchema }),
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
    },
  },
}

const XTotalCountHeaderSchema = z
  .int64()
  .exactOptional()
  .openapi({ description: 'Total number of items' })

const ETagHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({ description: 'Entity tag for caching' })

const CacheControlHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({ description: 'Caching directives', example: 'max-age=3600, must-revalidate' })

const LocationHeaderSchema = z
  .url()
  .exactOptional()
  .openapi({ description: 'URL of created resource' })

const LinkHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({
    description: 'Pagination links (RFC 5988)',
    example: '<https://api.example.com/products?page=2>; rel="next"',
  })

const ProductExample = {
  summary: 'Example product',
  value: {
    id: '550e8400-e29b-41d4-a716-446655440000',
    sku: 'EL-123456',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: { amount: 199.99, currency: 'USD' },
    category: 'electronics',
    tags: ['wireless', 'bluetooth', 'audio'],
    inventory: 150,
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
}

const ProductListExample = {
  summary: 'Product list with pagination',
  value: {
    items: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Wireless Headphones',
        price: { amount: 199.99, currency: 'USD' },
        category: 'electronics',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Running Shoes',
        price: { amount: 129.99, currency: 'USD' },
        category: 'sports',
      },
    ],
    pagination: {
      page: 1,
      limit: 20,
      total: 150,
      totalPages: 8,
      hasNext: true,
      hasPrevious: false,
    },
  },
}

const EmptyProductListExample = {
  summary: 'Empty product list',
  value: {
    items: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasNext: false, hasPrevious: false },
  },
}

const GetProductByIdLink = {
  operationId: 'getProduct',
  parameters: { productId: '$response.body#/id' },
  description: 'Get the created product',
}

const UpdateProductByIdLink = {
  operationId: 'updateProduct',
  parameters: { productId: '$response.body#/id' },
  description: 'Update this product',
}

const DeleteProductByIdLink = {
  operationId: 'deleteProduct',
  parameters: { productId: '$response.body#/id' },
  description: 'Delete this product',
}

const GetProductReviewsLink = {
  operationRef: '#/paths/~1products~1{productId}~1reviews/get',
  parameters: { productId: '$response.body#/id' },
  description: 'Get reviews for this product',
}

const GetOrderByIdLink = {
  operationId: 'getOrder',
  parameters: { orderId: '$response.body#/id' },
  description: 'Get the created order',
}

const CancelOrderByIdLink = {
  operationId: 'cancelOrder',
  parameters: { orderId: '$response.body#/id' },
  description: 'Cancel this order',
}

const OrderStatusCallback = {
  '{$request.body#/callbackUrl}/status': {
    post: {
      summary: 'Order status update notification',
      operationId: 'onOrderStatusChange',
      requestBody: {
        content: {
          'application/json': {
            schema: z
              .object({
                orderId: z.uuid(),
                status: z.enum(['confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
                previousStatus: z.string().exactOptional(),
                timestamp: z.iso.datetime(),
                trackingNumber: z.string().exactOptional(),
              })
              .openapi({ required: ['orderId', 'status', 'timestamp'] }),
          },
        },
      },
      responses: {
        200: { description: 'Callback acknowledged' },
        410: { description: 'Callback URL no longer valid' },
      },
    },
  },
}

const PaymentCallback = {
  '{$request.body#/callbackUrl}/payment': {
    post: {
      summary: 'Payment event notification',
      operationId: 'onPaymentEvent',
      requestBody: {
        content: {
          'application/json': {
            schema: z
              .object({
                orderId: z.uuid(),
                paymentStatus: z.enum(['pending', 'completed', 'failed', 'refunded']),
                amount: MoneySchema.exactOptional(),
                transactionId: z.string().exactOptional(),
              })
              .openapi({ required: ['orderId', 'paymentStatus'] }),
          },
        },
      },
      responses: { 200: { description: 'Callback acknowledged' } },
    },
  },
}

const GenericWebhookCallback = {
  '{$request.body#/url}': {
    post: {
      summary: 'Webhook event delivery',
      operationId: 'onWebhookEvent',
      requestBody: { content: { 'application/json': { schema: WebhookPayloadSchema } } },
      responses: {
        200: { description: 'Webhook received' },
        401: { description: 'Invalid signature' },
        410: { description: 'Webhook URL no longer valid' },
      },
    },
  },
}

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  summary: 'List all products',
  description: 'Retrieve a paginated list of products with optional filtering',
  operationId: 'listProducts',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      q: SearchParamParamsSchema,
      category: ProductCategorySchema.exactOptional().openapi({
        param: { name: 'category', in: 'query' },
      }),
    }),
    headers: z.object({ 'Accept-Language': AcceptLanguageHeaderParamsSchema }),
  },
  responses: {
    200: {
      description: 'Product list retrieved successfully',
      headers: z.object({
        'X-Request-ID': XRequestIDHeaderSchema,
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-Total-Count': XTotalCountHeaderSchema,
        Link: LinkHeaderSchema,
      }),
      content: {
        'application/json': {
          schema: ProductListSchema,
          examples: { multipleProducts: ProductListExample, emptyList: EmptyProductListExample },
        },
      },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
    429: TooManyRequestsResponse,
    500: InternalErrorResponse,
  },
})

export const postProductsRoute = createRoute({
  method: 'post',
  path: '/products',
  tags: ['Products'],
  summary: 'Create a new product',
  operationId: 'createProduct',
  request: { body: CreateProductRequestBody },
  responses: {
    201: {
      description: 'Product created successfully',
      headers: z.object({ Location: LocationHeaderSchema, 'X-Request-ID': XRequestIDHeaderSchema }),
      content: {
        'application/json': { schema: ProductSchema, examples: { createdProduct: ProductExample } },
      },
      links: {
        GetProduct: GetProductByIdLink,
        UpdateProduct: UpdateProductByIdLink,
        DeleteProduct: DeleteProductByIdLink,
      },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    409: ConflictResponse,
  },
  security: [{ bearerAuth: [] }, { oauth2: ['products:write'] }],
})

export const getProductsProductIdRoute = createRoute({
  method: 'get',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: 'Get product by ID',
  operationId: 'getProduct',
  request: {
    params: z.object({ productId: ProductIdPathParamsSchema }),
    headers: z.object({ 'If-None-Match': IfNoneMatchHeaderParamsSchema }),
  },
  responses: {
    200: {
      description: 'Product details',
      headers: z.object({
        ETag: ETagHeaderSchema,
        'Cache-Control': CacheControlHeaderSchema,
        'X-Request-ID': XRequestIDHeaderSchema,
      }),
      content: {
        'application/json': { schema: ProductSchema, examples: { product: ProductExample } },
      },
      links: {
        UpdateProduct: UpdateProductByIdLink,
        DeleteProduct: DeleteProductByIdLink,
        GetProductReviews: GetProductReviewsLink,
      },
    },
    304: { description: 'Not modified', headers: z.object({ ETag: ETagHeaderSchema }) },
    404: NotFoundResponse,
  },
})

export const putProductsProductIdRoute = createRoute({
  method: 'put',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: 'Update a product',
  operationId: 'updateProduct',
  request: {
    params: z.object({ productId: ProductIdPathParamsSchema }),
    headers: z.object({ 'If-Match': IfMatchHeaderParamsSchema }),
    body: UpdateProductRequestBody,
  },
  responses: {
    200: {
      description: 'Product updated',
      headers: z.object({ ETag: ETagHeaderSchema, 'X-Request-ID': XRequestIDHeaderSchema }),
      content: { 'application/json': { schema: ProductSchema } },
    },
    404: NotFoundResponse,
    409: ConflictResponse,
    412: PreconditionFailedResponse,
  },
})

export const deleteProductsProductIdRoute = createRoute({
  method: 'delete',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: 'Delete a product',
  operationId: 'deleteProduct',
  request: {
    params: z.object({ productId: ProductIdPathParamsSchema }),
    headers: z.object({ 'If-Match': IfMatchHeaderParamsSchema }),
  },
  responses: {
    204: {
      description: 'Product deleted',
      headers: z.object({ 'X-Request-ID': XRequestIDHeaderSchema }),
    },
    404: NotFoundResponse,
    412: PreconditionFailedResponse,
  },
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create a new order',
  operationId: 'createOrder',
  request: { body: CreateOrderRequestBody },
  responses: {
    201: {
      description: 'Order created',
      content: { 'application/json': { schema: OrderSchema } },
      links: { GetOrder: GetOrderByIdLink, CancelOrder: CancelOrderByIdLink },
    },
  },
  orderStatusUpdate: OrderStatusCallback,
  paymentConfirmation: PaymentCallback,
})

export const postWebhooksRoute = createRoute({
  method: 'post',
  path: '/webhooks',
  tags: ['Webhooks'],
  summary: 'Register a webhook endpoint',
  operationId: 'registerWebhook',
  request: { body: CreateWebhookRequestBody },
  responses: {
    201: {
      description: 'Webhook registered',
      content: { 'application/json': { schema: WebhookSchema } },
    },
  },
  webhookEvent: GenericWebhookCallback,
})
