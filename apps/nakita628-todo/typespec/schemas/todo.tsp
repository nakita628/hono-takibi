@example(#{ 
    id: "c6c0f743-01fa-4c23-80d6-1b358512e213",
    content: "Hono",
    createdAt: "2020-01-01T00:00:00Z",
    updatedAt: "2020-01-01T00:00:00Z",
  })
  model Todo {
    @format("uuid")
    id: string;
    @minLength(1)
    @maxLength(140)
    content: string;
    @format("date-time")
    createdAt: string;
    @format("date-time")
    updatedAt: string;
  }