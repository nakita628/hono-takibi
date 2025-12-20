import { createRoute, z } from '@hono/zod-openapi'

const OrderSchema = z
  .object({
    id: z.int64().openapi({ example: 10 }),
    petId: z.int64().openapi({ example: 198772 }),
    quantity: z.int32().openapi({ example: 7 }),
    shipDate: z.iso.datetime(),
    status: z
      .enum(['placed', 'approved', 'delivered'])
      .openapi({ example: 'approved', description: 'Order Status' }),
    complete: z.boolean(),
  })
  .partial()
  .openapi('Order')

const AddressSchema = z
  .object({
    street: z.string().openapi({ example: '437 Lytton' }),
    city: z.string().openapi({ example: 'Palo Alto' }),
    state: z.string().openapi({ example: 'CA' }),
    zip: z.string().openapi({ example: '94301' }),
  })
  .partial()
  .openapi('Address')

const CustomerSchema = z
  .object({
    id: z.int64().openapi({ example: 100000 }),
    username: z.string().openapi({ example: 'fehguy' }),
    address: z.array(AddressSchema),
  })
  .partial()
  .openapi('Customer')

const CategorySchema = z
  .object({ id: z.int64().openapi({ example: 1 }), name: z.string().openapi({ example: 'Dogs' }) })
  .partial()
  .openapi('Category')

const UserSchema = z
  .object({
    id: z.int64().openapi({ example: 10 }),
    username: z.string().openapi({ example: 'theUser' }),
    firstName: z.string().openapi({ example: 'John' }),
    lastName: z.string().openapi({ example: 'James' }),
    email: z.string().openapi({ example: 'john@email.com' }),
    password: z.string().openapi({ example: '12345' }),
    phone: z.string().openapi({ example: '12345' }),
    userStatus: z.int32().openapi({ example: 1, description: 'User Status' }),
  })
  .partial()
  .openapi('User')

const TagSchema = z.object({ id: z.int64(), name: z.string() }).partial().openapi('Tag')

const PetSchema = z
  .object({
    id: z.int64().openapi({ example: 10 }).optional(),
    name: z.string().openapi({ example: 'doggie' }),
    category: CategorySchema.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(TagSchema).optional(),
    status: z
      .enum(['available', 'pending', 'sold'])
      .openapi({ description: 'pet status in the store' })
      .optional(),
  })
  .openapi('Pet')

const ApiResponseSchema = z
  .object({ code: z.int32(), type: z.string(), message: z.string() })
  .partial()
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
  required: false,
  content: { 'application/json': { schema: PetSchema }, 'application/xml': { schema: PetSchema } },
}

const UserArrayRequestBody = {
  description: 'List of user object',
  required: false,
  content: { 'application/json': { schema: z.array(UserSchema) } },
}

export const putPetRoute = createRoute({
  tags: ['pet'],
  method: 'put',
  path: '/pet',
  operationId: 'updatePet',
  summary: 'Update an existing pet',
  description: 'Update an existing pet by Id',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    body: {
      description: 'Update an existent pet in the store',
      required: true,
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
        'application/x-www-form-urlencoded': { schema: PetSchema },
      },
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
})

export const postPetRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet',
  operationId: 'addPet',
  summary: 'Add a new pet to the store',
  description: 'Add a new pet to the store',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    body: {
      description: 'Create a new pet in the store',
      required: true,
      content: {
        'application/json': { schema: PetSchema },
        'application/xml': { schema: PetSchema },
        'application/x-www-form-urlencoded': { schema: PetSchema },
      },
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
})

export const getPetFindByStatusRoute = createRoute({
  tags: ['pet'],
  method: 'get',
  path: '/pet/findByStatus',
  operationId: 'findPetsByStatus',
  summary: 'Finds Pets by status',
  description: 'Multiple status values can be provided with comma separated strings',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    query: z.object({
      status: z
        .enum(['available', 'pending', 'sold'])
        .default('available')
        .openapi({ param: { in: 'query', name: 'status', required: false } }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': { schema: z.array(PetSchema) },
        'application/xml': { schema: z.array(PetSchema) },
      },
    },
    400: { description: 'Invalid status value' },
  },
})

export const getPetFindByTagsRoute = createRoute({
  tags: ['pet'],
  method: 'get',
  path: '/pet/findByTags',
  operationId: 'findPetsByTags',
  summary: 'Finds Pets by tags',
  description:
    'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    query: z.object({
      tags: z
        .array(z.string())
        .openapi({ param: { in: 'query', name: 'tags', required: false } })
        .optional(),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: {
        'application/json': { schema: z.array(PetSchema) },
        'application/xml': { schema: z.array(PetSchema) },
      },
    },
    400: { description: 'Invalid tag value' },
  },
})

export const getPetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'get',
  path: '/pet/{petId}',
  operationId: 'getPetById',
  summary: 'Find pet by ID',
  description: 'Returns a single pet',
  security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    params: z.object({
      petId: z.int64().openapi({ param: { in: 'path', name: 'petId', required: true } }),
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
})

export const postPetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet/{petId}',
  operationId: 'updatePetWithForm',
  summary: 'Updates a pet in the store with form data',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    params: z.object({
      petId: z.int64().openapi({ param: { in: 'path', name: 'petId', required: true } }),
    }),
    query: z.object({
      name: z
        .string()
        .openapi({ param: { in: 'query', name: 'name', required: false } })
        .optional(),
      status: z
        .string()
        .openapi({ param: { in: 'query', name: 'status', required: false } })
        .optional(),
    }),
  },
  responses: { 400: { description: 'Invalid input' } },
})

