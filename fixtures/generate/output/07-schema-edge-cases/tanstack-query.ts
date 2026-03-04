import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query mutation key for POST /nullable
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
 * Returns TanStack Query mutation options for POST /nullable
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNullableMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostNullableMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return postNullable(args, options)
    },
  })
}

/**
 * POST /nullable
 */
export function usePostNullable(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNullable>>,
    Error,
    InferRequestType<typeof client.nullable.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostNullableMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates TanStack Query mutation key for POST /discriminated
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
 * Returns TanStack Query mutation options for POST /discriminated
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostDiscriminatedMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return postDiscriminated(args, options)
    },
  })
}

/**
 * POST /discriminated
 */
export function usePostDiscriminated(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDiscriminated>>,
    Error,
    InferRequestType<typeof client.discriminated.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostDiscriminatedMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates TanStack Query cache key for GET /composed
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
 * Returns TanStack Query query options for GET /composed
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
export function useGetComposed(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetComposedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /composed
 */
export function useSuspenseGetComposed(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetComposedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /composed
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetComposedInfiniteQueryKey() {
  return ['composed', 'GET', '/composed', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /composed
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
export function useInfiniteGetComposed(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetComposedInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /composed
 */
export function useSuspenseInfiniteGetComposed(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetComposedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /deep-nested
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
 * Returns TanStack Query query options for GET /deep-nested
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
export function useGetDeepNested(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetDeepNestedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /deep-nested
 */
export function useSuspenseGetDeepNested(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetDeepNestedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /deep-nested
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetDeepNestedInfiniteQueryKey() {
  return ['deep-nested', 'GET', '/deep-nested', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /deep-nested
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
export function useInfiniteGetDeepNested(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetDeepNestedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /deep-nested
 */
export function useSuspenseInfiniteGetDeepNested(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetDeepNestedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /additional-props
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
 * Returns TanStack Query query options for GET /additional-props
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
export function useGetAdditionalProps(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetAdditionalPropsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /additional-props
 */
export function useSuspenseGetAdditionalProps(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getGetAdditionalPropsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query infinite query cache key for GET /additional-props
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAdditionalPropsInfiniteQueryKey() {
  return ['additional-props', 'GET', '/additional-props', 'infinite'] as const
}

/**
 * Returns TanStack Query infinite query options for GET /additional-props
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
export function useInfiniteGetAdditionalProps(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetAdditionalPropsInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /additional-props
 */
export function useSuspenseInfiniteGetAdditionalProps(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getGetAdditionalPropsInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
