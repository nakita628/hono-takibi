import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { main } from '.'

const honoCode = `import { createRoute, z } from '@hono/zod-openapi'

const Order = z.object({
  id: z.number().int().optional(),
  petId: z.number().int().optional(),
  quantity: z.number().int().optional(),
  shipDate: z.string().datetime().optional(),
  status: z.enum(['placed', 'approved', 'delivered']).optional(),
  complete: z.boolean().optional(),
})

const Address = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
})

const Customer = z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  address: z.array(Address).optional(),
})

const Category = z.object({ id: z.number().int().optional(), name: z.string().optional() })

const User = z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  userStatus: z.number().int().optional(),
})

const Tag = z.object({ id: z.number().int().optional(), name: z.string().optional() })

const Pet = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  category: Category.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(Tag).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
})

const ApiResponse = z.object({
  code: z.number().int().optional(),
  type: z.string().optional(),
  message: z.string().optional(),
})

export const schemas = {
  Order,
  Address,
  Customer,
  Category,
  User,
  Tag,
  Pet,
  ApiResponse,
}

export const putPetRoute = createRoute({
  tags: ['pet'],
  method: 'put',
  path: '/pet',
  description: 'Update an existing pet by Id',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: { body: { required: true, content: { 'application/json': { schema: Pet } } } },
  responses: {
    200: { description: 'Successful operation', content: { 'application/json': { schema: Pet } } },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Pet not found' },
    422: { description: 'Validation exception' },
  },
})

export const postPetRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet',
  description: 'Add a new pet to the store',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: { body: { required: true, content: { 'application/json': { schema: Pet } } } },
  responses: {
    200: { description: 'Successful operation', content: { 'application/json': { schema: Pet } } },
    400: { description: 'Invalid input' },
    422: { description: 'Validation exception' },
  },
})

export const getPetFindByStatusRoute = createRoute({
  tags: ['pet'],
  method: 'get',
  path: '/pet/findByStatus',
  description: 'Multiple status values can be provided with comma separated strings',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: { query: z.object({ status: z.enum(['available', 'pending', 'sold']).optional() }) },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.array(Pet) } },
    },
    400: { description: 'Invalid status value' },
  },
})

export const getPetFindByTagsRoute = createRoute({
  tags: ['pet'],
  method: 'get',
  path: '/pet/findByTags',
  description:
    'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: { query: z.object({ tags: z.array(z.string()).optional() }) },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.array(Pet) } },
    },
    400: { description: 'Invalid tag value' },
  },
})

export const getPetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'get',
  path: '/pet/{petId}',
  description: 'Returns a single pet',
  security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
  request: { params: z.object({ petId: z.number().int() }) },
  responses: {
    200: { description: 'successful operation', content: { 'application/json': { schema: Pet } } },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Pet not found' },
  },
})

export const postPetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet/{petId}',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    query: z.object({ name: z.string().optional(), status: z.string().optional() }),
    params: z.object({ petId: z.number().int() }),
  },
  responses: { 400: { description: 'Invalid input' } },
})

export const deletePetPetIdRoute = createRoute({
  tags: ['pet'],
  method: 'delete',
  path: '/pet/{petId}',
  description: 'delete a pet',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    params: z.object({ petId: z.number().int() }),
    headers: z.object({ api_key: z.string().optional() }),
  },
  responses: { 400: { description: 'Invalid pet value' } },
})

export const postPetPetIdUploadImageRoute = createRoute({
  tags: ['pet'],
  method: 'post',
  path: '/pet/{petId}/uploadImage',
  security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
  request: {
    query: z.object({ additionalMetadata: z.string().optional() }),
    params: z.object({ petId: z.number().int() }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: ApiResponse } },
    },
  },
})

export const getStoreInventoryRoute = createRoute({
  tags: ['store'],
  method: 'get',
  path: '/store/inventory',
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
  description: 'Place a new order in the store',
  request: { body: { required: false, content: { 'application/json': { schema: Order } } } },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: Order } },
    },
    400: { description: 'Invalid input' },
    422: { description: 'Validation exception' },
  },
})

export const getStoreOrderOrderIdRoute = createRoute({
  tags: ['store'],
  method: 'get',
  path: '/store/order/{orderId}',
  description:
    'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
  request: { params: z.object({ orderId: z.number().int() }) },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: Order } },
    },
    400: { description: 'Invalid ID supplied' },
    404: { description: 'Order not found' },
  },
})

export const deleteStoreOrderOrderIdRoute = createRoute({
  tags: ['store'],
  method: 'delete',
  path: '/store/order/{orderId}',
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
  description: 'This can only be done by the logged in user.',
  request: { body: { required: false, content: { 'application/json': { schema: User } } } },
  responses: {
    default: {
      description: 'successful operation',
      content: { 'application/json': { schema: User } },
    },
  },
})

export const postUserCreateWithListRoute = createRoute({
  tags: ['user'],
  method: 'post',
  path: '/user/createWithList',
  description: 'Creates list of users with given input array',
  request: {
    body: { required: false, content: { 'application/json': { schema: z.array(User) } } },
  },
  responses: {
    200: { description: 'Successful operation', content: { 'application/json': { schema: User } } },
    default: { description: 'successful operation' },
  },
})

export const getUserLoginRoute = createRoute({
  tags: ['user'],
  method: 'get',
  path: '/user/login',
  request: {
    query: z.object({ username: z.string().optional(), password: z.string().optional() }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.string() } },
    },
    400: { description: 'Invalid username/password supplied' },
  },
})

export const getUserLogoutRoute = createRoute({
  tags: ['user'],
  method: 'get',
  path: '/user/logout',
  responses: { default: { description: 'successful operation' } },
})

export const getUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'get',
  path: '/user/{username}',
  request: { params: z.object({ username: z.string() }) },
  responses: {
    200: { description: 'successful operation', content: { 'application/json': { schema: User } } },
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})

export const putUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'put',
  path: '/user/{username}',
  description: 'This can only be done by the logged in user.',
  request: {
    body: { required: false, content: { 'application/json': { schema: User } } },
    params: z.object({ username: z.string() }),
  },
  responses: { default: { description: 'successful operation' } },
})

export const deleteUserUsernameRoute = createRoute({
  tags: ['user'],
  method: 'delete',
  path: '/user/{username}',
  description: 'This can only be done by the logged in user.',
  request: { params: z.object({ username: z.string() }) },
  responses: {
    400: { description: 'Invalid username supplied' },
    404: { description: 'User not found' },
  },
})
`

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
  it.concurrent('Hono Takibi CLI', async () => {
    await main(true)
    expect(fs.existsSync(output)).toBe(true)
    const result = fs.readFileSync(output, { encoding: 'utf-8' })
    const expected = honoCode
    expect(result).toEqual(expected)
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
    } catch (error) {
      expect(consoleError).toHaveBeenCalledWith('Usage: hono-takibi <input-file> [-o output-file]')
    }
  })
})
