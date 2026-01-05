import { createRoute, z } from '@hono/zod-openapi'

const UserIdSchema = z
  .uuid()
  .openapi({ type: 'string', format: 'uuid', description: 'User identifier' })
  .openapi('UserId')

const DocumentIdSchema = z
  .uuid()
  .openapi({ type: 'string', format: 'uuid', description: 'Document identifier' })
  .openapi('DocumentId')

const VersionIdSchema = z
  .uuid()
  .openapi({ type: 'string', format: 'uuid', description: 'Version identifier' })
  .openapi('VersionId')

const TimestampSchema = z.iso
  .datetime()
  .openapi({ type: 'string', format: 'date-time', description: 'ISO 8601 timestamp' })
  .openapi('Timestamp')

const UserReferenceSchema = z
  .object({
    id: UserIdSchema,
    name: z.string().exactOptional().openapi({ type: 'string' }),
    email: z.email().exactOptional().openapi({ type: 'string', format: 'email' }),
    avatar: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['id'],
    properties: {
      id: { $ref: '#/components/schemas/UserId' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      avatar: { type: 'string', format: 'uri' },
    },
  })
  .openapi('UserReference')

const MetadataSchema = z
  .object({
    createdAt: TimestampSchema.exactOptional(),
    updatedAt: TimestampSchema.exactOptional(),
    createdBy: UserReferenceSchema.exactOptional(),
    updatedBy: UserReferenceSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      createdAt: { $ref: '#/components/schemas/Timestamp' },
      updatedAt: { $ref: '#/components/schemas/Timestamp' },
      createdBy: { $ref: '#/components/schemas/UserReference' },
      updatedBy: { $ref: '#/components/schemas/UserReference' },
    },
  })
  .openapi('Metadata')

const TagSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional()
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      color: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
    },
  })
  .openapi('Tag')

const PermissionSchema = z
  .enum(['view', 'comment', 'edit', 'admin'])
  .openapi({ type: 'string', enum: ['view', 'comment', 'edit', 'admin'] })
  .openapi('Permission')

const AttachmentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    mimeType: z.string().exactOptional().openapi({ type: 'string' }),
    size: z.int().exactOptional().openapi({ type: 'integer' }),
    uploadedBy: UserReferenceSchema.exactOptional(),
    uploadedAt: TimestampSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'url'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      url: { type: 'string', format: 'uri' },
      mimeType: { type: 'string' },
      size: { type: 'integer' },
      uploadedBy: { $ref: '#/components/schemas/UserReference' },
      uploadedAt: { $ref: '#/components/schemas/Timestamp' },
    },
  })
  .openapi('Attachment')

const DocumentContentSchema = z
  .object({
    format: z
      .enum(['markdown', 'html', 'plain', 'rich'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['markdown', 'html', 'plain', 'rich'] }),
    body: z.string().exactOptional().openapi({ type: 'string' }),
    attachments: z
      .array(AttachmentSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Attachment' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      format: { type: 'string', enum: ['markdown', 'html', 'plain', 'rich'] },
      body: { type: 'string' },
      attachments: { type: 'array', items: { $ref: '#/components/schemas/Attachment' } },
    },
  })
  .openapi('DocumentContent')

const DocumentStatusSchema = z
  .enum(['draft', 'in_review', 'approved', 'published', 'archived'])
  .openapi({ type: 'string', enum: ['draft', 'in_review', 'approved', 'published', 'archived'] })
  .openapi('DocumentStatus')

const DocumentReferenceSchema = z
  .object({
    id: DocumentIdSchema,
    title: z.string().openapi({ type: 'string' }),
    status: DocumentStatusSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title'],
    properties: {
      id: { $ref: '#/components/schemas/DocumentId' },
      title: { type: 'string' },
      status: { $ref: '#/components/schemas/DocumentStatus' },
    },
  })
  .openapi('DocumentReference')

