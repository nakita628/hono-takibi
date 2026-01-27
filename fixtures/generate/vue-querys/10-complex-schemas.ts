import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * Generates Vue Query mutation key for POST /events
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostEventsMutationKey() {
  return ['events', 'POST', '/events'] as const
}

/**
 * Returns Vue Query mutation options for POST /events
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostEventsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostEventsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
    parseResponse(client.events.$post(args, clientOptions)),
})

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
        Error,
        InferRequestType<typeof client.events.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostEventsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /notifications
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsMutationKey() {
  return ['notifications', 'POST', '/notifications'] as const
}

/**
 * Returns Vue Query mutation options for POST /notifications
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNotificationsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostNotificationsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.notifications.$post>) =>
    parseResponse(client.notifications.$post(args, clientOptions)),
})

/**
 * POST /notifications
 */
export function usePostNotifications(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.notifications.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostNotificationsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /shapes
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostShapesMutationKey() {
  return ['shapes', 'POST', '/shapes'] as const
}

/**
 * Returns Vue Query mutation options for POST /shapes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostShapesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostShapesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.shapes.$post>) =>
    parseResponse(client.shapes.$post(args, clientOptions)),
})

/**
 * POST /shapes
 */
export function usePostShapes(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
        Error,
        InferRequestType<typeof client.shapes.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostShapesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /documents
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDocumentsMutationKey() {
  return ['documents', 'POST', '/documents'] as const
}

/**
 * Returns Vue Query mutation options for POST /documents
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDocumentsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostDocumentsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
    parseResponse(client.documents.$post(args, clientOptions)),
})

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.documents.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostDocumentsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /mixed
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMixedMutationKey() {
  return ['mixed', 'POST', '/mixed'] as const
}

/**
 * Returns Vue Query mutation options for POST /mixed
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMixedMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMixedMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.mixed.$post>) =>
    parseResponse(client.mixed.$post(args, clientOptions)),
})

/**
 * POST /mixed
 */
export function usePostMixed(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mixed.$post>>>>>,
        Error,
        InferRequestType<typeof client.mixed.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostMixedMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
