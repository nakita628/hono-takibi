import { useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.events.$post>,
      variables: InferRequestType<typeof client.events.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.events.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.events.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.events.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.events.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * POST /notifications
 */
export function usePostNotifications(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.notifications.$post>,
      variables: InferRequestType<typeof client.notifications.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.notifications.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.notifications.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.notifications.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.notifications.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * POST /shapes
 */
export function usePostShapes(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.shapes.$post>,
      variables: InferRequestType<typeof client.shapes.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.shapes.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.shapes.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.shapes.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.shapes.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.documents.$post>,
      variables: InferRequestType<typeof client.documents.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.documents.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.documents.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.documents.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.documents.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
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
 * POST /mixed
 */
export function usePostMixed(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mixed.$post>,
      variables: InferRequestType<typeof client.mixed.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mixed.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mixed.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mixed.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mixed.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mixed.$post>) =>
      parseResponse(client.mixed.$post(args, clientOptions)),
  })
}
