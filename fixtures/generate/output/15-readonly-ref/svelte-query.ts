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

export function getItemsKey() {
  return ['items'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getUsersQueryKey() {
  return ['users', '/users'] as const
}

export async function getUsers(options?: ClientRequestOptions) {
  return await parseResponse(client.users.$get(undefined, options))
}

export function getUsersQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getUsersQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createUsers<TData = Awaited<ReturnType<typeof getUsers>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsers({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getUsersInfiniteQueryKey() {
  return ['users', '/users', 'infinite'] as const
}

export function getUsersInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getUsersInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsers({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteUsers(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersInfiniteQueryOptions(clientOptions) }
  })
}

export async function postUsers(
  args: InferRequestType<typeof client.users.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users.$post(args, options))
}

export function getPostUsersMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.users.$post>) {
      return postUsers(args, options)
    },
  }
}

export function createPostUsers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUsers>>,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostUsersMutationOptions(clientOptions), ...mutation }
  })
}

export function getUsersIdQueryKey(args: InferRequestType<(typeof client.users)[':id']['$get']>) {
  return ['users', '/users/:id', args] as const
}

export async function getUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$get(args, options))
}

export function getUsersIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getUsersIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createUsersId<TData = Awaited<ReturnType<typeof getUsersId>>>(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getUsersIdQueryKey(args()),
      queryFn({ signal }: QueryFunctionContext) {
        return getUsersId(args(), { ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getUsersIdInfiniteQueryKey(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
) {
  return ['users', '/users/:id', args, 'infinite'] as const
}

export function getUsersIdInfiniteQueryOptions(
  args: InferRequestType<(typeof client.users)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getUsersIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getUsersId(args, { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteUsersId(
  args: () => InferRequestType<(typeof client.users)[':id']['$get']>,
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getUsersId>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getUsersIdInfiniteQueryOptions(args(), clientOptions) }
  })
}

export async function putUsersId(
  args: InferRequestType<(typeof client.users)[':id']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.users[':id'].$put(args, options))
}

export function getPutUsersIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['users', '/users/:id', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.users)[':id']['$put']>) {
      return putUsersId(args, options)
    },
  }
}

export function createPutUsersId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof putUsersId>>,
      Error,
      InferRequestType<(typeof client.users)[':id']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPutUsersIdMutationOptions(clientOptions), ...mutation }
  })
}

export function getItemsQueryKey() {
  return ['items', '/items'] as const
}

export async function getItems(options?: ClientRequestOptions) {
  return await parseResponse(client.items.$get(undefined, options))
}

export function getItemsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getItemsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createItems<TData = Awaited<ReturnType<typeof getItems>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getItems>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getItemsQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getItems({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getItemsInfiniteQueryKey() {
  return ['items', '/items', 'infinite'] as const
}

export function getItemsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getItemsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getItems({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteItems(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getItems>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getItemsInfiniteQueryOptions(clientOptions) }
  })
}
