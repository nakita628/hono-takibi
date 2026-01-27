import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '@/lib'

/**
 * GET /todo
 *
 * Retrieve a list of posts
 */
export function useGetTodo(
  args: InferRequestType<typeof client.todo.$get>,
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
  return useQuery({ ...getGetTodoQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /todo
 */
export function getGetTodoQueryKey(args: InferRequestType<typeof client.todo.$get>) {
  return ['/todo', args] as const
}

/**
 * Returns TanStack Query query options for GET /todo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTodoQueryOptions = (
  args: InferRequestType<typeof client.todo.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTodoQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.todo.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /todo
 *
 * Create a new post
 */
export function usePostTodo(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.todo.$post>>>>
      >,
      variables: InferRequestType<typeof client.todo.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.todo.$post>) => void
    onSettled?: (
      data:
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.todo.$post>>>>>
        | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.todo.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.todo.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.todo.$post>) =>
      parseResponse(client.todo.$post(args, clientOptions)),
  })
}

/**
 * GET /todo/{id}
 *
 * Get a single todo
 */
export function useGetTodoId(
  args: InferRequestType<(typeof client.todo)[':id']['$get']>,
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
  return useQuery({ ...getGetTodoIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /todo/{id}
 */
export function getGetTodoIdQueryKey(args: InferRequestType<(typeof client.todo)[':id']['$get']>) {
  return ['/todo/:id', args] as const
}

/**
 * Returns TanStack Query query options for GET /todo/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTodoIdQueryOptions = (
  args: InferRequestType<(typeof client.todo)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTodoIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.todo[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /todo/{id}
 *
 * Update an existing todo
 */
export function usePutTodoId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$put']>>>
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.todo)[':id']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.todo)[':id']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$put']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.todo)[':id']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.todo)[':id']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.todo)[':id']['$put']>) =>
      parseResponse(client.todo[':id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /todo/{id}
 *
 * Delete a todo
 */
export function useDeleteTodoId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$delete']>>>
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.todo)[':id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.todo)[':id']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.todo)[':id']['$delete']>>>
            >
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.todo)[':id']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.todo)[':id']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.todo)[':id']['$delete']>) =>
      parseResponse(client.todo[':id'].$delete(args, clientOptions)),
  })
}
