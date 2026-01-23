import { useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.events.$post> | undefined,
    Error,
    InferRequestType<typeof client.events.$post>
  >({ mutationFn: async (args) => parseResponse(client.events.$post(args, clientOptions)) })
}

/**
 * POST /notifications
 */
export function usePostNotifications(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.notifications.$post> | undefined,
    Error,
    InferRequestType<typeof client.notifications.$post>
  >({ mutationFn: async (args) => parseResponse(client.notifications.$post(args, clientOptions)) })
}

/**
 * POST /shapes
 */
export function usePostShapes(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.shapes.$post> | undefined,
    Error,
    InferRequestType<typeof client.shapes.$post>
  >({ mutationFn: async (args) => parseResponse(client.shapes.$post(args, clientOptions)) })
}

/**
 * POST /documents
 */
export function usePostDocuments(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.documents.$post> | undefined,
    Error,
    InferRequestType<typeof client.documents.$post>
  >({ mutationFn: async (args) => parseResponse(client.documents.$post(args, clientOptions)) })
}

/**
 * POST /mixed
 */
export function usePostMixed(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mixed.$post> | undefined,
    Error,
    InferRequestType<typeof client.mixed.$post>
  >({ mutationFn: async (args) => parseResponse(client.mixed.$post(args, clientOptions)) })
}
