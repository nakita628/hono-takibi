import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query mutation key for POST /nullable
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNullableMutationKey() {
  return ['nullable', 'POST', '/nullable'] as const
}

/**
 * POST /nullable
 */
export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /nullable
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNullableMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostNullableMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return postNullable(args, options)
    },
  }
}

/**
 * POST /nullable
 */
export function createPostNullable(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postNullable>>,
      Error,
      InferRequestType<typeof client.nullable.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostNullableMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /discriminated
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDiscriminatedMutationKey() {
  return ['discriminated', 'POST', '/discriminated'] as const
}

/**
 * POST /discriminated
 */
export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /discriminated
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostDiscriminatedMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return postDiscriminated(args, options)
    },
  }
}

/**
 * POST /discriminated
 */
export function createPostDiscriminated(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postDiscriminated>>,
      Error,
      InferRequestType<typeof client.discriminated.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostDiscriminatedMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /composed
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComposedQueryKey() {
  return ['composed', 'GET', '/composed'] as const
}

/**
 * GET /composed
 */
export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /composed
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetComposedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /composed
 */
export function createGetComposed(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetComposedQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /composed
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetComposedInfiniteQueryKey() {
  return ['composed', 'GET', '/composed', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /composed
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetComposedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetComposedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /composed
 */
export function createInfiniteGetComposed(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetComposedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /deep-nested
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeepNestedQueryKey() {
  return ['deep-nested', 'GET', '/deep-nested'] as const
}

/**
 * GET /deep-nested
 */
export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /deep-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /deep-nested
 */
export function createGetDeepNested(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetDeepNestedQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /deep-nested
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetDeepNestedInfiniteQueryKey() {
  return ['deep-nested', 'GET', '/deep-nested', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /deep-nested
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetDeepNestedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetDeepNestedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /deep-nested
 */
export function createInfiniteGetDeepNested(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetDeepNestedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /additional-props
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAdditionalPropsQueryKey() {
  return ['additional-props', 'GET', '/additional-props'] as const
}

/**
 * GET /additional-props
 */
export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

/**
 * Returns Svelte Query query options for GET /additional-props
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /additional-props
 */
export function createGetAdditionalProps(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetAdditionalPropsQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /additional-props
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAdditionalPropsInfiniteQueryKey() {
  return ['additional-props', 'GET', '/additional-props', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /additional-props
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetAdditionalPropsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetAdditionalPropsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /additional-props
 */
export function createInfiniteGetAdditionalProps(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetAdditionalPropsInfiniteQueryOptions(clientOptions), ...query }
  })
}
