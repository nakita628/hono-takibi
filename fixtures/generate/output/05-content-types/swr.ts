import type { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/** Key prefix for /form */
export function getFormKey() {
  return ['form'] as const
}

/** Key prefix for /json */
export function getJsonKey() {
  return ['json'] as const
}

/** Key prefix for /multi-content */
export function getMultiContentKey() {
  return ['multi-content'] as const
}

/** Key prefix for /text */
export function getTextKey() {
  return ['text'] as const
}

/** Key prefix for /upload */
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
export function usePostJson(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postJson>>,
    Error,
    Key,
    InferRequestType<typeof client.json.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['json', '/json'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.json.$post> }) =>
        postJson(arg, clientOptions),
      restMutationOptions,
    ),
  }
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
export function usePostForm(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postForm>>,
    Error,
    Key,
    InferRequestType<typeof client.form.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['form', '/form'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.form.$post> }) =>
        postForm(arg, clientOptions),
      restMutationOptions,
    ),
  }
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
export function usePostUpload(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postUpload>>,
    Error,
    Key,
    InferRequestType<typeof client.upload.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['upload', '/upload'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.upload.$post> }) =>
        postUpload(arg, clientOptions),
      restMutationOptions,
    ),
  }
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
export function usePostText(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postText>>,
    Error,
    Key,
    InferRequestType<typeof client.text.$post>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['text', '/text'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.text.$post> }) =>
        postText(arg, clientOptions),
      restMutationOptions,
    ),
  }
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
export function usePostMultiContent(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof postMultiContent>>,
    Error,
    Key,
    InferRequestType<(typeof client)['multi-content']['$post']>
  > & { swrKey?: Key }
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? (['multi-content', '/multi-content'] as const)
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['multi-content']['$post']> },
      ) => postMultiContent(arg, clientOptions),
      restMutationOptions,
    ),
  }
}
