import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/** OpenNext Twitter Clone API */
@service(#{ title: "OpenNext Twitter Clone API" })
@info(#{ version: "1.0.0" })
namespace NextJSTwitterCloneAPI;

@example(#{
  message: "Operation completed successfully",
})
model MessageResponse {
  message: string;
}

@example(#{
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "John Doe",
  username: "johndoe",
  bio: "Software developer",
  image: "https://example.com/images/johndoe.png",
  coverImage: "https://example.com/covers/johndoe.png",
  profileImage: "https://example.com/profiles/johndoe.png",
  createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
})
model PublicUser {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @extension("x-error-message", "Image must be a valid URL") image: url | null;
  @extension("x-error-message", "Cover image must be a valid URL") coverImage: url | null;
  @extension("x-error-message", "Profile image must be a valid URL") profileImage: url | null;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
}

@example(#{
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "John Doe",
  username: "johndoe",
  bio: "Software developer",
  image: "https://example.com/images/johndoe.png",
  coverImage: "https://example.com/covers/johndoe.png",
  profileImage: "https://example.com/profiles/johndoe.png",
  createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  email: "john@example.com",
  emailVerified: utcDateTime.fromISO("2025-01-15T09:05:00Z"),
  hasNotification: true,
})
model User {
  ...PublicUser;
  @format("email") @extension("x-error-message", "Must be a valid email address") @extension("x-brand", "Email") email: string;
  @extension("x-error-message", "Email verified date must be a valid datetime") emailVerified: utcDateTime | null;
  hasNotification?: boolean | null;
}

@example(#{
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "John Doe",
  username: "johndoe",
  bio: "Software developer",
  email: "john@example.com",
  image: "https://example.com/images/johndoe.png",
  coverImage: "https://example.com/covers/johndoe.png",
  profileImage: "https://example.com/profiles/johndoe.png",
  createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  followers: #[],
  following: #[],
  hasNotification: false,
})
model CurrentUser {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @format("email") @extension("x-error-message", "Must be a valid email address") @extension("x-brand", "Email") email: string;
  @extension("x-error-message", "Image must be a valid URL") image: url | null;
  @extension("x-error-message", "Cover image must be a valid URL") coverImage: url | null;
  @extension("x-error-message", "Profile image must be a valid URL") profileImage: url | null;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  followers: Follow[];
  following: Follow[];
  hasNotification: boolean | null;
}

@example(#{
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "John Doe",
  username: "johndoe",
  bio: "Software developer",
  image: "https://example.com/images/johndoe.png",
  coverImage: "https://example.com/covers/johndoe.png",
  profileImage: "https://example.com/profiles/johndoe.png",
  createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  _count: #{ followers: 42, following: 15 },
})
model UserWithFollowCount {
  ...PublicUser;
  _count: {
    followers: numeric;
    following: numeric;
  };
}

@example(#{
  followerId: "550e8400-e29b-41d4-a716-446655440000",
  followingId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  createdAt: utcDateTime.fromISO("2025-03-01T10:00:00Z"),
})
model Follow {
  @format("uuid") @extension("x-error-message", "Follower ID must be a valid UUID") @extension("x-brand", "UserId") followerId: string;
  @format("uuid") @extension("x-error-message", "Following ID must be a valid UUID") @extension("x-brand", "UserId") followingId: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
}

@example(#{
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  body: "Great post! Thanks for sharing.",
  createdAt: utcDateTime.fromISO("2025-03-20T14:30:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T14:30:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
  postId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
})
model Comment {
  @format("uuid") @extension("x-error-message", "Comment ID must be a valid UUID") @extension("x-brand", "CommentId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") postId: string;
}

@example(#{
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  body: "Great post! Thanks for sharing.",
  createdAt: utcDateTime.fromISO("2025-03-20T14:30:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T14:30:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
  postId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  user: #{
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    username: "johndoe",
    bio: "Software developer",
    image: "https://example.com/images/johndoe.png",
    coverImage: "https://example.com/covers/johndoe.png",
    profileImage: "https://example.com/profiles/johndoe.png",
    createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
    updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  },
})
model CommentWithUser {
  @format("uuid") @extension("x-error-message", "Comment ID must be a valid UUID") @extension("x-brand", "CommentId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") postId: string;
  user: PublicUser;
}

