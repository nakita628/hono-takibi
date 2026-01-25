import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.webhooks.$post>,
    Error,
    string,
    InferRequestType<typeof client.webhooks.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
      parseResponse(client.webhooks.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function usePostSubscriptions(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.subscriptions.$post>,
    Error,
    string,
    InferRequestType<typeof client.subscriptions.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /subscriptions',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.subscriptions.$post> }) =>
      parseResponse(client.subscriptions.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function usePostJobs(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.jobs.$post>,
    Error,
    string,
    InferRequestType<typeof client.jobs.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /jobs',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.jobs.$post> }) =>
      parseResponse(client.jobs.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function usePostIntegrationsIntegrationIdSync(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /integrations/:integrationId/sync',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']> },
    ) => parseResponse(client.integrations[':integrationId'].sync.$post(arg, options?.client)),
    mutationOptions,
  )
}
