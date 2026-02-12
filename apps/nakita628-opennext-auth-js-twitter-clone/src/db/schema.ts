import { relations, sql } from 'drizzle-orm'
import { foreignKey, int, numeric, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const User = sqliteTable('User', {
  id: text('id').notNull().primaryKey().default(sql`uuid(4)`),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  bio: text('bio'),
  email: text('email').notNull().unique(),
  emailVerified: numeric('emailVerified'),
  image: text('image'),
  coverImage: text('coverImage'),
  profileImage: text('profileImage'),
  hashedPassword: text('hashedPassword'),
  createdAt: numeric('createdAt').notNull().default(sql`DATE('now')`),
  updatedAt: numeric('updatedAt').notNull(),
  hasNotification: int('hasNotification', { mode: 'boolean' }),
})

export const Post = sqliteTable(
  'Post',
  {
    id: text('id').notNull().primaryKey().default(sql`uuid(4)`),
    body: text('body').notNull(),
    createdAt: numeric('createdAt').notNull().default(sql`DATE('now')`),
    updatedAt: numeric('updatedAt').notNull(),
    userId: text('userId').notNull(),
  },
  (Post) => ({
    Post_user_fkey: foreignKey({
      name: 'Post_user_fkey',
      columns: [Post.userId],
      foreignColumns: [User.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
)

export const Follow = sqliteTable(
  'Follow',
  {
    id: text('id').notNull().primaryKey().default(sql`uuid(4)`),
    followerId: text('followerId').notNull(),
    followingId: text('followingId').notNull(),
    createdAt: numeric('createdAt').notNull().default(sql`DATE('now')`),
  },
  (Follow) => ({
    Follow_follower_fkey: foreignKey({
      name: 'Follow_follower_fkey',
      columns: [Follow.followerId],
      foreignColumns: [User.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    Follow_following_fkey: foreignKey({
      name: 'Follow_following_fkey',
      columns: [Follow.followingId],
      foreignColumns: [User.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    Follow_followerId_followingId_unique_idx: uniqueIndex('Follow_followerId_followingId_key').on(
      Follow.followerId,
      Follow.followingId,
    ),
  }),
)

export const Like = sqliteTable(
  'Like',
  {
    id: text('id').notNull().primaryKey().default(sql`uuid(4)`),
    userId: text('userId').notNull(),
    postId: text('postId').notNull(),
    createdAt: numeric('createdAt').notNull().default(sql`DATE('now')`),
  },
  (Like) => ({
    Like_user_fkey: foreignKey({
      name: 'Like_user_fkey',
      columns: [Like.userId],
      foreignColumns: [User.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    Like_post_fkey: foreignKey({
      name: 'Like_post_fkey',
      columns: [Like.postId],
      foreignColumns: [Post.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    Like_userId_postId_unique_idx: uniqueIndex('Like_userId_postId_key').on(
      Like.userId,
      Like.postId,
    ),
  }),
)

export const Comment = sqliteTable(
  'Comment',
  {
    id: text('id').notNull().primaryKey().default(sql`uuid(4)`),
    body: text('body').notNull(),
    createdAt: numeric('createdAt').notNull().default(sql`DATE('now')`),
    updatedAt: numeric('updatedAt').notNull(),
    userId: text('userId').notNull(),
    postId: text('postId').notNull(),
  },
  (Comment) => ({
    Comment_user_fkey: foreignKey({
      name: 'Comment_user_fkey',
      columns: [Comment.userId],
      foreignColumns: [User.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
    Comment_post_fkey: foreignKey({
      name: 'Comment_post_fkey',
      columns: [Comment.postId],
      foreignColumns: [Post.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
)

export const Notification = sqliteTable(
  'Notification',
  {
    id: text('id').notNull().primaryKey().default(sql`uuid(4)`),
    body: text('body').notNull(),
    userId: text('userId').notNull(),
    createdAt: numeric('createdAt').notNull().default(sql`DATE('now')`),
  },
  (Notification) => ({
    Notification_user_fkey: foreignKey({
      name: 'Notification_user_fkey',
      columns: [Notification.userId],
      foreignColumns: [User.id],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
  }),
)

export const UserRelations = relations(User, ({ many }) => ({
  posts: many(Post, {
    relationName: 'PostToUser',
  }),
  comments: many(Comment, {
    relationName: 'CommentToUser',
  }),
  notifications: many(Notification, {
    relationName: 'NotificationToUser',
  }),
  followers: many(Follow, {
    relationName: 'Follower',
  }),
  following: many(Follow, {
    relationName: 'Following',
  }),
  likes: many(Like, {
    relationName: 'LikeToUser',
  }),
}))

export const PostRelations = relations(Post, ({ one, many }) => ({
  user: one(User, {
    relationName: 'PostToUser',
    fields: [Post.userId],
    references: [User.id],
  }),
  comments: many(Comment, {
    relationName: 'CommentToPost',
  }),
  likes: many(Like, {
    relationName: 'LikeToPost',
  }),
}))

export const FollowRelations = relations(Follow, ({ one }) => ({
  follower: one(User, {
    relationName: 'Following',
    fields: [Follow.followerId],
    references: [User.id],
  }),
  following: one(User, {
    relationName: 'Follower',
    fields: [Follow.followingId],
    references: [User.id],
  }),
}))

export const LikeRelations = relations(Like, ({ one }) => ({
  user: one(User, {
    relationName: 'LikeToUser',
    fields: [Like.userId],
    references: [User.id],
  }),
  post: one(Post, {
    relationName: 'LikeToPost',
    fields: [Like.postId],
    references: [Post.id],
  }),
}))

export const CommentRelations = relations(Comment, ({ one }) => ({
  user: one(User, {
    relationName: 'CommentToUser',
    fields: [Comment.userId],
    references: [User.id],
  }),
  post: one(Post, {
    relationName: 'CommentToPost',
    fields: [Comment.postId],
    references: [Post.id],
  }),
}))

export const NotificationRelations = relations(Notification, ({ one }) => ({
  user: one(User, {
    relationName: 'NotificationToUser',
    fields: [Notification.userId],
    references: [User.id],
  }),
}))