import { createRoute, z } from '@hono/zod-openapi'

type TreeNodeType = {
  id: string
  value: string
  parent?: TreeNodeType
  children?: TreeNodeType[]
  metadata?: Record<string, TreeNodeType>
}

const TreeNodeSchema: z.ZodType<TreeNodeType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        value: z.string().openapi({ type: 'string' }),
        parent: TreeNodeSchema,
        children: z
          .array(TreeNodeSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/TreeNode' } }),
        metadata: z
          .record(z.string(), TreeNodeSchema)
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/TreeNode' },
          }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'value'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          value: { type: 'string' },
          parent: { $ref: '#/components/schemas/TreeNode' },
          children: { type: 'array', items: { $ref: '#/components/schemas/TreeNode' } },
          metadata: {
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/TreeNode' },
          },
        },
      }),
  )
  .openapi('TreeNode')

const LinkedListNodeSchema: z.ZodType<LinkedListNodeType> = z
  .lazy(() =>
    z
      .object({
        value: z.string().openapi({ type: 'string' }),
        prev: LinkedListNodeSchema,
        next: LinkedListNodeSchema,
        list: LinkedListSchema,
      })
      .openapi({
        type: 'object',
        required: ['value'],
        properties: {
          value: { type: 'string' },
          prev: { $ref: '#/components/schemas/LinkedListNode' },
          next: { $ref: '#/components/schemas/LinkedListNode' },
          list: { $ref: '#/components/schemas/LinkedList' },
        },
      }),
  )
  .openapi('LinkedListNode')

const LinkedListSchema = z
  .object({
    head: LinkedListNodeSchema,
    tail: LinkedListNodeSchema,
    length: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    properties: {
      head: { $ref: '#/components/schemas/LinkedListNode' },
      tail: { $ref: '#/components/schemas/LinkedListNode' },
      length: { type: 'integer' },
    },
  })
  .openapi('LinkedList')

type LinkedListNodeType = {
  value: string
  prev?: LinkedListNodeType
  next?: LinkedListNodeType
  list?: z.infer<typeof LinkedListSchema>
}

const EdgeMetadataSchema = z
  .object({
    label: z.string().openapi({ type: 'string' }),
    relatedEdges: z
      .array(GraphEdgeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      label: { type: 'string' },
      relatedEdges: { type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } },
    },
  })
  .openapi('EdgeMetadata')

const GraphEdgeSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    source: GraphNodeSchema,
    target: GraphNodeSchema,
    weight: z.number().optional().openapi({ type: 'number' }),
    metadata: EdgeMetadataSchema,
  })
  .openapi({
    type: 'object',
    required: ['source', 'target'],
    properties: {
      id: { type: 'string' },
      source: { $ref: '#/components/schemas/GraphNode' },
      target: { $ref: '#/components/schemas/GraphNode' },
      weight: { type: 'number' },
      metadata: { $ref: '#/components/schemas/EdgeMetadata' },
    },
  })
  .openapi('GraphEdge')

const GraphNodeSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    data: z.object({}).openapi({ type: 'object' }),
    edges: z
      .array(GraphEdgeSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } }),
    graph: GraphSchema,
  })
  .openapi({
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
      data: { type: 'object' },
      edges: { type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } },
      graph: { $ref: '#/components/schemas/Graph' },
    },
  })
  .openapi('GraphNode')

const GraphMetadataSchema = z
  .object({ name: z.string().optional().openapi({ type: 'string' }), rootNode: GraphNodeSchema })
  .openapi({
    type: 'object',
    properties: { name: { type: 'string' }, rootNode: { $ref: '#/components/schemas/GraphNode' } },
  })
  .openapi('GraphMetadata')

const GraphSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    nodes: z
      .array(GraphNodeSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphNode' } }),
    metadata: GraphMetadataSchema,
  })
  .openapi({
    type: 'object',
    required: ['nodes'],
    properties: {
      id: { type: 'string' },
      nodes: { type: 'array', items: { $ref: '#/components/schemas/GraphNode' } },
      metadata: { $ref: '#/components/schemas/GraphMetadata' },
    },
  })
  .openapi('Graph')

