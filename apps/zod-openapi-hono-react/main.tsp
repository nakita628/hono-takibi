import "@typespec/http";
using Http;

model Hono {
    hono: "Hono";
}

model HonoX {
    honox: "HonoX";
}

model ZodOpenAPIHono {
    `zod-openapi-hono`: "ZodOpenAPIHono";
}

@route("/hono")
@tag("Hono")
interface HonoService {
    @get read(): Hono;
}

@route("/honox")
@tag("HonoX")
interface HonoXService {
    @get read(): HonoX;
}

@route("/zod-openapi-hono")
@tag("ZodOpenAPIHono")
interface ZodOpenAPIHonoService {
    @get read(): ZodOpenAPIHono;
}
