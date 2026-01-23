import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.events.$post>,
    Error,
    string,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.events.$post>,
    Error,
    string,
    InferRequestType<typeof client.events.$post>
  >(
    'POST /events',
    async (_, { arg }) => parseResponse(client.events.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /notifications
 */
export function usePostNotifications(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.notifications.$post>,
    Error,
    string,
    InferRequestType<typeof client.notifications.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.notifications.$post>,
    Error,
    string,
    InferRequestType<typeof client.notifications.$post>
  >(
    'POST /notifications',
    async (_, { arg }) => parseResponse(client.notifications.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /shapes
 */
export function usePostShapes(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.shapes.$post>,
    Error,
    string,
    InferRequestType<typeof client.shapes.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.shapes.$post>,
    Error,
    string,
    InferRequestType<typeof client.shapes.$post>
  >(
    'POST /shapes',
    async (_, { arg }) => parseResponse(client.shapes.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.documents.$post>,
    Error,
    string,
    InferRequestType<typeof client.documents.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.documents.$post>,
    Error,
    string,
    InferRequestType<typeof client.documents.$post>
  >(
    'POST /documents',
    async (_, { arg }) => parseResponse(client.documents.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /mixed
 */
export function usePostMixed(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.mixed.$post>,
    Error,
    string,
    InferRequestType<typeof client.mixed.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.mixed.$post>,
    Error,
    string,
    InferRequestType<typeof client.mixed.$post>
  >(
    'POST /mixed',
    async (_, { arg }) => parseResponse(client.mixed.$post(arg, options?.client)),
    options?.swr,
  )
}
