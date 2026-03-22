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
 * Key prefix for /additional-props
 */
export function getAdditionalPropsKey() {
  return ['additional-props'] as const
}

/**
 * Key prefix for /composed
 */
export function getComposedKey() {
  return ['composed'] as const
}

/**
 * Key prefix for /deep-nested
 */
export function getDeepNestedKey() {
  return ['deep-nested'] as const
}

/**
 * Key prefix for /discriminated
 */
export function getDiscriminatedKey() {
  return ['discriminated'] as const
}

/**
 * Key prefix for /nullable
 */
export function getNullableKey() {
  return ['nullable'] as const
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
 * POST /nullable
 */
export function getPostNullableMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['nullable', '/nullable'] as const,
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
 * POST /discriminated
 */
export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

/**
 * POST /discriminated
 */
export function getPostDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['discriminated', '/discriminated'] as const,
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
 * GET /composed query key
 */
export function getComposedQueryKey() {
  return ['composed', '/composed'] as const
}

/**
 * GET /composed
 */
export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

/**
 * GET /composed query options
 */
export function getComposedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /composed
 */
export function useComposed(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getComposedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /composed
 */
export function useSuspenseComposed(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getComposedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /composed infinite query key
 */
export function getComposedInfiniteQueryKey() {
  return ['composed', '/composed', 'infinite'] as const
}

/**
 * GET /composed infinite query options
 */
export function getComposedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getComposedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /composed
 */
export function useInfiniteComposed(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getComposedInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /composed
 */
export function useSuspenseInfiniteComposed(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getComposedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /deep-nested query key
 */
export function getDeepNestedQueryKey() {
  return ['deep-nested', '/deep-nested'] as const
}

/**
 * GET /deep-nested
 */
export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

/**
 * GET /deep-nested query options
 */
export function getDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /deep-nested
 */
export function useDeepNested(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getDeepNestedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /deep-nested
 */
export function useSuspenseDeepNested(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getDeepNestedQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /deep-nested infinite query key
 */
export function getDeepNestedInfiniteQueryKey() {
  return ['deep-nested', '/deep-nested', 'infinite'] as const
}

/**
 * GET /deep-nested infinite query options
 */
export function getDeepNestedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getDeepNestedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /deep-nested
 */
export function useInfiniteDeepNested(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getDeepNestedInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /deep-nested
 */
export function useSuspenseInfiniteDeepNested(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getDeepNestedInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /additional-props query key
 */
export function getAdditionalPropsQueryKey() {
  return ['additional-props', '/additional-props'] as const
}

/**
 * GET /additional-props
 */
export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

/**
 * GET /additional-props query options
 */
export function getAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /additional-props
 */
export function useAdditionalProps(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getAdditionalPropsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /additional-props
 */
export function useSuspenseAdditionalProps(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({ ...getAdditionalPropsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /additional-props infinite query key
 */
export function getAdditionalPropsInfiniteQueryKey() {
  return ['additional-props', '/additional-props', 'infinite'] as const
}

/**
 * GET /additional-props infinite query options
 */
export function getAdditionalPropsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAdditionalPropsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /additional-props
 */
export function useInfiniteAdditionalProps(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getAdditionalPropsInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * GET /additional-props
 */
export function useSuspenseInfiniteAdditionalProps(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...getAdditionalPropsInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
