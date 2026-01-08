import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { rpc } from './index.js'

// Test run
// pnpm vitest run ./src/core/rpc.test.ts

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi🔥 – test-only sample',
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
                  properties: { message: { type: 'string', example: 'Hono🔥' } },
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
                  properties: { message: { type: 'string', example: 'HonoX🔥' } },
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
                  properties: { message: { type: 'string', example: 'ZodOpenAPIHono🔥' } },
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
            style: 'form',
            explode: true,
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
      const expected = `import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono() {
  return await client.hono.$get()
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX() {
  return await client['hono-x'].$get()
}

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono() {
  return await client['zod-openapi-hono'].$get()
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(params: {
  query: {
    limit: number
    offset: number
    role: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    q: string
  }
}) {
  return await client.users.$get({ query: params.query })
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(body: {
  displayName: string
  email: string
  roles?: (
    | 'attendee'
    | 'speaker'
    | 'lt-speaker'
    | 'staff'
    | 'sponsor'
    | 'mc'
    | 'ghost-wifi-fixer'
  )[]
  isStudent?: boolean
  pronouns?: string
  affiliations?: string[]
}) {
  return await client.users.$post({ json: body })
}

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$get({ param: params.path })
}

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  params: { path: { id: string } },
  body: {
    displayName: string
    email: string
    roles?: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    isStudent?: boolean
    pronouns?: string
    affiliations?: string[]
  },
) {
  return await client.users[':id'].$put({ param: params.path, json: body })
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$delete({ param: params.path })
}

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  params: { path: { id: string } },
  body: {
    displayName?: string
    email?: string
    roles?: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    isStudent?: boolean
    pronouns?: string
    affiliations?: string[]
  },
) {
  return await client.users[':id'].$patch({ param: params.path, json: body })
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
      const deleteUsersIdExpected = `import { client } from '../index.ts'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export async function deleteUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$delete({ param: params.path })
}
`

      expect(deleteUsersId).toBe(deleteUsersIdExpected)

      const getHono = fs.readFileSync(path.join(dir, 'rpc', 'getHono.ts'), 'utf-8')
      const getHonoExpected = `import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export async function getHono() {
  return await client.hono.$get()
}
`

      expect(getHono).toBe(getHonoExpected)

      const getHonoX = fs.readFileSync(path.join(dir, 'rpc', 'getHonoX.ts'), 'utf-8')
      const getHonoXExpected = `import { client } from '../index.ts'

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export async function getHonoX() {
  return await client['hono-x'].$get()
}
`

      expect(getHonoX).toBe(getHonoXExpected)

      const getUsers = fs.readFileSync(path.join(dir, 'rpc', 'getUsers.ts'), 'utf-8')

      const expected = `import { client } from '../index.ts'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination and optional role filter.
 */
export async function getUsers(params: {
  query: {
    limit: number
    offset: number
    role: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    q: string
  }
}) {
  return await client.users.$get({ query: params.query })
}
`

      expect(getUsers).toBe(expected)

      const getUsersId = fs.readFileSync(path.join(dir, 'rpc', 'getUsersId.ts'), 'utf-8')

      const getUsersIdExpected = `import { client } from '../index.ts'

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export async function getUsersId(params: { path: { id: string } }) {
  return await client.users[':id'].$get({ param: params.path })
}
`
      expect(getUsersId).toBe(getUsersIdExpected)

      const getZodOpenapiHono = fs.readFileSync(
        path.join(dir, 'rpc', 'getZodOpenapiHono.ts'),
        'utf-8',
      )

      const getZodOpenapiHonoExpected = `import { client } from '../index.ts'

/**
 * GET /zod-openapi-hono
 *
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 */
export async function getZodOpenapiHono() {
  return await client['zod-openapi-hono'].$get()
}
`
      expect(getZodOpenapiHono).toBe(getZodOpenapiHonoExpected)

      const patchUsersId = fs.readFileSync(path.join(dir, 'rpc', 'patchUsersId.ts'), 'utf-8')

      const patchUsersIdExpected = `import { client } from '../index.ts'

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 */
export async function patchUsersId(
  params: { path: { id: string } },
  body: {
    displayName?: string
    email?: string
    roles?: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    isStudent?: boolean
    pronouns?: string
    affiliations?: string[]
  },
) {
  return await client.users[':id'].$patch({ param: params.path, json: body })
}
`
      expect(patchUsersId).toBe(patchUsersIdExpected)

      const postUsers = fs.readFileSync(path.join(dir, 'rpc', 'postUsers.ts'), 'utf-8')
      const postUsersExpected = `import { client } from '../index.ts'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export async function postUsers(body: {
  displayName: string
  email: string
  roles?: (
    | 'attendee'
    | 'speaker'
    | 'lt-speaker'
    | 'staff'
    | 'sponsor'
    | 'mc'
    | 'ghost-wifi-fixer'
  )[]
  isStudent?: boolean
  pronouns?: string
  affiliations?: string[]
}) {
  return await client.users.$post({ json: body })
}
`
      expect(postUsers).toBe(postUsersExpected)

      const putUsersId = fs.readFileSync(path.join(dir, 'rpc', 'putUsersId.ts'), 'utf-8')

      const putUsersIdExpected = `import { client } from '../index.ts'

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 */
export async function putUsersId(
  params: { path: { id: string } },
  body: {
    displayName: string
    email: string
    roles?: (
      | 'attendee'
      | 'speaker'
      | 'lt-speaker'
      | 'staff'
      | 'sponsor'
      | 'mc'
      | 'ghost-wifi-fixer'
    )[]
    isStudent?: boolean
    pronouns?: string
    affiliations?: string[]
  },
) {
  return await client.users[':id'].$put({ param: params.path, json: body })
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