const PostSchema: z.ZodType<PostType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().openapi({ type: 'string' }),
        content: z.string().openapi({ type: 'string' }),
        author: SocialUserSchema,
        likes: z
          .array(SocialUserSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
        reposts: z
          .array(PostSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        replyTo: PostSchema,
        replies: z
          .array(PostSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        mentions: z
          .array(SocialUserSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'content', 'author'],
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          author: { $ref: '#/components/schemas/SocialUser' },
          likes: { type: 'array', items: { $ref: '#/components/schemas/SocialUser' } },
          reposts: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
          replyTo: { $ref: '#/components/schemas/Post' },
          replies: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
          mentions: { type: 'array', items: { $ref: '#/components/schemas/SocialUser' } },
        },
      }),
  )
  .openapi('Post')

const SocialUserSchema: z.ZodType<SocialUserType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        username: z.string().openapi({ type: 'string' }),
        profile: UserProfileSchema,
        followers: z
          .array(SocialUserSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
        following: z
          .array(SocialUserSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
        posts: z
          .array(PostSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        blockedUsers: z
          .array(SocialUserSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'username'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          profile: { $ref: '#/components/schemas/UserProfile' },
          followers: { type: 'array', items: { $ref: '#/components/schemas/SocialUser' } },
          following: { type: 'array', items: { $ref: '#/components/schemas/SocialUser' } },
          posts: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
          blockedUsers: { type: 'array', items: { $ref: '#/components/schemas/SocialUser' } },
        },
      }),
  )
  .openapi('SocialUser')

const ProfileSettingsSchema = z
  .object({
    privacy: z.string().optional().openapi({ type: 'string' }),
    notifications: z.boolean().optional().openapi({ type: 'boolean' }),
    profile: UserProfileSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      privacy: { type: 'string' },
      notifications: { type: 'boolean' },
      profile: { $ref: '#/components/schemas/UserProfile' },
    },
  })
  .openapi('ProfileSettings')

const UserProfileSchema = z
  .object({
    bio: z.string().optional().openapi({ type: 'string' }),
    avatar: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    user: SocialUserSchema,
    settings: ProfileSettingsSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      bio: { type: 'string' },
      avatar: { type: 'string', format: 'uri' },
      user: { $ref: '#/components/schemas/SocialUser' },
      settings: { $ref: '#/components/schemas/ProfileSettings' },
    },
  })
  .openapi('UserProfile')

type SocialUserType = {
  id: string
  username: string
  profile?: z.infer<typeof UserProfileSchema>
  followers?: SocialUserType[]
  following?: SocialUserType[]
  posts?: z.infer<typeof PostSchema>[]
  blockedUsers?: SocialUserType[]
}

type PostType = {
  id: string
  content: string
  author: z.infer<typeof SocialUserSchema>
  likes?: z.infer<typeof SocialUserSchema>[]
  reposts?: PostType[]
  replyTo?: PostType
  replies?: PostType[]
  mentions?: z.infer<typeof SocialUserSchema>[]
}

const FileOwnerSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    name: z.string().optional().openapi({ type: 'string' }),
    ownedFiles: z
      .array(FileSystemEntrySchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/FileSystemEntry' } }),
    homeDirectory: FileSystemEntrySchema,
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      ownedFiles: { type: 'array', items: { $ref: '#/components/schemas/FileSystemEntry' } },
      homeDirectory: { $ref: '#/components/schemas/FileSystemEntry' },
    },
  })
  .openapi('FileOwner')

const AccessControlEntrySchema = z
  .object({
    principal: FileOwnerSchema,
    permissions: FilePermissionsSchema,
    entry: FileSystemEntrySchema,
  })
  .openapi({
    type: 'object',
    properties: {
      principal: { $ref: '#/components/schemas/FileOwner' },
      permissions: { $ref: '#/components/schemas/FilePermissions' },
      entry: { $ref: '#/components/schemas/FileSystemEntry' },
    },
  })
  .openapi('AccessControlEntry')

const FilePermissionsSchema = z
  .object({
    read: z.boolean().openapi({ type: 'boolean' }),
    write: z.boolean().openapi({ type: 'boolean' }),
    execute: z.boolean().openapi({ type: 'boolean' }),
    acl: z
      .array(AccessControlEntrySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/AccessControlEntry' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      read: { type: 'boolean' },
      write: { type: 'boolean' },
      execute: { type: 'boolean' },
      acl: { type: 'array', items: { $ref: '#/components/schemas/AccessControlEntry' } },
    },
  })
  .openapi('FilePermissions')

const FileSystemEntrySchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['file', 'directory', 'symlink'])
      .openapi({ type: 'string', enum: ['file', 'directory', 'symlink'] }),
    permissions: FilePermissionsSchema,
    owner: FileOwnerSchema,
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string', enum: ['file', 'directory', 'symlink'] },
      permissions: { $ref: '#/components/schemas/FilePermissions' },
      owner: { $ref: '#/components/schemas/FileOwner' },
    },
  })
  .openapi('FileSystemEntry')

const CommentThreadSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    rootComment: CommentSchema,
    allComments: z
      .array(CommentSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      rootComment: { $ref: '#/components/schemas/Comment' },
      allComments: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
    },
  })
  .openapi('CommentThread')

const CommentSchema: z.ZodType<CommentType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        content: z.string().openapi({ type: 'string' }),
        author: CommentAuthorSchema,
        parent: CommentSchema,
        replies: z
          .array(CommentSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
        thread: CommentThreadSchema,
        quotedComment: CommentSchema,
      })
      .openapi({
        type: 'object',
        required: ['id', 'content'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          content: { type: 'string' },
          author: { $ref: '#/components/schemas/CommentAuthor' },
          parent: { $ref: '#/components/schemas/Comment' },
          replies: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
          thread: { $ref: '#/components/schemas/CommentThread' },
          quotedComment: { $ref: '#/components/schemas/Comment' },
        },
      }),
  )
  .openapi('Comment')

const CommentAuthorSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
    recentComments: z
      .array(CommentSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      recentComments: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
    },
  })
  .openapi('CommentAuthor')

type CommentType = {
  id: string
  content: string
  author?: z.infer<typeof CommentAuthorSchema>
  parent?: CommentType
  replies?: CommentType[]
  thread?: z.infer<typeof CommentThreadSchema>
  quotedComment?: CommentType
}

