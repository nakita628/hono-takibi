import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query mutation key for POST /json
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostJsonMutationKey() {
  return ['json', 'POST', '/json'] as const
}

/**
 * Returns Vue Query mutation options for POST /json
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
export function usePostJson(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.json.$post>>>>>,
        Error,
        InferRequestType<typeof client.json.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostJsonMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /form
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFormMutationKey() {
  return ['form', 'POST', '/form'] as const
}

/**
 * Returns Vue Query mutation options for POST /form
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
export function usePostForm(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.form.$post>>>>>,
        Error,
        InferRequestType<typeof client.form.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostFormMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /upload
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUploadMutationKey() {
  return ['upload', 'POST', '/upload'] as const
}

/**
 * Returns Vue Query mutation options for POST /upload
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
export function usePostUpload(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.upload.$post>>>>>,
        Error,
        InferRequestType<typeof client.upload.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostUploadMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /text
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTextMutationKey() {
  return ['text', 'POST', '/text'] as const
}

/**
 * Returns Vue Query mutation options for POST /text
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
export function usePostText(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.text.$post>>>>>,
        Error,
        InferRequestType<typeof client.text.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostTextMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /multi-content
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMultiContentMutationKey() {
  return ['multi-content', 'POST', '/multi-content'] as const
}

/**
 * Returns Vue Query mutation options for POST /multi-content
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
export function usePostMultiContent(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-content']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['multi-content']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostMultiContentMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
