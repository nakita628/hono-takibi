import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export async function getEntities(
  args: InferRequestType<typeof client.entities.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities.$get(args, options))
}

/**
 * POST /entities
 */
export async function postEntities(
  args: InferRequestType<typeof client.entities.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities.$post(args, options))
}

/**
 * GET /entities/{entityId}
 */
export async function getEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities[':entityId'].$get(args, options))
}

/**
 * PUT /entities/{entityId}
 */
export async function putEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities[':entityId'].$put(args, options))
}

/**
 * DELETE /entities/{entityId}
 */
export async function deleteEntitiesEntityId(
  args: InferRequestType<(typeof client.entities)[':entityId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities[':entityId'].$delete(args, options))
}

/**
 * GET /entities/{entityId}/relationships
 */
export async function getEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities[':entityId'].relationships.$get(args, options))
}

/**
 * POST /entities/{entityId}/relationships
 */
export async function postEntitiesEntityIdRelationships(
  args: InferRequestType<(typeof client.entities)[':entityId']['relationships']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.entities[':entityId'].relationships.$post(args, options))
}

/**
 * POST /batch
 */
export async function postBatch(
  args: InferRequestType<typeof client.batch.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.batch.$post(args, options))
}
