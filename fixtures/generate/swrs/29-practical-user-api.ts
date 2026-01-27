import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * Generates SWR mutation key for POST /auth/register
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostAuthRegisterMutationKey() {
  return ['/auth/register'] as const
}

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export function usePostAuthRegister(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.register.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.auth.register.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAuthRegisterMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.auth.register.$post> }) =>
        parseResponse(client.auth.register.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /auth/login
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostAuthLoginMutationKey() {
  return ['/auth/login'] as const
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function usePostAuthLogin(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.login.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.auth.login.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAuthLoginMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.auth.login.$post> }) =>
        parseResponse(client.auth.login.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /auth/refresh
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostAuthRefreshMutationKey() {
  return ['/auth/refresh'] as const
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function usePostAuthRefresh(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.refresh.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.auth.refresh.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAuthRefreshMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.auth.refresh.$post> }) =>
        parseResponse(client.auth.refresh.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /auth/logout
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostAuthLogoutMutationKey() {
  return ['/auth/logout'] as const
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function usePostAuthLogout(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.logout.$post>>>>
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAuthLogoutMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.auth.logout.$post(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /auth/password/forgot
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostAuthPasswordForgotMutationKey() {
  return ['/auth/password/forgot'] as const
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function usePostAuthPasswordForgot(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.auth.password.forgot.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.auth.password.forgot.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAuthPasswordForgotMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.auth.password.forgot.$post> },
      ) => parseResponse(client.auth.password.forgot.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /auth/password/reset
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostAuthPasswordResetMutationKey() {
  return ['/auth/password/reset'] as const
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function usePostAuthPasswordReset(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.password.reset.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.auth.password.reset.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAuthPasswordResetMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.auth.password.reset.$post> }) =>
        parseResponse(client.auth.password.reset.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return [`/users/${args.param.userId}`, args] as const
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
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
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
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
 * Generates SWR mutation key for DELETE /users/{userId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteUsersUserIdMutationKey() {
  return ['/users/:userId'] as const
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function useDeleteUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$delete']> },
      ) => parseResponse(client.users[':userId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /users/{userId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchUsersUserIdMutationKey() {
  return ['/users/:userId'] as const
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function usePatchUsersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchUsersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':userId']['$patch']> },
      ) => parseResponse(client.users[':userId'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/me
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetUsersMeKey() {
  return ['/users/me'] as const
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function useGetUsersMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /users/me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchUsersMeMutationKey() {
  return ['/users/me'] as const
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function usePatchUsersMe(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.$patch>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.users.me.$patch>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchUsersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.me.$patch> }) =>
        parseResponse(client.users.me.$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /users/me/password
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutUsersMePasswordMutationKey() {
  return ['/users/me/password'] as const
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function usePutUsersMePassword(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.password.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.users.me.password.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUsersMePasswordMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.me.password.$put> }) =>
        parseResponse(client.users.me.password.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /users/me/avatar
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutUsersMeAvatarMutationKey() {
  return ['/users/me/avatar'] as const
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function usePutUsersMeAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.avatar.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.users.me.avatar.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUsersMeAvatarMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.users.me.avatar.$put> }) =>
        parseResponse(client.users.me.avatar.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/me/avatar
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteUsersMeAvatarMutationKey() {
  return ['/users/me/avatar'] as const
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function useDeleteUsersMeAvatar(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.me.avatar.$delete>>>>
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersMeAvatarMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.users.me.avatar.$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}
