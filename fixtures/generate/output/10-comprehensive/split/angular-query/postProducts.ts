import { injectMutation } from '@tanstack/angular-query-experimental'
import type { CreateMutationOptions } from '@tanstack/angular-query-experimental'
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

export function injectPostProducts<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.products.$post>>>>>,
      TError,
      InferRequestType<typeof client.products.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostProductsMutationOptions(clientOptions) }
  })
}
