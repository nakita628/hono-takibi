import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export async function getStream(options?: ClientRequestOptions) {
  return await client.stream.$get(undefined, options)
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export async function postGraphql(
  args: InferRequestType<typeof client.graphql.$post>,
  options?: ClientRequestOptions,
) {
  return await client.graphql.$post(args, options)
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export async function postGrpcGateway(
  args: InferRequestType<(typeof client)['grpc-gateway']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['grpc-gateway'].$post(args, options)
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
export async function getDeprecatedEndpoint(options?: ClientRequestOptions) {
  return await client['deprecated-endpoint'].$get(undefined, options)
}
