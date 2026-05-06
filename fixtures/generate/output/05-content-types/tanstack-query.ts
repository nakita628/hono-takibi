import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getFormKey() {
  return ['form'] as const
}

export function getJsonKey() {
  return ['json'] as const
}

export function getMultiContentKey() {
  return ['multi-content'] as const
}

export function getTextKey() {
  return ['text'] as const
}

export function getUploadKey() {
  return ['upload'] as const
}

export async function postJson(
  args: InferRequestType<typeof client.json.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.json.$post(args, options))
}

export function getPostJsonMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postJson>>,
    TError,
    InferRequestType<typeof client.json.$post>
  >({
    mutationKey: ['json', '/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.json.$post>) {
      return postJson(args, options)
    },
  })
}

export function usePostJson<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postJson>>,
    TError,
    InferRequestType<typeof client.json.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostJsonMutationOptions<TError>(clientOptions) })
}

export async function postForm(
  args: InferRequestType<typeof client.form.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.form.$post(args, options))
}

export function getPostFormMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postForm>>,
    TError,
    InferRequestType<typeof client.form.$post>
  >({
    mutationKey: ['form', '/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.form.$post>) {
      return postForm(args, options)
    },
  })
}

export function usePostForm<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postForm>>,
    TError,
    InferRequestType<typeof client.form.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostFormMutationOptions<TError>(clientOptions) })
}

export async function postUpload(
  args: InferRequestType<typeof client.upload.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.$post(args, options))
}

export function getPostUploadMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postUpload>>,
    TError,
    InferRequestType<typeof client.upload.$post>
  >({
    mutationKey: ['upload', '/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
      return postUpload(args, options)
    },
  })
}

export function usePostUpload<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUpload>>,
    TError,
    InferRequestType<typeof client.upload.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostUploadMutationOptions<TError>(clientOptions) })
}

export async function postText(
  args: InferRequestType<typeof client.text.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.text.$post(args, options))
}

export function getPostTextMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postText>>,
    TError,
    InferRequestType<typeof client.text.$post>
  >({
    mutationKey: ['text', '/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.text.$post>) {
      return postText(args, options)
    },
  })
}

export function usePostText<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postText>>,
    TError,
    InferRequestType<typeof client.text.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostTextMutationOptions<TError>(clientOptions) })
}

export async function postMultiContent(
  args: InferRequestType<(typeof client)['multi-content']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['multi-content'].$post(args, options))
}

export function getPostMultiContentMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<ReturnType<typeof postMultiContent>>,
    TError,
    InferRequestType<(typeof client)['multi-content']['$post']>
  >({
    mutationKey: ['multi-content', '/multi-content', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
      return postMultiContent(args, options)
    },
  })
}

export function usePostMultiContent<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postMultiContent>>,
    TError,
    InferRequestType<(typeof client)['multi-content']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostMultiContentMutationOptions<TError>(clientOptions),
  })
}
