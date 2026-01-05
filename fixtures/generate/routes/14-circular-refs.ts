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
        parent: TreeNodeSchema.exactOptional(),
        children: z
          .array(TreeNodeSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/TreeNode' } }),
        metadata: z
          .record(z.string(), TreeNodeSchema)
          .exactOptional()
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

const LinkedListSchema: z.ZodType<LinkedListType> = z
  .lazy(() =>
    z
      .object({
        head: LinkedListNodeSchema.exactOptional(),
        tail: LinkedListNodeSchema.exactOptional(),
        length: z.int().exactOptional().openapi({ type: 'integer' }),
      })
      .openapi({
        type: 'object',
        properties: {
          head: { $ref: '#/components/schemas/LinkedListNode' },
          tail: { $ref: '#/components/schemas/LinkedListNode' },
          length: { type: 'integer' },
        },
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
        value: z.string().openapi({ type: 'string' }),
        prev: LinkedListNodeSchema.exactOptional(),
        next: LinkedListNodeSchema.exactOptional(),
        list: LinkedListSchema.exactOptional(),
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

type LinkedListType = {
  head?: z.infer<typeof LinkedListNodeSchema>
  tail?: z.infer<typeof LinkedListNodeSchema>
  length?: number
}

const GraphNodeSchema: z.ZodType<GraphNodeType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().openapi({ type: 'string' }),
        data: z.object({}).exactOptional().openapi({ type: 'object' }),
        edges: z
          .array(GraphEdgeSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } }),
        graph: GraphSchema.exactOptional(),
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
      }),
  )
  .openapi('GraphNode')

const GraphMetadataSchema: z.ZodType<GraphMetadataType> = z
  .lazy(() =>
    z
      .object({
        name: z.string().exactOptional().openapi({ type: 'string' }),
        rootNode: GraphNodeSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          name: { type: 'string' },
          rootNode: { $ref: '#/components/schemas/GraphNode' },
        },
      }),
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
        id: z.string().exactOptional().openapi({ type: 'string' }),
        nodes: z
          .array(GraphNodeSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphNode' } }),
        metadata: GraphMetadataSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        required: ['nodes'],
        properties: {
          id: { type: 'string' },
          nodes: { type: 'array', items: { $ref: '#/components/schemas/GraphNode' } },
          metadata: { $ref: '#/components/schemas/GraphMetadata' },
        },
      }),
  )
  .openapi('Graph')

const GraphEdgeSchema: z.ZodType<GraphEdgeType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        source: GraphNodeSchema,
        target: GraphNodeSchema,
        weight: z.number().exactOptional().openapi({ type: 'number' }),
        metadata: EdgeMetadataSchema.exactOptional(),
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
      }),
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
    z
      .object({
        label: z.string().exactOptional().openapi({ type: 'string' }),
        relatedEdges: z
          .array(GraphEdgeSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          label: { type: 'string' },
          relatedEdges: { type: 'array', items: { $ref: '#/components/schemas/GraphEdge' } },
        },
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
    z
      .object({
        bio: z.string().exactOptional().openapi({ type: 'string' }),
        avatar: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
        user: SocialUserSchema.exactOptional(),
        settings: ProfileSettingsSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          bio: { type: 'string' },
          avatar: { type: 'string', format: 'uri' },
          user: { $ref: '#/components/schemas/SocialUser' },
          settings: { $ref: '#/components/schemas/ProfileSettings' },
        },
      }),
  )
  .openapi('UserProfile')