const LiteralExpressionSchema = z
  .object({
    type: z.literal('literal').openapi({ type: 'string' }),
    value: z
      .union([
        z.string().openapi({ type: 'string' }),
        z.number().optional().openapi({ type: 'number' }),
        z.boolean().optional().openapi({ type: 'boolean' }),
      ])
      .optional()
      .openapi({ oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'value'],
    properties: {
      type: { type: 'string', const: 'literal' },
      value: { oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
    },
  })
  .openapi('LiteralExpression')

const UnaryExpressionSchema = z
  .object({
    type: z.literal('unary').openapi({ type: 'string' }),
    operator: z.enum(['-', '!', '~']).openapi({ type: 'string', enum: ['-', '!', '~'] }),
    operand: ExpressionSchema,
  })
  .openapi({
    type: 'object',
    required: ['type', 'operator', 'operand'],
    properties: {
      type: { type: 'string', const: 'unary' },
      operator: { type: 'string', enum: ['-', '!', '~'] },
      operand: { $ref: '#/components/schemas/Expression' },
    },
  })
  .openapi('UnaryExpression')

const ConditionalExpressionSchema = z
  .object({
    type: z.literal('conditional').openapi({ type: 'string' }),
    condition: ExpressionSchema,
    consequent: ExpressionSchema,
    alternate: ExpressionSchema,
  })
  .openapi({
    type: 'object',
    required: ['type', 'condition', 'consequent', 'alternate'],
    properties: {
      type: { type: 'string', const: 'conditional' },
      condition: { $ref: '#/components/schemas/Expression' },
      consequent: { $ref: '#/components/schemas/Expression' },
      alternate: { $ref: '#/components/schemas/Expression' },
    },
  })
  .openapi('ConditionalExpression')

const FunctionCallExpressionSchema = z
  .object({
    type: z.literal('call').openapi({ type: 'string' }),
    callee: ExpressionSchema,
    arguments: z
      .array(ExpressionSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Expression' } }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'callee', 'arguments'],
    properties: {
      type: { type: 'string', const: 'call' },
      callee: { $ref: '#/components/schemas/Expression' },
      arguments: { type: 'array', items: { $ref: '#/components/schemas/Expression' } },
    },
  })
  .openapi('FunctionCallExpression')

const ExpressionSchema: z.ZodType<ExpressionType> = z
  .lazy(() =>
    z
      .union([
        LiteralExpressionSchema,
        BinaryExpressionSchema,
        UnaryExpressionSchema,
        ConditionalExpressionSchema,
        FunctionCallExpressionSchema,
      ])
      .optional()
      .openapi({
        oneOf: [
          { $ref: '#/components/schemas/LiteralExpression' },
          { $ref: '#/components/schemas/BinaryExpression' },
          { $ref: '#/components/schemas/UnaryExpression' },
          { $ref: '#/components/schemas/ConditionalExpression' },
          { $ref: '#/components/schemas/FunctionCallExpression' },
        ],
      }),
  )
  .openapi('Expression')

const BinaryExpressionSchema = z
  .object({
    type: z.literal('binary').openapi({ type: 'string' }),
    operator: z
      .enum(['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'])
      .openapi({ type: 'string', enum: ['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'] }),
    left: ExpressionSchema,
    right: ExpressionSchema,
  })
  .openapi({
    type: 'object',
    required: ['type', 'operator', 'left', 'right'],
    properties: {
      type: { type: 'string', const: 'binary' },
      operator: { type: 'string', enum: ['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'] },
      left: { $ref: '#/components/schemas/Expression' },
      right: { $ref: '#/components/schemas/Expression' },
    },
  })
  .openapi('BinaryExpression')

type ExpressionType =
  | z.infer<typeof LiteralExpressionSchema>
  | z.infer<typeof BinaryExpressionSchema>
  | z.infer<typeof UnaryExpressionSchema>
  | z.infer<typeof ConditionalExpressionSchema>
  | z.infer<typeof FunctionCallExpressionSchema>

const CategorySchema: z.ZodType<CategoryType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().openapi({ type: 'string' }),
        name: z.string().openapi({ type: 'string' }),
        parent: CategorySchema,
        children: z
          .array(CategorySchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        ancestors: z
          .array(CategorySchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        descendants: z
          .array(CategorySchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        relatedCategories: z
          .record(z.string(), CategorySchema)
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/Category' },
          }),
        products: z
          .array(CategorizedProductSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/CategorizedProduct' } }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          parent: { $ref: '#/components/schemas/Category' },
          children: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
          ancestors: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
          descendants: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
          relatedCategories: {
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/Category' },
          },
          products: { type: 'array', items: { $ref: '#/components/schemas/CategorizedProduct' } },
        },
      }),
  )
  .openapi('Category')

const CategorizedProductSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    name: z.string().optional().openapi({ type: 'string' }),
    primaryCategory: CategorySchema,
    secondaryCategories: z
      .array(CategorySchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      primaryCategory: { $ref: '#/components/schemas/Category' },
      secondaryCategories: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
    },
  })
  .openapi('CategorizedProduct')

type CategoryType = {
  id: string
  name: string
  parent?: CategoryType
  children?: CategoryType[]
  ancestors?: CategoryType[]
  descendants?: CategoryType[]
  relatedCategories?: Record<string, CategoryType>
  products?: z.infer<typeof CategorizedProductSchema>[]
}

const WorkflowActionSchema: z.ZodType<WorkflowActionType> = z
  .lazy(() =>
    z
      .object({
        type: z.string().optional().openapi({ type: 'string' }),
        config: z.object({}).openapi({ type: 'object' }),
        nextAction: WorkflowActionSchema,
        fallbackAction: WorkflowActionSchema,
        triggerTransition: StateTransitionSchema,
      })
      .openapi({
        type: 'object',
        properties: {
          type: { type: 'string' },
          config: { type: 'object' },
          nextAction: { $ref: '#/components/schemas/WorkflowAction' },
          fallbackAction: { $ref: '#/components/schemas/WorkflowAction' },
          triggerTransition: { $ref: '#/components/schemas/StateTransition' },
        },
      }),
  )
  .openapi('WorkflowAction')

