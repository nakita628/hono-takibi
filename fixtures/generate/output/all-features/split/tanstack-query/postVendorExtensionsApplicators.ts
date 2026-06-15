import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostVendorExtensionsApplicatorsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.applicators.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.applicators.$post>
  >({
    mutationKey: ['vendorExtensions', '/vendorExtensions/applicators', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.vendorExtensions.applicators.$post>) {
      return parseResponse(client.vendorExtensions.applicators.$post(args, options))
    },
  })
}

export function usePostVendorExtensionsApplicators<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.vendorExtensions.applicators.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.vendorExtensions.applicators.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostVendorExtensionsApplicatorsMutationOptions<TError>(clientOptions),
  })
}
