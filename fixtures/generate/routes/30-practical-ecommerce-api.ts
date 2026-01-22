import { createRoute, z } from '@hono/zod-openapi'

const CategorySchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    slug: z.string().exactOptional(),
    description: z.string().exactOptional(),
    parentId: z.uuid().exactOptional(),
    imageUrl: z.url().exactOptional(),
    productCount: z.int().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('Category')

const ProductImageSchema = z
  .object({
    id: z.string(),
    url: z.url(),
    altText: z.string().exactOptional(),
    isPrimary: z.boolean().exactOptional(),
    sortOrder: z.int().exactOptional(),
  })
  .openapi({ required: ['id', 'url'] })
  .openapi('ProductImage')

const InventorySchema = z
  .object({
    quantity: z.int().min(0),
    reservedQuantity: z.int().min(0).exactOptional(),
    status: z.enum(['in_stock', 'low_stock', 'out_of_stock']),
    lowStockThreshold: z.int().exactOptional(),
    trackInventory: z.boolean().exactOptional(),
  })
  .openapi({ required: ['quantity', 'status'] })
  .openapi('Inventory')

const ProductSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    compareAtPrice: z.number().min(0).exactOptional().openapi({ description: '割引前価格' }),
    sku: z.string().exactOptional(),
    barcode: z.string().exactOptional(),
    category: CategorySchema.exactOptional(),
    images: z.array(ProductImageSchema).exactOptional(),
    status: z.enum(['draft', 'active', 'archived']),
    inventory: InventorySchema.exactOptional(),
    attributes: z.record(z.string(), z.string()).exactOptional(),
    tags: z.array(z.string()).exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'price', 'status'] })
  .openapi('Product')

const CartItemSchema = z
  .object({
    id: z.string(),
    product: ProductSchema,
    quantity: z.int().min(1),
    price: z.number(),
    total: z.number(),
  })
  .openapi({ required: ['id', 'product', 'quantity', 'price', 'total'] })
  .openapi('CartItem')

const CartSchema = z
  .object({
    id: z.string(),
    items: z.array(CartItemSchema),
    subtotal: z.number(),
    discount: z.number().exactOptional(),
    tax: z.number().exactOptional(),
    shipping: z.number().exactOptional(),
    total: z.number(),
    itemCount: z.int().exactOptional(),
  })
  .openapi({ required: ['id', 'items', 'subtotal', 'total'] })
  .openapi('Cart')

const OrderItemSchema = z
  .object({
    id: z.string(),
    productId: z.uuid(),
    productName: z.string(),
    sku: z.string().exactOptional(),
    quantity: z.int(),
    price: z.number(),
    total: z.number(),
    imageUrl: z.url().exactOptional(),
  })
  .openapi({ required: ['id', 'productId', 'productName', 'quantity', 'price', 'total'] })
  .openapi('OrderItem')

const AddressSchema = z
  .object({
    name: z.string(),
    postalCode: z.string(),
    prefecture: z.string(),
    city: z.string(),
    address1: z.string(),
    address2: z.string().exactOptional(),
    phone: z.string().exactOptional(),
  })
  .openapi({ required: ['name', 'postalCode', 'prefecture', 'city', 'address1'] })
  .openapi('Address')

const OrderSchema = z
  .object({
    id: z.uuid(),
    orderNumber: z.string(),
    status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
    items: z.array(OrderItemSchema),
    subtotal: z.number().exactOptional(),
    discount: z.number().exactOptional(),
    tax: z.number().exactOptional(),
    shipping: z.number().exactOptional(),
    total: z.number(),
    shippingAddress: AddressSchema.exactOptional(),
    billingAddress: AddressSchema.exactOptional(),
    paymentMethod: z.string().exactOptional(),
    paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).exactOptional(),
    notes: z.string().exactOptional(),
    trackingNumber: z.string().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'orderNumber', 'status', 'items', 'total', 'createdAt'] })
  .openapi('Order')

const CreateProductRequestSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    compareAtPrice: z.number().min(0).exactOptional(),
    sku: z.string().exactOptional(),
    barcode: z.string().exactOptional(),
    categoryId: z.uuid().exactOptional(),
    status: z.enum(['draft', 'active']).default('draft').exactOptional(),
    attributes: z.record(z.string(), z.string()).exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['name', 'price'] })
  .openapi('CreateProductRequest')

