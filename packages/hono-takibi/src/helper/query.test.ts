import fs from 'node:fs'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../openapi/index.js'
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
} as OpenAPI

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
} as OpenAPI

// The key getters that take no args, as `name → [key]`: every prefix getter and the
// getters of the operations without parameters.
function keyGetters(code: string) {
  return [...code.matchAll(/export function (get\w*Key\d*)\(\)\s*\{\s*return \[([^\]]*)\]/gu)].map(
    (match) => `${match[1]} → [${match[2]}]`,
  )
}

describe('Query Hook Generation Shared Module', () => {
  describe('makeQueryHooks - error cases', () => {
    it.concurrent('should return error when paths property is missing', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            makeQueryHooks(
              { openapi: '3.0.0', info: { title: 'Test', version: '1.0.0' } } as unknown as OpenAPI,
              '/tmp/test.ts',
              './client',
              defaultConfig,
            ),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid OpenAPI paths')
    })

    it.concurrent('should return error when paths is null', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            makeQueryHooks(
              {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: null as unknown as OpenAPI['paths'],
              },
              '/tmp/test.ts',
              './client',
              defaultConfig,
            ),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid OpenAPI paths')
    })

    it.concurrent('should return error when paths is a string', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            makeQueryHooks(
              {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: 'invalid' as unknown as OpenAPI['paths'],
              },
              '/tmp/test.ts',
              './client',
              defaultConfig,
            ),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid OpenAPI paths')
    })

    it.concurrent('should return error when paths is an array', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            makeQueryHooks(
              {
                openapi: '3.0.0',
                info: { title: 'Test', version: '1.0.0' },
                paths: [] as unknown as OpenAPI['paths'],
              },
              '/tmp/test.ts',
              './client',
              defaultConfig,
            ),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid OpenAPI paths')
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
      const result = await Effect.runPromise(
        Effect.provide(
          makeQueryHooks(minimalGetOpenAPI, output, './client', defaultConfig),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated tanstack-query hooks written to ${output}`)
    })

    it('should generate ok: true with correct value message for POST endpoint (mutation)', async () => {
      const output = `${testDir}/hooks.ts`
      const result = await Effect.runPromise(
        Effect.provide(
          makeQueryHooks(minimalPostOpenAPI, output, './client', defaultConfig),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated tanstack-query hooks written to ${output}`)
    })

    it('should use custom frameworkName in value message', async () => {
      const output = `${testDir}/hooks.ts`
      const customConfig = {
        ...defaultConfig,
        frameworkName: 'SWR',
      }
      const result = await Effect.runPromise(
        Effect.provide(
          makeQueryHooks(minimalGetOpenAPI, output, './client', customConfig),
          NodeFileSystem.layer,
        ),
      )
      expect(result).toBe(`Generated swr hooks written to ${output}`)
    })
  })

  // #536: the prefix getters (`get<Prefix>Key`) and the operations' key getters share the
  // `get…Key` names. The operations keep theirs; a prefix getter whose name is taken is
  // numbered, so the hooks file declares each name once.
  describe('makeQueryHooks - key getter names', () => {
    const testDir = 'test-query-hooks-key-names'
    const collidingOpenAPI = {
      openapi: '3.1.0' as const,
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/': { get: { responses: { '200': { description: 'ok' } } } },
        '/query/ast': { get: { responses: { '200': { description: 'ok' } } } },
        '/_alias': { get: { responses: { '200': { description: 'ok' } } } },
        '/{alias}/settings': {
          get: {
            parameters: [{ name: 'alias', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    } as OpenAPI

    beforeEach(() => {
      fs.mkdirSync(testDir, { recursive: true })
    })

    afterEach(() => {
      fs.rmSync(testDir, { recursive: true, force: true })
    })

    it('numbers a prefix getter whose name an operation or an earlier prefix takes', async () => {
      const output = `${testDir}/hooks.ts`
      await Effect.runPromise(
        Effect.provide(
          makeQueryHooks(collidingOpenAPI, output, './client', defaultConfig),
          NodeFileSystem.layer,
        ),
      )
      expect(keyGetters(fs.readFileSync(output, 'utf8'))).toStrictEqual([
        "getAliasKey → ['_alias']",
        "getQueryKey2 → ['query']",
        "getAliasKey2 → ['{alias}']",
        "getQueryKey → ['', '/']",
        "getQueryAstQueryKey → ['query', '/query/ast']",
        "getAliasQueryKey → ['_alias', '/_alias']",
      ])
    })

    it('for SWR, whose operation getters keep the method, numbers only prefixes that read alike', async () => {
      const output = `${testDir}/hooks.ts`
      await Effect.runPromise(
        Effect.provide(
          makeQueryHooks(collidingOpenAPI, output, './client', {
            ...defaultConfig,
            packageName: 'swr',
            frameworkName: 'SWR',
            queryFn: 'useSWR',
            mutationFn: 'useSWRMutation',
            isSWR: true,
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(keyGetters(fs.readFileSync(output, 'utf8'))).toStrictEqual([
        "getAliasKey → ['_alias']",
        "getQueryKey → ['query']",
        "getAliasKey2 → ['{alias}']",
        "getGetKey → ['', '/']",
        "getGetQueryAstKey → ['query', '/query/ast']",
        "getGetAliasKey → ['_alias', '/_alias']",
      ])
    })
  })
})
