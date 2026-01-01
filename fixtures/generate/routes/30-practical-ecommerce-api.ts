import { createRoute, z } from '@hono/zod-openapi'

const CategorySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    slug: z.string().optional().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    imageUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    productCount: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string' },
      parentId: { type: 'string', format: 'uuid' },
      imageUrl: { type: 'string', format: 'uri' },
      productCount: { type: 'integer' },
    },
  })
  .openapi('Category')

const ProductImageSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    altText: z.string().optional().openapi({ type: 'string' }),
    isPrimary: z.boolean().optional().openapi({ type: 'boolean' }),
    sortOrder: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'url'],
    properties: {
      id: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      altText: { type: 'string' },
      isPrimary: { type: 'boolean' },
      sortOrder: { type: 'integer' },
    },
  })
  .openapi('ProductImage')

const InventorySchema = z
  .object({
    quantity: z.int().min(0).openapi({ type: 'integer', minimum: 0 }),
    reservedQuantity: z.int().min(0).optional().openapi({ type: 'integer', minimum: 0 }),
    status: z
      .enum(['in_stock', 'low_stock', 'out_of_stock'])
      .openapi({ type: 'string', enum: ['in_stock', 'low_stock', 'out_of_stock'] }),
    lowStockThreshold: z.int().optional().openapi({ type: 'integer' }),
    trackInventory: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['quantity', 'status'],
    properties: {
      quantity: { type: 'integer', minimum: 0 },
      reservedQuantity: { type: 'integer', minimum: 0 },
      status: { type: 'string', enum: ['in_stock', 'low_stock', 'out_of_stock'] },
      lowStockThreshold: { type: 'integer' },
      trackInventory: { type: 'boolean' },
    },
  })
  .openapi('Inventory')

const ProductSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    price: z.number().min(0).openapi({ type: 'number', minimum: 0 }),
    compareAtPrice: z
      .number()
      .min(0)
      .optional()
      .openapi({ type: 'number', minimum: 0, description: '割引前価格' }),
    sku: z.string().optional().openapi({ type: 'string' }),
    barcode: z.string().optional().openapi({ type: 'string' }),
    category: CategorySchema,
    images: z
      .array(ProductImageSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ProductImage' } }),
    status: z
      .enum(['draft', 'active', 'archived'])
      .openapi({ type: 'string', enum: ['draft', 'active', 'archived'] }),
    inventory: InventorySchema,
    attributes: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    tags: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'price', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      compareAtPrice: { type: 'number', minimum: 0, description: '割引前価格' },
      sku: { type: 'string' },
      barcode: { type: 'string' },
      category: { $ref: '#/components/schemas/Category' },
      images: { type: 'array', items: { $ref: '#/components/schemas/ProductImage' } },
      status: { type: 'string', enum: ['draft', 'active', 'archived'] },
      inventory: { $ref: '#/components/schemas/Inventory' },
      attributes: { type: 'object', additionalProperties: { type: 'string' } },
      tags: { type: 'array', items: { type: 'string' } },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Product')

const CartItemSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    product: ProductSchema,
    quantity: z.int().min(1).openapi({ type: 'integer', minimum: 1 }),
    price: z.number().openapi({ type: 'number' }),
    total: z.number().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'product', 'quantity', 'price', 'total'],
    properties: {
      id: { type: 'string' },
      product: { $ref: '#/components/schemas/Product' },
      quantity: { type: 'integer', minimum: 1 },
      price: { type: 'number' },
      total: { type: 'number' },
    },
  })
  .openapi('CartItem')

const CartSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    items: z
      .array(CartItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/CartItem' } }),
    subtotal: z.number().openapi({ type: 'number' }),
    discount: z.number().optional().openapi({ type: 'number' }),
    tax: z.number().optional().openapi({ type: 'number' }),
    shipping: z.number().optional().openapi({ type: 'number' }),
    total: z.number().openapi({ type: 'number' }),
    itemCount: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'items', 'subtotal', 'total'],
    properties: {
      id: { type: 'string' },
      items: { type: 'array', items: { $ref: '#/components/schemas/CartItem' } },
      subtotal: { type: 'number' },
      discount: { type: 'number' },
      tax: { type: 'number' },
      shipping: { type: 'number' },
      total: { type: 'number' },
      itemCount: { type: 'integer' },
    },
  })
  .openapi('Cart')

const OrderItemSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    productId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    productName: z.string().openapi({ type: 'string' }),
    sku: z.string().optional().openapi({ type: 'string' }),
    quantity: z.int().openapi({ type: 'integer' }),
    price: z.number().openapi({ type: 'number' }),
    total: z.number().openapi({ type: 'number' }),
    imageUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'productId', 'productName', 'quantity', 'price', 'total'],
    properties: {
      id: { type: 'string' },
      productId: { type: 'string', format: 'uuid' },
      productName: { type: 'string' },
      sku: { type: 'string' },
      quantity: { type: 'integer' },
      price: { type: 'number' },
      total: { type: 'number' },
      imageUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('OrderItem')

const AddressSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    postalCode: z.string().openapi({ type: 'string' }),
    prefecture: z.string().openapi({ type: 'string' }),
    city: z.string().openapi({ type: 'string' }),
    address1: z.string().openapi({ type: 'string' }),
    address2: z.string().optional().openapi({ type: 'string' }),
    phone: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'postalCode', 'prefecture', 'city', 'address1'],
    properties: {
      name: { type: 'string' },
      postalCode: { type: 'string' },
      prefecture: { type: 'string' },
      city: { type: 'string' },
      address1: { type: 'string' },
      address2: { type: 'string' },
      phone: { type: 'string' },
    },
  })
  .openapi('Address')

const OrderSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    orderNumber: z.string().openapi({ type: 'string' }),
    status: z
      .enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
      .openapi({
        type: 'string',
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      }),
    items: z
      .array(OrderItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/OrderItem' } }),
    subtotal: z.number().optional().openapi({ type: 'number' }),
    discount: z.number().optional().openapi({ type: 'number' }),
    tax: z.number().optional().openapi({ type: 'number' }),
    shipping: z.number().optional().openapi({ type: 'number' }),
    total: z.number().openapi({ type: 'number' }),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    paymentMethod: z.string().optional().openapi({ type: 'string' }),
    paymentStatus: z
      .enum(['pending', 'paid', 'failed', 'refunded'])
      .optional()
      .openapi({ type: 'string', enum: ['pending', 'paid', 'failed', 'refunded'] }),
    notes: z.string().optional().openapi({ type: 'string' }),
    trackingNumber: z.string().optional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'orderNumber', 'status', 'items', 'total', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      orderNumber: { type: 'string' },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      },
      items: { type: 'array', items: { $ref: '#/components/schemas/OrderItem' } },
      subtotal: { type: 'number' },
      discount: { type: 'number' },
      tax: { type: 'number' },
      shipping: { type: 'number' },
      total: { type: 'number' },
      shippingAddress: { $ref: '#/components/schemas/Address' },
      billingAddress: { $ref: '#/components/schemas/Address' },
      paymentMethod: { type: 'string' },
      paymentStatus: { type: 'string', enum: ['pending', 'paid', 'failed', 'refunded'] },
      notes: { type: 'string' },
      trackingNumber: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Order')

const CreateProductRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    price: z.number().min(0).openapi({ type: 'number', minimum: 0 }),
    compareAtPrice: z.number().min(0).optional().openapi({ type: 'number', minimum: 0 }),
    sku: z.string().optional().openapi({ type: 'string' }),
    barcode: z.string().optional().openapi({ type: 'string' }),
    categoryId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['draft', 'active'])
      .default('draft')
      .optional()
      .openapi({ type: 'string', enum: ['draft', 'active'], default: 'draft' }),
    attributes: z
      .record(z.string(), z.string().optional().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    tags: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'price'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      compareAtPrice: { type: 'number', minimum: 0 },
      sku: { type: 'string' },
      barcode: { type: 'string' },
      categoryId: { type: 'string', format: 'uuid' },
      status: { type: 'string', enum: ['draft', 'active'], default: 'draft' },
      attributes: { type: 'object', additionalProperties: { type: 'string' } },
      tags: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('CreateProductRequest')

const UpdateProductRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().openapi({ type: 'string' }),
    price: z.number().min(0).openapi({ type: 'number', minimum: 0 }),
    compareAtPrice: z.number().min(0).openapi({ type: 'number', minimum: 0 }),
    sku: z.string().openapi({ type: 'string' }),
    barcode: z.string().openapi({ type: 'string' }),
    categoryId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['draft', 'active', 'archived'])
      .openapi({ type: 'string', enum: ['draft', 'active', 'archived'] }),
    attributes: z
      .record(z.string(), z.string().openapi({ type: 'string' }))
      .openapi({ type: 'object', additionalProperties: { type: 'string' } }),
    tags: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      compareAtPrice: { type: 'number', minimum: 0 },
      sku: { type: 'string' },
      barcode: { type: 'string' },
      categoryId: { type: 'string', format: 'uuid' },
      status: { type: 'string', enum: ['draft', 'active', 'archived'] },
      attributes: { type: 'object', additionalProperties: { type: 'string' } },
      tags: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('UpdateProductRequest')

const CreateCategoryRequestSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    slug: z.string().optional().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    parentId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string' },
      parentId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('CreateCategoryRequest')

const AddToCartRequestSchema = z
  .object({
    productId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    quantity: z.int().min(1).default(1).openapi({ type: 'integer', minimum: 1, default: 1 }),
  })
  .openapi({
    type: 'object',
    required: ['productId', 'quantity'],
    properties: {
      productId: { type: 'string', format: 'uuid' },
      quantity: { type: 'integer', minimum: 1, default: 1 },
    },
  })
  .openapi('AddToCartRequest')

