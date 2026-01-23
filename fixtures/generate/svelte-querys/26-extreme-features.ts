import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function createGetStream(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.stream.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStreamQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.stream.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /stream
 */
export function getGetStreamQueryKey() {
  return ['/stream'] as const
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function createPostGraphql(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.graphql.$post> | undefined,
      Error,
      InferRequestType<typeof client.graphql.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostGrpcGateway(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['grpc-gateway']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['grpc-gateway']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetDeprecatedEndpoint(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['deprecated-endpoint']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetDeprecatedEndpointQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['deprecated-endpoint'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /deprecated-endpoint
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['/deprecated-endpoint'] as const
}
