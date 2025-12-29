import { client } from '../index.ts'

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
export async function postGraphql(body: {
  query?: string
  variables?: {}
  operationName?: string
}) {
  return await client.graphql.$post({ json: body })
}

/**
 * POST /grpc-gateway
 *
 * gRPC-Gateway endpoint
 */
export async function postGrpcGateway() {
  return await client['grpc-gateway'].$post()
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
  return await client['deprecated-endpoint'].$get()
}
