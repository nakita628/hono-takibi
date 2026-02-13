import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const OrderSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    petId: z.int64().exactOptional().openapi({ example: 198772 }),
    quantity: z.int32().exactOptional().openapi({ example: 7 }),
    shipDate: z.iso.datetime().exactOptional(),
    status: z
      .enum(['placed', 'approved', 'delivered'])
      .exactOptional()
      .openapi({ description: 'Order Status', example: 'approved' }),
    complete: z.boolean().exactOptional(),
  })
  .openapi({ xml: { name: 'order' } })
  .openapi('Order')

const AddressSchema = z
  .object({
    street: z.string().exactOptional().openapi({ example: '437 Lytton' }),
    city: z.string().exactOptional().openapi({ example: 'Palo Alto' }),
    state: z.string().exactOptional().openapi({ example: 'CA' }),
    zip: z.string().exactOptional().openapi({ example: '94301' }),
  })
  .openapi({ xml: { name: 'address' } })
  .openapi('Address')

const CustomerSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 100000 }),
    username: z.string().exactOptional().openapi({ example: 'fehguy' }),
    address: z
      .array(AddressSchema)
      .exactOptional()
      .openapi({ xml: { name: 'addresses', wrapped: true } }),
  })
  .openapi({ xml: { name: 'customer' } })
  .openapi('Customer')

const CategorySchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 1 }),
    name: z.string().exactOptional().openapi({ example: 'Dogs' }),
  })
  .openapi({ xml: { name: 'category' } })
  .openapi('Category')

const UserSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    username: z.string().exactOptional().openapi({ example: 'theUser' }),
    firstName: z.string().exactOptional().openapi({ example: 'John' }),
    lastName: z.string().exactOptional().openapi({ example: 'James' }),
    email: z.string().exactOptional().openapi({ example: 'john@email.com' }),
    password: z.string().exactOptional().openapi({ example: '12345' }),
    phone: z.string().exactOptional().openapi({ example: '12345' }),
    userStatus: z.int32().exactOptional().openapi({ description: 'User Status', example: 1 }),
  })
  .openapi({ xml: { name: 'user' } })
  .openapi('User')

const TagSchema = z
  .object({ id: z.int64().exactOptional(), name: z.string().exactOptional() })
  .openapi({ xml: { name: 'tag' } })
  .openapi('Tag')

const PetSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    name: z.string().openapi({ example: 'doggie' }),
    category: CategorySchema.exactOptional(),
    photoUrls: z
      .array(z.string().openapi({ xml: { name: 'photoUrl' } }))
      .openapi({ xml: { wrapped: true } }),
    tags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ xml: { wrapped: true } }),
    status: z
      .enum(['available', 'pending', 'sold'])
      .exactOptional()
      .openapi({ description: 'pet status in the store' }),
  })
  .openapi({ required: ['name', 'photoUrls'], xml: { name: 'pet' } })
  .openapi('Pet')

const ApiResponseSchema = z
  .object({
    code: z.int32().exactOptional(),
    type: z.string().exactOptional(),
    message: z.string().exactOptional(),
  })
  .openapi({ xml: { name: '##default' } })
  .openapi('ApiResponse')

const PetRequestBody = {
  description: 'Pet object that needs to be added to the store',
  content: { 'application/json': { schema: PetSchema }, 'application/xml': { schema: PetSchema } },
}

const UserArrayRequestBody = {
  description: 'List of user object',
  content: { 'application/json': { schema: z.array(UserSchema) } },
}

const PetstoreAuthSecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://petstore3.swagger.io/oauth/authorize',
      scopes: { 'write:pets': 'modify pets in your account', 'read:pets': 'read your pets' },
    },
  },
}

