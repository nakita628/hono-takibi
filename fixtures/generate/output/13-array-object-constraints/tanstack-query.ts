import { useQuery, useMutation, queryOptions, mutationOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query cache key for GET /tags
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
 * Returns TanStack Query query options for GET /tags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTagsQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /tags
 */
export function useGetTags(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetTagsQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for POST /tags
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
 * Returns TanStack Query mutation options for POST /tags
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTagsMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostTagsMutationKey(),
    async mutationFn(args: Parameters<typeof postTags>[0]) {
      return postTags(args, clientOptions)
    },
  })
}

/**
 * POST /tags
 */
export function usePostTags(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTags>>,
    Error,
    Parameters<typeof postTags>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostTagsMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /settings
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSettingsQueryKey(args: Parameters<typeof getSettings>[0]) {
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
 * Returns TanStack Query query options for GET /settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSettingsQueryOptions(
  args: Parameters<typeof getSettings>[0],
  clientOptions?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /settings
 */
export function useGetSettings(
  args: Parameters<typeof getSettings>[0],
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    client?: ClientRequestOptions
  },
) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSettingsQueryOptions(args, clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query mutation key for PUT /settings
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
 * Returns TanStack Query mutation options for PUT /settings
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutSettingsMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPutSettingsMutationKey(),
    async mutationFn(args: Parameters<typeof putSettings>[0]) {
      return putSettings(args, clientOptions)
    },
  })
}

/**
 * PUT /settings
 */
export function usePutSettings(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putSettings>>,
    Error,
    Parameters<typeof putSettings>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPutSettingsMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /config
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
 * Returns TanStack Query mutation options for POST /config
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostConfigMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostConfigMutationKey(),
    async mutationFn(args: Parameters<typeof postConfig>[0]) {
      return postConfig(args, clientOptions)
    },
  })
}

/**
 * POST /config
 */
export function usePostConfig(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postConfig>>,
    Error,
    Parameters<typeof postConfig>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostConfigMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /payment
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
 * Returns TanStack Query mutation options for POST /payment
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPaymentMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostPaymentMutationKey(),
    async mutationFn(args: Parameters<typeof postPayment>[0]) {
      return postPayment(args, clientOptions)
    },
  })
}

/**
 * POST /payment
 */
export function usePostPayment(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPayment>>,
    Error,
    Parameters<typeof postPayment>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostPaymentMutationOptions(clientOptions), ...mutationOpts })
}
