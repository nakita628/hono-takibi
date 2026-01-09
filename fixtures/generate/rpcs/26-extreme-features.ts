import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/26-extreme-features'

/**
 * GET /stream
 *
 * Stream data with Server-Sent Events
 */
export async function getStream(args?: { options?: ClientRequestOptions }) {
  return await client.stream.$get(args)
}

/**
 * POST /graphql
 *
 * GraphQL endpoint
 */
export async function postGraphql(args: {
  json: string | { query?: string; variables?: {}; operationName?: string }
  options?: ClientRequestOptions
}) {
  return await client.graphql.$post(args)
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export async function postGrpcGateway(args: { json: File | File; options?: ClientRequestOptions }) {
  return await client['grpc-gateway']['$post'](args)
}

/**
 * GET /deprecated-endpoint
 *
 * This endpoint is deprecated
 *
 * **DEPRECATED**: This endpoint will be removed in v3.

Please use `/new-endpoint` instead.
 */
export async function getDeprecatedEndpoint(args?: { options?: ClientRequestOptions }) {
  return await client['deprecated-endpoint']['$get'](args)
}
