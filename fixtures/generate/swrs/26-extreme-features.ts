import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function useGetStream(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.stream.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/stream'] as const) : null
  return useSWR<InferResponseType<typeof client.stream.$get>, Error>(
    key,
    async () => parseResponse(client.stream.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /stream
 */
export function getGetStreamKey() {
  return ['GET', '/stream'] as const
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export function usePostGraphql(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.graphql.$post>,
    Error,
    string,
    InferRequestType<typeof client.graphql.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.graphql.$post>,
    Error,
    string,
    InferRequestType<typeof client.graphql.$post>
  >(
    'POST /graphql',
    async (_, { arg }) => parseResponse(client.graphql.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function usePostGrpcGateway(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['grpc-gateway']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['grpc-gateway']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['grpc-gateway']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['grpc-gateway']['$post']>
  >(
    'POST /grpc-gateway',
    async (_, { arg }) => parseResponse(client['grpc-gateway'].$post(arg, options?.client)),
    options?.swr,
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
export function useGetDeprecatedEndpoint(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['deprecated-endpoint']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/deprecated-endpoint'] as const) : null
  return useSWR<InferResponseType<(typeof client)['deprecated-endpoint']['$get']>, Error>(
    key,
    async () => parseResponse(client['deprecated-endpoint'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /deprecated-endpoint
 */
export function getGetDeprecatedEndpointKey() {
  return ['GET', '/deprecated-endpoint'] as const
}