const CreateOrderRequestSchema = z
  .object({
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    paymentMethod: z
      .enum(['credit_card', 'bank_transfer', 'convenience_store', 'cod'])
      .openapi({
        type: 'string',
        enum: ['credit_card', 'bank_transfer', 'convenience_store', 'cod'],
      }),
    notes: z.string().optional().openapi({ type: 'string' }),
    couponCode: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['shippingAddress', 'paymentMethod'],
    properties: {
      shippingAddress: { $ref: '#/components/schemas/Address' },
      billingAddress: { $ref: '#/components/schemas/Address' },
      paymentMethod: {
        type: 'string',
        enum: ['credit_card', 'bank_transfer', 'convenience_store', 'cod'],
      },
      notes: { type: 'string' },
      couponCode: { type: 'string' },
    },
  })
  .openapi('CreateOrderRequest')

const UpdateInventoryRequestSchema = z
  .object({
    quantity: z.int().min(0).openapi({ type: 'integer', minimum: 0 }),
    lowStockThreshold: z.int().openapi({ type: 'integer' }),
    trackInventory: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      quantity: { type: 'integer', minimum: 0 },
      lowStockThreshold: { type: 'integer' },
      trackInventory: { type: 'boolean' },
    },
  })
  .openapi('UpdateInventoryRequest')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer' }),
    limit: z.int().openapi({ type: 'integer' }),
    total: z.int().openapi({ type: 'integer' }),
    totalPages: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total', 'totalPages'],
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
  .openapi('Pagination')

const ProductListResponseSchema = z
  .object({
    data: z
      .array(ProductSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Product' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('ProductListResponse')

const OrderListResponseSchema = z
  .object({
    data: z
      .array(OrderSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Order' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('OrderListResponse')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
    details: z
      .array(
        z
          .object({
            field: z.string().openapi({ type: 'string' }),
            message: z.string().openapi({ type: 'string' }),
          })
          .partial()
          .openapi({
            type: 'object',
            properties: { field: { type: 'string' }, message: { type: 'string' } },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { field: { type: 'string' }, message: { type: 'string' } },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: { type: 'string' },
      message: { type: 'string' },
      details: {
        type: 'array',
        items: {
          type: 'object',
          properties: { field: { type: 'string' }, message: { type: 'string' } },
        },
      },
    },
  })
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
    type: 'string',
    format: 'uuid',
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
    type: 'string',
    format: 'uuid',
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    type: 'integer',
    minimum: 1,
    default: 1,
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
        .optional()
        .openapi({
          param: {
            name: 'category',
            in: 'query',
            description: 'カテゴリIDでフィルタ',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      minPrice: z.coerce
        .number()
        .min(0)
        .optional()
        .openapi({
          param: {
            name: 'minPrice',
            in: 'query',
            description: '最低価格',
            schema: { type: 'number', minimum: 0 },
          },
          type: 'number',
          minimum: 0,
        }),
      maxPrice: z.coerce
        .number()
        .min(0)
        .optional()
        .openapi({
          param: {
            name: 'maxPrice',
            in: 'query',
            description: '最高価格',
            schema: { type: 'number', minimum: 0 },
          },
          type: 'number',
          minimum: 0,
        }),
      inStock: z
        .stringbool()
        .optional()
        .openapi({
          param: {
            name: 'inStock',
            in: 'query',
            description: '在庫ありのみ',
            schema: { type: 'boolean' },
          },
          type: 'boolean',
        }),
      search: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'search',
            in: 'query',
            description: 'キーワード検索',
            schema: { type: 'string' },
          },
          type: 'string',
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
        .optional()
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
          type: 'string',
          enum: [
            'price:asc',
            'price:desc',
            'name:asc',
            'name:desc',
            'createdAt:desc',
            'popularity:desc',
          ],
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
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              file: z.file().openapi({ type: 'string', format: 'binary' }),
              isPrimary: z
                .boolean()
                .default(false)
                .optional()
                .openapi({ type: 'boolean', default: false }),
            })
            .openapi({
              type: 'object',
              required: ['file'],
              properties: {
                file: { type: 'string', format: 'binary' },
                isPrimary: { type: 'boolean', default: false },
              },
            }),
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
      content: {
        'application/json': {
          schema: z
            .array(CategorySchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        },
      },
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ quantity: z.int().min(1).openapi({ type: 'integer', minimum: 1 }) })
            .openapi({
              type: 'object',
              required: ['quantity'],
              properties: { quantity: { type: 'integer', minimum: 1 } },
            }),
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
          type: 'string',
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
        .optional()
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
          type: 'string',
          enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              reason: z.string().openapi({ type: 'string', description: 'キャンセル理由' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { reason: { type: 'string', description: 'キャンセル理由' } },
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
