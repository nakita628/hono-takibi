import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '@/lib'

/**
 * GET /api
 *
 * Health Check
 */
export function useGetApi(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.api.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKey() : null)
  const query = useSWR<InferResponseType<typeof client.api.$get>, Error>(
    swrKey,
    async () => parseResponse(client.api.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /api
 */
export function getGetApiKey() {
  return ['/api'] as const
}

/**
 * GET /api/todo
 *
 * Retrieve a list of posts
 */
export function useGetApiTodo(
  args: InferRequestType<typeof client.api.todo.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.api.todo.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiTodoKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.api.todo.$get>, Error>(
    swrKey,
    async () => parseResponse(client.api.todo.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /api/todo
 */
export function getGetApiTodoKey(args?: InferRequestType<typeof client.api.todo.$get>) {
  return ['/api/todo', ...(args ? [args] : [])] as const
}

/**
 * POST /api/todo
 *
 * Create a new post
 */
export function usePostApiTodo(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.api.todo.$post>,
    Error,
    string,
    InferRequestType<typeof client.api.todo.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.api.todo.$post>,
    Error,
    string,
    InferRequestType<typeof client.api.todo.$post>
  >(
    'POST /api/todo',
    async (_, { arg }) => parseResponse(client.api.todo.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /api/todo/{id}
 *
 * Get a single todo
 */
export function useGetApiTodoId(
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.api.todo)[':id']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiTodoIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.api.todo)[':id']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.api.todo[':id'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /api/todo/{id}
 */
export function getGetApiTodoIdKey(
  args?: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
) {
  return ['/api/todo/:id', ...(args ? [args] : [])] as const
}

/**
 * PUT /api/todo/{id}
 *
 * Update an existing todo
 */
export function usePutApiTodoId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.api.todo)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.api.todo)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.api.todo)[':id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.api.todo)[':id']['$put']>
  >(
    'PUT /api/todo/:id',
    async (_, { arg }) => parseResponse(client.api.todo[':id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /api/todo/{id}
 *
 * Delete a todo
 */
export function useDeleteApiTodoId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.api.todo)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.api.todo)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.api.todo)[':id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.api.todo)[':id']['$delete']>
  >(
    'DELETE /api/todo/:id',
    async (_, { arg }) => parseResponse(client.api.todo[':id'].$delete(arg, options?.client)),
    options?.swr,
  )
}
