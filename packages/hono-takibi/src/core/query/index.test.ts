import { describe, expect, it } from 'vitest'
import {
  makeQueryHooks,
  SVELTE_QUERY_CONFIG,
  TANSTACK_QUERY_CONFIG,
  VUE_QUERY_CONFIG,
} from './index.js'

describe('Query Hook Generation Shared Module', () => {
  describe('Framework Configs', () => {
    it('should have correct TanStack Query config', () => {
      expect(TANSTACK_QUERY_CONFIG.packageName).toBe('@tanstack/react-query')
      expect(TANSTACK_QUERY_CONFIG.hookPrefix).toBe('use')
      expect(TANSTACK_QUERY_CONFIG.queryFn).toBe('useQuery')
      expect(TANSTACK_QUERY_CONFIG.mutationFn).toBe('useMutation')
      expect(TANSTACK_QUERY_CONFIG.queryOptionsType).toBe('UseQueryOptions')
      expect(TANSTACK_QUERY_CONFIG.mutationOptionsType).toBe('UseMutationOptions')
    })

    it('should have correct Svelte Query config', () => {
      expect(SVELTE_QUERY_CONFIG.packageName).toBe('@tanstack/svelte-query')
      expect(SVELTE_QUERY_CONFIG.hookPrefix).toBe('create')
      expect(SVELTE_QUERY_CONFIG.queryFn).toBe('createQuery')
      expect(SVELTE_QUERY_CONFIG.mutationFn).toBe('createMutation')
      expect(SVELTE_QUERY_CONFIG.queryOptionsType).toBe('CreateQueryOptions')
      expect(SVELTE_QUERY_CONFIG.mutationOptionsType).toBe('CreateMutationOptions')
    })

    it('should have correct Vue Query config', () => {
      expect(VUE_QUERY_CONFIG.packageName).toBe('@tanstack/vue-query')
      expect(VUE_QUERY_CONFIG.hookPrefix).toBe('use')
      expect(VUE_QUERY_CONFIG.queryFn).toBe('useQuery')
      expect(VUE_QUERY_CONFIG.mutationFn).toBe('useMutation')
      expect(VUE_QUERY_CONFIG.queryOptionsType).toBe('UseQueryOptions')
      expect(VUE_QUERY_CONFIG.mutationOptionsType).toBe('UseMutationOptions')
    })
  })

  describe('makeQueryHooks', () => {
    it('should return error for invalid OpenAPI paths', async () => {
      const result = await makeQueryHooks(
        { openapi: '3.0.0', info: { title: 'Test', version: '1.0.0' } },
        '/tmp/test.ts',
        './client',
        TANSTACK_QUERY_CONFIG,
      )
      expect(result.ok).toBe(false)
    })
  })
})
