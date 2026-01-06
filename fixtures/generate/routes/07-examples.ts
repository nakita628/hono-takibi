import { createRoute, z } from '@hono/zod-openapi'

const ProductSchema = z
  .object({
    id: z.uuid(),
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    price: z.float64().min(0),
    category: z.enum(['electronics', 'clothing', 'books', 'home']),
    tags: z.array(z.string()).exactOptional(),
    metadata: z.looseObject({}).exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'price', 'category'] })
  .openapi('Product')

const CreateProductInputSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.number().min(0),
    category: z.enum(['electronics', 'clothing', 'books', 'home']),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['name', 'price', 'category'] })
  .openapi('CreateProductInput')

const ValidationErrorSchema = z
  .object({
    code: z.string(),
    message: z.string(),
    errors: z.array(
      z.object({
        field: z.string().exactOptional(),
        message: z.string().exactOptional(),
        code: z.string().exactOptional(),
      }),
    ),
  })
  .openapi({ required: ['code', 'message', 'errors'] })
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
          schema: z.array(ProductSchema),
          examples: {
            electronics: ElectronicProductsExample,
            clothing: ClothingProductsExample,
            empty: EmptyListExample,
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
        'application/json': { schema: ProductSchema, examples: { laptop: LaptopProductExample } },
      },
    },
    400: {
      description: 'Validation error',
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
          examples: {
            missingName: MissingNameErrorExample,
            invalidPrice: InvalidPriceErrorExample,
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
        }),
    }),
  },
  responses: {
    200: {
      description: 'Product details',
      content: {
        'application/json': {
          schema: ProductSchema,
          examples: { laptop: LaptopProductExample, tshirt: TShirtProductExample },
        },
      },
    },
  },
})
