import { createRoute, z } from '@hono/zod-openapi'

const OrderSchema = z
  .object({
    id: z.int64().openapi({ type: 'integer', format: 'int64', example: 10 }),
    petId: z.int64().openapi({ type: 'integer', format: 'int64', example: 198772 }),
    quantity: z.int32().openapi({ type: 'integer', format: 'int32', example: 7 }),
    shipDate: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    status: z
      .enum(['placed', 'approved', 'delivered'])
      .openapi({
        type: 'string',
        description: 'Order Status',
        example: 'approved',
        enum: ['placed', 'approved', 'delivered'],
      }),
    complete: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
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
    xml: { name: 'order' },
  })
  .openapi('Order')

const AddressSchema = z
  .object({
    street: z.string().openapi({ type: 'string', example: '437 Lytton' }),
    city: z.string().openapi({ type: 'string', example: 'Palo Alto' }),
    state: z.string().openapi({ type: 'string', example: 'CA' }),
    zip: z.string().openapi({ type: 'string', example: '94301' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      street: { type: 'string', example: '437 Lytton' },
      city: { type: 'string', example: 'Palo Alto' },
      state: { type: 'string', example: 'CA' },
      zip: { type: 'string', example: '94301' },
    },
    xml: { name: 'address' },
  })
  .openapi('Address')

const CustomerSchema = z
  .object({
    id: z.int64().openapi({ type: 'integer', format: 'int64', example: 100000 }),
    username: z.string().openapi({ type: 'string', example: 'fehguy' }),
    address: z
      .array(AddressSchema)
      .openapi({
        type: 'array',
        xml: { name: 'addresses', wrapped: true },
        items: { $ref: '#/components/schemas/Address' },
      }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64', example: 100000 },
      username: { type: 'string', example: 'fehguy' },
      address: {
        type: 'array',
        xml: { name: 'addresses', wrapped: true },
        items: { $ref: '#/components/schemas/Address' },
      },
    },
    xml: { name: 'customer' },
  })
  .openapi('Customer')

const CategorySchema = z
  .object({
    id: z.int64().openapi({ type: 'integer', format: 'int64', example: 1 }),
    name: z.string().openapi({ type: 'string', example: 'Dogs' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64', example: 1 },
      name: { type: 'string', example: 'Dogs' },
    },
    xml: { name: 'category' },
  })
  .openapi('Category')

const UserSchema = z
  .object({
    id: z.int64().openapi({ type: 'integer', format: 'int64', example: 10 }),
    username: z.string().openapi({ type: 'string', example: 'theUser' }),
    firstName: z.string().openapi({ type: 'string', example: 'John' }),
    lastName: z.string().openapi({ type: 'string', example: 'James' }),
    email: z.string().openapi({ type: 'string', example: 'john@email.com' }),
    password: z.string().openapi({ type: 'string', example: '12345' }),
    phone: z.string().openapi({ type: 'string', example: '12345' }),
    userStatus: z
      .int32()
      .openapi({ type: 'integer', description: 'User Status', format: 'int32', example: 1 }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64', example: 10 },
      username: { type: 'string', example: 'theUser' },
      firstName: { type: 'string', example: 'John' },
      lastName: { type: 'string', example: 'James' },
      email: { type: 'string', example: 'john@email.com' },
      password: { type: 'string', example: '12345' },
      phone: { type: 'string', example: '12345' },
      userStatus: { type: 'integer', description: 'User Status', format: 'int32', example: 1 },
    },
    xml: { name: 'user' },
  })
  .openapi('User')

const TagSchema = z
  .object({
    id: z.int64().openapi({ type: 'integer', format: 'int64' }),
    name: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: { id: { type: 'integer', format: 'int64' }, name: { type: 'string' } },
    xml: { name: 'tag' },
  })
  .openapi('Tag')

const PetSchema = z
  .object({
    id: z.int64().optional().openapi({ type: 'integer', format: 'int64', example: 10 }),
    name: z.string().openapi({ type: 'string', example: 'doggie' }),
    category: CategorySchema,
    photoUrls: z
      .array(z.string().openapi({ type: 'string', xml: { name: 'photoUrl' } }))
      .optional()
      .openapi({
        type: 'array',
        xml: { wrapped: true },
        items: { type: 'string', xml: { name: 'photoUrl' } },
      }),
    tags: z
      .array(TagSchema)
      .optional()
      .openapi({
        type: 'array',
        xml: { wrapped: true },
        items: { $ref: '#/components/schemas/Tag' },
      }),
    status: z
      .enum(['available', 'pending', 'sold'])
      .optional()
      .openapi({
        type: 'string',
        description: 'pet status in the store',
        enum: ['available', 'pending', 'sold'],
      }),
  })
  .openapi({
    required: ['name', 'photoUrls'],
    type: 'object',
    properties: {
      id: { type: 'integer', format: 'int64', example: 10 },
      name: { type: 'string', example: 'doggie' },
      category: { $ref: '#/components/schemas/Category' },
      photoUrls: {
        type: 'array',
        xml: { wrapped: true },
        items: { type: 'string', xml: { name: 'photoUrl' } },
      },
      tags: { type: 'array', xml: { wrapped: true }, items: { $ref: '#/components/schemas/Tag' } },
      status: {
        type: 'string',
        description: 'pet status in the store',
        enum: ['available', 'pending', 'sold'],
      },
    },
    xml: { name: 'pet' },
  })
  .openapi('Pet')

const ApiResponseSchema = z
  .object({
    code: z.int32().openapi({ type: 'integer', format: 'int32' }),
    type: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      code: { type: 'integer', format: 'int32' },
      type: { type: 'string' },
      message: { type: 'string' },
    },
    xml: { name: '##default' },
  })
  .openapi('ApiResponse')

const petstore_authSecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://petstore3.swagger.io/oauth/authorize',
      scopes: { 'write:pets': 'modify pets in your account', 'read:pets': 'read your pets' },
    },
  },
}

