import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export function usePostAuthRegister(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.register.$post>,
      variables: InferRequestType<typeof client.auth.register.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.auth.register.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.register.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.auth.register.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.auth.register.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.auth.register.$post>) =>
      parseResponse(client.auth.register.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function usePostAuthLogin(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.login.$post>,
      variables: InferRequestType<typeof client.auth.login.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.auth.login.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.login.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.auth.login.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.auth.login.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.auth.login.$post>) =>
      parseResponse(client.auth.login.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function usePostAuthRefresh(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.refresh.$post>,
      variables: InferRequestType<typeof client.auth.refresh.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.auth.refresh.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.refresh.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.auth.refresh.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.auth.refresh.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.auth.refresh.$post>) =>
      parseResponse(client.auth.refresh.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function usePostAuthLogout(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.logout.$post> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.logout.$post> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async () => parseResponse(client.auth.logout.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function usePostAuthPasswordForgot(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.password.forgot.$post>,
      variables: InferRequestType<typeof client.auth.password.forgot.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.auth.password.forgot.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.password.forgot.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.auth.password.forgot.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.auth.password.forgot.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.auth.password.forgot.$post>) =>
      parseResponse(client.auth.password.forgot.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function usePostAuthPasswordReset(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.password.reset.$post>,
      variables: InferRequestType<typeof client.auth.password.reset.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.auth.password.reset.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.password.reset.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.auth.password.reset.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.auth.password.reset.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.auth.password.reset.$post>) =>
      parseResponse(client.auth.password.reset.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
        | InferResponseType<typeof client.users.$get>
        | (() => InferResponseType<typeof client.users.$get>)
      initialData?:
        | InferResponseType<typeof client.users.$get>
        | (() => InferResponseType<typeof client.users.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * Returns TanStack Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersQueryOptions(
  args: InferRequestType<typeof client.users.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersQueryKey(args),
    queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
  }
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
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
        | InferResponseType<(typeof client.users)[':userId']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':userId']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':userId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function useDeleteUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.users)[':userId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$delete']>) =>
      parseResponse(client.users[':userId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function usePatchUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['$patch']>,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
      parseResponse(client.users[':userId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function useGetUsersMe(options?: {
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
      | InferResponseType<typeof client.users.me.$get>
      | (() => InferResponseType<typeof client.users.me.$get>)
    initialData?:
      | InferResponseType<typeof client.users.me.$get>
      | (() => InferResponseType<typeof client.users.me.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users.me.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/me'] as const
}

/**
 * Returns TanStack Query query options for GET /users/me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetUsersMeQueryKey(),
    queryFn: async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
  }
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function usePatchUsersMe(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.users.me.$patch>,
      variables: InferRequestType<typeof client.users.me.$patch>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.users.me.$patch>) => void
    onSettled?: (
      data: InferResponseType<typeof client.users.me.$patch> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.users.me.$patch>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.users.me.$patch>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.users.me.$patch>) =>
      parseResponse(client.users.me.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function usePutUsersMePassword(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.users.me.password.$put>,
      variables: InferRequestType<typeof client.users.me.password.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.users.me.password.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.users.me.password.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.users.me.password.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.users.me.password.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.users.me.password.$put>) =>
      parseResponse(client.users.me.password.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function usePutUsersMeAvatar(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.users.me.avatar.$put>,
      variables: InferRequestType<typeof client.users.me.avatar.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.users.me.avatar.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.users.me.avatar.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.users.me.avatar.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.users.me.avatar.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.users.me.avatar.$put>) =>
      parseResponse(client.users.me.avatar.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function useDeleteUsersMeAvatar(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.users.me.avatar.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.users.me.avatar.$delete> | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async () => parseResponse(client.users.me.avatar.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}
