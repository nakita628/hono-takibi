import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '@/lib'

/**
 * Generates SWR cache key for GET /todo
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTodoKey(args: InferRequestType<typeof client.todo.$get>) {
  return ['todo', 'GET', '/todo', args] as const
}

/**
 * GET /todo
 *
 * Retrieve a list of todos
 *
 * Retrieve a list of todos with pagination
 */
export function useGetTodo(
  args: InferRequestType<typeof client.todo.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetTodoKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.todo.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /todo
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTodoMutationKey() {
  return ['todo', 'POST', '/todo'] as const
}

/**
 * POST /todo
 *
 * Create a new todo
 *
 * Create a new todo item
 */
export function usePostTodo(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.todo.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.todo.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTodoMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.todo.$post> }) =>
        parseResponse(client.todo.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /todo/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTodoIdKey(args: InferRequestType<(typeof client.todo)[':id']['$get']>) {
  return ['todo', 'GET', '/todo/:id', args] as const
}

/**
 * GET /todo/{id}
 *
 * Get a single todo
 *
 * Get a single todo by ID
 */
export function useGetTodoId(
  args: InferRequestType<(typeof client.todo)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetTodoIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.todo[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /todo/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutTodoIdMutationKey() {
  return ['todo', 'PUT', '/todo/:id'] as const
}

/**
 * PUT /todo/{id}
 *
 * Update an existing todo
 *
 * Update an existing todo
 */
export function usePutTodoId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$put']>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.todo)[':id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutTodoIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.todo)[':id']['$put']> }) =>
        parseResponse(client.todo[':id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /todo/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTodoIdMutationKey() {
  return ['todo', 'DELETE', '/todo/:id'] as const
}

/**
 * DELETE /todo/{id}
 *
 * Delete a todo
 *
 * Delete a todo
 */
export function useDeleteTodoId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.todo)[':id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteTodoIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.todo)[':id']['$delete']> }) =>
        parseResponse(client.todo[':id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
