export const petStoreOpenAPIExpected = `import { createRoute, z } from '@hono/zod-openapi'

const OrderSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }),
    petId: z.number().int().openapi({ example: 198772 }),
    quantity: z.number().int().openapi({ example: 7 }),
    shipDate: z.string().datetime(),
    status: z.enum(['placed', 'approved', 'delivered']).openapi({ example: 'approved' }),
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
    id: z.number().int().openapi({ example: 100000 }),
    username: z.string().openapi({ example: 'fehguy' }),
    address: z.array(AddressSchema),
  })
  .partial()
  .openapi('Customer')

const CategorySchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Dogs' }),
  })
  .partial()
  .openapi('Category')

const UserSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }),
    username: z.string().openapi({ example: 'theUser' }),
    firstName: z.string().openapi({ example: 'John' }),
    lastName: z.string().openapi({ example: 'James' }),
    email: z.string().openapi({ example: 'john@email.com' }),
    password: z.string().openapi({ example: '12345' }),
    phone: z.string().openapi({ example: '12345' }),
    userStatus: z.number().int().openapi({ example: 1 }),
  })
  .partial()
  .openapi('User')

const TagSchema = z.object({ id: z.number().int(), name: z.string() }).partial().openapi('Tag')

const PetSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }).optional(),
    name: z.string().openapi({ example: 'doggie' }),
    category: CategorySchema.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(TagSchema).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional(),
  })
  .openapi('Pet')

const ApiResponseSchema = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .openapi('ApiResponse')

export const putPetRoute = createRoute({
  tags: ['pet'],
  method: 'put',
  path: '/pet',
  summary: 'Update an existing pet',
  description: 'Update an existing pet by Id',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    body: {
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
  summary: 'Add a new pet to the store',
  description: 'Add a new pet to the store',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    body: {
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
  summary: 'Finds Pets by status',
  description: 'Multiple status values can be provided with comma separated strings',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: { query: z.object({ status: z.enum(['available', 'pending', 'sold']).optional() }) },
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
  summary: 'Finds Pets by tags',
  description:
    'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: { query: z.object({ tags: z.array(z.string()).optional() }) },
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
  summary: 'Find pet by ID',
  description: 'Returns a single pet',
  security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
  request: { params: z.object({ petId: z.number().int() }) },
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
  summary: 'Updates a pet in the store with form data',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    params: z.object({ petId: z.number().int() }),
    query: z.object({ name: z.string().optional(), status: z.string().optional() }),
  },
  responses: { 400: { description: 'Invalid input' } },
})

export const deletePetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'delete',
  path: '/pet/{petId}',
  summary: 'Deletes a pet',
  description: 'delete a pet',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    header: z.object({ api_key: z.string().optional() }),
    params: z.object({ petId: z.number().int() }),
  },
  responses: { 400: { description: 'Invalid pet value' } },
})

export const postPetPetIdUploadImageRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet/{petId}/uploadImage',
  summary: 'uploads an image',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    body: { required: false, content: { 'application/octet-stream': { schema: z.string() } } },
    params: z.object({ petId: z.number().int() }),
    query: z.object({ additionalMetadata: z.string().optional() }),
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
  summary: 'Returns pet inventories by status',
  description: 'Returns a map of status codes to quantities',
  security: [{ api_key: [] }],
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.record(z.string(), z.number().int()) } },
    },
  },
})

export const postStoreOrderRoute = createRoute({
  tags: ['store'],
  method: 'post',
  path: '/store/order',
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
  summary: 'Find purchase order by ID',
  description:
    'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
  request: { params: z.object({ orderId: z.number().int() }) },
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
  summary: 'Delete purchase order by ID',
  description:
    'For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors',
  request: { params: z.object({ orderId: z.number().int() }) },
  responses: {
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Order not found' },
  },
})

export const postUserRoute = createRoute({
  tags: ['user'],
  method: 'post',
  path: '/user',
  summary: 'Create user',
  description: 'This can only be done by the logged in user.',
  request: {
    body: {
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
  summary: 'Logs user into the system',
  request: {
    query: z.object({ username: z.string().optional(), password: z.string().optional() }),
  },
  responses: {
    200: {
      description: 'successful operation',
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
  summary: 'Logs out current logged in user session',
  responses: { default: { description: 'successful operation' } },
})

export const getUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'get',
  path: '/user/{username}',
  summary: 'Get user by user name',
  request: { params: z.object({ username: z.string() }) },
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
  summary: 'Update user',
  description: 'This can only be done by the logged in user.',
  request: {
    body: {
      required: false,
      content: {
        'application/json': { schema: UserSchema },
        'application/xml': { schema: UserSchema },
        'application/x-www-form-urlencoded': { schema: UserSchema },
      },
    },
    params: z.object({ username: z.string() }),
  },
  responses: { default: { description: 'successful operation' } },
})

export const deleteUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'delete',
  path: '/user/{username}',
  summary: 'Delete user',
  description: 'This can only be done by the logged in user.',
  request: { params: z.object({ username: z.string() }) },
  responses: {
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})
`