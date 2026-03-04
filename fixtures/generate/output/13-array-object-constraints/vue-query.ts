import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTagsQueryKey() {
  return ['tags', 'GET', '/tags'] as const
}

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

/**
 * Returns Vue Query query options for GET /tags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tags
 */
export function useGetTags(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetTagsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetTagsInfiniteQueryKey() {
  return ['tags', 'GET', '/tags', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /tags
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetTagsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetTagsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tags
 */
export function useInfiniteGetTags(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetTagsInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query mutation key for POST /tags
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTagsMutationKey() {
  return ['tags', 'POST', '/tags'] as const
}

/**
 * POST /tags
 */
export async function postTags(
  args: InferRequestType<typeof client.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tags.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /tags
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTagsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostTagsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.tags.$post>) {
      return postTags(args, options)
    },
  }
}

/**
 * POST /tags
 */
export function usePostTags(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTags>>,
    Error,
    InferRequestType<typeof client.tags.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostTagsMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /settings
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSettingsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
) {
  return ['settings', 'GET', '/settings', args] as const
}

/**
 * GET /settings
 */
export async function getSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.settings.$get(args, options))
}

/**
 * Returns Vue Query query options for GET /settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSettingsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /settings
 */
export function useGetSettings(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetSettingsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /settings
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetSettingsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
) {
  return ['settings', 'GET', '/settings', args, 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /settings
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetSettingsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSettingsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /settings
 */
export function useInfiniteGetSettings(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetSettingsInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query mutation key for PUT /settings
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutSettingsMutationKey() {
  return ['settings', 'PUT', '/settings'] as const
}

/**
 * PUT /settings
 */
export async function putSettings(
  args: InferRequestType<typeof client.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.settings.$put(args, options))
}

/**
 * Returns Vue Query mutation options for PUT /settings
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutSettingsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPutSettingsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.settings.$put>) {
      return putSettings(args, options)
    },
  }
}

/**
 * PUT /settings
 */
export function usePutSettings(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putSettings>>,
    Error,
    InferRequestType<typeof client.settings.$put>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPutSettingsMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query mutation key for POST /config
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostConfigMutationKey() {
  return ['config', 'POST', '/config'] as const
}

/**
 * POST /config
 */
export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.config.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /config
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostConfigMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostConfigMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.config.$post>) {
      return postConfig(args, options)
    },
  }
}

/**
 * POST /config
 */
export function usePostConfig(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postConfig>>,
    Error,
    InferRequestType<typeof client.config.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostConfigMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query mutation key for POST /payment
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPaymentMutationKey() {
  return ['payment', 'POST', '/payment'] as const
}

/**
 * POST /payment
 */
export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payment.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /payment
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPaymentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostPaymentMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.payment.$post>) {
      return postPayment(args, options)
    },
  }
}

/**
 * POST /payment
 */
export function usePostPayment(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPayment>>,
    Error,
    InferRequestType<typeof client.payment.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPaymentMutationOptions(clientOptions), ...mutationOptions })
}
