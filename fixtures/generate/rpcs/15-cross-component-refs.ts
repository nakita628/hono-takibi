import type { InferRequestType } from 'hono/client'
import { client } from '../clients/15-cross-component-refs'

/**
 * GET /entities
 */
export async function getEntities(arg: InferRequestType<typeof client.entities.$get>) {
  return await client.entities.$get(arg)
}

/**
 * POST /entities
 */
export async function postEntities(arg: InferRequestType<typeof client.entities.$post>) {
  return await client.entities.$post(arg)
}

/**
 * GET /entities/{entityId}
 */
export async function getEntitiesEntityId(
  arg: InferRequestType<(typeof client)['entities'][':entityId']['$get']>,
) {
  return await client['entities'][':entityId']['$get'](arg)
}

/**
 * PUT /entities/{entityId}
 */
export async function putEntitiesEntityId(
  arg: InferRequestType<(typeof client)['entities'][':entityId']['$put']>,
) {
  return await client['entities'][':entityId']['$put'](arg)
}

/**
 * DELETE /entities/{entityId}
 */
export async function deleteEntitiesEntityId(
  arg: InferRequestType<(typeof client)['entities'][':entityId']['$delete']>,
) {
  return await client['entities'][':entityId']['$delete'](arg)
}

/**
 * GET /entities/{entityId}/relationships
 */
export async function getEntitiesEntityIdRelationships(
  arg: InferRequestType<(typeof client)['entities'][':entityId']['relationships']['$get']>,
) {
  return await client['entities'][':entityId']['relationships']['$get'](arg)
}

/**
 * POST /entities/{entityId}/relationships
 */
export async function postEntitiesEntityIdRelationships(
  arg: InferRequestType<(typeof client)['entities'][':entityId']['relationships']['$post']>,
) {
  return await client['entities'][':entityId']['relationships']['$post'](arg)
}

/**
 * POST /batch
 */
export async function postBatch(arg: InferRequestType<typeof client.batch.$post>) {
  return await client.batch.$post(arg)
}
