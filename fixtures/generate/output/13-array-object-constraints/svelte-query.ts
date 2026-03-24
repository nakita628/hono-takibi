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

export function getConfigKey() {
  return ['config'] as const
}

export function getPaymentKey() {
  return ['payment'] as const
}

export function getSettingsKey() {
  return ['settings'] as const
}

export function getTagsKey() {
  return ['tags'] as const
}

export function getTagsQueryKey() {
  return ['tags', '/tags'] as const
}

export async function getTags(options?: ClientRequestOptions) {
  return await parseResponse(client.tags.$get(undefined, options))
}

export function getTagsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createTags<TData = Awaited<ReturnType<typeof getTags>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getTags>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getTagsQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getTags({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getTagsInfiniteQueryKey() {
  return ['tags', '/tags', 'infinite'] as const
}

export function getTagsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTagsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTags({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteTags(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getTags>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getTagsInfiniteQueryOptions(clientOptions) }
  })
}

export async function postTags(
  args: InferRequestType<typeof client.tags.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tags.$post(args, options))
}

export function getPostTagsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['tags', '/tags', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.tags.$post>) {
      return postTags(args, options)
    },
  }
}

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

export function getSettingsQueryKey(args: InferRequestType<typeof client.settings.$get>) {
  return ['settings', '/settings', args] as const
}

export async function getSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.settings.$get(args, options))
}

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

export function createSettings<TData = Awaited<ReturnType<typeof getSettings>>>(
  args: () => InferRequestType<typeof client.settings.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getSettingsQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getSettings(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getSettingsInfiniteQueryKey(args: InferRequestType<typeof client.settings.$get>) {
  return ['settings', '/settings', args, 'infinite'] as const
}

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

export function createInfiniteSettings(
  args: () => InferRequestType<typeof client.settings.$get>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getSettings>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getSettingsInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function putSettings(
  args: InferRequestType<typeof client.settings.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.settings.$put(args, options))
}

export function getPutSettingsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['settings', '/settings', 'PUT'] as const,
    async mutationFn(args: InferRequestType<typeof client.settings.$put>) {
      return putSettings(args, options)
    },
  }
}

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

export async function postConfig(
  args: InferRequestType<typeof client.config.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.config.$post(args, options))
}

export function getPostConfigMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['config', '/config', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.config.$post>) {
      return postConfig(args, options)
    },
  }
}

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

export async function postPayment(
  args: InferRequestType<typeof client.payment.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.payment.$post(args, options))
}

export function getPostPaymentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['payment', '/payment', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.payment.$post>) {
      return postPayment(args, options)
    },
  }
}

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
