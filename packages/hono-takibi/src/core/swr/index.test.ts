import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { swr } from './index.js'

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi - SWR test sample',
    version: 'v1',
    description: 'A CRUD OpenAPI sample for SWR hook generation tests.',
  },
  tags: [{ name: 'Hono' }, { name: 'Users' }],
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
        tags: ['Hono'],
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
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        description: 'List users with pagination.',
        operationId: 'listUsers',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 200, default: 20 },
            description: 'Items per page.',
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
            },
          },
        },
        responses: {
          '201': {
            description: 'Created.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
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
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Replace user',
        description: 'Full replace (PUT).',
        operationId: 'replaceUser',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Replaced.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
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
        },
      },
      patch: {
        tags: ['Users'],
        summary: 'Update user (partial)',
        description: 'Partial update (PATCH).',
        operationId: 'updateUser',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Updated.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
        },
        required: ['id', 'displayName', 'email'],
        additionalProperties: false,
      },
      CreateUserInput: {
        type: 'object',
        properties: {
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
        },
        required: ['displayName', 'email'],
        additionalProperties: false,
      },
      UpdateUserInput: {
        type: 'object',
        properties: {
          displayName: { type: 'string', minLength: 1 },
          email: { type: 'string', format: 'email' },
        },
        additionalProperties: false,
      },
    },
  },
}

