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
        id: z.uuid(),
        value: z.string(),
        parent: TreeNodeSchema.exactOptional(),
        children: z.array(TreeNodeSchema).exactOptional(),
        metadata: z.record(z.string(), TreeNodeSchema).exactOptional(),
      })
      .openapi({ required: ['id', 'value'] }),
  )
  .openapi('TreeNode')

const LinkedListSchema: z.ZodType<LinkedListType> = z
  .lazy(() =>
    z.object({
      head: LinkedListNodeSchema.exactOptional(),
      tail: LinkedListNodeSchema.exactOptional(),
      length: z.int().exactOptional(),
    }),
  )
  .openapi('LinkedList')

type LinkedListNodeType = {
  value: string
  prev?: LinkedListNodeType
  next?: LinkedListNodeType
  list?: z.infer<typeof LinkedListSchema>
}

const LinkedListNodeSchema: z.ZodType<LinkedListNodeType> = z
  .lazy(() =>
    z
      .object({
        value: z.string(),
        prev: LinkedListNodeSchema.exactOptional(),
        next: LinkedListNodeSchema.exactOptional(),
        list: LinkedListSchema.exactOptional(),
      })
      .openapi({ required: ['value'] }),
  )
  .openapi('LinkedListNode')

type LinkedListType = {
  head?: z.infer<typeof LinkedListNodeSchema>
  tail?: z.infer<typeof LinkedListNodeSchema>
  length?: number
}

const GraphNodeSchema: z.ZodType<GraphNodeType> = z
  .lazy(() =>
    z
      .object({
        id: z.string(),
        data: z.object({}).exactOptional(),
        edges: z.array(GraphEdgeSchema).exactOptional(),
        graph: GraphSchema.exactOptional(),
      })
      .openapi({ required: ['id'] }),
  )
  .openapi('GraphNode')

const GraphMetadataSchema: z.ZodType<GraphMetadataType> = z
  .lazy(() =>
    z.object({ name: z.string().exactOptional(), rootNode: GraphNodeSchema.exactOptional() }),
  )
  .openapi('GraphMetadata')

type GraphType = {
  id?: string
  nodes: z.infer<typeof GraphNodeSchema>[]
  metadata?: z.infer<typeof GraphMetadataSchema>
}

const GraphSchema: z.ZodType<GraphType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().exactOptional(),
        nodes: z.array(GraphNodeSchema),
        metadata: GraphMetadataSchema.exactOptional(),
      })
      .openapi({ required: ['nodes'] }),
  )
  .openapi('Graph')

const GraphEdgeSchema: z.ZodType<GraphEdgeType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().exactOptional(),
        source: GraphNodeSchema,
        target: GraphNodeSchema,
        weight: z.number().exactOptional(),
        metadata: EdgeMetadataSchema.exactOptional(),
      })
      .openapi({ required: ['source', 'target'] }),
  )
  .openapi('GraphEdge')

type GraphNodeType = {
  id: string
  data?: Record<string, unknown>
  edges?: z.infer<typeof GraphEdgeSchema>[]
  graph?: z.infer<typeof GraphSchema>
}

const EdgeMetadataSchema: z.ZodType<EdgeMetadataType> = z
  .lazy(() =>
    z.object({
      label: z.string().exactOptional(),
      relatedEdges: z.array(GraphEdgeSchema).exactOptional(),
    }),
  )
  .openapi('EdgeMetadata')

type GraphEdgeType = {
  id?: string
  source: z.infer<typeof GraphNodeSchema>
  target: z.infer<typeof GraphNodeSchema>
  weight?: number
  metadata?: z.infer<typeof EdgeMetadataSchema>
}

type GraphMetadataType = { name?: string; rootNode?: z.infer<typeof GraphNodeSchema> }

type EdgeMetadataType = { label?: string; relatedEdges?: z.infer<typeof GraphEdgeSchema>[] }

const UserProfileSchema: z.ZodType<UserProfileType> = z
  .lazy(() =>
    z.object({
      bio: z.string().exactOptional(),
      avatar: z.url().exactOptional(),
      user: SocialUserSchema.exactOptional(),
      settings: ProfileSettingsSchema.exactOptional(),
    }),
  )
  .openapi('UserProfile')

