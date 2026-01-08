import type { InferRequestType } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export async function getProjects(arg: InferRequestType<typeof client.projects.$get>) {
  return await client.projects.$get(arg)
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export async function postProjects(arg: InferRequestType<typeof client.projects.$post>) {
  return await client.projects.$post(arg)
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export async function getProjectsProjectId(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['$get']>,
) {
  return await client['projects'][':projectId']['$get'](arg)
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export async function putProjectsProjectId(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['$put']>,
) {
  return await client['projects'][':projectId']['$put'](arg)
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export async function deleteProjectsProjectId(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['$delete']>,
) {
  return await client['projects'][':projectId']['$delete'](arg)
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export async function getProjectsProjectIdMembers(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['members']['$get']>,
) {
  return await client['projects'][':projectId']['members']['$get'](arg)
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export async function postProjectsProjectIdMembers(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['members']['$post']>,
) {
  return await client['projects'][':projectId']['members']['$post'](arg)
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export async function getProjectsProjectIdTasks(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['tasks']['$get']>,
) {
  return await client['projects'][':projectId']['tasks']['$get'](arg)
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export async function postProjectsProjectIdTasks(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['tasks']['$post']>,
) {
  return await client['projects'][':projectId']['tasks']['$post'](arg)
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export async function getTasksTaskId(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['$get']>,
) {
  return await client['tasks'][':taskId']['$get'](arg)
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export async function putTasksTaskId(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['$put']>,
) {
  return await client['tasks'][':taskId']['$put'](arg)
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export async function deleteTasksTaskId(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['$delete']>,
) {
  return await client['tasks'][':taskId']['$delete'](arg)
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export async function patchTasksTaskIdStatus(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['status']['$patch']>,
) {
  return await client['tasks'][':taskId']['status']['$patch'](arg)
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export async function getTasksTaskIdComments(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['comments']['$get']>,
) {
  return await client['tasks'][':taskId']['comments']['$get'](arg)
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export async function postTasksTaskIdComments(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['comments']['$post']>,
) {
  return await client['tasks'][':taskId']['comments']['$post'](arg)
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export async function getTasksTaskIdTimeEntries(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['time-entries']['$get']>,
) {
  return await client['tasks'][':taskId']['time-entries']['$get'](arg)
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export async function postTasksTaskIdTimeEntries(
  arg: InferRequestType<(typeof client)['tasks'][':taskId']['time-entries']['$post']>,
) {
  return await client['tasks'][':taskId']['time-entries']['$post'](arg)
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export async function getProjectsProjectIdMilestones(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['milestones']['$get']>,
) {
  return await client['projects'][':projectId']['milestones']['$get'](arg)
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export async function postProjectsProjectIdMilestones(
  arg: InferRequestType<(typeof client)['projects'][':projectId']['milestones']['$post']>,
) {
  return await client['projects'][':projectId']['milestones']['$post'](arg)
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export async function getTeams() {
  return await client.teams.$get()
}

/**
 * POST /teams
 *
 * チーム作成
 */
export async function postTeams(arg: InferRequestType<typeof client.teams.$post>) {
  return await client.teams.$post(arg)
}
