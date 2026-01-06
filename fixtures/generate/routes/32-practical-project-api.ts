import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({ id: z.uuid(), name: z.string(), email: z.email(), avatarUrl: z.url().exactOptional() })
  .openapi({ required: ['id', 'name', 'email'] })
  .openapi('User')

const TeamSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    members: z.array(UserSchema).exactOptional(),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .openapi('Team')

const ProjectSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    status: z.enum(['active', 'on_hold', 'completed', 'archived']),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
    owner: UserSchema.exactOptional(),
    team: TeamSchema.exactOptional(),
    startDate: z.iso.date().exactOptional(),
    endDate: z.iso.date().exactOptional(),
    taskCount: z.int().exactOptional(),
    completedTaskCount: z.int().exactOptional(),
    progress: z.number().min(0).max(100).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'status', 'createdAt'] })
  .openapi('Project')

const ProjectSummarySchema = z
  .object({ id: z.uuid(), name: z.string(), color: z.string().exactOptional() })
  .openapi({ required: ['id', 'name'] })
  .openapi('ProjectSummary')

const MilestoneSummarySchema = z
  .object({ id: z.uuid(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('MilestoneSummary')

const AttachmentSchema = z
  .object({
    id: z.uuid(),
    filename: z.string(),
    url: z.url(),
    mimeType: z.string().exactOptional(),
    filesize: z.int().exactOptional(),
    uploadedBy: UserSchema.exactOptional(),
    uploadedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'filename', 'url'] })
  .openapi('Attachment')

const SubtaskSchema = z
  .object({ id: z.uuid(), title: z.string(), completed: z.boolean() })
  .openapi({ required: ['id', 'title', 'completed'] })
  .openapi('Subtask')

const TaskSchema = z
  .object({
    id: z.uuid(),
    title: z.string(),
    description: z.string().exactOptional(),
    status: z.enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    project: ProjectSummarySchema.exactOptional(),
    assignee: UserSchema.exactOptional(),
    reporter: UserSchema.exactOptional(),
    milestone: MilestoneSummarySchema.exactOptional(),
    dueDate: z.iso.date().exactOptional(),
    estimatedHours: z.number().exactOptional(),
    actualHours: z.number().exactOptional(),
    tags: z.array(z.string()).exactOptional(),
    attachments: z.array(AttachmentSchema).exactOptional(),
    subtasks: z.array(SubtaskSchema).exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'title', 'status', 'priority', 'createdAt'] })
  .openapi('Task')

const MilestoneSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    status: z.enum(['open', 'closed']),
    dueDate: z.iso.date().exactOptional(),
    taskCount: z.int().exactOptional(),
    completedTaskCount: z.int().exactOptional(),
    progress: z.number().min(0).max(100).exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'status'] })
  .openapi('Milestone')

const ProjectMemberSchema = z
  .object({
    user: UserSchema,
    role: z.enum(['owner', 'admin', 'member', 'viewer']),
    joinedAt: z.iso.datetime(),
  })
  .openapi({ required: ['user', 'role', 'joinedAt'] })
  .openapi('ProjectMember')

const TaskCommentSchema = z
  .object({
    id: z.uuid(),
    content: z.string(),
    author: UserSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'content', 'author', 'createdAt'] })
  .openapi('TaskComment')

const TimeEntrySchema = z
  .object({
    id: z.uuid(),
    description: z.string().exactOptional(),
    duration: z.int().openapi({ description: '時間（分）' }),
    date: z.iso.date(),
    user: UserSchema,
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'duration', 'date', 'user'] })
  .openapi('TimeEntry')

const CreateProjectRequestSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
    teamId: z.uuid().exactOptional(),
    startDate: z.iso.date().exactOptional(),
    endDate: z.iso.date().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateProjectRequest')

