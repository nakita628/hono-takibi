import type { CreateMutationOptions, CreateQueryOptions } from '@tanstack/svelte-query'
import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '@/lib'

/**
 * GET /api
 *
 * Health Check
 */
export function createGetApi(options?: {
  query?: Omit<
    CreateQueryOptions<InferResponseType<typeof client.api.$get>, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  > & { enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetApiQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /api
 */
export function getGetApiQueryKey() {
  return ['/api'] as const
}

/**
 * Returns Svelte Query query options for GET /api
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetApiQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.api.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /api/todo
 *
 * Retrieve a list of posts
 */
export function createGetApiTodo(
  args: InferRequestType<typeof client.api.todo.$get>,
  options?: {
    query?: Omit<
      CreateQueryOptions<InferResponseType<typeof client.api.todo.$get>, Error>,
      'queryKey' | 'queryFn' | 'enabled'
    > & { enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetApiTodoQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /api/todo
 */
export function getGetApiTodoQueryKey(args: InferRequestType<typeof client.api.todo.$get>) {
  return ['/api/todo', args] as const
}

/**
 * Returns Svelte Query query options for GET /api/todo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiTodoQueryOptions = (
  args: InferRequestType<typeof client.api.todo.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApiTodoQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.api.todo.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /api/todo
 *
 * Create a new post
 */
export function createPostApiTodo(options?: {
  mutation?: Omit<
    CreateMutationOptions<
      InferResponseType<typeof client.api.todo.$post>,
      Error,
      InferRequestType<typeof client.api.todo.$post>
    >,
    'mutationFn'
  >
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
    query?: Omit<
      CreateQueryOptions<InferResponseType<(typeof client.api.todo)[':id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'enabled'
    > & { enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetApiTodoIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Svelte Query query options for GET /api/todo/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApiTodoIdQueryOptions = (
  args: InferRequestType<(typeof client.api.todo)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApiTodoIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.api.todo[':id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /api/todo/{id}
 *
 * Update an existing todo
 */
export function createPutApiTodoId(options?: {
  mutation?: Omit<
    CreateMutationOptions<
      InferResponseType<(typeof client.api.todo)[':id']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.api.todo)[':id']['$put']>
    >,
    'mutationFn'
  >
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
  mutation?: Omit<
    CreateMutationOptions<
      InferResponseType<(typeof client.api.todo)[':id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.api.todo)[':id']['$delete']>
    >,
    'mutationFn'
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.api.todo)[':id']['$delete']>) =>
      parseResponse(client.api.todo[':id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
