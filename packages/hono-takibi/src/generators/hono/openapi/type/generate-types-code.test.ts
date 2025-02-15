import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../types'
import type { Config } from '../../../../config'
import { generateTypesCode } from './generate-types-code'

const camelCaseConfig: Config = {
  schema: {
    name: 'camelCase',
    export: false,
  },
  type: {
    name: 'camelCase',
    export: true,
  },
}

const pascalCaseConfig: Config = {
  schema: {
    name: 'PascalCase',
    export: false,
  },
  type: {
    name: 'PascalCase',
    export: true,
  },
}

const generateTypesCodeTestCases: {
  components: Components
  config: Config
  expected: string
}[] = [
  {
    components: {
      schemas: {},
    },
    config: camelCaseConfig,
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

    config: camelCaseConfig,
    expected: `export type order = z.infer<typeof orderSchema>

export type address = z.infer<typeof addressSchema>

export type customer = z.infer<typeof customerSchema>

export type category = z.infer<typeof categorySchema>

export type user = z.infer<typeof userSchema>

export type tag = z.infer<typeof tagSchema>

export type pet = z.infer<typeof petSchema>

export type apiResponse = z.infer<typeof apiResponseSchema>`,
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

    config: pascalCaseConfig,
    expected: `export type Order = z.infer<typeof OrderSchema>

export type Address = z.infer<typeof AddressSchema>

export type Customer = z.infer<typeof CustomerSchema>

export type Category = z.infer<typeof CategorySchema>

export type User = z.infer<typeof UserSchema>

export type Tag = z.infer<typeof TagSchema>

export type Pet = z.infer<typeof PetSchema>

export type ApiResponse = z.infer<typeof ApiResponseSchema>`,
  },
]

describe('generateTypesCode', () => {
  it.concurrent.each(generateTypesCodeTestCases)(
    'generateTypesCode($components, $config) -> $expected',
    async ({ components, config, expected }) => {
      const result = generateTypesCode(components, config)
      expect(result).toBe(expected)
    },
  )
})
