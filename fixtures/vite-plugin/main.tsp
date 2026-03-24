import "@typespec/http";
import "@typespec/openapi";

using Http;
using OpenAPI;

@service
@info(#{
  title: "HonoTakibi Vite Plugin Test API",
  version: "1.0.0",
})
namespace VitePluginTest;

// ── Models ──────────────────────────────────────────────────

model Todo {
  id: int32;
  @minLength(1)
  title: string;
  description?: string;
  completed: boolean;
  @format("date-time")
  createdAt: string;
  @format("date-time")
  updatedAt: string;
}

model CreateTodoInput {
  @minLength(1)
  @maxLength(200)
  title: string;
  description?: string;
}

model UpdateTodoInput {
  @minLength(1)
  @maxLength(200)
  title?: string;
  description?: string;
  completed?: boolean;
}

model TodoList {
  total: int32;
  items: Todo[];
}

model Error {
  message: string;
  code?: string;
}

// ── Routes ──────────────────────────────────────────────────

@route("/todos")
@tag("Todos")
interface Todos {
  @get list(
    @query limit?: int32,
    @query offset?: int32,
  ): {
    @statusCode statusCode: 200;
    @body body: TodoList;
  };

  @post create(@body body: CreateTodoInput): {
    @statusCode statusCode: 201;
    @body body: Todo;
  } | {
    @statusCode statusCode: 400;
    @body body: Error;
  };
}

@route("/todos/{id}")
@tag("Todos")
interface TodoById {
  @get get(@path id: int32): {
    @statusCode statusCode: 200;
    @body body: Todo;
  } | {
    @statusCode statusCode: 404;
    @body body: Error;
  };

  @patch update(@path id: int32, @body body: UpdateTodoInput): {
    @statusCode statusCode: 200;
    @body body: Todo;
  } | {
    @statusCode statusCode: 400;
    @body body: Error;
  } | {
    @statusCode statusCode: 404;
    @body body: Error;
  };

  @delete remove(@path id: int32): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body body: Error;
  };
}

@route("/health")
@tag("Health")
interface Health {
  @get check(): {
    @statusCode statusCode: 200;
    @body body: {
      status: "ok";
    };
  };
}
