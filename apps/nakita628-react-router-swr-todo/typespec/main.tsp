import "@typespec/http";

using Http;

// ─────────────────────────────────────────────────────────────────────────────
// Service Configuration
// ─────────────────────────────────────────────────────────────────────────────

@service(#{ title: "Hono Todo API" })
@server("http://localhost:8787/api", "Development server")
namespace HonoService;

// ─────────────────────────────────────────────────────────────────────────────
// Models
// ─────────────────────────────────────────────────────────────────────────────

/** Todo item */
@example(#{
  id: "c6c0f743-01fa-4c23-80d6-1b358512e213",
  content: "Hono",
  completed: 0,
  createdAt: "2020-01-01T00:00:00Z",
  updatedAt: "2020-01-01T00:00:00Z",
})
model Todo {
  @format("uuid")
  id: string;

  @minLength(0)
  @maxLength(140)
  content: string;

  @minValue(0)
  @maxValue(1)
  @doc("0 = not completed, 1 = completed")
  completed: int32;

  @format("date-time")
  createdAt: string;

  @format("date-time")
  updatedAt: string;
}

/** Request body for creating a new todo */
model CreateTodoRequest {
  @minLength(1)
  @maxLength(140)
  content: string;
}

/** Request body for updating an existing todo */
model UpdateTodoRequest {
  @minLength(0)
  @maxLength(140)
  content?: string;

  @minValue(0)
  @maxValue(1)
  completed?: int32;
}

// ─────────────────────────────────────────────────────────────────────────────
// Success Response Models
// ─────────────────────────────────────────────────────────────────────────────

/** Successful creation response */
model CreatedMessage {
  ...CreatedResponse;
  message: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Error Response Models
// ─────────────────────────────────────────────────────────────────────────────

/** Resource not found */
@error
model NotFound {
  ...NotFoundResponse;
  message: string;
}

/** Unprocessable content (validation error) */
@error
model UnprocessableContent {
  @statusCode _: 422;
  message: string;
}

/** Internal server error */
@error
model InternalServerError {
  @statusCode _: 500;
  message: string;
}

/** Service unavailable */
@error
model ServiceUnavailable {
  @statusCode _: 503;
  message: string;
  retryAfter?: string;
}

/** Common error responses for all operations */
alias CommonErrors = UnprocessableContent | InternalServerError | ServiceUnavailable;

// ─────────────────────────────────────────────────────────────────────────────
// Pagination Query Parameters
// ─────────────────────────────────────────────────────────────────────────────

/** Pagination parameters */
model PaginationQuery {
  @query
  @minValue(1)
  page?: float64 = 1;

  @query
  @minValue(1)
  @maxValue(100)
  rows?: float64 = 10;
}

// ─────────────────────────────────────────────────────────────────────────────
// Todo Operations
// ─────────────────────────────────────────────────────────────────────────────

@route("/todo")
@tag("Todos")
interface Todos {
  /** Retrieve a list of todos with pagination */
  @summary("Retrieve a list of todos")
  @get
  list(...PaginationQuery): Todo[] | NotFound | CommonErrors;

  /** Create a new todo item */
  @summary("Create a new todo")
  @post
  create(@body body: CreateTodoRequest): CreatedMessage | CommonErrors;

  /** Get a single todo by ID */
  @summary("Get a single todo")
  @get
  @route("/{id}")
  read(@path id: string): Todo | NotFound | CommonErrors;

  /** Update an existing todo */
  @summary("Update an existing todo")
  @put
  @route("/{id}")
  update(@path id: string, @body body: UpdateTodoRequest): void | NotFound | CommonErrors;

  /** Delete a todo */
  @summary("Delete a todo")
  @delete
  @route("/{id}")
  delete(@path id: string): void | NotFound | CommonErrors;
}
