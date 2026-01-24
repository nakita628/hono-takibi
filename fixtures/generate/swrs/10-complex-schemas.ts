import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /events',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.events.$post> }) =>
      parseResponse(client.events.$post(arg, options?.client)),
  )
}

/**
 * POST /notifications
 */
export function usePostNotifications(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /notifications',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.notifications.$post> }) =>
      parseResponse(client.notifications.$post(arg, options?.client)),
  )
}

/**
 * POST /shapes
 */
export function usePostShapes(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /shapes',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.shapes.$post> }) =>
      parseResponse(client.shapes.$post(arg, options?.client)),
  )
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /documents',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
      parseResponse(client.documents.$post(arg, options?.client)),
  )
}

/**
 * POST /mixed
 */
export function usePostMixed(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /mixed',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mixed.$post> }) =>
      parseResponse(client.mixed.$post(arg, options?.client)),
  )
}