const PostSchema: z.ZodType<PostType> = z
  .lazy(() =>
    z
      .object({
        id: z.string(),
        content: z.string(),
        author: SocialUserSchema,
        likes: z.array(SocialUserSchema).exactOptional(),
        reposts: z.array(PostSchema).exactOptional(),
        replyTo: PostSchema.exactOptional(),
        replies: z.array(PostSchema).exactOptional(),
        mentions: z.array(SocialUserSchema).exactOptional(),
      })
      .openapi({ required: ['id', 'content', 'author'] }),
  )
  .openapi('Post')

type SocialUserType = {
  id: string
  username: string
  profile?: z.infer<typeof UserProfileSchema>
  followers?: SocialUserType[]
  following?: SocialUserType[]
  posts?: z.infer<typeof PostSchema>[]
  blockedUsers?: SocialUserType[]
}

const SocialUserSchema: z.ZodType<SocialUserType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid(),
        username: z.string(),
        profile: UserProfileSchema.exactOptional(),
        followers: z.array(SocialUserSchema).exactOptional(),
        following: z.array(SocialUserSchema).exactOptional(),
        posts: z.array(PostSchema).exactOptional(),
        blockedUsers: z.array(SocialUserSchema).exactOptional(),
      })
      .openapi({ required: ['id', 'username'] }),
  )
  .openapi('SocialUser')

const ProfileSettingsSchema: z.ZodType<ProfileSettingsType> = z
  .lazy(() =>
    z.object({
      privacy: z.string().exactOptional(),
      notifications: z.boolean().exactOptional(),
      profile: UserProfileSchema.exactOptional(),
    }),
  )
  .openapi('ProfileSettings')

type UserProfileType = {
  bio?: string
  avatar?: string
  user?: z.infer<typeof SocialUserSchema>
  settings?: z.infer<typeof ProfileSettingsSchema>
}

type ProfileSettingsType = {
  privacy?: string
  notifications?: boolean
  profile?: z.infer<typeof UserProfileSchema>
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

const FilePermissionsSchema: z.ZodType<FilePermissionsType> = z
  .lazy(() =>
    z.object({
      read: z.boolean().exactOptional(),
      write: z.boolean().exactOptional(),
      execute: z.boolean().exactOptional(),
      acl: z.array(AccessControlEntrySchema).exactOptional(),
    }),
  )
  .openapi('FilePermissions')

const FileOwnerSchema: z.ZodType<FileOwnerType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      name: z.string().exactOptional(),
      ownedFiles: z.array(FileSystemEntrySchema).exactOptional(),
      homeDirectory: FileSystemEntrySchema.exactOptional(),
    }),
  )
  .openapi('FileOwner')

type FileSystemEntryType = {
  name: string
  type: 'file' | 'directory' | 'symlink'
  permissions?: z.infer<typeof FilePermissionsSchema>
  owner?: z.infer<typeof FileOwnerSchema>
}

const FileSystemEntrySchema: z.ZodType<FileSystemEntryType> = z
  .lazy(() =>
    z
      .object({
        name: z.string(),
        type: z.enum(['file', 'directory', 'symlink']),
        permissions: FilePermissionsSchema.exactOptional(),
        owner: FileOwnerSchema.exactOptional(),
      })
      .openapi({ required: ['name', 'type'] }),
  )
  .openapi('FileSystemEntry')

const AccessControlEntrySchema: z.ZodType<AccessControlEntryType> = z
  .lazy(() =>
    z.object({
      principal: FileOwnerSchema.exactOptional(),
      permissions: FilePermissionsSchema.exactOptional(),
      entry: FileSystemEntrySchema.exactOptional(),
    }),
  )
  .openapi('AccessControlEntry')

type FilePermissionsType = {
  read?: boolean
  write?: boolean
  execute?: boolean
  acl?: z.infer<typeof AccessControlEntrySchema>[]
}

type AccessControlEntryType = {
  principal?: z.infer<typeof FileOwnerSchema>
  permissions?: z.infer<typeof FilePermissionsSchema>
  entry?: z.infer<typeof FileSystemEntrySchema>
}

type FileOwnerType = {
  id?: string
  name?: string
  ownedFiles?: z.infer<typeof FileSystemEntrySchema>[]
  homeDirectory?: z.infer<typeof FileSystemEntrySchema>
}

const CommentAuthorSchema: z.ZodType<CommentAuthorType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      name: z.string().exactOptional(),
      recentComments: z.array(CommentSchema).exactOptional(),
    }),
  )
  .openapi('CommentAuthor')

