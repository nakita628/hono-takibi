import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
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
 * POST /json
 */
export async function postJson(
  args: InferRequestType<typeof client.json.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.json.$post(args, options))
}

/**
 * Returns Svelte Query mutation options for POST /json
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostJsonMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostJsonMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.json.$post>) {
      return postJson(args, options)
    },
  }
}

/**
 * POST /json
 */
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

/**
 * Generates Svelte Query mutation key for POST /form
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
 * Returns Svelte Query mutation options for POST /form
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostFormMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostFormMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.form.$post>) {
      return postForm(args, options)
    },
  }
}

/**
 * POST /form
 */
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

/**
 * Generates Svelte Query mutation key for POST /upload
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
 * Returns Svelte Query mutation options for POST /upload
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostUploadMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostUploadMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
      return postUpload(args, options)
    },
  }
}

/**
 * POST /upload
 */
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

/**
 * Generates Svelte Query mutation key for POST /text
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
 * Returns Svelte Query mutation options for POST /text
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTextMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostTextMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.text.$post>) {
      return postText(args, options)
    },
  }
}

/**
 * POST /text
 */
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

/**
 * Generates Svelte Query mutation key for POST /multi-content
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
 * Returns Svelte Query mutation options for POST /multi-content
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostMultiContentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostMultiContentMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
      return postMultiContent(args, options)
    },
  }
}

/**
 * POST /multi-content
 */
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
