import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * Generates Vue Query mutation key for POST /auth/register
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthRegisterMutationKey() {
  return ['auth', 'POST', '/auth/register'] as const
}

/**
 * Returns Vue Query mutation options for POST /auth/register
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthRegisterMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthRegisterMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.auth.register.$post>) =>
    parseResponse(client.auth.register.$post(args, clientOptions)),
})

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export function usePostAuthRegister(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.register.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.auth.register.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostAuthRegisterMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /auth/login
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthLoginMutationKey() {
  return ['auth', 'POST', '/auth/login'] as const
}

/**
 * Returns Vue Query mutation options for POST /auth/login
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthLoginMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthLoginMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.auth.login.$post>) =>
    parseResponse(client.auth.login.$post(args, clientOptions)),
})

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function usePostAuthLogin(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.login.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.auth.login.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostAuthLoginMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /auth/refresh
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthRefreshMutationKey() {
  return ['auth', 'POST', '/auth/refresh'] as const
}

/**
 * Returns Vue Query mutation options for POST /auth/refresh
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthRefreshMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthRefreshMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.auth.refresh.$post>) =>
    parseResponse(client.auth.refresh.$post(args, clientOptions)),
})

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function usePostAuthRefresh(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.refresh.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.auth.refresh.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostAuthRefreshMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /auth/logout
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthLogoutMutationKey() {
  return ['auth', 'POST', '/auth/logout'] as const
}

/**
 * Returns Vue Query mutation options for POST /auth/logout
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthLogoutMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthLogoutMutationKey(),
  mutationFn: async () => parseResponse(client.auth.logout.$post(undefined, clientOptions)),
})

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function usePostAuthLogout(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.logout.$post>>>>
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostAuthLogoutMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /auth/password/forgot
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthPasswordForgotMutationKey() {
  return ['auth', 'POST', '/auth/password/forgot'] as const
}

/**
 * Returns Vue Query mutation options for POST /auth/password/forgot
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthPasswordForgotMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthPasswordForgotMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.auth.password.forgot.$post>) =>
    parseResponse(client.auth.password.forgot.$post(args, clientOptions)),
})

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function usePostAuthPasswordForgot(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.auth.password.forgot.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.auth.password.forgot.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostAuthPasswordForgotMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /auth/password/reset
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthPasswordResetMutationKey() {
  return ['auth', 'POST', '/auth/password/reset'] as const
}

/**
 * Returns Vue Query mutation options for POST /auth/password/reset
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthPasswordResetMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthPasswordResetMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.auth.password.reset.$post>) =>
    parseResponse(client.auth.password.reset.$post(args, clientOptions)),
})

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function usePostAuthPasswordReset(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.auth.password.reset.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.auth.password.reset.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostAuthPasswordResetMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: MaybeRef<InferRequestType<typeof client.users.$get>>) {
  return ['users', 'GET', '/users', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersQueryOptions = (
  args: InferRequestType<typeof client.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['$get']>>,
) {
  return ['users', 'GET', '/users/:userId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersUserIdMutationKey() {
  return ['users', 'DELETE', '/users/:userId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$delete']>) =>
    parseResponse(client.users[':userId'].$delete(args, clientOptions)),
})

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function useDeleteUsersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.users)[':userId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteUsersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchUsersUserIdMutationKey() {
  return ['users', 'PATCH', '/users/:userId'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
    parseResponse(client.users[':userId'].$patch(args, clientOptions)),
})

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function usePatchUsersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$patch']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchUsersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /users/me
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersMeQueryKey() {
  return ['users', 'GET', '/users/me'] as const
}

/**
 * Returns Vue Query query options for GET /users/me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUsersMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.me.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function useGetUsersMe(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PATCH /users/me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchUsersMeMutationKey() {
  return ['users', 'PATCH', '/users/me'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /users/me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchUsersMeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchUsersMeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.me.$patch>) =>
    parseResponse(client.users.me.$patch(args, clientOptions)),
})

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function usePatchUsersMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.$patch>>>>
        >,
        Error,
        InferRequestType<typeof client.users.me.$patch>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPatchUsersMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /users/me/password
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersMePasswordMutationKey() {
  return ['users', 'PUT', '/users/me/password'] as const
}

/**
 * Returns Vue Query mutation options for PUT /users/me/password
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutUsersMePasswordMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutUsersMePasswordMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.me.password.$put>) =>
    parseResponse(client.users.me.password.$put(args, clientOptions)),
})

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function usePutUsersMePassword(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.users.me.password.$put>>>
          >
        >,
        Error,
        InferRequestType<typeof client.users.me.password.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutUsersMePasswordMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /users/me/avatar
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersMeAvatarMutationKey() {
  return ['users', 'PUT', '/users/me/avatar'] as const
}

/**
 * Returns Vue Query mutation options for PUT /users/me/avatar
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutUsersMeAvatarMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutUsersMeAvatarMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.me.avatar.$put>) =>
    parseResponse(client.users.me.avatar.$put(args, clientOptions)),
})

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function usePutUsersMeAvatar(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.avatar.$put>>>>
        >,
        Error,
        InferRequestType<typeof client.users.me.avatar.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutUsersMeAvatarMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /users/me/avatar
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersMeAvatarMutationKey() {
  return ['users', 'DELETE', '/users/me/avatar'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/me/avatar
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersMeAvatarMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteUsersMeAvatarMutationKey(),
  mutationFn: async () => parseResponse(client.users.me.avatar.$delete(undefined, clientOptions)),
})

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function useDeleteUsersMeAvatar(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.users.me.avatar.$delete>>>
            >
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteUsersMeAvatarMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
