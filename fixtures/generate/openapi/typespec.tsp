import "@typespec/http";
using Http;

model Hono {
  hono: "Hono" | "HonoX" | "ZodOpenAPIHono";
}

@route("/hono")
@tag("Hono")
interface HonoService {
  @post create(@body hono: Hono): Hono;
}