const DocumentSchema = z
  .object({
    id: DocumentIdSchema,
    title: z.string().openapi({ type: 'string' }),
    content: DocumentContentSchema,
    author: UserReferenceSchema,
    reviewers: z
      .array(UserReferenceSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserReference' } }),
    approver: UserReferenceSchema.exactOptional(),
    collaborators: z
      .array(
        z
          .object({
            user: UserReferenceSchema.exactOptional(),
            permission: PermissionSchema.exactOptional(),
            addedAt: TimestampSchema.exactOptional(),
            addedBy: UserReferenceSchema.exactOptional(),
          })
          .openapi({
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserReference' },
              permission: { $ref: '#/components/schemas/Permission' },
              addedAt: { $ref: '#/components/schemas/Timestamp' },
              addedBy: { $ref: '#/components/schemas/UserReference' },
            },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/UserReference' },
            permission: { $ref: '#/components/schemas/Permission' },
            addedAt: { $ref: '#/components/schemas/Timestamp' },
            addedBy: { $ref: '#/components/schemas/UserReference' },
          },
        },
      }),
    tags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    metadata: MetadataSchema.exactOptional(),
    status: DocumentStatusSchema.exactOptional(),
    currentVersion: VersionIdSchema.exactOptional(),
    linkedDocuments: z
      .array(DocumentReferenceSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/DocumentReference' } }),
    parentDocument: DocumentReferenceSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'title', 'content', 'author'],
    properties: {
      id: { $ref: '#/components/schemas/DocumentId' },
      title: { type: 'string' },
      content: { $ref: '#/components/schemas/DocumentContent' },
      author: { $ref: '#/components/schemas/UserReference' },
      reviewers: { type: 'array', items: { $ref: '#/components/schemas/UserReference' } },
      approver: { $ref: '#/components/schemas/UserReference' },
      collaborators: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/UserReference' },
            permission: { $ref: '#/components/schemas/Permission' },
            addedAt: { $ref: '#/components/schemas/Timestamp' },
            addedBy: { $ref: '#/components/schemas/UserReference' },
          },
        },
      },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      metadata: { $ref: '#/components/schemas/Metadata' },
      status: { $ref: '#/components/schemas/DocumentStatus' },
      currentVersion: { $ref: '#/components/schemas/VersionId' },
      linkedDocuments: { type: 'array', items: { $ref: '#/components/schemas/DocumentReference' } },
      parentDocument: { $ref: '#/components/schemas/DocumentReference' },
    },
  })
  .openapi('Document')

const DocumentVersionSchema = z
  .object({
    id: VersionIdSchema,
    documentId: DocumentIdSchema,
    versionNumber: z.int().openapi({ type: 'integer' }),
    content: DocumentContentSchema,
    author: UserReferenceSchema.exactOptional(),
    createdAt: TimestampSchema.exactOptional(),
    changeDescription: z.string().exactOptional().openapi({ type: 'string' }),
    previousVersion: VersionIdSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'documentId', 'versionNumber', 'content'],
    properties: {
      id: { $ref: '#/components/schemas/VersionId' },
      documentId: { $ref: '#/components/schemas/DocumentId' },
      versionNumber: { type: 'integer' },
      content: { $ref: '#/components/schemas/DocumentContent' },
      author: { $ref: '#/components/schemas/UserReference' },
      createdAt: { $ref: '#/components/schemas/Timestamp' },
      changeDescription: { type: 'string' },
      previousVersion: { $ref: '#/components/schemas/VersionId' },
    },
  })
  .openapi('DocumentVersion')

const ActivityEntrySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    action: z
      .enum(['created', 'updated', 'reviewed', 'approved', 'published', 'shared', 'commented'])
      .openapi({
        type: 'string',
        enum: ['created', 'updated', 'reviewed', 'approved', 'published', 'shared', 'commented'],
      }),
    actor: UserReferenceSchema,
    timestamp: TimestampSchema,
    details: z
      .object({
        previousStatus: DocumentStatusSchema.exactOptional(),
        newStatus: DocumentStatusSchema.exactOptional(),
        versionId: VersionIdSchema.exactOptional(),
        comment: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          previousStatus: { $ref: '#/components/schemas/DocumentStatus' },
          newStatus: { $ref: '#/components/schemas/DocumentStatus' },
          versionId: { $ref: '#/components/schemas/VersionId' },
          comment: { type: 'string' },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'action', 'actor', 'timestamp'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      action: {
        type: 'string',
        enum: ['created', 'updated', 'reviewed', 'approved', 'published', 'shared', 'commented'],
      },
      actor: { $ref: '#/components/schemas/UserReference' },
      timestamp: { $ref: '#/components/schemas/Timestamp' },
      details: {
        type: 'object',
        properties: {
          previousStatus: { $ref: '#/components/schemas/DocumentStatus' },
          newStatus: { $ref: '#/components/schemas/DocumentStatus' },
          versionId: { $ref: '#/components/schemas/VersionId' },
          comment: { type: 'string' },
        },
      },
    },
  })
  .openapi('ActivityEntry')

const DocumentWithHistorySchema = DocumentSchema.and(
  z
    .object({
      versions: z
        .array(DocumentVersionSchema)
        .exactOptional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/DocumentVersion' } }),
      activityLog: z
        .array(ActivityEntrySchema)
        .exactOptional()
        .openapi({ type: 'array', items: { $ref: '#/components/schemas/ActivityEntry' } }),
    })
    .openapi({
      type: 'object',
      properties: {
        versions: { type: 'array', items: { $ref: '#/components/schemas/DocumentVersion' } },
        activityLog: { type: 'array', items: { $ref: '#/components/schemas/ActivityEntry' } },
      },
    }),
)
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Document' },
      {
        type: 'object',
        properties: {
          versions: { type: 'array', items: { $ref: '#/components/schemas/DocumentVersion' } },
          activityLog: { type: 'array', items: { $ref: '#/components/schemas/ActivityEntry' } },
        },
      },
    ],
  })
  .openapi('DocumentWithHistory')

const CreateDocumentInputSchema = z
  .object({
    title: z.string().openapi({ type: 'string' }),
    content: DocumentContentSchema,
    reviewers: z
      .array(UserIdSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserId' } }),
    tags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    parentDocument: DocumentIdSchema.exactOptional(),
    templateId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
  })
  .openapi({
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { type: 'string' },
      content: { $ref: '#/components/schemas/DocumentContent' },
      reviewers: { type: 'array', items: { $ref: '#/components/schemas/UserId' } },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      parentDocument: { $ref: '#/components/schemas/DocumentId' },
      templateId: { type: 'string', format: 'uuid' },
    },
  })
  .openapi('CreateDocumentInput')

const UpdateDocumentInputSchema = z
  .object({
    title: z.string().exactOptional().openapi({ type: 'string' }),
    content: DocumentContentSchema.exactOptional(),
    reviewers: z
      .array(UserIdSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserId' } }),
    approver: UserIdSchema.exactOptional(),
    tags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    status: DocumentStatusSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { $ref: '#/components/schemas/DocumentContent' },
      reviewers: { type: 'array', items: { $ref: '#/components/schemas/UserId' } },
      approver: { $ref: '#/components/schemas/UserId' },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      status: { $ref: '#/components/schemas/DocumentStatus' },
    },
  })
  .openapi('UpdateDocumentInput')

