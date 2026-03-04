import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/** OpenNext Twitter Clone API */
@service(#{ title: "OpenNext Twitter Clone API" })
@info(#{ version: "1.0.0" })
namespace NextJSTwitterCloneAPI;

model MessageResponse {
  message: string;
}

model PublicUser {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @extension("x-error-message", "Image must be a valid URL") image: url | null;
  @extension("x-error-message", "Cover image must be a valid URL") coverImage: url | null;
  @extension("x-error-message", "Profile image must be a valid URL") profileImage: url | null;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
}

model User {
  ...PublicUser;
  @format("email") @extension("x-error-message", "Must be a valid email address") email: string;
  @extension("x-error-message", "Email verified date must be a valid datetime") emailVerified: utcDateTime | null;
  hasNotification?: boolean | null;
}

model CurrentUser {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @format("email") @extension("x-error-message", "Must be a valid email address") email: string;
  @extension("x-error-message", "Image must be a valid URL") image: url | null;
  @extension("x-error-message", "Cover image must be a valid URL") coverImage: url | null;
  @extension("x-error-message", "Profile image must be a valid URL") profileImage: url | null;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  followers: Follow[];
  following: Follow[];
  hasNotification: boolean | null;
}

model UserWithFollowCount {
  ...PublicUser;
  _count: {
    followers: numeric;
    following: numeric;
  };
}

model Follow {
  @format("uuid") @extension("x-error-message", "Follower ID must be a valid UUID") followerId: string;
  @format("uuid") @extension("x-error-message", "Following ID must be a valid UUID") followingId: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
}

model Comment {
  @format("uuid") @extension("x-error-message", "Comment ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") postId: string;
}

model CommentWithUser {
  @format("uuid") @extension("x-error-message", "Comment ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") postId: string;
  user: PublicUser;
}

model Like {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") postId: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
}

model Post {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
}

model PostWithLikes {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  likes: Like[];
}

model PostWithDetails {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  user: PublicUser;
  comments: Comment[];
  likes: Like[];
}

model PostSummary {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  user: PublicUser;
  commentCount: numeric;
  likeCount: numeric;
}

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

model PostDetail {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") id: string;
  body: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
  @extension("x-error-message", "Updated date must be a valid datetime") updatedAt: utcDateTime;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  user: PublicUser;
  comments: CommentWithUser[];
  likes: {
    @format("uuid") @extension("x-error-message", "User ID must be a valid UUID")
    userId: string;
  }[];
  _count: {
    likes: numeric;
  };
}

model Notification {
  @format("uuid") @extension("x-error-message", "Notification ID must be a valid UUID") id: string;
  body: string;
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
  @extension("x-error-message", "Created date must be a valid datetime") createdAt: utcDateTime;
}

model CreateCommentRequest {
  @minLength(1) @extension("x-minimum-message", "Comment must not be empty") body: string;
}

model CreatePostRequest {
  @minLength(1) @extension("x-minimum-message", "Post must not be empty") body: string;
}

model EditUserRequest {
  name: string;
  username: string;
  bio?: string;
  @extension("x-error-message", "Cover image must be a valid URL") coverImage: url | null;
  @extension("x-error-message", "Profile image must be a valid URL") profileImage: url | null;
}

model FollowUserRequest {
  @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") userId: string;
}

model LikePostRequest {
  @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") postId: string;
}

model RegisterRequest {
  @format("email") @extension("x-error-message", "Must be a valid email address") email: string;
  @minLength(1) @extension("x-minimum-message", "Name must not be empty") name: string;
  @minLength(1) @extension("x-minimum-message", "Username must not be empty") username: string;
  @minLength(1) @extension("x-minimum-message", "Password must not be empty") password: string;
}

model SearchResults {
  posts: PaginatedPosts;
  users: PaginatedUsers;
}

model ValidationErrorDetail {
  pointer: string;
  detail: string;
}

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

@tag("register")
@route("/register")
@post
op postRegister(@body body: RegisterRequest): {
  @statusCode statusCode: 201;
  @body body: User;
} | (NotFoundResponse & MessageResponse) | {
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
    @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @path postId: string;
  }
  model PostIdQuery {
    @format("uuid") @extension("x-error-message", "Post ID must be a valid UUID") @query(#{ explode: true }) postId: string;
  }
  model UserIdPath {
    @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @path userId: string;
  }
  model UserIdQuery {
    @format("uuid") @extension("x-error-message", "User ID must be a valid UUID") @query(#{ explode: true }) userId?: string;
  }
  model SearchQuery {
    @minLength(1) @extension("x-minimum-message", "Search query must not be empty") @query(#{ explode: true }) q: string;
  }
  model PaginationQuery {
    @minValue(1) @extension("x-minimum-message", "Page must be at least 1") @query(#{ explode: true }) page?: numeric;
    @minValue(1) @extension("x-minimum-message", "Limit must be at least 1") @maxValue(100) @extension("x-maximum-message", "Limit must be at most 100") @query(#{ explode: true }) limit?: numeric;
  }
}
