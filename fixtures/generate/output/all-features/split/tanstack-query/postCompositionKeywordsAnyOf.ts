import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCompositionKeywordsAnyOfMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/any-of', 'POST'] as const,
    async mutationFn(
      args: InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>,
    ) {
      return parseResponse(client.compositionKeywords['any-of'].$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsAnyOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.compositionKeywords)['any-of']['$post']>>
        >
      >
    >,
    TError,
    InferRequestType<(typeof client.compositionKeywords)['any-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsAnyOfMutationOptions<TError>(clientOptions),
  })
}
