import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
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
 * POST /json
 */
export async function postJson(
  args: InferRequestType<typeof client.json.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.json.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /json
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostJsonMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostJsonMutationKey(),
    async mutationFn(args: Parameters<typeof postJson>[0]) {
      return postJson(args, clientOptions)
    },
  }
}

/**
 * POST /json
 */
export function usePostJson(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postJson>>,
    Error,
    Parameters<typeof postJson>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostJsonMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates Vue Query mutation key for POST /form
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFormMutationKey() {
  return ['form', 'POST', '/form'] as const
}

/**
 * POST /form
 */
export async function postForm(
  args: InferRequestType<typeof client.form.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.form.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /form
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostFormMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostFormMutationKey(),
    async mutationFn(args: Parameters<typeof postForm>[0]) {
      return postForm(args, clientOptions)
    },
  }
}

/**
 * POST /form
 */
export function usePostForm(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postForm>>,
    Error,
    Parameters<typeof postForm>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostFormMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates Vue Query mutation key for POST /upload
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUploadMutationKey() {
  return ['upload', 'POST', '/upload'] as const
}

/**
 * POST /upload
 */
export async function postUpload(
  args: InferRequestType<typeof client.upload.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /upload
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUploadMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostUploadMutationKey(),
    async mutationFn(args: Parameters<typeof postUpload>[0]) {
      return postUpload(args, clientOptions)
    },
  }
}

/**
 * POST /upload
 */
export function usePostUpload(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUpload>>,
    Error,
    Parameters<typeof postUpload>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostUploadMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates Vue Query mutation key for POST /text
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTextMutationKey() {
  return ['text', 'POST', '/text'] as const
}

/**
 * POST /text
 */
export async function postText(
  args: InferRequestType<typeof client.text.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.text.$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /text
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTextMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostTextMutationKey(),
    async mutationFn(args: Parameters<typeof postText>[0]) {
      return postText(args, clientOptions)
    },
  }
}

/**
 * POST /text
 */
export function usePostText(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postText>>,
    Error,
    Parameters<typeof postText>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostTextMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates Vue Query mutation key for POST /multi-content
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMultiContentMutationKey() {
  return ['multi-content', 'POST', '/multi-content'] as const
}

/**
 * POST /multi-content
 */
export async function postMultiContent(
  args: InferRequestType<(typeof client)['multi-content']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['multi-content'].$post(args, options))
}

/**
 * Returns Vue Query mutation options for POST /multi-content
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostMultiContentMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostMultiContentMutationKey(),
    async mutationFn(args: Parameters<typeof postMultiContent>[0]) {
      return postMultiContent(args, clientOptions)
    },
  }
}

/**
 * POST /multi-content
 */
export function usePostMultiContent(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postMultiContent>>,
    Error,
    Parameters<typeof postMultiContent>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostMultiContentMutationOptions(clientOptions), ...mutationOpts })
}