const WorkflowStateSchema: z.ZodType<WorkflowStateType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().openapi({ type: 'string' }),
        name: z.string().openapi({ type: 'string' }),
        description: z.string().optional().openapi({ type: 'string' }),
        transitions: z
          .array(StateTransitionSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/StateTransition' } }),
        entryActions: z
          .array(WorkflowActionSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } }),
        exitActions: z
          .array(WorkflowActionSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } }),
        parentState: WorkflowStateSchema,
        childStates: z
          .array(WorkflowStateSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowState' } }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          transitions: { type: 'array', items: { $ref: '#/components/schemas/StateTransition' } },
          entryActions: { type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } },
          exitActions: { type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } },
          parentState: { $ref: '#/components/schemas/WorkflowState' },
          childStates: { type: 'array', items: { $ref: '#/components/schemas/WorkflowState' } },
        },
      }),
  )
  .openapi('WorkflowState')

const TransitionGuardSchema = z
  .object({
    condition: z.string().openapi({ type: 'string' }),
    relatedTransitions: z
      .array(StateTransitionSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/StateTransition' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      condition: { type: 'string' },
      relatedTransitions: {
        type: 'array',
        items: { $ref: '#/components/schemas/StateTransition' },
      },
    },
  })
  .openapi('TransitionGuard')

const StateTransitionSchema = z
  .object({
    event: z.string().openapi({ type: 'string' }),
    sourceState: WorkflowStateSchema,
    targetState: WorkflowStateSchema,
    guard: TransitionGuardSchema,
    actions: z
      .array(WorkflowActionSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } }),
  })
  .openapi({
    type: 'object',
    required: ['event', 'targetState'],
    properties: {
      event: { type: 'string' },
      sourceState: { $ref: '#/components/schemas/WorkflowState' },
      targetState: { $ref: '#/components/schemas/WorkflowState' },
      guard: { $ref: '#/components/schemas/TransitionGuard' },
      actions: { type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } },
    },
  })
  .openapi('StateTransition')

type WorkflowStateType = {
  id: string
  name: string
  description?: string
  transitions?: z.infer<typeof StateTransitionSchema>[]
  entryActions?: z.infer<typeof WorkflowActionSchema>[]
  exitActions?: z.infer<typeof WorkflowActionSchema>[]
  parentState?: WorkflowStateType
  childStates?: WorkflowStateType[]
}

type WorkflowActionType = {
  type?: string
  config?: Record<string, unknown>
  nextAction?: WorkflowActionType
  fallbackAction?: WorkflowActionType
  triggerTransition?: z.infer<typeof StateTransitionSchema>
}

const ExtendedEntitySchema: z.ZodType<ExtendedEntityType> = z
  .lazy(() =>
    z
      .intersection(
        BaseEntitySchema,
        z
          .object({
            name: z.string().optional().openapi({ type: 'string' }),
            parent: ExtendedEntitySchema,
            baseReference: BaseEntitySchema,
          })
          .openapi({
            type: 'object',
            properties: {
              name: { type: 'string' },
              parent: { $ref: '#/components/schemas/ExtendedEntity' },
              baseReference: { $ref: '#/components/schemas/BaseEntity' },
            },
          }),
      )
      .optional()
      .openapi({
        allOf: [
          { $ref: '#/components/schemas/BaseEntity' },
          {
            type: 'object',
            properties: {
              name: { type: 'string' },
              parent: { $ref: '#/components/schemas/ExtendedEntity' },
              baseReference: { $ref: '#/components/schemas/BaseEntity' },
            },
          },
        ],
      }),
  )
  .openapi('ExtendedEntity')

const BaseEntitySchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    relatedEntity: ExtendedEntitySchema,
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      relatedEntity: { $ref: '#/components/schemas/ExtendedEntity' },
    },
  })
  .openapi('BaseEntity')

type ExtendedEntityType = z.infer<typeof BaseEntitySchema> & {
  name?: string
  parent?: ExtendedEntityType
  baseReference?: z.infer<typeof BaseEntitySchema>
}

type RecursiveMapType = {
  key?: string
  value?: string
  nested?: Record<string, RecursiveMapType>
  items?: RecursiveMapType[]
}

const RecursiveMapSchema: z.ZodType<RecursiveMapType> = z
  .lazy(() =>
    z
      .object({
        key: z.string().optional().openapi({ type: 'string' }),
        value: z.string().optional().openapi({ type: 'string' }),
        nested: z
          .record(z.string(), RecursiveMapSchema)
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/RecursiveMap' },
          }),
        items: z
          .array(RecursiveMapSchema)
          .optional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/RecursiveMap' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          key: { type: 'string' },
          value: { type: 'string' },
          nested: {
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/RecursiveMap' },
          },
          items: { type: 'array', items: { $ref: '#/components/schemas/RecursiveMap' } },
        },
      }),
  )
  .openapi('RecursiveMap')

