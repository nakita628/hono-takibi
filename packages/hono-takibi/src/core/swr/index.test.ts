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

      // Check imports
      expect(code).toContain("import useSWR from 'swr'")
      expect(code).toContain("import type { Key, SWRConfiguration } from 'swr'")
      expect(code).toContain("import useSWRMutation from 'swr/mutation'")
      expect(code).toContain("import type { SWRMutationConfiguration } from 'swr/mutation'")
      expect(code).toContain(
        "import type { InferRequestType, ClientRequestOptions } from 'hono/client'",
      )
      expect(code).toContain("import { parseResponse } from 'hono/client'")
      expect(code).toContain("import { client } from '../client'")

      // Check key getter functions
      expect(code).toContain("return ['hono', 'GET', '/hono'] as const")
      expect(code).toContain("return ['users', 'GET', '/users', args] as const")
      expect(code).toContain("return ['users', 'POST', '/users'] as const")

      // Check hook functions - verify enabled priority fix
      expect(code).toContain('const isEnabled = enabled !== false')
      expect(code).toContain('const swrKey = isEnabled ? (customKey ?? getGetHonoKey()) : null')
      expect(code).toContain(
        'const swrKey = isEnabled ? (customKey ?? getGetUsersKey(args)) : null',
      )

      // Check that restSwrOptions is used instead of swrOptions
      expect(code).toContain(
        'const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}',
      )
      expect(code).toContain('restSwrOptions,')

      // Check mutation hook
      expect(code).toContain('async (_: Key, { arg }:')
      expect(code).toContain('parseResponse(client.users.$post(arg, clientOptions))')

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
      expect(index).toContain("export * from './useGetHono'")
      expect(index).toContain("export * from './useGetUsers'")
      expect(index).toContain("export * from './usePostUsers'")

      // Check GET hook file without args
      const useGetHono = fs.readFileSync(path.join(dir, 'swr', 'useGetHono.ts'), 'utf-8')
      expect(useGetHono).toContain("import useSWR from 'swr'")
      expect(useGetHono).toContain("return ['hono', 'GET', '/hono'] as const")
      expect(useGetHono).toContain('export function useGetHono(')
      expect(useGetHono).toContain(
        'const swrKey = isEnabled ? (customKey ?? getGetHonoKey()) : null',
      )

      // Check GET hook file with args
      const useGetUsers = fs.readFileSync(path.join(dir, 'swr', 'useGetUsers.ts'), 'utf-8')
      expect(useGetUsers).toContain("return ['users', 'GET', '/users', args] as const")
      expect(useGetUsers).toContain(
        'const swrKey = isEnabled ? (customKey ?? getGetUsersKey(args)) : null',
      )

      // Check POST hook file (mutation)
      const usePostUsers = fs.readFileSync(path.join(dir, 'swr', 'usePostUsers.ts'), 'utf-8')
      expect(usePostUsers).toContain("import useSWRMutation from 'swr/mutation'")
      expect(usePostUsers).toContain("return ['users', 'POST', '/users'] as const")
      expect(usePostUsers).toContain('export function usePostUsers(')

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

      // Check custom client import
      expect(code).toContain("import { authClient } from '../api'")

      // Check key getter
      expect(code).toContain("return ['users', 'GET', '/users'] as const")

      // Check hook function uses custom client
      expect(code).toContain('parseResponse(authClient.users.$get(undefined, clientOptions))')

      // Check enabled priority fix
      expect(code).toContain('const swrKey = isEnabled ? (customKey ?? getGetUsersKey()) : null')
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

      // Check GET hook without args
      expect(code).toContain("return ['ping', 'GET', '/ping'] as const")
      expect(code).toContain('export function useGetPing(options?:')
      expect(code).toContain('const swrKey = isEnabled ? (customKey ?? getGetPingKey()) : null')

      // Check POST mutation hook without args
      expect(code).toContain("return ['ping', 'POST', '/ping'] as const")
      expect(code).toContain('export function usePostPing(options?:')
      expect(code).toContain('parseResponse(client.ping.$post(undefined, clientOptions))')
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

      // Check key getter for hyphenated path
      expect(code).toContain("return ['hono-x', 'GET', '/hono-x'] as const")

      // Check hook uses bracket notation for hyphenated path
      expect(code).toContain("parseResponse(client['hono-x'].$get(undefined, clientOptions))")

      // Check enabled priority fix
      expect(code).toContain('const swrKey = isEnabled ? (customKey ?? getGetHonoXKey()) : null')
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

      // Check GET key getter with path param
      expect(code).toContain("return ['users', 'GET', '/users/:id', args] as const")

      // Check GET hook
      expect(code).toContain("args: InferRequestType<(typeof client.users)[':id']['$get']>")
      expect(code).toContain(
        'const swrKey = isEnabled ? (customKey ?? getGetUsersIdKey(args)) : null',
      )

      // Check DELETE mutation key getter
      expect(code).toContain("return ['users', 'DELETE', '/users/:id'] as const")

      // Check DELETE mutation hook
      expect(code).toContain('export function useDeleteUsersId(options?:')
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

describe('swr (enabled priority)', () => {
  it('should prioritize enabled over swrKey - enabled:false means no fetch even with swrKey', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-swr-enabled-'))
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

      const result = await swr(simpleOpenAPI, out, '../client', false)

      if (!result.ok) {
        throw new Error(result.error)
      }

      const code = fs.readFileSync(out, 'utf-8')

      // CRITICAL: Verify the fix - enabled should take priority over customKey
      // Old (buggy): customKey ?? (isEnabled ? getKey() : null)
      // New (fixed): isEnabled ? (customKey ?? getKey()) : null
      expect(code).toContain('const swrKey = isEnabled ? (customKey ?? getGetUsersKey()) : null')

      // Should NOT contain the old buggy pattern
      expect(code).not.toContain('customKey ?? (isEnabled ?')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})
