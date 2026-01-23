import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export function useGetStream(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetStreamQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.stream.$get(undefined, clientOptions)),
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
export function usePostGraphql(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.graphql.$post> | undefined,
    Error,
    InferRequestType<typeof client.graphql.$post>
  >({ mutationFn: async (args) => parseResponse(client.graphql.$post(args, clientOptions)) })
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export function usePostGrpcGateway(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['grpc-gateway']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['grpc-gateway']['$post']>
  >({
    mutationFn: async (args) => parseResponse(client['grpc-gateway'].$post(args, clientOptions)),
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
export function useGetDeprecatedEndpoint(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetDeprecatedEndpointQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['deprecated-endpoint'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /deprecated-endpoint
 */
export function getGetDeprecatedEndpointQueryKey() {
  return ['/deprecated-endpoint'] as const
}
