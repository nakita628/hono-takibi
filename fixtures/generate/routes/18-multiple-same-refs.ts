import { createRoute, z } from '@hono/zod-openapi'

const UserIdSchema = z.uuid().openapi({ description: 'User identifier' }).openapi('UserId')

const DocumentIdSchema = z
  .uuid()
  .openapi({ description: 'Document identifier' })
  .openapi('DocumentId')

const VersionIdSchema = z.uuid().openapi({ description: 'Version identifier' }).openapi('VersionId')

const TimestampSchema = z.iso
  .datetime()
  .openapi({ description: 'ISO 8601 timestamp' })
  .openapi('Timestamp')

const UserReferenceSchema = z
  .object({
    id: UserIdSchema,
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
    avatar: z.url().exactOptional(),
  })
  .openapi({ required: ['id'] })
  .openapi('UserReference')

const MetadataSchema = z
  .object({
    createdAt: TimestampSchema.exactOptional(),
    updatedAt: TimestampSchema.exactOptional(),
    createdBy: UserReferenceSchema.exactOptional(),
    updatedBy: UserReferenceSchema.exactOptional(),
  })
  .openapi('Metadata')

const TagSchema = z
  .object({
    name: z.string(),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
  })
  .openapi({ required: ['name'] })
  .openapi('Tag')

const PermissionSchema = z.enum(['view', 'comment', 'edit', 'admin']).openapi('Permission')

const AttachmentSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    url: z.url(),
    mimeType: z.string().exactOptional(),
    size: z.int().exactOptional(),
    uploadedBy: UserReferenceSchema.exactOptional(),
    uploadedAt: TimestampSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'url'] })
  .openapi('Attachment')

const DocumentContentSchema = z
  .object({
    format: z.enum(['markdown', 'html', 'plain', 'rich']).exactOptional(),
    body: z.string().exactOptional(),
    attachments: z.array(AttachmentSchema).exactOptional(),
  })
  .openapi('DocumentContent')

const DocumentStatusSchema = z
  .enum(['draft', 'in_review', 'approved', 'published', 'archived'])
  .openapi('DocumentStatus')

const DocumentReferenceSchema = z
  .object({ id: DocumentIdSchema, title: z.string(), status: DocumentStatusSchema.exactOptional() })
  .openapi({ required: ['id', 'title'] })
  .openapi('DocumentReference')

const DocumentSchema = z
  .object({
    id: DocumentIdSchema,
    title: z.string(),
    content: DocumentContentSchema,
    author: UserReferenceSchema,
    reviewers: z.array(UserReferenceSchema).exactOptional(),
    approver: UserReferenceSchema.exactOptional(),
    collaborators: z
      .array(
        z.object({
          user: UserReferenceSchema.exactOptional(),
          permission: PermissionSchema.exactOptional(),
          addedAt: TimestampSchema.exactOptional(),
          addedBy: UserReferenceSchema.exactOptional(),
        }),
      )
      .exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
    metadata: MetadataSchema.exactOptional(),
    status: DocumentStatusSchema.exactOptional(),
    currentVersion: VersionIdSchema.exactOptional(),
    linkedDocuments: z.array(DocumentReferenceSchema).exactOptional(),
    parentDocument: DocumentReferenceSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'title', 'content', 'author'] })
  .openapi('Document')

const DocumentVersionSchema = z
  .object({
    id: VersionIdSchema,
    documentId: DocumentIdSchema,
    versionNumber: z.int(),
    content: DocumentContentSchema,
    author: UserReferenceSchema.exactOptional(),
    createdAt: TimestampSchema.exactOptional(),
    changeDescription: z.string().exactOptional(),
    previousVersion: VersionIdSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'documentId', 'versionNumber', 'content'] })
  .openapi('DocumentVersion')

const ActivityEntrySchema = z
  .object({
    id: z.uuid(),
    action: z.enum([
      'created',
      'updated',
      'reviewed',
      'approved',
      'published',
      'shared',
      'commented',
    ]),
    actor: UserReferenceSchema,
    timestamp: TimestampSchema,
    details: z
      .object({
        previousStatus: DocumentStatusSchema.exactOptional(),
        newStatus: DocumentStatusSchema.exactOptional(),
        versionId: VersionIdSchema.exactOptional(),
        comment: z.string().exactOptional(),
      })
      .exactOptional(),
  })
  .openapi({ required: ['id', 'action', 'actor', 'timestamp'] })
  .openapi('ActivityEntry')

const DocumentWithHistorySchema = DocumentSchema.and(
  z.object({
    versions: z.array(DocumentVersionSchema).exactOptional(),
    activityLog: z.array(ActivityEntrySchema).exactOptional(),
  }),
).openapi('DocumentWithHistory')

const CreateDocumentInputSchema = z
  .object({
    title: z.string(),
    content: DocumentContentSchema,
    reviewers: z.array(UserIdSchema).exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
    parentDocument: DocumentIdSchema.exactOptional(),
    templateId: z.uuid().exactOptional(),
  })
  .openapi({ required: ['title', 'content'] })
  .openapi('CreateDocumentInput')