const PostSchema: z.ZodType<PostType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().openapi({ type: 'string' }),
        content: z.string().openapi({ type: 'string' }),
        author: SocialUserSchema,
        likes: z
          .array(SocialUserSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
        reposts: z
          .array(PostSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        replyTo: PostSchema.exactOptional(),
        replies: z
          .array(PostSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        mentions: z
          .array(SocialUserSchema)
          .exactOptional()
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
        id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        username: z.string().openapi({ type: 'string' }),
        profile: UserProfileSchema.exactOptional(),
        followers: z
          .array(SocialUserSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
        following: z
          .array(SocialUserSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialUser' } }),
        posts: z
          .array(PostSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Post' } }),
        blockedUsers: z
          .array(SocialUserSchema)
          .exactOptional()
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

const ProfileSettingsSchema: z.ZodType<ProfileSettingsType> = z
  .lazy(() =>
    z
      .object({
        privacy: z.string().exactOptional().openapi({ type: 'string' }),
        notifications: z.boolean().exactOptional().openapi({ type: 'boolean' }),
        profile: UserProfileSchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          privacy: { type: 'string' },
          notifications: { type: 'boolean' },
          profile: { $ref: '#/components/schemas/UserProfile' },
        },
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
    z
      .object({
        read: z.boolean().exactOptional().openapi({ type: 'boolean' }),
        write: z.boolean().exactOptional().openapi({ type: 'boolean' }),
        execute: z.boolean().exactOptional().openapi({ type: 'boolean' }),
        acl: z
          .array(AccessControlEntrySchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/AccessControlEntry' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          read: { type: 'boolean' },
          write: { type: 'boolean' },
          execute: { type: 'boolean' },
          acl: { type: 'array', items: { $ref: '#/components/schemas/AccessControlEntry' } },
        },
      }),
  )
  .openapi('FilePermissions')

const FileOwnerSchema: z.ZodType<FileOwnerType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
        ownedFiles: z
          .array(FileSystemEntrySchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/FileSystemEntry' } }),
        homeDirectory: FileSystemEntrySchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          ownedFiles: { type: 'array', items: { $ref: '#/components/schemas/FileSystemEntry' } },
          homeDirectory: { $ref: '#/components/schemas/FileSystemEntry' },
        },
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
        name: z.string().openapi({ type: 'string' }),
        type: z
          .enum(['file', 'directory', 'symlink'])
          .openapi({ type: 'string', enum: ['file', 'directory', 'symlink'] }),
        permissions: FilePermissionsSchema.exactOptional(),
        owner: FileOwnerSchema.exactOptional(),
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
      }),
  )
  .openapi('FileSystemEntry')

const AccessControlEntrySchema: z.ZodType<AccessControlEntryType> = z
  .lazy(() =>
    z
      .object({
        principal: FileOwnerSchema.exactOptional(),
        permissions: FilePermissionsSchema.exactOptional(),
        entry: FileSystemEntrySchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          principal: { $ref: '#/components/schemas/FileOwner' },
          permissions: { $ref: '#/components/schemas/FilePermissions' },
          entry: { $ref: '#/components/schemas/FileSystemEntry' },
        },
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
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
        recentComments: z
          .array(CommentSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          recentComments: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
        },
      }),
  )
  .openapi('CommentAuthor')

const CommentThreadSchema: z.ZodType<CommentThreadType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        rootComment: CommentSchema.exactOptional(),
        allComments: z
          .array(CommentSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          rootComment: { $ref: '#/components/schemas/Comment' },
          allComments: { type: 'array', items: { $ref: '#/components/schemas/Comment' } },
        },
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
        id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
        content: z.string().openapi({ type: 'string' }),
        author: CommentAuthorSchema.exactOptional(),
        parent: CommentSchema.exactOptional(),
        replies: z
          .array(CommentSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Comment' } }),
        thread: CommentThreadSchema.exactOptional(),
        quotedComment: CommentSchema.exactOptional(),
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
  .object({
    type: z.literal('literal').openapi({ type: 'string' }),
    value: z
      .xor([
        z.string().openapi({ type: 'string' }),
        z.number().openapi({ type: 'number' }),
        z.boolean().openapi({ type: 'boolean' }),
      ])
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

const BinaryExpressionSchema: z.ZodType<BinaryExpressionType> = z
  .lazy(() =>
    z
      .object({
        type: z.literal('binary').openapi({ type: 'string' }),
        operator: z
          .enum(['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'])
          .openapi({
            type: 'string',
            enum: ['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'],
          }),
        left: ExpressionSchema,
        right: ExpressionSchema,
      })
      .openapi({
        type: 'object',
        required: ['type', 'operator', 'left', 'right'],
        properties: {
          type: { type: 'string', const: 'binary' },
          operator: {
            type: 'string',
            enum: ['+', '-', '*', '/', '==', '!=', '<', '>', '&&', '||'],
          },
          left: { $ref: '#/components/schemas/Expression' },
          right: { $ref: '#/components/schemas/Expression' },
        },
      }),
  )
  .openapi('BinaryExpression')

const UnaryExpressionSchema: z.ZodType<UnaryExpressionType> = z
  .lazy(() =>
    z
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
      }),
  )
  .openapi('UnaryExpression')

const ConditionalExpressionSchema: z.ZodType<ConditionalExpressionType> = z
  .lazy(() =>
    z
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
      }),
  )
  .openapi('ConditionalExpression')

const FunctionCallExpressionSchema: z.ZodType<FunctionCallExpressionType> = z
  .lazy(() =>
    z
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
      }),
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
    z
      .xor([
        LiteralExpressionSchema,
        BinaryExpressionSchema,
        UnaryExpressionSchema,
        ConditionalExpressionSchema,
        FunctionCallExpressionSchema,
      ])
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
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
        primaryCategory: CategorySchema.exactOptional(),
        secondaryCategories: z
          .array(CategorySchema)
          .exactOptional()
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
        id: z.string().openapi({ type: 'string' }),
        name: z.string().openapi({ type: 'string' }),
        parent: CategorySchema.exactOptional(),
        children: z
          .array(CategorySchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        ancestors: z
          .array(CategorySchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        descendants: z
          .array(CategorySchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Category' } }),
        relatedCategories: z
          .record(z.string(), CategorySchema)
          .exactOptional()
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/Category' },
          }),
        products: z
          .array(CategorizedProductSchema)
          .exactOptional()
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
        event: z.string().openapi({ type: 'string' }),
        sourceState: WorkflowStateSchema.exactOptional(),
        targetState: WorkflowStateSchema,
        guard: TransitionGuardSchema.exactOptional(),
        actions: z
          .array(WorkflowActionSchema)
          .exactOptional()
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
      }),
  )
  .openapi('StateTransition')

