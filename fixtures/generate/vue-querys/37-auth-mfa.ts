import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function useGetMfaStatus(options?: {
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
    queryKey: getGetMfaStatusQueryKey(),
    queryFn: async () => parseResponse(client.mfa.status.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/status
 */
export function getGetMfaStatusQueryKey() {
  return ['/mfa/status'] as const
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export function useGetMfaMethods(options?: {
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
    queryKey: getGetMfaMethodsQueryKey(),
    queryFn: async () => parseResponse(client.mfa.methods.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/methods
 */
export function getGetMfaMethodsQueryKey() {
  return ['/mfa/methods'] as const
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function usePutMfaPreferred(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.preferred.$put>,
      variables: InferRequestType<typeof client.mfa.preferred.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.preferred.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.preferred.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.preferred.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.preferred.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.preferred.$put>) =>
      parseResponse(client.mfa.preferred.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function usePostMfaTotpSetup(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.totp.setup.$post>,
      variables: InferRequestType<typeof client.mfa.totp.setup.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.totp.setup.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.totp.setup.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.totp.setup.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.totp.setup.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.setup.$post>) =>
      parseResponse(client.mfa.totp.setup.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function usePostMfaTotpVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.totp.verify.$post>,
      variables: InferRequestType<typeof client.mfa.totp.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.totp.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.totp.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.totp.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.totp.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.verify.$post>) =>
      parseResponse(client.mfa.totp.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function useDeleteMfaTotp(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.totp.$delete> | undefined,
      variables: InferRequestType<typeof client.mfa.totp.$delete>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.totp.$delete>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.totp.$delete> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.totp.$delete>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.totp.$delete>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.totp.$delete>) =>
      parseResponse(client.mfa.totp.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function usePostMfaSmsSetup(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.sms.setup.$post>,
      variables: InferRequestType<typeof client.mfa.sms.setup.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.sms.setup.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.sms.setup.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.sms.setup.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.sms.setup.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.sms.setup.$post>) =>
      parseResponse(client.mfa.sms.setup.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function usePostMfaSmsVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.sms.verify.$post>,
      variables: InferRequestType<typeof client.mfa.sms.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.sms.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.sms.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.sms.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.sms.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.sms.verify.$post>) =>
      parseResponse(client.mfa.sms.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function useDeleteMfaSmsMethodId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>) =>
      parseResponse(client.mfa.sms[':methodId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function usePostMfaEmailSetup(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.email.setup.$post>,
      variables: InferRequestType<typeof client.mfa.email.setup.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.email.setup.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.email.setup.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.email.setup.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.email.setup.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.email.setup.$post>) =>
      parseResponse(client.mfa.email.setup.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function usePostMfaEmailVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.email.verify.$post>,
      variables: InferRequestType<typeof client.mfa.email.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.email.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.email.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.email.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.email.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.email.verify.$post>) =>
      parseResponse(client.mfa.email.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function usePostMfaWebauthnRegisterOptions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.webauthn.register.options.$post>,
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.webauthn.register.options.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.mfa.webauthn.register.options.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.options.$post>) =>
      parseResponse(client.mfa.webauthn.register.options.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function usePostMfaWebauthnRegisterVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.webauthn.register.verify.$post>,
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.webauthn.register.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.webauthn.register.verify.$post>) =>
      parseResponse(client.mfa.webauthn.register.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function useGetMfaWebauthnCredentials(options?: {
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
    queryKey: getGetMfaWebauthnCredentialsQueryKey(),
    queryFn: async () =>
      parseResponse(client.mfa.webauthn.credentials.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/webauthn/credentials
 */
export function getGetMfaWebauthnCredentialsQueryKey() {
  return ['/mfa/webauthn/credentials'] as const
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function useDeleteMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>,
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function usePatchMfaWebauthnCredentialsCredentialId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>,
    ) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function usePostMfaBackupCodesGenerate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>,
    ) => parseResponse(client.mfa['backup-codes'].generate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function useGetMfaBackupCodesStatus(options?: {
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
    queryKey: getGetMfaBackupCodesStatusQueryKey(),
    queryFn: async () =>
      parseResponse(client.mfa['backup-codes'].status.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/backup-codes/status
 */
export function getGetMfaBackupCodesStatusQueryKey() {
  return ['/mfa/backup-codes/status'] as const
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function usePostMfaChallenge(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.challenge.$post>,
      variables: InferRequestType<typeof client.mfa.challenge.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.challenge.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.challenge.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.challenge.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.challenge.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.$post>) =>
      parseResponse(client.mfa.challenge.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function usePostMfaChallengeSend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.challenge.send.$post>,
      variables: InferRequestType<typeof client.mfa.challenge.send.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.challenge.send.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.challenge.send.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.challenge.send.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.challenge.send.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.challenge.send.$post>) =>
      parseResponse(client.mfa.challenge.send.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function usePostMfaVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.verify.$post>,
      variables: InferRequestType<typeof client.mfa.verify.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.verify.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.verify.$post>) =>
      parseResponse(client.mfa.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function usePostMfaWebauthnAuthenticateOptions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post>,
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    onMutate?: (
      variables: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>,
    ) => parseResponse(client.mfa.webauthn.authenticate.options.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function usePostMfaRecovery(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.recovery.$post>,
      variables: InferRequestType<typeof client.mfa.recovery.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.mfa.recovery.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.recovery.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.recovery.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.recovery.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.$post>) =>
      parseResponse(client.mfa.recovery.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function usePostMfaRecoveryVerify(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.mfa.recovery.verify.$post>,
      variables: InferRequestType<typeof client.mfa.recovery.verify.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.mfa.recovery.verify.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.mfa.recovery.verify.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.mfa.recovery.verify.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.mfa.recovery.verify.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.mfa.recovery.verify.$post>) =>
      parseResponse(client.mfa.recovery.verify.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
