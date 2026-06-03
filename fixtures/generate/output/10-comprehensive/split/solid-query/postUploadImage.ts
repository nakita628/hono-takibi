import { createMutation } from '@tanstack/solid-query'
import type { CreateMutationOptions } from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostUploadImageMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['upload', '/upload/image', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.upload.image.$post>) {
      return parseResponse(client.upload.image.$post(args, options))
    },
  }
}

export function createPostUploadImage<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.upload.image.$post>>>>
      >,
      TError,
      InferRequestType<typeof client.upload.image.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostUploadImageMutationOptions(clientOptions) }
  })
}
