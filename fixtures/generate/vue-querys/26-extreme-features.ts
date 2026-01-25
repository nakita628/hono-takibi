import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function useGetStream(options?: {
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
  return useQuery({
    queryKey: getGetStreamQueryKey(),
    queryFn: async () => parseResponse(client.stream.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /stream
 */
export function getGetStreamQueryKey() {
  return ['/stream'] as const
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function usePostGraphql(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.graphql.$post>,
      variables: InferRequestType<typeof client.graphql.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.graphql.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.graphql.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.graphql.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.graphql.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.graphql.$post>) =>
      parseResponse(client.graphql.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function usePostGrpcGateway(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['grpc-gateway']['$post']>,
      variables: InferRequestType<(typeof client)['grpc-gateway']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['grpc-gateway']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['grpc-gateway']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['grpc-gateway']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['grpc-gateway']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['grpc-gateway']['$post']>) =>
      parseResponse(client['grpc-gateway'].$post(args, clientOptions)),
    ...mutationOptions,
  })
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
export function useGetDeprecatedEndpoint(options?: {
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
  return useQuery({
    queryKey: getGetDeprecatedEndpointQueryKey(),
    queryFn: async () =>
      parseResponse(client['deprecated-endpoint'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /deprecated-endpoint
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['/deprecated-endpoint'] as const
}
