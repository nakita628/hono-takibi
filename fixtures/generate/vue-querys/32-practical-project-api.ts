import { useQuery, useMutation } from '@tanstack/vue-query'
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProjectsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.projects.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects
 */
export function getGetProjectsQueryKey(args: InferRequestType<typeof client.projects.$get>) {
  return ['/projects', args] as const
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export function usePostProjects(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.projects.$post> | undefined,
    Error,
    InferRequestType<typeof client.projects.$post>
  >({ mutationFn: async (args) => parseResponse(client.projects.$post(args, clientOptions)) })
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export function useGetProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProjectsProjectIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.projects[':projectId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}
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
export function usePutProjectsProjectId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.projects[':projectId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export function useDeleteProjectsProjectId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.projects[':projectId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export function useGetProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProjectsProjectIdMembersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].members.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/members
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
export function usePostProjectsProjectIdMembers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['members']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.projects[':projectId'].members.$post(args, clientOptions)),
  })
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export function useGetProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProjectsProjectIdTasksQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].tasks.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/tasks
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
export function usePostProjectsProjectIdTasks(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['tasks']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.projects[':projectId'].tasks.$post(args, clientOptions)),
  })
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export function useGetTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTasksTaskIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.tasks[':taskId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}
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
export function usePutTasksTaskId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['$put']>
  >({
    mutationFn: async (args) => parseResponse(client.tasks[':taskId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export function useDeleteTasksTaskId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.tasks[':taskId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export function usePatchTasksTaskIdStatus(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['status']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.tasks[':taskId'].status.$patch(args, clientOptions)),
  })
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export function useGetTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTasksTaskIdCommentsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.tasks[':taskId'].comments.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}/comments
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
export function usePostTasksTaskIdComments(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['comments']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.tasks[':taskId'].comments.$post(args, clientOptions)),
  })
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export function useGetTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTasksTaskIdTimeEntriesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.tasks[':taskId']['time-entries'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /tasks/{taskId}/time-entries
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
export function usePostTasksTaskIdTimeEntries(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.tasks)[':taskId']['time-entries']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.tasks[':taskId']['time-entries'].$post(args, clientOptions)),
  })
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export function useGetProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProjectsProjectIdMilestonesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.projects[':projectId'].milestones.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /projects/{projectId}/milestones
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
export function usePostProjectsProjectIdMilestones(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.projects)[':projectId']['milestones']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.projects[':projectId'].milestones.$post(args, clientOptions)),
  })
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export function useGetTeams(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetTeamsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.teams.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /teams
 */
export function getGetTeamsQueryKey() {
  return ['/teams'] as const
}

/**
 * POST /teams
 *
 * チーム作成
 */
export function usePostTeams(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.teams.$post> | undefined,
    Error,
    InferRequestType<typeof client.teams.$post>
  >({ mutationFn: async (args) => parseResponse(client.teams.$post(args, clientOptions)) })
}
