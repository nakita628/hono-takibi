import "@typespec/http";
using Http;

@error
model NotFound {
  @statusCode status: 404;
  message: string;
}

@error
model UnprocessableContent {
  @statusCode status: 422;
  message: string;
}

@error
model ServiceUnavailable {
  @statusCode status: 503;
  @header("Retry-After")
  retryAfter?: string;
}