export const deletePetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'delete',
  path: '/pet/{petId}',
  operationId: 'deletePet',
  summary: 'Deletes a pet',
  description: 'delete a pet',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    headers: z.object({
      api_key: z
        .string()
        .openapi({ param: { in: 'header', name: 'api_key', required: false } })
        .optional(),
    }),
    params: z.object({
      petId: z.int64().openapi({ param: { in: 'path', name: 'petId', required: true } }),
    }),
  },
  responses: { 400: { description: 'Invalid pet value' } },
})

export const postPetPetIdUploadImageRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet/{petId}/uploadImage',
  operationId: 'uploadFile',
  summary: 'uploads an image',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    body: { required: false, content: { 'application/octet-stream': { schema: z.file() } } },
    params: z.object({
      petId: z.int64().openapi({ param: { in: 'path', name: 'petId', required: true } }),
    }),
    query: z.object({
      additionalMetadata: z
        .string()
        .openapi({ param: { in: 'query', name: 'additionalMetadata', required: false } })
        .optional(),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: ApiResponseSchema } },
    },
  },
})

export const getStoreInventoryRoute = createRoute({
  tags: ['store'],
  method: 'get',
  path: '/store/inventory',
  operationId: 'getInventory',
  summary: 'Returns pet inventories by status',
  description: 'Returns a map of status codes to quantities',
  security: [{ api_key: [] }],
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.record(z.string(), z.int32()) } },
    },
  },
})

export const postStoreOrderRoute = createRoute({
  tags: ['store'],
  method: 'post',
  path: '/store/order',
  operationId: 'placeOrder',
  summary: 'Place an order for a pet',
  description: 'Place a new order in the store',
  request: {
    body: {
      required: false,
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
  tags: ['store'],
  method: 'get',
  path: '/store/order/{orderId}',
  operationId: 'getOrderById',
  summary: 'Find purchase order by ID',
  description:
    'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
  request: {
    params: z.object({
      orderId: z.int64().openapi({ param: { in: 'path', name: 'orderId', required: true } }),
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
  tags: ['store'],
  method: 'delete',
  path: '/store/order/{orderId}',
  operationId: 'deleteOrder',
  summary: 'Delete purchase order by ID',
  description:
    'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
  request: {
    params: z.object({
      orderId: z.int64().openapi({ param: { in: 'path', name: 'orderId', required: true } }),
    }),
  },
  responses: {
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Order not found' },
  },
})

export const postUserRoute = createRoute({
  tags: ['user'],
  method: 'post',
  path: '/user',
  operationId: 'createUser',
  summary: 'Create user',
  description: 'This can only be done by the logged in user.',
  request: {
    body: {
      description: 'Created user object',
      required: false,
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
  tags: ['user'],
  method: 'post',
  path: '/user/createWithList',
  operationId: 'createUsersWithListInput',
  summary: 'Creates list of users with given input array',
  description: 'Creates list of users with given input array',
  request: {
    body: { required: false, content: { 'application/json': { schema: z.array(UserSchema) } } },
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
  tags: ['user'],
  method: 'get',
  path: '/user/login',
  operationId: 'loginUser',
  summary: 'Logs user into the system',
  request: {
    query: z.object({
      username: z
        .string()
        .openapi({ param: { in: 'query', name: 'username', required: false } })
        .optional(),
      password: z
        .string()
        .openapi({ param: { in: 'query', name: 'password', required: false } })
        .optional(),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      headers: z.object({
        'X-Rate-Limit': z
          .int32()
          .openapi({ description: 'calls per hour allowed by the user' })
          .optional(),
        'X-Expires-After': z.iso
          .datetime()
          .openapi({ description: 'date in UTC when token expires' })
          .optional(),
      }),
      content: {
        'application/xml': { schema: z.string() },
        'application/json': { schema: z.string() },
      },
    },
    400: { description: 'Invalid username/password supplied' },
  },
})

export const getUserLogoutRoute = createRoute({
  tags: ['user'],
  method: 'get',
  path: '/user/logout',
  operationId: 'logoutUser',
  summary: 'Logs out current logged in user session',
  responses: { default: { description: 'successful operation' } },
})

export const getUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'get',
  path: '/user/{username}',
  operationId: 'getUserByName',
  summary: 'Get user by user name',
  request: {
    params: z.object({
      username: z.string().openapi({ param: { in: 'path', name: 'username', required: true } }),
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
  tags: ['user'],
  method: 'put',
  path: '/user/{username}',
  operationId: 'updateUser',
  summary: 'Update user',
  description: 'This can only be done by the logged in user.',
  request: {
    body: {
      description: 'Update an existent user in the store',
      required: false,
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
        'application/x-www-form-urlencoded': { schema: UserSchema },
      },
    },
    params: z.object({
      username: z.string().openapi({ param: { in: 'path', name: 'username', required: true } }),
    }),
  },
  responses: { default: { description: 'successful operation' } },
})

export const deleteUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'delete',
  path: '/user/{username}',
  operationId: 'deleteUser',
  summary: 'Delete user',
  description: 'This can only be done by the logged in user.',
  request: {
    params: z.object({
      username: z.string().openapi({ param: { in: 'path', name: 'username', required: true } }),
    }),
  },
  responses: {
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})
