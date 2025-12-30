import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    avatarUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'email'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      avatarUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('User')

const TeamSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    members: z
      .array(UserSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      members: { type: 'array', items: { $ref: '#/components/schemas/User' } },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Team')

const ProjectSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    status: z
      .enum(['active', 'on_hold', 'completed', 'archived'])
      .openapi({ type: 'string', enum: ['active', 'on_hold', 'completed', 'archived'] }),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
    owner: UserSchema,
    team: TeamSchema,
    startDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    endDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    taskCount: z.int().optional().openapi({ type: 'integer' }),
    completedTaskCount: z.int().optional().openapi({ type: 'integer' }),
    progress: z
      .number()
      .min(0)
      .max(100)
      .optional()
      .openapi({ type: 'number', minimum: 0, maximum: 100 }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'status', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string', enum: ['active', 'on_hold', 'completed', 'archived'] },
      color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
      owner: { $ref: '#/components/schemas/User' },
      team: { $ref: '#/components/schemas/Team' },
      startDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
      taskCount: { type: 'integer' },
      completedTaskCount: { type: 'integer' },
      progress: { type: 'number', minimum: 0, maximum: 100 },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Project')

const SubtaskSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    title: z.string().openapi({ type: 'string' }),
    completed: z.boolean().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title', 'completed'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      title: { type: 'string' },
      completed: { type: 'boolean' },
    },
  })
  .openapi('Subtask')

const AttachmentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    filename: z.string().openapi({ type: 'string' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    mimeType: z.string().optional().openapi({ type: 'string' }),
    filesize: z.int().optional().openapi({ type: 'integer' }),
    uploadedBy: UserSchema,
    uploadedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'filename', 'url'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      filename: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      mimeType: { type: 'string' },
      filesize: { type: 'integer' },
      uploadedBy: { $ref: '#/components/schemas/User' },
      uploadedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Attachment')

const MilestoneSummarySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: { id: { type: 'string', format: 'uuid' }, name: { type: 'string' } },
  })
  .openapi('MilestoneSummary')

const ProjectSummarySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    color: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      color: { type: 'string' },
    },
  })
  .openapi('ProjectSummary')

const TaskSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    title: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    status: z
      .enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled'])
      .openapi({ type: 'string', enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'] }),
    priority: z
      .enum(['low', 'medium', 'high', 'urgent'])
      .openapi({ type: 'string', enum: ['low', 'medium', 'high', 'urgent'] }),
    project: ProjectSummarySchema,
    assignee: UserSchema,
    reporter: UserSchema,
    milestone: MilestoneSummarySchema,
    dueDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    estimatedHours: z.number().optional().openapi({ type: 'number' }),
    actualHours: z.number().optional().openapi({ type: 'number' }),
    tags: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    attachments: z
      .array(AttachmentSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Attachment' } }),
    subtasks: z
      .array(SubtaskSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Subtask' } }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title', 'status', 'priority', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      title: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string', enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'] },
      priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
      project: { $ref: '#/components/schemas/ProjectSummary' },
      assignee: { $ref: '#/components/schemas/User' },
      reporter: { $ref: '#/components/schemas/User' },
      milestone: { $ref: '#/components/schemas/MilestoneSummary' },
      dueDate: { type: 'string', format: 'date' },
      estimatedHours: { type: 'number' },
      actualHours: { type: 'number' },
      tags: { type: 'array', items: { type: 'string' } },
      attachments: { type: 'array', items: { $ref: '#/components/schemas/Attachment' } },
      subtasks: { type: 'array', items: { $ref: '#/components/schemas/Subtask' } },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Task')

const MilestoneSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    status: z.enum(['open', 'closed']).openapi({ type: 'string', enum: ['open', 'closed'] }),
    dueDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    taskCount: z.int().optional().openapi({ type: 'integer' }),
    completedTaskCount: z.int().optional().openapi({ type: 'integer' }),
    progress: z
      .number()
      .min(0)
      .max(100)
      .optional()
      .openapi({ type: 'number', minimum: 0, maximum: 100 }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string', enum: ['open', 'closed'] },
      dueDate: { type: 'string', format: 'date' },
      taskCount: { type: 'integer' },
      completedTaskCount: { type: 'integer' },
      progress: { type: 'number', minimum: 0, maximum: 100 },
    },
  })
  .openapi('Milestone')