const CommentThreadSchema: z.ZodType<CommentThreadType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      rootComment: CommentSchema.exactOptional(),
      allComments: z.array(CommentSchema).exactOptional(),
    }),
  )
  .openapi('CommentThread')

type CommentType = {
  id: string
  content: string
  author?: z.infer<typeof CommentAuthorSchema>
  parent?: CommentType
  replies?: CommentType[]
  thread?: z.infer<typeof CommentThreadSchema>
  quotedComment?: CommentType
}

const CommentSchema: z.ZodType<CommentType> = z
  .lazy(() =>
    z
      .object({
        id: z.uuid(),
        content: z.string(),
        author: CommentAuthorSchema.exactOptional(),
        parent: CommentSchema.exactOptional(),
        replies: z.array(CommentSchema).exactOptional(),
        thread: CommentThreadSchema.exactOptional(),
        quotedComment: CommentSchema.exactOptional(),
      })
      .openapi({ required: ['id', 'content'] }),
  )
  .openapi('Comment')

type CommentAuthorType = {
  id?: string
  name?: string
  recentComments?: z.infer<typeof CommentSchema>[]
}

type CommentThreadType = {
  id?: string
  rootComment?: z.infer<typeof CommentSchema>
  allComments?: z.infer<typeof CommentSchema>[]
}

const LiteralExpressionSchema = z
  .object({ type: z.literal('literal'), value: z.xor([z.string(), z.number(), z.boolean()]) })
  .openapi({ required: ['type', 'value'] })
  .openapi('LiteralExpression')

const BinaryExpressionSchema: z.ZodType<BinaryExpressionType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('binary'),
        operator: z.enum(['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||']),
        left: ExpressionSchema,
        right: ExpressionSchema,
      })
      .openapi({ required: ['type', 'operator', 'left', 'right'] }),
  )
  .openapi('BinaryExpression')

const UnaryExpressionSchema: z.ZodType<UnaryExpressionType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('unary'),
        operator: z.enum(['-', '!', '~']),
        operand: ExpressionSchema,
      })
      .openapi({ required: ['type', 'operator', 'operand'] }),
  )
  .openapi('UnaryExpression')

const ConditionalExpressionSchema: z.ZodType<ConditionalExpressionType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('conditional'),
        condition: ExpressionSchema,
        consequent: ExpressionSchema,
        alternate: ExpressionSchema,
      })
      .openapi({ required: ['type', 'condition', 'consequent', 'alternate'] }),
  )
  .openapi('ConditionalExpression')

const FunctionCallExpressionSchema: z.ZodType<FunctionCallExpressionType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('call'),
        callee: ExpressionSchema,
        arguments: z.array(ExpressionSchema),
      })
      .openapi({ required: ['type', 'callee', 'arguments'] }),
  )
  .openapi('FunctionCallExpression')

type ExpressionType =
  | z.infer<typeof LiteralExpressionSchema>
  | z.infer<typeof BinaryExpressionSchema>
  | z.infer<typeof UnaryExpressionSchema>
  | z.infer<typeof ConditionalExpressionSchema>
  | z.infer<typeof FunctionCallExpressionSchema>

const ExpressionSchema: z.ZodType<ExpressionType> = z
  .lazy(() =>
    z.xor([
      LiteralExpressionSchema,
      BinaryExpressionSchema,
      UnaryExpressionSchema,
      ConditionalExpressionSchema,
      FunctionCallExpressionSchema,
    ]),
  )
  .openapi('Expression')

type BinaryExpressionType = {
  type: 'binary'
  operator: '+' | '-' | '*' | '/' | '==' | '!=' | '<' | '>' | '&&' | '||'
  left: z.infer<typeof ExpressionSchema>
  right: z.infer<typeof ExpressionSchema>
}

type UnaryExpressionType = {
  type: 'unary'
  operator: '-' | '!' | '~'
  operand: z.infer<typeof ExpressionSchema>
}

type ConditionalExpressionType = {
  type: 'conditional'
  condition: z.infer<typeof ExpressionSchema>
  consequent: z.infer<typeof ExpressionSchema>
  alternate: z.infer<typeof ExpressionSchema>
}

type FunctionCallExpressionType = {
  type: 'call'
  callee: z.infer<typeof ExpressionSchema>
  arguments: z.infer<typeof ExpressionSchema>[]
}

const CategorizedProductSchema: z.ZodType<CategorizedProductType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      name: z.string().exactOptional(),
      primaryCategory: CategorySchema.exactOptional(),
      secondaryCategories: z.array(CategorySchema).exactOptional(),
    }),
  )
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

