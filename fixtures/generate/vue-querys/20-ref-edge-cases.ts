import { useQuery } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/20-ref-edge-cases'

/**
 * GET /test
 */
export function useGetTest(
  args: InferRequestType<typeof client.test.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTestQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.test.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /test
 */
export function getGetTestQueryKey(args: InferRequestType<typeof client.test.$get>) {
  return ['/test', args] as const
}

/**
 * GET /empty-refs
 */
export function useGetEmptyRefs(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetEmptyRefsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['empty-refs'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /empty-refs
 */
export function getGetEmptyRefsQueryKey() {
  return ['/empty-refs'] as const
}

/**
 * GET /unicode-refs
 */
export function useGetUnicodeRefs(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetUnicodeRefsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['unicode-refs'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /unicode-refs
 */
export function getGetUnicodeRefsQueryKey() {
  return ['/unicode-refs'] as const
}

/**
 * GET /special-chars
 */
export function useGetSpecialChars(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSpecialCharsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['special-chars'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /special-chars
 */
export function getGetSpecialCharsQueryKey() {
  return ['/special-chars'] as const
}

/**
 * GET /numeric-start
 */
export function useGetNumericStart(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetNumericStartQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['numeric-start'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /numeric-start
 */
export function getGetNumericStartQueryKey() {
  return ['/numeric-start'] as const
}

/**
 * GET /ref-in-allof
 */
export function useGetRefInAllof(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetRefInAllofQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['ref-in-allof'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /ref-in-allof
 */
export function getGetRefInAllofQueryKey() {
  return ['/ref-in-allof'] as const
}

/**
 * GET /deeply-nested
 */
export function useGetDeeplyNested(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetDeeplyNestedQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['deeply-nested'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /deeply-nested
 */
export function getGetDeeplyNestedQueryKey() {
  return ['/deeply-nested'] as const
}

/**
 * GET /same-name-diff-context
 */
export function useGetSameNameDiffContext(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSameNameDiffContextQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['same-name-diff-context'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /same-name-diff-context
 */
export function getGetSameNameDiffContextQueryKey() {
  return ['/same-name-diff-context'] as const
}
