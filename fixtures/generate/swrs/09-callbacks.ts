import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /webhooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
      parseResponse(client.webhooks.$post(arg, options?.client)),
  )
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function usePostSubscriptions(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /subscriptions',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.subscriptions.$post> }) =>
      parseResponse(client.subscriptions.$post(arg, options?.client)),
  )
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function usePostJobs(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /jobs',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.jobs.$post> }) =>
      parseResponse(client.jobs.$post(arg, options?.client)),
  )
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function usePostIntegrationsIntegrationIdSync(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /integrations/:integrationId/sync',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']> },
    ) => parseResponse(client.integrations[':integrationId'].sync.$post(arg, options?.client)),
  )
}
