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

model User {
  @format("uuid") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @format("email") email: string;
  emailVerified: string | null;
  image: url | null;
  coverImage: url | null;
  profileImage: url | null;
  createdAt: string;
  updatedAt: string;
  hasNotification?: boolean | null;
}

model CurrentUser {
  @format("uuid") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @format("email") email: string;
  image: url | null;
  coverImage: url | null;
  profileImage: url | null;
  createdAt: string;
  updatedAt: string;
  followers: Follow[];
  following: Follow[];
  hasNotification: boolean | null;
}

model UserWithFollowCount {
  @format("uuid") id: string;
  name: string;
  username: string;
  bio?: string | null;
  @format("email") email: string;
  emailVerified: string | null;
  image: url | null;
  coverImage: url | null;
  profileImage: url | null;
  createdAt: string;
  updatedAt: string;
  hasNotification?: boolean | null;
  _count: {
    followers: numeric;
    following: numeric;
  };
}

model Follow {
  @format("uuid") followerId: string;
  @format("uuid") followingId: string;
  createdAt: utcDateTime;
}

model Comment {
  @format("uuid") id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  @format("uuid") userId: string;
  @format("uuid") postId: string;
}

model CommentWithUser {
  @format("uuid") id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  @format("uuid") userId: string;
  @format("uuid") postId: string;
  user: User;
}

model Like {
  @format("uuid") userId: string;
  @format("uuid") postId: string;
  createdAt: string;
}

model Post {
  @format("uuid") id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  @format("uuid") userId: string;
}

model PostWithLikes {
  @format("uuid") id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  @format("uuid") userId: string;
  likes: Like[];
}

model PostWithDetails {
  @format("uuid") id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  @format("uuid") userId: string;
  user: User;
  comments: Comment[];
  likes: Like[];
}

model PostDetail {
  @format("uuid") id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  @format("uuid") userId: string;
  user: User;
  comments: CommentWithUser[];
  likes: {
    @format("uuid")
    userId: string;
  }[];
  _count: {
    likes: numeric;
  };
}

model Notification {
  @format("uuid") id: string;
  body: string;
  @format("uuid") userId: string;
  createdAt: string;
}

model CreateCommentRequest {
  body: string;
}

model CreatePostRequest {
  body: string;
}

model EditUserRequest {
  name: string;
  username: string;
  bio?: string;
  coverImage: url | null;
  profileImage: url | null;
}

model FollowUserRequest {
  @format("uuid") userId: string;
}

model LikePostRequest {
  @format("uuid") postId: string;
}

model RegisterRequest {
  @format("email") email: string;
  name: string;
  username: string;
  password: string;
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
};

@tag("current")
@route("/current")
@get
op getCurrentUser(): CurrentUser | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

@tag("edit")
@route("/edit")
@patch(#{implicitOptionality: true})
op patchEdit(@body body: EditUserRequest): User | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
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
};

@tag("follow")
@route("/follow")
@post
op postFollowUesrId(@body body: FollowUserRequest): MessageResponse | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

@tag("like")
@route("/like")
@delete
op deleteLikePostId(@body body: LikePostRequest): PostWithLikes | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

@tag("like")
@route("/like")
@post
op postLikePostId(@body body: LikePostRequest): PostWithLikes | (UnauthorizedResponse & MessageResponse) | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

@tag("notifications")
@route("/notifications/{userId}")
@get
op getNotificationsUserId(...Parameters.UserIdPath): Body<Notification[]> | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

@tag("notifications")
@route("/notifications")
@post
op postNotificationsUserId(@body body: string): MessageResponse | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

@tag("posts")
@route("/posts")
@get
op getPosts(...Parameters.UserIdQuery): Body<PostWithDetails[]> | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
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
};

@tag("posts")
@route("/posts/{postId}")
@get
op getPostsPostId(...Parameters.PostIdPath): PostDetail | {
  @statusCode statusCode: 422;
  @body body: ValidationError;
} | {
  @statusCode statusCode: 500;
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
};

@tag("users")
@route("/users")
@get
op getUsers(): Body<User[]> | {
  @statusCode statusCode: 500;
  @body body: MessageResponse;
};

namespace Parameters {
  model PostIdPath {
    @format("uuid") @path postId: string;
  }
  model PostIdQuery {
    @format("uuid") @query(#{ explode: true }) postId: string;
  }
  model UserIdPath {
    @format("uuid") @path userId: string;
  }
  model UserIdQuery {
    @format("uuid") @query(#{ explode: true }) userId?: string;
  }
}