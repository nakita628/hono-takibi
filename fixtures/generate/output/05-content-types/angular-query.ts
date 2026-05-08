import { injectMutation } from '@tanstack/angular-query-experimental'
import type { CreateMutationOptions } from '@tanstack/angular-query-experimental'
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

export function getPostJsonMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['json', '/json', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.json.$post>) {
      return parseResponse(client.json.$post(args, options))
    },
  }
}

export function injectPostJson<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.json.$post>>>>>,
      TError,
      InferRequestType<typeof client.json.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostJsonMutationOptions(clientOptions) }
  })
}

export function getPostFormMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['form', '/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.form.$post>) {
      return parseResponse(client.form.$post(args, options))
    },
  }
}

export function injectPostForm<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.form.$post>>>>>,
      TError,
      InferRequestType<typeof client.form.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostFormMutationOptions(clientOptions) }
  })
}

export function getPostUploadMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
      return parseResponse(client.upload.$post(args, options))
    },
  }
}

export function injectPostUpload<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.upload.$post>>>>>,
      TError,
      InferRequestType<typeof client.upload.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUploadMutationOptions(clientOptions) }
  })
}

export function getPostTextMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['text', '/text', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.text.$post>) {
      return parseResponse(client.text.$post(args, options))
    },
  }
}

export function injectPostText<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.text.$post>>>>>,
      TError,
      InferRequestType<typeof client.text.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostTextMutationOptions(clientOptions) }
  })
}

export function getPostMultiContentMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['multi-content', '/multi-content', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
      return parseResponse(client['multi-content'].$post(args, options))
    },
  }
}

export function injectPostMultiContent<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-content']['$post']>>>
        >
      >,
      TError,
      InferRequestType<(typeof client)['multi-content']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostMultiContentMutationOptions(clientOptions) }
  })
}
