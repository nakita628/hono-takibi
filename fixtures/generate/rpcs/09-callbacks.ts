import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export async function postWebhooks(args: {
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
  options?: ClientRequestOptions
}) {
  return await client.webhooks.$post(args)
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export async function postSubscriptions(args: {
  json: { planId: string; paymentMethodId: string; callbackUrl: string }
  options?: ClientRequestOptions
}) {
  return await client.subscriptions.$post(args)
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export async function postJobs(args: {
  json: { type: 'export' | 'import' | 'process'; data?: {}; callbackUrl: string }
  options?: ClientRequestOptions
}) {
  return await client.jobs.$post(args)
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export async function postIntegrationsIntegrationIdSync(args: {
  param: { integrationId: string }
  options?: ClientRequestOptions
}) {
  return await client['integrations'][':integrationId']['sync']['$post'](args)
}