const ProjectMemberSchema = z
  .object({
    user: UserSchema,
    role: z
      .enum(['owner', 'admin', 'member', 'viewer'])
      .openapi({ type: 'string', enum: ['owner', 'admin', 'member', 'viewer'] }),
    joinedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['user', 'role', 'joinedAt'],
    properties: {
      user: { $ref: '#/components/schemas/User' },
      role: { type: 'string', enum: ['owner', 'admin', 'member', 'viewer'] },
      joinedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ProjectMember')

const TaskCommentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    content: z.string().openapi({ type: 'string' }),
    author: UserSchema,
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'content', 'author', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      content: { type: 'string' },
      author: { $ref: '#/components/schemas/User' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('TaskComment')

const TimeEntrySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    description: z.string().optional().openapi({ type: 'string' }),
    duration: z.int().openapi({ type: 'integer', description: '時間（分）' }),
    date: z.iso.date().openapi({ type: 'string', format: 'date' }),
    user: UserSchema,
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'duration', 'date', 'user'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      description: { type: 'string' },
      duration: { type: 'integer', description: '時間（分）' },
      date: { type: 'string', format: 'date' },
      user: { $ref: '#/components/schemas/User' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('TimeEntry')

const CreateProjectRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
    teamId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    startDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    endDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
      teamId: { type: 'string', format: 'uuid' },
      startDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
    },
  })
  .openapi('CreateProjectRequest')

const UpdateProjectRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().openapi({ type: 'string' }),
    status: z
      .enum(['active', 'on_hold', 'completed', 'archived'])
      .openapi({ type: 'string', enum: ['active', 'on_hold', 'completed', 'archived'] }),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
    startDate: z.iso.date().openapi({ type: 'string', format: 'date' }),
    endDate: z.iso.date().openapi({ type: 'string', format: 'date' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      status: { type: 'string', enum: ['active', 'on_hold', 'completed', 'archived'] },
      color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
      startDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
    },
  })
  .openapi('UpdateProjectRequest')

const CreateTaskRequestSchema = z
  .object({
    title: z.string().min(1).max(500).openapi({ type: 'string', minLength: 1, maxLength: 500 }),
    description: z.string().optional().openapi({ type: 'string' }),
    status: z
      .enum(['todo', 'in_progress', 'in_review', 'done'])
      .default('todo')
      .optional()
      .openapi({
        type: 'string',
        enum: ['todo', 'in_progress', 'in_review', 'done'],
        default: 'todo',
      }),
    priority: z
      .enum(['low', 'medium', 'high', 'urgent'])
      .default('medium')
      .optional()
      .openapi({ type: 'string', enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' }),
    assigneeId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    milestoneId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    dueDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    estimatedHours: z.number().min(0).optional().openapi({ type: 'number', minimum: 0 }),
    tags: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    subtasks: z
      .array(
        z
          .object({ title: z.string().openapi({ type: 'string' }) })
          .openapi({
            type: 'object',
            required: ['title'],
            properties: { title: { type: 'string' } },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: { type: 'object', required: ['title'], properties: { title: { type: 'string' } } },
      }),
  })
  .openapi({
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 500 },
      description: { type: 'string' },
      status: {
        type: 'string',
        enum: ['todo', 'in_progress', 'in_review', 'done'],
        default: 'todo',
      },
      priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
      assigneeId: { type: 'string', format: 'uuid' },
      milestoneId: { type: 'string', format: 'uuid' },
      dueDate: { type: 'string', format: 'date' },
      estimatedHours: { type: 'number', minimum: 0 },
      tags: { type: 'array', items: { type: 'string' } },
      subtasks: {
        type: 'array',
        items: { type: 'object', required: ['title'], properties: { title: { type: 'string' } } },
      },
    },
  })
  .openapi('CreateTaskRequest')

const UpdateTaskRequestSchema = z
  .object({
    title: z.string().min(1).max(500).openapi({ type: 'string', minLength: 1, maxLength: 500 }),
    description: z.string().openapi({ type: 'string' }),
    status: z
      .enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled'])
      .openapi({ type: 'string', enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'] }),
    priority: z
      .enum(['low', 'medium', 'high', 'urgent'])
      .openapi({ type: 'string', enum: ['low', 'medium', 'high', 'urgent'] }),
    assigneeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    milestoneId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    dueDate: z.iso.date().openapi({ type: 'string', format: 'date' }),
    estimatedHours: z.number().min(0).openapi({ type: 'number', minimum: 0 }),
    tags: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 500 },
      description: { type: 'string' },
      status: { type: 'string', enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'] },
      priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
      assigneeId: { type: 'string', format: 'uuid' },
      milestoneId: { type: 'string', format: 'uuid' },
      dueDate: { type: 'string', format: 'date' },
      estimatedHours: { type: 'number', minimum: 0 },
      tags: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('UpdateTaskRequest')

const AddMemberRequestSchema = z
  .object({
    userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    role: z
      .enum(['admin', 'member', 'viewer'])
      .openapi({ type: 'string', enum: ['admin', 'member', 'viewer'] }),
  })
  .openapi({
    type: 'object',
    required: ['userId', 'role'],
    properties: {
      userId: { type: 'string', format: 'uuid' },
      role: { type: 'string', enum: ['admin', 'member', 'viewer'] },
    },
  })
  .openapi('AddMemberRequest')

const CreateMilestoneRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    dueDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      dueDate: { type: 'string', format: 'date' },
    },
  })
  .openapi('CreateMilestoneRequest')

const CreateTimeEntryRequestSchema = z
  .object({
    description: z.string().optional().openapi({ type: 'string' }),
    duration: z.int().min(1).openapi({ type: 'integer', minimum: 1, description: '時間（分）' }),
    date: z.iso.date().openapi({ type: 'string', format: 'date' }),
  })
  .openapi({
    type: 'object',
    required: ['duration', 'date'],
    properties: {
      description: { type: 'string' },
      duration: { type: 'integer', minimum: 1, description: '時間（分）' },
      date: { type: 'string', format: 'date' },
    },
  })
  .openapi('CreateTimeEntryRequest')

const CreateTeamRequestSchema = z
  .object({
    name: z.string().min(1).max(100).openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    description: z.string().optional().openapi({ type: 'string' }),
    memberIds: z
      .array(z.uuid().optional().openapi({ type: 'string', format: 'uuid' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string', format: 'uuid' } }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      description: { type: 'string' },
      memberIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
    },
  })
  .openapi('CreateTeamRequest')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer' }),
    limit: z.int().openapi({ type: 'integer' }),
    total: z.int().openapi({ type: 'integer' }),
    totalPages: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total', 'totalPages'],
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
  .openapi('Pagination')

const ProjectListResponseSchema = z
  .object({
    data: z
      .array(ProjectSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Project' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Project' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('ProjectListResponse')

const TaskListResponseSchema = z
  .object({
    data: z
      .array(TaskSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Task' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('TaskListResponse')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: { code: { type: 'string' }, message: { type: 'string' } },
  })
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
    type: 'string',
    format: 'uuid',
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
    type: 'string',
    format: 'uuid',
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    type: 'integer',
    minimum: 1,
    default: 1,
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
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
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'on_hold', 'completed', 'archived'] },
          },
          type: 'string',
          enum: ['active', 'on_hold', 'completed', 'archived'],
        }),
      search: z
        .string()
        .optional()
        .openapi({
          param: { name: 'search', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
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
      content: {
        'application/json': {
          schema: z
            .array(ProjectMemberSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ProjectMember' } }),
        },
      },
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
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'],
            },
          },
          type: 'string',
          enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'],
        }),
      assignee: z
        .uuid()
        .optional()
        .openapi({
          param: { name: 'assignee', in: 'query', schema: { type: 'string', format: 'uuid' } },
          type: 'string',
          format: 'uuid',
        }),
      priority: z
        .enum(['low', 'medium', 'high', 'urgent'])
        .optional()
        .openapi({
          param: {
            name: 'priority',
            in: 'query',
            schema: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
          },
          type: 'string',
          enum: ['low', 'medium', 'high', 'urgent'],
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              status: z
                .enum(['todo', 'in_progress', 'in_review', 'done', 'cancelled'])
                .openapi({
                  type: 'string',
                  enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'],
                }),
            })
            .openapi({
              type: 'object',
              required: ['status'],
              properties: {
                status: {
                  type: 'string',
                  enum: ['todo', 'in_progress', 'in_review', 'done', 'cancelled'],
                },
              },
            }),
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
      content: {
        'application/json': {
          schema: z
            .array(TaskCommentSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/TaskComment' } }),
        },
      },
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
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ content: z.string().min(1).openapi({ type: 'string', minLength: 1 }) })
            .openapi({
              type: 'object',
              required: ['content'],
              properties: { content: { type: 'string', minLength: 1 } },
            }),
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
      content: {
        'application/json': {
          schema: z
            .array(TimeEntrySchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/TimeEntry' } }),
        },
      },
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
      content: {
        'application/json': {
          schema: z
            .array(MilestoneSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Milestone' } }),
        },
      },
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
      content: {
        'application/json': {
          schema: z
            .array(TeamSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Team' } }),
        },
      },
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
