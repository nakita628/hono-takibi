import { useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
  })
}

/**
 * POST /notifications
 */
export function usePostNotifications(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.notifications.$post>) =>
      parseResponse(client.notifications.$post(args, clientOptions)),
  })
}

/**
 * POST /shapes
 */
export function usePostShapes(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.shapes.$post>) =>
      parseResponse(client.shapes.$post(args, clientOptions)),
  })
}

/**
 * POST /documents
 */
export function usePostDocuments(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
  })
}

/**
 * POST /mixed
 */
export function usePostMixed(clientOptions?: ClientRequestOptions) {
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mixed.$post>) =>
      parseResponse(client.mixed.$post(args, clientOptions)),
  })
}
