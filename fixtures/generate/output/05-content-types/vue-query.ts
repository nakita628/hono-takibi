import { useMutation } from '@tanstack/vue-query'
import type { UseMutationOptions } from '@tanstack/vue-query'
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

export function getPostJsonMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['json', '/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.json.$post>) {
      return postJson(args, options)
    },
  }
}

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

export async function postForm(
  args: InferRequestType<typeof client.form.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.form.$post(args, options))
}

export function getPostFormMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['form', '/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.form.$post>) {
      return postForm(args, options)
    },
  }
}

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

export async function postUpload(
  args: InferRequestType<typeof client.upload.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.$post(args, options))
}

export function getPostUploadMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
      return postUpload(args, options)
    },
  }
}

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

export async function postText(
  args: InferRequestType<typeof client.text.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.text.$post(args, options))
}

export function getPostTextMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['text', '/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.text.$post>) {
      return postText(args, options)
    },
  }
}

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

export async function postMultiContent(
  args: InferRequestType<(typeof client)['multi-content']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['multi-content'].$post(args, options))
}

export function getPostMultiContentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['multi-content', '/multi-content', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
      return postMultiContent(args, options)
    },
  }
}

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
