import { createRoute, z } from '@hono/zod-openapi'

const OrderSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    petId: z.int64().exactOptional().openapi({ example: 198772 }),
    quantity: z.int32().exactOptional().openapi({ example: 7 }),
    shipDate: z.iso.datetime().exactOptional(),
    status: z.enum(['placed', 'approved', 'delivered']).exactOptional(),
    complete: z.boolean().exactOptional(),
  })
  .openapi('Order')

const CategorySchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 1 }),
    name: z.string().exactOptional().openapi({ example: 'Dogs' }),
  })
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
    userStatus: z.int32().exactOptional().openapi({ example: 1 }),
  })
  .openapi('User')

const TagSchema = z
  .object({ id: z.int64().exactOptional(), name: z.string().exactOptional() })
  .openapi('Tag')

const PetSchema = z
  .object({
    id: z.int64().exactOptional().openapi({ example: 10 }),
    name: z.string().openapi({ example: 'doggie' }),
    category: CategorySchema.exactOptional(),
    photoUrls: z.array(z.string()),
    tags: z.array(TagSchema).exactOptional(),
    status: z.enum(['available', 'pending', 'sold']).exactOptional(),
  })
  .openapi({ required: ['name', 'photoUrls'] })
  .openapi('Pet')

const ApiResponseSchema = z
  .object({
    code: z.int32().exactOptional(),
    type: z.string().exactOptional(),
    message: z.string().exactOptional(),
  })
  .openapi('ApiResponse')

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
      content: { 'application/json': { schema: PetSchema } },
    },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Pet not found' },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const postPetRoute = createRoute({
  method: 'post',
  path: '/pet',
  tags: ['pet'],
  summary: 'Add a new pet to the store',
  operationId: 'addPet',
  request: { body: { content: { 'application/json': { schema: PetSchema } }, required: true } },
  responses: {
    200: {
      description: 'Successful operation',
      content: { 'application/json': { schema: PetSchema } },
    },
    400: { description: 'Invalid input' },
  },
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
})

export const getPetFindByStatusRoute = createRoute({
  method: 'get',
  path: '/pet/findByStatus',
  tags: ['pet'],
  summary: 'Finds Pets by status',
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
      content: { 'application/json': { schema: z.array(PetSchema) } },
    },
    400: { description: 'Invalid status value' },
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
      petId: z.int64().openapi({
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
      content: { 'application/json': { schema: PetSchema } },
    },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Pet not found' },
  },
  security: [{ api_key: [] }],
})

export const deletePetPetIdRoute = createRoute({
  method: 'delete',
  path: '/pet/{petId}',
  tags: ['pet'],
  summary: 'Deletes a pet',
  operationId: 'deletePet',
  request: {
    params: z.object({
      petId: z.int64().openapi({
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

export const getStoreInventoryRoute = createRoute({
  method: 'get',
  path: '/store/inventory',
  tags: ['store'],
  summary: 'Returns pet inventories by status',
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
  operationId: 'placeOrder',
  request: { body: { content: { 'application/json': { schema: OrderSchema } } } },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: OrderSchema } },
    },
    400: { description: 'Invalid input' },
  },
})

export const postUserRoute = createRoute({
  method: 'post',
  path: '/user',
  tags: ['user'],
  summary: 'Create user',
  operationId: 'createUser',
  request: { body: { content: { 'application/json': { schema: UserSchema } } } },
  responses: {
    default: {
      description: 'successful operation',
      content: { 'application/json': { schema: UserSchema } },
    },
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
        .openapi({ param: { name: 'username', in: 'query', schema: { type: 'string' } } }),
      password: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'password', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.string() } },
    },
    400: { description: 'Invalid username/password supplied' },
  },
})

export const getUserUsernameRoute = createRoute({
  method: 'get',
  path: '/user/{username}',
  tags: ['user'],
  summary: 'Get user by user name',
  operationId: 'getUserByName',
  request: {
    params: z.object({
      username: z.string().openapi({
        param: { name: 'username', in: 'path', required: true, schema: { type: 'string' } },
      }),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: UserSchema } },
    },
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})
