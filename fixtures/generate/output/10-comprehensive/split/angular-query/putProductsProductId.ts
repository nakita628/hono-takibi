import { injectMutation } from '@tanstack/angular-query-experimental'
import type { CreateMutationOptions } from '@tanstack/angular-query-experimental'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPutProductsProductIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['products', '/products/:productId', 'PUT'] as const,
    async mutationFn(args: InferRequestType<(typeof client.products)[':productId']['$put']>) {
      return parseResponse(client.products[':productId'].$put(args, options))
    },
  }
}

export function injectPutProductsProductId<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.products)[':productId']['$put']>>>
        >
      >,
      TError,
      InferRequestType<(typeof client.products)[':productId']['$put']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPutProductsProductIdMutationOptions(clientOptions) }
  })
}
