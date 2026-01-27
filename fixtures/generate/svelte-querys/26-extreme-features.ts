import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function createGetStream(options?: {
  query?: CreateQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.stream.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({ ...getGetStreamQueryOptions(clientOptions), ...queryOptions }))
}

/**
 * Generates Svelte Query cache key for GET /stream
 * Uses $url() for type-safe key generation
 */
export function getGetStreamQueryKey() {
  return [client.stream.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /stream
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStreamQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStreamQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.stream.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function createPostGraphql(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphql.$post>>>>>,
    Error,
    InferRequestType<typeof client.graphql.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.graphql.$post>) =>
      parseResponse(client.graphql.$post(args, clientOptions)),
  }))
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function createPostGrpcGateway(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['grpc-gateway']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['grpc-gateway']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['grpc-gateway']['$post']>) =>
      parseResponse(client['grpc-gateway'].$post(args, clientOptions)),
  }))
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
  query?: CreateQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['deprecated-endpoint']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery(() => ({
    ...getGetDeprecatedEndpointQueryOptions(clientOptions),
    ...queryOptions,
  }))
}

/**
 * Generates Svelte Query cache key for GET /deprecated-endpoint
 * Uses $url() for type-safe key generation
 */
export function getGetDeprecatedEndpointQueryKey() {
  return [client['deprecated-endpoint'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /deprecated-endpoint
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedEndpointQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDeprecatedEndpointQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['deprecated-endpoint'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