const ApiKeySecurityScheme = { type: 'apiKey', name: 'api_key', in: 'header' }

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
      content: { 'application/json': { schema: PetSchema } },
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
      content: { 'application/json': { schema: PetSchema } },
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
        .exactOptional()
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
        }),
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
            .exactOptional()
            .openapi({
              param: {
                name: 'tags',
                in: 'query',
                description: 'Tags to filter by',
                required: false,
                explode: true,
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'tags',
            in: 'query',
            description: 'Tags to filter by',
            required: false,
            explode: true,
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
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
        }),
    }),
    query: z.object({
      name: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'name',
            in: 'query',
            description: 'Name of pet that needs to be updated',
            schema: { type: 'string' },
          },
        }),
      status: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'Status of pet that needs to be updated',
            schema: { type: 'string' },
          },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'api_key',
            in: 'header',
            description: '',
            required: false,
            schema: { type: 'string' },
          },
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
    params: z.object({
      petId: z
        .int64()
        .openapi({
          param: {
            name: 'petId',
            in: 'path',
            description: 'ID of pet to update',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        }),
    }),
    query: z.object({
      additionalMetadata: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'additionalMetadata',
            in: 'query',
            description: 'Additional Metadata',
            required: false,
            schema: { type: 'string' },
          },
        }),
    }),
    body: { content: { 'application/octet-stream': { schema: z.file() } } },
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
      content: { 'application/json': { schema: z.record(z.string(), z.int32()) } },
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
  request: { body: { content: { 'application/json': { schema: OrderSchema } } } },
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
      content: { 'application/json': { schema: UserSchema } },
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
  request: { body: { content: { 'application/json': { schema: z.array(UserSchema) } } } },
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
        .exactOptional()
        .openapi({
          param: {
            name: 'username',
            in: 'query',
            description: 'The user name for login',
            required: false,
            schema: { type: 'string' },
          },
        }),
      password: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'password',
            in: 'query',
            description: 'The password for login in clear text',
            required: false,
            schema: { type: 'string' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      headers: z.object({
        'X-Rate-Limit': {
          description: 'calls per hour allowed by the user',
          schema: z
            .int32()
            .exactOptional()
            .openapi({ description: 'calls per hour allowed by the user' }),
        },
        'X-Expires-After': {
          description: 'date in UTC when token expires',
          schema: z.iso
            .datetime()
            .exactOptional()
            .openapi({ description: 'date in UTC when token expires' }),
        },
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
    params: z.object({
      username: z
        .string()
        .openapi({
          param: {
            name: 'username',
            in: 'path',
            description: 'name that need to be deleted',
            required: true,
            schema: { type: 'string' },
          },
        }),
    }),
    body: {
      description: 'Update an existent user in the store',
      content: { 'application/json': { schema: UserSchema } },
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
        }),
    }),
  },
  responses: {
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})

function mockCategory() {
  return {
    id: faker.helpers.arrayElement([
      faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
      undefined,
    ]),
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
  }
}

function mockTag() {
  return {
    id: faker.helpers.arrayElement([
      faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
      undefined,
    ]),
    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),
  }
}

function mockPet() {
  return {
    id: faker.helpers.arrayElement([
      faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
      undefined,
    ]),
    name: faker.person.fullName(),
    category: faker.helpers.arrayElement([mockCategory(), undefined]),
    photoUrls: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 20 } }),
    ),
    tags: faker.helpers.arrayElement([
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockTag()),
      undefined,
    ]),
    status: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['available', 'pending', 'sold'] as const),
      undefined,
    ]),
  }
}

function mockApiResponse() {
  return {
    code: faker.helpers.arrayElement([
      faker.number.int({ min: -2147483648, max: 2147483647 }),
      undefined,
    ]),
    type: faker.helpers.arrayElement([faker.helpers.arrayElement(['A', 'B', 'C']), undefined]),
    message: faker.helpers.arrayElement([
      faker.string.alpha({ length: { min: 5, max: 20 } }),
      undefined,
    ]),
  }
}

function mockOrder() {
  return {
    id: faker.helpers.arrayElement([
      faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
      undefined,
    ]),
    petId: faker.helpers.arrayElement([
      faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
      undefined,
    ]),
    quantity: faker.helpers.arrayElement([
      faker.number.int({ min: -2147483648, max: 2147483647 }),
      undefined,
    ]),
    shipDate: faker.helpers.arrayElement([faker.date.past().toISOString(), undefined]),
    status: faker.helpers.arrayElement([
      faker.helpers.arrayElement(['placed', 'approved', 'delivered'] as const),
      undefined,
    ]),
    complete: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
  }
}

function mockUser() {
  return {
    id: faker.helpers.arrayElement([
      faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
      undefined,
    ]),
    username: faker.helpers.arrayElement([faker.internet.username(), undefined]),
    firstName: faker.helpers.arrayElement([faker.person.firstName(), undefined]),
    lastName: faker.helpers.arrayElement([faker.person.lastName(), undefined]),
    email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
    password: faker.helpers.arrayElement([faker.internet.password(), undefined]),
    phone: faker.helpers.arrayElement([faker.phone.number(), undefined]),
    userStatus: faker.helpers.arrayElement([
      faker.number.int({ min: -2147483648, max: 2147483647 }),
      undefined,
    ]),
  }
}

