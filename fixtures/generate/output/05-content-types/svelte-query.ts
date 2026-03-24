import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
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

export function createPostJson(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postJson>>,
      Error,
      InferRequestType<typeof client.json.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostJsonMutationOptions(clientOptions), ...mutation }
  })
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

export function createPostForm(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postForm>>,
      Error,
      InferRequestType<typeof client.form.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostFormMutationOptions(clientOptions), ...mutation }
  })
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

export function createPostUpload(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUpload>>,
      Error,
      InferRequestType<typeof client.upload.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostUploadMutationOptions(clientOptions), ...mutation }
  })
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

export function createPostText(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postText>>,
      Error,
      InferRequestType<typeof client.text.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostTextMutationOptions(clientOptions), ...mutation }
  })
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

export function createPostMultiContent(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postMultiContent>>,
      Error,
      InferRequestType<(typeof client)['multi-content']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostMultiContentMutationOptions(clientOptions), ...mutation }
  })
}
