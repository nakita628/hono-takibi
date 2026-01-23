import type { CreateMutationOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function createPostWebhooks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.webhooks.$post> | undefined,
      Error,
      InferRequestType<typeof client.webhooks.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.webhooks.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.webhooks.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function createPostSubscriptions(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.subscriptions.$post> | undefined,
      Error,
      InferRequestType<typeof client.subscriptions.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.subscriptions.$post> | undefined,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.subscriptions.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function createPostJobs(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.jobs.$post> | undefined,
      Error,
      InferRequestType<typeof client.jobs.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.jobs.$post> | undefined,
    Error,
    InferRequestType<typeof client.jobs.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.jobs.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function createPostIntegrationsIntegrationIdSync(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.integrations[':integrationId'].sync.$post(args, options?.client)),
    },
    queryClient,
  )
}