const UpdateDocumentInputSchema = z
  .object({
    title: z.string().exactOptional(),
    content: DocumentContentSchema.exactOptional(),
    reviewers: z.array(UserIdSchema).exactOptional(),
    approver: UserIdSchema.exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
    status: DocumentStatusSchema.exactOptional(),
  })
  .openapi('UpdateDocumentInput')

const ShareRequestSchema = z
  .object({
    recipients: z.array(
      z
        .object({
          userId: UserIdSchema,
          permission: PermissionSchema,
          expiresAt: TimestampSchema.exactOptional(),
          notifyUser: z.boolean().default(true).exactOptional(),
        })
        .openapi({ required: ['userId', 'permission'] }),
    ),
    message: z.string().exactOptional(),
  })
  .openapi({ required: ['recipients'] })
  .openapi('ShareRequest')

const ShareResultSchema = z
  .object({
    documentId: DocumentIdSchema,
    shares: z.array(
      z.object({
        user: UserReferenceSchema.exactOptional(),
        permission: PermissionSchema.exactOptional(),
        sharedAt: TimestampSchema.exactOptional(),
        sharedBy: UserReferenceSchema.exactOptional(),
        expiresAt: TimestampSchema.exactOptional(),
      }),
    ),
  })
  .openapi({ required: ['documentId', 'shares'] })
  .openapi('ShareResult')

const CompareOptionsSchema = z
  .object({
    ignoreWhitespace: z.boolean().exactOptional(),
    ignoreCase: z.boolean().exactOptional(),
    showLineNumbers: z.boolean().exactOptional(),
  })
  .openapi('CompareOptions')

const DifferenceSchema = z
  .object({
    type: z.enum(['added', 'removed', 'modified']),
    path: z.string(),
    sourceValue: z.string().exactOptional(),
    targetValue: z.string().exactOptional(),
  })
  .openapi({ required: ['type', 'path'] })
  .openapi('Difference')

const CompareResultSchema = z
  .object({
    source: DocumentReferenceSchema,
    target: DocumentReferenceSchema,
    differences: z.array(DifferenceSchema),
    summary: z
      .object({
        additions: z.int().exactOptional(),
        deletions: z.int().exactOptional(),
        modifications: z.int().exactOptional(),
      })
      .exactOptional(),
  })
  .openapi({ required: ['source', 'target', 'differences'] })
  .openapi('CompareResult')

const TemplateVariableSchema = z
  .object({
    name: z.string(),
    type: z.enum(['text', 'number', 'date', 'user', 'document']),
    required: z.boolean().exactOptional(),
    defaultValue: z.string().exactOptional(),
    description: z.string().exactOptional(),
  })
  .openapi({ required: ['name', 'type'] })
  .openapi('TemplateVariable')

const DocumentTemplateSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    content: DocumentContentSchema,
    defaultReviewers: z.array(UserReferenceSchema).exactOptional(),
    defaultApprover: UserReferenceSchema.exactOptional(),
    defaultTags: z.array(TagSchema).exactOptional(),
    metadata: MetadataSchema.exactOptional(),
    category: z.string().exactOptional(),
    variables: z.array(TemplateVariableSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'content'] })
  .openapi('DocumentTemplate')

const CreateTemplateInputSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    content: DocumentContentSchema,
    defaultReviewers: z.array(UserIdSchema).exactOptional(),
    defaultApprover: UserIdSchema.exactOptional(),
    defaultTags: z.array(TagSchema).exactOptional(),
    category: z.string().exactOptional(),
    variables: z.array(TemplateVariableSchema).exactOptional(),
  })
  .openapi({ required: ['name', 'content'] })
  .openapi('CreateTemplateInput')

const WorkflowStepSchema = z
  .object({
    name: z.string(),
    type: z.enum(['review', 'approval', 'notification', 'custom']),
    assignee: UserReferenceSchema.exactOptional(),
    requiredPermission: PermissionSchema.exactOptional(),
    nextSteps: z
      .array(
        z.object({ condition: z.string().exactOptional(), stepName: z.string().exactOptional() }),
      )
      .exactOptional(),
    timeout: z.int().exactOptional(),
    escalateTo: UserReferenceSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'type'] })
  .openapi('WorkflowStep')

const WorkflowDefinitionSchema = z
  .object({
    name: z.string(),
    description: z.string().exactOptional(),
    steps: z.array(WorkflowStepSchema),
    defaultAssignees: z.record(z.string(), UserIdSchema).exactOptional(),
  })
  .openapi({ required: ['name', 'steps'] })
  .openapi('WorkflowDefinition')

const WorkflowSchema = z
  .object({
    id: z.uuid(),
    definition: WorkflowDefinitionSchema,
    document: DocumentReferenceSchema,
    status: z.enum(['active', 'completed', 'cancelled', 'failed']),
    currentStep: WorkflowStepSchema.exactOptional(),
    history: z
      .array(
        z.object({
          step: WorkflowStepSchema.exactOptional(),
          completedBy: UserReferenceSchema.exactOptional(),
          completedAt: TimestampSchema.exactOptional(),
          action: z.string().exactOptional(),
          comment: z.string().exactOptional(),
        }),
      )
      .exactOptional(),
    metadata: MetadataSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'definition', 'document', 'status'] })
  .openapi('Workflow')

