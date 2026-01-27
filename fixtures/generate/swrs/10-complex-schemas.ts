import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * Generates SWR mutation key for POST /events
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostEventsMutationKey() {
  return ['/events'] as const
}

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.events.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEventsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.events.$post> }) =>
        parseResponse(client.events.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostNotificationsMutationKey() {
  return ['/notifications'] as const
}

/**
 * POST /notifications
 */
export function usePostNotifications(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.notifications.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNotificationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.notifications.$post> }) =>
        parseResponse(client.notifications.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /shapes
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostShapesMutationKey() {
  return ['/shapes'] as const
}

/**
 * POST /shapes
 */
export function usePostShapes(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.shapes.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostShapesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.shapes.$post> }) =>
        parseResponse(client.shapes.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /documents
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDocumentsMutationKey() {
  return ['/documents'] as const
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.documents.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDocumentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
        parseResponse(client.documents.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /mixed
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostMixedMutationKey() {
  return ['/mixed'] as const
}

/**
 * POST /mixed
 */
export function usePostMixed(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mixed.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.mixed.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMixedMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.mixed.$post> }) =>
        parseResponse(client.mixed.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
