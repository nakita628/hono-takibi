import "@typespec/http";
import "@typespec/versioning";
import "./schemas/todo.tsp";
import "./schemas/success.tsp";
import "./schemas/error.tsp";

using Http;

@service(#{ title: "Hono Todo API" })
@server("http://localhost:8787/api", "Development server")
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
  @get list(@query limit?: numeric, @query offset?: numeric): Todo[] | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Create a new post")
  @post create(@body body: { content: Todo.content} ): Created | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Get a single todo")
  @get read(@path id: Todo.id): Todo | NotFound | UnprocessableContent| InternalServerError | ServiceUnavailable;

  @summary("Update an existing todo")
  @put update(@path id: Todo.id, @body body: { content?: Todo.content, completed?: Todo.completed } ): void | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Delete a todo")
  @delete delete(@path id: Todo.id): void | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;  
}