const UpdateProductRequestSchema = z
  .object({
    name: z.string().min(1).max(200).exactOptional(),
    description: z.string().exactOptional(),
    price: z.number().min(0).exactOptional(),
    compareAtPrice: z.number().min(0).exactOptional(),
    sku: z.string().exactOptional(),
    barcode: z.string().exactOptional(),
    categoryId: z.uuid().exactOptional(),
    status: z.enum(['draft', 'active', 'archived']).exactOptional(),
    attributes: z.record(z.string(), z.string()).exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi('UpdateProductRequest')

const CreateCategoryRequestSchema = z
  .object({
    name: z.string(),
    slug: z.string().exactOptional(),
    description: z.string().exactOptional(),
    parentId: z.uuid().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateCategoryRequest')

const AddToCartRequestSchema = z
  .object({ productId: z.uuid(), quantity: z.int().min(1).default(1) })
  .openapi({ required: ['productId', 'quantity'] })
  .openapi('AddToCartRequest')

const CreateOrderRequestSchema = z
  .object({
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema.exactOptional(),
    paymentMethod: z.enum(['credit_card', 'bank_transfer', 'convenience_store', 'cod']),
    notes: z.string().exactOptional(),
    couponCode: z.string().exactOptional(),
  })
  .openapi({ required: ['shippingAddress', 'paymentMethod'] })
  .openapi('CreateOrderRequest')

const UpdateInventoryRequestSchema = z
  .object({
    quantity: z.int().min(0).exactOptional(),
    lowStockThreshold: z.int().exactOptional(),
    trackInventory: z.boolean().exactOptional(),
  })
  .openapi('UpdateInventoryRequest')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const ProductListResponseSchema = z
  .object({ data: z.array(ProductSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('ProductListResponse')

const OrderListResponseSchema = z
  .object({ data: z.array(OrderSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('OrderListResponse')

const ErrorSchema = z
  .object({
    code: z.string(),
    message: z.string(),
    details: z
      .array(z.object({ field: z.string().exactOptional(), message: z.string().exactOptional() }))
      .exactOptional(),
  })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const ProductIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'productId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const OrderIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'orderId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
  })

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

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  tags: ['Products'],
  summary: '商品一覧取得',
  operationId: 'listProducts',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      category: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'category',
            in: 'query',
            description: 'カテゴリIDでフィルタ',
            schema: { type: 'string' },
          },
        }),
      minPrice: z.coerce
        .number()
        .min(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'minPrice',
            in: 'query',
            description: '最低価格',
            schema: { type: 'number', minimum: 0 },
          },
        }),
      maxPrice: z.coerce
        .number()
        .min(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'maxPrice',
            in: 'query',
            description: '最高価格',
            schema: { type: 'number', minimum: 0 },
          },
        }),
      inStock: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: {
            name: 'inStock',
            in: 'query',
            description: '在庫ありのみ',
            schema: { type: 'boolean' },
          },
        }),
      search: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'search',
            in: 'query',
            description: 'キーワード検索',
            schema: { type: 'string' },
          },
        }),
      sort: z
        .enum([
          'price:asc',
          'price:desc',
          'name:asc',
          'name:desc',
          'createdAt:desc',
          'popularity:desc',
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'sort',
            in: 'query',
            description: 'ソート順',
            schema: {
              type: 'string',
              enum: [
                'price:asc',
                'price:desc',
                'name:asc',
                'name:desc',
                'createdAt:desc',
                'popularity:desc',
              ],
            },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '商品一覧',
      content: { 'application/json': { schema: ProductListResponseSchema } },
    },
  },
})

