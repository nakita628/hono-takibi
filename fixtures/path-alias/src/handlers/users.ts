import { getUsersRoute } from '@/routes'
import app from '@'

export const usersHandler = app.openapi(getUsersRoute, (c) => {
  return c.json(
    [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ],
    200,
  )
})
