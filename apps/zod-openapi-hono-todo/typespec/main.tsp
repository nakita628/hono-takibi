import "@typespec/http";
import "@typespec/versioning";
import "./schemas/todo.tsp";
import "./schemas/success.tsp";
import "./schemas/error.tsp";

using Http;

@service(#{ title: "Hono Todo API" })
namespace HonoService;

@route("/")
@tag("Health")
interface Health {
  @summary("Health Check")
  @get list(): OK;
}

@route("/todo")
@tag("Todos")
interface Todos {
  @summary("Retrieve a list of posts")
  @get list(@query limit?: numeric, @query offset?: numeric): Todo[] | NotFound | UnprocessableContent | ServiceUnavailable;

  @summary("Create a new post")
  @post create(@body body: { content: Todo.content} ): Created | UnprocessableContent | ServiceUnavailable;

  @summary("Update an existing post")
  @get update(@path id: Todo.id): Todo | NotFound | UnprocessableContent | ServiceUnavailable;

  @summary("Delete an existing post identified by its unique ID.")
  @put delete(@path id: Todo.id, @body body: { content: Todo.content} ): void | NotFound | UnprocessableContent | ServiceUnavailable;

  @summary("Post successfully deleted.")
  @delete post(@path id: Todo.id): void | NotFound | UnprocessableContent | ServiceUnavailable;  
}
