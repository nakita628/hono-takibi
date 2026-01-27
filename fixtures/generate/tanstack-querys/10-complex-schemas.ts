import { useMutation } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * Generates TanStack Query mutation key for POST /events
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostEventsMutationKey() {
  return ['POST', '/events'] as const
}

/**
 * Returns TanStack Query mutation options for POST /events
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
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
    Error,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /notifications
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostNotificationsMutationKey() {
  return ['POST', '/notifications'] as const
}

/**
 * Returns TanStack Query mutation options for POST /notifications
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
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.notifications.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.notifications.$post>) =>
      parseResponse(client.notifications.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /shapes
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostShapesMutationKey() {
  return ['POST', '/shapes'] as const
}

/**
 * Returns TanStack Query mutation options for POST /shapes
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
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
    Error,
    InferRequestType<typeof client.shapes.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.shapes.$post>) =>
      parseResponse(client.shapes.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /documents
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostDocumentsMutationKey() {
  return ['POST', '/documents'] as const
}

/**
 * Returns TanStack Query mutation options for POST /documents
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
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
    Error,
    InferRequestType<typeof client.documents.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query mutation key for POST /mixed
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostMixedMutationKey() {
  return ['POST', '/mixed'] as const
}

/**
 * Returns TanStack Query mutation options for POST /mixed
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
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mixed.$post>>>>>,
    Error,
    InferRequestType<typeof client.mixed.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mixed.$post>) =>
      parseResponse(client.mixed.$post(args, clientOptions)),
  })
}
