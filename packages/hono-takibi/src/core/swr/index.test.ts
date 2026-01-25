import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { swr } from './index.js'

/** Simple OpenAPI spec for basic tests */
const openapiSimple: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/hono': {
      get: {
        summary: 'Hono',
        description: 'Simple ping for Hono',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/users': {
      get: {
        summary: 'List users',
        description: 'List users with pagination.',
        parameters: [{ name: 'limit', in: 'query', schema: { type: 'integer' } }],
        responses: { '200': { description: 'OK' } },
      },
      post: {
        summary: 'Create user',
        description: 'Create a new user.',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
  },
}

describe('swr', () => {
  it('should generate the correct swr hooks code', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-'))
    try {
      const out = path.join(dir, 'index.ts')
      const result = await swr(openapiSimple, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHonoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /hono
 */
export function getGetHonoKey() {
  return ['/hono'] as const
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args?: InferRequestType<typeof client.users.$get>) {
  return ['/users', ...(args ? [args] : [])] as const
}

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
      parseResponse(client.users.$post(arg, options?.client)),
    mutationOptions,
  )
}
`

      expect(code).toBe(expected)
      expect(result).toStrictEqual({
        ok: true,
        value: `Generated swr hooks written to ${out}`,
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('swr (split mode)', () => {
  it('should generate correct split files', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-split-'))
    try {
      const out = path.join(dir, 'swr', 'index.ts')
      const result = await swr(openapiSimple, out, '../client', true)

      if (!result.ok) {
        throw new Error(result.error)
      }

      // Check index.ts barrel file
      const index = fs.readFileSync(path.join(dir, 'swr', 'index.ts'), 'utf-8')
      const indexExpected = `export * from './useGetHono'
export * from './useGetUsers'
export * from './usePostUsers'
`
      expect(index).toBe(indexExpected)

      // Check GET hook file without args
      const useGetHono = fs.readFileSync(path.join(dir, 'swr', 'useGetHono.ts'), 'utf-8')
      const useGetHonoExpected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono
 *
 * Hono
 *
 * Simple ping for Hono
 */
export function useGetHono(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHonoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.hono.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /hono
 */
export function getGetHonoKey() {
  return ['/hono'] as const
}
`
      expect(useGetHono).toBe(useGetHonoExpected)

      // Check GET hook file with args
      const useGetUsers = fs.readFileSync(path.join(dir, 'swr', 'useGetUsers.ts'), 'utf-8')
      const useGetUsersExpected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args?: InferRequestType<typeof client.users.$get>) {
  return ['/users', ...(args ? [args] : [])] as const
}
`
      expect(useGetUsers).toBe(useGetUsersExpected)

      // Check POST hook file (mutation)
      const usePostUsers = fs.readFileSync(path.join(dir, 'swr', 'usePostUsers.ts'), 'utf-8')
      const usePostUsersExpected = `import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * POST /users
 *
 * Create user
 *
 * Create a new user.
 */
export function usePostUsers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.users.$post> }) =>
      parseResponse(client.users.$post(arg, options?.client)),
    mutationOptions,
  )
}
`
      expect(usePostUsers).toBe(usePostUsersExpected)

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
      const expected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { authClient } from '../api'

/**
 * GET /users
 *
 * Get users
 */
export function useGetUsers(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(authClient.users.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey() {
  return ['/users'] as const
}
`
      expect(code).toBe(expected)
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
      const expected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /ping
 *
 * Ping
 */
export function useGetPing(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPingKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.ping.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /ping
 */
export function getGetPingKey() {
  return ['/ping'] as const
}

/**
 * POST /ping
 *
 * Post ping
 */
export function usePostPing(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.ping.$post>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /ping',
    async () => parseResponse(client.ping.$post(undefined, options?.client)),
    mutationOptions,
  )
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('swr (path with special characters)', () => {
  it('should generate hooks for hyphenated paths', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-hyphen-'))
    try {
      const out = path.join(dir, 'index.ts')
      const hyphenOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/hono-x': {
            get: {
              summary: 'HonoX',
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }

      const result = await swr(hyphenOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import type { InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /hono-x
 *
 * HonoX
 */
export function useGetHonoX(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetHonoXKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['hono-x'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /hono-x
 */
export function getGetHonoXKey() {
  return ['/hono-x'] as const
}
`
      expect(code).toBe(expected)
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('swr (path parameters)', () => {
  it('should generate hooks for path with parameters', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-params-'))
    try {
      const out = path.join(dir, 'index.ts')
      const paramOpenAPI: OpenAPI = {
        openapi: '3.0.3',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/users/{id}': {
            get: {
              summary: 'Get user',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { '200': { description: 'OK' } },
            },
            delete: {
              summary: 'Delete user',
              parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
              responses: { '204': { description: 'Deleted' } },
            },
          },
        },
      }

      const result = await swr(paramOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')
      const expected = `import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../client'

/**
 * GET /users/{id}
 *
 * Get user
 */
export function useGetUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{id}
 */
export function getGetUsersIdKey(args?: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['/users/:id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /users/{id}
 *
 * Delete user
 */
export function useDeleteUsersId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':id']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.users)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/:id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)[':id']['$delete']> },
    ) => parseResponse(client.users[':id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}
`
      expect(code).toBe(expected)
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

      expect(result).toStrictEqual({
        ok: false,
        error: 'Invalid OpenAPI paths',
      })
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
