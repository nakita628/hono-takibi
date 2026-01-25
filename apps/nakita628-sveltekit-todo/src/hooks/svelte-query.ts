import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '$lib'

/**
 * GET /api
 *
 * Health Check
 */
export function createGetApi(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApiQueryKey(),
    queryFn: async () => parseResponse(client.api.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /api
 */
export function getGetApiQueryKey() {
  return ['/api'] as const
}

/**
 * GET /api/todo
 *
 * Retrieve a list of posts
 */
export function createGetApiTodo(
  args: InferRequestType<typeof client.api.todo.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApiTodoQueryKey(args),
    queryFn: async () => parseResponse(client.api.todo.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /api/todo
 */
export function getGetApiTodoQueryKey(args: InferRequestType<typeof client.api.todo.$get>) {
  return ['/api/todo', args] as const
}

/**
 * POST /api/todo
 *
 * Create a new post
 */
export function createPostApiTodo(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.api.todo.$post>,
      variables: InferRequestType<typeof client.api.todo.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.api.todo.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.api.todo.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.api.todo.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.api.todo.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.api.todo.$post>) =>
      parseResponse(client.api.todo.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /api/todo/{id}
 *
 * Get a single todo
 */
export function createGetApiTodoId(
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApiTodoIdQueryKey(args),
    queryFn: async () => parseResponse(client.api.todo[':id'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /api/todo/{id}
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
export function createPutApiTodoId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.api.todo)[':id']['$put']> | undefined,
      variables: InferRequestType<(typeof client.api.todo)[':id']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.api.todo)[':id']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.api.todo)[':id']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.api.todo)[':id']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.api.todo)[':id']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.api.todo)[':id']['$put']>) =>
      parseResponse(client.api.todo[':id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /api/todo/{id}
 *
 * Delete a todo
 */
export function createDeleteApiTodoId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.api.todo)[':id']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.api.todo)[':id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.api.todo)[':id']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.api.todo)[':id']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.api.todo)[':id']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.api.todo)[':id']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.api.todo)[':id']['$delete']>) =>
      parseResponse(client.api.todo[':id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
