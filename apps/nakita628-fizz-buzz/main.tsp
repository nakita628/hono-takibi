import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

/** FizzBuzz API */
@service(#{ title: "FizzBuzz API" })
@info(#{ version: "v1" })
namespace FizzBuzzAPI;

model FizzBuzzResult {
  result: string;
  number?: float64;
}

model ErrorResponse {
  error?: string;
}

@route("/fizzBuzz")
@get
@summary("Get FizzBuzz result")
@doc("Returns the FizzBuzz result for the given number.")
op getFizzBuzz(
  @query @minValue(1) number: float64,
  @query details?: string,
): FizzBuzzResult | {
  @statusCode statusCode: 400;
  @body body: ErrorResponse;
};
