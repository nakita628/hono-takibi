import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export async function postEvents(
  args: InferRequestType<typeof client.events.$post>,
  options?: ClientRequestOptions,
) {
  return await client.events.$post(args, options)
}

/**
 * POST /notifications
 */
export async function postNotifications(
  args: InferRequestType<typeof client.notifications.$post>,
  options?: ClientRequestOptions,
) {
  return await client.notifications.$post(args, options)
}

/**
 * POST /shapes
 */
export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await client.shapes.$post(args, options)
}

/**
 * POST /documents
 */
export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await client.documents.$post(args, options)
}

/**
 * POST /mixed
 */
export async function postMixed(
  args: InferRequestType<typeof client.mixed.$post>,
  options?: ClientRequestOptions,
) {
  return await client.mixed.$post(args, options)
}
