import { useMutation, mutationOptions } from '@tanstack/react-query'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getPostCompositionKeywordsNotMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return mutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.compositionKeywords.not.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.compositionKeywords.not.$post>
  >({
    mutationKey: ['compositionKeywords', '/compositionKeywords/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.compositionKeywords.not.$post>) {
      return parseResponse(client.compositionKeywords.not.$post(args, options))
    },
  })
}

export function usePostCompositionKeywordsNot<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.compositionKeywords.not.$post>>>
      >
    >,
    TError,
    InferRequestType<typeof client.compositionKeywords.not.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostCompositionKeywordsNotMutationOptions<TError>(clientOptions),
  })
}
