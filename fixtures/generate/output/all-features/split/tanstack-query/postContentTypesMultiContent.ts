import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostContentTypesMultiContentMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.contentTypes)['multi-content']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>
  >({
    mutationKey: ['contentTypes', '/contentTypes/multi-content', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>,
    ) {
      return parseResponse(client.contentTypes['multi-content'].$post(args, options))
    },
  })
}

export function usePostContentTypesMultiContent<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.contentTypes)['multi-content']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.contentTypes)['multi-content']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostContentTypesMultiContentMutationOptions<TError>(clientOptions),
  })
}
