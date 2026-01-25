import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/41-auth-social-sso'

/**
 * GET /social/authorize/{provider}
 *
 * ソーシャル認証開始
 *
 * ソーシャルプロバイダーの認証画面にリダイレクト
 */
export function useGetSocialAuthorizeProvider(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSocialAuthorizeProviderQueryKey(args),
    queryFn: async () =>
      parseResponse(client.social.authorize[':provider'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /social/authorize/{provider}
 */
export function getGetSocialAuthorizeProviderQueryKey(
  args: InferRequestType<(typeof client.social.authorize)[':provider']['$get']>,
) {
  return ['/social/authorize/:provider', args] as const
}

/**
 * GET /social/callback/{provider}
 *
 * ソーシャル認証コールバック
 *
 * プロバイダーからのコールバックを処理
 */
export function useGetSocialCallbackProvider(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSocialCallbackProviderQueryKey(args),
    queryFn: async () =>
      parseResponse(client.social.callback[':provider'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /social/callback/{provider}
 */
export function getGetSocialCallbackProviderQueryKey(
  args: InferRequestType<(typeof client.social.callback)[':provider']['$get']>,
) {
  return ['/social/callback/:provider', args] as const
}

/**
 * POST /social/token
 *
 * ソーシャルトークン交換
 *
 * 認可コードをアクセストークンに交換
 */
export function usePostSocialToken(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.social.token.$post>,
      variables: InferRequestType<typeof client.social.token.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.social.token.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.social.token.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.social.token.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.social.token.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.social.token.$post>) =>
      parseResponse(client.social.token.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /social/token/native
 *
 * ネイティブトークン検証
 *
 * モバイルアプリから直接取得したトークンを検証
 */
export function usePostSocialTokenNative(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.social.token.native.$post>,
      variables: InferRequestType<typeof client.social.token.native.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.social.token.native.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.social.token.native.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.social.token.native.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.social.token.native.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.social.token.native.$post>) =>
      parseResponse(client.social.token.native.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /providers
 *
 * 有効なプロバイダー一覧
 */
export function useGetProviders(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetProvidersQueryKey(),
    queryFn: async () => parseResponse(client.providers.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /providers
 */
export function getGetProvidersQueryKey() {
  return ['/providers'] as const
}

/**
 * GET /providers/admin
 *
 * 全プロバイダー一覧（管理用）
 */
export function useGetProvidersAdmin(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetProvidersAdminQueryKey(),
    queryFn: async () => parseResponse(client.providers.admin.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /providers/admin
 */
export function getGetProvidersAdminQueryKey() {
  return ['/providers/admin'] as const
}

/**
 * POST /providers/admin
 *
 * プロバイダー追加
 */
export function usePostProvidersAdmin(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.providers.admin.$post>,
      variables: InferRequestType<typeof client.providers.admin.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.providers.admin.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.providers.admin.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.providers.admin.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.providers.admin.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.providers.admin.$post>) =>
      parseResponse(client.providers.admin.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /providers/{providerId}
 *
 * プロバイダー詳細取得
 */
export function useGetProvidersProviderId(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetProvidersProviderIdQueryKey(args),
    queryFn: async () => parseResponse(client.providers[':providerId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /providers/{providerId}
 */
export function getGetProvidersProviderIdQueryKey(
  args: InferRequestType<(typeof client.providers)[':providerId']['$get']>,
) {
  return ['/providers/:providerId', args] as const
}

/**
 * PUT /providers/{providerId}
 *
 * プロバイダー更新
 */
export function usePutProvidersProviderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$put']>,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.providers)[':providerId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.providers)[':providerId']['$put']>) =>
      parseResponse(client.providers[':providerId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /providers/{providerId}
 *
 * プロバイダー削除
 */
export function useDeleteProvidersProviderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['$delete']>,
    ) => parseResponse(client.providers[':providerId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /providers/{providerId}/test
 *
 * プロバイダー接続テスト
 */
export function usePostProvidersProviderIdTest(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>,
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.providers)[':providerId']['test']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.providers)[':providerId']['test']['$post']>,
    ) => parseResponse(client.providers[':providerId'].test.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /account/linked
 *
 * 連携アカウント一覧
 */
export function useGetAccountLinked(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetAccountLinkedQueryKey(),
    queryFn: async () => parseResponse(client.account.linked.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /account/linked
 */
export function getGetAccountLinkedQueryKey() {
  return ['/account/linked'] as const
}

/**
 * POST /account/link/{provider}
 *
 * アカウント連携
 *
 * 既存アカウントにソーシャルアカウントを連携
 */
export function usePostAccountLinkProvider(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$post']>,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$post']>,
    ) => parseResponse(client.account.link[':provider'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /account/link/{provider}
 *
 * アカウント連携解除
 */
export function useDeleteAccountLinkProvider(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.account.link)[':provider']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.account.link)[':provider']['$delete']>,
    ) => parseResponse(client.account.link[':provider'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /enterprise/sso
 *
 * エンタープライズSSO設定一覧
 */
export function useGetEnterpriseSso(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEnterpriseSsoQueryKey(),
    queryFn: async () => parseResponse(client.enterprise.sso.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /enterprise/sso
 */
export function getGetEnterpriseSsoQueryKey() {
  return ['/enterprise/sso'] as const
}

/**
 * POST /enterprise/sso
 *
 * エンタープライズSSO設定作成
 */
export function usePostEnterpriseSso(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.enterprise.sso.$post>,
      variables: InferRequestType<typeof client.enterprise.sso.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.enterprise.sso.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.enterprise.sso.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.enterprise.sso.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.enterprise.sso.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.enterprise.sso.$post>) =>
      parseResponse(client.enterprise.sso.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定詳細
 */
export function useGetEnterpriseSsoConfigId(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEnterpriseSsoConfigIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.enterprise.sso[':configId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /enterprise/sso/{configId}
 */
export function getGetEnterpriseSsoConfigIdQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$get']>,
) {
  return ['/enterprise/sso/:configId', args] as const
}

/**
 * PUT /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定更新
 */
export function usePutEnterpriseSsoConfigId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']>,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$put']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /enterprise/sso/{configId}
 *
 * エンタープライズSSO設定削除
 */
export function useDeleteEnterpriseSsoConfigId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.enterprise.sso)[':configId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.enterprise.sso)[':configId']['$delete']>,
    ) => parseResponse(client.enterprise.sso[':configId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /enterprise/sso/domain-lookup
 *
 * ドメインからSSO設定を検索
 */
export function useGetEnterpriseSsoDomainLookup(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEnterpriseSsoDomainLookupQueryKey(args),
    queryFn: async () =>
      parseResponse(client.enterprise.sso['domain-lookup'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /enterprise/sso/domain-lookup
 */
export function getGetEnterpriseSsoDomainLookupQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)['domain-lookup']['$get']>,
) {
  return ['/enterprise/sso/domain-lookup', args] as const
}

/**
 * GET /enterprise/sso/{configId}/metadata
 *
 * SPメタデータ取得
 *
 * SAML SP メタデータを XML 形式で取得
 */
export function useGetEnterpriseSsoConfigIdMetadata(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetEnterpriseSsoConfigIdMetadataQueryKey(args),
    queryFn: async () =>
      parseResponse(client.enterprise.sso[':configId'].metadata.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /enterprise/sso/{configId}/metadata
 */
export function getGetEnterpriseSsoConfigIdMetadataQueryKey(
  args: InferRequestType<(typeof client.enterprise.sso)[':configId']['metadata']['$get']>,
) {
  return ['/enterprise/sso/:configId/metadata', args] as const
}
