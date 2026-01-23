import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >(
    'POST /webhooks',
    async (_, { arg }) => parseResponse(client.webhooks.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function usePostSubscriptions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.subscriptions.$post>,
    Error,
    string,
    InferRequestType<typeof client.subscriptions.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.subscriptions.$post>,
    Error,
    string,
    InferRequestType<typeof client.subscriptions.$post>
  >(
    'POST /subscriptions',
    async (_, { arg }) => parseResponse(client.subscriptions.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function usePostJobs(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.jobs.$post>,
    Error,
    string,
    InferRequestType<typeof client.jobs.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.jobs.$post>,
    Error,
    string,
    InferRequestType<typeof client.jobs.$post>
  >(
    'POST /jobs',
    async (_, { arg }) => parseResponse(client.jobs.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function usePostIntegrationsIntegrationIdSync(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
  >(
    'POST /integrations/:integrationId/sync',
    async (_, { arg }) =>
      parseResponse(client.integrations[':integrationId'].sync.$post(arg, options?.client)),
    options?.swr,
  )
}