export const getDocumentsRoute = createRoute({
  method: 'get',
  path: '/documents',
  operationId: 'listDocuments',
  request: {
    query: z.object({
      author: UserIdSchema.exactOptional().openapi({
        param: { name: 'author', in: 'query', schema: { $ref: '#/components/schemas/UserId' } },
      }),
      reviewer: UserIdSchema.exactOptional().openapi({
        param: { name: 'reviewer', in: 'query', schema: { $ref: '#/components/schemas/UserId' } },
      }),
      approver: UserIdSchema.exactOptional().openapi({
        param: { name: 'approver', in: 'query', schema: { $ref: '#/components/schemas/UserId' } },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Document list',
      content: { 'application/json': { schema: z.array(DocumentSchema) } },
    },
  },
})

export const postDocumentsRoute = createRoute({
  method: 'post',
  path: '/documents',
  operationId: 'createDocument',
  request: { body: { content: { 'application/json': { schema: CreateDocumentInputSchema } } } },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: DocumentSchema } } },
  },
})

export const getDocumentsDocumentIdRoute = createRoute({
  method: 'get',
  path: '/documents/{documentId}',
  operationId: 'getDocument',
  request: {
    params: z.object({
      documentId: DocumentIdSchema.openapi({
        param: {
          name: 'documentId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/DocumentId' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Document details',
      content: { 'application/json': { schema: DocumentWithHistorySchema } },
    },
  },
})

export const putDocumentsDocumentIdRoute = createRoute({
  method: 'put',
  path: '/documents/{documentId}',
  operationId: 'updateDocument',
  request: {
    params: z.object({
      documentId: DocumentIdSchema.openapi({
        param: {
          name: 'documentId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/DocumentId' },
        },
      }),
    }),
    body: { content: { 'application/json': { schema: UpdateDocumentInputSchema } } },
  },
  responses: {
    200: { description: 'Updated', content: { 'application/json': { schema: DocumentSchema } } },
  },
})

export const getDocumentsDocumentIdVersionsRoute = createRoute({
  method: 'get',
  path: '/documents/{documentId}/versions',
  operationId: 'getDocumentVersions',
  request: {
    params: z.object({
      documentId: DocumentIdSchema.openapi({
        param: {
          name: 'documentId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/DocumentId' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'Version history',
      content: { 'application/json': { schema: z.array(DocumentVersionSchema) } },
    },
  },
})

export const postDocumentsDocumentIdShareRoute = createRoute({
  method: 'post',
  path: '/documents/{documentId}/share',
  operationId: 'shareDocument',
  request: {
    params: z.object({
      documentId: DocumentIdSchema.openapi({
        param: {
          name: 'documentId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/DocumentId' },
        },
      }),
    }),
    body: { content: { 'application/json': { schema: ShareRequestSchema } } },
  },
  responses: {
    200: { description: 'Shared', content: { 'application/json': { schema: ShareResultSchema } } },
  },
})

export const getUsersUserIdDocumentsRoute = createRoute({
  method: 'get',
  path: '/users/{userId}/documents',
  operationId: 'getUserDocuments',
  request: {
    params: z.object({
      userId: UserIdSchema.openapi({
        param: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { $ref: '#/components/schemas/UserId' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: "User's documents",
      content: {
        'application/json': {
          schema: z.object({
            authored: z.array(DocumentSchema).exactOptional(),
            reviewing: z.array(DocumentSchema).exactOptional(),
            shared: z.array(DocumentSchema).exactOptional(),
          }),
        },
      },
    },
  },
})

export const postCompareRoute = createRoute({
  method: 'post',
  path: '/compare',
  operationId: 'compareDocuments',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              source: DocumentSchema,
              target: DocumentSchema,
              options: CompareOptionsSchema.exactOptional(),
            })
            .openapi({ required: ['source', 'target'] }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Comparison result',
      content: { 'application/json': { schema: CompareResultSchema } },
    },
  },
})

export const getTemplatesRoute = createRoute({
  method: 'get',
  path: '/templates',
  operationId: 'listTemplates',
  responses: {
    200: {
      description: 'Templates',
      content: { 'application/json': { schema: z.array(DocumentTemplateSchema) } },
    },
  },
})

export const postTemplatesRoute = createRoute({
  method: 'post',
  path: '/templates',
  operationId: 'createTemplate',
  request: { body: { content: { 'application/json': { schema: CreateTemplateInputSchema } } } },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: DocumentTemplateSchema } },
    },
  },
})

export const postWorkflowsRoute = createRoute({
  method: 'post',
  path: '/workflows',
  operationId: 'createWorkflow',
  request: { body: { content: { 'application/json': { schema: WorkflowDefinitionSchema } } } },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: WorkflowSchema } } },
  },
})
