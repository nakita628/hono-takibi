import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function createPostWebauthnRegisterOptions(options?: {
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
  return createMutation({
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
export function createPostWebauthnRegisterVerify(options?: {
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
  return createMutation({
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
export function createPostWebauthnAuthenticateOptions(options?: {
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
  return createMutation({
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
export function createPostWebauthnAuthenticateVerify(options?: {
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
  return createMutation({
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
export function createGetWebauthnCredentials(options?: {
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
    select?: (
      data: InferResponseType<typeof client.webauthn.credentials.$get>,
    ) => InferResponseType<typeof client.webauthn.credentials.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebauthnCredentialsQueryKey(),
    queryFn: async () => parseResponse(client.webauthn.credentials.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/credentials
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['/webauthn/credentials'] as const
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function createGetWebauthnCredentialsCredentialId(
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
      select?: (
        data: InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
      ) => InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebauthnCredentialsCredentialIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.webauthn.credentials[':credentialId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/credentials/{credentialId}
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['/webauthn/credentials/:credentialId', args] as const
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function createDeleteWebauthnCredentialsCredentialId(options?: {
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
  return createMutation({
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
export function createPatchWebauthnCredentialsCredentialId(options?: {
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
  return createMutation({
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
export function createGetWebauthnSettings(options?: {
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
    select?: (
      data: InferResponseType<typeof client.webauthn.settings.$get>,
    ) => InferResponseType<typeof client.webauthn.settings.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebauthnSettingsQueryKey(),
    queryFn: async () => parseResponse(client.webauthn.settings.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/settings
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['/webauthn/settings'] as const
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function createGetWebauthnSettingsRp(options?: {
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
    select?: (
      data: InferResponseType<typeof client.webauthn.settings.rp.$get>,
    ) => InferResponseType<typeof client.webauthn.settings.rp.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebauthnSettingsRpQueryKey(),
    queryFn: async () => parseResponse(client.webauthn.settings.rp.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/settings/rp
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function createPutWebauthnSettingsRp(options?: {
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
  return createMutation({
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
export function createGetWebauthnAuthenticators(options?: {
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
    select?: (
      data: InferResponseType<typeof client.webauthn.authenticators.$get>,
    ) => InferResponseType<typeof client.webauthn.authenticators.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebauthnAuthenticatorsQueryKey(),
    queryFn: async () =>
      parseResponse(client.webauthn.authenticators.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /webauthn/authenticators
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['/webauthn/authenticators'] as const
}
