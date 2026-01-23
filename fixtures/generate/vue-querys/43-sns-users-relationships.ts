import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}
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
export function useGetUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersByUsernameUsernameQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.users.by.username[':username'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/by/username/{username}
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
export function useGetUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersSearchQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users.search.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/search
 */
export function getGetUsersSearchQueryKey(args: InferRequestType<typeof client.users.search.$get>) {
  return ['/users/search', args] as const
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export function useGetUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersLookupQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users.lookup.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/lookup
 */
export function getGetUsersLookupQueryKey(args: InferRequestType<typeof client.users.lookup.$get>) {
  return ['/users/lookup', args] as const
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export function useGetMe(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.me.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /me
 */
export function getGetMeQueryKey() {
  return ['/me'] as const
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export function usePatchMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.me.$patch> | undefined,
    Error,
    InferRequestType<typeof client.me.$patch>
  >({ mutationFn: async (args) => parseResponse(client.me.$patch(args, clientOptions)) })
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export function usePostMeAvatar(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.me.avatar.$post> | undefined,
    Error,
    InferRequestType<typeof client.me.avatar.$post>
  >({ mutationFn: async (args) => parseResponse(client.me.avatar.$post(args, clientOptions)) })
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export function useDeleteMeAvatar(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.me.avatar.$delete> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.me.avatar.$delete(undefined, clientOptions)),
  })
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export function usePostMeBanner(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.me.banner.$post> | undefined,
    Error,
    InferRequestType<typeof client.me.banner.$post>
  >({ mutationFn: async (args) => parseResponse(client.me.banner.$post(args, clientOptions)) })
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export function useDeleteMeBanner(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.me.banner.$delete> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.me.banner.$delete(undefined, clientOptions)),
  })
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export function usePostUsersUserIdFollow(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['follow']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['follow']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].follow.$post(args, clientOptions)),
  })
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export function useDeleteUsersUserIdFollow(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['follow']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].follow.$delete(args, clientOptions)),
  })
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export function useGetUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdFollowersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].followers.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/followers
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
export function useGetUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdFollowingQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].following.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/following
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
export function usePostUsersUserIdFollowersRemove(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['followers']['remove']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].followers.remove.$post(args, clientOptions)),
  })
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export function useGetRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetRelationshipsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.relationships.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /relationships
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
export function useGetFollowRequests(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFollowRequestsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['follow-requests'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /follow-requests
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
export function usePostFollowRequestsUserIdAccept(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['follow-requests'][':userId']['accept']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['follow-requests'][':userId'].accept.$post(args, clientOptions)),
  })
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export function usePostFollowRequestsUserIdReject(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['follow-requests'][':userId']['reject']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['follow-requests'][':userId'].reject.$post(args, clientOptions)),
  })
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export function usePostUsersUserIdBlock(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['block']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['block']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].block.$post(args, clientOptions)),
  })
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export function useDeleteUsersUserIdBlock(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['block']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['block']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].block.$delete(args, clientOptions)),
  })
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export function usePostUsersUserIdMute(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['mute']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['mute']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].mute.$post(args, clientOptions)),
  })
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export function useDeleteUsersUserIdMute(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['mute']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users[':userId'].mute.$delete(args, clientOptions)),
  })
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export function useGetBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetBlocksQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.blocks.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /blocks
 */
export function getGetBlocksQueryKey(args: InferRequestType<typeof client.blocks.$get>) {
  return ['/blocks', args] as const
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export function useGetMutes(
  args: InferRequestType<typeof client.mutes.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetMutesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.mutes.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /mutes
 */
export function getGetMutesQueryKey(args: InferRequestType<typeof client.mutes.$get>) {
  return ['/mutes', args] as const
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export function useGetLists(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetListsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.lists.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists
 */
export function getGetListsQueryKey() {
  return ['/lists'] as const
}

/**
 * POST /lists
 *
 * リスト作成
 */
export function usePostLists(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.lists.$post> | undefined,
    Error,
    InferRequestType<typeof client.lists.$post>
  >({ mutationFn: async (args) => parseResponse(client.lists.$post(args, clientOptions)) })
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export function useGetListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetListsListIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.lists[':listId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists/{listId}
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
export function usePutListsListId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.lists)[':listId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.lists)[':listId']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.lists[':listId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export function useDeleteListsListId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.lists)[':listId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.lists)[':listId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.lists[':listId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export function useGetListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetListsListIdMembersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.lists[':listId'].members.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists/{listId}/members
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
export function usePostListsListIdMembers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.lists)[':listId']['members']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.lists)[':listId']['members']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lists[':listId'].members.$post(args, clientOptions)),
  })
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export function useDeleteListsListIdMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lists[':listId'].members[':userId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export function useGetListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetListsListIdTimelineQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.lists[':listId'].timeline.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lists/{listId}/timeline
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
export function useGetUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdListsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].lists.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}/lists
 */
export function getGetUsersUserIdListsQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
) {
  return ['/users/:userId/lists', args] as const
}
