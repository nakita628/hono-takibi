import type { InferRequestType } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export async function postEvents(arg: InferRequestType<typeof client.events.$post>) {
  return await client.events.$post(arg)
}

/**
 * POST /notifications
 */
export async function postNotifications(arg: InferRequestType<typeof client.notifications.$post>) {
  return await client.notifications.$post(arg)
}

/**
 * POST /shapes
 */
export async function postShapes(arg: InferRequestType<typeof client.shapes.$post>) {
  return await client.shapes.$post(arg)
}

/**
 * POST /documents
 */
export async function postDocuments(arg: InferRequestType<typeof client.documents.$post>) {
  return await client.documents.$post(arg)
}

/**
 * POST /mixed
 */
export async function postMixed(arg: InferRequestType<typeof client.mixed.$post>) {
  return await client.mixed.$post(arg)
}
