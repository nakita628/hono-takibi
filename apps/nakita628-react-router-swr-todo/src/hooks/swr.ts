import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '@/lib'

/**
 * GET /
 *
 * Health Check
 */
export function useGet(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.index.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /
 */
export function getGetKey() {
  return ['/'] as const
}

/**
 * GET /todo
 *
 * Retrieve a list of posts
 */
export function useGetTodo(
  args: InferRequestType<typeof client.todo.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTodoKey(args) : null)
  return {
    swrKey,
    ...useSWR(swrKey, async () => parseResponse(client.todo.$get(args, clientOptions)), swrOptions),
  }
}

/**
 * Generates SWR cache key for GET /todo
 */
export function getGetTodoKey(args?: InferRequestType<typeof client.todo.$get>) {
  return ['/todo', ...(args ? [args] : [])] as const
}

/**
 * POST /todo
 *
 * Create a new post
 */
export function usePostTodo(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.todo.$post>,
    Error,
    string,
    InferRequestType<typeof client.todo.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /todo',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.todo.$post> }) =>
      parseResponse(client.todo.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /todo/{id}
 *
 * Get a single todo
 */
export function useGetTodoId(
  args: InferRequestType<(typeof client.todo)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTodoIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.todo[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /todo/{id}
 */
export function getGetTodoIdKey(args?: InferRequestType<(typeof client.todo)[':id']['$get']>) {
  return ['/todo/:id', ...(args ? [args] : [])] as const
}

/**
 * PUT /todo/{id}
 *
 * Update an existing todo
 */
export function usePutTodoId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.todo)[':id']['$put']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.todo)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /todo/:id',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client.todo)[':id']['$put']> }) =>
      parseResponse(client.todo[':id'].$put(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * DELETE /todo/{id}
 *
 * Delete a todo
 */
export function useDeleteTodoId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.todo)[':id']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.todo)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /todo/:id',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client.todo)[':id']['$delete']> }) =>
      parseResponse(client.todo[':id'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}
