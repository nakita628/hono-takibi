import { describe, expect, it } from 'vitest'
import { makeQueryHooks } from './query.js'

describe('Query Hook Generation Shared Module', () => {
  describe('makeQueryHooks', () => {
    it('should return error for invalid OpenAPI paths', async () => {
      const config = {
        packageName: '@tanstack/react-query',
        frameworkName: 'TanStack Query',
        hookPrefix: 'use',
        queryFn: 'useQuery',
        mutationFn: 'useMutation',
        queryOptionsHelper: 'queryOptions',
      }
      const result = await makeQueryHooks(
        { openapi: '3.0.0', info: { title: 'Test', version: '1.0.0' } },
        '/tmp/test.ts',
        './client',
        config,
      )
      expect(result.ok).toBe(false)
    })
  })
})
