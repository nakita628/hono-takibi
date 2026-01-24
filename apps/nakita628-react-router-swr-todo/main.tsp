import "@typespec/http";

using TypeSpec.Http;

@service({
  title: "Takibi Todo API",
})
namespace TakibiTodo;

model OK {
  message: string;
}

model Created {
  message: string;
}

model NotFound {
  message: string;
}

model UnprocessableContent {
  message: string;
}

model InternalServerError {
  message: string;
}

model ServiceUnavailable {
  message: string;
  retryAfter?: string;
}

model Todo {
  @format("uuid")
  id: string;

  @minLength(1)
  @maxLength(140)
  content: string;

  @doc("0 = not completed, 1 = completed")
  completed: int32;

  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}

model CreateTodoRequest {
  @minLength(1)
  @maxLength(140)
  content: string;
}

model UpdateTodoRequest {
  @minLength(1)
  @maxLength(140)
  content?: string;

  @doc("0 = not completed, 1 = completed")
  completed?: int32;
}

@tag("Health")
@route("/api")
interface Health {
  @summary("Health Check")
  @get
  list(): OK;
}

@tag("Todos")
@route("/api/todo")
interface Todos {
  @summary("Retrieve a list of posts")
  @get
  list(@query limit?: int32, @query offset?: int32):
    | Todo[]
    | NotFound
    | UnprocessableContent
    | InternalServerError
    | ServiceUnavailable;

  @summary("Create a new post")
  @post
  create(@body body: CreateTodoRequest):
    | {
        @statusCode statusCode: 201;
        @body body: Created;
      }
    | UnprocessableContent
    | InternalServerError
    | ServiceUnavailable;

  @summary("Get a single todo")
  @get
  read(@path @format("uuid") id: string):
    | Todo
    | NotFound
    | UnprocessableContent
    | InternalServerError
    | ServiceUnavailable;

  @summary("Update an existing todo")
  @put
  update(@path @format("uuid") id: string, @body body: UpdateTodoRequest):
    | {
        @statusCode statusCode: 204;
      }
    | NotFound
    | UnprocessableContent
    | InternalServerError
    | ServiceUnavailable;

  @summary("Delete a todo")
  @delete
  delete(@path @format("uuid") id: string):
    | {
        @statusCode statusCode: 204;
      }
    | NotFound
    | UnprocessableContent
    | InternalServerError
    | ServiceUnavailable;
}
