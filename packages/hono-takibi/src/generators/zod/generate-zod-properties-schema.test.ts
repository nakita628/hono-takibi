import { describe, expect, it } from 'vitest'
import type { Schema } from '../../types'
import { generateZodPropertiesSchema } from './generate-zod-properties-schema'

const generateZodPropertiesSchemaTestCases: {
  properties: Record<string, Schema>
  required: string[]
  expected: string
}[] = [
  {
    properties: {
      id: { type: 'integer', format: 'int64', example: 10 },
      petId: { type: 'integer', format: 'int64', example: 198772 },
      quantity: { type: 'integer', format: 'int32', example: 7 },
      shipDate: { type: 'string', format: 'date-time' },
      status: {
        type: 'string',
        description: 'Order Status',
        example: 'approved',
        enum: ['placed', 'approved', 'delivered'],
      },
      complete: { type: 'boolean' },
    },
    required: [],
    expected:
      'z.object({id:z.number().int().optional().openapi({example:10}).optional(),petId:z.number().int().optional().openapi({example:198772}).optional(),quantity:z.number().int().optional().openapi({example:7}).optional(),shipDate:z.string().datetime().optional(),status:z.enum(["placed","approved","delivered"]).optional().openapi({example:"approved"}).optional(),complete:z.boolean().optional()})',
  },
  {
    properties: {
      id: { type: 'integer', format: 'int64', example: 10 },
      petId: { type: 'integer', format: 'int64', example: 198772 },
      quantity: { type: 'integer', format: 'int32', example: 7 },
      shipDate: { type: 'string', format: 'date-time' },
      status: {
        type: 'string',
        description: 'Order Status',
        example: 'approved',
        enum: ['placed', 'approved', 'delivered'],
      },
      complete: { type: 'boolean' },
    },
    required: [],
    expected:
      'z.object({id:z.number().int().optional().openapi({example:10}).optional(),petId:z.number().int().optional().openapi({example:198772}).optional(),quantity:z.number().int().optional().openapi({example:7}).optional(),shipDate:z.string().datetime().optional(),status:z.enum(["placed","approved","delivered"]).optional().openapi({example:"approved"}).optional(),complete:z.boolean().optional()})',
  },
  {
    properties: {
      street: { type: 'string', example: '437 Lytton' },
      city: { type: 'string', example: 'Palo Alto' },
      state: { type: 'string', example: 'CA' },
      zip: { type: 'string', example: '94301' },
    },
    required: [],
    expected:
      'z.object({street:z.string().optional().openapi({example:"437 Lytton"}).optional(),city:z.string().optional().openapi({example:"Palo Alto"}).optional(),state:z.string().optional().openapi({example:"CA"}).optional(),zip:z.string().optional().openapi({example:"94301"}).optional()})',
  },

  {
    properties: {
      id: { type: 'integer', format: 'int64', example: 100000 },
      username: { type: 'string', example: 'fehguy' },
      address: {
        type: 'array',
        xml: { name: 'addresses', wrapped: true },
        items: { $ref: '#/components/schemas/Address' },
      },
    },
    required: [],
    expected:
      'z.object({id:z.number().int().optional().openapi({example:100000}).optional(),username:z.string().optional().openapi({example:"fehguy"}).optional(),address:z.array(addressSchema).optional()})',
  },
  {
    properties: {
      id: { type: 'integer', format: 'int64', example: 1 },
      name: { type: 'string', example: 'Dogs' },
    },
    required: [],
    expected:
      'z.object({id:z.number().int().optional().openapi({example:1}).optional(),name:z.string().optional().openapi({example:"Dogs"}).optional()})',
  },

  {
    properties: {
      id: { type: 'integer', format: 'int64', example: 10 },
      username: { type: 'string', example: 'theUser' },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'James' },
      email: { type: 'string', example: 'john@email.com' },
      password: { type: 'string', example: '12345' },
      phone: { type: 'string', example: '12345' },
      userStatus: {
        type: 'integer',
        description: 'User Status',
        format: 'int32',
        example: 1,
      },
    },
    required: [],
    expected:
      'z.object({id:z.number().int().optional().openapi({example:10}).optional(),username:z.string().optional().openapi({example:"theUser"}).optional(),firstName:z.string().optional().openapi({example:"John"}).optional(),lastName:z.string().optional().openapi({example:"James"}).optional(),email:z.string().optional().openapi({example:"john@email.com"}).optional(),password:z.string().optional().openapi({example:"12345"}).optional(),phone:z.string().optional().openapi({example:"12345"}).optional(),userStatus:z.number().int().optional().openapi({example:1}).optional()})',
  },
  {
    properties: {
      id: { type: 'integer', format: 'int64', example: 10 },
      name: { type: 'string', example: 'doggie' },
      category: { $ref: '#/components/schemas/Category' },
      photoUrls: {
        type: 'array',
        xml: { wrapped: true },
        items: {
          type: 'string',
          xml: {
            name: 'photoUrl',
          },
        },
      },
      tags: {
        type: 'array',
        xml: { wrapped: true },
        items: { $ref: '#/components/schemas/Tag' },
      },
      status: {
        type: 'string',
        description: 'pet status in the store',
        enum: ['available', 'pending', 'sold'],
      },
    },
    required: ['name', 'photoUrls'],
    expected:
      'z.object({id:z.number().int().optional().openapi({example:10}).optional(),name:z.string().optional().openapi({example:"doggie"}),category:categorySchema.optional(),photoUrls:z.array(z.string()),tags:z.array(tagSchema).optional(),status:z.enum(["available","pending","sold"]).optional()})',
  },
  {
    properties: {
      code: { type: 'integer', format: 'int32' },
      type: { type: 'string' },
      message: { type: 'string' },
    },
    required: [],
    expected:
      'z.object({code:z.number().int().optional(),type:z.string().optional(),message:z.string().optional()})',
  },
]

describe('generateZodPropertiesSchema', () => {
  it.concurrent.each(generateZodPropertiesSchemaTestCases)(
    'generateZodPropertiesSchema($properties, $required) -> $expected',
    async ({ properties, required, expected }) => {
      const result = generateZodPropertiesSchema(properties, required)
      expect(result).toBe(expected)
    },
  )
})
