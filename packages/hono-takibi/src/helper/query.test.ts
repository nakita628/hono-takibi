import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { makeQueryHooks } from './query.js'

const defaultConfig = {
  packageName: '@tanstack/react-query',
  frameworkName: 'TanStack Query',
  hookPrefix: 'use',
  queryFn: 'useQuery',
  mutationFn: 'useMutation',
  useQueryOptionsType: 'UseQueryOptions',
  useMutationOptionsType: 'UseMutationOptions',
}

const minimalGetOpenAPI = {
  openapi: '3.0.0' as const,
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/users': {
      get: {
        operationId: 'getUsers',
        responses: { '200': { description: 'Success' } },
      },
    },
  },
}

const minimalPostOpenAPI = {
  openapi: '3.0.0' as const,
  info: { title: 'Test', version: '1.0.0' },
  paths: {
    '/users': {
      post: {
        operationId: 'createUser',
        responses: { '201': { description: 'Created' } },
      },
    },
  },
}

describe('Query Hook Generation Shared Module', () => {
  describe('makeQueryHooks - error cases', () => {
    it.concurrent('should return error when paths property is missing', async () => {
      const result = await makeQueryHooks(
        { openapi: '3.0.0', info: { title: 'Test', version: '1.0.0' } },
        '/tmp/test.ts',
        './client',
        defaultConfig,
      )
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid OpenAPI paths')
      }
    })

    it.concurrent('should return error when paths is null', async () => {
      const result = await makeQueryHooks(
        {
          openapi: '3.0.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: null as unknown as Record<string, unknown>,
        },
        '/tmp/test.ts',
        './client',
        defaultConfig,
      )
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid OpenAPI paths')
      }
    })

    it.concurrent('should return error when paths is a string', async () => {
      const result = await makeQueryHooks(
        {
          openapi: '3.0.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: 'invalid' as unknown as Record<string, unknown>,
        },
        '/tmp/test.ts',
        './client',
        defaultConfig,
      )
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid OpenAPI paths')
      }
    })

    it.concurrent('should return error when paths is an array', async () => {
      const result = await makeQueryHooks(
        {
          openapi: '3.0.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: [] as unknown as Record<string, unknown>,
        },
        '/tmp/test.ts',
        './client',
        defaultConfig,
      )
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid OpenAPI paths')
      }
    })
  })

  describe('makeQueryHooks - success cases', () => {
    const testDir = 'test-query-hooks'

    beforeEach(() => {
      fs.mkdirSync(testDir, { recursive: true })
    })

    afterEach(() => {
      fs.rmSync(testDir, { recursive: true, force: true })
    })

    it('should generate ok: true with correct value message for GET endpoint', async () => {
      const output = `${testDir}/hooks.ts`
      const result = await makeQueryHooks(minimalGetOpenAPI, output, './client', defaultConfig)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(`Generated tanstack-query hooks written to ${output}`)
      }
    })

    it('should generate ok: true with correct value message for POST endpoint (mutation)', async () => {
      const output = `${testDir}/hooks.ts`
      const result = await makeQueryHooks(minimalPostOpenAPI, output, './client', defaultConfig)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(`Generated tanstack-query hooks written to ${output}`)
      }
    })

    it('should return split value message with index.ts included', async () => {
      const output = `${testDir}/hooks.ts`
      const result = await makeQueryHooks(
        minimalGetOpenAPI,
        output,
        './client',
        defaultConfig,
        true,
      )
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(
          `Generated tanstack-query hooks written to ${testDir}/*.ts (index.ts included)`,
        )
      }
    })

    it('should use custom frameworkName in value message', async () => {
      const output = `${testDir}/hooks.ts`
      const customConfig = {
        ...defaultConfig,
        frameworkName: 'SWR',
      }
      const result = await makeQueryHooks(minimalGetOpenAPI, output, './client', customConfig)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value).toBe(`Generated swr hooks written to ${output}`)
      }
    })
  })
})
