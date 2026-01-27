import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/10-complex-schemas'

/**
 * POST /events
 */
export function createPostEvents(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.events.$post>>>>>,
    Error,
    InferRequestType<typeof client.events.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.events.$post>) =>
      parseResponse(client.events.$post(args, clientOptions)),
  }))
}

/**
 * POST /notifications
 */
export function createPostNotifications(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.notifications.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.notifications.$post>) =>
      parseResponse(client.notifications.$post(args, clientOptions)),
  }))
}

/**
 * POST /shapes
 */
export function createPostShapes(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
    Error,
    InferRequestType<typeof client.shapes.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.shapes.$post>) =>
      parseResponse(client.shapes.$post(args, clientOptions)),
  }))
}

/**
 * POST /documents
 */
export function createPostDocuments(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
    Error,
    InferRequestType<typeof client.documents.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.documents.$post>) =>
      parseResponse(client.documents.$post(args, clientOptions)),
  }))
}

/**
 * POST /mixed
 */
export function createPostMixed(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mixed.$post>>>>>,
    Error,
    InferRequestType<typeof client.mixed.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.mixed.$post>) =>
      parseResponse(client.mixed.$post(args, clientOptions)),
  }))
}
