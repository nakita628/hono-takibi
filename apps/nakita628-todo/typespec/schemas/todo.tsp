@example(#{
    id: "c6c0f743-01fa-4c23-80d6-1b358512e213",
    content: "Hono",
    completed: 0,
    createdAt: "2020-01-01T00:00:00Z",
    updatedAt: "2020-01-01T00:00:00Z",
  })
  model Todo {
    @format("uuid")
    id: string;
    @minLength(1)
    @maxLength(140)
    content: string;
    @doc("0 = not completed, 1 = completed")
    completed: int32;
    @format("date-time")
    createdAt: string;
    @format("date-time")
    updatedAt: string;
  }