const CategorySchema: z.ZodType<CategoryType> = z
  .lazy(() =>
    z
      .object({
        id: z.string(),
        name: z.string(),
        parent: CategorySchema.exactOptional(),
        children: z.array(CategorySchema).exactOptional(),
        ancestors: z.array(CategorySchema).exactOptional(),
        descendants: z.array(CategorySchema).exactOptional(),
        relatedCategories: z.record(z.string(), CategorySchema).exactOptional(),
        products: z.array(CategorizedProductSchema).exactOptional(),
      })
      .openapi({ required: ['id', 'name'] }),
  )
  .openapi('Category')

type CategorizedProductType = {
  id?: string
  name?: string
  primaryCategory?: z.infer<typeof CategorySchema>
  secondaryCategories?: z.infer<typeof CategorySchema>[]
}

const StateTransitionSchema: z.ZodType<StateTransitionType> = z
  .lazy(() =>
    z
      .object({
        event: z.string(),
        sourceState: WorkflowStateSchema.exactOptional(),
        targetState: WorkflowStateSchema,
        guard: TransitionGuardSchema.exactOptional(),
        actions: z.array(WorkflowActionSchema).exactOptional(),
      })
      .openapi({ required: ['event', 'targetState'] }),
  )
  .openapi('StateTransition')

const WorkflowActionSchema: z.ZodType<WorkflowActionType> = z
  .lazy(() =>
    z.object({
      type: z.string().exactOptional(),
      config: z.object({}).exactOptional(),
      nextAction: WorkflowActionSchema.exactOptional(),
      fallbackAction: WorkflowActionSchema.exactOptional(),
      triggerTransition: StateTransitionSchema.exactOptional(),
    }),
  )
  .openapi('WorkflowAction')

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

const WorkflowStateSchema: z.ZodType<WorkflowStateType> = z
  .lazy(() =>
    z
      .object({
        id: z.string(),
        name: z.string(),
        description: z.string().exactOptional(),
        transitions: z.array(StateTransitionSchema).exactOptional(),
        entryActions: z.array(WorkflowActionSchema).exactOptional(),
        exitActions: z.array(WorkflowActionSchema).exactOptional(),
        parentState: WorkflowStateSchema.exactOptional(),
        childStates: z.array(WorkflowStateSchema).exactOptional(),
      })
      .openapi({ required: ['id', 'name'] }),
  )
  .openapi('WorkflowState')

const TransitionGuardSchema: z.ZodType<TransitionGuardType> = z
  .lazy(() =>
    z.object({
      condition: z.string().exactOptional(),
      relatedTransitions: z.array(StateTransitionSchema).exactOptional(),
    }),
  )
  .openapi('TransitionGuard')

type StateTransitionType = {
  event: string
  sourceState?: z.infer<typeof WorkflowStateSchema>
  targetState: z.infer<typeof WorkflowStateSchema>
  guard?: z.infer<typeof TransitionGuardSchema>
  actions?: z.infer<typeof WorkflowActionSchema>[]
}

type TransitionGuardType = {
  condition?: string
  relatedTransitions?: z.infer<typeof StateTransitionSchema>[]
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
    BaseEntitySchema.and(
      z.object({
        name: z.string().exactOptional(),
        parent: ExtendedEntitySchema.exactOptional(),
        baseReference: BaseEntitySchema.exactOptional(),
      }),
    ),
  )
  .openapi('ExtendedEntity')

type BaseEntityType = { id?: string; relatedEntity?: z.infer<typeof ExtendedEntitySchema> }

const BaseEntitySchema: z.ZodType<BaseEntityType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      relatedEntity: ExtendedEntitySchema.exactOptional(),
    }),
  )
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
    z.object({
      key: z.string().exactOptional(),
      value: z.string().exactOptional(),
      nested: z.record(z.string(), RecursiveMapSchema).exactOptional(),
      items: z.array(RecursiveMapSchema).exactOptional(),
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
    z.object({
      id: z.string().exactOptional(),
      next: z.xor([NullableCircularSchema, z.null().nullable()]).exactOptional(),
      prev: z
        .object({ id: z.string().exactOptional(), next: NullableCircularSchema.exactOptional() })
        .nullable()
        .exactOptional(),
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
      content: { 'application/json': { schema: z.array(TreeNodeSchema) } },
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
      content: { 'application/json': { schema: z.array(CommentSchema) } },
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
