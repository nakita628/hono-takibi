import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(
  args: InferRequestType<typeof client.webhooks.$post>,
  options?: ClientRequestOptions,
) {
  return await client.webhooks.$post(args, options)
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await client.subscriptions.$post(args, options)
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export async function postJobs(
  args: InferRequestType<typeof client.jobs.$post>,
  options?: ClientRequestOptions,
) {
  return await client.jobs.$post(args, options)
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export async function postIntegrationsIntegrationIdSync(
  args: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.integrations[':integrationId'].sync.$post(args, options)
}