const ShareRequestSchema = z
  .object({
    recipients: z
      .array(
        z
          .object({
            userId: UserIdSchema,
            permission: PermissionSchema,
            expiresAt: TimestampSchema.exactOptional(),
            notifyUser: z
              .boolean()
              .default(true)
              .exactOptional()
              .openapi({ type: 'boolean', default: true }),
          })
          .openapi({
            type: 'object',
            required: ['userId', 'permission'],
            properties: {
              userId: { $ref: '#/components/schemas/UserId' },
              permission: { $ref: '#/components/schemas/Permission' },
              expiresAt: { $ref: '#/components/schemas/Timestamp' },
              notifyUser: { type: 'boolean', default: true },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['userId', 'permission'],
          properties: {
            userId: { $ref: '#/components/schemas/UserId' },
            permission: { $ref: '#/components/schemas/Permission' },
            expiresAt: { $ref: '#/components/schemas/Timestamp' },
            notifyUser: { type: 'boolean', default: true },
          },
        },
      }),
    message: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['recipients'],
    properties: {
      recipients: {
        type: 'array',
        items: {
          type: 'object',
          required: ['userId', 'permission'],
          properties: {
            userId: { $ref: '#/components/schemas/UserId' },
            permission: { $ref: '#/components/schemas/Permission' },
            expiresAt: { $ref: '#/components/schemas/Timestamp' },
            notifyUser: { type: 'boolean', default: true },
          },
        },
      },
      message: { type: 'string' },
    },
  })
  .openapi('ShareRequest')

const ShareResultSchema = z
  .object({
    documentId: DocumentIdSchema,
    shares: z
      .array(
        z
          .object({
            user: UserReferenceSchema.exactOptional(),
            permission: PermissionSchema.exactOptional(),
            sharedAt: TimestampSchema.exactOptional(),
            sharedBy: UserReferenceSchema.exactOptional(),
            expiresAt: TimestampSchema.exactOptional(),
          })
          .openapi({
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserReference' },
              permission: { $ref: '#/components/schemas/Permission' },
              sharedAt: { $ref: '#/components/schemas/Timestamp' },
              sharedBy: { $ref: '#/components/schemas/UserReference' },
              expiresAt: { $ref: '#/components/schemas/Timestamp' },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/UserReference' },
            permission: { $ref: '#/components/schemas/Permission' },
            sharedAt: { $ref: '#/components/schemas/Timestamp' },
            sharedBy: { $ref: '#/components/schemas/UserReference' },
            expiresAt: { $ref: '#/components/schemas/Timestamp' },
          },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['documentId', 'shares'],
    properties: {
      documentId: { $ref: '#/components/schemas/DocumentId' },
      shares: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/UserReference' },
            permission: { $ref: '#/components/schemas/Permission' },
            sharedAt: { $ref: '#/components/schemas/Timestamp' },
            sharedBy: { $ref: '#/components/schemas/UserReference' },
            expiresAt: { $ref: '#/components/schemas/Timestamp' },
          },
        },
      },
    },
  })
  .openapi('ShareResult')

const CompareOptionsSchema = z
  .object({
    ignoreWhitespace: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    ignoreCase: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    showLineNumbers: z.boolean().exactOptional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      ignoreWhitespace: { type: 'boolean' },
      ignoreCase: { type: 'boolean' },
      showLineNumbers: { type: 'boolean' },
    },
  })
  .openapi('CompareOptions')

const DifferenceSchema = z
  .object({
    type: z
      .enum(['added', 'removed', 'modified'])
      .openapi({ type: 'string', enum: ['added', 'removed', 'modified'] }),
    path: z.string().openapi({ type: 'string' }),
    sourceValue: z.string().exactOptional().openapi({ type: 'string' }),
    targetValue: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'path'],
    properties: {
      type: { type: 'string', enum: ['added', 'removed', 'modified'] },
      path: { type: 'string' },
      sourceValue: { type: 'string' },
      targetValue: { type: 'string' },
    },
  })
  .openapi('Difference')