type NullableCircularType = {
  id?: string
  next?: NullableCircularType | (Record<string, unknown> | null)
  prev?: { id?: string; next?: NullableCircularType } | null
}

const NullableCircularSchema: z.ZodType<NullableCircularType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().openapi({ type: 'string' }),
        next: z
          .union([NullableCircularSchema, z.null().nullable().openapi({ type: 'null' })])
          .optional()
          .openapi({
            oneOf: [{ $ref: '#/components/schemas/NullableCircular' }, { type: 'null' }],
          }),
        prev: z
          .object({ id: z.string().openapi({ type: 'string' }), next: NullableCircularSchema })
          .nullable()
          .optional()
          .openapi({
            type: ['object', 'null'],
            properties: {
              id: { type: 'string' },
              next: { $ref: '#/components/schemas/NullableCircular' },
            },
          }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          next: { oneOf: [{ $ref: '#/components/schemas/NullableCircular' }, { type: 'null' }] },
          prev: {
            type: ['object', 'null'],
            properties: {
              id: { type: 'string' },
              next: { $ref: '#/components/schemas/NullableCircular' },
            },
          },
        },
      }),
  )
  .openapi('NullableCircular')

export const getTreesRoute = createRoute({
  method: 'get',
  path: '/trees',
  operationId: 'getTrees',
  responses: {
    200: {
      description: 'Tree structures',
      content: {
        'application/json': {
          schema: z
            .array(TreeNodeSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/TreeNode' } }),
        },
      },
    },
  },
})

export const postTreesRoute = createRoute({
  method: 'post',
  path: '/trees',
  operationId: 'createTree',
  request: { body: { content: { 'application/json': { schema: TreeNodeSchema } } } },
  responses: { 201: { description: 'Created' } },
})

export const getGraphsRoute = createRoute({
  method: 'get',
  path: '/graphs',
  operationId: 'getGraphs',
  responses: {
    200: {
      description: 'Graph structures',
      content: { 'application/json': { schema: GraphSchema } },
    },
  },
})

export const getLinkedListsRoute = createRoute({
  method: 'get',
  path: '/linked-lists',
  operationId: 'getLinkedLists',
  responses: {
    200: {
      description: 'Linked list',
      content: { 'application/json': { schema: LinkedListNodeSchema } },
    },
  },
})

export const getSocialNetworkRoute = createRoute({
  method: 'get',
  path: '/social-network',
  operationId: 'getSocialNetwork',
  responses: {
    200: {
      description: 'Social network data',
      content: { 'application/json': { schema: SocialUserSchema } },
    },
  },
})

export const getFileSystemRoute = createRoute({
  method: 'get',
  path: '/file-system',
  operationId: 'getFileSystem',
  responses: {
    200: {
      description: 'File system structure',
      content: { 'application/json': { schema: FileSystemEntrySchema } },
    },
  },
})

export const getCommentsRoute = createRoute({
  method: 'get',
  path: '/comments',
  operationId: 'getComments',
  responses: {
    200: {
      description: 'Nested comments',
      content: {
        'application/json': {
          schema: z
            .array(CommentSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
        },
      },
    },
  },
})

export const getPolymorphicRoute = createRoute({
  method: 'get',
  path: '/polymorphic',
  operationId: 'getPolymorphic',
  responses: {
    200: {
      description: 'Polymorphic circular reference',
      content: { 'application/json': { schema: ExpressionSchema } },
    },
  },
})

export const getCategoriesRoute = createRoute({
  method: 'get',
  path: '/categories',
  operationId: 'getCategories',
  responses: {
    200: {
      description: 'Category hierarchy',
      content: { 'application/json': { schema: CategorySchema } },
    },
  },
})

export const getWorkflowRoute = createRoute({
  method: 'get',
  path: '/workflow',
  operationId: 'getWorkflow',
  responses: {
    200: {
      description: 'Workflow with circular state transitions',
      content: { 'application/json': { schema: WorkflowStateSchema } },
    },
  },
})
