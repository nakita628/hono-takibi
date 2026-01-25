import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function usePostEvents(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.events.$post>,
    Error,
    string,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /events',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.events.$post> }) =>
      parseResponse(client.events.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /notifications
 */
export function usePostNotifications(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.notifications.$post>,
    Error,
    string,
    InferRequestType<typeof client.notifications.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /notifications',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.notifications.$post> }) =>
      parseResponse(client.notifications.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /shapes
 */
export function usePostShapes(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.shapes.$post>,
    Error,
    string,
    InferRequestType<typeof client.shapes.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /shapes',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.shapes.$post> }) =>
      parseResponse(client.shapes.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /documents
 */
export function usePostDocuments(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.documents.$post>,
    Error,
    string,
    InferRequestType<typeof client.documents.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /documents',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
      parseResponse(client.documents.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /mixed
 */
export function usePostMixed(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.mixed.$post>,
    Error,
    string,
    InferRequestType<typeof client.mixed.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /mixed',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.mixed.$post> }) =>
      parseResponse(client.mixed.$post(arg, options?.client)),
    mutationOptions,
  )
}