@example(#{
  userId: "550e8400-e29b-41d4-a716-446655440000",
  postId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  createdAt: utcDateTime.fromISO("2025-03-20T15:00:00Z"),
})
model Like {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") postId: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
}

@example(#{
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  body: "Just shipped a new feature! Check it out.",
  createdAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
})
model Post {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
}

@example(#{
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  body: "Just shipped a new feature! Check it out.",
  createdAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
  likes: #[#{
    userId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    postId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    createdAt: utcDateTime.fromISO("2025-03-20T15:00:00Z"),
  }],
})
model PostWithLikes {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  likes: Like[];
}

@example(#{
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  body: "Just shipped a new feature! Check it out.",
  createdAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
  user: #{
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    username: "johndoe",
    bio: "Software developer",
    image: "https://example.com/images/johndoe.png",
    coverImage: "https://example.com/covers/johndoe.png",
    profileImage: "https://example.com/profiles/johndoe.png",
    createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
    updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  },
  comments: #[],
  likes: #[],
})
model PostWithDetails {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  user: PublicUser;
  comments: Comment[];
  likes: Like[];
}

@example(#{
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  body: "Just shipped a new feature! Check it out.",
  createdAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
  user: #{
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    username: "johndoe",
    bio: "Software developer",
    image: "https://example.com/images/johndoe.png",
    coverImage: "https://example.com/covers/johndoe.png",
    profileImage: "https://example.com/profiles/johndoe.png",
    createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
    updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  },
  commentCount: 3,
  likeCount: 12,
  hasLiked: true,
})
model PostSummary {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  user: PublicUser;
  commentCount: numeric;
  likeCount: numeric;

  @doc("Whether the current user has liked this post")
  hasLiked: boolean;
}

@example(#{
  page: 1,
  limit: 20,
  total: 150,
  totalPages: 8,
})
model PaginationMeta {
  page: numeric;
  limit: numeric;
  total: numeric;
  totalPages: numeric;
}

model PaginatedPosts {
  data: PostSummary[];
  meta: PaginationMeta;
}

model PaginatedUsers {
  data: PublicUser[];
  meta: PaginationMeta;
}

@example(#{
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  body: "Just shipped a new feature! Check it out.",
  createdAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  updatedAt: utcDateTime.fromISO("2025-03-20T10:00:00Z"),
  userId: "550e8400-e29b-41d4-a716-446655440000",
  user: #{
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "John Doe",
    username: "johndoe",
    bio: "Software developer",
    image: "https://example.com/images/johndoe.png",
    coverImage: "https://example.com/covers/johndoe.png",
    profileImage: "https://example.com/profiles/johndoe.png",
    createdAt: utcDateTime.fromISO("2025-01-15T09:00:00Z"),
    updatedAt: utcDateTime.fromISO("2025-03-20T12:30:00Z"),
  },
  comments: #[],
  likes: #[#{ userId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8" }],
  _count: #{ likes: 1 },
})
model PostDetail {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  user: PublicUser;
  comments: CommentWithUser[];
  likes: {
    @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId")
    userId: string;
  }[];
  _count: {
    likes: numeric;
  };
}

@example(#{
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  body: "John Doe liked your post",
  userId: "550e8400-e29b-41d4-a716-446655440000",
  createdAt: utcDateTime.fromISO("2025-03-20T16:00:00Z"),
})
model Notification {
  @format("uuid") @extension("x-error-message", "Notification ID must be a valid UUID") @extension("x-brand", "NotificationId") id: string;
  body: string;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
}

@example(#{
  body: "Great post! Thanks for sharing.",
})
model CreateCommentRequest {
  @minLength(1) @extension("x-minimum-message", "Comment must not be empty") body: string;
}

@example(#{
  body: "Just shipped a new feature! Check it out.",
})
model CreatePostRequest {
  @minLength(1) @extension("x-minimum-message", "Post must not be empty") body: string;
}

