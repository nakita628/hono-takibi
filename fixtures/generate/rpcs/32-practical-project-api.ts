import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export async function getProjects(args: {
  query: {
    page?: number
    limit?: number
    status?: 'active' | 'on_hold' | 'completed' | 'archived'
    search?: string
  }
  options?: ClientRequestOptions
}) {
  return await client.projects.$get(args)
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export async function postProjects(args: {
  json: {
    name: string
    description?: string
    color?: string
    teamId?: string
    startDate?: string
    endDate?: string
  }
  options?: ClientRequestOptions
}) {
  return await client.projects.$post(args)
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export async function getProjectsProjectId(args: {
  param: { projectId: string }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['$get'](args)
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export async function putProjectsProjectId(args: {
  param: { projectId: string }
  json: {
    name?: string
    description?: string
    status?: 'active' | 'on_hold' | 'completed' | 'archived'
    color?: string
    startDate?: string
    endDate?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['$put'](args)
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export async function deleteProjectsProjectId(args: {
  param: { projectId: string }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['$delete'](args)
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export async function getProjectsProjectIdMembers(args: {
  param: { projectId: string }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['members']['$get'](args)
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export async function postProjectsProjectIdMembers(args: {
  param: { projectId: string }
  json: { userId: string; role: 'admin' | 'member' | 'viewer' }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['members']['$post'](args)
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export async function getProjectsProjectIdTasks(args: {
  param: { projectId: string }
  query: {
    page?: number
    limit?: number
    status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
    assignee?: string
    priority?: 'low' | 'medium' | 'high' | 'urgent'
  }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['tasks']['$get'](args)
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export async function postProjectsProjectIdTasks(args: {
  param: { projectId: string }
  json: {
    title: string
    description?: string
    status?: 'todo' | 'in_progress' | 'in_review' | 'done'
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    assigneeId?: string
    milestoneId?: string
    dueDate?: string
    estimatedHours?: number
    tags?: string[]
    subtasks?: { title: string }[]
  }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['tasks']['$post'](args)
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export async function getTasksTaskId(args: {
  param: { taskId: string }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['$get'](args)
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export async function putTasksTaskId(args: {
  param: { taskId: string }
  json: {
    title?: string
    description?: string
    status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    assigneeId?: string
    milestoneId?: string
    dueDate?: string
    estimatedHours?: number
    tags?: string[]
  }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['$put'](args)
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export async function deleteTasksTaskId(args: {
  param: { taskId: string }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['$delete'](args)
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export async function patchTasksTaskIdStatus(args: {
  param: { taskId: string }
  json: { status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['status']['$patch'](args)
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export async function getTasksTaskIdComments(args: {
  param: { taskId: string }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['comments']['$get'](args)
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export async function postTasksTaskIdComments(args: {
  param: { taskId: string }
  json: { content: string }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['comments']['$post'](args)
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export async function getTasksTaskIdTimeEntries(args: {
  param: { taskId: string }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['time-entries']['$get'](args)
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export async function postTasksTaskIdTimeEntries(args: {
  param: { taskId: string }
  json: { description?: string; duration: number; date: string }
  options?: ClientRequestOptions
}) {
  return await client['tasks'][':taskId']['time-entries']['$post'](args)
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export async function getProjectsProjectIdMilestones(args: {
  param: { projectId: string }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['milestones']['$get'](args)
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export async function postProjectsProjectIdMilestones(args: {
  param: { projectId: string }
  json: { name: string; description?: string; dueDate?: string }
  options?: ClientRequestOptions
}) {
  return await client['projects'][':projectId']['milestones']['$post'](args)
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export async function getTeams(args?: { options?: ClientRequestOptions }) {
  return await client.teams.$get(args)
}

/**
 * POST /teams
 *
 * チーム作成
 */
export async function postTeams(args: {
  json: { name: string; description?: string; memberIds?: string[] }
  options?: ClientRequestOptions
}) {
  return await client.teams.$post(args)
}
