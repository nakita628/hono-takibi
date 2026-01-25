import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export function createGetUsersUserId(
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
  return createQuery({
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
 * Generates Svelte Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}
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
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export function createGetUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
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
        | InferResponseType<(typeof client.users.by.username)[':username']['$get']>
        | (() => InferResponseType<(typeof client.users.by.username)[':username']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users.by.username)[':username']['$get']>
        | (() => InferResponseType<(typeof client.users.by.username)[':username']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersByUsernameUsernameQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users.by.username[':username'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/by/username/{username}
 */
export function getGetUsersByUsernameUsernameQueryKey(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
) {
  return ['/users/by/username/:username', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/by/username/{username}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersByUsernameUsernameQueryOptions(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersByUsernameUsernameQueryKey(args),
    queryFn: async () =>
      parseResponse(client.users.by.username[':username'].$get(args, clientOptions)),
  }
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export function createGetUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
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
        | InferResponseType<typeof client.users.search.$get>
        | (() => InferResponseType<typeof client.users.search.$get>)
      initialData?:
        | InferResponseType<typeof client.users.search.$get>
        | (() => InferResponseType<typeof client.users.search.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersSearchQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users.search.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/search
 */
export function getGetUsersSearchQueryKey(args: InferRequestType<typeof client.users.search.$get>) {
  return ['/users/search', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersSearchQueryOptions(
  args: InferRequestType<typeof client.users.search.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersSearchQueryKey(args),
    queryFn: async () => parseResponse(client.users.search.$get(args, clientOptions)),
  }
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export function createGetUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
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
        | InferResponseType<typeof client.users.lookup.$get>
        | (() => InferResponseType<typeof client.users.lookup.$get>)
      initialData?:
        | InferResponseType<typeof client.users.lookup.$get>
        | (() => InferResponseType<typeof client.users.lookup.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersLookupQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users.lookup.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/lookup
 */
export function getGetUsersLookupQueryKey(args: InferRequestType<typeof client.users.lookup.$get>) {
  return ['/users/lookup', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/lookup
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersLookupQueryOptions(
  args: InferRequestType<typeof client.users.lookup.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersLookupQueryKey(args),
    queryFn: async () => parseResponse(client.users.lookup.$get(args, clientOptions)),
  }
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export function createGetMe(options?: {
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
      | InferResponseType<typeof client.me.$get>
      | (() => InferResponseType<typeof client.me.$get>)
    initialData?:
      | InferResponseType<typeof client.me.$get>
      | (() => InferResponseType<typeof client.me.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetMeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.me.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /me
 */
export function getGetMeQueryKey() {
  return ['/me'] as const
}

/**
 * Returns Svelte Query query options for GET /me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetMeQueryKey(),
    queryFn: async () => parseResponse(client.me.$get(undefined, clientOptions)),
  }
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export function createPatchMe(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.$patch>,
      variables: InferRequestType<typeof client.me.$patch>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.$patch>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.$patch> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.$patch>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.$patch>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.$patch>) =>
      parseResponse(client.me.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function createPostMeAvatar(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.avatar.$post>,
      variables: InferRequestType<typeof client.me.avatar.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.avatar.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.avatar.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.avatar.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.avatar.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.avatar.$post>) =>
      parseResponse(client.me.avatar.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function createDeleteMeAvatar(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.avatar.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.avatar.$delete> | undefined,
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
  return createMutation({
    mutationFn: async () => parseResponse(client.me.avatar.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function createPostMeBanner(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.banner.$post>,
      variables: InferRequestType<typeof client.me.banner.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.me.banner.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.banner.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.me.banner.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.me.banner.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.me.banner.$post>) =>
      parseResponse(client.me.banner.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function createDeleteMeBanner(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.me.banner.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.me.banner.$delete> | undefined,
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
  return createMutation({
    mutationFn: async () => parseResponse(client.me.banner.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function createPostUsersUserIdFollow(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['follow']['$post']>,
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['follow']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
    ) => parseResponse(client.users[':userId'].follow.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function createDeleteUsersUserIdFollow(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['follow']['$delete']>,
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['follow']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
    ) => parseResponse(client.users[':userId'].follow.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export function createGetUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
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
        | InferResponseType<(typeof client.users)[':userId']['followers']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['followers']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':userId']['followers']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['followers']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersUserIdFollowersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':userId'].followers.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/followers
 */
export function getGetUsersUserIdFollowersQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
) {
  return ['/users/:userId/followers', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/followers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdFollowersQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdFollowersQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].followers.$get(args, clientOptions)),
  }
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export function createGetUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
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
        | InferResponseType<(typeof client.users)[':userId']['following']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['following']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':userId']['following']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['following']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersUserIdFollowingQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':userId'].following.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/following
 */
export function getGetUsersUserIdFollowingQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
) {
  return ['/users/:userId/following', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/following
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdFollowingQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdFollowingQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].following.$get(args, clientOptions)),
  }
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export function createPostUsersUserIdFollowersRemove(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
      variables: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.users)[':userId']['followers']['remove']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
    ) => parseResponse(client.users[':userId'].followers.remove.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export function createGetRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
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
        | InferResponseType<typeof client.relationships.$get>
        | (() => InferResponseType<typeof client.relationships.$get>)
      initialData?:
        | InferResponseType<typeof client.relationships.$get>
        | (() => InferResponseType<typeof client.relationships.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetRelationshipsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.relationships.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /relationships
 */
export function getGetRelationshipsQueryKey(
  args: InferRequestType<typeof client.relationships.$get>,
) {
  return ['/relationships', args] as const
}

/**
 * Returns Svelte Query query options for GET /relationships
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetRelationshipsQueryOptions(
  args: InferRequestType<typeof client.relationships.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetRelationshipsQueryKey(args),
    queryFn: async () => parseResponse(client.relationships.$get(args, clientOptions)),
  }
}

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export function createGetFollowRequests(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
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
        | InferResponseType<(typeof client)['follow-requests']['$get']>
        | (() => InferResponseType<(typeof client)['follow-requests']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['follow-requests']['$get']>
        | (() => InferResponseType<(typeof client)['follow-requests']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetFollowRequestsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['follow-requests'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /follow-requests
 */
export function getGetFollowRequestsQueryKey(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
) {
  return ['/follow-requests', args] as const
}

/**
 * Returns Svelte Query query options for GET /follow-requests
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetFollowRequestsQueryOptions(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetFollowRequestsQueryKey(args),
    queryFn: async () => parseResponse(client['follow-requests'].$get(args, clientOptions)),
  }
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export function createPostFollowRequestsUserIdAccept(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
    ) => parseResponse(client['follow-requests'][':userId'].accept.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function createPostFollowRequestsUserIdReject(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
    ) => parseResponse(client['follow-requests'][':userId'].reject.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function createPostUsersUserIdBlock(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['block']['$post']>,
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['block']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
    ) => parseResponse(client.users[':userId'].block.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function createDeleteUsersUserIdBlock(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['block']['$delete']>,
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['block']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
    ) => parseResponse(client.users[':userId'].block.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function createPostUsersUserIdMute(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['mute']['$post']>,
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['mute']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>) =>
      parseResponse(client.users[':userId'].mute.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function createDeleteUsersUserIdMute(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['mute']['$delete']>,
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['mute']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
    ) => parseResponse(client.users[':userId'].mute.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export function createGetBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
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
        | InferResponseType<typeof client.blocks.$get>
        | (() => InferResponseType<typeof client.blocks.$get>)
      initialData?:
        | InferResponseType<typeof client.blocks.$get>
        | (() => InferResponseType<typeof client.blocks.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetBlocksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.blocks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /blocks
 */
export function getGetBlocksQueryKey(args: InferRequestType<typeof client.blocks.$get>) {
  return ['/blocks', args] as const
}

/**
 * Returns Svelte Query query options for GET /blocks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetBlocksQueryOptions(
  args: InferRequestType<typeof client.blocks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetBlocksQueryKey(args),
    queryFn: async () => parseResponse(client.blocks.$get(args, clientOptions)),
  }
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export function createGetMutes(
  args: InferRequestType<typeof client.mutes.$get>,
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
        | InferResponseType<typeof client.mutes.$get>
        | (() => InferResponseType<typeof client.mutes.$get>)
      initialData?:
        | InferResponseType<typeof client.mutes.$get>
        | (() => InferResponseType<typeof client.mutes.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetMutesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.mutes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /mutes
 */
export function getGetMutesQueryKey(args: InferRequestType<typeof client.mutes.$get>) {
  return ['/mutes', args] as const
}

/**
 * Returns Svelte Query query options for GET /mutes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetMutesQueryOptions(
  args: InferRequestType<typeof client.mutes.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetMutesQueryKey(args),
    queryFn: async () => parseResponse(client.mutes.$get(args, clientOptions)),
  }
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export function createGetLists(options?: {
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
      | InferResponseType<typeof client.lists.$get>
      | (() => InferResponseType<typeof client.lists.$get>)
    initialData?:
      | InferResponseType<typeof client.lists.$get>
      | (() => InferResponseType<typeof client.lists.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetListsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.lists.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /lists
 */
export function getGetListsQueryKey() {
  return ['/lists'] as const
}

/**
 * Returns Svelte Query query options for GET /lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetListsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetListsQueryKey(),
    queryFn: async () => parseResponse(client.lists.$get(undefined, clientOptions)),
  }
}

/**
 * POST /lists
 *
 * リスト作成
 */
export function createPostLists(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.lists.$post>,
      variables: InferRequestType<typeof client.lists.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.lists.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.lists.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.lists.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.lists.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.lists.$post>) =>
      parseResponse(client.lists.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export function createGetListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
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
        | InferResponseType<(typeof client.lists)[':listId']['$get']>
        | (() => InferResponseType<(typeof client.lists)[':listId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.lists)[':listId']['$get']>
        | (() => InferResponseType<(typeof client.lists)[':listId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetListsListIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.lists[':listId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /lists/{listId}
 */
export function getGetListsListIdQueryKey(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
) {
  return ['/lists/:listId', args] as const
}

/**
 * Returns Svelte Query query options for GET /lists/{listId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetListsListIdQueryOptions(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetListsListIdQueryKey(args),
    queryFn: async () => parseResponse(client.lists[':listId'].$get(args, clientOptions)),
  }
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export function createPutListsListId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lists)[':listId']['$put']>,
      variables: InferRequestType<(typeof client.lists)[':listId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.lists)[':listId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.lists)[':listId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.lists)[':listId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.lists)[':listId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$put']>) =>
      parseResponse(client.lists[':listId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function createDeleteListsListId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lists)[':listId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.lists)[':listId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.lists)[':listId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.lists)[':listId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.lists)[':listId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.lists)[':listId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$delete']>) =>
      parseResponse(client.lists[':listId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export function createGetListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
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
        | InferResponseType<(typeof client.lists)[':listId']['members']['$get']>
        | (() => InferResponseType<(typeof client.lists)[':listId']['members']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.lists)[':listId']['members']['$get']>
        | (() => InferResponseType<(typeof client.lists)[':listId']['members']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetListsListIdMembersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.lists[':listId'].members.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /lists/{listId}/members
 */
export function getGetListsListIdMembersQueryKey(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
) {
  return ['/lists/:listId/members', args] as const
}

/**
 * Returns Svelte Query query options for GET /lists/{listId}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetListsListIdMembersQueryOptions(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetListsListIdMembersQueryKey(args),
    queryFn: async () => parseResponse(client.lists[':listId'].members.$get(args, clientOptions)),
  }
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export function createPostListsListIdMembers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lists)[':listId']['members']['$post']>,
      variables: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.lists)[':listId']['members']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
    ) => parseResponse(client.lists[':listId'].members.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function createDeleteListsListIdMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.lists)[':listId']['members'][':userId']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lists)[':listId']['members'][':userId']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lists)[':listId']['members'][':userId']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lists)[':listId']['members'][':userId']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
    ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export function createGetListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
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
        | InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>
        | (() => InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>
        | (() => InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetListsListIdTimelineQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.lists[':listId'].timeline.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /lists/{listId}/timeline
 */
export function getGetListsListIdTimelineQueryKey(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
) {
  return ['/lists/:listId/timeline', args] as const
}

/**
 * Returns Svelte Query query options for GET /lists/{listId}/timeline
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetListsListIdTimelineQueryOptions(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetListsListIdTimelineQueryKey(args),
    queryFn: async () => parseResponse(client.lists[':listId'].timeline.$get(args, clientOptions)),
  }
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export function createGetUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
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
        | InferResponseType<(typeof client.users)[':userId']['lists']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['lists']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':userId']['lists']['$get']>
        | (() => InferResponseType<(typeof client.users)[':userId']['lists']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersUserIdListsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':userId'].lists.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/lists
 */
export function getGetUsersUserIdListsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
) {
  return ['/users/:userId/lists', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}/lists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdListsQueryOptions(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdListsQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].lists.$get(args, clientOptions)),
  }
}
