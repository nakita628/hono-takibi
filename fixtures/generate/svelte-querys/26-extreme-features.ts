import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * Generates Svelte Query cache key for GET /stream
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStreamQueryKey() {
  return ['stream', 'GET', '/stream'] as const
}

/**
 * Returns Svelte Query query options for GET /stream
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
export function createGetStream(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.stream.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStreamQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /graphql
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGraphqlMutationKey() {
  return ['graphql', 'POST', '/graphql'] as const
}

/**
 * Returns Svelte Query mutation options for POST /graphql
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
export function createPostGraphql(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphql.$post>>>>>,
      Error,
      InferRequestType<typeof client.graphql.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostGraphqlMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /grpc-gateway
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGrpcGatewayMutationKey() {
  return ['grpc-gateway', 'POST', '/grpc-gateway'] as const
}

/**
 * Returns Svelte Query mutation options for POST /grpc-gateway
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
export function createPostGrpcGateway(
  options?: () => {
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostGrpcGatewayMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /deprecated-endpoint
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['deprecated-endpoint', 'GET', '/deprecated-endpoint'] as const
}

/**
 * Returns Svelte Query query options for GET /deprecated-endpoint
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
export function createGetDeprecatedEndpoint(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['deprecated-endpoint']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDeprecatedEndpointQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
