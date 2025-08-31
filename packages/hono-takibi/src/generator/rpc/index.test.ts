import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { rpc } from './index.js'

// Test run
// pnpm vitest run ./src/generator/rpc/index.test.ts

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
  it('should generate the correct import code', () => {
    const result = rpc(openapi, '../index.ts')

    const expected = `import { client } from '../index.ts'

/**
 * Hono
 *
 * Simple ping for Hono
 *
 * GET /hono
 */
export async function getHono(){return await client.hono.$get()}

/**
 * HonoX
 *
 * Simple ping for HonoX
 *
 * GET /hono-x
 */
export async function getHonoX(){return await client['hono-x'].$get()}

/**
 * ZodOpenAPIHono
 *
 * Simple ping for ZodOpenAPIHono
 *
 * GET /zod-openapi-hono
 */
export async function getZodOpenapiHono(){return await client['zod-openapi-hono'].$get()}

/**
 * List users
 *
 * List users with pagination and optional role filter.
 *
 * GET /users
 */
export async function getUsers(params:{query:{limit:number,offset:number,role:('attendee'|'speaker'|'lt-speaker'|'staff'|'sponsor'|'mc'|'ghost-wifi-fixer')[],q:string}}){return await client.users.$get({query:{limit:params.query.limit,offset:params.query.offset,role:params.query.role,q:params.query.q}})}

/**
 * Create user
 *
 * Create a new user.
 *
 * POST /users
 */
export async function postUsers(body:{displayName:string,email:string,roles?:('attendee'|'speaker'|'lt-speaker'|'staff'|'sponsor'|'mc'|'ghost-wifi-fixer')[],isStudent?:boolean,pronouns?:string,affiliations?:string[]}){return await client.users.$post({json:body})}

/**
 * Get user
 *
 * Retrieve a single user by ID.
 *
 * GET /users/{id}
 */
export async function getUsersId(params:{path:{id:string}}){return await client.users[':id'].$get({param:{id:params.path.id}})}

/**
 * Replace user
 *
 * Full replace (PUT). All required fields must be present. Unspecified fields are treated as empty.
 *
 * PUT /users/{id}
 */
export async function putUsersId(params:{path:{id:string}},body:{displayName:string,email:string,roles?:('attendee'|'speaker'|'lt-speaker'|'staff'|'sponsor'|'mc'|'ghost-wifi-fixer')[],isStudent?:boolean,pronouns?:string,affiliations?:string[]}){return await client.users[':id'].$put({param:{id:params.path.id},json:body})}

/**
 * Delete user
 *
 * Delete a user by ID.
 *
 * DELETE /users/{id}
 */
export async function deleteUsersId(params:{path:{id:string}}){return await client.users[':id'].$delete({param:{id:params.path.id}})}

/**
 * Update user (partial)
 *
 * Partial update (PATCH). Only provided fields will be updated.
 *
 * PATCH /users/{id}
 */
export async function patchUsersId(params:{path:{id:string}},body:{displayName?:string,email?:string,roles?:('attendee'|'speaker'|'lt-speaker'|'staff'|'sponsor'|'mc'|'ghost-wifi-fixer')[],isStudent?:boolean,pronouns?:string,affiliations?:string[]}){return await client.users[':id'].$patch({param:{id:params.path.id},json:body})}
`
    expect(result).toBe(expected)
  })
})
