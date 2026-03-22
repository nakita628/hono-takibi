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

/** Key prefix for /config */
export function getConfigKey() {
  return ['config'] as const
}

/** Key prefix for /payment */
export function getPaymentKey() {
  return ['payment'] as const
}

/** Key prefix for /settings */
export function getSettingsKey() {
  return ['settings'] as const
}

/** Key prefix for /tags */
export function getTagsKey() {
  return ['tags'] as const
}

/** GET /tags query key */
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
export function createTags(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getTagsQueryOptions(clientOptions), ...query }
  })
}

/** GET /tags infinite query key */
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
export function createInfiniteTags(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getTagsInfiniteQueryOptions(clientOptions), ...query }
  })
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

/** POST /tags */
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

/** GET /settings query key */
export function getSettingsQueryKey(args: InferRequestType<typeof client.settings.$get>) {
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
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /settings
 */
export function createSettings(
  args: () => InferRequestType<typeof client.settings.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getSettingsQueryOptions(args(), clientOptions), ...query }
  })
}

/** GET /settings infinite query key */
export function getSettingsInfiniteQueryKey(args: InferRequestType<typeof client.settings.$get>) {
  return ['settings', '/settings', args, 'infinite'] as const
}

/**
 * GET /settings infinite query options
 */
export function getSettingsInfiniteQueryOptions(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getSettingsInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSettings(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /settings
 */
export function createInfiniteSettings(
  args: () => InferRequestType<typeof client.settings.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getSettingsInfiniteQueryOptions(args(), clientOptions), ...query }
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

/** PUT /settings */
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
 * POST /config
 */
export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.config.$post(args, options))
}

/** POST /config */
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
 * POST /payment
 */
export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payment.$post(args, options))
}

/** POST /payment */
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
