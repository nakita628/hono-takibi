import "@typespec/http";
using Http;

@example(#{
  status: 200,
  message: "OK",
})
model OK {
  @statusCode status: 200;
  message: string;  
}

@example(#{
  status: 201,
  message: "Created",
})
model Created {
  @statusCode status: 201;
  message: string;  
}