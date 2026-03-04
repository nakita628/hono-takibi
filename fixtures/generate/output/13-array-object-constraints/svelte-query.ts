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
 * Generates Svelte Query cache key for GET /tags
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
 * Returns Svelte Query query options for GET /tags
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
export function createGetTags(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetTagsQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetTagsInfiniteQueryKey() {
  return ['tags', 'GET', '/tags', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /tags
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
export function createInfiniteGetTags(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetTagsInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for POST /tags
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
 * Returns Svelte Query mutation options for POST /tags
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
export function createPostTags(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postTags>>,
      Error,
      InferRequestType<typeof client.tags.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostTagsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /settings
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSettingsQueryKey(args: InferRequestType<typeof client.settings.$get>) {
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
 * Returns Svelte Query query options for GET /settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSettingsQueryOptions(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getGetSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /settings
 */
export function createGetSettings(
  args: () => InferRequestType<typeof client.settings.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetSettingsQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /settings
 * Returns structured key ['prefix', 'method', 'path', args, 'infinite'] for filtering
 */
export function getGetSettingsInfiniteQueryKey(
  args: InferRequestType<typeof client.settings.$get>,
) {
  return ['settings', 'GET', '/settings', args, 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /settings
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetSettingsInfiniteQueryOptions(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSettingsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /settings
 */
export function createInfiniteGetSettings(
  args: () => InferRequestType<typeof client.settings.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetSettingsInfiniteQueryOptions(args(), clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /settings
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
 * Returns Svelte Query mutation options for PUT /settings
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
export function createPutSettings(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putSettings>>,
      Error,
      InferRequestType<typeof client.settings.$put>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutSettingsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /config
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
 * Returns Svelte Query mutation options for POST /config
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
export function createPostConfig(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postConfig>>,
      Error,
      InferRequestType<typeof client.config.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostConfigMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /payment
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
 * Returns Svelte Query mutation options for POST /payment
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
export function createPostPayment(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPayment>>,
      Error,
      InferRequestType<typeof client.payment.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostPaymentMutationOptions(clientOptions), ...mutation }
  })
}
