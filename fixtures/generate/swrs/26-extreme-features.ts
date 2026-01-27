import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/26-extreme-features'

/**
 * Generates SWR cache key for GET /stream
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStreamKey() {
  return ['stream', 'GET', '/stream'] as const
}

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function useGetStream(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetStreamKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.stream.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /graphql
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGraphqlMutationKey() {
  return ['graphql', 'POST', '/graphql'] as const
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function usePostGraphql(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graphql.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.graphql.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGraphqlMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.graphql.$post> }) =>
        parseResponse(client.graphql.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /grpc-gateway
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGrpcGatewayMutationKey() {
  return ['grpc-gateway', 'POST', '/grpc-gateway'] as const
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function usePostGrpcGateway(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['grpc-gateway']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['grpc-gateway']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGrpcGatewayMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['grpc-gateway']['$post']> },
      ) => parseResponse(client['grpc-gateway'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /deprecated-endpoint
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeprecatedEndpointKey() {
  return ['deprecated-endpoint', 'GET', '/deprecated-endpoint'] as const
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetDeprecatedEndpointKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['deprecated-endpoint'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
