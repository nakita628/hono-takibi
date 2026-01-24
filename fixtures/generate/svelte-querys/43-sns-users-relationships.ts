import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      readonly ['/users/:userId', InferRequestType<(typeof client.users)[':userId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export function createGetUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users.by.username)[':username']['$get']>,
      Error,
      InferResponseType<(typeof client.users.by.username)[':username']['$get']>,
      readonly [
        '/users/by/username/:username',
        InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersByUsernameUsernameQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users.by.username[':username'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /users/search
 *
 * ユーザー検索
 */
export function createGetUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.search.$get>,
      Error,
      InferResponseType<typeof client.users.search.$get>,
      readonly ['/users/search', InferRequestType<typeof client.users.search.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersSearchQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.search.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/search
 */
export function getGetUsersSearchQueryKey(args: InferRequestType<typeof client.users.search.$get>) {
  return ['/users/search', args] as const
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export function createGetUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.users.lookup.$get>,
      Error,
      InferResponseType<typeof client.users.lookup.$get>,
      readonly ['/users/lookup', InferRequestType<typeof client.users.lookup.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersLookupQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.lookup.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/lookup
 */
export function getGetUsersLookupQueryKey(args: InferRequestType<typeof client.users.lookup.$get>) {
  return ['/users/lookup', args] as const
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export function createGetMe(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.me.$get>,
      Error,
      InferResponseType<typeof client.me.$get>,
      readonly ['/me']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me
 */
export function getGetMeQueryKey() {
  return ['/me'] as const
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export function createPatchMe(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.me.$patch>) =>
        parseResponse(client.me.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function createPostMeAvatar(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.me.avatar.$post>) =>
        parseResponse(client.me.avatar.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function createDeleteMeAvatar(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    { mutationFn: async () => parseResponse(client.me.avatar.$delete(undefined, options?.client)) },
    queryClient,
  )
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function createPostMeBanner(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.me.banner.$post>) =>
        parseResponse(client.me.banner.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function createDeleteMeBanner(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    { mutationFn: async () => parseResponse(client.me.banner.$delete(undefined, options?.client)) },
    queryClient,
  )
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function createPostUsersUserIdFollow(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
      ) => parseResponse(client.users[':userId'].follow.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function createDeleteUsersUserIdFollow(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
      ) => parseResponse(client.users[':userId'].follow.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export function createGetUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['followers']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['followers']['$get']>,
      readonly [
        '/users/:userId/followers',
        InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdFollowersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users[':userId'].followers.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export function createGetUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['following']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['following']['$get']>,
      readonly [
        '/users/:userId/following',
        InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdFollowingQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users[':userId'].following.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export function createPostUsersUserIdFollowersRemove(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
      ) => parseResponse(client.users[':userId'].followers.remove.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export function createGetRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.relationships.$get>,
      Error,
      InferResponseType<typeof client.relationships.$get>,
      readonly ['/relationships', InferRequestType<typeof client.relationships.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetRelationshipsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.relationships.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export function createGetFollowRequests(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['follow-requests']['$get']>,
      Error,
      InferResponseType<(typeof client)['follow-requests']['$get']>,
      readonly ['/follow-requests', InferRequestType<(typeof client)['follow-requests']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFollowRequestsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['follow-requests'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export function createPostFollowRequestsUserIdAccept(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
      ) => parseResponse(client['follow-requests'][':userId'].accept.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function createPostFollowRequestsUserIdReject(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
      ) => parseResponse(client['follow-requests'][':userId'].reject.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function createPostUsersUserIdBlock(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
      ) => parseResponse(client.users[':userId'].block.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function createDeleteUsersUserIdBlock(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
      ) => parseResponse(client.users[':userId'].block.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function createPostUsersUserIdMute(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>,
      ) => parseResponse(client.users[':userId'].mute.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function createDeleteUsersUserIdMute(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
      ) => parseResponse(client.users[':userId'].mute.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export function createGetBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.blocks.$get>,
      Error,
      InferResponseType<typeof client.blocks.$get>,
      readonly ['/blocks', InferRequestType<typeof client.blocks.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBlocksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.blocks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /blocks
 */
export function getGetBlocksQueryKey(args: InferRequestType<typeof client.blocks.$get>) {
  return ['/blocks', args] as const
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export function createGetMutes(
  args: InferRequestType<typeof client.mutes.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.mutes.$get>,
      Error,
      InferResponseType<typeof client.mutes.$get>,
      readonly ['/mutes', InferRequestType<typeof client.mutes.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMutesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.mutes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /mutes
 */
export function getGetMutesQueryKey(args: InferRequestType<typeof client.mutes.$get>) {
  return ['/mutes', args] as const
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export function createGetLists(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.lists.$get>,
      Error,
      InferResponseType<typeof client.lists.$get>,
      readonly ['/lists']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetListsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.lists.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /lists
 */
export function getGetListsQueryKey() {
  return ['/lists'] as const
}

/**
 * POST /lists
 *
 * リスト作成
 */
export function createPostLists(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.lists.$post>) =>
        parseResponse(client.lists.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export function createGetListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.lists)[':listId']['$get']>,
      Error,
      InferResponseType<(typeof client.lists)[':listId']['$get']>,
      readonly ['/lists/:listId', InferRequestType<(typeof client.lists)[':listId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetListsListIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.lists[':listId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export function createPutListsListId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$put']>) =>
        parseResponse(client.lists[':listId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function createDeleteListsListId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.lists)[':listId']['$delete']>) =>
        parseResponse(client.lists[':listId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export function createGetListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.lists)[':listId']['members']['$get']>,
      Error,
      InferResponseType<(typeof client.lists)[':listId']['members']['$get']>,
      readonly [
        '/lists/:listId/members',
        InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetListsListIdMembersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.lists[':listId'].members.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export function createPostListsListIdMembers(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
      ) => parseResponse(client.lists[':listId'].members.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function createDeleteListsListIdMembersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
      ) => parseResponse(client.lists[':listId'].members[':userId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export function createGetListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>,
      Error,
      InferResponseType<(typeof client.lists)[':listId']['timeline']['$get']>,
      readonly [
        '/lists/:listId/timeline',
        InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetListsListIdTimelineQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.lists[':listId'].timeline.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export function createGetUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['lists']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['lists']['$get']>,
      readonly [
        '/users/:userId/lists',
        InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdListsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].lists.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}/lists
 */
export function getGetUsersUserIdListsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
) {
  return ['/users/:userId/lists', args] as const
}
