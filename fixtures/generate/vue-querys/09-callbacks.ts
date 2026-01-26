import { useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webhooks.$post>,
      variables: InferRequestType<typeof client.webhooks.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.webhooks.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.webhooks.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webhooks.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.webhooks.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
      parseResponse(client.webhooks.$post(args, clientOptions)),
  })
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function usePostSubscriptions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.subscriptions.$post>,
      variables: InferRequestType<typeof client.subscriptions.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.subscriptions.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.subscriptions.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.subscriptions.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.subscriptions.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.subscriptions.$post>) =>
      parseResponse(client.subscriptions.$post(args, clientOptions)),
  })
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function usePostJobs(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.jobs.$post>,
      variables: InferRequestType<typeof client.jobs.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.jobs.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.jobs.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.jobs.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.jobs.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.jobs.$post>) =>
      parseResponse(client.jobs.$post(args, clientOptions)),
  })
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function usePostIntegrationsIntegrationIdSync(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
      variables: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.integrations)[':integrationId']['sync']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>,
    ) => parseResponse(client.integrations[':integrationId'].sync.$post(args, clientOptions)),
  })
}
