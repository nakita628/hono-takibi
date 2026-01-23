import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/06-headers'

/**
 * GET /resources
 */
export function createGetResources(
  args: InferRequestType<typeof client.resources.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.resources.$get>,
      Error,
      InferResponseType<typeof client.resources.$get>,
      readonly ['/resources', InferRequestType<typeof client.resources.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetResourcesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.resources.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /resources
 */
export function getGetResourcesQueryKey(args: InferRequestType<typeof client.resources.$get>) {
  return ['/resources', args] as const
}

/**
 * GET /resources/{id}
 */
export function createGetResourcesId(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.resources)[':id']['$get']>,
      Error,
      InferResponseType<(typeof client.resources)[':id']['$get']>,
      readonly ['/resources/:id', InferRequestType<(typeof client.resources)[':id']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetResourcesIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.resources[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /resources/{id}
 */
export function getGetResourcesIdQueryKey(
  args: InferRequestType<(typeof client.resources)[':id']['$get']>,
) {
  return ['/resources/:id', args] as const
}

/**
 * PUT /resources/{id}
 */
export function createPutResourcesId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.resources)[':id']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.resources)[':id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.resources)[':id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.resources)[':id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.resources[':id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /download/{id}
 */
export function createGetDownloadId(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.download)[':id']['$get']>,
      Error,
      InferResponseType<(typeof client.download)[':id']['$get']>,
      readonly ['/download/:id', InferRequestType<(typeof client.download)[':id']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDownloadIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.download[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /download/{id}
 */
export function getGetDownloadIdQueryKey(
  args: InferRequestType<(typeof client.download)[':id']['$get']>,
) {
  return ['/download/:id', args] as const
}