@example(#{
  name: "John Doe",
  username: "johndoe",
  bio: "Software developer",
  coverImage: "https://example.com/covers/johndoe.png",
  profileImage: "https://example.com/profiles/johndoe.png",
})
model EditUserRequest {
  name: string;
  username: string;
  bio?: string;
  @extension("x-error-message", "Cover image must be a valid URL") coverImage: url | null;
  @extension("x-error-message", "Profile image must be a valid URL") profileImage: url | null;
}

@example(#{
  userId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
})
model FollowUserRequest {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") userId: string;
}

@example(#{
  postId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
})
model LikePostRequest {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") postId: string;
}

model SearchResults {
  posts: PostSummary[];
  users: PublicUser[];
}

@example(#{
  pointer: "/email",
  detail: "Must be a valid email address",
})
model ValidationErrorDetail {
  pointer: string;
  detail: string;
}

@example(#{
  type: "about:blank",
  title: "Unprocessable Content",
  status: 422,
  detail: "Request validation failed",
  errors: #[#{
    pointer: "/email",
    detail: "Must be a valid email address",
  }],
})
model ValidationError {
  type: "about:blank";
  title: "Unprocessable Content";
  status: 422;
  detail: "Request validation failed";
  errors: ValidationErrorDetail[];
}

@tag("comments")
@route("/comments")
@post
op postComments(...Parameters.PostIdQuery, @body body: CreateCommentRequest): Comment | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("current")
@route("/current")
@get
op getCurrentUser(): CurrentUser | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("edit")
@route("/edit")
@patch(#{implicitOptionality: true})
op patchEdit(@body body: EditUserRequest): User | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 409;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("follow")
@route("/follow")
@delete
op deleteFollowUserId(@body body: FollowUserRequest): MessageResponse | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("follow")
@route("/follow")
@post
op postFollowUserId(@body body: FollowUserRequest): MessageResponse | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 404;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 409;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("like")
@route("/like")
@delete
op deleteLikePostId(@body body: LikePostRequest): PostWithLikes | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 404;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("like")
@route("/like")
@post
op postLikePostId(@body body: LikePostRequest): PostWithLikes | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 404;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 409;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("notifications")
@route("/notifications/{userId}")
@get
op getNotificationsUserId(...Parameters.UserIdPath): Body<Notification[]> | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("notifications")
@route("/notifications")
@post
op postNotificationsUserId(@body body: string): MessageResponse | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("posts")
@route("/posts")
@get
op getPosts(...Parameters.UserIdQuery, ...Parameters.PaginationQuery): PaginatedPosts | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("posts")
@route("/posts")
@post
op postPosts(@body body: CreatePostRequest): Post | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("posts")
@route("/posts/{postId}")
@get
op getPostsPostId(...Parameters.PostIdPath): PostDetail | {
  @statusCode statusCode: 404;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("search")
@route("/search")
@get
op getSearch(...Parameters.SearchQuery, ...Parameters.PaginationQuery): SearchResults | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("users")
@route("/users/{userId}")
@get
op getUserUserId(...Parameters.UserIdPath): UserWithFollowCount | (NotFoundResponse &
  MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

@tag("users")
@route("/users")
@get
op getUsers(...Parameters.PaginationQuery): PaginatedUsers | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
} | {
  @statusCode statusCode: 503;
  @body body: MessageResponse;
};

namespace Parameters {
  model PostIdPath {
    @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") @path postId: string;
  }
  model PostIdQuery {
    @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @extension("x-brand", "PostId") @query(#{ explode: true }) postId: string;
  }
  model UserIdPath {
    @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") @path userId: string;
  }
  model UserIdQuery {
    @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @extension("x-brand", "UserId") @query(#{ explode: true }) userId?: string;
  }
  model SearchQuery {
    @minLength(1) @extension("x-minimum-message", "Search query must not be empty") @query(#{ explode: true }) q: string;
  }
  model PaginationQuery {
    @minValue(1) @extension("x-minimum-message", "Page must be at least 1") @query(#{ explode: true }) page?: numeric;
    @minValue(1) @extension("x-minimum-message", "Limit must be at least 1") @maxValue(100) @extension("x-maximum-message", "Limit must be at most 100") @query(#{ explode: true }) limit?: numeric;
  }
}