const UpdateProjectRequestSchema = z
  .object({
    name: z.string().min(1).max(200).exactOptional(),
    description: z.string().exactOptional(),
    status: z.enum(['active', 'on_hold', 'completed', 'archived']).exactOptional(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
    startDate: z.iso.date().exactOptional(),
    endDate: z.iso.date().exactOptional(),
  })
  .openapi('UpdateProjectRequest')

const CreateTaskRequestSchema = z
  .object({
    title: z.string().min(1).max(500),
    description: z.string().exactOptional(),
    status: z.enum(['todo', 'in_progress', 'in_review', 'done']).default('todo').exactOptional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium').exactOptional(),
    assigneeId: z.uuid().exactOptional(),
    milestoneId: z.uuid().exactOptional(),
    dueDate: z.iso.date().exactOptional(),
    estimatedHours: z.number().min(0).exactOptional(),
    tags: z.array(z.string()).exactOptional(),
    subtasks: z.array(
      z
        .object({ title: z.string() })
        .exactOptional()
        .openapi({ required: ['title'] }),
    ),
  })
  .openapi({ required: ['title'] })
  .openapi('CreateTaskRequest')

const UpdateTaskRequestSchema = z
  .object({
    title: z.string().min(1).max(500).exactOptional(),
    description: z.string().exactOptional(),
    status: z.enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled']).exactOptional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).exactOptional(),
    assigneeId: z.uuid().exactOptional(),
    milestoneId: z.uuid().exactOptional(),
    dueDate: z.iso.date().exactOptional(),
    estimatedHours: z.number().min(0).exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi('UpdateTaskRequest')

const AddMemberRequestSchema = z
  .object({ userId: z.uuid(), role: z.enum(['admin', 'member', 'viewer']) })
  .openapi({ required: ['userId', 'role'] })
  .openapi('AddMemberRequest')

const CreateMilestoneRequestSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    dueDate: z.iso.date().exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateMilestoneRequest')

const CreateTimeEntryRequestSchema = z
  .object({
    description: z.string().exactOptional(),
    duration: z.int().min(1).openapi({ description: '時間（分）' }),
    date: z.iso.date(),
  })
  .openapi({ required: ['duration', 'date'] })
  .openapi('CreateTimeEntryRequest')

const CreateTeamRequestSchema = z
  .object({
    name: z.string().min(1).max(100),
    description: z.string().exactOptional(),
    memberIds: z.array(z.uuid()).exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('CreateTeamRequest')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const ProjectListResponseSchema = z
  .object({ data: z.array(ProjectSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('ProjectListResponse')

const TaskListResponseSchema = z
  .object({ data: z.array(TaskSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('TaskListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const ProjectIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'projectId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const TaskIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'taskId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getProjectsRoute = createRoute({
  method: 'get',
  path: '/projects',
  tags: ['Projects'],
  summary: 'プロジェクト一覧取得',
  operationId: 'listProjects',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      status: z
        .enum(['active', 'on_hold', 'completed', 'archived'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'on_hold', 'completed', 'archived'] },
          },
        }),
      search: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'search', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'プロジェクト一覧',
      content: { 'application/json': { schema: ProjectListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postProjectsRoute = createRoute({
  method: 'post',
  path: '/projects',
  tags: ['Projects'],
  summary: 'プロジェクト作成',
  operationId: 'createProject',
  request: {
    body: {
      content: { 'application/json': { schema: CreateProjectRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: ProjectSchema } } },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getProjectsProjectIdRoute = createRoute({
  method: 'get',
  path: '/projects/{projectId}',
  tags: ['Projects'],
  summary: 'プロジェクト詳細取得',
  operationId: 'getProject',
  request: { params: z.object({ projectId: ProjectIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'プロジェクト詳細',
      content: { 'application/json': { schema: ProjectSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putProjectsProjectIdRoute = createRoute({
  method: 'put',
  path: '/projects/{projectId}',
  tags: ['Projects'],
  summary: 'プロジェクト更新',
  operationId: 'updateProject',
  request: {
    params: z.object({ projectId: ProjectIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: UpdateProjectRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: ProjectSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteProjectsProjectIdRoute = createRoute({
  method: 'delete',
  path: '/projects/{projectId}',
  tags: ['Projects'],
  summary: 'プロジェクト削除',
  operationId: 'deleteProject',
  request: { params: z.object({ projectId: ProjectIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getProjectsProjectIdMembersRoute = createRoute({
  method: 'get',
  path: '/projects/{projectId}/members',
  tags: ['Projects'],
  summary: 'プロジェクトメンバー一覧',
  operationId: 'listProjectMembers',
  request: { params: z.object({ projectId: ProjectIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'メンバー一覧',
      content: { 'application/json': { schema: z.array(ProjectMemberSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postProjectsProjectIdMembersRoute = createRoute({
  method: 'post',
  path: '/projects/{projectId}/members',
  tags: ['Projects'],
  summary: 'メンバー追加',
  operationId: 'addProjectMember',
  request: {
    params: z.object({ projectId: ProjectIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: AddMemberRequestSchema } }, required: true },
  },
  responses: {
    201: {
      description: '追加成功',
      content: { 'application/json': { schema: ProjectMemberSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getProjectsProjectIdTasksRoute = createRoute({
  method: 'get',
  path: '/projects/{projectId}/tasks',
  tags: ['Tasks'],
  summary: 'プロジェクトのタスク一覧',
  operationId: 'listProjectTasks',
  request: {
    params: z.object({ projectId: ProjectIdParamParamsSchema }),
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      status: z
        .enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'],
            },
          },
        }),
      assignee: z
        .uuid()
        .exactOptional()
        .openapi({
          param: { name: 'assignee', in: 'query', schema: { type: 'string', format: 'uuid' } },
        }),
      priority: z
        .enum(['low', 'medium', 'high', 'urgent'])
        .exactOptional()
        .openapi({
          param: {
            name: 'priority',
            in: 'query',
            schema: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'タスク一覧',
      content: { 'application/json': { schema: TaskListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postProjectsProjectIdTasksRoute = createRoute({
  method: 'post',
  path: '/projects/{projectId}/tasks',
  tags: ['Tasks'],
  summary: 'タスク作成',
  operationId: 'createTask',
  request: {
    params: z.object({ projectId: ProjectIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: CreateTaskRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: TaskSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getTasksTaskIdRoute = createRoute({
  method: 'get',
  path: '/tasks/{taskId}',
  tags: ['Tasks'],
  summary: 'タスク詳細取得',
  operationId: 'getTask',
  request: { params: z.object({ taskId: TaskIdParamParamsSchema }) },
  responses: {
    200: { description: 'タスク詳細', content: { 'application/json': { schema: TaskSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putTasksTaskIdRoute = createRoute({
  method: 'put',
  path: '/tasks/{taskId}',
  tags: ['Tasks'],
  summary: 'タスク更新',
  operationId: 'updateTask',
  request: {
    params: z.object({ taskId: TaskIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: UpdateTaskRequestSchema } }, required: true },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: TaskSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteTasksTaskIdRoute = createRoute({
  method: 'delete',
  path: '/tasks/{taskId}',
  tags: ['Tasks'],
  summary: 'タスク削除',
  operationId: 'deleteTask',
  request: { params: z.object({ taskId: TaskIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const patchTasksTaskIdStatusRoute = createRoute({
  method: 'patch',
  path: '/tasks/{taskId}/status',
  tags: ['Tasks'],
  summary: 'タスクステータス更新',
  operationId: 'updateTaskStatus',
  request: {
    params: z.object({ taskId: TaskIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ status: z.enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled']) })
            .openapi({ required: ['status'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: TaskSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getTasksTaskIdCommentsRoute = createRoute({
  method: 'get',
  path: '/tasks/{taskId}/comments',
  tags: ['Tasks'],
  summary: 'タスクコメント一覧',
  operationId: 'listTaskComments',
  request: { params: z.object({ taskId: TaskIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'コメント一覧',
      content: { 'application/json': { schema: z.array(TaskCommentSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postTasksTaskIdCommentsRoute = createRoute({
  method: 'post',
  path: '/tasks/{taskId}/comments',
  tags: ['Tasks'],
  summary: 'コメント追加',
  operationId: 'addTaskComment',
  request: {
    params: z.object({ taskId: TaskIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ content: z.string().min(1) }).openapi({ required: ['content'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '追加成功',
      content: { 'application/json': { schema: TaskCommentSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getTasksTaskIdTimeEntriesRoute = createRoute({
  method: 'get',
  path: '/tasks/{taskId}/time-entries',
  tags: ['Time Entries'],
  summary: '時間記録一覧',
  operationId: 'listTimeEntries',
  request: { params: z.object({ taskId: TaskIdParamParamsSchema }) },
  responses: {
    200: {
      description: '時間記録一覧',
      content: { 'application/json': { schema: z.array(TimeEntrySchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postTasksTaskIdTimeEntriesRoute = createRoute({
  method: 'post',
  path: '/tasks/{taskId}/time-entries',
  tags: ['Time Entries'],
  summary: '時間記録作成',
  operationId: 'createTimeEntry',
  request: {
    params: z.object({ taskId: TaskIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: CreateTimeEntryRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: TimeEntrySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getProjectsProjectIdMilestonesRoute = createRoute({
  method: 'get',
  path: '/projects/{projectId}/milestones',
  tags: ['Milestones'],
  summary: 'マイルストーン一覧',
  operationId: 'listMilestones',
  request: { params: z.object({ projectId: ProjectIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'マイルストーン一覧',
      content: { 'application/json': { schema: z.array(MilestoneSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postProjectsProjectIdMilestonesRoute = createRoute({
  method: 'post',
  path: '/projects/{projectId}/milestones',
  tags: ['Milestones'],
  summary: 'マイルストーン作成',
  operationId: 'createMilestone',
  request: {
    params: z.object({ projectId: ProjectIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: CreateMilestoneRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: MilestoneSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getTeamsRoute = createRoute({
  method: 'get',
  path: '/teams',
  tags: ['Teams'],
  summary: 'チーム一覧取得',
  operationId: 'listTeams',
  responses: {
    200: {
      description: 'チーム一覧',
      content: { 'application/json': { schema: z.array(TeamSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postTeamsRoute = createRoute({
  method: 'post',
  path: '/teams',
  tags: ['Teams'],
  summary: 'チーム作成',
  operationId: 'createTeam',
  request: {
    body: { content: { 'application/json': { schema: CreateTeamRequestSchema } }, required: true },
  },
  responses: {
    201: { description: '作成成功', content: { 'application/json': { schema: TeamSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
