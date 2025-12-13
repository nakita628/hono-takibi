import "@typespec/http";
using Http;

model Hono {
  hono: "Hono"
}

model HonoX {
  honoX: "HonoX"
}

model ZodOpenAPIHono {
  "zod-openapi-hono": "ZodOpenAPIHono"
}

model HonoUnion {
  "hono-union": Hono | HonoX | ZodOpenAPIHono
}

@route("/hono")
@tag("Hono")
interface HonoService {
  @get hono(): Hono;
}

@route("/honox")
@tag("Hono")
interface HonoXService {
  @get honox(): HonoX;
}

@route("/zod-openapi-hono")
@tag("Hono")
interface ZodOpenAPIHonoService {
  @get zod_openapi_hono(): ZodOpenAPIHono;
}

