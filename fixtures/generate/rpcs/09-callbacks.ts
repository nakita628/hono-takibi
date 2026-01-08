import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(body: {
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
}) {
  return await client.webhooks.$post({ json: body })
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export async function postSubscriptions(body: {
  planId: string
  paymentMethodId: string
  callbackUrl: string
}) {
  return await client.subscriptions.$post({ json: body })
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export async function postJobs(body: {
  type: 'export' | 'import' | 'process'
  data?: {}
  callbackUrl: string
}) {
  return await client.jobs.$post({ json: body })
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export async function postIntegrationsIntegrationIdSync(params: {
  path: { integrationId: string }
}) {
  return await client.integrations[':integrationId'].sync.$post({ param: params.path })
}
