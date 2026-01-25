import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { client } from '@/lib'

/**
 * GET /api
 *
 * Health Check
 */
export function useGetApi(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.api.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiTodoKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.api.todo.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
export function usePostApiTodo(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /api/todo',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.api.todo.$post> }) =>
      parseResponse(client.api.todo.$post(arg, options?.client)),
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiTodoIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.api.todo[':id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
export function usePutApiTodoId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /api/todo/:id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.api.todo)[':id']['$put']> },
    ) => parseResponse(client.api.todo[':id'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /api/todo/{id}
 *
 * Delete a todo
 */
export function useDeleteApiTodoId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /api/todo/:id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.api.todo)[':id']['$delete']> },
    ) => parseResponse(client.api.todo[':id'].$delete(arg, options?.client)),
  )
}
