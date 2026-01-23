import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/19-resolution-order'

/**
 * GET /entities
 */
export function useGetEntities(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.entities.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEntitiesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.entities.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /entities
 */
export function getGetEntitiesQueryKey() {
  return ['/entities'] as const
}

/**
 * POST /process
 */
export function usePostProcess(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.process.$post> | undefined,
      Error,
      InferRequestType<typeof client.process.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
export function useGetGraph(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.graph.$get>, Error>,
      'queryKey' | 'queryFn'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGraphQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.graph.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Vue Query cache key for GET /graph
 */
export function getGetGraphQueryKey() {
  return ['/graph'] as const
}

/**
 * POST /transform
 */
export function usePostTransform(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.transform.$post> | undefined,
      Error,
      InferRequestType<typeof client.transform.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
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
