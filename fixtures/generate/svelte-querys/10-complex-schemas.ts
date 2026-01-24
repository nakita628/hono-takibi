import { createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function createPostEvents(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
        parseResponse(client.events.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /notifications
 */
export function createPostNotifications(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.notifications.$post>) =>
        parseResponse(client.notifications.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /shapes
 */
export function createPostShapes(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.shapes.$post>) =>
        parseResponse(client.shapes.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /documents
 */
export function createPostDocuments(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
        parseResponse(client.documents.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /mixed
 */
export function createPostMixed(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.mixed.$post>) =>
        parseResponse(client.mixed.$post(args, options?.client)),
    },
    queryClient,
  )
}
