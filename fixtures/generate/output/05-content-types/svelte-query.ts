import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query mutation key for POST /json
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostJsonMutationKey() {
  return ['json', 'POST', '/json'] as const
}

/**
 * Returns Svelte Query mutation options for POST /json
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostJsonMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostJsonMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.json.$post>) =>
    parseResponse(client.json.$post(args, clientOptions)),
})

/**
 * POST /json
 */
export function createPostJson(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.json.$post>>>>>,
      Error,
      InferRequestType<typeof client.json.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostJsonMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /form
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFormMutationKey() {
  return ['form', 'POST', '/form'] as const
}

/**
 * Returns Svelte Query mutation options for POST /form
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFormMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostFormMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.form.$post>) =>
    parseResponse(client.form.$post(args, clientOptions)),
})

/**
 * POST /form
 */
export function createPostForm(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.form.$post>>>>>,
      Error,
      InferRequestType<typeof client.form.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostFormMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /upload
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUploadMutationKey() {
  return ['upload', 'POST', '/upload'] as const
}

/**
 * Returns Svelte Query mutation options for POST /upload
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUploadMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUploadMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.upload.$post>) =>
    parseResponse(client.upload.$post(args, clientOptions)),
})

/**
 * POST /upload
 */
export function createPostUpload(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.upload.$post>>>>>,
      Error,
      InferRequestType<typeof client.upload.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostUploadMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /text
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTextMutationKey() {
  return ['text', 'POST', '/text'] as const
}

/**
 * Returns Svelte Query mutation options for POST /text
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTextMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostTextMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.text.$post>) =>
    parseResponse(client.text.$post(args, clientOptions)),
})

/**
 * POST /text
 */
export function createPostText(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.text.$post>>>>>,
      Error,
      InferRequestType<typeof client.text.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTextMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /multi-content
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMultiContentMutationKey() {
  return ['multi-content', 'POST', '/multi-content'] as const
}

/**
 * Returns Svelte Query mutation options for POST /multi-content
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMultiContentMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMultiContentMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['multi-content']['$post']>) =>
    parseResponse(client['multi-content'].$post(args, clientOptions)),
})

/**
 * POST /multi-content
 */
export function createPostMultiContent(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-content']['$post']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client)['multi-content']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMultiContentMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
