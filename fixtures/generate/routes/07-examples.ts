import { createRoute, z } from '@hono/zod-openapi'

const ProductSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    price: z.float64().min(0).openapi({ type: 'number', format: 'float64', minimum: 0 }),
    category: z
      .enum(['electronics', 'clothing', 'books', 'home'])
      .openapi({ type: 'string', enum: ['electronics', 'clothing', 'books', 'home'] }),
    tags: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    metadata: z
      .looseObject({})
      .exactOptional()
      .openapi({ type: 'object', additionalProperties: true }),
    createdAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'price', 'category'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      price: { type: 'number', format: 'float64', minimum: 0 },
      category: { type: 'string', enum: ['electronics', 'clothing', 'books', 'home'] },
      tags: { type: 'array', items: { type: 'string' } },
      metadata: { type: 'object', additionalProperties: true },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Product')

const CreateProductInputSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    price: z.number().min(0).openapi({ type: 'number', minimum: 0 }),
    category: z
      .enum(['electronics', 'clothing', 'books', 'home'])
      .openapi({ type: 'string', enum: ['electronics', 'clothing', 'books', 'home'] }),
    tags: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'price', 'category'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number', minimum: 0 },
      category: { type: 'string', enum: ['electronics', 'clothing', 'books', 'home'] },
      tags: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('CreateProductInput')

const ValidationErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
    errors: z
      .array(
        z
          .object({
            field: z.string().exactOptional().openapi({ type: 'string' }),
            message: z.string().exactOptional().openapi({ type: 'string' }),
            code: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: {
              field: { type: 'string' },
              message: { type: 'string' },
              code: { type: 'string' },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string' },
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message', 'errors'],
    properties: {
      code: { type: 'string' },
      message: { type: 'string' },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string' },
            message: { type: 'string' },
            code: { type: 'string' },
          },
        },
      },
    },
  })
  .openapi('ValidationError')

const LaptopProductExample = {
  summary: 'Example laptop product',
  description: 'A high-end laptop computer',
  value: {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'MacBook Pro 16"',
    description: 'Apple MacBook Pro with M3 Max chip',
    price: 3499.99,
    category: 'electronics',
    tags: ['laptop', 'apple', 'professional'],
    metadata: { brand: 'Apple', model: 'MacBook Pro', year: 2024 },
    createdAt: '2024-01-15T10:30:00Z',
  },
}

const TShirtProductExample = {
  summary: 'Example t-shirt product',
  description: 'A basic cotton t-shirt',
  value: {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Classic Cotton T-Shirt',
    description: '100% organic cotton t-shirt',
    price: 29.99,
    category: 'clothing',
    tags: ['casual', 'cotton', 'basics'],
    metadata: { material: 'cotton', sizes: ['S', 'M', 'L', 'XL'] },
    createdAt: '2024-02-01T14:00:00Z',
  },
}

const ElectronicProductsExample = {
  summary: 'List of electronic products',
  value: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'MacBook Pro 16"',
      price: 3499.99,
      category: 'electronics',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'iPhone 15 Pro',
      price: 1199.99,
      category: 'electronics',
      createdAt: '2024-01-20T09:00:00Z',
    },
  ],
}

const ClothingProductsExample = {
  summary: 'List of clothing products',
  value: [
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Classic Cotton T-Shirt',
      price: 29.99,
      category: 'clothing',
      createdAt: '2024-02-01T14:00:00Z',
    },
  ],
}

const EmptyListExample = { summary: 'Empty product list', value: [] }

const CreateLaptopExample = {
  summary: 'Create laptop request',
  value: {
    name: 'MacBook Pro 16"',
    description: 'Apple MacBook Pro with M3 Max chip',
    price: 3499.99,
    category: 'electronics',
    tags: ['laptop', 'apple'],
  },
}

const CreateTShirtExample = {
  summary: 'Create t-shirt request',
  value: { name: 'Classic Cotton T-Shirt', price: 29.99, category: 'clothing' },
}

const LaptopProductIdExample = {
  summary: 'Laptop product ID',
  value: '550e8400-e29b-41d4-a716-446655440001',
}

const TShirtProductIdExample = {
  summary: 'T-shirt product ID',
  value: '550e8400-e29b-41d4-a716-446655440002',
}

const MissingNameErrorExample = {
  summary: 'Missing name validation error',
  value: {
    code: 'VALIDATION_ERROR',
    message: 'Request validation failed',
    errors: [{ field: 'name', message: 'Name is required', code: 'REQUIRED' }],
  },
}

const InvalidPriceErrorExample = {
  summary: 'Invalid price validation error',
  value: {
    code: 'VALIDATION_ERROR',
    message: 'Request validation failed',
    errors: [{ field: 'price', message: 'Price must be a positive number', code: 'INVALID_VALUE' }],
  },
}

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  operationId: 'listProducts',
  responses: {
    200: {
      description: 'List of products',
      content: {
        'application/json': {
          schema: z
            .array(ProductSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Product' } }),
          examples: {
            electronics: { $ref: '#/components/examples/ElectronicProducts' },
            clothing: { $ref: '#/components/examples/ClothingProducts' },
            empty: { $ref: '#/components/examples/EmptyList' },
          },
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
    body: {
      content: {
        'application/json': {
          schema: CreateProductInputSchema,
          examples: { laptop: CreateLaptopExample, tshirt: CreateTShirtExample },
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product created',
      content: {
        'application/json': {
          schema: ProductSchema,
          examples: { laptop: { $ref: '#/components/examples/LaptopProduct' } },
        },
      },
    },
    400: {
      description: 'Validation error',
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
          examples: {
            missingName: { $ref: '#/components/examples/MissingNameError' },
            invalidPrice: { $ref: '#/components/examples/InvalidPriceError' },
          },
        },
      },
    },
  },
})

export const getProductsProductIdRoute = createRoute({
  method: 'get',
  path: '/products/{productId}',
  operationId: 'getProduct',
  request: {
    params: z.object({
      productId: z
        .string()
        .openapi({
          param: {
            name: 'productId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            examples: {
              laptop: { $ref: '#/components/examples/LaptopProductId' },
              tshirt: { $ref: '#/components/examples/TShirtProductId' },
            },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Product details',
      content: {
        'application/json': {
          schema: ProductSchema,
          examples: {
            laptop: { $ref: '#/components/examples/LaptopProduct' },
            tshirt: { $ref: '#/components/examples/TShirtProduct' },
          },
        },
      },
    },
  },
})
