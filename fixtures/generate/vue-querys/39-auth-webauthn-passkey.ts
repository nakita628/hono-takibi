import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function usePostWebauthnRegisterOptions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webauthn.register.options.$post>,
      variables: InferRequestType<typeof client.webauthn.register.options.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.webauthn.register.options.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.webauthn.register.options.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webauthn.register.options.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.webauthn.register.options.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.webauthn.register.options.$post>) =>
      parseResponse(client.webauthn.register.options.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function usePostWebauthnRegisterVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webauthn.register.verify.$post>,
      variables: InferRequestType<typeof client.webauthn.register.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.webauthn.register.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.webauthn.register.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webauthn.register.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.webauthn.register.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.webauthn.register.verify.$post>) =>
      parseResponse(client.webauthn.register.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function usePostWebauthnAuthenticateOptions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webauthn.authenticate.options.$post>,
      variables: InferRequestType<typeof client.webauthn.authenticate.options.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.webauthn.authenticate.options.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.webauthn.authenticate.options.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webauthn.authenticate.options.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.webauthn.authenticate.options.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.webauthn.authenticate.options.$post>) =>
      parseResponse(client.webauthn.authenticate.options.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function usePostWebauthnAuthenticateVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webauthn.authenticate.verify.$post>,
      variables: InferRequestType<typeof client.webauthn.authenticate.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.webauthn.authenticate.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.webauthn.authenticate.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webauthn.authenticate.verify.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.webauthn.authenticate.verify.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.webauthn.authenticate.verify.$post>) =>
      parseResponse(client.webauthn.authenticate.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function useGetWebauthnCredentials(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.webauthn.credentials.$get>
      | (() => InferResponseType<typeof client.webauthn.credentials.$get>)
    initialData?:
      | InferResponseType<typeof client.webauthn.credentials.$get>
      | (() => InferResponseType<typeof client.webauthn.credentials.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebauthnCredentialsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webauthn.credentials.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/credentials
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['/webauthn/credentials'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/credentials
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnCredentialsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWebauthnCredentialsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webauthn.credentials.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>
        | (() => InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>
        | (() => InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebauthnCredentialsCredentialIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webauthn.credentials[':credentialId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/credentials/{credentialId}
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['/webauthn/credentials/:credentialId', args] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/credentials/{credentialId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnCredentialsCredentialIdQueryOptions = (
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWebauthnCredentialsCredentialIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webauthn.credentials[':credentialId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function useDeleteWebauthnCredentialsCredentialId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    ) => parseResponse(client.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function usePatchWebauthnCredentialsCredentialId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    ) => parseResponse(client.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function useGetWebauthnSettings(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.webauthn.settings.$get>
      | (() => InferResponseType<typeof client.webauthn.settings.$get>)
    initialData?:
      | InferResponseType<typeof client.webauthn.settings.$get>
      | (() => InferResponseType<typeof client.webauthn.settings.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebauthnSettingsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webauthn.settings.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/settings
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['/webauthn/settings'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnSettingsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWebauthnSettingsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webauthn.settings.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function useGetWebauthnSettingsRp(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.webauthn.settings.rp.$get>
      | (() => InferResponseType<typeof client.webauthn.settings.rp.$get>)
    initialData?:
      | InferResponseType<typeof client.webauthn.settings.rp.$get>
      | (() => InferResponseType<typeof client.webauthn.settings.rp.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebauthnSettingsRpQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webauthn.settings.rp.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/settings/rp
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['/webauthn/settings/rp'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/settings/rp
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnSettingsRpQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWebauthnSettingsRpQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webauthn.settings.rp.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webauthn.settings.rp.$put>,
      variables: InferRequestType<typeof client.webauthn.settings.rp.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.webauthn.settings.rp.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.webauthn.settings.rp.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webauthn.settings.rp.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.webauthn.settings.rp.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.webauthn.settings.rp.$put>) =>
      parseResponse(client.webauthn.settings.rp.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function useGetWebauthnAuthenticators(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.webauthn.authenticators.$get>
      | (() => InferResponseType<typeof client.webauthn.authenticators.$get>)
    initialData?:
      | InferResponseType<typeof client.webauthn.authenticators.$get>
      | (() => InferResponseType<typeof client.webauthn.authenticators.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebauthnAuthenticatorsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webauthn.authenticators.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/authenticators
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['/webauthn/authenticators'] as const
}

/**
 * Returns Vue Query query options for GET /webauthn/authenticators
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebauthnAuthenticatorsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWebauthnAuthenticatorsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webauthn.authenticators.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
