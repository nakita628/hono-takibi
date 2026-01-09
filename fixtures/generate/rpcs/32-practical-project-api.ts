import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/32-practical-project-api'

/**
 * GET /projects
 *
 * プロジェクト一覧取得
 */
export async function getProjects(
  args: {
    query: {
      page?: number
      limit?: number
      status?: 'active' | 'on_hold' | 'completed' | 'archived'
      search?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.projects.$get(args, options)
}

/**
 * POST /projects
 *
 * プロジェクト作成
 */
export async function postProjects(
  args: {
    json: {
      name: string
      description?: string
      color?: string
      teamId?: string
      startDate?: string
      endDate?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.projects.$post(args, options)
}

/**
 * GET /projects/{projectId}
 *
 * プロジェクト詳細取得
 */
export async function getProjectsProjectId(
  args: { param: { projectId: string } },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['$get'](args, options)
}

/**
 * PUT /projects/{projectId}
 *
 * プロジェクト更新
 */
export async function putProjectsProjectId(
  args: {
    param: { projectId: string }
    json: {
      name?: string
      description?: string
      status?: 'active' | 'on_hold' | 'completed' | 'archived'
      color?: string
      startDate?: string
      endDate?: string
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['$put'](args, options)
}

/**
 * DELETE /projects/{projectId}
 *
 * プロジェクト削除
 */
export async function deleteProjectsProjectId(
  args: { param: { projectId: string } },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['$delete'](args, options)
}

/**
 * GET /projects/{projectId}/members
 *
 * プロジェクトメンバー一覧
 */
export async function getProjectsProjectIdMembers(
  args: { param: { projectId: string } },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['members']['$get'](args, options)
}

/**
 * POST /projects/{projectId}/members
 *
 * メンバー追加
 */
export async function postProjectsProjectIdMembers(
  args: {
    param: { projectId: string }
    json: { userId: string; role: 'admin' | 'member' | 'viewer' }
  },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['members']['$post'](args, options)
}

/**
 * GET /projects/{projectId}/tasks
 *
 * プロジェクトのタスク一覧
 */
export async function getProjectsProjectIdTasks(
  args: {
    param: { projectId: string }
    query: {
      page?: number
      limit?: number
      status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
      assignee?: string
      priority?: 'low' | 'medium' | 'high' | 'urgent'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['tasks']['$get'](args, options)
}

/**
 * POST /projects/{projectId}/tasks
 *
 * タスク作成
 */
export async function postProjectsProjectIdTasks(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['tasks']['$post'](args, options)
}

/**
 * GET /tasks/{taskId}
 *
 * タスク詳細取得
 */
export async function getTasksTaskId(
  args: { param: { taskId: string } },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['$get'](args, options)
}

/**
 * PUT /tasks/{taskId}
 *
 * タスク更新
 */
export async function putTasksTaskId(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['$put'](args, options)
}

/**
 * DELETE /tasks/{taskId}
 *
 * タスク削除
 */
export async function deleteTasksTaskId(
  args: { param: { taskId: string } },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['$delete'](args, options)
}

/**
 * PATCH /tasks/{taskId}/status
 *
 * タスクステータス更新
 */
export async function patchTasksTaskIdStatus(
  args: {
    param: { taskId: string }
    json: { status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' }
  },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['status']['$patch'](args, options)
}

/**
 * GET /tasks/{taskId}/comments
 *
 * タスクコメント一覧
 */
export async function getTasksTaskIdComments(
  args: { param: { taskId: string } },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['comments']['$get'](args, options)
}

/**
 * POST /tasks/{taskId}/comments
 *
 * コメント追加
 */
export async function postTasksTaskIdComments(
  args: { param: { taskId: string }; json: { content: string } },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['comments']['$post'](args, options)
}

/**
 * GET /tasks/{taskId}/time-entries
 *
 * 時間記録一覧
 */
export async function getTasksTaskIdTimeEntries(
  args: { param: { taskId: string } },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['time-entries']['$get'](args, options)
}

/**
 * POST /tasks/{taskId}/time-entries
 *
 * 時間記録作成
 */
export async function postTasksTaskIdTimeEntries(
  args: {
    param: { taskId: string }
    json: { description?: string; duration: number; date: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['tasks'][':taskId']['time-entries']['$post'](args, options)
}

/**
 * GET /projects/{projectId}/milestones
 *
 * マイルストーン一覧
 */
export async function getProjectsProjectIdMilestones(
  args: { param: { projectId: string } },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['milestones']['$get'](args, options)
}

/**
 * POST /projects/{projectId}/milestones
 *
 * マイルストーン作成
 */
export async function postProjectsProjectIdMilestones(
  args: {
    param: { projectId: string }
    json: { name: string; description?: string; dueDate?: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['projects'][':projectId']['milestones']['$post'](args, options)
}

/**
 * GET /teams
 *
 * チーム一覧取得
 */
export async function getTeams(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.teams.$get(args, options)
}

/**
 * POST /teams
 *
 * チーム作成
 */
export async function postTeams(
  args: { json: { name: string; description?: string; memberIds?: string[] } },
  options?: ClientRequestOptions,
) {
  return await client.teams.$post(args, options)
}