const putPetRouteHandler: RouteHandler<typeof putPetRoute> = async (c) => {
  return c.json(mockPet(), 200)
}

const postPetRouteHandler: RouteHandler<typeof postPetRoute> = async (c) => {
  return c.json(mockPet(), 200)
}

const getPetFindByStatusRouteHandler: RouteHandler<typeof getPetFindByStatusRoute> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockPet()),
    200,
  )
}

const getPetFindByTagsRouteHandler: RouteHandler<typeof getPetFindByTagsRoute> = async (c) => {
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockPet()),
    200,
  )
}

const getPetPetIdRouteHandler: RouteHandler<typeof getPetPetIdRoute> = async (c) => {
  return c.json(mockPet(), 200)
}

const postPetPetIdRouteHandler: RouteHandler<typeof postPetPetIdRoute> = async (c) => {
  return c.body(null, 200)
}

const deletePetPetIdRouteHandler: RouteHandler<typeof deletePetPetIdRoute> = async (c) => {
  return c.body(null, 200)
}

const postPetPetIdUploadImageRouteHandler: RouteHandler<
  typeof postPetPetIdUploadImageRoute
> = async (c) => {
  return c.json(mockApiResponse(), 200)
}

const getStoreInventoryRouteHandler: RouteHandler<typeof getStoreInventoryRoute> = async (c) => {
  return c.json(undefined, 200)
}

const postStoreOrderRouteHandler: RouteHandler<typeof postStoreOrderRoute> = async (c) => {
  return c.json(mockOrder(), 200)
}

const getStoreOrderOrderIdRouteHandler: RouteHandler<typeof getStoreOrderOrderIdRoute> = async (
  c,
) => {
  return c.json(mockOrder(), 200)
}

const deleteStoreOrderOrderIdRouteHandler: RouteHandler<
  typeof deleteStoreOrderOrderIdRoute
> = async (c) => {
  return c.body(null, 200)
}

const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {
  return c.body(null, 200)
}

const postUserCreateWithListRouteHandler: RouteHandler<typeof postUserCreateWithListRoute> = async (
  c,
) => {
  return c.json(mockUser(), 200)
}

const getUserLoginRouteHandler: RouteHandler<typeof getUserLoginRoute> = async (c) => {
  return c.json(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const getUserLogoutRouteHandler: RouteHandler<typeof getUserLogoutRoute> = async (c) => {
  return c.body(null, 200)
}

const getUserUsernameRouteHandler: RouteHandler<typeof getUserUsernameRoute> = async (c) => {
  return c.json(mockUser(), 200)
}

const putUserUsernameRouteHandler: RouteHandler<typeof putUserUsernameRoute> = async (c) => {
  return c.body(null, 200)
}

const deleteUserUsernameRouteHandler: RouteHandler<typeof deleteUserUsernameRoute> = async (c) => {
  return c.body(null, 200)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(putPetRoute, putPetRouteHandler)
  .openapi(postPetRoute, postPetRouteHandler)
  .openapi(getPetFindByStatusRoute, getPetFindByStatusRouteHandler)
  .openapi(getPetFindByTagsRoute, getPetFindByTagsRouteHandler)
  .openapi(getPetPetIdRoute, getPetPetIdRouteHandler)
  .openapi(postPetPetIdRoute, postPetPetIdRouteHandler)
  .openapi(deletePetPetIdRoute, deletePetPetIdRouteHandler)
  .openapi(postPetPetIdUploadImageRoute, postPetPetIdUploadImageRouteHandler)
  .openapi(getStoreInventoryRoute, getStoreInventoryRouteHandler)
  .openapi(postStoreOrderRoute, postStoreOrderRouteHandler)
  .openapi(getStoreOrderOrderIdRoute, getStoreOrderOrderIdRouteHandler)
  .openapi(deleteStoreOrderOrderIdRoute, deleteStoreOrderOrderIdRouteHandler)
  .openapi(postUserRoute, postUserRouteHandler)
  .openapi(postUserCreateWithListRoute, postUserCreateWithListRouteHandler)
  .openapi(getUserLoginRoute, getUserLoginRouteHandler)
  .openapi(getUserLogoutRoute, getUserLogoutRouteHandler)
  .openapi(getUserUsernameRoute, getUserUsernameRouteHandler)
  .openapi(putUserUsernameRoute, putUserUsernameRouteHandler)
  .openapi(deleteUserUsernameRoute, deleteUserUsernameRouteHandler)

export default app
