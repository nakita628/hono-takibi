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
 * Key prefix for /config
 */
export function getConfigKey() {
  return ['config'] as const
}

/**
 * Key prefix for /payment
 */
export function getPaymentKey() {
  return ['payment'] as const
}

/**
 * Key prefix for /settings
 */
export function getSettingsKey() {
  return ['settings'] as const
}

/**
 * Key prefix for /tags
 */
export function getTagsKey() {
  return ['tags'] as const
}

/**
 * GET /tags query key
 */
export function getTagsQueryKey() {
  return ['tags', '/tags'] as const
}

/**
 * GET /tags
 */
export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

/**
 * GET /tags query options
 */
export function getTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /tags
 */
export function useTags(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getTagsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * GET /tags infinite query key
 */
export function getTagsInfiniteQueryKey() {
  return ['tags', '/tags', 'infinite'] as const
}

/**
 * GET /tags infinite query options
 */
export function getTagsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTagsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /tags
 */
export function useInfiniteTags(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getTagsInfiniteQueryOptions(clientOptions), ...queryOptions })
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
 * POST /tags
 */
export function getPostTagsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['tags', '/tags'] as const,
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
 * GET /settings query key
 */
export function getSettingsQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
) {
  return ['settings', '/settings', args] as const
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
 * GET /settings query options
 */
export function getSettingsQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /settings
 */
export function useSettings(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getSettingsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * GET /settings infinite query key
 */
export function getSettingsInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
) {
  return ['settings', '/settings', args, 'infinite'] as const
}

/**
 * GET /settings infinite query options
 */
export function getSettingsInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getSettingsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /settings
 */
export function useInfiniteSettings(
  args: MaybeRefOrGetter<InferRequestType<typeof client.settings.$get>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getSettingsInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
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
 * PUT /settings
 */
export function getPutSettingsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['settings', '/settings'] as const,
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
 * POST /config
 */
export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.config.$post(args, options))
}

/**
 * POST /config
 */
export function getPostConfigMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['config', '/config'] as const,
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
 * POST /payment
 */
export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payment.$post(args, options))
}

/**
 * POST /payment
 */
export function getPostPaymentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['payment', '/payment'] as const,
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