export const postProductsRoute = createRoute({
  method: 'post',
  path: '/products',
  tags: ['Products'],
  summary: '商品作成',
  operationId: 'createProduct',
  request: {
    body: {
      content: { 'application/json': { schema: CreateProductRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: ProductSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getProductsProductIdRoute = createRoute({
  method: 'get',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: '商品詳細取得',
  operationId: 'getProduct',
  request: { params: z.object({ productId: ProductIdParamParamsSchema }) },
  responses: {
    200: { description: '商品詳細', content: { 'application/json': { schema: ProductSchema } } },
    404: NotFoundResponse,
  },
})

export const putProductsProductIdRoute = createRoute({
  method: 'put',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: '商品更新',
  operationId: 'updateProduct',
  request: {
    params: z.object({ productId: ProductIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: UpdateProductRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: ProductSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteProductsProductIdRoute = createRoute({
  method: 'delete',
  path: '/products/{productId}',
  tags: ['Products'],
  summary: '商品削除',
  operationId: 'deleteProduct',
  request: { params: z.object({ productId: ProductIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse, 404: NotFoundResponse },
  security: [{ bearerAuth: [] }],
})

export const postProductsProductIdImagesRoute = createRoute({
  method: 'post',
  path: '/products/{productId}/images',
  tags: ['Products'],
  summary: '商品画像アップロード',
  operationId: 'uploadProductImage',
  request: {
    params: z.object({ productId: ProductIdParamParamsSchema }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({ file: z.file(), isPrimary: z.boolean().default(false).exactOptional() })
            .openapi({ required: ['file'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: ProductImageSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  tags: ['Categories'],
  summary: 'カテゴリ一覧取得',
  operationId: 'listCategories',
  responses: {
    200: {
      description: 'カテゴリ一覧',
      content: { 'application/json': { schema: z.array(CategorySchema) } },
    },
  },
})

export const postCategoriesRoute = createRoute({
  method: 'post',
  path: '/categories',
  tags: ['Categories'],
  summary: 'カテゴリ作成',
  operationId: 'createCategory',
  request: {
    body: {
      content: { 'application/json': { schema: CreateCategoryRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: CategorySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getCartRoute = createRoute({
  method: 'get',
  path: '/cart',
  tags: ['Cart'],
  summary: 'カート取得',
  operationId: 'getCart',
  responses: {
    200: { description: 'カート内容', content: { 'application/json': { schema: CartSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteCartRoute = createRoute({
  method: 'delete',
  path: '/cart',
  tags: ['Cart'],
  summary: 'カートをクリア',
  operationId: 'clearCart',
  responses: { 204: { description: 'クリア成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postCartItemsRoute = createRoute({
  method: 'post',
  path: '/cart/items',
  tags: ['Cart'],
  summary: 'カートに商品追加',
  operationId: 'addToCart',
  request: {
    body: { content: { 'application/json': { schema: AddToCartRequestSchema } }, required: true },
  },
  responses: {
    200: { description: '追加成功', content: { 'application/json': { schema: CartSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putCartItemsItemIdRoute = createRoute({
  method: 'put',
  path: '/cart/items/{itemId}',
  tags: ['Cart'],
  summary: 'カートアイテム数量変更',
  operationId: 'updateCartItem',
  request: {
    params: z.object({
      itemId: z
        .string()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ quantity: z.int().min(1) }).openapi({ required: ['quantity'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: CartSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteCartItemsItemIdRoute = createRoute({
  method: 'delete',
  path: '/cart/items/{itemId}',
  tags: ['Cart'],
  summary: 'カートから商品削除',
  operationId: 'removeFromCart',
  request: {
    params: z.object({
      itemId: z
        .string()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: { description: '削除成功', content: { 'application/json': { schema: CartSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  tags: ['Orders'],
  summary: '注文一覧取得',
  operationId: 'listOrders',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      status: z
        .enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'ステータスでフィルタ',
            schema: {
              type: 'string',
              enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
            },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '注文一覧',
      content: { 'application/json': { schema: OrderListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: '注文作成',
  description: 'カートの内容から注文を作成します',
  operationId: 'createOrder',
  request: {
    body: { content: { 'application/json': { schema: CreateOrderRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '注文作成成功', content: { 'application/json': { schema: OrderSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  tags: ['Orders'],
  summary: '注文詳細取得',
  operationId: 'getOrder',
  request: { params: z.object({ orderId: OrderIdParamParamsSchema }) },
  responses: {
    200: { description: '注文詳細', content: { 'application/json': { schema: OrderSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postOrdersOrderIdCancelRoute = createRoute({
  method: 'post',
  path: '/orders/{orderId}/cancel',
  tags: ['Orders'],
  summary: '注文キャンセル',
  operationId: 'cancelOrder',
  request: {
    params: z.object({ orderId: OrderIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            reason: z.string().exactOptional().openapi({ description: 'キャンセル理由' }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'キャンセル成功',
      content: { 'application/json': { schema: OrderSchema } },
    },
    400: {
      description: 'キャンセルできない状態',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getInventoryProductIdRoute = createRoute({
  method: 'get',
  path: '/inventory/{productId}',
  tags: ['Inventory'],
  summary: '在庫情報取得',
  operationId: 'getInventory',
  request: { params: z.object({ productId: ProductIdParamParamsSchema }) },
  responses: {
    200: { description: '在庫情報', content: { 'application/json': { schema: InventorySchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putInventoryProductIdRoute = createRoute({
  method: 'put',
  path: '/inventory/{productId}',
  tags: ['Inventory'],
  summary: '在庫更新',
  operationId: 'updateInventory',
  request: {
    params: z.object({ productId: ProductIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: UpdateInventoryRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: InventorySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
