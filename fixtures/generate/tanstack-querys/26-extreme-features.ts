import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function useGetStream(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.stream.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStreamQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.stream.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /stream
 */
export function getGetStreamQueryKey() {
  return ['GET', '/stream'] as const
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function usePostGraphql(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.graphql.$post> | undefined,
      Error,
      InferRequestType<typeof client.graphql.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.graphql.$post> | undefined,
    Error,
    InferRequestType<typeof client.graphql.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.graphql.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function usePostGrpcGateway(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['grpc-gateway']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['grpc-gateway']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['grpc-gateway']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['grpc-gateway']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['grpc-gateway'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /deprecated-endpoint
 *
 * This endpoint is deprecated
 *
 * **DEPRECATED**: This endpoint will be removed in v3.
 *
 * Please use `/new-endpoint` instead.
 */
export function useGetDeprecatedEndpoint(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['deprecated-endpoint']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeprecatedEndpointQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['deprecated-endpoint'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /deprecated-endpoint
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['GET', '/deprecated-endpoint'] as const
}
