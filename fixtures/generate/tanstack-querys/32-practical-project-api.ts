import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export function useGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.projects.$get>,
      Error,
      InferResponseType<typeof client.projects.$get>,
      readonly ['/projects', InferRequestType<typeof client.projects.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function usePostProjects(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.projects.$post>) =>
        parseResponse(client.projects.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export function useGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['$get']>,
      Error,
      InferResponseType<(typeof client.projects)[':projectId']['$get']>,
      readonly [
        '/projects/:projectId',
        InferRequestType<(typeof client.projects)[':projectId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}
 */
export function getGetProjectsProjectIdQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['/projects/:projectId', args] as const
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function usePutProjectsProjectId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.projects)[':projectId']['$put']>) =>
        parseResponse(client.projects[':projectId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function useDeleteProjectsProjectId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
      ) => parseResponse(client.projects[':projectId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export function useGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>,
      Error,
      InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>,
      readonly [
        '/projects/:projectId/members',
        InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdMembersQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}/members
 */
export function getGetProjectsProjectIdMembersQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['/projects/:projectId/members', args] as const
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function usePostProjectsProjectIdMembers(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
      ) => parseResponse(client.projects[':projectId'].members.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export function useGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>,
      Error,
      InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>,
      readonly [
        '/projects/:projectId/tasks',
        InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdTasksQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}/tasks
 */
export function getGetProjectsProjectIdTasksQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['/projects/:projectId/tasks', args] as const
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function usePostProjectsProjectIdTasks(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
      ) => parseResponse(client.projects[':projectId'].tasks.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export function useGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['$get']>,
      Error,
      InferResponseType<(typeof client.tasks)[':taskId']['$get']>,
      readonly ['/tasks/:taskId', InferRequestType<(typeof client.tasks)[':taskId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /tasks/{taskId}
 */
export function getGetTasksTaskIdQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['/tasks/:taskId', args] as const
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function usePutTasksTaskId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>) =>
        parseResponse(client.tasks[':taskId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function useDeleteTasksTaskId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>) =>
        parseResponse(client.tasks[':taskId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function usePatchTasksTaskIdStatus(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
      ) => parseResponse(client.tasks[':taskId'].status.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export function useGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>,
      Error,
      InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>,
      readonly [
        '/tasks/:taskId/comments',
        InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdCommentsQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /tasks/{taskId}/comments
 */
export function getGetTasksTaskIdCommentsQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['/tasks/:taskId/comments', args] as const
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function usePostTasksTaskIdComments(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
      ) => parseResponse(client.tasks[':taskId'].comments.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export function useGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
      Error,
      InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
      readonly [
        '/tasks/:taskId/time-entries',
        InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdTimeEntriesQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /tasks/{taskId}/time-entries
 */
export function getGetTasksTaskIdTimeEntriesQueryKey(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['/tasks/:taskId/time-entries', args] as const
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function usePostTasksTaskIdTimeEntries(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
      ) => parseResponse(client.tasks[':taskId']['time-entries'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export function useGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>,
      Error,
      InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>,
      readonly [
        '/projects/:projectId/milestones',
        InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdMilestonesQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}/milestones
 */
export function getGetProjectsProjectIdMilestonesQueryKey(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['/projects/:projectId/milestones', args] as const
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function usePostProjectsProjectIdMilestones(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
      ) => parseResponse(client.projects[':projectId'].milestones.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export function useGetTeams(
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.teams.$get>,
      Error,
      InferResponseType<typeof client.teams.$get>,
      readonly ['/teams']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTeamsQueryKey()
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.teams.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /teams
 */
export function getGetTeamsQueryKey() {
  return ['/teams'] as const
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function usePostTeams(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return useMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.teams.$post>) =>
        parseResponse(client.teams.$post(args, options?.client)),
    },
    queryClient,
  )
}
