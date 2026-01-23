import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export function createGetProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.projects.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args?: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', ...(args ? [args] : [])] as const
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function createPostProjects(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.projects.$post> | undefined,
      Error,
      InferRequestType<typeof client.projects.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /projects/{projectId}
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
export function createPutProjectsProjectId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteProjectsProjectId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['members']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdMembersQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /projects/{projectId}/members
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
export function createPostProjectsProjectIdMembers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['members']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['tasks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdTasksQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /projects/{projectId}/tasks
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
export function createPostProjectsProjectIdTasks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.tasks)[':taskId']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /tasks/{taskId}
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
export function createPutTasksTaskId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteTasksTaskId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchTasksTaskIdStatus(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['comments']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdCommentsQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /tasks/{taskId}/comments
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
export function createPostTasksTaskIdComments(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTasksTaskIdTimeEntriesQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /tasks/{taskId}/time-entries
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
export function createPostTasksTaskIdTimeEntries(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.projects)[':projectId']['milestones']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetProjectsProjectIdMilestonesQueryKey(args)
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /projects/{projectId}/milestones
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
export function createPostProjectsProjectIdMilestones(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetTeams(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.teams.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTeamsQueryKey()
  const query = createQuery(
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
 * Generates Svelte Query cache key for GET /teams
 */
export function getGetTeamsQueryKey() {
  return ['/teams'] as const
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function createPostTeams(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.teams.$post> | undefined,
      Error,
      InferRequestType<typeof client.teams.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
