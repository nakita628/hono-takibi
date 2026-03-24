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

export function useApiReverseChibanIndex<
  TData = Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChibanIndex({
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function useSuspenseApiReverseChibanIndex<
  TData = Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
>(options?: {
  query?: UseSuspenseQueryOptions<
    Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
    Error,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChibanIndex({
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getApiReverseChibanIndexInfiniteQueryKey() {
  return ['api', '/api/reverseChiban/', 'infinite'] as const
}

export function getApiReverseChibanIndexInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanIndexInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChibanIndex({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteApiReverseChibanIndex(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChibanIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getApiReverseChibanIndexInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteApiReverseChibanIndex(options: {
  query: UseSuspenseInfiniteQueryOptions<
    Awaited<ReturnType<typeof getApiReverseChibanIndex>>,
    Error
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getApiReverseChibanIndexInfiniteQueryOptions(clientOptions),
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

export function useApiReverseChiban<
  TData = Awaited<ReturnType<typeof getApiReverseChiban>>,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChiban({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseApiReverseChiban<
  TData = Awaited<ReturnType<typeof getApiReverseChiban>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getApiReverseChibanQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChiban({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getApiReverseChibanInfiniteQueryKey() {
  return ['api', '/api/reverseChiban', 'infinite'] as const
}

export function getApiReverseChibanInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getApiReverseChibanInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getApiReverseChiban({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteApiReverseChiban(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getApiReverseChibanInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteApiReverseChiban(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiReverseChiban>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getApiReverseChibanInfiniteQueryOptions(clientOptions),
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

export function usePostsIndex<TData = Awaited<ReturnType<typeof getPostsIndex>>>(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspensePostsIndex<TData = Awaited<ReturnType<typeof getPostsIndex>>>(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getPostsIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getPostsIndexInfiniteQueryKey(
  args: InferRequestType<typeof client.posts.index.$get>,
) {
  return ['posts', '/posts/', args, 'infinite'] as const
}

export function getPostsIndexInfiniteQueryOptions(
  args: InferRequestType<typeof client.posts.index.$get>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getPostsIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getPostsIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfinitePostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getPostsIndexInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfinitePostsIndex(
  args: InferRequestType<typeof client.posts.index.$get>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getPostsIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getPostsIndexInfiniteQueryOptions(args, clientOptions),
  })
}

export async function postPostsIndex(
  args: InferRequestType<typeof client.posts.index.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.posts.index.$post(args, options))
}

export function getPostPostsIndexMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['posts', '/posts/', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.posts.index.$post>) {
      return postPostsIndex(args, options)
    },
  })
}

export function usePostPostsIndex(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPostsIndex>>,
    Error,
    InferRequestType<typeof client.posts.index.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostPostsIndexMutationOptions(clientOptions), ...mutationOptions })
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

export function useUsersIdIndex<TData = Awaited<ReturnType<typeof getUsersIdIndex>>>(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseUsersIdIndex<TData = Awaited<ReturnType<typeof getUsersIdIndex>>>(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: {
    query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getUsersIdIndexQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(args, { ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getUsersIdIndexInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
) {
  return ['users', '/users/:id/', args, 'infinite'] as const
}

export function getUsersIdIndexInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdIndexInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersIdIndex(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getUsersIdIndexInfiniteQueryOptions(args, clientOptions),
  })
}

export function useSuspenseInfiniteUsersIdIndex(
  args: InferRequestType<(typeof client.users)[':id']['index']['$get']>,
  options: {
    query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersIdIndex>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getUsersIdIndexInfiniteQueryOptions(args, clientOptions),
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

export function useItemsIndex<TData = Awaited<ReturnType<typeof getItemsIndex>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsIndex({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseItemsIndex<TData = Awaited<ReturnType<typeof getItemsIndex>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getItemsIndexQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsIndex({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getItemsIndexInfiniteQueryKey() {
  return ['items', '/items/', 'infinite'] as const
}

export function getItemsIndexInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsIndexInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItemsIndex({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteItemsIndex(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getItemsIndexInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteItemsIndex(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getItemsIndex>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getItemsIndexInfiniteQueryOptions(clientOptions),
  })
}
