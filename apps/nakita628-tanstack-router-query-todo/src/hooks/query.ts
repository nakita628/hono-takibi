import type {
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '@/lib'

/**
 * Generates TanStack Query cache key for GET /todo
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTodoQueryKey(args: InferRequestType<typeof client.todo.$get>) {
  return ['todo', 'GET', '/todo', args] as const
}

/**
 * Returns TanStack Query query options for GET /todo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTodoQueryOptions = (
  args: InferRequestType<typeof client.todo.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTodoQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.todo.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.todo.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTodoQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for POST /todo
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTodoMutationKey() {
  return ['todo', 'POST', '/todo'] as const
}

/**
 * Returns TanStack Query mutation options for POST /todo
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTodoMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTodoMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.todo.$post>) =>
    parseResponse(client.todo.$post(args, clientOptions)),
})

/**
 * POST /todo
 *
 * Create a new todo
 *
 * Create a new todo item
 */
export function usePostTodo(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.todo.$post>>>>>,
    Error,
    InferRequestType<typeof client.todo.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostTodoMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query cache key for GET /todo/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTodoIdQueryKey(args: InferRequestType<(typeof client.todo)[':id']['$get']>) {
  return ['todo', 'GET', '/todo/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /todo/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTodoIdQueryOptions = (
  args: InferRequestType<(typeof client.todo)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTodoIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.todo[':id'].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTodoIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /todo/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutTodoIdMutationKey() {
  return ['todo', 'PUT', '/todo/:id'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /todo/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutTodoIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutTodoIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.todo)[':id']['$put']>) =>
    parseResponse(client.todo[':id'].$put(args, clientOptions)),
})

/**
 * PUT /todo/{id}
 *
 * Update an existing todo
 *
 * Update an existing todo
 */
export function usePutTodoId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$put']>>>>
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.todo)[':id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutTodoIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query mutation key for DELETE /todo/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTodoIdMutationKey() {
  return ['todo', 'DELETE', '/todo/:id'] as const
}

/**
 * Returns TanStack Query mutation options for DELETE /todo/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTodoIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteTodoIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.todo)[':id']['$delete']>) =>
    parseResponse(client.todo[':id'].$delete(args, clientOptions)),
})

/**
 * DELETE /todo/{id}
 *
 * Delete a todo
 *
 * Delete a todo
 */
export function useDeleteTodoId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.todo)[':id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getDeleteTodoIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
