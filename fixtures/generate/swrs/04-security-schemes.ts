import type { ClientRequestOptions, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function useGetPublic(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.public.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/public'] as const) : null
  return useSWR<InferResponseType<typeof client.public.$get>, Error>(
    key,
    async () => parseResponse(client.public.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /public
 */
export function getGetPublicKey() {
  return ['GET', '/public'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.protected.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/protected'] as const) : null
  return useSWR<InferResponseType<typeof client.protected.$get>, Error>(
    key,
    async () => parseResponse(client.protected.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /protected
 */
export function getGetProtectedKey() {
  return ['GET', '/protected'] as const
}

/**
 * GET /admin
 */
export function useGetAdmin(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.admin.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/admin'] as const) : null
  return useSWR<InferResponseType<typeof client.admin.$get>, Error>(
    key,
    async () => parseResponse(client.admin.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /admin
 */
export function getGetAdminKey() {
  return ['GET', '/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function useGetOauthResource(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['oauth-resource']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/oauth-resource'] as const) : null
  return useSWR<InferResponseType<(typeof client)['oauth-resource']['$get']>, Error>(
    key,
    async () => parseResponse(client['oauth-resource'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /oauth-resource
 */
export function getGetOauthResourceKey() {
  return ['GET', '/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['multi-auth']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/multi-auth'] as const) : null
  return useSWR<InferResponseType<(typeof client)['multi-auth']['$get']>, Error>(
    key,
    async () => parseResponse(client['multi-auth'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /multi-auth
 */
export function getGetMultiAuthKey() {
  return ['GET', '/multi-auth'] as const
}
