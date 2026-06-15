import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../../client'

export function getGetCrudRefsPostsKey(args: InferRequestType<typeof client.crudRefs.posts.$get>) {
  return ['crudRefs', '/crudRefs/posts', args] as const
}

export function useGetCrudRefsPosts(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.crudRefs.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

export function useImmutableGetCrudRefsPosts(
  args: InferRequestType<typeof client.crudRefs.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    options?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey = enabled !== false ? (customKey ?? getGetCrudRefsPostsKey(args)) : null
  return {
    swrKey,
    ...useSWRImmutable(
      swrKey,
      async () => parseResponse(client.crudRefs.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
