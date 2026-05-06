import { injectQuery, injectMutation, queryOptions } from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getApiKey() {
  return ['api'] as const
}

export function getItemsKey() {
  return ['items'] as const
}

export function getPostsKey() {
  return ['posts'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getApiReverseChibanIndexQueryKey() {
  return ['api', '/api/reverseChiban/'] as const
}

export async function getApiReverseChibanIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.index.$get(undefined, options))
}

export function getApiReverseChibanIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChibanIndex({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectApiReverseChibanIndex<
  TData = Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getApiReverseChibanIndexQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getApiReverseChibanIndex({
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getApiReverseChibanQueryKey() {
  return ['api', '/api/reverseChiban'] as const
}

export async function getApiReverseChiban(options?: ClientRequestOptions) {
  return await parseResponse(client.api.reverseChiban.$get(undefined, options))
}

export function getApiReverseChibanQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChiban({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectApiReverseChiban<
  TData = Awaited<ReturnType<typeof getApiReverseChiban>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getApiReverseChibanQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getApiReverseChiban({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getPostsIndexQueryKey(args: InferRequestType<typeof client.posts.index.$get>) {
  return ['posts', '/posts/', args] as const
}

export async function getPostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$get(args, options))
}

export function getPostsIndexQueryOptions(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectPostsIndex<
  TData = Awaited<ReturnType<typeof getPostsIndex>>,
  TError = unknown,
>(
  args: () => InferRequestType<typeof client.posts.index.$get>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getPostsIndexQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getPostsIndex(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$post(args, options))
}

export function getPostPostsIndexMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['posts', '/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return postPostsIndex(args, options)
    },
  }
}

export function injectPostPostsIndex<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postPostsIndex>>,
      TError,
      InferRequestType<typeof client.posts.index.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostPostsIndexMutationOptions<TError>(clientOptions) }
  })
}

export function getUsersIdIndexQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', '/users/:id/', args] as const
}

export async function getUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].index.$get(args, options))
}

export function getUsersIdIndexQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectUsersIdIndex<
  TData = Awaited<ReturnType<typeof getUsersIdIndex>>,
  TError = unknown,
>(
  args: () => InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdIndexQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsersIdIndex(args(), {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        })
      },
    }
  })
}

export function getItemsIndexQueryKey() {
  return ['items', '/items/'] as const
}

export async function getItemsIndex(options?: ClientRequestOptions) {
  return await parseResponse(client.items.index.$get(undefined, options))
}

export function getItemsIndexQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsIndex({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectItemsIndex<
  TData = Awaited<ReturnType<typeof getItemsIndex>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsIndexQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getItemsIndex({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}
