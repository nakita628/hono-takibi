import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function createGetStream(options?: {
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
  return createQuery({ ...getGetStreamQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /stream
 */
export function getGetStreamQueryKey() {
  return ['/stream'] as const
}

/**
 * Returns Svelte Query query options for GET /stream
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStreamQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetStreamQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.stream.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function createPostGraphql(options?: {
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
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.graphql.$post>) =>
      parseResponse(client.graphql.$post(args, clientOptions)),
  })
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function createPostGrpcGateway(options?: {
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
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['grpc-gateway']['$post']>) =>
      parseResponse(client['grpc-gateway'].$post(args, clientOptions)),
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
export function createGetDeprecatedEndpoint(options?: {
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
  return createQuery({ ...getGetDeprecatedEndpointQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /deprecated-endpoint
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['/deprecated-endpoint'] as const
}

/**
 * Returns Svelte Query query options for GET /deprecated-endpoint
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedEndpointQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetDeprecatedEndpointQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client['deprecated-endpoint'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
