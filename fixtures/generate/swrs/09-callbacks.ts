import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/09-callbacks'

/**
 * Generates SWR mutation key for POST /webhooks
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksMutationKey() {
  return ['/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Register a webhook endpoint
 */
export function usePostWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.webhooks.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webhooks.$post> }) =>
        parseResponse(client.webhooks.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /subscriptions
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostSubscriptionsMutationKey() {
  return ['/subscriptions'] as const
}

/**
 * POST /subscriptions
 *
 * Create a subscription with payment callbacks
 */
export function usePostSubscriptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.subscriptions.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.subscriptions.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSubscriptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.subscriptions.$post> }) =>
        parseResponse(client.subscriptions.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /jobs
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostJobsMutationKey() {
  return ['/jobs'] as const
}

/**
 * POST /jobs
 *
 * Create an async job with progress callbacks
 */
export function usePostJobs(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.jobs.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.jobs.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostJobsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.jobs.$post> }) =>
        parseResponse(client.jobs.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /integrations/{integrationId}/sync
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostIntegrationsIntegrationIdSyncMutationKey() {
  return ['/integrations/:integrationId/sync'] as const
}

/**
 * POST /integrations/{integrationId}/sync
 *
 * Trigger data sync with callbacks
 */
export function usePostIntegrationsIntegrationIdSync(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.integrations)[':integrationId']['sync']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostIntegrationsIntegrationIdSyncMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.integrations)[':integrationId']['sync']['$post']>
        },
      ) => parseResponse(client.integrations[':integrationId'].sync.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
