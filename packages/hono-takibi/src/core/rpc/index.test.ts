import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { rpc } from './index.js'

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi - test-only sample',
    version: 'v1',
    description:
      'A slightly more complex CRUD OpenAPI sample intended for Hono test code. Includes array enum roles.',
  },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }, { name: 'Users' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Simple ping for Hono',
        operationId: 'getHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'Hono' } },
                  required: ['message'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'Simple ping for HonoX',
        operationId: 'getHonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'HonoX' } },
                  required: ['message'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'Simple ping for ZodOpenAPIHono',
        operationId: 'getZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { message: { type: 'string', example: 'ZodOpenAPIHono' } },
                  required: ['message'],
                  additionalProperties: false,
                },
              },
            },
          },
        },
      },
    },

    /** -------------------- CRUD: Users -------------------- */
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        description: 'List users with pagination and optional role filter.',
        operationId: 'listUsers',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 200, default: 20 },
            description: 'Items per page.',
          },
          {
            name: 'offset',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 0, default: 0 },
            description: 'Number of items to skip.',
          },
          {
            name: 'role',
            in: 'query',
            required: false,
            description: 'Filter by role (repeatable).',
            schema: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
          },
          {
            name: 'q',
            in: 'query',
            required: false,
            schema: { type: 'string', minLength: 1 },
            description: 'Search term for displayName or affiliations.',
          },
        ],
        responses: {
          '200': {
            description: 'List retrieved.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total: { type: 'integer', minimum: 0 },
                    items: { type: 'array', items: { $ref: '#/components/schemas/User' } },
                  },
                  required: ['total', 'items'],
                  additionalProperties: false,
                },
                examples: {
                  ok: {
                    value: {
                      total: 2,
                      items: [
                        {
                          id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f567',
                          displayName: 'Alice',
                          email: 'alice@example.com',
                          roles: ['speaker', 'attendee'],
                          createdAt: '2025-08-01T12:34:56Z',
                          updatedAt: '2025-08-01T12:34:56Z',
                        },
                        {
                          id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f568',
                          displayName: 'Bob',
                          email: 'bob@example.com',
                          roles: ['staff'],
                          createdAt: '2025-08-01T12:34:56Z',
                          updatedAt: '2025-08-01T12:34:56Z',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create user',
        description: 'Create a new user.',
        operationId: 'createUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserInput' },
              examples: {
                create: {
                  value: {
                    displayName: 'Carol',
                    email: 'carol@example.com',
                    roles: ['attendee', 'ghost-wifi-fixer'],
                    isStudent: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          '400': {
            description: 'Validation error.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '409': {
            description: 'Conflict (e.g., duplicate email).',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },

    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user',
        description: 'Retrieve a single user by ID.',
        operationId: 'getUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'User ID (UUID).',
            schema: { type: 'string', format: 'uuid' },
          },
        ],
        responses: {
          '200': {
            description: 'Retrieved.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          '404': {
            description: 'Not found.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Replace user',
        description:
          'Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.',
        operationId: 'replaceUser',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ReplaceUserInput' },
              examples: {
                replace: {
                  value: {
                    displayName: 'Alice Updated',
                    email: 'alice.updated@example.com',
                    roles: ['speaker', 'mc'],
                    affiliations: ['Honoconf 2025'],
                    isStudent: false,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Replaced.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          '400': {
            description: 'Validation error.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': {
            description: 'Not found.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
      patch: {
        tags: ['Users'],
        summary: 'Update user (partial)',
        description: 'Partial update (PATCH). Only provided fields will be updated.',
        operationId: 'updateUser',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserInput' },
              examples: {
                update: {
                  value: {
                    roles: ['speaker', 'attendee'],
                    pronouns: 'they/them',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Updated.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          '400': {
            description: 'Validation error.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': {
            description: 'Not found.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user',
        description: 'Delete a user by ID.',
        operationId: 'deleteUser',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        responses: {
          '204': { description: 'Deleted (No Content).' },
          '404': {
            description: 'Not found.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Role: {
        type: 'string',
        enum: ['attendee', 'speaker', 'lt-speaker', 'staff', 'sponsor', 'mc', 'ghost-wifi-fixer'],
        description:
          "Event role. In code this corresponds to: roles?: ('attendee' | 'speaker' | 'lt-speaker' | 'staff' | 'sponsor' | 'mc' | 'ghost-wifi-fixer')[]",
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', description: 'User ID' },
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
          isStudent: { type: 'boolean', description: 'Whether the user is a student' },
          pronouns: { type: 'string', description: 'e.g., he/him, she/her, they/them' },
          affiliations: { type: 'array', items: { type: 'string' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'displayName', 'email', 'createdAt', 'updatedAt'],
        additionalProperties: false,
        example: {
          id: '018f1a2b-3c4d-5e6f-8a90-b1c2d3e4f567',
          displayName: 'Alice',
          email: 'alice@example.com',
          roles: ['speaker', 'attendee'],
          createdAt: '2025-08-01T12:34:56Z',
          updatedAt: '2025-08-01T12:34:56Z',
        },
      },
      CreateUserInput: {
        type: 'object',
        properties: {
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
          isStudent: { type: 'boolean' },
          pronouns: { type: 'string' },
          affiliations: { type: 'array', items: { type: 'string' } },
        },
        required: ['displayName', 'email'],
        additionalProperties: false,
      },
      ReplaceUserInput: {
        type: 'object',
        description: 'Full resource replacement (PUT). Required core fields must be present.',
        properties: {
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
          isStudent: { type: 'boolean' },
          pronouns: { type: 'string' },
          affiliations: { type: 'array', items: { type: 'string' } },
        },
        required: ['displayName', 'email'],
        additionalProperties: false,
      },
      UpdateUserInput: {
        type: 'object',
        description: 'Partial update (PATCH). All properties are optional.',
        properties: {
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
          roles: { type: 'array', items: { $ref: '#/components/schemas/Role' } },
          isStudent: { type: 'boolean' },
          pronouns: { type: 'string' },
          affiliations: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          code: { type: 'string', example: 'BAD_REQUEST' },
        },
        required: ['message'],
        additionalProperties: false,
      },
    },
  },
}

describe('rpc', () => {
  it('should generate the correct import code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-'))
    try {
      const input = path.join(dir, 'openapi.json') as
        | `${string}.yaml`
        | `${string}.json`
        | `${string}.tsp`
      const out = path.join(dir, 'index.ts')
      fs.writeFileSync(input, JSON.stringify(openapi), 'utf-8')

      const result = await rpc(openapi, out, '../index.ts', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const index = fs.readFileSync(out, 'utf-8')
      const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await client.hono.$get(undefined, options)
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX(options?: ClientRequestOptions) {
  return await client['hono-x'].$get(undefined, options)
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono(options?: ClientRequestOptions) {
  return await client['zod-openapi-hono'].$get(undefined, options)
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$put(args, options)
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$patch(args, options)
}
`

      expect(index).toStrictEqual(expected)
      expect(result.ok).toBe(true)
      expect(result.value).toMatch(/Generated rpc code written to/)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('rpc (split mode)', () => {
  it('should generate the correct import code (split: true)', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-'))
    try {
      const input = path.join(dir, 'openapi.json') as
        | `${string}.yaml`
        | `${string}.json`
        | `${string}.tsp`
      fs.writeFileSync(input, JSON.stringify(openapi, null, 2), 'utf-8')

      const out = path.join(dir, 'rpc', 'index.ts')
      const result = await rpc(openapi, out, '../index.ts', true)

      const index = fs.readFileSync(path.join(dir, 'rpc', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './getHono'
export * from './getHonoX'
export * from './getZodOpenapiHono'
export * from './getUsers'
export * from './postUsers'
export * from './getUsersId'
export * from './putUsersId'
export * from './deleteUsersId'
export * from './patchUsersId'
`
      expect(index).toBe(indexExpected)

      const deleteUsersId = fs.readFileSync(path.join(dir, 'rpc', 'deleteUsersId.ts'), 'utf-8')
      const deleteUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$delete(args, options)
}
`

      expect(deleteUsersId).toBe(deleteUsersIdExpected)

      const getHono = fs.readFileSync(path.join(dir, 'rpc', 'getHono.ts'), 'utf-8')
      const getHonoExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono(options?: ClientRequestOptions) {
  return await client.hono.$get(undefined, options)
}
`

      expect(getHono).toBe(getHonoExpected)

      const getHonoX = fs.readFileSync(path.join(dir, 'rpc', 'getHonoX.ts'), 'utf-8')
      const getHonoXExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX(options?: ClientRequestOptions) {
  return await client['hono-x'].$get(undefined, options)
}
`

      expect(getHonoX).toBe(getHonoXExpected)

      const getUsers = fs.readFileSync(path.join(dir, 'rpc', 'getUsers.ts'), 'utf-8')

      const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}
`

      expect(getUsers).toBe(expected)

      const getUsersId = fs.readFileSync(path.join(dir, 'rpc', 'getUsersId.ts'), 'utf-8')

      const getUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$get(args, options)
}
`
      expect(getUsersId).toBe(getUsersIdExpected)

      const getZodOpenapiHono = fs.readFileSync(
        path.join(dir, 'rpc', 'getZodOpenapiHono.ts'),
        'utf-8',
      )

      const getZodOpenapiHonoExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono(options?: ClientRequestOptions) {
  return await client['zod-openapi-hono'].$get(undefined, options)
}
`
      expect(getZodOpenapiHono).toBe(getZodOpenapiHonoExpected)

      const patchUsersId = fs.readFileSync(path.join(dir, 'rpc', 'patchUsersId.ts'), 'utf-8')

      const patchUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$patch(args, options)
}
`
      expect(patchUsersId).toBe(patchUsersIdExpected)

      const postUsers = fs.readFileSync(path.join(dir, 'rpc', 'postUsers.ts'), 'utf-8')
      const postUsersExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await client.users.$post(args, options)
}
`
      expect(postUsers).toBe(postUsersExpected)

      const putUsersId = fs.readFileSync(path.join(dir, 'rpc', 'putUsersId.ts'), 'utf-8')

      const putUsersIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../index.ts'

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':id'].$put(args, options)
}
`
      expect(putUsersId).toBe(putUsersIdExpected)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated rpc code written to ${path.join(dir, 'rpc')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

/** Test OpenAPI spec focused on isOptional (required: true/false) */
const openapiIsOptional: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'isOptional Test API',
    version: '1.0.0',
  },
  paths: {
    '/items': {
      get: {
        summary: 'List items with mixed required/optional params',
        operationId: 'listItems',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            description: 'Page number (required)',
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer' },
            description: 'Items per page (optional)',
          },
          {
            name: 'filter',
            in: 'query',
            // required not specified - should be treated as optional
            schema: { type: 'string' },
            description: 'Filter string (optional - required not specified)',
          },
          {
            name: 'X-Request-ID',
            in: 'header',
            required: true,
            schema: { type: 'string' },
            description: 'Request ID (required header)',
          },
          {
            name: 'X-Correlation-ID',
            in: 'header',
            required: false,
            schema: { type: 'string' },
            description: 'Correlation ID (optional header)',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/items/{id}': {
      get: {
        summary: 'Get item by ID',
        operationId: 'getItem',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Item ID (path params are always required)',
          },
          {
            name: 'expand',
            in: 'query',
            required: false,
            schema: { type: 'boolean' },
            description: 'Expand nested resources (optional)',
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/all-required': {
      post: {
        summary: 'All required params',
        operationId: 'allRequiredParams',
        parameters: [
          {
            name: 'tenant',
            in: 'query',
            required: true,
            schema: { type: 'string' },
          },
          {
            name: 'Authorization',
            in: 'header',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  value: { type: 'number' },
                },
                required: ['name', 'value'],
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
        },
      },
    },
    '/all-optional': {
      get: {
        summary: 'All optional params',
        operationId: 'allOptionalParams',
        parameters: [
          {
            name: 'search',
            in: 'query',
            required: false,
            schema: { type: 'string' },
          },
          {
            name: 'sort',
            in: 'query',
            // required not specified
            schema: { type: 'string' },
          },
          {
            name: 'X-Debug',
            in: 'header',
            required: false,
            schema: { type: 'boolean' },
          },
        ],
        responses: {
          '200': { description: 'OK' },
        },
      },
    },
  },
}

describe('rpc (isOptional tests)', () => {
  it('should correctly handle required: true vs required: false for parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-optional-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await rpc(openapiIsOptional, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const generated = fs.readFileSync(out, 'utf-8')

      const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /items
 *
 * List items with mixed required/optional params
 */
export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}

/**
 * GET /items/{id}
 *
 * Get item by ID
 */
export async function getItemsId(
  args: InferRequestType<(typeof client.items)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':id'].$get(args, options)
}

/**
 * POST /all-required
 *
 * All required params
 */
export async function postAllRequired(
  args: InferRequestType<(typeof client)['all-required']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['all-required'].$post(args, options)
}

/**
 * GET /all-optional
 *
 * All optional params
 */
export async function getAllOptional(
  args: InferRequestType<(typeof client)['all-optional']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['all-optional'].$get(args, options)
}
`

      expect(generated).toBe(expected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated rpc code written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate optional params in split mode correctly', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-optional-split-'))
    try {
      const out = path.join(dir, 'rpc', 'index.ts')
      const result = await rpc(openapiIsOptional, out, '../client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check getItems.ts for mixed required/optional
      const getItems = fs.readFileSync(path.join(dir, 'rpc', 'getItems.ts'), 'utf-8')
      const getItemsExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /items
 *
 * List items with mixed required/optional params
 */
export async function getItems(
  args: InferRequestType<typeof client.items.$get>,
  options?: ClientRequestOptions,
) {
  return await client.items.$get(args, options)
}
`
      expect(getItems).toBe(getItemsExpected)

      // Check getItemsId.ts for path param + optional query
      const getItemsId = fs.readFileSync(path.join(dir, 'rpc', 'getItemsId.ts'), 'utf-8')
      const getItemsIdExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /items/{id}
 *
 * Get item by ID
 */
export async function getItemsId(
  args: InferRequestType<(typeof client.items)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.items[':id'].$get(args, options)
}
`
      expect(getItemsId).toBe(getItemsIdExpected)

      // Check postAllRequired.ts - all required params
      const postAllRequired = fs.readFileSync(path.join(dir, 'rpc', 'postAllRequired.ts'), 'utf-8')
      const postAllRequiredExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * POST /all-required
 *
 * All required params
 */
export async function postAllRequired(
  args: InferRequestType<(typeof client)['all-required']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['all-required'].$post(args, options)
}
`
      expect(postAllRequired).toBe(postAllRequiredExpected)

      // Check getAllOptional.ts - all optional params
      const getAllOptional = fs.readFileSync(path.join(dir, 'rpc', 'getAllOptional.ts'), 'utf-8')
      const getAllOptionalExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /all-optional
 *
 * All optional params
 */
export async function getAllOptional(
  args: InferRequestType<(typeof client)['all-optional']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['all-optional'].$get(args, options)
}
`
      expect(getAllOptional).toBe(getAllOptionalExpected)

      // Check index.ts barrel file
      const index = fs.readFileSync(path.join(dir, 'rpc', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './getItems'
export * from './getItemsId'
export * from './postAllRequired'
export * from './getAllOptional'
`
      expect(index).toBe(indexExpected)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated rpc code written to ${path.join(dir, 'rpc')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate code with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-client-'))
    try {
      const out = path.join(dir, 'index.ts')
      const simpleOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              summary: 'Get users',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await rpc(simpleOpenAPI, out, '../api', false, 'authClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      expect(code).toContain("import { authClient } from '../api'")
      expect(code).toContain('return await authClient.users.$get(undefined, options)')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate split files with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-client-split-'))
    try {
      const out = path.join(dir, 'rpc')
      const simpleOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/admin/users': {
            get: {
              summary: 'Get admin users',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await rpc(simpleOpenAPI, out, '../api', true, 'adminClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(path.join(dir, 'rpc', 'getAdminUsers.ts'), 'utf-8')
      expect(code).toContain("import { adminClient } from '../api'")
      expect(code).toContain('return await adminClient.admin.users.$get(undefined, options)')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('rpc (parseResponse: true)', () => {
  it('should generate code with parseResponse wrapper', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-parseResponse-'))
    try {
      const out = path.join(dir, 'index.ts')
      const simpleOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/health': {
            get: {
              summary: 'Health check',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await rpc(simpleOpenAPI, out, '../client', false, 'client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      expect(code).toContain("import { parseResponse } from 'hono/client'")
      expect(code).toContain('return await parseResponse(client.health.$get(undefined, options))')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate code with parseResponse for operations with args', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-parseResponse-args-'))
    try {
      const out = path.join(dir, 'index.ts')
      const openAPIWithArgs: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users/{id}': {
            get: {
              summary: 'Get user by ID',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string' },
                },
              ],
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await rpc(openAPIWithArgs, out, '../client', false, 'client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      expect(code).toContain("import { parseResponse } from 'hono/client'")
      expect(code).toContain("return await parseResponse(client.users[':id'].$get(args, options))")
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate split files with parseResponse', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-parseResponse-split-'))
    try {
      const out = path.join(dir, 'rpc')
      const simpleOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/health': {
            get: {
              summary: 'Health check',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await rpc(simpleOpenAPI, out, '../client', true, 'client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(path.join(dir, 'rpc', 'getHealth.ts'), 'utf-8')
      expect(code).toContain("import { parseResponse } from 'hono/client'")
      expect(code).toContain('return await parseResponse(client.health.$get(undefined, options))')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('rpc (trailing slash)', () => {
  const trailingSlashOpenAPI: OpenAPI = {
    openapi: '3.1.0',
    info: { title: 'Trailing Slash Test', version: '1.0.0' },
    paths: {
      '/api/reverseChiban/': {
        get: {
          summary: 'Reverse Chiban (trailing slash)',
          responses: { '200': { description: 'OK' } },
        },
      },
      '/api/reverseChiban': {
        get: {
          summary: 'Reverse Chiban (no trailing slash)',
          responses: { '200': { description: 'OK' } },
        },
      },
      '/posts/': {
        get: {
          summary: 'List posts (trailing slash)',
          parameters: [
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer' },
            },
          ],
          responses: { '200': { description: 'OK' } },
        },
      },
    },
  }

  it('should generate .index accessor for trailing-slash paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-trailing-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await rpc(trailingSlashOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')

      const expected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await client.api.reverseChiban.index.$get(undefined, options)
}

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await client.api.reverseChiban.$get(undefined, options)
}

/**
 * GET /posts/
 *
 * List posts (trailing slash)
 */
export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await client.posts.index.$get(args, options)
}
`

      expect(code).toBe(expected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated rpc code written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate split files with trailing-slash names', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-rpc-trailing-split-'))
    try {
      const out = path.join(dir, 'rpc', 'index.ts')
      const result = await rpc(trailingSlashOpenAPI, out, '../client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const index = fs.readFileSync(path.join(dir, 'rpc', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './getApiReverseChibanIndex'
export * from './getApiReverseChiban'
export * from './getPostsIndex'
`
      expect(index).toBe(indexExpected)

      const trailingFile = fs.readFileSync(
        path.join(dir, 'rpc', 'getApiReverseChibanIndex.ts'),
        'utf-8',
      )
      const trailingExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /api/reverseChiban/
 *
 * Reverse Chiban (trailing slash)
 */
export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await client.api.reverseChiban.index.$get(undefined, options)
}
`
      expect(trailingFile).toBe(trailingExpected)

      const normalFile = fs.readFileSync(path.join(dir, 'rpc', 'getApiReverseChiban.ts'), 'utf-8')
      const normalExpected = `import type { ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /api/reverseChiban
 *
 * Reverse Chiban (no trailing slash)
 */
export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await client.api.reverseChiban.$get(undefined, options)
}
`
      expect(normalFile).toBe(normalExpected)

      const postsFile = fs.readFileSync(path.join(dir, 'rpc', 'getPostsIndex.ts'), 'utf-8')
      const postsExpected = `import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../client'

/**
 * GET /posts/
 *
 * List posts (trailing slash)
 */
export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await client.posts.index.$get(args, options)
}
`
      expect(postsFile).toBe(postsExpected)

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated rpc code written to ${path.join(dir, 'rpc')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
