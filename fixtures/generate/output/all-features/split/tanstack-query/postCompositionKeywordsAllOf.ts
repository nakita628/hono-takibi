import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCompositionKeywordsAllOfMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/all-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['all-of'].$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsAllOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['all-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['all-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsAllOfMutationOptions<TError>(clientOptions),
  })
}
