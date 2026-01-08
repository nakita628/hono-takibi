import type { InferRequestType } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(arg: InferRequestType<typeof client.webhooks.$post>) {
  return await client.webhooks.$post(arg)
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export async function postSubscriptions(arg: InferRequestType<typeof client.subscriptions.$post>) {
  return await client.subscriptions.$post(arg)
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export async function postJobs(arg: InferRequestType<typeof client.jobs.$post>) {
  return await client.jobs.$post(arg)
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export async function postIntegrationsIntegrationIdSync(
  arg: InferRequestType<(typeof client)['integrations'][':integrationId']['sync']['$post']>,
) {
  return await client['integrations'][':integrationId']['sync']['$post'](arg)
}
