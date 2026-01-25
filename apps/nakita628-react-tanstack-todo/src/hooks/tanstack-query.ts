import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '@/lib'

/**
 * GET /api
 *
 * Health Check
 */
export function useGetApi(options?: {
  query?: { enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const isEnabled = queryOptions?.enabled !== false
  return useQuery({ ...getGetApiQueryOptions(clientOptions), enabled: isEnabled })
}

/**
 * Returns TanStack Query query options for GET /api
 */
export function getGetApiQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetApiQueryKey(),
    queryFn: async () => parseResponse(client.api.$get(undefined, clientOptions)),
  }
}

/**
 * Generates TanStack Query cache key for GET /api
 */
export function getGetApiQueryKey() {
  return ['/api'] as const
}

/**
 * GET /api/todo
 *
 * Retrieve a list of posts
 */
export function useGetApiTodo(
  args: InferRequestType<typeof client.api.todo.$get>,
  options?: { query?: { enabled?: boolean }; client?: ClientRequestOptions },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const isEnabled = queryOptions?.enabled !== false
  return useQuery({ ...getGetApiTodoQueryOptions(args, clientOptions), enabled: isEnabled })
}

/**
 * Returns TanStack Query query options for GET /api/todo
 */
export function getGetApiTodoQueryOptions(
  args: InferRequestType<typeof client.api.todo.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApiTodoQueryKey(args),
    queryFn: async () => parseResponse(client.api.todo.$get(args, clientOptions)),
  }
}

/**
 * Generates TanStack Query cache key for GET /api/todo
 */
export function getGetApiTodoQueryKey(args: InferRequestType<typeof client.api.todo.$get>) {
  return ['/api/todo', args] as const
}

/**
 * POST /api/todo
 *
 * Create a new post
 */
export function usePostApiTodo(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.api.todo.$post>) =>
      parseResponse(client.api.todo.$post(args, clientOptions)),
  })
}

/**
 * GET /api/todo/{id}
 *
 * Get a single todo
 */
export function useGetApiTodoId(
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
  options?: { query?: { enabled?: boolean }; client?: ClientRequestOptions },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const isEnabled = queryOptions?.enabled !== false
  return useQuery({ ...getGetApiTodoIdQueryOptions(args, clientOptions), enabled: isEnabled })
}

/**
 * Returns TanStack Query query options for GET /api/todo/{id}
 */
export function getGetApiTodoIdQueryOptions(
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApiTodoIdQueryKey(args),
    queryFn: async () => parseResponse(client.api.todo[':id'].$get(args, clientOptions)),
  }
}

/**
 * Generates TanStack Query cache key for GET /api/todo/{id}
 */
export function getGetApiTodoIdQueryKey(
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
) {
  return ['/api/todo/:id', args] as const
}

/**
 * PUT /api/todo/{id}
 *
 * Update an existing todo
 */
export function usePutApiTodoId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.api.todo)[':id']['$put']>) =>
      parseResponse(client.api.todo[':id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /api/todo/{id}
 *
 * Delete a todo
 */
export function useDeleteApiTodoId(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.api.todo)[':id']['$delete']>) =>
      parseResponse(client.api.todo[':id'].$delete(args, clientOptions)),
  })
}
