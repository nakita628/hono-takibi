import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export async function getProjects(params: {
  query: {
    page: number
    limit: number
    status: 'active' | 'on_hold' | 'completed' | 'archived'
    search: string
  }
}) {
  return await client.projects.$get({ query: params.query })
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export async function postProjects(body: {
  name: string
  description?: string
  color?: string
  teamId?: string
  startDate?: string
  endDate?: string
}) {
  return await client.projects.$post({ json: body })
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export async function getProjectsProjectId(params: { path: { projectId: string } }) {
  return await client.projects[':projectId'].$get({ param: params.path })
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export async function putProjectsProjectId(
  params: { path: { projectId: string } },
  body: {
    name?: string
    description?: string
    status?: 'active' | 'on_hold' | 'completed' | 'archived'
    color?: string
    startDate?: string
    endDate?: string
  },
) {
  return await client.projects[':projectId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export async function deleteProjectsProjectId(params: { path: { projectId: string } }) {
  return await client.projects[':projectId'].$delete({ param: params.path })
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export async function getProjectsProjectIdMembers(params: { path: { projectId: string } }) {
  return await client.projects[':projectId'].members.$get({ param: params.path })
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export async function postProjectsProjectIdMembers(
  params: { path: { projectId: string } },
  body: { userId: string; role: 'admin' | 'member' | 'viewer' },
) {
  return await client.projects[':projectId'].members.$post({ param: params.path, json: body })
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export async function getProjectsProjectIdTasks(params: {
  path: { projectId: string }
  query: {
    page: number
    limit: number
    status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
    assignee: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
  }
}) {
  return await client.projects[':projectId'].tasks.$get({ param: params.path, query: params.query })
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export async function postProjectsProjectIdTasks(
  params: { path: { projectId: string } },
  body: {
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
  },
) {
  return await client.projects[':projectId'].tasks.$post({ param: params.path, json: body })
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export async function getTasksTaskId(params: { path: { taskId: string } }) {
  return await client.tasks[':taskId'].$get({ param: params.path })
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export async function putTasksTaskId(
  params: { path: { taskId: string } },
  body: {
    title?: string
    description?: string
    status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    assigneeId?: string
    milestoneId?: string
    dueDate?: string
    estimatedHours?: number
    tags?: string[]
  },
) {
  return await client.tasks[':taskId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export async function deleteTasksTaskId(params: { path: { taskId: string } }) {
  return await client.tasks[':taskId'].$delete({ param: params.path })
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export async function patchTasksTaskIdStatus(
  params: { path: { taskId: string } },
  body: { status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' },
) {
  return await client.tasks[':taskId'].status.$patch({ param: params.path, json: body })
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export async function getTasksTaskIdComments(params: { path: { taskId: string } }) {
  return await client.tasks[':taskId'].comments.$get({ param: params.path })
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export async function postTasksTaskIdComments(
  params: { path: { taskId: string } },
  body: { content: string },
) {
  return await client.tasks[':taskId'].comments.$post({ param: params.path, json: body })
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export async function getTasksTaskIdTimeEntries(params: { path: { taskId: string } }) {
  return await client.tasks[':taskId']['time-entries'].$get({ param: params.path })
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export async function postTasksTaskIdTimeEntries(
  params: { path: { taskId: string } },
  body: { description?: string; duration: number; date: string },
) {
  return await client.tasks[':taskId']['time-entries'].$post({ param: params.path, json: body })
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export async function getProjectsProjectIdMilestones(params: { path: { projectId: string } }) {
  return await client.projects[':projectId'].milestones.$get({ param: params.path })
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export async function postProjectsProjectIdMilestones(
  params: { path: { projectId: string } },
  body: { name: string; description?: string; dueDate?: string },
) {
  return await client.projects[':projectId'].milestones.$post({ param: params.path, json: body })
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
export async function postTeams(body: {
  name: string
  description?: string
  memberIds?: string[]
}) {
  return await client.teams.$post({ json: body })
}
