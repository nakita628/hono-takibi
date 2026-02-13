import useSWR, { Key, SWRConfiguration } from 'swr'
import { client } from '@/lib'
import { ClientRequestOptions, InferRequestType, parseResponse } from 'hono/client'

/**
 * Generates SWR cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdKey(
    args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
    return ['users', 'GET', '/users/:userId', args] as const
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
    args: InferRequestType<(typeof client.users)[':userId']['$get']>,
    options?: {
      swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
      client?: ClientRequestOptions
    },
  ) {
    const { swr: swrOptions, client: clientOptions } = options ?? {}
    const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
    const isEnabled = enabled !== false
    const swrKey = isEnabled ? (customKey ?? getGetUsersUserIdKey(args)) : null
    return {
      swrKey,
      ...useSWR(
        swrKey,
        async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
        restSwrOptions,
      ),
    }
  }

/**
* Generates SWR cache key for GET /users
* Returns structured key ['prefix', 'method', 'path'] for filtering
*/
export function getGetUsersKey() {
    return ['users', 'GET', '/users'] as const
}

/**
 * GET /users
 */
export function useGetUsers(options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
}) {
    const { swr: swrOptions, client: clientOptions } = options ?? {}
    const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
    const isEnabled = enabled !== false
    const swrKey = isEnabled ? (customKey ?? getGetUsersKey()) : null
    return {
        swrKey,
        ...useSWR(
            swrKey,
            async () => parseResponse(client.users.$get(undefined, clientOptions)),
            restSwrOptions,
        ),
    }
}