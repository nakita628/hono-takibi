import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { main } from '.'
import type { Config } from './config'

describe('Hono Takibi', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(__dirname, '..')
  const input = path.join(projectRoot, 'openapi/pet-store.yaml')
  const output = path.join(projectRoot, 'route/petstore.ts')

  beforeEach(() => {
    // 1. create test directory
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    // 2. create directory if it does not exist
    if (!fs.existsSync(`${projectRoot}/routes`)) {
      fs.mkdirSync(`${projectRoot}/routes`, { recursive: true })
    }
    // 3. set as CLI argument
    process.argv = ['/usr/local/bin/node', `/${projectRoot}/dist/index.js`, input, '-o', output]
  })

  afterEach(() => {
    // 1. reset Mock
    vi.restoreAllMocks()
    // 2. remove output file if it exists
    if (fs.existsSync(output)) {
      fs.rmSync(output, { recursive: true })
    }
  })

  // test failed yaml
  it('failed yaml', async () => {
    // 1. set a failed yaml file
    const failedYaml = path.join(projectRoot, 'openapi/failed.yaml')
    // 2. set as CLI argument
    process.argv[2] = failedYaml
    // 3. spy on console.error
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(e.message).toBe(
        `Error parsing /workspaces/hono-takibi/packages/hono-takibi/openapi/failed.yaml: bad indentation of a mapping entry (15:5)

 12 |           type: string
 13 |       required:
 14 |         - message
 15 |     Post:
----------^
 16 |       type: object
 17 |       properties:`,
      )
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })

  // test for missing arguments
  it('should handle missing arguments', async () => {
    process.argv = ['/usr/local/bin/node', 'test']
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(e.message).toBe('Expected a file path, URL, or object. Got undefined')
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })

  // testing for error systems
  it('should handle invalid input file path', async () => {
    // 1. set a nonexistent file path
    const nonExistentFile = path.join(projectRoot, 'test.yaml')
    // 2. set as CLI argument
    process.argv[2] = nonExistentFile
    // 3. spy on console.error
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })

  // test the normal system
  it('Hono Takibi CLI pet-store.yaml', async () => {
    await main(true)
    expect(fs.existsSync('route/petstore.ts')).toBe(true)
    const result = fs.readFileSync('route/petstore.ts', { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

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

    expect(result).toBe(expected)
  })

  it('Hono Takibi CLI hoon-rest-example.yaml', async () => {
    await main(true)
    expect(fs.existsSync('route/hono-rest-example.ts')).toBe(true)
    const result = fs.readFileSync('route/hono-rest-example.ts', { encoding: 'utf-8' })
    expect(fs.existsSync(output)).toBe(true)
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const ErrorSchema = z.object({ message: z.string() }).openapi('Error')

const PostSchema = z
  .object({
    id: z.string().uuid(),
    post: z.string().min(1).max(140),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi('Post')

export const getRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  summary: 'Welcome message',
  description: 'Retrieve a simple welcome message from the Hono API.',
  responses: {
    200: {
      description: 'Successful response with a welcome message.',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})

export const postPostsRoute = createRoute({
  tags: ['Post'],
  method: 'post',
  path: '/posts',
  summary: 'Create a new post',
  description: 'Submit a new post with a maximum length of 140 characters.',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: z.object({ post: z.string().min(1).max(140) }) } },
    },
  },
  responses: {
    201: {
      description: 'Post successfully created.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getPostsRoute = createRoute({
  tags: ['Post'],
  method: 'get',
  path: '/posts',
  summary: 'Retrieve a list of posts',
  description:
    'Retrieve a paginated list of posts. Specify the page number and the number of posts per page.',
  request: {
    query: z.object({
      page: z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({ example: 1 })),
      rows: z.string().pipe(z.coerce.number().int().min(0).default(10).openapi({ example: 10 })),
    }),
  },
  responses: {
    200: {
      description: 'Successfully retrieved a list of posts.',
      content: { 'application/json': { schema: z.array(PostSchema) } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const putPostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'put',
  path: '/posts/{id}',
  summary: 'Update an existing post',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: z.object({ post: z.string().min(1).max(140) }) } },
    },
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: 'Post successfully updated.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const deletePostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'delete',
  path: '/posts/{id}',
  summary: 'Delete a post',
  description: 'Delete an existing post identified by its unique ID.',
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({
          param: { name: 'id', in: 'path' },
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
    }),
  },
  responses: {
    204: { description: 'Post successfully deleted.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})
`
    expect(result).toBe(expected)
  })

  // export schema and type
  it('Hono Takibi CLI type-hono-rest-example.ts', async () => {
    // config
    const config: Config = {
      schema: {
        name: 'camelCase',
        export: true,
      },
      type: {
        name: 'PascalCase',
        export: true,
      },
    }
    await main(true, config)
    expect(fs.existsSync('route/type-hono-rest-example.ts')).toBe(true)
    const result = fs.readFileSync('route/type-hono-rest-example.ts', { encoding: 'utf-8' })
    expect(fs.existsSync(output)).toBe(true)

    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const ErrorSchema = z.object({ message: z.string() }).openapi('Error')

const PostSchema = z
  .object({
    id: z.string().uuid(),
    post: z.string().min(1).max(140),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi('Post')

export const schemas = {
  ErrorSchema,
  PostSchema,
}

export type Error = z.infer<typeof ErrorSchema>

export type Post = z.infer<typeof PostSchema>

export const getRoute = createRoute({
  tags: ['Hono'],
  method: 'get',
  path: '/',
  summary: 'Welcome message',
  description: 'Retrieve a simple welcome message from the Hono API.',
  responses: {
    200: {
      description: 'Successful response with a welcome message.',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Hono🔥' }) }),
        },
      },
    },
  },
})

export const postPostsRoute = createRoute({
  tags: ['Post'],
  method: 'post',
  path: '/posts',
  summary: 'Create a new post',
  description: 'Submit a new post with a maximum length of 140 characters.',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: z.object({ post: z.string().min(1).max(140) }) } },
    },
  },
  responses: {
    201: {
      description: 'Post successfully created.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getPostsRoute = createRoute({
  tags: ['Post'],
  method: 'get',
  path: '/posts',
  summary: 'Retrieve a list of posts',
  description:
    'Retrieve a paginated list of posts. Specify the page number and the number of posts per page.',
  request: {
    query: z.object({
      page: z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({ example: 1 })),
      rows: z.string().pipe(z.coerce.number().int().min(0).default(10).openapi({ example: 10 })),
    }),
  },
  responses: {
    200: {
      description: 'Successfully retrieved a list of posts.',
      content: { 'application/json': { schema: z.array(PostSchema) } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const putPostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'put',
  path: '/posts/{id}',
  summary: 'Update an existing post',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: z.object({ post: z.string().min(1).max(140) }) } },
    },
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: { description: 'Post successfully updated.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const deletePostsIdRoute = createRoute({
  tags: ['Post'],
  method: 'delete',
  path: '/posts/{id}',
  summary: 'Delete a post',
  description: 'Delete an existing post identified by its unique ID.',
  request: {
    params: z.object({
      id: z
        .string()
        .uuid()
        .openapi({
          param: { name: 'id', in: 'path' },
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
    }),
  },
  responses: {
    204: { description: 'Post successfully deleted.' },
    400: {
      description: 'Invalid input.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})
`

    expect(result).toBe(expected)
  })
})
