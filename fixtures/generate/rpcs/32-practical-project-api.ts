import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export async function getProjects(arg: {
  query: {
    page?: number
    limit?: number
    status?: 'active' | 'on_hold' | 'completed' | 'archived'
    search?: string
  }
}) {
  return await client.projects.$get(arg)
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export async function postProjects(arg: {
  json: {
    name: string
    description?: string
    color?: string
    teamId?: string
    startDate?: string
    endDate?: string
  }
}) {
  return await client.projects.$post(arg)
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export async function getProjectsProjectId(arg: { param: { projectId: string } }) {
  return await client['projects'][':projectId']['$get'](arg)
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export async function putProjectsProjectId(arg: {
  param: { projectId: string }
  json: {
    name?: string
    description?: string
    status?: 'active' | 'on_hold' | 'completed' | 'archived'
    color?: string
    startDate?: string
    endDate?: string
  }
}) {
  return await client['projects'][':projectId']['$put'](arg)
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export async function deleteProjectsProjectId(arg: { param: { projectId: string } }) {
  return await client['projects'][':projectId']['$delete'](arg)
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export async function getProjectsProjectIdMembers(arg: { param: { projectId: string } }) {
  return await client['projects'][':projectId']['members']['$get'](arg)
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export async function postProjectsProjectIdMembers(arg: {
  param: { projectId: string }
  json: { userId: string; role: 'admin' | 'member' | 'viewer' }
}) {
  return await client['projects'][':projectId']['members']['$post'](arg)
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export async function getProjectsProjectIdTasks(arg: {
  param: { projectId: string }
  query: {
    page?: number
    limit?: number
    status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
    assignee?: string
    priority?: 'low' | 'medium' | 'high' | 'urgent'
  }
}) {
  return await client['projects'][':projectId']['tasks']['$get'](arg)
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export async function postProjectsProjectIdTasks(arg: {
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
}) {
  return await client['projects'][':projectId']['tasks']['$post'](arg)
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export async function getTasksTaskId(arg: { param: { taskId: string } }) {
  return await client['tasks'][':taskId']['$get'](arg)
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export async function putTasksTaskId(arg: {
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
}) {
  return await client['tasks'][':taskId']['$put'](arg)
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export async function deleteTasksTaskId(arg: { param: { taskId: string } }) {
  return await client['tasks'][':taskId']['$delete'](arg)
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export async function patchTasksTaskIdStatus(arg: {
  param: { taskId: string }
  json: { status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' }
}) {
  return await client['tasks'][':taskId']['status']['$patch'](arg)
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export async function getTasksTaskIdComments(arg: { param: { taskId: string } }) {
  return await client['tasks'][':taskId']['comments']['$get'](arg)
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export async function postTasksTaskIdComments(arg: {
  param: { taskId: string }
  json: { content: string }
}) {
  return await client['tasks'][':taskId']['comments']['$post'](arg)
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export async function getTasksTaskIdTimeEntries(arg: { param: { taskId: string } }) {
  return await client['tasks'][':taskId']['time-entries']['$get'](arg)
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export async function postTasksTaskIdTimeEntries(arg: {
  param: { taskId: string }
  json: { description?: string; duration: number; date: string }
}) {
  return await client['tasks'][':taskId']['time-entries']['$post'](arg)
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export async function getProjectsProjectIdMilestones(arg: { param: { projectId: string } }) {
  return await client['projects'][':projectId']['milestones']['$get'](arg)
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export async function postProjectsProjectIdMilestones(arg: {
  param: { projectId: string }
  json: { name: string; description?: string; dueDate?: string }
}) {
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
export async function postTeams(arg: {
  json: { name: string; description?: string; memberIds?: string[] }
}) {
  return await client.teams.$post(arg)
}
