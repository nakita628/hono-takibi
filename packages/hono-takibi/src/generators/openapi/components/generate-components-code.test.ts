import { describe, expect, it } from 'vitest'
import { Components } from '../../../types'
import { generateComponentsCode } from './generate-components-code'

const generateComponentsCodeTestCases: {
  input: Components
  expected: string
}[] = [
  {
    input: {
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
    expected: `const Product = z.object({id: z.string().uuid().optional(),name: z.string(),description: z.string().optional(),price: z.number(),category: z.string(),stock: z.number().int().optional(),tags: z.array(z.string()).optional()})

const OrderItem = z.object({productId: z.string().uuid(),quantity: z.number().int(),price: z.number().optional()})

const Order = z.object({id: z.string().uuid().optional(),userId: z.string().uuid(),products: z.array(OrderItem),total: z.number(),status: z.enum(["pending","shipped","delivered","cancelled"]).optional(),createdAt: z.string().datetime().optional(),updatedAt: z.string().datetime().optional()})

const User = z.object({id: z.string().uuid().optional(),username: z.string(),email: z.string().email(),firstName: z.string().optional(),lastName: z.string().optional(),address: z.string().optional(),phone: z.string().optional(),createdAt: z.string().datetime().optional(),updatedAt: z.string().datetime().optional()})

export const schemas = {
  Product,
  OrderItem,
  Order,
  User
}`,
  },
]

describe('generateComponentsCode', () => {
  it.concurrent.each(generateComponentsCodeTestCases)(
    'generateComponentsCode($input) -> $expected',
    async ({ input, expected }) => {
      const result = generateComponentsCode(input)
      expect(result).toBe(expected)
    },
  )
})
