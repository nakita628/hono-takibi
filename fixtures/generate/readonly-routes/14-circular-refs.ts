import { createRoute, z } from '@hono/zod-openapi'

type TreeNodeType = {
  readonly id: string
  readonly value: string
  readonly parent?: TreeNodeType
  readonly children?: readonly TreeNodeType[]
  readonly metadata?: { readonly [key: string]: TreeNodeType }
}

const LinkedListSchema: z.ZodType<LinkedListType> = z
  .lazy(() =>
    z.object({
      head: LinkedListNodeSchema.exactOptional(),
      tail: LinkedListNodeSchema.exactOptional(),
      length: z.int().exactOptional(),
    }),
  )
  .readonly()
  .openapi('LinkedList')

type LinkedListNodeType = {
  readonly value: string
  readonly prev?: LinkedListNodeType
  readonly next?: LinkedListNodeType
  readonly list?: z.infer<typeof LinkedListSchema>
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
  .readonly()
  .openapi('LinkedListNode')

type LinkedListType = {
  readonly head?: z.infer<typeof LinkedListNodeSchema>
  readonly tail?: z.infer<typeof LinkedListNodeSchema>
  readonly length?: number
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
  .readonly()
  .openapi('GraphNode')

const GraphMetadataSchema: z.ZodType<GraphMetadataType> = z
  .lazy(() =>
    z.object({ name: z.string().exactOptional(), rootNode: GraphNodeSchema.exactOptional() }),
  )
  .readonly()
  .openapi('GraphMetadata')

type GraphType = {
  readonly id?: string
  readonly nodes: readonly z.infer<typeof GraphNodeSchema>[]
  readonly metadata?: z.infer<typeof GraphMetadataSchema>
}

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
  .readonly()
  .openapi('GraphEdge')

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
  .readonly()
  .openapi('Graph')

type GraphNodeType = {
  readonly id: string
  readonly data?: { readonly [key: string]: unknown }
  readonly edges?: readonly z.infer<typeof GraphEdgeSchema>[]
  readonly graph?: z.infer<typeof GraphSchema>
}

const EdgeMetadataSchema: z.ZodType<EdgeMetadataType> = z
  .lazy(() =>
    z.object({
      label: z.string().exactOptional(),
      relatedEdges: z.array(GraphEdgeSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('EdgeMetadata')

type GraphEdgeType = {
  readonly id?: string
  readonly source: z.infer<typeof GraphNodeSchema>
  readonly target: z.infer<typeof GraphNodeSchema>
  readonly weight?: number
  readonly metadata?: z.infer<typeof EdgeMetadataSchema>
}

type GraphMetadataType = {
  readonly name?: string
  readonly rootNode?: z.infer<typeof GraphNodeSchema>
}

type EdgeMetadataType = {
  readonly label?: string
  readonly relatedEdges?: readonly z.infer<typeof GraphEdgeSchema>[]
}

const UserProfileSchema: z.ZodType<UserProfileType> = z
  .lazy(() =>
    z.object({
      bio: z.string().exactOptional(),
      avatar: z.url().exactOptional(),
      user: SocialUserSchema.exactOptional(),
      settings: ProfileSettingsSchema.exactOptional(),
    }),
  )
  .readonly()
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
  .readonly()
  .openapi('Post')

type SocialUserType = {
  readonly id: string
  readonly username: string
  readonly profile?: z.infer<typeof UserProfileSchema>
  readonly followers?: readonly SocialUserType[]
  readonly following?: readonly SocialUserType[]
  readonly posts?: readonly z.infer<typeof PostSchema>[]
  readonly blockedUsers?: readonly SocialUserType[]
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
  .readonly()
  .openapi('SocialUser')

const ProfileSettingsSchema: z.ZodType<ProfileSettingsType> = z
  .lazy(() =>
    z.object({
      privacy: z.string().exactOptional(),
      notifications: z.boolean().exactOptional(),
      profile: UserProfileSchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('ProfileSettings')

type UserProfileType = {
  readonly bio?: string
  readonly avatar?: string
  readonly user?: z.infer<typeof SocialUserSchema>
  readonly settings?: z.infer<typeof ProfileSettingsSchema>
}

type ProfileSettingsType = {
  readonly privacy?: string
  readonly notifications?: boolean
  readonly profile?: z.infer<typeof UserProfileSchema>
}

type PostType = {
  readonly id: string
  readonly content: string
  readonly author: z.infer<typeof SocialUserSchema>
  readonly likes?: readonly z.infer<typeof SocialUserSchema>[]
  readonly reposts?: readonly PostType[]
  readonly replyTo?: PostType
  readonly replies?: readonly PostType[]
  readonly mentions?: readonly z.infer<typeof SocialUserSchema>[]
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
  .readonly()
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
  .readonly()
  .openapi('FileOwner')

type FileSystemEntryType = {
  readonly name: string
  readonly type: 'file' | 'directory' | 'symlink'
  readonly permissions?: z.infer<typeof FilePermissionsSchema>
  readonly owner?: z.infer<typeof FileOwnerSchema>
}

const AccessControlEntrySchema: z.ZodType<AccessControlEntryType> = z
  .lazy(() =>
    z.object({
      principal: FileOwnerSchema.exactOptional(),
      permissions: FilePermissionsSchema.exactOptional(),
      entry: FileSystemEntrySchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('AccessControlEntry')

type FilePermissionsType = {
  readonly read?: boolean
  readonly write?: boolean
  readonly execute?: boolean
  readonly acl?: readonly z.infer<typeof AccessControlEntrySchema>[]
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
  .readonly()
  .openapi('FileSystemEntry')

type AccessControlEntryType = {
  readonly principal?: z.infer<typeof FileOwnerSchema>
  readonly permissions?: z.infer<typeof FilePermissionsSchema>
  readonly entry?: z.infer<typeof FileSystemEntrySchema>
}

type FileOwnerType = {
  readonly id?: string
  readonly name?: string
  readonly ownedFiles?: readonly z.infer<typeof FileSystemEntrySchema>[]
  readonly homeDirectory?: z.infer<typeof FileSystemEntrySchema>
}

const CommentAuthorSchema: z.ZodType<CommentAuthorType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      name: z.string().exactOptional(),
      recentComments: z.array(CommentSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('CommentAuthor')

const CommentThreadSchema: z.ZodType<CommentThreadType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      rootComment: CommentSchema.exactOptional(),
      allComments: z.array(CommentSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('CommentThread')

type CommentType = {
  readonly id: string
  readonly content: string
  readonly author?: z.infer<typeof CommentAuthorSchema>
  readonly parent?: CommentType
  readonly replies?: readonly CommentType[]
  readonly thread?: z.infer<typeof CommentThreadSchema>
  readonly quotedComment?: CommentType
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
  .readonly()
  .openapi('Comment')

type CommentAuthorType = {
  readonly id?: string
  readonly name?: string
  readonly recentComments?: readonly z.infer<typeof CommentSchema>[]
}

type CommentThreadType = {
  readonly id?: string
  readonly rootComment?: z.infer<typeof CommentSchema>
  readonly allComments?: readonly z.infer<typeof CommentSchema>[]
}

type LiteralExpressionType = { readonly type: 'literal'; readonly value: string | number | boolean }

const LiteralExpressionSchema: z.ZodType<LiteralExpressionType> = z
  .object({ type: z.literal('literal'), value: z.xor([z.string(), z.number(), z.boolean()]) })
  .openapi({ required: ['type', 'value'] })
  .readonly()
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
  .readonly()
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
  .readonly()
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
  .readonly()
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
  .readonly()
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
  .readonly()
  .openapi('Expression')

type BinaryExpressionType = {
  readonly type: 'binary'
  readonly operator: '+' | '-' | '*' | '/' | '==' | '!=' | '<' | '>' | '&&' | '||'
  readonly left: z.infer<typeof ExpressionSchema>
  readonly right: z.infer<typeof ExpressionSchema>
}

type UnaryExpressionType = {
  readonly type: 'unary'
  readonly operator: '-' | '!' | '~'
  readonly operand: z.infer<typeof ExpressionSchema>
}

type ConditionalExpressionType = {
  readonly type: 'conditional'
  readonly condition: z.infer<typeof ExpressionSchema>
  readonly consequent: z.infer<typeof ExpressionSchema>
  readonly alternate: z.infer<typeof ExpressionSchema>
}

type FunctionCallExpressionType = {
  readonly type: 'call'
  readonly callee: z.infer<typeof ExpressionSchema>
  readonly arguments: readonly z.infer<typeof ExpressionSchema>[]
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
  .readonly()
  .openapi('CategorizedProduct')

type CategoryType = {
  readonly id: string
  readonly name: string
  readonly parent?: CategoryType
  readonly children?: readonly CategoryType[]
  readonly ancestors?: readonly CategoryType[]
  readonly descendants?: readonly CategoryType[]
  readonly relatedCategories?: { readonly [key: string]: CategoryType }
  readonly products?: readonly z.infer<typeof CategorizedProductSchema>[]
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
  .readonly()
  .openapi('Category')

type CategorizedProductType = {
  readonly id?: string
  readonly name?: string
  readonly primaryCategory?: z.infer<typeof CategorySchema>
  readonly secondaryCategories?: readonly z.infer<typeof CategorySchema>[]
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
  .readonly()
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
  .readonly()
  .openapi('WorkflowAction')

type WorkflowStateType = {
  readonly id: string
  readonly name: string
  readonly description?: string
  readonly transitions?: readonly z.infer<typeof StateTransitionSchema>[]
  readonly entryActions?: readonly z.infer<typeof WorkflowActionSchema>[]
  readonly exitActions?: readonly z.infer<typeof WorkflowActionSchema>[]
  readonly parentState?: WorkflowStateType
  readonly childStates?: readonly WorkflowStateType[]
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
  .readonly()
  .openapi('WorkflowState')

const TransitionGuardSchema: z.ZodType<TransitionGuardType> = z
  .lazy(() =>
    z.object({
      condition: z.string().exactOptional(),
      relatedTransitions: z.array(StateTransitionSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('TransitionGuard')

type StateTransitionType = {
  readonly event: string
  readonly sourceState?: z.infer<typeof WorkflowStateSchema>
  readonly targetState: z.infer<typeof WorkflowStateSchema>
  readonly guard?: z.infer<typeof TransitionGuardSchema>
  readonly actions?: readonly z.infer<typeof WorkflowActionSchema>[]
}

type TransitionGuardType = {
  readonly condition?: string
  readonly relatedTransitions?: readonly z.infer<typeof StateTransitionSchema>[]
}

type WorkflowActionType = {
  readonly type?: string
  readonly config?: { readonly [key: string]: unknown }
  readonly nextAction?: WorkflowActionType
  readonly fallbackAction?: WorkflowActionType
  readonly triggerTransition?: z.infer<typeof StateTransitionSchema>
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
  .readonly()
  .openapi('ExtendedEntity')

type BaseEntityType = {
  readonly id?: string
  readonly relatedEntity?: z.infer<typeof ExtendedEntitySchema>
}

const BaseEntitySchema: z.ZodType<BaseEntityType> = z
  .lazy(() =>
    z.object({
      id: z.string().exactOptional(),
      relatedEntity: ExtendedEntitySchema.exactOptional(),
    }),
  )
  .readonly()
  .openapi('BaseEntity')

type ExtendedEntityType = z.infer<typeof BaseEntitySchema> & {
  readonly name?: string
  readonly parent?: ExtendedEntityType
  readonly baseReference?: z.infer<typeof BaseEntitySchema>
}

type RecursiveMapType = {
  readonly key?: string
  readonly value?: string
  readonly nested?: { readonly [key: string]: RecursiveMapType }
  readonly items?: readonly RecursiveMapType[]
}

type NullableCircularType = {
  readonly id?: string
  readonly next?: NullableCircularType | ({ readonly [key: string]: unknown } | null)
  readonly prev?: { readonly id?: string; readonly next?: NullableCircularType } | null
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
  .readonly()
  .openapi('TreeNode')

const RecursiveMapSchema: z.ZodType<RecursiveMapType> = z
  .lazy(() =>
    z.object({
      key: z.string().exactOptional(),
      value: z.string().exactOptional(),
      nested: z.record(z.string(), RecursiveMapSchema).exactOptional(),
      items: z.array(RecursiveMapSchema).exactOptional(),
    }),
  )
  .readonly()
  .openapi('RecursiveMap')

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
  .readonly()
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
} as const)

export const postTreesRoute = createRoute({
  method: 'post',
  path: '/trees',
  operationId: 'createTree',
  request: { body: { content: { 'application/json': { schema: TreeNodeSchema } } } },
  responses: { 201: { description: 'Created' } },
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)

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
} as const)
