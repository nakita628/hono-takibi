import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * Generates Vue Query cache key for GET /stream
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStreamQueryKey() {
  return ['stream', '/stream'] as const
}

/**
 * Returns Vue Query query options for GET /stream
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStreamQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStreamQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.stream.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function useGetStream(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.stream.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStreamQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /graphql
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostGraphqlMutationKey() {
  return ['POST', '/graphql'] as const
}

/**
 * Returns Vue Query mutation options for POST /graphql
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGraphqlMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostGraphqlMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.graphql.$post>) =>
    parseResponse(client.graphql.$post(args, clientOptions)),
})

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function usePostGraphql(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphql.$post>>>>>,
        Error,
        InferRequestType<typeof client.graphql.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.graphql.$post>) =>
      parseResponse(client.graphql.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /grpc-gateway
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostGrpcGatewayMutationKey() {
  return ['POST', '/grpc-gateway'] as const
}

/**
 * Returns Vue Query mutation options for POST /grpc-gateway
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGrpcGatewayMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostGrpcGatewayMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['grpc-gateway']['$post']>) =>
    parseResponse(client['grpc-gateway'].$post(args, clientOptions)),
})

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function usePostGrpcGateway(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['grpc-gateway']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['grpc-gateway']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['grpc-gateway']['$post']>) =>
      parseResponse(client['grpc-gateway'].$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /deprecated-endpoint
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['deprecated-endpoint', '/deprecated-endpoint'] as const
}

/**
 * Returns Vue Query query options for GET /deprecated-endpoint
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeprecatedEndpointQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDeprecatedEndpointQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['deprecated-endpoint'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['deprecated-endpoint']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDeprecatedEndpointQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
