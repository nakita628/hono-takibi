import type { Components } from '../../../../type'
import type { Config } from '../../../../config'
import { DEFAULT_CONFIG } from '../../../../config'
import { describe, expect, it } from 'vitest'
import { generateComponentsCode } from './generate-components-code'

const generateComponentsCodeTestCases: {
  components: Components
  config: Config
  expected: string
}[] = [
  // empty
  {
    components: {
      schemas: {},
    },
    config: DEFAULT_CONFIG,
    expected: '',
  },
  // pet store
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
    config: {
      schema: {
        name: 'camelCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const orderSchema = z.object({id:z.number().int().openapi({example:10}),petId:z.number().int().openapi({example:198772}),quantity:z.number().int().openapi({example:7}),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}),complete:z.boolean()}).partial().openapi('Order')

const addressSchema = z.object({street:z.string().openapi({example:"437 Lytton"}),city:z.string().openapi({example:"Palo Alto"}),state:z.string().openapi({example:"CA"}),zip:z.string().openapi({example:"94301"})}).partial().openapi('Address')

const customerSchema = z.object({id:z.number().int().openapi({example:100000}),username:z.string().openapi({example:"fehguy"}),address:z.array(addressSchema)}).partial().openapi('Customer')

const categorySchema = z.object({id:z.number().int().openapi({example:1}),name:z.string().openapi({example:"Dogs"})}).partial().openapi('Category')

const userSchema = z.object({id:z.number().int().openapi({example:10}),username:z.string().openapi({example:"theUser"}),firstName:z.string().openapi({example:"John"}),lastName:z.string().openapi({example:"James"}),email:z.string().openapi({example:"john@email.com"}),password:z.string().openapi({example:"12345"}),phone:z.string().openapi({example:"12345"}),userStatus:z.number().int().openapi({example:1})}).partial().openapi('User')

const tagSchema = z.object({id:z.number().int(),name:z.string()}).partial().openapi('Tag')

const petSchema = z.object({id:z.number().int().openapi({example:10}).optional(),name:z.string().openapi({example:"doggie"}),category:categorySchema.optional(),photoUrls:z.array(z.string()),tags:z.array(tagSchema).optional(),status:z.enum(["available","pending","sold"]).optional()}).openapi('Pet')

const apiResponseSchema = z.object({code:z.number().int(),type:z.string(),message:z.string()}).partial().openapi('ApiResponse')

export const schemas = {
orderSchema,
addressSchema,
customerSchema,
categorySchema,
userSchema,
tagSchema,
petSchema,
apiResponseSchema
}`,
  },

  // sample
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
    config: {
      schema: {
        name: 'camelCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const productSchema = z.object({id:z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}).optional(),name:z.string().openapi({example:"Wireless Mouse"}),description:z.string().openapi({example:"A high-precision wireless mouse."}).optional(),price:z.number().openapi({example:29.99}),category:z.string().openapi({example:"Electronics"}),stock:z.number().int().openapi({example:150}).optional(),tags:z.array(z.string()).optional()}).openapi('Product')

const orderItemSchema = z.object({productId:z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}),quantity:z.number().int().openapi({example:2}),price:z.number().openapi({example:29.99}).optional()}).openapi('OrderItem')

const orderSchema = z.object({id:z.string().uuid().openapi({example:"987e6543-e21b-34d3-a789-426614174111"}).optional(),userId:z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}),products:z.array(orderItemSchema),total:z.number().openapi({example:59.98}),status:z.enum(["pending","shipped","delivered","cancelled"]).openapi({example:"shipped"}).optional(),createdAt:z.string().datetime().openapi({example:"2023-10-10T14:48:00.000Z"}).optional(),updatedAt:z.string().datetime().openapi({example:"2023-10-11T10:30:00.000Z"}).optional()}).openapi('Order')

const userSchema = z.object({id:z.string().uuid().openapi({example:"321e6547-e89b-12d3-a456-426614174999"}).optional(),username:z.string().openapi({example:"john_doe"}),email:z.string().email().openapi({example:"john.doe@example.com"}),firstName:z.string().openapi({example:"John"}).optional(),lastName:z.string().openapi({example:"Doe"}).optional(),address:z.string().openapi({example:"123 Main St, Anytown, USA"}).optional(),phone:z.string().openapi({example:"+1-555-1234"}).optional(),createdAt:z.string().datetime().openapi({example:"2023-01-15T09:30:00.000Z"}).optional(),updatedAt:z.string().datetime().openapi({example:"2023-06-20T16:45:00.000Z"}).optional()}).openapi('User')

export const schemas = {
productSchema,
orderItemSchema,
orderSchema,
userSchema
}`,
  },
  // UserSchema
  {
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '1212121',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            age: {
              type: 'number',
              example: 42,
            },
          },
          required: ['id', 'name', 'age'],
        },
      },
    },
    config: {
      schema: {
        name: 'camelCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const userSchema = z.object({id:z.string().openapi({example:"1212121"}),name:z.string().openapi({example:"John Doe"}),age:z.number().openapi({example:42})}).openapi('User')

export const schemas = {
userSchema
}`,
  },
  // PascalCase
  // pet store
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
    config: {
      schema: {
        name: 'PascalCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const OrderSchema = z.object({id:z.number().int().openapi({example:10}),petId:z.number().int().openapi({example:198772}),quantity:z.number().int().openapi({example:7}),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}),complete:z.boolean()}).partial().openapi('Order')

const AddressSchema = z.object({street:z.string().openapi({example:"437 Lytton"}),city:z.string().openapi({example:"Palo Alto"}),state:z.string().openapi({example:"CA"}),zip:z.string().openapi({example:"94301"})}).partial().openapi('Address')

const CustomerSchema = z.object({id:z.number().int().openapi({example:100000}),username:z.string().openapi({example:"fehguy"}),address:z.array(AddressSchema)}).partial().openapi('Customer')

const CategorySchema = z.object({id:z.number().int().openapi({example:1}),name:z.string().openapi({example:"Dogs"})}).partial().openapi('Category')

const UserSchema = z.object({id:z.number().int().openapi({example:10}),username:z.string().openapi({example:"theUser"}),firstName:z.string().openapi({example:"John"}),lastName:z.string().openapi({example:"James"}),email:z.string().openapi({example:"john@email.com"}),password:z.string().openapi({example:"12345"}),phone:z.string().openapi({example:"12345"}),userStatus:z.number().int().openapi({example:1})}).partial().openapi('User')

const TagSchema = z.object({id:z.number().int(),name:z.string()}).partial().openapi('Tag')

const PetSchema = z.object({id:z.number().int().openapi({example:10}).optional(),name:z.string().openapi({example:"doggie"}),category:CategorySchema.optional(),photoUrls:z.array(z.string()),tags:z.array(TagSchema).optional(),status:z.enum(["available","pending","sold"]).optional()}).openapi('Pet')

const ApiResponseSchema = z.object({code:z.number().int(),type:z.string(),message:z.string()}).partial().openapi('ApiResponse')

export const schemas = {
OrderSchema,
AddressSchema,
CustomerSchema,
CategorySchema,
UserSchema,
TagSchema,
PetSchema,
ApiResponseSchema
}`,
  },
  // PascalCase
  // sample
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
    config: {
      schema: {
        name: 'PascalCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const ProductSchema = z.object({id:z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}).optional(),name:z.string().openapi({example:"Wireless Mouse"}),description:z.string().openapi({example:"A high-precision wireless mouse."}).optional(),price:z.number().openapi({example:29.99}),category:z.string().openapi({example:"Electronics"}),stock:z.number().int().openapi({example:150}).optional(),tags:z.array(z.string()).optional()}).openapi('Product')

const OrderItemSchema = z.object({productId:z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}),quantity:z.number().int().openapi({example:2}),price:z.number().openapi({example:29.99}).optional()}).openapi('OrderItem')

const OrderSchema = z.object({id:z.string().uuid().openapi({example:"987e6543-e21b-34d3-a789-426614174111"}).optional(),userId:z.string().uuid().openapi({example:"123e4567-e89b-12d3-a456-426614174000"}),products:z.array(OrderItemSchema),total:z.number().openapi({example:59.98}),status:z.enum(["pending","shipped","delivered","cancelled"]).openapi({example:"shipped"}).optional(),createdAt:z.string().datetime().openapi({example:"2023-10-10T14:48:00.000Z"}).optional(),updatedAt:z.string().datetime().openapi({example:"2023-10-11T10:30:00.000Z"}).optional()}).openapi('Order')

const UserSchema = z.object({id:z.string().uuid().openapi({example:"321e6547-e89b-12d3-a456-426614174999"}).optional(),username:z.string().openapi({example:"john_doe"}),email:z.string().email().openapi({example:"john.doe@example.com"}),firstName:z.string().openapi({example:"John"}).optional(),lastName:z.string().openapi({example:"Doe"}).optional(),address:z.string().openapi({example:"123 Main St, Anytown, USA"}).optional(),phone:z.string().openapi({example:"+1-555-1234"}).optional(),createdAt:z.string().datetime().openapi({example:"2023-01-15T09:30:00.000Z"}).optional(),updatedAt:z.string().datetime().openapi({example:"2023-06-20T16:45:00.000Z"}).optional()}).openapi('User')

export const schemas = {
ProductSchema,
OrderItemSchema,
OrderSchema,
UserSchema
}`,
  },
  // pet store
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
    config: {
      schema: {
        name: 'camelCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: `const orderSchema = z.object({id:z.number().int().openapi({example:10}),petId:z.number().int().openapi({example:198772}),quantity:z.number().int().openapi({example:7}),shipDate:z.string().datetime(),status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}),complete:z.boolean()}).partial().openapi('Order')

