import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Key prefix for /form
 */
export function getFormKey() {
  return ['form'] as const
}

/**
 * Key prefix for /json
 */
export function getJsonKey() {
  return ['json'] as const
}

/**
 * Key prefix for /multi-content
 */
export function getMultiContentKey() {
  return ['multi-content'] as const
}

/**
 * Key prefix for /text
 */
export function getTextKey() {
  return ['text'] as const
}

/**
 * Key prefix for /upload
 */
export function getUploadKey() {
  return ['upload'] as const
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
 * POST /json
 */
export function getPostJsonMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['json', '/json'] as const,
    async mutationFn(args: InferRequestType<typeof client.json.$post>) {
      return postJson(args, options)
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
    InferRequestType<typeof client.json.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostJsonMutationOptions(clientOptions), ...mutationOptions })
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
 * POST /form
 */
export function getPostFormMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['form', '/form'] as const,
    async mutationFn(args: InferRequestType<typeof client.form.$post>) {
      return postForm(args, options)
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
    InferRequestType<typeof client.form.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostFormMutationOptions(clientOptions), ...mutationOptions })
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
 * POST /upload
 */
export function getPostUploadMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
      return postUpload(args, options)
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
    InferRequestType<typeof client.upload.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostUploadMutationOptions(clientOptions), ...mutationOptions })
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
 * POST /text
 */
export function getPostTextMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['text', '/text'] as const,
    async mutationFn(args: InferRequestType<typeof client.text.$post>) {
      return postText(args, options)
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
    InferRequestType<typeof client.text.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostTextMutationOptions(clientOptions), ...mutationOptions })
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
 * POST /multi-content
 */
export function getPostMultiContentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['multi-content', '/multi-content'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
      return postMultiContent(args, options)
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
    InferRequestType<(typeof client)['multi-content']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostMultiContentMutationOptions(clientOptions), ...mutationOptions })
}
