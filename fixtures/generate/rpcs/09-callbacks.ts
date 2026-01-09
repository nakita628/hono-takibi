import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(arg: {
  json: {
    url: string
    events: (
      | 'order.created'
      | 'order.updated'
      | 'order.cancelled'
      | 'payment.success'
      | 'payment.failed'
      | 'user.created'
      | 'user.deleted'
    )[]
    secret?: string
  }
}) {
  return await client.webhooks.$post(arg)
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export async function postSubscriptions(arg: {
  json: { planId: string; paymentMethodId: string; callbackUrl: string }
}) {
  return await client.subscriptions.$post(arg)
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export async function postJobs(arg: {
  json: { type: 'export' | 'import' | 'process'; data?: {}; callbackUrl: string }
}) {
  return await client.jobs.$post(arg)
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export async function postIntegrationsIntegrationIdSync(arg: { param: { integrationId: string } }) {
  return await client['integrations'][':integrationId']['sync']['$post'](arg)
}