const addressSchema = z.object({street:z.string().openapi({example:"437 Lytton"}),city:z.string().openapi({example:"Palo Alto"}),state:z.string().openapi({example:"CA"}),zip:z.string().openapi({example:"94301"})}).partial().openapi('Address')

const customerSchema = z.object({id:z.number().int().openapi({example:100000}),username:z.string().openapi({example:"fehguy"}),address:z.array(addressSchema)}).partial().openapi('Customer')

const categorySchema = z.object({id:z.number().int().openapi({example:1}),name:z.string().openapi({example:"Dogs"})}).partial().openapi('Category')

const userSchema = z.object({id:z.number().int().openapi({example:10}),username:z.string().openapi({example:"theUser"}),firstName:z.string().openapi({example:"John"}),lastName:z.string().openapi({example:"James"}),email:z.string().openapi({example:"john@email.com"}),password:z.string().openapi({example:"12345"}),phone:z.string().openapi({example:"12345"}),userStatus:z.number().int().openapi({example:1})}).partial().openapi('User')

const tagSchema = z.object({id:z.number().int(),name:z.string()}).partial().openapi('Tag')

const petSchema = z.object({id:z.number().int().openapi({example:10}).optional(),name:z.string().openapi({example:"doggie"}),category:categorySchema.optional(),photoUrls:z.array(z.string()),tags:z.array(tagSchema).optional(),status:z.enum(["available","pending","sold"]).optional()}).openapi('Pet')

const apiResponseSchema = z.object({code:z.number().int(),type:z.string(),message:z.string()}).partial().openapi('ApiResponse')`,
  },
]

describe('generateComponentsCode', () => {
  it.concurrent.each(generateComponentsCodeTestCases)(
    'generateComponentsCode($components, $config) -> $expected',
    async ({ components, config, expected }) => {
      const result = generateComponentsCode(components, config)
      expect(result).toBe(expected)
    },
  )
})
