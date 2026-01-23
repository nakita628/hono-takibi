import { useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webhooks.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >({ mutationFn: async (args) => parseResponse(client.webhooks.$post(args, clientOptions)) })
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function usePostSubscriptions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.subscriptions.$post> | undefined,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >({ mutationFn: async (args) => parseResponse(client.subscriptions.$post(args, clientOptions)) })
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function usePostJobs(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.jobs.$post> | undefined,
    Error,
    InferRequestType<typeof client.jobs.$post>
  >({ mutationFn: async (args) => parseResponse(client.jobs.$post(args, clientOptions)) })
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function usePostIntegrationsIntegrationIdSync(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.integrations[':integrationId'].sync.$post(args, clientOptions)),
  })
}
