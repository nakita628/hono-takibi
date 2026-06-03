import { createMutation } from '@tanstack/svelte-query'
import type { CreateMutationOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostProductsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.products.$post>) {
      return parseResponse(client.products.$post(args, options))
    },
  }
}

export function createPostProducts<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>>,
      TError,
      InferRequestType<typeof client.products.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostProductsMutationOptions(clientOptions) }
  })
}
