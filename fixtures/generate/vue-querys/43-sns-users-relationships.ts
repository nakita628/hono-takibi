import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * Generates Vue Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['$get']>>,
) {
  return ['users', '/users/:userId', unref(args)] as const
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
 * ユーザー情報取得
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
 * Generates Vue Query cache key for GET /users/by/username/{username}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersByUsernameUsernameQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users.by.username)[':username']['$get']>>,
) {
  return ['users', '/users/by/username/:username', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/by/username/{username}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersByUsernameUsernameQueryOptions = (
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersByUsernameUsernameQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.by.username[':username'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export function useGetUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users.by.username)[':username']['$get']>>
              >
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
  const { queryKey, queryFn, ...baseOptions } = getGetUsersByUsernameUsernameQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /users/search
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersSearchQueryKey(
  args: MaybeRef<InferRequestType<typeof client.users.search.$get>>,
) {
  return ['users', '/users/search', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersSearchQueryOptions = (
  args: InferRequestType<typeof client.users.search.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export function useGetUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.search.$get>>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetUsersSearchQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /users/lookup
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersLookupQueryKey(
  args: MaybeRef<InferRequestType<typeof client.users.lookup.$get>>,
) {
  return ['users', '/users/lookup', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/lookup
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersLookupQueryOptions = (
  args: InferRequestType<typeof client.users.lookup.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersLookupQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.lookup.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export function useGetUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.lookup.$get>>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetUsersLookupQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /me
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetMeQueryKey() {
  return ['me', '/me'] as const
}

/**
 * Returns Vue Query query options for GET /me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export function useGetMe(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PATCH /me
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPatchMeMutationKey() {
  return ['PATCH', '/me'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchMeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchMeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.$patch>) =>
    parseResponse(client.me.$patch(args, clientOptions)),
})

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export function usePatchMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.$patch>>>>>,
        Error,
        InferRequestType<typeof client.me.$patch>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.$patch>) =>
      parseResponse(client.me.$patch(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /me/avatar
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostMeAvatarMutationKey() {
  return ['POST', '/me/avatar'] as const
}

/**
 * Returns Vue Query mutation options for POST /me/avatar
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMeAvatarMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMeAvatarMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.avatar.$post>) =>
    parseResponse(client.me.avatar.$post(args, clientOptions)),
})

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function usePostMeAvatar(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.avatar.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.me.avatar.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.avatar.$post>) =>
      parseResponse(client.me.avatar.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /me/avatar
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteMeAvatarMutationKey() {
  return ['DELETE', '/me/avatar'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /me/avatar
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeAvatarMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeAvatarMutationKey(),
  mutationFn: async () => parseResponse(client.me.avatar.$delete(undefined, clientOptions)),
})

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function useDeleteMeAvatar(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.avatar.$delete>>>>
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.me.avatar.$delete(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /me/banner
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostMeBannerMutationKey() {
  return ['POST', '/me/banner'] as const
}

/**
 * Returns Vue Query mutation options for POST /me/banner
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMeBannerMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMeBannerMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.banner.$post>) =>
    parseResponse(client.me.banner.$post(args, clientOptions)),
})

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function usePostMeBanner(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.banner.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.me.banner.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.me.banner.$post>) =>
      parseResponse(client.me.banner.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /me/banner
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteMeBannerMutationKey() {
  return ['DELETE', '/me/banner'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /me/banner
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeBannerMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeBannerMutationKey(),
  mutationFn: async () => parseResponse(client.me.banner.$delete(undefined, clientOptions)),
})

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function useDeleteMeBanner(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.banner.$delete>>>>
          >
        | undefined,
        Error,
        void
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.me.banner.$delete(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /users/{userId}/follow
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUsersUserIdFollowMutationKey() {
  return ['POST', '/users/:userId/follow'] as const
}

/**
 * Returns Vue Query mutation options for POST /users/{userId}/follow
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersUserIdFollowMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersUserIdFollowMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>) =>
    parseResponse(client.users[':userId'].follow.$post(args, clientOptions)),
})

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function usePostUsersUserIdFollow(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['follow']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['follow']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
    ) => parseResponse(client.users[':userId'].follow.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /users/{userId}/follow
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteUsersUserIdFollowMutationKey() {
  return ['DELETE', '/users/:userId/follow'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/{userId}/follow
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersUserIdFollowMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteUsersUserIdFollowMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
  ) => parseResponse(client.users[':userId'].follow.$delete(args, clientOptions)),
})

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function useDeleteUsersUserIdFollow(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['follow']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
    ) => parseResponse(client.users[':userId'].follow.$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/followers
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdFollowersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['followers']['$get']>>,
) {
  return ['users', '/users/:userId/followers', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{userId}/followers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdFollowersQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdFollowersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].followers.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export function useGetUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)[':userId']['followers']['$get']>>
              >
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
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdFollowersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/following
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdFollowingQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['following']['$get']>>,
) {
  return ['users', '/users/:userId/following', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{userId}/following
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdFollowingQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdFollowingQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].following.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export function useGetUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)[':userId']['following']['$get']>>
              >
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
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdFollowingQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /users/{userId}/followers/remove
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUsersUserIdFollowersRemoveMutationKey() {
  return ['POST', '/users/:userId/followers/remove'] as const
}

/**
 * Returns Vue Query mutation options for POST /users/{userId}/followers/remove
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersUserIdFollowersRemoveMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostUsersUserIdFollowersRemoveMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
  ) => parseResponse(client.users[':userId'].followers.remove.$post(args, clientOptions)),
})

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export function usePostUsersUserIdFollowersRemove(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['followers']['remove']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    ) => parseResponse(client.users[':userId'].followers.remove.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /relationships
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetRelationshipsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.relationships.$get>>,
) {
  return ['relationships', '/relationships', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /relationships
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRelationshipsQueryOptions = (
  args: InferRequestType<typeof client.relationships.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetRelationshipsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.relationships.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export function useGetRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.relationships.$get>>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetRelationshipsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /follow-requests
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetFollowRequestsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['follow-requests']['$get']>>,
) {
  return ['follow-requests', '/follow-requests', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /follow-requests
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFollowRequestsQueryOptions = (
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFollowRequestsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['follow-requests'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export function useGetFollowRequests(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['follow-requests']['$get']>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetFollowRequestsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /follow-requests/{userId}/accept
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFollowRequestsUserIdAcceptMutationKey() {
  return ['POST', '/follow-requests/:userId/accept'] as const
}

/**
 * Returns Vue Query mutation options for POST /follow-requests/{userId}/accept
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFollowRequestsUserIdAcceptMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFollowRequestsUserIdAcceptMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
  ) => parseResponse(client['follow-requests'][':userId'].accept.$post(args, clientOptions)),
})

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export function usePostFollowRequestsUserIdAccept(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['follow-requests'][':userId']['accept']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    ) => parseResponse(client['follow-requests'][':userId'].accept.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /follow-requests/{userId}/reject
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostFollowRequestsUserIdRejectMutationKey() {
  return ['POST', '/follow-requests/:userId/reject'] as const
}

/**
 * Returns Vue Query mutation options for POST /follow-requests/{userId}/reject
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostFollowRequestsUserIdRejectMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostFollowRequestsUserIdRejectMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
  ) => parseResponse(client['follow-requests'][':userId'].reject.$post(args, clientOptions)),
})

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function usePostFollowRequestsUserIdReject(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['follow-requests'][':userId']['reject']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    ) => parseResponse(client['follow-requests'][':userId'].reject.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /users/{userId}/block
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUsersUserIdBlockMutationKey() {
  return ['POST', '/users/:userId/block'] as const
}

/**
 * Returns Vue Query mutation options for POST /users/{userId}/block
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersUserIdBlockMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersUserIdBlockMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['block']['$post']>) =>
    parseResponse(client.users[':userId'].block.$post(args, clientOptions)),
})

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function usePostUsersUserIdBlock(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['block']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['block']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
    ) => parseResponse(client.users[':userId'].block.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /users/{userId}/block
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteUsersUserIdBlockMutationKey() {
  return ['DELETE', '/users/:userId/block'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/{userId}/block
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersUserIdBlockMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteUsersUserIdBlockMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
  ) => parseResponse(client.users[':userId'].block.$delete(args, clientOptions)),
})

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function useDeleteUsersUserIdBlock(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['block']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['block']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
    ) => parseResponse(client.users[':userId'].block.$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for POST /users/{userId}/mute
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostUsersUserIdMuteMutationKey() {
  return ['POST', '/users/:userId/mute'] as const
}

/**
 * Returns Vue Query mutation options for POST /users/{userId}/mute
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersUserIdMuteMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersUserIdMuteMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>) =>
    parseResponse(client.users[':userId'].mute.$post(args, clientOptions)),
})

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function usePostUsersUserIdMute(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['mute']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['mute']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>) =>
      parseResponse(client.users[':userId'].mute.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /users/{userId}/mute
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteUsersUserIdMuteMutationKey() {
  return ['DELETE', '/users/:userId/mute'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/{userId}/mute
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersUserIdMuteMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteUsersUserIdMuteMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>) =>
    parseResponse(client.users[':userId'].mute.$delete(args, clientOptions)),
})

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function useDeleteUsersUserIdMute(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)[':userId']['mute']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
    ) => parseResponse(client.users[':userId'].mute.$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /blocks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetBlocksQueryKey(args: MaybeRef<InferRequestType<typeof client.blocks.$get>>) {
  return ['blocks', '/blocks', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /blocks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBlocksQueryOptions = (
  args: InferRequestType<typeof client.blocks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBlocksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.blocks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export function useGetBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.blocks.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetBlocksQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /mutes
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetMutesQueryKey(args: MaybeRef<InferRequestType<typeof client.mutes.$get>>) {
  return ['mutes', '/mutes', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /mutes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMutesQueryOptions = (
  args: InferRequestType<typeof client.mutes.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMutesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.mutes.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export function useGetMutes(
  args: InferRequestType<typeof client.mutes.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.mutes.$get>>>>>,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetMutesQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /lists
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetListsQueryKey() {
  return ['lists', '/lists'] as const
}

/**
 * Returns Vue Query query options for GET /lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetListsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetListsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.lists.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export function useGetLists(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lists.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetListsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /lists
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostListsMutationKey() {
  return ['POST', '/lists'] as const
}

/**
 * Returns Vue Query mutation options for POST /lists
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostListsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostListsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.lists.$post>) =>
    parseResponse(client.lists.$post(args, clientOptions)),
})

/**
 * POST /lists
 *
 * リスト作成
 */
export function usePostLists(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lists.$post>>>>>,
        Error,
        InferRequestType<typeof client.lists.$post>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.lists.$post>) =>
      parseResponse(client.lists.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists/{listId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetListsListIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.lists)[':listId']['$get']>>,
) {
  return ['lists', '/lists/:listId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /lists/{listId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetListsListIdQueryOptions = (
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetListsListIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.lists[':listId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export function useGetListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.lists)[':listId']['$get']>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetListsListIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /lists/{listId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPutListsListIdMutationKey() {
  return ['PUT', '/lists/:listId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /lists/{listId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutListsListIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutListsListIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$put']>) =>
    parseResponse(client.lists[':listId'].$put(args, clientOptions)),
})

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export function usePutListsListId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.lists)[':listId']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.lists)[':listId']['$put']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$put']>) =>
      parseResponse(client.lists[':listId'].$put(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /lists/{listId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteListsListIdMutationKey() {
  return ['DELETE', '/lists/:listId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /lists/{listId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteListsListIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteListsListIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$delete']>) =>
    parseResponse(client.lists[':listId'].$delete(args, clientOptions)),
})

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function useDeleteListsListId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.lists)[':listId']['$delete']>>>
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.lists)[':listId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$delete']>) =>
      parseResponse(client.lists[':listId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists/{listId}/members
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetListsListIdMembersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.lists)[':listId']['members']['$get']>>,
) {
  return ['lists', '/lists/:listId/members', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /lists/{listId}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetListsListIdMembersQueryOptions = (
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetListsListIdMembersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.lists[':listId'].members.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export function useGetListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.lists)[':listId']['members']['$get']>>
              >
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
  const { queryKey, queryFn, ...baseOptions } = getGetListsListIdMembersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /lists/{listId}/members
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getPostListsListIdMembersMutationKey() {
  return ['POST', '/lists/:listId/members'] as const
}

/**
 * Returns Vue Query mutation options for POST /lists/{listId}/members
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostListsListIdMembersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostListsListIdMembersMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
  ) => parseResponse(client.lists[':listId'].members.$post(args, clientOptions)),
})

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export function usePostListsListIdMembers(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.lists)[':listId']['members']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lists)[':listId']['members']['$post']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
    ) => parseResponse(client.lists[':listId'].members.$post(args, clientOptions)),
  })
}

/**
 * Generates Vue Query mutation key for DELETE /lists/{listId}/members/{userId}
 * Returns key [method, path] for mutation state tracking and cache operations
 */
export function getDeleteListsListIdMembersUserIdMutationKey() {
  return ['DELETE', '/lists/:listId/members/:userId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /lists/{listId}/members/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteListsListIdMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteListsListIdMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
  ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(args, clientOptions)),
})

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function useDeleteListsListIdMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
      >,
      'mutationFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
    ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists/{listId}/timeline
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetListsListIdTimelineQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>>,
) {
  return ['lists', '/lists/:listId/timeline', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /lists/{listId}/timeline
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetListsListIdTimelineQueryOptions = (
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetListsListIdTimelineQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.lists[':listId'].timeline.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export function useGetListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.lists)[':listId']['timeline']['$get']>>
              >
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
  const { queryKey, queryFn, ...baseOptions } = getGetListsListIdTimelineQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/lists
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdListsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':userId']['lists']['$get']>>,
) {
  return ['users', '/users/:userId/lists', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{userId}/lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdListsQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdListsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].lists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export function useGetUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)[':userId']['lists']['$get']>>
              >
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
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdListsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
