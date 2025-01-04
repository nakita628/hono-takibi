import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { main } from '.'

describe('Hono Takibi', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const projectRoot = path.resolve(__dirname, '..')
  const input = path.join(projectRoot, 'example/pet-store.yaml')
  const output = path.join(projectRoot, 'routes/petstore-index.ts')

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

  // test the normal system
  it.concurrent('Hono Takibi CLI pet-store.yaml', async () => {
    await main(true)
    expect(fs.existsSync(output)).toBe(true)
    const result = fs.readFileSync(output, { encoding: 'utf-8' })
    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const orderSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }).optional(),
    petId: z.number().int().openapi({ example: 198772 }).optional(),
    quantity: z.number().int().openapi({ example: 7 }).optional(),
    shipDate: z.string().datetime().optional(),
    status: z.enum(['placed', 'approved', 'delivered']).openapi({ example: 'approved' }).optional(),
    complete: z.boolean().optional(),
  })
  .openapi(Order)

const addressSchema = z
  .object({
    street: z.string().openapi({ example: '437 Lytton' }).optional(),
    city: z.string().openapi({ example: 'Palo Alto' }).optional(),
    state: z.string().openapi({ example: 'CA' }).optional(),
    zip: z.string().openapi({ example: '94301' }).optional(),
  })
  .openapi(Address)

const customerSchema = z
  .object({
    id: z.number().int().openapi({ example: 100000 }).optional(),
    username: z.string().openapi({ example: 'fehguy' }).optional(),
    address: z.array(addressSchema).optional(),
  })
  .openapi(Customer)

const categorySchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }).optional(),
    name: z.string().openapi({ example: 'Dogs' }).optional(),
  })
  .openapi(Category)

const userSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }).optional(),
    username: z.string().openapi({ example: 'theUser' }).optional(),
    firstName: z.string().openapi({ example: 'John' }).optional(),
    lastName: z.string().openapi({ example: 'James' }).optional(),
    email: z.string().openapi({ example: 'john@email.com' }).optional(),
    password: z.string().openapi({ example: '12345' }).optional(),
    phone: z.string().openapi({ example: '12345' }).optional(),
    userStatus: z.number().int().openapi({ example: 1 }).optional(),
  })
  .openapi(User)

const tagSchema = z
  .object({ id: z.number().int().optional(), name: z.string().optional() })
  .openapi(Tag)

const petSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }).optional(),
    name: z.string().openapi({ example: 'doggie' }),
    category: categorySchema.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(tagSchema).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional(),
  })
  .openapi(Pet)

const apiResponseSchema = z
  .object({
    code: z.number().int().optional(),
    type: z.string().optional(),
    message: z.string().optional(),
  })
  .openapi(ApiResponse)

export const schemas = {
  orderSchema,
  addressSchema,
  customerSchema,
  categorySchema,
  userSchema,
  tagSchema,
  petSchema,
  apiResponseSchema,
}

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
        'application/json': { schema: petSchema },
        'application/xml': { schema: petSchema },
        'application/x-www-form-urlencoded': { schema: petSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': { schema: petSchema },
        'application/xml': { schema: petSchema },
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
        'application/json': { schema: petSchema },
        'application/xml': { schema: petSchema },
        'application/x-www-form-urlencoded': { schema: petSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': { schema: petSchema },
        'application/xml': { schema: petSchema },
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
        'application/json': { schema: z.array(petSchema) },
        'application/xml': { schema: z.array(petSchema) },
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
        'application/json': { schema: z.array(petSchema) },
        'application/xml': { schema: z.array(petSchema) },
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
        'application/json': { schema: petSchema },
        'application/xml': { schema: petSchema },
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
      content: { 'application/json': { schema: apiResponseSchema } },
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
        'application/json': { schema: orderSchema },
        'application/xml': { schema: orderSchema },
        'application/x-www-form-urlencoded': { schema: orderSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: orderSchema } },
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
        'application/json': { schema: orderSchema },
        'application/xml': { schema: orderSchema },
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
        'application/json': { schema: userSchema },
        'application/xml': { schema: userSchema },
        'application/x-www-form-urlencoded': { schema: userSchema },
      },
    },
  },
  responses: {
    default: {
      description: 'successful operation',
      content: {
        'application/json': { schema: userSchema },
        'application/xml': { schema: userSchema },
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
    body: { required: false, content: { 'application/json': { schema: z.array(userSchema) } } },
  },
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': { schema: userSchema },
        'application/xml': { schema: userSchema },
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
        'application/json': { schema: userSchema },
        'application/xml': { schema: userSchema },
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
        'application/json': { schema: userSchema },
        'application/xml': { schema: userSchema },
        'application/x-www-form-urlencoded': { schema: userSchema },
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

  // test failed yaml
  it.concurrent('failed yaml', async () => {
    // 1. set a failed yaml file
    const failedYaml = path.join(projectRoot, 'example/failed.yaml')
    // 2. set as CLI argument
    process.argv[2] = failedYaml
    // 3. spy on console.error
    const consoleError = vi.spyOn(console, 'error')
    try {
      await main(true)
    } catch (e) {
      expect(e.message).toBe(
        `Cannot destructure property 'schemas' of 'components' as it is undefined.`,
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
  it.concurrent('should handle invalid input file path', async () => {
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
})
