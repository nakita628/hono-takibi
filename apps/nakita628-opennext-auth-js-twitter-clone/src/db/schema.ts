import { relations, sql } from 'drizzle-orm'
import { integer, numeric, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  username: text().notNull().unique(),
  bio: text(),
  email: text().notNull().unique(),
  emailVerified: numeric(),
  image: text(),
  coverImage: text(),
  profileImage: text(),
  hashedPassword: text(),
  createdAt: numeric().notNull().default(sql`DATE('now')`),
  updatedAt: numeric().notNull(),
  hasNotification: integer({ mode: 'boolean' }),
})

export const posts = sqliteTable('posts', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  body: text().notNull(),
  createdAt: numeric().notNull().default(sql`DATE('now')`),
  updatedAt: numeric().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const follows = sqliteTable(
  'follows',
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    followerId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    followingId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: numeric().notNull().default(sql`DATE('now')`),
  },
  (t) => [
    uniqueIndex('follows_followerId_followingId_key').on(t.followerId, t.followingId),
  ],
)

export const likes = sqliteTable(
  'likes',
  {
    id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    postId: text()
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: numeric().notNull().default(sql`DATE('now')`),
  },
  (t) => [
    uniqueIndex('likes_userId_postId_key').on(t.userId, t.postId),
  ],
)

export const comments = sqliteTable('comments', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  body: text().notNull(),
  createdAt: numeric().notNull().default(sql`DATE('now')`),
  updatedAt: numeric().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  postId: text()
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const notifications = sqliteTable('notifications', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  body: text().notNull(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: numeric().notNull().default(sql`DATE('now')`),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts, {
    relationName: 'PostToUser',
  }),
  comments: many(comments, {
    relationName: 'CommentToUser',
  }),
  notifications: many(notifications, {
    relationName: 'NotificationToUser',
  }),
  followers: many(follows, {
    relationName: 'Follower',
  }),
  following: many(follows, {
    relationName: 'Following',
  }),
  likes: many(likes, {
    relationName: 'LikeToUser',
  }),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    relationName: 'PostToUser',
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments, {
    relationName: 'CommentToPost',
  }),
  likes: many(likes, {
    relationName: 'LikeToPost',
  }),
}))

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    relationName: 'Following',
    fields: [follows.followerId],
    references: [users.id],
  }),
  following: one(users, {
    relationName: 'Follower',
    fields: [follows.followingId],
    references: [users.id],
  }),
}))

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    relationName: 'LikeToUser',
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    relationName: 'LikeToPost',
    fields: [likes.postId],
    references: [posts.id],
  }),
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    relationName: 'CommentToUser',
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    relationName: 'CommentToPost',
    fields: [comments.postId],
    references: [posts.id],
  }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    relationName: 'NotificationToUser',
    fields: [notifications.userId],
    references: [users.id],
  }),
}))
