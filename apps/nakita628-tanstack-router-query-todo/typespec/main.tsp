import "@typespec/http";
import "./schemas/todo.tsp";
import "./schemas/success.tsp";
import "./schemas/error.tsp";

using Http;

@service(#{ title: "Hono Todo API" })
@server("http://localhost:8787/api", "Development server")
namespace HonoService;

@route("/todo")
@tag("Todos")
interface Todos {
  @summary("Retrieve a list of todos")
  @get list(@query page?: int32 = 1, @query rows?: int32 = 10): Todo[] | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Create a new todo")
  @post create(@body body: { content: string }): Created | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Get a single todo")
  @get read(@path id: string): Todo | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Update an existing todo")
  @put update(@path id: string, @body body: { content?: string; completed?: int32 }): void | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;

  @summary("Delete a todo")
  @delete delete(@path id: string): void | NotFound | UnprocessableContent | InternalServerError | ServiceUnavailable;
}
