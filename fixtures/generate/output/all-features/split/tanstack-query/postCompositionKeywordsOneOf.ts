import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCompositionKeywordsOneOfMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['one-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/one-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['one-of'].$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsOneOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['one-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['one-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsOneOfMutationOptions<TError>(clientOptions),
  })
}
