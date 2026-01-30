import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export async function getProjects(
  args: InferRequestType<typeof client.projects.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects.$get(args, options))
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export async function postProjects(
  args: InferRequestType<typeof client.projects.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects.$post(args, options))
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export async function getProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].$get(args, options))
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export async function putProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].$put(args, options))
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export async function deleteProjectsProjectId(
  args: InferRequestType<(typeof client.projects)[':projectId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].$delete(args, options))
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export async function getProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].members.$get(args, options))
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export async function postProjectsProjectIdMembers(
  args: InferRequestType<(typeof client.projects)[':projectId']['members']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].members.$post(args, options))
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export async function getProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].tasks.$get(args, options))
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export async function postProjectsProjectIdTasks(
  args: InferRequestType<(typeof client.projects)[':projectId']['tasks']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].tasks.$post(args, options))
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export async function getTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId'].$get(args, options))
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export async function putTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId'].$put(args, options))
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export async function deleteTasksTaskId(
  args: InferRequestType<(typeof client.tasks)[':taskId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId'].$delete(args, options))
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export async function patchTasksTaskIdStatus(
  args: InferRequestType<(typeof client.tasks)[':taskId']['status']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId'].status.$patch(args, options))
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export async function getTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId'].comments.$get(args, options))
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export async function postTasksTaskIdComments(
  args: InferRequestType<(typeof client.tasks)[':taskId']['comments']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId'].comments.$post(args, options))
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export async function getTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId']['time-entries'].$get(args, options))
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export async function postTasksTaskIdTimeEntries(
  args: InferRequestType<(typeof client.tasks)[':taskId']['time-entries']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tasks[':taskId']['time-entries'].$post(args, options))
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export async function getProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].milestones.$get(args, options))
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export async function postProjectsProjectIdMilestones(
  args: InferRequestType<(typeof client.projects)[':projectId']['milestones']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.projects[':projectId'].milestones.$post(args, options))
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export async function getTeams(options?: ClientRequestOptions) {
  return await parseResponse(client.teams.$get(undefined, options))
}

/**
 * POST /teams
 *
 * チーム作成
 */
export async function postTeams(
  args: InferRequestType<typeof client.teams.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.teams.$post(args, options))
}
