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

export function getPostJsonMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['json', '/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.json.$post>) {
      return postJson(args, options)
    },
  }
}

export function createPostJson<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postJson>>,
      TError,
      InferRequestType<typeof client.json.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostJsonMutationOptions<TError>(clientOptions) }
  })
}

export async function postForm(
  args: InferRequestType<typeof client.form.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.form.$post(args, options))
}

export function getPostFormMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['form', '/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.form.$post>) {
      return postForm(args, options)
    },
  }
}

export function createPostForm<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postForm>>,
      TError,
      InferRequestType<typeof client.form.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostFormMutationOptions<TError>(clientOptions) }
  })
}

export async function postUpload(
  args: InferRequestType<typeof client.upload.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.upload.$post(args, options))
}

export function getPostUploadMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
      return postUpload(args, options)
    },
  }
}

export function createPostUpload<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postUpload>>,
      TError,
      InferRequestType<typeof client.upload.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUploadMutationOptions<TError>(clientOptions) }
  })
}

export async function postText(
  args: InferRequestType<typeof client.text.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.text.$post(args, options))
}

export function getPostTextMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['text', '/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.text.$post>) {
      return postText(args, options)
    },
  }
}

export function createPostText<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postText>>,
      TError,
      InferRequestType<typeof client.text.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostTextMutationOptions<TError>(clientOptions) }
  })
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
  return {
    mutationKey: ['multi-content', '/multi-content', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
      return postMultiContent(args, options)
    },
  }
}

export function createPostMultiContent<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postMultiContent>>,
      TError,
      InferRequestType<(typeof client)['multi-content']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostMultiContentMutationOptions<TError>(clientOptions) }
  })
}
