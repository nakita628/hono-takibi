import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function createPostEvents(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.events.$post> | undefined,
      Error,
      InferRequestType<typeof client.events.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostNotifications(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.notifications.$post> | undefined,
      Error,
      InferRequestType<typeof client.notifications.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostShapes(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.shapes.$post> | undefined,
      Error,
      InferRequestType<typeof client.shapes.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostDocuments(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.documents.$post> | undefined,
      Error,
      InferRequestType<typeof client.documents.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostMixed(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.mixed.$post> | undefined,
      Error,
      InferRequestType<typeof client.mixed.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
