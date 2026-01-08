import type { InferRequestType } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export async function postMessages(arg: InferRequestType<typeof client.messages.$post>) {
  return await client.messages.$post(arg)
}

/**
 * POST /events
 */
export async function postEvents(arg: InferRequestType<typeof client.events.$post>) {
  return await client.events.$post(arg)
}

/**
 * GET /configs
 */
export async function getConfigs() {
  return await client.configs.$get()
}

/**
 * PUT /configs
 */
export async function putConfigs(arg: InferRequestType<typeof client.configs.$put>) {
  return await client.configs.$put(arg)
}

/**
 * POST /resources
 */
export async function postResources(arg: InferRequestType<typeof client.resources.$post>) {
  return await client.resources.$post(arg)
}

/**
 * POST /validations
 */
export async function postValidations(arg: InferRequestType<typeof client.validations.$post>) {
  return await client.validations.$post(arg)
}