describe('swr', () => {
  it('should generate the correct swr hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-'))
    try {
      const out = path.join(dir, 'index.ts')

      const result = await swr(openapi, out, '../index.ts', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const index = fs.readFileSync(out, 'utf-8')
      const expected = `import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useGetHono(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.hono.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/hono'] as const) : null
  return useSWR<InferResponseType<typeof client.hono.$get>, Error>(
    key,
    async () => parseResponse(client.hono.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /hono
 */
export function getGetHonoKey() {
  return ['GET', '/hono'] as const
}

/**
 * GET /hono-x
 *
 * HonoX
 *
 * Simple ping for HonoX
 */
export function useGetHonoX(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['hono-x']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/hono-x'] as const) : null
  return useSWR<InferResponseType<(typeof client)['hono-x']['$get']>, Error>(
    key,
    async () => parseResponse(client['hono-x'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /hono-x
 */
export function getGetHonoXKey() {
  return ['GET', '/hono-x'] as const
}

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users', args] as const) : null
  return useSWR<InferResponseType<typeof client.users.$get>, Error>(
    key,
    async () => parseResponse(client.users.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['GET', '/users', args] as const
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function usePostUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >(
    'POST /users',
    async (_, { arg }) => parseResponse(client.users.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/{id}
 *
 * Get user
 *
 * Retrieve a single user by ID.
 */
export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.users)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.users[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/{id}
 */
export function getGetUsersIdKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['GET', '/users/:id', args] as const
}

/**
 * PUT /users/{id}
 *
 * Replace user
 *
 * Full replace (PUT).
 */
export function usePutUsersId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$put']>
  >(
    'PUT /users/:id',
    async (_, { arg }) => parseResponse(client.users[':id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export function useDeleteUsersId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >(
    'DELETE /users/:id',
    async (_, { arg }) => parseResponse(client.users[':id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /users/{id}
 *
 * Update user (partial)
 *
 * Partial update (PATCH).
 */
export function usePatchUsersId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$patch']>
  >(
    'PATCH /users/:id',
    async (_, { arg }) => parseResponse(client.users[':id'].$patch(arg, options?.client)),
    options?.swr,
  )
}
`

      expect(index).toStrictEqual(expected)
      expect(result.ok).toBe(true)
      expect(result.value).toMatch(/Generated swr hooks written to/)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('swr (split mode)', () => {
  it('should generate correct split files with proper imports', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-split-'))
    try {
      const out = path.join(dir, 'swr', 'index.ts')
      const result = await swr(openapi, out, '../index.ts', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check index.ts barrel file
      const index = fs.readFileSync(path.join(dir, 'swr', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './useGetHono'
export * from './useGetHonoX'
export * from './useGetUsers'
export * from './usePostUsers'
export * from './useGetUsersId'
export * from './usePutUsersId'
export * from './useDeleteUsersId'
export * from './usePatchUsersId'
`
      expect(index).toBe(indexExpected)

      // Check GET hook file - should have useSWR but NOT useSWRMutation
      const useGetHono = fs.readFileSync(path.join(dir, 'swr', 'useGetHono.ts'), 'utf-8')
      const useGetHonoExpected = `import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useGetHono(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.hono.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/hono'] as const) : null
  return useSWR<InferResponseType<typeof client.hono.$get>, Error>(
    key,
    async () => parseResponse(client.hono.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /hono
 */
export function getGetHonoKey() {
  return ['GET', '/hono'] as const
}
`
      expect(useGetHono).toBe(useGetHonoExpected)
      // Verify NO useSWRMutation import in GET hook file
      expect(useGetHono).not.toContain('useSWRMutation')
      expect(useGetHono).not.toContain('SWRMutationConfiguration')

      // Check GET hook with args
      const useGetUsers = fs.readFileSync(path.join(dir, 'swr', 'useGetUsers.ts'), 'utf-8')
      const useGetUsersExpected = `import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../index.ts'

/**
 * GET /users
 *
 * List users
 *
 * List users with pagination.
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users', args] as const) : null
  return useSWR<InferResponseType<typeof client.users.$get>, Error>(
    key,
    async () => parseResponse(client.users.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['GET', '/users', args] as const
}
`
      expect(useGetUsers).toBe(useGetUsersExpected)
      // Verify InferRequestType IS imported for GET with args
      expect(useGetUsers).toContain('InferRequestType')
      // Verify NO useSWRMutation import
      expect(useGetUsers).not.toContain('useSWRMutation')

      // Check POST hook file - should have useSWRMutation but NOT useSWR
      const usePostUsers = fs.readFileSync(path.join(dir, 'swr', 'usePostUsers.ts'), 'utf-8')
      const usePostUsersExpected = `import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../index.ts'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function usePostUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >(
    'POST /users',
    async (_, { arg }) => parseResponse(client.users.$post(arg, options?.client)),
    options?.swr,
  )
}
`
      expect(usePostUsers).toBe(usePostUsersExpected)
      // Verify NO useSWR import in mutation hook file
      expect(usePostUsers).not.toContain("import useSWR from 'swr'")
      expect(usePostUsers).not.toContain('SWRConfiguration')
      // Verify NO key getter function for mutations
      expect(usePostUsers).not.toContain('getPostUsersKey')

      // Check DELETE hook file
      const useDeleteUsersId = fs.readFileSync(
        path.join(dir, 'swr', 'useDeleteUsersId.ts'),
        'utf-8',
      )
      const useDeleteUsersIdExpected = `import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../index.ts'

/**
 * DELETE /users/{id}
 *
 * Delete user
 *
 * Delete a user by ID.
 */
export function useDeleteUsersId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >(
    'DELETE /users/:id',
    async (_, { arg }) => parseResponse(client.users[':id'].$delete(arg, options?.client)),
    options?.swr,
  )
}
`
      expect(useDeleteUsersId).toBe(useDeleteUsersIdExpected)
      // Verify NO useSWR import
      expect(useDeleteUsersId).not.toContain("import useSWR from 'swr'")

      // Check PUT hook file
      const usePutUsersId = fs.readFileSync(path.join(dir, 'swr', 'usePutUsersId.ts'), 'utf-8')
      expect(usePutUsersId).not.toContain("import useSWR from 'swr'")
      expect(usePutUsersId).toContain('useSWRMutation')

      // Check PATCH hook file
      const usePatchUsersId = fs.readFileSync(path.join(dir, 'swr', 'usePatchUsersId.ts'), 'utf-8')
      expect(usePatchUsersId).not.toContain("import useSWR from 'swr'")
      expect(usePatchUsersId).toContain('useSWRMutation')

      expect(result).toStrictEqual({
        ok: true,
        value: `Generated swr hooks written to ${path.join(dir, 'swr')}/*.ts (index.ts included)`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('swr (custom client name)', () => {
  it('should generate code with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-client-'))
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

      const result = await swr(simpleOpenAPI, out, '../api', false, 'authClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      expect(code).toContain("import { authClient } from '../api'")
      expect(code).toContain('typeof authClient.users.$get')
      expect(code).toContain('authClient.users.$get(undefined, options?.client)')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate split files with custom client name', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-client-split-'))
    try {
      const out = path.join(dir, 'swr')
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

      const result = await swr(simpleOpenAPI, out, '../api', true, 'adminClient')

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(path.join(dir, 'swr', 'useGetAdminUsers.ts'), 'utf-8')
      expect(code).toContain("import { adminClient } from '../api'")
      expect(code).toContain('typeof adminClient.admin.users.$get')
      expect(code).toContain('adminClient.admin.users.$get(undefined, options?.client)')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

/** Test OpenAPI spec for operations without arguments */
const openapiNoArgs: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'No Args Test', version: '1.0.0' },
  paths: {
    '/ping': {
      get: {
        summary: 'Ping',
        responses: { '200': { description: 'OK' } },
      },
      post: {
        summary: 'Post ping',
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

describe('swr (no args operations)', () => {
  it('should generate hooks without args correctly', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-noargs-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await swr(openapiNoArgs, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')

      // GET without args - no args parameter, key without args
      expect(code).toContain(
        "const key = options?.enabled !== false ? (['GET', '/ping'] as const) : null",
      )
      expect(code).toContain('client.ping.$get(undefined, options?.client)')
      expect(code).toContain("return ['GET', '/ping'] as const")

      // POST without args - void type for arg
      expect(code).toContain('SWRMutationConfiguration<')
      expect(code).toContain('void>')
      expect(code).toContain('async () => parseResponse(client.ping.$post(undefined, options')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('should generate split files without args correctly', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-noargs-split-'))
    try {
      const out = path.join(dir, 'swr', 'index.ts')
      const result = await swr(openapiNoArgs, out, '../client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check GET without args - should NOT have InferRequestType
      const useGetPing = fs.readFileSync(path.join(dir, 'swr', 'useGetPing.ts'), 'utf-8')
      expect(useGetPing).not.toContain('InferRequestType')
      expect(useGetPing).toContain('InferResponseType')
      expect(useGetPing).toContain("return ['GET', '/ping'] as const")

      // Check POST without args - should have void type
      const usePostPing = fs.readFileSync(path.join(dir, 'swr', 'usePostPing.ts'), 'utf-8')
      expect(usePostPing).toContain('void>')
      expect(usePostPing).toContain('async () => parseResponse(client.ping.$post(undefined')
      expect(usePostPing).not.toContain('{ arg }')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('swr (invalid paths)', () => {
  it('should return error for invalid OpenAPI paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-invalid-'))
    try {
      const out = path.join(dir, 'index.ts')
      const invalidOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        // paths is undefined
      }

      const result = await swr(invalidOpenAPI, out, '../client', false)

      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid OpenAPI paths')
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