const CompareResultSchema = z
  .object({
    source: DocumentReferenceSchema,
    target: DocumentReferenceSchema,
    differences: z
      .array(DifferenceSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Difference' } }),
    summary: z
      .object({
        additions: z.int().exactOptional().openapi({ type: 'integer' }),
        deletions: z.int().exactOptional().openapi({ type: 'integer' }),
        modifications: z.int().exactOptional().openapi({ type: 'integer' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          additions: { type: 'integer' },
          deletions: { type: 'integer' },
          modifications: { type: 'integer' },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['source', 'target', 'differences'],
    properties: {
      source: { $ref: '#/components/schemas/DocumentReference' },
      target: { $ref: '#/components/schemas/DocumentReference' },
      differences: { type: 'array', items: { $ref: '#/components/schemas/Difference' } },
      summary: {
        type: 'object',
        properties: {
          additions: { type: 'integer' },
          deletions: { type: 'integer' },
          modifications: { type: 'integer' },
        },
      },
    },
  })
  .openapi('CompareResult')

const TemplateVariableSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['text', 'number', 'date', 'user', 'document'])
      .openapi({ type: 'string', enum: ['text', 'number', 'date', 'user', 'document'] }),
    required: z.boolean().exactOptional().openapi({ type: 'boolean' }),
    defaultValue: z.string().exactOptional().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string', enum: ['text', 'number', 'date', 'user', 'document'] },
      required: { type: 'boolean' },
      defaultValue: { type: 'string' },
      description: { type: 'string' },
    },
  })
  .openapi('TemplateVariable')

const DocumentTemplateSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    content: DocumentContentSchema,
    defaultReviewers: z
      .array(UserReferenceSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserReference' } }),
    defaultApprover: UserReferenceSchema.exactOptional(),
    defaultTags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    metadata: MetadataSchema.exactOptional(),
    category: z.string().exactOptional().openapi({ type: 'string' }),
    variables: z
      .array(TemplateVariableSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TemplateVariable' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'content'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      content: { $ref: '#/components/schemas/DocumentContent' },
      defaultReviewers: { type: 'array', items: { $ref: '#/components/schemas/UserReference' } },
      defaultApprover: { $ref: '#/components/schemas/UserReference' },
      defaultTags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      metadata: { $ref: '#/components/schemas/Metadata' },
      category: { type: 'string' },
      variables: { type: 'array', items: { $ref: '#/components/schemas/TemplateVariable' } },
    },
  })
  .openapi('DocumentTemplate')

const CreateTemplateInputSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    content: DocumentContentSchema,
    defaultReviewers: z
      .array(UserIdSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/UserId' } }),
    defaultApprover: UserIdSchema.exactOptional(),
    defaultTags: z
      .array(TagSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
    category: z.string().exactOptional().openapi({ type: 'string' }),
    variables: z
      .array(TemplateVariableSchema)
      .exactOptional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TemplateVariable' } }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'content'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      content: { $ref: '#/components/schemas/DocumentContent' },
      defaultReviewers: { type: 'array', items: { $ref: '#/components/schemas/UserId' } },
      defaultApprover: { $ref: '#/components/schemas/UserId' },
      defaultTags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
      category: { type: 'string' },
      variables: { type: 'array', items: { $ref: '#/components/schemas/TemplateVariable' } },
    },
  })
  .openapi('CreateTemplateInput')

const WorkflowStepSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['review', 'approval', 'notification', 'custom'])
      .openapi({ type: 'string', enum: ['review', 'approval', 'notification', 'custom'] }),
    assignee: UserReferenceSchema.exactOptional(),
    requiredPermission: PermissionSchema.exactOptional(),
    nextSteps: z
      .array(
        z
          .object({
            condition: z.string().exactOptional().openapi({ type: 'string' }),
            stepName: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: { condition: { type: 'string' }, stepName: { type: 'string' } },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { condition: { type: 'string' }, stepName: { type: 'string' } },
        },
      }),
    timeout: z.int().exactOptional().openapi({ type: 'integer' }),
    escalateTo: UserReferenceSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string', enum: ['review', 'approval', 'notification', 'custom'] },
      assignee: { $ref: '#/components/schemas/UserReference' },
      requiredPermission: { $ref: '#/components/schemas/Permission' },
      nextSteps: {
        type: 'array',
        items: {
          type: 'object',
          properties: { condition: { type: 'string' }, stepName: { type: 'string' } },
        },
      },
      timeout: { type: 'integer' },
      escalateTo: { $ref: '#/components/schemas/UserReference' },
    },
  })
  .openapi('WorkflowStep')

const WorkflowDefinitionSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    description: z.string().exactOptional().openapi({ type: 'string' }),
    steps: z
      .array(WorkflowStepSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowStep' } }),
    defaultAssignees: z
      .record(z.string(), UserIdSchema)
      .exactOptional()
      .openapi({ type: 'object', additionalProperties: { $ref: '#/components/schemas/UserId' } }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'steps'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      steps: { type: 'array', items: { $ref: '#/components/schemas/WorkflowStep' } },
      defaultAssignees: {
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/UserId' },
      },
    },
  })
  .openapi('WorkflowDefinition')

const WorkflowSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    definition: WorkflowDefinitionSchema,
    document: DocumentReferenceSchema,
    status: z
      .enum(['active', 'completed', 'cancelled', 'failed'])
      .openapi({ type: 'string', enum: ['active', 'completed', 'cancelled', 'failed'] }),
    currentStep: WorkflowStepSchema.exactOptional(),
    history: z
      .array(
        z
          .object({
            step: WorkflowStepSchema.exactOptional(),
            completedBy: UserReferenceSchema.exactOptional(),
            completedAt: TimestampSchema.exactOptional(),
            action: z.string().exactOptional().openapi({ type: 'string' }),
            comment: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: {
              step: { $ref: '#/components/schemas/WorkflowStep' },
              completedBy: { $ref: '#/components/schemas/UserReference' },
              completedAt: { $ref: '#/components/schemas/Timestamp' },
              action: { type: 'string' },
              comment: { type: 'string' },
            },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            step: { $ref: '#/components/schemas/WorkflowStep' },
            completedBy: { $ref: '#/components/schemas/UserReference' },
            completedAt: { $ref: '#/components/schemas/Timestamp' },
            action: { type: 'string' },
            comment: { type: 'string' },
          },
        },
      }),
    metadata: MetadataSchema.exactOptional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'definition', 'document', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      definition: { $ref: '#/components/schemas/WorkflowDefinition' },
      document: { $ref: '#/components/schemas/DocumentReference' },
      status: { type: 'string', enum: ['active', 'completed', 'cancelled', 'failed'] },
      currentStep: { $ref: '#/components/schemas/WorkflowStep' },
      history: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            step: { $ref: '#/components/schemas/WorkflowStep' },
            completedBy: { $ref: '#/components/schemas/UserReference' },
            completedAt: { $ref: '#/components/schemas/Timestamp' },
            action: { type: 'string' },
            comment: { type: 'string' },
          },
        },
      },
      metadata: { $ref: '#/components/schemas/Metadata' },
    },
  })
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
      content: {
        'application/json': {
          schema: z
            .array(DocumentSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Document' } }),
        },
      },
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
      content: {
        'application/json': {
          schema: z
            .array(DocumentVersionSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/DocumentVersion' } }),
        },
      },
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
          schema: z
            .object({
              authored: z
                .array(DocumentSchema)
                .exactOptional()
                .openapi({ type: 'array', items: { $ref: '#/components/schemas/Document' } }),
              reviewing: z
                .array(DocumentSchema)
                .exactOptional()
                .openapi({ type: 'array', items: { $ref: '#/components/schemas/Document' } }),
              shared: z
                .array(DocumentSchema)
                .exactOptional()
                .openapi({ type: 'array', items: { $ref: '#/components/schemas/Document' } }),
            })
            .openapi({
              type: 'object',
              properties: {
                authored: { type: 'array', items: { $ref: '#/components/schemas/Document' } },
                reviewing: { type: 'array', items: { $ref: '#/components/schemas/Document' } },
                shared: { type: 'array', items: { $ref: '#/components/schemas/Document' } },
              },
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
            .openapi({
              type: 'object',
              required: ['source', 'target'],
              properties: {
                source: { $ref: '#/components/schemas/Document' },
                target: { $ref: '#/components/schemas/Document' },
                options: { $ref: '#/components/schemas/CompareOptions' },
              },
            }),
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
      content: {
        'application/json': {
          schema: z
            .array(DocumentTemplateSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/DocumentTemplate' } }),
        },
      },
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
