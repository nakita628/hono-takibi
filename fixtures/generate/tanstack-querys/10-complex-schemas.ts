import { useMutation } from '@tanstack/react-query'
import type { QueryClient, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.events.$post> | undefined,
      Error,
      InferRequestType<typeof client.events.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.events.$post> | undefined,
    Error,
    InferRequestType<typeof client.events.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.events.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /notifications
 */
export function usePostNotifications(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.notifications.$post> | undefined,
      Error,
      InferRequestType<typeof client.notifications.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.notifications.$post> | undefined,
    Error,
    InferRequestType<typeof client.notifications.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.notifications.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /shapes
 */
export function usePostShapes(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.shapes.$post> | undefined,
      Error,
      InferRequestType<typeof client.shapes.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.shapes.$post> | undefined,
    Error,
    InferRequestType<typeof client.shapes.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.shapes.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /documents
 */
export function usePostDocuments(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.documents.$post> | undefined,
      Error,
      InferRequestType<typeof client.documents.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.documents.$post> | undefined,
    Error,
    InferRequestType<typeof client.documents.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.documents.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mixed
 */
export function usePostMixed(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.mixed.$post> | undefined,
      Error,
      InferRequestType<typeof client.mixed.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.mixed.$post> | undefined,
    Error,
    InferRequestType<typeof client.mixed.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.mixed.$post(args, options?.client)),
    },
    queryClient,
  )
}
