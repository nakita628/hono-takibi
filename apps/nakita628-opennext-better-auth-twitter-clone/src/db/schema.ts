import { relations, sql } from 'drizzle-orm'
import { index, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Better Auth core tables
export const user = sqliteTable('user', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: 'boolean' }).notNull().default(false),
  image: text(),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const session = sqliteTable('session', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: text().notNull(),
  expiresAt: integer({ mode: 'timestamp' }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const account = sqliteTable('account', {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: integer({ mode: 'timestamp' }),
  refreshTokenExpiresAt: integer({ mode: 'timestamp' }),
  scope: text(),
  password: text(),
  createdAt: integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const verification = sqliteTable('verification', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: 'timestamp' }).notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
})

// Application tables
export const userProfile = sqliteTable(
  'user_profile',
  {
    userId: text('user_id')
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: 'cascade' }),
    username: text('username').unique(),
    bio: text('bio').default(''),
    coverImage: text('cover_image'),
    profileImage: text('profile_image'),
    hasNotification: integer('has_notification', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index('user_profile_userId_idx').on(table.userId)],
)

export const posts = sqliteTable('posts', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  body: text().notNull(),
  createdAt: integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const follows = sqliteTable(
  'follows',
  {
    followerId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    followingId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: integer({ mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.followerId, t.followingId] })],
)

export const likes = sqliteTable(
  'likes',
  {
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    postId: text()
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    createdAt: integer({ mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.userId, t.postId] })],
)

export const comments = sqliteTable('comments', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  body: text().notNull(),
  createdAt: integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  postId: text()
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
})

export const notifications = sqliteTable('notifications', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  body: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Relations
export const userRelations = relations(user, ({ one, many }) => ({
  userProfile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
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
  sessions: many(session),
  accounts: many(account),
}))

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(user, {
    relationName: 'PostToUser',
    fields: [posts.userId],
    references: [user.id],
  }),
  comments: many(comments, {
    relationName: 'CommentToPost',
  }),
  likes: many(likes, {
    relationName: 'LikeToPost',
  }),
}))

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(user, {
    relationName: 'Following',
    fields: [follows.followerId],
    references: [user.id],
  }),
  following: one(user, {
    relationName: 'Follower',
    fields: [follows.followingId],
    references: [user.id],
  }),
}))

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(user, {
    relationName: 'LikeToUser',
    fields: [likes.userId],
    references: [user.id],
  }),
  post: one(posts, {
    relationName: 'LikeToPost',
    fields: [likes.postId],
    references: [posts.id],
  }),
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(user, {
    relationName: 'CommentToUser',
    fields: [comments.userId],
    references: [user.id],
  }),
  post: one(posts, {
    relationName: 'CommentToPost',
    fields: [comments.postId],
    references: [posts.id],
  }),
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    relationName: 'NotificationToUser',
    fields: [notifications.userId],
    references: [user.id],
  }),
}))
