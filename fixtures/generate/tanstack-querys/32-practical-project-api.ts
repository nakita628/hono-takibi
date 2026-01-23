import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.projects.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args?: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', ...(args ? [args] : [])] as const
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function usePostProjects(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.projects.$post> | undefined,
      Error,
      InferRequestType<typeof client.projects.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.projects.$post> | undefined,
    Error,
    InferRequestType<typeof client.projects.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.projects.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.projects)[':projectId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}
 */
export function getGetProjectsProjectIdQueryKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
) {
  return ['/projects/:projectId', ...(args ? [args] : [])] as const
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export function usePutProjectsProjectId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.projects[':projectId'].$delete(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdMembersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}/members
 */
export function getGetProjectsProjectIdMembersQueryKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
) {
  return ['/projects/:projectId/members', ...(args ? [args] : [])] as const
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export function usePostProjectsProjectIdMembers(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['members']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['members']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.projects[':projectId'].members.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdTasksQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}/tasks
 */
export function getGetProjectsProjectIdTasksQueryKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
) {
  return ['/projects/:projectId/tasks', ...(args ? [args] : [])] as const
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export function usePostProjectsProjectIdTasks(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.projects[':projectId'].tasks.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.tasks)[':taskId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /tasks/{taskId}
 */
export function getGetTasksTaskIdQueryKey(
  args?: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
) {
  return ['/tasks/:taskId', ...(args ? [args] : [])] as const
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export function usePutTasksTaskId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.tasks[':taskId'].status.$patch(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdCommentsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /tasks/{taskId}/comments
 */
export function getGetTasksTaskIdCommentsQueryKey(
  args?: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
) {
  return ['/tasks/:taskId/comments', ...(args ? [args] : [])] as const
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export function usePostTasksTaskIdComments(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.tasks[':taskId'].comments.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdTimeEntriesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /tasks/{taskId}/time-entries
 */
export function getGetTasksTaskIdTimeEntriesQueryKey(
  args?: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
) {
  return ['/tasks/:taskId/time-entries', ...(args ? [args] : [])] as const
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export function usePostTasksTaskIdTimeEntries(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.tasks[':taskId']['time-entries'].$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdMilestonesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /projects/{projectId}/milestones
 */
export function getGetProjectsProjectIdMilestonesQueryKey(
  args?: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
) {
  return ['/projects/:projectId/milestones', ...(args ? [args] : [])] as const
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export function usePostProjectsProjectIdMilestones(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.projects[':projectId'].milestones.$post(args, options?.client)),
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.teams.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTeamsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.teams.$get(undefined, clientOptions)),
      ...queryOptions,
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
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.teams.$post> | undefined,
      Error,
      InferRequestType<typeof client.teams.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.teams.$post> | undefined,
    Error,
    InferRequestType<typeof client.teams.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.teams.$post(args, options?.client)),
    },
    queryClient,
  )
}