const api_keySecurityScheme = { type: 'apiKey', name: 'api_key', in: 'header' }

const PetRequestBody = {
  description: 'Pet object that needs to be added to the store',
  content: { 'application/json': { schema: PetSchema }, 'application/xml': { schema: PetSchema } },
}

const UserArrayRequestBody = {
  description: 'List of user object',
  content: {
    'application/json': {
      schema: z
        .array(UserSchema)
        .optional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
    },
  },
}

export const putPetRoute = createRoute({
  method: 'put',
  path: '/pet',
  tags: ['pet'],
  summary: 'Update an existing pet',
  description: 'Update an existing pet by Id',
  operationId: 'updatePet',
  request: {
    body: {
      description: 'Update an existent pet in the store',
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
        'application/x-www-form-urlencoded': { schema: PetSchema },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
      },
    },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Pet not found' },
    422: { description: 'Validation exception' },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const postPetRoute = createRoute({
  method: 'post',
  path: '/pet',
  tags: ['pet'],
  summary: 'Add a new pet to the store',
  description: 'Add a new pet to the store',
  operationId: 'addPet',
  request: {
    body: {
      description: 'Create a new pet in the store',
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
        'application/x-www-form-urlencoded': { schema: PetSchema },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
      },
    },
    400: { description: 'Invalid input' },
    422: { description: 'Validation exception' },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const getPetFindByStatusRoute = createRoute({
  method: 'get',
  path: '/pet/findByStatus',
  tags: ['pet'],
  summary: 'Finds Pets by status',
  description: 'Multiple status values can be provided with comma separated strings',
  operationId: 'findPetsByStatus',
  request: {
    query: z.object({
      status: z
        .enum(['available', 'pending', 'sold'])
        .default('available')
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'Status values that need to be considered for filter',
            required: false,
            explode: true,
            schema: {
              type: 'string',
              default: 'available',
              enum: ['available', 'pending', 'sold'],
            },
          },
          type: 'string',
          default: 'available',
          enum: ['available', 'pending', 'sold'],
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': {
          schema: z
            .array(PetSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Pet' } }),
        },
        'application/xml': {
          schema: z
            .array(PetSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Pet' } }),
        },
      },
    },
    400: { description: 'Invalid status value' },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const getPetFindByTagsRoute = createRoute({
  method: 'get',
  path: '/pet/findByTags',
  tags: ['pet'],
  summary: 'Finds Pets by tags',
  description:
    'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
  operationId: 'findPetsByTags',
  request: {
    query: z.object({
      tags: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'tags',
                in: 'query',
                description: 'Tags to filter by',
                required: false,
                explode: true,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'tags',
            in: 'query',
            description: 'Tags to filter by',
            required: false,
            explode: true,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': {
          schema: z
            .array(PetSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Pet' } }),
        },
        'application/xml': {
          schema: z
            .array(PetSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Pet' } }),
        },
      },
    },
    400: { description: 'Invalid tag value' },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const getPetPetIdRoute = createRoute({
  method: 'get',
  path: '/pet/{petId}',
  tags: ['pet'],
  summary: 'Find pet by ID',
  description: 'Returns a single pet',
  operationId: 'getPetById',
  request: {
    params: z.object({
      petId: z
        .int64()
        .openapi({
          param: {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to return',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          type: 'integer',
          format: 'int64',
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
      },
    },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Pet not found' },
  },
  security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
})

export const postPetPetIdRoute = createRoute({
  method: 'post',
  path: '/pet/{petId}',
  tags: ['pet'],
  summary: 'Updates a pet in the store with form data',
  operationId: 'updatePetWithForm',
  request: {
    params: z.object({
      petId: z
        .int64()
        .openapi({
          param: {
            name: 'petId',
            in: 'path',
            description: 'ID of pet that needs to be updated',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          type: 'integer',
          format: 'int64',
        }),
    }),
    query: z.object({
      name: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'name',
            in: 'query',
            description: 'Name of pet that needs to be updated',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      status: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'Status of pet that needs to be updated',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: { 400: { description: 'Invalid input' } },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const deletePetPetIdRoute = createRoute({
  method: 'delete',
  path: '/pet/{petId}',
  tags: ['pet'],
  summary: 'Deletes a pet',
  description: 'delete a pet',
  operationId: 'deletePet',
  request: {
    headers: z.object({
      api_key: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'api_key',
            in: 'header',
            description: '',
            required: false,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
    params: z.object({
      petId: z
        .int64()
        .openapi({
          param: {
            name: 'petId',
            in: 'path',
            description: 'Pet id to delete',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          type: 'integer',
          format: 'int64',
        }),
    }),
  },
  responses: { 400: { description: 'Invalid pet value' } },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const postPetPetIdUploadImageRoute = createRoute({
  method: 'post',
  path: '/pet/{petId}/uploadImage',
  tags: ['pet'],
  summary: 'uploads an image',
  operationId: 'uploadFile',
  request: {
    body: {
      content: {
        'application/octet-stream': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: ApiResponseSchema } },
    },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const getStoreInventoryRoute = createRoute({
  method: 'get',
  path: '/store/inventory',
  tags: ['store'],
  summary: 'Returns pet inventories by status',
  description: 'Returns a map of status codes to quantities',
  operationId: 'getInventory',
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': {
          schema: z
            .record(z.string(), z.int32().optional().openapi({ type: 'integer', format: 'int32' }))
            .openapi({
              type: 'object',
              additionalProperties: { type: 'integer', format: 'int32' },
            }),
        },
      },
    },
  },
  security: [{ api_key: [] }],
})

export const postStoreOrderRoute = createRoute({
  method: 'post',
  path: '/store/order',
  tags: ['store'],
  summary: 'Place an order for a pet',
  description: 'Place a new order in the store',
  operationId: 'placeOrder',
  request: {
    body: {
      content: {
        'application/json': { schema: OrderSchema },
        'application/xml': { schema: OrderSchema },
        'application/x-www-form-urlencoded': { schema: OrderSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: OrderSchema } },
    },
    400: { description: 'Invalid input' },
    422: { description: 'Validation exception' },
  },
})

export const getStoreOrderOrderIdRoute = createRoute({
  method: 'get',
  path: '/store/order/{orderId}',
  tags: ['store'],
  summary: 'Find purchase order by ID',
  description:
    'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
  operationId: 'getOrderById',
  request: {
    params: z.object({
      orderId: z
        .int64()
        .openapi({
          param: {
            name: 'orderId',
            in: 'path',
            description: 'ID of order that needs to be fetched',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          type: 'integer',
          format: 'int64',
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': { schema: OrderSchema },
        'application/xml': { schema: OrderSchema },
      },
    },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Order not found' },
  },
})

export const deleteStoreOrderOrderIdRoute = createRoute({
  method: 'delete',
  path: '/store/order/{orderId}',
  tags: ['store'],
  summary: 'Delete purchase order by ID',
  description:
    'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
  operationId: 'deleteOrder',
  request: {
    params: z.object({
      orderId: z
        .int64()
        .openapi({
          param: {
            name: 'orderId',
            in: 'path',
            description: 'ID of the order that needs to be deleted',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          type: 'integer',
          format: 'int64',
        }),
    }),
  },
  responses: {
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Order not found' },
  },
})

export const postUserRoute = createRoute({
  method: 'post',
  path: '/user',
  tags: ['user'],
  summary: 'Create user',
  description: 'This can only be done by the logged in user.',
  operationId: 'createUser',
  request: {
    body: {
      description: 'Created user object',
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
        'application/x-www-form-urlencoded': { schema: UserSchema },
      },
    },
  },
  responses: {
    default: {
      description: 'successful operation',
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
      },
    },
  },
})

export const postUserCreateWithListRoute = createRoute({
  method: 'post',
  path: '/user/createWithList',
  tags: ['user'],
  summary: 'Creates list of users with given input array',
  description: 'Creates list of users with given input array',
  operationId: 'createUsersWithListInput',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .array(UserSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
      },
    },
    default: { description: 'successful operation' },
  },
})

export const getUserLoginRoute = createRoute({
  method: 'get',
  path: '/user/login',
  tags: ['user'],
  summary: 'Logs user into the system',
  operationId: 'loginUser',
  request: {
    query: z.object({
      username: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'username',
            in: 'query',
            description: 'The user name for login',
            required: false,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      password: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'password',
            in: 'query',
            description: 'The password for login in clear text',
            required: false,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/xml': { schema: z.string().optional().openapi({ type: 'string' }) },
        'application/json': { schema: z.string().optional().openapi({ type: 'string' }) },
      },
    },
    400: { description: 'Invalid username/password supplied' },
  },
})

export const getUserLogoutRoute = createRoute({
  method: 'get',
  path: '/user/logout',
  tags: ['user'],
  summary: 'Logs out current logged in user session',
  operationId: 'logoutUser',
  responses: { default: { description: 'successful operation' } },
})

export const getUserUsernameRoute = createRoute({
  method: 'get',
  path: '/user/{username}',
  tags: ['user'],
  summary: 'Get user by user name',
  operationId: 'getUserByName',
  request: {
    params: z.object({
      username: z
        .string()
        .openapi({
          param: {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be fetched. Use user1 for testing. ',
            required: true,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
      },
    },
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})

export const putUserUsernameRoute = createRoute({
  method: 'put',
  path: '/user/{username}',
  tags: ['user'],
  summary: 'Update user',
  description: 'This can only be done by the logged in user.',
  operationId: 'updateUser',
  request: {
    body: {
      description: 'Update an existent user in the store',
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
        'application/x-www-form-urlencoded': { schema: UserSchema },
      },
    },
  },
  responses: { default: { description: 'successful operation' } },
})

export const deleteUserUsernameRoute = createRoute({
  method: 'delete',
  path: '/user/{username}',
  tags: ['user'],
  summary: 'Delete user',
  description: 'This can only be done by the logged in user.',
  operationId: 'deleteUser',
  request: {
    params: z.object({
      username: z
        .string()
        .openapi({
          param: {
            name: 'username',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})