const WorkflowActionSchema: z.ZodType<WorkflowActionType> = z
  .lazy(() =>
    z
      .object({
        type: z.string().exactOptional().openapi({ type: 'string' }),
        config: z.object({}).exactOptional().openapi({ type: 'object' }),
        nextAction: WorkflowActionSchema.exactOptional(),
        fallbackAction: WorkflowActionSchema.exactOptional(),
        triggerTransition: StateTransitionSchema.exactOptional(),
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
        id: z.string().openapi({ type: 'string' }),
        name: z.string().openapi({ type: 'string' }),
        description: z.string().exactOptional().openapi({ type: 'string' }),
        transitions: z
          .array(StateTransitionSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/StateTransition' } }),
        entryActions: z
          .array(WorkflowActionSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } }),
        exitActions: z
          .array(WorkflowActionSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/WorkflowAction' } }),
        parentState: WorkflowStateSchema.exactOptional(),
        childStates: z
          .array(WorkflowStateSchema)
          .exactOptional()
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

const TransitionGuardSchema: z.ZodType<TransitionGuardType> = z
  .lazy(() =>
    z
      .object({
        condition: z.string().exactOptional().openapi({ type: 'string' }),
        relatedTransitions: z
          .array(StateTransitionSchema)
          .exactOptional()
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/StateTransition' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          condition: { type: 'string' },
          relatedTransitions: {
            type: 'array',
            items: { $ref: '#/components/schemas/StateTransition' },
          },
        },
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
      z
        .object({
          name: z.string().exactOptional().openapi({ type: 'string' }),
          parent: ExtendedEntitySchema.exactOptional(),
          baseReference: BaseEntitySchema.exactOptional(),
        })
        .openapi({
          type: 'object',
          properties: {
            name: { type: 'string' },
            parent: { $ref: '#/components/schemas/ExtendedEntity' },
            baseReference: { $ref: '#/components/schemas/BaseEntity' },
          },
        }),
    ).openapi({
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

type BaseEntityType = { id?: string; relatedEntity?: z.infer<typeof ExtendedEntitySchema> }

const BaseEntitySchema: z.ZodType<BaseEntityType> = z
  .lazy(() =>
    z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        relatedEntity: ExtendedEntitySchema.exactOptional(),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          relatedEntity: { $ref: '#/components/schemas/ExtendedEntity' },
        },
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
    z
      .object({
        key: z.string().exactOptional().openapi({ type: 'string' }),
        value: z.string().exactOptional().openapi({ type: 'string' }),
        nested: z
          .record(z.string(), RecursiveMapSchema)
          .exactOptional()
          .openapi({
            type: 'object',
            additionalProperties: { $ref: '#/components/schemas/RecursiveMap' },
          }),
        items: z
          .array(RecursiveMapSchema)
          .exactOptional()
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
        id: z.string().exactOptional().openapi({ type: 'string' }),
        next: z
          .xor([NullableCircularSchema, z.null().nullable().openapi({ type: 'null' })])
          .exactOptional()
          .openapi({
            oneOf: [{ $ref: '#/components/schemas/NullableCircular' }, { type: 'null' }],
          }),
        prev: z
          .object({
            id: z.string().exactOptional().openapi({ type: 'string' }),
            next: NullableCircularSchema.exactOptional(),
          })
          .nullable()
          .exactOptional()
          .openapi({
            type: ['object', 'null'],
            properties: {
              id: { type: 'string' },
              next: { $ref: '#/components/schemas/NullableCircular' },
            },
          }),
      })
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
