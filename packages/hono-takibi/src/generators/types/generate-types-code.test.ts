import { describe, expect, it } from 'vitest'
import type { Components } from '../../types'
import { generateTypesCode } from './generate-types-code'
const generateTypesCodeTestCases: {
  components: Components
  namingCase?: 'camelCase' | 'PascalCase'
  expected: string
}[] = [
  {
    components: {
      schemas: {},
    },
    expected: '',
  },
  // pet store camelCase
  {
    components: {
      schemas: {
        Order: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            petId: {
              type: 'integer',
              format: 'int64',
              example: 198772,
            },
            quantity: {
              type: 'integer',
              format: 'int32',
              example: 7,
            },
            shipDate: {
              type: 'string',
              format: 'date-time',
            },
            status: {
              type: 'string',
              description: 'Order Status',
              example: 'approved',
              enum: ['placed', 'approved', 'delivered'],
            },
            complete: {
              type: 'boolean',
            },
          },
          xml: {
            name: 'order',
          },
        },
        Customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 100000,
            },
            username: {
              type: 'string',
              example: 'fehguy',
            },
            address: {
              type: 'array',
              xml: {
                name: 'addresses',
                wrapped: true,
              },
              items: {
                $ref: '#/components/schemas/Address',
              },
            },
          },
          xml: {
            name: 'customer',
          },
        },
        Address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              example: '437 Lytton',
            },
            city: {
              type: 'string',
              example: 'Palo Alto',
            },
            state: {
              type: 'string',
              example: 'CA',
            },
            zip: {
              type: 'string',
              example: '94301',
            },
          },
          xml: {
            name: 'address',
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Dogs',
            },
          },
          xml: {
            name: 'category',
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            username: {
              type: 'string',
              example: 'theUser',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'James',
            },
            email: {
              type: 'string',
              example: 'john@email.com',
            },
            password: {
              type: 'string',
              example: '12345',
            },
            phone: {
              type: 'string',
              example: '12345',
            },
            userStatus: {
              type: 'integer',
              description: 'User Status',
              format: 'int32',
              example: 1,
            },
          },
          xml: {
            name: 'user',
          },
        },
        Tag: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'tag',
          },
        },
        Pet: {
          required: ['name', 'photoUrls'],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            name: {
              type: 'string',
              example: 'doggie',
            },
            category: {
              $ref: '#/components/schemas/Category',
            },
            photoUrls: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                type: 'string',
                xml: {
                  name: 'photoUrl',
                },
              },
            },
            tags: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                $ref: '#/components/schemas/Tag',
              },
            },
            status: {
              type: 'string',
              description: 'pet status in the store',
              enum: ['available', 'pending', 'sold'],
            },
          },
          xml: {
            name: 'pet',
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            type: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
          xml: {
            name: '##default',
          },
        },
      },
      requestBodies: {
        Pet: {
          description: 'Pet object that needs to be added to the store',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet',
              },
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
        },
        UserArray: {
          description: 'List of user object',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
      // memo securitySchemes need?
    },

    namingCase: 'camelCase',
    expected: `export type orderSchema = z.infer<typeof orderSchema>

export type addressSchema = z.infer<typeof addressSchema>

export type customerSchema = z.infer<typeof customerSchema>

export type categorySchema = z.infer<typeof categorySchema>

export type userSchema = z.infer<typeof userSchema>

export type tagSchema = z.infer<typeof tagSchema>

export type petSchema = z.infer<typeof petSchema>

export type apiResponseSchema = z.infer<typeof apiResponseSchema>`,
  },
  // pet store PascalCase
  {
    components: {
      schemas: {
        Order: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            petId: {
              type: 'integer',
              format: 'int64',
              example: 198772,
            },
            quantity: {
              type: 'integer',
              format: 'int32',
              example: 7,
            },
            shipDate: {
              type: 'string',
              format: 'date-time',
            },
            status: {
              type: 'string',
              description: 'Order Status',
              example: 'approved',
              enum: ['placed', 'approved', 'delivered'],
            },
            complete: {
              type: 'boolean',
            },
          },
          xml: {
            name: 'order',
          },
        },
        Customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 100000,
            },
            username: {
              type: 'string',
              example: 'fehguy',
            },
            address: {
              type: 'array',
              xml: {
                name: 'addresses',
                wrapped: true,
              },
              items: {
                $ref: '#/components/schemas/Address',
              },
            },
          },
          xml: {
            name: 'customer',
          },
        },
        Address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              example: '437 Lytton',
            },
            city: {
              type: 'string',
              example: 'Palo Alto',
            },
            state: {
              type: 'string',
              example: 'CA',
            },
            zip: {
              type: 'string',
              example: '94301',
            },
          },
          xml: {
            name: 'address',
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Dogs',
            },
          },
          xml: {
            name: 'category',
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            username: {
              type: 'string',
              example: 'theUser',
            },
            firstName: {
              type: 'string',
              example: 'John',
            },
            lastName: {
              type: 'string',
              example: 'James',
            },
            email: {
              type: 'string',
              example: 'john@email.com',
            },
            password: {
              type: 'string',
              example: '12345',
            },
            phone: {
              type: 'string',
              example: '12345',
            },
            userStatus: {
              type: 'integer',
              description: 'User Status',
              format: 'int32',
              example: 1,
            },
          },
          xml: {
            name: 'user',
          },
        },
        Tag: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
          },
          xml: {
            name: 'tag',
          },
        },
        Pet: {
          required: ['name', 'photoUrls'],
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              example: 10,
            },
            name: {
              type: 'string',
              example: 'doggie',
            },
            category: {
              $ref: '#/components/schemas/Category',
            },
            photoUrls: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                type: 'string',
                xml: {
                  name: 'photoUrl',
                },
              },
            },
            tags: {
              type: 'array',
              xml: {
                wrapped: true,
              },
              items: {
                $ref: '#/components/schemas/Tag',
              },
            },
            status: {
              type: 'string',
              description: 'pet status in the store',
              enum: ['available', 'pending', 'sold'],
            },
          },
          xml: {
            name: 'pet',
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              format: 'int32',
            },
            type: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
          xml: {
            name: '##default',
          },
        },
      },
      requestBodies: {
        Pet: {
          description: 'Pet object that needs to be added to the store',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet',
              },
            },
            'application/xml': {
              schema: {
                $ref: '#/components/schemas/Pet',
              },
            },
          },
        },
        UserArray: {
          description: 'List of user object',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
      // memo securitySchemes need?
    },

    namingCase: 'PascalCase',
    expected: `export type OrderSchema = z.infer<typeof OrderSchema>

export type AddressSchema = z.infer<typeof AddressSchema>

export type CustomerSchema = z.infer<typeof CustomerSchema>

export type CategorySchema = z.infer<typeof CategorySchema>

export type UserSchema = z.infer<typeof UserSchema>

export type TagSchema = z.infer<typeof TagSchema>

export type PetSchema = z.infer<typeof PetSchema>

export type ApiResponseSchema = z.infer<typeof ApiResponseSchema>`,
  },
]

describe('generateTypesCode', () => {
  it.concurrent.each(generateTypesCodeTestCases)(
    'generateTypesCode($components, $namingCase) -> $expected',
    async ({ components, namingCase, expected }) => {
      const result = generateTypesCode(components, namingCase)
      expect(result).toBe(expected)
    },
  )
})
