import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsConditionalMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.conditional.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.conditional.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/conditional', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.conditional.$post>) {
      return parseResponse(client.vendorExtensions.conditional.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsConditional<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.conditional.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.conditional.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsConditionalMutationOptions<TError>(clientOptions),
  })
}
