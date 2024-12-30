import { describe, expect, it } from 'vitest'
import type { Components } from '../../../types'
import { generateComponentsCode } from './generate-components-code'

const generateComponentsCodeTestCases: {
  components: Components
  expected: string
}[] = [
  // empty
  {
    components: {
      schemas: {},
    },
    expected: '',
  },
  // pet store
  {
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            name: {
              type: 'string',
              example: 'Wireless Mouse',
            },
            description: {
              type: 'string',
              example: 'A high-precision wireless mouse.',
            },
            price: {
              type: 'number',
              format: 'float',
              example: 29.99,
            },
            category: {
              type: 'string',
              example: 'Electronics',
            },
            stock: {
              type: 'integer',
              example: 150,
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['accessories', 'wireless', 'mouse'],
            },
          },
          xml: {
            name: 'product',
          },
        },
        Order: {
          type: 'object',
          required: ['userId', 'products', 'total'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '987e6543-e21b-34d3-a789-426614174111',
            },
            userId: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            products: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem',
              },
            },
            total: {
              type: 'number',
              format: 'float',
              example: 59.98,
            },
            status: {
              type: 'string',
              description: 'Order Status',
              enum: ['pending', 'shipped', 'delivered', 'cancelled'],
              example: 'shipped',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-10T14:48:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-11T10:30:00.000Z',
            },
          },
          xml: {
            name: 'order',
          },
        },
        OrderItem: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            quantity: {
              type: 'integer',
              example: 2,
            },
            price: {
              type: 'number',
              format: 'float',
              example: 29.99,
            },
          },
          xml: {
            name: 'orderItem',
          },
        },
        User: {
          type: 'object',
          required: ['username', 'email'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '321e6547-e89b-12d3-a456-426614174999',
            },
            username: {
              type: 'string',
              example: 'john_doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'Doe',
            },
            address: {
              type: 'string',
              example: '123 Main St, Anytown, USA',
            },
            phone: {
              type: 'string',
              example: '+1-555-1234',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-15T09:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-06-20T16:45:00.000Z',
            },
          },
          xml: {
            name: 'user',
          },
        },
      },
    },
    expected: `const productSchema = z.object({id:z.string().uuid().optional().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}).optional(),name:z.string().optional().openapi({example:"Wireless Mouse"}),description:z.string().optional().openapi({example:"A high-precision wireless mouse."}).optional(),price:z.number().optional().openapi({example:29.99}),category:z.string().optional().openapi({example:"Electronics"}),stock:z.number().int().optional().openapi({example:150}).optional(),tags:z.array(z.string()).optional().openapi({example:["accessories","wireless","mouse"]}).optional()})

const orderItemSchema = z.object({productId:z.string().uuid().optional().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}),quantity:z.number().int().optional().openapi({example:2}),price:z.number().optional().openapi({example:29.99}).optional()})

const orderSchema = z.object({id:z.string().uuid().optional().openapi({example:"987e6543-e21b-34d3-a789-426614174111"}).optional(),userId:z.string().uuid().optional().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}),products:z.array(orderItemSchema),total:z.number().optional().openapi({example:59.98}),status:z.enum(["pending","shipped","delivered","cancelled"]).optional().openapi({example:"shipped"}).optional(),createdAt:z.string().datetime().optional().openapi({example:"2023-10-10T14:48:00.000Z"}).optional(),updatedAt:z.string().datetime().optional().openapi({example:"2023-10-11T10:30:00.000Z"}).optional()})

const userSchema = z.object({id:z.string().uuid().optional().openapi({example:"321e6547-e89b-12d3-a456-426614174999"}).optional(),username:z.string().optional().openapi({example:"john_doe"}),email:z.string().email().optional().openapi({example:"john.doe@example.com"}),firstName:z.string().optional().openapi({example:"John"}).optional(),lastName:z.string().optional().openapi({example:"Doe"}).optional(),address:z.string().optional().openapi({example:"123 Main St, Anytown, USA"}).optional(),phone:z.string().optional().openapi({example:"+1-555-1234"}).optional(),createdAt:z.string().datetime().optional().openapi({example:"2023-01-15T09:30:00.000Z"}).optional(),updatedAt:z.string().datetime().optional().openapi({example:"2023-06-20T16:45:00.000Z"}).optional()})

export const schemas = {
productSchema,
orderItemSchema,
orderSchema,
userSchema
}`,
  },
]

describe('generateComponentsCode', () => {
  it.concurrent.each(generateComponentsCodeTestCases)(
    'generateComponentsCode($components) -> $expected',
    async ({ components, expected }) => {
      const result = generateComponentsCode(components)
      expect(result).toBe(expected)
    },
  )
})
