import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/16-complex-composition'

/**
 * POST /messages
 */
export async function postMessages(
  args: InferRequestType<typeof client.messages.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.messages.$post(args, options))
}

/**
 * POST /events
 */
export async function postEvents(
  args: InferRequestType<typeof client.events.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.events.$post(args, options))
}

/**
 * GET /configs
 */
export async function getConfigs(options?: ClientRequestOptions) {
  return await parseResponse(client.configs.$get(undefined, options))
}

/**
 * PUT /configs
 */
export async function putConfigs(
  args: InferRequestType<typeof client.configs.$put>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$put(args, options))
}

/**
 * POST /resources
 */
export async function postResources(
  args: InferRequestType<typeof client.resources.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.resources.$post(args, options))
}

/**
 * POST /validations
 */
export async function postValidations(
  args: InferRequestType<typeof client.validations.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.validations.$post(args, options))
}
