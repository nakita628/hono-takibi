import { useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/04-security-schemes'

/**
 * GET /public
 */
export function useGetPublic(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetPublicQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.public.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /public
 */
export function getGetPublicQueryKey() {
  return ['/public'] as const
}

/**
 * GET /protected
 */
export function useGetProtected(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetProtectedQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.protected.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /protected
 */
export function getGetProtectedQueryKey() {
  return ['/protected'] as const
}

/**
 * GET /admin
 */
export function useGetAdmin(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetAdminQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.admin.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /admin
 */
export function getGetAdminQueryKey() {
  return ['/admin'] as const
}

/**
 * GET /oauth-resource
 */
export function useGetOauthResource(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauthResourceQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['oauth-resource'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /oauth-resource
 */
export function getGetOauthResourceQueryKey() {
  return ['/oauth-resource'] as const
}

/**
 * GET /multi-auth
 */
export function useGetMultiAuth(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMultiAuthQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['multi-auth'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /multi-auth
 */
export function getGetMultiAuthQueryKey() {
  return ['/multi-auth'] as const
}
