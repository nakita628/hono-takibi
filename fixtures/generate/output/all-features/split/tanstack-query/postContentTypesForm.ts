import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostContentTypesFormMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.form.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.form.$post>
  >({
    mutationKey: ['contentTypes', '/contentTypes/form', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.contentTypes.form.$post>) {
      return parseResponse(client.contentTypes.form.$post(args, options))
    },
  })
}

export function usePostContentTypesForm<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.contentTypes.form.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.contentTypes.form.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesFormMutationOptions<TError>(clientOptions),
  })
}
