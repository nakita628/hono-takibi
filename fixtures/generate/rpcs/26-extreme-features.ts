import type { InferRequestType } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export async function getStream() {
  return await client.stream.$get()
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export async function postGraphql(arg: InferRequestType<typeof client.graphql.$post>) {
  return await client.graphql.$post(arg)
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export async function postGrpcGateway() {
  return await client['grpc-gateway']['$post']()
}

/**
 * GET /deprecated-endpoint
 *
 * This endpoint is deprecated
 *
 * **DEPRECATED**: This endpoint will be removed in v3.

Please use `/new-endpoint` instead.
 */
export async function getDeprecatedEndpoint() {
  return await client['deprecated-endpoint']['$get']()
}
