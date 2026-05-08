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

export function createPostJson<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.json.$post>>>>>,
      TError,
      InferRequestType<typeof client.json.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      mutationKey: ['json', '/json', 'POST'] as const,
      async mutationFn(args: InferRequestType<typeof client.json.$post>) {
        return parseResponse(client.json.$post(args, clientOptions))
      },
    }
  })
}

export function createPostForm<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.form.$post>>>>>,
      TError,
      InferRequestType<typeof client.form.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      mutationKey: ['form', '/form', 'POST'] as const,
      async mutationFn(args: InferRequestType<typeof client.form.$post>) {
        return parseResponse(client.form.$post(args, clientOptions))
      },
    }
  })
}

export function createPostUpload<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.upload.$post>>>>>,
      TError,
      InferRequestType<typeof client.upload.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      mutationKey: ['upload', '/upload', 'POST'] as const,
      async mutationFn(args: InferRequestType<typeof client.upload.$post>) {
        return parseResponse(client.upload.$post(args, clientOptions))
      },
    }
  })
}

export function createPostText<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.text.$post>>>>>,
      TError,
      InferRequestType<typeof client.text.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      mutationKey: ['text', '/text', 'POST'] as const,
      async mutationFn(args: InferRequestType<typeof client.text.$post>) {
        return parseResponse(client.text.$post(args, clientOptions))
      },
    }
  })
}

export function createPostMultiContent<TError = unknown>(
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
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return {
      ...mutation,
      mutationKey: ['multi-content', '/multi-content', 'POST'] as const,
      async mutationFn(args: InferRequestType<(typeof client)['multi-content']['$post']>) {
        return parseResponse(client['multi-content'].$post(args, clientOptions))
      },
    }
  })
}
