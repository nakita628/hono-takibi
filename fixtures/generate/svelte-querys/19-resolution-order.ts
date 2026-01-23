import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function createGetEntities(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.entities.$get>,
      Error,
      InferResponseType<typeof client.entities.$get>,
      readonly ['/entities']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEntitiesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.entities.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey() {
  return ['/entities'] as const
}

/**
 * POST /process
 */
export function createPostProcess(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.process.$post> | undefined,
      Error,
      InferRequestType<typeof client.process.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.process.$post> | undefined,
    Error,
    InferRequestType<typeof client.process.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.process.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /graph
 */
export function createGetGraph(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.graph.$get>,
      Error,
      InferResponseType<typeof client.graph.$get>,
      readonly ['/graph']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGraphQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.graph.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /graph
 */
export function getGetGraphQueryKey() {
  return ['/graph'] as const
}

/**
 * POST /transform
 */
export function createPostTransform(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.transform.$post> | undefined,
      Error,
      InferRequestType<typeof client.transform.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.transform.$post> | undefined,
    Error,
    InferRequestType<typeof client.transform.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.transform.$post(args, options?.client)),
    },
    queryClient,
  )
}
